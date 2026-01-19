import Experience from "../../Experience.js";
import Physics from "../../Utils/Physics.js";
import * as CANNON from "cannon-es";
import * as THREE from "three";

export default class SceneColumn {
  constructor(
    name,
    positions,
    rotation,
    mass = 0,
    dimmensions = { width: 1.8, height: 13 },
    scale = { x: 1, y: 1, z: 1 },

    debug = false,
  ) {
    // setupt the experience
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;

    // setupt the physicWorld
    this.physics = new Physics();
    this.world = this.physics.world;
    this.defaultMaterial = this.physics.defaultMaterial;
    this.objectsToUpdate = this.physics.objectsToUpdate;

    this.scale = scale;
    this.positions = positions;
    this.rotation = rotation;
    this.mass = mass;
    this.dimmensions = dimmensions;
    this.name = name;

    // create the column
    this.setGeometry();
    this.setMaterial();
    this.setPhysics();
    if (debug) {
      this.setMesh();
      this.createDebug();
    }
  }

  setGeometry() {
    this.geometry = new THREE.CylinderGeometry(
      this.dimmensions.width / 2,
      this.dimmensions.width / 2,
      this.dimmensions.height,
    );
  }
  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      color: "#fd0000",
      wireframe: true,
    });
  }
  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    this.mesh.position.set(
      this.positions.x,
      this.positions.y,
      this.positions.z,
    );
    this.scene.add(this.mesh);
  }
  setPhysics() {
    const floorShape = new CANNON.Cylinder(
      this.dimmensions.width / 2,
      this.dimmensions.width / 2,
      this.dimmensions.height,
      8,
    );
    this.floorBody = new CANNON.Body();
    this.floorBody.material = this.defaultMaterial;

    this.floorBody.mass = 0;
    this.floorBody.addShape(floorShape);
    this.floorBody.position.copy(this.positions);

    this.floorBody.quaternion.setFromEuler(
      this.rotation.x,
      this.rotation.y,
      this.rotation.z,
      "XYZ",
    );

    this.world.addBody(this.floorBody);
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
        .add(this.dimmensions, "width", 0.1, 10, 0.1)
        .name("tubeRadius");
      this.debugFolder
        .add(this.dimmensions, "height", 0.1, 50, 0.1)
        .name("tubeHeight");
      this.debugFolder.add(this.positions, "x", -80, 80, 0.1).name("posX");
      this.debugFolder.add(this.positions, "y", -80, 80, 0.1).name("posY");
      this.debugFolder.add(this.positions, "z", -80, 80, 0.1).name("posZ");
    }
  }

  update() {
    if (this.mesh) {
      this.mesh.geometry.dispose();
      this.mesh.geometry = new THREE.CylinderGeometry(
        this.dimmensions.width / 2,
        this.dimmensions.width / 2,
        this.dimmensions.height,
      );

      this.mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);

      this.mesh.position.set(
        this.positions.x,
        this.positions.y,
        this.positions.z,
      );
    }
  }
}
