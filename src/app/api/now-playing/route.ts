// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { NextResponse } from "next/server";
import SpotifyWebApi from "spotify-web-api-node";

export const dynamic = "force-dynamic";

interface Artist {
  name: string;
  link: string;
}

interface ResponseData {
  isPlayingNow: boolean;
  isPaused: boolean;
  progressMs: number;
  durationMs: number;
  albumCoverImg: string;
  artists: Artist[];
  trackName: string;
  trackLink: string;
  lastUpdate: number;
}

const api = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
});
let expirationTime = 0;

export async function GET() {
  try {
    console.log("GET now-playing");
    if (Date.now() > expirationTime) {
      const response = await api.refreshAccessToken();
      api.setAccessToken(response.body.access_token);

      expirationTime = Date.now() + response.body.expires_in * 1000;
    }

    const response: ResponseData = {
      isPlayingNow: false,
      isPaused: false,
      progressMs: 0,
      durationMs: 0,
      albumCoverImg: "",
      artists: [],
      trackName: "",
      trackLink: "",
      lastUpdate: 0,
    };
    const playing = await api.getMyCurrentPlayingTrack();

    let track: SpotifyApi.TrackObjectFull | null = null;
    if (playing.body?.item && "album" in playing.body.item) {
      track = playing.body.item;

      response.isPlayingNow = true;
      response.isPaused = !playing.body.is_playing;
      response.progressMs = playing.body.progress_ms ?? 0;
      response.durationMs = track.duration_ms;
      response.lastUpdate = playing.body.timestamp;
    } else {
      const lastPlayed = await api.getMyRecentlyPlayedTracks({
        limit: 1,
      });

      if (lastPlayed.body?.items[0]?.track) {
        track = lastPlayed.body.items[0].track as SpotifyApi.TrackObjectFull;
      }
    }

    if (track) {
      response.albumCoverImg = track.album.images[0].url;
      response.artists = track.artists.map((artist) => {
        return { name: artist.name, link: artist.external_urls.spotify };
      });
      response.trackName = track.name;
      response.trackLink = track.external_urls.spotify;
    }

    console.log("GET now-playing complete", JSON.stringify(response));

    const nextResponse = NextResponse.json(response);
    nextResponse.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate",
    );
    return nextResponse;
  } catch (err: unknown) {
    let errorMessage = "An unexpected error occurred";

    if (err instanceof Error) {
      errorMessage = err.message;
    } else if (typeof err === "string") {
      errorMessage = err;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
