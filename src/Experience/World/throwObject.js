import Physics from "../Utils/Physics.js";
import Experience from "../Experience.js";
import EventEmitter from "../Utils/EventEmitter.js";

export default class ThrowObject extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.time = this.experience.time;
    this.objectsToAnimate = this.experience.animate.objectsToAnimate
    this.debug = this.experience.debug;
    this.physics = new Physics();

    this.items = [];
    this.itemNames = [];
    this.objectsTypes = [];

    // this.setupAvailableObjects();

    this.selectedObject = this.itemNames[0];
    this.power = 1;
    this.angleX = 0;
    this.angleY = 0;
    this.objectToThrow = null;
  }

  addToWorld() {
    const result = this.objectToThrow.create();
    // setup l'animation de l'objet si souhaité
    this.objectToThrow.setAnimation(result);
    // si l'objet est animé, l'ajouter à la liste des objets animés et le mettre à jour
    if (result.update) {
      console.log("TOGGLE ANIMATION")
      this.objectsToAnimate.push(result)
    }

    this.experience.scene.add(result.model);
    this.physics.world.addBody(result.body);

    const speed = 2 * this.power;
    result.body.velocity.set(this.angleX, this.angleY, -speed);

    this.physics.objectsToUpdate.push({
      mesh: result.model,
      body: result.body,
    });

    // let newObject;
    // if (name === "Speaker2Hitbox") {
    //   newObject = new Speaker2Hitbox();
    // } else if (name === "Speaker3Hitbox") {
    //   newObject = new Speaker3Hitbox();
    // }
    // const result = newObject.create();
    // this.experience.scene.add(result.model);
    // this.physics.world.addBody(result.body);
    // const speed = 15 * throwPower; // m/s
    // result.body.velocity.set(0, 0, -speed);
    // this.physics.objectsToUpdate.push({
    //   mesh: result.model,
    //   body: result.body,
    // });
  }

  createDebug() {
    if (this.experience.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("ThrowObject");

      // choix de l'angle de lancé
      this.debugFolder.add(this, "angleX", -10, 10, 1).name("angleX");
      this.debugFolder.add(this, "angleY", -10, 10, 1).name("angleY");
      // choix de la puissance du lancé
      this.debugFolder.add(this, "power", 0.1, 5, 0.1).name("power");
      // add function to launch the object
      const debugObject = {
        throw: () => {
          this.addToWorld(this.angleX, this.angleY, this.power);
          this.destroyDebug();
          this.trigger("objectThrown");
        },
      };
      this.debugFolder.add(debugObject, "throw");
    }
  }

  destroyDebug() {
    if (this.debugFolder) {
      this.debugFolder.destroy();
      this.debugFolder = null;
    }
  }
}
