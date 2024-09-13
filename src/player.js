import { config } from "../config.js";
phina.globalize();

phina.define('Player', {
  superClass: 'Sprite',

  // コンストラクタ
  init: function(params) {
    this.superInit('player');

    // // デフォルトパラメータの設定
    // params = (params || {}).$safe({
    //   width: 64,
    //   height: 64,
    // });

    this.speed = 5

    this.anim = FrameAnimation(`player_ss`).attachTo(this);
    this.anim.gotoAndPlay('left')
    this.direction = 'left'
    this.idle = true;  // プレイヤーが何もしていない状態

    // // キーボード入力の初期化
    // this.keyboard = Keyboard();

    // タッチ入力の初期化
    this.isTouching = false
    this.isKeydown = false
    this.touchPosition = Vector2(0, 0)
  },

  update: function(app) {
    // デフォルトでは何も押されていない
    this.idle = true;

    // キャラクターの移動処理
    const pointer = app.pointer;
    if (pointer.getPointing()) {
      // タッチが開始された瞬間のみ方向判定を行う
      // if (!this.isTouching) {
        this.determineDirection(); // 方向の判定と移動メソッドの呼び出し
        if (!this.isTouching) app.currentScene.sounds.footsteps.play()
        this.isTouching = true;
        this.touchPosition.set(pointer.x, pointer.y);
      // }
    } else {
      if (app.currentScene.isPC) {
        const isKeydown = this.isKeydown
        this.handleKeyboardInput(app)

        if (isKeydown !== this.isKeydown && this.isKeydown) {
          console.log(123)
          app.currentScene.sounds.footsteps.play()
          // this.isKeydown = true
        }
      }
      this.isTouching = false
      this.touchPosition.set(0, 0)
      if (!this.isKeydown && !this.isTouching) app.currentScene.sounds.footsteps.stop()
      return
    }
    
    this.moveTowardsTouchPosition()
  },

  // キーボード入力による移動（PC用）
  handleKeyboardInput: function(app) {
    const key = app.keyboard;

    this.isKeydown = false
    if (key.getKey('up')) {
      this.goToUp()
      this.idle = false;
      this.isKeydown = true;
    }
    if (key.getKey('down')) {
      this.goToDown()
      this.idle = false;
      this.isKeydown = true;
    }
    if (key.getKey('left')) {
      this.goToLeft()
      this.idle = false;
      this.isKeydown = true;
    }
    if (key.getKey('right')) {
      this.goToRight()
      this.idle = false;
      this.isKeydown = true;
    }
    if (this.idle) {
      this.stop()
    }
  },

  // タッチ位置に向かってスムーズに移動
  moveTowardsTouchPosition: function() {
    const dx = this.touchPosition.x - this.x;
    const dy = this.touchPosition.y - this.y;

    // 距離に応じた速度調整
    var distance = Math.sqrt(dx * dx + dy * dy);
    var moveSpeed = Math.min(this.speed, distance);  // プレイヤーの速度は距離に依存

    // プレイヤーをタッチ位置に向かって移動
    if (distance > 0) {
      this.x += (dx / distance) * moveSpeed;
      this.y += (dy / distance) * moveSpeed;
    }

    // プレイヤーが近づいたときのスナップ
    if (distance < this.speed) {
      this.x = this.touchPosition.x;
      this.y = this.touchPosition.y;
    }
  },
  
  determineDirection: function() {
    const dx = this.touchPosition.x - this.x;
    const dy = this.touchPosition.y - this.y;

    // 上下左右の方向判定
    if (Math.abs(dx) > Math.abs(dy)) {
      // 左右の移動が大きい場合
      if (dx > 0) {
        // this.movingDirection = 'right';
        this.goToRight(0);
      } else {
        // this.movingDirection = 'left';
        this.goToLeft(0);
      }
    } else {
      // 上下の移動が大きい場合
      if (dy > 0) {
        // this.movingDirection = 'down';
        this.goToDown(0);
      } else {
        // this.movingDirection = 'up';
        this.goToUp(0);
      }
    }
  },

  stop: function() {
    this.anim.gotoAndPlay('stop')
    this.direction = 'stop'
  },

  goToUp: function(speed = this.speed) {
    if (this.direction !== 'up') this.anim.gotoAndPlay('up')
    this.direction = 'up'
    this.y -= speed
  },

  goToDown: function(speed = this.speed) {
    if (this.direction !== 'down') this.anim.gotoAndPlay('down')
    this.direction = 'down'
    this.y += speed
  },

  goToLeft: function(speed = this.speed) {
    if (this.direction !== 'left') this.anim.gotoAndPlay('left')
    this.direction = 'left'
    this.x -= speed
  },

  goToRight: function(speed = this.speed) {
    if (this.direction !== 'right') this.anim.gotoAndPlay('right')
    this.direction = 'right'
    this.x += speed
  },
});
