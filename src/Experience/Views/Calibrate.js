import EventEmitter from "../Utils/EventEmitter";
import Experience from "../Experience";
import gsap from "gsap";

export default class Calibrate extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.pictureManager = this.experience.pictureManager;
    this.debug = this.experience.debug;
    this.connection = this.experience.connection;
    this.currentCalibrateStep = 1;
  }

  start() {
    this.calibrateDiv = document.querySelector(
      ".video-container.calibrate-screen"
    );

    this.calibrate2Div = document.querySelector(
      ".video-container.calibrate2-screen"
    );

    this.introDiv = document.querySelector(
      ".video-container.introduction-screen"
    );

    this.createDebug();
  }

  firstCalibrateEnd() {
    // Fade entre la 1ere et 2eme video de calibrage
    const calibrateFadeTimeline = gsap.timeline();

    calibrateFadeTimeline
      .to(this.calibrate2Div, {
        duration: 1,
        opacity: 1,
        ease: "power3.out",
      })
      .to(
        this.calibrateDiv,
        {
          duration: 1,
          opacity: 0,
          ease: "power3.in",
          onComplete: () => {
            this.calibrateDiv.style.display = "none";
            this.calibrateDiv.remove();
            // this.end();
            this.currentCalibrateStep = 2;
          },
        },
        "-=1"
      );
  }

  end() {
    const calibrateFadeTimeline = gsap.timeline();

    calibrateFadeTimeline
      .to(this.introDiv, {
        duration: 1,
        opacity: 1,
        ease: "power3.out",
      })
      .to(
        this.calibrate2Div,
        {
          duration: 1,
          opacity: 0,
          ease: "power3.in",
          onComplete: () => {
            this.calibrate2Div.style.display = "none";
            this.calibrate2Div.remove();
            this.destroyDebug();
            this.trigger("calibrateEnd");
          },
        },
        "-=1"
      );
  }

  createDebug() {
    if (this.experience.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Calibrate");

      const debugObject = {
        passFirstCalibrate: () => {
          this.firstCalibrateEnd();
        },
        pass: () => {
          if (this.currentCalibrateStep === 1) {
            this.firstCalibrateEnd();
          } else {
            this.end();
          }
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
