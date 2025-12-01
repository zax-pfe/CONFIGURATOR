import * as THREE from "three";
import Experience from "../Experience.js";
import Physics from "../Utils/Physics.js";
import * as CANNON from "cannon-es";

export default class Speaker {
  constructor(
    positions = { x: 0, y: 0, z: 0 },
    scale = { x: 1, y: 1, z: 1 },
    rotation = { x: 0, y: Math.PI, z: 0 }
  ) {
    //setupt the experience
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    // setupt the physicWorld
    this.physics = new Physics();
    this.world = this.physics.world;
    this.defaultMaterial = this.physics.defaultMaterial;
    this.objectsToUpdate = this.physics.objectsToUpdate;

    //setUp positions & Scale
    this.scale = scale;
    this.rotation = rotation;
    this.height = 2.6;
    this.width = 1.1;
    this.depth = 1.2;
    this.shiftX = 0;
    this.shiftY = 0;
    this.shiftZ = 0;
    this.mass = 1;
    this.meshType = "box";
    this.positions = positions;
    console.log("Speaker initialized at ", this.positions);

    this.hideWireframe = false;
    this.hideModel = false;
    this.activatePhysics = false;

    // Setup debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Speaker");
      if (this.meshType === "box") {
        this.debugFolder.add(this, "height", 0.1, 5, 0.1).name("height");
        this.debugFolder.add(this, "width", 0.1, 5, 0.1).name("width");
        this.debugFolder.add(this, "depth", 0.1, 5, 0.1).name("depth");
      } else if (this.meshType === "sphere") {
        this.debugFolder.add(this, "radius", 0.1, 5, 0.1).name("radius");
      }

      this.debugFolder.add(this, "shiftX", -5, 5, 0.1).name("shiftX");
      this.debugFolder.add(this, "shiftY", -5, 5, 0.1).name("shiftY");
      this.debugFolder.add(this, "shiftZ", -5, 5, 0.1).name("shiftZ");
      this.debugFolder.add(this, "mass", 1, 10, 0.1).name("mass");
      this.debugFolder
        .add(this, "meshType", ["box", "sphere", "plane"])
        .name("meshType");
      this.debugFolder.add(this, "hideWireframe").name("hideWireframe");
      this.debugFolder.add(this, "hideModel").name("hideModel");
      // this.debugFolder.add(this, "activatePhysics").name("activatePhysics");

      const debugObject = {
        createTestMesh: () => {
          this.createThreeMesh();
        },
        activatePhysics: () => {
          this.createPhysics();
        },
      };
      this.debugFolder.add(debugObject, "createTestMesh");
      this.debugFolder.add(debugObject, "activatePhysics");
    }

    // Setup
    this.resource = this.resources.items.speakerCutomModel;
    this.setModel();
    // this.createThreeMesh();
    // this.createPhysics();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.scale.set(this.scale.x, this.scale.y, this.scale.z);
    this.model.rotation.y = Math.PI;
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
        this.width / 2,
        this.height / 2 - this.shiftY,
        this.depth / 2
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
      shift: { x: this.shiftX, y: this.shiftY, z: this.shiftZ },
    });
  }

  createThreeMesh() {
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshStandardMaterial({
      wireframe: true,
      color: 0xff0000,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.scale.set(this.width, this.height, this.depth);
    this.mesh.position.set(
      this.positions.x,
      this.positions.y,
      this.positions.z
    );
    this.mesh.castShadow = true;

    this.scene.add(this.mesh);
  }

  update() {
    if (this.mesh) {
      this.mesh.visible = !this.hideWireframe;
      // if (!this.activatePhysics) {
      //   this.mesh.scale.set(this.width, this.height, this.depth);
      //   this.mesh.position.set(
      //     this.positions.x + this.shiftX,
      //     this.positions.y + this.shiftY,
      //     this.positions.z + this.shiftZ
      //   );
      // }
    }

    if (this.model) {
      this.model.visible = !this.hideModel;
    }

    if (this.body) {
      // this.body.position.set(x, y, z);
      this.body.mass = this.mass;
      this.body.updateMassProperties();
    }
  }
}
