import EventEmitter from "../Utils/EventEmitter";
import Experience from "../Experience";
import { gsap } from "gsap";
import * as THREE from "three";

export default class ShowExperience extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.camera = this.experience.camera;
    this.environement = this.experience.world.environement;
    this.debug = this.experience.debug;
    this.soundManager = this.experience.soundManager;
    this.connection = this.experience.connection;
  }

  start() {
    console.log("Show Experience start from ShowExperience");
    this.createDebug();

    // on crée l'overlay noir qui va permettre le fade in et out
    this.createOverlay();

    const timeline = gsap.timeline();

    timeline
      .to({}, { duration: 3 }) // Pause 3 secondes apres avoir jetté la star
      .to(
        // fade out des lumières
        {},
        {
          duration: 2,
          onComplete: () => {
            this.fadeLights(
              3, // duration
              5, // fromValue
              0 // toValue
            );
          },
        }
      )
      // .to({}, { duration: 3 }) // Pause 3 secondes
      .to(
        // fade in de l'overlay
        this.overlay,
        {
          duration: 2,
          opacity: 1,
          ease: "power2.inOut",
        },
        "-=2"
      )
      .to(
        // Play music
        {},
        {
          duration: 1,

          onComplete: () => {
            this.soundManager.playSelectedMusics(true);
          },
        }
      )
      .to(
        // Pause sombre avec musique
        {},
        {
          duration: 1,
          onComplete: () => {
            this.cameraMovements(); // lancer les mouvements de caméra
          },
        }
      )
      .to(
        // Fade out de l'overlay
        this.overlay,
        {
          duration: 2,
          opacity: 0,
          ease: "power2.inOut",
        }
      ) // Fade in des lumières
      .to(
        {},
        {
          duration: 0,
          onComplete: () => {
            this.fadeLights(
              3, // duration
              0, // fromValue
              5 // toValue
            );
          },
        }
      );
  }

  end() {
    this.soundManager.stopSelectedMusics();
    this.soundManager.selectedObjectsMusic = {};
    this.cameraTimeline.kill();

    console.log("Show Experience end called - from ShowExperience");
    this.trigger("showExperienceEnd");
    this.destroyDebug();
  }

  cameraMovements() {
    this.cameraTimeline = gsap.timeline();

    const center = new THREE.Vector3(0, 5, 0);
    const radius = 15;

    const params = { angle: 0 };

    this.cameraTimeline
      .to(params, {
        angle: Math.PI * 2, // tour complet
        duration: 12,
        ease: "none",
        onUpdate: () => {
          this.camera.instance.position.x =
            center.x + Math.cos(params.angle) * radius;
          this.camera.instance.position.z =
            center.z + Math.sin(params.angle) * radius;
          this.camera.instance.position.y =
            5 + Math.sin(params.angle * 0.5) * 2; // petit mouvement vertical

          this.camera.instance.lookAt(center);
          this.camera.controls.update();
        },
        onComplete: () => {
          // this.end();
          console.log("First loop finished");
        },
      })
      .fromTo(
        this.camera.instance.position,
        {
          x: 1.3,
          y: 0.25,
          z: 5.5,
        },
        {
          x: 4.5,
          y: 0.78,
          z: 21,
          duration: 4,
          ease: "power2.inOut",
          onUpdate: () => {
            this.camera.controls.update();
          },
          onComplete: () => {
            console.log("finish camera animations");
          },
        }

        // "-=4"
      );

    this.cameraTimeline.repeat(-1);
  }

  fadeLights(duration = 3, fromValue = 1, toValue = 0) {
    console.log("sunlight intensity", this.environement.sunLight.intensity);
    // const initialSunLightIntensity = this.environement.sunLight.intensity;
    // const initialEnvMapIntensity = this.environement.environmentMap.intensity;

    // Fade SunLight

    gsap.fromTo(
      this.environement.sunLight,
      { intensity: fromValue },
      {
        intensity: toValue,
        duration: duration,
        onUpdate: () => {
          this.environement.environmentMap.updateMaterials();
        },
        // onComplete: () => {
        //   this.trigger("fadeLightsComplete");
        // },
      }
    );

    gsap.fromTo(
      this.environement.environmentMap,
      { intensity: fromValue },
      {
        intensity: toValue,
        duration: duration,
        onUpdate: () => {
          this.environement.environmentMap.updateMaterials();
        },
      }
    );
  }

  createOverlay() {
    this.overlay = document.createElement("div");
    this.overlay.style.position = "fixed";
    this.overlay.style.top = "0";
    this.overlay.style.left = "0";
    this.overlay.style.width = "100%";
    this.overlay.style.height = "100%";
    this.overlay.style.backgroundColor = "black";
    this.overlay.style.opacity = "0";
    this.overlay.style.zIndex = "9999";
    this.overlay.style.pointerEvents = "none";
    document.body.appendChild(this.overlay);
  }

  fadeOverlay(type = "in", duration = 5) {
    // Animation progressive de l'overlay

    gsap.to(this.overlay, {
      opacity: type === "in" ? 1 : 0,
      duration: duration,
      // ease: "power2.inOut",
    });
  }

  createDebug() {
    if (this.experience.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("ShowExperience");

      const debugObject = {
        pass: () => {
          this.end();
        },
      };
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
