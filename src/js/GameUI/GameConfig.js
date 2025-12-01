const GameConfig = {
  player: {
    x: 350,
    scale: 0.5,
    lanes: [0.45, 0.62, 0.78]
  },

  collection: {
    requiredLetters: {
      "و": 4,
      "م": 4,
    },

    distractors: [
      "ا","ب","ت","ج","د","ر","س","ش","ف","ق","ك","ل","ن","هـ",
      "💣","🔘","🌟"
    ],

    spawnChanceRequired: 0.30,
    spawnDistance: 350,
    aheadBuffer: 900,
    minGap: 140,
    maxGap: 300,
  },

  hud: {
    fontSize: 48,
    x: 50,
    y1: 50,
    y2: 120
  }
};

export default GameConfig;
