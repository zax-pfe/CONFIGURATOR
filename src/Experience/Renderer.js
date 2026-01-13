import * as THREE from "three";
import Experience from "./Experience.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { DotScreenPass } from "three/addons/postprocessing/DotScreenPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import { BokehPass } from "three/examples/jsm/postprocessing/BokehPass";

export default class Renderer {
  constructor() {
    // console.log("Renderer initialized");
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    this.instance.toneMapping = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    // this.instance.toneMappingExposure = 2.5;

    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setClearColor("#211d20");
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));

    this.composer = new EffectComposer(this.instance);
    this.composer.setSize(this.sizes.width, this.sizes.height);

    const renderPass = new RenderPass(this.scene, this.camera.instance);
    this.composer.addPass(renderPass);

    const bokehPass = new BokehPass(this.scene, this.camera.instance, {
      focus: 1000,
      aperture: 50,
      maxblur: 0.002,
    });

    this.composer.addPass(bokehPass);

    const unrealBloomPass = new UnrealBloomPass();
    unrealBloomPass.strength = 0.3;
    unrealBloomPass.radius = 1;
    unrealBloomPass.threshold = 0.6;
    this.composer.addPass(unrealBloomPass);

    // const pass = new DotScreenPass(new THREE.Vector2(0, 0), 0.5, 0.8);
    // this.composer.addPass(pass);

    const fxaaPass = new ShaderPass(FXAAShader);
    fxaaPass.material.uniforms["resolution"].value.set(
      1 / this.sizes.width,
      1 / this.sizes.height
    );
    this.composer.addPass(fxaaPass);

    // const filmPass = new FilmPass(1, 0.5, 2048, false);
    // this.composer.addPass(filmPass);

    // const outputPass = new OutputPass();
    // this.composer.addPass(outputPass);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }

  update() {
    // this.instance.render(this.scene, this.camera.instance);
    this.composer.render();
  }
}
