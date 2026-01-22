import EventEmitter from "./EventEmitter.js";

export default class Timer extends EventEmitter {
  constructor() {
    super();

    this.active = false;
    this.duration = 0;
    this.remaining = 30;
  }

  /**
   * Lance le timer
   * @param {number} seconds - Durée en secondes
   */
  start(seconds) {
    this.active = true;
    this.duration = seconds;
    this.remaining = seconds;
    
    console.log(`timer start for ${seconds} seconds`);
    this.trigger("timerStart");
  }

  stop() {
    this.active = false;
    this.remaining = 0;
    this.trigger("timerStop");
  }

  update(deltaTime) {
    if (!this.active) return;

    // deltaTime est en millisecondes, on convertit en secondes
    this.remaining -= deltaTime * 0.001;
    console.log(this.remaining.toFixed(0))
    if (this.remaining <= 0) {
      this.remaining = 0;
      this.active = false;
      this.trigger("timerEnd");
    }
  }

  // recuperer le temps formaté (ex: "00:45")
  getFormattedTime() {
    const minutes = Math.floor(this.remaining / 60);
    const seconds = Math.floor(this.remaining % 60);
    const m = minutes < 10 ? `0${minutes}` : minutes;
    const s = seconds < 10 ? `0${seconds}` : seconds;
    return `${m}:${s}`;
  }
}