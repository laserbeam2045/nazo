import { config } from "../config.js";
phina.globalize();

phina.define('Dialog', {
  superClass: 'DisplayElement',

  // コンストラクタ
  init: function(params) {
    this.superInit();

    // デフォルトパラメータの設定
    params = (params || {}).$safe({
      width: config.screen.width,
      height: 150,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderRadius: 16,
      fontSize: 28,
      textColor: 'white',
      text: '',
      padding: 20,  // テキストの内側余白
      strokeWidth: 8,  // 枠線の太さ
      strokeColor: 'royalblue',  // 枠線の色
    });

    // 背景の枠
    this.box = RectangleShape({
      width: params.width - params.strokeWidth * 2,
      height: params.height - params.strokeWidth * 2,
      fill: params.backgroundColor,
      stroke: params.strokeColor,
      strokeWidth: params.strokeWidth,
      // cornerRadius: params.borderRadius,
    }).addChildTo(this);

    // テキスト
    this.label = Label({
      text: '',
      fill: params.textColor,
      fontSize: params.fontSize,
      align: 'left',
      // baseline: 'top',
      originY: 0,
      // backgroundColor: 'rgba(0,0,0,.5)'
    }).addChildTo(this)

    this.params = params

    // 表示される文字列
    this.fullText = this.insertLineBreaks(params.text, 21);
    this.label.setPosition(-this.params.width / 2 + this.params.padding, - this.params.height / 2 + this.params.padding)
    this.currentIndex = 0;
    this.timer = 0;
    this.displaySpeed = 5; // 一文字ごとの表示速度（小さいほど速い）
  },

  // 一文字ずつ表示するロジック
  update: function(app) {
    const scene = app.currentScene

    this.timer += app.deltaTime;
    
    // タイマーが一定時間を超えたら次の文字を追加
    if (this.timer > this.displaySpeed) {
      this.timer = 0; // タイマーをリセット
      if (this.currentIndex < this.fullText.length) {
        // テキストを一文字ずつ追加
        this.label.text += this.fullText[this.currentIndex];
        this.currentIndex += 1;
        if (this.label.text[this.label.text.length - 1] === '\n') {
          if (++this.lineBreakCount >= 3) {
            // console.log('break')
            this.label.y -= this.params.fontSize * 1.2
          }
        }
        scene.sounds.cursor2.play()
      } else {
        scene.sounds.cursor2.pause()
      }
    }
  },

  // 新しいテキストをセットしてリセット
  setText: function(newText) {
    this.fullText = this.insertLineBreaks(newText, 21);  // 改行を挿入
    this.label.text = '';  // 表示中のテキストをリセット
    this.currentIndex = 0; // インデックスをリセット
    this.timer = 0;        // タイマーをリセット
  },

  // 指定した文字数で改行を挿入するメソッド
  insertLineBreaks: function(text, maxLength) {
    var result = '';
    this.lineBreakCount = 0
    for (var i = 0; i < text.length; i += maxLength) {
      result += text.substr(i, maxLength) + '\n';  // 指定文字数ごとに改行
    }
    return result.slice(0, -1);
  },
})
