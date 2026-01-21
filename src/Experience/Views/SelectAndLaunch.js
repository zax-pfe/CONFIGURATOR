import EventEmitter from "../Utils/EventEmitter.js";
import Experience from "../Experience.js";

import SpotLightHitbox from "../World/Object/Lights/SpotLight.js";
import MovingSpotLightHitbox from "../World/Object/Lights/MovingLight.js";
import Laser from "../World/Object/Lights/Laser.js";
import Star from "../World/Object/Stars/Star.js";
import RockStar from "../World/Object/Stars/RockStar.js";
import GirlStar from "../World/Object/Stars/GirlStar.js";
import DaftStar from "../World/Object/Stars/DaftStar.js";
import DiscoBallHitbox from "../World/Object/RandomObjects/DiscoBall.js";
import ChoppeHitbox from "../World/Object/RandomObjects/Choppe.js";
import BottleHitbox from "../World/Object/RandomObjects/Bottle.js";
import SpeakerHitbox from "../World/Object/Speakers/SpeakerHitbox.js";
import Speaker2Hitbox from "../World/Object/Speakers/Speaker2Hitbox.js";
import Speaker3Hitbox from "../World/Object/Speakers/Speaker3Hitbox.js";
import Speaker4Hitbox from "../World/Object/Speakers/Speaker4Hitbox.js";
import SpeakerTextured from "../World/Object/Speakers/SpeakerTextured.js";
import Speaker2Textured from "../World/Object/Speakers/Speaker2Textured.js";
import Speaker3Textured from "../World/Object/Speakers/Speaker3Textured.js";
import Speaker4Textured from "../World/Object/Speakers/Speaker4Textured.js";
import GuitarAs1 from "../World/Object/Speakers/Guitar/GuitarAs1.js";
import Slingshot from "../World/Object/Slingshot/Slingshot.js";
import Intern from "../World/Object/Intern/Intern.js";
import Synth1 from "../World/Object/Speakers/Synth/Synth1.js";
import Synth2 from "../World/Object/Speakers/Synth/Synth2.js";
import Synth3 from "../World/Object/Speakers/Synth/Synth3.js";
import SynthCool from "../World/Object/Speakers/Synth/SynthCool.js";
import Drums1 from "../World/Object/Speakers/Drums/Drums1.js";
import SpeakerMic1 from "../World/Object/Speakers/Voices/Micro.js";
import SpeakerMic2 from "../World/Object/Speakers/Voices/Micro2.js";
import ThrowObject from "../World/throwObject.js";
import SelectObject from "../World/selectObject.js";

import gsap from "gsap";

// creer tout les elements necessaires

export default class SelectAndLaunch extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.camera = this.experience.camera; // movement de la caméra

    this.debug = this.experience.debug;
    this.connection = this.experience.connection;
    this.gameTimer = this.experience.gameTimer;

    this.items = {};
    this.stars = {};

    this.gameDuration = 100;
    this.timeIsUp = false;
    this.isStarPhase = false;

    this.setupAvailableObjects();

    // console.log("SelectAndLaunch items", this.items);

    // initialize SelectObject and ThrowObject
    this.slingshot = new Slingshot();
    this.selectObject = new SelectObject(this.items, this.stars);
    this.throwObject = new ThrowObject(this.slingshot);

    this.gameTimer.on("timerEnd", () => {
      console.log("timer end");
      this.timeIsUp = true;
    });
  }

  setupAvailableObjects() {
    const objectsTypes = [];
    const starTypes = [];

    this.speaker2 = new Speaker2Hitbox();
    this.speaker3 = new Speaker3Hitbox();
    this.speaker1 = new SpeakerHitbox();
    this.speaker4 = new Speaker4Hitbox();
    this.bottle = new BottleHitbox();
    this.choppe = new ChoppeHitbox();
    this.discoBall = new DiscoBallHitbox();
    this.spotLight = new SpotLightHitbox();
    this.movingSpotLight = new MovingSpotLightHitbox();
    this.laser = new Laser();
    this.speaker1textured = new SpeakerTextured();
    this.speaker2textured = new Speaker2Textured();
    this.speaker3textured = new Speaker3Textured();
    this.Speaker4Textured = new Speaker4Textured();
    this.guitarAs1 = new GuitarAs1();
    this.synth1 = new Synth1();
    this.synth2 = new Synth2();
    this.synth3 = new Synth3();
    this.synthCool = new SynthCool();
    // this.star = new Star();
    this.rockStar = new RockStar();
    this.girlStar = new GirlStar();
    this.daftStar = new DaftStar();
    this.drums1 = new Drums1();
    this.speakerMic1 = new SpeakerMic1();
    this.speakerMic2 = new SpeakerMic2();

    // on ajoute l'instance de la calsse au tableau d'update dans world
    this.experience.world.registerStarInstance(this.rockStar);
    this.experience.world.registerStarInstance(this.girlStar);
    this.experience.world.registerStarInstance(this.daftStar);

    this.intern = new Intern();

    objectsTypes.push(
      this.speaker1,
      this.speaker2,
      this.speaker3,
      this.speaker4,
      this.bottle,
      this.choppe,
      this.discoBall,
      this.spotLight,
      this.movingSpotLight,
      this.laser,
      this.speaker1textured,
      this.speaker2textured,
      this.speaker3textured,
      this.Speaker4Textured,
      // this.guitarAs1,
      this.synth1,
      // this.synth2,
      // this.synth3,
      this.synthCool,
      this.drums1,
      this.speakerMic1,
      this.speakerMic2,
    );

    for (const object of objectsTypes) {
      this.items[object.name] = object;
    }

    starTypes.push(
      // this.star,
      this.rockStar,
      this.girlStar,
      this.daftStar,
    );

    for (const star of starTypes) {
      this.stars[star.name] = star;
    }
  }

  selectAndLaunch(isStarPhase = false) {
    this.isStarPhase = isStarPhase;

    this.experience.world.controlManager.currentScene = "select";
    // envoie message au mobile pour indiquer la phase
    if (this.isStarPhase) {
      this.connection.sendMessage("select-star");
    } else {
      this.connection.sendMessage("select");
    }

    // selectionne 5 objets au hasard parmis tout les objets disponibles
    // this.selectObject.selectRandomObject();
    this.selectObject.selectObjectsOrStars(this.isStarPhase);

    // creer le debug de selection de l'objet
    this.selectObject.createDebug();

    // creer les mesh des objets selectionnés et les disposer en cercle
    this.selectObject.createSelectedObjectsMeshes();
    this.intern.throwAnimation();
    // informe que l'on est en phase de selection
    this.selectObject.selectPhase = true;

    // si on clique sur valide la selection.
    this.selectObject.on("objectSelected", () => {
      // informe que l'on n'est plus en phase de selection
      this.selectObject.selectPhase = false;

      this.experience.world.controlManager.currentScene = "throw";
      // envooie message au mobile pour indiquer la phase
      this.connection.sendMessage("throw");

      // on detruit le debug de selection dans selectObject
      // on set l'objet a lancer dans throwObject
      this.throwObject.objectToThrow = this.selectObject.objectToLaunch;
      if (this.isStarPhase) {
        this.experience.world.controlManager._outro.selectedStar =
          this.selectObject.objectToLaunch;
      }

      this.throwObject.createSelectedObject();

      // informe que l'on est en phase de lancer
      this.throwObject.throwPhase = true;
      // on crée le debug de lancé
      this.throwObject.createDebug();
    });

    this.throwObject.on("objectThrown", () => {
      this.experience.world.controlManager.currentScene = "objectThrown";
      // une fois l'objet lancé, on detruit le debug de lancé
      this.throwObject.destroyDebug();
      this.throwObject.destroySlingshot();
      // on recree le debug pour relancer ou passer
      this.createDebug();
      // on clean les events listeners
      this.selectObject.off("objectSelected");
      this.throwObject.off("objectThrown");

      this.destroyDebug();

      this.checkNextStep();
    });
  }

  checkNextStep() {
    // si deja en phase star = fin
    if (this.isStarPhase) {
      console.log("Ending Experience");
      this.end();
      return;
    }
    // phase objets et temps terminé
    if (this.timeIsUp) {
      console.log("Starting Star Phase (Bonus)");
      this.createDebug(true); // debug pour Star phase
      this.selectAndLaunch(true); // true = lance la phase Star
      // phase objet temps pas terminé
    } else {
      console.log("Next normal object...");
      this.createDebug(false); // debug normal
      this.selectAndLaunch(false); // false = lance la phase normale
    }
  }

  start() {
    // this.selectAndLaunch();
    this.timeIsUp = false;
    this.isStarPhase = false;
    this.createDebug(false);
    // on recuperer l'overlay noir qui va permettre le fade in et out
    this.overlay = document.querySelector(".black-overlay");
    this.overlay.style.opacity = 1;

    const experienceStartTimeline = gsap.timeline();

    experienceStartTimeline.from(this.camera.instance.position, {
      x: this.camera.instance.position.x,
      y: this.camera.instance.position.y + 10,
      z: this.camera.instance.position.z + 100,
      duration: 2,
      ease: "power1.out",
    });

    experienceStartTimeline.to(
      this.overlay,
      {
        opacity: 0,
        duration: 2,
        ease: "power1.in",
        onStart: () => {
          // crée le stagiare
          this.intern.create();
        },
        onComplete: () => {
          console.log("Starting normal object phase");
          this.selectAndLaunch(false);
          this.gameTimer.start(this.gameDuration);
        },
      },
      "-=2",
    );
  }

  end() {
    console.log("Select and Launch end called - from SelectAndLaunch");
    this.gameTimer.stop();

    // Clean les events listeners
    this.selectObject.off("objectSelected");
    // détruit les objets de la roue et l'objet du centre
    this.selectObject.destroyElements();
    // détruit le debug folder
    this.selectObject.destroyDebug();
    this.throwObject.off("objectThrown");
    this.throwObject.destroyObject();
    // détruit le lance-pierre
    this.throwObject.destroySlingshot();
    // détruit le debug folder
    this.throwObject.destroyDebug();
    this.destroyDebug();
    this.trigger("selectAndLaunchEnd");

    // détruit le stagiare
    this.intern.destroy();
  }

  createDebug(isStarPhase) {
    if (this.experience.debug.active) {
      this.destroyDebug();
      this.debugFolder = this.debug.ui.addFolder("SelectAndLaunch");

      const debugObject = {
        skipTimer: () => {
          // force la fin du timer pour tester la transition
          this.gameTimer.remaining = 0; // declenche timerEnd au prochain update
        },
        pass: () => {
          this.end();
        },
      };

      if (!isStarPhase) {
        this.debugFolder.add(debugObject, "skipTimer").name("Finish Timer Now");
      }
      this.debugFolder.add(debugObject, "pass");

      // this.debugFolder.add(debugObject, "replay");
      // this.debugFolder.add(debugObject, "pass");
    }
  }
  destroyDebug() {
    if (this.debugFolder) {
      this.debugFolder.destroy();
      this.debugFolder = null;
    }
  }
}
