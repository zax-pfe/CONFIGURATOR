import EventEmitter from "../Utils/EventEmitter";
import Experience from "../Experience";
import Physics from "../Utils/Physics.js";

import SpotLightHitbox from "../World/Object/Lights/SpotLight.js";
import Star from "../World/Object/Star/Star.js";
import DiscoBallHitbox from "../World/Object/RandomObjects/DiscoBall.js";
import ChoppeHitbox from "../World/Object/RandomObjects/Choppe.js";
import BottleHitbox from "../World/Object/RandomObjects/Bottle.js";
import SpeakerHitbox from "../World/Object/Speakers/SpeakerHitbox.js";
import Speaker2Hitbox from "../World/Object/Speakers/Speaker2Hitbox.js";
import Speaker3Hitbox from "../World/Object/Speakers/Speaker3Hitbox.js";
import Speaker4Hitbox from "../World/Object/Speakers/Speaker4Hitbox.js";
import SpotLightHitbox2 from "../World/Object/Lights/Spotlight2.js";
import SpeakerTextured from "../World/Object/Speakers/SpeakerTextured.js";
import Speaker2Textured from "../World/Object/Speakers/Speaker2Textured.js";
import Speaker3Textured from "../World/Object/Speakers/Speaker3Textured.js";
import Speaker4Textured from "../World/Object/Speakers/Speaker4Textured.js";

import ThrowObject from "../World/throwObject.js";
import SelectObject from "../World/selectObject.js";

// creer tout les elements necessaires

export default class SelectAndLaunch extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.connection = this.experience.connection;

    this.physics = new Physics();

    this.items = [];

    this.setupAvailableObjects();
    this.power = 1;
    this.angleX = 0;
    this.angleY = 0;

    console.log("SelectAndLaunch items", this.items);

    this.selectObject = new SelectObject(this.items);
    this.throwObject = new ThrowObject();
  }

  setupAvailableObjects() {
    const objectsTypes = [];
    this.speaker2 = new Speaker2Hitbox();
    this.speaker3 = new Speaker3Hitbox();
    this.speaker1 = new SpeakerHitbox();
    this.speaker4 = new Speaker4Hitbox();
    this.bottle = new BottleHitbox();
    this.choppe = new ChoppeHitbox();
    this.discoBall = new DiscoBallHitbox();
    this.spotLight = new SpotLightHitbox();
    this.spotLight2 = new SpotLightHitbox2();
    this.speaker1textured = new SpeakerTextured();
    this.speaker2textured = new Speaker2Textured();
    this.speaker3textured = new Speaker3Textured();
    this.Speaker4Textured = new Speaker4Textured();
    // this.star = new Star();

    objectsTypes.push(
      this.speaker1,
      this.speaker2,
      this.speaker3,
      this.speaker4,
      this.bottle,
      this.choppe,
      this.discoBall,
      this.spotLight,
      this.spotLight2,
      this.speaker1textured,
      this.speaker2textured,
      this.speaker3textured,
      this.Speaker4Textured
      // this.star
    );

    for (const object of objectsTypes) {
      this.items[object.name] = object;
    }
  }

  start() {
    console.log("Select and Launch start from SelectAndLaunch");
    // this.createDebug();
    this.selectObject.createDebug();
    this.selectObject.selectRandomObject();
    this.selectObject.createSelectedObjectsMeshes();

    this.selectObject.on("objectSelected", () => {
      console.log("Object selected :", this.selectObject.objectToLaunch);
      this.throwObject.objectToThrow = this.selectObject.objectToLaunch;
      this.throwObject.createDebug();
    });
    this.throwObject.on("objectThrown", () => {
      this.end();
    });
  }

  end() {
    console.log("Select and Launch end called - from SelectAndLaunch");
    this.trigger("selectAndLaunchEnd");
    this.destroyDebug();
  }

  addToWorld(name, throwAngleX, throwAngleY, throwPower) {
    const item = this.items[name];
    const result = item.create();
    this.experience.scene.add(result.model);
    this.physics.world.addBody(result.body);

    const speed = 15 * throwPower; // m/s
    result.body.velocity.set(throwAngleX, throwAngleY, -speed);

    this.physics.objectsToUpdate.push({
      mesh: result.model,
      body: result.body,
    });
  }

  destroyDebug() {
    if (this.debugFolder) {
      this.debugFolder.destroy();
      this.debugFolder = null;
    }
  }
}
