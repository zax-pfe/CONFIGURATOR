import Physics from "../Utils/Physics.js";
import Experience from "../Experience.js";
import EventEmitter from "../Utils/EventEmitter.js";

export default class ThrowObject extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.time = this.experience.time;
    this.objectsToAnimate = this.experience.animate.objectsToAnimate;
    this.mobileData = this.experience.mobileData;
    this.debug = this.experience.debug;
    this.physics = new Physics();

    this.items = [];
    this.itemNames = [];
    this.objectsTypes = [];

    // this.setupAvailableObjects();

    this.selectedObject = this.itemNames[0];
    this.power = 1;
    this.angleX = 0;
    this.angleY = 0;
    this.objectToThrow = null;

    this.throwPhase = false;

    // ecoute l'événement de réception d'un message du mobile
    this.mobileData.on("throwRelease", (payload) => {
      if (!this.throwPhase) return;

      this.throwObject(payload);

      this.trigger("objectThrown");
    });
  }

  addToWorld() {
    // const result = this.objectToThrow.create();
    // setup l'animation de l'objet si souhaité
    // si l'objet est animé, l'ajouter à la liste des objets animés et le mettre à jour
    if (this.result.update) {
      this.objectToThrow.setAnimation(this.result);
      this.objectsToAnimate.push(this.result);
    }

    // this.experience.scene.add(result.model);
    this.physics.world.addBody(this.result.body);

    const speed = 2 * this.power;
    this.result.body.velocity.set(this.angleX, this.angleY, -speed);

    if (this.result.music) {
      this.experience.soundManager.startMusic(this.result.music);
    }

    this.physics.objectsToUpdate.push({
      mesh: this.result.model,
      body: this.result.body,
    });
  }

  setEntranceAnimation(result) {
    const radius = 2;
    const speed = 1;

    result.entrance = (time) => {
      const target = { x: 0, y: 5, z: 75 };
      if (this.throwPhase) {
        // const deltaTime = time.delta * 0.001;
        const deltaTime = time.delta * 0.002;

        const angleH = this.experience.mobileData.throwing.angleH;
        const angleV = this.experience.mobileData.throwing.angleV;

        result.model.position.x +=
          (target.x - result.model.position.x) * deltaTime * speed;
        result.model.position.y +=
          (target.y - result.model.position.y) * deltaTime * speed * 2;
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
    this.result = this.objectToThrow.create();
    this.result.model.position.set(0, 15, 35);
    this.experience.scene.add(this.result.model);
    this.setEntranceAnimation(this.result);
    this.objectsToAnimate.push(this.result);
  }

  throwObject(payload) {
    const strength = payload.strength;
    const angleX = payload.angleH;
    const angleY = payload.angleV;

    // const result = this.objectToThrow.create();
    // setup l'animation de l'objet si souhaité
    // si l'objet est animé, l'ajouter à la liste des objets animés et le mettre à jour
    if (this.result.update) {
      this.objectToThrow.setAnimation(this.result);
      this.objectsToAnimate.push(this.result);
    }

    // this.experience.scene.add(this.result.model);
    this.physics.world.addBody(this.result.body);

    const speed = strength * 0.5;
    this.result.body.velocity.set(angleX, angleY, -speed);

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

  update() {}
}
