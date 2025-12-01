import GameConfig from "./GameConfig";

class Collectable {
  constructor(scene) {
    this.scene = scene;
    this.items = [];

    this.requiredLetters = Object.keys(GameConfig.collection.requiredLetters);
    this.distractors = GameConfig.collection.distractors;

    this.spawnChanceRequired = GameConfig.collection.spawnChanceRequired;
    this.spawnDistance = GameConfig.collection.spawnDistance;
    this.aheadBuffer = GameConfig.collection.aheadBuffer;
    this.minGap = GameConfig.collection.minGap;
    this.maxGap = GameConfig.collection.maxGap;
  }

  CreateCollect() {
    while (this._furthestX() < this.scene.scale.width + this.aheadBuffer) {
      this._spawnAhead();
    }
  }

  _furthestX() {
    if (this.items.length === 0) return -100;
    return Math.max(...this.items.map(it => it.x));
  }

  _randomLaneY() {
    const H = this.scene.scale.height;
    const lanes = GameConfig.player.lanes.map(p => Math.round(H * p));
    return Phaser.Utils.Array.GetRandom(lanes);
  }

  _spawnAhead() {
    const base = this._furthestX();
    let start = isFinite(base) ? base : Phaser.Math.Between(150, this.scene.scale.width - 150);

    const gap = Phaser.Math.Between(this.minGap, this.maxGap);
    const x = start + gap + Phaser.Math.Between(50, this.spawnDistance);
    const y = this._randomLaneY();

    const isRequired = Math.random() < this.spawnChanceRequired;

    const letter = isRequired
      ? Phaser.Utils.Array.GetRandom(this.requiredLetters)
      : Phaser.Utils.Array.GetRandom(this.distractors);

    const text = this.scene.add.text(x, y, letter, {
      fontSize: "64px",
      color: isRequired ? "#FFD700" : "#FFFFFF",
      fontStyle: isRequired ? "bold" : "",
      stroke: "#000000",
      strokeThickness: 8
    }).setOrigin(0.5);

    this.scene.physics.world.enable(text);
    text.body.setAllowGravity(false);
    text.body.immovable = true;

    text.isRequired = isRequired;
    text.letter = letter;

    this.items.push(text);
  }

  update(scrollSpeed) {
    for (let i = this.items.length - 1; i >= 0; i--) {
      const it = this.items[i];
      it.x -= scrollSpeed;

      if (it.x < -150) {
        it.destroy();
        this.items.splice(i, 1);
      }
    }

    while (this._furthestX() < this.scene.scale.width + this.aheadBuffer) {
      this._spawnAhead();
    }
  }
}

export default Collectable;
