import EventEmitter from "../Utils/EventEmitter";
import Experience from "../Experience";
import Physics from "../Utils/Physics";
import { gsap } from "gsap";
import * as THREE from "three";
import ConeLumiere from "../World/LightBlender/ConeLumiere";

export default class ShowExperience extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.world = this.experience.world;
    this.physics = new Physics();
    this.camera = this.experience.camera; // movement de la caméra
    this.pictureManager = this.experience.pictureManager;
    this.environement = this.experience.world.environement;
    this.debug = this.experience.debug;
    this.soundManager = this.experience.soundManager;
    this.connection = this.experience.connection;
    this.mobileData = this.experience.mobileData;
    this.publicManager = this.experience.world.publicManager;
    this.soundManager = this.experience.soundManager;

    // on ecoute le skip du mobile
    this.mobileData.on("skipShow", () => {
      if (this.pictureManager.numberOfPictures == 3) {
        this.end();
      }
    });
  }

  start() {
    console.log("Show Experience start from ShowExperience");

    this.showDiv = document.querySelector(
      ".show-screen",
    );
    gsap.to(this.showDiv, {
      duration: 1,
      opacity: 1,
      ease: "power3.out",
    })

    const star = this.world.thrownStarInstance;

    // this.soundManager.playSelectedMusics();
    this.publicManager.publicCount = 0;
    this.createDebug();

    // on crée l'overlay noir qui va permettre le fade in et out
    // this.createOverlay();
    this.overlay = document.querySelector(".black-overlay");
    this.overlay.style.opacity = 0;

    // timeline pour gérer l'enchainement des animations
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
              0, // toValue
            );
          },
        },
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
        "-=2",
      )
      .to(
        // Play music
        {},
        {
          duration: 1,

          onComplete: () => {
            this.soundManager.playSelectedMusics(true);
            this.publicManager.publicCreationLoop();
          },
        },
      )
      .to(
        // Pause sombre avec musique
        {},
        {
          duration: 1,
          onComplete: () => {
            this.cameraMovements(); // lancer les mouvements de caméra
          },
        },
      )
      .to(
        // Fade out de l'overlay
        this.overlay,
        {
          duration: 2,
          opacity: 0,
          ease: "power2.inOut",
          onComplete: () => {
            this.getStarUp(star);
          },
        },
      ) // Fade in des lumières
      .to(
        {},
        {
          duration: 0,
          onComplete: () => {
            this.fadeLights(
              3, // duration
              0, // fromValue
              5, // toValue
            );
            this.lightUpSpotlights();
          },
        },
      );

    const blenderLightTimeline = gsap.timeline();

    blenderLightTimeline
      .to(
        {},
        {
          duration: 8.5,
          onComplete: () => {
            this.soundManager.soundLibrary.fx.spotlightSound.play();
            const coneLumiere = new ConeLumiere(
              { x: -16, y: -1, z: -46.5 },
              false,
            );
          },
        },
      )
      .to(
        {},
        {
          duration: 0.3,
          onComplete: () => {
            this.soundManager.soundLibrary.fx.spotlightSound.play();
            const coneLumiere = new ConeLumiere(
              { x: 17, y: -2, z: -46 },
              false,
            );
          },
        },
      )
      .to(
        {},
        {
          duration: 0.3,
          onComplete: () => {
            this.soundManager.soundLibrary.fx.spotlightSound.play();
            const coneLumiere = new ConeLumiere(
              { x: 19, y: -2, z: -56 },
              false,
            );
          },
        },
      )
      .to(
        {},
        {
          duration: 0.5,
          onComplete: () => {
            this.soundManager.soundLibrary.fx.spotlightSound.play();
            const coneLumiere = new ConeLumiere(
              { x: -17, y: -1, z: -56 },
              false,
            );
          },
        },
      );
  }

  end() {

    gsap.to(this.showDiv,{
      duration: 1,
      opacity: 0,
      ease: "power3.in",
      onComplete: () => {
        this.showDiv.style.display = "none";
        this.showDiv.remove();
      },
    });

    this.soundManager.stopSelectedMusics();
    this.soundManager.selectedObjectsMusic = {};
    this.cameraTimeline.kill();

    console.log("Show Experience end called - from ShowExperience");
    this.trigger("showExperienceEnd");
    this.publicManager.endCreationLoop();
    this.destroyDebug();
  }

  cameraMovements() {
    this.cameraTimeline = gsap.timeline();

    const center = new THREE.Vector3(0, 10, -50);
    const radius = 40;
    const params = { angle: Math.PI * 2 };
    const params2 = { angle: 0 };

    // Pour la dernière animation
    const params3 = { angle: -Math.PI * 0.25 };
    const cirleCenter = new THREE.Vector3(0, 0, 0);
    const a = 30; // rayon horizontal
    const b = 10; // hauteur fixe

    this.cameraTimeline
      .to(params, {
        angle: 0, // tour complet
        duration: 12,
        ease: "none",
        onUpdate: () => {
          this.camera.instance.position.x =
            center.x + Math.cos(params.angle) * radius;
          this.camera.instance.position.z =
            center.z + Math.sin(params.angle) * radius;
          this.camera.instance.position.y =
            40 + Math.sin(params.angle * 0.5) * 2; // petit mouvement vertical

          this.camera.instance.lookAt(center);
          this.camera.controls.update();
        },
        onComplete: () => {
          // this.end();
          console.log("First loop finished");
          if (this.pictureManager.numberOfPictures < 3) {
            this.pictureManager.takePicture();
            console.log("picture taken", this.pictureManager.pictures);
          }
        },
      })
      .fromTo(
        this.camera.instance.position,
        {
          x: 1.3,
          y: 0.25,
          z: -20,
        },
        {
          x: 4.5,
          y: 10,
          z: 21,
          duration: 4,
          ease: "power2.inOut",
          onUpdate: () => {
            this.camera.controls.update();
          },
          onComplete: () => {
            console.log("finish camera animations");
            if (this.pictureManager.numberOfPictures < 3) {
              this.pictureManager.takePicture();
              console.log("picture taken", this.pictureManager.pictures);
            }
          },
        },

        // "-=4"
      )
      .fromTo(
        params2,
        // faire un tour complet autour de la scène
        { angle: 0 },
        {
          angle: -Math.PI * (2 / 3),
          duration: 4,
          ease: "none",
          onUpdate: () => {
            // Calcul position circulaire autour du centre
            this.camera.instance.position.x =
              center.x + Math.cos(params2.angle) * radius;
            this.camera.instance.position.z =
              center.z + Math.sin(params2.angle) * radius;

            // Descente progressive : y de 15 à 5 par exemple
            this.camera.instance.position.y =
              40 - Math.sin(params2.angle * 0.5) * 10;

            this.camera.instance.lookAt(center);
            this.camera.controls.target.copy(center);
            this.camera.controls.update();
          },

          onComplete: () => {
            // this.end();
            console.log("third loop finished");
            if (this.pictureManager.numberOfPictures < 3) {
              this.pictureManager.takePicture();
              console.log("picture taken", this.pictureManager.pictures);
            }
          },
        },
      )
      .to(params3, {
        angle: Math.PI * 0.75,
        duration: 8,
        ease: "power2.inOut",
        onUpdate: () => {
          this.camera.instance.position.set(
            Math.cos(params3.angle) * a,
            b,
            Math.sin(params3.angle) * a,
          );

          this.camera.controls.target.copy(center);
          this.camera.controls.update();
        },
      });

    this.cameraTimeline.repeat(-1);
  }

  fadeLights(duration = 3, fromValue = 1, toValue = 0) {
    // console.log("sunlight intensity", this.environement.sunLight.intensity);
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
      },
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
      },
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

  lightUpSpotlights() {
    const spotlights = this.experience.world.spotlights;
    for (const spot of spotlights) {
      spot.lightBeam.show();
    }
  }

  getStarUp(star) {
    if (star) {
      // retirer la star des objets animés
      const animateItems = this.experience.animate.objectsToAnimate;
      const index = animateItems.indexOf(star);
      if (index !== -1) {
        animateItems.splice(index, 1);
      }

      // désactivation de la physique
      if (star.body) {
        star.model.position.copy(star.body.position);
        star.model.quaternion.copy(star.body.quaternion);

        this.physics.world.removeBody(star.body);
        this.physics.objectsToUpdate = this.physics.objectsToUpdate.filter(
          (obj) => obj.body !== star.body,
        );
      }

      // vecteurs et distances
      const targetPos = new THREE.Vector3(0, 3, -53);
      const startPos = star.model.position.clone();
      // direction
      const direction = new THREE.Vector3()
        .subVectors(targetPos, startPos)
        .normalize();
      const totalDistance = startPos.distanceTo(targetPos);

      // params saut
      const jumpZoneRadius = 18;
      const jumpLength = 5;
      const jumpHeight = 3;
      const walkSpeed = 10;
      const pauseDuration = 0.5;

      // si deja sur le podium on marche juste
      if (totalDistance < jumpZoneRadius) {
        this.simpleWalkToTarget(star, targetPos, totalDistance, walkSpeed);
        return;
      }
      // depart du saut
      const jumpStartPos = targetPos
        .clone()
        .add(direction.clone().multiplyScalar(-jumpZoneRadius));
      //
      const jumpEndPos = jumpStartPos
        .clone()
        .add(direction.clone().multiplyScalar(jumpLength));

      const distToJump = startPos.distanceTo(jumpStartPos);
      const durationWalk1 = distToJump / walkSpeed;
      const durationJump = 0.5;
      const distAfterJump = jumpEndPos.distanceTo(targetPos);
      const durationWalk2 = distAfterJump / walkSpeed;

      const angleToTarget =
        Math.atan2(targetPos.x - startPos.x, targetPos.z - startPos.z) +
        Math.PI;

      // timeline
      const timeline = gsap.timeline();

      // rotation
      timeline.to(star.model.rotation, {
        x: 0,
        y: angleToTarget,
        z: 0,
        duration: 1.2,
        ease: "power2.inOut",
      });

      // marche jusqu'au podium
      timeline.to(star.model.position, {
        x: jumpStartPos.x,
        y: jumpStartPos.y,
        z: jumpStartPos.z,
        duration: durationWalk1,
        ease: "none",
        onStart: () => star.animationState.play("walk"),
      });

      // pause avant le saut
      timeline.call(() => star.animationState.play("stand")); // On joue l'animation stand
      timeline.to({}, { duration: pauseDuration });

      // saut
      timeline.add("jumpStart");
      // timeline.call(() => star.animationState.play("jump"), null, "jumpStart");

      // déplacement horizontal pendant le ssaut
      timeline.to(
        star.model.position,
        {
          x: jumpEndPos.x,
          z: jumpEndPos.z,
          duration: durationJump,
          ease: "none",
        },
        "jumpStart",
      );

      // déplacement vertical en montée
      timeline.to(
        star.model.position,
        {
          y: jumpStartPos.y + jumpHeight,
          duration: durationJump * 0.5,
          ease: "power1.out",
        },
        "jumpStart",
      );

      // déplacement vertical en descente
      timeline.to(
        star.model.position,
        {
          y: targetPos.y,
          duration: durationJump * 0.5,
          ease: "power1.in",
        },
        `jumpStart+=${durationJump * 0.5}`,
      );

      // reprise de la marche
      timeline.to(star.model.position, {
        x: targetPos.x,
        y: targetPos.y,
        z: targetPos.z,
        duration: durationWalk2,
        ease: "none",
        onStart: () => {
          star.animationState.play("walk");
        },
      });

      // rotation finale vers le public
      timeline.to(star.model.rotation, {
        y: Math.PI,
        duration: 0.8,
        ease: "power2.inOut",
      });

      // lancer la danse
      timeline.add(() => {
        if (star.animationState) {
          star.animationState.play("dance");
        }
      });
    }
  }

  simpleWalkToTarget(star, targetPos, distance, speed) {
    const timeline = gsap.timeline();
    const angle =
      Math.atan2(
        targetPos.x - star.model.position.x,
        targetPos.z - star.model.position.z,
      ) + Math.PI;

    timeline.to(star.model.rotation, { y: angle, x: 0, z: 0, duration: 1 });
    timeline.to(star.model.position, {
      x: targetPos.x,
      y: targetPos.y,
      z: targetPos.z,
      duration: distance / speed,
      ease: "none",
      onStart: () => star.animationState.play("walk"),
    });
    timeline.to(star.model.rotation, { y: Math.PI, duration: 0.5 });
    timeline.add(() => star.animationState.play("dance"));
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
