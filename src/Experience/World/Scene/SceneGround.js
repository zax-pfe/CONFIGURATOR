import Experience from "../../Experience";
import Physics from "../../Utils/Physics.js";
import * as CANNON from "cannon-es";
import * as THREE from "three";

export default class SceneGround {
  constructor(debug) {
    console.log("SceneGround initialized");

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
    this.positions = { x: 0, y: 0, z: 0 };
    this.rotation = { x: -Math.PI * 0.5, y: 0, z: 0 };
    this.mass = 0;
    this.dimmensions = { width: 10, height: 10 };
    this.name = "SceneGround";

    // create the ground
    this.setGeometry();
    this.setMaterial();
    this.setPhysics();
    if (debug) {
      this.setMesh();
      this.createDebug();
    }
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(
      this.dimmensions.width,
      this.dimmensions.height
    );
  }
  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      color: "#fd0000",
      metalness: 0.3,
      roughness: 0.4,
      side: THREE.DoubleSide,
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
    // const floorShape = new CANNON.Plane(
    //   new CANNON.Vec3(
    //     this.dimmensions.width / 2,

    //     this.dimmensions.height / 2
    //   )
    // );
    const floorShape = new CANNON.Plane();
    this.floorBody = new CANNON.Body();
    this.floorBody.material = this.defaultMaterial;

    this.floorBody.mass = 0;
    this.floorBody.addShape(floorShape);
    this.floorBody.position.copy(this.positions);

    // this.floorBody.quaternion.setFromAxisAngle(
    //   new CANNON.Vec3(-1, 0, 0),
    //   Math.PI
    // );

    this.floorBody.quaternion.setFromEuler(
      this.rotation.x,
      this.rotation.y,
      this.rotation.z,
      "XYZ"
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
        .add(this.dimmensions, "width", 1, 100, 0.1)
        .name("planeWidth");
      this.debugFolder
        .add(this.dimmensions, "height", 1, 100, 0.1)
        .name("planeHeight");
      this.debugFolder.add(this.positions, "x", -40, 40, 0.1).name("posX");
      this.debugFolder.add(this.positions, "y", -40, 40, 0.1).name("posY");
      this.debugFolder.add(this.positions, "z", -40, 40, 0.1).name("posZ");
    }
  }

  update() {
    if (this.mesh) {
      this.mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
      this.mesh.scale.set(this.dimmensions.width, this.dimmensions.height);

      this.mesh.position.set(
        this.positions.x,
        this.positions.y,
        this.positions.z
      );
    }

    // if (this.floorBody) {
    //   this.floorBody.position.set(
    //     this.positions.x,
    //     this.positions.y,
    //     this.positions.z
    //   );
    //   this.floorBody.mass = this.mass;
    //   this.floorBody.quaternion.setFromEuler(
    //     this.rotation.x,
    //     this.rotation.y,
    //     this.rotation.z,
    //     "XYZ"
    //   );
    // }
  }
}
