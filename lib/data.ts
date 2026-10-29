export const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export type Dish = {
  name: string;
  desc: string;
  price: number; // GH₵
  image: string;
  spice: 0 | 1 | 2 | 3;
  tags: ("V" | "GF" | "Chef's pick")[];
};

export type Course = { id: string; label: string; dishes: Dish[] };

export const menu: Course[] = [
  {
    id: "small",
    label: "Small plates",
    dishes: [
      { name: "Kelewele Bravas", desc: "Ginger-spiced plantain, shito aioli, toasted groundnut", price: 85, image: "1504674900247-0877df9cc836", spice: 2, tags: ["V", "GF"] },
      { name: "Bofrot & Honey", desc: "Warm puff-puff, palm sugar glaze, sea salt", price: 60, image: "1551024601-bec78aea704b", spice: 0, tags: ["V"] },
      { name: "Garden Egg Salad", desc: "Charred garden egg, avocado, kpakpo shito vinaigrette", price: 95, image: "1546069901-ba9599a7e63c", spice: 1, tags: ["V", "GF"] },
      { name: "Suya Tenderloin", desc: "Thin-sliced beef, yaji spice, red onion, lime", price: 140, image: "1529692236671-f1f6cf9683ba", spice: 3, tags: ["GF", "Chef's pick"] },
    ],
  },
  {
    id: "fire",
    label: "From the fire",
    dishes: [
      { name: "Suya Short Rib", desc: "12-hour short rib, coal-finished, tomato & pepper salsa", price: 320, image: "1544025162-d76694265947", spice: 2, tags: ["GF", "Chef's pick"] },
      { name: "Grilled Tilapia", desc: "Whole Volta tilapia, green shito, garden salad", price: 260, image: "1611599537845-1c7aca0091c0", spice: 2, tags: ["GF"] },
      { name: "Ribeye & Yam Chips", desc: "300 g ribeye, crispy yam, peppercorn & dawadawa butter", price: 380, image: "1600891964092-4316c288032e", spice: 0, tags: ["GF"] },
      { name: "Smoky Jollof Prawns", desc: "Party jollof, chargrilled tiger prawns, fried plantain", price: 240, image: "1563379926898-05f4575a45d8", spice: 2, tags: ["Chef's pick"] },
    ],
  },
  {
    id: "pot",
    label: "From the pot",
    dishes: [
      { name: "Palm-nut Salmon", desc: "Salmon poached in abenkwan, lemon, garden herbs", price: 290, image: "1574484284002-952d92456975", spice: 1, tags: ["GF"] },
      { name: "Banku & Kontomire", desc: "Hand-turned banku, cocoyam-leaf stew, smoked fish", price: 180, image: "1604329760661-e71dc83f8f26", spice: 1, tags: ["GF"] },
      { name: "Shrimp Light Soup", desc: "Tomato-ginger broth, prawns, rice ball", price: 210, image: "1559847844-5315695dadae", spice: 3, tags: ["GF"] },
      { name: "Groundnut Soup", desc: "Slow-cooked chicken, roasted groundnut, omo tuo", price: 195, image: "1585937421612-70a008356fbe", spice: 2, tags: ["GF"] },
    ],
  },
  {
    id: "sweet",
    label: "Sweet & poured",
    dishes: [
      { name: "Sobolo Panna Cotta", desc: "Hibiscus jelly, vanilla cream, strawberries", price: 75, image: "1488477181946-6428a0291777", spice: 0, tags: ["V", "GF"] },
      { name: "Sobolo Spritz", desc: "Hibiscus, ginger, prosecco, orange peel", price: 90, image: "1514362545857-3bc16c4c7d1b", spice: 0, tags: ["V", "GF"] },
      { name: "Akpeteshie Old Fashioned", desc: "Local cane spirit, palm sugar, cocoa bitters", price: 110, image: "1470337458703-46ad1756a187", spice: 0, tags: ["V", "GF", "Chef's pick"] },
      { name: "Weekend Brunch Toast", desc: "Agege bread, jammy eggs, avocado, chilli oil", price: 120, image: "1482049016688-2d3e1b311543", spice: 1, tags: ["V"] },
    ],
  },
];

export const heroDishes = ["1544025162-d76694265947", "1574484284002-952d92456975", "1604329760661-e71dc83f8f26", "1563379926898-05f4575a45d8"];

export const gallery = [
  { id: "1517248135467-4c7edcad34c4", caption: "The dining room" },
  { id: "1600565193348-f74bd3c7ccdf", caption: "The coal grill" },
  { id: "1424847651672-bf20a4b0982b", caption: "Sharing plates" },
  { id: "1590846406792-0adc7f938f1d", caption: "The bar" },
  { id: "1577219491135-ce391730fb2c", caption: "Chef Efua plating" },
  { id: "1504754524776-8f4f37790ca0", caption: "Saturday brunch" },
  { id: "1559339352-11d035aa65de", caption: "The terrace" },
];

export const story = [
  {
    kicker: "01 — Source",
    title: "Markets before menus.",
    body: "Every morning starts at Makola and the Tema fishing harbour. What we find decides what we cook, so the menu moves with the seasons.",
    image: "1551218808-94e220e084d2",
    color: "#f2a541",
  },
  {
    kicker: "02 — Fire",
    title: "Coal, clay and patience.",
    body: "Our short rib spends twelve hours in the pot and ten minutes over coal. The asanka bowl on every table is where our pepper sauces are ground by hand.",
    image: "1600565193348-f74bd3c7ccdf",
    color: "#e8572a",
  },
  {
    kicker: "03 — Table",
    title: "Food meant to be shared.",
    body: "Plates land in the middle, hands reach across, and nobody leaves before the last bofrot is gone.",
    image: "1424847651672-bf20a4b0982b",
    color: "#c9a27e",
  },
];

export const events = [
  {
    day: "Every Friday",
    title: "Highlife Fridays",
    blurb: "A live band, a late kitchen and the best palm-wine cocktails in Osu.",
    detail: "Music from 8pm. Kitchen open until midnight. Book a table, the bar fills fast.",
    image: "1590846406792-0adc7f938f1d",
  },
  {
    day: "Saturdays & Sundays",
    title: "Jollof Brunch",
    blurb: "Bottomless sobolo spritz and a jollof bar with every topping.",
    detail: "11am to 3pm. GH₵ 280 per person including a welcome drink. Kids under 10 eat free.",
    image: "1504754524776-8f4f37790ca0",
  },
  {
    day: "Last Thursday monthly",
    title: "Chef's Long Table",
    blurb: "Seven courses, one long table, twenty-four seats.",
    detail: "A tasting menu cooked and served by Chef Efua. GH₵ 650 per person. Wine pairing available.",
    image: "1536392706976-e486e2ba97af",
  },
];

// Mon=1 … Sun=0, hours in 24h
export const hours: Record<number, [number, number] | null> = {
  1: null,
  2: [12, 22],
  3: [12, 22],
  4: [12, 23],
  5: [12, 24],
  6: [11, 24],
  0: [11, 21],
};
export const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
