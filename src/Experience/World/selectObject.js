import Experience from "../Experience";
import EventEmitter from "../Utils/EventEmitter";
// les objets sont crées en amont et donnés a cette classe

export default class SelectObject extends EventEmitter {
  constructor(objects) {
    super();
    // console.log("SelectObject initialized");

    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;

    // liste des objets pouvant etre selectionnés
    this.objects = objects;

    // PARAMETER OF THE WHEEL
    this.wheelRadius = 8;
    this.wheelPosition = { x: 0, y: 15, z: 35 };
    this.numberOfObjects = 5;
    this.angleStep = (2 * Math.PI) / this.numberOfObjects;
    this.circlePositions = this.generateCirclePositions();

    // parameter of the objet selector
    // ID of the selected object
    this.selectedId = 1;
    // Model of the selected Object
    this.currentSelectedModel = null;
    // liste des modeles affichés autour de la roue
    this.displayedModels = [];
    // objet selectionné pour le lancé
    this.objectToLaunch = null;
  }

  // selectionner des objets au hasard
  selectRandomObject() {
    this.randomSelectedObjects = [];
    const copyList = [...Object.values(this.objects)];

    for (let i = 0; i < this.numberOfObjects && copyList.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * copyList.length);
      this.randomSelectedObjects.push(copyList[randomIndex]);
      copyList.splice(randomIndex, 1);
    }
  }

  generateCirclePositions() {
    // genere les positions en cercle autour de la roue
    const positions = [];

    for (let i = 0; i < this.numberOfObjects; i++) {
      const angle = i * this.angleStep;

      const x = this.wheelPosition.x + this.wheelRadius * Math.cos(angle);
      const y = this.wheelPosition.y + this.wheelRadius * Math.sin(angle);

      positions.push({ x, y, z: this.wheelPosition.z });
    }

    return positions;
  }

  // creer les mesh des objets selectionnées.
  createSelectedObjectsMeshes() {
    for (let [index, object] of this.randomSelectedObjects.entries()) {
      const result = object.create();

      result.model.position.set(
        this.circlePositions[index].x,
        this.circlePositions[index].y,
        this.circlePositions[index].z
      );

      // displayed model permet de savoir quels models sont affichés
      // c'est surtout utile pour les supprimer ensuite
      this.displayedModels.push(result.model);
      this.experience.scene.add(result.model);
    }
  }

  // creer l'objet au centre
  setSelectedObject() {
    this.selectedObject = this.randomSelectedObjects[this.selectedId - 1];
    const result = this.selectedObject.create();
    result.model.position.set(
      this.wheelPosition.x,
      this.wheelPosition.y,
      this.wheelPosition.z
    );
    result.model.scale.set(
      this.selectedObject.scale.x * 2,
      this.selectedObject.scale.y * 2,
      this.selectedObject.scale.z * 2
    );

    if (this.currentSelectedModel) {
      this.experience.scene.remove(this.currentSelectedModel);
    }
    this.experience.scene.add(result.model);
    this.currentSelectedModel = result.model;
  }

  deleleteElements() {
    for (let object of this.displayedModels) {
      this.experience.scene.remove(object);
    }
  }

  createDebug() {
    if (this.experience.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Select");
      // choix de l'id de l'objet a lancer
      this.debugFolder
        .add(this, "selectedId", 1, this.numberOfObjects, 1)
        .name("selectedId")
        .onChange(() => {
          this.setSelectedObject();
        });

      // add function to delete the object
      const debugObject = {
        validateChoice: () => {
          this.deleleteElements();
          this.objectToLaunch = this.selectedObject;
          if (this.currentSelectedModel) {
            this.experience.scene.remove(this.currentSelectedModel);
          }
          this.destroyDebug();
          this.trigger("objectSelected");
        },
      };
      this.debugFolder.add(debugObject, "validateChoice");
    }
  }

  destroyDebug() {
    if (this.debugFolder) {
      this.debugFolder.destroy();
      this.debugFolder = null;
    }
  }
}
