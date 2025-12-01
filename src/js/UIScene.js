import HUD from "./GameUI/HUD.js";

export default class UIScene extends Phaser.Scene {
  constructor() {
    super("UIScene");
  }

  create() {
    this.hud = new HUD(this);
    this.hud.createUI();

    this.game.events.on("game:collect", this.onCollect, this);
  }

  onCollect(letter) {
    const allDone = this.hud.collect(letter);

    // If all targets complete, notify GameScene
    if (allDone) {
      this.game.events.emit("game:win");
    }
  }

  onReset() {}

  // Clean up listeners when scene is shut down
  shutdown() {
    this.game.events.off("game:collect", this.onCollect, this);
    this.game.events.off("game:win", this.onWin, this);
  }
}
