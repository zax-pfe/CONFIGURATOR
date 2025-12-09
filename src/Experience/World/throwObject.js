import Physics from "../Utils/Physics.js";
import Experience from "../Experience.js";
import SpotLightHitbox from "./Lights/SpotLight.js";
import Star from "./Star/Star.js";
import DiscoBallHitbox from "./RandomObjects/DiscoBall.js";
import ChoppeHitbox from "./RandomObjects/Choppe.js";
import BottleHitbox from "./RandomObjects/Bottle.js";
import SpeakerHitbox from "./Speakers/SpeakerHitbox.js";
import Speaker2Hitbox from "./Speakers/Speaker2Hitbox.js";
import Speaker3Hitbox from "./Speakers/Speaker3Hitbox.js";
import Speaker4Hitbox from "./Speakers/Speaker4Hitbox.js";
import SpotLightHitbox2 from "./Lights/Spotlight2.js";
import SpeakerTextured from "./Speakers/SpeakerTextured.js";
import Speaker2Textured from "./Speakers/Speaker2Textured.js";
import Speaker3Textured from "../World/Speakers/Speaker3Textured.js";
import Speaker4Textured from "./Speakers/Speaker4Textured.js";
import StarTest from "./Star/StarTest.js";
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
    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.physics = new Physics();

    this.items = [];
    this.itemNames = [];
    this.objectsTypes = [];
    this.animatedObjects = [];
    this.setupAvailableObjects();

    this.selectedObject = this.itemNames[0];
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

    if (result.update) {
      this.animatedObjects.push(result);
    }

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

  update() {
    const deltaTime = this.time.delta * 0.001; // Convertir en secondes si besoin
    
    for (const object of this.animatedObjects) {
        if (object.update) {
            object.update(deltaTime);
        }
    }
  }
  destroyDebug() {
    if (this.debugFolder) {
      this.debugFolder.destroy();
      this.debugFolder = null;
    }
  }
}
