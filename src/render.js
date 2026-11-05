// ============================================================
//  RENDU
// ============================================================
const canvas = $('#game'), ctx = canvas.getContext('2d');
const light = document.createElement('canvas'), lctx = light.getContext('2d');
let dpr = 1, zoom = 1, zoomTarget = 1, vw = 0, vh = 0, now = 0, sc = 3;
function resize() {
  dpr = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
  light.width = canvas.width; light.height = canvas.height;
}
addEventListener('resize', resize);
function setZoom(z) { zoomTarget = Math.max(.5, Math.min(2.4, z)); S.zoom = zoomTarget; }
const LIGHTS = [];
BUILDINGS.forEach(b => { const s = SPR[b.spr], ox = b.x * TILE + Math.round((b.w * TILE - s.width) / 2), oy = b.y * TILE - b.top; b.lights.forEach(([x, y, w, h]) => LIGHTS.push({ x: ox + x, y: oy + y, w, h, lamp: b.lamp, ws: b.ws })); });
const lightOn = w => !w.ws || S.workshops[w.ws];

function darkness() {
  if (inMine()) return .86;
  const h = hour();
  if (h >= 7 && h < 18) return 0;
  if (h >= 18 && h < 21) return (h - 18) / 3 * .62;
  if (h >= 5 && h < 7) return (7 - h) / 2 * .62;
  return .62;
}
function shadow(x, y, rx, ry, a = .22) { ctx.fillStyle = `rgba(20,30,10,${a})`; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 7); ctx.fill(); }
function bubble(x, y, iconKey, gold) {
  x = Math.round(x); y = Math.round(y);
  ctx.fillStyle = OUTLINE; ctx.fillRect(x - 9, y - 18, 18, 15); ctx.fillRect(x - 8, y - 19, 16, 17);
  ctx.fillStyle = gold ? '#fff3c4' : '#fffdf6'; ctx.fillRect(x - 8, y - 18, 16, 15); ctx.fillRect(x - 9, y - 17, 18, 13);
  ctx.fillStyle = OUTLINE; ctx.fillRect(x - 2, y - 3, 5, 1); ctx.fillRect(x - 1, y - 2, 3, 1); ctx.fillRect(x, y - 1, 1, 1);
  ctx.fillStyle = gold ? '#fff3c4' : '#fffdf6'; ctx.fillRect(x - 1, y - 3, 3, 1); ctx.fillRect(x, y - 2, 1, 1);
  if (gold) { ctx.fillStyle = '#f9a825'; ctx.fillRect(x - 8, y - 4, 16, 1); }
  ctx.drawImage(SPR.icons[iconKey], x - 6, y - 17, 12, 12);
}
function bubbleText(x, y, ch, col = '#ffd54f') {
  x = Math.round(x); y = Math.round(y);
  ctx.fillStyle = OUTLINE; ctx.fillRect(x - 5, y - 12, 10, 10); ctx.fillRect(x - 4, y - 13, 8, 12);
  ctx.fillStyle = col; ctx.fillRect(x - 4, y - 12, 8, 10); ctx.fillRect(x - 5, y - 11, 10, 8);
  ctx.fillStyle = OUTLINE; ctx.font = 'bold 8px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(ch, x, y - 6.5);
}
function miniBar(x, y, w, p) {
  x = Math.round(x - w / 2); y = Math.round(y);
  ctx.fillStyle = OUTLINE; ctx.fillRect(x - 1, y - 1, w + 2, 4);
  ctx.fillStyle = '#5a4630'; ctx.fillRect(x, y, w, 2);
  ctx.fillStyle = '#ffd54f'; ctx.fillRect(x, y, Math.round(w * p), 2);
  ctx.fillStyle = '#fff3b0'; ctx.fillRect(x, y, Math.round(w * p), 1);
}
function brackets(x, y, w, h, col) {
  const o = Math.round(Math.sin(now / 160) + 1), L = 4;
  ctx.fillStyle = col;
  [[x - o, y - o, 1, 1], [x + w + o - 1, y - o, -1, 1], [x - o, y + h + o - 1, 1, -1], [x + w + o - 1, y + h + o - 1, -1, -1]].forEach(([cx, cy, sx, sy]) => {
    ctx.fillRect(sx > 0 ? cx : cx - L + 1, cy, L, 1); ctx.fillRect(cx, sy > 0 ? cy : cy - L + 1, 1, L);
    ctx.fillRect(sx > 0 ? cx : cx - L + 1, cy + sy, L, 1); ctx.fillRect(cx + sx, sy > 0 ? cy : cy - L + 1, 1, L);
  });
}
function label(text, cx, y, bg = 'rgba(42,29,20,.85)') {
  ctx.font = 'bold 6px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const w = Math.ceil(ctx.measureText(text).width) + 8, x = Math.round(cx - w / 2); y = Math.round(y);
  ctx.fillStyle = bg; ctx.fillRect(x + 1, y - 4, w - 2, 9); ctx.fillRect(x, y - 3, w, 7);
  ctx.fillStyle = '#fff8e7'; ctx.fillText(text, cx, y + .5);
}
function drawHuman(id, x, y, dir, f) { ctx.drawImage(SPR.npc[id][dir][f], Math.round(x * TILE) - 8, Math.round(y * TILE) - 23); }

function draw(target) {
  const P = S.player;
  sc = dpr * zoom * PX; vw = canvas.width / sc; vh = canvas.height / sc;
  const RX0 = inMine() ? 80 * TILE : 0, W = (inMine() ? 20 : VW_TILES) * TILE, H = (inMine() ? 48 : MH) * TILE;
  let camX = RX0 + (W < vw ? (W - vw) / 2 : Math.max(0, Math.min(W - vw, P.x * TILE - RX0 - vw / 2)));
  let camY = H < vh ? (H - vh) / 2 : Math.max(0, Math.min(H - vh, P.y * TILE - vh / 2));
  camX = Math.round(camX * sc) / sc; camY = Math.round(camY * sc) / sc;
  cam.x = camX; cam.y = camY;
  ctx.setTransform(sc, 0, 0, sc, -camX * sc, -camY * sc);
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = '#1e3a1a'; ctx.fillRect(camX, camY, vw, vh);
  ctx.drawImage(ground, 0, 0);
  const x0 = Math.max(0, Math.floor(camX / TILE) - 1), x1 = Math.min(MW, Math.ceil((camX + vw) / TILE) + 1);
  const y0 = Math.max(0, Math.floor(camY / TILE) - 1), y1 = Math.min(MH, Math.ceil((camY + vh) / TILE) + 3);
  const inView = (x, y) => x >= x0 - 2 && x <= x1 + 2 && y >= y0 - 2 && y <= y1 + 2;

  // Eau animée
  for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) if (map[y][x] === T.WATER) {
    const h = hash(x, y);
    for (let k = 0; k < 2; k++) {
      const ph = now / 700 + (h >> (k * 4)) % 10;
      ctx.fillStyle = Math.sin(ph * 1.3) > 0 ? '#8fd0ff' : '#6bb8f0';
      ctx.fillRect(x * TILE + 2 + ((h >> (k * 3)) % 9) + Math.round(Math.sin(ph) * 2), y * TILE + 3 + ((h >> (k * 5 + 2)) % 10), 3, 1);
    }
    if (((h + Math.floor(now / 400)) % 23) === 0) { ctx.fillStyle = '#fff'; ctx.fillRect(x * TILE + h % 12 + 2, y * TILE + (h >> 4) % 12 + 2, 1, 1); }
  }
  // Parcelles
  for (let i = 0; i < MAX_PLOTS; i++) {
    const [tx, ty] = plotTile(i); if (!inView(tx, ty)) continue;
    if (i >= unlocked()) { ctx.drawImage(SPR.weeds[hash(tx, ty) % 3], tx * TILE, ty * TILE); continue; }
    const p = S.plots[i]; ctx.drawImage(p.crop && p.watered ? SPR.soilWet : SPR.soilDry, tx * TILE, ty * TILE);
    if (!p.crop && p.plan) { ctx.globalAlpha = .5 + Math.sin(now / 500 + i) * .15; ctx.drawImage(SPR.icons[p.plan], tx * TILE + 3, ty * TILE + 3, 10, 10); ctx.globalAlpha = 1; }
  }
  // Jardins de biome
  for (const [b, g] of Object.entries(GARDENS)) { if (!inView(g.x, g.y)) continue; S.gardens[b].forEach((p, i) => { const tx = g.x + i % g.w, ty = g.y + Math.floor(i / g.w); ctx.drawImage(p.crop && p.watered ? SPR.soilWet : SPR.soilDry, tx * TILE, ty * TILE); }); }
  // Ressources au sol (non solides, dessinées à plat)
  for (const n of NODES) {
    if (!inView(n.x, n.y) || NODE_INFO[n.kind].solid) continue;
    if (!nodeAvail(n)) continue;
    const s = SPR.node[n.kind][n.id % SPR.node[n.kind].length], bob = n.kind === 'coquillage' ? 0 : 0;
    ctx.drawImage(s, n.x * TILE + Math.round((16 - s.width) / 2), (n.y + 1) * TILE - s.height - 1 + bob);
    if ((hash(n.id, Math.floor(now / 700)) % 13) === 0) { ctx.fillStyle = '#fff6a0'; ctx.fillRect(n.x * TILE + 4 + n.id % 8, n.y * TILE + 4, 1, 1); }
  }
  // Ligne de pêche
  if (P.fish) {
    const F = P.fish, bx = (F.tx + .5) * TILE, by = (F.ty + .5) * TILE + (F.state === 'bite' ? 2 : Math.round(Math.sin(now / 300)));
    const hx = P.x * TILE + DIRS[P.dir][0] * 6, hy = (P.y - .5) * TILE + DIRS[P.dir][1] * 4;
    ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = .5; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.quadraticCurveTo((hx + bx) / 2, Math.max(hy, by) + 6, bx, by); ctx.stroke();
    ctx.fillStyle = '#e53935'; ctx.fillRect(Math.round(bx) - 1, Math.round(by) - 2, 3, 2); ctx.fillStyle = '#fff'; ctx.fillRect(Math.round(bx) - 1, Math.round(by), 3, 1);
    if ((now / 500 | 0) % 2) { ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.beginPath(); ctx.ellipse(bx, by + 1, 4 + (now / 100 % 3), 1.5, 0, 0, 7); ctx.stroke(); }
  }
  // Cadre de la cible
  const hl = target && target.far ? '#ff5252' : '#ffffff';
  if (target) {
    if (target.building) { const b = target.building; brackets(b.x * TILE, b.y * TILE - b.top, b.w * TILE, b.h * TILE + b.top, hl); }
    else if (target.gate) { const g = GATES[target.gate]; brackets(g.x * TILE, g.y * TILE, g.w * TILE, g.h * TILE, hl); }
    else if (target.tx != null) brackets(target.tx * TILE, target.ty * TILE, TILE, TILE, hl);
  }

  // ---------- Entités triées par profondeur ----------
  const ents = [];
  for (const d of DECOR) if (inView(d.x, d.y)) ents.push({ y: (d.y + 1) * TILE - (d.kind === 'tall' ? 4 : 1), d });
  for (const b of BUILDINGS) if (inView(b.x, b.y) || inView(b.x + b.w, b.y + b.h)) ents.push({ y: (b.y + b.h) * TILE, b });
  for (const n of NODES) if (NODE_INFO[n.kind].solid && inView(n.x, n.y)) ents.push({ y: (n.y + 1) * TILE - 1, n });
  for (const [id, g] of Object.entries(GATES)) if (!S.gates[id]) ents.push({ y: (g.y + g.h) * TILE - (id === 'pont' ? 40 : 1), gate: id });
  for (let i = 0; i < unlocked(); i++) { const p = S.plots[i]; if (p.crop) { const [tx, ty] = plotTile(i); if (inView(tx, ty)) ents.push({ y: (ty + 1) * TILE - 2, crop: p, tx, ty, i }); } }
  for (const [b, g] of Object.entries(GARDENS)) if (inView(g.x, g.y)) S.gardens[b].forEach((p, i) => { if (p.crop) { const tx = g.x + i % g.w, ty = g.y + Math.floor(i / g.w); ents.push({ y: (ty + 1) * TILE - 2, crop: p, tx, ty, i: i + 100 }); } });
  for (const a of S.animals) if (inView(a.x, a.y)) ents.push({ y: a.y * TILE + 4, a });
  NPCS.forEach((n, i) => { if (inView(n.x, n.y)) ents.push({ y: (n.y + .2) * TILE, npc: n, i }); });
  for (let r = 0; r < (S.machines.arroseur || 0) && r < FIELD.h; r++) ents.push({ y: (FIELD.y + FIELD.h - r) * TILE - 1, spr: r });
  for (const k of Object.keys(MACHINE_SPOTS)) if (S.machines[k]) ents.push({ y: MACHINE_SPOTS[k][1] * TILE + 6, mach: k });
  for (const id of hiredWorkers()) { const r = wrt(id); if (inView(r.x, r.y)) ents.push({ y: (r.y + .2) * TILE, wk: id }); }
  ents.push({ y: (P.y + .2) * TILE, player: true });
  ents.sort((m, n) => m.y - n.y);

  for (const e of ents) {
    if (e.d && (e.d.kind === 'tree' || e.d.kind === 'snowpine' || e.d.kind === 'palm')) shadow((e.d.x + .5) * TILE, (e.d.y + 1) * TILE - 2, 9, 3, .25);
    else if (e.a) shadow(e.a.x * TILE, e.a.y * TILE + 4, e.a.type === 'poule' ? 5 : 9, 2);
    else if (e.player) shadow(P.x * TILE, (P.y + .2) * TILE, 6, 2);
    else if (e.npc) shadow(e.npc.x * TILE, (e.npc.y + .2) * TILE, 6, 2);
  }
  const wind = Math.sin(now / 1700) * .6 + Math.sin(now / 610) * .4;
  const cur = STORY[S.story];
  for (const e of ents) {
    if (e.d) {
      const d = e.d, bx = (d.x + .5) * TILE, by = (d.y + 1) * TILE;
      if (d.kind === 'tree' || d.kind === 'snowpine' || d.kind === 'palm') {
        const s = d.kind === 'snowpine' ? SPR.snowpine : d.kind === 'palm' ? SPR.palm : d.pine ? SPR.pine : SPR.oak[d.v];
        const sk = wind * (d.kind === 'palm' ? .04 : .025) + Math.sin(now / 900 + d.ph) * .012;
        ctx.save(); ctx.translate(bx, by - 1); ctx.transform(1, 0, -sk, 1, 0, 0); ctx.drawImage(s, -Math.floor(s.width / 2), -s.height); ctx.restore();
      } else if (d.kind === 'bush') ctx.drawImage(SPR.bush[d.v], bx - 10, by - 15);
      else if (d.kind === 'boulder') ctx.drawImage(SPR.boulder, bx - 8, by - 15);
      else {
        let sk = wind * .12 + Math.sin(now / 500 + d.ph) * .05;
        const pd = Math.hypot(P.x - (d.x + .5), P.y - (d.y + .6));
        if (pd < .8) sk += (P.x < d.x + .5 ? -1 : 1) * (.8 - pd) * .9;
        ctx.save(); ctx.translate(bx, by - 2); ctx.transform(1, 0, -sk, 1, 0, 0); ctx.drawImage(SPR.tall[d.v], -8, -12); ctx.restore();
      }
    } else if (e.b) {
      const b = e.b, s = b.ws && !S.workshops[b.ws] ? SPR.site : b.torch ? SPR.torchF[Math.floor(now / 150 + b.x) % 2] : SPR[b.spr];
      ctx.drawImage(s, b.x * TILE + Math.round((b.w * TILE - s.width) / 2), b.y * TILE - b.top);
    } else if (e.n) {
      const n = e.n, I = NODE_INFO[n.kind], av = nodeAvail(n);
      let s = av ? SPR.node[n.kind][0] : (n.kind === 'baie' ? SPR.node.baieEmpty : SPR.node.rubble);
      const shake = nodeShake[n.id] > 0 ? Math.round(Math.sin(now / 20) * 1.5) : 0;
      ctx.drawImage(s, n.x * TILE + Math.round((16 - s.width) / 2) + shake, (n.y + 1) * TILE - s.height - (av || n.kind === 'baie' ? 0 : 2));
      if (av && I.hp && nodeHp[n.id] != null) miniBar(n.x * TILE + 8, n.y * TILE - 2, 10, nodeHp[n.id] / I.hp);
    } else if (e.gate) {
      const g = GATES[e.gate];
      ctx.drawImage(SPR.gate[e.gate], g.x * TILE, g.y * TILE);
      const ok = S.level >= g.req.lvl;
      label(ok ? `🔧 ${g.name}` : `🔒 Niveau ${g.req.lvl}`, (g.x + 1) * TILE, g.y * TILE - 6, ok ? 'rgba(46,125,50,.9)' : 'rgba(42,29,20,.85)');
    } else if (e.crop) {
      const p = e.crop, ready = p.progress >= 1, stage = ready ? 3 : p.progress < .25 ? 0 : p.progress < .6 ? 1 : 2;
      const bx = e.tx * TILE, by = (e.ty + 1) * TILE;
      if (ready) {
        const sk = Math.sin(now / 400 + e.i) * .04;
        ctx.save(); ctx.translate(bx + 8, by - 1); ctx.transform(1, 0, -sk, 1, 0, 0); ctx.drawImage(SPR.crops[p.crop][3], -8, -24); ctx.restore();
        if (Math.random() < .02) emit(bx + 3 + Math.random() * 10, by - 6 - Math.random() * 12, 1, { col: ['#fff6a0', '#ffffff'], speed: 4, life: .7, grav: -6, kind: 'spark', jitter: 0 });
      } else {
        ctx.drawImage(SPR.crops[p.crop][stage], bx, by - 25);
        miniBar(bx + 8, by - 4, 10, p.progress);
        if (!p.watered) { ctx.globalAlpha = .5 + Math.sin(now / 300) * .5; ctx.fillStyle = '#5aa9e8'; ctx.fillRect(bx + 2, by - 14, 2, 3); ctx.fillRect(bx + 1, by - 13, 4, 2); ctx.fillStyle = '#d8f1ff'; ctx.fillRect(bx + 2, by - 13, 1, 1); ctx.globalAlpha = 1; }
      }
    } else if (e.a) {
      const a = e.a, A = ANIMALS[a.type], key = ANIM_SPR[a.type];
      const fr = a.moving ? Math.floor(now / 160) % 2 : 0, s = (a.flip ? SPR[key + 'R'] : SPR[key])[fr];
      const hop = a.moving && a.type === 'poule' ? Math.round(Math.abs(Math.sin(now / 110 + a.x)) * 2) : 0;
      const ax = Math.round(a.x * TILE), ay = Math.round(a.y * TILE + 5);
      if (target && target.animal === a) brackets(ax - s.width / 2 - 1, ay - s.height - 1, s.width + 2, s.height + 2, hl);
      ctx.drawImage(s, ax - Math.floor(s.width / 2), ay - s.height - hop);
      const top = ay - s.height - hop - 2;
      if (a.state === 'hungry') bubble(ax, top, A.food, false);
      else if (a.state === 'ready') bubble(ax, top + Math.round(Math.sin(now / 250)), A.product, true);
      else miniBar(ax, top - 2, 12, a.progress);
    } else if (e.npc) {
      const n = e.npc, st = npcState[e.i];
      if (target && target.npc === n) brackets(n.x * TILE - 9, n.y * TILE - 22, 18, 26, hl);
      drawHuman(n.id, n.x, n.y + .2, st.dir, 0);
      if (cur && cur.npc === n.id) bubbleText(n.x * TILE, n.y * TILE - 20 + Math.round(Math.sin(now / 250) * 1.5), '!');
      else if (Math.hypot(P.x - n.x, P.y - n.y) < 3) label(n.name, n.x * TILE, n.y * TILE - 24);
    } else if (e.spr != null) {
      const on = machineOn('arroseur') && e.spr < sprinklerRows(), y = FIELD.y + FIELD.h - 1 - e.spr, x = FIELD.x + FIELD.w;
      ctx.drawImage(SPR.sprinkler[on ? Math.floor(now / 200) % 2 : 0], x * TILE + 3, y * TILE - 2);
      if (on && Math.random() < .25) emit(x * TILE + 4, y * TILE + 2, 2, { col: ['#8cc8f0', '#d8f1ff'], speed: 70 + Math.random() * 40, life: .9, grav: 80, angle: Math.PI + .5, spread: .7, jitter: 1 });
      if (target && target.tx === x && target.ty === y) brackets(x * TILE, y * TILE - 2, TILE, TILE + 2, hl);
    } else if (e.mach) {
      const k = e.mach, [mx, my] = MACHINE_SPOTS[k], on = machineOn(k);
      const s = k === 'moissonneuse' ? SPR.harvester : k === 'semoir' ? SPR.seeder : k === 'mangeoire' ? SPR.trough[on ? 1 : 0] : SPR.basket;
      const shake = on && (k === 'moissonneuse' || k === 'semoir') ? Math.round(Math.sin(now / 90)) * .5 : 0;
      ctx.drawImage(s, Math.round(mx * TILE - s.width / 2 + shake), Math.round(my * TILE + 8 - s.height));
      if (!on) label('OFF', mx * TILE, my * TILE - s.height + 2, 'rgba(160,30,30,.9)');
      if (target && target.tx === Math.floor(mx) && target.ty === Math.floor(my)) brackets(mx * TILE - s.width / 2 - 1, my * TILE + 7 - s.height, s.width + 2, s.height + 2, hl);
    } else if (e.wk) {
      const r = wrt(e.wk), st = S.staff[e.wk];
      if (target && target.worker === e.wk) brackets(r.x * TILE - 9, r.y * TILE - 22, 18, 26, hl);
      drawHuman(e.wk, r.x, r.y + .2, r.dir, r.moving ? Math.floor(now / 125) % 4 : 0);
      if (st.strike) bubbleText(r.x * TILE, r.y * TILE - 20, '✋', '#ff8a80');
      else if (r.task && !r.moving) bubbleText(r.x * TILE, r.y * TILE - 20 + Math.round(Math.sin(now / 120)), WORKERS[e.wk].zone === 'pen' ? '♥' : '…', '#c8f0c0');
      else if (Math.hypot(P.x - r.x, P.y - r.y) < 3) label(`${WORKERS[e.wk].name} · ${WORKERS[e.wk].role}`, r.x * TILE, r.y * TILE - 24);
    } else if (e.player) {
      const f = moving ? Math.floor(walkT * 8) % 4 : 0;
      drawHuman('farmer', P.x, P.y + .2, P.dir, f);
      if (P.fish && P.fish.state === 'bite') bubbleText(P.x * TILE, (P.y - 1.4) * TILE + Math.round(Math.sin(now / 60)), '!', '#ff8a65');
    }
  }
  const dk = darkness();
  if (dk < .3 && S.weather !== 'rain' && !inMine()) for (const f of flies) ctx.drawImage(SPR.fly[f.c][Math.floor(now / 90 + f.c) % 2], Math.round(f.x * TILE), Math.round(f.y * TILE));
  for (const b of BUILDINGS) { if (!inView(b.x, b.y) && !inView(b.x + b.w, b.y)) continue; if (b.ws) label(S.workshops[b.ws] ? WORKSHOPS[b.ws].name : '🏗️ ' + WORKSHOPS[b.ws].name, (b.x + b.w / 2) * TILE, b.y * TILE - b.top - 5, S.workshops[b.ws] ? undefined : 'rgba(120,90,30,.85)'); else if (b.name && b.id !== 'board') label(b.name, (b.x + b.w / 2) * TILE, b.y * TILE - b.top - 5); if (b.ws && wsReady(S.workshops[b.ws])) bubbleText((b.x + b.w / 2) * TILE + 18, b.y * TILE - b.top + 2 + Math.round(Math.sin(now / 250)), '✓'); }
  if (P.path && P.path.length) { const [gx, gy] = P.path[P.path.length - 1]; ctx.fillStyle = 'rgba(255,255,255,.8)'; const o = Math.round(Math.sin(now / 150) * 1.5); ctx.fillRect(gx * TILE - 3 - o, gy * TILE, 2, 1); ctx.fillRect(gx * TILE + 2 + o, gy * TILE, 2, 1); ctx.fillRect(gx * TILE, gy * TILE - 3 - o, 1, 2); ctx.fillRect(gx * TILE, gy * TILE + 2 + o, 1, 2); }
  if (machineOn('chaine')) { const b = BUILDINGS.find(b => b.id === 'workshop'); bubbleText((b.x + b.w / 2) * TILE - 22, b.y * TILE - b.top + 4, '⚙'); }
  if (S.orders.some(o => !o.wait && hasAll(o.items))) { const b = BUILDINGS.find(b => b.id === 'board'); bubbleText((b.x + .5) * TILE, b.y * TILE - b.top + Math.round(Math.sin(now / 250)), '!'); }

  // Particules
  for (const p of parts) {
    const a = 1 - p.life / p.max; ctx.globalAlpha = Math.max(0, a); ctx.fillStyle = p.col;
    const x = Math.round(p.x), y = Math.round(p.y);
    if (p.kind === 'spark') { ctx.fillRect(x, y - 1, 1, 3); ctx.fillRect(x - 1, y, 3, 1); }
    else if (p.kind === 'heart') { ctx.fillRect(x - 1, y, 1, 1); ctx.fillRect(x + 1, y, 1, 1); ctx.fillRect(x - 1, y + 1, 3, 1); ctx.fillRect(x, y + 2, 1, 1); }
    else if (p.kind === 'smoke') { ctx.globalAlpha = a * .5; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, 7); ctx.fill(); }
    else ctx.fillRect(x, y, p.size, p.size);
  }
  ctx.globalAlpha = 1;
  for (const f of floaters) {
    const x = Math.round(f.x * TILE), y = Math.round((f.y - f.t * 1.1) * TILE);
    ctx.globalAlpha = Math.min(1, 2 - f.t * 2);
    ctx.font = 'bold 7px system-ui, sans-serif'; ctx.textAlign = f.icon ? 'right' : 'center'; ctx.textBaseline = 'middle';
    const ox = f.icon ? 1 : 0;
    ctx.fillStyle = OUTLINE; [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(([dx, dy]) => ctx.fillText(f.text, x + dx + ox, y + dy));
    ctx.fillStyle = '#fff'; ctx.fillText(f.text, x + ox, y);
    if (f.icon) ctx.drawImage(SPR.icons[f.icon], x + 2, y - 5, 10, 10);
  }
  ctx.globalAlpha = 1;
  if (dk < .4 && !inMine()) {
    ctx.fillStyle = `rgba(10,20,40,${.07 * (1 - dk / .4)})`;
    for (const c of clouds) { ctx.beginPath(); ctx.ellipse(c.x, c.y, c.r, c.r * .45, 0, 0, 7); ctx.ellipse(c.x + c.r * .5, c.y + 8, c.r * .6, c.r * .3, 0, 0, 7); ctx.fill(); }
  }
  if (mouseActive() && !busy() && S.opts.reach) {
    ctx.fillStyle = 'rgba(255,255,255,.4)'; const R = REACH * TILE;
    for (let i = 0; i < 48; i++) { const a = i / 48 * Math.PI * 2 + now / 3000; ctx.fillRect(Math.round(P.x * TILE + Math.cos(a) * R), Math.round(P.y * TILE + Math.sin(a) * R), 1, 1); }
  }

  // Masque hors de la zone (mine / vallée)
  ctx.fillStyle = '#0d0b09';
  if (inMine()) { ctx.fillRect(camX - 10, camY - 10, 80 * TILE - camX + 10, vh + 20); ctx.fillRect(100 * TILE, camY - 10, vw + 20, vh + 20); ctx.fillRect(camX - 10, 48 * TILE, vw + 20, vh + 20); }
  else if (camX + vw > VW_TILES * TILE) ctx.fillRect(VW_TILES * TILE, camY - 10, vw, vh + 20);
  // ---------- Météo (écran) ----------
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const inSnow = biomeAt(Math.floor(P.x), Math.floor(P.y)) === 'montagne';
  if (inMine()) { /* pas de météo sous terre */ } else if (S.weather === 'rain' && !inSnow) {
    ctx.fillStyle = 'rgba(40,60,100,.18)'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(200,225,255,.55)'; ctx.lineWidth = Math.max(1, dpr); ctx.beginPath();
    for (const r of rainDrops) { const x = r.x * canvas.width, y = r.y * canvas.height; ctx.moveTo(x, y); ctx.lineTo(x - 4 * dpr * r.s, y + 14 * dpr * r.s); }
    ctx.stroke();
    if (Math.random() < .6) emit(camX + Math.random() * vw, camY + Math.random() * vh, 3, { col: '#c8e1ff', speed: 18, life: .25, grav: 60, jitter: 1 });
  } else if (inSnow) {
    ctx.fillStyle = 'rgba(220,235,255,.08)'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255,255,255,.85)';
    for (const r of rainDrops) { const s = Math.round(2 * dpr * r.s); ctx.fillRect(r.x * canvas.width, r.y * canvas.height, s, s); }
  }
  // ---------- Nuit ----------
  if (dk > 0) {
    lctx.setTransform(1, 0, 0, 1, 0, 0); lctx.globalCompositeOperation = 'source-over';
    lctx.clearRect(0, 0, light.width, light.height);
    lctx.fillStyle = `rgba(12,18,60,${dk})`; lctx.fillRect(0, 0, light.width, light.height);
    lctx.globalCompositeOperation = 'destination-out';
    const hole = (wx, wy, r, a) => {
      const x = (wx - camX) * sc, y = (wy - camY) * sc, R = r * sc;
      if (x < -R || y < -R || x > light.width + R || y > light.height + R) return;
      const g = lctx.createRadialGradient(x, y, 0, x, y, R); g.addColorStop(0, `rgba(0,0,0,${a})`); g.addColorStop(1, 'rgba(0,0,0,0)');
      lctx.fillStyle = g; lctx.fillRect(x - R, y - R, R * 2, R * 2);
    };
    hole(P.x * TILE, P.y * TILE - 8, inMine() ? 72 : 52, inMine() ? .95 : .85);
    for (const w of LIGHTS) if (lightOn(w)) hole(w.x + w.w / 2, w.y + w.h / 2 + (w.lamp ? 8 : 10), w.lamp ? 44 : 34, w.lamp ? .9 : .75);
    if (!inMine()) for (const b of bugs) { const fl = (Math.sin(b.ph * 3) + 1) / 2; if (fl > .3) hole(b.x * TILE, b.y * TILE, 7, fl); }
    ctx.drawImage(light, 0, 0);
    ctx.globalCompositeOperation = 'lighter';
    const glow = (wx, wy, r, col) => { const x = (wx - camX) * sc, y = (wy - camY) * sc, R = r * sc; if (x < -R || y < -R || x > canvas.width + R || y > canvas.height + R) return; const g = ctx.createRadialGradient(x, y, 0, x, y, R); g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(x - R, y - R, R * 2, R * 2); };
    for (const w of LIGHTS) { if (!lightOn(w)) continue; ctx.fillStyle = `rgba(255,190,90,${dk})`; ctx.fillRect((w.x - camX) * sc, (w.y - camY) * sc, w.w * sc, w.h * sc); glow(w.x + w.w / 2, w.y + w.h / 2 + 6, w.lamp ? 30 : 26, `rgba(255,170,70,${dk * .35})`); }
    glow(P.x * TILE, P.y * TILE - 8, 40, `rgba(255,190,110,${dk * .25})`);
    if (!inMine()) for (const b of bugs) { const fl = (Math.sin(b.ph * 3) + 1) / 2; if (fl > .3) { ctx.fillStyle = `rgba(220,255,120,${fl * dk * 1.4})`; ctx.fillRect((b.x * TILE - camX) * sc, (b.y * TILE - camY) * sc, sc, sc); } }
    ctx.globalCompositeOperation = 'source-over';
  }
}
