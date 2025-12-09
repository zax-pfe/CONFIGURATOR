import Experience from "../../Experience";
import Physics from "../../Utils/Physics.js";
import SceneGround from "./SceneGround.js";
import ScenePodium from "./ScenePodium.js";
import SceneWall from "./SceneWalls.js";
import SceneColumn from "./SceneColumn.js";
import SceneTorus from "./SceneTorus.js";

export default class SceneHitBox {
  constructor() {
    // console.log("SceneHitBox initialized");

    this.activateWireFrame = false;

    this.setup();
    this.create();
  }

  setup() {
    //create the wall in the back
    this.backWallName = "backWall";
    this.backWallPositions = { x: 0, y: 18, z: -30 };
    this.backWallRotation = { x: 0, y: 0, z: 0 };

    // debug, si active, on voit le mesh en wireframe
    // + un debug UI qui permet de modifier les parametres
    this.backWallDebug = false;

    //create the left Wall
    this.leftWallName = "leftWall";
    this.leftWallPositions = { x: -30, y: 18, z: 12 };
    this.leftWallRotation = { x: 0, y: Math.PI * 0.5, z: 0 };

    //create the right
    this.rightWallName = "rightWall";
    this.rightWallPositions = { x: 30, y: 18, z: 12 };
    this.rightWallRotation = { x: 0, y: -Math.PI * 0.5, z: 0 };

    this.leftBacktWallName = "leftBacktWall";
    this.leftBacktWallPositions = { x: -20, y: 18, z: -30 };
    this.leftBacktWallRotation = { x: 0, y: Math.PI * 0.25, z: 0 };

    this.rightBacktWallName = "rightBacktWall";
    this.rightBacktWallPositions = { x: 20, y: 18, z: -30 };
    this.rightBacktWallRotation = { x: 0, y: -Math.PI * 0.25, z: 0 };

    this.sceneColumnLeftName = "column left";
    this.sceneColumnLeftPositions = { x: -9.2, y: 9, z: 5.5 };
    this.sceneColumnLeftRotation = { x: 0, y: -Math.PI * 0.25, z: 0 };

    this.sceneColumnRightName = "column right";
    this.sceneColumnRightPositions = { x: 9.2, y: 9, z: 5.5 };
    this.sceneColumnRightRotation = { x: 0, y: -Math.PI * 0.25, z: 0 };

    this.sceneColumnBackRightName = "column back right";
    this.sceneColumnBackRightPositions = { x: 4.6, y: 9, z: -9.5 };
    this.sceneColumnBackRightRotation = { x: 0, y: -Math.PI * 0.25, z: 0 };

    this.sceneColumnBackLeftName = "column back left";
    this.sceneColumnBackLeftPositions = { x: -5.2, y: 9, z: -9.5 };
    this.sceneColumnBackLeftRotation = { x: 0, y: -Math.PI * 0.25, z: 0 };
  }

  create() {
    this.sceneGround = new SceneGround(false);
    this.scenePodium = new ScenePodium(true);
    this.backWall = new SceneWall(
      this.backWallName,
      this.backWallPositions,
      this.backWallRotation
    );
    this.leftWall = new SceneWall(
      this.leftWallName,
      this.leftWallPositions,
      this.leftWallRotation
    );
    this.rightWall = new SceneWall(
      this.rightWallName,
      this.rightWallPositions,
      this.rightWallRotation
    );
    this.leftBacktWall = new SceneWall(
      this.leftBacktWallName,
      this.leftBacktWallPositions,
      this.leftBacktWallRotation
    );
    this.rightBacktWall = new SceneWall(
      this.rightBacktWallName,
      this.rightBacktWallPositions,
      this.rightBacktWallRotation
    );

    this.sceneColumnLeft = new SceneColumn(
      this.sceneColumnLeftName,
      this.sceneColumnLeftPositions,
      this.sceneColumnLeftRotation
    );
    this.sceneColumnRight = new SceneColumn(
      this.sceneColumnRightName,
      this.sceneColumnRightPositions,
      this.sceneColumnRightRotation
    );
    this.sceneColumnBackRight = new SceneColumn(
      this.sceneColumnBackRightName,
      this.sceneColumnBackRightPositions,
      this.sceneColumnBackRightRotation
    );
    this.sceneColumnBackLeft = new SceneColumn(
      this.sceneColumnBackLeftName,
      this.sceneColumnBackLeftPositions,
      this.sceneColumnBackLeftRotation
    );
    this.sceneTorus = new SceneTorus();
  }

  update() {
    this.sceneGround.update();
    this.scenePodium.update();
    this.backWall.update();
    this.leftWall.update();
    this.rightWall.update();
    this.leftBacktWall.update();
    this.rightBacktWall.update();
    this.sceneColumnLeft.update();
    this.sceneColumnRight.update();
    this.sceneColumnBackRight.update();
    this.sceneColumnBackLeft.update();
  }
}
