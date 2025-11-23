import * as THREE from "three";
import Experience from "../../experience/experience.js";
import Physics from "../Utils/Physics.js";
import * as CANNON from "cannon-es";

export default class Ground {
  constructor(position, rotation) {
    this.experience = new Experience();
    this.physics = new Physics();
    this.world = this.physics.world;
    this.defaultMaterial = this.physics.defaultMaterial;
    console.log("Ground initialized");
    this.scene = this.experience.scene;

    this.position = position;
    this.rotation = rotation;
    console.log("Ground position:", this.position);
    console.log("Ground rotation:", this.rotation);

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
    this.setPhysics();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(15, 15);
  }
  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      color: "#777777",
      metalness: 0.3,
      roughness: 0.4,
      // envMap: environmentMapTexture,
      // envMapIntensity: 0.5,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    // this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    this.mesh.position.copy(this.position);
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }

  setPhysics() {
    console.log("Setting up Ground physics");
    const floorShape = new CANNON.Plane();
    const floorBody = new CANNON.Body();
    floorBody.material = this.defaultMaterial;

    floorBody.mass = 0;
    floorBody.addShape(floorShape);
    floorBody.position.copy(this.position);
    // floorBody.quaternion.setFromAxisAngle(
    //   new CANNON.Vec3(-1, 0, 0),
    //   Math.PI * 0.5
    // );

    floorBody.quaternion.setFromEuler(
      this.rotation.x,
      this.rotation.y,
      this.rotation.z,
      "XYZ"
    );

    this.world.addBody(floorBody);
  }
}
