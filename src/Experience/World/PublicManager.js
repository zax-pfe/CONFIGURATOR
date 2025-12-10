import Experience from "../Experience";
import * as THREE from "three";
import Public from "./Public.js";

export default class PublicManager {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;
    this.time = this.experience.time;

    this.public = new Public();

    // coordonées du centre de la scène
    // Nous permet de calculer la distance des membres du public par rapport au centre
    this.centerPostion = { x: 0, y: 0, z: 0 };

    this.publicZoneMaxRadius = 50;
    this.publicZoneMinRadius = 30;
    this.maxAngle = (1 / 8) * Math.PI;
    this.minAngle = (7 / 8) * Math.PI;
    this.minDistanceBetweenPublic = 2;

    this.publicBaseSpeed = 0.03;

    this.maxInstances = 100;

    // creer un instant mesh de public
    this.instanceMesh = new THREE.InstancedMesh(
      this.public.geometry,
      this.public.material,
      this.maxInstances
    );
    this.scene.add(this.instanceMesh);
    this.instanceMesh.instanceMatrix.needsUpdate = true;

    // objet 3D temporaire pour positionner les instances
    this.dummy = new THREE.Object3D();

    this.publicList = {};
    this.publicCount = 0;

    // this.createDebug();
  }

  createNewPublic(data) {
    this.dummy.position.set(data.x, data.y, data.z);
    this.dummy.rotation.y = -data.angle;

    this.dummy.updateMatrix();
    this.instanceMesh.setMatrixAt(this.publicCount, this.dummy.matrix);
    this.instanceMesh.instanceMatrix.needsUpdate = true;
  }

  calculateDistanceFromCenter(x, z) {
    return Math.sqrt(
      (x - this.centerPostion.x) ** 2 + (z - this.centerPostion.z) ** 2
    );
  }

  generateRandomPublicData() {
    // generer des coordonées random sur l'arc de cercle exterieur,
    // genere d'abord un angle entre min et max angle
    const randomAngle =
      Math.random() * (this.maxAngle - this.minAngle) + this.minAngle;
    // calcule le x et le y
    const x = Math.cos(randomAngle) * this.publicZoneMaxRadius;
    const z = Math.sin(randomAngle) * this.publicZoneMaxRadius;
    const speed = Math.random() * this.publicBaseSpeed;

    // on teste si il y a un autre membre du public trop proche ->
    // si oui on regenere jusqu'a ce que ca soit pas le cas
    return { x, y: 0, z, angle: randomAngle, speed: speed };
  }

  checkCoordinates(data, excludeKey = null) {
    // verifier que la position n'est pas trop proche d'un autre membre du public
    for (const key in this.publicList) {
      if (key === excludeKey) continue;
      const publicMember = this.publicList[key];

      const distance = Math.sqrt(
        (data.x - publicMember.data.x) ** 2 +
          (data.z - publicMember.data.z) ** 2
      );

      // console.log("distance entre membres du public", distance);
      if (distance < this.minDistanceBetweenPublic) {
        return false;
      }
    }
    return true;
  }

  publicMovement() {
    // definir le mouvement du public : avance vers la scene
    for (const key in this.publicList) {
      const publicMember = this.publicList[key];
      const deltaX =
        publicMember.data.speed * Math.cos(publicMember.data.angle);
      const deltaZ =
        publicMember.data.speed * Math.sin(publicMember.data.angle);

      const distanceFromCenter = this.calculateDistanceFromCenter(
        publicMember.data.x,
        publicMember.data.z
      );
      if (distanceFromCenter > this.publicZoneMinRadius) {
        const noContact = this.checkCoordinates(publicMember.data, key);

        // console.log("contact ??", contact);
        if (noContact) {
          publicMember.data.x -= deltaX;
          publicMember.data.z -= deltaZ;
        }
      }

      this.dummy.position.set(
        publicMember.data.x,
        publicMember.data.y,
        publicMember.data.z
      );

      this.dummy.rotation.y = -publicMember.data.angle;

      this.dummy.updateMatrix();
      this.instanceMesh.setMatrixAt(key, this.dummy.matrix);
    }
    this.instanceMesh.instanceMatrix.needsUpdate = true;
  }

  publicCreation() {
    let data = this.generateRandomPublicData();
    while (!this.checkCoordinates(data)) {
      data = this.generateRandomPublicData();
    }
    this.createNewPublic(data);
    this.publicList[this.publicCount] = {
      data: data,
    };
    this.publicCount++;
  }

  publicCreationLoop() {
    // this.createDebug();
    if (this.publicCount < this.maxInstances) {
      this.publicCreation();

      setTimeout(() => {
        this.publicCreationLoop();
      }, 500);
    }
  }

  endCreationLoop() {
    // arreter la creation du public
    this.publicCount = this.maxInstances;
  }

  createDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("PublicManager");
      const debugObject = {
        createPublic: () => {
          this.publicCreationLoop();
        },
      };
      this.debugFolder.add(debugObject, "createPublic");
    }
  }

  update() {
    this.publicMovement();
  }
}
