import * as THREE from "three";
import Experience from "../Experience.js";
import Physics from "../Utils/Physics.js";
import * as CANNON from "cannon-es";
import { threeToCannon, ShapeType } from "three-to-cannon";
import SoundManager from "../Utils/SoundManager.js";
import { cloneSkinnedModel } from "./cloneSkinnedModel.js";

// PERMET DE CREER UN OBJET 3D AVEC HITBOX PHYSIQUE
// prend en parametre modele glb
// default position, scale, rotation, mass, default material

export default class MeshHitBox {
  constructor(
    scale,
    rotation,
    resources,
    mass,
    material,
    hitBoxType,
    name,
    impactSound,
    animated,
    music
  ) {
    //setupt the experience
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;

    // setupt the sound manager
    this.soundManager = new SoundManager();
    // this.soundManager = this.experience.soundManager;
    // console.log("Selected sound for hitbox:", impactSound);
    this.soundManager.impactSound = impactSound;
    this.soundManager.playSound = music;

    // setupt the physicWorld
    this.physics = new Physics();
    this.world = this.physics.world;
    this.objectsToUpdate = this.physics.objectsToUpdate;

    // setUp local parameters
    this.resources = resources;
    // this.positions = positions;
    // cette position est la position de depart des objets lancés
    this.positions = { x: 0, y: 20, z: 30 };
    this.scale = scale;
    this.rotation = rotation;
    this.mass = mass;
    this.material = material;
    this.name = name;
    this.hitBoxType = hitBoxType;
    this.addShadow = true;
    this.animated = animated;

    // this.createDebug();

    this.setModel();
    if (this.addShadow) {
      this.model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
        }
      });
    }
    this.createComplexHitBox();
  }

  playMusic() {
    if (this.soundManager.playSound) {
      this.soundManager.playMusic();
    } else return;
  }

  setModel() {
    if (this.animated) {
      console.log("Cloning skinned model for:", this.name);
      this.model = cloneSkinnedModel(this.resources.scene);
      // this.model = this.resources.scene;
    } else {
      this.model = this.resources.scene.clone();
    }
    this.model.scale.set(this.scale.x, this.scale.y, this.scale.z);
    this.model.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    this.model.position.set(
      this.positions.x,
      this.positions.y,
      this.positions.z
    );
    // this.model.updateMatrixWorld(true);
  }

  createHitBox() {
    // create a box hitbox around the model with native function
    const box = new THREE.Box3().setFromObject(this.model);
    const size = new THREE.Vector3();
    box.getSize(size);
    console.log("Hitbox size:", size);

    const shape = new CANNON.Box(
      new CANNON.Vec3(size.x / 2, size.y / 2, size.z / 2)
    );

    this.body = new CANNON.Body({ mass: this.mass });
    this.body.addShape(shape);

    const center = new THREE.Vector3();
    box.getCenter(center);
    this.body.position.set(center.x, center.y, center.z);
    this.body.addEventListener("collide", this.soundManager.playHitSound);
  }

  createComplexHitBox() {
    let result = null;
    if (this.hitBoxType === "cylinder") {
      result = threeToCannon(this.model, { type: ShapeType.CYLINDER });
    } else if (this.hitBoxType === "sphere") {
      result = threeToCannon(this.model, { type: ShapeType.SPHERE });
    } else if (this.hitBoxType === "hull") {
      result = threeToCannon(this.model, { type: ShapeType.HULL });
    } else {
      result = threeToCannon(this.model, { type: ShapeType.BOX });
    }

    this.body = new CANNON.Body({ mass: this.mass, material: this.material });
    this.body.addShape(result.shape);
    this.body.position.copy(this.model.position);
    this.body.quaternion.copy(this.model.quaternion);
    this.body.addEventListener("collide", this.soundManager.playHitSound);
  }

  createDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder(this.name);
      this.debugFolder
        .add(this.rotation, "y", -Math.PI, Math.PI, 0.01)
        .name("rotY");
      this.debugFolder.add(this.positions, "x", -10, 10, 0.1).name("posX");
      this.debugFolder.add(this.positions, "y", -10, 10, 0.1).name("posY");
      this.debugFolder.add(this.positions, "z", -10, 10, 0.1).name("posZ");
    }
  }

  update() {
    // Update c'est uniquement pour mettre a jour les elements dans le debug UI
    // update the model position and rotation to match the physics body
    if (this.activetePhysics) {
      this.model.position.copy(this.body.position);
      this.model.quaternion.copy(this.body.quaternion);
    } else {
      this.model.position.set(
        this.positions.x,
        this.positions.y,
        this.positions.z
      );
      this.model.rotation.set(
        this.rotation.x,
        this.rotation.y,
        this.rotation.z
      );
    }
  }
}
