import Experience from "../../../Experience.js";
import Mesh from "../../../Utils/Mesh.js";
import { gsap } from 'gsap'

export default class Intern {
  constructor() {
    // setupt the experience
    this.experience = new Experience();
    this.scene = this.experience.scene;
    // this.resource = this.experience.resources.items.SceneFinalModel;
    this.resource = this.experience.resources.items.Intern;
    this.setup();
  }

  setup() {
    this.positions = { x: 20, y: -1.5, z: 0 };
    this.scale = { x: 1.5, y: 1.5, z: 1.5 };
    this.rotation = { x: 0, y: 3.14 - 0.25, z: 0 };
    this.name = "Intern";
  }

  create() {
    this.Mesh = new Mesh(
      this.positions,
      this.scale,
      this.rotation,
      this.resource,
      this.name
    );
    this.intern = this.Mesh.model.children[0];
    this.slingshot = this.Mesh.model.children[1];
    console.log(this.intern, this.slingshot)
  }

  throwAnimation(){
    // stagiaire
    gsap.to(this.intern.position, {
      y: "+=" + 1,
      duration: 0.25,
      repeat: 1,
      yoyo: true,
      delay: 1.2,
      ease: "power1.inOut",
    })
    gsap.to(this.intern.rotation, {
      x: 0.25,
      duration: 0.25,
      repeat: 1,
      yoyo: true,
      delay: 1.2,
      ease: "power1.inOut",
    })
    // lance-pierre
    const tl = gsap.timeline();
    tl.to(this.slingshot.rotation, {
      x: 1,
      duration: 1,
      delay: 0.5,
      ease: "power1.inOut",
    })
    tl.to(this.slingshot.rotation, {
      x: 0,
      duration: 0.5,
      ease: "bounce.out",
    }, "-=0.2")
  }

  destroy(){
    this.scene.remove(this.Mesh.model)
  }
}
