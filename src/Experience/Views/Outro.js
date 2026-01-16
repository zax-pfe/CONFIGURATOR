import EventEmitter from "../Utils/EventEmitter";
import Experience from "../Experience";

export default class Outro extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.size = this.experience.sizes;
    this.pictureManager = this.experience.pictureManager;
    this.debug = this.experience.debug;
    this.connection = this.experience.connection;
  }

  start() {
    this.titleDiv = document.createElement("div");

    this.pictureManager.displayPicture();
    
    this.pictureManager.displayPicture(
      "outro-picture", // class CSS pour le div principal
      this.pictureManager.pictures[0], // source de l'image du screenshot
      "images/cadre-photo.png", // source de l'image du cadre
      "screenshot", // class CSS pour l'image du screenshot
      "cadre", // alt du cadre
      { x: 100, y: 500 }, // position de l'image
      0 // angle de rotation de l'image
    );
    // this.pictureManager.displayPicture(
    //   (position = { x: 40, y: 40 }),
    //   (angle = 0)
    // );

    this.createDebug();
  }

  end() {
    this.destroyDebug();
    if (this.titleDiv) {
      document.body.removeChild(this.titleDiv);
      this.titleDiv = null;
    }
    this.trigger("outroEnd");
  }

  createDebug() {
    if (this.experience.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Outro");

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
