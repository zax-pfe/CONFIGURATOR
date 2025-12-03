import Experience from "../../Experience";
import Physics from "../../Utils/Physics.js";
import * as CANNON from "cannon-es";

import * as THREE from "three";

export default class ScenePodium {
  constructor() {
    console.log("ScenePodium initialized");

    // setupt the experience
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;

    // setupt the physicWorld
    this.physics = new Physics();
    this.world = this.physics.world;
    this.defaultMaterial = this.physics.defaultMaterial;
    this.objectsToUpdate = this.physics.objectsToUpdate;

    //setUp local parameters
    this.scale = { x: 1, y: 1, z: 1 };
    this.rotation = { x: 0, y: 0, z: 0 };
    this.mass = 0;
    this.dimmensions = { radiusTop: 7, radiusBot: 7, height: 1.6 };
    this.positions = { x: 0, y: this.dimmensions.height / 2, z: 0 };
    this.name = "ScenePodium";

    // create the ground
    this.setGeometry();
    this.setMaterial();
    this.setMesh();
    this.setPhysics();
    this.createDebug();
  }

  setGeometry() {
    // this.geometry = new THREE.PlaneGeometry(
    //   this.dimmensions.width,
    //   this.dimmensions.height
    // );

    // radius top , radius bottom, height, radialSegments

    this.geometry = new THREE.CylinderGeometry(
      this.dimmensions.radiusTop,
      this.dimmensions.radiusBot,
      this.dimmensions.height,
      8
    );
  }
  threeToCannonTrimesh(geometry) {
    const vertices = geometry.attributes.position.array;
    const indices = [];

    for (let i = 0; i < vertices.length / 3; i++) {
      indices.push(i);
    }

    return new CANNON.Trimesh(vertices, indices);
  }
  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      color: "#fd0000",
      metalness: 0.3,
      roughness: 0.4,
      // side: THREE.DoubleSide,
      wireframe: true,
      // envMap: environmentMapTexture,
      // envMapIntensity: 0.5,
    });
  }
  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    this.mesh.position.set(
      this.positions.x,
      this.positions.y,
      this.positions.z
    );
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }

  setPhysics() {
    const shape = new CANNON.Cylinder(
      this.dimmensions.radiusTop,
      this.dimmensions.radiusBot,
      this.dimmensions.height,
      8
    );

    // const shape = this.threeToCannonTrimesh(this.geometry);

    this.body = new CANNON.Body();
    this.body.material = this.defaultMaterial;

    this.body.mass = 0;
    this.body.addShape(shape);
    this.body.position.copy(this.positions);

    this.body.quaternion.setFromEuler(
      this.rotation.x,
      this.rotation.y,
      this.rotation.z,
      "XYZ"
    );

    this.world.addBody(this.body);
  }

  createDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder(this.name);
      this.debugFolder
        .add(this.rotation, "y", -Math.PI, Math.PI, 0.01)
        .name("rotY");
      this.debugFolder
        .add(this.rotation, "x", -Math.PI, Math.PI, 0.01)
        .name("rotX");
      this.debugFolder
        .add(this.rotation, "z", -Math.PI, Math.PI, 0.01)
        .name("rotZ");
      this.debugFolder
        .add(this.dimmensions, "radiusTop", 1, 15, 0.1)
        .name("radiusTop");
      this.debugFolder
        .add(this.dimmensions, "radiusBot", 1, 15, 0.1)
        .name("radiusBot");
      this.debugFolder
        .add(this.dimmensions, "height", 1, 15, 0.1)
        .name("height");

      this.debugFolder.add(this.positions, "x", -40, 40, 0.1).name("posX");
      this.debugFolder.add(this.positions, "y", -40, 40, 0.1).name("posY");
      this.debugFolder.add(this.positions, "z", -40, 40, 0.1).name("posZ");
    }
  }

  update() {
    if (this.mesh) {
      this.mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
      // this.mesh.scale.set(this.dimmensions.radiusTop, this.dimmensions.height);

      this.mesh.position.set(
        this.positions.x,
        this.positions.y,
        this.positions.z
      );

      this.mesh.geometry.dispose();

      // create new geometry
      this.mesh.geometry = new THREE.CylinderGeometry(
        this.dimmensions.radiusTop,
        this.dimmensions.radiusBot,
        this.dimmensions.height,
        32
      );
    }

    // if (this.body) {
    //   this.body.position.set(
    //     this.positions.x,
    //     this.positions.y,
    //     this.positions.z
    //   );
    //   this.body.mass = this.mass;
    //   this.body.quaternion.setFromEuler(
    //     this.rotation.x,
    //     this.rotation.y,
    //     this.rotation.z,
    //     "XYZ"
    //   );
    // }
  }
}
