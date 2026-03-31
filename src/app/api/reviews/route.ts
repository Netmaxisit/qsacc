import { NextResponse } from "next/server";

export interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url: string;
}

export interface ReviewsResponse {
  reviews: GoogleReview[];
  rating: number;
  user_ratings_total: number;
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json({ error: "not_configured" }, { status: 404 });
  }

  try {
    const url =
      `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=${placeId}` +
      `&fields=reviews,rating,user_ratings_total` +
      `&key=${apiKey}`;

    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json();

    if (data.status !== "OK") {
      return NextResponse.json({ error: data.status }, { status: 502 });
    }

    const payload: ReviewsResponse = {
      reviews: data.result.reviews ?? [],
      rating: data.result.rating ?? 5,
      user_ratings_total: data.result.user_ratings_total ?? 0,
    };

    return NextResponse.json(payload);
  } catch {
    return NextResponse.json({ error: "fetch_failed" }, { status: 502 });
  }
}
