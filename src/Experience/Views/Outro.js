import EventEmitter from "../Utils/EventEmitter";
import Experience from "../Experience";
import ConeLumiere from "../World/LightBlender/ConeLumiere";

export default class Outro extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.size = this.experience.sizes;
    this.pictureManager = this.experience.pictureManager;
    this.soundManager = this.experience.soundManager;
    this.debug = this.experience.debug;
    this.connection = this.experience.connection;
    this.selectedStar = null;
    this.frameList = [
      "imaes/frame1.png",
      "images/frame2.png",
      "images/frame3.png",
    ];
    this.positionList = [
      { x: "30vw", y: "35vh" },
      { x: "60vw", y: "35vh" },
      { x: "45vw", y: "55vh" },
    ];
    this.outroBackgrounds = [
      "images/outroScreen/outroDaft.png",
      "images/outroScreen/outroGirl.png",
      "images/outroScreen/outroRock.png",
    ];
    this.mobileData = this.experience.mobileData;

    // on ecoute le skip du mobile
    this.mobileData.on("skipOutro", () => {
      this.end();
    });
  }

  start() {
    console.log("picture taken in outro", this.pictureManager.pictures);
    this.soundManager.soundLibrary.ambiance.introOutro.volume(0.5);
    this.soundManager.soundLibrary.ambiance.introOutro.play();
    console.log("selected star outro", this.selectedStar);
    if (this.selectedStar === "DaftStar") {
      this.endScreenCreation(this.outroBackgrounds[0]);
    } else if (this.selectedStar === "GirlStar") {
      this.endScreenCreation(this.outroBackgrounds[1]);
    } else if (this.selectedStar === "RockStar") {
      this.endScreenCreation(this.outroBackgrounds[2]);
    }

    this.pictureManager.pictures.forEach((pictureSrc, index) => {
      this.pictureManager.displayPicture(
        "outro-picture", // class CSS pour le div principal
        pictureSrc, // source de l'image du screenshot
        "images/cadre-photo.png", // source de l'image du cadre
        "screenshot", // class CSS pour l'image du screenshot
        "cadre", // alt du cadre
        this.positionList[index], // position de l'image
        (Math.random() - 0.5) * 60, // angle de rotation de l'image
      );
    });

    this.createDebug();
  }

  end() {
    // this.pictureManager.destroyPictures();
    // this.destroyDebug();
    // this.trigger("outroEnd");
    window.location.reload();
  }

  // createAndDisplayStar() {
  //   console.log("outro - createAndDisplayStar");
  //   // creation de la star selectionné
  //   this.result = this.selectedStar.create();
  //   console.log(" result outro", this.result);

  //   this.result.model.position.set(0, 15, 35);

  //   this.experience.scene.add(this.result.model);
  // }

  endScreenCreation(imageSrc) {
    const container = document.createElement("div");
    container.className = `outro-container`;

    const image = document.createElement("img");
    image.className = "outro-image";
    image.src = imageSrc;

    container.appendChild(image);
    document.body.appendChild(container);
    return container;
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
