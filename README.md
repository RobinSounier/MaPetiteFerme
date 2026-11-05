# 🌾 Ma Petite Ferme — La vallée de Bourg-Joli

Un jeu de ferme en pixel art, jouable directement dans le navigateur, sans installation.

Tu reprends la vieille ferme de ton grand-père Émile, au cœur de la vallée de Bourg-Joli. Cultive, élève des animaux, explore la forêt, la plage, la montagne et la mine, aide les villageois et deviens la légende de la vallée.

## ▶️ Jouer

- **En ligne** : via GitHub Pages (voir l'adresse dans la description du dépôt).
- **En local** : télécharge `index.html` et ouvre-le dans ton navigateur.

La partie est sauvegardée automatiquement dans le navigateur, et la ferme continue de pousser quand le jeu est fermé.

## 🎮 Commandes

| Action | Touche |
|---|---|
| Se déplacer | Flèches ou ZQSD / WASD (Maj pour courir) |
| Agir | E ou Espace, ou clic (le personnage s'y rend tout seul) |
| Choisir une graine | 1 à 7 |
| Zoom | Molette, ou boutons ➖ ➕ |
| Journal / Sac / Carte | J / I / C |
| Plan du champ | F |
| Machines / Employés | M / P |
| Livre des objectifs / Personnage | L / K |
| Options / Aide | O / H |

Sur téléphone et tablette, un joystick et un bouton d'action s'affichent à l'écran.

## ✨ Contenu

- **Histoire** en 6 chapitres (46 missions) racontée par les villageois, avec dialogues et portraits
- **6 zones** : la ferme, le village, la forêt des Murmures, la plage du Grand Bleu, les Monts Givrés et la mine
- **13 cultures**, dont 6 qui ne poussent que dans les jardins de leur biome
- **8 animaux** (poule, vache, mouton, cochon, lapin angora, cerf, renard des neiges, chèvre)
- **7 ateliers**, chacun avec son propre bâtiment (et un second poste en amélioration)
- **Automatisation** : machines améliorables, employés qui gagnent de l'expérience et des promotions, plan du champ, livreur
- **Bijoux magiques** à équiper, consommables, plats qui donnent des bonus
- **Livre des objectifs** avec 35 objectifs, dont des exploits chronométrés
- **Mercerie** pour personnaliser son personnage
- Cycle jour/nuit, météo (pluie, neige), pêche, minage, défis par niveau, missions du jour

Tout le pixel art est dessiné en code : il n'y a aucune image externe.

## 🛠️ Développement

Le code source est dans `src/` :

| Fichier | Contenu |
|---|---|
| `shell.html` | Structure de la page et styles |
| `sprites.js`, `sprites2.js` | Tout le pixel art (personnages, animaux, cultures, bâtiments, décor) |
| `world.js` | Données du jeu : objets, carte, histoire, employés, objectifs… |
| `engine.js` | Logique du jeu : simulation, interactions, automatisation |
| `render.js` | Affichage du monde |
| `ui.js` | Interface, panneaux, commandes et boucle de jeu |

Après une modification dans `src/`, régénère le jeu :

```bash
python3 build.py
```

Cette commande assemble tous les fichiers en un seul `index.html`.
