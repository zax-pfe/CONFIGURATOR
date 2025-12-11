import EventEmitter from "../Utils/EventEmitter";
import Experience from "../Experience";

import SpotLightHitbox from "../World/Object/Lights/SpotLight.js";
import Star from "../World/oldCode/Star.js";
import StarTest from "../World/Object/Star/StarTest.js";
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

    this.items = {};

    this.setupAvailableObjects();

    console.log("SelectAndLaunch items", this.items);

    // initialize SelectObject and ThrowObject
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
    this.starTest = new StarTest();

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
      this.Speaker4Textured,
      // this.star,
      this.starTest
    );

    for (const object of objectsTypes) {
      this.items[object.name] = object;
    }
  }

  selectAndLaunch() {
    // creer le debug de selection de l'objet
    this.selectObject.createDebug();
    // selectionne 5 objets au hasard parmis tout les objets disponibles
    this.selectObject.selectRandomObject();
    // creer les mesh des objets selectionnés et les disposer en cercle
    this.selectObject.createSelectedObjectsMeshes();

    // si on clique sur valide la selection.
    this.selectObject.on("objectSelected", () => {
      // on detruit le debug de selection dans selectObject
      // on set l'objet a lancer dans throwObject
      this.throwObject.objectToThrow = this.selectObject.objectToLaunch;
      // on crée le debug de lancé
      this.throwObject.createDebug();
    });

    this.throwObject.on("objectThrown", () => {
      // une fois l'objet lancé, on detruit le debug de lancé
      this.throwObject.destroyDebug();
      // on recree le debug pour relancer ou passer
      this.createDebug();
      // on clean les events listeners
      this.selectObject.off("objectSelected");
      this.throwObject.off("objectThrown");
    });
  }

  start() {
    this.selectAndLaunch();
  }

  end() {
    console.log("Select and Launch end called - from SelectAndLaunch");
    // Clean les events listeners
    this.selectObject.off("objectSelected");
    this.throwObject.off("objectThrown");
    this.destroyDebug();
    this.trigger("selectAndLaunchEnd");
  }

  createDebug() {
    if (this.experience.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("SelectAndLaunch");

      const debugObject = {
        replay: () => {
          this.destroyDebug();
          this.selectAndLaunch();
        },
        pass: () => {
          this.end();
        },
      };
      this.debugFolder.add(debugObject, "replay");
      this.debugFolder.add(debugObject, "pass");
    }
  }
  destroyDebug() {
    if (this.debugFolder) {
      this.debugFolder.destroy();
      this.debugFolder = null;
    }
  }
}
