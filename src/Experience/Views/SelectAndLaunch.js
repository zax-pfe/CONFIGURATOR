import EventEmitter from "../Utils/EventEmitter.js";
import Experience from "../Experience.js";

import SpotLightHitbox from "../World/Object/Lights/SpotLight.js";
import MovingSpotLightHitbox from "../World/Object/Lights/MovingLight.js";
import Laser from "../World/Object/Lights/Laser.js";
import Star from "../World/Object/Stars/Star.js";

import Slingshot from "../World/Object/Slingshot/Slingshot.js";
import Intern from "../World/Object/Intern/Intern.js";
import ThrowObject from "../World/throwObject.js";
import SelectObject from "../World/selectObject.js";
import MachineALaver from "../World/Object/Speakers/Drums/MachineALaver.js";
import Bloc from "../World/Object/Speakers/Drums/Bloc.js";
// ======================== RANDOM OBJECT =========================
import Phone from "../World/Object/RandomObjects/Phone.js";
import Plante from "../World/Object/RandomObjects/Plante.js";
import CadrePhoto from "../World/Object/RandomObjects/CadrePhoto.js";
// import Sofa from "../World/Object/RandomObjects/Sofa.js";
import Boisson from "../World/Object/RandomObjects/Boisson.js";
import Tiroir from "../World/Object/RandomObjects/Tiroir.js";
// ======================== STARS =================================
import RockStar from "../World/Object/Stars/RockStar.js";
import GirlStar from "../World/Object/Stars/GirlStar.js";
import DaftStar from "../World/Object/Stars/DaftStar.js";
// ======================== SPEAKER =================================
import Synth1 from "../World/Object/Speakers/Synth/Synth1.js";
import Synth2 from "../World/Object/Speakers/Synth/Synth2.js";
import Synth3 from "../World/Object/Speakers/Synth/Synth3.js";
import SynthCool from "../World/Object/Speakers/Synth/SynthCool.js";
import Drums1 from "../World/Object/Speakers/Drums/Drums1.js";
import SpeakerMic1 from "../World/Object/Speakers/Voices/Micro.js";
import SpeakerMic2 from "../World/Object/Speakers/Voices/Micro2.js";
import EnceinteCailloux from "../World/Object/Speakers/Drums/EnceinteCailloux.js";

// ======================== SPEAKER AS ==============================
// ======================== SPEAKER FLAT ==============================
import SpeakerPlatBlue from "../World/Object/Speakers/SpeakerAs/SpeakerPlat/SpeakerPlatBlue.js";
import SpeakerPlatGreen from "../World/Object/Speakers/SpeakerAs/SpeakerPlat/SpeakerPlatGreen.js";
import SpeakerPlatPurple from "../World/Object/Speakers/SpeakerAs/SpeakerPlat/SpeakerPlatPurple.js";
import SpeakerPlatRed from "../World/Object/Speakers/SpeakerAs/SpeakerPlat/SpeakerPlatRed.js";
// ======================== SPEAKER TALL ==============================
import SpeakerTallBlue from "../World/Object/Speakers/SpeakerAs/SpeakerTall/SpeakerTallBlue.js";
import SpeakerTallGreen from "../World/Object/Speakers/SpeakerAs/SpeakerTall/SpeakerTallGreen.js";
import SpeakerTallPurple from "../World/Object/Speakers/SpeakerAs/SpeakerTall/SpeakerTallPurple.js";
import SpeakerTallRed from "../World/Object/Speakers/SpeakerAs/SpeakerTall/SpeakerTallRed.js";
// ======================== SPEAKER RECT ==============================
import SpeakerRectBlue from "../World/Object/Speakers/SpeakerAs/SpeakerRect/SpeakerRectBlue.js";
import SpeakerRectGreen from "../World/Object/Speakers/SpeakerAs/SpeakerRect/SpeakerRectGreen.js";
import SpeakerRectPurple from "../World/Object/Speakers/SpeakerAs/SpeakerRect/SpeakerRectPurple.js";
import SpeakerRectRed from "../World/Object/Speakers/SpeakerAs/SpeakerRect/SpeakerRectRed.js";
// ======================== SPEAKER DRUM KICK ==============================
import DrumKickBlue from "../World/Object/Speakers/SpeakerAs/DrumKick/DrumKickBlue.js";
import DrumKickPurple from "../World/Object/Speakers/SpeakerAs/DrumKick/DrumKickPurple.js";
import DrumKick from "../World/Object/Speakers/SpeakerAs/DrumKick/DrumKick.js";
import DrumKickGreen from "../World/Object/Speakers/SpeakerAs/DrumKick/DrumKickGreen.js";

import gsap from "gsap";

// creer tout les elements necessaires

export default class SelectAndLaunch extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.camera = this.experience.camera; // movement de la caméra
    this.soundManager = this.experience.soundManager;

    this.debug = this.experience.debug;
    this.connection = this.experience.connection;
    this.gameTimer = this.experience.gameTimer;

    this.items = {};
    this.stars = {};

    this.gameDuration = 30;
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

    // ========================= SPEAKER HITBOXES ======================
    // ========================= SPEAKER AS ========================
    // ========================= SPEAKER PLAT ==================
    this.speakerPlatBlue = new SpeakerPlatBlue();
    this.speakerPlatGreen = new SpeakerPlatGreen();
    this.speakerPlatPurple = new SpeakerPlatPurple();
    this.speakerPlatRed = new SpeakerPlatRed();

    // ========================= SPEAKER TALL ==================
    this.speakerTallBlue = new SpeakerTallBlue();
    this.speakerTallGreen = new SpeakerTallGreen();
    this.speakerTallPurple = new SpeakerTallPurple();
    this.speakerTallRed = new SpeakerTallRed();

    // ========================= SPEAKER RECT ==================
    this.speakerRectBlue = new SpeakerRectBlue();
    this.speakerRectGreen = new SpeakerRectGreen();
    this.speakerRectPurple = new SpeakerRectPurple();
    this.speakerRectRed = new SpeakerRectRed();

    // ========================= SPEAKER DRUM KICK ==================
    this.drumKickBlue = new DrumKickBlue();
    this.drumKickGreen = new DrumKickGreen();
    this.drumKickPurple = new DrumKickPurple();
    this.drumKick = new DrumKick();

    // ========================= LIGHTS ================================
    this.spotLight = new SpotLightHitbox();
    this.movingSpotLight = new MovingSpotLightHitbox();
    this.laser = new Laser();

    // ========================= STAR ================================
    this.rockStar = new RockStar();
    this.girlStar = new GirlStar();
    this.daftStar = new DaftStar();

    // ========================= SPEAKER ================================
    this.drums1 = new Drums1();
    this.bloc = new Bloc();
    this.phone = new Phone();
    this.synthCool = new SynthCool();
    this.speakerMic1 = new SpeakerMic1();
    this.speakerMic2 = new SpeakerMic2();
    this.machineALaver = new MachineALaver();
    this.enceinteCailloux = new EnceinteCailloux();

    // ========================= RANDOM ================================
    this.cadrePhoto = new CadrePhoto();
    this.plante = new Plante();
    this.tiroir = new Tiroir();
    this.boisson = new Boisson();

    // this.synth1 = new Synth1();
    // this.synth2 = new Synth2();
    // this.synth3 = new Synth3();
    // this.sofa = new Sofa();

    // on ajoute l'instance de la calsse au tableau d'update dans world
    this.experience.world.registerStarInstance(this.rockStar);
    this.experience.world.registerStarInstance(this.girlStar);
    this.experience.world.registerStarInstance(this.daftStar);

    this.intern = new Intern();

    objectsTypes.push(
      // SPEAKER TALL
      // this.speakerTallRed,
      // this.speakerTallBlue,
      // this.speakerTallGreen,
      // this.speakerTallPurple,
      // // SPEAKER RECT
      // this.speakerRectRed,
      // this.speakerRectBlue,
      // this.speakerRectGreen,
      // this.speakerRectPurple,
      // // SPEAKER DRUM KICK
      this.drumKick,
      this.drumKickBlue,
      this.drumKickGreen,
      this.drumKickPurple,
      // LIGHTS
      this.spotLight,
      this.movingSpotLight,
      this.laser,
      // SPEAKER
      this.enceinteCailloux,
      // this.synth1,
      // this.synth2,
      // this.synth3,
      this.synthCool,
      this.drums1,
      this.speakerMic1,
      this.speakerMic2,
      this.machineALaver,
      this.bloc,
      this.phone,
      this.plante,
      this.cadrePhoto,
      // this.sofa,
      this.tiroir,
      this.boisson,
      this.speakerPlatBlue,
      this.speakerPlatGreen,
      this.speakerPlatPurple,
      this.speakerPlatRed,
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
    // this.selectObject.selectPhase = true;

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
          this.selectObject.objectToLaunch.name;
        // console.log(
        //   "Selected Star for Outro:",
        //   this.selectObject.objectToLaunch.name,
        // );
      }

      this.throwObject.createSelectedObject();

      // informe que l'on est en phase de lancer
      this.throwObject.throwPhase = true;
      // on crée le debug de lancé
      this.throwObject.createDebug();
    });

    this.throwObject.on("objectThrown", () => {
      this.experience.world.controlManager.currentScene = "objectThrown";

      if (this.isStarPhase) {
        // on sauvegarde l'instance de la star lancée
        this.experience.world.thrownStarInstance = this.throwObject.result;
      }

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

    this.soundManager.soundLibrary.ambiance.stressante.play();
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
    this.soundManager.soundLibrary.ambiance.stressante.stop();
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
