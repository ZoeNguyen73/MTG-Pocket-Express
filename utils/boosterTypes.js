const { RARITY } = require("./cardAttributes");

const BOOSTER_TYPES = [
  {
    code: "play-booster",
    totalCardCount: 13, // minus 1 non-playable card
    distributions: [
      {
        rarity: ["common"],
        quantity: 6,
        type_line: {
          "exclude": ["Land"],
        },
      },
      {
        rarity: ["uncommon"],
        quantity: 3,
      },
      {
        rarity: ["rare", "mythic"],
        quantity: 1,
      },
      {
        rarity: [...RARITY],
        note: "Wild Card",
        quantity: 2,
        type_line: {
          "exclude": ["Land"],
        },
      },
      {
        rarity: ["common"],
        quantity: 1,
        type_line: {
          "include": ["Land"],
        },
      }
    ]
  },
];

module.exports = BOOSTER_TYPES;