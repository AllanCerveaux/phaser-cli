import { FPSText } from '@objects/debug'

export class MainScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text

  constructor() {
    super({ key: 'main-scene' })
  }

  create() {
    this.fpsText = new FPSText(this)
  }

  update(time: number, delta: number): void {
    this.fpsText.update()
  }
}
