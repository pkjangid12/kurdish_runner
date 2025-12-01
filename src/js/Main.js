import { Constant } from "../js/Constant.js";
import PreloadScene from "../js/PreloadScene.js";
import GameScene from "../js/GameScene.js";
import UIScene from "../js/UIScene.js";

let preloadScene = new PreloadScene();
let gameScene = new GameScene();
let uiScene = new UIScene();

window.onload = function () {
  let config;
  config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,

    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },

    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
        debug: false,
      },
    },

    loader: {},
    plugins: {},
  };

  Constant.game = new Phaser.Game(config);
  Constant.game.scene.add("PreloadScene", preloadScene);
  Constant.game.scene.add("GameScene", gameScene);
  Constant.game.scene.add("UIScene", uiScene);

  Constant.game.scene.start("PreloadScene");
};
