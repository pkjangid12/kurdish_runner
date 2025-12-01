import GameConfig from "./GameConfig";

class HUD {
  constructor(scene) {
    this.scene = scene;

    this.goals = GameConfig.collection.requiredLetters;

    this.counts = {};
    Object.keys(this.goals).forEach((key) => (this.counts[key] = 0));

    this.texts = {};
  }

  createUI() {
    let offsetY = GameConfig.hud.y1;

    Object.keys(this.goals).forEach((letter) => {
      this.texts[letter] = this.scene.add.text(
        GameConfig.hud.x,
        offsetY,
        `${letter}: 0/${this.goals[letter]}`,
        {
          fontSize: `${GameConfig.hud.fontSize}px`,
          color: "#FFFFFF",
        }
      );
      offsetY += 70;
    });
  }

  collect(letter) {
    if (!(letter in this.counts)) return false;

    this.counts[letter]++;

    this.texts[letter].setText(
      `${letter}: ${this.counts[letter]}/${this.goals[letter]}`
    );

    if (this.counts[letter] >= this.goals[letter]) {
      this.texts[letter].setColor("#00FF00");
    }

    const allDone = Object.keys(this.goals).every(
      (key) => this.counts[key] >= this.goals[key]
    );

    return allDone;
  }
}

export default HUD;
