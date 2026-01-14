import EventEmitter from "../Utils/EventEmitter";
import Experience from "../Experience";
// cette vue,lance l'introduction de l'experience
// a la fin de la vidéo -> envoie un event pour lancer la scene suivante

export default class Introduction extends EventEmitter {
  constructor() {
    super();
    // console.log("Introduction initialized");
    this.experience = new Experience();
    this.debug = this.experience.debug;

    this.connection = this.experience.connection;
  }

  start() {
    console.log("Introduction start");

    this.introDiv = document.querySelector(".intro-screen");

    this.createDebug();
  }

  end() {
    if (this.introDiv) {
      document.body.removeChild(this.introDiv);

      this.introDiv = null;
    }
    this.destroyDebug();
    this.trigger("introductionEnd");
  }

  createDebug() {
    if (this.experience.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Introduction");

      const debugObject = {
        pass: () => {
          this.end();
        },
      };
      this.debugFolder.add(debugObject, "pass");
    }
  }

  destroyDebug() {
    if (this.debugFolder) {
      this.debugFolder.destroy();
      this.debugFolder = null;
    }
  }
}
