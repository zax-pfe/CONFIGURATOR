import MeshHitBox from "../../../Utils/MeshHitBox.js"
import Experience from "../../../Experience.js";
import Physics from "../../../Utils/Physics.js";
import * as THREE from "three";

export default class GirlStar {
  constructor() {
    this.experience = new Experience();
    this.time = this.experience.time;
    this.resource = this.experience.resources.items.GirlStarModel;
    this.debug = this.experience.debug;
    this.physics = new Physics();

    // stocke les instances de la star
    this.instances = []
    // compteur pour les id uniques
    this.instanceCount = 0;

    this.setupConstants();
  }

  setupConstants() {
    this.positions = { x: 0, y: 0, z: 0 };
    this.scale = { x: 1, y: 1, z: 1 };
    this.rotation = { x: 0, y: 3.14, z: 0 };
    this.mass = 1;
    this.name = "GirlStar";
    this.hitBoxType = "cylinder";
    this.activatePhysics = true;
    this.material = this.physics.stickyMaterial;
    this.sound = this.experience.soundManager.bambooHitSound;
    this.animated = true;
  }

  create() {
    this.instanceCount++;
    const instanceName = `${this.name}_${this.instanceCount}`;

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

    // configurationd de l'animation
    const animationState = this._createAnimationState(meshHitBoxInstance.model);

    // objet représentant l'instance de la star
    const starInstance = {
      id: this.instanceCount,
      name: instanceName,
      model: meshHitBoxInstance.model,
      body: meshHitBoxInstance.body,
      animationState: animationState,
    };

    // ajout au debug panel
    if (this.debug.active) {
      this._createDebug(instanceName, starInstance);
    }

    // ajout au tableau de gestion
    this.instances.push(starInstance);

    return starInstance;
  } 

  update() {
    const deltaTime = this.time.delta * 0.001;

    // On boucle sur toutes les instances vivantes
    for (const star of this.instances) {  
      // update Animation
      if (star.animationState && star.animationState.mixer) {
        star.animationState.mixer.update(deltaTime);
      }
    }
  }

  _createAnimationState(model) {
    if (!this.resource.animations || this.resource.animations.length === 0) return null;

    const mixer = new THREE.AnimationMixer(model);
    const actions = {};

    actions.dance = mixer.clipAction(this.resource.animations[0]);
    actions.jump = mixer.clipAction(this.resource.animations[1]);
    actions.stand = mixer.clipAction(this.resource.animations[2]);
    actions.walk = mixer.clipAction(this.resource.animations[3]);

    actions.current = actions.stand;
    actions.current.play();

    const play = (name) => {
      const newAction = actions[name];
      const oldAction = actions.current;

      if (newAction && newAction !== oldAction) {
        newAction.reset();
        newAction.play();
        newAction.crossFadeFrom(oldAction, 0.5);
        actions.current = newAction;
      }
    };

    return { mixer, actions, play };
  }

  _createDebug(folderName, starInstance) {
    const folder = this.debug.ui.addFolder(folderName);
    
    if (starInstance.animationState) {
        const debugObject = {
            playDance: () => starInstance.animationState.play("dance"),
            playWalking: () => starInstance.animationState.play("walk"),
            playJumping: () => starInstance.animationState.play("jump"),
            playStand: () => starInstance.animationState.play("stand"),
        };
        folder.add(debugObject, "playDance");
        folder.add(debugObject, "playWalking");
        folder.add(debugObject, "playJumping");
        folder.add(debugObject, "playStand");
    }
    folder.close();
  }
}

