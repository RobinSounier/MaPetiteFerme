// ============================================================
//  SPRITES
// ============================================================
const SPR = {
  crops: {}, icons: {}, npc: {}, portrait: {},
  chicken: [chickenSprite(0), chickenSprite(1)], cow: [cowSprite(0), cowSprite(1)], sheep: [sheepSprite(0), sheepSprite(1)], pig: [pigSprite(0), pigSprite(1)],
  oak: [oakSprite(0), oakSprite(1)], pine: pineSprite(), snowpine: snowPineSprite(), palm: palmSprite(), bush: [bushSprite(false), bushSprite(true)],
  boulder: rockNode('snowrock'), tall: [0, 1, 2, 3].map(tallGrassSprite), soilDry: soilSprite(false), soilWet: soilSprite(true), weeds: [0, 1, 2].map(weedsSprite),
  house: houseSprite(), coop: coopSprite(), market: marketSprite(), workshop: workshopSprite(), board: boardSprite(),
  mairie: mairieSprite(), cottA: cottageSprite('#3b6fb6', '#2c548f', '#f3dfb5'), cottB: cottageSprite('#4f8a3c', '#3f6e30', '#efe2c8'),
  well: wellSprite(), lamp: lampSprite(), cabin: cabinSprite(), hut: hutSprite(), cave: caveSprite(),
  gate: { foret: logGate(), pont: bridgeBroken(), mont: rockslideGate() },
  node: { branche: [branchNode()], champi: [mushroomNode(0), mushroomNode(1)], baie: [berryNode(true)], baieEmpty: berryNode(false),
          coquillage: [shellNode(0), shellNode(1)], rock: [rockNode('rock')], iron: [rockNode('iron')], crystal: [rockNode('crystal')], gold: [rockNode('gold')], rubis: [rockNode('rubis')], emeraude: [rockNode('emeraude')], rubble: rubbleNode() },
  fly: ['#ff8fb1', '#ffd93b', '#9fd3f5', '#c7a6ff'].map(c => [butterflySprite(c, 0), butterflySprite(c, 1)]),
};
const HUMANS = { farmer: PAL.farmer }; NPCS.forEach(n => HUMANS[n.id] = PAL[n.id]); for (const [id, w] of Object.entries(WORKERS)) HUMANS[id] = w.pal;
SPR.sprinkler = [sprinklerSprite(0), sprinklerSprite(1)]; SPR.ladder = ladderSprite(); SPR.torchF = [torchSprite(0), torchSprite(1)]; SPR.torch = SPR.torchF[0]; SPR.site = siteSprite(); SPR.minehut = cottageSprite('#5b5470', '#433d55', '#b9b0a8'); SPR.harvester = harvesterSprite(); SPR.seeder = seederSprite(); SPR.trough = [troughSprite(false), troughSprite(true)]; SPR.basket = basketSprite();
for (const [id, pal] of Object.entries(HUMANS)) {
  SPR.npc[id] = {}; ['down', 'up', 'left', 'right'].forEach(d => SPR.npc[id][d] = [0, 1, 2, 3].map(f => humanSprite(d, f, pal)));
  SPR.portrait[id] = toURL(portraitSprite(pal), 3);
}
Object.keys(CROPS).forEach(k => SPR.crops[k] = [0, 1, 2, 3].map(s => cropSprite(k, s)));
for (const k in ITEMS) SPR.icons[k] = mk(16, 16, ICON_DRAW[k]);
const WS_LOOK = { boulangerie: ['#c0392b', '#962d22', '#f3dfb5', 'pain'], confiturerie: ['#8e44ad', '#6c3483', '#efe2c8', 'confiture'], laiterie: ['#3b6fb6', '#2c548f', '#f8f2e4', 'fromage'],
  tissage: ['#16a085', '#117864', '#efe2c8', 'pull'], patisserie: ['#e67ea2', '#c45c80', '#fff4f0', 'gateau'], cuisine: ['#2c6fb6', '#1f4e8c', '#e6f2fa', 'soupe'], forge: ['#4a4a55', '#33333c', '#b9b0a8', 'bijou'] };
for (const [k, [r, rd, w, it]] of Object.entries(WS_LOOK)) SPR['ws_' + k] = shopSprite(r, rd, w, SPR.icons[it]);
SPR.rabbit = [rabbitSprite(0), rabbitSprite(1)]; SPR.deer = [deerSprite(0), deerSprite(1)]; SPR.fox = [foxSprite(0), foxSprite(1)]; SPR.goat = [goatSprite(0), goatSprite(1)];
['chicken', 'cow', 'sheep', 'pig', 'rabbit', 'deer', 'fox', 'goat'].forEach(k => SPR[k + 'R'] = SPR[k].map(flipC));
const ANIM_SPR = { poule: 'chicken', vache: 'cow', mouton: 'sheep', cochon: 'pig', lapin: 'rabbit', cerf: 'deer', renard: 'fox', chevre: 'goat' };
const ICON_URL = {}; for (const k in ITEMS) ICON_URL[k] = toURL(SPR.icons[k]);
const ANIM_URL = {}; for (const k in ANIMALS) ANIM_URL[k] = toURL(SPR[ANIM_SPR[k]][0], 2);
const ic = k => `<img class="ico" src="${ICON_URL[k]}" alt="${ITEMS[k].name}" title="${ITEMS[k].name}">`;
const NPC_BY_ID = Object.fromEntries(NPCS.map(n => [n.id, n])); for (const [id, w] of Object.entries(WORKERS)) NPC_BY_ID[id] = { id, name: w.name, role: w.role, lines: w.lines, worker: true };

// Décor vivant
const DECOR = [];
for (let y = 0; y < MH; y++) for (let x = 0; x < MW; x++) {
  const t = map[y][x], h = hash(x, y), b = biomeAt(x, y);
  if (t === T.TREE) DECOR.push({ kind: 'tree', x, y, pine: b === 'foret' ? h % 2 === 0 : h % 5 === 0, v: h % 7 === 0 ? 1 : 0, ph: (h % 100) / 16 });
  else if (t === T.PINE) DECOR.push({ kind: 'snowpine', x, y, ph: (h % 100) / 16 });
  else if (t === T.PALM) DECOR.push({ kind: 'palm', x, y, ph: (h % 100) / 16 });
  else if (t === T.BUSH) DECOR.push({ kind: 'bush', x, y, v: h % 2 });
  else if (t === T.TALL) DECOR.push({ kind: 'tall', x, y, v: h % 4, ph: (h % 100) / 16 });
  else if (t === T.ROCK) DECOR.push({ kind: 'boulder', x, y });
}

// ============================================================
//  SOL
// ============================================================
const tileAt = (x, y) => (x < 0 || y < 0 || x >= MW || y >= MH) ? T.CLIFF : map[y][x];
const groundCol = b => b === 'foret' ? '#3f7f35' : b === 'montagne' ? '#e9f1f7' : b === 'plage' ? C.sand : C.grass;
const HARD = new Set([T.PATH, T.STONE, T.WATER, T.SAND, T.PIER, T.BRIDGE, T.CLIFF, T.PLOT]);
function sandTile(A, x, y) {
  const R = rng(hash(x, y) + 5);
  A.r(0, 0, 16, 16, C.sand);
  for (let i = 0; i < 8; i++) A.p(R() * 16 | 0, R() * 16 | 0, C.sandD);
  for (let i = 0; i < 6; i++) A.p(R() * 16 | 0, R() * 16 | 0, C.sandL);
}
function drawGroundTile(g, x, y) {
  const A = pixApi(g, x * TILE, y * TILE), t = map[y][x], b = biomeAt(x, y);
  if (b === 'mine') { if (t === T.CLIFF) caveWallTile(A, x, y); else caveFloorTile(A, x, y); return; }
  const base = () => b === 'foret' ? forestTile(A, x, y) : b === 'montagne' ? snowTile(A, x, y) : b === 'plage' ? sandTile(A, x, y) : grassTile(A, x, y);
  const soft = (a, c) => !HARD.has(tileAt(a, c)) && biomeAt(a, c) !== 'plage';
  if (t === T.PATH) {
    const R = rng(hash(x, y) + 11);
    A.r(0, 0, 16, 16, C.path);
    for (let i = 0; i < 9; i++) A.p(R() * 16 | 0, R() * 16 | 0, C.pathD);
    for (let i = 0; i < 6; i++) A.p(R() * 16 | 0, R() * 16 | 0, C.pathL);
    for (let i = 0; i < 2; i++) { const sx = 2 + R() * 11 | 0, sy = 2 + R() * 11 | 0; A.r(sx, sy, 2, 1, '#a8804a'); A.p(sx, sy - 1, '#e2c38f'); }
    fringe(A, x, y, (a, c) => !HARD.has(tileAt(a, c)), groundCol(b), 99);
  } else if (t === T.SAND) {
    sandTile(A, x, y);
    fringe(A, x, y, soft, groundCol(biomeAt(x, y - 1) === 'plage' ? 'ferme' : biomeAt(x, y - 1)), 55);
  } else if (t === T.STONE) stoneTile(A, x, y);
  else if (t === T.CLIFF) cliffTile(A, x, y);
  else if (t === T.PIER) { A.r(0, 0, 16, 16, C.water); A.r(1, 0, 14, 16, '#9a6434'); for (let i = 0; i < 4; i++) { A.r(1, i * 4, 14, 1, '#6e4520'); A.r(1, i * 4 + 1, 14, 1, '#b97d45'); } A.r(1, 0, 1, 16, '#5a3518'); A.r(14, 0, 1, 16, '#5a3518'); }
  else if (t === T.BRIDGE) { plankTile(A, false); A.r(0, 0, 2, 16, '#5a3518'); A.r(14, 0, 2, 16, '#5a3518'); }
  else if (t === T.WATER) {
    const R = rng(hash(x, y));
    const deep = b === 'plage' && y >= 57;
    A.r(0, 0, 16, 16, deep ? '#2f7fc4' : C.water);
    for (let i = 0; i < 3; i++) A.r(R() * 12 | 0, R() * 16 | 0, 3 + (R() * 3 | 0), 1, C.waterL);
    for (let i = 0; i < 3; i++) A.r(R() * 13 | 0, R() * 16 | 0, 2, 1, C.waterD);
    const dry = (a, c) => { const tt = tileAt(a, c); return tt !== T.WATER && tt !== T.PIER && tt !== T.BRIDGE && !(GATES.pont && a >= GATES.pont.x && a < GATES.pont.x + 2 && c >= GATES.pont.y && c < GATES.pont.y + 2); };
    const N = dry(x, y - 1), S = dry(x, y + 1), W = dry(x - 1, y), E = dry(x + 1, y);
    const cc = (a, c) => tileAt(a, c) === T.SAND ? C.sand : groundCol(biomeAt(a, c));
    if (N) { A.r(0, 0, 16, 1, C.foam); A.r(0, 1, 16, 1, C.foam2); }
    if (S) { A.r(0, 15, 16, 1, C.foam); A.r(0, 14, 16, 1, C.foam2); }
    if (W) { A.r(0, 0, 1, 16, C.foam); A.r(1, 0, 1, 16, C.foam2); }
    if (E) { A.r(15, 0, 1, 16, C.foam); A.r(14, 0, 1, 16, C.foam2); }
    if (N && W) { A.r(0, 0, 3, 3, cc(x - 1, y - 1)); A.p(3, 1, C.foam); A.p(1, 3, C.foam); A.p(2, 2, C.foam); }
    if (N && E) { A.r(13, 0, 3, 3, cc(x + 1, y - 1)); A.p(12, 1, C.foam); A.p(14, 3, C.foam); A.p(13, 2, C.foam); }
    if (S && W) { A.r(0, 13, 3, 3, cc(x - 1, y + 1)); A.p(3, 14, C.foam); A.p(1, 12, C.foam); A.p(2, 13, C.foam); }
    if (S && E) { A.r(13, 13, 3, 3, cc(x + 1, y + 1)); A.p(12, 14, C.foam); A.p(14, 12, C.foam); A.p(13, 13, C.foam); }
  } else {
    base();
    if (t === T.FLOWER) flowerOverlay(A, x, y);
    if (t === T.FENCE) {
      const fe = (a, c) => tileAt(a, c) === T.FENCE;
      A.r(3, 14, 10, 1, '#4a8a35');
      if (fe(x - 1, y)) { A.r(0, 5, 8, 2, C.woodL); A.r(0, 7, 8, 1, C.woodD); A.r(0, 10, 8, 2, C.woodL); A.r(0, 12, 8, 1, C.woodD); }
      if (fe(x + 1, y)) { A.r(8, 5, 8, 2, C.woodL); A.r(8, 7, 8, 1, C.woodD); A.r(8, 10, 8, 2, C.woodL); A.r(8, 12, 8, 1, C.woodD); }
      if (fe(x, y - 1)) { A.r(7, 0, 2, 8, C.woodL); A.r(9, 0, 1, 8, C.woodD); }
      if (fe(x, y + 1)) { A.r(7, 8, 2, 8, C.woodL); A.r(9, 8, 1, 8, C.woodD); }
      A.r(5, 3, 6, 11, C.wood); A.r(5, 3, 2, 11, C.woodL); A.r(9, 3, 2, 11, C.woodD); A.r(5, 2, 6, 1, '#c58c50'); A.r(5, 13, 6, 1, '#5c3a1a');
    }
  }
}
let ground;
function buildGround() {
  const c = document.createElement('canvas'); c.width = MW * TILE; c.height = MH * TILE;
  const g = c.getContext('2d');
  for (let y = 0; y < MH; y++) for (let x = 0; x < MW; x++) drawGroundTile(g, x, y);
  ground = c;
}
// Mini-carte : 1 pixel par case
let miniBase;
function buildMini() {
  const c = document.createElement('canvas'); c.width = MW; c.height = MH;
  const g = c.getContext('2d');
  const col = (x, y) => {
    const t = map[y][x], b = biomeAt(x, y);
    if (buildingAt(x, y)) return '#b5453a';
    switch (t) {
      case T.WATER: return '#3d8fd6'; case T.PATH: return '#d8b47c'; case T.STONE: return '#bdb7ae'; case T.SAND: return '#ecd79a';
      case T.CLIFF: return '#6b6d74'; case T.PLOT: return '#8a5d3b'; case T.FENCE: return '#9a6434'; case T.PIER: case T.BRIDGE: return '#9a6434';
      case T.TREE: return b === 'foret' ? '#1f4f1c' : '#2f6d2a'; case T.PINE: return '#2e5a3a'; case T.PALM: return '#3f9b3c'; case T.ROCK: return '#8d8f96';
    }
    return b === 'foret' ? '#3f7f35' : b === 'montagne' ? '#e9f1f7' : b === 'plage' ? '#ecd79a' : '#6cb84b';
  };
  for (let y = 0; y < MH; y++) for (let x = 0; x < MW; x++) { g.fillStyle = biomeAt(x, y) === 'mine' ? (map[y][x] === T.CLIFF ? '#2a2420' : buildingAt(x, y) ? '#b5453a' : '#6e6257') : col(x, y); g.fillRect(x, y, 1, 1); }
  miniBase = c;
}

// ============================================================
//  ÉTAT & SAUVEGARDE
// ============================================================
let S;
const newPlot = () => ({ crop: null, progress: 0, watered: false });
const newGardens = () => Object.fromEntries(Object.entries(GARDENS).map(([b, g]) => [b, Array.from({ length: g.w * g.h }, newPlot)]));
const newCos = () => ({ owned: { 'hat.straw': true, 'hat.none': true, 'shirt.red': true, 'pants.blue': true, 'hair.brown': true }, worn: { hat: 'straw', shirt: 'red', pants: 'blue', hair: 'brown' } });
function migrate() {
  if (!S.gardens || !S.gardens.foret) S.gardens = newGardens();
  if (!S.cos || !S.cos.owned) S.cos = newCos();
  if (!S.equip) S.equip = [null, null, null];
  if (!S.buffs) S.buffs = {}; if (!S.ach) S.ach = {}; if (!S.timed) S.timed = {}; if (!S.gsel) S.gsel = {};
  for (const [k, w] of Object.entries(S.workshops)) if (!w.slots) S.workshops[k] = { n: 1, slots: [{ job: w.job ?? null, progress: w.progress || 0, ready: !!w.ready, last: w.lastJob ?? w.job ?? null }] };
  S.story = nextStory(); startStory();
}
const nextStory = () => { const i = STORY.findIndex(m => !S.storyDone.includes(m.id)); return i < 0 ? STORY.length : i; };
function defaultState() {
  return {
    name: '', farm: '', started: false,
    coins: 30, xp: 0, level: 1, fieldLvl: 0, plots: Array.from({ length: MAX_PLOTS }, newPlot),
    animals: [], workshops: {}, orders: [], inv: {}, selected: 'ble', water: 8, canLvl: 0,
    player: { x: 9.5, y: 27.6, dir: 'down' }, time: 7 * 60, day: 1, last: Date.now(),
    count: {}, story: 0, storyBase: 0, storyShown: -1, daily: null, zoom: null, weather: 'sun',
    gates: {}, nodes: {}, stats: { harvested: 0, earned: 0, delivered: 0, fish: 0 }, opts: { reach: true }, ended: false, machines: {}, mLvl: {}, mOn: {}, staff: {}, autoAcc: {}, tools: {}, lq: null,
    gardens: newGardens(), buffs: {}, equip: [null, null, null], cos: newCos(), ach: {}, timed: {}, storyDone: [], gsel: {}, xpFrac: 0, v: 3,
  };
}
function hasSave() { try { return !!localStorage.getItem(SAVE_KEY); } catch (e) { return false; } }
function load() {
  try { OLD_KEYS.forEach(k => localStorage.removeItem(k)); } catch (e) {}
  try { const raw = localStorage.getItem(SAVE_KEY); if (raw) { const d = JSON.parse(raw); if (!Array.isArray(d.storyDone)) { d.storyDone = OLD_STORY_IDS.slice(0, d.story || 0); d.storyShown = -1; d.ended = false; } d.v = 3; S = Object.assign(defaultState(), d); return true; } } catch (e) {}
  S = defaultState(); return false;
}
function save() { if (!S.started) return; S.last = Date.now(); try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch (e) {} }
const unlocked = () => START_PLOTS + 8 * S.fieldLvl;
const waterMax = () => CAN_UPGRADES[S.canLvl].cap;

// ============================================================
//  OUTILS
// ============================================================
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fmtN = n => Math.floor(n).toLocaleString('fr-FR');
function fmt(s) {
  s = Math.max(0, Math.ceil(s)); if (s < 60) return s + 's';
  const m = Math.floor(s / 60), r = s % 60;
  return m < 60 ? m + 'm' + (r ? ' ' + String(r).padStart(2, '0') + 's' : '') : Math.floor(m / 60) + 'h ' + String(m % 60).padStart(2, '0') + 'm';
}
const have = k => S.inv[k] || 0;
function addItem(k, q) { S.inv[k] = have(k) + q; if (S.inv[k] <= 0) delete S.inv[k]; }
const hasAll = req => Object.entries(req).every(([k, q]) => have(k) >= q);
function takeAll(req) { for (const [k, q] of Object.entries(req)) addItem(k, -q); }
const canPay = req => (S.coins >= (req.coins || 0)) && Object.entries(req).every(([k, q]) => k === 'coins' || k === 'lvl' || k === 'cap' || have(k) >= q) && (!req.lvl || S.level >= req.lvl);
function pay(req) { S.coins -= req.coins || 0; for (const [k, q] of Object.entries(req)) if (ITEMS[k]) addItem(k, -q); }
const reqHTML = req => Object.entries(req).filter(([k]) => k !== 'cap').map(([k, q]) => {
  if (k === 'coins') return `<span class="${S.coins >= q ? 'ok' : 'ko'}">🪙 ${fmtN(q)}</span>`;
  if (k === 'lvl') return `<span class="${S.level >= q ? 'ok' : 'ko'}">⭐ Niv. ${q}</span>`;
  return `<span class="${have(k) >= q ? 'ok' : 'ko'}">${q}×${ic(k)}</span><small>(${have(k)})</small>`;
}).join(' · ');
const reqText = req => reqHTML(req);
function toast(msg, kind) {
  const t = document.createElement('div'); t.className = 'toast' + (kind ? ' ' + kind : ''); t.textContent = msg;
  $('#toasts').appendChild(t); setTimeout(() => t.remove(), 3200);
  while ($('#toasts').children.length > 4) $('#toasts').firstChild.remove();
}
let bannerT = null;
function banner(big, small) {
  const b = $('#banner'); b.innerHTML = `<small>${esc(small || '')}</small><b>${esc(big)}</b>`; b.classList.remove('show'); void b.offsetWidth; b.classList.add('show');
  clearTimeout(bannerT); bannerT = setTimeout(() => b.classList.remove('show'), 3200);
}
function morphChildren(from, to) {
  const f = [...from.childNodes], t = [...to.childNodes];
  for (let i = 0; i < t.length; i++) {
    const a = f[i], b = t[i];
    if (!a) { from.appendChild(b.cloneNode(true)); continue; }
    if (a.nodeType !== b.nodeType || a.nodeName !== b.nodeName) { from.replaceChild(b.cloneNode(true), a); continue; }
    if (a.nodeType !== 1) { if (a.nodeValue !== b.nodeValue) a.nodeValue = b.nodeValue; continue; }
    for (const at of [...a.attributes]) if (!b.hasAttribute(at.name)) a.removeAttribute(at.name);
    for (const at of [...b.attributes]) if (a.getAttribute(at.name) !== at.value) a.setAttribute(at.name, at.value);
    if (a.nodeName === 'BUTTON') a.disabled = b.hasAttribute('disabled');
    if (a.nodeName === 'INPUT' && document.activeElement !== a && a.type === 'range') a.value = b.getAttribute('value');
    morphChildren(a, b);
  }
  for (let i = f.length - 1; i >= t.length; i--) from.removeChild(f[i]);
}
function patch(el, html) { const tpl = document.createElement('template'); tpl.innerHTML = html.trim(); morphChildren(el, tpl.content); }

// ============================================================
//  PROGRESSION
// ============================================================
const xpNeed = L => 25 * L * L + 25 * L;
function addXp(n) {
  S.xpFrac = (S.xpFrac || 0) + n * buffVal('xp'); n = Math.floor(S.xpFrac); S.xpFrac -= n;
  S.xp += n;
  while (S.level < MAX_LEVEL && S.xp >= xpNeed(S.level)) {
    S.xp -= xpNeed(S.level); S.level++;
    const bonus = 15 * S.level; S.coins += bonus;
    const unl = [];
    for (const k in CROPS) if (CROPS[k].lvl === S.level) unl.push('graine de ' + ITEMS[k].name.toLowerCase());
    for (const k in ANIMALS) if (ANIMALS[k].lvl === S.level) unl.push(ANIMALS[k].name.toLowerCase());
    for (const k in WORKSHOPS) if (WORKSHOPS[k].lvl === S.level) unl.push(WORKSHOPS[k].name);
    for (const z of Object.values(ZONES)) if (z.lvl === S.level && z.gate) unl.push('accès : ' + z.name);
    banner(`Niveau ${S.level} !`, `⭐ +${bonus} pièces`);
    if (unl.length) setTimeout(() => toast('🔓 Nouveau : ' + unl.join(', '), 'gold'), 600);
  }
  if (S.level >= MAX_LEVEL) S.xp = Math.min(S.xp, xpNeed(MAX_LEVEL));
}
const animalCost = k => Math.round(ANIMALS[k].cost * (1 + 0.5 * S.animals.filter(a => a.type === k).length));
const orderSlots = () => Math.min(5, 2 + Math.floor((S.level + 1) / 3));
function availableItems() {
  const list = CROP_KEYS.filter(k => CROPS[k].lvl <= S.level);
  const owned = new Set(S.animals.map(a => a.type));
  for (const k in ANIMALS) if (owned.has(k)) list.push(ANIMALS[k].product);
  for (const k in WORKSHOPS) if (S.workshops[k]) WORKSHOPS[k].recipes.forEach(r => { if (r.lvl <= S.level) list.push(r.out); });
  if (S.gates.foret) list.push('bois', 'champi', 'baie');
  if (S.gates.pont) list.push('poisson', 'coquillage');
  if (S.gates.mont) list.push('pierre', 'fer');
  for (const [b, ks] of Object.entries(GARDEN_CROPS)) if (zoneOpen(b)) ks.forEach(k => { if (CROPS[k].lvl <= S.level) list.push(k); });
  return [...new Set(list)].filter(k => ITEMS[k].cat !== 'bijou');
}
function newOrder() {
  const pool = availableItems().sort(() => Math.random() - .5);
  const n = Math.min(pool.length, 1 + Math.floor(Math.random() * Math.min(3, 1 + Math.floor(S.level / 3))));
  const items = {}; let value = 0;
  for (const k of pool.slice(0, n)) {
    const p = ITEMS[k].price, max = p <= 10 ? 5 : p <= 30 ? 3 : p <= 100 ? 2 : 1;
    const q = 1 + Math.floor(Math.random() * max); items[k] = q; value += p * q;
  }
  return { client: CLIENTS[Math.floor(Math.random() * CLIENTS.length)], items, reward: Math.round(value * 1.35 + 5), xp: Math.max(2, Math.round(value / 15)) };
}
function syncOrders() {
  const now = Date.now();
  S.orders = S.orders.map(o => (o.wait && now >= o.wait) ? newOrder() : o);
  while (S.orders.length < orderSlots()) S.orders.push(newOrder());
}

// ============================================================
//  MISSIONS & DIALOGUES
// ============================================================
const cnt = (ev, k) => S.count[k ? ev + ':' + k : ev] || 0;
function track(ev, k, n = 1) {
  S.count[ev] = (S.count[ev] || 0) + n;
  if (k) S.count[ev + ':' + k] = (S.count[ev + ':' + k] || 0) + n;
}
const fill = s => s.replace(/\{name\}/g, S.name || 'toi').replace(/\{farm\}/g, S.farm || 'Tilleuls');
const missionValue = (m, base) => Math.max(0, Math.min(m.n, m.state ? m.state() : cnt(m.ev, m.k) - base));
const rewardText = r => [r.coins ? `🪙${fmtN(r.coins)}` : '', r.xp ? `⭐${r.xp} XP` : ''].filter(Boolean).join(' ');
function giveReward(r) { if (r.coins) S.coins += r.coins; if (r.xp) addXp(r.xp); }
function startStory() { const m = STORY[S.story]; if (m && !m.state) S.storyBase = m.ev === 'gate' ? 0 : cnt(m.ev, m.k); }
function genDaily() {
  const L = S.level, pool = [];
  const crops = CROP_KEYS.filter(k => CROPS[k].lvl <= L), c = crops[Math.floor(Math.random() * crops.length)];
  const nH = Math.max(3, Math.min(12, Math.round(50 / ITEMS[c].price)));
  pool.push({ t: 'Récolte du jour', d: `Récolte ${nH} ${ITEMS[c].name.toLowerCase()}`, ev: 'harvest', k: c, n: nH, r: { coins: Math.round(nH * ITEMS[c].price * .6 + 15), xp: 3 + L } });
  pool.push({ t: 'Jardinier', d: 'Arrose 10 parcelles', ev: 'water', n: 10, r: { coins: 20 + L * 5, xp: 3 + L } });
  if (S.animals.length) pool.push({ t: 'Soigneur', d: 'Nourris tes animaux 4 fois', ev: 'feed', n: 4, r: { coins: 30 + L * 8, xp: 4 + L } });
  pool.push({ t: 'Service au village', d: 'Livre 2 commandes', ev: 'deliver', n: 2, r: { coins: 40 + L * 10, xp: 5 + L } });
  if (S.gates.foret) pool.push({ t: 'Bûcheron', d: 'Ramasse 8 bois', ev: 'gather', k: 'bois', n: 8, r: { coins: 30 + L * 6, xp: 4 + L } });
  if (S.gates.pont) pool.push({ t: 'Pêche du jour', d: 'Pêche 4 poissons', ev: 'fish', n: 4, r: { coins: 40 + L * 8, xp: 5 + L } });
  if (S.gates.mont) pool.push({ t: 'Mineur', d: 'Extrais 10 pierres', ev: 'gather', k: 'pierre', n: 10, r: { coins: 50 + L * 8, xp: 6 + L } });
  const list = pool.sort(() => Math.random() - .5).slice(0, 3);
  return { day: S.day, bonus: false, list: list.map(m => ({ ...m, base: cnt(m.ev, m.k), done: false })) };
}
// File de dialogues
const dlg = { queue: [], cur: null, shown: 0 };
function say(npc, text, after) { dlg.queue.push({ npc, text: fill(text), after }); if (!dlg.cur) nextDialog(); }
function nextDialog() {
  const prev = dlg.cur; if (prev && prev.after) prev.after();
  dlg.cur = dlg.queue.shift() || null; dlg.shown = 0;
  renderDialog();
}
function advanceDialog() {
  if (!dlg.cur) return;
  if (dlg.shown < dlg.cur.text.length) { dlg.shown = dlg.cur.text.length; renderDialog(); return; }
  nextDialog();
}
function checkMissions() {
  if (!S.started) return;
  const m = STORY[S.story];
  if (m && S.storyShown !== S.story && !dlg.cur && !panel) {
    if (S.storyShown === -1 || STORY[S.storyShown]?.ch !== m.ch) setTimeout(() => banner(CHAPTERS[m.ch], `Chapitre ${m.ch + 1}`), 50);
    S.storyShown = S.story;
    say(m.npc, m.say);
  }
  if (m && S.storyShown === S.story && missionValue(m, S.storyBase) >= m.n) {
    giveReward(m.r); toast(`🏆 Mission accomplie : ${m.t}  ${rewardText(m.r)}`, 'gold');
    S.storyDone.push(m.id); S.story = nextStory(); startStory();
    if (!STORY[S.story] && !S.ended) { S.ended = true; setTimeout(() => { banner('Fin de l\'histoire', '🎉 Félicitations'); say('rose', STORY_END); }, 800); }
  }
  if (!S.daily || S.daily.day !== S.day) { const fresh = !!S.daily; S.daily = genDaily(); if (fresh) toast('📅 Nouvelles missions du jour !'); }
  for (const d of S.daily.list) if (!d.done && cnt(d.ev, d.k) - d.base >= d.n) { d.done = true; giveReward(d.r); toast(`📅 ${d.t} ✓  ${rewardText(d.r)}`, 'gold'); }
  checkLevelQuests();
  if (!S.daily.bonus && S.daily.list.every(d => d.done)) { S.daily.bonus = true; const b = 40 * S.level; S.coins += b; toast(`🎉 Toutes les missions du jour ! Bonus +${fmtN(b)} 🪙`, 'gold'); }
}

// ============================================================
//  MONDE : collisions, barrières, ressources
// ============================================================
const buildingAt = (x, y) => BUILDINGS.find(b => x >= b.x && x < b.x + b.w && y >= b.y && y < b.y + b.h);
const gateAt = (x, y) => { for (const [id, g] of Object.entries(GATES)) if (!S.gates[id] && x >= g.x && x < g.x + g.w && y >= g.y && y < g.y + g.h) return id; return null; };
const nodeAvail = n => !(S.nodes[n.id] > Date.now());
const nodeAt = (x, y) => (x >= 0 && y >= 0 && x < MW && y < MH) ? nodeGrid[y][x] : null;
function solidAt(x, y) {
  if (SOLID.has(tileAt(x, y)) || buildingAt(x, y) || gateAt(x, y)) return true;
  const n = nodeAt(x, y); if (n) { const I = NODE_INFO[n.kind]; return I.solid && (I.keep || nodeAvail(n)); }
  return false;
}
const plotIndexAt = (x, y) => (x >= FIELD.x && x < FIELD.x + FIELD.w && y >= FIELD.y && y < FIELD.y + FIELD.h) ? (FIELD.y + FIELD.h - 1 - y) * FIELD.w + (x - FIELD.x) : null;
const plotTile = i => [FIELD.x + i % FIELD.w, FIELD.y + FIELD.h - 1 - Math.floor(i / FIELD.w)];
const zoneOpen = z => !ZONES[z].gate || !!S.gates[ZONES[z].gate];
function openGate(id) {
  const g = GATES[id];
  S.gates[id] = true; track('gate', id);
  for (let y = g.y; y < g.y + g.h; y++) for (let x = g.x; x < g.x + g.w; x++) map[y][x] = g.after;
  buildGround(); buildMini();
  banner(ZONES[g.zone].name, `${ZONES[g.zone].icon} Nouvelle zone ouverte`);
  emit((g.x + 1) * TILE, (g.y + 1) * TILE, 30, { col: ['#c9a066', '#8d8f96', '#ffffff'], speed: 60, life: .8, grav: 80 });
}

// ============================================================
//  SIMULATION
// ============================================================
function simulate(dt) {
  const rain = S.weather === 'rain';
  const gm = buffVal('growth');
  const grow = p => { if (p.crop && p.progress < 1) { if (rain) p.watered = true; p.progress = Math.min(1, p.progress + dt * gm * (p.watered ? WATER_BONUS : 1) / CROPS[p.crop].time); } };
  for (let i = 0; i < unlocked(); i++) grow(S.plots[i]);
  for (const b in S.gardens) S.gardens[b].forEach(grow);
  for (const a of S.animals) if (a.state === 'working') { a.progress += dt / ANIMALS[a.type].time; if (a.progress >= 1) { a.progress = 1; a.state = 'ready'; } }
  for (const k in S.workshops) {
    for (const sl of S.workshops[k].slots) if (sl.job != null && !sl.ready) { sl.progress += dt / WORKSHOPS[k].recipes[sl.job].time; if (sl.progress >= 1) { sl.progress = 1; sl.ready = true; } }
  }
  if (S.started) syncOrders();
}
function newDay() {
  S.day++;
  S.weather = Math.random() < .22 ? 'rain' : 'sun';
  payWages();
  banner(`Jour ${S.day}`, S.weather === 'rain' ? '🌧️ Pluie : tes cultures s\'arrosent seules' : '☀️ Beau temps');
}
const penOf = type => ANIMAL_ZONES[ANIMALS[type].pen || 'ferme'];
function spawnAnimal(type) {
  const z = penOf(type), x = z.x1 + Math.random() * (z.x2 - z.x1), y = z.y1 + Math.random() * (z.y2 - z.y1);
  return { type, state: 'hungry', progress: 0, x, y, tx: x, ty: y, wait: Math.random() * 2, flip: false };
}
function updateAnimals(dt) {
  for (const a of S.animals) {
    const z = penOf(a.type);
    a.moving = false;
    if (a.wait > 0) { a.wait -= dt; continue; }
    const dx = a.tx - a.x, dy = a.ty - a.y, d = Math.hypot(dx, dy);
    if (d < .05) { a.wait = 1 + Math.random() * 4; a.tx = z.x1 + Math.random() * (z.x2 - z.x1); a.ty = z.y1 + Math.random() * (z.y2 - z.y1); continue; }
    const step = Math.min(d, 1.1 * dt); a.x += dx / d * step; a.y += dy / d * step; a.flip = dx > 0; a.moving = true;
  }
}
const npcState = NPCS.map(n => ({ dir: n.dir, t: Math.random() * 5 }));
function updateNpcs(dt) {
  const P = S.player;
  NPCS.forEach((n, i) => {
    const st = npcState[i]; st.t -= dt;
    const d = Math.hypot(P.x - n.x, P.y - n.y);
    if (d < 2.2) { const dx = P.x - n.x, dy = P.y - n.y; st.dir = Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? 'left' : 'right') : (dy < 0 ? 'up' : 'down'); }
    else if (st.t <= 0) { st.t = 3 + Math.random() * 5; st.dir = ['down', 'left', 'right', 'down'][Math.random() * 4 | 0]; }
  });
}

// ============================================================
//  PARTICULES & AMBIANCE
// ============================================================
const parts = [];
function emit(x, y, n, o) {
  for (let i = 0; i < n; i++) {
    const a = (o.angle ?? -Math.PI / 2) + (Math.random() - .5) * (o.spread ?? Math.PI), sp = (o.speed ?? 30) * (.5 + Math.random() * .7);
    parts.push({ x: x + (Math.random() - .5) * (o.jitter ?? 4), y: y + (Math.random() - .5) * (o.jitter ?? 4), vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
      g: o.grav ?? 60, life: 0, max: (o.life ?? .6) * (.7 + Math.random() * .6), col: Array.isArray(o.col) ? o.col[Math.random() * o.col.length | 0] : o.col,
      size: o.size ?? 1, kind: o.kind || 'dot' });
  }
}
function updateParts(dt) {
  for (let i = parts.length - 1; i >= 0; i--) {
    const p = parts[i]; p.life += dt; if (p.life >= p.max) { parts.splice(i, 1); continue; }
    p.vy += p.g * dt; p.x += p.vx * dt; p.y += p.vy * dt;
    if (p.kind === 'smoke') { p.vx *= .98; p.size += dt * 2.5; }
  }
}
const flies = Array.from({ length: 10 }, (_, i) => ({ x: 4 + Math.random() * 54, y: 4 + Math.random() * 40, tx: 0, ty: 0, c: i % 4, t: Math.random() * 10 }));
const bugs = Array.from({ length: 40 }, () => ({ x: 2 + Math.random() * 58, y: 2 + Math.random() * 42, ph: Math.random() * 10 }));
const clouds = Array.from({ length: 7 }, (_, i) => ({ x: Math.random() * MW * TILE, y: (i + .5) * MH * TILE / 7, r: 60 + Math.random() * 50 }));
const rainDrops = Array.from({ length: 170 }, () => ({ x: Math.random(), y: Math.random(), s: .7 + Math.random() * .6 }));
function updateCritters(dt) {
  for (const f of flies) {
    f.t += dt; const d = Math.hypot(f.tx - f.x, f.ty - f.y);
    if (d < .3 || !f.tx) { f.tx = Math.max(2, Math.min(58, f.x + (Math.random() - .5) * 8)); f.ty = Math.max(2, Math.min(44, f.y + (Math.random() - .5) * 6)); }
    else { f.x += (f.tx - f.x) / d * 1.4 * dt + Math.sin(f.t * 7) * .01; f.y += (f.ty - f.y) / d * 1.4 * dt + Math.cos(f.t * 5) * .015; }
  }
  for (const b of bugs) { b.ph += dt; b.x += Math.sin(b.ph * .7) * .3 * dt; b.y += Math.cos(b.ph * .5) * .3 * dt; }
  for (const c of clouds) { c.x += 6 * dt; if (c.x - c.r > MW * TILE) c.x = -c.r; }
  const inSnow = biomeAt(Math.floor(S.player.x), Math.floor(S.player.y)) === 'montagne';
  for (const r of rainDrops) {
    const sp = inSnow && S.weather !== 'rain' ? .18 : 1.6;
    r.y += dt * sp * r.s; r.x -= dt * (inSnow ? .05 * Math.sin(r.y * 9) : .25) * r.s;
    if (r.y > 1) { r.y -= 1; r.x = Math.random() * 1.2; } if (r.x < 0) r.x += 1.2;
  }
}

// ============================================================
//  JOUEUR & INTERACTIONS
// ============================================================
const keys = new Set();
const joy = { x: 0, y: 0 };
const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
let moving = false, walkT = 0, panel = null, panelArg = null, dustT = 0, titleOpen = true, curZone = null, lastHit = 0;
const nodeHp = {}, nodeShake = {};
const floaters = [];
function floatText(text, x, y, icon) { floaters.push({ text, x, y, t: 0, icon }); }
const busy = () => !!(panel || dlg.cur || titleOpen);
const inMine = () => S.player.x >= 80;

function blocked(x, y) {
  const rx = .28, ry = .18;
  for (const [dx, dy] of [[-rx, -ry], [rx, -ry], [-rx, ry], [rx, ry]]) if (solidAt(Math.floor(x + dx), Math.floor(y + dy))) return true;
  return false;
}
function updatePlayer(dt) {
  const P = S.player;
  if (busy()) { moving = false; return; }
  let vx = 0, vy = 0;
  if (keys.has('ArrowLeft') || keys.has('KeyA')) vx -= 1;
  if (keys.has('ArrowRight') || keys.has('KeyD')) vx += 1;
  if (keys.has('ArrowUp') || keys.has('KeyW')) vy -= 1;
  if (keys.has('ArrowDown') || keys.has('KeyS')) vy += 1;
  vx += joy.x; vy += joy.y;
  if (Math.hypot(vx, vy) > .15) { if (P.path) { P.path = null; P.goal = null; } }
  else if (P.path) {
    const wp = P.path[0], dx = wp[0] - P.x, dy = wp[1] - P.y, d = Math.hypot(dx, dy);
    if (d < .12) { P.path.shift(); if (!P.path.length) { P.path = null; arrive(); } return; }
    vx = dx / d; vy = dy / d;
  }
  const len = Math.hypot(vx, vy);
  moving = len > .15;
  if (!moving) return;
  if (P.fish) { P.fish = null; toast('🎣 Tu ranges ta canne.'); }
  vx /= Math.max(1, len); vy /= Math.max(1, len);
  if (Math.abs(vx) > Math.abs(vy)) P.dir = vx < 0 ? 'left' : 'right'; else P.dir = vy < 0 ? 'up' : 'down';
  const run = keys.has('ShiftLeft') || keys.has('ShiftRight');
  const sp = (run ? 7 : 4.2) * buffVal('speed') * dt;
  const mx = P.path ? Math.sign(vx) * Math.min(Math.abs(vx * sp), Math.abs(P.path[0][0] - P.x)) : vx * sp;
  const my = P.path ? Math.sign(vy) * Math.min(Math.abs(vy * sp), Math.abs(P.path[0][1] - P.y)) : vy * sp;
  if (!blocked(P.x + mx, P.y)) P.x += mx; else if (P.path) P.x = P.path[0][0];
  if (!blocked(P.x, P.y + my)) P.y += my; else if (P.path) P.y = P.path[0][1];
  walkT += dt * (run ? 1.5 : 1);
  dustT -= dt;
  if (dustT <= 0) {
    dustT = run ? .08 : .16;
    const tx = Math.floor(P.x), ty = Math.floor(P.y), t = tileAt(tx, ty), b = biomeAt(tx, ty);
    const col = b === 'montagne' ? ['#ffffff', '#dfe8f0'] : t === T.PATH || t === T.SAND || b === 'plage' ? ['#d8b47c', '#c9a066'] : ['#a8d88a', '#8fc874'];
    emit(P.x * TILE, (P.y + .2) * TILE, 2, { col, speed: 12, life: .4, grav: -8, jitter: 5 });
  }
  const z = biomeAt(Math.floor(P.x), Math.floor(P.y));
  if (z !== curZone) { if (curZone) banner(z === 'ferme' ? `Ferme des ${S.farm}` : ZONES[z].name, ZONES[z].icon); curZone = z; track('visit', z); }
}
function teleport(x, y, dir) {
  const P = S.player; P.x = x; P.y = y; P.dir = dir; P.path = null; P.goal = null; P.fish = null;
  const z = biomeAt(Math.floor(x), Math.floor(y)); banner(z === 'ferme' ? `Ferme des ${S.farm}` : ZONES[z].name, ZONES[z].icon); curZone = z; track('visit', z);
}
function updateFishing(dt) {
  const F = S.player.fish; if (!F) return;
  F.t += dt;
  if (F.state === 'wait' && F.t >= F.bite) { F.state = 'bite'; F.bt = 0; emit((F.tx + .5) * TILE, (F.ty + .5) * TILE, 8, { col: ['#ffffff', '#d8f1ff'], speed: 30, life: .4, grav: 90 }); }
  else if (F.state === 'bite') { F.bt += dt; if (F.bt > 1.0 + (S.tools.canne || 0) * .35) { S.player.fish = null; toast('🐟 Le poisson s\'est échappé…'); } }
}
function catchFish() {
  const P = S.player, F = P.fish; P.fish = null;
  const r = Math.random();
  let item = 'poisson';
  if (S.level >= 6 && r < .22 + (S.tools.canne || 0) * .12) item = 'saumon';
  if (r > .95) { const c = 20 + (Math.random() * 40 | 0); S.coins += c; floatText(`+${c} 🪙`, P.x, P.y - 1.6); toast(`🎣 Tu repêches une vieille bourse : +${c} pièces !`, 'gold'); return; }
  const fq = lucky() ? 2 : 1; addItem(item, fq); track('fish', null, fq); track('gather', item, fq); pushTimed('fish', fq); addXp(item === 'saumon' ? 4 : 2); S.stats.fish += fq;
  floatText('+' + fq, P.x, P.y - 1.6, item);
  emit((F.tx + .5) * TILE, (F.ty + .5) * TILE, 14, { col: ['#ffffff', '#8cc8f0'], speed: 50, life: .5, grav: 120 });
}

// ---- Cibles ----
function getTarget() {
  const P = S.player, [dx, dy] = DIRS[P.dir];
  const fx = P.x + dx * .8, fy = P.y + dy * .8;
  let bn = -1, bd = .8;
  NPCS.forEach((n, i) => { const d = Math.hypot(n.x - fx, n.y - fy); if (d < bd) { bd = d; bn = i; } });
  if (bn >= 0) return npcTarget(NPCS[bn]);
  for (const w of activeWorkers()) { const r = WRT[w]; if (Math.hypot(r.x - fx, r.y - fy) < .8) return workerTarget(w); }
  let best = -1; bd = .85;
  S.animals.forEach((a, i) => { const d = Math.hypot(a.x - fx, a.y - fy); if (d < bd) { bd = d; best = i; } });
  if (best >= 0) return animalTarget(best);
  const tx = Math.floor(P.x + dx * .7), ty = Math.floor(P.y + dy * .7);
  return tileTarget(tx, ty);
}
function tileTarget(tx, ty) {
  const g = gateAt(tx, ty); if (g) return gateTarget(g);
  if (tileAt(tx, ty) === T.FENCE && tx >= FIELD.x - 1 && tx <= FIELD.x + FIELD.w && ty >= FIELD.y - 1 && ty <= FIELD.y + FIELD.h && !machineAt(tx, ty)) return { tx, ty, label: '🌾 Plan du champ', fn: () => openPanel('plan') };
  const m = machineAt(tx, ty); if (m) return { tx, ty, label: `${MACHINES[m].icon} ${MACHINES[m].name}${S.mOn[m] === false ? ' (éteint)' : ''} — réglages`, fn: () => openPanel('machines') };
  const b = buildingAt(tx, ty); if (b) return buildingTarget(b);
  const n = nodeAt(tx, ty); if (n) return nodeTarget(n);
  if (tileAt(tx, ty) === T.WATER) return waterTarget(tx, ty);
  const ga = gardenAt(tx, ty); if (ga) { const t = gardenTarget(ga.b, ga.i, tx, ty); t.plot = true; return t; }
  const pi = plotIndexAt(tx, ty); if (pi != null) { const t = plotTarget(pi, tx, ty); t.plot = true; return t; }
  return null;
}
function npcTarget(n) {
  const cur = STORY[S.story];
  return { npc: n, label: `💬 Parler à ${n.name}${cur && cur.npc === n.id ? ' (mission)' : ''}`, fn: () => talk(n) };
}
function talk(n) {
  const cur = STORY[S.story];
  if (cur && cur.npc === n.id) say(n.id, cur.say + `\n\n➜ Objectif : ${cur.d} (${fmtN(missionValue(cur, S.storyBase))}/${fmtN(cur.n)})`);
  else say(n.id, n.lines[Math.random() * n.lines.length | 0]);
}
function waterTarget(tx, ty) {
  const P = S.player;
  if (ty >= 47) {
    if (P.fish) return { tx, ty, label: P.fish.state === 'bite' ? '❗ Ça mord ! Vite !' : '🎣 Attends que ça morde…', fn: () => {} };
    return { tx, ty, label: '🎣 Pêcher', fn: () => { const c = S.tools.canne || 0; P.fish = { tx, ty, t: 0, bite: (1.8 + Math.random() * 3.5) * [1, .7, .5][c], state: 'wait' }; } };
  }
  const max = waterMax();
  return { tx, ty, label: S.water >= max ? '💧 Arrosoir déjà plein' : `💧 Remplir l'arrosoir (${S.water}/${max})`,
    fn: S.water >= max ? null : () => {
      S.water = max; track('refill'); floatText('Plein !', P.x, P.y - 1.6);
      emit((tx + .5) * TILE, (ty + .5) * TILE, 14, { col: ['#d8f1ff', '#8cc8f0', '#ffffff'], speed: 45, life: .6, grav: 120 });
    } };
}
function gateTarget(id) {
  const g = GATES[id];
  return { gate: id, tx: g.x, ty: g.y, tw: g.w, th: g.h, label: S.level < g.req.lvl ? `🔒 ${g.name} — niveau ${g.req.lvl} requis` : `🔧 ${g.name} — réparer`, fn: () => openPanel('gate', id) };
}
function nodeTarget(n) {
  const I = NODE_INFO[n.kind];
  if (!nodeAvail(n)) return { tx: n.x, ty: n.y, label: `⏳ Repousse dans ${fmt((S.nodes[n.id] - Date.now()) / 1000)}` };
  return { tx: n.x, ty: n.y, label: `${I.label} ${ic(I.item)}`, fn: () => harvestNode(n) };
}
function harvestNode(n) {
  const I = NODE_INFO[n.kind], cx = (n.x + .5) * TILE, cy = (n.y + .5) * TILE;
  if (I.hp) {
    if (now - lastHit < 250) return; lastHit = now;
    nodeHp[n.id] = (nodeHp[n.id] ?? Math.max(1, I.hp - (S.tools.pioche || 0))) - 1; nodeShake[n.id] = .18;
    emit(cx, cy - 4, 6, { col: ['#b0b2b8', '#8d8f96', n.kind === 'crystal' ? '#5fd3f5' : '#6b6d74'], speed: 45, life: .4, grav: 140 });
    if (nodeHp[n.id] > 0) return;
    delete nodeHp[n.id];
  }
  let q = I.qty[0] + Math.floor(Math.random() * (I.qty[1] - I.qty[0] + 1));
  const th = S.tools.hache || 0, tp = S.tools.pioche || 0;
  if (n.kind === 'branche') q += th; if (n.kind === 'champi' && th >= 2) q *= 2;
  if (I.hp && Math.random() < tp * .3) q += 1;
  if (lucky()) q *= 2;
  addItem(I.item, q); track('gather', I.item, q); pushTimed('gather:' + I.item, q); addXp(I.xp);
  if (I.extra) { addItem(I.extra, 1); track('gather', I.extra, 1); }
  S.nodes[n.id] = Date.now() + I.respawn * 1000;
  floatText(`+${q}`, n.x + .5, n.y - .2, I.item);
  emit(cx, cy, 10, { col: [ITEMS[I.item].col, '#ffffff'], speed: 40, life: .5, grav: 80, kind: 'spark' });
}
function plotTarget(i, tx, ty) {
  const base = { tx, ty }, cx = (tx + .5) * TILE, cy = (ty + .5) * TILE;
  if (i >= unlocked()) return { ...base, label: '🌿 Parcelle en friche — agrandis ton champ au Marché' };
  const p = S.plots[i];
  if (!p.crop) {
    const key = p.plan || S.selected, c = CROPS[key], it = ITEMS[key];
    return { ...base, label: `Planter ${ic(key)} ${it.name} (🪙${c.seed})${p.plan ? ' · plan du champ' : ''}`, fn: () => {
      if (S.level < c.lvl) return toast(`🔒 ${it.name} : niveau ${c.lvl} requis`);
      if (S.coins < c.seed) return toast('🪙 Pas assez de pièces pour cette graine');
      S.coins -= c.seed; track('plant', key); Object.assign(p, { crop: key, progress: 0, watered: S.weather === 'rain' });
      emit(cx, cy + 4, 6, { col: ['#6e4a2c', '#8a5d3b'], speed: 25, life: .35, grav: 90 });
    } };
  }
  const it = ITEMS[p.crop];
  if (p.progress >= 1) return { ...base, label: `Récolter ${ic(p.crop)} ${it.name}`, fn: () => {
    const k = p.crop, q = lucky() ? 2 : 1; addItem(k, q); track('harvest', k, q); pushTimed('harvest', q); addXp(CROPS[k].xp); S.stats.harvested++;
    floatText('+' + q, tx + .5, ty, k); Object.assign(p, newPlot(), { last: k, plan: p.plan });
    emit(cx, cy, 10, { col: [it.col, '#4caf50', '#7bd06b'], speed: 50, life: .6, grav: 110 });
  } };
  const left = (1 - p.progress) * CROPS[p.crop].time / (p.watered ? WATER_BONUS : 1);
  if (!p.watered) {
    if (S.water <= 0) return { ...base, label: '🪣 Arrosoir vide — remplis-le à l\'étang ou à la rivière' };
    return { ...base, label: `Arroser ${ic(p.crop)} (💧${S.water}) — prêt dans ${fmt(left)}`, fn: () => {
      S.water--; p.watered = true; track('water');
      emit(cx, cy - 6, 12, { col: ['#8cc8f0', '#d8f1ff', '#5aa9e8'], speed: 40, life: .5, grav: 140, angle: Math.PI / 2, spread: 2.4 });
    } };
  }
  return { ...base, label: `${ic(p.crop)} ${it.name} arrosé — prêt dans ${fmt(left)}` };
}
function animalTarget(i) {
  const a = S.animals[i], A = ANIMALS[a.type], base = { animal: a };
  if (a.state === 'hungry') return { ...base, label: `Nourrir (${A.foodQty}×${ic(A.food)}, stock ${have(A.food)})`, fn: () => {
    if (have(A.food) < A.foodQty) return toast(`${A.icon} Il faut ${A.foodQty}× ${ITEMS[A.food].name}`);
    addItem(A.food, -A.foodQty); track('feed', a.type); a.state = 'working'; a.progress = 0;
    emit(a.x * TILE, a.y * TILE - 6, 8, { col: ['#ff6b8b', '#ff9fb5'], speed: 25, life: .7, grav: -20, kind: 'heart' });
  } };
  if (a.state === 'ready') return { ...base, label: `Ramasser ${ic(A.product)} ${ITEMS[A.product].name}`, fn: () => {
    addItem(A.product, 1); track('collect', A.product); addXp(A.xp); a.state = 'hungry'; a.progress = 0;
    floatText('+1', a.x, a.y - 1, A.product);
    emit(a.x * TILE, a.y * TILE - 8, 8, { col: ['#ffe082', '#ffffff'], speed: 35, life: .5, grav: 40, kind: 'spark' });
  } };
  return { ...base, label: `${A.name} — ${ic(A.product)} dans ${fmt((1 - a.progress) * A.time)}` };
}
function buildingTarget(b) {
  const base = { building: b };
  switch (b.id) {
    case 'house': return { ...base, label: isNight() ? '🛏️ Dormir jusqu\'au matin' : '🏠 Sauvegarder la partie', fn: sleep };
    case 'market': return { ...base, label: '🛒 Marché de Margot', fn: () => openPanel('market') };
    case 'workshop': return { ...base, label: '🏭 Atelier d\'Hugo (constructions, machines)', fn: () => openPanel('hugo') };
    case 'coop': return { ...base, label: '🐾 Animalerie', fn: () => openPanel('coop') };
    case 'board': return { ...base, label: '📋 Tableau des commandes', fn: () => openPanel('orders') };
    case 'cottB': return { ...base, label: '👕 Mercerie de Lucie (vêtements)', fn: () => openPanel('wardrobe') };
    case 'mairie': return { ...base, label: '🏛️ Mairie — embaucher pour la ferme', fn: () => openPanel('home', 'mairie') };
    case 'cabin': case 'hut': case 'minehut': return { ...base, label: `${HOMES[b.id].icon} ${HOMES[b.id].name}`, fn: () => openPanel('home', b.id) };
    case 'cave': return { ...base, label: '⛏️ Descendre dans la mine', fn: () => { teleport(90, 43.8, 'down'); track('enterMine'); } };
    case 'ladder': return { ...base, label: '🪜 Remonter à la surface', fn: () => teleport(70.5, 10.7, 'down') };
  }
  if (b.ws) return S.workshops[b.ws] ? { ...base, label: `${WORKSHOPS[b.ws].icon} ${WORKSHOPS[b.ws].name}`, fn: () => openPanel('ws', b.ws) } : { ...base, label: `🏗️ Chantier : ${WORKSHOPS[b.ws].name} (à commander chez Hugo)`, fn: () => openPanel('hugo') };
  return null;
}
function interact() {
  if (titleOpen) return;
  if (dlg.cur) { advanceDialog(); return; }
  if (panel) return;
  const P = S.player;
  if (P.fish) { if (P.fish.state === 'bite') catchFish(); else { P.fish = null; toast('🐟 Trop tôt ! Le poisson s\'enfuit.'); } return; }
  const t = getTarget();
  if (t && t.fn) t.fn();
}
const hour = () => S.time / 60;
const isNight = () => hour() >= 19 || hour() < 6;
function sleep() {
  if (isNight()) {
    const skip = ((24 * 60 - S.time + 6 * 60) % (24 * 60));
    S.time = 6 * 60; S.water = waterMax(); track('sleep');
    catchUp(Math.min(240, skip / 2));
    newDay();
  } else toast('💾 Partie sauvegardée. (Tu pourras dormir après 19h.)');
  save();
}

// ---- Souris ----
const REACH = 1.9;
const mouse = { x: 0, y: 0, inside: false, t: -1e9, down: false, lastTile: null };
let cam = { x: 0, y: 0 };
const mouseActive = () => mouse.inside && performance.now() - mouse.t < 4000;
function mouseWorld() { return { x: (mouse.x / (zoom * PX) + cam.x) / TILE, y: (mouse.y / (zoom * PX) + cam.y) / TILE }; }
const buildingRoofAt = (wx, wy) => BUILDINGS.find(b => wx >= b.x && wx < b.x + b.w && wy >= b.y - b.top / TILE && wy < b.y);
function targetAtWorld(wx, wy) {
  const P = S.player;
  let t = null, cx, cy, dist;
  let bn = -1, bd = .75;
  NPCS.forEach((n, i) => { const d = Math.hypot(n.x - wx, n.y - .6 - wy); if (d < bd) { bd = d; bn = i; } });
  let wk = null; for (const w of hiredWorkers()) { const r = WRT[w]; if (Math.hypot(r.x - wx, r.y - .6 - wy) < .7) wk = w; }
  if (bn >= 0) { const n = NPCS[bn]; t = npcTarget(n); cx = n.x; cy = n.y; dist = Math.hypot(cx - P.x, cy - P.y); }
  else if (wk) { const r = WRT[wk]; t = workerTarget(wk); cx = r.x; cy = r.y; dist = Math.hypot(cx - P.x, cy - P.y); }
  else {
    let best = -1; bd = .7;
    S.animals.forEach((a, i) => { const d = Math.hypot(a.x - wx, a.y - .35 - wy); if (d < bd) { bd = d; best = i; } });
    if (best >= 0) { const a = S.animals[best]; t = animalTarget(best); cx = a.x; cy = a.y; dist = Math.hypot(cx - P.x, cy - P.y); }
    else {
      const tx = Math.floor(wx), ty = Math.floor(wy);
      const rb = !buildingAt(tx, ty) && buildingRoofAt(wx, wy);
      t = rb ? buildingTarget(rb) : tileTarget(tx, ty);
      if (!t) return null;
      const b = t.building, g = t.gate ? GATES[t.gate] : null, R = b || g;
      if (R) { cx = Math.max(R.x, Math.min(R.x + R.w, P.x)); cy = Math.max(R.y, Math.min(R.y + R.h, P.y)); dist = Math.hypot(cx - P.x, cy - P.y) + .45; }
      else { cx = tx + .5; cy = ty + .5; dist = Math.hypot(cx - P.x, cy - P.y); }
    }
  }
  if (!t) return null;
  t.far = dist > REACH; t.viaMouse = true; t.cx = cx; t.cy = cy;
  return t;
}
function faceTowards(t) {
  const P = S.player, dx = t.cx - P.x, dy = t.cy - P.y;
  if (Math.abs(dx) > Math.abs(dy)) P.dir = dx < 0 ? 'left' : 'right'; else P.dir = dy < 0 ? 'up' : 'down';
}
function mouseAction(first) {
  if (titleOpen || panel) return;
  if (dlg.cur) { if (first) advanceDialog(); return; }
  const P = S.player;
  if (P.fish && first) { interact(); return; }
  const w = mouseWorld(), key = Math.floor(w.x) + ',' + Math.floor(w.y);
  if (!first && key === mouse.lastTile) return;
  mouse.lastTile = key;
  const t = targetAtWorld(w.x, w.y);
  if (!t) { if (first) walkTo(w.x, w.y, null); return; }
  if (!first && !t.plot) return;
  if (t.far) { if (first) walkTo(w.x, w.y, t); return; }
  faceTowards(t);
  if (t.fn) t.fn();
}
// ---- Déplacement au clic (recherche de chemin) ----
function findPath(goals, limit = 9000) {
  const P = S.player, sx = Math.floor(P.x), sy = Math.floor(P.y), key = (x, y) => y * MW + x;
  const prev = new Map([[key(sx, sy), -1]]), q = [[sx, sy]];
  for (let qi = 0; qi < q.length && qi < limit; qi++) {
    const [x, y] = q[qi];
    if (goals.has(key(x, y))) { const path = []; let k = key(x, y); while (k !== -1) { path.unshift([k % MW + .5, Math.floor(k / MW) + .5]); k = prev.get(k); } path.shift(); return path; }
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx, ny = y + dy, k = key(nx, ny);
      if (prev.has(k) || solidAt(nx, ny)) continue;
      prev.set(k, key(x, y)); q.push([nx, ny]);
    }
  }
  return null;
}
function walkTo(wx, wy, t) {
  const P = S.player, goals = new Set();
  if (t) {
    const R = t.building || (t.gate ? GATES[t.gate] : null);
    for (let y = Math.floor(wy) - 5; y <= Math.floor(wy) + 5; y++) for (let x = Math.floor(wx) - 5; x <= Math.floor(wx) + 5; x++) {
      if (x < 0 || y < 0 || x >= MW || y >= MH || solidAt(x, y)) continue;
      const cx = x + .5, cy = y + .5;
      let d;
      if (R) { const qx = Math.max(R.x, Math.min(R.x + R.w, cx)), qy = Math.max(R.y, Math.min(R.y + R.h, cy)); d = Math.hypot(qx - cx, qy - cy) + .45; }
      else d = Math.hypot(t.cx - cx, t.cy - cy);
      if (d <= REACH - .25) goals.add(y * MW + x);
    }
  } else { const x = Math.floor(wx), y = Math.floor(wy); if (!solidAt(x, y)) goals.add(y * MW + x); }
  if (!goals.size) return;
  const path = findPath(goals);
  if (!path) { floatText('Pas de chemin !', P.x, P.y - 1.9); return; }
  P.fish = null;
  P.path = path.length ? path : null; P.goal = t ? { wx, wy, tries: 0 } : null;
  if (!P.path) arrive();
}
function arrive() {
  const P = S.player, g = P.goal; P.goal = null; if (!g) return;
  const t = targetAtWorld(g.wx, g.wy);
  if (!t) return;
  if (t.far) { if (t.animal && g.tries < 2) { walkTo(t.cx, t.cy, t); if (S.player.goal) S.player.goal.tries = g.tries + 1; } return; }
  faceTowards(t); if (t.fn) t.fn();
}

// ============================================================
//  AUTOMATISATION
// ============================================================
const mLevel = k => S.mLvl[k] || 1;
const machineOn = k => !!S.machines[k] && S.mOn[k] !== false;
const machinePeriod = k => MACHINES[k].periods ? MACHINES[k].periods[mLevel(k) - 1] / buffVal('machine') : 0;
const staffOf = id => { const st = S.staff[id]; if (st) { st.lvl = st.lvl || 1; st.xp = st.xp || 0; } return st; };
const hiredWorkers = () => Object.keys(WORKERS).filter(id => S.staff[id]);
const activeWorkers = () => hiredWorkers().filter(id => !S.staff[id].strike && (!WORKERS[id].need || S.gates[WORKERS[id].need]));
const sprinklerRows = () => Math.min(S.machines.arroseur || 0, Math.ceil(unlocked() / FIELD.w));
function machineAt(x, y) {
  if (x === FIELD.x + FIELD.w && y >= FIELD.y && y < FIELD.y + FIELD.h) { const row = FIELD.y + FIELD.h - 1 - y; if (row < (S.machines.arroseur || 0)) return 'arroseur'; }
  for (const [k, [mx, my]] of Object.entries(MACHINE_SPOTS)) if (S.machines[k] && Math.floor(mx) === x && Math.floor(my) === y) return k;
  return null;
}
function workerTarget(id) {
  const W = WORKERS[id], st = staffOf(id);
  return { worker: id, label: `💬 ${W.name} (${W.role}, niv. ${st.lvl})${st.strike ? ' — en grève !' : ''}`,
    fn: () => say(id, st.strike ? 'Pas de salaire, pas de travail ! Passe me payer à ' + HOMES[W.home].name + '.' : W.lines[Math.random() * W.lines.length | 0] + (st.xp >= staffXpNeed(st.lvl) && st.lvl < MAX_STAFF_LVL ? `\n\n(J'ai assez d'expérience pour une promotion ! Passe à ${HOMES[W.home].name}.)` : '')) };
}
function staffGain(id, n = 1) { const st = staffOf(id); if (st && st.lvl < MAX_STAFF_LVL) { const before = st.xp >= staffXpNeed(st.lvl); st.xp += n; if (!before && st.xp >= staffXpNeed(st.lvl)) toast(`⭐ ${WORKERS[id].name} peut être promu(e) ! (${HOMES[WORKERS[id].home].name})`); } }
// Actions élémentaires
function autoWaterPlot(i) { const p = S.plots[i]; if (p.crop && p.progress < 1 && !p.watered) { p.watered = true; track('water'); return true; } return false; }
function autoHarvestPlot(i) {
  const p = S.plots[i]; if (!p.crop || p.progress < 1) return false;
  const k = p.crop, q = lucky() ? 2 : 1; addItem(k, q); track('harvest', k, q); addXp(CROPS[k].xp); S.stats.harvested++;
  Object.assign(p, newPlot(), { last: k, plan: p.plan }); return k;
}
function autoReplant(i) {
  const p = S.plots[i], k = p.plan || p.last; if (p.crop || !k) return false;
  const c = CROPS[k]; if (S.level < c.lvl || S.coins < c.seed) return false;
  S.coins -= c.seed; track('plant', k); Object.assign(p, { crop: k, progress: 0, watered: S.weather === 'rain' }); return true;
}
function autoFeed(a) { const A = ANIMALS[a.type]; if (a.state !== 'hungry' || have(A.food) < A.foodQty) return false; addItem(A.food, -A.foodQty); track('feed', a.type); a.state = 'working'; a.progress = 0; return true; }
function autoCollect(a) { if (a.state !== 'ready') return false; const A = ANIMALS[a.type]; addItem(A.product, 1); track('collect', A.product); addXp(A.xp); a.state = 'hungry'; a.progress = 0; return true; }
function wsCollect(k, i) {
  const sl = S.workshops[k].slots[i]; if (!sl || !sl.ready) return null;
  const r = WORKSHOPS[k].recipes[sl.job]; addItem(r.out, 1); track('craft', r.out); addXp(r.xp);
  sl.last = sl.job; Object.assign(sl, { job: null, progress: 0, ready: false }); return r.out;
}
function wsStart(k, ri, i) {
  const w = S.workshops[k], r = WORKSHOPS[k].recipes[ri]; if (!w || !r || S.level < r.lvl || !hasAll(r.in)) return false;
  const sl = i != null ? w.slots[i] : w.slots.find(s => s.job == null); if (!sl || sl.job != null) return false;
  takeAll(r.in); Object.assign(sl, { job: ri, progress: 0, ready: false, last: ri }); return true;
}
const wsReady = w => w && w.slots.some(s => s.ready);
const wsBusy = w => w && w.slots.some(s => s.job != null && !s.ready);
function autoWorkshops() {
  let n = 0;
  for (const [k, w] of Object.entries(S.workshops)) w.slots.forEach((sl, i) => {
    if (sl.ready && wsCollect(k, i)) n++;
    if (sl.job == null && sl.last != null && wsStart(k, sl.last, i)) n++;
  });
  return n;
}
// Commandes
function deliverOrder(i) {
  const o = S.orders[i]; if (!o || o.wait || !hasAll(o.items)) return false;
  takeAll(o.items); S.coins += o.reward; S.stats.earned += o.reward; S.stats.delivered++; track('deliver'); addXp(o.xp); S.orders[i] = { wait: Date.now() + 20000 };
  return o.reward;
}
// Bonus (consommables, plats, bijoux)
let catchingUp = false;
function buffVal(type) {
  let v = type === 'luck' ? 0 : 1;
  const b = S.buffs && S.buffs[type];
  if (b && !catchingUp && b.until > Date.now()) v = type === 'luck' ? v + b.val : v * b.val;
  for (const j of (S.equip || [])) if (j && JEWELS[j] && JEWELS[j][type]) v = type === 'luck' ? v + JEWELS[j][type] : v * JEWELS[j][type];
  return v;
}
const lucky = () => Math.random() < buffVal('luck');
function useItem(k) {
  const U = USES[k]; if (!U || have(k) <= 0) return;
  addItem(k, -1);
  const cur = S.buffs[U.buff], now_ = Date.now();
  const val = cur && cur.until > now_ ? Math.max(cur.val, U.val) : U.val;
  S.buffs[U.buff] = { val, until: Math.max(cur && cur.until > now_ ? cur.until : 0, now_) + U.sec * 1000 };
  if (ITEMS[k].cat === 'conso') track('useConso', k); else track('eat', k);
  toast(`${BUFF_INFO[U.buff].icon} ${ITEMS[k].name} : ${BUFF_INFO[U.buff].name} ${U.buff === 'luck' ? '+' + Math.round(U.val * 100) + ' %' : '×' + U.val} pendant ${fmt(U.sec)}`, 'gold');
  emit(S.player.x * TILE, (S.player.y - 1) * TILE, 14, { col: ['#ffe082', '#ffffff', '#a5d66a'], speed: 30, life: .8, grav: -20, kind: 'spark' });
}
const jewelSlots = () => 2 + (Object.keys(S.ach).length >= ACH_SLOT3 ? 1 : 0);
function equipJewel(k) {
  if (!JEWELS[k] || have(k) <= 0) return;
  const i = S.equip.findIndex((e, j) => !e && j < jewelSlots()); if (i < 0) return toast('Tous tes emplacements de bijou sont pris.');
  addItem(k, -1); S.equip[i] = k; track('equip'); toast(`💍 ${ITEMS[k].name} équipé(e) !`, 'gold');
}
function unequip(i) { const k = S.equip[i]; if (!k) return; S.equip[i] = null; addItem(k, 1); }
// Cosmétiques
function farmerPal() { const p = { ...PAL.farmer }; for (const [slot, id] of Object.entries(S.cos.worn)) Object.assign(p, COSMETICS[slot][id].set); return p; }
function rebuildFarmer() {
  const pal = farmerPal();
  ['down', 'up', 'left', 'right'].forEach(d => SPR.npc.farmer[d] = [0, 1, 2, 3].map(f => humanSprite(d, f, pal)));
  SPR.portrait.farmer = toURL(portraitSprite(pal), 3);
}
// Jardins de biome
const gardenAt = (x, y) => { for (const [b, g] of Object.entries(GARDENS)) if (x >= g.x && x < g.x + g.w && y >= g.y && y < g.y + g.h) return { b, i: (y - g.y) * g.w + (x - g.x) }; return null; };
const gSel = b => S.gsel[b] && CROPS[S.gsel[b]] ? S.gsel[b] : GARDEN_CROPS[b][0];
function gardenTarget(b, i, tx, ty) {
  const p = S.gardens[b][i], base = { tx, ty }, cx = (tx + .5) * TILE, cy = (ty + .5) * TILE;
  if (!p.crop) {
    const k = gSel(b), c = CROPS[k], it = ITEMS[k];
    return { ...base, label: `Planter ${ic(k)} ${it.name} (🪙${c.seed}) · ${GARDENS[b].name}`, fn: () => {
      if (S.level < c.lvl) return toast(`🔒 ${it.name} : niveau ${c.lvl} requis`);
      if (S.coins < c.seed) return toast('🪙 Pas assez de pièces pour cette graine');
      S.coins -= c.seed; track('plant', k); Object.assign(p, { crop: k, progress: 0, watered: S.weather === 'rain' });
      emit(cx, cy + 4, 6, { col: ['#6e4a2c', '#8a5d3b'], speed: 25, life: .35, grav: 90 });
    } };
  }
  const it = ITEMS[p.crop];
  if (p.progress >= 1) return { ...base, label: `Récolter ${ic(p.crop)} ${it.name}`, fn: () => {
    const k = p.crop, q = lucky() ? 2 : 1; addItem(k, q); track('harvest', k, q); pushTimed('harvest', q); addXp(CROPS[k].xp); S.stats.harvested++;
    floatText('+' + q, tx + .5, ty, k); Object.assign(p, newPlot());
    emit(cx, cy, 10, { col: [it.col, '#4caf50', '#7bd06b'], speed: 50, life: .6, grav: 110 });
  } };
  const left = (1 - p.progress) * CROPS[p.crop].time / (p.watered ? WATER_BONUS : 1) / buffVal('growth');
  if (!p.watered) {
    if (S.water <= 0) return { ...base, label: '🪣 Arrosoir vide — remplis-le à un point d\'eau' };
    return { ...base, label: `Arroser ${ic(p.crop)} (💧${S.water}) — prêt dans ${fmt(left)}`, fn: () => { S.water--; p.watered = true; track('water'); emit(cx, cy - 6, 12, { col: ['#8cc8f0', '#d8f1ff', '#5aa9e8'], speed: 40, life: .5, grav: 140, angle: Math.PI / 2, spread: 2.4 }); } };
  }
  return { ...base, label: `${ic(p.crop)} ${it.name} arrosé — prêt dans ${fmt(left)}` };
}
// Exploits chronométrés
function pushTimed(key, n = 1) { const a = S.timed[key] = (S.timed[key] || []); const t = Date.now(); a.push([t, n]); while (a.length && t - a[0][0] > 60000) a.shift(); }
function timedCount(key, sec) { const a = S.timed[key] || [], t = Date.now(); return a.reduce((s, [tt, n]) => s + (t - tt <= sec * 1000 ? n : 0), 0); }
const achValue = A => A.timed ? timedCount(A.timed[0], A.timed[1]) : A.v();
function checkAchievements() {
  for (const A of ACHIEVEMENTS) {
    if (S.ach[A.id] || achValue(A) < A.n) continue;
    S.ach[A.id] = Date.now();
    if (A.r.coins) S.coins += A.r.coins;
    let extra = '';
    if (A.r.cos) { S.cos.owned[A.r.cos] = true; const [sl, id] = A.r.cos.split('.'); extra = ` · 🎁 ${COSMETICS[sl][id].name}`; }
    banner(A.t, '📖 Objectif accompli !');
    toast(`📖 ${A.t} : +${fmtN(A.r.coins || 0)} 🪙${extra}`, 'gold');
    if (Object.keys(S.ach).length === ACH_SLOT3) setTimeout(() => toast('💍 3e emplacement de bijou débloqué !', 'gold'), 1200);
  }
}
const plotIdx = () => Array.from({ length: unlocked() }, (_, i) => i);
function rate(key, period, dt) { const A = S.autoAcc; A[key] = (A[key] || 0) + dt; const n = Math.floor(A[key] / period); A[key] -= n * period; return n; }
function sprinklerTick() { const rows = machineOn('arroseur') ? sprinklerRows() : 0; for (let i = 0; i < Math.min(unlocked(), rows * FIELD.w); i++) autoWaterPlot(i); }
function produce(id, n, offline) {
  const W = WORKERS[id], got = {};
  for (let j = 0; j < n; j++) { let r = Math.random(), item = W.prod[0][0]; for (const [it, w] of W.prod) { if (r < w) { item = it; break; } r -= w; } if (item === 'saumon' && S.level < 6) item = 'poisson'; got[item] = (got[item] || 0) + 1; }
  for (const [it, q] of Object.entries(got)) { addItem(it, q); track('gather', it, q); if (it === 'poisson' || it === 'saumon') { track('fish', null, q); S.stats.fish += q; } addXp(q); staffGain(id, q);
    if (!offline) { const r = wrt(id); if (Math.hypot(S.player.x - r.x, S.player.y - r.y) < 10) floatText(`+${q}`, r.x, r.y - 1.4, it); } }
}
function autoStep(dt, offline) {
  sprinklerTick();
  if (machineOn('moissonneuse')) { let n = rate('moiss', machinePeriod('moissonneuse'), dt); for (const i of plotIdx()) { if (n <= 0) break; const k = autoHarvestPlot(i); if (k) { n--; if (!offline) { const [tx, ty] = plotTile(i); emit((tx + .5) * TILE, (ty + .5) * TILE, 8, { col: [ITEMS[k].col, '#e8c55a'], speed: 40, life: .5, grav: 90 }); } } } }
  if (machineOn('semoir')) { let n = rate('semoir', machinePeriod('semoir'), dt); for (const i of plotIdx()) { if (n <= 0) break; if (autoReplant(i)) n--; } }
  if (machineOn('mangeoire')) { let n = rate('mang', machinePeriod('mangeoire'), dt); for (const a of S.animals) { if (n <= 0) break; if (autoFeed(a)) n--; } }
  if (machineOn('collecteur')) { let n = rate('coll', machinePeriod('collecteur'), dt); for (const a of S.animals) { if (n <= 0) break; if (autoCollect(a)) n--; } }
  if (machineOn('chaine') && rate('chaine', machinePeriod('chaine'), dt)) autoWorkshops();
  for (const id of activeWorkers()) {
    const W = WORKERS[id], L = staffOf(id).lvl;
    if (W.prod) { const n = rate('w_' + id, W.period / staffSpeed(L), dt); if (n) produce(id, n, offline); }
    else if (W.zone === 'workshop') { if (rate('w_' + id, W.period / staffSpeed(L), dt)) { const n = autoWorkshops(); if (n) staffGain(id, n); } }
    else if (W.zone === 'village') { const n = rate('w_' + id, W.period / staffSpeed(L), dt); for (let j = 0; j < n; j++) { const i = S.orders.findIndex(o => !o.wait && hasAll(o.items)); if (i < 0) break; const g = deliverOrder(i); if (g) { staffGain(id); if (!offline) toast(`📦 Félix a livré une commande : +${fmtN(g)} 🪙`); } } }
    else if (offline) {
      const cap = Math.max(1, Math.round(dt * staffSpeed(L) / 2.2)); let n = 0;
      if (id === 'paul') for (const i of plotIdx()) { if (n >= cap) break; if (autoWaterPlot(i)) n++; }
      if (id === 'lea') for (const i of plotIdx()) { if (n >= cap) break; const k = autoHarvestPlot(i); if (k) n++; if (autoReplant(i)) n++; }
      if (id === 'tom') for (const a of S.animals.filter(a => !ANIMALS[a.type].pen)) { if (n >= cap) break; if (autoCollect(a)) n++; if (autoFeed(a)) n++; }
      if (n) staffGain(id, n);
    }
  }
}
function catchUp(sec) { const step = 5; let t = sec; catchingUp = true; try { while (t > 0) { const d = Math.min(step, t); simulate(d); autoStep(d, true); t -= d; } } finally { catchingUp = false; } }
// Salaires
const wageOf = id => staffWage(WORKERS[id], staffOf(id).lvl);
function wagesTotal() { return hiredWorkers().reduce((s, id) => s + wageOf(id), 0); }
function payWages() {
  const ids = hiredWorkers(); if (!ids.length) return;
  const total = wagesTotal();
  if (S.coins >= total) { S.coins -= total; ids.forEach(id => S.staff[id].strike = false); setTimeout(() => toast(`👷 Salaires payés : −${fmtN(total)} 🪙`), 900); }
  else { ids.forEach(id => S.staff[id].strike = true); setTimeout(() => toast(`⚠️ Pas assez d'argent pour les salaires (${fmtN(total)} 🪙) : tes employés font grève !`), 900); }
}
// Employés visibles
const WRT = {};
function wrt(id) {
  if (!WRT[id]) { const [x, y] = ZONE_HOME[WORKERS[id].zone]; WRT[id] = { x: x + (Math.random() - .5), y, tx: x, ty: y, dir: 'down', moving: false, task: null, work: 0, wait: 0 }; }
  return WRT[id];
}
function findTask(id, r) {
  let best = null, bd = 1e9;
  const consider = (x, y, task) => { const d = Math.hypot(x - r.x, y - r.y); if (d < bd) { bd = d; best = { x, y, ...task }; } };
  if (id === 'paul') plotIdx().forEach(i => { const p = S.plots[i]; if (p.crop && p.progress < 1 && !p.watered) { const [tx, ty] = plotTile(i); consider(tx + .5, ty + .55, { i }); } });
  if (id === 'lea') plotIdx().forEach(i => { const p = S.plots[i], [tx, ty] = plotTile(i), k = p.plan || p.last; if ((p.crop && p.progress >= 1) || (!p.crop && k && S.coins >= CROPS[k].seed && S.level >= CROPS[k].lvl)) consider(tx + .5, ty + .55, { i }); });
  if (id === 'tom') S.animals.filter(a => !ANIMALS[a.type].pen).forEach(a => { if (a.state === 'ready' || (a.state === 'hungry' && have(ANIMALS[a.type].food) >= ANIMALS[a.type].foodQty)) consider(a.x, a.y + .3, { a }); });
  return best;
}
function doTask(id, t) {
  let ok = false;
  if (id === 'paul' && t.i != null && autoWaterPlot(t.i)) { ok = true; const [tx, ty] = plotTile(t.i); emit((tx + .5) * TILE, (ty + .3) * TILE, 10, { col: ['#8cc8f0', '#d8f1ff'], speed: 35, life: .5, grav: 140, angle: Math.PI / 2, spread: 2.4 }); }
  if (id === 'lea' && t.i != null) { const k = autoHarvestPlot(t.i), [tx, ty] = plotTile(t.i); if (k) { ok = true; emit((tx + .5) * TILE, (ty + .5) * TILE, 8, { col: [ITEMS[k].col, '#7bd06b'], speed: 40, life: .5, grav: 100 }); } if (autoReplant(t.i)) ok = true; }
  if (id === 'tom' && t.a) { if (autoCollect(t.a) || autoFeed(t.a)) { ok = true; emit(t.a.x * TILE, t.a.y * TILE - 6, 6, { col: ['#ff6b8b', '#ffe082'], speed: 25, life: .6, grav: -20, kind: 'heart' }); } }
  if (ok) staffGain(id);
}
function updateWorkers(dt) {
  const act = new Set(activeWorkers());
  for (const id of hiredWorkers()) {
    const r = wrt(id), W = WORKERS[id], L = staffOf(id).lvl, strike = !act.has(id), sp = staffSpeed(L);
    r.moving = false;
    const wander = W.prod || W.zone === 'workshop' || W.zone === 'village' || strike;
    if (wander) {
      r.wait -= dt;
      if (r.wait <= 0) { const [hx, hy] = ZONE_HOME[W.zone], spread = W.zone === 'workshop' ? 1.5 : W.zone === 'mine' ? 0 : 6; r.tx = hx + (Math.random() - .5) * spread; r.ty = W.zone === 'mine' ? 6 + Math.random() * 36 : hy + (Math.random() - .5) * .6; r.wait = 2 + Math.random() * 3; if (W.zone === 'mine') r.tx = 89.5 + (Math.random() < .5 ? 0 : 1); }
    } else if (!r.task) {
      r.task = findTask(id, r);
      if (r.task) { r.tx = r.task.x; r.ty = r.task.y; r.work = 0; }
      else { r.wait -= dt; if (r.wait <= 0) { const [hx, hy] = ZONE_HOME[W.zone]; r.tx = hx + (Math.random() - .5) * 2; r.ty = hy + (Math.random() - .5) * .5; r.wait = 3 + Math.random() * 3; } }
    }
    if (r.task && r.task.a) { r.tx = r.task.a.x; r.ty = r.task.a.y + .3; }
    const dx = r.tx - r.x, dy = r.ty - r.y, d = Math.hypot(dx, dy);
    if (d > .08) {
      const v = Math.min(d, (strike ? 1 : 1.5 * sp) * dt); r.x += dx / d * v; r.y += dy / d * v; r.moving = true;
      r.dir = Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? 'left' : 'right') : (dy < 0 ? 'up' : 'down');
    } else if (r.task) {
      r.dir = 'up'; r.work += dt;
      if (r.work > 1.3 / sp) { doTask(id, r.task); r.task = null; }
    }
  }
}
// ============================================================
//  DÉFIS DE NIVEAU
// ============================================================
function genLevelQuests() {
  const L = S.level, list = (LEVEL_QUESTS[L] || []).map(([t, ev, k, n]) => ({ t, ev, k, n, base: cnt(ev, k), done: false, r: { coins: 30 * L + 20, xp: 4 * L } }));
  S.lq = { lvl: L, list, bonus: false };
}
function checkLevelQuests() {
  if (!S.lq || S.lq.lvl !== S.level) { const had = !!S.lq; genLevelQuests(); if (had && S.lq.list.length) setTimeout(() => toast(`⭐ Nouveaux défis du niveau ${S.level} !`, 'gold'), 1500); }
  for (const q of S.lq.list) if (!q.done && cnt(q.ev, q.k) - q.base >= q.n) { q.done = true; giveReward(q.r); toast(`⭐ Défi réussi : ${q.t}  ${rewardText(q.r)}`, 'gold'); }
  if (S.lq.list.length && !S.lq.bonus && S.lq.list.every(q => q.done)) { S.lq.bonus = true; const b = 100 * S.level; S.coins += b; toast(`🏅 Tous les défis du niveau ${S.level} ! +${fmtN(b)} 🪙`, 'gold'); }
}
