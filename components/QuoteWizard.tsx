"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { ArrowRightIcon, CameraIcon, CheckIcon, MailIcon, MapPinIcon, WhatsAppIcon } from "./Icons";
import { company } from "@/lib/site";
import { QUOTE_CONSENT_VERSION } from "@/lib/consent";
import {
  accessOptions,
  AccessId,
  AddressSelection,
  inventoryCatalog,
  InventoryKey,
  Location,
  searchLocations,
} from "@/lib/quote-engine";

type Step = 1 | 2 | 3;
type AddressField = "pickup" | "dropoff";
type AddressSearchState = "idle" | "loading" | "searched";
type ConfirmationChannel = "whatsapp" | "email";
type MoveType = "home" | "office" | "delivery";
type PlantKey = "small" | "medium" | "large";
type CouchKey = "threeSeater" | "twoSeater" | "oneSeater";
type PackagingMaterialKey = "news-wrap" | "cushion-roll" | "mattress-cover" | "wardrobe-box" | "tv-box" | "bubble-wrap";

type QuotePhoto = {
  id: string;
  file: File;
  previewUrl: string;
};

type QuoteForm = {
  pickup: AddressSelection;
  dropoff: AddressSelection;
  moveType: MoveType | "";
  inventory: Record<InventoryKey, number>;
  otherItems: string;
  couches: Record<CouchKey, number>;
  fridgeSize: string;
  bedSize: string;
  plants: Record<PlantKey, number>;
  wrapping: string;
  packagingMaterials: string;
  materialsRequested: PackagingMaterialKey[];
  packingHelp: string;
  dismantling: string;
  boxesAndTapes: string;
  bubbleAndPalletWrap: string;
  storageNeeded: string;
  pickupAccess: AccessId;
  dropoffAccess: AccessId;
  truckRestrictions: string;
  preferredDate: string;
  preferredTime: string;
  name: string;
  phone: string;
  email: string;
  confirmationChannel: ConfirmationChannel;
  consentAccepted: boolean;
  notes: string;
};

const MAX_PHOTOS = 6;
const MAX_PHOTO_SIZE = 8 * 1024 * 1024;
const PHOTO_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"]);

const moveTypeOptions: Array<{ value: MoveType; label: string; description: string }> = [
  { value: "home", label: "Home move", description: "Household furniture and belongings" },
  { value: "office", label: "Office relocation", description: "Workplace furniture and equipment" },
  { value: "delivery", label: "Commercial delivery", description: "Goods moving between sites or clients" },
];

const plantOptions: Array<{ key: PlantKey; label: string }> = [
  { key: "small", label: "Small" },
  { key: "medium", label: "Medium" },
  { key: "large", label: "Large" },
];

const couchOptions: Array<{ key: CouchKey; label: string }> = [
  { key: "threeSeater", label: "3 seater" },
  { key: "twoSeater", label: "2 seater" },
  { key: "oneSeater", label: "1 seater" },
];

const packagingMaterialOptions: Array<{ key: PackagingMaterialKey; label: string; hint: string }> = [
  { key: "news-wrap", label: "News wrap", hint: "For crockery and smaller items" },
  { key: "cushion-roll", label: "Cushion / craft roll", hint: "For padded protection" },
  { key: "mattress-cover", label: "Mattress covers", hint: "For beds and mattresses" },
  { key: "wardrobe-box", label: "Wardrobe boxes", hint: "For hanging clothes" },
  { key: "tv-box", label: "TV / painting boxes", hint: "For screens and artwork" },
  { key: "bubble-wrap", label: "Bubble wrap", hint: "For fragile or delicate items" },
];

type InventoryRoomDefinition = {
  id: string;
  label: string;
  keys: InventoryKey[];
};

const inventoryRoomGroups: InventoryRoomDefinition[] = [
  { id: "lounge", label: "Lounge", keys: ["tv", "tv-stand", "coffee-table"] },
  { id: "dining", label: "Dining room", keys: ["dining-table", "chairs"] },
  { id: "kitchen", label: "Kitchen & scullery", keys: ["fridge", "washing-machine", "dishwasher", "tumble-dryer", "microwave"] },
  { id: "study", label: "Study", keys: ["desk"] },
  { id: "bedroom", label: "Bedroom", keys: ["wardrobe", "bed", "chest-of-drawers"] },
  { id: "garage", label: "Garage & outdoor", keys: ["boxes", "garden-furniture", "braai", "bicycle", "lawnmower"] },
];

function emptyInventory(): Record<InventoryKey, number> {
  return Object.fromEntries(inventoryCatalog.map((item) => [item.key, 0])) as Record<InventoryKey, number>;
}

function createInitialForm(): QuoteForm {
  return {
    pickup: { text: "", confirmed: false },
    dropoff: { text: "", confirmed: false },
    moveType: "",
    inventory: emptyInventory(),
    otherItems: "",
    couches: { threeSeater: 0, twoSeater: 0, oneSeater: 0 },
    fridgeSize: "",
    bedSize: "",
    plants: { small: 0, medium: 0, large: 0 },
    wrapping: "",
    packagingMaterials: "",
    materialsRequested: [],
    packingHelp: "",
    dismantling: "",
    boxesAndTapes: "",
    bubbleAndPalletWrap: "",
    storageNeeded: "",
    pickupAccess: "standard",
    dropoffAccess: "standard",
    truckRestrictions: "",
    preferredDate: "",
    preferredTime: "08:00",
    name: "",
    phone: "",
    email: "",
    confirmationChannel: "whatsapp",
    consentAccepted: false,
    notes: "",
  };
}

function formatFirstName(name: string) {
  return name.trim().split(/\s+/)[0] || "there";
}

function accessLabel(value: AccessId) {
  return accessOptions.find((option) => option.value === value)?.label ?? value;
}

function moveTypeLabel(value: MoveType | "") {
  return moveTypeOptions.find((option) => option.value === value)?.label ?? "Move";
}

function AddressInput({
  field,
  label,
  address,
  suggestions,
  onFocus,
  onChange,
  onSelect,
  onUseTyped,
  onSearchOnline,
  onlineSearchState,
}: {
  field: AddressField;
  label: string;
  address: AddressSelection;
  suggestions: Location[];
  onFocus: () => void;
  onChange: (value: string) => void;
  onSelect: (location: Location) => void;
  onUseTyped: () => void;
  onSearchOnline: () => void;
  onlineSearchState: AddressSearchState;
}) {
  const hasTypedAddress = address.text.trim().length >= 3;
  const searchingOnline = onlineSearchState === "loading";

  return (
    <div className="addressField">
      <label htmlFor={field + "-address"}>{label}</label>
      <div className={"inputWithIcon addressInput " + (address.confirmed ? "confirmed" : "")}>
        <MapPinIcon />
        <input
          id={field + "-address"}
          value={address.text}
          onFocus={onFocus}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Street, suburb, complex or landmark"
          autoComplete="off"
          aria-autocomplete="list"
        />
        {address.confirmed && <span className="addressCheck" aria-label="Address selected">✓</span>}
      </div>
      {address.confirmed ? (
        <p className="addressConfirmed">Address selected. Edit the field to choose a different location.</p>
      ) : (
        <p className="addressHelp">Type an address, then choose the closest match.</p>
      )}
      {!address.confirmed && (
        <div className="addressSearchRow">
          <button type="button" className="addressSearchButton" disabled={!hasTypedAddress || searchingOnline} onClick={onSearchOnline}>
            {searchingOnline ? "Searching…" : "Find address"}
          </button>
          <span>Optional — you can always use the full address as entered.</span>
        </div>
      )}
      {suggestions.length > 0 && !address.confirmed && (
        <div className="addressSuggestions" role="listbox" aria-label={label + " suggestions"}>
          <span className="suggestionHint">Tap the closest match</span>
          {suggestions.map((location) => (
            <button
              type="button"
              role="option"
              className="addressSuggestion"
              key={location.id}
              onClick={() => onSelect(location)}
            >
              <strong>{location.label}</strong>
              <span>{location.detail}</span>
            </button>
          ))}
          {hasTypedAddress && (
            <button type="button" className="addressSuggestion addressSuggestion--fallback" onClick={onUseTyped}>
              <strong>Use “{address.text}” as entered</strong>
              <span>We will confirm the exact address with you before the move.</span>
            </button>
          )}
        </div>
      )}
      {!address.confirmed && suggestions.length === 0 && hasTypedAddress && (
        <button type="button" className="typedAddressChoice" onClick={onUseTyped}>
          Use “{address.text}” as entered
        </button>
      )}
      {!address.confirmed && onlineSearchState === "searched" && suggestions.length === 0 && hasTypedAddress && (
        <p className="addressSearchStatus">No map match found. You can continue with the full address above.</p>
      )}
    </div>
  );
}

function InventoryCounter({
  label,
  hint,
  count,
  onDecrease,
  onIncrease,
  removeLabel,
  addLabel,
}: {
  label: string;
  hint: string;
  count: number;
  onDecrease: () => void;
  onIncrease: () => void;
  removeLabel: string;
  addLabel: string;
}) {
  return (
    <div className="inventoryItem">
      <div className="inventoryItemInfo"><strong>{label}</strong><span>{hint}</span></div>
      <div className="quantityControl">
        <button type="button" aria-label={removeLabel} disabled={!count} onClick={onDecrease}>−</button>
        <span>{count}</span>
        <button type="button" aria-label={addLabel} onClick={onIncrease}>+</button>
      </div>
    </div>
  );
}

function InventoryRoom({
  room,
  inventory,
  couches,
  onAdjustInventory,
  onAdjustCouch,
}: {
  room: InventoryRoomDefinition;
  inventory: Record<InventoryKey, number>;
  couches: Record<CouchKey, number>;
  onAdjustInventory: (key: InventoryKey, delta: number) => void;
  onAdjustCouch: (key: CouchKey, delta: number) => void;
}) {
  const [open, setOpen] = useState(room.id === "lounge");
  const roomItems = inventoryCatalog.filter((item) => room.keys.includes(item.key));
  const couchCount = room.id === "lounge" ? Object.values(couches).reduce((total, count) => total + count, 0) : 0;
  const roomCount = couchCount + roomItems.reduce((total, item) => total + (inventory[item.key] ?? 0), 0);

  return (
    <section className={"inventoryRoom" + (open ? " isOpen" : "")}>
      <button
        type="button"
        className="inventoryRoomHeader"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span><strong>{room.label}</strong><small>{roomCount ? roomCount + " selected" : "Add quantities"}</small></span>
        <span className="inventoryRoomChevron" aria-hidden="true">⌄</span>
      </button>
      {open && (
        <div className="inventoryRoomBody">
          {room.id === "lounge" && couchOptions.map((couch) => (
            <InventoryCounter
              key={couch.key}
              label={couch.label + " couch"}
              hint="Lounge seating"
              count={couches[couch.key]}
              removeLabel={"Remove " + couch.label + " couch"}
              addLabel={"Add " + couch.label + " couch"}
              onDecrease={() => onAdjustCouch(couch.key, -1)}
              onIncrease={() => onAdjustCouch(couch.key, 1)}
            />
          ))}
          {roomItems.map((item) => (
            <InventoryCounter
              key={item.key}
              label={item.label}
              hint={item.hint}
              count={inventory[item.key]}
              removeLabel={"Remove " + item.label}
              addLabel={"Add " + item.label}
              onDecrease={() => onAdjustInventory(item.key, -1)}
              onIncrease={() => onAdjustInventory(item.key, 1)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default function QuoteWizard({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<QuoteForm>(createInitialForm);
  const [activeAddress, setActiveAddress] = useState<AddressField | null>(null);
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [addressSearchState, setAddressSearchState] = useState<Record<AddressField, AddressSearchState>>({ pickup: "idle", dropoff: "idle" });
  const [photos, setPhotos] = useState<QuotePhoto[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ reference: string; consentAcceptedAt: string } | null>(null);
  const [error, setError] = useState("");

  const listedItemCount = inventoryCatalog
    .filter((item) => item.key !== "couch")
    .reduce((total, item) => total + (form.inventory[item.key] ?? 0), 0);
  const couchCount = Object.values(form.couches).reduce((total, count) => total + count, 0);
  const itemCount = listedItemCount + couchCount;
  const plantCount = Object.values(form.plants).reduce((total, count) => total + count, 0);
  const progress = Math.round((step / 3) * 100) + "%";
  const minDate = new Date().toISOString().slice(0, 10);

  function updateAddress(field: AddressField, text: string) {
    setForm((current) => ({ ...current, [field]: { text, confirmed: false } }));
    setActiveAddress(field);
    setSuggestions(searchLocations(text));
    setAddressSearchState((current) => ({ ...current, [field]: "idle" }));
    setError("");
  }

  function focusAddress(field: AddressField) {
    setActiveAddress(field);
    setSuggestions(searchLocations(form[field].text));
  }

  function selectAddress(field: AddressField, location: Location) {
    setForm((current) => ({
      ...current,
      [field]: { text: location.display, locationId: location.id, confirmed: true },
    }));
    setActiveAddress(null);
    setSuggestions([]);
    setAddressSearchState((current) => ({ ...current, [field]: "idle" }));
    setError("");
  }

  function useTypedAddress(field: AddressField) {
    if (form[field].text.trim().length < 3) return;
    setForm((current) => ({
      ...current,
      [field]: { text: current[field].text.trim(), confirmed: true },
    }));
    setActiveAddress(null);
    setSuggestions([]);
    setAddressSearchState((current) => ({ ...current, [field]: "idle" }));
    setError("");
  }

  async function searchOnline(field: AddressField) {
    const query = form[field].text.trim();
    if (query.length < 3) return;

    setActiveAddress(field);
    setAddressSearchState((current) => ({ ...current, [field]: "loading" }));
    setError("");

    try {
      const response = await fetch("/api/geocode?q=" + encodeURIComponent(query), { cache: "no-store" });
      const data = await response.json();
      const localLocations = searchLocations(query);
      const onlineLocations = Array.isArray(data.locations) ? data.locations as Location[] : [];
      const mergedLocations = [...localLocations, ...onlineLocations.filter((online) => !localLocations.some((local) => local.display === online.display))].slice(0, 8);
      setSuggestions(mergedLocations);
    } catch {
      setSuggestions(searchLocations(query));
    } finally {
      setAddressSearchState((current) => ({ ...current, [field]: "searched" }));
    }
  }

  function setField<Key extends keyof QuoteForm>(key: Key, value: QuoteForm[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (!selected.length) return;

    const remaining = MAX_PHOTOS - photos.length;
    if (remaining <= 0) {
      setError("You can upload up to " + MAX_PHOTOS + " photos.");
      return;
    }

    const nextPhotos: QuotePhoto[] = [];
    for (const file of selected.slice(0, remaining)) {
      if (!PHOTO_TYPES.has(file.type)) {
        setError(file.name + " is not a supported image. Choose JPG, PNG, WEBP or HEIC.");
        continue;
      }
      if (file.size > MAX_PHOTO_SIZE) {
        setError(file.name + " is larger than 8 MB. Please choose a smaller image.");
        continue;
      }
      nextPhotos.push({
        id: file.name + "-" + file.lastModified + "-" + Math.random().toString(36).slice(2),
        file,
        previewUrl: URL.createObjectURL(file),
      });
    }

    setPhotos((current) => [...current, ...nextPhotos]);
    if (selected.length > remaining) {
      setError("You can upload up to " + MAX_PHOTOS + " photos.");
    } else if (nextPhotos.length > 0) {
      setError("");
    }
  }

  function removePhoto(id: string) {
    setPhotos((current) => {
      const photo = current.find((item) => item.id === id);
      if (photo) URL.revokeObjectURL(photo.previewUrl);
      return current.filter((item) => item.id !== id);
    });
  }

  function clearPhotos() {
    photos.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
    setPhotos([]);
  }

  function adjustInventory(key: InventoryKey, delta: number) {
    setForm((current) => ({
      ...current,
      inventory: { ...current.inventory, [key]: Math.max(0, (current.inventory[key] ?? 0) + delta) },
    }));
    setError("");
  }

  function adjustCouch(key: CouchKey, delta: number) {
    setForm((current) => ({
      ...current,
      couches: { ...current.couches, [key]: Math.max(0, (current.couches[key] ?? 0) + delta) },
    }));
    setError("");
  }

  function adjustPlant(key: PlantKey, delta: number) {
    setForm((current) => ({
      ...current,
      plants: { ...current.plants, [key]: Math.max(0, (current.plants[key] ?? 0) + delta) },
    }));
    setError("");
  }

  function continueFromRoute() {
    setError("");
    if (!form.pickup.confirmed || !form.dropoff.confirmed) {
      setError("Choose a pickup and drop-off match before continuing.");
      return;
    }
    setStep(2);
  }

  function continueFromDetails() {
    setError("");
    if (!form.moveType) {
      setError("Choose the type of move that best describes this request.");
      return;
    }
    setStep(3);
  }

  function makeInventorySummary() {
    const itemParts = inventoryCatalog
      .filter((item) => item.key !== "couch" && form.inventory[item.key] > 0)
      .map((item) => form.inventory[item.key] + " × " + item.label);
    const couchParts = couchOptions
      .filter((couch) => form.couches[couch.key] > 0)
      .map((couch) => form.couches[couch.key] + " × " + couch.label);
    if (couchParts.length) itemParts.push("Couches: " + couchParts.join(", "));
    return itemParts.join(", ");
  }

  function makePlantSummary() {
    return plantOptions
      .filter((plant) => form.plants[plant.key] > 0)
      .map((plant) => form.plants[plant.key] + " × " + plant.label + " pot plant" + (form.plants[plant.key] === 1 ? "" : "s"))
      .join(", ");
  }

  function makePackagingMaterialsSummary() {
    return packagingMaterialOptions
      .filter((material) => form.materialsRequested.includes(material.key))
      .map((material) => material.label)
      .join(", ");
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");

    if (!form.pickup.confirmed || !form.dropoff.confirmed) {
      setError("Please confirm both addresses before sending the move brief.");
      setStep(1);
      return;
    }
    if (!form.moveType) {
      setError("Choose the type of move that best describes this request.");
      setStep(2);
      return;
    }
    if (!form.preferredDate || !form.name.trim() || !form.phone.trim()) {
      setError("Please add your preferred date, name and phone number.");
      return;
    }
    if (form.confirmationChannel === "email" && !form.email.trim()) {
      setError("Add your email address so we can open a completed email for you.");
      return;
    }
    if (!form.consentAccepted) {
      setError("Please confirm that the move details can be sent to On The Move Again for quotation and follow-up.");
      return;
    }

    const inventorySummary = makeInventorySummary();
    const plantSummary = makePlantSummary();
    const packagingMaterialsSummary = makePackagingMaterialsSummary();
    const inventoryNote = inventorySummary || form.otherItems.trim()
      ? "Items: " + (inventorySummary || "No quantities listed") + (form.otherItems.trim() ? " · Other: " + form.otherItems.trim() : "") + "."
      : "";
    const detailsNote = [
      form.fridgeSize ? "Fridge: " + form.fridgeSize + "." : "",
      form.bedSize ? "Bed: " + form.bedSize + "." : "",
      plantSummary ? "Pot plants: " + plantSummary + "." : "",
      form.wrapping ? "Wrapping and bubble wrap: " + form.wrapping + "." : "",
      form.packagingMaterials ? "Packaging material: " + form.packagingMaterials + "." : "",
      packagingMaterialsSummary ? "Packaging materials requested: " + packagingMaterialsSummary + "." : "",
      form.packingHelp ? "Packing help: " + form.packingHelp + "." : "",
      form.dismantling ? "Dismantling and assembling: " + form.dismantling + "." : "",
      form.boxesAndTapes ? "Boxes and tapes: " + form.boxesAndTapes + "." : "",
      form.bubbleAndPalletWrap ? "Bubble and pallet wrap: " + form.bubbleAndPalletWrap + "." : "",
      form.storageNeeded ? "Storage facilities: " + form.storageNeeded + "." : "",
      form.truckRestrictions.trim() ? "Estate or truck restrictions: " + form.truckRestrictions.trim() : "",
      photos.length ? "Photos supplied: " + photos.length + " item photo" + (photos.length === 1 ? "" : "s") + "." : "",
    ].filter(Boolean).join("\n");

    const requestPayload = {
      from: form.pickup.text,
      to: form.dropoff.text,
      date: form.preferredDate,
      moveType: moveTypeLabel(form.moveType),
      services: [
        form.moveType === "delivery" ? "Commercial deliveries" : "",
        form.packingHelp === "Yes" ? "Packing services" : "",
        form.dismantling === "Yes" ? "Dismantling & assembling services" : "",
        form.boxesAndTapes === "Yes" ? "Supply of boxes & tapes" : "",
        form.storageNeeded === "Yes" ? "Storage facilities" : "",
        form.bubbleAndPalletWrap === "Yes" ? "Supply of bubble & pallet wrap" : "",
      ].filter(Boolean),
      access: "Pickup: " + accessLabel(form.pickupAccess) + " · Drop-off: " + accessLabel(form.dropoffAccess),
      notes: [form.notes.trim(), inventoryNote, detailsNote].filter(Boolean).join("\n\n"),
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      confirmationChannel: form.confirmationChannel,
      consent: {
        accepted: form.consentAccepted,
        name: form.name.trim(),
        version: QUOTE_CONSENT_VERSION,
      },
      preferredTime: form.preferredTime,
      inventory: form.inventory,
      otherItems: form.otherItems.trim(),
      details: {
        couches: form.couches,
        fridgeType: form.fridgeSize,
        bedSize: form.bedSize,
        plants: form.plants,
        wrapping: form.wrapping,
        packagingMaterials: form.packagingMaterials,
        materialsRequested: form.materialsRequested,
        packingHelp: form.packingHelp,
        dismantling: form.dismantling,
        boxesAndTapes: form.boxesAndTapes,
        bubbleAndPalletWrap: form.bubbleAndPalletWrap,
        storageNeeded: form.storageNeeded,
        truckRestrictions: form.truckRestrictions.trim(),
      },
      photos: photos.map(({ file }) => ({ name: file.name, type: file.type, size: file.size })),
    };

    const requestBody = new FormData();
    requestBody.append("payload", JSON.stringify(requestPayload));
    photos.forEach(({ file }) => requestBody.append("photos", file, file.name));

    setSubmitting(true);
    try {
      const response = await fetch("/api/quote", { method: "POST", body: requestBody });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not submit move details");
      setResult({ reference: data.reference, consentAcceptedAt: data.consentAcceptedAt });
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  function startAgain() {
    clearPhotos();
    setForm(createInitialForm());
    setStep(1);
    setResult(null);
    setError("");
  }

  if (compact) {
    return (
      <div className="quoteCard quoteLauncher" id="quote">
        <div className="quoteLauncherTop">
          <div><p className="eyebrow">DETAILED MOVE BRIEF</p><h3>Tell us what needs moving.</h3></div>
          <span className="stepCounter">3</span>
        </div>
        <p className="quoteLauncherText">Share your route, items, access details and photos. The team will review everything and send your quote.</p>
        <div className="quoteLauncherSteps"><span>1 Route</span><span>2 Details</span><span>3 Send</span></div>
        <a className="btn btnPrimary btnFull" href="/quote">Send move details <ArrowRightIcon /></a>
        <small className="quoteLauncherNote">Choose WhatsApp or email when your brief is complete.</small>
      </div>
    );
  }

  if (result) {
    const inventorySummary = makeInventorySummary();
    const plantSummary = makePlantSummary();
    const packagingMaterialsSummary = makePackagingMaterialsSummary();
    const handoffText = [
      "Hi On The Move Again,",
      "",
      "I completed a detailed move brief for a manual quote.",
      "Reference: " + result.reference,
      "Quote request consent recorded: " + new Date(result.consentAcceptedAt).toLocaleString("en-ZA"),
      "Name: " + form.name,
      "Move type: " + moveTypeLabel(form.moveType),
      "Pickup: " + form.pickup.text,
      "Drop-off: " + form.dropoff.text,
      "Preferred date: " + form.preferredDate,
      form.preferredTime ? "Preferred time: " + form.preferredTime : "",
      inventorySummary ? "Items: " + inventorySummary : "",
      form.otherItems.trim() ? "Other items: " + form.otherItems.trim() : "",
      form.fridgeSize ? "Fridge: " + form.fridgeSize : "",
      form.bedSize ? "Bed: " + form.bedSize : "",
      plantSummary ? "Pot plants: " + plantSummary : "",
      packagingMaterialsSummary ? "Packaging materials requested: " + packagingMaterialsSummary : "",
      form.dismantling === "Yes" ? "Dismantling and assembling: requested" : "",
      form.storageNeeded === "Yes" ? "Storage facilities: requested" : "",
      form.truckRestrictions.trim() ? "Estate or truck restrictions: " + form.truckRestrictions.trim() : "",
      photos.length ? "Photos supplied: " + photos.length : "",
      "",
      "Please review the details and send me the quote.",
    ].filter(Boolean).join("\n");
    const handoffBody = encodeURIComponent(handoffText);
    const handoffSubject = encodeURIComponent("On The Move Again move brief " + result.reference);
    const isEmail = form.confirmationChannel === "email";
    const handoffHref = isEmail
      ? "mailto:" + company.email + "?subject=" + handoffSubject + "&body=" + handoffBody
      : "https://wa.me/" + company.phoneRaw + "?text=" + handoffBody;

    return (
      <div className="quoteCard quoteSuccess quoteCard--calculator" id="quote">
        <div className="successIcon"><CheckIcon /></div>
        <p className="eyebrow">MOVE BRIEF READY</p>
        <h3>Thanks, {formatFirstName(form.name)}.</h3>
        <p>Your detailed move brief has been registered for the On The Move Again team to review. Your reference is <strong>{result.reference}</strong>.</p>
        <div className="briefSubmitted">
          <span>Next step</span>
          <strong>The team will review everything and send your quote.</strong>
          <small>{photos.length ? photos.length + " item photo" + (photos.length === 1 ? "" : "s") + " included for review." : "No item photos were added."}</small>
          <small>Your quote request consent was recorded with this brief.</small>
        </div>
        <p className="handoffNote">Open your chosen channel below to send the completed brief to On The Move Again.</p>
        <a className="btn btnDark btnFull" target={isEmail ? undefined : "_blank"} rel={isEmail ? undefined : "noreferrer"} href={handoffHref}>
          {isEmail ? <MailIcon /> : <WhatsAppIcon />} {isEmail ? "Open completed email" : "Send on WhatsApp"} <ArrowRightIcon />
        </a>
        <button type="button" className="textButton" onClick={startAgain}>Start another move brief</button>
      </div>
    );
  }

  return (
    <form className="quoteCard quoteCard--calculator" id="quote" onSubmit={submit}>
      <div className="quoteHead">
        <div>
          <p className="eyebrow">REQUEST A DETAILED QUOTE</p>
          <h3>{step === 1 ? "Where is the move taking place?" : step === 2 ? "Tell us what needs attention." : "Send your move brief."}</h3>
          <p>{step === 1 ? "Start with the collection and delivery locations." : step === 2 ? "Add the details that help the team prepare a useful manual quote." : "Choose WhatsApp or email and send the completed details to On The Move Again."}</p>
        </div>
        <span className="stepCounter">{step}/3</span>
      </div>
      <div className="progressTrack"><span style={{ width: progress }} /></div>
      <div className="quoteProgress" role="list" aria-label="Move brief progress">
        {["Route", "Details", "Send"].map((label, index) => (
          <span
            className={step === index + 1 ? "active" : step > index + 1 ? "complete" : ""}
            key={label}
            role="listitem"
            aria-current={step === index + 1 ? "step" : undefined}
          >
            <b>{step > index + 1 ? "✓" : index + 1}</b>{label}
          </span>
        ))}
      </div>

      {step === 1 && (
        <div className="formStep">
          <div className="quoteStepIntro"><h4>Your route</h4><p>Use a street, suburb, complex or landmark. If we cannot match the exact address, you can use it as entered.</p></div>
          <AddressInput field="pickup" label="Pickup address" address={form.pickup} suggestions={activeAddress === "pickup" ? suggestions : []} onlineSearchState={addressSearchState.pickup} onFocus={() => focusAddress("pickup")} onChange={(value) => updateAddress("pickup", value)} onSelect={(location) => selectAddress("pickup", location)} onUseTyped={() => useTypedAddress("pickup")} onSearchOnline={() => void searchOnline("pickup")} />
          <AddressInput field="dropoff" label="Drop-off address" address={form.dropoff} suggestions={activeAddress === "dropoff" ? suggestions : []} onlineSearchState={addressSearchState.dropoff} onFocus={() => focusAddress("dropoff")} onChange={(value) => updateAddress("dropoff", value)} onSelect={(location) => selectAddress("dropoff", location)} onUseTyped={() => useTypedAddress("dropoff")} onSearchOnline={() => void searchOnline("dropoff")} />
          <div className="addressProgress"><span className={form.pickup.confirmed ? "complete" : ""}>{form.pickup.confirmed ? "✓" : "1"} Pickup {form.pickup.confirmed ? "confirmed" : "match"}</span><span className={form.dropoff.confirmed ? "complete" : ""}>{form.dropoff.confirmed ? "✓" : "2"} Drop-off {form.dropoff.confirmed ? "confirmed" : "match"}</span></div>
          <p className="quoteFinePrint">The team will confirm exact access, vehicle requirements and availability before preparing the quote.</p>
          <div className="formActions"><button type="button" className="btn btnPrimary btnGrow" onClick={continueFromRoute}>Continue to details <ArrowRightIcon /></button></div>
        </div>
      )}

      {step === 2 && (
        <div className="formStep">
          <div className="quoteStepIntro"><h4>Move type</h4><p>Choose the option that best describes the request.</p></div>
          <div className="moveTypeGrid">
            {moveTypeOptions.map((option) => <button type="button" key={option.value} className={"moveSizeOption " + (form.moveType === option.value ? "selected" : "")} aria-pressed={form.moveType === option.value} onClick={() => setField("moveType", option.value)}><strong>{option.label}</strong><span>{option.description}</span></button>)}
          </div>

          <div className="quoteStepIntro quoteStepIntro--row"><h4>Room-by-room inventory</h4><span>{itemCount} selected</span></div>
          <p className="inventoryPlannerHint">Add quantities in each room so the team can plan the right vehicle, crew and handling approach.</p>
          <div className="inventoryPlanner">
            {inventoryRoomGroups.map((room) => (
              <InventoryRoom
                key={room.id}
                room={room}
                inventory={form.inventory}
                couches={form.couches}
                onAdjustInventory={adjustInventory}
                onAdjustCouch={adjustCouch}
              />
            ))}
          </div>

          <label>Additional items <span className="optional">not listed above</span><textarea rows={3} value={form.otherItems} onChange={(event) => setField("otherItems", event.target.value)} placeholder="List any additional items, unusual furniture or fragile pieces." /></label>

          <div className="fieldRow">
            <label>Fridge size <span className="optional">if applicable</span><select value={form.fridgeSize} onChange={(event) => setField("fridgeSize", event.target.value)}><option value="">Not specified</option><option value="Normal fridge">Normal fridge</option><option value="Side-by-side fridge">Side-by-side fridge</option><option value="Two-door fridge, one door above the other">Two-door fridge, one door above the other</option></select></label>
            <label>Bed size <span className="optional">if applicable</span><select value={form.bedSize} onChange={(event) => setField("bedSize", event.target.value)}><option value="">Not specified</option><option value="Single">Single</option><option value="Queen">Queen</option><option value="King">King</option></select></label>
          </div>

          <div className="quoteStepIntro quoteStepIntro--row"><h4>Pot plants</h4><span>{plantCount} selected</span></div>
          <div className="plantGrid">
            {plantOptions.map((plant) => <div className="inventoryItem" key={plant.key}><div className="inventoryItemInfo"><strong>{plant.label}</strong><span>Pot plant</span></div><div className="quantityControl"><button type="button" aria-label={"Remove " + plant.label + " pot plant"} disabled={!form.plants[plant.key]} onClick={() => adjustPlant(plant.key, -1)}>−</button><span>{form.plants[plant.key]}</span><button type="button" aria-label={"Add " + plant.label + " pot plant"} onClick={() => adjustPlant(plant.key, 1)}>+</button></div></div>)}
          </div>

          <div className="fieldRow">
            <fieldset><legend>Wrapping and bubble wrap</legend><div className="choiceGrid">{["Not needed", "We will wrap", "Need wrapping help"].map((option) => <label className={"choice " + (form.wrapping === option ? "selected" : "")} key={option}><input type="radio" name="wrapping" value={option} checked={form.wrapping === option} onChange={(event) => setField("wrapping", event.target.value)} />{option}</label>)}</div></fieldset>
            <fieldset><legend>Packaging material</legend><div className="choiceGrid">{["Yes", "No", "Not sure"].map((option) => <label className={"choice " + (form.packagingMaterials === option ? "selected" : "")} key={option}><input type="radio" name="packagingMaterials" value={option} checked={form.packagingMaterials === option} onChange={(event) => setField("packagingMaterials", event.target.value)} />{option}</label>)}</div></fieldset>
          </div>

          <fieldset className="materialsFieldset">
            <legend>Packaging materials requested <span className="optional">optional</span></legend>
            <p className="fieldsetHint">Select the supplies you may need. The team will confirm availability and pricing with the quote.</p>
            <div className="materialChoiceGrid">
              {packagingMaterialOptions.map((material) => {
                const selected = form.materialsRequested.includes(material.key);
                return (
                  <label className={"materialChoice " + (selected ? "selected" : "")} key={material.key}>
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={(event) => setField("materialsRequested", event.target.checked
                        ? [...form.materialsRequested, material.key]
                        : form.materialsRequested.filter((key) => key !== material.key))}
                    />
                    <span><strong>{material.label}</strong><small>{material.hint}</small></span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="fieldRow">
            <fieldset><legend>Help with packing</legend><div className="choiceGrid">{["Yes", "No", "Not sure"].map((option) => <label className={"choice " + (form.packingHelp === option ? "selected" : "")} key={option}><input type="radio" name="packingHelp" value={option} checked={form.packingHelp === option} onChange={(event) => setField("packingHelp", event.target.value)} />{option}</label>)}</div></fieldset>
            <fieldset><legend>Dismantling &amp; assembling</legend><div className="choiceGrid">{["Yes", "No", "Not sure"].map((option) => <label className={"choice " + (form.dismantling === option ? "selected" : "")} key={option}><input type="radio" name="dismantling" value={option} checked={form.dismantling === option} onChange={(event) => setField("dismantling", event.target.value)} />{option}</label>)}</div></fieldset>
          </div>

          <div className="fieldRow">
            <fieldset><legend>Supply of boxes &amp; tapes</legend><div className="choiceGrid">{["Yes", "No", "Not sure"].map((option) => <label className={"choice " + (form.boxesAndTapes === option ? "selected" : "")} key={option}><input type="radio" name="boxesAndTapes" value={option} checked={form.boxesAndTapes === option} onChange={(event) => setField("boxesAndTapes", event.target.value)} />{option}</label>)}</div></fieldset>
            <fieldset><legend>Supply of bubble &amp; pallet wrap</legend><div className="choiceGrid">{["Yes", "No", "Not sure"].map((option) => <label className={"choice " + (form.bubbleAndPalletWrap === option ? "selected" : "")} key={option}><input type="radio" name="bubbleAndPalletWrap" value={option} checked={form.bubbleAndPalletWrap === option} onChange={(event) => setField("bubbleAndPalletWrap", event.target.value)} />{option}</label>)}</div></fieldset>
          </div>

          <fieldset><legend>Storage facilities</legend><div className="choiceGrid">{["Yes", "No", "Not sure"].map((option) => <label className={"choice " + (form.storageNeeded === option ? "selected" : "")} key={option}><input type="radio" name="storageNeeded" value={option} checked={form.storageNeeded === option} onChange={(event) => setField("storageNeeded", event.target.value)} />{option}</label>)}</div></fieldset>

          <div className="quotePhotoBlock">
            <div className="quoteStepIntro"><h4>Upload photos of your items <span className="optional">optional</span></h4><p>Photos of bulky, fragile or awkward items help the team assess the move more accurately.</p></div>
            <div className="photoUpload"><label className="photoUploadButton" htmlFor="quote-photos"><CameraIcon /><span><strong>{photos.length > 0 ? "Add more photos" : "Choose item photos"}</strong><small>JPG, PNG, WEBP or HEIC · up to {MAX_PHOTOS} photos · 8 MB each</small></span></label><input id="quote-photos" type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" multiple onChange={handlePhotoChange} /></div>
            {photos.length > 0 && <div className="photoGrid" aria-label="Selected item photos">{photos.map((photo, index) => <figure className="photoPreview" key={photo.id}><img src={photo.previewUrl} alt={"Selected item photo " + (index + 1)} /><button type="button" aria-label={"Remove photo " + (index + 1)} onClick={() => removePhoto(photo.id)}>×</button><figcaption>{photo.file.name}</figcaption></figure>)}</div>}
          </div>

          <div className="fieldRow">
            <label>Pickup access<select value={form.pickupAccess} onChange={(event) => setField("pickupAccess", event.target.value as AccessId)}>{accessOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
            <label>Drop-off access<select value={form.dropoffAccess} onChange={(event) => setField("dropoffAccess", event.target.value as AccessId)}>{accessOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
          </div>
          <label>Estate, complex or truck restrictions <span className="optional">optional</span><textarea rows={3} value={form.truckRestrictions} onChange={(event) => setField("truckRestrictions", event.target.value)} placeholder="e.g. estate only allows trucks under 3 m or 5 tons; loading times must be booked" /></label>

          <div className="formActions"><button type="button" className="btn btnGhost" onClick={() => setStep(1)}>Back</button><button type="button" className="btn btnPrimary btnGrow" onClick={continueFromDetails}>Continue to send <ArrowRightIcon /></button></div>
        </div>
      )}

      {step === 3 && (
        <div className="formStep">
          <div className="briefReview"><span>Move brief summary</span><strong>{moveTypeLabel(form.moveType)}</strong><div><b>From</b><span>{form.pickup.text}</span></div><div><b>To</b><span>{form.dropoff.text}</span></div><div><b>Load details</b><span>{itemCount} listed item{itemCount === 1 ? "" : "s"}{plantCount ? " · " + plantCount + " pot plant" + (plantCount === 1 ? "" : "s") : ""}{photos.length ? " · " + photos.length + " photo" + (photos.length === 1 ? "" : "s") : ""}</span></div></div>
          <div className="fieldRow">
            <label>Preferred move date *<input type="date" min={minDate} value={form.preferredDate} onChange={(event) => setField("preferredDate", event.target.value)} required /></label>
            <label>Preferred arrival time<select value={form.preferredTime} onChange={(event) => setField("preferredTime", event.target.value)}><option value="08:00">08:00</option><option value="10:00">10:00</option><option value="12:00">12:00</option><option value="14:00">14:00</option></select></label>
          </div>
          <div className="fieldRow">
            <label>Your name *<input value={form.name} onChange={(event) => setField("name", event.target.value)} placeholder="Full name" required /></label>
            <label>Phone / WhatsApp number *<input type="tel" value={form.phone} onChange={(event) => setField("phone", event.target.value)} placeholder="+27 ..." required /></label>
          </div>
          <div className="confirmationChoice"><div className="quoteStepIntro"><h4>How should the completed brief be sent?</h4><p>Choose WhatsApp or email. The team will review the details and send your quote manually.</p></div><div className="confirmationGrid"><button type="button" className={"confirmationOption " + (form.confirmationChannel === "whatsapp" ? "selected" : "")} onClick={() => setField("confirmationChannel", "whatsapp")}><WhatsAppIcon /><span><strong>WhatsApp</strong><small>Open a ready-to-send message</small></span></button><button type="button" className={"confirmationOption " + (form.confirmationChannel === "email" ? "selected" : "")} onClick={() => setField("confirmationChannel", "email")}><MailIcon /><span><strong>Email</strong><small>Open a ready-to-send email</small></span></button></div><p className="confirmationHint">The final step opens your selected channel with the move details and reference.</p></div>
          {form.confirmationChannel === "email" && <label>Email address *<input type="email" value={form.email} onChange={(event) => setField("email", event.target.value)} placeholder="you@example.com" required /></label>}
          <label>Anything else the team should know? <span className="optional">optional</span><textarea rows={4} value={form.notes} onChange={(event) => setField("notes", event.target.value)} placeholder="Mention fragile items, timing, access or special instructions." /></label>
          <div className="consentAcceptance">
            <div className="quoteStepIntro">
              <h4>Quote request consent</h4>
              <p>Confirm that OTMA may use these details and selected photos to prepare your quote and contact you about this move.</p>
            </div>
            <label className="consentCheckbox">
              <input
                type="checkbox"
                checked={form.consentAccepted}
                onChange={(event) => {
                  const accepted = event.target.checked;
                  setForm((current) => ({ ...current, consentAccepted: accepted }));
                  setError("");
                }}
              />
              <span>I confirm these details are accurate to the best of my knowledge and may be used to prepare and follow up on this quote request.</span>
            </label>
            <p className="consentAcceptanceNote">This is quote-request consent only. Any booking terms can be supplied separately with the formal quotation.</p>
          </div>
          <div className="privacyNote">Your move details and selected photos are sent to On The Move Again for review. There is no online price calculation—the team will assess the full brief and send the quote.</div>
          {error && <p className="formError" role="alert">{error}</p>}
          <div className="formActions"><button type="button" className="btn btnGhost" onClick={() => setStep(2)}>Back</button><button type="submit" className="btn btnPrimary btnGrow" disabled={submitting}>{submitting ? "Preparing your brief…" : "Submit move brief"} <ArrowRightIcon /></button></div>
        </div>
      )}

      {error && step !== 3 && <p className="formError" role="alert">{error}</p>}
    </form>
  );
}
