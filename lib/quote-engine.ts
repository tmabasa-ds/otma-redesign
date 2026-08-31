export type MoveSizeId =
  | "single"
  | "bachelor"
  | "one-bedroom"
  | "two-bedroom"
  | "three-bedroom"
  | "four-bedroom"
  | "office";

export type AddressSelection = {
  text: string;
  locationId?: string;
  confirmed: boolean;
};

export type AccessId = "standard" | "lift" | "stairs" | "long_carry" | "restricted";

export type InventoryKey =
  | "wardrobe"
  | "fridge"
  | "tv"
  | "washing-machine"
  | "dishwasher"
  | "tumble-dryer"
  | "bed"
  | "couch"
  | "dining-table"
  | "chairs"
  | "chest-of-drawers"
  | "tv-stand"
  | "boxes"
  | "microwave"
  | "desk"
  | "coffee-table"
  | "garden-furniture"
  | "braai"
  | "bicycle"
  | "lawnmower";

export type Location = {
  id: string;
  label: string;
  display: string;
  detail: string;
  aliases: string[];
  lat: number;
  lng: number;
};

export type QuoteEstimate = {
  distanceKm: number;
  routeLabel: string;
  basePrice: number;
  routeSurcharge: number;
  inventorySurcharge: number;
  accessSurcharge: number;
  extrasSurcharge: number;
  total: number;
  helpers: number;
  estimatedHours: number;
  itemCount: number;
  inventoryRows: Array<{ label: string; count: number }>;
  extraLabels: string[];
};

export const moveSizes: Array<{
  id: MoveSizeId;
  label: string;
  description: string;
  basePrice: number;
  capacity: number;
  helpers: number;
  baseHours: number;
}> = [
  { id: "single", label: "Single item", description: "One or two large items", basePrice: 950, capacity: 3, helpers: 2, baseHours: 2 },
  { id: "bachelor", label: "Bachelor / backroom", description: "A compact room or small load", basePrice: 1_500, capacity: 6, helpers: 2, baseHours: 2.7 },
  { id: "one-bedroom", label: "1-bedroom", description: "A small flat or apartment", basePrice: 1_950, capacity: 9, helpers: 2, baseHours: 3.5 },
  { id: "two-bedroom", label: "2-bedroom", description: "A medium household move", basePrice: 2_600, capacity: 14, helpers: 2, baseHours: 4.5 },
  { id: "three-bedroom", label: "3-bedroom", description: "A larger family-home move", basePrice: 3_450, capacity: 20, helpers: 3, baseHours: 6 },
  { id: "four-bedroom", label: "4+ bedrooms", description: "A full household or larger load", basePrice: 4_500, capacity: 28, helpers: 4, baseHours: 7.5 },
  { id: "office", label: "Office / commercial", description: "Desks, equipment and workplace furniture", basePrice: 5_200, capacity: 30, helpers: 4, baseHours: 7 },
];

export const inventoryCatalog: Array<{
  key: InventoryKey;
  label: string;
  hint: string;
  load: number;
}> = [
  { key: "wardrobe", label: "Wardrobe", hint: "Large cupboard", load: 2 },
  { key: "fridge", label: "Fridge", hint: "Single or double door", load: 2 },
  { key: "tv", label: "TV", hint: "Any size", load: 1 },
  { key: "washing-machine", label: "Washing machine", hint: "Front or top loader", load: 1 },
  { key: "dishwasher", label: "Dishwasher", hint: "Freestanding or integrated", load: 1 },
  { key: "tumble-dryer", label: "Tumble dryer", hint: "Freestanding or stacked", load: 1 },
  { key: "bed", label: "Bed / mattress", hint: "Single to king", load: 2 },
  { key: "couch", label: "Couch", hint: "One to three seater", load: 2 },
  { key: "dining-table", label: "Dining table", hint: "Table only", load: 1.5 },
  { key: "chairs", label: "Chairs", hint: "Dining or office", load: 0.5 },
  { key: "chest-of-drawers", label: "Chest of drawers", hint: "Bedroom storage", load: 1.5 },
  { key: "tv-stand", label: "TV stand", hint: "Cabinet or unit", load: 1 },
  { key: "boxes", label: "Boxes / bags", hint: "Packed items", load: 0.5 },
  { key: "microwave", label: "Microwave", hint: "Small appliance", load: 0.5 },
  { key: "desk", label: "Desk", hint: "Office or study", load: 1.5 },
  { key: "coffee-table", label: "Coffee table", hint: "Lounge table", load: 1 },
  { key: "garden-furniture", label: "Garden furniture", hint: "Outdoor chairs or table", load: 1.5 },
  { key: "braai", label: "Braai", hint: "Gas or charcoal braai", load: 1 },
  { key: "bicycle", label: "Bicycle", hint: "Any size", load: 0.75 },
  { key: "lawnmower", label: "Lawnmower", hint: "Push or ride-on", load: 1.5 },
];

export const accessOptions: Array<{ value: AccessId; label: string; surcharge: number }> = [
  { value: "standard", label: "Ground level / easy parking", surcharge: 0 },
  { value: "lift", label: "Lift available, short carry", surcharge: 0 },
  { value: "stairs", label: "Stairs or no working lift", surcharge: 150 },
  { value: "long_carry", label: "Long carry from parking", surcharge: 200 },
  { value: "restricted", label: "Restricted gate or difficult access", surcharge: 250 },
];

export const extraOptions: Array<{ id: string; label: string; description: string; surcharge: number }> = [
  { id: "extra-help", label: "Extra help", description: "An additional pair of hands", surcharge: 250 },
  { id: "packing", label: "Packing", description: "Help preparing items for the move", surcharge: 800 },
  { id: "dismantling", label: "Dismantling", description: "Furniture taken apart before loading", surcharge: 450 },
  { id: "reassembly", label: "Reassembly", description: "Furniture put back together at delivery", surcharge: 450 },
  { id: "extra-trailer", label: "Extra trailer", description: "More carrying capacity", surcharge: 300 },
  { id: "storage", label: "Storage", description: "Short-term storage support", surcharge: 350 },
];

// These locations keep the calculator useful without requiring a mapping API key.
// Users can still choose “Use this address as entered” for any location not listed.
export const locations: Location[] = [
  { id: "midrand", label: "Midrand", display: "Midrand, Gauteng", detail: "Midrand, City of Johannesburg Metropolitan Municipality, Gauteng", aliases: ["midrand", "carlswald", "waterfall", "halfway house", "kyalami"], lat: -25.9992, lng: 28.1263 },
  { id: "sandton", label: "Sandton", display: "Sandton, Gauteng", detail: "Sandton, City of Johannesburg Metropolitan Municipality, Gauteng", aliases: ["sandton", "morningside", "rivonia", "bryanston", "fourways"], lat: -26.1076, lng: 28.0567 },
  { id: "rosebank", label: "Rosebank", display: "Rosebank, Johannesburg", detail: "Rosebank, City of Johannesburg Metropolitan Municipality, Gauteng", aliases: ["rosebank", "parkwood", "illovo"], lat: -26.1467, lng: 28.0436 },
  { id: "johannesburg", label: "Johannesburg", display: "Johannesburg, Gauteng", detail: "Johannesburg, Gauteng", aliases: ["johannesburg", "joburg", "city centre", "city bowl"], lat: -26.2041, lng: 28.0473 },
  { id: "randburg", label: "Randburg", display: "Randburg, Johannesburg", detail: "Randburg, City of Johannesburg Metropolitan Municipality, Gauteng", aliases: ["randburg", "ferndale", "roosevelt park"], lat: -26.0936, lng: 27.9960 },
  { id: "soweto", label: "Soweto", display: "Soweto, Gauteng", detail: "Soweto, City of Johannesburg Metropolitan Municipality, Gauteng", aliases: ["soweto", "roodepoort south"], lat: -26.2485, lng: 27.8540 },
  { id: "pretoria", label: "Pretoria", display: "Pretoria, Gauteng", detail: "Pretoria, City of Tshwane Metropolitan Municipality, Gauteng", aliases: ["pretoria", "tshwane", "arcadia", "hatfield", "menlyn"], lat: -25.7479, lng: 28.2293 },
  { id: "centurion", label: "Centurion", display: "Centurion, Gauteng", detail: "Centurion, City of Tshwane Metropolitan Municipality, Gauteng", aliases: ["centurion", "irene", "rooihuiskraal"], lat: -25.8603, lng: 28.1894 },
  { id: "kempton-park", label: "Kempton Park", display: "Kempton Park, Gauteng", detail: "Kempton Park, Ekurhuleni, Gauteng", aliases: ["kempton park", "kempton", "bonaero park"], lat: -26.1000, lng: 28.2333 },
  { id: "edenvale", label: "Edenvale", display: "Edenvale, Gauteng", detail: "Edenvale, Ekurhuleni, Gauteng", aliases: ["edenvale", "modderfontein"], lat: -26.1406, lng: 28.1525 },
  { id: "bedfordview", label: "Bedfordview", display: "Bedfordview, Gauteng", detail: "Bedfordview, Ekurhuleni, Gauteng", aliases: ["bedfordview", "senderwood", "germiston north"], lat: -26.1707, lng: 28.1378 },
  { id: "boksburg", label: "Boksburg", display: "Boksburg, Gauteng", detail: "Boksburg, Ekurhuleni, Gauteng", aliases: ["boksburg", "bartlett"], lat: -26.2125, lng: 28.2599 },
  { id: "benoni", label: "Benoni", display: "Benoni, Gauteng", detail: "Benoni, Ekurhuleni, Gauteng", aliases: ["benoni", "fourways east"], lat: -26.1885, lng: 28.3200 },
  { id: "rustenburg", label: "Rustenburg", display: "Rustenburg, North West", detail: "Rustenburg, North West", aliases: ["rustenburg"], lat: -25.6676, lng: 27.2424 },
  { id: "polokwane", label: "Polokwane", display: "Polokwane, Limpopo", detail: "Polokwane, Limpopo", aliases: ["polokwane", "pietersburg"], lat: -23.8962, lng: 29.4486 },
  { id: "mbombela", label: "Mbombela", display: "Mbombela, Mpumalanga", detail: "Mbombela, Mpumalanga", aliases: ["mbombela", "nelspruit"], lat: -25.4753, lng: 30.9694 },
  { id: "durban", label: "Durban", display: "Durban, KwaZulu-Natal", detail: "Durban, KwaZulu-Natal", aliases: ["durban", "umhlanga", "berea"], lat: -29.8587, lng: 31.0218 },
  { id: "cape-town", label: "Cape Town", display: "Cape Town, Western Cape", detail: "Cape Town, Western Cape", aliases: ["cape town", "bellville", "claremont", "stellenbosch"], lat: -33.9249, lng: 18.4241 },
  { id: "bloemfontein", label: "Bloemfontein", display: "Bloemfontein, Free State", detail: "Bloemfontein, Free State", aliases: ["bloemfontein", "bloem"], lat: -29.0852, lng: 26.1596 },
  { id: "kimberley", label: "Kimberley", display: "Kimberley, Northern Cape", detail: "Kimberley, Northern Cape", aliases: ["kimberley"], lat: -28.7282, lng: 24.7499 },
  { id: "gqeberha", label: "Gqeberha", display: "Gqeberha, Eastern Cape", detail: "Gqeberha, Eastern Cape", aliases: ["gqeberha", "port elizabeth", "walmer"], lat: -33.9608, lng: 25.6022 },
  { id: "east-london", label: "East London", display: "East London, Eastern Cape", detail: "East London, Eastern Cape", aliases: ["east london"], lat: -33.0153, lng: 27.9116 },
];

const normalise = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

export function searchLocations(query: string): Location[] {
  const needle = normalise(query);
  if (needle.length < 2) return [];

  return locations
    .filter((location) => normalise([location.label, location.display, location.detail, ...location.aliases].join(" ")).includes(needle))
    .slice(0, 5);
}

export function getLocation(id?: string): Location | undefined {
  return id ? locations.find((location) => location.id === id) : undefined;
}

function haversineKm(a: Location, b: Location) {
  const earthRadius = 6371;
  const latDelta = ((b.lat - a.lat) * Math.PI) / 180;
  const lngDelta = ((b.lng - a.lng) * Math.PI) / 180;
  const latitudeA = (a.lat * Math.PI) / 180;
  const latitudeB = (b.lat * Math.PI) / 180;
  const value = Math.sin(latDelta / 2) ** 2 + Math.cos(latitudeA) * Math.cos(latitudeB) * Math.sin(lngDelta / 2) ** 2;
  return earthRadius * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
}

function estimateDistance(pickup: AddressSelection, dropoff: AddressSelection) {
  const pickupLocation = getLocation(pickup.locationId);
  const dropoffLocation = getLocation(dropoff.locationId);

  if (pickupLocation && dropoffLocation) {
    return Math.max(6, Math.round(haversineKm(pickupLocation, dropoffLocation) * 1.22));
  }

  const pickupText = normalise(pickup.text);
  const dropoffText = normalise(dropoff.text);
  if (pickupText && pickupText === dropoffText) return 8;

  // A transparent fallback keeps the estimator useful for a new suburb even
  // when it is not in the built-in directory and no map key is configured.
  return 45;
}

function roundToNearestFifty(value: number) {
  return Math.max(500, Math.round(value / 50) * 50);
}

export function getMoveSize(id: MoveSizeId) {
  return moveSizes.find((size) => size.id === id) ?? moveSizes[2];
}

export function calculateEstimate(input: {
  pickup: AddressSelection;
  dropoff: AddressSelection;
  moveSize: MoveSizeId;
  inventory: Record<InventoryKey, number>;
  pickupAccess: AccessId;
  dropoffAccess: AccessId;
  extras: string[];
}): QuoteEstimate {
  const size = getMoveSize(input.moveSize);
  const distanceKm = estimateDistance(input.pickup, input.dropoff);
  const routeLabel = distanceKm <= 60 ? "Local route" : distanceKm <= 250 ? "Regional route" : "Long-distance route";
  const inventoryRows = inventoryCatalog
    .map((item) => ({ label: item.label, count: input.inventory[item.key] ?? 0 }))
    .filter((item) => item.count > 0);
  const itemCount = inventoryRows.reduce((total, item) => total + item.count, 0);
  const load = inventoryCatalog.reduce((total, item) => total + (input.inventory[item.key] ?? 0) * item.load, 0);
  const inventorySurcharge = Math.max(0, Math.ceil(load - size.capacity)) * 150;

  const routeSurcharge = distanceKm <= 60
    ? Math.max(0, Math.round((distanceKm - 10) * 3))
    : distanceKm <= 250
      ? Math.round(150 + (distanceKm - 60) * 4.25)
      : Math.round(950 + (distanceKm - 250) * 5.25);
  const accessSurcharge =
    (accessOptions.find((option) => option.value === input.pickupAccess)?.surcharge ?? 0)
    + (accessOptions.find((option) => option.value === input.dropoffAccess)?.surcharge ?? 0);
  const extrasSurcharge = input.extras.reduce(
    (total, extra) => total + (extraOptions.find((option) => option.id === extra)?.surcharge ?? 0),
    0,
  );
  const total = roundToNearestFifty(size.basePrice + routeSurcharge + inventorySurcharge + accessSurcharge + extrasSurcharge);
  const estimatedHours = Math.round((size.baseHours + itemCount * 0.18 + distanceKm / 70) * 10) / 10;

  return {
    distanceKm,
    routeLabel,
    basePrice: size.basePrice,
    routeSurcharge,
    inventorySurcharge,
    accessSurcharge,
    extrasSurcharge,
    total,
    helpers: size.helpers,
    estimatedHours,
    itemCount,
    inventoryRows,
    extraLabels: input.extras.map((extra) => extraOptions.find((option) => option.id === extra)?.label ?? extra),
  };
}

export function formatRand(value: number) {
  return `R ${value.toLocaleString("en-ZA")}`;
}
