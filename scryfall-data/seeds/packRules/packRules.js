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
              filters: { type_line: { exclude: ["Basic Land"] }, booster_only: true, promo_types: { exclude_any: ["promopack"]} }
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
              filters: { type_line: { exclude: ["Basic Land"] }, booster_only: true, promo_types: { exclude_any: ["promopack"] }}
            },
            {
              source_type: "child_set",
              child_set_code: "tle",
              weight: 1,
              finish: { fixed: "nonfoil" },
              filters: {
                type_line: { exclude: ["Basic Land"] },
                booster_only: true,
                promo_types: { include_any: ["sourcematerial"], exclude_any: ["promopack"] },
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
              filters: { booster_only: true, promo_types: { exclude_any: ["promopack"] }}
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
              filters: { type_line: { exclude: ["Basic Land"] }, booster_only: true, promo_types: { exclude_any: ["promopack"] } }
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
              filters: { booster_only: true, promo_types: { exclude_any: ["promopack"] } }
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
              filters: { type_line: { exclude: ["Basic Land"] }, booster_only: true, promo_types: { exclude_any: ["promopack"] } }
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
              filters: { type_line: { exclude: ["Basic Land"] }, promo_types: { exclude_any: ["promopack"] } }
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
              filters: { type_line: { exclude: ["Basic Land"] }, promo_types: { exclude_any: ["promopack"] } }
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
                promo_types: { exclude_any: ["sourcematerial", "promopack"] },
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
                type_line: { exclude: ["Basic Land"] }, 
                promo_types: { include_any: ["boosterfun"], exclude_any: ["promopack"] },
              }
            },
            {
              source_type: "child_set",
              child_set_code: "tle",
              weight: 92,
              rarity: { fixed: "uncommon" },
              finish: { fixed: "foil" },
              filters: {
                type_line: { exclude: ["Basic Land"] }, 
                promo_types: { exclude_any: ["sourcematerial", "promopack"] },
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
                type_line: { include: ["Basic Land"] }, 
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
              filters: { promo_types: { exclude_any: ["promopack"] } }
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
                promo_types: { exclude_any: ["sourcematerial", "promopack"] },
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
                promo_types: { include_any: ["boosterfun"], exclude_any: ["promopack"] },
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
                promo_types: { include_any: ["sourcematerial"], exclude_any: ["promopack"] },
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
                promo_types: { include_any: ["boosterfun"], exclude_any: ["promopack"] },
              }
            }
          ]
        },
      ]
    }
  ],

  "fdn": [
    // play_booster
    {
      set_code: "fdn",
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
              filters: { 
                type_line: { exclude: ["Basic Land"] }, 
                booster_only: true,
                frame_effects: { exclude_any: ["extendedart"] },
                filters: { promo_types: { exclude_any: ["promopack"] } } 
              }
            }
          ]
        },
        {
          slot_code: "7_common_spg_nonfoil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 98.5,
              rarity: { fixed: "common" },
              finish: { fixed: "nonfoil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] }, 
                booster_only: true,
                frame_effects: { exclude_any: ["extendedart"] },
                filters: { promo_types: { exclude_any: ["promopack"] } } 
              }
            },
            {
              source_type: "child_set",
              child_set_code: "spg",
              weight: 1.5,
              finish: { fixed: "nonfoil" },
              filters: {
                type_line: { exclude: ["Basic Land"] },
                booster_only: true,
                filters: { promo_types: { exclude_any: ["promopack"] } }
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
              filters: { 
                booster_only: true,
                frame_effects: { exclude_any: ["extendedart"] },
                filters: { promo_types: { exclude_any: ["promopack"] } } 
              }
            }
          ]
        },
        {
          slot_code: "11_rare_mythic_nonfoil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { weighted: { weights: { rare: 85.7, mythic: 14.3 } } },
              finish: { fixed: "nonfoil" },
              filters: { 
                booster_only: true,
                frame_effects: { exclude_any: ["extendedart"] },
                promo_types: { exclude_any: ["showcase", "promopack"]}, 
              }
            }
          ]
        },
        {
          slot_code: "12_wildcard_nonfoil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { weighted: { weights: { common: 15, uncommon: 64, rare: 17, mythic: 4 } } },
              finish: { fixed: "nonfoil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] }, 
                booster_only: true,
                frame_effects: { exclude_any: ["extendedart", "promopack"] }, 
              }
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
              filters: { 
                type_line: { exclude: ["Basic Land"] }, 
                booster_only: true,
                frame_effects: { exclude_any: ["extendedart", "promopack"] }, 
              }
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
              filters: { type_line: { include: ["Basic Land"] }, booster_only: true }
            }
          ]
        },
      ]
    },
    // collector_booster
    {
      set_code: "fdn",
      booster_type: "collector_booster",
      total_card_count: 15,
      is_active: true,
      slots: [
        {
          slot_code: "1_5_common_main_foil",
          quantity: 5,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { fixed: "common" },
              finish: { fixed: "foil" },
              filters: { type_line: {exclude: ["Basic Land"]}, promo_types: { exclude_any: ["promopack"] } }
            }
          ]
        },
        {
          slot_code: "6_9_uncommon_main_foil",
          quantity: 4,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { fixed: "uncommon" },
              finish: { fixed: "foil" },
              filters: { type_line: {exclude: ["Basic Land"]}, promo_types: { exclude_any: ["promopack"] } }
            }
          ]
        },
        {
          slot_code: "10_character_land_foil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { fixed: "common" },
              finish: { fixed: "foil" },
              filters: { 
                full_art: true,
                type_line: { include: ["Basic Land"] }
              }
            }
          ]
        },
        {
          slot_code: "11_12_rare_mythic_main_foil",
          quantity: 2,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { weighted: { weights: { "rare": 85.7, "mythic": 14.3 }} },
              finish: { fixed: "foil" },
              filters: {
                full_art: false,
                frame_effects: { exclude_any: ["extendedart", "showcase"] },
                promo_types: { exclude_any: ["manafoil", "fracturefoil", "showcase", "promopack"]}
              }
            }
          ]
        },
        {
          slot_code: "13_14_rare_mythic_borderless_extended_nonfoil",
          quantity: 2,
          sources: [
            {
              source_type: "main",
              weight: 55.4,
              rarity: { weighted: { weights: { "rare": 46.2, "mythic": 9.2 }} },
              finish: { fixed: "nonfoil" },
              filters: { 
                full_art: true,
                frame_effects: { exclude_any: ["extendedart" , "showcase"] },
                type_line: { exclude: ["Basic Land"] },
                promo_types: { exclude_any: ["manafoil", "fracturefoil", "showcase", "promopack"]}
              }
            },
            {
              source_type: "main",
              weight: 44.6,
              rarity: { weighted: { weights: { "rare": 39.8, "mythic": 4.8 }} },
              finish: { fixed: "nonfoil" },
              filters: { 
                full_art: false,
                frame_effects: { include_any: ["extendedart"] },
                type_line: { exclude: ["Basic Land"] },
                promo_types: { exclude_any: ["manafoil", "fracturefoil", "showcase", "promopack"]}
              }
            }
          ]
        },
        {
          slot_code: "15_boosterfun_foil",
          quantity: 1,
          sources: [
            // borderless
            {
              source_type: "main",
              weight: 41.3,
              rarity: { weighted: { weights: { "rare": 34.5, "mythic": 6.8 }} },
              finish: { fixed: "foil" },
              filters: { 
                full_art: true,
                frame_effects: { exclude_any: ["extendedart", "showcase"]},
                type_line: { exclude: ["Basic Land"] },
                promo_types: { exclude_any: ["manafoil", "fracturefoil", "showcase", "promopack"]}
              }
            },
            // extended art
            {
              source_type: "main",
              weight: 33.2,
              rarity: { weighted: { weights: { "rare": 29.6, "mythic": 3.6 }} },
              finish: { fixed: "foil" },
              filters: { 
                full_art: false,
                frame_effects: { include_any: ["extendedart"]},
                type_line: { exclude: ["Basic Land"] },
                promo_types: { exclude_any: ["manafoil", "fracturefoil", "showcase", "promopack"]}
              }
            },
            // manafoil
            {
              source_type: "main",
              weight: 10,
              rarity: { weighted: { weights: { "rare": 8.4, "mythic": 1.6 }} },
              finish: { fixed: "foil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] },
                promo_types: { include_any: ["manafoil"]}
              }
            },
            // special guest
            {
              source_type: "child_set",
              child_set_code: "spg",
              weight: 5.5,
              finish: { fixed: "foil" },
              filters: { 
                promo_types: { exclude_any: ["manafoil", "fracturefoil", "showcase", "promopack"]}
              }
            },
            // japan showcase - traditional foil
            {
              source_type: "main",
              weight: 9,
              finish: { fixed: "foil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] },
                frame_effects: { include_any: ["showcase"] },
                promo_types: { exclude_any: ["fracturefoil", "promopack"]}
              }
            },
            // japan showcase - fractured foil
            {
              source_type: "main",
              weight: 1,
              finish: { fixed: "foil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] },
                promo_types: { include_any: ["fracturefoil"]}
              }
            },
          ]
        }
      ]
    }
  ],

  "eoe": [
    // play_booster
    {
      set_code: "eoe",
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
              filters: { 
                type_line: { exclude: ["Basic Land"] }, 
                booster_only: true,
                frame_effects: { exclude_any: ["extendedart"] },
                promo_types: { exclude_any: ["galaxyfoil", "showcase", "promopack"]} 
              }
            }
          ]
        },
        {
          slot_code: "7_common_main_spg_nonfoil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 98.2,
              rarity: { fixed: "common" },
              finish: { fixed: "nonfoil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] }, 
                booster_only: true,
                frame_effects: { exclude_any: ["extendedart"] },
                promo_types: { exclude_any: ["galaxyfoil", "showcase", "promopack"]} 
              }
            },
            {
              source_type: "child_set",
              child_set_code: "spg",
              weight: 1.8,
              finish: { fixed: "nonfoil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] }, 
                booster_only: true,
                promo_types: { exclude_any: ["galaxyfoil", "showcase", "promopack"]} 
              }
            }
          ]
        },
        {
          slot_code: "8_10_uncommon_main_nonfoil",
          quantity: 3,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { fixed: "uncommon" },
              finish: { fixed: "nonfoil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] }, 
                booster_only: true,
                promo_types: { exclude_any: ["galaxyfoil", "showcase", "promopack"]}  
              }
            }
          ]
        },
        {
          slot_code: "11_wildcard_main_nonfoil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 86,
              rarity: { weighted: { weights: { common: 12.5, uncommon: 62.5, rare: 10.5, mythic: 0.5 } } },
              finish: { fixed: "nonfoil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] }, 
                booster_only: true,
                frame_effects: { exclude_any: ["extendedart", "showcase"] },
                full_art: false,
                promo_types: { exclude_any: ["galaxyfoil", "showcase", "promopack"]}  
              }
            },
            {
              source_type: "child_set",
              child_set_code: "eos",
              weight: 12,
              rarity: { weighted: { weights: { rare: 9.5, mythic: 2.5 } } },
              finish: { fixed: "nonfoil" },
              filters: { 
                type_line: { include: ["Basic Land"] }, 
                booster_only: true,
                frame_effects: { exclude_any: ["extendedart"] },
                promo_types: { exclude_any: ["galaxyfoil", "showcase", "promopack"]}  
              }
            },
            {
              source_type: "main",
              weight: 1,
              rarity: { weighted: { weights: { rare: 1, mythic: 1 } } },
              finish: { fixed: "nonfoil" },
              filters: { 
                type_line: { include: ["Basic Land"] }, 
                booster_only: true,
                frame_effects: { include_any: ["viewport"] },
                promo_types: { exclude_any: ["galaxyfoil", "showcase", "promopack"]}  
              }
            },
            {
              source_type: "main",
              weight: 1,
              rarity: { weighted: { weights: { rare: 1, mythic: 1 } } },
              finish: { fixed: "nonfoil" },
              filters: { 
                booster_only: true,
                frame_effects: { exclude_any: ["showcase"] },
                full_art: true,
                promo_types: { exclude_any: ["galaxyfoil", "showcase", "promopack"]} 
              }
            },
          ]
        },
        {
          slot_code: "12_rare_mythic_main_nonfoil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 95,
              rarity: { weighted: { weights: { rare: 81, mythic: 14 } } },
              finish: { fixed: "nonfoil" },
              filters: { 
                booster_only: true,
                frame_effects: { exclude_any: ["showcase"] },
                full_art: false, 
                promo_types: { exclude_any: ["galaxyfoil", "showcase", "promopack"]} 
              }
            },
            {
              source_type: "main",
              weight: 4,
              rarity: { weighted: { weights: { rare: 2, mythic: 1 } } },
              finish: { fixed: "nonfoil" },
              filters: { 
                booster_only: true,
                frame_effects: { exclude_any: ["showcase"] },
                full_art: true,
                promo_types: { exclude_any: ["galaxyfoil", "showcase", "promopack"]} 
              }
            },
            {
              source_type: "main",
              weight: 1,
              rarity: { fixed: "mythic" },
              finish: { fixed: "nonfoil" },
              filters: { 
                type_line: { include: ["Basic Land"] }, 
                booster_only: true,
                frame_effects: { include_any: ["viewport"] }, 
                promo_types: { exclude_any: ["galaxyfoil", "showcase", "promopack"]} 
              }
            },
          ]
        },
        {
          slot_code: "13_main_foil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 97,
              rarity: { weighted: { weights: { common: 58, uncommon: 32, rare: 6.4, mythic: 1.1 } } },
              finish: { fixed: "foil" },
              filters: { 
                booster_only: true,
                type_line: { exclude: ["Basic Land"]},
                frame_effects: { exclude_any: ["showcase", "viewport"] },
                full_art: false,
                promo_types: { exclude_any: ["galaxyfoil", "showcase", "promopack"]} 
              }
            },
            {
              source_type: "child_set",
              child_set_code: "eos",
              weight: 1,
              rarity: { weighted: { weights: { rare: 1, mythic: 0.5 } } },
              finish: { fixed: "foil" },
              filters: { 
                type_line: { include: ["Land"] }, 
                booster_only: true,
                frame_effects: { exclude_any: ["extendedart", "showcase"] },
                promo_types: { exclude_any: ["galaxyfoil", "showcase", "promopack"]} 
              }
            },
            {
              source_type: "main",
              weight: 1,
              rarity: { weighted: { weights: { rare: 1, mythic: 1 } } },
              finish: { fixed: "foil" },
              filters: { 
                type_line: { include: ["Basic Land"] }, 
                booster_only: true,
                frame_effects: { include_any: ["viewport"] },
                promo_types: { exclude_any: ["galaxyfoil", "promopack"]} 
              }
            },
            {
              source_type: "main",
              weight: 1,
              rarity: { weighted: { weights: { rare: 1, mythic: 1 } } },
              finish: { fixed: "foil" },
              filters: { 
                booster_only: true,
                frame_effects: { exclude_any: ["showcase"] },
                full_art: true,
                promo_types: { exclude_any: ["galaxyfoil", "showcase", "promopack"]} 
              }
            },
          ]
        },
        {
          slot_code: "14_land",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 80,
              rarity: { fixed: "common" },
              finish: { weighted: {weights: { "nonfoil": 64, "foil": 16 }} },
              filters: { 
                type_line: { include: ["Basic Land"] }, 
                booster_only: true, 
                full_art: false,
                promo_types: { exclude_any: ["galaxyfoil", "showcase", "promopack"]} 
              }
            },
            {
              source_type: "main",
              weight: 20,
              rarity: { fixed: "common" },
              finish: { weighted: {weights: { "nonfoil": 16, "foil": 4 }} },
              filters: { 
                type_line: { include: ["Basic Land"] }, 
                booster_only: true, 
                full_art: true,
                promo_types: { exclude_any: ["galaxyfoil", "showcase", "promopack"]} 
              }
            },

          ]
        },
      ]
    },

    // collector_booster
    {
      set_code: "eoe",
      booster_type: "collector_booster",
      total_card_count: 15,
      is_active: true,
      slots: [
        {
          slot_code: "1_5_common_main_foil",
          quantity: 5,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { fixed: "common" },
              finish: { fixed: "foil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] }, 
                frame_effects: { exclude_any: ["extendedart", "showcase"] },
                promo_types: { exclude_any: ["galaxyfoil", "showcase", "promopack"]}  
              }
            }
          ]
        },
        {
          slot_code: "6_9_uncommon_main_foil",
          quantity: 4,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { fixed: "uncommon" },
              finish: { fixed: "foil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] }, 
                frame_effects: { exclude_any: ["extendedart", "showcase"] },
                promo_types: { exclude_any: ["galaxyfoil", "showcase", "promopack"]}  
              }
            }
          ]
        },
        {
          slot_code: "10_full_art_land_foil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 66.6,
              rarity: { fixed: "common" },
              finish: { fixed: "foil" },
              filters: { 
                type_line: { include: ["Basic Land"] },
                full_art: true, 
                promo_types: { exclude_any: ["galaxyfoil", "showcase", "promopack"]} 
              }
            },
            {
              source_type: "main",
              weight: 33.4,
              rarity: { fixed: "common" },
              finish: { fixed: "foil" },
              filters: { 
                type_line: { include: ["Basic Land"] },
                full_art: true, 
                promo_types: { include_any: ["galaxyfoil"]}
              }
            },
          ]
        },
        {
          slot_code: "11_rare_mythic_foil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { weighted: { weights: { rare: 86, mythic: 14 } } },
              finish: { fixed: "foil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] },
                full_art: false, 
                promo_types: { exclude_any: ["galaxyfoil", "showcase", "promopack"]}, 
                frame_effects: { exclude_any: ["extendedart", "showcase"]}
              }
            },
          ]
        },
        {
          slot_code: "12_commander_borderless_extended_nonfoil",
          quantity: 1,
          sources: [
            {
              source_type: "child_set",
              child_set_code: "eoc",
              weight: 9,
              rarity: { fixed: "mythic"},
              finish: { fixed: "nonfoil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] },
                full_art: true, 
                promo_types: { exclude_any: ["galaxyfoil", "showcase", "promopack"]}, 
                frame_effects: { exclude_any: ["extendedart", "showcase"]}
              }
            },
            {
              source_type: "child_set",
              child_set_code: "eoc",
              weight: 91,
              rarity: { fixed: "rare"},
              finish: { fixed: "nonfoil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] },
                full_art: false,
                promo_types: { exclude_any: ["galaxyfoil", "promopack"]}, 
                frame_effects: { include_any: ["extendedart"]}
              }
            },
          ]
        },
        {
          slot_code: "13_boosterfun_nonfoil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 52,
              rarity: { weighted: { weights: { rare: 47, mythic: 5 } } },
              finish: { fixed: "nonfoil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] },
                promo_types: { exclude_any: ["galaxyfoil", "promopack"]} ,
                frame_effects: { include_any: ["extendedart"]}
              }
            },
            {
              source_type: "main",
              weight: 11,
              rarity: { weighted: { weights: { rare: 7, mythic: 4 } } },
              finish: { fixed: "nonfoil" },
              filters: { 
                type_line: { include: ["Basic Land"] },
                promo_types: { exclude_any: ["galaxyfoil", "promopack"]},
                frame_effects: { include_any: ["viewport"]}
              }
            },
            {
              source_type: "main",
              weight: 37,
              rarity: { weighted: { weights: { rare: 32, mythic: 5 } } },
              finish: { fixed: "nonfoil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] },
                promo_types: { exclude_any: ["galaxyfoil", "promopack", "showcase"]},
                full_art: true,
                frame_effects: { exclude_any: ["extendedart", "showcase"]}
              }
            },
          ]
        },
        {
          slot_code: "14_stellar_sights_land",
          quantity: 1,
          sources: [
            {
              source_type: "child_set",
              child_set_code: "eos",
              weight: 67,
              rarity: { weighted: { weights: { rare: 54, mythic: 13 } } },
              finish: { fixed: "nonfoil" },
              filters: { 
                promo_types: { exclude_any: ["galaxyfoil", "promopack"]},
              }
            },
            {
              source_type: "child_set",
              child_set_code: "eos",
              weight: 22.5,
              rarity: { weighted: { weights: { rare: 18, mythic: 4.5 } } },
              finish: { fixed: "foil" },
              filters: { 
                promo_types: { exclude_any: ["galaxyfoil", "promopack"]},
              }
            },
            {
              source_type: "child_set",
              child_set_code: "eos",
              weight: 10.5,
              rarity: { weighted: { weights: { rare: 9, mythic: 1.5 } } },
              finish: { fixed: "foil" },
              filters: { 
                promo_types: { include_any: ["galaxyfoil", "promopack"]},
              }
            },
          ]
        },
        {
          slot_code: "15_booster_fun_foil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 42,
              rarity: { weighted: { weights: { rare: 38, mythic: 4 } } },
              finish: { fixed: "foil" },
              filters: { 
                promo_types: { exclude_any: ["galaxyfoil", "promopack"]},
                frame_effects: { include_any: ["extendedart"]}
              }
            },
            {
              source_type: "main",
              weight: 9,
              rarity: { weighted: { weights: { rare: 6, mythic: 3 } } },
              finish: { fixed: "foil" },
              filters: {
                type_line: { include: ["Basic Land"]}, 
                promo_types: { exclude_any: ["galaxyfoil", "promopack"]},
                frame_effects: { include_any: ["viewport"]}
              }
            },
            {
              source_type: "main",
              weight: 29,
              rarity: { weighted: { weights: { rare: 15, mythic: 4 } } },
              finish: { fixed: "foil" },
              filters: {
                type_line: { exclude: ["Basic Land"]},
                full_art: true, 
                promo_types: { exclude_any: ["galaxyfoil", "promopack"]},
                frame_effects: { exclude_any: ["viewport", "showcase"]}
              }
            },
            {
              source_type: "child_set",
              child_set_code: "spg",
              weight: 9,
              finish: { fixed: "foil" },
            },
            {
              source_type: "main",
              weight: 9,
              finish: { fixed: "foil" },
              filters: {
                promo_types: { exclude_any: ["galaxyfoil", "promopack"]},
                frame_effects: { include_any: ["showcase"], exclude_any: ["viewport"]}
              }
            },
            {
              source_type: "main",
              weight: 3,
              rarity: { weighted: { weights: { rare: 2, mythic: 1 } } },
              finish: { fixed: "foil" },
              filters: {
                promo_types: { include_any: ["galaxyfoil"]},
                frame_effects: { include_any: ["viewport"]}
              }
            },
            {
              source_type: "main",
              weight: 0.5,
              finish: { fixed: "foil" },
              filters: {
                promo_types: { include_any: ["headliner"]},
              }
            },
          ]
        },
      ]
    }

  ],

  "blb": [
    // play_booster
    {
      set_code: "blb",
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
              filters: {
                type_line: {exclude : ["Basic Land"]}, 
                booster_only: true,
                frame_effects: { exclude_any: ["extendedart"] },
                promo_types: { exclude_any: ["promopack"]}
              }
            }
          ]
        },
        {
          slot_code: "7_common_main_spg_nonfoil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 98.5,
              rarity: { fixed: "common" },
              finish: { fixed: "nonfoil" },
              filters: {
                type_line: {exclude : ["Basic Land"]},  
                booster_only: true,
                frame_effects: { exclude_any: ["extendedart"] },
                promo_types: { exclude_any: ["promopack"]} 
              }
            },
            {
              source_type: "child_set",
              child_set_code: "spg",
              weight: 1.5,
              finish: { fixed: "nonfoil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] }, 
                booster_only: true,
                promo_types: { exclude_any: ["promopack"]}
              }
            }
          ]
        },
        {
          slot_code: "8_10_uncommon_main_nonfoil",
          quantity: 3,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { fixed: "uncommon" },
              finish: { fixed: "nonfoil" },
              filters: {
                type_line: {exclude : ["Basic Land"]},  
                booster_only: true,
                frame_effects: { exclude_any: ["extendedart"] },
                promo_types: { exclude_any: ["promopack"]} 
              }
            }
          ]
        },
        {
          slot_code: "11_wildcard_main_nonfoil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { weighted: { weights: { common: 12.5, uncommon: 62.5, rare: 10.5, mythic: 0.5 } } },
              finish: { fixed: "nonfoil" },
              filters: { 
                booster_only: true,
                type_line: {exclude : ["Basic Land"]}, 
                frame_effects: { exclude_any: ["extendedart", "showcase"] },
                full_art: false,
                promo_types: { exclude_any: ["promopack"]}
              }
            },
          ]
        },
        {
          slot_code: "12_rare_mythic_main_nonfoil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { weighted: { weights: { rare: 81, mythic: 14 } } },
              finish: { fixed: "nonfoil" },
              filters: { 
                booster_only: true,
                frame_effects: { exclude_any: ["showcase", "extendedart"] },
                full_art: false, 
                promo_types: { exclude_any: ["promopack"]}
              }
            },
          ]
        },
        {
          slot_code: "13_main_foil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { weighted: { weights: { common: 58, uncommon: 32, rare: 6.4, mythic: 1.1 } } },
              finish: { fixed: "foil" },
              filters: { 
                booster_only: true,
                type_line: { exclude : ["Basic Land"] }, 
                frame_effects: { exclude_any: ["showcase", "extendedart"] },
                full_art: false,
                promo_types: { exclude_any: ["promopack"]}
              }
            },
          ]
        },
        {
          slot_code: "14_full_art_land",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { fixed: "common" },
              finish: { weighted: {weights: { "nonfoil": 80, "foil": 20 }} },
              filters: { 
                type_line: { include: ["Basic Land"] }, 
                booster_only: true, 
                full_art: true,
                promo_types: { exclude_any: ["promopack"]}
              }
            },
          ]
        },
      ]
    },

    // collector_booster
    {
      set_code: "blb",
      booster_type: "collector_booster",
      total_card_count: 15,
      is_active: true,
      slots: [
        {
          slot_code: "1_5_common_main_foil",
          quantity: 5,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { fixed: "common" },
              finish: { fixed: "foil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] }, 
                frame_effects: { exclude_any: ["extendedart", "showcase"] },
                promo_types: { exclude_any: ["promopack"]} 
              }
            }
          ]
        },
        {
          slot_code: "6_9_uncommon_main_foil",
          quantity: 4,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { fixed: "uncommon" },
              finish: { fixed: "foil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] }, 
                frame_effects: { exclude_any: ["extendedart", "showcase"] },
                promo_types: { exclude_any: ["promopack"]} 
              }
            }
          ]
        },
        {
          slot_code: "10_full_art_land_foil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { fixed: "common" },
              finish: { fixed: "foil" },
              filters: { 
                type_line: { include: ["Basic Land"] }, 
                booster_only: true, 
                full_art: true,
                promo_types: { exclude_any: ["promopack"]},
                frame_effects: { exclude_any: ["showcase"]},
              }
            },
          ]
        },
        {
          slot_code: "11_rare_mythic_foil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { weighted: { weights: { rare: 85.7, mythic: 14.4 } } },
              finish: { fixed: "foil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] },
                promo_types: { exclude_any: ["promopack"]},
                frame_effects: { exclude_any: ["extendedart", "showcase"]}
              }
            },
          ]
        },
        {
          slot_code: "12_commander_borderless_extended",
          quantity: 1,
          sources: [
            {
              source_type: "child_set",
              child_set_code: "blc",
              weight: 18,
              rarity: { weighted: { weights: { rare: 50, mythic: 50 } } },
              finish: { fixed: "nonfoil" },
              filters: { 
                full_art: true, 
                promo_types: { exclude_any: ["promopack"]},
                frame_effects: { exclude_any: ["showcase"]},
              }
            },
            {
              source_type: "child_set",
              child_set_code: "blc",
              weight: 79,
              rarity: { fixed: "rare"},
              finish: { fixed: "nonfoil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] },
                promo_types: { exclude_any: ["promopack"]},
                frame_effects: { include_any: ["extendedart"]}
              }
            },
            {
              source_type: "child_set",
              child_set_code: "blc",
              weight: 3,
              rarity: { fixed: "mythic"},
              finish: { fixed: "foil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] },
                full_art: true,
                frame_effects: { exclude_any: ["showcase"]},
                promo_types: { exclude_any: ["promopack"]}
              }
            },
          ]
        },
        {
          slot_code: "13_14_alternate_border_rare_mythic_nonfoil",
          quantity: 2,
          sources: [
            {
              source_type: "main",
              weight: 8,
              rarity: { weighted: { weights: { rare: 92, mythic: 8 } } },
              finish: { fixed: "nonfoil" },
              filters: { 
                promo_types: { exclude_any: ["promopack"]},
                frame_effects: { exclude_any: ["showcase"]},
                full_art: true,
              }
            },
            {
              source_type: "main",
              weight: 60,
              rarity: { weighted: { weights: { rare: 92, mythic: 8 } } },
              finish: { fixed: "nonfoil" },
              filters: { 
                promo_types: { exclude_any: ["promopack"]},
                frame_effects: { include_any: ["showcase"]},
                full_art: false,
              }
            },
            {
              source_type: "main",
              weight: 20,
              rarity: { fixed: "rare" },
              finish: { fixed: "nonfoil" },
              filters: { 
                promo_types: { exclude_any: ["promopack"]},
                frame_effects: { include_any: ["extendedart"]}
              }
            },
          ]
        },
        {
          slot_code: "15_alternate_border_raised_foil_rare_mythic",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 9,
              rarity: { weighted: { weights: { rare: 92, mythic: 8 } } },
              finish: { fixed: "foil" },
              filters: { 
                promo_types: { exclude_any: ["promopack"]},
                frame_effects: { exclude_any: ["showcase"]},
                full_art: true,
              }
            },
            {
              source_type: "main",
              weight: 69,
              rarity: { weighted: { weights: { rare: 92, mythic: 8 } } },
              finish: { fixed: "foil" },
              filters: { 
                promo_types: { exclude_any: ["promopack"]},
                frame_effects: { include_any: ["showcase"]},
                full_art: false,
              }
            },
            {
              source_type: "main",
              weight: 16,
              rarity: { fixed: "rare" },
              finish: { fixed: "foil" },
              filters: { 
                promo_types: { exclude_any: ["promopack"]},
                frame_effects: { include_any: ["extendedart"]}
              }
            },
            {
              source_type: "child_set",
              child_set_code: "spg",
              weight: 3,
              finish: { fixed: "foil" },
              filters: { 
                promo_types: { exclude_any: ["promopack"]},
              }
            },
            {
              source_type: "main",
              weight: 3,
              finish: { fixed: "foil" },
              filters: { 
                promo_types: { include_any: ["raisedfoil"]},
                frame_effects: { include_any: ["showcase"]},
                full_art: true,
              }
            },
          ]
        },
      ]
    }
  ],

  "dsk": [
    // play_booster
    {
      set_code: "dsk",
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
              filters: {
                type_line: {exclude : ["Basic Land"]}, 
                booster_only: true,
                frame_effects: { exclude_any: ["extendedart"] },
                promo_types: { exclude_any: ["promopack"]}
              }
            }
          ]
        },
        {
          slot_code: "7_common_main_spg_nonfoil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 63,
              rarity: { fixed: "common" },
              finish: { fixed: "nonfoil" },
              filters: {
                type_line: {exclude : ["Basic Land"]},  
                booster_only: true,
                frame_effects: { exclude_any: ["extendedart"] },
                promo_types: { exclude_any: ["promopack"]} 
              }
            },
            {
              source_type: "child_set",
              child_set_code: "spg",
              weight: 1,
              finish: { fixed: "nonfoil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] }, 
                booster_only: true,
                promo_types: { exclude_any: ["promopack"]}
              }
            }
          ]
        },
        {
          slot_code: "8_10_uncommon_main_nonfoil",
          quantity: 3,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { fixed: "uncommon" },
              finish: { fixed: "nonfoil" },
              filters: {
                type_line: {exclude : ["Basic Land"]},  
                booster_only: true,
                frame_effects: { exclude_any: ["extendedart"] },
                promo_types: { exclude_any: ["promopack"]} 
              }
            }
          ]
        },
        {
          slot_code: "11_wildcard_main_nonfoil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { weighted: { weights: { common: 12.5, uncommon: 62.5, rare: 10.5, mythic: 0.5 } } },
              finish: { fixed: "nonfoil" },
              filters: { 
                booster_only: true,
                type_line: {exclude : ["Basic Land"]}, 
                frame_effects: { exclude_any: ["extendedart", "showcase"] },
                full_art: false,
                promo_types: { exclude_any: ["promopack"]}
              }
            },
          ]
        },
        {
          slot_code: "12_rare_mythic_main_nonfoil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { weighted: { weights: { rare: 80, mythic: 20 } } },
              finish: { fixed: "nonfoil" },
              filters: { 
                booster_only: true,
                frame_effects: { exclude_any: ["extendedart"] },
                promo_types: { exclude_any: ["promopack"]}
              }
            },
          ]
        },
        {
          slot_code: "13_main_foil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { weighted: { weights: { common: 58, uncommon: 32, rare: 6.4, mythic: 1.1 } } },
              finish: { fixed: "foil" },
              filters: { 
                booster_only: true,
                type_line: { exclude : ["Basic Land"] }, 
                frame_effects: { exclude_any: ["showcase", "extendedart"] },
                full_art: false,
                promo_types: { exclude_any: ["promopack"]}
              }
            },
          ]
        },
        {
          slot_code: "14_basic_land",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 16.6,
              rarity: { fixed: "common" },
              finish: { weighted: {weights: { "nonfoil": 13.3, "foil": 3.3 }} },
              filters: { 
                type_line: { include: ["Basic Land"] }, 
                booster_only: true, 
                full_art: true,
                promo_types: { exclude_any: ["promopack"]}
              }
            },
            {
              source_type: "main",
              weight: 33.4,
              rarity: { fixed: "common" },
              finish: { weighted: {weights: { "nonfoil": 26.7, "foil": 6.7 }} },
              filters: { 
                type_line: { include: ["Basic Land"] }, 
                booster_only: true, 
                full_art: false,
                promo_types: { exclude_any: ["promopack"]}
              }
            },
            {
              source_type: "main",
              weight: 50,
              rarity: { fixed: "common" },
              finish: { weighted: {weights: { "nonfoil": 40, "foil": 10 }} },
              filters: { 
                type_line: { include: ["Land"], exclude: ["Basic"] }, 
                booster_only: true, 
                promo_types: { exclude_any: ["promopack"]}
              }
            }
          ]
        },
      ]
    },

    // collector_booster
    {
      set_code: "dsk",
      booster_type: "collector_booster",
      total_card_count: 15,
      is_active: true,
      slots: [
        {
          slot_code: "1_5_common_main_foil",
          quantity: 5,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { fixed: "common" },
              finish: { fixed: "foil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] }, 
                frame_effects: { exclude_any: ["extendedart", "showcase"] },
                promo_types: { exclude_any: ["promopack"]} 
              }
            }
          ]
        },
        {
          slot_code: "6_9_uncommon_main_foil",
          quantity: 4,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { fixed: "uncommon" },
              finish: { fixed: "foil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] }, 
                promo_types: { exclude_any: ["promopack"]} 
              }
            }
          ]
        },
        {
          slot_code: "10_full_art_land_foil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { fixed: "common" },
              finish: { fixed: "foil" },
              filters: { 
                type_line: { include: ["Basic Land"] }, 
                booster_only: true, 
                full_art: true,
                promo_types: { exclude_any: ["promopack"]},
              }
            },
          ]
        },
        {
          slot_code: "11_rare_mythic_foil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { weighted: { weights: { rare: 85.7, mythic: 14.4 } } },
              finish: { fixed: "foil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] },
                frame_effects: { exclude: ["showcase", "extendedart"]},
                promo_types: { exclude_any: ["promopack", "doubleexposure", "showcase"]},
              }
            },
          ]
        },
        {
          slot_code: "12_commander_borderless_extended",
          quantity: 1,
          sources: [
            {
              source_type: "child_set",
              child_set_code: "dsc",
              weight: 18.1,
              rarity: { fixed: "mythic" },
              finish: { weighted: { weights: { "nonfoil": 12.1, "foil": 6 }} },
              filters: { 
                full_art: true, 
                promo_types: { exclude_any: ["promopack"]},
                frame_effects: { exclude_any: ["showcase"]},
              }
            },
            {
              source_type: "child_set",
              child_set_code: "dsc",
              weight: 81.9,
              rarity: { fixed: "rare"},
              finish: { fixed: "nonfoil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] },
                promo_types: { exclude_any: ["promopack"]},
                frame_effects: { include_any: ["extendedart"]}
              }
            },
          ]
        },
        {
          slot_code: "13_14_booster_fun_extended_art_nonfoil",
          quantity: 2,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { weighted: { weights: { rare: 85.4, mythic: 14.6 } } },
              finish: { fixed: "nonfoil" },
              filters: { 
                promo_types: { include_any: ["boosterfun"], exclude_any: ["fracturefoil", "promopack"]},
              }
            }
          ]
        },
        {
          slot_code: "15_special_foil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 1,
              finish: { fixed: "foil" },
              filters: { 
                promo_types: { include_any: ["fracturefoil"]},
              }
            },
            {
              source_type: "child_set",
              child_set_code: "spg",
              weight: 3,
              rarity: { fixed: "mythic"},
              finish: { fixed: "foil" },
              filters: { 
                promo_types: { exclude_any: ["promopack"]},
              }
            },
            {
              source_type: "main",
              weight: 96,
              finish: { fixed: "foil" },
              filters: { 
                promo_types: { include_any: ["boosterfun"], exclude_any: ["fracturefoil"]}
              }
            },
          ]
        },
      ]
    }
  ],

  "tdm": [
    // play_booster
    {
      set_code: "tdm",
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
              filters: {
                type_line: {exclude : ["Basic Land"]}, 
                booster_only: true,
                frame_effects: { exclude_any: ["extendedart"] },
                promo_types: { exclude_any: ["promopack"]}
              }
            }
          ]
        },
        {
          slot_code: "7_common_main_spg_nonfoil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 98.5,
              rarity: { fixed: "common" },
              finish: { fixed: "nonfoil" },
              filters: {
                type_line: {exclude : ["Basic Land"]},  
                booster_only: true,
                frame_effects: { exclude_any: ["extendedart"] },
                promo_types: { exclude_any: ["promopack"]} 
              }
            },
            {
              source_type: "child_set",
              child_set_code: "spg",
              weight: 1.5,
              finish: { fixed: "nonfoil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] }, 
                booster_only: true,
                promo_types: { exclude_any: ["promopack"]}
              }
            }
          ]
        },
        {
          slot_code: "8_10_uncommon_main_nonfoil",
          quantity: 3,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { fixed: "uncommon" },
              finish: { fixed: "nonfoil" },
              filters: {
                type_line: {exclude : ["Basic Land"]},  
                booster_only: true,
                frame_effects: { exclude_any: ["extendedart"] },
                promo_types: { exclude_any: ["promopack"]} 
              }
            }
          ]
        },
        {
          slot_code: "11_wildcard_main_nonfoil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { weighted: { weights: { common: 12.5, uncommon: 58.3, rare: 15.6, mythic: 2.6 } } },
              finish: { fixed: "nonfoil" },
              filters: { 
                booster_only: true,
                type_line: {exclude : ["Basic Land"]}, 
                promo_types: { exclude_any: ["promopack"]}
              }
            },
          ]
        },
        {
          slot_code: "12_rare_mythic_main_nonfoil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { weighted: { weights: { rare: 80, mythic: 20 } } },
              finish: { fixed: "nonfoil" },
              filters: { 
                booster_only: true,
                promo_types: { exclude_any: ["promopack"]}
              }
            },
          ]
        },
        {
          slot_code: "13_main_foil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { weighted: { weights: { common: 56.5, uncommon: 32, rare: 6.4, mythic: 1.1 } } },
              finish: { fixed: "foil" },
              filters: { 
                booster_only: true,
                type_line: { exclude : ["Basic Land"] }, 
                promo_types: { exclude_any: ["promopack", "halofoil"]}
              }
            },
          ]
        },
        {
          slot_code: "14_basic_land",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 8.7,
              rarity: { fixed: "common" },
              finish: { weighted: {weights: { "nonfoil": 7, "foil": 1.7 }} },
              filters: { 
                type_line: { include: ["Basic Land"] }, 
                booster_only: true, 
                promo_types: { exclude_any: ["promopack"]}
              }
            },
            {
              source_type: "main",
              weight: 4.4,
              rarity: { fixed: "common" },
              finish: { weighted: {weights: { "nonfoil": 3.5, "foil": 0.9 }} },
              filters: { 
                type_line: { include: ["Basic Land"] }, 
                booster_only: true, 
                full_art: true,
                promo_types: { exclude_any: ["promopack"]}
              }
            },
            {
              source_type: "main",
              weight: 87.4,
              rarity: { fixed: "common" },
              finish: { weighted: {weights: { "nonfoil": 70, "foil": 17.4 }} },
              filters: { 
                type_line: { include: ["Land"], exclude: ["Basic"] }, 
                booster_only: true, 
                promo_types: { exclude_any: ["promopack"]}
              }
            }
          ]
        },
      ]
    },

    // collector_booster
    {
      set_code: "tdm",
      booster_type: "collector_booster",
      total_card_count: 15,
      is_active: true,
      slots: [
        {
          slot_code: "1_4_common_main_foil",
          quantity: 4,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { fixed: "common" },
              finish: { fixed: "foil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] }, 
                frame_effects: { exclude_any: ["extendedart", "showcase"] },
                promo_types: { exclude_any: ["promopack", "halofoil"]} 
              }
            }
          ]
        },
        {
          slot_code: "5_8_uncommon_main_foil",
          quantity: 3,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { fixed: "uncommon" },
              finish: { fixed: "foil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] }, 
                promo_types: { exclude_any: ["promopack", "halofoil"]} 
              }
            }
          ]
        },
        {
          slot_code: "10_full_art_land_foil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { fixed: "common" },
              finish: { fixed: "foil" },
              filters: { 
                type_line: { include: ["Basic Land"] }, 
                booster_only: true, 
                full_art: true,
                promo_types: { exclude_any: ["promopack"]},
              }
            },
          ]
        },
        {
          slot_code: "11_rare_mythic_foil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { weighted: { weights: { rare: 85.7, mythic: 14.4 } } },
              finish: { fixed: "foil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] },
                frame_effects: { exclude: ["showcase", "extendedart"]},
                promo_types: { exclude_any: ["promopack", "doubleexposure", "showcase"]},
              }
            },
          ]
        },
        {
          slot_code: "12_commander_borderless_extended",
          quantity: 1,
          sources: [
            {
              source_type: "child_set",
              child_set_code: "dsc",
              weight: 18.1,
              rarity: { fixed: "mythic" },
              finish: { weighted: { weights: { "nonfoil": 12.1, "foil": 6 }} },
              filters: { 
                full_art: true, 
                promo_types: { exclude_any: ["promopack"]},
                frame_effects: { exclude_any: ["showcase"]},
              }
            },
            {
              source_type: "child_set",
              child_set_code: "dsc",
              weight: 81.9,
              rarity: { fixed: "rare"},
              finish: { fixed: "nonfoil" },
              filters: { 
                type_line: { exclude: ["Basic Land"] },
                promo_types: { exclude_any: ["promopack"]},
                frame_effects: { include_any: ["extendedart"]}
              }
            },
          ]
        },
        {
          slot_code: "13_14_booster_fun_extended_art_nonfoil",
          quantity: 2,
          sources: [
            {
              source_type: "main",
              weight: 100,
              rarity: { weighted: { weights: { rare: 85.4, mythic: 14.6 } } },
              finish: { fixed: "nonfoil" },
              filters: { 
                promo_types: { include_any: ["boosterfun"], exclude_any: ["fracturefoil", "promopack"]},
              }
            }
          ]
        },
        {
          slot_code: "15_special_foil",
          quantity: 1,
          sources: [
            {
              source_type: "main",
              weight: 1,
              finish: { fixed: "foil" },
              filters: { 
                promo_types: { include_any: ["fracturefoil"]},
              }
            },
            {
              source_type: "child_set",
              child_set_code: "spg",
              weight: 3,
              rarity: { fixed: "mythic"},
              finish: { fixed: "foil" },
              filters: { 
                promo_types: { exclude_any: ["promopack"]},
              }
            },
            {
              source_type: "main",
              weight: 96,
              finish: { fixed: "foil" },
              filters: { 
                promo_types: { include_any: ["boosterfun"], exclude_any: ["fracturefoil"]}
              }
            },
          ]
        },
      ]
    }
  ]
}

module.exports = PACK_RULES;