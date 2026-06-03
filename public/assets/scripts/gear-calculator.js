const calculators = document.querySelectorAll("[data-calculator]");
const numberFormat = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

function numeric(form, key) {
  return Number(new FormData(form).get(key) || 0);
}

function value(form, key) {
  return String(new FormData(form).get(key) || "");
}

function animateNumber(node, next, format) {
  const current = Number(node.dataset.value || 0);
  const start = performance.now();
  const duration = 420;
  node.dataset.value = String(next);

  function frame(now) {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    const valueNow = current + (next - current) * eased;
    node.textContent = format(valueNow);
    if (progress < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

function setResult(form, number, format, note, color) {
  const main = form.closest(".calc-layout").querySelector("[data-result-main]");
  const noteNode = form.closest(".calc-layout").querySelector("[data-result-note]");
  animateNumber(main, number, format);
  noteNode.textContent = note;
  if (color) main.style.color = color;
}

function tentSize(form) {
  const people = Math.max(1, numeric(form, "people"));
  const gearInside = value(form, "gearInside") === "yes";
  const roomy = value(form, "comfort") === "roomy";
  const perPerson = gearInside || roomy ? (gearInside && roomy ? 30 : 25) : 18;
  const floor = people * perPerson;
  const capacity = Math.max(people, Math.ceil(floor / 18));
  const comfortCapacity = gearInside || roomy ? capacity + 1 : capacity;
  setResult(
    form,
    floor,
    (current) => `${comfortCapacity}-person tent · ${Math.round(current)} sq ft`,
    "Manufacturer capacity is usually tight. For comfort, compare this floor-space estimate with the actual tent dimensions and consider sizing up.",
    "#203d2a"
  );
}

function campWater(form) {
  const people = Math.max(1, numeric(form, "people"));
  const days = Math.max(0.5, numeric(form, "days"));
  const activity = value(form, "activity");
  const cooking = value(form, "cooking") === "yes";
  const base = activity === "high" ? 4.25 : activity === "medium" ? 3 : 2;
  const cook = cooking ? (activity === "high" ? 1 : 0.75) : 0;
  const liters = people * days * (base + cook);
  const gallons = liters / 3.785;
  setResult(
    form,
    liters,
    (current) => `${numberFormat.format(current)} L · ${numberFormat.format(current / 3.785)} gal`,
    "Treat this as a planning estimate. Add margin for dry camps, pets, salty meals, hot afternoons, and uncertain spigot access.",
    "#203d2a"
  );
}

function backpackWeight(form) {
  const body = Math.max(1, numeric(form, "bodyWeight"));
  const base = Math.max(0, numeric(form, "baseWeight"));
  const consumables = Math.max(0, numeric(form, "consumables"));
  const unit = value(form, "unit");
  const loaded = base + consumables;
  const percent = (loaded / body) * 100;
  const target = body * 0.2;
  const color = percent <= 20 ? "#203d2a" : percent <= 25 ? "#a66c43" : "#8a2f20";
  const status = percent <= 20 ? "green range" : percent <= 25 ? "amber range" : "red range";
  setResult(
    form,
    percent,
    (current) => `${numberFormat.format(current)}% · ${numberFormat.format(loaded)} ${unit}`,
    `This is the ${status}. A 20% planning target would be about ${numberFormat.format(target)} ${unit} loaded pack weight.`,
    color
  );
}

function sleepingBagTemp(form) {
  const low = numeric(form, "lowTemp");
  const coldSleeper = value(form, "coldSleeper") === "yes";
  const goodSystem = value(form, "sleepSystem") === "good";
  const buffer = 10 + (coldSleeper ? 10 : 0) + (goodSystem ? 0 : 5);
  const rating = low - buffer;
  setResult(
    form,
    rating,
    (current) => `${Math.round(current)}°F comfort target`,
    "Use comfort rating when available. A warm pad and dry sleep system matter as much as the number printed on the sleeping bag.",
    "#203d2a"
  );
}

function firewood(form) {
  const nights = Math.max(1, numeric(form, "nights"));
  const hours = Math.max(0.5, numeric(form, "hours"));
  const size = value(form, "fireSize");
  const poundsPerHour = size === "large" ? 5 : size === "medium" ? 3.5 : 2;
  const pounds = nights * hours * poundsPerHour;
  const bundles = Math.ceil(pounds / 6);
  setResult(
    form,
    pounds,
    (current) => `${numberFormat.format(current)} lb · ${Math.max(1, Math.ceil(current / 6))} bundles`,
    "Bundle size, wood species, moisture, wind, and fire style all change real burn rate. Follow local fire rules first.",
    "#203d2a"
  );
}

const handlers = {
  "tent-size": tentSize,
  "camp-water": campWater,
  "backpack-weight": backpackWeight,
  "sleeping-bag-temp": sleepingBagTemp,
  firewood
};

for (const form of calculators) {
  const handler = handlers[form.dataset.calculator];
  if (!handler) continue;
  form.addEventListener("input", () => handler(form));
  handler(form);
}
