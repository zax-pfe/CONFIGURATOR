import Physics from "../Utils/Physics.js";
import Experience from "../Experience.js";
import EventEmitter from "../Utils/EventEmitter.js";

export default class ThrowObject extends EventEmitter {
  // cette classe doit créer tout les elements qui peuvent etre lancés dans la scene
  // Création - on obiens le body et le mesh associés.
  // On push tout ces elements dans une Big liste
  // On a une fonction add qui permet d'ajouter un element, par son nom, dans le wold et la scene.
  // cette fonction add prend en parametre le nom de l'element a ajouter ainsi que l'angle de lancé.
  // les elements étant créés en amont, il n'y a pour l'instant pas d'aléatoire sur la mass etc.
  constructor() {
    super();
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.physics = new Physics();

    this.power = 1;
    this.angleX = 0;
    this.angleY = 0;
    this.objectToThrow = null;
  }

  addToWorld(throwAngleX, throwAngleY, throwPower) {
    const result = this.objectToThrow.create();
    this.experience.scene.add(result.model);
    this.physics.world.addBody(result.body);

    const speed = 15 * throwPower; // m/s
    result.body.velocity.set(throwAngleX, throwAngleY, -speed);

    this.physics.objectsToUpdate.push({
      mesh: result.model,
      body: result.body,
    });
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
