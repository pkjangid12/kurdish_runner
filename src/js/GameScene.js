import Background from "./GameUI/Background.js";
import Player from "./GameUI/Player.js";
import Collectable from "./GameUI/Collectable.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");

    this.scrollSpeed = 6;
    this.gameReady = false;
  }

  create() {
    // ----- BACKGROUND -----
    this.bg = new Background(this);
    this.bg.CreateBackground();

    // ----- PLAYER -----
    this.player = new Player(this);
    this.player.CreatePlayer();

    // ----- COLLECTABLES -----
    this.collect = new Collectable(this);
    this.collect.CreateCollect();

    // ----- GAME STATE: TAP TO START -----
    this.gameReady = false;

    this.startText = this.add
      .text(this.scale.width / 2, this.scale.height / 2, "TAP TO START", {
        fontSize: "64px",
        color: "#FFFFFF",
        fontFamily: "Roboto-Black",
        stroke: "#000000",
        strokeThickness: 8,
      })
      .setOrigin(0.5);

    this.input.once("pointerdown", () => {
      this.startText.destroy();
      this.gameReady = true;
    });

    // ----- COLLISION -----
    this.physics.add.overlap(
      this.player.player,
      this.collect.items,
      (player, item) => {
        this.handleCollection(item);
      }
    );

    // ----- LISTEN FOR WIN EVENT FROM UIScene -----
    this.game.events.on("game:win", this.levelComplete, this);

    // Cleanup when scene shuts down
    this.events.once("shutdown", this.onShutdown, this);
  }

  update() {
    if (!this.gameReady) return;

    this.bg.scroll(this.scrollSpeed);
    this.collect.update(this.scrollSpeed);
    this.player.update();
  }

  // -------------------------
  // ITEM COLLECTION LOGIC
  // -------------------------
  handleCollection(item) {
    if (!item.active) return;

    if (item.isRequired) {
      // Tell UIScene that a required letter was collected
      this.game.events.emit("game:collect", item.letter);
    }

    // Distractors and required items are removed from the world
    item.destroy();
  }

  // -------------------------
  // LEVEL COMPLETE
  // -------------------------
  levelComplete() {
    this.gameReady = false;

    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    const lvlComplete = this.add
      .text(centerX, centerY, "LEVEL COMPLETE!", {
        fontSize: "80px",
        color: "#460216ff",
        fontFamily: "Roboto-Black",
        fontStyle: "bold",
        stroke: "#FFFFFF",
        strokeThickness: 10,
      })
      .setOrigin(0.5);

    lvlComplete.setScale(0);
    lvlComplete.setAlpha(0);

    this.tweens.add({
      targets: lvlComplete,
      scale: 1,
      alpha: 1,
      ease: "Back.Out",
      duration: 800,
    });

    // Restart button
    const restartText = this.add
      .text(centerX, centerY + 120, "RESTART", {
        fontSize: "56px",
        color: "#FFFFFF",
        fontFamily: "Roboto-Black",
        stroke: "#000000",
        strokeThickness: 8,
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    restartText.on("pointerdown", () => {
      // Restart gameplay scene
      this.scene.restart();

      // Also restart UIScene so HUD counters reset
      const uiScene = this.scene.get("UIScene");
      if (uiScene) {
        uiScene.scene.restart();
      }
    });
  }

  // -------------------------
  // CLEANUP
  // -------------------------
  onShutdown() {
    this.game.events.off("game:win", this.levelComplete, this);
  }
}
