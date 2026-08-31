import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { QUOTE_CONSENT_VERSION } from "@/lib/consent";

type MoveDetails = {
  couches?: Record<string, number>;
  fridgeType?: string;
  bedSize?: string;
  plants?: Record<string, number>;
  wrapping?: string;
  packagingMaterials?: string;
  materialsRequested?: string[];
  packingHelp?: string;
  dismantling?: string;
  boxesAndTapes?: string;
  bubbleAndPalletWrap?: string;
  storageNeeded?: string;
  truckRestrictions?: string;
};

type QuotePayload = {
  from: string;
  to: string;
  date: string;
  moveType: string;
  homeSize?: string;
  services?: string[];
  access?: string;
  notes?: string;
  name: string;
  phone: string;
  email?: string;
  confirmationChannel?: "whatsapp" | "email";
  preferredTime?: string;
  inventory?: Record<string, number>;
  otherItems?: string;
  details?: MoveDetails;
  photos?: Array<{ name: string; type: string; size: number }>;
  consent?: {
    accepted?: boolean;
    name?: string;
    version?: string;
  };
};

const MAX_PHOTOS = 6;
const MAX_PHOTO_SIZE = 8 * 1024 * 1024;
const PHOTO_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"]);
const PHOTO_BUCKET = "quote-photos";

function makeReference() {
  return "OTMA-" + new Date().getFullYear() + "-" + Math.random().toString(36).slice(2, 7).toUpperCase();
}

function getFileExtension(file: File) {
  const match = file.name.toLowerCase().match(/\.([a-z0-9]{1,8})$/);
  return match ? "." + match[1] : "";
}

function makePhotoPath(reference: string, file: File) {
  return reference + "/" + crypto.randomUUID() + getFileExtension(file);
}

function formatCounts(counts?: Record<string, number>, labels?: Record<string, string>) {
  if (!counts) return "";
  return Object.entries(counts)
    .filter(([, count]) => count > 0)
    .map(([key, count]) => count + " × " + (labels?.[key] || key))
    .join(", ");
}

function detailsSummary(details?: MoveDetails) {
  if (!details) return "";
  const couches = formatCounts(details.couches, {
    threeSeater: "3 seater couch",
    twoSeater: "2 seater couch",
    oneSeater: "1 seater couch",
  });
  const plants = formatCounts(details.plants, {
    small: "small pot plant",
    medium: "medium pot plant",
    large: "large pot plant",
  });
  const materialLabels: Record<string, string> = {
    "news-wrap": "News wrap",
    "cushion-roll": "Cushion / craft roll",
    "mattress-cover": "Mattress covers",
    "wardrobe-box": "Wardrobe boxes",
    "tv-box": "TV / painting boxes",
    "bubble-wrap": "Bubble wrap",
  };
  const materials = details.materialsRequested?.map((material) => materialLabels[material] || material).join(", ") || "";
  return [
    details.fridgeType ? "Fridge: " + details.fridgeType : "",
    details.bedSize ? "Bed: " + details.bedSize : "",
    couches ? "Couches: " + couches : "",
    plants ? "Pot plants: " + plants : "",
    details.wrapping ? "Wrapping and bubble wrap: " + details.wrapping : "",
    details.packagingMaterials ? "Packaging material: " + details.packagingMaterials : "",
    materials ? "Packaging materials requested: " + materials : "",
    details.packingHelp ? "Packing help: " + details.packingHelp : "",
    details.dismantling ? "Dismantling and assembling: " + details.dismantling : "",
    details.boxesAndTapes ? "Boxes and tapes: " + details.boxesAndTapes : "",
    details.bubbleAndPalletWrap ? "Bubble and pallet wrap: " + details.bubbleAndPalletWrap : "",
    details.storageNeeded ? "Storage facilities: " + details.storageNeeded : "",
    details.truckRestrictions ? "Estate or truck restrictions: " + details.truckRestrictions : "",
  ].filter(Boolean).join(" · ");
}

async function notify(reference: string, body: QuotePayload, photoFiles: File[]) {
  const webhookUrl = process.env.QUOTE_NOTIFY_WEBHOOK_URL;
  if (!webhookUrl) return;

  const summary =
    "New On The Move Again move brief " + reference + "\n" +
    body.name + " · " + body.phone + (body.email ? " · " + body.email : "") + "\n" +
    body.moveType + " — " + body.from + " → " + body.to + "\n" +
    "Date: " + (body.date || "not set") + " · Time: " + (body.preferredTime || "not set") + "\n" +
    (body.services?.length ? "Services: " + body.services.join(", ") + "\n" : "") +
    (body.access ? "Access: " + body.access + "\n" : "") +
    (detailsSummary(body.details) ? "Details: " + detailsSummary(body.details) + "\n" : "") +
    (body.photos?.length ? "Photos supplied: " + body.photos.length + "\n" : "") +
    "Quote request consent recorded for: " + (body.consent?.name?.trim() || "not recorded") + " (" + QUOTE_CONSENT_VERSION + ")\n" +
    (body.confirmationChannel ? "Handoff: " + body.confirmationChannel : "");

  try {
    // A Slack, Make or Zapier webhook can forward this brief to the team's
    // preferred inbox or chat channel. Photos are included when supplied.
    if (photoFiles.length) {
      const formData = new FormData();
      formData.append("text", summary);
      formData.append("reference", reference);
      formData.append("payload", JSON.stringify({ text: summary, reference, ...body }));
      photoFiles.forEach((file) => formData.append("photos", file, file.name));
      await fetch(webhookUrl, { method: "POST", body: formData });
      return;
    }

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: summary, reference, ...body }),
    });
  } catch (err) {
    // Notification failure should never fail the move brief submission itself.
    console.error("OTMA move brief notification failed", err);
  }
}

function buildStoredNotes(body: QuotePayload) {
  const inventory = body.inventory
    ? Object.entries(body.inventory).filter(([, count]) => count > 0).map(([item, count]) => count + " × " + item).join(", ")
    : "";
  const inventoryNote = inventory || body.otherItems
    ? "Inventory: " + (inventory || "No quantities listed") + (body.otherItems ? " · Other: " + body.otherItems : "") + "."
    : "";
  const preferredTime = body.preferredTime ? "Preferred time: " + body.preferredTime + "." : "";
  const confirmation = body.confirmationChannel ? "Handoff preference: " + body.confirmationChannel + "." : "";
  const structuredDetails = detailsSummary(body.details) ? "Move details: " + detailsSummary(body.details) + "." : "";
  const consentRecord = body.consent?.accepted
    ? "Quote request consent recorded for " + body.consent.name?.trim() + " (" + QUOTE_CONSENT_VERSION + ")."
    : "";
  return [body.notes, preferredTime, confirmation, inventoryNote, structuredDetails, consentRecord].filter(Boolean).join("\n\n");
}

export async function POST(request: Request) {
  let body: QuotePayload;
  let photoFiles: File[] = [];

  try {
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const payload = formData.get("payload");
      if (typeof payload !== "string") throw new Error("Missing move brief payload");
      body = JSON.parse(payload) as QuotePayload;
      photoFiles = formData.getAll("photos").filter((value): value is File => value instanceof File);
    } else {
      body = await request.json();
    }
  } catch {
    return NextResponse.json({ error: "We could not read this request." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "We could not read this request." }, { status: 400 });
  }

  if (photoFiles.length > MAX_PHOTOS) {
    return NextResponse.json({ error: "Please upload no more than " + MAX_PHOTOS + " photos." }, { status: 400 });
  }

  const invalidPhoto = photoFiles.find((file) => !PHOTO_TYPES.has(file.type) || file.size > MAX_PHOTO_SIZE);
  if (invalidPhoto) {
    return NextResponse.json({ error: "Each photo must be a JPG, PNG, WEBP or HEIC image under 8 MB." }, { status: 400 });
  }

  if (photoFiles.length) {
    body.photos = photoFiles.map((file) => ({ name: file.name, type: file.type, size: file.size }));
  }

  const required: (keyof QuotePayload)[] = ["from", "to", "date", "moveType", "name", "phone"];
  const missing = required.filter((key) => !body?.[key]);
  if (missing.length) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  }

  if (body.confirmationChannel === "email" && !body.email?.trim()) {
    return NextResponse.json({ error: "An email address is required for email handoff." }, { status: 400 });
  }

  const consentName = body.consent?.name?.trim() || "";
  if (body.consent?.accepted !== true || !consentName || body.consent.version !== QUOTE_CONSENT_VERSION) {
    return NextResponse.json({ error: "Please confirm the quote request consent before submitting." }, { status: 400 });
  }

  const reference = makeReference();
  const consentAcceptedAt = new Date().toISOString();
  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { data: quoteRequest, error } = await supabase.from("quote_requests").insert({
        reference,
        from_address: body.from,
        to_address: body.to,
        move_date: body.date || null,
        move_type: body.moveType,
        home_size: body.homeSize || "Not specified",
        services: body.services ?? [],
        access: body.access || null,
        notes: buildStoredNotes(body) || null,
        name: body.name,
        phone: body.phone,
        email: body.email || null,
        consent_version: QUOTE_CONSENT_VERSION,
        consent_accepted: true,
        consent_name: consentName,
        consent_accepted_at: consentAcceptedAt,
      })
      .select("id")
      .single();

    if (error || !quoteRequest) {
      console.error("OTMA move brief insert failed", error);
      return NextResponse.json({ error: "We could not save this move brief. Please try again." }, { status: 500 });
    }

    const uploadedPaths: string[] = [];
    try {
      for (const file of photoFiles) {
        const storagePath = makePhotoPath(reference, file);
        const { error: uploadError } = await supabase.storage
          .from(PHOTO_BUCKET)
          .upload(storagePath, file, { contentType: file.type, upsert: false });

        if (uploadError) throw uploadError;
        uploadedPaths.push(storagePath);

        const { error: photoRowError } = await supabase.from("quote_request_photos").insert({
          quote_request_id: quoteRequest.id,
          reference,
          storage_path: storagePath,
          original_name: file.name,
          content_type: file.type,
          byte_size: file.size,
        });

        if (photoRowError) throw photoRowError;
      }
    } catch (photoError) {
      if (uploadedPaths.length) {
        await supabase.storage.from(PHOTO_BUCKET).remove(uploadedPaths);
      }
      await supabase.from("quote_requests").delete().eq("id", quoteRequest.id);
      console.error("OTMA move brief photo storage failed", photoError);
      return NextResponse.json({ error: "We could not save the move photos. Please try again." }, { status: 500 });
    }
  } else {
    // Local fallback: if Supabase is not configured, keep the customer handoff
    // functional while skipping durable server-side storage. Photos are not
    // persisted in this mode.
    console.info("OTMA move brief (no Supabase configured)", { ...body, reference });
  }

  await notify(reference, body, photoFiles);
  return NextResponse.json({ ok: true, reference, consentAcceptedAt });
}
