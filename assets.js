export const assets = {
  image: {
    // 'background': 'https://preview.redd.it/29zh4v56mo951.jpg?width=640&crop=smart&auto=webp&s=0f3122b8c447cd88c90e825f31f7737c06538693',
    'player': './assets/images/tomapiko_ss.png',
    'house': './assets/images/house.png',
  },
  sound: {
    'cursor': 'assets/sounds/cursor.mp3',
    'cursor2': 'assets/sounds/cursor2.mp3',
    'footsteps': 'assets/sounds/footsteps.mp3',
  },
  spritesheet: {
    'player_ss': {
      "frame": {
        "width": 64,  // 各フレームの幅
        "height": 64, // 各フレームの高さ
        "cols": 6,    // スプライトシートの列数
        "rows": 3,    // スプライトシートの行数
      },
      "animations": {
        "stop": {
          "frames": [0],
          "frequency": 4,
        },
        "fly": {
          "frames": [1, 2, 3],
          "next": 'fly',
          "frequency": 4,
        },
        "slip": {
          "frames": [4, 5],
          "frequency": 4,
        },
        "up": {
          "frames": [9, 10, 11, 10],
          "next": 'up',
          "frequency": 4,
        },
        "down": {
          "frames": [6, 7, 8, 7],
          "next": 'down',
          "frequency": 4,
        },
        "left": {
          "frames": [12, 13, 14, 13],
          "next": 'left',
          "frequency": 4,
        },
        "right": {
          "frames": [15, 16, 17, 16],
          "next": 'right',
          "frequency": 4,
        },
      },
    },
  },
};