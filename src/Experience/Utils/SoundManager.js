import EventEmitter from "./EventEmitter";
import Experience from "../Experience.js";

export default class SoundManager extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.time = this.experience.time;

    this.soundLibrary = {};
    this.setupDrum();
    this.setupHitSound();

    this.impactSound = null;

    // time seconds of the loop
    this.loopTime = 8;

    // permet de calculer le temps écoulé dans la boucle
    // et de boucler toutes les loopTime secondes
    this.currentTimeInLoop = 0;
    this.previousTimeInLoop = 0;

    // Liste des musiques des objets sélectionnés
    // cette liste est mise a jour depuis SelectObject
    this.selectedObjectsMusic = {};
  }

  setupHitSound() {
    const hitSound = new Audio("/sounds/collisionSound/hit.mp3");
    const bambooHitSound = new Audio("/sounds/collisionSound/bambooHit.mp3");
    const punchSound = new Audio("/sounds/collisionSound/punch.mp3");

    this.soundLibrary.hit = {
      hit: hitSound,
      bamboo: bambooHitSound,
      punch: punchSound,
    };
  }

  setupDrum() {
    const drumSound = new Audio("/sounds/instruments/drumLoop.mp3");
    const drumSound2 = new Audio("/sounds/instruments/drumLoop2.mp3");
    this.soundLibrary.drums = { regular: drumSound, alternate: drumSound2 };
  }

  playHitSound = (collision) => {
    // console.log(collision);
    const impactStrenght = collision.contact.getImpactVelocityAlongNormal();

    if (impactStrenght > 2.5) {
      this.impactSound.volume = Math.random();
      this.impactSound.currentTime = 0;
      this.impactSound.play();
    }
  };

  startMusic(music) {
    music.loop = true;
    music.volume = 0.5;
    music.currentTime = this.currentTimeInLoop;
    music.play();
  }

  // Loop dans selectedMusic et lance les musiques
  playSelectedMusics() {
    for (const key in this.selectedObjectsMusic) {
      const music = this.selectedObjectsMusic[key];
      this.startMusic(music);
    }
  }

  stopSelectedMusics() {
    for (const key in this.selectedObjectsMusic) {
      const music = this.selectedObjectsMusic[key];
      music.pause();
    }
  }

  // stopMusic(music) {
  //   music.pause();
  //   music.currentTime = 0;
  // }

  update() {
    // Temps écoulé depuis le début de l'application en secondes
    this.currentTimeInLoop = this.time.elapsed / 1000 - this.previousTimeInLoop;
    if (this.currentTimeInLoop >= this.loopTime) {
      this.currentTimeInLoop = 0;
      this.previousTimeInLoop += this.loopTime;
    }
  }
}
