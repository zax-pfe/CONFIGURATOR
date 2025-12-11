import EventEmitter from "./EventEmitter";

export default class SoundManager extends EventEmitter {
  constructor() {
    super();
    this.soundLibrary = {};
    this.setupDrum();
    this.setupHitSound();

    this.impactSound = null;
    this.playSound = null;
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

  playMusic = () => {
    if (this.playSound) {
      this.playSound.loop = true;
      this.playSound.volume = 0.5;
      this.playSound.play();
    }
  };

  startMusic(music) {
    music.loop = true;
    music.volume = 0.5;
    music.play();
  }
}
