import { Constant } from "./Constant.js";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
    this.fonts = {
      "Roboto-Black": null,
      Cookie: null,
    };
  }
  preload() {}
  create() {
    this.loadFonts();
  }

  loadFonts() {
    let propName = Object.getOwnPropertyNames(this.fonts);

    propName.forEach((fontName, index) => {
      let isLast = index >= propName.length - 1;
      this.fonts[fontName] = new FontFaceObserver(fontName);

      this.fonts[fontName]
        .load()
        .then(
          this.FontLoadSuccess.bind(this, fontName, isLast),
          this.FontLoadError.bind(this, fontName)
        );
    });
  }

  FontLoadSuccess(fontName, isLast) {
    if (isLast) {
      this.loadAssets();
    }
  }
  /**
   * If we face any kind of error at the time of loading fonts
   * here we will be able to see the specific error
   * @param {font name} fontName
   */
  FontLoadError(fontName, error) {
    console.log(`Font load error for ${fontName}:`, error);
    this.loadAssets();
  }
  /**
   * loading all the assets required for the game
   */
  loadAssets() {
    this.load.on("progress", this.loadProgress, this);
    this.load.on("complete", this.OnComplete, this);
    //=========================================================
    this.load.image("background", "../assets/images/bg.jpg");
    this.load.image("player", "../assets/images/boy.png");

    this.load.image("bomb", "../assets/images/bomb.png");
    this.load.image("point2", "../assets/images/point2.png");
    this.load.image("point3", "../assets/images/point3.png");
    this.load.image("point4", "../assets/images/point4.png");
    this.load.image("scoreBoard", "../assets/images/scoreBoard.png");

    this.load.start();
  }
  loadProgress() {}
  OnComplete() {
    this.scene.stop("PreloadScene");
    this.scene.start("GameScene");
    this.scene.start("UIScene");
  }

  update() {}
}
