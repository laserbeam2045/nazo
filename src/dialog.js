import { config } from "../config.js";
phina.globalize();

phina.define('Dialog', {
  superClass: 'DisplayElement',

  // コンストラクタ
  init: function(params) {
    this.superInit();

    // デフォルトパラメータの設定
    params = (params || {}).$safe({
      width: 640,
      height: 100,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      fontSize: 24,
      textColor: 'white',
      text: '',
    });

    // 背景の枠
    this.box = RectangleShape({
      width: params.width,
      height: params.height,
      fill: params.backgroundColor,
      stroke: null,
    }).addChildTo(this);

    // テキスト
    this.label = Label({
      text: '',
      fill: params.textColor,
      fontSize: params.fontSize,
      align: 'left',
      baseline: 'top',
    }).addChildTo(this).setPosition(-params.width / 2 + 10, -params.height / 2 + 10);

    // 表示される文字列
    this.fullText = params.text;
    this.currentIndex = 0;
    this.timer = 0;
    this.displaySpeed = 5; // 一文字ごとの表示速度（小さいほど速い）
  },

  // 一文字ずつ表示するロジック
  update: function(app) {
    this.timer += app.deltaTime;
    
    // タイマーが一定時間を超えたら次の文字を追加
    if (this.timer > this.displaySpeed) {
      this.timer = 0; // タイマーをリセット
      if (this.currentIndex < this.fullText.length) {
        // テキストを一文字ずつ追加
        this.label.text += this.fullText[this.currentIndex];
        this.currentIndex += 1;
      }
    }
  },

  // 新しいテキストをセットしてリセット
  setText: function(newText) {
    this.fullText = newText;
    this.label.text = '';  // 表示中のテキストをリセット
    this.currentIndex = 0; // インデックスをリセット
    this.timer = 0;        // タイマーをリセット
  }
});
