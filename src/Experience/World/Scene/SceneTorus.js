import Experience from "../../Experience.js";
import Physics from "../../Utils/Physics.js";
import * as CANNON from "cannon-es";
import * as THREE from "three";

export default class SceneTorus {
  constructor(
    name = "torus",
    positions = { x: 0, y: 15.5, z: 0 },
    rotation = { x: 0, y: 0, z: 0 },
    segmentDimmensions = { width: 1, height: 1, depth: 3 },
    radius = 11,
    segments = 20,
    mass = 0,
    debug = false
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

    this.positions = positions;
    this.rotation = rotation;
    this.mass = mass;
    this.name = name;
    this.segments = segments;
    this.radius = radius;
    this.depth = segmentDimmensions.depth;
    this.width = segmentDimmensions.width;
    this.height = segmentDimmensions.height;

    // create the column
    this.setGeometry();
    this.setMaterial();
    this.setPhysics();
    if (debug) {
      this.setMesh();
    }
  }

  setGeometry() {
    this.geometry = new THREE.BoxGeometry(
      this.width, // X
      this.height, // Y
      this.depth // Z
    );
  }
  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      color: "#fd0000",
      wireframe: true,
    });
  }
  setMesh() {
    this.meshes = [];
    for (let i = 0; i < this.segments; i++) {
      const angle = (i / this.segments) * Math.PI * 2;
      const x = Math.cos(angle) * this.radius;
      const z = Math.sin(angle) * this.radius;

      const mesh = new THREE.Mesh(this.geometry, this.material);
      mesh.position.set(x, this.positions.y, z);
      mesh.rotation.set(this.rotation.x, -angle, this.rotation.z);
      this.scene.add(mesh);
      this.meshes.push(mesh);
    }
  }
  setPhysics() {
    const body = new CANNON.Body({ mass: 0 });

    for (let i = 0; i < this.segments; i++) {
      const angle = (i / this.segments) * Math.PI * 2;
      const x = Math.cos(angle) * this.radius;
      const z = Math.sin(angle) * this.radius;

      const shape = new CANNON.Box(
        new CANNON.Vec3(this.width / 2, this.height / 2, this.depth / 2)
      );

      const offset = new CANNON.Vec3(x, 0, z);

      const q = new CANNON.Quaternion();
      q.setFromEuler(0, -angle, 0); // tourne la face vers le centre

      body.addShape(shape, offset, q);
    }
    body.position.set(this.positions.x, this.positions.y, this.positions.z);

    this.world.addBody(body);
  }
}
