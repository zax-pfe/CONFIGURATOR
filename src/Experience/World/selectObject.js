import Experience from "../Experience";
import EventEmitter from "../Utils/EventEmitter";
// les objets sont crées en amont et donnés a cette classe

export default class SelectObject extends EventEmitter {
  constructor(objects) {
    super();
    console.log("SelectObject initialized");

    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;

    this.objects = objects;
    this.wheelRadius = 8;
    this.wheelPosition = { x: 0, y: 15, z: 35 };
    this.numberOfObjects = 5;
    this.angleStep = (2 * Math.PI) / this.numberOfObjects;
    this.circlePositions = this.generateCirclePositions();
    console.log("SelectObject positions", this.circlePositions);
    this.selectedObjects = [];
    this.selectedId = 1;
    this.currentSelectedModel = null;
    this.displayedModels = [];
    // this.createDebug();

    this.objectToLaunch = null;
  }

  // selectionner des objets au hasard
  selectRandomObject() {
    const copyList = [...Object.values(this.objects)];

    for (let i = 0; i < this.numberOfObjects && copyList.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * copyList.length);
      this.selectedObjects.push(copyList[randomIndex]);
      copyList.splice(randomIndex, 1);
    }
    console.log("Selected Objects", this.selectedObjects);
  }

  // ajouter un objet dans la roue.
  // parametre centre de la roue
  // parametre de nombre d'objet a ajouter

  generateCirclePositions() {
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
    this.selectRandomObject();
    for (let [index, object] of this.selectedObjects.entries()) {
      const result = object.create();

      // object.position = ;
      // console.log("object position", object.position);
      result.model.position.set(
        this.circlePositions[index].x,
        this.circlePositions[index].y,
        this.circlePositions[index].z
      );
      this.displayedModels.push(result.model);
      this.experience.scene.add(result.model);
    }
  }

  // creer l'objet au centre
  setSelectedObject() {
    this.selectedObject = this.selectedObjects[this.selectedId - 1];
    console.log("this.selectedObject", this.selectedObject);
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

    // const startTime = performance.now();
    // const animate = () => {
    //   const elapsed = performance.now() - startTime;
    //   const progress = Math.min(elapsed / 2000, 1); // 0.5 seconds duration
    //   const scale = 1 + progress * 2; // Scale from 1 to 3

    //   result.model.scale.set(
    //     this.selectedObject.scale.x * scale,
    //     this.selectedObject.scale.y * scale,
    //     this.selectedObject.scale.z * scale
    //   );

    //   if (progress < 1) {
    //     requestAnimationFrame(animate);
    //   }
    // };
    // requestAnimationFrame(animate);

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
        delete: () => {
          this.deleleteElements();
        },
        validateChoice: () => {
          console.log("Choice validated:", this.selectedId);
          this.deleleteElements();
          this.objectToLaunch = this.selectedObject;
          if (this.currentSelectedModel) {
            this.experience.scene.remove(this.currentSelectedModel);
          }
          this.trigger("objectSelected");
          this.destroyDebug();
        },
      };
      this.debugFolder.add(debugObject, "delete");
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
