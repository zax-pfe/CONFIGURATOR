import EventEmitter from "../Utils/EventEmitter";
import Experience from "../Experience";
import gsap from "gsap";
// cette vue, affiche l'ecran titre de l'experience
// avec le logo et le bouton pour commencer l'experience
// ecoute le telephone -> si start, lance la prochaine scene (introduction)

export default class TitleScreen extends EventEmitter {
  constructor() {
    super();
    // console.log("TitleScreen initialized");
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.connection = this.experience.connection;
    this.pictureManager = this.experience.pictureManager;
    this.soundManager = this.experience.soundManager;
    this.mobileData = this.experience.mobileData;

    this.mobileData.on("skipTitle", () => {
      this.end();
    });
  }

  start() {
    // Recupere la div de l'ecran titre et l'affiche
    this.titleDiv = document.querySelector(".video-container.title-screen");
    // recupere la div de l'ecran calibrage

    // this.pictureManager.displayPictureCanvas();
    this.calibrateDiv = document.querySelector(
      ".video-container.calibrate-screen",
    );

    // Affiche l'écran en définissant display et opacity
    if (this.titleDiv) {
      this.titleDiv.style.opacity = "1";
    }

    this.createDebug();
    this.soundManager.soundLibrary.ambiance.introOutro.volume(1);
    this.soundManager.soundLibrary.ambiance.introOutro.play();
  }

  end() {
    this.soundManager.soundLibrary.ambiance.introOutro.stop();
    this.soundManager.soundLibrary.ambiance.introOutro.volume(0.3);

    this.overlay = document.querySelector(".black-overlay");
    this.overlay.style.opacity = 1;

    // on fait fade out l'ecran titre et fade in l'ecran calibrage
    const titleFadeTimeline = gsap.timeline();

    titleFadeTimeline
      .to(this.calibrateDiv, {
        duration: 1,
        opacity: 1,
        ease: "power3.out",
      })
      .to(
        this.titleDiv,
        {
          duration: 1,
          opacity: 0,
          ease: "power3.in",
          onComplete: () => {
            this.titleDiv.style.display = "none";
            this.titleDiv.remove();
            this.destroyDebug();
            this.trigger("titleScreenEnd");
            // this.soundManager.soundLibrary.ambiance.funk.pause();
          },
        },
        "-=1",
      );
  }

  createDebug() {
    if (this.experience.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("TitleScreen");

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
