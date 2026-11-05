// ============================================================
//  PERSONNAGES (originaux) — corps 16×24, 4 directions × 4 images
// ============================================================
const PAL = {
  farmer: { skin: '#f2c29b', skinD: '#d9a074', hair: '#6b3e1f', head: 'straw', hatC: '#e8c35a', hatD: '#c9a23a', hatL: '#f7e3a0', band: '#c0392b', shirt: '#d64545', shirtD: '#a83232', low: 'overalls', pants: '#3b6fb6', pantsD: '#2c548f', boot: '#4a2f17' },
  rose:   { skin: '#e8b48a', skinD: '#c98e62', hair: '#b8b8b8', head: 'bun', shirt: '#7b4fa0', shirtD: '#5e3a80', low: 'dress', pants: '#5e3a80', pantsD: '#4a2c66', boot: '#3a2a20', glasses: true },
  margot: { skin: '#f5cfa8', skinD: '#dcae84', hair: '#c0602a', head: 'long', shirt: '#3f9b6a', shirtD: '#2e7a50', low: 'dress', pants: '#e8d9b0', pantsD: '#cbb98a', boot: '#5a3a1a' },
  hugo:   { skin: '#c98e62', skinD: '#a87048', hair: '#2b1d10', head: 'cap', hatC: '#5b5470', hatD: '#433d55', shirt: '#e6e2d8', shirtD: '#c4bfb2', low: 'pants', pants: '#5a4630', pantsD: '#463624', boot: '#2a1d14', beard: true },
  sylvain:{ skin: '#e8b48a', skinD: '#c98e62', hair: '#5a3a1a', head: 'beanie', hatC: '#2e7d32', hatD: '#1f5e23', shirt: '#8a5a2c', shirtD: '#6e4520', low: 'pants', pants: '#3f5a2a', pantsD: '#2f4620', boot: '#2a1d14', beard: true },
  marin:  { skin: '#d79a6c', skinD: '#b87d52', hair: '#e8e8e8', head: 'cap', hatC: '#1f4e8c', hatD: '#163a6a', shirt: '#f2c94c', shirtD: '#d4a82c', low: 'pants', pants: '#2c548f', pantsD: '#1f3f6e', boot: '#2a1d14', beard: true },
  agathe: { skin: '#f0c4a0', skinD: '#d4a07a', hair: '#3a2a1a', head: 'helmet', hatC: '#f1c40f', hatD: '#c9a20c', shirt: '#e67e22', shirtD: '#c0601a', low: 'overalls', pants: '#5a6a7a', pantsD: '#46545f', boot: '#2a1d14' },
};
function humanSprite(dir, f, pal) {
  const side = dir === 'left' || dir === 'right';
  const c = mk(16, 24, P => {
    const { skin, skinD, hair } = pal, eye = '#2b1d10', cheek = '#ec9a8a';
    const sh = pal.shirt, shD = pal.shirtD, ov = pal.pants, ovD = pal.pantsD, boot = pal.boot;
    const step = f === 1 ? 1 : f === 3 ? -1 : 0, o = step ? 1 : 0;
    const R = (x, y, w, h, col) => P.r(x, y + o, w, h, col), Q = (x, y, col) => P.p(x, y + o, col);
    const dress = pal.low === 'dress', pants = pal.low === 'pants';
    // ---- jambes ----
    if (!side) {
      const lL = step === 1 ? -1 : 0, lR = step === -1 ? -1 : 0;
      const legC = dress ? skin : ovD, legC2 = dress ? skinD : ov;
      P.r(5, 18 + lL, 3, 3, legC); P.r(8, 18 + lR, 3, 3, legC2);
      P.r(5, 21 + lL, 3, 2, boot); P.r(8, 21 + lR, 3, 2, boot);
    } else {
      const a = step === 1 ? 2 : step === -1 ? -2 : 0;
      P.r(6 - a, 18, 3, 3, dress ? skinD : ovD); P.r(6 - a, 21, 3, 2, '#3a2410');
      P.r(7 + a, 18, 3, 3, dress ? skin : ov); P.r(7 + a, 21, 4, 2, boot);
    }
    // ---- corps ----
    if (!side) {
      R(4, 10, 8, 3, sh);
      if (pal.low === 'overalls') { R(4, 13, 8, 5, ov); R(4, 13, 1, 5, ovD); R(11, 13, 1, 5, ovD); }
      else if (pants) { R(4, 13, 8, 2, sh); R(4, 15, 8, 1, '#3a2a1a'); R(4, 16, 8, 2, ov); R(4, 16, 1, 2, ovD); }
      else { R(4, 13, 8, 2, sh); R(3, 15, 10, 3, ov); R(3, 17, 10, 1, ovD); }
      R(3, 10 + step, 1, 4, sh); R(12, 10 - step, 1, 4, sh); Q(3, 14 + step, skin); Q(12, 14 - step, skin);
      if (dir === 'down') {
        if (pal.low === 'overalls') { R(5, 10, 1, 3, ov); R(10, 10, 1, 3, ov); R(5, 12, 6, 1, ov); Q(5, 13, '#f2c94c'); Q(10, 13, '#f2c94c'); R(6, 15, 4, 1, ovD); }
        else { Q(7, 10, shD); Q(8, 10, shD); Q(7, 12, shD); }
        Q(6, 11, shD);
      } else if (pal.low === 'overalls') { Q(5, 10, ov); Q(6, 11, ov); Q(7, 12, ov); Q(10, 10, ov); Q(9, 11, ov); Q(8, 12, ov); }
    } else {
      R(5, 10, 6, 3, sh);
      if (pal.low === 'overalls') { R(5, 13, 6, 5, ov); R(5, 13, 1, 5, ovD); R(9, 10, 1, 3, ov); }
      else if (pants) { R(5, 13, 6, 2, sh); R(5, 15, 6, 1, '#3a2a1a'); R(5, 16, 6, 2, ov); }
      else { R(5, 13, 6, 2, sh); R(4, 15, 8, 3, ov); R(4, 17, 8, 1, ovD); }
      R(7 + step, 10, 2, 4, shD); Q(7 + step, 14, skin); Q(8 + step, 14, skin);
    }
    // ---- tête ----
    if (!side) {
      R(4, 4, 8, 6, skin);
      if (dir === 'down') {
        R(4, 4, 8, 1, hair); Q(4, 5, hair); Q(11, 5, hair); Q(4, 6, hair); Q(11, 6, hair);
        R(6, 6, 1, 2, eye); R(9, 6, 1, 2, eye); Q(5, 8, cheek); Q(10, 8, cheek); R(7, 9, 2, 1, skinD);
        if (pal.glasses) { R(5, 6, 3, 1, '#555'); R(8, 6, 3, 1, '#555'); Q(6, 6, '#bfe3f5'); Q(9, 6, '#bfe3f5'); }
        if (pal.beard) { R(5, 8, 6, 2, hair); Q(4, 7, hair); Q(11, 7, hair); Q(7, 8, skinD); Q(8, 8, skinD); }
        if (pal.head === 'long') { R(3, 5, 1, 6, hair); R(12, 5, 1, 6, hair); }
      } else {
        R(4, 4, 8, 5, hair); R(5, 9, 6, 1, skinD);
        if (pal.head === 'long') R(4, 9, 8, 3, hair);
      }
    } else {
      R(5, 4, 6, 6, skin); R(5, 4, 6, 1, hair); R(5, 5, 2, 4, hair); Q(7, 5, hair); Q(11, 7, skin);
      R(9, 6, 1, 2, eye); Q(8, 8, cheek); Q(10, 9, skinD);
      if (pal.glasses) { R(8, 6, 3, 1, '#555'); Q(9, 6, '#bfe3f5'); }
      if (pal.beard) { R(7, 8, 4, 2, hair); }
      if (pal.head === 'long') R(4, 5, 2, 7, hair);
    }
    // ---- couvre-chef ----
    const H = pal.head;
    if (H === 'straw') {
      R(5, 0, 6, 2, pal.hatC); R(6, 0, 3, 1, pal.hatL); R(5, 2, 6, 1, pal.band);
      if (!side) { R(2, 3, 12, 1, pal.hatC); Q(2, 3, pal.hatD); Q(13, 3, pal.hatD); R(5, 3, 6, 1, pal.hatD); }
      else { R(3, 3, 11, 1, pal.hatC); Q(13, 3, pal.hatD); Q(3, 3, pal.hatD); }
    } else if (H === 'cap') {
      R(4, 1, 8, 3, pal.hatC); R(5, 1, 3, 1, pal.hatD === pal.hatC ? pal.hatC : '#ffffff22');
      if (dir === 'down') R(3, 4, 10, 1, pal.hatD); else if (side) R(9, 3, 5, 1, pal.hatD);
    } else if (H === 'beanie') {
      R(4, 1, 8, 4, pal.hatC); R(4, 4, 8, 1, pal.hatD); R(7, 0, 2, 1, '#f5f5f5');
    } else if (H === 'helmet') {
      R(4, 1, 8, 3, pal.hatC); R(5, 0, 6, 1, pal.hatC); R(3, 4, 10, 1, pal.hatD);
      if (dir === 'down') { R(7, 1, 2, 2, '#fff7c0'); } else if (side) R(10, 1, 2, 2, '#fff7c0');
    } else if (H === 'bun') {
      R(4, 2, 8, 2, pal.hair); R(6, 0, 4, 2, pal.hair); Q(6, 1, '#d0d0d0');
    } else if (H === 'long' || H === 'none') {
      R(4, 2, 8, 2, pal.hair); R(5, 1, 6, 1, pal.hair);
    } else if (H === 'flower') {
      R(4, 2, 8, 2, pal.hair); R(5, 1, 6, 1, pal.hair);
      [[4, 2, '#ff6b8b'], [6, 1, '#ffd93b'], [8, 1, '#ffffff'], [10, 1, '#b28dff'], [11, 2, '#ff6b8b']].forEach(([x, y, c]) => Q(x, y, c));
    } else if (H === 'tophat') {
      R(5, 0, 6, 3, pal.hatC); R(5, 2, 6, 1, pal.band || '#c0392b'); R(3, 3, 10, 1, pal.hatD); R(6, 0, 2, 1, '#55555f');
    } else if (H === 'crown') {
      R(4, 2, 8, 2, pal.hair); R(4, 1, 8, 2, '#f2c94c'); Q(4, 0, '#f2c94c'); Q(7, 0, '#f2c94c'); Q(8, 0, '#f2c94c'); Q(11, 0, '#f2c94c'); Q(6, 1, '#e0244a'); Q(9, 1, '#5fd3f5'); R(4, 2, 8, 1, '#c99a1c');
    }
  });
  return dir === 'left' ? flipC(c) : c;
}
// Portrait 32×32 pour les dialogues
function portraitSprite(pal) {
  return mk(32, 32, P => {
    const { skin, skinD, hair } = pal;
    P.e(16, 31, 13, 7, pal.shirt); P.e(16, 33, 13, 6, pal.shirtD);
    if (pal.low === 'overalls') { P.r(10, 25, 2, 7, pal.pants); P.r(20, 25, 2, 7, pal.pants); P.p(11, 28, '#f2c94c'); P.p(20, 28, '#f2c94c'); }
    P.r(13, 21, 6, 4, skinD);
    if (pal.head === 'long') { P.r(6, 9, 4, 17, hair); P.r(22, 9, 4, 17, hair); }
    P.es(16, 14, 9, 10, skin, skinD, null);
    P.e(7, 15, 1.6, 2.4, skinD); P.e(25, 15, 1.6, 2.4, skinD);
    P.r(8, 4, 16, 5, hair); P.r(7, 6, 3, 6, hair); P.r(22, 6, 3, 6, hair);
    P.r(11, 13, 3, 3, '#2b1d10'); P.r(18, 13, 3, 3, '#2b1d10'); P.p(11, 13, '#fff'); P.p(18, 13, '#fff');
    P.r(10, 11, 4, 1, hair); P.r(18, 11, 4, 1, hair);
    P.r(9, 17, 3, 2, '#ec9a8a'); P.r(20, 17, 3, 2, '#ec9a8a');
    P.r(14, 19, 4, 1, '#9b4a3a'); P.p(13, 18, '#9b4a3a'); P.p(18, 18, '#9b4a3a');
    if (pal.glasses) { P.r(9, 12, 6, 1, '#444'); P.r(17, 12, 6, 1, '#444'); P.r(9, 16, 6, 1, '#444'); P.r(17, 16, 6, 1, '#444'); P.r(9, 12, 1, 5, '#444'); P.r(14, 12, 1, 5, '#444'); P.r(17, 12, 1, 5, '#444'); P.r(22, 12, 1, 5, '#444'); P.r(15, 13, 2, 1, '#444'); }
    if (pal.beard) { P.e(16, 20, 7, 4, hair); P.r(14, 18, 4, 1, hair); P.r(14, 19, 4, 1, '#9b4a3a'); }
    const H = pal.head;
    if (H === 'straw') { P.r(9, 0, 14, 5, pal.hatC); P.r(10, 0, 6, 1, pal.hatL); P.r(9, 4, 14, 2, pal.band); P.r(2, 6, 28, 2, pal.hatC); P.r(2, 7, 28, 1, pal.hatD); }
    else if (H === 'cap') { P.r(7, 1, 18, 7, pal.hatC); P.r(9, 2, 5, 1, '#ffffff33'); P.r(5, 7, 22, 2, pal.hatD); }
    else if (H === 'beanie') { P.r(7, 1, 18, 8, pal.hatC); P.r(7, 7, 18, 2, pal.hatD); for (let x = 8; x < 25; x += 3) P.r(x, 2, 1, 5, pal.hatD); P.e(16, 1, 2.5, 2, '#f5f5f5'); }
    else if (H === 'helmet') { P.e(16, 6, 10, 6, pal.hatC); P.r(5, 8, 22, 2, pal.hatD); P.r(14, 2, 4, 3, '#fff7c0'); P.r(13, 1, 6, 1, '#888'); }
    else if (H === 'bun') { P.e(16, 2.5, 4, 3, hair); P.r(8, 4, 16, 4, hair); P.p(15, 1, '#e0e0e0'); }
    else if (H === 'long' || H === 'none') { P.r(8, 3, 16, 5, hair); P.r(9, 2, 14, 1, hair); }
    else if (H === 'flower') { P.r(8, 3, 16, 5, hair); [[8, 4, '#ff6b8b'], [12, 2, '#ffd93b'], [16, 2, '#ffffff'], [20, 2, '#b28dff'], [24, 4, '#ff6b8b']].forEach(([x, y, c]) => { P.e(x, y, 2, 2, c); P.p(x, y, '#f2a900'); }); }
    else if (H === 'tophat') { P.r(9, 0, 14, 7, pal.hatC); P.r(9, 4, 14, 2, pal.band || '#c0392b'); P.r(4, 6, 24, 2, pal.hatD); P.r(11, 1, 3, 3, '#55555f'); }
    else if (H === 'crown') { P.r(8, 4, 16, 4, hair); P.r(8, 2, 16, 4, '#f2c94c'); [8, 13, 18, 23].forEach(x => P.r(x, 0, 2, 3, '#f2c94c')); P.r(8, 5, 16, 1, '#c99a1c'); P.e(12, 3.5, 1.2, 1.2, '#e0244a'); P.e(20, 3.5, 1.2, 1.2, '#5fd3f5'); P.e(16, 3, 1.4, 1.4, '#2ecc71'); }
  });
}

// ============================================================
//  SOLS DES BIOMES
// ============================================================
function forestTile(A, x, y) {
  const R = rng(hash(x, y) + 21);
  A.r(0, 0, 16, 16, '#3f7f35');
  for (let i = 0; i < 10; i++) A.p(R() * 16 | 0, R() * 16 | 0, '#47893b');
  for (let i = 0; i < 9; i++) A.p(R() * 16 | 0, R() * 16 | 0, '#356e2d');
  for (let i = 0; i < 3; i++) { const lx = R() * 14 | 0, ly = R() * 14 | 0; A.r(lx, ly, 2, 1, ['#8a5a2c', '#a0703c', '#c0802a'][i]); }
}
function snowTile(A, x, y) {
  const R = rng(hash(x, y) + 31);
  A.r(0, 0, 16, 16, '#e9f1f7');
  for (let i = 0; i < 9; i++) A.p(R() * 16 | 0, R() * 16 | 0, '#d6e3ee');
  for (let i = 0; i < 5; i++) A.p(R() * 16 | 0, R() * 16 | 0, '#ffffff');
  if (R() < .3) { const sx = R() * 12 | 0, sy = R() * 12 | 0; A.r(sx, sy, 3, 2, '#9aa4ad'); A.p(sx, sy, '#c0c8cf'); }
}
function stoneTile(A, x, y) {
  A.r(0, 0, 16, 16, '#a8a29a');
  const R = rng(hash(x, y) + 41);
  for (let r = 0; r < 4; r++) for (let c = 0; c < 2; c++) {
    const ox = c * 8 + (r % 2 ? 4 : 0), oy = r * 4;
    const col = ['#bdb7ae', '#b3ada4', '#c6c0b7'][R() * 3 | 0];
    A.r((ox + 1) % 16, oy + 1, 6, 2, col); A.r((ox + 1) % 16, oy + 1, 6, 1, '#d2ccc3');
  }
}
function cliffTile(A, x, y) {
  const R = rng(hash(x, y) + 51);
  A.r(0, 0, 16, 16, '#7d7f86');
  for (let i = 0; i < 5; i++) { const cx = R() * 13 | 0, cy = R() * 13 | 0; A.r(cx, cy, 4, 3, '#8f9198'); A.r(cx, cy + 3, 4, 1, '#62646b'); A.p(cx, cy, '#a3a5ab'); }
  if (R() < .5) A.r(0, 0, 16, 2, '#f2f6fa');
}
function plankTile(A, vertical) {
  A.r(0, 0, 16, 16, '#9a6434');
  for (let i = 0; i < 4; i++) {
    if (vertical) { A.r(i * 4, 0, 1, 16, '#6e4520'); A.r(i * 4 + 1, 0, 1, 16, '#b97d45'); }
    else { A.r(0, i * 4, 16, 1, '#6e4520'); A.r(0, i * 4 + 1, 16, 1, '#b97d45'); }
  }
  A.p(3, 2, '#3a2410'); A.p(12, 10, '#3a2410');
}

// ============================================================
//  RESSOURCES À RÉCOLTER
// ============================================================
function mushroomNode(v) {
  return mk(16, 16, P => {
    const caps = [['#d64541', '#ff8a7a'], ['#a8733f', '#d0a070']][v];
    [[5, 11, 3.2], [11, 13, 2.4]].forEach(([x, y, r], i) => {
      P.r(x - 1, y - 1, 2, 4, '#f3e9d2'); P.e(x, y - 2, r, r * .7, caps[0]); P.p(x - 1, y - 3, caps[1]);
      if (v === 0) { P.p(x + 1, y - 2, '#fff'); P.p(x - 2, y - 2, '#fff'); }
    });
  });
}
function branchNode() {
  return mk(16, 14, P => {
    P.line(2, 11, 13, 7, '#7a4a24'); P.line(2, 12, 13, 8, '#5a3518'); P.line(4, 8, 14, 11, '#8a5a2c'); P.line(4, 9, 14, 12, '#6e4520');
    P.line(6, 10, 4, 5, '#7a4a24'); P.p(4, 4, '#4caf50'); P.p(3, 5, '#7bd06b');
    P.e(2, 11.5, 1.2, 1.2, '#c9a066'); P.p(14, 11, '#c9a066');
  });
}
function berryNode(full) {
  return mk(18, 15, P => {
    P.es(9, 8.5, 8, 5.6, '#2f7d32', '#235e26', '#4c9a3f');
    if (full) [[5, 6], [10, 5], [13, 9], [7, 10], [11, 11], [4, 9]].forEach(([x, y]) => { P.p(x, y, '#4a5bd6'); P.p(x + 1, y, '#3242a8'); P.p(x, y - 1, '#8a9cf0'); });
  }, '#163020');
}
function shellNode(v) {
  return mk(12, 9, P => {
    if (v === 0) { P.e(6, 5, 4.5, 3.5, '#f7c6c9'); for (let i = -3; i <= 3; i += 2) P.line(6, 8, 6 + i, 2, '#e09aa0'); P.r(5, 7, 3, 2, '#f7c6c9'); }
    else { P.e(6, 5, 4, 3, '#f3e3c3'); P.line(3, 5, 10, 4, '#d8c39a'); P.p(9, 2, '#f3e3c3'); P.p(10, 2, '#d8c39a'); }
  });
}
function rockNode(kind) {
  return mk(16, 14, P => {
    P.es(8, 8, 7, 5.5, '#8d8f96', '#6b6d74', '#b0b2b8');
    P.line(5, 6, 8, 9, '#6b6d74'); P.p(11, 5, '#c4c6cc');
    if (kind === 'iron') [[5, 9], [10, 7], [8, 11], [12, 10], [6, 5]].forEach(([x, y]) => { P.p(x, y, '#c8702a'); P.p(x + 1, y, '#e8954a'); });
    if (kind === 'crystal') { [[6, 6, 4], [9, 4, 6], [12, 7, 3]].forEach(([x, y, h]) => { P.r(x, y - h + 3, 2, h, '#5fd3f5'); P.p(x, y - h + 3, '#d6f6ff'); P.p(x + 1, y + 2, '#2fa3c8'); }); }
    if (kind === 'snowrock') P.r(3, 3, 9, 2, '#f2f6fa');
    if (kind === 'gold') [[5, 8], [10, 6], [8, 11], [12, 9]].forEach(([x, y]) => { P.r(x, y, 2, 2, '#f2c94c'); P.p(x, y, '#fff3b0'); });
    if (kind === 'rubis' || kind === 'emeraude') { const c = kind === 'rubis' ? ['#e0244a', '#ff7a90', '#9e1430'] : ['#2ecc71', '#a8f0c6', '#1e8f4e']; [[6, 7], [10, 9]].forEach(([x, y]) => { P.r(x, y - 1, 3, 3, c[0]); P.p(x, y - 1, c[1]); P.p(x + 2, y + 1, c[2]); P.p(x + 1, y - 2, c[0]); }); }
    if (kind === 'cave') { P.r(3, 4, 10, 1, '#a3a5ab'); }
  });
}
function rubbleNode() {
  return mk(14, 6, P => { [[3, 3], [7, 4], [10, 2], [5, 5]].forEach(([x, y]) => { P.r(x, y, 2, 1, '#8d8f96'); P.p(x, y - 1, '#b0b2b8'); }); }, null);
}

// ============================================================
//  DÉCOR SUPPLÉMENTAIRE
// ============================================================
function palmSprite() {
  return mk(28, 36, P => {
    for (let y = 14; y < 36; y++) { const x = 13 + Math.round(Math.sin((y - 14) / 9) * 2); P.r(x, y, 3, 1, y % 3 ? '#a0703c' : '#7a4a24'); }
    [[-1, -.2], [1, -.25], [-1, .35], [1, .3], [0, -1]].forEach(([dx, dy]) => {
      for (let i = 0; i < 12; i++) { const x = 14 + dx * i, y = 13 + dy * i + (i * i) * .06; P.r(x, y, 2, 2, i > 8 ? '#3f9b3c' : '#2f8a3a'); P.p(x, y - 1, '#5fbf55'); }
    });
    P.e(13, 15, 1.6, 1.6, '#7a4a24'); P.e(16, 15, 1.6, 1.6, '#6b3f1f');
  }, '#163020');
}
function snowPineSprite() {
  const c = pineSprite();
  const g = c.getContext('2d'), d = g.getImageData(0, 0, c.width, c.height), a = d.data;
  for (let y = 0; y < c.height; y++) for (let x = 0; x < c.width; x++) {
    const i = (y * c.width + x) * 4, above = ((y - 1) * c.width + x) * 4;
    if (a[i + 3] > 0 && y > 0 && a[above + 3] === 0 && a[i + 1] > 60) { a[i] = 240; a[i + 1] = 246; a[i + 2] = 250; }
  }
  g.putImageData(d, 0, 0); return c;
}
function lampSprite() {
  return mk(8, 26, P => { P.r(3, 6, 2, 19, '#3a3a44'); P.r(2, 24, 4, 2, '#3a3a44'); P.r(1, 1, 6, 5, '#3a3a44'); P.r(2, 2, 4, 3, '#ffe9a0'); P.r(3, 0, 2, 1, '#3a3a44'); });
}
function wellSprite() {
  return mk(18, 24, P => {
    P.r(2, 4, 2, 12, '#7a4a24'); P.r(14, 4, 2, 12, '#7a4a24'); P.r(0, 1, 18, 4, '#8e2b22'); P.r(0, 1, 18, 1, '#c0392b');
    P.r(8, 5, 1, 6, '#c9a066'); P.r(7, 10, 3, 3, '#7a4a24');
    P.e(9, 18, 8, 5, '#8d8f96'); P.e(9, 17, 6, 3, '#2b4f7a'); P.r(1, 18, 16, 5, '#8d8f96'); for (let x = 1; x < 17; x += 4) P.r(x, 18, 1, 5, '#6b6d74'); P.r(1, 20, 16, 1, '#6b6d74');
  });
}
function cottageSprite(roof, roofD, wall) {
  return mk(64, 60, P => {
    for (let y = 4; y < 30; y++) { const ind = Math.floor((29 - y) / 2.4); P.r(ind, y, 64 - 2 * ind, 1, (y - 4) % 4 === 3 ? roofD : roof); }
    P.r(0, 28, 64, 2, roofD);
    P.r(3, 30, 58, 26, wall); for (let y = 34; y < 56; y += 4) P.r(3, y, 58, 1, '#00000014');
    P.r(26, 40, 12, 18, '#6e4520'); P.r(28, 42, 8, 16, '#8a5a2c'); P.p(34, 50, '#f2c94c');
    for (const wx of [8, 44]) { P.r(wx, 38, 12, 11, '#f4efe4'); P.r(wx + 2, 40, 8, 7, '#9fd3f5'); P.r(wx + 5, 40, 2, 7, '#f4efe4'); P.r(wx - 1, 49, 14, 2, '#7a4a24'); P.p(wx + 2, 48, '#ff6b8b'); P.p(wx + 8, 48, '#ffd93b'); }
    P.r(1, 56, 62, 4, '#9b9089'); P.r(1, 56, 62, 1, '#b9b0a8');
  }, '#2a1d14');
}
function mairieSprite() {
  return mk(96, 84, P => {
    P.r(44, 0, 1, 14, '#5a4630'); P.r(45, 1, 10, 6, '#3d7fd6'); P.r(45, 3, 10, 2, '#f5f5f5');
    for (let y = 12; y < 42; y++) { const ind = Math.floor((41 - y) / 2.2); P.r(ind, y, 96 - 2 * ind, 1, (y - 12) % 4 === 3 ? '#2c548f' : '#3b6fb6'); }
    P.r(0, 40, 96, 2, '#1f3f6e');
    P.e(48, 26, 7, 7, '#f4efe4'); P.e(48, 26, 5.5, 5.5, '#fffdf6'); P.line(48, 26, 48, 22, '#2b1d10'); P.line(48, 26, 51, 26, '#2b1d10');
    P.r(4, 42, 88, 36, '#efe2c8'); for (let y = 46; y < 78; y += 5) P.r(4, y, 88, 1, '#ddcfb1');
    for (const cx of [10, 30, 62, 82]) { P.r(cx, 42, 4, 36, '#f8f2e4'); P.r(cx + 3, 42, 1, 36, '#d8ccb2'); }
    P.r(40, 54, 16, 24, '#6e4520'); P.e(48, 54, 8, 4, '#6e4520'); P.r(42, 56, 12, 22, '#8a5a2c'); P.r(47, 52, 2, 26, '#5c3a1a'); P.p(45, 66, '#f2c94c'); P.p(50, 66, '#f2c94c');
    for (const wx of [16, 68]) { P.r(wx, 50, 12, 16, '#f4efe4'); P.r(wx + 2, 52, 8, 12, '#9fd3f5'); P.r(wx + 5, 52, 2, 12, '#f4efe4'); P.r(wx + 2, 57, 8, 1, '#f4efe4'); P.r(wx - 1, 66, 14, 2, '#8a5a2c'); [1, 5, 9].forEach((o, i) => P.p(wx + o + 1, 65, ['#ff6b8b', '#ffd93b', '#b28dff'][i])); }
    P.r(36, 78, 24, 2, '#b5aaa2'); P.r(2, 78, 92, 6, '#9b9089'); P.r(2, 78, 92, 1, '#b9b0a8');
  }, '#1f2a3a');
}
function cabinSprite() {
  return mk(64, 56, P => {
    for (let y = 2; y < 24; y++) { const ind = Math.floor((23 - y) / 1.6); P.r(ind, y, 64 - 2 * ind, 1, (y % 3) ? '#4f6b3a' : '#3f5a2a'); }
    P.r(0, 22, 64, 2, '#2f4620');
    for (let y = 24; y < 52; y += 4) { P.r(3, y, 58, 4, '#8a5a2c'); P.r(3, y + 3, 58, 1, '#6e4520'); P.e(3, y + 2, 2, 2, '#c9a066'); P.e(60, y + 2, 2, 2, '#c9a066'); }
    P.r(25, 34, 14, 18, '#5c3a1a'); P.r(27, 36, 10, 16, '#6e4520'); P.p(35, 44, '#f2c94c');
    P.r(8, 32, 10, 9, '#e2c08a'); P.r(10, 34, 6, 5, '#9fd3f5'); P.r(46, 32, 10, 9, '#e2c08a'); P.r(48, 34, 6, 5, '#9fd3f5');
    P.r(1, 52, 62, 4, '#7d736c');
    P.r(44, 44, 14, 8, '#7a4a24'); for (let x = 45; x < 57; x += 3) P.e(x + 1, 44, 1.5, 1.5, '#c9a066');
  }, '#1f2a14');
}
function hutSprite() {
  return mk(64, 52, P => {
    for (let y = 2; y < 22; y++) { const ind = Math.floor((21 - y) / 1.3); P.r(ind, y, 64 - 2 * ind, 1, y % 3 ? '#e2c27a' : '#c9a85a'); }
    for (let x = 2; x < 62; x += 3) P.r(x, 20, 1, 3, '#b8964a');
    P.r(4, 22, 56, 26, '#5fa3c8'); for (let x = 4; x < 60; x += 4) P.r(x, 22, 1, 26, '#4a8ab0');
    P.r(26, 30, 12, 18, '#f5f5f5'); P.r(28, 32, 8, 16, '#3d7fd6');
    P.e(14, 34, 4, 4, '#f4efe4'); P.e(14, 34, 3, 3, '#9fd3f5'); P.e(50, 34, 4, 4, '#f4efe4'); P.e(50, 34, 3, 3, '#9fd3f5');
    P.r(2, 48, 60, 4, '#9a6434'); P.e(56, 44, 3, 3, '#e67e22'); P.r(54, 40, 1, 4, '#7a4a24');
  }, '#1f2a3a');
}
function caveSprite() {
  return mk(64, 52, P => {
    P.es(32, 30, 31, 22, '#7d7f86', '#62646b', '#9a9ca2');
    P.r(4, 6, 56, 4, '#f2f6fa'); P.e(32, 8, 24, 5, '#f2f6fa');
    P.e(32, 38, 13, 14, '#1a1a22'); P.r(19, 38, 26, 14, '#1a1a22');
    P.r(19, 30, 2, 22, '#8a5a2c'); P.r(43, 30, 2, 22, '#8a5a2c'); P.r(18, 28, 28, 3, '#8a5a2c');
    P.r(30, 44, 4, 8, '#5a3a1a'); P.line(24, 51, 40, 51, '#9a6434');
    P.e(50, 46, 3, 2, '#f1c40f'); P.r(49, 43, 2, 2, '#f1c40f');
  }, '#2a2a33');
}
function logGate() {
  return mk(32, 32, P => {
    P.r(0, 14, 32, 10, '#7a4a24'); P.r(0, 14, 32, 2, '#9a6434'); P.r(0, 22, 32, 2, '#5a3518');
    for (let x = 3; x < 30; x += 7) P.r(x, 17, 3, 1, '#5a3518');
    P.e(2, 19, 3, 5, '#c9a066'); P.e(2, 19, 1.5, 3, '#a0703c');
    P.e(30, 12, 5, 4, '#2f7d32'); P.e(26, 10, 3, 3, '#3f8a35'); P.r(27, 12, 3, 4, '#7a4a24');
    P.r(10, 6, 2, 9, '#a0703c'); P.r(7, 4, 8, 5, '#c58c50'); P.r(8, 5, 6, 1, '#e8d6a0'); P.r(8, 7, 4, 1, '#e8d6a0');
  });
}
function bridgeBroken() {
  return mk(32, 32, P => {
    for (let y = 0; y < 32; y += 4) { if (y >= 8 && y < 20) continue; P.r(1, y, 30, 3, '#9a6434'); P.r(1, y, 30, 1, '#b97d45'); }
    P.r(0, 0, 2, 32, '#6e4520'); P.r(30, 0, 2, 32, '#6e4520');
    P.r(4, 10, 6, 2, '#7a4a24'); P.r(20, 16, 8, 2, '#7a4a24');
    P.r(12, 22, 2, 9, '#a0703c'); P.r(9, 22, 9, 5, '#c58c50'); P.r(10, 23, 6, 1, '#e8d6a0');
  }, null);
}
function bridgeFixed() {
  return mk(32, 32, P => {
    for (let y = 0; y < 32; y += 4) { P.r(1, y, 30, 3, '#a8733f'); P.r(1, y, 30, 1, '#c58c50'); P.r(1, y + 3, 30, 1, '#6e4520'); }
    P.r(0, 0, 2, 32, '#5a3518'); P.r(30, 0, 2, 32, '#5a3518');
  }, null);
}
function rockslideGate() {
  return mk(32, 32, P => {
    [[8, 20, 7], [22, 18, 8], [15, 10, 7], [26, 27, 5], [6, 28, 5], [16, 25, 6]].forEach(([x, y, r]) => P.es(x, y, r, r * .8, '#8d8f96', '#6b6d74', '#b0b2b8'));
    P.r(10, 6, 12, 2, '#f2f6fa'); P.r(18, 13, 8, 1, '#f2f6fa');
  });
}

// Icônes des nouveaux objets
Object.assign(ICON_DRAW, {
  bois: P => { [[3, 9], [7, 5], [9, 10]].forEach(([x, y]) => { P.r(x, y, 6, 4, '#8a5a2c'); P.r(x, y, 6, 1, '#a8733f'); P.e(x, y + 2, 1.5, 2, '#d8b47c'); P.p(x, y + 2, '#a0703c'); }); },
  champi: P => { P.r(6, 8, 4, 6, '#f3e9d2'); P.r(9, 8, 1, 6, '#d9cdb0'); P.e(8, 7, 6, 4, '#d64541'); P.r(2, 7, 12, 1, '#a83232'); P.p(5, 5, '#fff'); P.p(10, 4, '#fff'); P.p(8, 6, '#fff'); P.p(11, 6, '#fff'); },
  baie: P => { [[5, 9], [10, 8], [8, 12], [7, 6]].forEach(([x, y]) => { P.e(x, y, 2.5, 2.5, '#4a5bd6'); P.p(x - 1, y - 1, '#8a9cf0'); P.p(x + 1, y + 1, '#3242a8'); }); P.r(9, 2, 4, 2, C.g); P.p(8, 3, C.gd); },
  coquillage: P => { P.e(8, 9, 6, 4.5, '#f7c6c9'); for (let i = -4; i <= 4; i += 2) P.line(8, 13, 8 + i, 5, '#e09aa0'); P.r(6, 12, 5, 2, '#f7c6c9'); },
  poisson: P => { P.e(7, 8, 5.5, 3.2, '#6aa6d6'); P.e(7, 9.5, 4.5, 1.5, '#d6ecf8'); P.r(12, 5, 3, 7, '#4a86b6'); P.r(13, 7, 2, 3, '#6aa6d6'); P.p(4, 7, '#1a1a22'); P.line(7, 6, 10, 6, '#4a86b6'); },
  saumon: P => { P.e(7, 8, 6, 3.4, '#f08a6a'); P.e(7, 9.5, 5, 1.5, '#ffd2c0'); P.r(12, 5, 3, 7, '#d0604a'); P.p(4, 7, '#1a1a22'); [[6, 7], [8, 6], [10, 7]].forEach(([x, y]) => P.p(x, y, '#c04a3a')); },
  pierre: P => { P.es(8, 9, 6, 4.8, '#8d8f96', '#6b6d74', '#b0b2b8'); P.line(5, 8, 8, 11, '#6b6d74'); },
  fer: P => { P.r(2, 8, 12, 5, '#9aa4ad'); P.r(4, 6, 12, 5, '#b8c2cb'); P.r(4, 6, 12, 1, '#dfe6ec'); P.r(2, 12, 12, 1, '#6b747c'); P.r(14, 7, 1, 4, '#7d868e'); },
  cristal: P => { [[5, 13, 7], [8, 13, 10], [11, 13, 6]].forEach(([x, y, h]) => { P.r(x - 1, y - h, 3, h, '#5fd3f5'); P.p(x - 1, y - h, '#d6f6ff'); P.r(x + 1, y - h + 1, 1, h - 1, '#2fa3c8'); }); P.r(3, 13, 10, 2, '#8d8f96'); },
  confiture: P => { P.r(4, 5, 8, 10, '#5a2a8a'); P.r(4, 5, 1, 10, '#7a4aaa'); P.r(3, 3, 10, 3, '#f4efe4'); P.r(3, 3, 10, 1, '#d64541'); P.p(3, 4, '#d64541'); P.p(12, 4, '#d64541'); P.r(5, 8, 6, 3, '#f4efe4'); P.p(7, 9, '#4a5bd6'); P.p(9, 9, '#d64541'); },
  soupe: P => { P.e(8, 10, 7, 4, '#e8d9b0'); P.r(1, 9, 14, 3, '#e8d9b0'); P.e(8, 9, 5.5, 2, '#e67e22'); P.p(6, 9, '#f2c94c'); P.p(10, 8, '#7cb342'); P.p(8, 10, '#d64541'); P.r(4, 3, 1, 3, '#ffffff99'); P.r(8, 2, 1, 4, '#ffffff99'); P.r(11, 4, 1, 2, '#ffffff99'); },
  bijou: P => { P.line(3, 3, 8, 10, '#f2c94c'); P.line(13, 3, 8, 10, '#f2c94c'); P.e(8, 11, 3, 3, '#5fd3f5'); P.p(7, 10, '#d6f6ff'); P.r(7, 13, 2, 1, '#2fa3c8'); },
});

// ============================================================
//  MACHINES
// ============================================================
function sprinklerSprite(f) {
  return mk(10, 16, P => {
    P.r(4, 6, 2, 9, '#6b747c'); P.r(5, 6, 1, 9, '#9aa4ad'); P.r(2, 14, 6, 2, '#5a6068');
    P.r(2, 3 + f, 6, 3, '#3d7fd6'); P.r(3, 2 + f, 4, 1, '#5aa9e8'); P.p(1, 4 + f, '#d8f1ff'); P.p(8, 4 + f, '#d8f1ff');
  });
}
function harvesterSprite() {
  return mk(28, 22, P => {
    P.r(3, 6, 16, 10, '#c0392b'); P.r(3, 6, 16, 2, '#e05a4a'); P.r(19, 9, 6, 7, '#962d22');
    P.r(6, 1, 9, 6, '#3a3a44'); P.r(7, 2, 7, 4, '#9fd3f5'); P.p(8, 3, '#fff');
    P.r(0, 12, 4, 6, '#f2c94c'); for (let y = 12; y < 18; y += 2) P.r(0, y, 4, 1, '#c9a23a');
    P.e(8, 17, 4, 4, '#2a2a33'); P.e(8, 17, 1.6, 1.6, '#9aa4ad'); P.e(20, 18, 3, 3, '#2a2a33'); P.e(20, 18, 1.2, 1.2, '#9aa4ad');
    P.r(22, 3, 2, 6, '#5a6068');
  });
}
function seederSprite() {
  return mk(22, 16, P => {
    P.r(2, 3, 18, 7, '#e67e22'); P.r(2, 3, 18, 2, '#f5a04a'); for (let x = 4; x < 20; x += 4) P.r(x, 10, 2, 3, '#6b747c');
    P.r(5, 0, 12, 3, '#8a5a2c'); P.p(8, 1, '#f2c94c'); P.p(12, 1, '#7cb342');
    P.e(4, 13, 2.5, 2.5, '#2a2a33'); P.e(18, 13, 2.5, 2.5, '#2a2a33');
  });
}
function troughSprite(full) {
  return mk(20, 10, P => {
    P.r(1, 3, 18, 6, '#8a5a2c'); P.r(1, 3, 18, 1, '#a8733f'); P.r(2, 9, 2, 1, '#5a3518'); P.r(16, 9, 2, 1, '#5a3518');
    if (full) { P.r(3, 2, 14, 2, '#e8c55a'); P.p(5, 1, '#e8c55a'); P.p(11, 1, '#f1c40f'); }
    P.r(8, 0, 4, 3, '#9aa4ad'); P.r(9, 0, 2, 1, '#dfe6ec');
  });
}
function basketSprite() {
  return mk(16, 14, P => {
    P.r(2, 5, 12, 8, '#c58c50'); for (let x = 3; x < 14; x += 3) P.r(x, 5, 1, 8, '#9a6434'); P.r(2, 8, 12, 1, '#9a6434');
    P.line(3, 5, 8, 0, '#9a6434'); P.line(13, 5, 8, 0, '#9a6434');
    P.e(6, 5, 2, 1.6, '#fbf3e4'); P.e(10, 5, 2, 1.6, '#fbf3e4');
  });
}

// ============================================================
//  MINE, CHANTIERS, BOUTIQUES D'ATELIER
// ============================================================
function caveFloorTile(A, x, y) {
  const R = rng(hash(x, y) + 61);
  A.r(0, 0, 16, 16, '#4a4038');
  for (let i = 0; i < 10; i++) A.p(R() * 16 | 0, R() * 16 | 0, '#564a40');
  for (let i = 0; i < 8; i++) A.p(R() * 16 | 0, R() * 16 | 0, '#3e352e');
  if (R() < .35) { const sx = R() * 12 | 0, sy = R() * 12 | 0; A.r(sx, sy, 3, 2, '#5f544a'); A.p(sx, sy, '#6e6257'); }
}
function caveWallTile(A, x, y) {
  const R = rng(hash(x, y) + 71);
  A.r(0, 0, 16, 16, '#2a2420');
  for (let i = 0; i < 4; i++) { const cx = R() * 12 | 0, cy = R() * 12 | 0; A.r(cx, cy, 5, 4, '#352d27'); A.r(cx, cy, 5, 1, '#40362f'); }
  if (R() < .12) { const cx = 3 + (R() * 9 | 0), cy = 3 + (R() * 9 | 0); A.p(cx, cy, '#5fd3f5'); A.p(cx + 1, cy + 1, '#2fa3c8'); }
}
function torchSprite(f) {
  return mk(16, 22, P => {
    P.r(7, 8, 2, 13, '#7a4a24'); P.r(6, 7, 4, 2, '#5a3518');
    P.e(8, 4 + f * .5, 3, 4, '#ff9f1c'); P.e(8, 5, 1.8, 2.5, '#ffe066'); P.p(8, 1 - f, '#ffd166');
  });
}
function ladderSprite() {
  return mk(32, 24, P => {
    P.e(16, 18, 15, 6, '#1a1612'); P.r(10, 0, 2, 20, '#9a6434'); P.r(20, 0, 2, 20, '#9a6434');
    for (let y = 2; y < 20; y += 4) P.r(10, y, 12, 2, '#b97d45');
    P.r(3, 8, 26, 3, '#3a3a44'); P.r(3, 8, 26, 1, '#f2f6fa');
  });
}
function siteSprite() {
  return mk(48, 46, P => {
    P.r(2, 24, 44, 20, '#b38a52'); for (let i = 0; i < 18; i++) P.p(4 + (i * 7) % 40, 26 + (i * 5) % 16, '#9c7444');
    P.r(4, 12, 2, 32, '#9a6434'); P.r(42, 12, 2, 32, '#9a6434'); P.r(4, 12, 40, 2, '#9a6434'); P.line(6, 14, 42, 40, '#7a4a24');
    P.r(18, 30, 12, 6, '#c58c50'); P.r(18, 30, 12, 1, '#e0ad72'); P.r(20, 37, 8, 4, '#8d8f96');
    P.r(30, 4, 2, 16, '#7a4a24'); P.r(22, 2, 18, 9, '#f2c94c'); P.r(22, 2, 18, 1, '#ffe08a'); P.r(24, 5, 14, 1, '#2a1d14'); P.r(24, 7, 10, 1, '#2a1d14');
  });
}
function shopSprite(roof, roofD, wall, icon) {
  return mk(48, 46, P => {
    for (let y = 2; y < 20; y++) { const ind = Math.floor((19 - y) / 1.5); P.r(ind, y, 48 - 2 * ind, 1, (y - 2) % 3 === 2 ? roofD : roof); }
    P.r(0, 18, 48, 2, roofD); P.r(36, 0, 6, 10, '#8a7d72'); P.r(35, 0, 8, 2, '#5f554d');
    P.r(3, 20, 42, 22, wall); for (let y = 24; y < 42; y += 4) P.r(3, y, 42, 1, '#00000012');
    P.r(19, 28, 10, 14, '#6e4520'); P.r(21, 30, 6, 12, '#8a5a2c'); P.p(26, 36, '#f2c94c');
    for (const wx of [6, 32]) { P.r(wx, 21, 10, 9, '#f4efe4'); P.r(wx + 1, 22, 8, 7, '#9fd3f5'); P.r(wx + 4, 22, 2, 7, '#f4efe4'); }
    P.r(16, 20, 16, 9, '#7a4a24'); P.r(17, 21, 14, 7, '#e8cf9c');
    P.g.drawImage(icon, 0, 0, 16, 16, 19, 20, 10, 10);
    P.r(1, 42, 46, 4, '#9b9089'); P.r(1, 42, 46, 1, '#b9b0a8');
  });
}
Object.assign(ICON_DRAW, {
  or: P => { P.es(8, 9, 5.5, 4.5, '#f2c94c', '#c99a1c', '#fff3b0'); P.es(5, 11, 2.5, 2, '#e0b030', '#b8860b', null); P.p(9, 7, '#ffffff'); P.p(11, 10, '#c99a1c'); },
});

// ============================================================
//  ANIMAUX DES BIOMES
// ============================================================
function rabbitSprite(f) {
  return mk(14, 13, P => {
    const w = '#f5f0ff', d = '#d8d0ea';
    P.e(8, 8, 4.6, 3.6, w); P.e(9, 10, 3.6, 1.5, d); P.e(12.5, 7, 1.6, 1.6, '#ffffff');
    P.e(4, 6, 2.6, 2.4, w); P.r(3, f, 1, 4, w); P.r(5, 0, 1, 4, w); P.p(3, 1 + f, '#f7b8c8'); P.p(5, 1, '#f7b8c8');
    P.p(3, 6, '#222'); P.p(1, 7, '#f7a6b4');
    P.r(6, 11, 2, 1, d); P.r(9, 11 - f, 2, 1, d);
  });
}
function deerSprite(f) {
  return mk(24, 24, P => {
    const b = '#b07a42', bd = '#8a5a2c', bl = '#d8a870';
    const legs = f ? [[8, -1], [10, 0], [17, 0], [19, -1]] : [[8, 0], [10, -1], [17, -1], [19, 0]];
    legs.forEach(([x, d]) => { P.r(x, 16 + d, 1, 6, bd); P.p(x, 22 + d, '#3a2410'); });
    P.es(14, 13, 7.5, 4.2, b, bd, bl); P.e(14, 15, 5, 1.6, '#f0dcc0'); [[11, 11], [15, 10], [18, 12]].forEach(([x, y]) => P.p(x, y, '#f4efe4'));
    P.r(6, 7, 3, 7, b); P.es(5, 6, 3, 2.6, b, bd, null); P.r(1, 6, 3, 2, bl); P.p(1, 6, '#2a1d14'); P.p(4, 5, '#222');
    P.r(7, 4, 2, 1, bd);
    P.line(4, 3, 3, 0, '#e8d6a0'); P.line(4, 2, 6, 0, '#e8d6a0'); P.line(6, 3, 8, 1, '#e8d6a0'); P.line(7, 2, 9, 0, '#e8d6a0');
    P.r(21, 11, 2, 2, '#f4efe4');
  });
}
function foxSprite(f) {
  return mk(20, 14, P => {
    const w = '#f6f8fb', d = '#d8e0ea';
    P.e(11, 8, 5.6, 3.4, w); P.e(11, 10, 4.5, 1.4, d);
    P.e(17, 6, 2.6, 2, w); P.e(18.5, 4.5, 1.5, 1.6, w); P.p(19, 3, '#ffffff');
    P.e(4.5, 6.5, 3, 2.6, w); P.r(3, 2, 1, 3, w); P.r(6, 2, 1, 3, w); P.p(3, 3, '#f7b8c8'); P.p(6, 3, '#f7b8c8');
    P.r(0, 7, 3, 2, w); P.p(0, 7, '#2a1d14'); P.p(4, 6, '#222');
    const legs = f ? [[7, -1], [9, 0], [13, 0], [15, -1]] : [[7, 0], [9, -1], [13, -1], [15, 0]];
    legs.forEach(([x, dd]) => { P.r(x, 11 + dd, 1, 2, d); P.p(x, 13 + dd, '#8a96a4'); });
  });
}
function goatSprite(f) {
  return mk(20, 18, P => {
    const w = '#f4efe4', d = '#d4ccbc';
    const legs = f ? [[7, -1], [9, 0], [14, 0], [16, -1]] : [[7, 0], [9, -1], [14, -1], [16, 0]];
    legs.forEach(([x, dd]) => { P.r(x, 12 + dd, 1, 4, d); P.p(x, 16 + dd, '#5a4630'); });
    P.es(12, 10, 6, 3.6, w, d, '#ffffff'); P.r(18, 7, 1, 3, w);
    P.es(5, 7, 3, 3, w, d, null); P.r(1, 8, 3, 2, w); P.p(1, 8, '#2a1d14'); P.p(4, 6, '#222');
    P.line(5, 4, 8, 1, '#8d8f96'); P.line(4, 4, 6, 1, '#b0b2b8'); P.r(3, 10, 2, 3, d);
  });
}
// ============================================================
//  NOUVELLES ICÔNES
// ============================================================
Object.assign(ICON_DRAW, {
  cepe: P => { P.r(6, 8, 5, 6, '#f3e9d2'); P.r(10, 8, 1, 6, '#d9cdb0'); P.e(8, 7, 6.5, 4.2, '#8a5a2c'); P.e(7, 5.5, 3, 1.5, '#b07a42'); P.r(2, 8, 13, 1, '#6e4520'); },
  myrtille: P => { [[5, 10], [9, 8], [11, 12], [7, 13], [4, 6]].forEach(([x, y]) => { P.e(x, y, 2.4, 2.4, '#3242a8'); P.p(x - 1, y - 1, '#8a9cf0'); P.p(x, y + 1, '#1f2a78'); }); P.r(9, 2, 4, 2, C.g); },
  melon: P => { P.es(8, 9, 6.5, 5.5, '#9bd36a', '#6fa84a', '#c6ec9a'); for (let x = 3; x < 14; x += 3) P.line(x, 5, x + 1, 13, '#6fa84a'); P.r(8, 2, 1, 3, '#5a3518'); P.p(9, 2, C.g); },
  vanille: P => { [[4, 3], [7, 2], [10, 3]].forEach(([x, y]) => { P.r(x, y, 2, 12, '#3a2a1a'); P.r(x, y, 1, 12, '#5a3a1a'); }); P.r(3, 9, 10, 2, '#c0392b'); P.e(13, 4, 2, 2, '#fff3b0'); },
  houx: P => { P.e(5, 8, 4, 2.5, '#1f6b2a'); P.e(11, 8, 4, 2.5, '#1f6b2a'); P.p(1, 8, '#0f3f16'); P.p(15, 8, '#0f3f16'); [[7, 10], [9, 10], [8, 12]].forEach(([x, y]) => { P.e(x, y, 1.6, 1.6, '#e0244a'); P.p(x - 1, y - 1, '#ff8a9a'); }); },
  edelweiss: P => { for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; P.e(8 + Math.cos(a) * 4.2, 8 + Math.sin(a) * 4.2, 2.2, 2.2, '#f8fbff'); } P.e(8, 8, 2.4, 2.4, '#f2c94c'); P.p(7, 7, '#d4a82c'); P.p(9, 9, '#d4a82c'); },
  angora: P => { P.es(8, 9, 6, 5, '#f5f0ff', '#d8d0ea', '#ffffff'); P.line(4, 7, 11, 12, '#d8d0ea'); P.line(5, 11, 11, 5, '#d8d0ea'); P.r(3, 2, 1, 4, '#f5f0ff'); P.r(6, 2, 1, 4, '#f5f0ff'); },
  boiscerf: P => { P.line(8, 15, 8, 6, '#c8a070'); P.line(8, 10, 4, 5, '#c8a070'); P.line(4, 5, 3, 2, '#c8a070'); P.line(8, 8, 12, 3, '#c8a070'); P.line(12, 3, 14, 2, '#c8a070'); P.line(6, 7, 6, 3, '#e8d6a0'); P.line(10, 6, 11, 2, '#e8d6a0'); },
  fourrure: P => { P.es(8, 9, 6.5, 4.5, '#f6f8fb', '#d8e0ea', '#ffffff'); P.e(13, 6, 2.5, 2, '#f6f8fb'); P.p(14, 4, '#ffffff'); [[5, 8], [8, 10], [10, 7]].forEach(([x, y]) => P.p(x, y, '#c0cad6')); },
  laitchevre: P => { P.r(5, 1, 6, 2, '#8a5a2c'); P.r(5, 3, 6, 3, '#f4efe4'); P.r(3, 6, 10, 9, '#fffaf0'); P.r(12, 6, 1, 9, '#e0d8c8'); P.r(3, 9, 10, 3, '#8a5a2c'); P.p(6, 10, '#f4efe4'); P.r(4, 6, 1, 3, '#fff'); },
  rubis: P => { P.r(5, 4, 6, 2, '#ff7a90'); P.r(3, 6, 10, 3, '#e0244a'); for (let y = 9; y < 14; y++) P.r(3 + (y - 8), y, 10 - (y - 8) * 2, 1, '#b01a38'); P.p(5, 6, '#ffd0d8'); },
  emeraude: P => { P.r(5, 3, 6, 10, '#2ecc71'); P.r(4, 4, 8, 8, '#2ecc71'); P.r(6, 4, 4, 8, '#58e08f'); P.r(10, 4, 2, 8, '#1e8f4e'); P.p(6, 5, '#d6f8e4'); },
  echarpe: P => { P.r(2, 3, 12, 4, '#f5f0ff'); P.r(9, 7, 4, 8, '#f5f0ff'); for (let x = 3; x < 14; x += 3) P.r(x, 3, 1, 4, '#d8d0ea'); P.r(9, 11, 4, 1, '#ff8fb1'); },
  manteau: P => { P.r(4, 3, 8, 12, '#f6f8fb'); P.r(1, 4, 3, 9, '#f6f8fb'); P.r(12, 4, 3, 9, '#f6f8fb'); P.r(7, 3, 2, 12, '#d8e0ea'); P.r(5, 2, 6, 2, '#ffffff'); [6, 9, 12].forEach(y => P.p(8, y, '#8a5a2c')); },
  chevre: P => { P.e(8, 10, 6.5, 4, '#fffaf0'); P.r(2, 6, 13, 4, '#fffaf0'); P.e(8, 6, 6.5, 2, '#f0e8d8'); P.p(6, 10, '#e0d8c8'); P.p(10, 9, '#e0d8c8'); P.r(10, 3, 1, 3, '#7cb342'); P.p(11, 3, '#7cb342'); },
  ragout: P => { P.e(8, 10, 7, 4, '#5a3a1a'); P.r(1, 9, 14, 3, '#5a3a1a'); P.e(8, 9, 5.5, 2, '#8a5a2c'); P.p(6, 9, '#e67e22'); P.p(10, 8, '#f3e9d2'); P.p(8, 10, '#e74c3c'); P.p(5, 8, '#a8733f'); P.r(4, 3, 1, 3, '#ffffff99'); P.r(8, 2, 1, 4, '#ffffff99'); },
  sculpture: P => { P.r(4, 12, 8, 3, '#8d8f96'); P.es(8, 8, 3.5, 4.5, '#c8a070', '#a0784a', '#e8d6a0'); P.line(6, 4, 4, 1, '#c8a070'); P.line(10, 4, 12, 1, '#c8a070'); P.p(7, 7, '#5a3a1a'); P.p(9, 7, '#5a3a1a'); },
  bague: P => { P.e(8, 10, 5, 4.5, '#f2c94c'); P.g.clearRect(5, 8, 6, 5); P.r(6, 3, 4, 4, '#e0244a'); P.p(6, 3, '#ffd0d8'); P.p(9, 6, '#9e1430'); },
  collier: P => { P.line(2, 2, 6, 10, '#9aa4ad'); P.line(14, 2, 10, 10, '#9aa4ad'); P.line(6, 10, 10, 10, '#9aa4ad'); P.e(8, 12, 2.5, 2.5, '#5fd3f5'); P.p(7, 11, '#d6f6ff'); P.r(7, 9, 2, 2, '#f2c94c'); },
  amulette: P => { P.line(3, 1, 8, 6, '#f2c94c'); P.line(13, 1, 8, 6, '#f2c94c'); P.e(8, 10, 4.5, 4.5, '#f2c94c'); P.e(8, 10, 3, 3, '#2ecc71'); P.p(7, 9, '#d6f8e4'); P.e(8, 10, 1, 1, '#1a1a22'); },
  broche: P => { P.r(3, 7, 10, 2, '#f2c94c'); P.r(5, 4, 6, 8, '#5fd3f5'); P.r(6, 3, 4, 10, '#5fd3f5'); P.r(6, 5, 2, 3, '#d6f6ff'); P.r(9, 8, 2, 4, '#2fa3c8'); },
  bracelet: P => { P.e(8, 9, 6, 4, '#2ecc71'); P.g.clearRect(5, 7, 6, 4); [[3, 7], [8, 5], [13, 7], [8, 13]].forEach(([x, y]) => { P.r(x - 1, y - 1, 2, 2, '#f2c94c'); }); },
  engrais: P => { P.r(4, 4, 8, 11, '#7cb342'); P.r(4, 4, 8, 2, '#5d8f2f'); P.r(5, 2, 6, 2, '#a5d66a'); P.r(6, 8, 4, 4, '#f4efe4'); P.p(7, 9, '#43a047'); P.p(8, 10, '#43a047'); P.p(8, 9, '#2e7d32'); },
  superengrais: P => { P.r(4, 4, 8, 11, '#f2c94c'); P.r(4, 4, 8, 2, '#c99a1c'); P.r(5, 2, 6, 2, '#ffe08a'); P.r(6, 8, 4, 4, '#f4efe4'); P.p(7, 9, '#43a047'); P.p(8, 10, '#43a047'); P.p(13, 3, '#fff'); P.p(2, 6, '#fff'); },
  cafe: P => { P.r(3, 6, 9, 8, '#f4efe4'); P.r(12, 8, 2, 4, '#f4efe4'); P.r(4, 7, 7, 2, '#6e4520'); P.r(3, 14, 10, 1, '#d8ccb2'); P.r(5, 2, 1, 3, '#ffffffaa'); P.r(8, 1, 1, 4, '#ffffffaa'); },
});

// Terres des jardins de biome
function themedSoil(theme, wet) {
  const pal = {
    foret:    wet ? ['#3a2a1c', '#2c2015', '#4a3624', '#4c9a3f'] : ['#5a4030', '#46321f', '#6e5038', '#5fa843'],
    plage:    wet ? ['#a08458', '#8a7048', '#b49868', '#d8c08a'] : ['#c9ad78', '#b39664', '#dcc290', '#ecd79a'],
    montagne: wet ? ['#4f4a52', '#3f3a42', '#625c66', '#e9f1f7'] : ['#6e6870', '#5a545c', '#837c86', '#ffffff'],
  }[theme];
  return mk(16, 16, P => {
    const [b, d, l, x] = pal;
    P.r(0, 0, 16, 16, b); P.r(0, 0, 16, 1, l); P.r(0, 0, 1, 16, l); P.r(0, 15, 16, 1, d); P.r(15, 0, 1, 16, d);
    [3, 7, 11].forEach(y => { P.r(2, y, 12, 1, d); P.r(2, y + 1, 12, 1, l); });
    const R = rng(theme.length * 7 + (wet ? 3 : 1));
    for (let i = 0; i < 5; i++) P.p(1 + (R() * 14 | 0), 1 + (R() * 14 | 0), x);
  }, null);
}
function wallTileDraw(A, x, y, conn) {
  A.r(2, 3, 12, 11, '#8d8f96');
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) { const ox = 2 + c * 4 + (r % 2 ? 2 : 0), oy = 3 + r * 4; A.r(Math.min(ox, 13), oy, 3, 3, ['#9a9ca2', '#a3a5ab', '#8a8c92'][(r + c) % 3]); }
  if (conn.l) A.r(0, 5, 3, 8, '#8d8f96'); if (conn.r) A.r(13, 5, 3, 8, '#8d8f96');
  if (conn.u) A.r(4, 0, 8, 4, '#8d8f96'); if (conn.d) A.r(4, 13, 8, 3, '#8d8f96');
  A.r(2, 2, 12, 2, '#f2f6fa'); if (conn.l) A.r(0, 4, 3, 1, '#f2f6fa'); if (conn.r) A.r(13, 4, 3, 1, '#f2f6fa');
  A.r(2, 13, 12, 1, '#6b6d74');
}
