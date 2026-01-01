const PACK_RULES = {
  "tla": [
    // play_booster
    {
      set_code: "tla",
      booster_type: "play_booster",
      total_card_count: 14,
      is_active: true,
      slots: [
        {
          slot_code: "1_6_common_main_nonfoil",
          quantity: 6,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { fixed: "common" },
              finish: { fixed: "nonfoil" },
              filters: { type_line: { exclude: ["Land"] }, booster_only: true }
            }
          ]
        },
        {
          slot_code: "7_common_sourcematerial_nonfoil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 25,
              rarity: { fixed: "common" },
              finish: { fixed: "nonfoil" },
              filters: { type_line: { exclude: ["Land"] }, booster_only: true }
            },
            {
              source_type: "child_set",
              child_set_code: "tle",
              weight: 1,
              finish: { fixed: "nonfoil" },
              filters: {
                type_line: { exclude: ["Land"] },
                booster_only: true,
                promo_types: { include_any: ["sourcematerial"] },
              }
            }
          ]
        },
        {
          slot_code: "8_10_uncommon_nonfoil",
          quantity: 3,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { fixed: "uncommon" },
              finish: { fixed: "nonfoil" },
              filters: { booster_only: true }
            }
          ]
        },
        {
          slot_code: "11_wildcard_nonfoil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { weighted: { weights: { common: 5, uncommon: 74, rare: 17, mythic: 4 } } },
              finish: { fixed: "nonfoil" },
              filters: { type_line: { exclude: ["Land"] }, booster_only: true }
            }
          ]
        },
        {
          slot_code: "12_rare_mythic_nonfoil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { weighted: { weights: { rare: 80, mythic: 20 } } },
              finish: { fixed: "nonfoil" },
              filters: { booster_only: true }
            }
          ]
        },
        {
          slot_code: "13_foil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { weighted: { weights: { common: 54, uncommon: 37, rare: 7, mythic: 2 } } },
              finish: { fixed: "foil" },
              filters: { type_line: { exclude: ["Land"] }, booster_only: true }
            }
          ]
        },
        {
          slot_code: "14_land",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { fixed: "common" },
              finish: { weighted: {weights: { "nonfoil": 80, "foil": 20 }} },
              filters: { type_line: { include: ["Land"] }, booster_only: true }
            }
          ]
        },
      ]
    },

    // collector_booster
    {
      set_code: "tla",
      booster_type: "collector_booster",
      total_card_count: 15,
      is_active: true,
      slots: [
        {
          slot_code: "1_3_common_main_foil",
          quantity: 3,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { fixed: "common" },
              finish: { fixed: "foil" },
            }
          ]
        },
        {
          slot_code: "4_6_uncommon_main_foil",
          quantity: 3,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { fixed: "uncommon" },
              finish: { fixed: "foil" },
            }
          ]
        },
        {
          slot_code: "7_8_common_child_foil",
          quantity: 2,
          sources: [
            {
              source_type: "child_set",
              child_set_code: "tle",
              weight: 100,
              rarity: { fixed: "common" },
              finish: { fixed: "foil" },
              filters: { 
                promo_types: { exclude_any: ["sourcematerial"] },
              }
            }
          ]
        },
        {
          slot_code: "9_uncommon_boosterfun_child_foil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 8,
              rarity: { fixed: "uncommon" },
              filters: { 
                type_line: { exclude: ["Land"] }, 
                booster_only: true,
                promo_types: { include_any: ["boosterfun"] },
              }
            },
            {
              source_type: "child_set",
              child_set_code: "tle",
              weight: 92,
              rarity: { fixed: "uncommon" },
              finish: { fixed: "foil" },
              filters: { 
                promo_types: { exclude_any: ["sourcematerial"] },
              }
            }
          ]
        },
        {
          slot_code: "10_basic_full_land_foil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { fixed: "common" },
              finish: { fixed: "foil" },
              filters: { 
                type_line: { include: ["Land"] }, 
                full_art: true,
              }
            }
          ]
        },
        {
          slot_code: "11_rare_mythic_main_foil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { weighted: { weights: { "rare": 85.7, "mythic": 14.3 }} },
              finish: { fixed: "foil" },
            }
          ]
        },
        {
          slot_code: "12_rare_mythic_child_foil",
          quantity: 1,
          sources: [
            {
              source_type: "child_set",
              child_set_code: "tle",
              weight: 100,
              rarity: { weighted: { weights: { "rare": 85.7, "mythic": 14.3 }} },
              finish: { fixed: "foil" },
              filters: { 
                promo_types: { exclude_any: ["sourcematerial"] },
              }
            }
          ]
        },
        {
          slot_code: "13_rare_mythic_boosterfun_nonfoil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { weighted: { weights: { "rare": 85.7, "mythic": 14.3 }} },
              finish: { fixed: "nonfoil" },
              filters: { 
                promo_types: { include_any: ["boosterfun"] },
              }
            }
          ]
        },
        {
          slot_code: "14_source_material",
          quantity: 1,
          sources: [
            {
              source_type: "child_set",
              child_set_code: "tle",
              weight: 100,
              finish: { weighted: { weights: {"nonfoil": 75, "foil": 25} } },
              filters: { 
                promo_types: { include_any: ["sourcematerial"] },
              }
            }
          ]
        },
        {
          slot_code: "15_boosterfun_rare_mythic_foil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { weighted: { weights: { "rare": 85.7, "mythic": 14.3 }} },
              finish: { fixed: "foil" } ,
              filters: { 
                promo_types: { include_any: ["boosterfun"] },
              }
            }
          ]
        },
      ]
    }
  ]
}

module.exports = PACK_RULES;