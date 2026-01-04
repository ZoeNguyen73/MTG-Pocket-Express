const TOP_CARD_LIST = {
  // "fdn": [
  //   {
  //     pack_type: "play_booster",
  //     cards: [
  //       "1b486b75-4680-4a94-af8c-c1c335c9782b", // sire of seven deaths
  //       "3c340ba8-9287-4072-937a-438251b5ff1d", // bloodthirsty conqueror
  //       "aab62a48-93b5-4eb3-aa6b-92dd4cc617f6", // twinflame tyrant
  //       "ce860ed4-a5bd-4347-9eab-dd716ea84db1", // bloodthirsty conqueror
  //       "cbd05eaa-7c0d-45f0-b085-87dc1d610c34",
  //       "f2c4f80e-84a0-463b-82c3-5c6503809351", // doubling season
  //       "04a474e3-e7de-4b4d-ad89-a72571968687", // twinflame tyrant
  //       "7c23360d-ff57-412c-9899-6050cb481da6", // akroma's memorial spg
  //       "2449eab9-b05e-40b6-adac-9132007a1af1", // grim tutor spg
  //       "1eb34f51-0bd2-43c3-af95-2ce8dabcc7bb", // twinflame tyrant
  //       "8d8432a7-1c8a-4cfb-947c-ecf9791063eb", // sire of seven deaths
  //       "ef1b78d9-8f09-4d67-ac6b-45204e525b35", // bloom tender spg
  //     ]
  //   },
  //   {
  //     pack_type: "collector_booster",
  //     cards: [
  //       "11bd6cef-f887-4b07-a957-4c53cb3c9c87", // llanowar elves foil
  //       "0d5bf249-3773-404f-9e46-d7745d3826e8", // doubling season
  //       "89d02e4b-3854-4e10-acb7-0b6128401b2e", // twinflame tyrant
  //       "926074a7-a01d-43bb-a257-0d95394773a0", // bloodthirsty conqueror
  //       "adc15cd2-e6d1-406e-af58-2f5fbaa74a30", // muldrotha
  //       "edb46675-5286-4eaf-9c25-eef773a4daeb", // herald of eternal dawn
  //       "d5493f0f-6eec-4776-a5aa-661eef1389fa", // sire of seven deaths
  //       "4ba8fabe-3af7-4f19-9508-5b5a6a608a3c", // doubling season
  //       "cd43a84a-cde2-48f8-b6ab-1ec023c9e0c3", // llanowar elves
  //       "4d284ddb-c1de-49a3-8a2a-8146f7c3fbeb", // progenitus
  //       "fd09badf-b28d-48b9-8cb4-2336e5b1e4b9", // twinflame tyrant
  //       "feb45b34-a1e7-4861-b0fe-b701aa5e894a", // bloodthirsty conqueror
  //     ]
  //   }
  // ],

  // "dsk": [
  //   {
  //     pack_type: "play_booster",
  //     cards: [
  //       "9b911653-7b96-4cf3-a907-13c5c53a14f7", // balemurk
  //       "93376e64-1086-43e1-9326-8cbe9f850233", // damnation spg
  //       "79d24cf8-107e-4b5b-a4f5-a7498647abef", // kaito
  //       "a7927a69-62a9-4f69-923d-f651bb03a7b4", // kaito
  //       "55a14f30-4ff9-4472-90a6-c3139f1c18e5", // kaito
  //       "d4a11129-02b5-45a9-bfa0-c144ddd45fac", // expropriate spg
  //       "9ee79357-2488-41a1-8f8c-dfcb77206f8a", // valgavoth
  //       "b414e4bd-a443-4ab3-bee4-1ad1d039aa1a", // gloomlakeverge
  //       "7740ff55-67bb-409e-90f7-2c2c8b8c770a", // valgavoth
  //       "5f89402a-ef5c-47c1-8cef-f40920f98fac", // abhorrent oculus
  //       "025152a1-4fdf-4e4e-a792-c540dd43fccd", // floodfarm verge
  //       "d2705b43-a94a-44c0-8740-82e0b296820c", // abhorrent oculus
  //     ]
  //   },
  //   {
  //     pack_type: "collector_booster",
  //     cards: [
  //       "8a8c711f-f29f-4f6a-88c4-3dbf9ce471c3", // enduring vitality
  //       "49df3de4-ed62-4828-8256-a05220d9eada", // overlord of the balemurk
  //       "f9f3ecff-2d67-4676-8706-9191d67215fc", // overlord of the hauntwoods
  //       "497ec48f-5e6a-4f57-86ca-3640b7235002", // Valgavoth, terror eater
  //       "d1c10e8d-b393-41fd-ba31-5e39b2dc7cce", // enduring curiosity
  //       "b07d4d21-2a88-4cfc-b0ce-9def76c20b7d", // enduring courage
  //       "59b698d6-4107-45d3-bc27-fb0746b7f91a", // enduring tenacity
  //       "5b2c4873-dfa7-4dd8-aded-a5d1b6048ad7", // overlord of the mistmoors
  //       "dc36adbc-544c-46a1-9e99-92cc7b2b2af1", // enduring innocence
  //       "14901700-881a-4c79-b162-aeeb1579757e", // kaito, bane of nightmares
  //       "49993a18-f733-4d1f-b629-12fc45cbb327",
  //       "0e8c085e-db0e-45a8-96d0-80b480361771", // overlord of the boilerbilges
  //     ]
  //   }
  // ],

  // "tdm": [
  //   {
  //     pack_type: "play_booster",
  //     cards: [
  //       "49515199-f53c-4595-94ba-3a3e46b86372", // scalding tarn
  //       "894105c4-d3ce-4d38-855b-24aa47b112c1", // misty rainforest
  //       "2bd93079-b10e-4be3-9545-17fa3bc3bfd2", // arid mesa
  //       "2cae1d08-5bda-4eeb-8134-bdb62ad6f44e", // marsh flats
  //       "1fdf9438-fd5f-4638-8f41-dae35ae8f257", // elspeth
  //       "73a065e3-b530-4e62-ab3c-4f6f908184ec",
  //       "53b11c30-1c4e-4238-9d42-2e1480df60c1", // ugin
  //       "64a5d494-efa1-446b-bebe-2ad36e154376",
  //       "ed36429e-ec50-4bdf-9d07-03b4e4861661", // verdant catacombs
  //       "ec3de5f4-bb55-4ab9-995f-f3e0dc22c1bb", // voice
  //       "73f24785-c7b3-46ab-833e-666af3d86c63",
  //       "2c0372d8-362d-486e-96c0-5738427a1087", // mox jasper
  //     ]
  //   },
  //   {
  //     pack_type: "collector_booster",
  //     cards: [
  //       "ec33ea23-c8e8-4066-91b9-5e0ad191bcdb", // mox jasper serialized
  //       "2e7cb37b-3ab5-42d0-860a-0c0760924850", // ugin, eye of the storm
  //       "89b98fd0-e2e5-4533-af2b-5230af2c88bd", // elspeth, storm slayer
  //       "25eb3f16-d2af-4d06-aae4-474a3005e42f", // misty rainforest
  //       "b8d6378f-21d9-43e4-80ee-d383bf31f8fc", // scalding tarn
  //       "2e2d59f5-369c-4f16-b0b9-3850d769d1f9", // marsh flats
  //       "152ddaab-83dd-4f74-bd7f-8a14c1a9d0f2", // arid mesa
  //       "b856e2f2-444b-45a0-ae76-9011960193a1", // verdant catacombs
  //       "c13f37b1-48ff-45b5-8625-d089073ca90b", // craterhoof behemoth
  //       "38b6d099-e31f-45b5-b78a-72a4b38d60f0", // dracogenesis
  //       "d5eada03-eaca-4091-8fa0-f8e996a402ad", // clarion conqueror
  //       "f421da3b-b88d-4e9f-865b-61120bff917a",
  //     ]
  //   }
  // ],

  // "blb": [
  //   {
  //     pack_type: "play_booster",
  //     cards: [
  //       "b43b3c33-aa44-4001-87ff-695bf04f51be", // lumra borderless
  //       "065cd3b9-b5aa-44d3-93f4-3a43694d7a1a", // sword of fire and ice spg
  //       "657a745d-038e-4cbd-9ffb-2a76009400a7", // sylvan tutor spg
  //       "1cb16046-10bf-433a-acaf-7127c0954a1c", // three tree city
  //       "8e1d8486-370a-49b6-9145-060814f38677",
  //       "3d99587a-7fb1-41fc-b7ea-1178f9625081", // lumra field notes
  //       "06008bcb-ce6b-482c-9253-f5b9b5e0718e",
  //       "d96b0f9e-fa3b-4a40-acea-b6ecc584a79f",
  //       "ae4f3aaf-3960-48cd-b34b-32e4ae5ae088",
  //       "390c96b3-68da-4a42-89ab-d9ccc79ce0dd", // bria, riptide rogue
  //       "56f88a48-cced-4a9d-8c19-e4f105f0d8a2", // three tree city
  //       "c0564116-24c1-4b5d-bb9e-a0828fe164b7", // ledger shredder spg
  //     ]
  //   },
  //   {
  //     pack_type: "collector_booster",
  //     cards: [
  //       "5c75bab8-02d0-477c-bfb1-dace7cb33a1f", // ms. bumbleflower blc
  //       "8487cfce-2b73-4082-a1f2-dea263811516", // lumra, bellow of the woods
  //       "798d161f-230d-4115-8351-ec6e33ed1730", // chatterfang, squirrel general blc
  //       "97c67e86-5aa5-4136-a15c-c0c5704e2b94", // jace, the mind sculptor
  //       "0b511524-e628-41d4-b0dc-d98961d4e9e1", // baylen, the haymaker
  //       "a1b46777-bf87-4cbd-9e85-ab0be33f0362", // bello, bard of the brambles blc
  //       "e68bb0bf-2907-4413-bfe3-c5f1b40c2b93", // hazel of the rootbloom blc
  //       "af6c496c-c70e-46f0-b161-661620767de5", // ral, crackling wit
  //       "ae319473-9594-4395-bd53-a7c91864b0e7", // liliana of the dark realms blc
  //       "88ca7c86-92d8-4a24-81b1-9eb11392160d", // vren, the relentless
  //       "6263bd74-3f44-4206-8d4d-f90c333b601d", // zinnia, valley's voice blc
  //       "4ad70a0b-3845-4b92-9c15-985a3fe0e1f2", // gev, scaled scorch
  //     ]
  //   }
  // ],

  // "eoe": [
  //   {
  //     pack_type: "play_booster",
  //     cards: [
  //       "3afebe8a-9f21-4260-8e93-1ab1dff13c09", // ancient tomb
  //       "2b0e16d5-a3e5-4e58-9f97-3d967618f015", // quantum riddler
  //       "209c591a-4ab2-4e89-9523-a7b766cf4e51", // ouroboroid
  //       "120be808-ff3b-4fca-96a1-4db6b9825856", // quantum riddler
  //       "5cf53baa-b0c3-4190-a5c6-c141d54cff32", // tezzeret, cruel captain
  //       "930ff1c5-7f34-47b8-8e8b-720909cc6a69", // gemstone caverns
  //       "9f1ae7a8-cb6a-4877-810a-f51a3951e7c3", // sliver overlord spg
  //       "a53c6a0e-9bbc-4a7b-8059-bc20806823d9", // burgeoning spg
  //       "a374b6ef-bd75-4eae-ac7a-09332b0a653d", // mana confluence
  //       "62aa232c-6034-4417-95a6-77b3a81c505c", // strip mine
  //       "b090cb9e-fcdd-4fc2-8e5d-b63511f83a13", // green sun's zenith spg
  //       "d9482aab-6ddf-48e1-84fa-b13d5ff81e69", // icetill explorer
  //     ]
  //   },
  //   {
  //     pack_type: "collector_booster",
  //     cards: [
  //       "07b10f1b-b03b-4f19-bc7e-69d5eaa5ff07", // sothera, the supervoid headliner
  //       "41914164-311e-4f8d-b002-c0d313bf658b", // 1. ancient tomb
  //       "263aac65-b18b-45ed-80c1-12428dfc5a4c", // 2. mana confluence
  //       "a8eaadbb-2f83-4fc5-8e69-5b31b48eb254", // 3. gemstone caverns
  //       "3283c6d2-7061-460f-9c2b-a362cd7085bf",
  //       "b2ace91b-0329-4511-bf45-cb72e0ebeae0", // icestill explorer
  //       "d8a6759d-e858-41d0-a5e3-a2ac1d074263", // starfield vocalist
  //       "a827ede4-eec6-4a9d-b491-cddfab6aa39b", // exalted sunborn
  //       "946f355a-f621-4571-8082-cebba73ebd1c",
  //       "582e10e0-2df9-4b8a-b2d9-9e5fa7c7b5d6", // 4. lotus field
  //       "901e5800-9004-4219-bd16-59a7ff282cee",
  //       "82c18acf-fb83-4045-89c6-6dcea1cc63b7", // 5. inventors' fair
  //     ]
  //   }
  // ],

  "fin": [
    {
      pack_type: "play_booster",
      cards: [
        "cd212de7-25f6-4b3b-a35b-df7d87fe205b", // rhystic study fca
        "f57d0446-1eae-4b88-b65c-92a14a3f9cef", // buster sword
        "f6cbc754-8aed-4c32-857c-ea639943b5d2", // ancient copper dragon fca
        "83c82209-47d5-4c4c-b8ec-96ab907e15d3", // sephiroth, fabled SOLDIER
        "f150d6e9-3da6-4655-9c63-dd34525d08a1",
        "fd5cb1fc-71b2-4b05-abd3-c90e95c53ad1", // bahamut
        "5d8690ec-fded-4801-8eaf-5e5fe3d444ec", // cloud, midgar mercenary
        "28ce1dbc-508c-4d09-8e44-37bf5ebfdc8f", // traveling chocobo
        "374d7383-a1a7-4eea-91f7-290180e14cc9", // buster sword
        "ecc1027a-8c07-44a0-bdde-fa2844cff694", // vivi ornitier
        "a71d1ec3-2d7a-4749-8936-8bf7a8b83d84", // ragavan, nimble pilferer fca
        "be2af52c-9f38-40e4-a643-06c5f2a9f416", // lightning, army of one
      ]
    },
    {
      pack_type: "collector_booster",
      cards: [
        "6ce8744a-ede3-4662-968a-360eb6639f08", // serialized golden choco
        "156cfd45-1556-4804-becf-039cfff7de3d", // blue choco
        "e40d85a5-ecfa-4f95-920b-404eb448324f", // green choco
        "ac3db85f-8cc3-4869-a555-882b62a1726b", // pink choco
        "71b97e69-f198-41ec-9385-015ec2f0160f", // black choco
        "81690ce7-0651-40e4-9769-baebe10e2cbf", // yellow choco
        "db95465a-2a58-44d7-9439-edd18c9505f0", // sephiroth, fabled soldier
        "58cca3dc-eac8-4ef6-a2c0-d46d9240d06b", // y'shtola, night's blessed
        "c22ebe7c-dcfe-4cb2-b6c4-2b4eaa1e635d", // cloud, ex-SOLDIER
        "f0b73ab0-b8eb-4a6f-a8d9-25d56fdf740a", // cloud, midgar mercenary
        "2819652e-c944-4c5d-a098-2d15e232366e", // yuna, grand summoner
        "ec975a48-5919-4666-9c60-b9fbe986f18c", // tifa, martial artist
      ]
    }
  ],

  "dft": [
    {
      pack_type: "play_booster",
      cards: [
        "da3b705c-a5c9-4e65-9a5e-31b7dc734623", // chrome mox spg
        "2dd78806-621a-4f9f-936c-527ec9659667", // bone miser spg
        "70efc6f3-2fdc-4629-84b9-f3707b799460", // riverpyre verge
        "57a93a71-d77c-417f-85d0-cd420f573331",
        "05690d52-06c4-40b1-8360-380418a83250", // the aetherspark
        "d21433ba-0a14-42bc-ad0b-a4ef823a3295", // monument of endurance
        "d6c144f5-37ec-41d7-8acd-6e7b94f12701", // chandra's ignition spg
        "b5118bab-a940-4549-8173-a467bc38193e", // pathbreaker ibex spg
        "0f9a3f71-d03c-4f32-bd9d-95a1d91c2ff5", // thoughtcast spg
        "c92a7ca5-a25b-4888-a319-6e176ab4d0ce", // sunbillow verge
        "0a786855-6eb4-42c0-a528-4842db46809d", // stock up
        "6ba2edc7-dbc0-4948-9f37-a27a91bdf7b9", // bleachbone verge
      ]
    },
    {
      pack_type: "collector_booster",
      cards: [
        "934cc1ca-2ce8-4062-b1b7-1976e76da8b6", // serialized the aetherspark
        "656ba742-b00f-4fce-8418-987226c25a81", // radiant lotus
        "da3b705c-a5c9-4e65-9a5e-31b7dc734623", // chrome mox spg
        "89fba04a-20ab-40eb-9edf-89fdd03bfb7e", // loot, the pathfinder
        "d6a40fa6-4378-413b-bed8-7eb0d61b70ad", // chandra, spark hunter
        "3c15a04e-b0a7-4560-a838-94213dbb2336", // cursecloth wrappings
        "8327b4b6-058e-448b-99ca-7d2de52d3b4c", // mu yanling, wind rider
        "1b9fbbfc-8920-46cd-95cd-2372feb4617a", // march of the world ooze
        "6b243165-79ad-4193-af89-2ad5e34fc415", // mimeoplasm, revered one
        "22fd4f1b-afbd-41a5-a76a-f9788e0cec9d", // sepctacular pileup
        "0e73d4ed-def7-4456-a750-74fb2bf10f9f", // salvation engine
        "2dd78806-621a-4f9f-936c-527ec9659667", // bone miser spg
      ]
    }
  ],

  "spm": [
    {
      pack_type: "play_booster",
      cards: [
        "1982f910-a9bd-4e94-a187-84381b22aacc", // the soul stone
        "9126dfa0-b681-44c7-9ae1-7926df8a2767", // gwen stacy
        "d7b0a0d5-a9fe-49ea-9250-8825b36accc0", // opposition agent mar
        "0c9c514f-f506-4b2c-af58-79922834cde7", // parallel lives
        "3e560cb9-3036-46a2-a5c7-edb04d0095b7", // reanimate
        "4ab0cb80-4330-408b-bc03-ef96dd34177e", // gwen stacy
        "db88b6b6-7907-4c40-b712-4fa1456d8ad0", // multiversal passage
        "f5fb426a-5618-4dd4-9c51-0cc847be8c1d",
        "5fb701f6-bfad-4b43-9a0f-85496973d849", // heroic intervention mar
        "c47d09a5-a6d2-4bc2-bf65-b32e3c897c49", // skithiryx, the blight dragon mar
        "d672cfad-e656-47f8-bf93-64f262aff33e", // electro, assaulting battery
        "08da9f92-0e25-4f39-aaa4-d8974af81a41", // imposter syndrome
      ]
    },
    {
      pack_type: "collector_booster",
      cards: [
        "2c3df372-09d5-42fb-9357-3f97745e07c4", // the soul stone cosmic
        "f9d80efc-e829-4257-83e8-f37b0b68de57", // the soul stone thanos
        "6e9491af-6e93-46b8-b98c-96a2cc621454", // spectacular spider-man - black suit
        "ee9d4bf3-a53e-4940-b25b-e927f06df736", // spectacular spider-man - bag-man
        "cae418f9-e001-4580-b743-74d134b06aa6", // spectacular spider-man - sensational
        "59bdb4a0-0f2d-4018-ad74-3970a5cd71ab", // spectacular spider-man - MK I suit
        "011b71a9-c06d-4fd6-8543-ad21f4759473", // spectacular spider-man - future foundation
        "49852fa3-272c-4ca4-b0dc-0b80f2982fd9", // spectacular spider-man - stealth
        "2362fb6d-161d-479b-b1f4-909360ba5d84", // spectacular spider-man - six-armed
        "4d174223-b7d5-4c71-8a3d-8c878a5b45b7", // comic book - eddie brock
        "98912aae-4e42-4434-b979-9c85f09f8d6d", // comic book - peter parker
        "d938ceec-c45b-482c-8841-c97098697cc8", // comic book - miles morales
      ]
    }
  ],

  "tla": [
    {
      pack_type: "play_booster",
      cards: [
        "d4bf05c4-a924-4006-835e-42f8468ba869", // wan shi tong, librarian
        "be16c053-99e1-4921-8530-5135c989149d", // badgermole cub
        "340c5799-4964-44dd-8c48-8f3f3aba5211", // badgermole cub
        "5e861bb6-0841-4a84-9d65-1d45ea87e90d", // the great henge tle
        "5c5e8aa5-91d7-49d2-863a-b9db836436fd", // oazi, the phoenix king
        "e20da6b5-1057-4a28-9e85-07de714e262f", // wan shi tong, librarian
        "aac6ecc6-e5d7-40a3-b689-f4ed2d5c78cf", // teferi's protection tle
        "cb795f86-3721-4ae5-9893-49d7d9973f86", // force of negation
        "086b6003-6d90-426b-809e-ea837d868290", // the walls of ba sing se
        "4d822fa1-70f9-4a63-841d-31c94e1e3dd4", // appa, steadfast guardian
        "257928ba-27ae-4a11-ae41-76dfcd626ed4", // avatar aang
        "281b8979-aefc-4fe7-a130-3638cdc0b1dd", // fire lord azula
      ]
    },
    {
      pack_type: "collector_booster",
      cards: [
        "d0467b6f-8c7d-4fcd-99f8-d335bb736484", // headliner aang
        "372afa84-9ca9-46e6-8643-e16249505c59", // neon aang
        "1381ec47-55fd-47d9-aded-d21776bc06b9", // neon toph
        "15260c74-6400-46bd-a144-9d9e107eab8a", // neon katara
        "0c457a8b-8d56-474d-b788-c058a9882fdd", // neon zuko
        "c2cb5a93-d2f9-4df6-9488-c57b6f18ae2b", // deflecting swat tle
        "d4bf05c4-a924-4006-835e-42f8468ba869", // wan shi tong, librarian
        "be16c053-99e1-4921-8530-5135c989149d", // badgermole cub
        "ac4fc06d-50b8-455f-8d14-85c0c791c422", // fierce guardianship tle
        "91070e35-2e17-4045-a8ac-0056cb0a2b11", // toph, earthbending master
        "340c5799-4964-44dd-8c48-8f3f3aba5211", // badgermole cub
        "5e861bb6-0841-4a84-9d65-1d45ea87e90d", // the great henge tle
      ]
    }
  ],
};

module.exports = TOP_CARD_LIST;
