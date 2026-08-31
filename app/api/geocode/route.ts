import { NextResponse } from "next/server";

type NominatimResult = {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  address?: Record<string, string>;
};

let lastRequestAt = 0;

function getResultLabel(result: NominatimResult) {
  const address = result.address ?? {};
  const street = [address.house_number, address.road].filter(Boolean).join(" ");
  return street || address.name || address.suburb || address.city || result.display_name.split(",")[0];
}

async function respectPublicRateLimit() {
  const wait = Math.max(0, 1000 - (Date.now() - lastRequestAt));
  if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait));
  lastRequestAt = Date.now();
}

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim() ?? "";
  if (query.length < 3) return NextResponse.json({ locations: [] });

  try {
    await respectPublicRateLimit();

    const endpoint = process.env.OPENSTREETMAP_GEOCODING_URL || "https://nominatim.openstreetmap.org/search";
    const url = new URL(endpoint);
    url.searchParams.set("q", query);
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("addressdetails", "1");
    url.searchParams.set("limit", "5");
    url.searchParams.set("countrycodes", "za");
    url.searchParams.set("accept-language", "en");

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": process.env.OPENSTREETMAP_USER_AGENT || "On The Move Again address search (sales@otma.co.za)",
        Referer: "https://www.otma.co.za/",
      },
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Address provider returned " + response.status);
    const results = (await response.json()) as NominatimResult[];
    const locations = results
      .filter((result) => result.display_name && Number.isFinite(Number(result.lat)) && Number.isFinite(Number(result.lon)))
      .map((result) => ({
        id: "osm-" + result.place_id,
        label: getResultLabel(result),
        display: result.display_name,
        detail: result.display_name,
        aliases: [],
        lat: Number(result.lat),
        lng: Number(result.lon),
      }));

    return NextResponse.json({ locations });
  } catch (error) {
    console.error("OTMA address search failed", error);
    return NextResponse.json({ error: "Online address search is unavailable right now.", locations: [] }, { status: 502 });
  }
}
