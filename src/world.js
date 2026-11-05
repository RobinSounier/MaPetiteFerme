// ============================================================
//  DONNÉES DU JEU
// ============================================================
const SAVE_KEY = 'maPetiteFerme_vallee_v2';
const OLD_KEYS = ['maPetiteFerme_aventure_v1', 'maPetiteFerme_v1'];

const ITEMS = {
  // Cultures
  ble:        { name: 'Blé',        icon: '🌾', price: 6,   cat: 'culture', col: '#e8c55a', desc: 'La base de tout fermier. Nourrit les poules.' },
  carotte:    { name: 'Carotte',    icon: '🥕', price: 14,  cat: 'culture', col: '#e67e22', desc: 'Croquante. Les moutons en raffolent.' },
  tomate:     { name: 'Tomate',     icon: '🍅', price: 28,  cat: 'culture', col: '#e74c3c', desc: 'Juteuse, parfaite pour la soupe.' },
  mais:       { name: 'Maïs',       icon: '🌽', price: 42,  cat: 'culture', col: '#f1c40f', desc: 'Nourriture préférée des vaches.' },
  fraise:     { name: 'Fraise',     icon: '🍓', price: 70,  cat: 'culture', col: '#e53950', desc: 'Sucrée. Indispensable en pâtisserie.' },
  citrouille: { name: 'Citrouille', icon: '🎃', price: 110, cat: 'culture', col: '#e67e22', desc: 'Énorme ! Les cochons l\'adorent.' },
  tournesol:  { name: 'Tournesol',  icon: '🌻', price: 170, cat: 'culture', col: '#f9c80e', desc: 'La plus belle fleur des champs.' },
  cepe:       { name: 'Cèpe',       icon: '🍄', price: 65,  cat: 'culture', col: '#a8733f', desc: 'Ne pousse qu\'à l\'ombre du jardin de la forêt.' },
  myrtille:   { name: 'Myrtilles',  icon: '🫐', price: 100, cat: 'culture', col: '#3242a8', desc: 'Petits fruits du jardin de la forêt.' },
  melon:      { name: 'Melon',      icon: '🍈', price: 120, cat: 'culture', col: '#9bd36a', desc: 'Adore le sable chaud du jardin de la plage.' },
  vanille:    { name: 'Vanille',    icon: '🌿', price: 210, cat: 'culture', col: '#3a2a1a', desc: 'Gousses parfumées du jardin de la plage.' },
  houx:       { name: 'Houx',       icon: '🌿', price: 150, cat: 'culture', col: '#2e7d32', desc: 'Ne pousse que dans le froid du jardin des neiges.' },
  edelweiss:  { name: 'Edelweiss',  icon: '🤍', price: 260, cat: 'culture', col: '#f2f6fa', desc: 'Fleur rare des sommets enneigés.' },
  // Animaux
  oeuf:   { name: 'Œuf',    icon: '🥚', price: 20,  cat: 'animal', col: '#fbf3e4', desc: 'Pondu par tes poules.' },
  lait:   { name: 'Lait',   icon: '🥛', price: 55,  cat: 'animal', col: '#ffffff', desc: 'Frais du matin, offert par tes vaches.' },
  laine:  { name: 'Laine',  icon: '🧶', price: 85,  cat: 'animal', col: '#efe6d2', desc: 'Toute douce, tondue sur tes moutons.' },
  truffe: { name: 'Truffe', icon: '🍄', price: 200, cat: 'animal', col: '#7a5233', desc: 'Dénichée par tes cochons. Très rare.' },
  angora:     { name: 'Laine angora',       icon: '🐇', price: 90,  cat: 'animal', col: '#f5f0ff', desc: 'Offerte par tes lapins de la forêt.' },
  boiscerf:   { name: 'Bois de cerf',       icon: '🦌', price: 160, cat: 'animal', col: '#c8a070', desc: 'Les cerfs perdent leurs bois chaque saison.' },
  fourrure:   { name: 'Fourrure de mue',    icon: '🦊', price: 220, cat: 'animal', col: '#f2f6fa', desc: 'Laissée par ton renard des neiges à chaque mue.' },
  laitchevre: { name: 'Lait de chèvre',     icon: '🐐', price: 85,  cat: 'animal', col: '#fffaf0', desc: 'Donné par tes chèvres des montagnes.' },
  // Nature
  bois:       { name: 'Bois',             icon: '🪵', price: 6,   cat: 'nature', col: '#8a5a2c', desc: 'Ramassé en forêt. Sert à construire.' },
  champi:     { name: 'Champignon',       icon: '🍄', price: 18,  cat: 'nature', col: '#d64541', desc: 'Cueilli dans la forêt des Murmures.' },
  baie:       { name: 'Baies sauvages',   icon: '🫐', price: 12,  cat: 'nature', col: '#4a5bd6', desc: 'Pour faire de la confiture.' },
  coquillage: { name: 'Coquillage',       icon: '🐚', price: 16,  cat: 'nature', col: '#f7c6c9', desc: 'Trouvé sur la plage du Grand Bleu.' },
  poisson:    { name: 'Poisson',          icon: '🐟', price: 28,  cat: 'nature', col: '#6aa6d6', desc: 'Pêché en mer.' },
  saumon:     { name: 'Saumon',           icon: '🐟', price: 70,  cat: 'nature', col: '#f08a6a', desc: 'Une belle prise, plus rare.' },
  pierre:     { name: 'Pierre',           icon: '🪨', price: 5,   cat: 'nature', col: '#8d8f96', desc: 'Extraite dans les Monts Givrés.' },
  fer:        { name: 'Minerai de fer',   icon: '⛓️', price: 35,  cat: 'nature', col: '#c8702a', desc: 'Pour améliorer tes outils.' },
  cristal:    { name: 'Cristal',          icon: '💎', price: 140, cat: 'nature', col: '#5fd3f5', desc: 'Très rare, au fond de la mine.' },
  or:         { name: 'Pépite d\'or',      icon: '🟡', price: 220, cat: 'nature', col: '#f2c94c', desc: 'Le trésor des profondeurs de la mine.' },
  rubis:      { name: 'Rubis',            icon: '🔴', price: 260, cat: 'nature', col: '#e0244a', desc: 'Pierre précieuse des galeries du nord de la mine.' },
  emeraude:   { name: 'Émeraude',         icon: '🟢', price: 300, cat: 'nature', col: '#2ecc71', desc: 'Pierre précieuse des galeries du nord de la mine.' },
  // Artisanat
  pain:      { name: 'Pain',             icon: '🍞', price: 75,  cat: 'artisanat', col: '#c98a3e', desc: 'Sorti du four de la boulangerie.' },
  confiture: { name: 'Confiture',        icon: '🫙', price: 95,  cat: 'artisanat', col: '#5a2a8a', desc: 'Confiture de baies sauvages.' },
  fromage:   { name: 'Fromage',          icon: '🧀', price: 150, cat: 'artisanat', col: '#f4d03f', desc: 'Affiné à la laiterie.' },
  soupe:     { name: 'Soupe de poisson', icon: '🍲', price: 150, cat: 'artisanat', col: '#e67e22', desc: 'La spécialité de la cuisine du port.' },
  tarte:     { name: 'Tarte',            icon: '🥧', price: 190, cat: 'artisanat', col: '#e2a85a', desc: 'Tarte à la citrouille.' },
  pull:      { name: 'Pull',             icon: '🧥', price: 260, cat: 'artisanat', col: '#3d7fd6', desc: 'Tricoté avec ta laine.' },
  gateau:    { name: 'Gâteau',           icon: '🍰', price: 420, cat: 'artisanat', col: '#f7a8c4', desc: 'Le chef-d\'œuvre de la pâtisserie.' },
  bijou:     { name: 'Bijou de fête',    icon: '💍', price: 480, cat: 'artisanat', col: '#5fd3f5', desc: 'Joli bijou à vendre, forgé avec du fer et un cristal.' },
  echarpe:   { name: 'Écharpe angora',   icon: '🧣', price: 280, cat: 'artisanat', col: '#f5f0ff', desc: 'Toute douce, tricotée avec la laine de tes lapins.' },
  manteau:   { name: 'Manteau d\'hiver', icon: '🧥', price: 700, cat: 'artisanat', col: '#f2f6fa', desc: 'Le vêtement le plus chaud (et le plus cher) de la vallée.' },
  chevre:    { name: 'Fromage de chèvre', icon: '🧀', price: 240, cat: 'artisanat', col: '#fffaf0', desc: 'Affiné à la laiterie.' },
  ragout:    { name: 'Ragoût forestier', icon: '🍲', price: 300, cat: 'artisanat', col: '#8a5a2c', desc: 'Cèpes, carottes et tomates. Se mange !' },
  sculpture: { name: 'Sculpture',        icon: '🗿', price: 450, cat: 'artisanat', col: '#c8a070', desc: 'Sculptée dans un bois de cerf.' },
  // Bijoux magiques (à équiper)
  bague:    { name: 'Bague d\'agilité',       icon: '💍', price: 600, cat: 'bijou', col: '#e0244a', desc: 'Équipée : tu te déplaces 20 % plus vite.' },
  collier:  { name: 'Collier de l\'ingénieur', icon: '📿', price: 650, cat: 'bijou', col: '#9aa4ad', desc: 'Équipé : tes machines travaillent 25 % plus vite.' },
  amulette: { name: 'Amulette de fortune',    icon: '🧿', price: 800, cat: 'bijou', col: '#2ecc71', desc: 'Équipée : 15 % de chance de récolte, cueillette et pêche doublées.' },
  broche:   { name: 'Broche du sage',         icon: '🔷', price: 700, cat: 'bijou', col: '#5fd3f5', desc: 'Équipée : +15 % d\'expérience.' },
  bracelet: { name: 'Bracelet de la nature',  icon: '💚', price: 700, cat: 'bijou', col: '#2ecc71', desc: 'Équipé : tes cultures poussent 15 % plus vite.' },
  // Consommables
  engrais:      { name: 'Engrais',         icon: '🧪', price: 20, cat: 'conso', col: '#7cb342', desc: 'Champ et jardins poussent 2× plus vite pendant 3 minutes.' },
  superengrais: { name: 'Super engrais',   icon: '🧪', price: 70, cat: 'conso', col: '#f2c94c', desc: 'Champ et jardins poussent 3× plus vite pendant 3 minutes.' },
  cafe:         { name: 'Café du fermier', icon: '☕', price: 25, cat: 'conso', col: '#6e4520', desc: 'Tu cours 60 % plus vite pendant 3 minutes.' },
};
const CATS = { culture: '🌾 Cultures', animal: '🐔 Animaux', nature: '🌲 Nature', artisanat: '🏭 Artisanat', bijou: '💍 Bijoux', conso: '🧪 Consommables' };

const CROPS = {
  ble:        { seed: 3,  time: 45,  xp: 1,  lvl: 1 },
  carotte:    { seed: 6,  time: 90,  xp: 2,  lvl: 1 },
  tomate:     { seed: 12, time: 180, xp: 3,  lvl: 2 },
  mais:       { seed: 18, time: 240, xp: 4,  lvl: 4 },
  fraise:     { seed: 30, time: 360, xp: 6,  lvl: 5 },
  citrouille: { seed: 45, time: 480, xp: 8,  lvl: 6 },
  tournesol:  { seed: 70, time: 720, xp: 11, lvl: 8 },
  // Plantes de biome (uniquement dans leur jardin)
  cepe:       { seed: 20, time: 300, xp: 5,  lvl: 3, biome: 'foret' },
  myrtille:   { seed: 35, time: 420, xp: 7,  lvl: 5, biome: 'foret' },
  melon:      { seed: 40, time: 420, xp: 7,  lvl: 5, biome: 'plage' },
  vanille:    { seed: 75, time: 600, xp: 10, lvl: 7, biome: 'plage' },
  houx:       { seed: 50, time: 480, xp: 9,  lvl: 8, biome: 'montagne' },
  edelweiss:  { seed: 90, time: 720, xp: 13, lvl: 9, biome: 'montagne' },
};
const CROP_KEYS = Object.keys(CROPS).filter(k => !CROPS[k].biome);
// Jardins de biome : 12 parcelles chacun, clôturés, avec une entrée tournée vers le chemin
const GARDENS = {
  foret:    { name: 'Jardin des sous-bois', x: 32, y: 10, w: 4, h: 3, gate: 'top',    home: 'cabin' },
  plage:    { name: 'Jardin de la plage',   x: 7,  y: 48, w: 4, h: 3, gate: 'bottom', home: 'hut' },
  montagne: { name: 'Jardin des neiges',    x: 64, y: 16, w: 4, h: 3, gate: 'bottom', home: 'minehut' },
};
const GARDEN_MACHINES = {
  arroseur:  { name: 'Arroseur de jardin', icon: '💦', desc: 'Arrose instantanément les 12 parcelles du jardin.', cost: b => ({ coins: 350, bois: 15, ...(b === 'montagne' ? { fer: 4 } : {}) }) },
  recolteur: { name: 'Récolteur de jardin', icon: '🧺', desc: 'Récolte les plantes mûres et replante la même espèce. 1 parcelle toutes les 4 s.', period: 4,
               cost: b => ({ coins: 900, bois: 25, ...(b === 'montagne' ? { fer: 8 } : { pierre: 0 }) }) },
};
const GARDEN_CROPS = {}; for (const [k, c] of Object.entries(CROPS)) if (c.biome) (GARDEN_CROPS[c.biome] = GARDEN_CROPS[c.biome] || []).push(k);
const ANIMALS = {
  poule:  { name: 'Poule',  icon: '🐔', cost: 120,  lvl: 2, food: 'ble',        foodQty: 1, product: 'oeuf',   time: 90,  xp: 2 },
  vache:  { name: 'Vache',  icon: '🐄', cost: 600,  lvl: 5, food: 'mais',       foodQty: 1, product: 'lait',   time: 180, xp: 4 },
  mouton: { name: 'Mouton', icon: '🐑', cost: 900,  lvl: 7, food: 'carotte',    foodQty: 2, product: 'laine',  time: 240, xp: 5 },
  cochon: { name: 'Cochon', icon: '🐖', cost: 1500, lvl: 9, food: 'citrouille', foodQty: 1, product: 'truffe', time: 300, xp: 8 },
  lapin:  { name: 'Lapin angora',      icon: '🐇', cost: 500,  lvl: 4, food: 'carotte', foodQty: 1, product: 'angora',     time: 200, xp: 4, pen: 'foret',    shop: 'cabin' },
  cerf:   { name: 'Cerf',              icon: '🦌', cost: 1200, lvl: 6, food: 'baie',    foodQty: 2, product: 'boiscerf',   time: 300, xp: 7, pen: 'foret',    shop: 'cabin' },
  renard: { name: 'Renard des neiges', icon: '🦊', cost: 2000, lvl: 8, food: 'poisson', foodQty: 1, product: 'fourrure',   time: 300, xp: 8, pen: 'montagne', shop: 'minehut' },
  chevre: { name: 'Chèvre des cimes',  icon: '🐐', cost: 1400, lvl: 8, food: 'ble',     foodQty: 2, product: 'laitchevre', time: 240, xp: 6, pen: 'montagne', shop: 'minehut' },
};
const MAX_PER_ANIMAL = 6;
const WORKSHOPS = {
  boulangerie:  { name: 'Boulangerie',      icon: '🥖', cost: 250,  mats: {},                       lvl: 3, recipes: [
    { out: 'pain', in: { ble: 3, oeuf: 1 }, time: 90, xp: 4, lvl: 3 },
    { out: 'tarte', in: { citrouille: 1, ble: 2, oeuf: 1 }, time: 150, xp: 7, lvl: 6 } ] },
  confiturerie: { name: 'Confiturerie',     icon: '🫙', cost: 400,  mats: { bois: 10 },             lvl: 4, recipes: [ { out: 'confiture', in: { baie: 4 }, time: 120, xp: 5, lvl: 4 } ] },
  laiterie:     { name: 'Laiterie',         icon: '🧀', cost: 600,  mats: { bois: 15 },             lvl: 5, recipes: [ { out: 'fromage', in: { lait: 2 }, time: 120, xp: 6, lvl: 5 }, { out: 'chevre', in: { laitchevre: 2 }, time: 150, xp: 9, lvl: 8 } ] },
  cuisine:      { name: 'Cuisine du port',  icon: '🍲', cost: 800,  mats: { bois: 20 },             lvl: 6, recipes: [ { out: 'soupe', in: { poisson: 2, tomate: 1, carotte: 1 }, time: 120, xp: 7, lvl: 6 }, { out: 'ragout', in: { cepe: 2, carotte: 2, tomate: 1 }, time: 150, xp: 9, lvl: 6 } ] },
  tissage:      { name: 'Atelier de tissage', icon: '🧵', cost: 1000, mats: { bois: 20 }, lvl: 7, recipes: [ { out: 'pull', in: { laine: 2 }, time: 180, xp: 9, lvl: 7 }, { out: 'echarpe', in: { angora: 2 }, time: 160, xp: 9, lvl: 7 }, { out: 'manteau', in: { fourrure: 2, laine: 1 }, time: 240, xp: 14, lvl: 8 } ] },
  forge:        { name: 'Forge',            icon: '⚒️', cost: 1200, mats: { pierre: 25 },           lvl: 8, recipes: [
    { out: 'bijou', in: { cristal: 1, fer: 2 }, time: 240, xp: 12, lvl: 8 }, { out: 'sculpture', in: { boiscerf: 2 }, time: 200, xp: 11, lvl: 8 },
    { out: 'bague', in: { rubis: 1, or: 1 }, time: 240, xp: 15, lvl: 8 }, { out: 'collier', in: { fer: 3, or: 1, cristal: 1 }, time: 240, xp: 15, lvl: 8 },
    { out: 'broche', in: { cristal: 2, or: 1 }, time: 260, xp: 16, lvl: 9 }, { out: 'bracelet', in: { emeraude: 1, fer: 2 }, time: 260, xp: 16, lvl: 9 },
    { out: 'amulette', in: { emeraude: 1, or: 2 }, time: 300, xp: 18, lvl: 9 } ] },
  patisserie:   { name: 'Pâtisserie',       icon: '🧁', cost: 1600, mats: { bois: 20, pierre: 20 }, lvl: 9, recipes: [ { out: 'gateau', in: { fraise: 3, lait: 1, oeuf: 1 }, time: 200, xp: 12, lvl: 9 } ] },
};
const FIELD_UPGRADES = [
  { coins: 80 }, { coins: 200, bois: 10 }, { coins: 450, bois: 20 },
  { coins: 800, bois: 25, pierre: 10 }, { coins: 1300, bois: 30, pierre: 20 },
];
const CAN_UPGRADES = [
  { cap: 8 }, { cap: 12, coins: 120 }, { cap: 16, coins: 300, bois: 10 },
  { cap: 20, coins: 700, fer: 5 }, { cap: 25, coins: 1200, fer: 10, cristal: 1 },
];
const CLIENTS = ['Mamie Josette 👵', 'Le boulanger du bourg 👨‍🍳', 'Petite Lucie 👧', 'Le docteur Martin 🩺', 'Paul le pêcheur 🎣',
  'Madame Dupont 👩', 'La cheffe du bistrot 🧑‍🍳', 'Tonton Marcel 👴', 'La maîtresse 👩‍🏫', 'Le facteur 📮', 'Les jumeaux Léo et Léa 👦👧'];
const WATER_BONUS = 1.5;
const MAX_LEVEL = 10;

// ============================================================
//  CARTE
// ============================================================
const TILE = 16, PX = 3, MW = 100, MH = 60, VW_TILES = 80; // la mine est à droite (x ≥ 80), invisible depuis la vallée
const T = { GRASS: 0, PATH: 1, WATER: 2, TREE: 3, FENCE: 4, PLOT: 5, FLOWER: 6, SAND: 7, BUSH: 8, TALL: 9, STONE: 12, ROCK: 13, PIER: 14, BRIDGE: 15, CLIFF: 16, PINE: 17, PALM: 18, WALL: 19 };
const SOLID = new Set([T.WATER, T.TREE, T.FENCE, T.BUSH, T.ROCK, T.CLIFF, T.PINE, T.PALM, T.WALL]);
const ZONES = {
  ferme:    { name: 'La ferme',             icon: '🏡', col: '#7cc35a', lvl: 1 },
  village:  { name: 'Bourg-Joli',           icon: '🏘️', col: '#c8b48a', lvl: 1 },
  foret:    { name: 'Forêt des Murmures',   icon: '🌲', col: '#2f6d2a', lvl: 3, gate: 'foret' },
  plage:    { name: 'Plage du Grand Bleu',  icon: '🏖️', col: '#e6cf8f', lvl: 5, gate: 'pont' },
  montagne: { name: 'Monts Givrés',         icon: '🏔️', col: '#dfe8f0', lvl: 8, gate: 'mont' },
  mine:     { name: 'Mine des Givrés',      icon: '⛏️', col: '#4a4038', lvl: 8, gate: 'mont' },
};
function biomeAt(x, y) {
  if (x >= 80) return 'mine';
  if (x >= 63) return 'montagne';
  if (y <= 17) return 'foret';
  if (y >= 47) return 'plage';
  if (x >= 42) return 'village';
  return 'ferme';
}
const FIELD = { x: 15, y: 22, w: 8, h: 6 };
const START_PLOTS = 8, MAX_PLOTS = FIELD.w * FIELD.h;
const PEN = { x: 4, y: 32, w: 11, h: 12 };
const ANIMAL_ZONE = { x1: 5.6, x2: 13.4, y1: 37, y2: 42.4 };
const ANIMAL_ZONES = { ferme: ANIMAL_ZONE, foret: { x1: 38.6, x2: 43.4, y1: 10, y2: 13.4 }, montagne: { x1: 72.6, x2: 76.6, y1: 22.5, y2: 27.4 } };

// Bâtiments : top = débord du toit au-dessus de la zone solide (en pixels art)
const BUILDINGS = [
  { id: 'house',    x: 6,  y: 21, w: 6, h: 4, name: 'Maison',        top: 16, spr: 'house',    lights: [[14, 52, 14, 13], [68, 52, 14, 13]] },
  { id: 'coop',     x: 6,  y: 33, w: 4, h: 3, name: 'Animalerie',    top: 12, spr: 'coop',     lights: [[29, 27, 6, 6]] },
  { id: 'mairie',   x: 48, y: 21, w: 6, h: 4, name: 'Mairie',        top: 20, spr: 'mairie',   lights: [[18, 52, 8, 12], [70, 52, 8, 12]] },
  { id: 'cottA',    x: 42, y: 21, w: 4, h: 3, name: '',              top: 12, spr: 'cottA',    lights: [[10, 40, 8, 7], [46, 40, 8, 7]] },
  { id: 'cottB',    x: 56, y: 21, w: 4, h: 3, name: 'Mercerie',              top: 12, spr: 'cottB',    lights: [[10, 40, 8, 7], [46, 40, 8, 7]] },
  { id: 'market',   x: 44, y: 37, w: 5, h: 3, name: 'Marché',        top: 16, spr: 'market',   lights: [] },
  { id: 'workshop', x: 53, y: 37, w: 5, h: 4, name: 'Atelier d\'Hugo',      top: 16, spr: 'workshop', lights: [[11, 49, 10, 10], [59, 49, 10, 10]] },
  { id: 'board',    x: 50, y: 38, w: 1, h: 1, name: 'Commandes',     top: 8,  spr: 'board',    lights: [] },
  { id: 'well',     x: 47, y: 33, w: 1, h: 1, name: '',              top: 8,  spr: 'well',     lights: [], wide: true },
  { id: 'cabin',    x: 28, y: 4,  w: 4, h: 3, name: 'Cabane',        top: 8,  spr: 'cabin',    lights: [[10, 34, 6, 5], [48, 34, 6, 5]] },
  { id: 'hut',      x: 18, y: 49, w: 4, h: 3, name: 'Cabane du port', top: 4, spr: 'hut',      lights: [[11, 31, 6, 6], [47, 31, 6, 6]] },
  { id: 'cave',     x: 68, y: 7,  w: 4, h: 3, name: 'Entrée de la mine', top: 4, spr: 'cave',  lights: [[20, 36, 24, 14]] },
  { id: 'minehut',  x: 64, y: 11, w: 4, h: 3, name: 'Cabane d\'Agathe', top: 12, spr: 'minehut', lights: [[10, 40, 8, 7], [46, 40, 8, 7]] },
  { id: 'ladder',   x: 89, y: 45, w: 2, h: 1, name: 'Sortie',         top: 8,  spr: 'ladder',   lights: [[4, 2, 24, 10]] },
  ...Object.entries({ boulangerie: [42, 42], confiturerie: [46, 42], laiterie: [50, 42], tissage: [54, 42], patisserie: [58, 42], cuisine: [23, 49], forge: [73, 12] })
     .map(([k, [x, y]]) => ({ id: 'ws_' + k, ws: k, x, y, w: 3, h: 2, name: '', top: 14, spr: 'ws_' + k, lights: [[7, 22, 8, 7], [33, 22, 8, 7]] })),
  ...[[85, 40], [94, 40], [85, 30], [94, 30], [85, 20], [94, 20], [85, 10], [94, 10], [92, 4]].map(([x, y], i) => ({ id: 'torch' + i, x, y, w: 1, h: 1, name: '', top: 6, spr: 'torch', lights: [[6, 2, 4, 4]], lamp: true, torch: true })),
  ...[[44, 27], [59, 27], [44, 35], [59, 35]].map(([x, y], i) => ({ id: 'lamp' + i, x, y, w: 1, h: 1, name: '', top: 10, spr: 'lamp', lights: [[2, 2, 4, 3]], lamp: true })),
];

const GATES = {
  foret: { name: 'Arbre tombé',  x: 22, y: 18, w: 2, h: 2, after: T.PATH,   req: { lvl: 3, coins: 100 },
           desc: 'Un vieux chêne, tombé pendant la tempête, bloque le chemin de la forêt.', zone: 'foret' },
  pont:  { name: 'Pont cassé',   x: 30, y: 45, w: 2, h: 2, after: T.BRIDGE, req: { lvl: 5, coins: 250, bois: 20 },
           desc: 'Le pont vers la plage s\'est effondré cet hiver. Il faut du bois et des clous.', zone: 'plage' },
  mont:  { name: 'Éboulement',   x: 61, y: 30, w: 2, h: 2, after: T.STONE,  req: { lvl: 8, coins: 600, bois: 30 },
           desc: 'Des rochers bloquent la route des Monts Givrés. Il faut des étais en bois et des bras.', zone: 'montagne' },
};

const NPCS = [
  { id: 'rose',    name: 'Rose',    role: 'La maire',          x: 51.5, y: 27.4, dir: 'down', lines: ['Bourg-Joli a bien changé depuis que tu es là !', 'Ton grand-père Émile plantait toujours du blé en premier. « La base de tout », disait-il.', 'Le tableau des commandes est juste au sud de la place.'] },
  { id: 'margot',  name: 'Margot',  role: 'La marchande',      x: 46.5, y: 40.6, dir: 'down', lines: ['Tout ce qui se récolte, je l\'achète !', 'Les commandes du tableau paient mieux que moi… mais moi, je prends tout, tout de suite.', 'Pense à agrandir ton champ : c\'est le meilleur investissement.'] },
  { id: 'hugo',    name: 'Hugo',    role: 'L\'artisan',        x: 55.5, y: 41.6, dir: 'down', lines: ['Un bon artisan a toujours du bois sous la main.', 'Chaque atelier transforme tes produits en quelque chose de plus précieux.', 'Mes ateliers fument quand ils travaillent. Regarde la cheminée !'] },
  { id: 'sylvain', name: 'Sylvain', role: 'Le garde forestier', x: 30.5, y: 8.6, dir: 'down', lines: ['Les branches mortes repoussent, la forêt est généreuse.', 'Les buissons de baies se remplissent à nouveau après quelques minutes.', 'Chut… écoute. C\'est pour ça qu\'on l\'appelle la forêt des Murmures.'] },
  { id: 'marin',   name: 'Marin',   role: 'Le pêcheur',        x: 40.5, y: 53.6, dir: 'down', lines: ['Au bout du ponton, ça mord toujours mieux.', 'Quand le bouchon s\'agite et que tu vois « ! », appuie tout de suite !', 'Les saumons ne viennent qu\'aux pêcheurs expérimentés (niveau 6).'] },
  { id: 'lucie',   name: 'Lucie',   role: 'La couturière',      x: 57.5, y: 24.6, dir: 'down', lines: ['Un nouveau chapeau ? J\'en ai pour tous les goûts !', 'Certains vêtements ne s\'achètent pas : ils récompensent les plus grands exploits du Livre des objectifs.', 'La fourrure de renard ? Je rêve d\'en faire un manteau !'] },
  { id: 'agathe',  name: 'Agathe',  role: 'La mineuse',        x: 70.5, y: 12.6, dir: 'down', lines: ['Les rochers avec des taches orange contiennent du fer.', 'Les cristaux et l\'or se cachent au fond de la mine. Entre par la grotte !', 'Les rochers se reforment après quelques minutes. La montagne est vivante !'] },
];

// ============================================================
//  HISTOIRE
// ============================================================
const CHAPTERS = ['L\'héritage', 'La basse-cour', 'La forêt des Murmures', 'La plage du Grand Bleu', 'Les Monts Givrés', 'La fête de la vallée'];
const STORY = [
  // ---------- Chapitre 1 : L'héritage ----------
  { id: 'm_ble', ch: 0, npc: 'rose', t: 'Premières graines', d: 'Plante 4 blé dans le champ', ev: 'plant', k: 'ble', n: 4, r: { coins: 15, xp: 5 },
    say: 'Bienvenue à Bourg-Joli, {name} ! Je suis Rose, la maire. Ton grand-père Émile serait si fier de te voir reprendre sa ferme… Le champ est en friche, mais une rangée est encore propre. Choisis le blé (touche 1) et plantes-en 4.' },
  { id: 'm_eau', ch: 0, npc: 'rose', t: 'Un peu d\'eau', d: 'Arrose 4 parcelles', ev: 'water', n: 4, r: { coins: 10, xp: 5 },
    say: 'Ce qui est arrosé pousse 50 % plus vite. Ton arrosoir se remplit à l\'étang de la ferme ou à la rivière, au sud.' },
  { id: 'm_moisson', ch: 0, npc: 'rose', t: 'Première moisson', d: 'Récolte 4 blé', ev: 'harvest', k: 'ble', n: 4, r: { coins: 15, xp: 8 },
    say: 'Maintenant, patience. Ici rien ne pousse en un claquement de doigts. Quand le blé est doré, récolte-le !' },
  { id: 'm_marche', ch: 0, npc: 'margot', t: 'Jour de marché', d: 'Gagne 20 pièces en vendant au Marché', ev: 'sell', n: 20, r: { coins: 10, xp: 6 },
    say: 'Bonjour ! Moi c\'est Margot. Je tiens le marché de Bourg-Joli, sur la place du village, à l\'est de ta ferme. Apporte-moi tes récoltes : tu peux tout vendre, ou juste la quantité que tu veux.' },
  { id: 'm_carotte', ch: 0, npc: 'margot', t: 'Des carottes !', d: 'Récolte 3 carottes', ev: 'harvest', k: 'carotte', n: 3, r: { coins: 20, xp: 8 },
    say: 'Le blé, c\'est bien. Mais les carottes se vendent plus du double ! Elles poussent plus lentement, alors pense à les arroser.' },
  { id: 'm_service', ch: 0, npc: 'rose', t: 'Rendre service', d: 'Livre 1 commande du tableau', ev: 'deliver', n: 1, r: { coins: 25, xp: 10 },
    say: 'Les villageois affichent leurs commandes sur le tableau, au sud de la place. Elles paient mieux que le marché… et ça fait des heureux !' },
  { id: 'm_niv2', ch: 0, npc: 'rose', t: 'Apprenti fermier', d: 'Atteins le niveau 2', state: () => S.level, n: 2, r: { coins: 30 },
    say: 'Tu prends le coup de main. Continue de cultiver et de livrer. Et jette un œil au Livre des objectifs (touche L) : chaque objectif réussi rapporte une récompense.' },
  // ---------- Chapitre 2 : La basse-cour ----------
  { id: 'm_poule', ch: 1, npc: 'rose', t: 'Cot cot !', d: 'Achète une poule à l\'Animalerie', ev: 'buyAnimal', k: 'poule', n: 1, r: { coins: 20, xp: 10 },
    say: 'Émile avait toujours des poules. L\'animalerie est encore debout, dans l\'enclos au sud de ta maison. Et si tu en adoptais une ?' },
  { id: 'm_repas', ch: 1, npc: 'rose', t: 'L\'heure du repas', d: 'Nourris tes animaux 3 fois', ev: 'feed', n: 3, r: { coins: 20, xp: 8 },
    say: 'Une poule mange du blé. Entre dans l\'enclos et donne-lui à manger : elle te le rendra bien.' },
  { id: 'm_oeufs', ch: 1, npc: 'rose', t: 'Omelette en vue', d: 'Ramasse 3 œufs', ev: 'collect', k: 'oeuf', n: 3, r: { coins: 30, xp: 10 },
    say: 'Quand une bulle dorée apparaît au-dessus de ta poule, c\'est qu\'un œuf t\'attend !' },
  { id: 'm_champ', ch: 1, npc: 'margot', t: 'Plus de place', d: 'Agrandis ton champ (Marché → Améliorations)', ev: 'expand', n: 1, r: { coins: 20, xp: 12 },
    say: 'Tu manques de place ? Je connais des gens pour défricher. Passe au marché, onglet Améliorations.' },
  { id: 'm_engrais', ch: 1, npc: 'margot', t: 'Un coup de pouce', d: 'Achète un engrais à la Boutique du marché et utilise-le', ev: 'useConso', k: 'engrais', n: 1, r: { coins: 25, xp: 10 },
    say: 'Ma boutique vend aussi des petits coups de pouce : l\'engrais fait pousser tout ton champ deux fois plus vite pendant quelques minutes, et le café te fait courir. Essaie l\'engrais : utilise-le depuis la barre du bas ou ton sac.' },
  { id: 'm_lucie', ch: 1, npc: 'lucie', t: 'Une nouvelle tenue', d: 'Achète un vêtement à la Mercerie de Lucie', ev: 'buyCos', n: 1, r: { coins: 30, xp: 10 },
    say: 'Coucou ! Moi c\'est Lucie, la couturière. Ma mercerie est la maison verte, au nord-est de la place. Une fermière ou un fermier qui a du style, ça donne envie d\'acheter ses légumes !' },
  { id: 'm_niv3', ch: 1, npc: 'rose', t: 'Fermier confirmé', d: 'Atteins le niveau 3', state: () => S.level, n: 3, r: { coins: 50 },
    say: 'Un vieux chêne bloque toujours le chemin de la forêt, au nord de ta ferme. Quand tu auras un peu plus d\'expérience, on pourra s\'en occuper.' },
  // ---------- Chapitre 3 : La forêt des Murmures ----------
  { id: 'm_nord', ch: 2, npc: 'rose', t: 'Le chemin du nord', d: 'Dégage l\'arbre tombé (au nord de la ferme)', ev: 'gate', k: 'foret', n: 1, r: { xp: 15 },
    say: 'Tu es prêt ! Va voir le tronc couché au nord de ta ferme. Avec 100 pièces, les bûcherons du bourg le dégageront.' },
  { id: 'm_bois', ch: 2, npc: 'sylvain', t: 'Du bois pour l\'hiver', d: 'Ramasse 10 bois en forêt', ev: 'gather', k: 'bois', n: 10, r: { coins: 40, xp: 12 },
    say: 'Enfin quelqu\'un ! Je suis Sylvain, le garde forestier. La forêt est pleine de branches mortes : ramasse-les, le bois sert à tout construire.' },
  { id: 'm_champi', ch: 2, npc: 'sylvain', t: 'Cueillette', d: 'Cueille 5 champignons sauvages', ev: 'gather', k: 'champi', n: 5, r: { coins: 40, xp: 12 },
    say: 'Les champignons sauvages poussent à l\'ombre des arbres. Ne les mange pas tous, ils se vendent très bien !' },
  { id: 'm_cepes', ch: 2, npc: 'sylvain', t: 'Le jardin des sous-bois', d: 'Plante 4 cèpes dans le jardin de la forêt', ev: 'plant', k: 'cepe', n: 4, r: { coins: 40, xp: 15 },
    say: 'À côté de ma cabane, il y a un petit jardin à l\'ombre. Les cèpes n\'y poussent que là : ni le soleil de ta ferme ni le sel de la mer ne leur conviennent. Quand tu es dans le jardin, ta barre de graines te propose les plantes de la forêt.' },
  { id: 'm_four', ch: 2, npc: 'hugo', t: 'Le four du village', d: 'Construis la Boulangerie (Atelier d\'Hugo)', ev: 'build', k: 'boulangerie', n: 1, r: { xp: 15 },
    say: 'Salut, moi c\'est Hugo, l\'artisan. Commande tes ateliers chez moi, au sud de la place : chacun aura son propre bâtiment. Pour 250 pièces, je t\'installe une boulangerie !' },
  { id: 'm_pain', ch: 2, npc: 'hugo', t: 'Tout chaud !', d: 'Fabrique 3 pains', ev: 'craft', k: 'pain', n: 3, r: { coins: 60, xp: 15 },
    say: 'Un pain, c\'est 3 blés et 1 œuf. Entre dans la boulangerie, lance la fournée, et reviens quand la cheminée a fini de fumer.' },
  { id: 'm_baies', ch: 2, npc: 'sylvain', t: 'Les baies sauvages', d: 'Cueille 8 baies', ev: 'gather', k: 'baie', n: 8, r: { coins: 50, xp: 15 },
    say: 'Les buissons à baies bleues se remplissent à nouveau après quelques minutes. Hugo en fait une confiture délicieuse.' },
  { id: 'm_lapin', ch: 2, npc: 'sylvain', t: 'Un ami aux grandes oreilles', d: 'Adopte un lapin angora (Cabane du forestier)', ev: 'buyAnimal', k: 'lapin', n: 1, r: { coins: 50, xp: 15 },
    say: 'Les lapins angora de la forêt cherchent un foyer. Ils vivent près de ma cabane, mangent des carottes et donnent une laine incroyablement douce. Tu peux les adopter chez moi.' },
  { id: 'm_niv5', ch: 2, npc: 'rose', t: 'Au-delà de la rivière', d: 'Atteins le niveau 5', state: () => S.level, n: 5, r: { coins: 80 },
    say: 'Marin, le vieux pêcheur, vit de l\'autre côté de la rivière. Mais le pont est cassé depuis l\'hiver… Il faudra du bois.' },
  // ---------- Chapitre 4 : La plage du Grand Bleu ----------
  { id: 'm_pont', ch: 3, npc: 'marin', t: 'Réparer le pont', d: 'Répare le pont au sud (20 bois)', ev: 'gate', k: 'pont', n: 1, r: { xp: 20 },
    say: 'Ohé ! (Marin te fait de grands signes depuis l\'autre rive.) Avec 20 bois et de quoi payer les clous, on répare ce pont !' },
  { id: 'm_peche', ch: 3, npc: 'marin', t: 'Ça mord !', d: 'Pêche 5 poissons', ev: 'fish', n: 5, r: { coins: 60, xp: 15 },
    say: 'Bienvenue sur ma plage ! Place-toi face à la mer et appuie sur E. Quand tu vois « ! », appuie tout de suite, sinon il file ! Ma cabane vend une meilleure canne.' },
  { id: 'm_coq', ch: 3, npc: 'marin', t: 'Trésors du sable', d: 'Ramasse 6 coquillages', ev: 'gather', k: 'coquillage', n: 6, r: { coins: 50, xp: 12 },
    say: 'La marée dépose des coquillages sur le sable tous les jours. Les touristes les adorent.' },
  { id: 'm_melon', ch: 3, npc: 'marin', t: 'Fruits du soleil', d: 'Récolte 3 melons au jardin de la plage', ev: 'harvest', k: 'melon', n: 3, r: { coins: 70, xp: 18 },
    say: 'Le sable chaud de la plage est parfait pour les melons et la vanille. Mon petit jardin est à l\'ouest de la cabane du port : sers-toi !' },
  { id: 'm_vache', ch: 3, npc: 'rose', t: 'Meuh !', d: 'Achète une vache', ev: 'buyAnimal', k: 'vache', n: 1, r: { coins: 50, xp: 15 },
    say: 'Une ferme sans vache, ce n\'est pas tout à fait une ferme. Elles mangent du maïs.' },
  { id: 'm_cuisine', ch: 3, npc: 'hugo', t: 'La cuisine du port', d: 'Construis la Cuisine du port (sur la plage)', ev: 'build', k: 'cuisine', n: 1, r: { xp: 20 },
    say: 'Avec le poisson de Marin et tes légumes, on pourrait faire une soupe mémorable. Commande-la à mon atelier : je la bâtirai sur la plage, à côté de la cabane du port.' },
  { id: 'm_soupe', ch: 3, npc: 'hugo', t: 'Soupe du pêcheur', d: 'Fabrique 2 soupes de poisson', ev: 'craft', k: 'soupe', n: 2, r: { coins: 120, xp: 20 },
    say: '2 poissons, 1 tomate, 1 carotte. Et le secret : une soupe se mange aussi ! Elle te porte chance pendant quelques minutes.' },
  { id: 'm_felix', ch: 3, npc: 'rose', t: 'Un coursier pour le bourg', d: 'Embauche Félix, le livreur (Mairie)', ev: 'hire', k: 'felix', n: 1, r: { coins: 80, xp: 15 },
    say: 'Tu as tellement de commandes que tu passes ta vie au tableau ! Félix, mon neveu, cherche du travail : il livrera les commandes à ta place dès que ton sac contient ce qu\'il faut.' },
  { id: 'm_niv8', ch: 3, npc: 'rose', t: 'Vers les sommets', d: 'Atteins le niveau 8', state: () => S.level, n: 8, r: { coins: 150 },
    say: 'Agathe, la mineuse, est coincée à l\'est depuis qu\'un éboulement a bloqué la route des montagnes.' },
  // ---------- Chapitre 5 : Les Monts Givrés ----------
  { id: 'm_ebou', ch: 4, npc: 'agathe', t: 'L\'éboulement', d: 'Dégage la route des Monts Givrés (à l\'est du village)', ev: 'gate', k: 'mont', n: 1, r: { xp: 25 },
    say: 'Hé, là-bas ! Il faut 30 bois pour étayer la route et 600 pièces pour les ouvriers. On compte sur toi !' },
  { id: 'm_mine', ch: 4, npc: 'agathe', t: 'Dans les profondeurs', d: 'Entre dans la mine (grotte des Monts Givrés)', ev: 'enterMine', n: 1, r: { coins: 50, xp: 15 },
    say: 'Merci, tu m\'as sauvée ! Je suis Agathe. La vraie richesse est sous nos pieds : entre dans la grotte au nord. Il fait noir, mais des torches éclairent les galeries.' },
  { id: 'm_pierre', ch: 4, npc: 'agathe', t: 'À la pioche', d: 'Extrais 15 pierres', ev: 'gather', k: 'pierre', n: 15, r: { coins: 100, xp: 20 },
    say: 'Frappe les rochers plusieurs fois pour les casser. La pierre sert à construire les plus beaux ateliers.' },
  { id: 'm_fer', ch: 4, npc: 'agathe', t: 'Le filon', d: 'Trouve 5 minerais de fer', ev: 'gather', k: 'fer', n: 5, r: { coins: 120, xp: 20 },
    say: 'Les rochers tachés d\'orange contiennent du fer. Avec, tu pourras améliorer ton arrosoir et tes machines.' },
  { id: 'm_renard', ch: 4, npc: 'agathe', t: 'Le renard des neiges', d: 'Adopte un renard des neiges (Cabane d\'Agathe)', ev: 'buyAnimal', k: 'renard', n: 1, r: { coins: 100, xp: 20 },
    say: 'Un renard blanc rôde autour de ma cabane, il a l\'air seul. Si tu le nourris de poisson, il restera… et à chaque mue, il te laissera sa fourrure. Lucie en fera des merveilles.' },
  { id: 'm_forge', ch: 4, npc: 'hugo', t: 'La forge', d: 'Construis la Forge (dans la montagne)', ev: 'build', k: 'forge', n: 1, r: { xp: 25 },
    say: 'Une forge ! Il me faut 25 pierres et 1200 pièces. Je la construirai près de la mine. Avec les minerais d\'Agathe, on forgera des bijoux… et pas que pour faire joli !' },
  { id: 'm_cristal', ch: 4, npc: 'agathe', t: 'Éclat bleu', d: 'Trouve 1 cristal dans la mine', ev: 'gather', k: 'cristal', n: 1, r: { coins: 150, xp: 25 },
    say: 'Les cristaux poussent dans les galeries de la mine. Ils sont durs comme tout : il faut beaucoup de coups (une meilleure pioche aide !).' },
  { id: 'm_rubis', ch: 4, npc: 'agathe', t: 'Cœur de pierre', d: 'Trouve 1 rubis au fond de la mine', ev: 'gather', k: 'rubis', n: 1, r: { coins: 150, xp: 25 },
    say: 'Tout au fond de la mine, dans les galeries du nord, on trouve parfois des rubis et des émeraudes. Ce sont les pierres des bijoux magiques.' },
  { id: 'm_bague', ch: 4, npc: 'hugo', t: 'L\'anneau du coureur', d: 'Forge une Bague d\'agilité', ev: 'craft', k: 'bague', n: 1, r: { coins: 100, xp: 30 },
    say: 'Un rubis, une pépite d\'or, et je t\'apprends à forger une Bague d\'agilité. Portée au doigt, elle te fait marcher plus vite. Les bijoux équipés donnent tous un pouvoir !' },
  { id: 'm_equip', ch: 4, npc: 'hugo', t: 'Paré pour l\'aventure', d: 'Équipe un bijou (fenêtre Personnage, touche K)', ev: 'equip', n: 1, r: { coins: 80, xp: 15 },
    say: 'Une bague, ça ne sert à rien au fond d\'un sac ! Ouvre ta fenêtre Personnage et équipe-la. Tu as deux emplacements… et on dit qu\'un troisième s\'ouvre aux plus grands aventuriers.' },
  { id: 'm_bijou', ch: 4, npc: 'hugo', t: 'Un bijou pour la fête', d: 'Fabrique 1 bijou de fête', ev: 'craft', k: 'bijou', n: 1, r: { coins: 200, xp: 30 },
    say: 'Pour la fête de la vallée, Rose voudrait un bijou de fête. 1 cristal et 2 fers, et je m\'occupe du reste.' },
  // ---------- Épilogue : La fête de la vallée ----------
  { id: 'm_cmd10', ch: 5, npc: 'rose', t: 'Le cœur du village', d: 'Livre 10 commandes', ev: 'deliver', n: 10, r: { coins: 300, xp: 40 },
    say: 'La fête de la vallée approche ! Tout le monde a besoin de toi. Réponds à 10 commandes (Félix peut t\'aider) et ce sera la plus belle fête depuis des années.' },
  { id: 'm_livre', ch: 5, npc: 'rose', t: 'Une vie bien remplie', d: 'Débloque 12 objectifs du Livre des objectifs', state: () => Object.keys(S.ach || {}).length, n: 12, r: { coins: 400, xp: 40 },
    say: 'Émile tenait un carnet de tout ce qu\'il avait accompli. Remplis ton propre Livre des objectifs : je veux pouvoir raconter tes exploits pendant la fête !' },
  { id: 'm_niv10', ch: 5, npc: 'rose', t: 'Légende de la vallée', d: 'Atteins le niveau 10', state: () => S.level, n: 10, r: { coins: 1000 },
    say: 'Tout le village parle de toi, {name}. Émile avait raison : cette ferme avait juste besoin de quelqu\'un qui y croie.' },
];
const STORY_END = 'Merci pour tout, {name}. La ferme des {farm} est la plus belle de la vallée. Bourg-Joli te doit tant ! (Tu as terminé l\'histoire. Le Livre des objectifs t\'attend encore, et la vallée reste ouverte.)';
// Ordre des anciennes versions (pour reprendre une ancienne partie au bon endroit)
const OLD_STORY_IDS = ['m_ble', 'm_eau', 'm_moisson', 'm_marche', 'm_carotte', 'm_service', 'm_niv2', 'm_poule', 'm_repas', 'm_oeufs', 'm_champ', 'm_niv3',
  'm_nord', 'm_bois', 'm_champi', 'm_four', 'm_pain', 'm_baies', 'm_niv5', 'm_pont', 'm_peche', 'm_coq', 'm_vache', 'm_cuisine', 'm_soupe', 'm_niv8',
  'm_ebou', 'm_mine', 'm_pierre', 'm_fer', 'm_forge', 'm_cristal', 'm_bijou', 'm_cmd10', 'm_niv10'];

// ============================================================
//  CONSTRUCTION DE LA CARTE
// ============================================================
const map = [];
const NODES = [];          // ressources à récolter
const nodeGrid = [];       // index rapide
function buildMap() {
  for (let y = 0; y < MH; y++) { map.push(new Array(MW).fill(T.GRASS)); nodeGrid.push(new Array(MW).fill(null)); }
  const set = (x, y, t) => { if (x >= 0 && y >= 0 && x < MW && y < MH) map[y][x] = t; };
  const get = (x, y) => (x >= 0 && y >= 0 && x < MW && y < MH) ? map[y][x] : T.CLIFF;
  const rect = (x0, y0, x1, y1, t) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) set(x, y, t); };

  // Montagne : neige (même type « sol », le biome donne l'apparence)
  // Falaises
  rect(61, 0, 62, MH - 1, T.CLIFF); rect(78, 0, 99, MH - 1, T.CLIFF); rect(63, 0, 77, 0, T.CLIFF); rect(63, MH - 1, 77, MH - 1, T.CLIFF);
  // Rivière + mer
  rect(0, 45, 60, 46, T.WATER);
  rect(0, 55, 60, MH - 1, T.WATER);
  for (let x = 0; x <= 60; x++) { const h = hash(x, 99) % 3; if (h === 0) set(x, 54, T.WATER); }
  // Lisière forêt
  rect(0, 18, 60, 19, T.TREE);
  // Bords
  rect(0, 0, 60, 0, T.TREE); rect(0, 0, 0, 54, T.TREE);

  // ----- Chemins -----
  rect(2, 30, 60, 30, T.PATH);                       // grande route
  rect(9, 25, 9, 29, T.PATH);                        // maison
  rect(18, 28, 19, 29, T.PATH);                      // champ
  rect(22, 18, 23, 29, T.PATH);                      // vers la forêt
  rect(33, 27, 33, 29, T.PATH);                      // étang
  rect(14, 37, 20, 37, T.PATH); rect(20, 31, 20, 37, T.PATH); // enclos
  rect(30, 31, 31, 44, T.PATH);                      // vers le pont
  // Forêt
  rect(22, 8, 23, 17, T.PATH); rect(6, 8, 54, 8, T.PATH); rect(12, 3, 12, 8, T.PATH); rect(44, 8, 44, 15, T.PATH); rect(36, 15, 52, 15, T.PATH);
  // Plage
  rect(30, 47, 31, 53, T.PATH); rect(8, 52, 41, 52, T.PATH);
  // Village : place pavée
  rect(44, 27, 59, 35, T.STONE); rect(51, 25, 51, 26, T.STONE); rect(50, 36, 50, 37, T.STONE); rect(46, 36, 46, 40, T.STONE); rect(55, 36, 55, 41, T.STONE);
  rect(42, 30, 43, 30, T.STONE);
  rect(59, 30, 60, 31, T.STONE);
  // Montagne
  rect(61, 30, 62, 31, T.STONE); rect(63, 30, 71, 31, T.STONE); rect(70, 11, 71, 45, T.STONE); rect(64, 20, 76, 20, T.STONE); rect(64, 40, 76, 40, T.STONE); rect(68, 10, 71, 10, T.STONE); rect(72, 14, 76, 14, T.STONE);
  rect(42, 41, 60, 41, T.STONE); rect(22, 51, 26, 51, T.PATH);
  const MR = rng(77);
  for (let y = 3; y <= 44; y++) for (let x = 82; x <= 97; x++) if (MR() > .16) set(x, y, T.STONE);
  rect(89, 3, 90, 45, T.STONE);
  for (const yy of [8, 15, 22, 29, 36, 42]) rect(83, yy, 96, yy, T.STONE);
  rect(84, 3, 95, 5, T.STONE);

  // ----- Ferme -----
  for (let y = FIELD.y; y < FIELD.y + FIELD.h; y++) for (let x = FIELD.x; x < FIELD.x + FIELD.w; x++) set(x, y, T.PLOT);
  for (let x = FIELD.x - 1; x <= FIELD.x + FIELD.w; x++) { set(x, FIELD.y - 1, T.FENCE); if (x !== 18 && x !== 19) set(x, FIELD.y + FIELD.h, T.FENCE); }
  for (let y = FIELD.y - 1; y <= FIELD.y + FIELD.h; y++) { set(FIELD.x - 1, y, T.FENCE); set(FIELD.x + FIELD.w, y, T.FENCE); }
  for (let y = 0; y < MH; y++) for (let x = 26; x < 41; x++) {
    const d = ((x + .5 - 33.5) / 3.8) ** 2 + ((y + .5 - 24) / 2.3) ** 2;
    if (d < 1) set(x, y, T.WATER); else if (d < 1.6 && get(x, y) === T.GRASS) set(x, y, T.SAND);
  }
  for (let x = PEN.x; x < PEN.x + PEN.w; x++) { set(x, PEN.y, T.FENCE); set(x, PEN.y + PEN.h - 1, T.FENCE); }
  for (let y = PEN.y; y < PEN.y + PEN.h; y++) { set(PEN.x, y, T.FENCE); if (y !== 37 && y !== 38) set(PEN.x + PEN.w - 1, y, T.FENCE); }
  set(PEN.x + PEN.w - 1, 37, T.PATH);
  // Ponton
  rect(40, 53, 41, 58, T.PIER);
  // Plage : sable
  for (let y = 47; y <= 54; y++) for (let x = 1; x <= 60; x++) if (get(x, y) === T.GRASS) set(x, y, T.SAND);

  // Jardins de biome
  for (const [b, g] of Object.entries(GARDENS)) {
    const ft = b === 'montagne' ? T.WALL : T.FENCE;
    for (let x = g.x - 1; x <= g.x + g.w; x++) { set(x, g.y - 1, ft); set(x, g.y + g.h, ft); }
    for (let y = g.y - 1; y <= g.y + g.h; y++) { set(g.x - 1, y, ft); set(g.x + g.w, y, ft); }
    for (let y = g.y; y < g.y + g.h; y++) for (let x = g.x; x < g.x + g.w; x++) set(x, y, T.PLOT);
    const gy = g.gate === 'top' ? g.y - 1 : g.y + g.h, gt = b === 'montagne' ? T.STONE : T.PATH;
    set(g.x + 1, gy, gt); set(g.x + 2, gy, gt);
  }
  rect(33, 9, 34, 9, T.PATH);
  // ----- Zones réservées (pas de décor) -----
  const reserved = new Set();
  const reserve = (x0, y0, x1, y1) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) reserved.add(x + ',' + y); };
  BUILDINGS.forEach(b => reserve(b.x - 1, b.y - 1, b.x + b.w, b.y + b.h + 1));
  reserve(FIELD.x - 2, FIELD.y - 2, FIELD.x + FIELD.w + 1, FIELD.y + FIELD.h + 2);
  reserve(PEN.x - 1, PEN.y - 1, PEN.x + PEN.w, PEN.y + PEN.h);
  reserve(42, 25, 61, 44); reserve(26, 20, 41, 28);
  for (const g of Object.values(GARDENS)) reserve(g.x - 2, g.y - 2, g.x + g.w + 1, g.y + g.h + 1);
  reserve(37, 9, 44, 14); reserve(72, 21, 77, 28);
  for (const g of Object.values(GATES)) reserve(g.x - 2, g.y - 2, g.x + g.w + 1, g.y + g.h + 1);
  // distance au chemin
  const nearPath = (x, y, r) => { for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) { const t = get(x + dx, y + dy); if (t === T.PATH || t === T.STONE || t === T.PIER || t === T.PLOT) return true; } return false; };

  const R = rng(2024);
  const decorable = t => t === T.GRASS || t === T.SAND;
  for (let y = 1; y < MH - 1; y++) for (let x = 1; x < MW - 1; x++) {
    const t = get(x, y), b = biomeAt(x, y);
    if (!decorable(t) || reserved.has(x + ',' + y)) continue;
    const v = R();
    if (b === 'foret') {
      if (!nearPath(x, y, 2)) { if (v < .42) set(x, y, T.TREE); else if (v < .48) set(x, y, T.BUSH); else if (v < .58) set(x, y, T.TALL); else if (v < .66) set(x, y, T.FLOWER); }
      else if (!nearPath(x, y, 1)) { if (v < .1) set(x, y, T.TALL); else if (v < .16) set(x, y, T.FLOWER); }
    } else if (b === 'montagne') {
      if (!nearPath(x, y, 2)) { if (v < .16) set(x, y, T.PINE); else if (v < .21) set(x, y, T.ROCK); }
    } else if (b === 'plage') {
      if (t === T.SAND && !nearPath(x, y, 1) && y < 53) { if (v < .05) set(x, y, T.PALM); }
    } else {
      if (nearPath(x, y, 1)) { if (v < .06) set(x, y, T.FLOWER); else if (v < .1) set(x, y, T.TALL); continue; }
      if (v < .07) set(x, y, T.TREE); else if (v < .09) set(x, y, T.BUSH); else if (v < .17) set(x, y, T.FLOWER); else if (v < .27) set(x, y, T.TALL);
    }
  }
  // Barrières : tuiles « fermées »
  for (const [id, g] of Object.entries(GATES)) for (let y = g.y; y < g.y + g.h; y++) for (let x = g.x; x < g.x + g.w; x++) set(x, y, id === 'pont' ? T.WATER : id === 'foret' ? T.PATH : T.STONE);

  // ----- Ressources -----
  const addNodes = (kind, n, test, seed) => {
    const r = rng(seed); let tries = 0, made = 0;
    while (made < n && tries++ < 5000) {
      const x = 2 + (r() * (MW - 4) | 0), y = 2 + (r() * (MH - 4) | 0);
      if (!test(x, y) || nodeGrid[y][x] || reserved.has(x + ',' + y)) continue;
      const near = NODES.some(o => Math.abs(o.x - x) + Math.abs(o.y - y) < 3);
      if (near) continue;
      const node = { id: NODES.length, kind, x, y };
      NODES.push(node); nodeGrid[y][x] = node; made++;
    }
  };
  const forestFree = (x, y) => biomeAt(x, y) === 'foret' && y >= 2 && y <= 16 && [T.GRASS, T.TALL, T.FLOWER].includes(get(x, y)) && nearPath(x, y, 2) && !nearPath(x, y, 0);
  addNodes('branche', 14, forestFree, 11);
  addNodes('champi', 12, forestFree, 12);
  addNodes('baie', 8, forestFree, 13);
  addNodes('coquillage', 12, (x, y) => biomeAt(x, y) === 'plage' && get(x, y) === T.SAND && y >= 49, 14);
  const mountFree = (x, y) => biomeAt(x, y) === 'montagne' && get(x, y) === T.GRASS && nearPath(x, y, 2) && !nearPath(x, y, 0) && y > 2 && y < 57;
  addNodes('iron', 6, mountFree, 16);
  addNodes('rock', 14, mountFree, 17);
  const mineFree = (x, y) => biomeAt(x, y) === 'mine' && get(x, y) === T.STONE && x !== 89 && x !== 90 && ![8, 15, 22, 29, 36, 42].includes(y) && y > 3 && y < 44;
  addNodes('crystal', 8, (x, y) => mineFree(x, y) && y < 30, 18);
  addNodes('gold', 6, (x, y) => mineFree(x, y) && y < 22, 19);
  addNodes('rubis', 4, (x, y) => mineFree(x, y) && y < 14, 22);
  addNodes('emeraude', 4, (x, y) => mineFree(x, y) && y < 14, 23);
  addNodes('iron', 12, mineFree, 20);
  addNodes('rock', 12, mineFree, 21);
}
buildMap();
const NODE_INFO = {
  branche:    { label: 'Ramasser du bois', item: 'bois', qty: [1, 2], respawn: 180, xp: 1, solid: false },
  champi:     { label: 'Cueillir le champignon', item: 'champi', qty: [1, 1], respawn: 240, xp: 1, solid: false },
  baie:       { label: 'Cueillir des baies', item: 'baie', qty: [2, 3], respawn: 300, xp: 1, solid: true, keep: true },
  coquillage: { label: 'Ramasser le coquillage', item: 'coquillage', qty: [1, 1], respawn: 200, xp: 1, solid: false },
  rock:       { label: 'Casser le rocher', item: 'pierre', qty: [2, 3], respawn: 300, xp: 2, solid: true, hp: 3 },
  iron:       { label: 'Casser le rocher (fer)', item: 'fer', qty: [1, 2], extra: 'pierre', respawn: 360, xp: 3, solid: true, hp: 4 },
  crystal:    { label: 'Casser le rocher (cristal)', item: 'cristal', qty: [1, 1], extra: 'pierre', respawn: 600, xp: 5, solid: true, hp: 6 },
  gold:       { label: 'Casser le rocher (or)', item: 'or', qty: [1, 1], extra: 'pierre', respawn: 720, xp: 6, solid: true, hp: 7 },
  rubis:      { label: 'Casser le rocher (rubis)', item: 'rubis', qty: [1, 1], extra: 'pierre', respawn: 900, xp: 7, solid: true, hp: 8 },
  emeraude:   { label: 'Casser le rocher (émeraude)', item: 'emeraude', qty: [1, 1], extra: 'pierre', respawn: 900, xp: 7, solid: true, hp: 8 },
};

// ============================================================
//  AUTOMATISATION : machines (achat unique, améliorables)
// ============================================================
const MACHINES = {
  arroseur:     { name: 'Arroseur automatique', icon: '💦', lvl: 3, multi: 6, desc: 'Arrose instantanément une rangée du champ (8 parcelles). Un arroseur par rangée, en partant de l\'entrée.',
                  cost: i => ({ coins: Math.round(150 * (1 + i * .6)), bois: 5 + i * 3 }) },
  semoir:       { name: 'Semoir automatique', icon: '🌱', lvl: 4, desc: 'Plante les parcelles vides selon le plan du champ (graine payée automatiquement).',
                  cost: () => ({ coins: 600, bois: 25 }), periods: [3, 1.8, .9], ups: [{ coins: 900, fer: 5 }, { coins: 2200, fer: 10, cristal: 2 }], unit: 'parcelle' },
  moissonneuse: { name: 'Moissonneuse', icon: '🚜', lvl: 6, desc: 'Récolte toute seule les cultures mûres.',
                  cost: () => ({ coins: 1400, bois: 40 }), periods: [4, 2.5, 1.2], ups: [{ coins: 1500, fer: 8 }, { coins: 3200, fer: 15, cristal: 3 }], unit: 'récolte' },
  mangeoire:    { name: 'Mangeoire automatique', icon: '🥣', lvl: 5, desc: 'Nourrit les animaux affamés en piochant dans ton stock.',
                  cost: () => ({ coins: 500, bois: 15 }), periods: [6, 3.5, 1.8], ups: [{ coins: 800, fer: 5 }, { coins: 1800, fer: 10, or: 1 }], unit: 'repas' },
  collecteur:   { name: 'Collecteur', icon: '🧺', lvl: 6, desc: 'Ramasse tout seul œufs, lait, laine et truffes.',
                  cost: () => ({ coins: 800, bois: 20 }), periods: [6, 3.5, 1.8], ups: [{ coins: 1000, fer: 6 }, { coins: 2000, fer: 10, or: 1 }], unit: 'produit' },
  chaine:       { name: 'Chaîne d\'atelier', icon: '⚙️', lvl: 8, desc: 'Récupère les produits de tous les ateliers et relance la dernière recette si tu as les ingrédients.',
                  cost: () => ({ coins: 2000, fer: 10, pierre: 20 }), periods: [8, 5, 2.5], ups: [{ coins: 2500, fer: 15 }, { coins: 4000, or: 3, cristal: 3 }], unit: 'passage' },
};
const MACHINE_SPOTS = { moissonneuse: [24.5, 26], semoir: [24.5, 23.6], mangeoire: [11.5, 36], collecteur: [12.5, 34.4] };

// ============================================================
//  EMPLOYÉS (salaire, expérience, promotions)
// ============================================================
const MAX_STAFF_LVL = 5;
const staffSpeed = L => 1 + .4 * (L - 1);                  // ×1 à ×2,6
const staffWage = (W, L) => Math.round(W.wage * (1 + .45 * (L - 1)));
const staffXpNeed = L => 25 * L;                           // tâches pour pouvoir être promu
const promoteCost = (W, L) => Math.round(W.hire * .8 * L);
const P_ = (skin, hair, head, hatC, hatD, shirt, shirtD, low, pants, pantsD, extra = {}) => ({ skin, skinD: '#c98e62', hair, head, hatC, hatD, shirt, shirtD, low, pants, pantsD, boot: '#2a1d14', ...extra });
const WORKERS = {
  // Ferme (mairie)
  paul:    { home: 'mairie', name: 'Paul', role: 'Jardinier', icon: '💧', lvl: 2, hire: 150, wage: 25, zone: 'field',
             desc: 'Arrose toutes les parcelles du champ.', pal: P_('#e8b48a', '#3a2a1a', 'cap', '#2e7d32', '#1f5e23', '#7cb342', '#5d8f2f', 'overalls', '#5a4630', '#463624'),
             lines: ['Je m\'occupe de l\'arrosage, patron !', 'Plus j\'ai d\'expérience, plus je vais vite.', 'Un champ bien arrosé, c\'est un champ heureux.'] },
  lea:     { home: 'mairie', name: 'Léa', role: 'Moissonneuse', icon: '🌾', lvl: 4, hire: 400, wage: 60, zone: 'field',
             desc: 'Récolte les cultures mûres et replante selon le plan du champ.', pal: P_('#f5cfa8', '#e0b040', 'long', null, null, '#3d7fd6', '#2c5fa8', 'pants', '#5a4630', '#463624'),
             lines: ['Je récolte et je replante selon ton plan du champ.', 'Les graines sont payées avec la caisse de la ferme.', 'Une promotion ? Je travaillerais encore plus vite !'] },
  tom:     { home: 'mairie', name: 'Tom', role: 'Soigneur', icon: '🐔', lvl: 5, hire: 450, wage: 55, zone: 'pen',
             desc: 'Nourrit les animaux (avec ton stock) et ramasse leurs produits.', pal: P_('#c98e62', '#2b1d10', 'beanie', '#c0392b', '#962d22', '#f2c94c', '#d4a82c', 'overalls', '#3b6fb6', '#2c548f'),
             lines: ['Les bêtes vont bien, chef !', 'Garde du blé et du maïs en stock, sinon je ne peux pas les nourrir.', 'Les poules m\'adorent.'] },
  nina:    { home: 'mairie', name: 'Nina', role: 'Apprentie artisane', icon: '🏭', lvl: 6, hire: 700, wage: 80, zone: 'workshop', period: 5,
             desc: 'Fait le tour des ateliers : récupère les produits et relance la dernière recette.', pal: P_('#f0c4a0', '#2b1d10', 'bun', null, null, '#e6e2d8', '#c4bfb2', 'dress', '#8a5a2c', '#6e4520'),
             lines: ['Hugo m\'apprend tout ce qu\'il sait !', 'Je relance la dernière recette de chaque atelier si les ingrédients sont dans ton sac.', 'Ça sent bon le pain chaud ici.'] },
  // Jardiniers de biome
  mila:    { home: 'cabin', name: 'Mila', role: 'Jardinière des sous-bois', icon: '🍄', lvl: 4, hire: 350, wage: 40, zone: 'g_foret', need: 'foret',
             desc: 'Arrose, récolte et replante le jardin de la forêt.', pal: P_('#f0c4a0', '#5a3a1a', 'beanie', '#6c3483', '#4a235a', '#7cb342', '#5d8f2f', 'overalls', '#7a4a24', '#5a3518'),
             lines: ['Les cèpes aiment l\'ombre et l\'humidité.', 'Je replante toujours la même chose. Pour changer, plante toi-même une parcelle vide !', 'Ce jardin sent bon la mousse.'] },
  noe:     { home: 'hut', name: 'Noé', role: 'Jardinier de la plage', icon: '🍈', lvl: 5, hire: 450, wage: 50, zone: 'g_plage', need: 'pont',
             desc: 'Arrose, récolte et replante le jardin de la plage.', pal: P_('#c98e62', '#1e1610', 'straw', '#e8c35a', '#c9a23a', '#5fa3c8', '#4a8ab0', 'pants', '#e6cf8f', '#c9b070', { hatL: '#f7e3a0', band: '#2c6fb6' }),
             lines: ['Le soleil, le sable, les melons… le paradis !', 'La vanille, c\'est long à pousser, mais ça vaut de l\'or.', 'Attention aux crabes !'] },
  olga:    { home: 'minehut', name: 'Olga', role: 'Jardinière des neiges', icon: '🌿', lvl: 8, hire: 700, wage: 70, zone: 'g_montagne', need: 'mont',
             desc: 'Arrose, récolte et replante le jardin des neiges.', pal: P_('#f5cfa8', '#e8e8e8', 'beanie', '#c0392b', '#962d22', '#3d7fd6', '#2c5fa8', 'pants', '#3a3a44', '#2a2a33'),
             lines: ['Le houx adore le froid.', 'Un edelweiss, c\'est rare et précieux. Je les bichonne.', 'Brrr… heureusement que le muret coupe le vent.'] },
  felix:   { home: 'mairie', name: 'Félix', role: 'Livreur', icon: '📦', lvl: 6, hire: 500, wage: 50, zone: 'village', period: 20,
             desc: 'Livre tout seul une commande du tableau dès que ton sac contient ce qu\'il faut.', pal: P_('#e8b48a', '#c0602a', 'cap', '#f39c12', '#c27c0e', '#2c6fb6', '#1f4e8c', 'pants', '#5a4630', '#463624'),
             lines: ['Une commande prête ? Je file la livrer !', 'Je connais tout le monde au bourg.', 'Plus je livre, plus je vais vite.'] },
  // Forêt (cabane de Sylvain)
  gaspard: { home: 'cabin', name: 'Gaspard', role: 'Bûcheron', icon: '🪵', lvl: 3, hire: 350, wage: 45, zone: 'forest', need: 'foret', period: 30, prod: [['bois', 1]],
             desc: 'Coupe du bois mort en forêt.', pal: P_('#e8b48a', '#8a3a1a', 'beanie', '#a83232', '#7e2626', '#c0392b', '#962d22', 'pants', '#3a3a44', '#2a2a33', { beard: true }),
             lines: ['Hop, encore un tronc !', 'Je ne coupe que le bois mort, Sylvain y tient.', 'Mon bois arrive directement dans ton sac.'] },
  celine:  { home: 'cabin', name: 'Céline', role: 'Cueilleuse', icon: '🍄', lvl: 4, hire: 400, wage: 50, zone: 'forest', need: 'foret', period: 40, prod: [['champi', .55], ['baie', .45]],
             desc: 'Cueille champignons et baies sauvages.', pal: P_('#f5cfa8', '#5a3a1a', 'long', null, null, '#8e44ad', '#6c3483', 'pants', '#3f5a2a', '#2f4620'),
             lines: ['Je connais tous les coins à champignons !', 'Les baies sont meilleures le matin.', 'Chut… la forêt murmure.'] },
  // Plage (cabane du port)
  yann:    { home: 'hut', name: 'Yann', role: 'Pêcheur', icon: '🎣', lvl: 5, hire: 500, wage: 60, zone: 'beach', need: 'pont', period: 35, prod: [['poisson', .78], ['saumon', .22]],
             desc: 'Pêche au bout du ponton (saumons compris).', pal: P_('#d79a6c', '#3a2a1a', 'cap', '#c0392b', '#962d22', '#2c6fb6', '#1f4e8c', 'pants', '#e6cf8f', '#c9b070'),
             lines: ['La mer est généreuse aujourd\'hui.', 'Marin m\'a tout appris.', 'Un saumon ! Enfin… presque.'] },
  lou:     { home: 'hut', name: 'Lou', role: 'Ramasseuse', icon: '🐚', lvl: 5, hire: 350, wage: 40, zone: 'beach', need: 'pont', period: 30, prod: [['coquillage', 1]],
             desc: 'Ramasse les coquillages sur la plage.', pal: P_('#f0c4a0', '#f2c94c', 'long', null, null, '#ff8fb1', '#e06a90', 'dress', '#5fa3c8', '#4a8ab0'),
             lines: ['Regarde celui-là, il est tout rose !', 'Chaque marée apporte des trésors.', 'J\'adore le bruit des vagues.'] },
  // Mine (cabane d'Agathe)
  bruno:   { home: 'minehut', name: 'Bruno', role: 'Mineur', icon: '⛏️', lvl: 8, hire: 900, wage: 90, zone: 'mine', need: 'mont', period: 30, prod: [['pierre', .65], ['fer', .35]],
             desc: 'Extrait pierre et fer dans la mine.', pal: P_('#c98e62', '#2b1d10', 'helmet', '#f1c40f', '#c9a20c', '#7f8c8d', '#5f6c6d', 'overalls', '#3b4f6b', '#2c3b50', { beard: true }),
             lines: ['Il fait noir mais j\'ai ma lampe !', 'Le fer, c\'est la base de tout.', 'Attention aux chutes de pierres !'] },
  iris:    { home: 'minehut', name: 'Iris', role: 'Prospectrice', icon: '💎', lvl: 9, hire: 1500, wage: 140, zone: 'mine', need: 'mont', period: 70, prod: [['cristal', .6], ['or', .4]],
             desc: 'Cherche cristaux et pépites d\'or au fond de la mine.', pal: P_('#f0c4a0', '#c0602a', 'helmet', '#e67e22', '#c0601a', '#5fa3c8', '#4a8ab0', 'pants', '#3a3a44', '#2a2a33'),
             lines: ['J\'ai le flair pour les filons.', 'Un cristal bleu… magnifique.', 'L\'or se cache tout au fond.'] },
};
const HOMES = {
  mairie:  { name: 'Mairie — bureau d\'embauche', icon: '🏛️', npc: 'rose' },
  cabin:   { name: 'Cabane du forestier', icon: '🌲', npc: 'sylvain', tool: 'hache', garden: 'foret' },
  hut:     { name: 'Cabane du port', icon: '⚓', npc: 'marin', tool: 'canne', garden: 'plage' },
  minehut: { name: 'Cabane d\'Agathe', icon: '⛏️', npc: 'agathe', tool: 'pioche', garden: 'montagne' },
};
const TOOLS = {
  hache:  { name: 'Hache', icon: '🪓', desc: ['Ramassage normal.', '+1 bois par branche.', '+2 bois par branche, champignons doublés.'],
            ups: [{ lvl: 4, coins: 300, bois: 20 }, { lvl: 6, coins: 900, bois: 40, fer: 5 }] },
  canne:  { name: 'Canne à pêche', icon: '🎣', desc: ['Canne de débutant.', 'Ça mord 30 % plus vite, plus de temps pour ferrer, plus de saumons.', 'Ça mord 2× plus vite, beaucoup plus de saumons.'],
            ups: [{ lvl: 5, coins: 400, bois: 15, coquillage: 5 }, { lvl: 7, coins: 1200, fer: 5, poisson: 10 }] },
  pioche: { name: 'Pioche', icon: '⛏️', desc: ['Pioche rouillée.', '1 coup de moins par rocher, +1 minerai parfois.', '2 coups de moins, minerai bonus fréquent.'],
            ups: [{ lvl: 8, coins: 600, pierre: 20, fer: 5 }, { lvl: 9, coins: 1800, fer: 15, cristal: 2 }] },
};
const ZONE_HOME = { g_foret: [33.5, 9.4], g_plage: [8.5, 51.6], g_montagne: [65.5, 20.4], village: [48.5, 40.4], field: [18.5, 29.2], pen: [12, 39], workshop: [52.6, 40.6], forest: [27.5, 8.6], beach: [36, 52.6], mine: [89.5, 30] };

// ============================================================
//  DÉFIS DE NIVEAU
// ============================================================
const LEVEL_QUESTS = {
  1: [['Plante 10 blé', 'plant', 'ble', 10], ['Gagne 50 pièces au marché', 'sell', null, 50], ['Arrose 10 parcelles', 'water', null, 10]],
  2: [['Récolte 10 carottes', 'harvest', 'carotte', 10], ['Récolte 5 tomates', 'harvest', 'tomate', 5], ['Livre 2 commandes', 'deliver', null, 2]],
  3: [['Ramasse 8 œufs', 'collect', 'oeuf', 8], ['Fabrique 3 pains', 'craft', 'pain', 3], ['Ramasse 15 bois', 'gather', 'bois', 15]],
  4: [['Récolte 8 maïs', 'harvest', 'mais', 8], ['Cueille 10 champignons', 'gather', 'champi', 10], ['Fabrique 3 confitures', 'craft', 'confiture', 3]],
  5: [['Pêche 10 poissons', 'fish', null, 10], ['Ramasse 10 coquillages', 'gather', 'coquillage', 10], ['Récolte 8 fraises', 'harvest', 'fraise', 8]],
  6: [['Fabrique 4 fromages', 'craft', 'fromage', 4], ['Fabrique 3 soupes de poisson', 'craft', 'soupe', 3], ['Récolte 6 citrouilles', 'harvest', 'citrouille', 6]],
  7: [['Fabrique 2 tartes', 'craft', 'tarte', 2], ['Ramasse 6 laines', 'collect', 'laine', 6], ['Livre 8 commandes', 'deliver', null, 8]],
  8: [['Extrais 30 pierres', 'gather', 'pierre', 30], ['Trouve 10 minerais de fer', 'gather', 'fer', 10], ['Fabrique 3 pulls', 'craft', 'pull', 3]],
  9: [['Trouve 3 cristaux', 'gather', 'cristal', 3], ['Récolte 5 tournesols', 'harvest', 'tournesol', 5], ['Fabrique 2 bijoux', 'craft', 'bijou', 2]],
  10: [['Trouve 4 pépites d\'or', 'gather', 'or', 4], ['Fabrique 2 gâteaux', 'craft', 'gateau', 2], ['Ramasse 4 truffes', 'collect', 'truffe', 4]],
};
NPCS.find(n => n.id === 'hugo').lines.push('Commande tes ateliers chez moi : chacun aura son propre bâtiment ! Et regarde mes machines.');
NPCS.find(n => n.id === 'rose').lines.push('La mairie embauche pour la ferme. Les cabanes de la forêt, du port et de la mine embauchent pour leur zone.');
NPCS.find(n => n.id === 'sylvain').lines.push('Ma cabane embauche des bûcherons et des cueilleurs. Et je peux affûter ta hache !');
NPCS.find(n => n.id === 'marin').lines.push('Passe à la cabane du port : j\'ai une meilleure canne pour toi, et des gens qui cherchent du travail.');
NPCS.find(n => n.id === 'agathe').lines.push('Ma cabane, à côté de la grotte : pioches et mineurs. La mine, c\'est par la grotte !');

PAL.lucie = { skin: '#f5cfa8', skinD: '#dcae84', hair: '#2b1d10', head: 'flower', shirt: '#ff8fb1', shirtD: '#e06a90', low: 'dress', pants: '#8e44ad', pantsD: '#6c3483', boot: '#5a3a1a' };

// ============================================================
//  BOUTIQUE, BONUS, BIJOUX
// ============================================================
const SHOP = [
  { k: 'cafe', price: 50, lvl: 1 }, { k: 'engrais', price: 60, lvl: 2 }, { k: 'superengrais', price: 220, lvl: 6 },
];
const BUFF_INFO = {
  speed:   { name: 'Vitesse', icon: '👟' }, growth: { name: 'Pousse', icon: '🌱' }, xp: { name: 'Expérience', icon: '⭐' },
  luck:    { name: 'Chance', icon: '🍀' }, machine: { name: 'Machines', icon: '⚙️' },
};
const USES = {   // consommables et plats : effet temporaire
  cafe:         { buff: 'speed', val: 1.6, sec: 180, verb: 'Boire' },
  engrais:      { buff: 'growth', val: 2, sec: 180, verb: 'Utiliser' },
  superengrais: { buff: 'growth', val: 3, sec: 180, verb: 'Utiliser' },
  tarte:        { buff: 'speed', val: 1.3, sec: 240, verb: 'Manger' },
  soupe:        { buff: 'luck', val: .15, sec: 240, verb: 'Manger' },
  ragout:       { buff: 'machine', val: 1.3, sec: 240, verb: 'Manger' },
  gateau:       { buff: 'xp', val: 1.3, sec: 300, verb: 'Manger' },
};
const JEWELS = { bague: { speed: 1.2 }, collier: { machine: 1.25 }, amulette: { luck: .15 }, broche: { xp: 1.15 }, bracelet: { growth: 1.15 } };
const wsSlotCost = W => ({ lvl: 6, coins: Math.round(W.cost * 1.5), bois: 20, pierre: 10 });

// ============================================================
//  MERCERIE (cosmétiques)
// ============================================================
const COSMETICS = {
  hat: {
    straw:   { name: 'Chapeau de paille', price: 0, set: { head: 'straw', hatC: '#e8c35a', hatD: '#c9a23a', hatL: '#f7e3a0', band: '#c0392b' } },
    none:    { name: 'Tête nue', price: 0, set: { head: 'none' } },
    capred:  { name: 'Casquette rouge', price: 80, set: { head: 'cap', hatC: '#c0392b', hatD: '#962d22' } },
    capblue: { name: 'Casquette bleue', price: 80, set: { head: 'cap', hatC: '#2c6fb6', hatD: '#1f4e8c' } },
    beanie:  { name: 'Bonnet vert', price: 120, set: { head: 'beanie', hatC: '#2e7d32', hatD: '#1f5e23' } },
    flower:  { name: 'Couronne de fleurs', price: 250, set: { head: 'flower' } },
    helmet:  { name: 'Casque de mineur', price: 400, lvl: 8, set: { head: 'helmet', hatC: '#f1c40f', hatD: '#c9a20c' } },
    tophat:  { name: 'Haut-de-forme', price: 600, set: { head: 'tophat', hatC: '#2a2a33', hatD: '#1a1a22', band: '#c0392b' } },
    crown:   { name: 'Couronne dorée', ach: 'a_rich100k', set: { head: 'crown' } },
  },
  shirt: {
    red:    { name: 'Chemise rouge', price: 0, set: { shirt: '#d64545', shirtD: '#a83232' } },
    blue:   { name: 'Chemise bleue', price: 60, set: { shirt: '#3d7fd6', shirtD: '#2c5fa8' } },
    green:  { name: 'Chemise verte', price: 60, set: { shirt: '#43a047', shirtD: '#2e7d32' } },
    yellow: { name: 'Chemise jaune', price: 90, set: { shirt: '#f2c94c', shirtD: '#d4a82c' } },
    purple: { name: 'Chemise violette', price: 90, set: { shirt: '#8e44ad', shirtD: '#6c3483' } },
    pink:   { name: 'Chemise rose', price: 120, set: { shirt: '#ff8fb1', shirtD: '#e06a90' } },
    black:  { name: 'Chemise noire', price: 150, set: { shirt: '#3a3a44', shirtD: '#22222a' } },
    white:  { name: 'Chemise blanche', price: 150, set: { shirt: '#f4f4f4', shirtD: '#cfcfcf' } },
  },
  pants: {
    blue:  { name: 'Salopette bleue', price: 0, set: { low: 'overalls', pants: '#3b6fb6', pantsD: '#2c548f' } },
    brown: { name: 'Salopette marron', price: 60, set: { low: 'overalls', pants: '#7a4a24', pantsD: '#5a3518' } },
    green: { name: 'Salopette verte', price: 60, set: { low: 'overalls', pants: '#3f7a2e', pantsD: '#2f5e22' } },
    grey:  { name: 'Pantalon gris', price: 80, set: { low: 'pants', pants: '#5a6068', pantsD: '#454a50' } },
    dress: { name: 'Robe à fleurs', price: 140, set: { low: 'dress', pants: '#ff8fb1', pantsD: '#e06a90' } },
    gold:  { name: 'Salopette dorée', ach: 'a_r2000', set: { low: 'overalls', pants: '#f2c94c', pantsD: '#c99a1c' } },
  },
  hair: {
    brown:  { name: 'Cheveux châtains', price: 0, set: { hair: '#6b3e1f' } },
    blond:  { name: 'Cheveux blonds', price: 50, set: { hair: '#e0b040' } },
    red:    { name: 'Cheveux roux', price: 50, set: { hair: '#c0602a' } },
    black:  { name: 'Cheveux noirs', price: 50, set: { hair: '#1e1610' } },
    grey:   { name: 'Cheveux gris', price: 50, set: { hair: '#b8b8b8' } },
    blue:   { name: 'Cheveux bleus', ach: 'a_style', set: { hair: '#3d7fd6' } },
  },
};
const COS_SLOTS = { hat: '🎩 Chapeau', shirt: '👕 Haut', pants: '👖 Bas', hair: '💇 Cheveux' };

// ============================================================
//  LIVRE DES OBJECTIFS
// ============================================================
const c_ = (ev, k) => () => (S.count[k ? ev + ':' + k : ev] || 0);
const ACHIEVEMENTS = [
  // Cultures
  { id: 'a_r50',    cat: '🌾 Cultures', t: 'Main verte',            d: 'Récolte 50 cultures',               v: c_('harvest'), n: 50,   r: { coins: 100 } },
  { id: 'a_r500',   cat: '🌾 Cultures', t: 'Grand cultivateur',     d: 'Récolte 500 cultures',              v: c_('harvest'), n: 500,  r: { coins: 500 } },
  { id: 'a_r2000',  cat: '🌾 Cultures', t: 'Roi des champs',        d: 'Récolte 2 000 cultures',            v: c_('harvest'), n: 2000, r: { coins: 1500, cos: 'pants.gold' } },
  { id: 'a_citr',   cat: '🌾 Cultures', t: 'Halloween toute l\'année', d: 'Récolte 100 citrouilles',        v: c_('harvest', 'citrouille'), n: 100, r: { coins: 800 } },
  { id: 'a_tourn',  cat: '🌾 Cultures', t: 'Champ de soleil',       d: 'Récolte 50 tournesols',             v: c_('harvest', 'tournesol'), n: 50, r: { coins: 800 } },
  { id: 'a_biome',  cat: '🌾 Cultures', t: 'Botaniste',             d: 'Récolte 10 plantes de chaque jardin de biome (6 espèces)', v: () => Math.min(...Object.keys(CROPS).filter(k => CROPS[k].biome).map(k => Math.min(10, S.count['harvest:' + k] || 0))), n: 10, r: { coins: 1000 } },
  // Animaux
  { id: 'a_oeuf',   cat: '🐔 Animaux', t: 'Poulailler royal',       d: 'Ramasse 100 œufs',                  v: c_('collect', 'oeuf'), n: 100, r: { coins: 300 } },
  { id: 'a_lait',   cat: '🐔 Animaux', t: 'Crème de la crème',      d: 'Ramasse 50 laits',                  v: c_('collect', 'lait'), n: 50, r: { coins: 400 } },
  { id: 'a_angora', cat: '🐔 Animaux', t: 'Doux comme un lapin',    d: 'Ramasse 30 laines angora',          v: c_('collect', 'angora'), n: 30, r: { coins: 500 } },
  { id: 'a_fourr',  cat: '🐔 Animaux', t: 'Ami des renards',        d: 'Ramasse 20 fourrures de mue',       v: c_('collect', 'fourrure'), n: 20, r: { coins: 800 } },
  { id: 'a_zoo',    cat: '🐔 Animaux', t: 'Arche de la vallée',     d: 'Possède au moins un animal de chaque espèce (8)', v: () => new Set(S.animals.map(a => a.type)).size, n: 8, r: { coins: 1200 } },
  // Nature & mine
  { id: 'a_peche',  cat: '🌲 Nature', t: 'Pêcheur du dimanche',     d: 'Pêche 50 poissons',                 v: c_('fish'), n: 50, r: { coins: 300 } },
  { id: 'a_saumon', cat: '🌲 Nature', t: 'Roi du saumon',           d: 'Pêche 25 saumons',                  v: c_('gather', 'saumon'), n: 25, r: { coins: 700 } },
  { id: 'a_bois',   cat: '🌲 Nature', t: 'Bûcheron',                d: 'Ramasse 300 bois',                  v: c_('gather', 'bois'), n: 300, r: { coins: 400 } },
  { id: 'a_pierre', cat: '🌲 Nature', t: 'Casseur de cailloux',     d: 'Extrais 200 pierres',               v: c_('gather', 'pierre'), n: 200, r: { coins: 400 } },
  { id: 'a_fer',    cat: '🌲 Nature', t: 'Filon de fer',            d: 'Trouve 100 minerais de fer',        v: c_('gather', 'fer'), n: 100, r: { coins: 600 } },
  { id: 'a_or',     cat: '🌲 Nature', t: 'Ruée vers l\'or',         d: 'Trouve 15 pépites d\'or',           v: c_('gather', 'or'), n: 15, r: { coins: 900 } },
  { id: 'a_gemmes', cat: '🌲 Nature', t: 'Chasseur de gemmes',      d: 'Trouve 5 rubis et 5 émeraudes',     v: () => Math.min(5, S.count['gather:rubis'] || 0) + Math.min(5, S.count['gather:emeraude'] || 0), n: 10, r: { coins: 1200 } },
  // Artisanat & village
  { id: 'a_craft',  cat: '🏭 Artisanat', t: 'Artisan',              d: 'Fabrique 50 produits',              v: c_('craft'), n: 50, r: { coins: 400 } },
  { id: 'a_gateau', cat: '🏭 Artisanat', t: 'Grand pâtissier',      d: 'Fabrique 10 gâteaux',               v: c_('craft', 'gateau'), n: 10, r: { coins: 700 } },
  { id: 'a_bijoux', cat: '🏭 Artisanat', t: 'Orfèvre',              d: 'Forge les 5 bijoux magiques',       v: () => Object.keys(JEWELS).filter(k => (S.count['craft:' + k] || 0) > 0).length, n: 5, r: { coins: 1500 } },
  { id: 'a_cmd25',  cat: '🏘️ Village', t: 'Ami du village',         d: 'Livre 25 commandes',                v: c_('deliver'), n: 25, r: { coins: 400 } },
  { id: 'a_cmd100', cat: '🏘️ Village', t: 'Héros de Bourg-Joli',    d: 'Livre 100 commandes',               v: c_('deliver'), n: 100, r: { coins: 1500 } },
  { id: 'a_rich10k', cat: '🏘️ Village', t: 'Bas de laine',          d: 'Gagne 10 000 pièces au total',      v: () => S.stats.earned, n: 10000, r: { coins: 300 } },
  { id: 'a_rich100k', cat: '🏘️ Village', t: 'Magnat de la vallée',  d: 'Gagne 100 000 pièces au total',     v: () => S.stats.earned, n: 100000, r: { coins: 2000, cos: 'hat.crown' } },
  { id: 'a_style',  cat: '🏘️ Village', t: 'Fashionista',            d: 'Possède 10 vêtements',              v: () => Object.values(S.cos.owned || {}).length, n: 10, r: { coins: 200, cos: 'hair.blue' } },
  { id: 'a_eat',    cat: '🏘️ Village', t: 'Bon vivant',             d: 'Mange 15 plats',                    v: c_('eat'), n: 15, r: { coins: 300 } },
  { id: 'a_zones',  cat: '🏘️ Village', t: 'Explorateur',            d: 'Visite les 6 zones de la vallée',   v: () => Object.keys(ZONES).filter(z => (S.count['visit:' + z] || 0) > 0).length, n: 6, r: { coins: 400 } },
  // Automatisation
  { id: 'a_auto',   cat: '🤖 Automatisation', t: 'Ferme automatique', d: 'Installe 6 arroseurs, un semoir et une moissonneuse', v: () => Math.min(6, S.machines.arroseur || 0) + (S.machines.semoir ? 1 : 0) + (S.machines.moissonneuse ? 1 : 0), n: 8, r: { coins: 800 } },
  { id: 'a_staff',  cat: '🤖 Automatisation', t: 'Grand patron',     d: 'Emploie 6 personnes en même temps', v: () => Object.keys(S.staff).length, n: 6, r: { coins: 700 } },
  { id: 'a_promo',  cat: '🤖 Automatisation', t: 'Mentor',           d: 'Promeus un employé au niveau 5',    v: () => Math.max(0, ...Object.values(S.staff).map(s => s.lvl || 1)), n: 5, r: { coins: 1000 } },
  // Exploits chronométrés (outils améliorés recommandés)
  { id: 't_fer',    cat: '⚡ Exploits', t: 'Coup de pioche éclair', d: 'Trouve 15 minerais de fer en 20 secondes (pioche niv. 3 conseillée)', timed: ['gather:fer', 20], n: 15, r: { coins: 1000 } },
  { id: 't_bois',   cat: '⚡ Exploits', t: 'Bûcheron express',      d: 'Ramasse 20 bois en 20 secondes (hache niv. 3 conseillée)', timed: ['gather:bois', 20], n: 20, r: { coins: 700 } },
  { id: 't_peche',  cat: '⚡ Exploits', t: 'Pêche miraculeuse',     d: 'Pêche 3 poissons en 30 secondes (canne niv. 3 conseillée)', timed: ['fish', 30], n: 3, r: { coins: 700 } },
  { id: 't_recolte', cat: '⚡ Exploits', t: 'Moisson éclair',       d: 'Récolte 16 cultures toi-même en 15 secondes', timed: ['harvest', 15], n: 16, r: { coins: 600 } },
];
const ACH_SLOT3 = 15;  // objectifs pour débloquer le 3e emplacement de bijou

NPCS.find(n => n.id === 'sylvain').lines.push('Mon jardin peut tourner tout seul : un arroseur, un récolteur, ou Mila, une jardinière que je connais bien.');
