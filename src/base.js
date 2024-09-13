import { config } from "../config.js";

phina.globalize();

phina.define('BaseScene', {
  superClass: 'DisplayScene',

  init: function() {
    this.superInit()

    this.sounds = {
      cursor: AssetManager.get('sound', 'cursor'),
      cursor2: AssetManager.get('sound', 'cursor2'),
      footsteps: AssetManager.get('sound', 'footsteps'),
    }

    this.sounds.footsteps.volume = 2
    this.sounds.footsteps.loop = true
  },
})
