import GameConfig from "./GameConfig";

class Player {
  constructor(scene) {
    this.scene = scene;

    this.player = null;
    this.cursors = null;
    this.lanes = [];
    this.currentLane = 1;
    this.x = GameConfig.player.x;
    this.moveTween = null;
  }

  CreatePlayer() {
    this.player = this.scene.physics.add
      .sprite(this.x, 800, "player")
      .setScale(GameConfig.player.scale);

    this.player.body.allowGravity = false;

    this.cursors = this.scene.input.keyboard.createCursorKeys();

    const H = this.scene.scale.height;
    this.lanes = GameConfig.player.lanes.map((p) => Math.round(H * p));

    this.currentLane = 1;
    this.player.y = this.lanes[this.currentLane];
  }

  update() {
    if (!this.player) return;

    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      this.moveToLane(this.currentLane - 1);
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      this.moveToLane(this.currentLane + 1);
    }
  }

  moveToLane(index) {
    index = Phaser.Math.Clamp(index, 0, this.lanes.length - 1);
    if (index === this.currentLane) return;

    this.currentLane = index;

    if (this.moveTween) this.moveTween.stop();

    this.moveTween = this.scene.tweens.add({
      targets: this.player,
      y: this.lanes[this.currentLane],
      duration: 150,
      ease: "Cubic.easeOut",
    });
  }
}

export default Player;
