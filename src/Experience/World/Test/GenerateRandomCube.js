import * as THREE from "three";
import * as CANNON from "cannon-es";
import Physics from "../../Utils/Physics";
import Experience from "../../Experience";
import SoundManager from "../../Utils/SoundManager";

export default class GenerateRandomCube {
  constructor() {
    console.log("GenerateRandomCube initialized");

    // setup scene
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;
    // setup physics
    this.physics = new Physics();
    this.world = this.physics.world;
    this.defaultMaterial = this.physics.defaultMaterial;
    this.objectsToUpdate = this.physics.objectsToUpdate;

    // setup sound
    this.soundManager = new SoundManager();
    this.soundManager.selectedSound = this.soundManager.hitSound;

    // create box geometry and material
    this.boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    this.boxMaterial = new THREE.MeshStandardMaterial({
      metalness: 0.3,
      roughness: 0.4,
    });

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("cube Generator");

      const debugObject = {
        createCube: () => {
          this.createBox(
            Math.random() * 2,
            Math.random() * 2,
            Math.random() * 2,
            {
              x: (Math.random() - 0.5) * 15,
              y: 10,
              z: (Math.random() - 0.5) * 15,
            }
          );
        },
      };
      this.debugFolder.add(debugObject, "createCube");
    }
  }

  createBox(width, height, depth, position) {
    const mesh = new THREE.Mesh(this.boxGeometry, this.boxMaterial);
    mesh.scale.set(width, height, depth);

    mesh.castShadow = true;
    mesh.position.copy(position);
    this.scene.add(mesh);

    const shape = new CANNON.Box(
      new CANNON.Vec3(width / 2, height / 2, depth / 2)
    );
    const body = new CANNON.Body({
      mass: 1,
      position: position,
      shape: shape,
      material: this.defaultMaterial,
    });
    body.position.copy(position);
    body.addEventListener("collide", this.soundManager.playHitSound);
    this.world.addBody(body);

    // Save in objects to update
    this.objectsToUpdate.push({
      mesh: mesh,
      body: body,
    });
  }
}
