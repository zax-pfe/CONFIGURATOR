import MeshHitBox from "../../../Utils/MeshHitBox.js"
import Experience from "../../../Experience.js";
import Physics from "../../../Utils/Physics.js";
import * as THREE from "three";

export default class StarTest {
  constructor() {
    this.experience = new Experience();
    this.time = this.experience.time;
    this.resource = this.experience.resources.items.StarModel;
    this.debug = this.experience.debug;
    this.physics = new Physics();

    // compteur pour les différentes stars
    this.instanceCount = 0;

    this.setupConstants();
  }

  setupConstants() {
    this.positions = { x: 0, y: 0, z: 0 };
    this.scale = { x: 1, y: 1, z: 1 };
    this.rotation = { x: 0, y: 3.14, z: 0 };
    this.mass = 1;
    this.name = "StarTest";
    this.hitBoxType = "cylinder";
    this.activatePhysics = true;
    this.material = this.physics.stickyMaterial;
    this.sound = this.experience.soundManager.bambooHitSound;
    this.animated = true;
  }

  create() {
    this.instanceCount++;
    const currentId = this.instanceCount;
    const instanceName = `${this.name} ${currentId}`;

    // crée le MeshHitBox dans une variable LOCALE 
    const meshHitBoxInstance = new MeshHitBox(
      this.positions,
      this.scale,
      this.rotation,
      this.resource,
      this.mass,
      this.material,
      this.hitBoxType,
      instanceName, // nom unique
      this.activatePhysics,
      this.sound,
      this.animated
    );

    // // configurer l'animation localement pour cette instance
    // const animationState = this.setupLocalAnimation(meshHitBoxInstance.model);

    // // debug spécifique à cette instance
    // this.setupLocalDebug(instanceName, animationState);

    const result = {
      name: instanceName,
      model: meshHitBoxInstance.model,
      body: meshHitBoxInstance.body,
      // On initialise l'état d'animation à null par défaut
      animationState: null,
      
      // La fonction update vérifie maintenant si animationState existe
      update: (time) => {
        const deltaTime = time.delta * 0.001; 

        // On accède à 'result.animationState' dynamiquement
        if (result.animationState && result.animationState.mixer) {
          result.animationState.mixer.update(deltaTime);
        }
      },
    };

    return result;
  }

  // retourne un objet avec le mixer et les actions pour UNE instance
  setAnimation(instanceResult) {
    if (!instanceResult || !instanceResult.model) return;
    
    const model = instanceResult.model;
    const instanceName = instanceResult.name;

    const animationState = {};
    animationState.mixer = new THREE.AnimationMixer(model);
    animationState.actions = {};

    animationState.actions.dance = animationState.mixer.clipAction(
      this.resource.animations[0]
    );
    animationState.actions.jump = animationState.mixer.clipAction(
      this.resource.animations[1]
    );
    animationState.actions.stand = animationState.mixer.clipAction(
      this.resource.animations[2]
    );
    animationState.actions.walk = animationState.mixer.clipAction(
      this.resource.animations[3]
    );

    animationState.actions.current = animationState.actions.stand;
    animationState.actions.current.play();

    animationState.play = (name) => {
      const newAction = animationState.actions[name];
      const oldAction = animationState.actions.current;

      if (newAction !== oldAction) {
        newAction.reset();
        newAction.play();
        newAction.crossFadeFrom(oldAction, 1);
        animationState.actions.current = newAction;
      }
    };

    instanceResult.animationState = animationState;

    this.setupLocalDebug(instanceName, animationState);
  }

  setupLocalDebug(folderName, animationState) {
    if (this.debug.active) {
      const folder = this.debug.ui.addFolder(folderName);

      const debugObject = {
        playDance: () => {
          animationState.play("dance");
        },
        playWalking: () => {
          animationState.play("walk");
        },
        playJumping: () => {
          animationState.play("jump");
        },
        playStand: () => {
          animationState.play("stand");
        },
      };

      folder.add(debugObject, "playDance");
      folder.add(debugObject, "playWalking");
      folder.add(debugObject, "playJumping");
      folder.add(debugObject, "playStand");
      
      folder.close(); 
    }
  }
}

