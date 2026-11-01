// Photos (from Unsplash) live in /public/img so pages never wait on a third-party
// image host; next/image still resizes them per device.
export const img = (id: string) => `/img/${id}.jpg`;

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
      { name: "Bofrot & Honey", desc: "Warm puff-puff, palm sugar glaze, sea salt", price: 60, image: "1650815232474-12d5b9375d63", spice: 0, tags: ["V"] },
      { name: "Garden Egg Salad", desc: "Charred garden egg, avocado, kpakpo shito vinaigrette", price: 95, image: "1546069901-ba9599a7e63c", spice: 1, tags: ["V", "GF"] },
      { name: "Suya Tenderloin", desc: "Thin-sliced beef, yaji spice, red onion, lime", price: 140, image: "1664992960082-0ea299a9c53e", spice: 3, tags: ["GF", "Chef's pick"] },
    ],
  },
  {
    id: "fire",
    label: "From the fire",
    dishes: [
      { name: "Suya Short Rib", desc: "12-hour short rib, coal-finished, tomato & pepper salsa", price: 320, image: "1544025162-d76694265947", spice: 2, tags: ["GF", "Chef's pick"] },
      { name: "Grilled Tilapia", desc: "Whole Volta tilapia, green shito, garden salad", price: 260, image: "1664993101841-036f189719b6", spice: 2, tags: ["GF"] },
      { name: "Ribeye & Yam Chips", desc: "300 g ribeye, crispy yam, peppercorn & dawadawa butter", price: 380, image: "1600891964092-4316c288032e", spice: 0, tags: ["GF"] },
      { name: "Smoky Jollof Prawns", desc: "Party jollof, chargrilled tiger prawns, fried plantain", price: 240, image: "1665332195309-9d75071138f0", spice: 2, tags: ["Chef's pick"] },
    ],
  },
  {
    id: "pot",
    label: "From the pot",
    dishes: [
      { name: "Palm-nut Salmon", desc: "Salmon poached in abenkwan, lemon, garden herbs", price: 290, image: "1574484284002-952d92456975", spice: 1, tags: ["GF"] },
      { name: "Banku & Kontomire", desc: "Hand-turned banku, cocoyam-leaf stew, smoked fish", price: 180, image: "1604329760661-e71dc83f8f26", spice: 1, tags: ["GF"] },
      { name: "Shrimp Light Soup", desc: "Tomato-ginger broth, prawns, rice ball", price: 210, image: "1559847844-5315695dadae", spice: 3, tags: ["GF"] },
      { name: "Groundnut Soup", desc: "Slow-cooked chicken, roasted groundnut, omo tuo", price: 195, image: "1793214659438-f29d2ced87e4", spice: 2, tags: ["GF"] },
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

export const heroDishes = ["1544025162-d76694265947", "1665332195309-9d75071138f0", "1604329760661-e71dc83f8f26", "1664993101841-036f189719b6"];

export const gallery = [
  { id: "1785486250405-6e3a140ce2aa", caption: "The terrace" },
  { id: "1650815232474-12d5b9375d63", caption: "Bofrot, straight from the pot" },
  { id: "1731475761027-0b6b33b74547", caption: "Friday night" },
  { id: "1709837167686-a2e33aad1bf0", caption: "Chef Efua" },
  { id: "1764670523467-bbe031185b71", caption: "The band before the set" },
  { id: "1683549387218-f52690727f51", caption: "Sharing plates" },
  { id: "1517248135467-4c7edcad34c4", caption: "The dining room" },
];

export const story = [
  {
    title: "Markets before menus.",
    body: "Every morning starts at Makola and the Tema fishing harbour. What we find decides what we cook, so the menu moves with the seasons.",
    image: "1762945274836-4c2cbb75e20e",
    color: "#f3a712",
  },
  {
    title: "Coal, clay and patience.",
    body: "Our short rib spends twelve hours in the pot and ten minutes over coal. The asanka bowl on every table is where our pepper sauces are ground by hand.",
    image: "1760907949894-b66d728e0a8e",
    color: "#e4572e",
  },
  {
    title: "Food meant to be shared.",
    body: "Plates land in the middle, hands reach across, and nobody leaves before the last bofrot is gone.",
    image: "1683537277115-502a6eecb6ef",
    color: "#c9a27e",
  },
];

export const events = [
  {
    day: "Every Friday",
    title: "Highlife Fridays",
    blurb: "A live band and palm-wine cocktails until late.",
    detail: "Music from 8pm. Kitchen open until midnight. Book a table, the bar fills fast.",
    image: "1789028718082-90c54d9903a0",
  },
  {
    day: "Saturdays & Sundays",
    title: "Jollof Brunch",
    blurb: "Bottomless sobolo spritz and a jollof bar with every topping.",
    detail: "11am to 3pm. GH₵ 280 per person including a welcome drink. Kids under 10 eat free.",
    image: "1683538185904-4dc847308479",
  },
  {
    day: "Last Thursday monthly",
    title: "Chef's Long Table",
    blurb: "Seven courses for twenty-four people at one table.",
    detail: "A tasting menu cooked and served by Chef Efua. GH₵ 650 per person. Wine pairing available.",
    image: "1529832588601-c01e066263a8",
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
