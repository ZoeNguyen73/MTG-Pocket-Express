const BORDER_COLORS = [
  "black",
  "white",
  "borderless",
  "silver",
  "gold",
];

const FINISHES = [
  "foil",
  "nonfoil",
  "etched",
];

const FINISHES_DROP_RATE = [
  {
    finish: "etched",
    rate: 1 / 70,
  },
  {
    finish: "foil",
    rate: 1 / 45,
  },
  { 
    finish: "nonfoil", 
    rate: 1 - (1 / 45 + 1 / 70) 
  }, // Remaining probability after foil and etched
];

const RARITY = [
  "common",
  "uncommon",
  "rare",
  "special",
  "mythic",
  "bonus",
];

const LANGUAGES = [
  "en",
  "es",
  "fr",
  "de",
  "it",
  "pt",
  "ja",
  "ko",
  "ru",
  "zhs",
  "zht",
  "he",
  "la",
  "grc",
  "ar",
  "sa",
  "ph"
];

module.exports = { BORDER_COLORS, FINISHES, RARITY, LANGUAGES, FINISHES_DROP_RATE };