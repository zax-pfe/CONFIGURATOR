import * as THREE from "three";
import Experience from "../Experience.js";
import Physics from "./Physics.js";
import * as CANNON from "cannon-es";

// This class add a glb file to the world,
// add a debug ui to this object and allows
// to setup a physic hitbox for it

export default class PhysicMesh {
  constructor(
    positions,
    scale,
    rotation,
    resources,
    mass,
    name,
    hitBoxData,
    activatePhysics,
    hideWireframe
  ) {
    console.log("PhysicMesh initialized for", name);
    //setupt the experience
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;

    // setupt the physicWorld
    this.physics = new Physics();
    this.world = this.physics.world;
    this.defaultMaterial = this.physics.defaultMaterial;
    this.objectsToUpdate = this.physics.objectsToUpdate;

    //setUp local parameters
    this.scale = scale;
    this.positions = positions;
    this.rotation = rotation;
    this.resources = resources;
    this.mass = mass;
    this.name = name;
    this.activatePhysics = activatePhysics;
    this.hideWireframe = hideWireframe;

    // setUp hitbox dimensions
    this.hitBoxHeight = hitBoxData.height;
    this.hitBoxWidth = hitBoxData.width;
    this.hitBoxDepth = hitBoxData.depth;
    // this.hitBoxShiftX = hitBoxData.shiftX;
    // this.hitBoxShiftY = hitBoxData.shiftY;
    // this.hitBoxShiftZ = hitBoxData.shiftZ;

    this.hideModel = false;
  }

  createDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder(this.name);
      this.debugFolder.add(this, "hitBoxHeight", 0.1, 5, 0.1).name("height");
      this.debugFolder.add(this, "hitBoxWidth", 0.1, 5, 0.1).name("width");
      this.debugFolder.add(this, "hitBoxDepth", 0.1, 5, 0.1).name("depth");
      this.debugFolder
        .add(this.rotation, "y", -Math.PI, Math.PI, 0.01)
        .name("rotY");
      // this.debugFolder.add(this, "hitBoxShiftX", -5, 5, 0.1).name("shiftX");
      // this.debugFolder.add(this, "hitBoxShiftY", -5, 5, 0.1).name("shiftY");
      // this.debugFolder.add(this, "hitBoxShiftZ", -5, 5, 0.1).name("shiftZ");

      this.debugFolder.add(this, "hideWireframe").name("hideWireframe");
      this.debugFolder.add(this, "hideModel").name("hideModel");
    }
  }

  setModel() {
    this.model = this.resources.scene;
    this.model.scale.set(this.scale.x, this.scale.y, this.scale.z);
    this.model.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    this.model.position.set(
      this.positions.x,
      this.positions.y,
      this.positions.z
    );
    this.scene.add(this.model);

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }

  createPhysics() {
    this.shape = new CANNON.Box(
      new CANNON.Vec3(
        this.hitBoxWidth / 2,
        this.hitBoxHeight / 2,
        this.hitBoxDepth / 2
      )
    );
    this.body = new CANNON.Body({
      mass: this.mass,
      position: new CANNON.Vec3(
        this.positions.x,
        this.positions.y,
        this.positions.z
      ),
      shape: this.shape,
      material: this.defaultMaterial,
    });

    this.body.quaternion.setFromEuler(
      this.rotation.x,
      this.rotation.y,
      this.rotation.z,
      "XYZ"
    );

    // this.body.position.copy(this.positions);
    this.world.addBody(this.body);
    this.objectsToUpdate.push({
      mesh: this.model,
      // mesh: this.mesh,
      body: this.body,
      // shift: {
      //   x: this.hitBoxShiftX,
      //   y: this.hitBoxShiftY,
      //   z: this.hitBoxShiftZ,
      // },
    });
  }

  createThreeMesh() {
    console.log("Creating Three.js Mesh for", this.name);
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshStandardMaterial({
      wireframe: true,
      color: 0xff0000,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.scale.set(this.hitBoxWidth, this.hitBoxHeight, this.hitBoxDepth);
    this.mesh.position.set(
      this.positions.x,
      this.positions.y,
      this.positions.z
    );

    this.mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    this.mesh.castShadow = true;

    this.scene.add(this.mesh);
  }

  create() {
    // Setup debug
    this.createDebug();
    // Setup
    this.setModel();
    this.createThreeMesh();
    if (this.activatePhysics) {
      this.createPhysics();
    }
  }

  update() {
    // console.log("Updating PhysicMesh for", this.name);
    if (this.mesh) {
      this.mesh.visible = !this.hideWireframe;

      if (!this.activatePhysics) {
        this.mesh.rotation.set(
          this.rotation.x,
          this.rotation.y,
          this.rotation.z
        );
        this.mesh.scale.set(
          this.hitBoxWidth,
          this.hitBoxHeight,
          this.hitBoxDepth
        );

        // this.mesh.position.set(
        //   this.positions.x + this.hitBoxShiftX,
        //   this.positions.y + this.hitBoxShiftY,
        //   this.positions.z + this.hitBoxShiftZ
        // );
      }
    }

    if (this.model) {
      this.model.visible = !this.hideModel;
      this.model.rotation.set(
        this.rotation.x,
        this.rotation.y,
        this.rotation.z
      );
    }

    if (this.body) {
      // this.body.position.set(x, y, z);
      this.body.mass = this.mass;
      this.body.quaternion.setFromEuler(
        this.rotation.x,
        this.rotation.y,
        this.rotation.z,
        "XYZ"
      );
      this.body.updateMassProperties();
    }
  }
}
