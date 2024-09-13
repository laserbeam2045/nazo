import { config } from "../config.js";
import { assets } from "../assets.js";

phina.globalize();

phina.define('MainScene', {
  superClass: 'DisplayScene',

  init: function() {
    this.superInit();

    this.isClear = false

    this.isPC = !phina.isMobile()

    // キーボード入力の初期化
    this.keyboard = Keyboard(); // キーボードオブジェクトの生成

    // キャラクターの設定
    this.player = Player({ width: 64, height: 64 }).addChildTo(this);
    this.player.setPosition(this.gridX.center(+3), this.gridY.center());

    // 何かしらのオブジェクト（当たり判定用）
    this.someObject = Sprite('house', 60, 45).addChildTo(this);
    this.someObject.setPosition(this.gridX.center(-3), this.gridY.center());

    // セリフ枠の作成
    this.dialog = Dialog({
      width: this.gridX.width,
      text: "ここに新しい冒険が待っている。",
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(14));
  },

  update: function(app) {
    // 特定の場所に行ったらセリフを変更する
    if (!this.isClear && this.player.hitTestElement(this.someObject)) {
      this.isClear = true
      this.player.stop()
      this.dialog.setText("何かを見つけた！");
    }
  },
});

phina.main(function() {
  var app = GameApp({
    title: 'おバカ謎解きアドベンチャー',
    startLabel: 'main',
    width: config.screen.width,
    height: config.screen.height,
    backgroundColor: '#444',
    autoPause: true,
    debug: false,
    assets,
    // シーンを明示的に登録
    scenes: [
      { label: 'main', className: 'MainScene' },
    ],
  });

  app.run();
});
