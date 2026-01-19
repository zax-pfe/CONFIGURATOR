import EventEmitter from "./EventEmitter";
import Experience from "../Experience.js";
import gsap from "gsap";

export default class SoundManager extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.time = this.experience.time;

    this.soundLibrary = {};
    this.setupDrum();
    this.setupGuitar();
    this.setupOrange();
    this.setupRose();
    this.setupVert();
    this.setupViolet();
    this.setUpFx();
    this.setupHitSound();
    this.setUpAmbianceSounds();

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

  setUpAmbianceSounds() {
    const ambianceFunk = new Audio("/sounds/ambiance/foreverFunk.mp3");
    this.soundLibrary.ambiance = { funk: ambianceFunk };
  }

  setupDrum() {
    const drumSound = new Audio("/sounds/instruments/drumLoop.mp3");
    const drumSound2 = new Audio("/sounds/instruments/drumLoop2.mp3");
    this.soundLibrary.drums = { regular: drumSound, alternate: drumSound2 };
  }

  setupGuitar() {
    const guitar1 = new Audio("/sounds/instruments/guitar/guitar1.wav");
    const guitar2 = new Audio("/sounds/instruments/guitar/guitar2.wav");
    const guitar3 = new Audio("/sounds/instruments/guitar/guitar3.wav");
    const guitar4 = new Audio("/sounds/instruments/guitar/guitar4.wav");
    this.soundLibrary.guitar = {
      guitar1: guitar1,
      guitar2: guitar2,
      guitar3: guitar3,
      guitar4: guitar4,
    };
  }

  setupOrange() {
    const orange1 = new Audio("/sounds/instruments/orange/Orange1.mp3");
    const orange2 = new Audio("/sounds/instruments/orange/Orange2.mp3");
    const orange3 = new Audio("/sounds/instruments/orange/Orange3.mp3");
    const orange4 = new Audio("/sounds/instruments/orange/Orange4.mp3");
    const orange5 = new Audio("/sounds/instruments/orange/Orange5.mp3");
    this.soundLibrary.orange = {
      orange1: orange1,
      orange2: orange2,
      orange3: orange3,
      orange4: orange4,
      orange5: orange5,
    };
  }

  setupRose() {
    const rose1 = new Audio("/sounds/instruments/rose/Rose1.mp3");
    const rose2 = new Audio("/sounds/instruments/rose/Rose2.mp3");
    const rose3 = new Audio("/sounds/instruments/rose/Rose3.mp3");
    const rose4 = new Audio("/sounds/instruments/rose/Rose4.mp3");
    const rose5 = new Audio("/sounds/instruments/rose/Rose5.mp3");
    this.soundLibrary.rose = {
      rose1: rose1,
      rose2: rose2,
      rose3: rose3,
      rose4: rose4,
      rose5: rose5,
    };
  }

  setupVert() {
    const vert1 = new Audio("/sounds/instruments/vert/Vert1.mp3");
    const vert2 = new Audio("/sounds/instruments/vert/Vert2.mp3");
    const vert3 = new Audio("/sounds/instruments/vert/Vert3.mp3");
    const vert4 = new Audio("/sounds/instruments/vert/Vert4.mp3");
    const vert5 = new Audio("/sounds/instruments/vert/Vert5.mp3");
    this.soundLibrary.vert = {
      vert1: vert1,
      vert2: vert2,
      vert3: vert3,
      vert4: vert4,
      vert5: vert5,
    };
  }

  setupViolet() {
    const violet1 = new Audio("/sounds/instruments/violet/Violet1.mp3");
    const violet2 = new Audio("/sounds/instruments/violet/Violet2.mp3");
    const violet3 = new Audio("/sounds/instruments/violet/Violet3.mp3");
    const violet4 = new Audio("/sounds/instruments/violet/Violet4.mp3");
    const violet5 = new Audio("/sounds/instruments/violet/Violet5.mp3");
    this.soundLibrary.violet = {
      violet1: violet1,
      violet2: violet2,
      violet3: violet3,
      violet4: violet4,
      violet5: violet5,
    };
  }

  setUpFx() {
    const buttonValid = new Audio("/sounds/fx/valide.mp3");
    const throwSound = new Audio("/sounds/fx/throw.mp3");
    const hoverSound = new Audio("/sounds/fx/hover.mp3");

    this.soundLibrary.fx = {
      buttonValid: buttonValid,
      throw: throwSound,
      hover: hoverSound,
    };
  }

  playHitSound = (collision) => {
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

  fadeInMusic(music, duration = 2, targetVolume = 1) {
    music.volume = 0;
    music.loop = true;
    music.currentTime = this.currentTimeInLoop;
    music.play();

    const startTime = performance.now();

    const fade = (now) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      music.volume = progress * targetVolume;

      if (progress < 1) {
        requestAnimationFrame(fade);
      }
    };

    requestAnimationFrame(fade);
  }

  fadeMusic(music, type = "out", duration = 2, targetVolume = 0) {
    const initialVolume = music.volume;
    gsap.fromTo(
      music,
      { volume: type === "out" ? initialVolume : 0 },
      {
        volume: type === "out" ? 0 : targetVolume,
        duration: duration,
        onComplete: () => {
          if (type === "out") {
            music.pause();
          }
        },
      },
    );
  }

  // Loop dans selectedMusic et lance les musiques
  playSelectedMusics(fade = false) {
    for (const key in this.selectedObjectsMusic) {
      const music = this.selectedObjectsMusic[key];
      this.startMusic(music);
    }

    if (fade) {
      for (const key in this.selectedObjectsMusic) {
        const music = this.selectedObjectsMusic[key];
        // this.fadeInMusic(music, 4, 1);
        this.fadeMusic(music, "in", 5, 1);
      }
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
