import Experience from "../../Experience";
import Physics from "../../Utils/Physics.js";

export default class SceneGround {
  constructor() {
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
    this.rotation = { x: 0, y: 0, z: 0 };
    this.mass = 0;
    this.planeDimmensions = { width: 15, height: 15 };
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(
      this.planeDimmensions.width,
      this.planeDimmensions.height
    );
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
    this.mesh.position.set(
      this.positions.x,
      this.positions.y,
      this.positions.z
    );
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }
  setPhysics() {
    console.log("Setting up Ground physics");
    const floorShape = new CANNON.Box(
      new CANNON.Vec3(
        this.planeDimmensions.width / 2,
        0.1,
        this.planeDimmensions.height / 2
      )
    );
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
