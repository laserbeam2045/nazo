import { config } from "../config.js"

phina.globalize()

phina.define('Player', {
  superClass: 'Sprite',

  // コンストラクタ
  init: function(params) {
    this.superInit('player')

    this.speed = 5
    this.anim = FrameAnimation(`player_ss`).attachTo(this)
    this.setInitialState()

    // タッチ入力の初期化
    this.touchState = {
      isTouching: false,
      position: Vector2(0, 0)
    }
  },

  setInitialState: function() {
    this.direction = 'stop'
    this.idle = true
    this.anim.gotoAndPlay('stop')
  },

  update: function(app) {
    // デフォルトでは何も押されていない
    this.idle = true

    // キャラクターの移動処理
    const pointer = app.pointer
    if (pointer.getPointing()) {
      this.handleTouchInput(app, pointer)
    } else if (app.currentScene.isPC) {
      this.handleKeyboardInput(app)
    } else {
      this.resetTouchState()
    }
    
    this.updateFootstepsSound(app)
  },

  resetTouchState: function() {
    this.touchState.isTouching = false
    this.touchState.position.set(0, 0)
  },

  // タッチ入力、クリック入力による移動
  handleTouchInput: function(app, pointer) {
    if (!this.touchState.isTouching) {
      app.currentScene.sounds.footsteps.play()
    }
    this.touchState.isTouching = true
    this.touchState.position.set(pointer.x, pointer.y)
    this.determineDirection(pointer)
    this.moveTowardsTouchPosition()
  },

  // キーボード入力による移動（PC用）
  handleKeyboardInput: function(app) {
    if (!this.touchState.isTouching) {
      app.currentScene.sounds.footsteps.play()
    }

    if (app.keyboard.getKey('up')) {
      this.move('up')
      this.touchState.isTouching = true
    }
    if (app.keyboard.getKey('down')) {
      this.move('down')
      this.touchState.isTouching = true
    }
    if (app.keyboard.getKey('left')) {
      this.move('left')
      this.touchState.isTouching = true
    }
    if (app.keyboard.getKey('right')) {
      this.move('right')
      this.touchState.isTouching = true
    }
    if (this.idle) {
      this.stop()
      this.touchState.isTouching = false
    }
  },

  updateFootstepsSound: function(app) {
    const isMoving = this.touchState.isTouching
    if (!isMoving) {
      app.currentScene.sounds.footsteps.stop()
    }
  },

  // タッチ位置に向かってスムーズに移動
  moveTowardsTouchPosition: function() {
    const dx = this.touchState.position.x - this.x
    const dy = this.touchState.position.y - this.y

    // 距離に応じた速度調整
    var distance = Math.sqrt(dx * dx + dy * dy)
    var moveSpeed = Math.min(this.speed, distance)

    // プレイヤーをタッチ位置に向かって移動
    if (distance > 0) {
      this.x += (dx / distance) * moveSpeed
      this.y += (dy / distance) * moveSpeed
    }

    // プレイヤーが近づいたときのスナップ
    if (distance < this.speed) {
      this.x = this.touchState.position.x
      this.y = this.touchState.position.y
    }
  },
  
  determineDirection: function(pointer) {
    const dx = pointer.x - this.x
    const dy = pointer.y - this.y

    // 上下左右の方向判定
    if (Math.abs(dx) > Math.abs(dy)) {
      this.move(dx > 0 ? 'right' : 'left', 0)
    } else {
      this.move(dy > 0 ? 'down' : 'up', 0)
    }
  },

  move: function(direction, speed = this.speed) {
    if (this.direction !== direction) {
      this.anim.gotoAndPlay(direction)
    }
    this.direction = direction
    this.idle = false

    switch (direction) {
      case 'up': this.y -= speed; break;
      case 'down': this.y += speed; break;
      case 'left': this.x -= speed; break;
      case 'right': this.x += speed; break;
    }
  },

  stop: function() {
    this.anim.gotoAndPlay('stop')
    this.direction = 'stop'
    this.idle = true
  },
})
