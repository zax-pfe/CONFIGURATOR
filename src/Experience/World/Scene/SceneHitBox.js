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
    this.backWallScale = { x: 1, y: 1, z: 1 };
    this.backWallPositions = { x: 0, y: 18, z: -95.7 };
    this.backWallRotation = { x: 0, y: 0, z: 0 };
    this.backWallMass = 0;
    this.backWallDimmensions = { width: 6, height: 6 };

    // debug, si active, on voit le mesh en wireframe
    // + un debug UI qui permet de modifier les parametres
    this.backWallDebug = false;

    //create the left Wall
    this.leftWallName = "leftWall";
    this.leftWallScale = { x: 1, y: 1, z: 1 };
    this.leftWallPositions = { x: -67, y: 18, z: 12 };
    this.leftWallRotation = { x: 0, y: Math.PI * 0.5, z: 0 };
    this.leftWallMass = 0;
    this.leftWallDimmensions = { width: 6, height: 6 };
    this.leftWallDebug = false;

    //create the right
    this.rightWallName = "rightWall";
    this.rightWallScale = { x: 1, y: 1, z: 1 };
    this.rightWallPositions = { x: 69, y: 18, z: 12 };
    this.rightWallRotation = { x: 0, y: -1.38, z: 0 };
    this.rightWallMass = 0;
    this.rightWallDimmensions = { width: 6, height: 6 };
    this.rightWallDebug = false;

    this.leftBacktWallName = "leftBacktWall";
    this.leftBacktWallScale = { x: 1, y: 1, z: 1 };
    this.leftBacktWallPositions = { x: -48, y: 18, z: -85 };
    this.leftBacktWallRotation = { x: 0, y: Math.PI * 0.25, z: 0 };
    this.leftBacktWallMass = 0;
    this.leftBacktWallDimmensions = { width: 6, height: 6 };
    this.leftBacktWallDebug = false;

    this.rightBacktWallName = "rightBacktWall";
    this.rightBacktWallScale = { x: 1, y: 1, z: 1 };
    this.rightBacktWallPositions = { x: 41, y: 18, z: -81.7 };
    this.rightBacktWallRotation = { x: 0, y: -Math.PI * 0.25, z: 0 };
    this.rightBacktWallMass = 0;
    this.rightBacktWallDimmensions = { width: 6, height: 6 };
    this.rightBacktWallDebug = false;

    this.sceneColumnLeftName = "column left";
    this.sceneColumnLeftPositions = { x: -10.7, y: 7.5, z: -45.2 };
    this.sceneColumnLeftRotation = { x: 0, y: -Math.PI * 0.25, z: 0 };

    this.sceneColumnRightName = "column right";
    this.sceneColumnRightPositions = { x: 10.7, y: 7.5, z: -44.3 };
    this.sceneColumnRightRotation = { x: 0, y: -Math.PI * 0.25, z: 0 };

    this.sceneColumnBackRightName = "column back right";
    this.sceneColumnBackRightPositions = { x: 4.6, y: 7.5, z: -60 };
    this.sceneColumnBackRightRotation = { x: 0, y: -Math.PI * 0.25, z: 0 };

    this.sceneColumnBackLeftName = "column back left";
    this.sceneColumnBackLeftPositions = { x: -4.6, y: 7.5, z: -60 };
    this.sceneColumnBackLeftRotation = { x: 0, y: -Math.PI * 0.25, z: 0 };
  }

  create() {
    this.sceneGround = new SceneGround(false);
    this.sceneGround = new SceneGround(
      false,
      { x: 0, y: 2.2, z: -80 }, // positions
      { x: -1.27, y: 0, z: 0 }, // Rotations
    );
    this.scenePodium = new ScenePodium(false);
    this.backWall = new SceneWall(
      this.backWallName,
      this.backWallScale,
      this.backWallPositions,
      this.backWallRotation,
      this.backWallMass,
      this.backWallDimmensions,
      this.backWallDebug,
    );
    this.leftWall = new SceneWall(
      this.leftWallName,
      this.leftWallScale,
      this.leftWallPositions,
      this.leftWallRotation,
      this.leftWallMass,
      this.leftWallDimmensions,
      this.leftWallDebug,
    );
    this.rightWall = new SceneWall(
      this.rightWallName,
      this.rightWallScale,
      this.rightWallPositions,
      this.rightWallRotation,
      this.rightWallMass,
      this.rightWallDimmensions,
      this.rightWallDebug,
    );
    this.leftBacktWall = new SceneWall(
      this.leftBacktWallName,
      this.leftBacktWallScale,
      this.leftBacktWallPositions,
      this.leftBacktWallRotation,
      this.leftBacktWallMass,
      this.leftBacktWallDimmensions,
      this.leftBacktWallDebug,
    );
    this.rightBacktWall = new SceneWall(
      this.rightBacktWallName,
      this.rightBacktWallScale,
      this.rightBacktWallPositions,
      this.rightBacktWallRotation,
      this.rightBacktWallMass,
      this.rightBacktWallDimmensions,
      this.rightBacktWallDebug,
    );

    this.sceneColumnLeft = new SceneColumn(
      this.sceneColumnLeftName,
      this.sceneColumnLeftPositions,
      this.sceneColumnLeftRotation,
    );
    this.sceneColumnRight = new SceneColumn(
      this.sceneColumnRightName,
      this.sceneColumnRightPositions,
      this.sceneColumnRightRotation,
    );
    this.sceneColumnBackRight = new SceneColumn(
      this.sceneColumnBackRightName,
      this.sceneColumnBackRightPositions,
      this.sceneColumnBackRightRotation,
    );
    this.sceneColumnBackLeft = new SceneColumn(
      this.sceneColumnBackLeftName,
      this.sceneColumnBackLeftPositions,
      this.sceneColumnBackLeftRotation,
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
