import * as THREE from "three";
import Experience from "../../experience/experience.js";
import * as CANNON from "cannon-es";
import Physics from "../Utils/Physics.js";

export default class PhysicsBall {
  constructor() {
    this.experience = new Experience();
    this.physics = new Physics();

    this.debug = this.experience.debug;

    this.radius = 0.3;
    this.position = new THREE.Vector3(0, 3, 0);
    this.angleX = 0;
    this.angleY = 0;
    this.strength = 1;

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("PhysicsBall");
      this.debugFolder.add(this, "radius", 0.1, 2, 0.001).name("radius");
      this.debugFolder.add(this, "angleX", -10, 10, 1).name("angleX");
      this.debugFolder.add(this, "strength", 1, 2, 0.1).name("strength");
    }

    this.world = this.physics.world;
    this.defaultMaterial = this.physics.defaultMaterial;
    this.objectsToUpdate = this.physics.objectsToUpdate;
    console.log("PhysicsBall initialized");
    this.scene = this.experience.scene;

    this.createAction();
  }

  setUpGeometry() {
    this.geometry = new THREE.SphereGeometry(1, 32, 32);
  }

  setUpMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      color: "#ff0000",
      metalness: 0.3,
      roughness: 0.4,
    });
  }

  setMesh(radius, position) {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.scale.set(radius, radius, radius);
    this.mesh.position.copy(position);
    this.mesh.castShadow = true;

    this.scene.add(this.mesh);
  }

  setUpPhysics(radius, position) {
    this.shape = new CANNON.Sphere(radius);
    this.body = new CANNON.Body({
      mass: 1,
      position: position,
      shape: this.shape,
      material: this.defaultMaterial,
    });
    this.body.position.copy(position);
    // body.addEventListener("collide", playHitSound);

    this.body.applyLocalForce(
      new CANNON.Vec3(
        10 * this.angleX * this.strength,
        300 * this.strength,
        -300 * this.strength
      ),
      new CANNON.Vec3(0, 0, 0)
    );

    this.world.addBody(this.body);
    this.objectsToUpdate.push({
      mesh: this.mesh,
      body: this.body,
    });
  }

  createAction() {
    const debugObject = {
      createBall: () => {
        console.log("createPhysicsBall");
        // new PhysicsBall(, );
        this.setUpGeometry();
        this.setUpMaterial();
        this.setMesh(this.radius, this.position);
        this.setUpPhysics(this.radius, this.position);
      },
    };

    this.debugFolder.add(debugObject, "createBall");
  }
}
