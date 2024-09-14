import { config } from "../config.js";

phina.globalize();

phina.define('BaseScene', {
  superClass: 'DisplayScene',

  init: function() {
    this.superInit()

    this.sounds = {
      cursor: {
        volume: 0.3,
        loop: false
      },
      cursor2: {
        volume: 0.3,
        loop: false
      },
      footsteps: {
        volume: 0.3,
        loop: true
      }
    }

    // サウンドの設定を反映
    Object.keys(this.sounds).forEach(key => {
      const soundObj = this.sounds[key]
      this.sounds[key] = AssetManager.get('sound', key)
      this.sounds[key].volume = soundObj.volume || 1
      this.sounds[key].loop = soundObj.loop || false
    })
  },
})
