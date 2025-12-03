# Branche d'Axel

## Setup

```bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```

## Todos

1. Créer une scene modulaire ( physic World ) avec des elements qu'on peut déplacer avec debug UI.

- Sachant que je veux que tout les elements puissent bouger, il n'y aurait que le sol qui aurait une mass de 0.
- Rajouter des poteaux en cylindre.

2. Penser la facon dont les objets vont pouvoir etre lancés dans la scene.

- Faire une classe intermediaire qui crée tout les elements et les stocke dans une liste, les ajoute pas au world ni a la scene, et quand l'utilisateur choisir un objet. l'objet a l'indice X passe dans une autre classe qui l'ajoute a la scene et au world en lui appliquant une force.

3. Ajouter du son aux objets, dire si les objets emmetent ou pas du son.

4. Pouvoir faire bouger la camera, créer des zones avec des angles sur lesquels la camera pourrait se positionner.

5. Ajouter des effets visuels a la scene, genre des particules a certains endroit pour rendre le tout shiny.

6. Gerer les differentes lights.
