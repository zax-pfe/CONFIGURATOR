import Experience from "../../Experience";
import Physics from "../../Utils/Physics.js";
import SceneGround from "./SceneGround.js";
import ScenePodium from "./ScenePodium.js";
import SceneWall from "./SceneWalls.js";

export default class SceneHitBox {
  constructor() {
    console.log("SceneHitBox initialized");

    this.setup();
    this.create();
  }

  setup() {
    //create the wall in the back
    this.backWallName = "backWall";
    this.backWallScale = { x: 1, y: 1, z: 1 };
    this.backWallPositions = { x: 0, y: 18, z: -18 };
    this.backWallRotation = { x: 0, y: 0, z: 0 };
    this.backWallMass = 0;
    this.backWallDimmensions = { width: 6, height: 6 };
    this.backWallDebug = false;

    //create the left Wall
    this.leftWallName = "leftWall";
    this.leftWallScale = { x: 1, y: 1, z: 1 };
    // this.leftWallPositions = { x: -12.5, y: 12.5, z: 0 };
    this.leftWallPositions = { x: -18, y: 18, z: 0 };
    this.leftWallRotation = { x: 0, y: Math.PI * 0.5, z: 0 };
    this.leftWallMass = 0;
    this.leftWallDimmensions = { width: 6, height: 6 };
    this.leftWallDebug = false;

    //create the right
    this.rightWallName = "rightWall";
    this.rightWallScale = { x: 1, y: 1, z: 1 };
    // this.rightWallPositions = { x: -12.5, y: 12.5, z: 0 };
    this.rightWallPositions = { x: 18, y: 18, z: 0 };
    this.rightWallRotation = { x: 0, y: -Math.PI * 0.5, z: 0 };
    this.rightWallMass = 0;
    this.rightWallDimmensions = { width: 6, height: 6 };
    this.rightWallDebug = false;

    this.leftBacktWallName = "leftBacktWall";
    this.leftBacktWallScale = { x: 1, y: 1, z: 1 };
    // this.leftBacktWallPositions = { x: -12.5, y: 12.5, z: 0 };
    this.leftBacktWallPositions = { x: -12, y: 18, z: -12 };
    this.leftBacktWallRotation = { x: 0, y: Math.PI * 0.25, z: 0 };
    this.leftBacktWallMass = 0;
    this.leftBacktWallDimmensions = { width: 6, height: 6 };
    this.leftBacktWallDebug = false;

    this.rightBacktWallName = "rightBacktWall";
    this.rightBacktWallScale = { x: 1, y: 1, z: 1 };
    // this.rightBacktWallPositions = { x: -12.5, y: 12.5, z: 0 };
    this.rightBacktWallPositions = { x: 12, y: 18, z: -12 };
    this.rightBacktWallRotation = { x: 0, y: -Math.PI * 0.25, z: 0 };
    this.rightBacktWallMass = 0;
    this.rightBacktWallDimmensions = { width: 6, height: 6 };
    this.rightBacktWallDebug = false;
  }

  create() {
    this.sceneGround = new SceneGround();
    this.scenePodium = new ScenePodium();
    this.backWall = new SceneWall(
      this.backWallName,
      this.backWallScale,
      this.backWallPositions,
      this.backWallRotation,
      this.backWallMass,
      this.backWallDimmensions,
      this.backWallDebug
    );
    this.leftWall = new SceneWall(
      this.leftWallName,
      this.leftWallScale,
      this.leftWallPositions,
      this.leftWallRotation,
      this.leftWallMass,
      this.leftWallDimmensions,
      this.leftWallDebug
    );
    this.rightWall = new SceneWall(
      this.rightWallName,
      this.rightWallScale,
      this.rightWallPositions,
      this.rightWallRotation,
      this.rightWallMass,
      this.rightWallDimmensions,
      this.rightWallDebug
    );
    this.leftBacktWall = new SceneWall(
      this.leftBacktWallName,
      this.leftBacktWallScale,
      this.leftBacktWallPositions,
      this.leftBacktWallRotation,
      this.leftBacktWallMass,
      this.leftBacktWallDimmensions,
      this.leftBacktWallDebug
    );
    this.rightBacktWall = new SceneWall(
      this.rightBacktWallName,
      this.rightBacktWallScale,
      this.rightBacktWallPositions,
      this.rightBacktWallRotation,
      this.rightBacktWallMass,
      this.rightBacktWallDimmensions,
      this.rightBacktWallDebug
    );
  }

  update() {
    this.sceneGround.update();
    this.scenePodium.update();
    this.backWall.update();
    this.leftWall.update();
    this.rightWall.update();
    this.leftBacktWall.update();
    this.rightBacktWall.update();
  }
}
