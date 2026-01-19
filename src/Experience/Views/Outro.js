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
    this.selectedStar = null;
  }

  start() {
    // affichage des images de l'outro
    this.createAndDisplayStar();

    this.pictureManager.pictures.forEach((pictureSrc, index) => {
      this.pictureManager.displayPicture(
        "outro-picture", // class CSS pour le div principal
        pictureSrc, // source de l'image du screenshot
        "images/cadre-photo.png", // source de l'image du cadre
        "screenshot", // class CSS pour l'image du screenshot
        "cadre", // alt du cadre
        { x: 100 * Math.random(), y: index * 180 }, // position de l'image
        (Math.random() - 0.5) * 60, // angle de rotation de l'image
      );
    });

    this.createDebug();
  }

  end() {
    this.pictureManager.destroyPictures();
    this.destroyDebug();
    this.trigger("outroEnd");
  }

  createAndDisplayStar() {
    console.log("outro - createAndDisplayStar");
    // creation de la star selectionné
    this.result = this.selectedStar.create();
    console.log(" result outro", this.result);

    this.result.model.position.set(0, 15, 35);

    this.experience.scene.add(this.result.model);
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
