import EventEmitter from "./EventEmitter";
import TitleScreen from "../Views/TitleScreen";
import Introduction from "../Views/Introduction";
import SelectAndLaunch from "../Views/SelectAndLaunch";
import ShowExperience from "../Views/ShowExperience";
import Outro from "../Views/Outro";
import Experience from "../Experience";
import Calibrate from "../Views/Calibrate";
import UsePhoneBtn from "../Components/UsePhoneBtn"
// cette classe prend les differentes scene de l'experience
// ecoute cette scene,
// et passe d'une scene a l'autre selon les event renvoyés par les scenes

export default class ControlManager extends EventEmitter {
  constructor() {
    super();
    // console.log("ControlManager initialized");
    this._titleScreen = new TitleScreen();
    this._introduction = new Introduction();
    this._selectAndLaunch = new SelectAndLaunch();
    this._showExperience = new ShowExperience();
    this._outro = new Outro();
    this._calibrate = new Calibrate();

    this.experience = new Experience();
    this.connection = this.experience.connection;

    this.restart();

    //// ++++++++++++++++++++ ROUTING DES SCENES +++++++++++++++++++++++++////

    this._titleScreen.on("titleScreenEnd", () => {
      this.currentScene = "calibrate";
      this.connection.sendMessage("calibrate");
      this.goToScene("calibrate");
    });
    this._calibrate.on("calibrateEnd", () => {
      this.currentScene = "introduction";
      this.connection.sendMessage("introduction");
      this.goToScene("introduction");
    });

    this._introduction.on("introductionEnd", () => {
      this.currentScene = "selectAndLaunch";
      this.connection.sendMessage("selectAndLaunch");
      this.goToScene("selectAndLaunch");
    });
    this._selectAndLaunch.on("selectAndLaunchEnd", () => {
      this.currentScene = "show";
      this.connection.sendMessage("show");
      this.goToScene("showExperience");
    });
    this._showExperience.on("showExperienceEnd", () => {
      this.currentScene = "outro";
      this.connection.sendMessage("outro");
      this.goToScene("outro");
    });
    this._outro.on("outroEnd", () => {
      this.experience.restart();
      // this.currentScene = "title";
      // this.connection.sendMessage("title");
      // this.goToScene("titleScreen");
    });
  }

  goToScene(scene) {
    this.currentScene = scene;

    if (scene === "titleScreen") this._titleScreen.start();
    if (scene === "calibrate") this._calibrate.start();
    if (scene === "introduction") this._introduction.start();
    if (scene === "selectAndLaunch") this._selectAndLaunch.start();
    if (scene === "showExperience") this._showExperience.start();
    if (scene === "outro") this._outro.start();
  }

  restart() {
    //// ++++++++++++++++++++ CREATIONS DU HTML +++++++++++++++++++++++++////

    this.titleScreen = this.screenCreation(
      "title-screen",
      "videos/Video_Intro_Oyo_Rendu.mp4",
    );

    this.calibrateScreen = this.screenCreation(
      "calibrate-screen",
      "videos/Calibrage_1.mp4",
      "Utilisation du téléphone"
    );

    this.calibrate2Screen = this.screenCreation(
      "calibrate2-screen",
      "videos/Calibrage_2.mp4",
      "Utilisation du téléphone"
    );

    this.introScreen = this.screenCreation(
      "introduction-screen",
      "videos/oyo_teaser.mp4",
      "Passe l'intro",
      false, //autoplay
      false, //loop
      false, //muted
      false, //playsInline
      true, //paused
    );

    //// ++++++++++++++++++++ AJOUT DU HTML AU DOM +++++++++++++++++++++++++////
    document.body.appendChild(this.titleScreen);
    document.body.appendChild(this.calibrateScreen);
    document.body.appendChild(this.calibrate2Screen);
    document.body.appendChild(this.introScreen);

    this.currentScene = "title";
    this.connection.sendMessage("title");
    this.goToScene("titleScreen");

    // this.currentScene = "selectAndLaunch";
    // this.connection.sendMessage("selectAndLaunch");
    // this.goToScene("selectAndLaunch");
  }

  screenCreation(
    divClass,
    videoSrc,
    btnText = null,
    autoplay = true,
    loop = true,
    muted = true,
    playsInline = true,
    paused = false,
  ) {
    const container = document.createElement("div");
    container.className = `video-container ${divClass}`;

    const video = document.createElement("video");
    video.className = "video";
    video.src = videoSrc;
    video.autoplay = autoplay;
    video.loop = loop;
    video.muted = muted;
    video.playsInline = playsInline;
    if (paused) video.pause();

    container.appendChild(video);

    if (btnText) {
      new UsePhoneBtn(btnText, container);
    }

    // document.body.appendChild(container);
    return container;
  }
}
