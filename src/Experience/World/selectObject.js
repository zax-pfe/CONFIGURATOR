import Experience from "../Experience";
import EventEmitter from "../Utils/EventEmitter";
import { gsap } from "gsap";
// les objets sont crées en amont et donnés a cette classe

export default class SelectObject extends EventEmitter {
  constructor(objects, stars) {
    super();

    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;
    this.soundManager = this.experience.soundManager;
    this.mobileData = this.experience.mobileData;

    // liste des objets pouvant etre selectionnés
    this.objects = objects;
    this.stars = stars;

    // PARAMETER OF THE WHEEL
    this.wheelRadius = 8;
    this.wheelPosition = { x: 0, y: 15, z: 35 };

    this.numberOfObjects = 5;

    this.angleStep = (2 * Math.PI) / this.numberOfObjects;
    this.circlePositions = this.generateCirclePositions();

    //MUSIC
    // dictionnaire avec les musiques selectionnée des objets.
    this.selectedObjectsMusic = this.soundManager.selectedObjectsMusic;
    // variable qui stocke la musique de l'objet au centre
    // pour la jouter et la stop
    this.currentSelectedMusic = null;

    // parameter of the objet selector
    // ID of the selected object
    this.selectedId = 1;
    // Model of the selected Object
    this.currentSelectedModel = null;

    this.currentInstanceData = null;

    // liste des modeles affichés autour de la roue
    this.displayedModels = [];
    // objet selectionné pour le lancé
    this.objectToLaunch = null;

    this.selectedObject = 0;

    // boolean pour controler la reception de la data du mobile pour le lancer
    // si on est en phase de selection, alors on ecoute les messages de sélection du mobile
    this.selectPhase = false;

    this.isStarPhase = false;

    // quand l'utilisateur survole un objet sur le mobile
    this.mobileData.on("mobileHover", (payload) => {
      if (!this.selectPhase) return;

      this.setSelectedObjectMobile(payload);
    });

    // quand l'utilisateurselectionne un objet sur le mobile
    this.mobileData.on("mobileSelect", (payload) => {
      if (!this.selectPhase) return;

      this.destroyElements();

      this.objectToLaunch = this.selectedObject;
      if (this.currentSelectedModel) {
        this.experience.scene.remove(this.currentSelectedModel);
      }
      this.destroyDebug();
      // clean the music playing
      this.currentSelectedMusic?.pause();
      this.currentSelectedMusic = null;
      this.selectedObjectsMusic[this.selectedObject.name] =
        this.currentSelectedMusic;
      this.trigger("objectSelected");
    });
  }

  // selectionner des objets au hasard
  // selectRandomObject() {
  //   this.randomSelectedObjects = [];
  //   const copyList = [...Object.values(this.objects)];

  //   for (let i = 0; i < this.numberOfObjects && copyList.length > 0; i++) {
  //     const randomIndex = Math.floor(Math.random() * copyList.length);
  //     this.randomSelectedObjects.push(copyList[randomIndex]);
  //     copyList.splice(randomIndex, 1);
  //   }
  // }

  selectObjectsOrStars(isStarPhase = false) {
    this.isStarPhase = isStarPhase;
    this.randomSelectedObjects = [];

    if (isStarPhase) {
      this.numberOfObjects = 3;
      const copyList = [...Object.values(this.stars)];
      this.randomSelectedObjects = copyList;
    } else {
      this.numberOfObjects = 5;
      const copyList = [...Object.values(this.objects)];
      for (let i = 0; i < this.numberOfObjects && copyList.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * copyList.length);
        this.randomSelectedObjects.push(copyList[randomIndex]);
        copyList.splice(randomIndex, 1);
      }
    }

    this.angleStep = (2 * Math.PI) / this.numberOfObjects;
    this.circlePositions = this.generateCirclePositions();
  }

  generateCirclePositions() {
    // genere les positions en cercle autour de la roue
    const positions = [];

    for (let i = 0; i < this.numberOfObjects; i++) {
      const offset = this.angleStep / 2; // pour s'aligner avec Skia
      const angle = -i * this.angleStep - offset; // sens horaire + alignement

      const x = this.wheelPosition.x + this.wheelRadius * Math.cos(angle);
      const y = this.wheelPosition.y + this.wheelRadius * Math.sin(angle);

      positions.push({ x, y, z: this.wheelPosition.z });
    }

    return positions;
  }

  // creer les mesh des objets selectionnées.
  createSelectedObjectsMeshes() {
    this.wheelObjects = [];

    for (let [index, object] of this.randomSelectedObjects.entries()) {
      const result = object.create();

      const originalRotation = result.model.rotation.clone();

      // animation d'apparition des objets de la roue (position + scale)
      gsap.fromTo(
        result.model.position,
        { x: 0, y: 0, z: 0 },
        {
          x: this.circlePositions[index].x,
          y: this.circlePositions[index].y,
          z: this.circlePositions[index].z,
          duration: 1.5,
          ease: "expo.out",
        }
      );
      gsap.fromTo(
        result.model.scale,
        { x: 0, y: 0, z: 0 },
        {
          x: result.model.scale.x,
          y: result.model.scale.y,
          z: result.model.scale.z,
          duration: 1.5,
          ease: "expo.out",
        }
      );

      // displayed model permet de savoir quels models sont affichés
      // c'est surtout utile pour les supprimer ensuite
      this.displayedModels.push(result.model);
      this.experience.scene.add(result.model);
      this.wheelObjects.push({
        model: result.model,
        rotation: originalRotation,
      });
    }
  }

  setSelectedObjectMobile(payload) {
    const index = payload.index;
    this.selectedObject = this.randomSelectedObjects[index];

    this.tiltSelectedObject(index);

    this.cleanPreviousSelection();

    this.cleanPreviousSelection();

    const result = this.selectedObject.create();

    this.currentInstanceData = result;

    result.model.position.set(
      this.wheelPosition.x,
      this.wheelPosition.y,
      this.wheelPosition.z
    );

    // animations d'apparition puis rotation de l'objet sélectionné au centre
    let tl = gsap.timeline();
    tl.fromTo(
      result.model.scale,
      {
        x: this.selectedObject.scale.x * 1,
        y: this.selectedObject.scale.y * 1,
        z: this.selectedObject.scale.z * 1,
      },
      {
        x: this.selectedObject.scale.x * 2.5,
        y: this.selectedObject.scale.y * 2.5,
        z: this.selectedObject.scale.z * 2.5,
        duration: 0.25,
        ease: "power2.inOut",
      }
    );
    tl.to(result.model.scale, {
      x: this.selectedObject.scale.x * 2,
      y: this.selectedObject.scale.y * 2,
      z: this.selectedObject.scale.z * 2,
      duration: 0.25,
      ease: "power2.inOut",
    });
    tl.to(result.model.rotation, {
      y: result.model.rotation.y + Math.PI * 2,
      duration: 3,
      ease: "none",
      repeat: -1,
    });

    if (this.currentSelectedModel) {
      this.experience.scene.remove(this.currentSelectedModel);
    }

    if (result.lightBeam) {
      result.lightBeam.show();
    }

    this.experience.scene.add(result.model);
    this.currentSelectedModel = result.model;
  }

  tiltSelectedObject(index) {
    const tiltAngle = -0.5;

    for (let i = 0; i < this.wheelObjects.length; i++) {
      const objectData = this.wheelObjects[i];

      if (i === index) {
        gsap.to(objectData.model.rotation, {
          x: objectData.rotation.x, // On garde x et y fixes
          y: objectData.rotation.y,
          z: objectData.rotation.z + tiltAngle, // On ajoute l'inclinaison à la base
          duration: 0.5,
          ease: "back.out(1.7)", // Petit effet de rebond sympa
        });
      } else {
        // Pour les objets NON sélectionnés : Retour à la position neutre

        // 1. Reset Rotation
        gsap.to(objectData.model.rotation, {
          x: objectData.rotation.x,
          y: objectData.rotation.y,
          z: objectData.rotation.z, // Retour à la rotation d'origine sauvegardée
          duration: 0.5,
          ease: "power2.out",
        });
      }
    }
  }

  // creer l'objet au centre
  setSelectedObject() {
    this.selectedObject = this.randomSelectedObjects[this.selectedId - 1];

    // animation inclinaison de l'objet sélectionné dans la roue
    this.tiltSelectedObject(this.selectedId - 1);

    this.cleanPreviousSelection();

    this.cleanPreviousSelection();

    const result = this.selectedObject.create();

    this.currentInstanceData = result;

    result.model.position.set(
      this.wheelPosition.x,
      this.wheelPosition.y,
      this.wheelPosition.z
    );
    this.currentSelectedMusic?.pause();
    this.currentSelectedMusic = null;
    // Si l'objet a une musique associée, quand l'objet change
    // on joue la musique et reset le temps
    if (result.music) {
      this.currentSelectedMusic = result.music;
      this.currentSelectedMusic.volume = 0.1;
      this.currentSelectedMusic.currentTime = 0;
      this.currentSelectedMusic.loop = true;
      this.currentSelectedMusic.play();
    } else {
      // sinon on stop la musique courante
      this.currentSelectedMusic?.pause();
      this.currentSelectedMusic = null;
    }

    // animations gsap apparition puis rotation de l'objet sélectionné au centre
    let tl = gsap.timeline();
    tl.fromTo(
      result.model.scale,
      {
        x: this.selectedObject.scale.x * 1,
        y: this.selectedObject.scale.y * 1,
        z: this.selectedObject.scale.z * 1,
      },
      {
        x: this.selectedObject.scale.x * 2.5,
        y: this.selectedObject.scale.y * 2.5,
        z: this.selectedObject.scale.z * 2.5,
        duration: 0.25,
        ease: "power2.inOut",
      }
    );
    tl.to(result.model.scale, {
      x: this.selectedObject.scale.x * 2,
      y: this.selectedObject.scale.y * 2,
      z: this.selectedObject.scale.z * 2,
      duration: 0.25,
      ease: "power2.inOut",
    });
    tl.to(result.model.rotation, {
      y: result.model.rotation.y + Math.PI * 2,
      duration: 3,
      ease: "none",
      repeat: -1,
    });

    if (this.currentSelectedModel) {
      this.experience.scene.remove(this.currentSelectedModel);
    }

    if (result.lightBeam) {
      result.lightBeam.show();
    }

    this.experience.scene.add(result.model);
    this.currentSelectedModel = result.model;
  }

  cleanPreviousSelection() {
    // supprimer le modèle 3D de la scène
    if (this.currentSelectedModel) {
      this.experience.scene.remove(this.currentSelectedModel);
      this.currentSelectedModel = null;
    }

    // supprimer le dossier de debug s'il existe
    if (this.currentInstanceData && this.currentInstanceData.debugFolder) {
      this.currentInstanceData.debugFolder.destroy();
      this.currentInstanceData = null;
    }
  }

  createDebug() {
    if (this.experience.debug.active) {
      // suppr l'ancien debug pour rafraichir les params (numObjs)
      this.destroyDebug();

      this.debugFolder = this.debug.ui.addFolder("Select");
      // choix de l'id de l'objet a lancer
      this.debugFolder
        .add(this, "selectedId", 1, this.numberOfObjects, 1)
        .name("selectedId")
        .onChange(() => {
          this.setSelectedObject();
        });

      // add function to delete the object
      const debugObject = {
        validateChoice: () => {
          this.destroyElements();
          this.objectToLaunch = this.selectedObject;
          if (this.currentSelectedModel) {
            // this.experience.scene.remove(this.currentSelectedModel);
            this.cleanPreviousSelection();
          }
          this.destroyDebug();

          // clean the music playing
          if (this.currentSelectedMusic) {
            this.selectedObjectsMusic[this.selectedObject.name] =
              this.currentSelectedMusic;
          }
          this.currentSelectedMusic?.pause();
          this.currentSelectedMusic = null;
          this.soundManager.soundLibrary.fx.buttonValid.play();
          this.trigger("objectSelected");
        },
      };
      this.debugFolder.add(debugObject, "validateChoice");
    }
  }

  destroyDebug() {
    if (this.debugFolder) {
      this.debugFolder.destroy();
      this.debugFolder = null;
    }
  }

  destroyElements() {
    if (this.currentSelectedModel) {
      gsap.to(this.currentSelectedModel.position, {
        x: this.wheelPosition.x,
        y: this.wheelPosition.y,
        z: this.wheelPosition.z * 10,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          this.experience.scene.remove(this.currentSelectedModel);
        },
      });
    }
    for (let object of this.displayedModels) {
      gsap.to(object.position, {
        x: this.wheelPosition.x,
        y: this.wheelPosition.y,
        z: this.wheelPosition.z * 10,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          this.experience.scene.remove(object);
        },
      });
    }
  }
}
