import * as THREE from "three";
import Physics from "../Utils/Physics.js";
import Experience from "../Experience.js";
import EventEmitter from "../Utils/EventEmitter.js";
import { gsap } from "gsap";

export default class ThrowObject extends EventEmitter {
  constructor(slingshot) {
    super();
    this.experience = new Experience();
    this.time = this.experience.time;
    this.mobileData = this.experience.mobileData;
    this.debug = this.experience.debug;
    this.physics = new Physics();
    this.objectsToAnimate = this.experience.animate.objectsToAnimate;
    this.soundManager = this.experience.soundManager;

    this.slingshot = slingshot;

    this.items = [];
    this.itemNames = [];
    this.objectsTypes = [];

    // this.setupAvailableObjects();

    this.selectedObject = this.itemNames[0];
    this.power = 1;
    this.angleX = 0;
    this.angleY = 0;
    this.objectToThrow = null;
    this.isObjectThrown = false;

    // boolean pour controler la reception de la data du mobile pour le lancer
    // si on est en phase de lancer, alors on ecoute les messages de lancer du mobile
    this.throwPhase = false;

    // ecoute l'événement de relachement du doigt pour lancer l'objet
    this.mobileData.on("throwRelease", (payload) => {
      if (!this.throwPhase) return;

      this.throwObject(payload);
      this.isObjectThrown = true;

      this.trigger("objectThrown");
    });
  }

  followCamera(result, z, y) {
    const speed = 10; // Vitesse de suivi de la camera
    const distanceZ = z;
    const offsetY = y;

    result.followCam = (time) => {
      if (this.throwPhase) {
        const deltaTime = time.delta * 0.001;

        const camera = this.experience.camera.instance; // recupere la camera

        const offsetVector = new THREE.Vector3(0, offsetY, -distanceZ); // position de l'objet par rapport à la caméra
        offsetVector.applyQuaternion(camera.quaternion); // applique la rotation de la camera au vecteur
        const target = camera.position.clone().add(offsetVector); // cible = pos camera + vecteur

        // appliquer le mouvement (avec lerp)
        result.model.position.x +=
          (target.x - result.model.position.x) * deltaTime * speed;
        result.model.position.y +=
          (target.y - result.model.position.y) * deltaTime * speed;
        result.model.position.z +=
          (target.z - result.model.position.z) * deltaTime * speed;
      } else {
        const index = this.objectsToAnimate.indexOf(result);
        if (index !== -1) {
          this.objectsToAnimate.splice(index, 1);
        }
      }
    };
  }

  createSelectedObject() {
    this.isObjectThrown = false;

    // object to throw
    this.result = this.objectToThrow.create();
    this.result.model.position.set(0, 15, 35);
    this.experience.scene.add(this.result.model);
    this.followCamera(this.result, 12, -4);
    this.objectsToAnimate.push(this.result);

    // slingshot
    this.slingshotResult = this.slingshot.create();
    this.slingshotResult.model.position.set(0, -10, 75);
    this.experience.scene.add(this.slingshotResult.model);
    this.followCamera(this.slingshotResult, 20, -6);
    this.objectsToAnimate.push(this.slingshotResult);
  }

  throwObject(payload) {
    const strength = payload.strength;
    const angleX = payload.angleH;
    const angleY = payload.angleV;

    // const result = this.objectToThrow.create();

    // this.experience.scene.add(result.model);
    this.physics.world.addBody(this.result.body);

    const speed = strength * 0.5;
    this.result.body.velocity.set(angleX, angleY, -speed);

    this.physics.objectsToUpdate.push({
      mesh: this.result.model,
      body: this.result.body,
    });
  }

  addToWorld() {
    // const result = this.objectToThrow.create();

    // this.experience.scene.add(result.model);
    this.physics.world.addBody(this.result.body);

    const speed = 2 * this.power;
    this.result.body.velocity.set(this.angleX, this.angleY, -speed);

    this.physics.objectsToUpdate.push({
      mesh: this.result.model,
      body: this.result.body,
    });
  }

  createDebug() {
    if (this.experience.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("ThrowObject");

      // choix de l'angle de lancé
      this.debugFolder.add(this, "angleX", -10, 10, 1).name("angleX");
      this.debugFolder.add(this, "angleY", -10, 10, 1).name("angleY");
      // choix de la puissance du lancé
      this.debugFolder.add(this, "power", 0.1, 10, 0.1).name("power");
      // add function to launch the object
      const debugObject = {
        throw: () => {
          this.addToWorld(this.angleX, this.angleY, this.power);
          // this.soundManager.soundLibrary.fx.throw.volume = 0.5;
          this.soundManager.soundLibrary.fx.throw.play();
          this.isObjectThrown = true;
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

  destroyObject() {
    console.log("DESTROY OBJECT : " + this.isObjectThrown);
    if ((this.result == undefined) | null) return;
    if (!this.isObjectThrown && this.result.model) {
      gsap.to(this.result.model.position, {
        y: -5,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          this.experience.scene.remove(this.result.model);
        },
      });
    }
  }

  destroySlingshot() {
    if ((this.result == undefined) | null) return;
    if (this.slingshotResult.model) {
      gsap.to(this.slingshotResult.model.position, {
        y: -5,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          this.experience.scene.remove(this.slingshotResult.model);
        },
      });
    }
  }
}
