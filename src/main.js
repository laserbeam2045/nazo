import { config } from "../config.js";
import { assets } from "../assets.js";

phina.globalize();

phina.define('MainScene', {
  superClass: 'BaseScene',

  init: function() {
    this.superInit()

    this.isClear = false

    this.isPC = !phina.isMobile()

    // キーボード入力の初期化
    this.keyboard = Keyboard(); // キーボードオブジェクトの生成

    // キャラクターの設定
    this.player = Player({ width: 64, height: 64 }).addChildTo(this);
    this.player.setPosition(this.gridX.center(-3), this.gridY.center());

    // 何かしらのオブジェクト（当たり判定用）
    this.someObject = Sprite('house', 60, 45).addChildTo(this);
    this.someObject.setPosition(this.gridX.center(+3), this.gridY.center());

    // セリフ枠の作成
    this.dialog = Dialog({
      width: this.gridX.width,
      text: "ここに新しい冒険が待っている。",
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(15) - 15);
  },

  update: function(app) {
    // 特定の場所に行ったらセリフを変更する
    if (!this.isClear && this.player.hitTestElement(this.someObject)) {
      this.isClear = true
      this.player.stop()
      this.dialog.setText("何かを見つけた！")
      setTimeout(() => {
        this.dialog.setText('主人公は「解けるわけない謎を解くことに命を懸ける」変わり者の探偵。彼の周りには、高度な知識を要求する迷路やナップサック問題、言語学の難問など、超難解なパズルが溢れているが、なぜか彼はいつもおバカな方法でクリアしてしまう。その解法は、誰もが「だよね！」と納得してしまう奇想天外なアイデアばかり。彼の旅は一体どこに向かうのか…？')
      }, 2000)
    }
  },
})

phina.main(function() {
  var app = GameApp({
    startLabel: 'title',
    width: config.screen.width,
    height: config.screen.height,
    backgroundColor: '#444',
    autoPause: true,
    debug: false,
    assets,
    // シーンを明示的に登録
    scenes: [
      { label: 'base', className: 'BaseScene' },
      { label: 'title', className: 'TitlesScene' },
      { label: 'main', className: 'MainScene' },
    ],
  });

  app.run();
})
