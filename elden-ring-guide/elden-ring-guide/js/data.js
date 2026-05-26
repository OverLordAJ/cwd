// ============================================================
//  Elden Ring + Shadow of the Erdtree — Complete Guide Data
// ============================================================

const BOSSES_MAIN = [
  {
    id: 'margit', name: 'Margit, the Fell Omen',
    location: 'Stormhill — path to Stormveil Castle, Limgrave',
    region: 'Limgrave', coords: { x: 31, y: 70 },
    weaknesses: ['Fire', 'Holy', 'Bleed', 'Scarlet Rot'],
    resistances: ['Magic', 'Lightning'],
    drops: ['Talisman Pouch', '12,000 Runes'],
    backstory: 'Margit is the self-appointed guardian who bars the path to Stormveil Castle, warning Tarnished they are unworthy. He is in truth Morgott, the Omen King, wearing a disguise to covertly protect Leyndell from rising demigod challengers. Born cursed as an Omen — with goat horns and a scorpion tail — Morgott was sealed beneath the Royal Capital\'s sewers at birth, yet despite being rejected by the very Golden Order he serves, he devoted his entire existence to protecting it, taking the alias Margit to silently eliminate threats before they could reach the Erdtree.',
    tips: 'Use Margit\'s Shackle (bought from Patches or found in Stormhill Shack) to pin him twice in Phase 1. Dodge toward him during multi-hit combos. Summoning the NPC Sorcerer Rogier and a Spirit Ash helps split his aggro.',
    difficulty: 4, phases: 2, type: 'main'
  },
  {
    id: 'godrick', name: 'Godrick the Grafted',
    location: 'Stormveil Castle, Limgrave',
    region: 'Limgrave', coords: { x: 29, y: 68 },
    weaknesses: ['Fire', 'Bleed', 'Scarlet Rot'],
    resistances: ['Lightning'],
    drops: ['Godrick\'s Great Rune — boosts all attributes', 'Remembrance of the Grafted', '20,000 Runes'],
    backstory: 'Godrick the Grafted rules Stormveil Castle as self-styled "Lord of All," yet he is widely regarded as the weakest demigod. A descendant of Godfrey, he is obsessed with grafting limbs and heads of fallen foes onto himself to compensate for his inadequacy. When Malenia invaded during the Shattering, he fled rather than face her in battle. In desperation, he grafted a dragon\'s head onto his arm as a last resort. Despite his cowardice and cruelty, his desperate drive to prove himself worthy of his legendary lineage is tragic — he simply lacked the innate power of his kin.',
    tips: 'Nepheli Loux can be summoned as an NPC ally outside the fog gate. Phase 2 he grafts a dragon head and gains fire breath sweeps — stay at his sides. His slam attacks have long recovery windows: dodge in and punish.',
    difficulty: 3, phases: 2, type: 'main'
  },
  {
    id: 'rennala', name: 'Rennala, Queen of the Full Moon',
    location: 'Grand Library, Raya Lucaria Academy, Liurnia of the Lakes',
    region: 'Liurnia', coords: { x: 31, y: 52 },
    weaknesses: ['Physical — hit glowing students (Phase 1)', 'No strong weakness in Phase 2'],
    resistances: ['Magic', 'Holy', 'Fire', 'Lightning'],
    drops: ['Great Rune of the Unborn — allows Rebirth (respec stats)', 'Remembrance of the Full Moon Queen', '40,000 Runes'],
    backstory: 'Rennala was the proud head of the Carian Royal Family and matriarch of Raya Lucaria Academy — a supreme sorceress who wielded the power of the full moon. She fell deeply in love with a wandering warrior named Radagon, who became her consort and fathered Ranni, Rykard, and Radahn. When Radagon abandoned her to marry Queen Marika (who is, in fact, his other self), Rennala shattered emotionally. Her devoted students wrapped her in their golden oath — a cocoon of adoration that became her eternal prison. Now she endlessly cradles the amber egg Radagon left her, performing hollow rituals of rebirth, unable to create true life.',
    tips: 'Phase 1: Search for the glowing golden student in the mass — hit them to drop Rennala. Repeat three times. Phase 2: Her sorceries are slow but wide. Dodge her Full Moon projectile through it (not away). Attack during her casting recovery.',
    difficulty: 2, phases: 2, type: 'main'
  },
  {
    id: 'radahn', name: 'Starscourge Radahn',
    location: 'Wailing Dunes, Redmane Castle Festival — Caelid',
    region: 'Caelid', coords: { x: 72, y: 62 },
    weaknesses: ['Scarlet Rot', 'Bleed'],
    resistances: ['Magic', 'Lightning'],
    drops: ['Radahn\'s Great Rune — raises max HP, FP, and Stamina', 'Remembrance of the Starscourge', '70,000 Runes'],
    backstory: 'Starscourge Radahn was the mightiest demigod warrior in the Lands Between — son of Radagon and Rennala, general of a massive army, and master of gravity magic. He was so powerful he held the very stars in stasis with his gravitas to prevent a prophecy that would have sealed Ranni\'s fate. He always rode his small horse Leonard into battle, having studied gravity sorcery partly just to remain light enough for the steed he loved. During the Shattering, Malenia invaded Caelid to challenge him. Their epic confrontation ended when Malenia unleashed the Scarlet Rot bloom, devastating all of Caelid and reducing Radahn to a mindless feral beast who still wanders the sands. The Festival of Radahn is a mercy killing.',
    tips: 'The festival allows you to summon every NPC ally available in the game. Use all of them. Phase 2: Radahn crashes in from orbit — sprint away when the sky darkens, then resume. Rivers of Blood or frost builds up fast. Torrent can be used throughout.',
    difficulty: 5, phases: 2, type: 'main'
  },
  {
    id: 'rykard', name: 'Rykard, Lord of Blasphemy',
    location: 'Temple of Eiglay, Volcano Manor — Mt. Gelmir',
    region: 'Mt. Gelmir', coords: { x: 37, y: 37 },
    weaknesses: ['Serpent-Hunter Great Spear (required)', 'Holy'],
    resistances: ['Fire', 'Scarlet Rot'],
    drops: ['Rykard\'s Great Rune — restores HP on kills', 'Remembrance of the Blasphemous', '130,000 Runes'],
    backstory: 'Rykard, son of Radagon and Rennala, harbored a deep resentment for the Erdtree and its gods. Rather than fight the Golden Order from outside, he chose to devour it from within — he willingly fed himself to the God-Devouring Serpent, merging with it to gain blasphemous power. He founded Volcano Manor as a recruitment front, luring champions to join his cause and assassinate Erdtree envoys. His goal was simple: to consume every god. His followers — the Volcano Manor assassins — still worship him, drawn by his anti-establishment fury and the promise of a world free from the Erdtree\'s dominion.',
    tips: 'You MUST use the Serpent-Hunter Great Spear found just inside the boss door — it deals special bonus damage against Rykard. Use its L2 thrusting skill repeatedly from mid-range. The Blasphemous Claw item lets you parry his unblockable attacks in Phase 2.',
    difficulty: 3, phases: 2, type: 'main'
  },
  {
    id: 'morgott', name: 'Morgott, the Omen King',
    location: 'Erdtree Sanctuary, Leyndell — Royal Capital',
    region: 'Altus Plateau', coords: { x: 52, y: 48 },
    weaknesses: ['Fire', 'Bleed', 'Holy', 'Scarlet Rot'],
    resistances: ['Lightning'],
    drops: ['Morgott\'s Great Rune — greatly raises max HP', 'Remembrance of the Omen King', '120,000 Runes'],
    backstory: 'Morgott is the true identity of Margit the Fell Omen — the last of the Omen kings and the most tragic figure in the Lands Between. Born cursed as an Omen with goat horns and a scorpion tail, he was cast into the sewers beneath Leyndell at birth, branded anathema by the very Golden Order that was his birthright. Yet Morgott never wavered in his devotion. He self-suppressed his own cursed powers with his own blood, took the alias Margit, and walked the world in disguise to silently protect the Erdtree from all who would harm it. He is utterly devoted to a faith that condemns his very existence.',
    tips: 'An upgraded, faster Margit with a far larger arsenal of conjured weapons. Margit\'s Shackle still works twice. His delayed overhead slams require patience — dodge only when you see the weapon begin to drop. Spirit Ashes remain crucial.',
    difficulty: 4, phases: 2, type: 'main'
  },
  {
    id: 'fire-giant', name: 'Fire Giant',
    location: 'Flame Peak, Mountaintops of the Giants',
    region: 'Mountaintops of the Giants', coords: { x: 66, y: 18 },
    weaknesses: ['Frost / Cold', 'Bleed'],
    resistances: ['Fire (immune)'],
    drops: ['Remembrance of the Fire Giant', '180,000 Runes'],
    backstory: 'The Fire Giant is the last survivor of an ancient race of primordial giants who once waged war against the Erdtree. The giants nearly succeeded in destroying the Erdtree with the Flame of Ruin before Godfrey\'s forces defeated them. Rather than kill this final giant, Queen Marika chose to keep him alive — shackled, maimed, with a cursemark over his eye that allows control of the Flame of Ruin. He was left chained on the Mountaintops as a living key, tormented for untold ages. He is not evil — merely a prisoner who cannot escape his terrible, centuries-long purpose.',
    tips: 'Phase 1: Target his ankle — the shackled one. Ride Torrent to close distance quickly between his stomps and rolls. Phase 2: He tears off his lower half and props himself up on his hands — now target his torso\'s exposed eye. Frost buildup deals excellent damage.',
    difficulty: 3, phases: 2, type: 'main'
  },
  {
    id: 'godfrey', name: 'Godfrey, First Elden Lord / Hoarah Loux',
    location: 'Erdtree Throne (shade) → Elden Throne, Ashen Capital',
    region: 'Altus Plateau', coords: { x: 53, y: 46 },
    weaknesses: ['Lightning', 'Bleed'],
    resistances: ['Physical (very resilient)'],
    drops: ['Remembrance of Hoarah Loux', '500,000+ Runes'],
    backstory: 'Godfrey was the first Elden Lord — a legendary warrior chosen by Queen Marika to lead her armies and conquer those who defied the Erdtree. When all wars were won and enemies vanquished, Marika stripped him of his grace and exiled him, as she had always planned. He reverted to Hoarah Loux the warrior — chieftain of the Badlands and leader of those who would become the Tarnished. After ages as a mortal wanderer, the call of grace returned. Godfrey arrives in the Ashen Capital not as a servant but as a conqueror seeking to reclaim what was his. In Phase 2, he strips away the Elden Lord facade entirely, fighting as Hoarah Loux with primal, savage ferocity.',
    tips: 'Phase 1 (Godfrey): Huge axe combos with long recovery — dodge through them and punish. Phase 2 (Hoarah Loux): Extremely fast grapple attacks that can one-shot you. Dodge away from grapples. Watch for his ground-pound that creates a cross-pattern shockwave — jump over it.',
    difficulty: 5, phases: 2, type: 'main'
  },
  {
    id: 'radagon-elden-beast', name: 'Radagon of the Golden Order / Elden Beast',
    location: 'Erdtree Sanctuary → Elden Throne, Leyndell',
    region: 'Leyndell', coords: { x: 52, y: 47 },
    weaknesses: ['Lightning (Radagon)', 'Black Flame (both phases)', 'Physical'],
    resistances: ['Holy (both)', 'Magic'],
    drops: ['Elden Remembrance', '500,000 Runes'],
    backstory: 'Radagon of the Golden Order is the greatest secret in Elden Ring: he and Queen Marika are the same person. Radagon began as a separate warrior who married Rennala, then was called to become Marika\'s consort — an act of Marika unifying him as her second self. As Elden Lord, Radagon zealously tried to repair the Elden Ring after Ranni stole the Rune of Death. The Elden Beast is the physical manifestation of the Golden Order itself — a cosmic entity dispatched by the Greater Will from beyond the stars, which has inhabited and controlled Marika/Radagon for eons. Defeating both ends the age of the Erdtree.',
    tips: 'No checkpoint between phases — prepare fully before entering. Black Flame Blade or Black Flame incantation deals percentage-based HP damage excellent against the Elden Beast\'s massive health pool. In Phase 2, use Torrent to close distance fast. Stay under the Elden Beast\'s body during melee.',
    difficulty: 5, phases: 2, type: 'main'
  },
  {
    id: 'malenia', name: 'Malenia, Blade of Miquella',
    location: 'Elphael, Brace of the Haligtree — Consecrated Snowfield',
    region: 'Consecrated Snowfield', coords: { x: 37, y: 12 },
    weaknesses: ['Frost', 'Lightning'],
    resistances: ['Scarlet Rot (immune)', 'Bleed (she heals from it too)'],
    drops: ['Malenia\'s Great Rune — restore HP with each hit like her lifesteal', 'Remembrance of the Rot Goddess', '480,000 Runes'],
    backstory: 'Malenia, Blade of Miquella, is arguably the most legendary figure in the Lands Between. Born cursed with Scarlet Rot — a divine affliction that slowly consumes her — she trained relentlessly and became a warrior who has never been defeated in her own mind. She is the twin sister of Miquella and his devoted protector. During the Shattering she marched on Caelid to face the only warrior she considered worthy — Radahn. Their battle was epic, ending when a weakened Malenia unleashed the Scarlet Rot bloom that destroyed all of Caelid. She retreated to Elphael to await Miquella\'s return, slowly transforming into a true goddess of rot. Optional, but her Remembrance contains Hand of Malenia and Scarlet Aeonia incantation.',
    tips: 'She heals on every hit that connects — even blocked. The Waterfowl Dance combo is lethal: dodge into the first flurry, then away from the second. Frost is excellent because staggers prevent her lifesteal window. Rivers of Blood katana is historically the most effective tool against her.',
    difficulty: 5, phases: 2, type: 'main'
  },
  {
    id: 'mohg', name: 'Mohg, Lord of Blood',
    location: 'Mohgwyn Palace — Siofra River underground (via Pureblood Knight\'s Medal or Varre questline)',
    region: 'Underground', coords: { x: 20, y: 55 },
    weaknesses: ['Fire', 'Frost'],
    resistances: ['Holy', 'Bleed (immune)'],
    drops: ['Mohg\'s Great Rune — grants Blessing of Blood to summoned phantoms', 'Remembrance of the Blood Lord', '420,000 Runes'],
    backstory: 'Mohg, Lord of Blood, is the twin brother of Morgott — both born as cursed Omens and cast into Leyndell\'s sewers. While Morgott devoted himself to the Golden Order, Mohg made contact with the Formless Mother, an outer god of blood, and was gifted tremendous power. He escaped the sewers and built his crimson dynasty deep underground in Mohgwyn Palace. Mohg kidnapped the sleeping Miquella from his Haligtree cocoon, seeking to crown him as a god and ascend as his consort. The DLC begins immediately after Mohg\'s defeat, as the Tarnished reaches into Miquella\'s cocoon.',
    tips: 'In Phase 2 he shouts "Nihil!" three times and drains your HP through a blood curse. Use the Purifying Crystal Tear in your Flask of Wondrous Physick before the fight — it completely negates this mechanic. Frost and fire both stack well on him.',
    difficulty: 4, phases: 2, type: 'main'
  },
  {
    id: 'maliketh', name: 'Maliketh, the Black Blade',
    location: 'Crumbling Farum Azula — Beast Sanctum',
    region: 'Farum Azula', coords: { x: 87, y: 22 },
    weaknesses: ['Fire (Phase 1 as Beast Clergyman)', 'Frost'],
    resistances: ['Lightning', 'Destined Death damage'],
    drops: ['Remembrance of the Black Blade', '220,000 Runes'],
    backstory: 'Maliketh the Black Blade is among the most powerful beings in existence — shadow and half-brother of Queen Marika, her sworn guardian. He was entrusted with the Rune of Death itself — the fragment of Destined Death removed from the Elden Ring when Marika sought to suppress true death and create the cycle of rebirth. He safeguards this rune within his Black Blade at Crumbling Farum Azula. He appears first as the Beast Clergyman — a hunched beast-like priest — and transforms upon defeat into his true magnificent and terrifying form. His defeat causes Leyndell to burn, transforming the Royal Capital into the Ashen Capital.',
    tips: 'Beast Clergyman (Phase 1): Brutal ground-slams and beast claw attacks. Stay close and dodge into attacks. Maliketh (Phase 2): Blindingly fast with massive range. His Black Blade slashes reduce your max HP temporarily. Jump over his ground shockwaves. Attack his feet, dodge into his body.',
    difficulty: 5, phases: 2, type: 'main'
  },
  {
    id: 'lichdragon-fortissax', name: 'Lichdragon Fortissax',
    location: 'Deeproot Depths — Fia\'s dream realm (via Fia\'s questline)',
    region: 'Underground', coords: { x: 44, y: 62 },
    weaknesses: ['Lightning', 'Fire', 'Bleed'],
    resistances: ['Death Lightning', 'Holy'],
    drops: ['Remembrance of the Lichdragon', '90,000 Runes'],
    backstory: 'Lichdragon Fortissax was an ancient and immensely powerful dragon who formed an extraordinary bond of friendship with Godwyn the Golden — firstborn son of Godfrey and Marika, beloved by all. When Ranni\'s assassination plot killed Godwyn\'s soul while leaving his body alive (a unique "soul death"), Fortissax descended into the Deeproot Depths to wrestle with the Death that was spreading through Godwyn\'s undying corpse. He fought for ages but was eventually corrupted himself, his divine lightning transforming into Death Lightning. He exists now in a dream realm within Fia, the Deathbed Companion, who sleeps with Godwyn\'s body in the Deeproot Depths.',
    tips: 'Access via Fia\'s questline: give her the Cursemark of Death found in the Divine Tower of Liurnia (Ranni\'s tower area). He uses Death Lightning that lingers on the ground — stay mobile. Stay at his feet below his neck to avoid most attacks. Dragon Communion incantations work well from mid-range.',
    difficulty: 3, phases: 1, type: 'main'
  },
  {
    id: 'astel', name: 'Astel, Naturalborn of the Void',
    location: 'Lake of Rot, Ainsel River underground — via Ranni\'s questline',
    region: 'Underground', coords: { x: 40, y: 70 },
    weaknesses: ['Fire', 'Bleed', 'Physical'],
    resistances: ['Magic', 'Lightning'],
    drops: ['Remembrance of the Naturalborn', '80,000 Runes'],
    backstory: 'Astel, Naturalborn of the Void, is a primordial cosmic horror — a creature born from the void of outer space that fell upon the underground Eternal City of Nokstella in a catastrophic falling star. It annihilated the civilization of Nokstella, leaving it a ruin. The survivors who remained attempted to study and ultimately cage Astel. Its power over gravity and the void is immense — it can teleport, crush with gravitational force, and fire beams of cosmic energy. A second Astel, Stars of Darkness, exists elsewhere underground. These beings predate the current age and hint at vast cosmic horrors beyond the Greater Will\'s reach.',
    tips: 'The approach arena has Scarlet Rot buildup — bring Preserving Boluses. Astel teleports frequently; wait for it to reappear. Stay under its body and target its head when it descends low. Watch for its grab — it teleports you into the sky and drops you for massive fall damage.',
    difficulty: 4, phases: 1, type: 'main'
  },
  {
    id: 'placidusax', name: 'Dragonlord Placidusax',
    location: 'Crumbling Farum Azula — time-lost arena (lie down at the altar platform)',
    region: 'Farum Azula', coords: { x: 85, y: 25 },
    weaknesses: ['Frost', 'Bleed', 'Scarlet Rot'],
    resistances: ['Lightning', 'Fire'],
    drops: ['Remembrance of the Dragonlord', '280,000 Runes'],
    backstory: 'Dragonlord Placidusax was the Elden Lord before Godfrey — not a human, but a two-headed dragon who served a god that preceded the Greater Will. When that primordial god fled the Lands Between, Placidusax refused to abandon his post. He retreated into a time-loop in Crumbling Farum Azula, waiting for his god\'s return for eons. He is said to have originally possessed multiple heads, losing them in ancient battles. Ancient beyond measure, he fights with temporal distortion, golden lightning, and fire, blinking in and out of time itself. He is entirely passive until the Tarnished chooses to wake him by lying down at the broken ground above the tornado.',
    tips: 'Lie at the broken ground near the upward tornado in Farum Azula to trigger. He teleports in and out — track his shadow on the ground to predict where he reappears. Frost and Bleed stack well. Stay under his body and attack — his heads and tail have devastating range.',
    difficulty: 4, phases: 2, type: 'main'
  },
  {
    id: 'mimic-tear', name: 'Mimic Tear',
    location: 'Nokron, Eternal City — Night\'s Sacred Ground (underground via Radahn Festival)',
    region: 'Underground', coords: { x: 42, y: 65 },
    weaknesses: ['Strip your loadout BEFORE entering the fog gate'],
    resistances: ['Whatever you use most — it copies you exactly'],
    drops: ['Silver Tear Mask', 'Larval Tear', '80,000 Runes'],
    backstory: 'The Mimic Tear is a creature of the Eternal City of Nokron — a silver tear-drop that takes the perfect form of whoever it encounters, copying their appearance, weapons, armor, and sorceries. The Eternal City was built by the Numen in worship of the Greater Will, and these silver tears were crafted as impossible mirrors of life. When it encounters the Tarnished, it becomes them entirely. The Mimic Tear asks a philosophical question central to the game: what truly defines a person — their soul, or their accumulated tools and power?',
    tips: 'Before entering the fog gate, open your inventory and unequip ALL weapons and armor. The Mimic copies your loadout at the moment of entry — enter bare-handed and it cannot fight. Then immediately re-equip and destroy it. If you forget, use spells or ranged attacks from a distance.',
    difficulty: 1, phases: 2, type: 'main'
  }
];

const BOSSES_DLC = [
  {
    id: 'dancing-lion', name: 'Divine Beast Dancing Lion',
    location: 'Shadow Keep — Main Gate, Scadu Altus',
    region: 'Scadu Altus', coords: { x: 22, y: 30 },
    weaknesses: ['Lightning', 'Bleed'],
    resistances: ['Frost', 'Fire'],
    drops: ['Remembrance of the Dancing Lion', 'Spelldrake Talisman +2', '380,000 Runes'],
    backstory: 'The Divine Beast Dancing Lion is a sacred construct of the Land of Shadow — a holy guardian given life through ancient ritual whose movements mirror a ceremonial lion dance while delivering devastating elemental punishment. It channels storms, frost, and divine lightning through its graceful yet ferocious form. Connected to traditions that predate Miquella\'s arrival in the Land of Shadow, the Dancing Lion serves as the threshold guardian of Shadow Keep, testing the resolve of any who would venture further into Messmer\'s domain.',
    tips: 'Roll toward its face during breath attacks — staying in its face prevents the full chain. Lightning-infused weapons deal massive bonus damage. Watch for the wind tornado spiral — stay close to the body to avoid the outer ring damage. Phase 2 adds freezing frost breath: fire resistance flask helps.',
    difficulty: 3, phases: 2, type: 'dlc'
  },
  {
    id: 'rellana', name: 'Rellana, Twin Moon Knight',
    location: 'Castle Ensis, Gravesite Plain',
    region: 'Gravesite Plain', coords: { x: 28, y: 55 },
    weaknesses: ['Fire', 'Bleed'],
    resistances: ['Magic', 'Cold / Frost'],
    drops: ['Remembrance of the Twin Moon Knight', 'Rellana\'s Twin Blades', '380,000 Runes'],
    backstory: 'Rellana was a pupil of Rennala at the Academy of Raya Lucaria who mastered both cold lunar sorcery and fire magic — a combination rarely achieved. She was the adopted sister of Miquella and followed him to the Land of Shadow out of devotion. There she encountered Messmer the Impaler and chose to pledge her sword to him — drawn perhaps by his burning grief or by some allegiance deeper than loyalty. She guards the only passage through Castle Ensis into Scadu Altus, wielding twin blades imbued with both cold moon and blazing fire.',
    tips: 'One of the earliest and hardest bosses in the DLC — upgrade your Scadutree Blessing before fighting her. Fire-dampening helps. Her twin blades mix cold thrusts and fire sweeps — dodge into the thrust, jump the fire sweeps. Phase 2 she extends every combo. She punishes greed hard — one punish, then back off.',
    difficulty: 4, phases: 2, type: 'dlc'
  },
  {
    id: 'putrescent-knight', name: 'Putrescent Knight',
    location: 'Stone Coffin Fissure — Lamenter\'s Gaol',
    region: 'Shadow Realm', coords: { x: 18, y: 42 },
    weaknesses: ['Fire', 'Lightning', 'Bleed'],
    resistances: ['Frost', 'Scarlet Rot'],
    drops: ['Remembrance of the Putrescent Knight', 'Putrescent Knight Spirit Ash', '380,000 Runes'],
    backstory: 'The Putrescent Knight is the eternal guardian of St. Trina, the lord of unaging slumber — a figure associated with sleep, dreams, and merciful forgetting (possibly another identity of Miquella). The knight waited so long in devotion that their body merged with putrid rot matter, becoming a grotesque fusion of decaying knight and festering growth. Their horse similarly melded with fog and putrefaction. Despite the physical horror of their form, the Putrescent Knight\'s loyalty transcends the physical — they serve with the same devotion they always had, regardless of what they have become.',
    tips: 'Found deep in the Stone Coffin Fissure area below the DLC map. The knight and horse move as one fluid unit. Watch for the dive-bomb lunge — dodge sideways at the last instant. Fire both clears the obscuring fog clouds and deals bonus damage. Standard dodge-and-punish works well with patience.',
    difficulty: 3, phases: 2, type: 'dlc'
  },
  {
    id: 'commander-gaius', name: 'Commander Gaius',
    location: 'Shadow Keep — west courtyard, Scadu Altus',
    region: 'Scadu Altus', coords: { x: 18, y: 27 },
    weaknesses: ['Bleed', 'Frost', 'Lightning'],
    resistances: ['Physical (heavily armored)'],
    drops: ['Remembrance of the Commander', '580,000 Runes'],
    backstory: 'Commander Gaius is the supreme military commander of Messmer\'s conquering army — the iron fist that enforces absolute order across the Land of Shadow. A massive warrior who rides an equally massive wild boar, Gaius and his mount operate as a single devastating unit. Utterly loyal to Messmer, he takes fierce pride in crushing all resistance through overwhelming momentum. There is no subtlety to Gaius — only the thunderous authority of a charge and the certainty that all opposition will be ground beneath him.',
    tips: 'His boar charge is his most dangerous attack — dodge directly to the side at the last moment, not early. He can be staggered to trip the boar, creating long windows. Bleed builds up rapidly on the boar\'s body. Stay at his flanks rather than directly in front or behind. In Phase 2 he gains gravitational slam attacks — dodge into them.',
    difficulty: 4, phases: 2, type: 'dlc'
  },
  {
    id: 'messmer', name: 'Messmer the Impaler',
    location: 'Shadow Keep — Shadow Keep Throne Room, Scadu Altus',
    region: 'Scadu Altus', coords: { x: 24, y: 24 },
    weaknesses: ['Lightning', 'Holy', 'Frost'],
    resistances: ['Fire', 'Serpent damage'],
    drops: ['Remembrance of the Impaler', 'Messmer\'s Kindling', '850,000 Runes'],
    backstory: 'Messmer the Impaler is Marika\'s hidden son — born of a union whose details she sought to erase from all history. Given tremendous power over serpent fire and sent to the Land of Shadow to purge it of its ancient inhabitants, Messmer did so with merciless efficiency, earning the name "the Impaler" for his preferred method of execution. When his purpose was complete and the ancient people were destroyed, Marika wiped all memory of him, leaving Messmer to govern the devastated Land of Shadow for eternity. His eternal burning grief — at being both rejected and erased — is the fuel for his serpentine flame.',
    tips: 'Widely considered one of FromSoftware\'s finest boss designs. Phase 1: Relentlessly aggressive spear and serpent flame combos. Dodge toward him constantly — many attacks whiff if you\'re inside them. Phase 2: Transforms partially into a serpent, gaining massive range. Lightning staggering is very effective. Flame-resistance flask for Phase 2.',
    difficulty: 5, phases: 2, type: 'dlc'
  },
  {
    id: 'midra', name: 'Midra, Lord of Frenzied Flame',
    location: 'Midra\'s Manse — inner sanctum, Scadu Altus',
    region: 'Scadu Altus', coords: { x: 35, y: 34 },
    weaknesses: ['Physical', 'Frost', 'Ranged attacks'],
    resistances: ['Fire', 'Frenzy / Madness'],
    drops: ['Remembrance of the Lord of Frenzied Flame', 'Midra\'s Flame of Frenzy', '480,000 Runes'],
    backstory: 'Midra was a nobleman who discovered ancient texts about the Three Fingers and the Frenzied Flame — knowledge so terrible it began consuming him. Rather than flee, he chose to contain the flame within himself, using his own body as a prison to keep others safe. His wife and servants locked themselves in Midra\'s Manse with him, devoted to keeping him from harming others. Notes left throughout the manor tell the story of his wife\'s desperate, loving, ultimately futile effort to save him. By the time the Tarnished arrives, the Frenzied Flame has overwhelmed Midra entirely — his head replaced by a burning halo of chaos, his name merely an echo of the man he was.',
    tips: 'Thoroughly explore the manse before the boss — the lore notes are essential and several items aid the fight. High Focus / Robustness stat prevents madness buildup from his aura. He\'s slow in Phase 1 — use ranged or punish heavily. Phase 2 he gains a massive flaming madness head and becomes much faster. Stay mid-range to bait attacks.',
    difficulty: 4, phases: 2, type: 'dlc'
  },
  {
    id: 'romina', name: 'Romina, Saint of the Bud',
    location: 'Church of the Bud, Shadow Realm (south Scadu Altus)',
    region: 'Shadow Realm', coords: { x: 30, y: 44 },
    weaknesses: ['Fire', 'Lightning', 'Frost'],
    resistances: ['Scarlet Rot (immune)', 'Bleed'],
    drops: ['Remembrance of the Saint of the Bud', '680,000 Runes'],
    backstory: 'Romina, Saint of the Bud, was a devotee of Scarlet Rot who traveled to the Land of Shadow to cultivate and spread the bloom across its sacred grounds. Her body is a grotesque fusion of human and centipede form, bristling with scarlet growths — a living garden of divine rot. She tends the Church of the Bud, where the Scarlet Rot flowers in terrible beauty. Romina may have been one of Malenia\'s disciples, serving to extend the goddess\'s reach beyond the Lands Between. Defeating her is the key to accessing Enir-Ilim and the final confrontation of the DLC.',
    tips: 'Her Scarlet Rot attacks build up rot extremely fast — Preserving Boluses and Immunizing Horn Charm are highly recommended. She attacks in rapid slashing combos with her centipede appendages. Stay to her sides rather than directly in front. Her grab deals enormous damage — dodge sideways the moment you see her rear back.',
    difficulty: 4, phases: 2, type: 'dlc'
  },
  {
    id: 'scadutree-avatar', name: 'Scadutree Avatar',
    location: 'Church District Ruins, Shadow Keep — fought in three stages',
    region: 'Scadu Altus', coords: { x: 23, y: 28 },
    weaknesses: ['Fire', 'Lightning', 'Bleed'],
    resistances: ['Holy', 'Physical'],
    drops: ['Holy-Shrouding Cracked Tear', 'Deflecting Hardtear', 'Scadutree Avatar Spirit Ash', '400,000 Runes'],
    backstory: 'The Scadutree Avatar is the living manifestation of the Scadutree — the great shadow tree standing in the Land of Shadow as a dark mirror of the Erdtree. While the Erdtree channels the blessing of the Greater Will through golden light, the Scadutree draws power from shadow and the deep faith of the Land of Shadow\'s original inhabitants. Miquella\'s arrival and the gathering of Scadutree Fragments disrupts this balance, causing the Avatar to rise and defend the sacred order of the shadow realm.',
    tips: 'A recurring boss fought across three escalating phases in the Church District. Each phase the Avatar becomes more aggressive. Its sweeping branch and stomp attacks have large AoE — dodge under or through them rather than away. High Scadutree Blessing level is critical for damage and defense here. Fire is its most reliable weakness.',
    difficulty: 3, phases: 3, type: 'dlc'
  },
  {
    id: 'metyr', name: 'Metyr, Mother of Fingers',
    location: 'Finger Ruins of Miyr — far east Shadow Realm',
    region: 'Shadow Realm', coords: { x: 48, y: 48 },
    weaknesses: ['Frost', 'Lightning', 'Bleed'],
    resistances: ['Holy', 'Physical'],
    drops: ['Remembrance of the Mother of Fingers', '760,000 Runes'],
    backstory: 'Metyr is the primordial origin of all Two Fingers — the first and greatest finger-being, who arrived in the Lands Between long before the Greater Will established its dominion. She came seeking direction from outer gods, prostrating herself toward the heavens. Over millennia she degraded and atrophied, but her alien power remains immense. All the Two Fingers that guide Tarnished across the Lands Between are ultimately extensions of Metyr — making her the indirect mother of the entire institution of guidance that shapes the game\'s main story.',
    tips: 'A cosmic, deeply alien fight. Her finger-beam attacks can track from extreme range — dodge sideways repeatedly. Stay inside her inner melee range rather than mid-range to force close combat you can handle. She\'s very vulnerable to Frost which keeps her flinching. Lightning magic deals heavy bonus damage.',
    difficulty: 4, phases: 2, type: 'dlc'
  },
  {
    id: 'bayle', name: 'Bayle the Dread',
    location: 'Dragon\'s Pit Terminus — Jagged Peak',
    region: 'Jagged Peak', coords: { x: 57, y: 27 },
    weaknesses: ['Lightning (major weakness)', 'Bleed'],
    resistances: ['Fire (immune)', 'Physical'],
    drops: ['Remembrance of the Dragonlord Bayle', 'Bayle\'s Flame Lightning', '800,000 Runes'],
    backstory: 'Bayle the Dread is considered the most fearsome living dragon — a creature of pure violence who separated from dragonkind entirely, refusing to submit to any hierarchy. Ancient and massive, he is driven by primal destructive instinct and the will to dominate. Igon, an NPC encountered early in Jagged Peak, had his wing torn off by Bayle and has pursued him for revenge for years, clinging to life through sheer rage. Finding Igon and completing his questline allows him to join you in the fight — dramatically changing the encounter and adding tremendous lightning damage support.',
    tips: 'Igon is MANDATORY — find him early in Jagged Peak, exhaust his dialogue, and summon him at the fog gate. Bayle\'s fire attacks are lightning fast with almost no windup. Stay at his feet and dodge in the same direction he rotates. Lightning-infused weapons or lightning spells deal massive bonus damage. His Phase 2 gains devastating fire-breath sweeps.',
    difficulty: 5, phases: 2, type: 'dlc'
  },
  {
    id: 'promised-consort-radahn', name: 'Promised Consort Radahn',
    location: 'Enir-Ilim — Loft of the Divine Shadow (Final DLC Boss)',
    region: 'Enir-Ilim', coords: { x: 34, y: 10 },
    weaknesses: ['Frost', 'Bleed', 'Physical'],
    resistances: ['Holy', 'Lightning'],
    drops: ['Remembrance of the Promised Consort', '1,500,000 Runes'],
    backstory: 'Promised Consort Radahn is the culmination of Miquella\'s grand and heartbreaking plan. Miquella — the most gifted Empyrean — sacrificed his own flesh and emotions, including love itself, to achieve godhood through pure will. He traveled to the Land of Shadow seeking to become a god of compassion for the Tarnished. His plan: drag Radahn\'s soul from the Lands Between, resurrect him in the Shadow Realm, and make him his divine consort. Why Radahn? Miquella once loved Radahn — and then turned that love into a tool of manipulation. Phase 2 sees Miquella himself descend from the heavens, empowering his consort with holy golden grace, revealing the full scope of his obsession. This is the DLC\'s answer to the question of whether Miquella\'s "compassion" is real.',
    tips: 'The hardest boss in Shadow of the Erdtree. Maximize Scadutree Blessing level before attempting. Phase 1: Gravity and stellar sword attacks at extreme speed — dodge frequently and attack only during recovery. Phase 2: Miquella descends and adds holy cross attacks and a devastating gravity nova. Save flasks for Phase 2. Frost-into-Bleed combos are optimal.',
    difficulty: 5, phases: 2, type: 'dlc'
  }
];

const ITEMS = [
  // MAP FRAGMENTS
  { id: 'map-limgrave-w', name: 'Map: Limgrave, West', category: 'Map Fragment', region: 'Limgrave', coords: { x: 33, y: 74 }, location: 'Stone stele south of Gatefront Ruins, near the main road', description: 'Reveals the western Limgrave region on your map.', howToGet: 'Found on a stone stele on the road south of Gatefront Ruins, east of the Church of Elleh. Cannot be missed.' },
  { id: 'map-limgrave-e', name: 'Map: Limgrave, East (Mistwood)', category: 'Map Fragment', region: 'Limgrave', coords: { x: 42, y: 68 }, location: 'Stone stele near Third Church of Marika, east Limgrave', description: 'Reveals eastern Limgrave and the Mistwood on your map.', howToGet: 'On a stone stele on the north edge of the Mistwood, northwest of Fort Haight.' },
  { id: 'map-weeping', name: 'Map: Weeping Peninsula', category: 'Map Fragment', region: 'Weeping Peninsula', coords: { x: 34, y: 88 }, location: 'Stone stele on the main road south of Limgrave bridge', description: 'Reveals the Weeping Peninsula on your map.', howToGet: 'On a stele on the road just south of the Bridge of Sacrifice entrance.' },
  { id: 'map-liurnia-w', name: 'Map: Liurnia, West', category: 'Map Fragment', region: 'Liurnia', coords: { x: 28, y: 50 }, location: 'Stone stele near Liurnia of the Lakes, west shore road', description: 'Reveals western Liurnia on your map.', howToGet: 'On a stele along the main western road in Liurnia, north of the Academy Gate Town Site of Grace.' },
  { id: 'map-liurnia-e', name: 'Map: Liurnia, East', category: 'Map Fragment', region: 'Liurnia', coords: { x: 38, y: 45 }, location: 'Stone stele near Liurnia Highway North', description: 'Reveals eastern Liurnia on your map.', howToGet: 'On a stele near the Liurnia Highway North Site of Grace, east side of the lake.' },
  { id: 'map-liurnia-n', name: 'Map: Liurnia, North', category: 'Map Fragment', region: 'Liurnia', coords: { x: 30, y: 40 }, location: 'Stone stele north of the Academy, near the Moonfolk Ruins', description: 'Reveals northern Liurnia on your map.', howToGet: 'On a stele on the road north of Raya Lucaria, past the Academy Gate Town.' },
  { id: 'map-caelid', name: 'Map: Caelid', category: 'Map Fragment', region: 'Caelid', coords: { x: 68, y: 60 }, location: 'Stone stele at Smoldering Church, northern Caelid', description: 'Reveals Caelid on your map.', howToGet: 'On a stele at or near Smoldering Church at the Limgrave/Caelid border on the northern road.' },
  { id: 'map-dragonbarrow', name: 'Map: Dragonbarrow', category: 'Map Fragment', region: 'Caelid', coords: { x: 75, y: 45 }, location: 'Stone stele near the Dragonbarrow Fork Site of Grace', description: 'Reveals the Dragonbarrow region of Caelid on your map.', howToGet: 'On a stele near the Dragonbarrow Fork Site of Grace in north Caelid. Watch for the sleeping Elder Dragon nearby.' },
  { id: 'map-altus', name: 'Map: Altus Plateau', category: 'Map Fragment', region: 'Altus Plateau', coords: { x: 52, y: 42 }, location: 'Stone stele on the Altus Highway Junction', description: 'Reveals the Altus Plateau on your map.', howToGet: 'On a stele at the Altus Highway Junction Site of Grace, reached via the Grand Lift of Dectus or Ruin-Strewn Precipice.' },
  { id: 'map-gelmir', name: 'Map: Mt. Gelmir', category: 'Map Fragment', region: 'Mt. Gelmir', coords: { x: 38, y: 38 }, location: 'Stone stele on the road near Volcano Manor approach', description: 'Reveals Mt. Gelmir on your map.', howToGet: 'On a stele on the western road toward Volcano Manor, past the Seethewater River Site of Grace.' },
  { id: 'map-mountaintops-e', name: 'Map: Mountaintops of the Giants, East', category: 'Map Fragment', region: 'Mountaintops of the Giants', coords: { x: 70, y: 15 }, location: 'Stone stele near the Zamor Ruins', description: 'Reveals eastern Mountaintops of the Giants.', howToGet: 'On a stele near the Giants\' Gravepost Site of Grace, east of the Zamor Ruins.' },
  { id: 'map-mountaintops-w', name: 'Map: Mountaintops of the Giants, West', category: 'Map Fragment', region: 'Mountaintops of the Giants', coords: { x: 57, y: 15 }, location: 'Stone stele near the Freezing Lake', description: 'Reveals western Mountaintops of the Giants.', howToGet: 'On a stele near the Freezing Lake Site of Grace, northwest of the Flame Peak area.' },
  { id: 'map-consecrated', name: 'Map: Consecrated Snowfield', category: 'Map Fragment', region: 'Consecrated Snowfield', coords: { x: 38, y: 10 }, location: 'Stone stele in the central Consecrated Snowfield', description: 'Reveals the hidden Consecrated Snowfield on your map.', howToGet: 'On a stele near the Consecrated Snowfield Site of Grace. Reach via both halves of the Haligtree Secret Medallion (one in Village of the Albinaurics, one from Albus the old man).' },
  // DLC MAP FRAGMENTS
  { id: 'map-gravesite', name: 'Map: Gravesite Plain', category: 'Map Fragment', region: 'Gravesite Plain', coords: { x: 28, y: 62 }, location: 'Stone stele near the Three-Path Cross Site of Grace', description: 'Reveals the Gravesite Plain DLC starting region.', howToGet: 'On a stele near the Three-Path Cross Site of Grace in the Gravesite Plain, early DLC area.' },
  { id: 'map-scadu', name: 'Map: Scadu Altus', category: 'Map Fragment', region: 'Scadu Altus', coords: { x: 25, y: 35 }, location: 'Stone stele near the Moorth Ruins in Scadu Altus', description: 'Reveals the Scadu Altus plateau region of the DLC.', howToGet: 'On a stele near the Moorth Ruins Site of Grace. Reach Scadu Altus through Castle Ensis after defeating Rellana.' },
  { id: 'map-jagged', name: 'Map: Jagged Peak', category: 'Map Fragment', region: 'Jagged Peak', coords: { x: 55, y: 32 }, location: 'Stone stele on the Jagged Peak approach', description: 'Reveals the Jagged Peak dragon territory DLC region.', howToGet: 'On a stele at the base of Jagged Peak, near the Dragon\'s Pit entrance.' },

  // GOLDEN SEEDS
  { id: 'seed-stormgate', name: 'Golden Seed (Stormgate)', category: 'Golden Seed', region: 'Limgrave', coords: { x: 31, y: 70 }, location: 'Stormgate road — glowing golden sapling on the path to Stormveil Castle', description: 'Adds 1 Flask charge when combined with others at a Site of Grace.', howToGet: 'At the base of a glowing golden sapling on the main road through Stormgate, before the elevator up to Stormveil.' },
  { id: 'seed-church-irith', name: 'Golden Seed (Church of Irith)', category: 'Golden Seed', region: 'Liurnia', coords: { x: 27, y: 52 }, location: 'Church of Irith, western Liurnia lakeshore', description: 'Adds 1 Flask charge when combined.', howToGet: 'At the golden sapling next to the Church of Irith Site of Grace on the west shore of Liurnia.' },
  { id: 'seed-altus', name: 'Golden Seed (Altus Highway)', category: 'Golden Seed', region: 'Altus Plateau', coords: { x: 52, y: 44 }, location: 'Altus Highway Junction — golden sapling next to the Site of Grace', description: 'Adds 1 Flask charge when combined.', howToGet: 'At the golden sapling immediately at the Altus Highway Junction Site of Grace at the top of the Grand Lift of Dectus.' },
  { id: 'seed-farum', name: 'Golden Seed (Farum Azula)', category: 'Golden Seed', region: 'Farum Azula', coords: { x: 84, y: 20 }, location: 'Dragon Temple, Crumbling Farum Azula — golden sapling at the temple entrance', description: 'Adds 1 Flask charge when combined.', howToGet: 'At the golden sapling near the Dragon Temple Site of Grace in Farum Azula.' },
  // DLC Golden Seeds
  { id: 'seed-dlc-gravesite', name: 'Golden Seed (Gravesite Plain)', category: 'Golden Seed', region: 'Gravesite Plain', coords: { x: 25, y: 58 }, location: 'Gravesite Plain — golden sapling near the Three-Path Cross', description: 'Adds 1 Flask charge when combined. DLC version.', howToGet: 'At the golden sapling near the Three-Path Cross Site of Grace in the early DLC area.' },

  // SACRED TEARS
  { id: 'tear-elleh', name: 'Sacred Tear (Church of Elleh)', category: 'Sacred Tear', region: 'Limgrave', coords: { x: 28, y: 74 }, location: 'Church of Elleh — base of the Marika statue', description: 'Upgrades Flask potency when all tears are gathered.', howToGet: 'At the base of the Marika statue inside Church of Elleh, the very first church near the starting area.' },
  { id: 'tear-third-marika', name: 'Sacred Tear (Third Church of Marika)', category: 'Sacred Tear', region: 'Limgrave', coords: { x: 44, y: 65 }, location: 'Third Church of Marika, east Limgrave near the Mistwood', description: 'Upgrades Flask potency.', howToGet: 'At the statue inside the Third Church of Marika, east of the Mistwood in Limgrave.' },
  { id: 'tear-callu', name: 'Sacred Tear (Callu Baptismal Church)', category: 'Sacred Tear', region: 'Weeping Peninsula', coords: { x: 32, y: 86 }, location: 'Callu Baptismal Church, south Weeping Peninsula', description: 'Upgrades Flask potency.', howToGet: 'Inside the Callu Baptismal Church on the southern edge of the Weeping Peninsula, past the Church of Pilgrimage.' },
  { id: 'tear-dragon', name: 'Sacred Tear (Church of Dragon Communion)', category: 'Sacred Tear', region: 'Weeping Peninsula', coords: { x: 28, y: 90 }, location: 'Church of Dragon Communion, far south Weeping Peninsula on the coast', description: 'Upgrades Flask potency. Also provides access to Dragon Communion Incantations.', howToGet: 'Inside the Church of Dragon Communion on the southern rocky coast of the Weeping Peninsula.' },
  { id: 'tear-liurnia', name: 'Sacred Tear (Church of Vows)', category: 'Sacred Tear', region: 'Liurnia', coords: { x: 40, y: 44 }, location: 'Church of Vows, east Liurnia near the cliffs', description: 'Upgrades Flask potency. Also hosts Miriel (Pastor of Vows) who teaches sorceries and incantations.', howToGet: 'At the Marika statue inside the Church of Vows, reached by climbing the eastern cliffs of Liurnia.' },
  { id: 'tear-altus-erdtree', name: 'Sacred Tear (Minor Erdtree Church)', category: 'Sacred Tear', region: 'Altus Plateau', coords: { x: 60, y: 38 }, location: 'Minor Erdtree Church, east Altus Plateau', description: 'Upgrades Flask potency.', howToGet: 'Inside the Minor Erdtree Church near the eastern Minor Erdtree of the Altus Plateau.' },

  // KEY ITEMS
  { id: 'stonesword-key', name: 'Stonesword Key', category: 'Key Item', region: 'Various', coords: { x: 35, y: 65 }, location: 'Sold by merchants, found as world drops throughout', description: 'Used to unseal imp statues guarding optional doors and chests containing powerful loot.', howToGet: 'Sold by Twin Maiden Husks in Roundtable Hold (unlimited supply after giving their bell bearings). Also found throughout the world.' },
  { id: 'dectus-medallion-l', name: 'Dectus Medallion (Left)', category: 'Key Item', region: 'Limgrave', coords: { x: 40, y: 70 }, location: 'Fort Haight, east Limgrave — chest on the battlements', description: 'Half of the medallion needed to operate the Grand Lift of Dectus and reach Altus Plateau.', howToGet: 'In a chest on top of Fort Haight in eastern Limgrave. Guarded by the Demi-Human Chief inside.' },
  { id: 'dectus-medallion-r', name: 'Dectus Medallion (Right)', category: 'Key Item', region: 'Caelid', coords: { x: 67, y: 50 }, location: 'Fort Faroth, north Caelid — chest on the battlements', description: 'Half of the medallion needed to operate the Grand Lift of Dectus.', howToGet: 'In a chest on top of Fort Faroth in north Caelid. The fort is filled with bats and a sleeping Elder Dragon.' },
  { id: 'haligtree-medallion-l', name: 'Haligtree Secret Medallion (Left)', category: 'Key Item', region: 'Liurnia', coords: { x: 26, y: 48 }, location: 'Village of the Albinaurics, south Liurnia — given by Albus the old man', description: 'Half of the medallion to access the Grand Lift of Rold secret path to Consecrated Snowfield.', howToGet: 'In the Village of the Albinaurics (south Liurnia, through the swamp). Roll into a small pot near the cliff edge to reveal Albus — exhaust his dialogue to receive it.' },
  { id: 'haligtree-medallion-r', name: 'Haligtree Secret Medallion (Right)', category: 'Key Item', region: 'Mountaintops of the Giants', coords: { x: 72, y: 12 }, location: 'Castle Sol, north Mountaintops of the Giants', description: 'Half of the medallion to access the Consecrated Snowfield and ultimately Miquella\'s Haligtree.', howToGet: 'In a chest atop Castle Sol in northern Mountaintops of the Giants. Defeat Commander Niall at the top of the castle to lower the drawbridge.' },
  { id: 'pureblood-medal', name: 'Pureblood Knight\'s Medal', category: 'Key Item', region: 'Liurnia', coords: { x: 28, y: 46 }, location: 'White-Faced Varre\'s questline — Church of Inhibition, Liurnia', description: 'Teleports you directly to Mohgwyn Palace. Alternative path to reach Mohg\'s area without Varre\'s questline.', howToGet: 'Complete White-Faced Varre\'s full questline (rose maiden fingers, invade three times, accept Lord Mohg\'s blood). He gives you this medal as a reward near the end.' },
  { id: 'cursemark-death', name: 'Cursemark of Death', category: 'Key Item', region: 'Liurnia', coords: { x: 30, y: 42 }, location: 'Divine Tower of Liurnia — top floor, inside a chest behind Ranni\'s body', description: 'Required item to access Lichdragon Fortissax through Fia\'s questline. Needed to give to Fia in Deeproot Depths.', howToGet: 'At the top of the Divine Tower of Liurnia. Reach via the Converted Tower (requires Erudition gesture) or by progressing through Caria Manor.' },
  // DLC KEY ITEMS
  { id: 'scadutree-fragment', name: 'Scadutree Fragment', category: 'DLC — Scadutree Blessing', region: 'Shadow Realm', coords: { x: 28, y: 45 }, location: 'Found throughout the Land of Shadow — at Sites of Grace, on corpses, dropped by bosses', description: 'The primary DLC progression system. Increases your damage dealt and reduces damage taken. Essential — collect every one you find.', howToGet: 'Found at golden saplings, on corpses near churches, dropped by Scadutree Avatar boss, found in chests throughout the DLC. Bless them at any Site of Grace.' },
  { id: 'revered-spirit-ash', name: 'Revered Spirit Ash', category: 'DLC — Spirit Ash Upgrade', region: 'Shadow Realm', coords: { x: 30, y: 40 }, location: 'Found throughout the Land of Shadow — similar locations to Scadutree Fragments', description: 'Upgrades your Spirit Ash\'s effectiveness in the DLC. Collect all you find alongside Scadutree Fragments.', howToGet: 'Found at the same types of locations as Scadutree Fragments throughout the DLC. Upgrade at any Site of Grace.' },
  { id: 'miquella-needle', name: 'Miquella\'s Needle', category: 'DLC — Key Item', region: 'Enir-Ilim', coords: { x: 34, y: 12 }, location: 'Obtained from Promised Consort Radahn\'s Remembrance', description: 'Allows you to undo the Frenzied Flame ending if you\'ve been branded by the Three Fingers. Use it at Dragonlord Placidusax\'s arena in Farum Azula.', howToGet: 'Transposed from the Remembrance of the Promised Consort at the Roundtable Hold Finger Reader. One of two items from this Remembrance.' }
];

const WEAPONS = [
  // GREATSWORDS / COLOSSAL
  { id: 'greatsword', name: 'Greatsword', type: 'Colossal Sword', region: 'Caelid', coords: { x: 62, y: 58 }, location: 'Caelid — in the back of a travelling merchant\'s cart near the Caelid Highway North Site of Grace', scaling: 'Str (D→B), Dex (E)', requirement: 'Str 31, Dex 12', skill: 'Stamp (Upward Cut)', description: 'The meme-famous "Berserk" sword — massive, heavy, devastating. One of the best early colossal weapons for Strength builds.', howToGet: 'Found in a wooden crate on a cart being pulled north along the Caelid Highway. The crate requires a roll attack to open.' },
  { id: 'grafted-blade', name: 'Grafted Blade Greatsword', type: 'Colossal Sword', region: 'Weeping Peninsula', coords: { x: 30, y: 92 }, location: 'Weeping Peninsula — dropped by Leonine Misbegotten at Castle Morne', scaling: 'Str (B), Dex (E)', requirement: 'Str 40, Dex 14', skill: 'Oath of Vengeance — temporarily boosts all stats', description: 'A massive sword crafted from countless grafted blades. Has one of the best weapon skills in the game for Strength builds.', howToGet: 'Defeat the Leonine Misbegotten boss at the end of Castle Morne on the southern tip of the Weeping Peninsula.' },
  { id: 'sacred-relic-sword', name: 'Sacred Relic Sword', type: 'Greatsword', region: 'Leyndell', coords: { x: 52, y: 47 }, location: 'Obtained from Elden Beast Remembrance via Enia at Roundtable Hold', scaling: 'Str (D), Dex (D), Fai (C)', requirement: 'Str 14, Dex 24, Fai 22', skill: 'Wave of Gold — massive golden wave AoE, excellent for rune farming', description: 'The weapon of the Elden Lord, fashioned from the Elden Ring itself. The Wave of Gold skill is the fastest rune farming tool in the game.', howToGet: 'Transpose the Elden Remembrance (from Elden Beast) at Enia in Roundtable Hold.' },
  { id: 'ruins-greatsword', name: 'Ruins Greatsword', type: 'Colossal Sword', region: 'Altus Plateau', coords: { x: 56, y: 42 }, location: 'Redmane Castle — dropped by Misbegotten Warrior and Crucible Knight duo', scaling: 'Str (B), Int (D)', requirement: 'Str 50, Int 16', skill: 'Wave of Destruction — gravitational blast forward', description: 'A fallen meteorite shaped into a greatsword. The Wave of Destruction skill deals gravity-type damage that bypasses most resistances.', howToGet: 'Defeat the Misbegotten Warrior and Crucible Knight duo in Redmane Castle Plaza (during the non-festival period or after completing the festival).' },
  // KATANAS
  { id: 'moonveil', name: 'Moonveil', type: 'Katana', region: 'Caelid', coords: { x: 63, y: 63 }, location: 'Gael Tunnel — dropped by the Magma Wyrm boss', scaling: 'Str (D), Dex (D), Int (B)', requirement: 'Str 12, Dex 18, Int 23', skill: 'Transient Moonlight — fires a ranged moonlight slash', description: 'The most famous PvP and PvE katana. The Transient Moonlight skill fires a fast ranged slash dealing physical and magic damage. Outstanding for Dex/Int builds.', howToGet: 'Defeat the Magma Wyrm at the bottom of Gael Tunnel on the Limgrave/Caelid border.' },
  { id: 'rivers-of-blood', name: 'Rivers of Blood', type: 'Curved Sword (Katana)', region: 'Mountaintops of the Giants', coords: { x: 58, y: 18 }, location: 'Church of Repose, Mountaintops of the Giants — dropped by invader Bloody Finger Okina', scaling: 'Str (E), Dex (D), Arc (D)', requirement: 'Str 12, Dex 18, Arc 20', skill: 'Corpse Piler — multi-hit rapid slash that builds Bleed rapidly', description: 'The most famous Bleed weapon. Corpse Piler is one of the highest DPS skills in the game when combined with Arcane scaling and blood grease.', howToGet: 'Defeat the red phantom invader Bloody Finger Okina at the Church of Repose in Mountaintops of the Giants.' },
  { id: 'hand-malenia', name: 'Hand of Malenia', type: 'Katana', region: 'Consecrated Snowfield', coords: { x: 37, y: 12 }, location: 'Obtained from Malenia\'s Remembrance via Enia at Roundtable Hold', scaling: 'Str (D), Dex (B)', requirement: 'Str 16, Dex 48', skill: 'Waterfowl Dance — Malenia\'s iconic blossoming dance combo', description: 'Malenia\'s legendary katana. The Waterfowl Dance mimics her most feared attack and also restores HP on hit.', howToGet: 'Transpose the Remembrance of the Rot Goddess (from Malenia) at Enia in Roundtable Hold.' },
  { id: 'uchigatana', name: 'Uchigatana', type: 'Katana', region: 'Limgrave', coords: { x: 30, y: 68 }, location: 'Deathtouched Catacombs — on a corpse by the entrance stairway', scaling: 'Str (D), Dex (C)', requirement: 'Str 11, Dex 15', skill: 'Unsheath — draws the blade for high-damage slash', description: 'The classic starting katana. Excellent for Bleed builds, fast attacks, and can be dual-wielded with another Uchigatana (buy from Knight Bernahl or find a second in Deathtouched Catacombs).', howToGet: 'Found on a corpse near the entrance to Deathtouched Catacombs in northern Limgrave. Also the starting weapon for the Samurai class.' },
  // SWORDS / DAGGERS
  { id: 'bloodhound-fang', name: 'Bloodhound\'s Fang', type: 'Curved Greatsword', region: 'Limgrave', coords: { x: 35, y: 72 }, location: 'Forlorn Hound Evergaol, Limgrave — dropped by Bloodhound Knight Darriwil', scaling: 'Str (D), Dex (C)', requirement: 'Str 18, Dex 17', skill: 'Bloodhound\'s Finesse — backstep slash with follow-up', description: 'One of the best early-mid game weapons for Dex builds. Naturally infused with Blood loss and has an extremely fast, evasive skill.', howToGet: 'Defeat Bloodhound Knight Darriwil in the Forlorn Hound Evergaol in southwestern Limgrave. Blaidd can be summoned for this fight.' },
  { id: 'reduvia', name: 'Reduvia', type: 'Dagger', region: 'Limgrave', coords: { x: 36, y: 64 }, location: 'Agheel Lake North — dropped by invader Nerijus', scaling: 'Str (E), Dex (D), Arc (D)', requirement: 'Str 5, Dex 13, Arc 13', skill: 'Reduvia Blood Blade — rapid ranged blood projectiles', description: 'The best early Bleed/Arcane dagger. The Blood Blade skill fires homing blood projectiles that build bleed from range. Exceptional for Arcane builds.', howToGet: 'Defeat the Bloody Finger Nerijus invader who attacks just north of Agheel Lake in Limgrave.' },
  { id: 'dark-moon-gs', name: 'Dark Moon Greatsword', type: 'Greatsword', region: 'Liurnia', coords: { x: 30, y: 40 }, location: 'Ranni\'s questline final reward — found in Renna\'s Rise after completing Ranni\'s quest', scaling: 'Str (D), Dex (D), Int (B)', requirement: 'Str 16, Dex 11, Int 38', skill: 'Moonlight Greatsword — charges blade with magic, fires ranged moonbeam', description: 'The legendary Moonlight Greatsword returns in Elden Ring. Charged R2 fires moonbeams. The skill temporarily coats the blade in frost that boosts magic damage.', howToGet: 'Complete all of Ranni\'s questline steps. The sword appears in a chest in Renna\'s Rise (Liurnia) after depositing the Dark Moon Ring in the finger ruins.' },
  { id: 'blasphemous-blade', name: 'Blasphemous Blade', type: 'Greatsword', region: 'Mt. Gelmir', coords: { x: 37, y: 37 }, location: 'Obtained from Rykard\'s Remembrance via Enia at Roundtable Hold', scaling: 'Str (D), Dex (D), Fai (C)', requirement: 'Str 22, Dex 15, Fai 21', skill: 'Taker\'s Flames — massive fire wave that restores HP on kills', description: 'Rykard\'s weapon. The Taker\'s Flames skill is excellent for sustain builds — it deals wide AoE fire damage and heals you with each enemy killed by it.', howToGet: 'Transpose Remembrance of the Blasphemous (from Rykard) at Enia in Roundtable Hold.' },
  { id: 'sword-night-flame', name: 'Sword of Night and Flame', type: 'Straight Sword', region: 'Liurnia', coords: { x: 33, y: 42 }, location: 'Caria Manor — chest in a side room off the main courtyard', scaling: 'Str (D), Dex (D), Int (D), Fai (D)', requirement: 'Str 12, Dex 12, Int 24, Fai 24', skill: 'Night-and-Flame Stance — L2 aims flame beam or comet', description: 'A legendary Intelligence/Faith hybrid weapon. The skill fires either a long fire beam or a magic comet depending on the attack button — both are extremely powerful.', howToGet: 'In a chest in Caria Manor in northwestern Liurnia. From the manor lower area, find the locked door via the rampart route.' },
  { id: 'wing-astel', name: 'Wing of Astel', type: 'Curved Sword', region: 'Underground', coords: { x: 40, y: 70 }, location: 'Uhl Palace Ruins, Ainsel River — on a corpse in the ruins', scaling: 'Str (E), Dex (D), Int (C)', requirement: 'Str 7, Dex 17, Int 20', skill: 'Nebula — fires a gravity explosion that lingers', description: 'Astel\'s wing fashioned into a blade. The Nebula skill fires an expanding gravity cloud that deals magic damage repeatedly. Excellent for Int builds.', howToGet: 'Found on a corpse at the Uhl Palace Ruins in the Ainsel River underground area.' },
  { id: 'mohgwyn-spear', name: 'Mohgwyn\'s Sacred Spear', type: 'Great Spear', region: 'Underground', coords: { x: 20, y: 55 }, location: 'Obtained from Mohg\'s Remembrance via Enia at Roundtable Hold', scaling: 'Str (D), Dex (D), Arc (B)', requirement: 'Str 24, Dex 14, Arc 27', skill: 'Bloodboon Ritual — impales ground to create a blood explosion nova', description: 'Mohg\'s iconic spear. The Bloodboon Ritual creates a massive AOE blood explosion — devastating for Arcane builds. Pairs with the Lord of Blood\'s Exultation talisman.', howToGet: 'Transpose Remembrance of the Blood Lord (from Mohg) at Enia in Roundtable Hold.' },
  // DLC WEAPONS
  { id: 'milady', name: 'Milady', type: 'Light Greatsword (new DLC type)', region: 'Gravesite Plain', coords: { x: 25, y: 58 }, location: 'Found in the Shadow Realm — at the base of a cliff near the Fog Rift Catacombs', scaling: 'Str (D), Dex (C)', requirement: 'Str 15, Dex 22', skill: 'Swift Slash — incredibly fast diagonal slash', description: 'A new weapon class in the DLC. Light Greatswords combine the reach of greatswords with the speed of straight swords. Swift Slash is one of the fastest high-damage skills available.', howToGet: 'Found on a corpse near the Fog Rift Catacombs Site of Grace in the Gravesite Plain, early DLC area.' },
  { id: 'messmer-spear', name: 'Messmer\'s Spear', type: 'Spear', region: 'Scadu Altus', coords: { x: 24, y: 24 }, location: 'Obtained from Messmer\'s Remembrance via Enia at Roundtable Hold', scaling: 'Str (D), Dex (D), Fai (C)', requirement: 'Str 20, Dex 18, Fai 22', skill: 'Serpent\'s Fury — serpent emerges from blade for fire thrust combo', description: 'Messmer\'s serpent fire spear. The Serpent\'s Fury skill erupts a serpent from the blade to attack in multiple fire strikes — powerful and visually stunning.', howToGet: 'Transpose Remembrance of the Impaler (from Messmer) at Enia in Roundtable Hold.' },
  { id: 'bayle-tyranny', name: 'Bayle\'s Tyranny', type: 'Staff / Catalyst', region: 'Jagged Peak', coords: { x: 57, y: 27 }, location: 'Obtained from Bayle\'s Remembrance via Enia at Roundtable Hold', scaling: 'Str (D), Int (B)', requirement: 'Str 20, Int 30', skill: 'Bayle\'s Tyranny — summons Bayle\'s flame lightning storm', description: 'A staff crackling with Bayle\'s fire lightning. The skill calls down a massive storm of fire and lightning bolts. Exceptional for hybrid Int builds.', howToGet: 'Transpose Remembrance of the Dragonlord Bayle (from Bayle) at Enia in Roundtable Hold.' },
  { id: 'euporia', name: 'Euporia', type: 'Thrusting Sword', region: 'Shadow Realm', coords: { x: 35, y: 20 }, location: 'Found in the Ruins of Unte — on a corpse in the higher ruins', scaling: 'Str (E), Dex (B), Fai (D)', requirement: 'Str 10, Dex 28, Fai 15', skill: 'Needle Pierce — rapid multi-pierce that can Bleed', description: 'Miquella\'s golden needle-sword. A beautiful, fast thrusting sword with golden holy energy. Regarded as one of the best DLC weapons for Dex/Faith builds.', howToGet: 'Found in the Ruins of Unte in the Shadow Realm. Requires exploring Enir-Ilim approach areas.' },
  { id: 'dragon-hunter-katana', name: 'Dragon Hunter\'s Great Katana', type: 'Great Katana (new DLC type)', region: 'Jagged Peak', coords: { x: 55, y: 30 }, location: 'Dragon\'s Pit — on a corpse inside the pit dungeon', scaling: 'Str (D), Dex (B), Arc (D)', requirement: 'Str 20, Dex 28, Arc 15', skill: 'Dragon Hunter — powerful overhead slash that deals bonus damage to dragons', description: 'A massive two-handed katana made to hunt dragons. A new weapon class in the DLC offering colossal reach with katana speed. Excellent against Bayle and Dragonlord Placidusax.', howToGet: 'Found inside Dragon\'s Pit on Jagged Peak, on a corpse in the lower area of the dungeon.' }
];

const SPELLS = [
  // SORCERIES
  { id: 'comet-azur', name: 'Comet Azur', type: 'Sorcery', region: 'Mt. Gelmir', coords: { x: 36, y: 35 }, location: 'Mt. Gelmir — given by Primeval Sorcerer Azur near the lava fields south of Volcano Manor', requirement: 'Int 60', fpCost: 40, description: 'Fires an incredibly powerful and sustained beam of glintstone. One of the highest-burst-damage spells in the game. Drains FP rapidly.', howToGet: 'Speak to Primeval Sorcerer Azur, sitting near lava north of the Road of Iniquity Site of Grace in Mt. Gelmir. He gives it freely.' },
  { id: 'rock-sling', name: 'Rock Sling', type: 'Sorcery', region: 'Caelid', coords: { x: 66, y: 60 }, location: 'Street of Sages Ruins, northwest Caelid — in an underground cellar chest', requirement: 'Int 18', fpCost: 18, description: 'Pulls three large rocks from the ground and hurls them. Deals physical magic damage that bypasses most magic resistance. Excellent early-game sorcery and very effective against Radahn.', howToGet: 'In an underground cellar at the Street of Sages Ruins in northwest Caelid. Drop into the cellar entrance in the ruins.' },
  { id: 'stars-of-ruin', name: 'Stars of Ruin', type: 'Sorcery', region: 'Liurnia', coords: { x: 30, y: 45 }, location: 'Obtained via Sellen\'s questline — given by Master Lusat in the Sellia Hideaway cave', requirement: 'Int 43', fpCost: 28, description: 'Fires twelve shooting stars that home in on targets. Excellent for hitting mobile or distant enemies. Part of the Sellian royal sorcery tradition.', howToGet: 'Progress Sorceress Sellen\'s questline until she directs you to Master Lusat in the Sellia Hideaway cave in Caelid. He gives you the spell.' },
  { id: 'ranni-dark-moon', name: 'Ranni\'s Dark Moon', type: 'Sorcery', region: 'Liurnia', coords: { x: 28, y: 44 }, location: 'Chelona\'s Rise, southwest Liurnia — top floor chest', requirement: 'Int 68', fpCost: 62, description: 'Throws a massive dark moon projectile that inflicts Frostbite and reduces enemy magic absorption. Extremely powerful but requires very high Intelligence.', howToGet: 'In a chest at the top of Chelona\'s Rise tower in southwest Liurnia. Solve the nearby puzzle (find three turtles) to unseal the tower.' },
  { id: 'founding-rain', name: 'Founding Rain of Stars', type: 'Sorcery', region: 'Mountaintops of the Giants', coords: { x: 58, y: 14 }, location: 'Heretical Rise, west Mountaintops — chest at the tower top', requirement: 'Int 52', fpCost: 32, description: 'Summons a torrential rain of glintstone stars from the sky over a wide area. Powerful AoE field spell for positioning advantage.', howToGet: 'At the top of Heretical Rise tower in the western Mountaintops. Cross the invisible bridge east of the tower (throw rainbow stone to reveal it).' },
  { id: 'adula-moonblade', name: 'Adula\'s Moonblade', type: 'Sorcery', region: 'Liurnia', coords: { x: 30, y: 40 }, location: 'Moonfolk Ruins / Three Sisters area — obtained after defeating Dragon Adula twice', requirement: 'Int 32', fpCost: 26, description: 'Performs a frost-infused sword slash that extends into a long ranged crescent beam of moonlight. Excellent for Intelligence builds wanting melee-range magic.', howToGet: 'Defeat Dragon Adula who appears first at the Cathedral of Manus Celes in the Three Sisters area (Liurnia), then again near Ranni\'s Rise. She drops the spell.' },
  { id: 'meteorite-astel', name: 'Meteorite of Astel', type: 'Sorcery', region: 'Underground', coords: { x: 40, y: 70 }, location: 'Obtained from Astel\'s Remembrance via Enia at Roundtable Hold', requirement: 'Int 55', fpCost: 30, description: 'Summons a shower of miniature meteorites around the caster that orbit and then launch outward. Excellent AoE coverage for crowds.', howToGet: 'Transpose Remembrance of the Naturalborn (from Astel) at Enia in Roundtable Hold.' },
  { id: 'gravity-well', name: 'Gravity Well', type: 'Sorcery', region: 'Liurnia', coords: { x: 32, y: 52 }, location: 'Raya Lucaria Academy — sold by Sorceress Sellen (Waypoint Ruins, Limgrave)', requirement: 'Int 46', fpCost: 12, description: 'Fires a gravitational projectile that pulls enemies and objects toward the caster. Excellent for setting up combos or pulling enemies off ledges.', howToGet: 'Purchased from Sorceress Sellen at the Waypoint Ruins in Limgrave, or at her new location after completing part of her questline.' },
  { id: 'carian-phalanx', name: 'Carian Phalanx', type: 'Sorcery', region: 'Liurnia', coords: { x: 38, y: 42 }, location: 'Converted Tower, east Liurnia — chest at the tower top', requirement: 'Int 34', fpCost: 22, description: 'Conjures a phalanx of magical glintstone swords that orbit the caster and fire at enemies. A strong mid-game sorcery for sustained combat.', howToGet: 'In a chest at the top of Converted Tower in east Liurnia. Use the Erudition gesture while wearing an Academy Glintstone Crown to unlock the door.' },
  { id: 'glintstone-pebble', name: 'Glintstone Pebble', type: 'Sorcery', region: 'Limgrave', coords: { x: 36, y: 66 }, location: 'Starting spell for Astrologer class / sold by Sellen (Waypoint Ruins)', requirement: 'Int 14', fpCost: 7, description: 'The fastest, most FP-efficient sorcery. Fires a single magic projectile quickly. Indispensable bread-and-butter spell for any INT build.', howToGet: 'Starting spell for Astrologer class. Also sold by Sorceress Sellen at Waypoint Ruins in Limgrave.' },
  // DLC Sorceries
  { id: 'rellana-twin-moons', name: 'Rellana\'s Twin Moons', type: 'Sorcery (DLC)', region: 'Gravesite Plain', coords: { x: 28, y: 55 }, location: 'Obtained from Rellana\'s Remembrance via Enia at Roundtable Hold', requirement: 'Int 50, Fai 25', fpCost: 36, description: 'Casts twin moons — one of cold frost and one of searing fire — that converge on a target area. Deals both frost and fire damage simultaneously. Outstanding for hybrid builds.', howToGet: 'Transpose Remembrance of the Twin Moon Knight (from Rellana) at Enia in Roundtable Hold.' },
  { id: 'lubricating-sheen', name: 'Glintblade Phalanx (DLC upgrade)', type: 'Sorcery (DLC)', region: 'Shadow Realm', coords: { x: 25, y: 40 }, location: 'Found in chests in the DLC shadow realm ruins', requirement: 'Int 28', fpCost: 20, description: 'Enhanced phalanx sorcery from the Shadow Realm tradition. Functions similarly to Carian Phalanx but with modified tracking behavior.', howToGet: 'Found in chests throughout the Shadow Realm dungeon areas.' },

  // INCANTATIONS
  { id: 'flame-grant-strength', name: 'Flame, Grant Me Strength', type: 'Incantation', region: 'Caelid', coords: { x: 68, y: 68 }, location: 'Redmane Castle, Caelid — on a corpse in the courtyard behind the castle rampart', requirement: 'Fai 15', fpCost: 28, description: 'Boosts physical damage by 20% and fire damage by 20% for 30 seconds. One of the best pre-boss buffs in the game. Stack with Golden Vow for maximum damage output.', howToGet: 'On a corpse on the south rampart of Redmane Castle in Caelid. Drop down from the upper battlements to find the body.' },
  { id: 'golden-vow', name: 'Golden Vow', type: 'Incantation', region: 'Mt. Gelmir', coords: { x: 40, y: 36 }, location: 'Corpse Stench Shack, Mt. Gelmir — on a corpse inside the shack', requirement: 'Fai 25', fpCost: 47, description: 'Raises attack power and defense for 80 seconds. The single best pre-boss buff incantation. Stack with Flame, Grant Me Strength.', howToGet: 'On a corpse inside the Corpse Stench Shack on the path up Mt. Gelmir, between the First Mt. Gelmir Campsite and the Seethewater River.' },
  { id: 'flame-frenzy', name: 'Flame of Frenzy', type: 'Incantation', region: 'Weeping Peninsula', coords: { x: 32, y: 84 }, location: 'Found in Callu Baptismal Church, south Weeping Peninsula', requirement: 'Fai 16', fpCost: 16, description: 'Fires multiple pillars of frenzied flame from the eyes. Builds Madness on enemies and on the caster. Excellent for madness-build crowd control.', howToGet: 'Found on a corpse at or near the Callu Baptismal Church in south Weeping Peninsula. Also usable after becoming a Lord of Frenzied Flame.' },
  { id: 'black-flame', name: 'Black Flame', type: 'Incantation', region: 'Limgrave', coords: { x: 30, y: 68 }, location: 'Godskin Prayerbook — found in Stormveil Castle, given to any clergyman to unlock', requirement: 'Fai 20', fpCost: 18, description: 'Hurls a black fireball that deals Destined Death damage — percentage-based HP damage that continues burning. Excellent against high-HP bosses and gods (Elden Beast, Radagon).', howToGet: 'Find the Godskin Prayerbook in Stormveil Castle (on a corpse in the rampart area). Give to Brother Corhyn or Miriel to unlock for purchase.' },
  { id: 'elden-stars', name: 'Elden Stars', type: 'Incantation', region: 'Underground', coords: { x: 44, y: 62 }, location: 'Deeproot Depths — inside a hidden chest accessible after defeating the Crucible Knight and Misbegotten Warrior duo', requirement: 'Fai 50', fpCost: 47, description: 'Fires a great golden star that spawns trailing stars chasing targets. One of the most powerful and faith-intensive incantations. Triggers the ancient incantation of the Erdtree.', howToGet: 'In the Deeproot Depths, defeat the Crucible Knight and Misbegotten Warrior duo. Proceed to a chest beyond them.' },
  { id: 'fortissax-lightning', name: 'Fortissax\'s Lightning Spear', type: 'Incantation', region: 'Underground', coords: { x: 44, y: 62 }, location: 'Obtained from Lichdragon Fortissax Remembrance via Enia at Roundtable Hold', requirement: 'Fai 46', fpCost: 32, description: 'Impales the ground with two massive crimson lightning spears simultaneously. Devastating lightning AOE ideal for Faith builds. One of the strongest lightning incantations.', howToGet: 'Transpose Remembrance of the Lichdragon (from Lichdragon Fortissax) at Enia in Roundtable Hold.' },
  { id: 'dragonfire', name: 'Dragonfire', type: 'Incantation', region: 'Weeping Peninsula', coords: { x: 28, y: 90 }, location: 'Church of Dragon Communion, Weeping Peninsula — exchange 1 Dragon Heart', requirement: 'Fai 15, Arc 10', fpCost: 28, description: 'Breathes a torrent of dragon fire in an arc in front of you. Excellent sustained fire damage for Dragon Communion builds.', howToGet: 'At the altar in the Church of Dragon Communion (Weeping Peninsula) or Cathedral of Dragon Communion (Caelid). Exchange 1 Dragon Heart.' },
  { id: 'rot-breath', name: 'Rot Breath', type: 'Incantation', region: 'Caelid', coords: { x: 68, y: 60 }, location: 'Cathedral of Dragon Communion, north Caelid — exchange 2 Dragon Hearts', requirement: 'Fai 15, Arc 12', fpCost: 36, description: 'Breathes a torrent of Scarlet Rot mist in an arc. Builds Scarlet Rot rapidly on enemies — extremely effective against non-rot-immune bosses.', howToGet: 'At the altar in the Cathedral of Dragon Communion in north Caelid. Exchange 2 Dragon Hearts.' },
  { id: 'swarm-flies', name: 'Swarm of Flies', type: 'Incantation', region: 'Mountaintops of the Giants', coords: { x: 60, y: 18 }, location: 'Mohgwyn Palace area — on a corpse in the blood-soaked swamp area', requirement: 'Fai 11, Arc 16', fpCost: 14, description: 'Summons a swarm of bloodflies that converge on targets and build Bleed extremely rapidly. The fastest Bleed-building tool in the game for Arcane/Faith builds.', howToGet: 'On a corpse in the bloodswamp of Mohgwyn Palace, near the Palace Approach Ledge-Road Site of Grace.' },
  { id: 'bloodboon', name: 'Bloodboon', type: 'Incantation', region: 'Underground', coords: { x: 20, y: 55 }, location: 'Mohgwyn Palace — found on a corpse in the upper palace area', requirement: 'Fai 17, Arc 14', fpCost: 20, description: 'Scatters bloodflame on the ground that repeatedly triggers Bleed. Excellent field control for Arcane/Faith hybrid builds.', howToGet: 'On a corpse in the upper reaches of Mohgwyn Palace, past the Bloodbirds near the dynasty mausoleum.' },
  { id: 'erdtree-heal', name: 'Erdtree Heal', type: 'Incantation', region: 'Altus Plateau', coords: { x: 60, y: 38 }, location: 'Minor Erdtree Church, east Altus Plateau — on a corpse', requirement: 'Fai 42', fpCost: 65, description: 'Restores a massive amount of HP for the caster and all nearby allies. The most powerful healing incantation in the game — essential for Faith builds in co-op.', howToGet: 'On a corpse just outside or inside the Minor Erdtree Church in the eastern section of the Altus Plateau.' },
  // DLC Incantations
  { id: 'messmer-orb', name: 'Messmer\'s Orb', type: 'Incantation (DLC)', region: 'Scadu Altus', coords: { x: 24, y: 24 }, location: 'Obtained from Messmer\'s Remembrance via Enia at Roundtable Hold', requirement: 'Fai 33, Arc 18', fpCost: 26, description: 'Launches a serpentfire orb that erupts on contact. The follow-up R2 launches multiple homing serpent-fire missiles. Exceptional DLC incantation for Faith/Arcane builds.', howToGet: 'Transpose Remembrance of the Impaler (from Messmer) at Enia in Roundtable Hold.' },
  { id: 'midra-frenzied-flame', name: 'Midra\'s Flame of Frenzy', type: 'Incantation (DLC)', region: 'Scadu Altus', coords: { x: 35, y: 34 }, location: 'Obtained from Midra\'s Remembrance via Enia at Roundtable Hold', requirement: 'Fai 40', fpCost: 46, description: 'Releases a massive burst of Frenzied Flame from the caster\'s body in all directions. Extremely high damage, wide AoE, builds Madness. The most powerful Frenzy incantation.', howToGet: 'Transpose Remembrance of the Lord of Frenzied Flame (from Midra) at Enia in Roundtable Hold.' },
  { id: 'bayle-flame-lightning', name: 'Bayle\'s Flame Lightning', type: 'Incantation (DLC)', region: 'Jagged Peak', coords: { x: 57, y: 27 }, location: 'Obtained from Bayle\'s Remembrance via Enia at Roundtable Hold', requirement: 'Fai 42, Arc 18', fpCost: 34, description: 'Calls down Bayle\'s signature fire-lightning strike. Deals both fire and lightning damage simultaneously. The fire-lightning hybrid makes it effective against enemies resistant to one or the other.', howToGet: 'Transpose Remembrance of the Dragonlord Bayle (from Bayle) at Enia in Roundtable Hold.' },
  { id: 'ancient-dragon-lightning', name: 'Ancient Dragons\' Lightning Strike', type: 'Incantation (DLC)', region: 'Shadow Realm', coords: { x: 40, y: 35 }, location: 'Obtained via Ancient Dragon Man questline — found in the DLC dungeon areas', requirement: 'Fai 38', fpCost: 32, description: 'Calls down multiple bolts of ancient dragon lightning simultaneously. One of the most powerful lightning incantations added in the DLC, effective against most non-lightning-immune bosses.', howToGet: 'Obtained by progressing the Ancient Dragon Man NPC questline found in the DLC areas, or found in a chest in an Ancient Dragon dungeon.' }
];

// Region definitions for the map
const REGIONS_MAIN = [
  { id: 'Limgrave', label: 'Limgrave', x: 22, y: 62, w: 22, h: 16, color: '#4a7c2f' },
  { id: 'Weeping Peninsula', label: 'Weeping\nPeninsula', x: 24, y: 80, w: 18, h: 14, color: '#3a6a20' },
  { id: 'Liurnia', label: 'Liurnia of\nthe Lakes', x: 20, y: 38, w: 24, h: 22, color: '#2a4a7a' },
  { id: 'Caelid', label: 'Caelid', x: 58, y: 48, w: 22, h: 24, color: '#7a2a2a' },
  { id: 'Altus Plateau', label: 'Altus\nPlateau', x: 42, y: 38, w: 22, h: 18, color: '#7a6a2a' },
  { id: 'Leyndell', label: 'Leyndell', x: 46, y: 42, w: 10, h: 8, color: '#8a7a3a' },
  { id: 'Mt. Gelmir', label: 'Mt. Gelmir', x: 28, y: 28, w: 18, h: 12, color: '#7a3a2a' },
  { id: 'Mountaintops of the Giants', label: 'Mountaintops\nof the Giants', x: 50, y: 8, w: 28, h: 14, color: '#5a6a8a' },
  { id: 'Consecrated Snowfield', label: 'Consecrated\nSnowfield', x: 26, y: 5, w: 22, h: 12, color: '#6a7a9a' },
  { id: 'Farum Azula', label: 'Crumbling\nFarum Azula', x: 78, y: 10, w: 18, h: 18, color: '#5a4a2a' },
  { id: 'Underground', label: 'Underground\n(Nokron / Siofra)', x: 22, y: 52, w: 16, h: 10, color: '#3a2a5a' },
];

const REGIONS_DLC = [
  { id: 'Gravesite Plain', label: 'Gravesite Plain', x: 14, y: 48, w: 22, h: 18, color: '#4a5a3a' },
  { id: 'Scadu Altus', label: 'Scadu Altus', x: 12, y: 18, w: 30, h: 26, color: '#3a4a2a' },
  { id: 'Shadow Realm', label: 'Shadow Realm\n(misc)', x: 36, y: 38, w: 18, h: 14, color: '#2a3a2a' },
  { id: 'Jagged Peak', label: 'Jagged Peak', x: 48, y: 18, w: 16, h: 18, color: '#4a3a2a' },
  { id: 'Enir-Ilim', label: 'Enir-Ilim', x: 26, y: 6, w: 16, h: 10, color: '#6a5a2a' },
];
