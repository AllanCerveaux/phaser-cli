import { FPSText } from '../objects/debug'

export class MainScene extends Phaser.Scene {
  fpsText

  constructor() {
    super({ key: 'main-scene' })
  }

  create() {
    this.fpsText = new FPSText(this)
  }

  update(time, delta) {
    this.fpsText.update()
  }
}
