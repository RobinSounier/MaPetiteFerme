// ============================================================
//  INTERFACE
// ============================================================
const mini = $('#mini'), mctx = mini.getContext('2d');
function clock() { const h = Math.floor(hour()), m = Math.floor(S.time % 60 / 10) * 10; return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0'); }
function lockedZoneRects(g, s) {
  for (const [z, Z] of Object.entries(ZONES)) {
    if (!Z.gate || S.gates[Z.gate]) continue;
    g.fillStyle = 'rgba(20,14,8,.55)';
    for (let y = 0; y < MH; y++) for (let x = 0; x < MW; x++) if (biomeAt(x, y) === z && map[y][x] !== T.CLIFF) g.fillRect(x * s, y * s, s, s);
  }
}
let miniLocked = null, miniKey = '';
function drawMini() {
  const key = Object.keys(S.gates).join(',');
  if (key !== miniKey || !miniLocked) {
    miniKey = key; miniLocked = document.createElement('canvas'); miniLocked.width = MW; miniLocked.height = MH;
    const g = miniLocked.getContext('2d'); g.drawImage(miniBase, 0, 0); lockedZoneRects(g, 1);
  }
  mctx.imageSmoothingEnabled = false;
  mctx.clearRect(0, 0, mini.width, mini.height);
  const P = S.player, R0 = inMine() ? [80, 0, 20, 48] : [0, 0, VW_TILES, MH];
  const s = Math.min(mini.width / R0[2], mini.height / R0[3]), ox = (mini.width - R0[2] * s) / 2 - R0[0] * s, oy = (mini.height - R0[3] * s) / 2;
  mctx.fillStyle = '#1a1612'; mctx.fillRect(0, 0, mini.width, mini.height);
  mctx.drawImage(miniLocked, R0[0], R0[1], R0[2], R0[3], ox + R0[0] * s, oy, R0[2] * s, R0[3] * s);
  mctx.save(); mctx.translate(ox, oy);
  const cur = STORY[S.story];
  if (cur) { const n = NPC_BY_ID[cur.npc]; if (n) { mctx.fillStyle = '#ffd54f'; mctx.fillRect(n.x * s - 2, n.y * s - 2, 4, 4); mctx.fillStyle = OUTLINE; mctx.fillRect(n.x * s - .5, n.y * s - 1.5, 1, 2); } }
  mctx.fillStyle = (now / 400 | 0) % 2 ? '#ffffff' : '#ff5252';
  mctx.fillRect(P.x * s - 2, P.y * s - 2, 4, 4);
  mctx.strokeStyle = OUTLINE; mctx.lineWidth = 1; mctx.strokeRect(P.x * s - 2.5, P.y * s - 2.5, 5, 5);
  mctx.restore();
}
function renderHud(target) {
  const need = xpNeed(S.level), maxed = S.level >= MAX_LEVEL;
  const z = biomeAt(Math.floor(S.player.x), Math.floor(S.player.y));
  patch($('#hudL'), `<div class="pcard" data-act="open" data-k="bag">
      <img class="pp" src="${SPR.portrait.farmer}" alt="">
      <div class="pinfo"><b>${esc(S.name)}</b><small>Ferme des ${esc(S.farm)}</small>
        <div class="lvl"><span class="badge">Niv. ${S.level}</span><div class="xpbar"><div style="width:${maxed ? 100 : Math.min(100, S.xp / need * 100)}%"></div></div><small>${maxed ? 'MAX' : `${S.xp}/${need}`}</small></div>
      </div></div>
    <div class="chips"><div class="chip">🪙 ${fmtN(S.coins)}</div><div class="chip">🪣 ${S.water}/${waterMax()}</div></div>
    <div class="chips">${Object.entries(S.buffs).filter(([, b]) => b.until > Date.now()).map(([t, b]) => `<div class="chip buff" title="${BUFF_INFO[t].name}">${BUFF_INFO[t].icon} ${t === 'luck' ? '+' + Math.round(b.val * 100) + '%' : '×' + b.val} · ${fmt((b.until - Date.now()) / 1000)}</div>`).join('')}${S.equip.filter(Boolean).map(j => `<img class="jw" src="${ICON_URL[j]}" title="${ITEMS[j].name} — ${ITEMS[j].desc}" alt="">`).join('')}</div>`);
  patch($('#hudInfo'), `<div class="zone">${ZONES[z].icon} ${z === 'ferme' ? 'Ferme des ' + esc(S.farm) : ZONES[z].name}</div>
    <div class="time">${S.weather === 'rain' ? '🌧️' : isNight() ? '🌙' : '☀️'} Jour ${S.day} · ${clock()}</div>`);
  const sm = STORY[S.story];
  const dd = S.daily ? S.daily.list.filter(d => d.done).length : 0, dl = S.daily ? S.daily.list.length : 0;
  patch($('#quest'), (sm ? `<div class="q" data-act="open" data-k="journal">
      <div class="qh"><img src="${SPR.portrait[sm.npc]}" alt=""><div><small>Chapitre ${sm.ch + 1} · ${CHAPTERS[sm.ch]}</small><b>${sm.t}</b></div></div>
      <span>${sm.d}</span>
      <div class="qbar"><div style="width:${missionValue(sm, S.storyBase) / sm.n * 100}%"></div></div>
      <small>${fmtN(missionValue(sm, S.storyBase))}/${fmtN(sm.n)} · ${rewardText(sm.r)}</small></div>`
    : `<div class="q" data-act="open" data-k="journal"><b>🏆 Histoire terminée !</b><span>Tu es la légende de la vallée.</span></div>`)
    + (S.lq && S.lq.list.length ? `<div class="q mini" data-act="jtab" data-k="level"><span>⭐ Défis du niveau ${S.level}</span><span>${S.lq.list.filter(q => q.done).length}/${S.lq.list.length}${S.lq.bonus ? ' ✓' : ''}</span></div>` : '')
    + `<div class="q mini" data-act="jtab" data-k="daily"><span>📅 Missions du jour</span><span>${dd}/${dl}${dd === dl && dl ? ' ✓' : ''}</span></div>`);
  const gz = hotbarGarden(), seeds = gz ? GARDEN_CROPS[gz] : CROP_KEYS, cursel = gz ? gSel(gz) : S.selected;
  const consos = ['cafe', 'engrais', 'superengrais', 'tarte', 'soupe', 'ragout', 'gateau'].filter(k => have(k) > 0 || ['cafe', 'engrais'].includes(k));
  patch($('#hotbar'), (gz ? `<div class="slot glabel" title="${GARDENS[gz].name}"><span class="i">${ZONES[gz].icon}</span><span class="p">Jardin</span></div>` : '') + seeds.map((k, i) => {
    const c = CROPS[k], locked = S.level < c.lvl;
    return `<div class="slot${cursel === k ? ' sel' : ''}${locked ? ' locked' : ''}" data-act="seed" data-k="${k}" title="${ITEMS[k].name} — graine ${c.seed} 🪙, pousse en ${fmt(c.time)}, se vend ${ITEMS[k].price} 🪙">
      <span class="k">${i + 1}</span>${locked ? '<span class="i">🔒</span>' : `<img class="si" src="${ICON_URL[k]}" alt="">`}<span class="p">${locked ? 'Niv.' + c.lvl : '🪙' + c.seed}</span></div>`;
  }).join('') + `<div class="slot can" title="Arrosoir"><span class="i">🪣</span><div class="gauge"><div style="height:${S.water / waterMax() * 100}%"></div></div></div>`
    + `<div class="consos">${consos.map(k => `<div class="cslot${have(k) ? '' : ' empty'}" data-act="use" data-k="${k}" title="${USES[k].verb} : ${ITEMS[k].name} — ${ITEMS[k].desc || ''}"><img src="${ICON_URL[k]}" alt=""><b>${have(k)}</b></div>`).join('')}</div>`);
  const touch = matchMedia('(pointer: coarse)').matches;
  let pr = '';
  if (!busy() && target) {
    if (target.far) pr = `<span>🚫 Trop loin — approche-toi</span>`;
    else if (target.fn) pr = `<span><kbd>${target.viaMouse ? 'Clic' : touch ? 'A' : 'E'}</kbd>${target.label}</span>`;
    else pr = `<span>${target.label}</span>`;
  }
  patch($('#prompt'), pr);
  drawMini();
}
function renderDialog() {
  const box = $('#dialog');
  if (!dlg.cur) { box.hidden = true; return; }
  box.hidden = false;
  const n = dlg.cur.npc === 'farmer' ? { name: S.name, role: 'Toi' } : NPC_BY_ID[dlg.cur.npc];
  $('#dport').src = SPR.portrait[dlg.cur.npc];
  $('#dname').innerHTML = `${esc(n.name)} <small>${esc(n.role)}</small>`;
  $('#dtext').textContent = dlg.cur.text.slice(0, Math.floor(dlg.shown));
  $('#dnext').textContent = dlg.shown < dlg.cur.text.length ? '…' : dlg.queue.length ? 'Suite ▶' : 'Fermer ✕';
}

// ---------- Panneaux ----------
let tabs = { market: 'sell', bag: 'all', journal: 'story', hugo: 'build' }, planBrush = 'ble', planPaint = false;
const tabBar = (panelId, list) => `<div class="tabs">${list.map(([k, l]) => `<button class="tab${tabs[panelId] === k ? ' on' : ''}" data-act="tab" data-k="${panelId}:${k}">${l}</button>`).join('')}</div>`;
const PANELS = {
  market: ['🛒 Marché de Margot', () => {
    let body;
    if (tabs.market === 'sell') {
      const ks = Object.keys(ITEMS).filter(k => have(k) > 0);
      const total = ks.reduce((s, k) => s + have(k) * ITEMS[k].price, 0);
      body = ks.length ? Object.keys(CATS).map(cat => {
        const list = ks.filter(k => ITEMS[k].cat === cat); if (!list.length) return '';
        return `<h3>${CATS[cat]}</h3><table><tbody>${list.map(k => `<tr><td>${ic(k)} ${ITEMS[k].name}</td><td class="n">×${have(k)}</td><td class="n">${ITEMS[k].price} 🪙</td>
          <td class="n sellq"><button class="btn ghost sm" data-act="sellN" data-k="${k}" data-i="1">1</button><button class="btn ghost sm" data-act="sellN" data-k="${k}" data-i="10" ${have(k) >= 10 ? '' : 'disabled'}>10</button><button class="btn ghost sm" data-act="sellHalf" data-k="${k}" ${have(k) >= 2 ? '' : 'disabled'}>½</button>
            <input type="number" id="sq_${k}" min="1" max="${have(k)}" value="${have(k)}" class="qty"><button class="btn sm" data-act="sellQ" data-k="${k}">Vendre</button></td></tr>`).join('')}</tbody></table>`;
      }).join('') + `<div class="row end"><button class="btn gold" data-act="sellEverything">💰 Tout vendre (${fmtN(total)} 🪙)</button></div>`
        : `<p class="muted">Ton sac est vide. Reviens avec des récoltes !</p>`;
    } else {
      const fu = FIELD_UPGRADES[S.fieldLvl], cu = CAN_UPGRADES[S.canLvl + 1];
      body = `<div class="cards">
        <div class="card"><h4>🌾 Agrandir le champ</h4><p>${unlocked()}/${MAX_PLOTS} parcelles cultivables. Défriche 8 parcelles de plus.</p>
          ${fu ? `<p>${reqHTML(fu)}</p><div class="row"><button class="btn gold" data-act="buyField" ${canPay(fu) ? '' : 'disabled'}>Défricher</button></div>` : '<p><b>Champ au maximum !</b></p>'}</div>
        <div class="card"><h4>🪣 Arrosoir (niv. ${S.canLvl + 1})</h4><p>Capacité actuelle : ${waterMax()} arrosages.</p>
          ${cu ? `<p>Niveau suivant : ${cu.cap} · ${reqHTML(cu)}</p><div class="row"><button class="btn gold" data-act="buyCan" ${canPay(cu) ? '' : 'disabled'}>Améliorer</button></div>` : '<p><b>Arrosoir au maximum !</b></p>'}</div>
      </div>`;
    }
    if (tabs.market === 'shop') body = `<p class="muted">Des petits coups de pouce à utiliser quand tu veux, depuis la barre du bas à droite ou ton sac.</p><div class="cards">${SHOP.map(it => { const lk = S.level < it.lvl; return `<div class="card${lk ? ' locked' : ''}"><h4>${ic(it.k)} ${ITEMS[it.k].name} <small>(tu en as ${have(it.k)})</small></h4><p>${ITEMS[it.k].desc}</p>
        <div class="row">${lk ? `🔒 Niveau ${it.lvl}` : `<button class="btn gold" data-act="shopBuy" data-k="${it.k}" data-i="1" ${S.coins >= it.price ? '' : 'disabled'}>Acheter · 🪙${it.price}</button><button class="btn ghost" data-act="shopBuy" data-k="${it.k}" data-i="5" ${S.coins >= it.price * 5 ? '' : 'disabled'}>×5 · 🪙${it.price * 5}</button>`}</div></div>`; }).join('')}</div>`;
    return tabBar('market', [['sell', '💰 Vendre'], ['shop', '🛍️ Boutique'], ['up', '🔨 Améliorations']]) + body;
  }],
  coop: ['🐾 Animalerie', () => {
    const hungry = S.animals.some(a => a.state === 'hungry'), ready = S.animals.some(a => a.state === 'ready');
    return `<p class="muted">Tes animaux vivent dans l'enclos. Va les voir pour les nourrir et ramasser leurs produits, ou utilise les raccourcis :</p>
      <div class="row"><button class="btn gold" data-act="feedAll" ${hungry ? '' : 'disabled'}>😋 Nourrir tout le monde</button>
      <button class="btn" data-act="collectAll" ${ready ? '' : 'disabled'}>🧺 Tout ramasser</button></div>
      <div class="cards">${Object.entries(ANIMALS).filter(([, A]) => !A.pen).map(([k, A]) => animalCard(k)).join('')}</div>${0 ? `${Object.entries(ANIMALS).map(([k, A]) => {
        const locked = S.level < A.lvl, n = S.animals.filter(a => a.type === k).length, c = animalCost(k), full = n >= MAX_PER_ANIMAL;
        return `<div class="card${locked ? ' locked' : ''}"><h4><img class="big" src="${ANIM_URL[k]}" alt="">${A.name} <small>(${n}/${MAX_PER_ANIMAL})</small></h4>
          <p>Mange : ${A.foodQty}× ${ic(A.food)} ${ITEMS[A.food].name}</p><p>Donne : ${ic(A.product)} ${ITEMS[A.product].name} toutes les ${fmt(A.time)}</p>
          <div class="row">${locked ? `<button class="btn ghost" disabled>🔒 Niveau ${A.lvl}</button>`
            : `<button class="btn gold" data-act="buyAnimal" data-k="${k}" ${!full && S.coins >= c ? '' : 'disabled'}>${full ? 'Enclos plein' : 'Acheter · 🪙' + fmtN(c)}</button>`}</div></div>`;
      }).join('')}` : ''}`;
  }],
  hugo: ['🏭 Atelier d\'Hugo', () => {
    let body;
    if (tabs.hugo === 'build') {
      const where = { cuisine: 'sur la plage, près de la cabane du port', forge: 'dans les Monts Givrés, près de la mine' };
      body = `<p class="muted">Chaque atelier commandé ici devient un <b>vrai bâtiment</b>. Va ensuite dans ce bâtiment pour lancer les recettes.</p><div class="cards">${Object.entries(WORKSHOPS).map(([k, W]) => {
        const w = S.workshops[k], locked = S.level < W.lvl, req = { coins: W.cost, ...W.mats };
        return `<div class="card${locked && !w ? ' locked' : ''}"><h4>${W.icon} ${W.name}</h4><p>Fabrique : ${W.recipes.map(r => ic(r.out) + ' ' + ITEMS[r.out].name).join(', ')}</p>
          <p class="muted">📍 ${where[k] || 'dans le village, au sud de la place'}</p>
          ${w ? `<p class="ok">✅ Construit · ${w.n} poste${w.n > 1 ? 's' : ''}${wsReady(w) ? ' · produit prêt !' : wsBusy(w) ? ' · en production' : ''}</p>` : `<p>${locked ? `🔒 Niveau ${W.lvl}` : reqHTML(req)}</p><div class="row">${locked ? '' : `<button class="btn gold" data-act="buyWs" data-k="${k}" ${canPay(req) ? '' : 'disabled'}>🏗️ Construire</button>`}</div>`}</div>`;
      }).join('')}</div>`;
    } else body = machinesHTML();
    return tabBar('hugo', [['build', '🏗️ Ateliers'], ['machines', '🔧 Machines']]) + body;
  }],
  ws: ['🏭 Atelier', () => {
    const k = panelArg, W = WORKSHOPS[k], w = S.workshops[k];
    $('#ptitle').textContent = `${W.icon} ${W.name}`;
    if (!w) return `<p>Ce bâtiment n'est pas encore construit. Commande-le chez Hugo.</p>`;
    const slots = w.slots.map((sl, i) => {
      if (sl.ready) { const r = W.recipes[sl.job]; return `<div class="talkbox"><div style="flex:1"><b>Poste ${i + 1} — ✅ ${ic(r.out)} ${ITEMS[r.out].name} est prêt !</b></div><button class="btn" data-act="collectWs" data-k="${k}" data-i="${i}">🧺 Récupérer</button></div>`; }
      if (sl.job != null) { const r = W.recipes[sl.job]; return `<div class="talkbox"><div style="flex:1"><b>Poste ${i + 1} — ⏳ ${ic(r.out)} ${ITEMS[r.out].name}</b> — ${fmt((1 - sl.progress) * r.time)}<div class="pbar"><div style="width:${(sl.progress * 100).toFixed(1)}%"></div></div></div></div>`; }
      return `<div class="talkbox"><div><b>Poste ${i + 1}</b> — libre, choisis une recette ci-dessous.</div></div>`;
    }).join('');
    const free = w.slots.some(sl => sl.job == null), c2 = wsSlotCost(W);
    const auto = (machineOn('chaine') ? '⚙️ La chaîne d\'atelier relance les dernières recettes. ' : '') + (activeWorkers().includes('nina') ? '👩‍🏭 Nina passe régulièrement. ' : '');
    return slots + (w.n < 2 ? `<div class="card"><h4>➕ Second poste de travail</h4><p>Lance 2 recettes en même temps dans cet atelier.</p><p>${reqHTML(c2)}</p><div class="row"><button class="btn gold" data-act="wsSlot" data-k="${k}" ${canPay(c2) ? '' : 'disabled'}>Installer</button></div></div>` : '')
      + `<h3>Recettes</h3>` + W.recipes.map((r, ri) => { const rl = S.level < r.lvl; return `<div class="recipe"><div><b>${ic(r.out)} ${ITEMS[r.out].name}</b> <small>(vend ${ITEMS[r.out].price} 🪙, ⏱ ${fmt(r.time)}, ⭐ ${r.xp} XP)</small>${USES[r.out] ? ` <small class="ok">· se mange : ${BUFF_INFO[USES[r.out].buff].icon}</small>` : ''}${JEWELS[r.out] ? ` <small class="ok">· bijou à équiper</small>` : ''}<br>${rl ? '🔒 Niveau ' + r.lvl : reqHTML(r.in)}</div>
      <button class="btn" data-act="startWs" data-k="${k}" data-i="${ri}" ${!rl && free && hasAll(r.in) ? '' : 'disabled'}>Lancer</button></div>`; }).join('') + (auto ? `<p class="muted">${auto}</p>` : '');
  }],
  orders: ['📋 Tableau des commandes', () => `<p class="muted">Les commandes paient 35 % de plus que le marché et rapportent de l'expérience. Un nouveau client arrive peu après chaque livraison.${activeWorkers().includes('felix') ? ' 📦 Félix livre automatiquement.' : ''}</p><div class="row"><button class="btn gold" data-act="deliverAll" ${S.orders.some(o => !o.wait && hasAll(o.items)) ? '' : 'disabled'}>📦 Tout livrer</button></div><div class="cards">${S.orders.map((o, i) => {
    if (o.wait) return `<div class="card"><h4>⏳ Client en route…</h4><p>Nouvelle commande dans ${fmt((o.wait - Date.now()) / 1000)}</p></div>`;
    return `<div class="card"><h4>${o.client}</h4><p>Veut : ${reqHTML(o.items)}</p><p>Récompense : <b>🪙 ${fmtN(o.reward)}</b> · ⭐ ${o.xp} XP</p>
      <div class="row"><button class="btn" data-act="deliver" data-i="${i}" ${hasAll(o.items) ? '' : 'disabled'}>📦 Livrer</button><button class="btn ghost" data-act="refuse" data-i="${i}">Refuser</button></div></div>`;
  }).join('')}</div>`],
  journal: ['📜 Journal', () => {
    const row = (mm, v, state) => `<div class="mrow ${state}"><div>${state === 'done' ? '✅' : state === 'cur' ? '▶️' : '🔒'} <b>${state === 'lock' ? '???' : mm.t}</b><br><small>${state === 'lock' ? 'Mission future' : mm.d}</small></div>
      <div class="r">${state === 'cur' ? `<div class="qbar"><div style="width:${v / mm.n * 100}%"></div></div><small>${fmtN(v)}/${fmtN(mm.n)}</small><br>` : ''}<small>${state === 'lock' ? '' : rewardText(mm.r)}</small></div></div>`;
    let body;
    if (tabs.journal === 'story') {
      body = CHAPTERS.map((c, ci) => {
        const ms = STORY.map((m, i) => ({ m, i })).filter(o => o.m.ch === ci);
        if (!ms.some(({ m, i }) => S.storyDone.includes(m.id) || i === S.story)) return `<h3 class="lockh">🔒 Chapitre ${ci + 1} — ???</h3>`;
        return `<h3>Chapitre ${ci + 1} — ${c}</h3>` + ms.map(({ m, i }) => row(m, i === S.story ? missionValue(m, S.storyBase) : 0, S.storyDone.includes(m.id) ? 'done' : i === S.story ? 'cur' : 'lock')).join('');
      }).join('');
      const cur = STORY[S.story];
      if (cur) body = `<div class="talkbox"><img src="${SPR.portrait[cur.npc]}" alt=""><div><b>${NPC_BY_ID[cur.npc].name}</b> <small>${NPC_BY_ID[cur.npc].role}</small><p>${esc(fill(cur.say))}</p></div></div>` + body;
    } else if (tabs.journal === 'level') {
      const lq = S.lq || { list: [] };
      body = `<h3>⭐ Défis du niveau ${S.level}</h3>` + (lq.list.length ? lq.list.map(q => row(q, Math.max(0, Math.min(q.n, cnt(q.ev, q.k) - q.base)), q.done ? 'done' : 'cur')).join('') + `<p class="muted">${lq.bonus ? '🏅 Bonus récupéré !' : `Réussis les 3 défis pour un bonus de 🪙${fmtN(100 * S.level)}. De nouveaux défis arrivent à chaque niveau.`}</p>` : '<p class="muted">Aucun défi pour ce niveau.</p>');
    } else {
      body = `<h3>📅 Missions du jour ${S.day}</h3>` + S.daily.list.map(d => row(d, Math.max(0, Math.min(d.n, cnt(d.ev, d.k) - d.base)), d.done ? 'done' : 'cur')).join('')
        + `<p class="muted">${S.daily.bonus ? '🎉 Bonus du jour récupéré !' : `Termine les ${S.daily.list.length} pour un bonus de 🪙${fmtN(40 * S.level)}.`} Nouvelles missions chaque jour : dors dans ta maison après 19h pour passer au lendemain.</p>`;
    }
    return tabBar('journal', [['story', '📖 Histoire'], ['level', '⭐ Défis du niveau'], ['daily', '📅 Du jour']]) + body;
  }],
  bag: ['🎒 Sac', () => {
    const ks = Object.keys(ITEMS).filter(k => have(k) > 0 && (tabs.bag === 'all' || ITEMS[k].cat === tabs.bag));
    const total = Object.keys(ITEMS).reduce((s, k) => s + have(k) * ITEMS[k].price, 0);
    return tabBar('bag', [['all', 'Tout'], ...Object.entries(CATS)]) +
      (ks.length ? `<div class="grid">${ks.map(k => `<div class="cell" title="${ITEMS[k].name} — ${ITEMS[k].desc} (${ITEMS[k].price} 🪙)"><img src="${ICON_URL[k]}" alt=""><span class="q">${have(k)}</span><small>${ITEMS[k].name}</small>${USES[k] ? `<button class="btn sm" data-act="use" data-k="${k}">${USES[k].verb}</button>` : ''}${JEWELS[k] ? `<button class="btn sm gold" data-act="equip" data-k="${k}">Équiper</button>` : ''}</div>`).join('')}</div>` : '<p class="muted">Rien ici pour l\'instant.</p>')
      + `<p class="muted">Valeur totale du sac : 🪙 ${fmtN(total)}</p>
      <h3>Statistiques</h3><div class="stats">
        <div>🌾 <b>${fmtN(S.stats.harvested)}</b><small>récoltes</small></div><div>📦 <b>${fmtN(S.stats.delivered)}</b><small>commandes</small></div>
        <div>🎣 <b>${fmtN(S.stats.fish)}</b><small>poissons</small></div><div>💰 <b>${fmtN(S.stats.earned)}</b><small>pièces gagnées</small></div>
        <div>🐾 <b>${S.animals.length}</b><small>animaux</small></div><div>📅 <b>${S.day}</b><small>jours</small></div></div>`;
  }],
  machines: ['🔧 Machines d\'Hugo', () => machinesHTML()],
  staff: ['👷 Mes employés', () => {
    const tot = wagesTotal();
    return `<p class="muted">Les employés s'embauchent dans le bâtiment de leur zone. Ils gagnent de l'expérience en travaillant : une fois promus, ils vont plus vite mais coûtent plus cher.</p>
      <div class="row"><span class="chipL">💰 Salaires : <b>${fmtN(tot)} 🪙 / jour</b></span></div>
      ${Object.entries(HOMES).map(([h, H]) => `<h3>${H.icon} ${H.name}</h3><div class="cards">${Object.keys(WORKERS).filter(id => WORKERS[id].home === h).map(id => staffCard(id, false)).join('')}</div>`).join('')}`;
  }],
  home: ['🏠', () => {
    const h = panelArg, H = HOMES[h], N = NPC_BY_ID[H.npc];
    $('#ptitle').textContent = `${H.icon} ${H.name}`;
    const tot = wagesTotal(), strike = hiredWorkers().some(id => S.staff[id].strike);
    let tool = '';
    if (H.tool) {
      const T_ = TOOLS[H.tool], lv = S.tools[H.tool] || 0, up = T_.ups[lv];
      tool = `<h3>${T_.icon} ${T_.name} — niveau ${lv + 1}/3</h3><div class="card"><p>Actuellement : ${T_.desc[lv]}</p>
        ${up ? `<p>Niveau ${lv + 2} : ${T_.desc[lv + 1]}</p><p>${reqHTML(up)}</p><div class="row"><button class="btn gold" data-act="buyTool" data-k="${H.tool}" ${canPay(up) ? '' : 'disabled'}>Améliorer</button></div>` : '<p class="ok"><b>Outil au maximum !</b></p>'}</div>`;
    }
    return `<div class="talkbox"><img src="${SPR.portrait[H.npc]}" alt=""><div><b>${N.name}</b> <small>${N.role}</small><p>${h === 'mairie' ? 'Bienvenue au bureau d\'embauche de la ferme. Ces gens cherchent du travail chez toi.' : 'Voici ceux qui veulent travailler dans ma zone. Et je peux améliorer ton outil.'}</p></div></div>
      <div class="row"><span class="chipL">💰 Salaires totaux : <b>${fmtN(tot)} 🪙 / jour</b></span>${strike ? `<button class="btn red" data-act="payNow" ${S.coins >= tot ? '' : 'disabled'}>Payer les salaires en retard (${fmtN(tot)} 🪙)</button>` : ''}</div>
      <h3>Employés</h3><div class="cards">${Object.keys(WORKERS).filter(id => WORKERS[id].home === h).map(id => staffCard(id, true)).join('')}</div>${tool}
      ${Object.entries(ANIMALS).some(([, A]) => A.shop === h) ? `<h3>🐾 Animaux de la zone</h3><p class="muted">Ils vivent en liberté près de la cabane. Nourris-les sur place pour récolter leurs produits (la mangeoire et le collecteur s'en occupent aussi).</p><div class="cards">${Object.entries(ANIMALS).filter(([, A]) => A.shop === h).map(([k]) => animalCard(k)).join('')}</div>` : ''}`;
  }],
  plan: ['🌾 Plan du champ', () => {
    const rows = [];
    for (let y = FIELD.y; y < FIELD.y + FIELD.h; y++) {
      const cells = [];
      for (let x = FIELD.x; x < FIELD.x + FIELD.w; x++) {
        const i = plotIndexAt(x, y), p = S.plots[i], lock = i >= unlocked();
        const st = p.crop ? (p.progress >= 1 ? 'Mûr' : Math.round(p.progress * 100) + ' %') : 'vide';
        cells.push(`<div class="pc${lock ? ' lock' : ''}${p.plan ? ' has' : ''}" data-act="${lock ? '' : 'planCell'}" data-i="${i}" title="${lock ? 'Parcelle en friche' : (p.plan ? 'Plan : ' + ITEMS[p.plan].name : 'Pas de plan') + ' · actuellement ' + (p.crop ? ITEMS[p.crop].name + ' (' + st + ')' : 'vide')}">
          ${lock ? '🌿' : p.plan ? `<img src="${ICON_URL[p.plan]}" alt="">` : '<span class="none">—</span>'}
          ${!lock && p.crop ? `<img class="now" src="${ICON_URL[p.crop]}" alt=""><small>${st}</small>` : ''}</div>`);
      }
      const ri = plotIndexAt(FIELD.x, y), rowLocked = ri >= unlocked();
      rows.push(`<div class="prow">${cells.join('')}<button class="btn ghost sm" data-act="planRow" data-i="${ri}" ${rowLocked ? 'disabled' : ''}>Rangée ←</button></div>`);
    }
    const counts = {}; let seedCost = 0, perHour = 0;
    for (let i = 0; i < unlocked(); i++) { const k = S.plots[i].plan; if (!k) continue; counts[k] = (counts[k] || 0) + 1; seedCost += CROPS[k].seed; perHour += (ITEMS[k].price - CROPS[k].seed) * 3600 / (CROPS[k].time / WATER_BONUS); }
    const empties = plotIdx().filter(i => !S.plots[i].crop && S.plots[i].plan);
    const nowCost = empties.reduce((s, i) => s + CROPS[S.plots[i].plan].seed, 0);
    return `<p class="muted">Choisis une culture, puis clique (ou glisse) sur les parcelles. Le <b>semoir</b>, <b>Léa</b> et toi-même planterez automatiquement la culture prévue sur chaque parcelle vide.</p>
      <div class="palette">${CROP_KEYS.map(k => { const lk = S.level < CROPS[k].lvl; return `<button class="pb${planBrush === k ? ' on' : ''}" data-act="${lk ? '' : 'brush'}" data-k="${k}" ${lk ? 'disabled' : ''} title="${ITEMS[k].name}">${lk ? '🔒' : `<img src="${ICON_URL[k]}" alt="">`}<small>${lk ? 'Niv.' + CROPS[k].lvl : ITEMS[k].name}</small></button>`; }).join('')}
        <button class="pb${planBrush === null ? ' on' : ''}" data-act="brush" data-k="">🧽<small>Effacer</small></button></div>
      <div class="fieldgrid"><div class="fhead">↑ fond du champ</div>${rows.join('')}<div class="fhead">↓ entrée du champ</div></div>
      <div class="row"><button class="btn ghost" data-act="planAll">Tout remplir avec ${planBrush ? ITEMS[planBrush].name.toLowerCase() : 'rien'}</button>
        <button class="btn ghost" data-act="planCopy">Copier les cultures actuelles</button>
        <button class="btn ghost" data-act="planClear">Tout effacer</button>
        <button class="btn gold" data-act="planNow" ${empties.length && S.coins >= nowCost ? '' : 'disabled'}>🌱 Planter le plan maintenant (${empties.length} parcelle${empties.length > 1 ? 's' : ''} · 🪙${fmtN(nowCost)})</button></div>
      <div class="planinfo"><div>${Object.entries(counts).map(([k, n]) => `${ic(k)} ×${n}`).join(' · ') || 'Aucune parcelle planifiée'}</div>
        <div>Graines pour tout replanter : <b>🪙 ${fmtN(seedCost)}</b> · Bénéfice estimé si tout est arrosé : <b>≈ 🪙 ${fmtN(perHour)} / heure</b></div>
        <div class="muted">${machineOn('semoir') ? '✅ Semoir en marche' : '⚠️ Pas de semoir actif'} · ${S.staff.lea && !S.staff.lea.strike ? '✅ Léa au travail' : '⚠️ Léa pas embauchée'}</div></div>`;
  }],
  perso: ['🧍 Personnage', () => {
    const slots = jewelSlots(), total = Object.keys(S.ach).length;
    const bt = Object.keys(BUFF_INFO).map(t => { const v = buffVal(t); return (t === 'luck' ? v > 0 : v !== 1) ? `<span class="chipL">${BUFF_INFO[t].icon} ${BUFF_INFO[t].name} ${t === 'luck' ? '+' + Math.round(v * 100) + ' %' : '×' + v.toFixed(2)}</span>` : ''; }).join(' ');
    const owned = Object.keys(JEWELS).filter(k => have(k) > 0);
    return `<div class="talkbox"><img src="${SPR.portrait.farmer}" alt=""><div><b>${esc(S.name)}</b> <small>Ferme des ${esc(S.farm)} · niveau ${S.level}</small><p>${bt || '<span class="muted">Aucun bonus actif.</span>'}</p><div class="row"><button class="btn ghost" data-act="open" data-k="wardrobe">👕 Garde-robe</button></div></div></div>
      <h3>💍 Bijoux équipés (${S.equip.filter(Boolean).length}/${slots})</h3><div class="cards">${[0, 1, 2].map(i => i >= slots ? `<div class="card locked"><h4>🔒 3e emplacement</h4><p>Débloqué à ${ACH_SLOT3} objectifs du Livre (${total}/${ACH_SLOT3}).</p></div>`
        : S.equip[i] ? `<div class="card"><h4>${ic(S.equip[i])} ${ITEMS[S.equip[i]].name}</h4><p>${ITEMS[S.equip[i]].desc}</p><div class="row"><button class="btn ghost" data-act="unequip" data-i="${i}">Retirer</button></div></div>`
        : `<div class="card"><h4>➖ Emplacement libre</h4><p class="muted">Forge des bijoux magiques à la Forge (Monts Givrés).</p></div>`).join('')}</div>
      ${owned.length ? `<h3>Dans ton sac</h3><div class="cards">${owned.map(k => `<div class="card"><h4>${ic(k)} ${ITEMS[k].name} ×${have(k)}</h4><p>${ITEMS[k].desc}</p><div class="row"><button class="btn gold" data-act="equip" data-k="${k}">Équiper</button></div></div>`).join('')}</div>` : ''}
      <h3>Bijoux à forger</h3><p class="muted">${WORKSHOPS.forge.recipes.filter(r => JEWELS[r.out]).map(r => `${ic(r.out)} ${ITEMS[r.out].name} : ${ITEMS[r.out].desc.replace(/^Équipée? : /, '')}`).join('<br>')}</p>`;
  }],
  wardrobe: ['👕 Mercerie de Lucie', () => `<div class="talkbox"><img src="${SPR.portrait.lucie}" alt=""><div><b>Lucie</b> <small>La couturière</small><p>Essaie ce que tu veux ! Ce que tu possèdes déjà se porte gratuitement. Les pièces ⭐ récompensent les exploits du Livre des objectifs.</p></div><img src="${SPR.portrait.farmer}" alt="" style="margin-left:auto"></div>
    ${Object.entries(COS_SLOTS).map(([sl, lab]) => `<h3>${lab}</h3><div class="cosgrid">${Object.entries(COSMETICS[sl]).map(([id, C_]) => { const key = sl + '.' + id, own = S.cos.owned[key], worn = S.cos.worn[sl] === id, lk = C_.lvl && S.level < C_.lvl;
      return `<div class="cos${worn ? ' on' : ''}${own ? '' : ' notown'}"><b>${C_.name}</b><small>${worn ? '✅ Porté' : own ? 'Possédé' : C_.ach ? `⭐ Objectif : ${ACHIEVEMENTS.find(a => a.id === C_.ach).t}` : lk ? `🔒 Niveau ${C_.lvl}` : `🪙 ${C_.price}`}</small>
        ${worn ? '' : own ? `<button class="btn sm" data-act="wear" data-k="${key}">Porter</button>` : !C_.ach && !lk ? `<button class="btn sm gold" data-act="buyCos" data-k="${key}" ${S.coins >= C_.price ? '' : 'disabled'}>Acheter</button>` : ''}</div>`; }).join('')}</div>`).join('')}`],
  livre: ['📖 Livre des objectifs', () => {
    const total = Object.keys(S.ach).length, cats = [...new Set(ACHIEVEMENTS.map(a => a.cat))];
    return `<p class="muted"><b>${total}/${ACHIEVEMENTS.length}</b> objectifs accomplis. ${total < ACH_SLOT3 ? `À ${ACH_SLOT3}, un 3e emplacement de bijou s'ouvre.` : '💍 3e emplacement de bijou débloqué !'} Les exploits ⚡ se jouent contre la montre : améliore tes outils !</p>
      <div class="pbar"><div style="width:${total / ACHIEVEMENTS.length * 100}%"></div></div>
      ${cats.map(c => `<h3>${c}</h3><div class="achgrid">${ACHIEVEMENTS.filter(a => a.cat === c).map(A => { const done = S.ach[A.id], v = Math.min(A.n, achValue(A));
        return `<div class="ach${done ? ' done' : ''}"><div class="medal">${done ? '🏅' : A.timed ? '⚡' : '◻️'}</div><div style="flex:1"><b>${A.t}</b><small>${A.d}</small>
          ${done ? `<small class="ok">Accompli le ${new Date(done).toLocaleDateString('fr-FR')}</small>` : `<div class="pbar"><div style="width:${v / A.n * 100}%"></div></div><small>${A.timed ? `Record actuel sur ${A.timed[1]} s : ${v}/${A.n}` : `${fmtN(v)}/${fmtN(A.n)}`}</small>`}
          <small>🎁 🪙${fmtN(A.r.coins || 0)}${A.r.cos ? ' + ' + COSMETICS[A.r.cos.split('.')[0]][A.r.cos.split('.')[1]].name : ''}</small></div></div>`; }).join('')}</div>`).join('')}`;
  }],
  map: ['🗺️ Carte de la vallée', () => `<canvas id="bigmap" width="${VW_TILES * 8}" height="${MH * 8}"></canvas>
    <div class="legend">${Object.entries(ZONES).filter(([z]) => z !== 'mine').map(([z, Z]) => `<span class="${zoneOpen(z) ? '' : 'off'}">${Z.icon} ${Z.name}${zoneOpen(z) ? '' : ` · 🔒 niv. ${Z.lvl}`}</span>`).join('')}</div>`],
  gate: ['🔧 Réparation', () => {
    const g = GATES[panelArg], open = S.gates[panelArg];
    if (open) return `<p>Déjà réparé !</p>`;
    const lvlOk = S.level >= g.req.lvl;
    return `<div class="talkbox"><div><b>${g.name}</b><p>${g.desc}</p></div></div>
      <h3>Il te faut</h3><p class="reqs">${reqHTML(g.req)}</p>
      ${lvlOk ? '' : `<p class="muted">Reviens quand tu auras atteint le niveau ${g.req.lvl}.</p>`}
      <div class="row"><button class="btn gold" data-act="repair" data-k="${panelArg}" ${canPay(g.req) ? '' : 'disabled'}>🔧 Réparer et ouvrir ${ZONES[g.zone].name}</button></div>`;
  }],
  options: ['⚙️ Options', () => `<h3>Affichage</h3>
    <div class="row"><label>🔍 Zoom</label><input type="range" min="50" max="240" value="${Math.round(zoomTarget * 100)}" data-act="zoomRange"><span>${Math.round(zoomTarget * 100)} %</span></div>
    <div class="row"><label><input type="checkbox" data-act="toggleReach" ${S.opts.reach ? 'checked' : ''}> Afficher la portée de la souris</label></div>
    <h3>Partie</h3><p class="muted">${esc(S.name)} · Ferme des ${esc(S.farm)} · jour ${S.day}. Sauvegarde automatique dans ce navigateur.</p>
    <div class="row"><button class="btn" data-act="saveNow">💾 Sauvegarder</button><button class="btn red" data-act="reset">🗑️ Effacer la partie et recommencer</button></div>`],
  help: ['❓ Comment jouer', () => `<ul class="help">
      <li>🚶 <b>Se déplacer</b> : flèches ou ZQSD / WASD · <b>Maj</b> pour courir</li>
      <li>✋ <b>Agir</b> : <b>E</b> ou <b>Espace</b> face à quelque chose · ou <b>clic</b> sur ce qui est à portée</li>
      <li>🌱 <b>Graines</b> : touches <b>1 à 7</b> · maintiens le clic et glisse pour planter plusieurs parcelles</li>
      <li>🪣 Remplis ton arrosoir à l'<b>étang</b> ou à la <b>rivière</b>. Quand il pleut, tout s'arrose seul.</li>
      <li>💬 Parle aux villageois : ceux avec un <b>!</b> ont une mission pour toi</li>
      <li>🔧 Les zones fermées s'ouvrent en réparant les <b>barrières</b> (arbre, pont, éboulement)</li>
      <li>🌲 Forêt : bois, champignons, baies · 🏖️ Plage : pêche et coquillages · 🏔️ Montagne : pierre, fer, cristal</li>
      <li>🎣 <b>Pêche</b> : face à la mer, appuie sur E, puis encore quand <b>!</b> apparaît</li>
      <li>⛏️ Les rochers se cassent en plusieurs coups</li>
      <li>🌾 <b>Plan du champ</b> (<b>F</b>) : choisis la culture de chaque parcelle ; semoir, Léa et toi la replantez automatiquement</li>
      <li>🌱 <b>Jardins de biome</b> : forêt, plage et montagne ont chacune un jardin avec des plantes qui ne poussent que là. La barre de graines s'adapte à la zone.</li>
      <li>🧪 <b>Boutique</b> du marché : café (vitesse) et engrais (pousse). Les plats (tarte, soupe, ragoût, gâteau) se <b>mangent</b> pour des bonus. Barre en bas à droite.</li>
      <li>💍 <b>Bijoux</b> forgés à la Forge : équipe-les (<b>K</b>) pour des pouvoirs permanents</li>
      <li>📖 <b>Livre des objectifs</b> (<b>L</b>) : des exploits à accomplir, certains chronométrés, avec récompenses et vêtements rares</li>
      <li>👕 <b>Mercerie</b> de Lucie : change ton style</li>
      <li>🖱️ <b>Clic</b> sur un endroit éloigné (marché, parcelle, villageois…) : ton fermier y va tout seul puis agit en arrivant. Clic sur le sol = se déplacer.</li>
      <li>🏗️ Chaque atelier commandé chez Hugo devient un <b>bâtiment</b> ; entre dedans pour cuisiner</li>
      <li>🛖 Les <b>cabanes</b> de la forêt, du port et de la mine embauchent les employés de leur zone et améliorent tes outils</li>
      <li>⛏️ Entre dans la <b>mine</b> par la grotte des Monts Givrés (cristaux, or)</li>
      <li>🤖 <b>Automatiser</b> : achète des <b>machines</b> chez Hugo (arroseurs, semoir, moissonneuse…) ou <b>embauche</b> à la mairie (jardinier, moissonneuse, soigneur…). Touches <b>M</b> et <b>P</b>.</li>
      <li>🌙 Après 19h, dors dans ta maison pour passer au jour suivant</li>
      <li>⌨️ <b>J</b> journal · <b>I</b> sac · <b>C</b> carte · <b>O</b> options · <b>H</b> aide · <b>Échap</b> fermer · molette = zoom</li></ul>
      <div class="row"><button class="btn" data-act="close">C'est parti ! 🚜</button></div>`],
};
function hotbarGarden() { const P = S.player, b = biomeAt(Math.floor(P.x), Math.floor(P.y)); return GARDENS[b] ? b : null; }
function animalCard(k) {
  const A = ANIMALS[k], locked = S.level < A.lvl, n = S.animals.filter(a => a.type === k).length, c = animalCost(k), full = n >= MAX_PER_ANIMAL;
  return `<div class="card${locked ? ' locked' : ''}"><h4><img class="big" src="${ANIM_URL[k]}" alt="">${A.name} <small>(${n}/${MAX_PER_ANIMAL})</small></h4>
    <p>Mange : ${A.foodQty}× ${ic(A.food)} ${ITEMS[A.food].name}</p><p>Donne : ${ic(A.product)} ${ITEMS[A.product].name} toutes les ${fmt(A.time)}</p>
    <div class="row">${locked ? `<button class="btn ghost" disabled>🔒 Niveau ${A.lvl}</button>` : `<button class="btn gold" data-act="buyAnimal" data-k="${k}" ${!full && S.coins >= c ? '' : 'disabled'}>${full ? 'Complet' : 'Adopter · 🪙' + fmtN(c)}</button>`}</div></div>`;
}
function machinesHTML() {
  return `<p class="muted">Une machine s'achète une fois, ne demande pas de salaire et travaille même jeu fermé. Elle s'améliore (3 niveaux) pour aller plus vite. Les employés, eux, montent jusqu'au niveau 5.</p><div class="cards">${Object.entries(MACHINES).map(([k, M]) => {
    const n = S.machines[k] || 0, multi = M.multi, maxed = multi ? n >= multi : n > 0, locked = S.level < M.lvl, req = M.cost(n), L = mLevel(k);
    const speed = M.periods ? `⚡ 1 ${M.unit} toutes les ${M.periods[L - 1]} s` : '';
    const up = M.ups && n && L < 3 ? M.ups[L - 1] : null;
    return `<div class="card${locked && !n ? ' locked' : ''}"><h4>${M.icon} ${M.name}${multi ? ` <small>(${n}/${multi})</small>` : n ? ` <small>niv. ${L}/3</small>` : ''}</h4><p>${M.desc}</p>
      ${speed ? `<p><b>${speed}</b>${up ? ` → ${M.periods[L]} s au niveau ${L + 1}` : ''}</p>` : ''}${k === 'arroseur' && n ? `<p class="muted">${sprinklerRows()} rangée(s) cultivée(s) couverte(s)</p>` : ''}
      ${maxed ? '' : `<p>${locked ? `🔒 Niveau ${M.lvl}` : reqHTML(req)}</p>`}${up ? `<p>Amélioration : ${reqHTML(up)}</p>` : ''}
      <div class="row">${maxed || locked ? '' : `<button class="btn gold" data-act="buyMachine" data-k="${k}" ${canPay(req) ? '' : 'disabled'}>${n ? 'Ajouter' : 'Acheter'}</button>`}
      ${up ? `<button class="btn gold" data-act="upMachine" data-k="${k}" ${canPay(up) ? '' : 'disabled'}>⬆️ Niveau ${L + 1}</button>` : ''}
      ${n ? `<button class="btn ${S.mOn[k] === false ? 'ghost' : ''}" data-act="toggleMachine" data-k="${k}">${S.mOn[k] === false ? '⏸️ Éteint' : '▶️ En marche'}</button>` : ''}</div></div>`;
  }).join('')}</div>`;
}
function staffCard(id, here) {
  const W = WORKERS[id], st = S.staff[id] ? staffOf(id) : null, locked = S.level < W.lvl, needGate = W.need && !S.gates[W.need];
  const L = st ? st.lvl : 1, sp = staffSpeed(L);
  const rateTxt = W.prod ? `⚡ ~1 ressource / ${Math.round(W.period / sp)} s` : W.period ? `⚡ tournée toutes les ${(W.period / sp).toFixed(1)} s` : `⚡ vitesse ×${sp.toFixed(1)}`;
  let actions = '';
  if (st) {
    const need = staffXpNeed(L), canPromote = L < MAX_STAFF_LVL && st.xp >= need, pc = promoteCost(W, L);
    actions = `<p>${st.strike ? '✋ <b class="ko">En grève</b>' : '✅ <b class="ok">En service</b>'} · niv. <b>${L}</b>/${MAX_STAFF_LVL} · 💰 ${wageOf(id)} 🪙/jour</p>
      ${L < MAX_STAFF_LVL ? `<div class="pbar"><div style="width:${Math.min(100, st.xp / need * 100)}%"></div></div><small>Expérience : ${Math.min(st.xp, need)}/${need} tâches</small>` : '<small>⭐ Niveau maximum</small>'}
      ${here ? `<div class="row">${L < MAX_STAFF_LVL ? `<button class="btn gold" data-act="promote" data-k="${id}" ${canPromote && S.coins >= pc ? '' : 'disabled'}>⬆️ Promouvoir (🪙${fmtN(pc)}, salaire → ${staffWage(W, L + 1)})</button>` : ''}<button class="btn ghost" data-act="fire" data-k="${id}">Renvoyer</button></div>` : ''}`;
  } else if (locked) actions = `<p>🔒 Niveau ${W.lvl}</p>`;
  else if (needGate) actions = `<p>🔒 Ouvre d'abord la zone (${ZONES[GATES[W.need].zone].name})</p>`;
  else actions = here ? `<p>Embauche : 🪙 ${fmtN(W.hire)} · Salaire : 🪙 ${W.wage}/jour</p><div class="row"><button class="btn gold" data-act="hire" data-k="${id}" ${S.coins >= W.hire ? '' : 'disabled'}>Embaucher</button></div>` : `<p class="muted">À embaucher : ${HOMES[W.home].name} (🪙 ${fmtN(W.hire)})</p>`;
  return `<div class="card${(locked || needGate) && !st ? ' locked' : ''}"><h4><img class="big" src="${SPR.portrait[id]}" alt="">${W.name} <small>· ${W.role}</small></h4><p>${W.desc}</p><p><b>${rateTxt}</b></p>${actions}</div>`;
}
function openPanel(k, arg) { panel = k; panelArg = arg; $('#panel').hidden = false; $('#ptitle').textContent = PANELS[k][0]; renderPanel(); }
function closePanel() { panel = null; $('#panel').hidden = true; }
function renderPanel() {
  if (!panel) return;
  patch($('#pbody'), PANELS[panel][1]());
  if (panel === 'map') drawBigMap();
}
function drawBigMap() {
  const c = $('#bigmap'); if (!c) return;
  const g = c.getContext('2d'), s = 8; g.imageSmoothingEnabled = false;
  g.drawImage(miniBase, 0, 0, VW_TILES, MH, 0, 0, VW_TILES * s, MH * s); lockedZoneRects(g, s);
  g.textAlign = 'center'; g.textBaseline = 'middle';
  const lab = (t, x, y, size = 13) => { g.font = `bold ${size}px system-ui, sans-serif`; const w = g.measureText(t).width + 12; g.fillStyle = 'rgba(42,29,20,.82)'; g.fillRect(x - w / 2, y - size * .8, w, size * 1.6); g.fillStyle = '#fff8e7'; g.fillText(t, x, y + 1); };
  const zc = { ferme: [20, 36], village: [52, 33], foret: [30, 11], plage: [24, 51], montagne: [70, 25] };
  for (const [z, [x, y]] of Object.entries(zc)) lab(`${ZONES[z].icon} ${ZONES[z].name}${zoneOpen(z) ? '' : ' 🔒 ' + ZONES[z].lvl}`, x * s, y * s, 15);
  const pois = [['🏠', 9, 23], ['🐾', 8, 34], ['🛒', 46.5, 38.5], ['🏭', 55.5, 38.5], ['📋', 50.5, 38.5], ['🏛️', 51, 23], ['🌲', 30, 5.5], ['⚓', 20, 50.5], ['⛏️', 70, 8.5], ['🛖', 66, 12.5]];
  for (const b of BUILDINGS) if (b.ws && S.workshops[b.ws]) pois.push([WORKSHOPS[b.ws].icon, b.x + 1.5, b.y + 1]);
  g.font = '16px system-ui'; pois.forEach(([e, x, y]) => g.fillText(e, x * s, y * s));
  for (const [id, gt] of Object.entries(GATES)) if (!S.gates[id]) { g.font = '16px system-ui'; g.fillText('🔧', (gt.x + 1) * s, (gt.y + 1) * s); }
  const cur = STORY[S.story]; if (cur && NPC_BY_ID[cur.npc]) { const n = NPC_BY_ID[cur.npc]; g.font = 'bold 18px system-ui'; g.fillStyle = '#ffd54f'; g.fillText('❗', n.x * s, n.y * s - 8); }
  const P = S.player.x >= 80 ? { x: 70, y: 8.5 } : S.player; g.fillStyle = '#ff5252'; g.beginPath(); g.arc(P.x * s, P.y * s, 6, 0, 7); g.fill(); g.strokeStyle = '#fff'; g.lineWidth = 2; g.stroke();
}

function sell(k, q) { q = Math.min(q, have(k)); if (q <= 0) return 0; const g = q * ITEMS[k].price; addItem(k, -q); S.coins += g; S.stats.earned += g; track('sell', null, g); return g; }

$('#panel').addEventListener('click', e => { if (e.target.id === 'panel') closePanel(); });
$('#dialog').addEventListener('click', () => advanceDialog());
// Peinture du plan en glissant
document.addEventListener('pointerdown', e => { const c = e.target.closest('.pc[data-act=planCell]'); if (c) { planPaint = true; S.plots[+c.dataset.i].plan = planBrush; renderPanel(); } });
addEventListener('pointerup', () => { planPaint = false; });
document.addEventListener('pointerover', e => { if (!planPaint) return; const c = e.target.closest('.pc[data-act=planCell]'); if (c) { S.plots[+c.dataset.i].plan = planBrush; renderPanel(); } });
document.addEventListener('input', e => {
  const el = e.target.closest('[data-act]'); if (!el) return;
  if (el.dataset.act === 'zoomRange') setZoom(+el.value / 100);
});
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]');
  if (!el || el.disabled) return;
  const { act, k } = el.dataset, i = el.dataset.i != null ? +el.dataset.i : null;
  switch (act) {
    case 'close': closePanel(); break;
    case 'open': if (!titleOpen && !dlg.cur) openPanel(k); break;
    case 'jtab': if (!titleOpen && !dlg.cur) { tabs.journal = k; openPanel('journal'); } break;
    case 'tab': { const [p, t] = k.split(':'); tabs[p] = t; break; }
    case 'zoomIn': setZoom(zoomTarget * 1.2); break;
    case 'zoomOut': setZoom(zoomTarget / 1.2); break;
    case 'toggleReach': S.opts.reach = el.checked; break;
    case 'saveNow': save(); toast('💾 Partie sauvegardée'); break;
    case 'seed': if (S.level < CROPS[k].lvl) toast(`🔒 Débloqué au niveau ${CROPS[k].lvl}`); else if (CROPS[k].biome) S.gsel[CROPS[k].biome] = k; else S.selected = k; break;
    case 'use': if (have(k) > 0) useItem(k); else toast(`${ITEMS[k].name} : achète-en à la Boutique du marché.`); break;
    case 'equip': equipJewel(k); break;
    case 'unequip': unequip(i); break;
    case 'shopBuy': { const it = SHOP.find(x => x.k === k), q = i || 1; if (it && S.level >= it.lvl && S.coins >= it.price * q) { S.coins -= it.price * q; addItem(k, q); toast(`🛍️ +${q} ${ITEMS[k].name}`); } break; }
    case 'buyCos': { const [sl, id] = k.split('.'), C_ = COSMETICS[sl][id]; if (!S.cos.owned[k] && C_.price != null && S.coins >= C_.price && (!C_.lvl || S.level >= C_.lvl)) { S.coins -= C_.price; S.cos.owned[k] = true; track('buyCos'); S.cos.worn[sl] = id; rebuildFarmer(); toast(`👕 ${C_.name} acheté(e) et porté(e) !`, 'gold'); } break; }
    case 'wear': { const [sl, id] = k.split('.'); if (S.cos.owned[k]) { S.cos.worn[sl] = id; rebuildFarmer(); } break; }
    case 'deliverAll': { let tot = 0, n = 0; for (let j = 0; j < S.orders.length; j++) { const g = deliverOrder(j); if (g) { tot += g; n++; } } if (n) toast(`📦 ${n} commande${n > 1 ? 's' : ''} livrée${n > 1 ? 's' : ''} ! +${fmtN(tot)} 🪙`, 'gold'); else toast('Aucune commande ne peut être livrée avec ton sac actuel.'); break; }
    case 'wsSlot': { const W = WORKSHOPS[k], w = S.workshops[k], c = wsSlotCost(W); if (w && w.n < 2 && canPay(c)) { pay(c); w.n = 2; w.slots.push({ job: null, progress: 0, ready: false, last: null }); toast(`🏭 ${W.name} : second poste installé !`, 'gold'); } break; }
    case 'sell1': { const g = sell(k, 1); if (g) toast(`+${g} 🪙`); break; }
    case 'sellAll': { const g = sell(k, have(k)); if (g) toast(`+${fmtN(g)} 🪙`); break; }
    case 'sellN': { const g = sell(k, i); if (g) toast(`+${fmtN(g)} 🪙`); break; }
    case 'sellHalf': { const g = sell(k, Math.floor(have(k) / 2)); if (g) toast(`+${fmtN(g)} 🪙`); break; }
    case 'sellQ': { const inp = document.getElementById('sq_' + k), q = Math.max(0, Math.floor(+inp.value || 0)); const g = sell(k, q); if (g) toast(`+${fmtN(g)} 🪙 (${Math.min(q, g / ITEMS[k].price)} vendu${q > 1 ? 's' : ''})`); break; }
    case 'upMachine': { const M = MACHINES[k], L = mLevel(k), up = M.ups && M.ups[L - 1]; if (up && L < 3 && canPay(up)) { pay(up); S.mLvl[k] = L + 1; toast(`${M.icon} ${M.name} niveau ${L + 1} !`, 'gold'); } break; }
    case 'promote': { const W = WORKERS[k], st = staffOf(k), c = promoteCost(W, st.lvl); if (st.lvl < MAX_STAFF_LVL && st.xp >= staffXpNeed(st.lvl) && S.coins >= c) { S.coins -= c; st.xp -= staffXpNeed(st.lvl); st.lvl++; toast(`⬆️ ${W.name} passe niveau ${st.lvl} : plus rapide !`, 'gold'); } break; }
    case 'buyTool': { const T_ = TOOLS[k], lv = S.tools[k] || 0, up = T_.ups[lv]; if (up && canPay(up)) { pay(up); S.tools[k] = lv + 1; toast(`${T_.icon} ${T_.name} niveau ${lv + 2} !`, 'gold'); } break; }
    case 'sellEverything': { let g = 0; for (const key of Object.keys(S.inv)) g += sell(key, have(key)); if (g) toast(`💰 +${fmtN(g)} 🪙`, 'gold'); break; }
    case 'buyField': { const c = FIELD_UPGRADES[S.fieldLvl]; if (c && canPay(c)) { pay(c); S.fieldLvl++; track('expand'); toast('🌾 Le champ s\'agrandit de 8 parcelles !', 'gold'); } break; }
    case 'buyCan': { const c = CAN_UPGRADES[S.canLvl + 1]; if (c && canPay(c)) { pay(c); S.canLvl++; track('upgrade'); S.water = waterMax(); toast(`🪣 Arrosoir amélioré : ${waterMax()} arrosages !`, 'gold'); } break; }
    case 'buyAnimal': {
      const A = ANIMALS[k], c = animalCost(k);
      if (S.level >= A.lvl && S.coins >= c && S.animals.filter(a => a.type === k).length < MAX_PER_ANIMAL) { S.coins -= c; S.animals.push(spawnAnimal(k)); track('buyAnimal', k); toast(`${A.icon} Bienvenue à ta nouvelle ${A.name.toLowerCase()} !`); }
      break;
    }
    case 'feedAll': {
      let fed = 0; const missing = new Set();
      for (const a of S.animals) if (a.state === 'hungry') { const A = ANIMALS[a.type]; if (have(A.food) >= A.foodQty) { addItem(A.food, -A.foodQty); track('feed', a.type); a.state = 'working'; a.progress = 0; fed++; } else missing.add(ITEMS[A.food].name); }
      if (fed) toast(`😋 ${fed} animaux nourris`); if (missing.size) toast('Il manque : ' + [...missing].join(', '));
      break;
    }
    case 'collectAll': { let n = 0; for (const a of S.animals) if (a.state === 'ready') { const A = ANIMALS[a.type]; addItem(A.product, 1); track('collect', A.product); addXp(A.xp); a.state = 'hungry'; a.progress = 0; n++; } if (n) toast(`🧺 +${n} produits`); break; }
    case 'buyWs': { const W = WORKSHOPS[k], req = { coins: W.cost, ...W.mats }; if (!S.workshops[k] && S.level >= W.lvl && canPay(req)) { pay(req); S.workshops[k] = { n: 1, slots: [{ job: null, progress: 0, ready: false, last: null }] }; track('build', k); toast(`${W.icon} ${W.name} construite ! Le bâtiment est apparu.`, 'gold'); banner(W.name, '🏗️ Nouveau bâtiment'); } break; }
    case 'startWs': wsStart(k, i); break;
    case 'collectWs': { const out = wsCollect(k, i || 0); if (out) toast(`+1 ${ITEMS[out].name}`); break; }
    case 'deliver': { const g = deliverOrder(i); if (g) toast(`📦 Livré ! +${fmtN(g)} 🪙`, 'gold'); break; }
    case 'refuse': S.orders[i] = { wait: Date.now() + 60000 }; break;
    case 'buyMachine': { const M = MACHINES[k], n = S.machines[k] || 0, req = M.cost(n); if (S.level >= M.lvl && (M.multi ? n < M.multi : !n) && canPay(req)) { pay(req); S.machines[k] = n + 1; S.mOn[k] = true; toast(`${M.icon} ${M.name} installé${M.multi ? ` (${n + 1}/${M.multi})` : ''} !`, 'gold'); } break; }
    case 'toggleMachine': S.mOn[k] = S.mOn[k] === false; break;
    case 'hire': { const W = WORKERS[k]; if (!S.staff[k] && S.level >= W.lvl && (!W.need || S.gates[W.need]) && S.coins >= W.hire) { S.coins -= W.hire; S.staff[k] = { strike: false, lvl: 1, xp: 0 }; track('hire', k); delete WRT[k]; toast(`👷 ${W.name} rejoint ta ferme !`, 'gold'); setTimeout(() => say(k, `Merci de m'embaucher ! ${W.desc} Mon salaire : ${W.wage} pièces par jour. Plus je travaille, plus je deviens efficace !`), 300); } break; }
    case 'fire': if (confirm(`Renvoyer ${WORKERS[k].name} ?`)) { delete S.staff[k]; delete WRT[k]; } break;
    case 'payNow': { const t = wagesTotal(); if (S.coins >= t) { S.coins -= t; hiredWorkers().forEach(id => S.staff[id].strike = false); toast('👷 Salaires payés, tout le monde reprend le travail !'); } break; }
    case 'brush': planBrush = k || null; break;
    case 'planCell': { const p = S.plots[i]; p.plan = planBrush; break; }
    case 'planRow': { for (let j = i; j < i + FIELD.w && j < unlocked(); j++) S.plots[j].plan = planBrush; break; }
    case 'planAll': for (let j = 0; j < unlocked(); j++) S.plots[j].plan = planBrush; break;
    case 'planClear': for (let j = 0; j < MAX_PLOTS; j++) S.plots[j].plan = null; break;
    case 'planCopy': for (let j = 0; j < unlocked(); j++) { const p = S.plots[j]; p.plan = p.crop || p.last || p.plan || null; } break;
    case 'planNow': { let n = 0; for (const j of plotIdx()) if (autoReplant(j)) n++; if (n) toast(`🌱 ${n} parcelle${n > 1 ? 's' : ''} plantée${n > 1 ? 's' : ''} selon le plan`); break; }
    case 'repair': { const g = GATES[k]; if (!S.gates[k] && canPay(g.req)) { pay(g.req); closePanel(); openGate(k); save(); } break; }
    case 'reset': if (confirm('Effacer définitivement ta partie et recommencer ?')) { try { localStorage.removeItem(SAVE_KEY); } catch (e) {} location.reload(); } break;
  }
  renderPanel();
});

// ---------- Écran titre ----------
function showTitle() {
  titleOpen = true; $('#title').hidden = false;
  const saved = hasSave() && S.started;
  patch($('#tbody'), saved ? `
    <p class="sub">Content de te revoir, <b>${esc(S.name)}</b> !</p>
    <div class="savecard"><img src="${SPR.portrait.farmer}" alt=""><div><b>Ferme des ${esc(S.farm)}</b><small>Niveau ${S.level} · Jour ${S.day} · 🪙 ${fmtN(S.coins)}</small><small>${STORY[S.story] ? 'Chapitre ' + (STORY[S.story].ch + 1) + ' — ' + CHAPTERS[STORY[S.story].ch] : 'Histoire terminée'}</small></div></div>
    <button class="btn big" data-act="continue">▶ Continuer</button>
    <button class="btn ghost" data-act="newgame">Nouvelle partie</button>` : newGameForm());
}
const newGameForm = () => `<p class="sub">Ton grand-père Émile t'a légué sa vieille ferme, au cœur de la vallée de Bourg-Joli.</p>
    <label>Ton prénom<input id="fname" maxlength="16" value="${esc(S.name || 'Alex')}"></label>
    <label>Nom de ta ferme<input id="ffarm" maxlength="20" value="${esc(S.farm || 'Tilleuls')}"></label>
    <button class="btn big" data-act="start">🌱 Commencer l'aventure</button>`;
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]'); if (!el) return;
  if (el.dataset.act === 'continue') { $('#title').hidden = true; titleOpen = false; curZone = null; }
  if (el.dataset.act === 'newgame') { if (confirm('Commencer une nouvelle partie ? L\'ancienne sera effacée.')) patch($('#tbody'), newGameForm()); }
  if (el.dataset.act === 'start') {
    const name = ($('#fname').value || 'Alex').trim().slice(0, 16), farm = ($('#ffarm').value || 'Tilleuls').trim().slice(0, 20);
    try { localStorage.removeItem(SAVE_KEY); } catch (er) {}
    S = defaultState(); S.name = name; S.farm = farm; S.started = true; S.zoom = zoomTarget; migrate(); rebuildFarmer();
    for (const id of Object.keys(GATES)) { const g = GATES[id]; for (let y = g.y; y < g.y + g.h; y++) for (let x = g.x; x < g.x + g.w; x++) map[y][x] = id === 'pont' ? T.WATER : id === 'foret' ? T.PATH : T.STONE; }
    buildGround(); buildMini(); miniLocked = null;
    syncOrders(); S.daily = genDaily(); save();
    $('#title').hidden = true; titleOpen = false; curZone = 'ferme';
    setTimeout(() => banner(`Ferme des ${farm}`, '🏡 Bienvenue'), 200);
  }
});

// ============================================================
//  CONTRÔLES
// ============================================================
addEventListener('keydown', e => {
  if (titleOpen) { if (e.code === 'Enter' && $('[data-act=start]')) $('[data-act=start]').click(); return; }
  if (e.target.tagName === 'INPUT' && e.target.type !== 'range' && e.target.type !== 'checkbox') return;
  if (dlg.cur) { if (['KeyE', 'Space', 'Enter', 'Escape'].includes(e.code)) { e.preventDefault(); if (!e.repeat) advanceDialog(); } return; }
  if (e.code === 'Escape') { panel ? closePanel() : openPanel('options'); return; }
  if (['KeyE', 'Space', 'Enter'].includes(e.code)) { e.preventDefault(); if (!e.repeat) interact(); return; }
  const toggle = p => panel === p ? closePanel() : openPanel(p);
  if (e.code === 'KeyI') return toggle('bag');
  if (e.code === 'KeyJ') return toggle('journal');
  if (e.code === 'KeyC') return toggle('map');
  if (e.code === 'KeyO') return toggle('options');
  if (e.code === 'KeyH') return toggle('help');
  if (e.code === 'KeyP') return toggle('staff');
  if (e.code === 'KeyF') return toggle('plan');
  if (e.key && e.key.toLowerCase() === 'm') return toggle('machines');
  const m = e.code.match(/^(Digit|Numpad)([1-7])$/);
  if (m) { const gz = hotbarGarden(), list = gz ? GARDEN_CROPS[gz] : CROP_KEYS, k = list[+m[2] - 1]; if (!k) return; if (S.level < CROPS[k].lvl) toast(`🔒 Débloqué au niveau ${CROPS[k].lvl}`); else if (gz) S.gsel[gz] = k; else S.selected = k; return; }
  if (e.code === 'KeyL') return toggle('livre');
  if (e.code === 'KeyK') return toggle('perso');
  if (e.code.startsWith('Arrow')) e.preventDefault();
  if (/^(Arrow|Key[WASD])/.test(e.code)) mouse.t = -1e9;
  keys.add(e.code);
});
addEventListener('keyup', e => keys.delete(e.code));
addEventListener('blur', () => keys.clear());
canvas.addEventListener('wheel', e => { e.preventDefault(); if (!titleOpen) setZoom(zoomTarget * Math.pow(1.0015, -e.deltaY)); }, { passive: false });
canvas.addEventListener('pointerdown', e => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.inside = true; mouse.t = performance.now(); mouse.down = true; mouse.lastTile = null; mouseAction(true); });
canvas.addEventListener('pointermove', e => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.inside = true; mouse.t = performance.now(); if (mouse.down) mouseAction(false); });
addEventListener('pointerup', () => { mouse.down = false; });
canvas.addEventListener('pointerleave', () => { mouse.inside = false; mouse.down = false; });
mini.addEventListener('click', () => { if (!titleOpen && !dlg.cur) openPanel('map'); });
(() => {
  const zone = $('#joy'), knob = $('#knob'); let id = null;
  const move = e => {
    const r = zone.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    let dx = (e.clientX - cx) / (r.width / 2), dy = (e.clientY - cy) / (r.height / 2); const l = Math.hypot(dx, dy);
    if (l > 1) { dx /= l; dy /= l; } joy.x = dx; joy.y = dy; knob.style.transform = `translate(${dx * 38}px, ${dy * 38}px)`;
  };
  zone.addEventListener('pointerdown', e => { id = e.pointerId; zone.setPointerCapture(id); move(e); });
  zone.addEventListener('pointermove', e => { if (e.pointerId === id) move(e); });
  const end = () => { id = null; joy.x = joy.y = 0; knob.style.transform = ''; };
  zone.addEventListener('pointerup', end); zone.addEventListener('pointercancel', end);
  $('#abtn').addEventListener('pointerdown', e => { e.preventDefault(); interact(); });
})();

// ============================================================
//  DÉMARRAGE & BOUCLE
// ============================================================
const existing = load();
migrate(); rebuildFarmer();
for (const [id, open] of Object.entries(S.gates)) if (open) { const g = GATES[id]; for (let y = g.y; y < g.y + g.h; y++) for (let x = g.x; x < g.x + g.w; x++) map[y][x] = g.after; }
buildGround(); buildMini();
S.animals = S.animals.map(a => Object.assign(spawnAnimal(a.type), a));
if (existing && S.started) {
  const away = (Date.now() - S.last) / 1000;
  if (away > 5) { catchUp(Math.min(away, 86400)); if (away > 60) setTimeout(() => toast(`👋 Ta ferme a poussé pendant ton absence (${fmt(Math.min(away, 86400))}).`), 500); }
  syncOrders(); if (!S.daily) S.daily = genDaily();
}
resize();
zoom = zoomTarget = S.zoom || (innerWidth < 700 ? .8 : innerWidth < 1100 ? 1 : 1.15);
showTitle();

let last = performance.now(), uiTimer = 0, smokeT = 0;
function frame(t) {
  const dt = Math.min(.1, (t - last) / 1000); last = t; now = t;
  zoom += (zoomTarget - zoom) * Math.min(1, dt * 12);
  if (S.started) simulate(dt);
  if (S.started) { autoStep(dt, false); updateWorkers(dt); }
  updatePlayer(dt); updateFishing(dt); updateAnimals(dt); updateNpcs(dt); updateCritters(dt); updateParts(dt);
  for (const id in nodeShake) { nodeShake[id] -= dt; if (nodeShake[id] <= 0) delete nodeShake[id]; }
  if (dlg.cur && dlg.shown < dlg.cur.text.length) { dlg.shown = Math.min(dlg.cur.text.length, dlg.shown + dt * 55); renderDialog(); }
  if (S.started && !busy()) { S.time += dt * 2; if (S.time >= 1440) { S.time -= 1440; newDay(); } }
  smokeT -= dt;
  if (smokeT <= 0) {
    smokeT = .35;
    emit(6 * 16 + 72, 21 * 16 - 16, 1, { col: '#e8e8e8', speed: 6, life: 2.2, grav: -6, kind: 'smoke', angle: -Math.PI / 2 - .3, spread: .4, jitter: 2 });
    for (const b of BUILDINGS) if (b.ws && wsBusy(S.workshops[b.ws])) emit(b.x * 16 + 39, b.y * 16 - 14, 1, { col: '#d8d8d8', speed: 6, life: 2, grav: -7, kind: 'smoke', angle: -Math.PI / 2 - .3, spread: .4, jitter: 2 });
    if (false) emit(0, 0, 1, { col: '#cfcfcf', speed: 7, life: 2, grav: -7, kind: 'smoke', angle: -Math.PI / 2 - .3, spread: .4, jitter: 2 });
  }
  for (const f of floaters) f.t += dt;
  while (floaters.length && floaters[0].t >= 1) floaters.shift();
  let target = null;
  if (!busy()) { if (mouseActive()) { const w = mouseWorld(); target = targetAtWorld(w.x, w.y); } if (!target) target = getTarget(); }
  canvas.style.cursor = target && target.viaMouse ? (target.far ? 'not-allowed' : target.fn ? 'pointer' : 'default') : 'default';
  draw(target);
  uiTimer += dt;
  if (uiTimer > .15 && !titleOpen) { uiTimer = 0; checkMissions(); if (S.started) checkAchievements(); renderHud(target); renderPanel(); }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
setInterval(save, 3000);
addEventListener('beforeunload', save);
document.addEventListener('visibilitychange', () => { if (document.hidden) save(); });
