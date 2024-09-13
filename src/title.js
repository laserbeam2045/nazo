import { config } from "../config.js";

phina.globalize();

phina.define('TitlesScene', {
  superClass: 'BaseScene',

  init: function(params) {
    this.superInit(params)

    // 背景色を設定
    this.backgroundColor = '#444';

    // タイトルテキスト
    Label({
      text: 'おバカ謎解き☆アドベンチャー',
      fontSize: 40,
      fill: 'white',
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(4));

    // スタートボタン
    var startButton = Button({
      text: 'スタート',
      fontSize: 32,
      width: 200,
      height: 60,
      fill: 'mediumseagreen',
      stroke: null,
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(10));

    // スタートボタンが押された時の処理
    startButton.onpush = function() {
      this.exit('main');  // 'main' シーンに遷移
    }.bind(this);
  },
});
