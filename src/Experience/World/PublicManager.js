import Experience from "../Experience";
import * as THREE from "three";
import Public from "./Public.js";
import { gsap } from "gsap";

export default class PublicManager {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;
    this.time = this.experience.time;

    // coordonées du centre de la scène
    // Nous permet de calculer la distance des membres du public par rapport au centre
    this.centerPostion = { x: 0, y: 0, z: 0 };

    this.publicZoneMaxRadius = 60;
    this.publicZoneMinRadius = 30;
    this.maxAngle = (1 / 8) * Math.PI;
    this.minAngle = (7 / 8) * Math.PI;
    this.maxAngle = 0;
    this.minAngle = Math.PI * 2;
    this.minDistanceBetweenPublic = 2;

    this.publicBaseSpeed = 0.1;

    this.maxInstances = 200;

    // objet 3D temporaire pour positionner les instances
    this.dummy = new THREE.Object3D();

    this.publicList = {};
    this.publicCount = 0;
    this.init();
  }

  init() {
    this.public = new Public();
    const test = this.public.starInstance.model;

    this.starGeometry = null;
    this.starMaterial = null;

    // recuperer la geometry et le materiau du public dans l'objet 3d importé
    test.traverse((child) => {
      if (child.isMesh) {
        this.starGeometry = child.geometry;
        this.starMaterial = child.material;
      }
    });
    if (!this.starGeometry) {
      console.error("Aucune géométrie trouvée dans le modèle RockStar");
      return;
    }

    this.createInstancedMesh();
  }

  createInstancedMesh() {
    // creer un instant mesh de public avec le modèle
    this.instanceMesh = new THREE.InstancedMesh(
      this.starGeometry,
      this.starMaterial,
      this.maxInstances
    );
    this.instanceMesh.frustumCulled = false;

    // initialisation des instances: invisibles au début
    const matrix = new THREE.Matrix4().makeScale(0, 0, 0);
    // appliquer la matrice à toutes les instances d'un coup
    for (let i = 0; i < this.maxInstances; i++) {
      this.instanceMesh.setMatrixAt(i, matrix);
    }

    this.instanceMesh.instanceColor = new THREE.InstancedBufferAttribute(
      new Float32Array(this.maxInstances * 3),
      3
    );
    this.scene.add(this.instanceMesh);
    this.instanceMesh.instanceMatrix.needsUpdate = true;
  }

  createNewPublic(data) {
    // console.log("Creating new public at ", data);
    this.dummy.position.set(data.x, data.y, data.z);
    this.dummy.rotation.y = -data.angle;

    // parametrage de l'instance
    this.dummy.scale.set(0.25, 0.25, 0.25);
    this.dummy.rotation.set(0, 0, -0.1);
    // couleur random
    const color = new THREE.Color();
    color.setHSL(Math.random(), Math.random(), 0.5);

    this.dummy.updateMatrix();
    // applique la couleur à l'instance actuelle
    this.instanceMesh.setColorAt(this.publicCount, color);
    this.instanceMesh.instanceColor.needsUpdate = true;
    // applique les parametres à l'instance actuelle
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
    // if (this.publicCount < this.maxInstances) {
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
        publicMember.data.y + publicMember.data.jumpY, // le saut en plus
        publicMember.data.z
      );

      this.dummy.rotation.y = -publicMember.data.angle + Math.PI * 0.5;

      this.dummy.updateMatrix();
      this.instanceMesh.setMatrixAt(key, this.dummy.matrix);
    }
    this.instanceMesh.instanceMatrix.needsUpdate = true;
    // }
  }

  publicCreation() {
    let data = this.generateRandomPublicData();
    while (!this.checkCoordinates(data)) {
      data = this.generateRandomPublicData();
    }

    // jump des personnages
    data.jumpY = 0;
    const triggerJump = () => {
      const duration = 0.3;
      gsap.to(data, {
        jumpY: 1.5 + Math.random() * 1,
        duration: duration,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          gsap.delayedCall(2 + Math.random() * 4, triggerJump);
        },
      });
    };
    // lancer le premier cycle de saut après un délai initial aléatoire
    gsap.delayedCall(Math.random() * 5, triggerJump);

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
      }, 200);
    }
  }

  endCreationLoop() {
    for (const key in this.publicList) {
      gsap.killTweensOf(this.publicList[key].data);
    }
    // arreter la creation du public
    this.publicList = {};
    // stopper la boucle de creation
    this.publicCount = this.maxInstances;

    if (this.instanceMesh) {
      this.scene.remove(this.instanceMesh);
      // Libère la mémoire GPU
      this.instanceMesh.dispose();
    }

    // On recrée le mesh avec les bonnes références
    this.createInstancedMesh();
  }

  createDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("PublicManager");
      const debugObject = {
        createPublic: () => {
          // this.publicCreationLoop();
          this.publicCreation();
        },
      };
      this.debugFolder.add(debugObject, "createPublic");
    }
  }

  update() {
    this.publicMovement();

    if (this.public && typeof this.public.update === "function") {
      // si ton update attend l'objet time (avec time.delta), passe-le :
      this.public.update(this.experience.time);
      // ou si tu utilises this.time dans PublicManager, passe this.time
      // this.public.update(this.time);
    }
  }
}
