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

    // this.connection.on("message", (data) => {
    //   if (data === "start") {
    //     this.end();
    //   }
    // });
  }

  start() {
    // Recupere la div de l'ecran titre et l'affiche
    this.titleDiv = document.querySelector(".title-screen");

    this.createDebug();
  }

  end() {
    gsap.to(this.titleDiv, {
      duration: 2,
      opacity: 0,
      ease: "power2.out",
      onComplete: () => {
        this.titleDiv.style.display = "none";
        this.titleDiv = null;
        this.destroyDebug();
        this.trigger("titleScreenEnd");
      },
    });
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
