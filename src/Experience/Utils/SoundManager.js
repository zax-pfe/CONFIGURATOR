import EventEmitter from "./EventEmitter";

export default class SoundManager extends EventEmitter {
  constructor() {
    super();
    this.hitSound = new Audio("/sounds/hit.mp3");
    this.bambooHitSound = new Audio("/sounds/bambooHit.mp3");
    this.punchSound = new Audio("/sounds/punch.mp3");
    this.selectedSound = null;
  }

  playHitSound = (collision) => {
    // console.log(collision);
    const impactStrenght = collision.contact.getImpactVelocityAlongNormal();

    if (impactStrenght > 2.5) {
      this.selectedSound.volume = Math.random();
      this.selectedSound.currentTime = 0;
      this.selectedSound.play();
    }
  };
}
