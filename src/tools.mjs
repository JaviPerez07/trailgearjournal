export const toolsHub = {
  slug: "tools",
  title: "Camping Calculators",
  dek: "Planning calculators for tent sizing, camp water, backpack weight, sleeping bag temperature, and firewood estimates.",
  image: "/assets/images/camping-gear-weight-calculator.webp",
  alt: "Organized camping gear laid out beside a digital scale and notebook"
};

export const tools = [
  {
    slug: "tent-size-calculator",
    path: "/tools/tent-size-calculator",
    title: "Tent Size Calculator",
    metaTitle: "Tent Size Calculator: What Size Tent Do I Need? | Trail Gear Journal",
    metaDescription: "Use this tent size calculator to estimate sleeping capacity and floor area for camping tents based on people, indoor gear, and comfort level.",
    category: "Calculator",
    image: "/assets/images/family-camping-tent-hero.webp",
    alt: "A roomy family camping tent glowing at dusk in a forest campground",
    dek: "Estimate tent capacity and floor space before you buy or pack, with room for people, pads, and indoor gear.",
    resultLabel: "Recommended Tent",
    scriptId: "tent-size",
    reviewed: "June 3, 2026",
    inputs: [
      { id: "people", label: "People sleeping in the tent", type: "number", min: "1", step: "1", value: "2" },
      { id: "gearInside", label: "Will you keep gear inside?", type: "select", options: [["yes", "Yes"], ["no", "No"]] },
      { id: "comfort", label: "Comfort level", type: "select", options: [["tight", "Tight / minimal"], ["roomy", "Roomy / relaxed"]] }
    ],
    formula: "people × floor-space range per person, then rounded up to a practical tent capacity. Minimal sleeping uses about 15-20 square feet per person, while roomy camping with gear often lands closer to 25-30 square feet per person.",
    howItWorks: [
      "This calculator treats manufacturer tent capacity as a tight sleeping layout, not a comfort promise. A four-person tent usually means four pads placed close together with little extra room for duffels, shoes, or a dog.",
      "For a no-frills setup, the calculator starts near 15-20 square feet per person. If you keep gear inside or choose a roomier comfort setting, it moves toward 25-30 square feet per person and recommends stepping up one nominal tent size.",
      "The output is a planning estimate. Actual comfort depends on pad width, tent wall shape, vestibules, peak height, doors, and how much gear can live outside the sleeping area."
    ],
    tips: [
      "Choose one capacity size larger than your group for normal car camping comfort.",
      "Prioritize vestibules if wet shoes, backpacks, or camp chairs need sheltered storage.",
      "Check floor dimensions, not only the marketing capacity printed in the product name.",
      "Tall cabin tents feel roomy but can be less graceful in wind than lower dome-style tents."
    ],
    planningFactors: [
      ["Minimal sleeping", "15-20 sq ft per person", "Works for narrow pads and very little indoor gear."],
      ["Roomy car camping", "25-30 sq ft per person", "Better for families, duffels, and shoulder-season layers."],
      ["Manufacturer capacity", "Tight by design", "Often assumes sleepers are shoulder to shoulder."],
      ["Vestibule storage", "Reduces indoor clutter", "Useful in rain, dust, and crowded campsites."]
    ],
    mistakes: [
      "Buying by capacity number alone and ignoring the floor dimensions.",
      "Forgetting that wide sleeping pads can change the real layout.",
      "Counting a vestibule as sleeping space instead of gear storage.",
      "Choosing a very tall tent for exposed windy campsites without checking guy-out options."
    ],
    faqs: [
      ["What size tent do I need for two people?", "Most pairs are comfortable in a three-person tent for car camping, especially if they keep duffels or a dog inside. A two-person tent is usually a tight sleeping-first choice."],
      ["Is a four-person tent really good for four adults?", "Usually only if everyone accepts a tight layout with limited indoor storage. For comfort, many groups of four prefer a six-person tent."],
      ["How much tent floor space should I plan per person?", "Use roughly 15-20 square feet per person for minimal sleeping and closer to 25-30 square feet per person when comfort and indoor gear matter."],
      ["Should I size up for kids?", "Often yes. Kids still need pads, bags, clothes, shoes, and room to move, and family trips usually involve more indoor gear than solo trips."],
      ["Does peak height matter as much as floor space?", "It matters for livability. A tent with modest floor area but vertical walls can feel roomier than a larger low-profile shelter."]
    ],
    related: ["/best-family-camping-tents-2026", "/how-to-set-up-a-campsite", "/tools/camping-water-calculator"]
  },
  {
    slug: "camping-water-calculator",
    path: "/tools/camping-water-calculator",
    title: "Camping Water Calculator",
    metaTitle: "Camping Water Calculator: How Much Water to Bring Camping | Trail Gear Journal",
    metaDescription: "Estimate camping water needs in liters and gallons based on people, trip length, heat, activity, and cooking plans.",
    category: "Calculator",
    image: "/assets/images/campsite-setup-checklist.webp",
    alt: "An organized campsite with water storage, tent, lantern, and cooking area",
    dek: "Estimate how many liters and gallons of water to bring or resupply for drinking, cooking, and hot-weather activity.",
    resultLabel: "Estimated Water",
    scriptId: "camp-water",
    reviewed: "June 3, 2026",
    inputs: [
      { id: "people", label: "People", type: "number", min: "1", step: "1", value: "2" },
      { id: "days", label: "Trip length in days", type: "number", min: "1", step: "0.5", value: "2" },
      { id: "activity", label: "Heat / activity level", type: "select", options: [["low", "Low"], ["medium", "Medium"], ["high", "High heat or high activity"]] },
      { id: "cooking", label: "Cooking with water?", type: "select", options: [["yes", "Yes"], ["no", "No"]] }
    ],
    formula: "people × days × estimated liters per person per day. The calculator starts around 2 liters per person per day for drinking, adds cooking water when selected, and raises the range toward 4+ liters per person per day for hot or active conditions.",
    howItWorks: [
      "Water planning should be conservative because dehydration, dry camps, and closed spigots can turn a pleasant trip into a problem quickly. This calculator uses ranges instead of pretending there is one perfect number for every campground.",
      "The base estimate begins near 2 liters per person per day for drinking. Medium conditions add margin for normal movement, warm afternoons, and coffee or cleanup. High heat or strenuous activity pushes the estimate toward 4 liters or more per person per day.",
      "Cooking is treated separately because boiling pasta, making oatmeal, washing a pot, or preparing freeze-dried meals can quietly add up. The result is shown in liters and US gallons so you can match the estimate to jugs, bottles, and campground resupply plans."
    ],
    tips: [
      "Carry extra water when camping away from treated spigots or reliable natural sources.",
      "Separate drinking water from dish water so the group does not accidentally burn through the safe supply.",
      "Use larger jugs for base camp and smaller bottles for hikes away from camp.",
      "In hot desert camping, plan resupply before the trip instead of assuming you will find water nearby."
    ],
    planningFactors: [
      ["Base drinking need", "About 2 L/person/day", "A planning baseline for mild conditions."],
      ["Cooking add-on", "About 0.5-1 L/person/day", "Depends on meals, coffee, and cleanup style."],
      ["High heat/activity", "Can reach 4+ L/person/day", "Use more margin for deserts, exposed hikes, or humid summer trips."],
      ["US gallons", "1 gallon is about 3.785 L", "Helpful for matching the output to common water jugs."]
    ],
    mistakes: [
      "Planning only for drinking and forgetting cooking or cleanup.",
      "Assuming every campground spigot is working before checking current information.",
      "Leaving all water in one large container that is awkward to carry or pour.",
      "Underestimating dogs, kids, hot afternoons, and salty camp meals."
    ],
    faqs: [
      ["How much water should I bring camping per person?", "A mild-weather baseline is about 2 liters per person per day for drinking, but cooking, heat, and activity can push the estimate much higher."],
      ["How many gallons is 10 liters of water?", "Ten liters is about 2.6 US gallons. The calculator shows both units so you can plan around common jug sizes."],
      ["Should I include dishwashing water?", "Yes, at least as a small planning buffer. Even low-water cleanup, coffee, and oatmeal can use more than expected."],
      ["Do I need more water for desert camping?", "Usually yes. Hot, dry, exposed conditions can push needs toward 4 liters or more per person per day, before cooking."],
      ["Can I rely on campground water?", "Only after checking current campground information. Seasonal closures, repairs, freezing temperatures, or dry sites can change availability."]
    ],
    related: ["/how-to-set-up-a-campsite", "/van-life-setup-guide-beginners", "/tools/firewood-calculator"]
  },
  {
    slug: "backpack-weight-calculator",
    path: "/tools/backpack-weight-calculator",
    title: "Backpack Weight Calculator",
    metaTitle: "Backpack Weight Calculator: Pack Weight vs Body Weight | Trail Gear Journal",
    metaDescription: "Calculate loaded backpack weight as a percentage of body weight and compare it with common comfort planning ranges for hiking and camping.",
    category: "Calculator",
    image: "/assets/images/camping-gear-weight-calculator.webp",
    alt: "Camping and backpacking gear arranged beside a digital scale",
    dek: "Compare your loaded pack to body weight and estimate a more comfortable target before a backpacking or hike-in camp trip.",
    resultLabel: "Pack Load",
    scriptId: "backpack-weight",
    reviewed: "June 3, 2026",
    inputs: [
      { id: "bodyWeight", label: "Body weight", type: "number", min: "1", step: "1", value: "170" },
      { id: "baseWeight", label: "Base weight", type: "number", min: "0", step: "0.1", value: "18" },
      { id: "consumables", label: "Food, water, and fuel", type: "number", min: "0", step: "0.1", value: "8" },
      { id: "unit", label: "Weight unit", type: "select", options: [["lb", "Pounds"], ["kg", "Kilograms"]] }
    ],
    formula: "(base weight + consumables) ÷ body weight × 100. The calculator marks 20% or less as the green planning range, 20-25% as a caution range, and above 25% as a heavier load that deserves a gear review.",
    howItWorks: [
      "This calculator compares loaded pack weight with body weight because a pack that feels reasonable for one hiker can be punishing for another. The 20% guideline is not a medical rule, but it is a useful comfort ceiling for many recreational backpackers.",
      "Base weight means the non-consumable kit: pack, shelter, sleep system, clothing, cookware, electronics, repair items, and safety gear. Consumables include food, water, and fuel because they change during the trip. The calculator combines both to show loaded pack weight.",
      "The color output is deliberately simple. Green means the load is at or below 20% of body weight. Amber means 20-25%, where fitness, terrain, and experience matter more. Red means above 25%, where many hikers should reduce weight, shorten mileage, or reassess the plan."
    ],
    tips: [
      "Weigh the packed bag, not only individual items on a spreadsheet.",
      "Separate base weight from consumables so trip length does not hide gear bloat.",
      "Reduce duplicated clothing, oversized cookware, and excess water carried between reliable sources.",
      "Consider terrain, elevation, heat, and experience before accepting a heavy load."
    ],
    planningFactors: [
      ["Green range", "20% or less", "A common comfort target for many recreational hikers."],
      ["Amber range", "20-25%", "Can be manageable, but terrain and fitness matter."],
      ["Red range", "Over 25%", "Review gear weight, mileage, and safety margins."],
      ["Consumables", "Variable", "Food, water, and fuel decrease during the trip."]
    ],
    mistakes: [
      "Comparing base weight to body weight and forgetting water and food.",
      "Using optimistic manufacturer weights instead of weighing the packed kit.",
      "Carrying too much water without checking reliable refill options.",
      "Letting group gear become one person's hidden overload."
    ],
    faqs: [
      ["What percentage of body weight should a backpack be?", "A common planning target is 20% or less of body weight for a loaded backpack. Some experienced hikers carry more, but comfort depends on terrain, fitness, and trip length."],
      ["Is 25% of body weight too heavy?", "It can be heavy for many hikers, especially on steep terrain or long days. Treat 20-25% as a caution range and above 25% as a reason to reassess."],
      ["Should water count in backpack weight?", "Yes. Water is part of loaded pack weight, even though it is consumable. It can be one of the heaviest items at the start of a day."],
      ["What is base weight?", "Base weight is the pack and non-consumable gear before food, water, and fuel are added."],
      ["Can a beginner carry more than 20%?", "Some can, but beginners usually benefit from staying conservative while they learn pacing, footwear, terrain, and recovery needs."]
    ],
    related: ["/best-cold-weather-sleeping-bags", "/jetboil-flash-vs-msr-pocketrocket-2", "/tools/sleeping-bag-temperature-calculator"]
  },
  {
    slug: "sleeping-bag-temperature-calculator",
    path: "/tools/sleeping-bag-temperature-calculator",
    title: "Sleeping Bag Temperature Calculator",
    metaTitle: "Sleeping Bag Temperature Calculator: What Rating Do I Need? | Trail Gear Journal",
    metaDescription: "Estimate a sleeping bag comfort rating based on expected overnight low, cold-sleeper margin, liner use, and sleeping pad quality.",
    category: "Calculator",
    image: "/assets/images/cold-weather-sleeping-bag.webp",
    alt: "A cold-weather sleeping bag inside a tent on a frosty morning",
    dek: "Estimate the sleeping bag comfort rating to target before cold nights, shoulder-season trips, or uncertain mountain weather.",
    resultLabel: "Suggested Rating",
    scriptId: "sleeping-bag-temp",
    reviewed: "June 3, 2026",
    inputs: [
      { id: "lowTemp", label: "Expected overnight low (°F)", type: "number", min: "-40", step: "1", value: "32" },
      { id: "coldSleeper", label: "Do you sleep cold?", type: "select", options: [["yes", "Yes"], ["no", "No"]] },
      { id: "sleepSystem", label: "Liner and warm sleeping pad?", type: "select", options: [["good", "Yes, solid sleep system"], ["basic", "No / basic setup"]] }
    ],
    formula: "expected low minus a planning buffer. Start near the forecast low or about 10°F below it, add margin for cold sleepers, and avoid relying on liner claims or an under-insulated pad to rescue a marginal bag.",
    howItWorks: [
      "Sleeping bag temperature labels can be confusing because comfort, limit, and extreme ratings are not the same thing. For buying decisions, comfort rating is usually the most useful target because it is closer to a normal night's sleep than a survival-oriented lower number.",
      "This calculator starts with the expected overnight low and subtracts a buffer. A typical sleeper often targets a comfort rating at or around 10°F below the expected low. Cold sleepers get more margin. A good liner and warm pad can help, but the calculator does not let accessories replace a fundamentally appropriate bag.",
      "The sleeping pad matters because compressed insulation under your body cannot do much. If the pad is not warm enough for the ground temperature, a warmer bag may still feel cold from below. Treat the output as a sleep-system estimate, not a promise."
    ],
    tips: [
      "Shop by comfort rating when available, not only the bold number in the product name.",
      "Pair the bag with a sleeping pad that has appropriate insulation for the season.",
      "Keep the bag dry and store it uncompressed so loft can do its job.",
      "Cold sleepers should build more margin than warm sleepers, especially on damp trips."
    ],
    planningFactors: [
      ["Comfort rating", "Best planning target", "Closer to normal sleep for many campers."],
      ["Limit rating", "More aggressive", "Often assumes a warmer sleeper in a curled position."],
      ["Extreme rating", "Not a comfort target", "Survival-oriented and not a buying goal."],
      ["Pad insulation", "Critical", "Ground heat loss can overwhelm a good bag."]
    ],
    mistakes: [
      "Buying for the limit rating and expecting comfort at that temperature.",
      "Ignoring pad R-value or ground insulation.",
      "Assuming a liner always adds a fixed amount of warmth for every sleeper.",
      "Letting damp clothing or condensation reduce real warmth."
    ],
    faqs: [
      ["What sleeping bag rating do I need for 32°F?", "Many campers should look around a 20°F comfort-rated bag for freezing nights, with more margin for cold sleepers or damp conditions."],
      ["What is the difference between comfort and limit ratings?", "Comfort is a better planning target for sleeping normally. Limit is more aggressive and may reflect the lower boundary for a warm sleeper."],
      ["Can a liner replace a warmer sleeping bag?", "A liner can add some warmth and cleanliness, but it should not be the main strategy for a bag that is too light for the conditions."],
      ["Does the sleeping pad affect bag warmth?", "Yes. A low-insulation pad can make you cold from below even when the bag has enough loft on top."],
      ["Should cold sleepers size down the temperature rating?", "Usually yes. Cold sleepers should add buffer, often targeting a comfort rating below the forecast low."]
    ],
    related: ["/best-cold-weather-sleeping-bags", "/tools/backpack-weight-calculator", "/how-to-set-up-a-campsite"]
  },
  {
    slug: "firewood-calculator",
    path: "/tools/firewood-calculator",
    title: "Campfire Firewood Calculator",
    metaTitle: "Campfire Firewood Calculator: How Much Firewood Do I Need? | Trail Gear Journal",
    metaDescription: "Estimate campfire firewood by nights, burn hours, and fire size, including pounds and approximate store bundles for camping trips.",
    category: "Calculator",
    image: "/assets/images/home-hero-camp-kitchen.webp",
    alt: "A premium campsite at sunrise with a tidy camp kitchen and forest backdrop",
    dek: "Estimate firewood pounds and store bundles for campfires while respecting local rules, weather, and fire restrictions.",
    resultLabel: "Estimated Firewood",
    scriptId: "firewood",
    reviewed: "June 3, 2026",
    inputs: [
      { id: "nights", label: "Nights with a fire", type: "number", min: "1", step: "1", value: "2" },
      { id: "hours", label: "Hours of fire per night", type: "number", min: "0.5", step: "0.5", value: "3" },
      { id: "fireSize", label: "Fire size", type: "select", options: [["small", "Small"], ["medium", "Medium"], ["large", "Large"]] }
    ],
    formula: "nights × hours per night × estimated pounds burned per hour. Small fires use the low end of roughly 2-5 lb/hour, medium fires sit near the middle, and large fires use the upper end. Bundles are estimated around 5-7 pounds each.",
    howItWorks: [
      "Firewood planning is inherently approximate because wood species, moisture, split size, wind, and how people tend the fire all change the burn rate. This calculator uses a range-based planning model instead of a fake exact answer.",
      "A small campfire may burn near 2 pounds per hour, while a larger social fire can move toward 5 pounds per hour. Store bundles vary, but many campground or grocery bundles are roughly three quarters of a cubic foot and often land around 5-7 pounds depending on wood and dryness.",
      "The output gives estimated pounds and bundles, then rounds up because running out at night is annoying and overbuilding fires is wasteful. Always follow local fire restrictions, buy local firewood when required, and avoid moving untreated firewood across regions."
    ],
    tips: [
      "Check fire bans and campground rules before buying wood.",
      "Keep fires small, attended, and fully extinguished before sleep.",
      "Buy local firewood to reduce the risk of spreading pests.",
      "Wet, dense, or poorly split wood may require more bundles for the same burn time."
    ],
    planningFactors: [
      ["Small fire", "About 2 lb/hour", "Good for cooking coals or a short quiet fire."],
      ["Medium fire", "About 3.5 lb/hour", "A practical social campfire estimate."],
      ["Large fire", "About 5 lb/hour", "Uses more wood quickly and may be inappropriate in many sites."],
      ["Store bundle", "About 5-7 lb", "Varies by wood type, moisture, and seller."]
    ],
    mistakes: [
      "Ignoring local fire bans, wind, or dry conditions.",
      "Moving firewood long distances instead of buying locally.",
      "Planning a large fire when a small one would be safer and warmer enough.",
      "Assuming every bundle is the same size or dryness."
    ],
    faqs: [
      ["How much firewood do I need per night camping?", "Multiply your planned fire hours by a rough burn rate. A small fire may use around 2 lb/hour, while a larger fire can approach 5 lb/hour."],
      ["How many bundles of firewood for two nights?", "It depends on burn hours and fire size. For two medium three-hour fires, this calculator often estimates several bundles rather than one or two."],
      ["How big is a store firewood bundle?", "Bundles vary, but a common planning assumption is around 0.75 cubic feet and roughly 5-7 pounds."],
      ["Can I bring firewood from home?", "Often you should not. Many areas ask campers to buy local firewood to reduce pest and disease spread."],
      ["What changes firewood burn rate?", "Wood type, moisture, split size, wind, fire size, and how often you add wood all change the real burn rate."]
    ],
    related: ["/how-to-set-up-a-campsite", "/tools/camping-water-calculator", "/tools/tent-size-calculator"]
  }
];
