class Background {
  constructor(scene) {
    this.scene = scene;
    this.bg = null;
    this.scoreBoard = null;
  }

  CreateBackground() {
    this.bg = this.scene.add
      .tileSprite(
        0,
        0,
        this.scene.scale.width,
        this.scene.scale.height,
        "background"
      )
      .setOrigin(0, 0);
    this.scoreBoard = this.scene.add
      .image(150, 110, "scoreBoard")
      .setScale(0.25);
  }

  scroll(speed) {
    this.bg.tilePositionX += speed;
  }
}

export default Background;
