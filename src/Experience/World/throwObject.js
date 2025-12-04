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

export default class ThrowObject {
  // cette classe doit créer tout les elements qui peuvent etre lancés dans la scene
  // Création - on obiens le body et le mesh associés.
  // On push tout ces elements dans une Big liste
  // On a une fonction add qui permet d'ajouter un element, par son nom, dans le wold et la scene.
  // cette fonction add prend en parametre le nom de l'element a ajouter ainsi que l'angle de lancé.
  // les elements étant créés en amont, il n'y a pour l'instant pas d'aléatoire sur la mass etc.
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.physics = new Physics();

    this.items = [];
    this.itemNames = [];
    this.objectsTypes = [];
    this.setupAvailableObjects();

    this.selectedObject = this.itemNames[0];
    this.power = 1;
    this.angleX = 0;
    this.angleY = 0;

    console.log("ThrowObject item names", this.itemNames);
    this.createDebug();
  }

  setupAvailableObjects() {
    this.speaker2 = new Speaker2Hitbox();
    this.speaker3 = new Speaker3Hitbox();
    this.speaker1 = new SpeakerHitbox();
    this.speaker4 = new Speaker4Hitbox();
    this.bottle = new BottleHitbox();
    this.choppe = new ChoppeHitbox();
    this.discoBall = new DiscoBallHitbox();
    this.spotLight = new SpotLightHitbox();
    // this.star = new Star();

    this.objectsTypes.push(
      this.speaker1,
      this.speaker2,
      this.speaker3,
      this.speaker4,
      this.bottle,
      this.choppe,
      this.discoBall,
      this.spotLight
      // this.star
    );

    for (const object of this.objectsTypes) {
      this.itemNames.push(object.name);
      this.items[object.name] = object;
    }
  }

  addToWorld(name, throwAngleX, throwAngleY, throwPower) {
    const item = this.items[name];
    const result = item.create();
    this.experience.scene.add(result.model);
    this.physics.world.addBody(result.body);

    const speed = 15 * throwPower; // m/s
    // const angleRadians = (this.angleX * Math.PI) / 180; // Convertir degrés en radians
    // const vx = Math.cos(angleRadians) * speed;
    // const vz = Math.sin(angleRadians) * speed;
    // const vy = 5;
    result.body.velocity.set(throwAngleX, throwAngleY, -speed);
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

  //
  // this.throwObject.addToWorld("Speaker3Hitbox", 0, 2);

  createDebug() {
    if (this.experience.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("ThrowObject");
      // choix du nom de l'objet a lancer
      this.debugFolder
        .add(this, "selectedObject", this.itemNames)
        .name("selectedObject");
      // choix de l'angle de lancé
      this.debugFolder.add(this, "angleX", -10, 10, 1).name("angleX");
      this.debugFolder.add(this, "angleY", -10, 10, 1).name("angleY");
      // choix de la puissance du lancé
      this.debugFolder.add(this, "power", 0.1, 5, 0.1).name("power");
      // add function to launch the object
      const debugObject = {
        throw: () => {
          this.addToWorld(
            this.selectedObject,
            this.angleX,
            this.angleY,
            this.power
          );
        },
      };
      this.debugFolder.add(debugObject, "throw");
    }
  }
}
