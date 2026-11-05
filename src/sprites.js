// ============================================================
//  PIXEL ART — tout est dessiné ici, pixel par pixel, en code.
//  1 « pixel art » = 3 pixels écran au zoom 1. Une case = 16×16.
// ============================================================
const OUTLINE = '#2a1d14';
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const hash = (x, y) => { let h = (x * 374761393 + y * 668265263) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return (h ^ (h >>> 16)) >>> 0; };

function pixApi(g, ox = 0, oy = 0) {
  const A = {
    g,
    p(x, y, c) { g.fillStyle = c; g.fillRect(ox + Math.round(x), oy + Math.round(y), 1, 1); },
    r(x, y, w, h, c) { if (w <= 0 || h <= 0) return; g.fillStyle = c; g.fillRect(ox + Math.round(x), oy + Math.round(y), Math.round(w), Math.round(h)); },
    e(cx, cy, rx, ry, c) {
      g.fillStyle = c;
      for (let y = Math.floor(cy - ry - 1); y <= Math.ceil(cy + ry); y++) for (let x = Math.floor(cx - rx - 1); x <= Math.ceil(cx + rx); x++) {
        const dx = (x + .5 - cx) / rx, dy = (y + .5 - cy) / ry; if (dx * dx + dy * dy <= 1) g.fillRect(ox + x, oy + y, 1, 1);
      }
    },
    // ellipse ombrée : sombre en bas à droite, clair en haut à gauche
    es(cx, cy, rx, ry, base, dark, light) {
      for (let y = Math.floor(cy - ry - 1); y <= Math.ceil(cy + ry); y++) for (let x = Math.floor(cx - rx - 1); x <= Math.ceil(cx + rx); x++) {
        const dx = (x + .5 - cx) / rx, dy = (y + .5 - cy) / ry, d = dx * dx + dy * dy;
        if (d > 1) continue;
        let c = base;
        if (dark && (dx * .5 + dy) > .45 && d > .35) c = dark;
        if (light && (dx + dy) < -.75 && d < .75) c = light;
        g.fillStyle = c; g.fillRect(ox + x, oy + y, 1, 1);
      }
    },
    line(x0, y0, x1, y1, c) {
      x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1);
      const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1; let err = dx + dy;
      g.fillStyle = c;
      for (;;) { g.fillRect(ox + x0, oy + y0, 1, 1); if (x0 === x1 && y0 === y1) break; const e2 = 2 * err; if (e2 >= dy) { err += dy; x0 += sx; } if (e2 <= dx) { err += dx; y0 += sy; } }
    },
  };
  return A;
}
function addOutline(c, col) {
  const g = c.getContext('2d'), w = c.width, h = c.height, d = g.getImageData(0, 0, w, h).data;
  const op = (x, y) => x >= 0 && y >= 0 && x < w && y < h && d[(y * w + x) * 4 + 3] > 60;
  g.fillStyle = col;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++)
    if (!op(x, y) && (op(x - 1, y) || op(x + 1, y) || op(x, y - 1) || op(x, y + 1))) g.fillRect(x, y, 1, 1);
}
function mk(w, h, fn, outline = OUTLINE) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  fn(pixApi(c.getContext('2d')));
  if (outline) addOutline(c, outline);
  return c;
}
function flipC(src) {
  const c = document.createElement('canvas'); c.width = src.width; c.height = src.height;
  const g = c.getContext('2d'); g.translate(src.width, 0); g.scale(-1, 1); g.drawImage(src, 0, 0); return c;
}
function toURL(src, scale = 3) {
  const c = document.createElement('canvas'); c.width = src.width * scale; c.height = src.height * scale;
  const g = c.getContext('2d'); g.imageSmoothingEnabled = false; g.drawImage(src, 0, 0, c.width, c.height); return c.toDataURL();
}

// ---------- Couleurs ----------
const C = {
  g: '#4caf50', gd: '#2e7d32', gl: '#7bd06b',
  grass: '#5fa843', grassL: '#69b44b', grassD: '#56993c', grassT: '#4a8a35',
  path: '#c9a066', pathD: '#b8915a', pathL: '#d8b47c',
  sand: '#e6cf8f', sandD: '#d4b977', sandL: '#f0dca6',
  water: '#3d8fd6', waterL: '#4a9ce0', waterD: '#3382c8', foam: '#d8f1ff', foam2: '#8cc8f0',
  wood: '#9a6434', woodD: '#7a4a24', woodL: '#b97d45',
};

// ============================================================
//  ANIMAUX — regardent à gauche, 2 images (on les retourne pour la droite)
// ============================================================
function chickenSprite(f) {
  return mk(16, 15, P => {
    const w = '#fbfbf8', wd = '#dcdcd4';
    P.e(9, 8, 4.8, 3.8, w); P.e(10, 10, 3.6, 1.6, wd);
    P.r(12, 3, 2, 5, w); P.p(14, 3, w); P.p(14, 4, wd); P.p(13, 7, wd);
    P.e(5, 5, 2.6, 2.6, w);
    P.r(4, 1, 3, 1, '#e53935'); P.p(5, 0, '#e53935'); P.p(3, 2, '#e53935');
    P.r(1, 5, 2, 1, '#f5b02e'); P.p(2, 6, '#d99020');
    P.p(4, 4, '#222'); P.p(4, 7, '#e53935');
    P.r(8, 7, 4, 2, wd); P.p(11, 9, wd);
    if (f) { P.r(7, 12, 1, 2, '#f5a623'); P.r(10, 11, 1, 2, '#f5a623'); P.p(11, 13, '#f5a623'); }
    else { P.r(7, 12, 1, 2, '#f5a623'); P.r(10, 12, 1, 2, '#f5a623'); P.p(6, 13, '#f5a623'); P.p(9, 13, '#f5a623'); }
  });
}
function cowSprite(f) {
  return mk(27, 21, P => {
    const w = '#fafafa', wd = '#e0ddd6', k = '#2b2b2b';
    const legs = f ? [[8, -1], [11, 0], [18, 0], [21, -1]] : [[8, 0], [11, -1], [18, -1], [21, 0]];
    legs.forEach(([x, d]) => { P.r(x, 15 + d, 2, 4, wd); P.r(x, 19 + d, 2, 1, '#4a3a2a'); });
    P.es(15, 10, 10, 5.6, w, wd, null);
    P.e(12, 8, 3, 2.2, k); P.e(19.5, 12, 2.6, 2, k); P.e(18, 6, 2, 1.3, k);
    P.r(16, 15, 3, 2, '#f2a9b5');
    P.r(24, 6, 1, 6, w); P.r(24, 12, 2, 2, k);
    P.r(2, 5, 7, 7, w); P.r(5, 5, 3, 3, k); P.p(2, 5, '#00000000');
    P.r(1, 10, 6, 3, '#f2a9b5'); P.p(2, 11, '#b86a78'); P.p(4, 11, '#b86a78');
    P.p(4, 7, '#111'); P.p(3, 4, '#efe2c0'); P.p(2, 3, '#efe2c0'); P.p(7, 4, '#efe2c0'); P.p(8, 3, '#efe2c0');
    P.r(8, 6, 2, 1, wd);
  });
}
function sheepSprite(f) {
  return mk(23, 19, P => {
    const wool = '#f2ead9', woolD = '#d9ceb5', face = '#4a4a4a';
    const legs = f ? [[8, -1], [11, 0], [15, 0], [18, -1]] : [[8, 0], [11, -1], [15, -1], [18, 0]];
    legs.forEach(([x, d]) => P.r(x, 14 + d, 2, 4, face));
    [[9, 8], [13, 6.5], [17, 8], [11, 11], [15, 11], [19, 10.5], [7, 10.5]].forEach(([x, y]) => P.e(x, y, 3.8, 3.6, woolD));
    [[9, 7.5], [13, 6], [17, 7.5], [11, 10.5], [15, 10.5], [19, 10], [7, 10]].forEach(([x, y]) => P.e(x, y, 3.4, 3.2, wool));
    [[12, 4], [16, 6], [8, 6]].forEach(([x, y]) => P.p(x, y, '#fffdf6'));
    P.es(4, 9, 2.8, 3.4, face, '#333', '#5e5e5e');
    P.r(1, 7, 2, 1, face); P.r(6, 7, 2, 1, face);
    P.p(3, 9, '#fff'); P.e(5, 5.5, 2, 1.5, wool);
  });
}
function pigSprite(f) {
  return mk(23, 17, P => {
    const pk = '#f4a6b4', pd = '#de8798', pl = '#fbc7d0';
    const legs = f ? [[7, -1], [10, 0], [15, 0], [18, -1]] : [[7, 0], [10, -1], [15, -1], [18, 0]];
    legs.forEach(([x, d]) => { P.r(x, 12 + d, 2, 3, pd); P.p(x, 15 + d, '#b55a6c'); P.p(x + 1, 15 + d, '#b55a6c'); });
    P.es(12, 8, 8.6, 5, pk, pd, pl);
    P.e(5, 8, 4, 4, pk);
    P.r(0, 8, 3, 3, '#e8869a'); P.p(0, 9, '#9b4458'); P.p(2, 9, '#9b4458');
    P.r(5, 3, 2, 2, pd); P.p(4, 4, pd);
    P.p(4, 7, '#222'); P.p(3, 7, '#fff');
    P.p(21, 6, pd); P.p(22, 5, pd); P.p(21, 4, pd); P.p(20, 5, pd);
  });
}
function butterflySprite(col, f) {
  return mk(5, 4, P => {
    if (f) { P.r(0, 0, 2, 2, col); P.r(3, 0, 2, 2, col); P.r(0, 2, 2, 1, '#fff'); P.r(3, 2, 2, 1, '#fff'); }
    else { P.r(1, 0, 1, 2, col); P.r(3, 0, 1, 2, col); }
    P.r(2, 0, 1, 3, '#333');
  }, null);
}

// ============================================================
//  CULTURES — 16×24, posées sur le bas de la case
// ============================================================
function drawPlant(P, k, ripe) {
  const G = C.g, GD = C.gd, GL = C.gl;
  switch (k) {
    case 'ble': {
      const st = ripe ? '#c9a23a' : '#6fbf4a', ear = ripe ? '#ecc75a' : '#8fd166', earD = ripe ? '#c79a2c' : '#5fa83e';
      const top = ripe ? 6 : 11;
      [3, 5, 8, 10, 12].forEach((x, i) => {
        const t = top + (i % 2) * 2;
        P.r(x, t + 4, 1, 23 - t - 4, st); P.r(x, t, 2, 5, ear); P.p(x + 1, t + 1, earD); P.p(x, t + 3, earD); P.p(x + 1, t - 1, ear);
      });
      P.r(4, 18, 2, 1, ripe ? '#a8c45a' : G); P.r(9, 17, 2, 1, ripe ? '#a8c45a' : GD); break;
    }
    case 'carotte': {
      const s = ripe ? 1 : .65;
      for (let i = -3; i <= 3; i++) {
        const tx = 8 + i * 1.6 * s, ty = 17 - (9 - Math.abs(i) * 1.3) * s;
        P.line(8, 17, tx, ty, i % 2 ? GD : G); P.r(tx - 1, ty - 1, 2, 2, GL);
      }
      if (ripe) { P.e(8, 19.5, 3.2, 2, '#e67e22'); P.r(6, 19, 5, 1, '#c0601a'); P.p(7, 21, '#c0601a'); P.p(9, 18, '#f5a04a'); }
      break;
    }
    case 'tomate': {
      const fc = ripe ? '#e74c3c' : '#8bc34a';
      P.r(8, 5, 1, 18, '#9a6434'); P.p(8, 4, '#b97d45');
      P.e(6, 10, 3, 2, G); P.e(11, 13, 3, 2, GD); P.e(6, 16, 3, 2, G); P.e(10, 7, 2.5, 2, G); P.e(10, 19, 2.5, 1.6, GD);
      [[5, 12.5], [11, 9.5], [10, 17]].forEach(([x, y]) => { P.e(x, y, 2, 2, fc); P.p(x - 1, y - 1, ripe ? '#ffb3a7' : '#c5e1a5'); P.p(x, y - 2, GD); });
      break;
    }
    case 'mais': {
      const t = ripe ? 1 : 9;
      P.r(7, t, 2, 23 - t, '#5aa83a'); P.r(8, t, 1, 23 - t, '#4a9030');
      P.line(8, 16, 2, 11, G); P.line(8, 13, 14, 8, G); P.line(8, 19, 13, 16, GD); P.line(8, 21, 3, 18, GD);
      if (ripe) {
        P.r(6, 0, 1, 2, '#e8d07a'); P.r(9, 0, 1, 2, '#e8d07a'); P.p(8, 0, '#e8d07a');
        P.e(10.5, 9, 2, 4, '#f1c40f'); for (let y = 6; y < 13; y += 2) P.p(10, y, '#d4a50e'); P.p(11, 7, '#d4a50e'); P.p(11, 11, '#d4a50e');
        P.p(9, 12, GL); P.p(12, 12, GL); P.p(9, 13, G);
      } else { P.e(10, 14, 1.4, 2.5, GL); }
      break;
    }
    case 'fraise': {
      P.es(8, 19, 6.5, 3.8, G, GD, GL);
      if (ripe) [[3, 19], [8, 20], [11, 17]].forEach(([x, y]) => {
        P.r(x, y, 3, 3, '#e53950'); P.p(x + 1, y + 3, '#e53950'); P.p(x, y + 1, '#ffe082'); P.p(x + 2, y + 2, '#ffe082'); P.p(x + 1, y - 1, GD); P.p(x + 2, y, '#ff7a90');
      });
      else [[5, 17], [10, 18]].forEach(([x, y]) => { P.p(x, y - 1, '#fff'); P.p(x - 1, y, '#fff'); P.p(x + 1, y, '#fff'); P.p(x, y + 1, '#fff'); P.p(x, y, '#f2c94c'); });
      break;
    }
    case 'citrouille': {
      P.line(1, 22, 15, 20, GD); P.e(3, 19, 2.5, 2, G); P.e(13.5, 18, 2.5, 2, G); P.p(1, 19, GL);
      if (ripe) {
        P.es(8, 18.5, 6.2, 4.4, '#e67e22', '#c0601a', '#f5a04a');
        P.r(6, 15, 1, 7, '#c0601a'); P.r(10, 15, 1, 7, '#c0601a'); P.r(8, 12, 1, 3, '#6b4a1f'); P.p(9, 12, GD);
      } else P.es(8, 20, 3.6, 2.6, '#8bc34a', '#5d8f2f', '#b6e07a');
      break;
    }
    case 'cepe': {
      if (ripe) [[5, 19, 3.6], [11, 20, 3], [8, 15, 2.6]].forEach(([x, y, r]) => { P.r(x - 1, y - 1, 3, 4, '#f3e9d2'); P.r(x + 1, y - 1, 1, 4, '#d9cdb0'); P.e(x, y - 2, r, r * .65, '#8a5a2c'); P.p(x - 1, y - 3, '#b07a42'); });
      else [[6, 20, 2], [11, 21, 1.6]].forEach(([x, y, r]) => { P.r(x, y - 1, 1, 3, '#f3e9d2'); P.e(x, y - 2, r, r * .7, '#b07a42'); });
      P.p(3, 22, '#5a8a3a'); P.p(13, 22, '#5a8a3a'); break;
    }
    case 'myrtille': {
      P.es(8, 17, 6, 5, '#2f7d32', '#235e26', '#4c9a3f'); P.r(7, 21, 2, 2, '#5a3518');
      if (ripe) [[5, 15], [9, 13], [11, 17], [6, 19], [10, 20], [4, 17], [8, 17]].forEach(([x, y]) => { P.p(x, y, '#3242a8'); P.p(x + 1, y, '#4a5bd6'); P.p(x, y - 1, '#8a9cf0'); });
      else [[6, 15], [10, 16]].forEach(([x, y]) => P.p(x, y, '#ffffff'));
      break;
    }
    case 'melon': {
      P.line(1, 22, 15, 21, '#3f7a2e'); P.e(3, 19, 2.5, 1.8, C.g); P.e(13, 18.5, 2.5, 1.8, C.g);
      if (ripe) { P.es(8, 18.5, 5.5, 4.2, '#9bd36a', '#6fa84a', '#c6ec9a'); for (let x = 4; x < 13; x += 2) P.line(x, 15, x, 22, '#6fa84a'); P.r(8, 13, 1, 2, '#5a3518'); }
      else P.es(8, 20, 3, 2.4, '#7cb342', '#5d8f2f', '#a5d66a');
      break;
    }
    case 'vanille': {
      P.r(8, 4, 1, 19, '#9a6434'); P.line(8, 20, 3, 14, C.g); P.line(8, 16, 13, 10, C.g); P.line(8, 11, 4, 6, C.gd); P.e(4, 13, 2, 1.4, C.gl); P.e(12, 10, 2, 1.4, C.gl);
      if (ripe) { [[5, 15], [11, 12], [6, 8]].forEach(([x, y]) => { P.r(x, y, 1, 5, '#3a2a1a'); P.r(x + 1, y, 1, 5, '#5a3a1a'); }); P.e(10, 5, 1.6, 1.6, '#fff3b0'); }
      else P.e(10, 6, 1.6, 1.6, '#f4efe4');
      break;
    }
    case 'houx': {
      P.es(8, 17, 6.5, 5.5, '#1f6b2a', '#16521f', '#2e8a3a');
      [[3, 15], [12, 13], [9, 20], [5, 20]].forEach(([x, y]) => { P.p(x, y, '#0f3f16'); P.p(x + 1, y - 1, '#2e8a3a'); });
      if (ripe) [[6, 14], [10, 17], [7, 18], [12, 19], [5, 17]].forEach(([x, y]) => { P.p(x, y, '#e0244a'); P.p(x + 1, y, '#b01a38'); });
      P.r(2, 21, 12, 1, '#f2f6fa'); break;
    }
    case 'edelweiss': {
      P.r(8, 12, 1, 11, '#7f9a7a'); P.line(8, 19, 5, 16, '#9ab09a'); P.line(8, 17, 11, 14, '#9ab09a');
      if (ripe) { for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; P.e(8.5 + Math.cos(a) * 3, 9 + Math.sin(a) * 3, 1.6, 1.6, '#f8fbff'); } P.e(8.5, 9, 1.6, 1.6, '#f2c94c'); P.p(8, 8, '#d4a82c'); }
      else P.e(8.5, 11, 1.6, 1.6, '#dfe8f0');
      P.r(3, 22, 10, 1, '#f2f6fa'); break;
    }
    case 'tournesol': {
      P.r(8, 7, 1, 16, '#4f9a35'); P.e(5, 15, 3, 1.6, G); P.e(11.5, 12, 3, 1.6, G); P.e(5, 19, 2.5, 1.4, GD);
      if (ripe) {
        P.e(8.5, 5, 4.6, 4.6, '#f9c80e');
        for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; P.p(8.5 + Math.cos(a) * 5.3 - .5, 5 + Math.sin(a) * 5.3 - .5, '#f5b400'); }
        P.e(8.5, 5, 2.3, 2.3, '#6b3e1f'); P.p(8, 4, '#3e2410'); P.p(9, 5, '#3e2410'); P.p(7, 6, '#8a5530');
      } else { P.e(8.5, 7, 2, 2, GL); P.p(8, 6, '#c9e88a'); }
      break;
    }
  }
}
function cropSprite(k, stage) {
  if (stage === 0) return mk(16, 24, P => {
    P.e(8, 21, 4, 1.6, '#6e4a2c'); P.p(6, 21, '#e8d6a0'); P.p(9, 20, '#e8d6a0'); P.p(10, 22, '#e8d6a0');
  }, null);
  if (stage === 1) return mk(16, 24, P => {
    P.r(8, 17, 1, 5, C.g); P.r(5, 16, 3, 2, C.gl); P.r(9, 15, 3, 2, C.g); P.p(4, 15, C.gl); P.p(12, 14, C.g);
  });
  return mk(16, 24, P => drawPlant(P, k, stage === 3));
}

// ============================================================
//  OBJETS (icônes 16×16)
// ============================================================
const ICON_DRAW = {
  ble: P => { [[4, 15, 3, 3], [8, 15, 8, 2], [12, 15, 13, 3]].forEach(([x0, y0, x1, y1]) => { P.line(x0, y0, x1, y1 + 3, '#c9a23a'); P.r(x1 - 1, y1 - 1, 2, 5, '#ecc75a'); P.p(x1, y1 + 1, '#c79a2c'); }); P.r(5, 10, 7, 2, '#c0392b'); },
  carotte: P => { for (let y = 5; y <= 14; y++) { const h = Math.round((14 - y) * .32); P.r(8 - h, y, 2 * h + 1, 1, '#e67e22'); } P.p(7, 7, '#c0601a'); P.p(9, 9, '#c0601a'); P.p(7, 11, '#c0601a'); P.p(6, 6, '#f5a04a'); P.line(8, 4, 5, 1, C.g); P.line(8, 4, 8, 0, C.gd); P.line(8, 4, 11, 1, C.g); },
  tomate: P => { P.es(8, 9.5, 5.5, 5, '#e74c3c', '#b83227', '#ff8a7a'); P.r(6, 4, 5, 1, C.g); P.p(8, 3, C.gd); P.p(7, 5, C.g); P.p(9, 5, C.g); P.p(5, 7, '#fff'); },
  mais: P => { P.line(4, 15, 6, 5, C.g); P.line(12, 15, 10, 5, C.g); P.e(8, 8, 3, 6.2, '#f1c40f'); for (let y = 3; y < 14; y += 2) { P.p(7, y, '#d4a50e'); P.p(9, y + 1, '#d4a50e'); } P.line(5, 15, 7, 10, C.gd); P.line(11, 15, 9, 10, C.gd); },
  fraise: P => { [4, 5, 5, 5, 4, 4, 3, 2, 1].forEach((h, i) => P.r(8 - h, 5 + i, 2 * h, 1, i > 3 ? '#d42e44' : '#e53950')); [[5, 6], [9, 7], [7, 9], [10, 10], [6, 11], [8, 12]].forEach(([x, y]) => P.p(x, y, '#ffe082')); P.r(5, 4, 6, 1, C.g); P.p(7, 3, C.gd); P.p(8, 2, C.gd); P.p(4, 6, '#ff8a9a'); },
  citrouille: P => { P.es(8, 10, 6.8, 5, '#e67e22', '#c0601a', '#f5a04a'); P.r(6, 6, 1, 8, '#c0601a'); P.r(10, 6, 1, 8, '#c0601a'); P.r(8, 3, 1, 3, '#6b4a1f'); P.p(9, 3, C.g); P.p(10, 2, C.g); },
  tournesol: P => { P.e(8, 8, 5.5, 5.5, '#f9c80e'); for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; P.p(7.5 + Math.cos(a) * 6.3, 7.5 + Math.sin(a) * 6.3, '#f5b400'); } P.e(8, 8, 2.8, 2.8, '#6b3e1f'); P.p(7, 7, '#3e2410'); P.p(9, 9, '#3e2410'); },
  oeuf: P => { P.es(8, 9, 4.5, 5.5, '#fbf3e4', '#e3d4b8', '#ffffff'); },
  lait: P => { P.r(6, 1, 4, 1, '#3d7fd6'); P.r(6, 2, 4, 3, '#dfeff7'); P.r(4, 5, 8, 10, '#f8fbff'); P.r(11, 5, 1, 10, '#d5e3ee'); P.r(4, 8, 8, 3, '#3d7fd6'); P.p(7, 9, '#fff'); P.r(5, 5, 1, 3, '#fff'); P.r(5, 12, 1, 2, '#fff'); },
  laine: P => { P.es(8, 9, 5.6, 5.6, '#efe6d2', '#cdbf9f', '#fff'); P.line(4, 7, 11, 12, '#cdbf9f'); P.line(5, 11, 10, 5, '#cdbf9f'); P.line(12, 13, 15, 15, '#efe6d2'); },
  truffe: P => { P.es(8, 10, 5.2, 4.6, '#5a3b24', '#3b2415', '#7a5233'); [[6, 9], [9, 11], [10, 8], [7, 12]].forEach(([x, y]) => P.p(x, y, '#8a6344')); P.r(8, 4, 1, 2, C.gd); P.p(9, 4, C.g); },
  pain: P => { P.es(8, 10, 6.8, 4.2, '#c98a3e', '#9c6428', '#e6b065'); P.line(4, 9, 6, 12, '#9c6428'); P.line(7, 8, 9, 11, '#9c6428'); P.line(10, 8, 12, 11, '#9c6428'); },
  tarte: P => { P.r(1, 11, 14, 3, '#d9d3c7'); P.r(1, 13, 14, 1, '#b8b0a2'); P.es(8, 9.5, 6.6, 3.2, '#e2a85a', '#c48a3e', '#f0c27e'); P.r(3, 9, 10, 1, '#d2691e'); P.r(4, 8, 8, 1, '#e67e22'); [4, 7, 10].forEach(x => P.r(x, 7, 1, 4, '#f0c27e')); },
  fromage: P => { for (let y = 6; y <= 13; y++) P.r(2, y, Math.round(3 + (y - 6) * 1.6), 1, y > 10 ? '#d4ac0d' : '#f4d03f'); P.r(2, 11, 15, 0, '#d4ac0d'); P.p(5, 9, '#c9a10c'); P.p(9, 11, '#b8930b'); P.p(6, 12, '#b8930b'); P.p(11, 12, '#b8930b'); },
  pull: P => { P.r(4, 4, 8, 10, '#3d7fd6'); P.r(1, 5, 3, 7, '#3d7fd6'); P.r(12, 5, 3, 7, '#3d7fd6'); P.r(1, 11, 3, 2, '#2c5fa8'); P.r(12, 11, 3, 2, '#2c5fa8'); P.r(6, 3, 4, 2, '#2c5fa8'); P.r(4, 8, 8, 2, '#e74c3c'); P.p(5, 8, '#fff'); P.p(8, 9, '#fff'); P.p(10, 8, '#fff'); P.r(4, 13, 8, 1, '#2c5fa8'); },
  gateau: P => { P.r(2, 8, 12, 6, '#f3d9a4'); P.r(2, 10, 12, 1, '#fff'); P.r(2, 12, 12, 1, '#fff'); P.r(2, 6, 12, 2, '#f7a8c4'); P.p(4, 8, '#f7a8c4'); P.p(9, 8, '#f7a8c4'); P.r(13, 8, 1, 6, '#e0c086'); P.e(8, 4.5, 2, 2, '#e53950'); P.p(8, 2, C.g); P.p(7, 4, '#ffe082'); },
};

// ============================================================
//  DÉCOR : arbres, buissons, herbes hautes, sol cultivé
// ============================================================
function oakSprite(variant) {
  return mk(30, 36, P => {
    P.r(13, 23, 5, 12, '#7a4a24'); P.r(16, 23, 2, 12, '#5a3518'); P.r(11, 33, 2, 2, '#7a4a24'); P.r(18, 33, 2, 2, '#5a3518'); P.p(14, 27, '#5a3518');
    const blobs = [[15, 13, 11], [8, 17, 7], [22, 17, 7], [15, 20, 8], [10, 9, 6.5], [20, 9, 6.5]];
    blobs.forEach(([x, y, r]) => P.e(x + 1, y + 1.5, r, r * .92, '#2f6d2a'));
    blobs.forEach(([x, y, r]) => P.e(x, y, r - .6, (r - .6) * .9, '#3f8a35'));
    [[11, 9, 4], [18, 7, 3], [7, 15, 3]].forEach(([x, y, r]) => P.e(x, y, r, r * .8, '#55a646'));
    const R = rng(variant * 97 + 5);
    for (let i = 0; i < 40; i++) { const x = 5 + R() * 21 | 0, y = 3 + R() * 22 | 0; P.p(x, y, R() < .5 ? '#357a2d' : '#4c9a3f'); }
    for (let i = 0; i < 8; i++) P.p(7 + R() * 10 | 0, 4 + R() * 8 | 0, '#6cbf55');
    if (variant === 1) [[9, 14], [20, 12], [15, 19], [23, 18], [12, 8]].forEach(([x, y]) => { P.r(x, y, 2, 2, '#e53935'); P.p(x, y, '#ff8a80'); });
  }, '#1e3a1a');
}
function pineSprite() {
  return mk(24, 38, P => {
    P.r(10, 30, 4, 7, '#6b3f1f'); P.r(12, 30, 2, 7, '#4f2e16');
    for (let t = 0; t < 4; t++) {
      const top = 1 + t * 7;
      for (let r = 0; r < 10; r++) {
        const half = Math.floor((r + 2) * (.5 + t * .13));
        P.r(12 - half, top + r, 2 * half, 1, '#2e6b3a'); P.r(12, top + r, half, 1, '#255a30'); P.p(12 - half, top + r, '#3f8a4a');
      }
    }
    P.p(12, 0, '#3f8a4a');
  }, '#163020');
}
function bushSprite(berries) {
  return mk(20, 15, P => {
    P.es(10, 8.5, 8.5, 5.8, '#3f9b3c', '#2f7d2e', '#5fbf55');
    P.e(5, 9, 3, 3, '#3f9b3c'); P.e(15, 9, 3, 3, '#368a34');
    if (berries) [[6, 6], [12, 5], [14, 10], [8, 10]].forEach(([x, y]) => { P.p(x, y, '#e53950'); P.p(x + 1, y, '#c2253a'); });
    else [[6, 6], [13, 9]].forEach(([x, y]) => P.p(x, y, '#fff'));
  }, '#1e3a1a');
}
function tallGrassSprite(v) {
  return mk(16, 12, P => {
    const R = rng(v * 13 + 1);
    for (let i = 0; i < 7; i++) {
      const x = 1 + R() * 14 | 0, h = 5 + R() * 6 | 0, lean = (R() - .5) * 4;
      P.line(x, 11, x + lean, 11 - h, i % 2 ? '#4e9a38' : '#6cbf55');
    }
  }, null);
}
function soilSprite(wet) {
  return mk(16, 16, P => {
    const b = wet ? '#5c3e28' : '#8a5d3b', d = wet ? '#4a311f' : '#74492c', l = wet ? '#6e4b31' : '#9e6e47';
    P.r(0, 0, 16, 16, b); P.r(0, 0, 16, 1, l); P.r(0, 0, 1, 16, l); P.r(0, 15, 16, 1, d); P.r(15, 0, 1, 16, d);
    [3, 7, 11].forEach(y => { P.r(2, y, 12, 1, d); P.r(2, y + 1, 12, 1, l); });
    if (wet) [[4, 5], [10, 9], [7, 13]].forEach(([x, y]) => P.p(x, y, '#7b5a40'));
  }, null);
}
function weedsSprite(v) {
  return mk(16, 16, P => {
    const R = rng(v + 3);
    for (let i = 0; i < 5; i++) { const x = 2 + R() * 12 | 0, y = 4 + R() * 10 | 0; P.line(x, y, x - 1, y - 3, '#3f7a2e'); P.line(x, y, x + 1, y - 3, '#4e9a38'); }
    for (let i = 0; i < 2; i++) { const x = 2 + R() * 11 | 0, y = 3 + R() * 10 | 0; P.r(x, y, 2, 2, '#9b9089'); P.p(x, y, '#b9b0a8'); }
  }, null);
}

// ============================================================
//  BÂTIMENTS (dessinés à leur taille réelle en pixels)
// ============================================================
function houseSprite() {
  return mk(96, 80, P => {
    P.r(68, 2, 9, 22, '#8a7d72'); for (let y = 5; y < 24; y += 4) P.r(68, y, 9, 1, '#6f645b'); P.r(67, 0, 11, 3, '#5f554d');
    for (let y = 8; y < 44; y++) { const ind = Math.floor((43 - y) / 3); P.r(ind, y, 96 - 2 * ind, 1, '#c0392b'); }
    for (let y = 12; y < 44; y += 5) { const ind = Math.floor((43 - y) / 3); P.r(ind, y, 96 - 2 * ind, 1, '#962d22'); for (let x = ind + (((y - 12) / 5) % 2 ? 4 : 0); x < 96 - ind; x += 8) P.r(x, y - 4, 1, 4, '#a8332a'); }
    P.r(12, 8, 72, 2, '#e0574a'); P.r(0, 42, 96, 2, '#6e1f18');
    P.r(4, 44, 88, 30, '#e8cf9c'); for (let y = 49; y < 74; y += 5) P.r(4, y, 88, 1, '#c9ad78');
    for (let y = 44; y < 74; y += 5) P.r(10 + ((y * 7) % 30), y, 1, 5, '#c9ad78');
    P.r(4, 44, 3, 30, '#9a6434'); P.r(89, 44, 3, 30, '#9a6434'); P.r(4, 44, 88, 2, '#b08a57');
    P.r(2, 72, 92, 8, '#9b9089'); P.r(2, 76, 92, 1, '#7d736c'); for (let x = 2; x < 94; x += 6) P.r(x, ((x / 6) % 2 ? 72 : 76), 1, 4, '#7d736c'); P.r(2, 72, 92, 1, '#b9b0a8');
    P.r(41, 52, 14, 26, '#5c3a1a'); P.r(43, 54, 10, 24, '#8a5a2c'); P.r(47, 54, 1, 24, '#6e4520'); P.r(43, 62, 10, 1, '#6e4520'); P.r(50, 65, 2, 2, '#f2c94c');
    P.r(39, 78, 18, 2, '#b5aaa2');
    for (const wx of [12, 66]) {
      P.r(wx - 4, 51, 3, 16, '#4f8a3c'); P.r(wx + 19, 51, 3, 16, '#4f8a3c'); P.r(wx - 4, 51, 3, 1, '#6fae5a'); P.r(wx + 19, 51, 3, 1, '#6fae5a');
      P.r(wx, 50, 18, 17, '#f4efe4'); P.r(wx + 2, 52, 14, 13, '#9fd3f5'); P.r(wx + 2, 52, 14, 2, '#c8e8fb');
      P.r(wx + 8, 52, 2, 13, '#f4efe4'); P.r(wx + 2, 57, 14, 2, '#f4efe4'); P.p(wx + 4, 61, '#fff'); P.p(wx + 5, 60, '#fff');
      P.r(wx - 1, 67, 20, 3, '#8a5a2c'); P.r(wx - 1, 67, 20, 1, '#a8733f');
      [1, 5, 9, 13, 16].forEach((o, i) => { P.r(wx + o, 65, 2, 2, ['#ff6b8b', '#ffd93b', '#ffffff', '#b28dff', '#ff6b8b'][i]); P.p(wx + o, 66, C.g); });
    }
  }, '#3a2614');
}
function coopSprite() {
  return mk(64, 60, P => {
    for (let y = 2; y < 25; y++) { const half = Math.min(32, Math.round(4 + (y - 2) * 1.4)); P.r(32 - half, y, 2 * half, 1, y % 4 === 0 ? '#5e1a14' : '#7b241c'); }
    P.r(3, 24, 58, 34, '#c0392b'); for (let x = 5; x < 61; x += 4) P.r(x, 24, 1, 34, '#a93226');
    P.r(3, 24, 58, 2, '#f5f5f5'); P.r(3, 24, 2, 34, '#f5f5f5'); P.r(59, 24, 2, 34, '#f5f5f5'); P.r(3, 57, 58, 1, '#7b241c');
    P.r(20, 36, 24, 22, '#f5f5f5'); P.r(22, 38, 20, 20, '#c0392b'); for (let x = 22; x < 42; x += 3) P.r(x, 38, 1, 20, '#a93226');
    P.line(22, 38, 41, 57, '#f5f5f5'); P.line(23, 38, 41, 56, '#f5f5f5'); P.line(41, 38, 22, 57, '#f5f5f5'); P.line(40, 38, 22, 56, '#f5f5f5'); P.r(31, 38, 2, 20, '#f5f5f5');
    P.e(32, 30, 4.5, 4.5, '#f5f5f5'); P.e(32, 30, 3.2, 3.2, '#f2c94c'); P.p(31, 29, '#c9a23a'); P.p(33, 31, '#c9a23a');
    P.r(6, 49, 11, 8, '#e6c35a'); P.r(6, 52, 11, 1, '#c9a23a'); P.r(6, 49, 11, 1, '#f2d77a'); P.r(11, 49, 1, 8, '#c9a23a');
  }, '#3a1410');
}
function marketSprite() {
  return mk(80, 64, P => {
    P.r(4, 10, 3, 54, '#7a4a24'); P.r(73, 10, 3, 54, '#7a4a24');
    P.r(7, 22, 66, 26, '#a06a3a'); for (let y = 24; y < 48; y += 4) P.r(7, y, 66, 1, '#8a5a2c');
    P.r(7, 31, 66, 2, '#7a4a24'); P.r(7, 41, 66, 2, '#7a4a24');
    const goods = ['#e74c3c', '#f1c40f', '#7cb342', '#e67e22'];
    for (let x = 10; x < 70; x += 4) { P.e(x + 1.5, 29, 1.7, 1.7, goods[(x / 4) % 4 | 0]); P.e(x + 1.5, 39, 1.7, 1.7, goods[(x / 4 + 2) % 4 | 0]); }
    for (let i = 0; i < 10; i++) { const x = i * 8, col = i % 2 ? '#f6e7c8' : '#d64541'; P.r(x, 6, 8, 16, col); P.e(x + 4, 21, 4, 3, col); }
    P.r(0, 4, 80, 3, '#8e2b22'); P.r(0, 6, 80, 1, '#b5382f');
    P.r(2, 47, 76, 17, '#b97d45'); P.r(2, 47, 76, 3, '#d69a5c'); for (let x = 10; x < 78; x += 9) P.r(x, 50, 1, 14, '#9a6434');
    P.r(8, 41, 11, 7, '#c8935a'); P.r(8, 41, 11, 1, '#e0ad72'); [10, 13, 16].forEach(x => { P.r(x, 39, 2, 3, '#e67e22'); P.p(x, 38, C.g); });
    P.r(61, 41, 11, 7, '#c8935a'); P.r(61, 41, 11, 1, '#e0ad72'); [63, 66, 69].forEach(x => P.e(x + .5, 40, 1.6, 1.6, '#e74c3c'));
    P.e(40, 56, 5, 5, '#f2c94c'); P.e(40, 56, 3.2, 3.2, '#e0b030'); P.r(39, 54, 2, 4, '#fff3b0');
  }, '#3a2614');
}
function workshopSprite() {
  return mk(80, 80, P => {
    P.r(10, 0, 10, 22, '#9c4a2a'); for (let y = 3; y < 22; y += 3) P.r(10, y, 10, 1, '#7e3a20'); P.r(9, 0, 12, 2, '#5a4a44');
    for (let y = 8; y < 34; y++) { const ind = Math.floor((33 - y) / 3); P.r(ind, y, 80 - 2 * ind, 1, (y - 8) % 4 === 3 ? '#4a4460' : '#5b5470'); }
    P.r(9, 8, 62, 1, '#7a7290'); P.r(0, 33, 80, 1, '#3a3450');
    P.r(4, 34, 72, 44, '#b5653d');
    for (let y = 34, row = 0; y < 78; y += 4, row++) { P.r(4, y, 72, 1, '#8f4a2a'); for (let x = 4 + (row % 2 ? 0 : 4); x < 76; x += 8) P.r(x, y, 1, 4, '#8f4a2a'); }
    P.r(26, 37, 28, 10, '#6e4520'); P.r(27, 38, 26, 8, '#a8733f');
    P.e(40, 42, 3.4, 3.4, '#d0d0d0'); P.e(40, 42, 1.4, 1.4, '#a8733f'); [[40, 37.6], [40, 46.4], [35.6, 42], [44.4, 42]].forEach(([x, y]) => P.p(x - .5, y - .5, '#d0d0d0'));
    P.r(30, 54, 20, 24, '#4a2f17'); P.e(40, 54, 10, 4, '#4a2f17'); P.r(39, 51, 2, 27, '#3a2410'); P.r(35, 64, 2, 2, '#c9a23a'); P.r(43, 64, 2, 2, '#c9a23a');
    for (const wx of [9, 57]) { P.r(wx, 47, 14, 14, '#e2c08a'); P.r(wx + 2, 49, 10, 10, '#9fd3f5'); P.r(wx + 6, 49, 2, 10, '#e2c08a'); P.r(wx + 2, 53, 10, 2, '#e2c08a'); P.p(wx + 3, 50, '#fff'); }
    P.r(2, 76, 76, 4, '#7d736c'); P.r(2, 76, 76, 1, '#9b9089');
  }, '#2a1a12');
}
function boardSprite() {
  return mk(16, 24, P => {
    P.r(3, 10, 2, 14, '#7a4a24'); P.r(11, 10, 2, 14, '#7a4a24');
    P.r(0, 2, 16, 11, '#a8733f'); P.r(0, 2, 16, 1, '#c58c50'); P.r(0, 12, 16, 1, '#7a4a24');
    P.r(2, 4, 5, 6, '#fffbe8'); P.r(8, 5, 6, 5, '#fffbe8'); P.r(3, 6, 3, 1, '#bbb'); P.r(3, 8, 2, 1, '#bbb'); P.r(9, 7, 4, 1, '#bbb');
    P.p(4, 4, '#e53935'); P.p(11, 5, '#3d7fd6');
  });
}

// ============================================================
//  SOL — dessiné case par case dans une grande image fixe
// ============================================================
function fringe(A, x, y, test, col, seed) {
  const R = rng(hash(x, y) + seed);
  const N = test(x, y - 1), S = test(x, y + 1), W = test(x - 1, y), E = test(x + 1, y);
  for (let i = 0; i < 16; i++) {
    const d = 1 + (R() < .45 ? 1 : 0) + (R() < .12 ? 1 : 0);
    if (N) A.r(i, 0, 1, d, col); if (S) A.r(i, 16 - d, 1, d, col);
    if (W) A.r(0, i, d, 1, col); if (E) A.r(16 - d, i, d, 1, col);
  }
  if (N && W) A.r(0, 0, 3, 3, col); if (N && E) A.r(13, 0, 3, 3, col);
  if (S && W) A.r(0, 13, 3, 3, col); if (S && E) A.r(13, 13, 3, 3, col);
}
function grassTile(A, x, y) {
  const R = rng(hash(x, y));
  A.r(0, 0, 16, 16, C.grass);
  for (let i = 0; i < 10; i++) A.p(R() * 16 | 0, R() * 16 | 0, C.grassL);
  for (let i = 0; i < 8; i++) A.p(R() * 16 | 0, R() * 16 | 0, C.grassD);
  for (let i = 0; i < 2; i++) { const tx = 1 + (R() * 13 | 0), ty = 2 + (R() * 12 | 0); A.p(tx, ty, C.grassT); A.p(tx - 1, ty + 1, C.grassT); A.p(tx + 1, ty + 1, C.grassT); A.p(tx, ty - 1, '#74c457'); }
}
function flowerOverlay(A, x, y) {
  const R = rng(hash(x, y) + 7), cols = ['#ff6b8b', '#ffd93b', '#ffffff', '#b28dff', '#ff9f43'];
  for (let i = 0; i < 3; i++) {
    const fx = 2 + (R() * 11 | 0), fy = 2 + (R() * 11 | 0), c = cols[R() * cols.length | 0];
    A.p(fx, fy + 2, C.gd); A.p(fx, fy - 1, c); A.p(fx - 1, fy, c); A.p(fx + 1, fy, c); A.p(fx, fy + 1, c); A.p(fx, fy, '#f2a900');
  }
}
