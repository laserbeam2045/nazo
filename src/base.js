import { config } from "../config.js";

phina.globalize();

phina.define('BaseScene', {
  superClass: 'DisplayScene',

  init: function() {
    this.superInit()

    this.sounds = {
      cursor: AssetManager.get('sound', 'cursor'),
      cursor2: AssetManager.get('sound', 'cursor2'),
    }
  },
})
