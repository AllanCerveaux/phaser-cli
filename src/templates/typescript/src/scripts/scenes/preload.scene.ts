export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'preload-scene' })
  }

  create() {
    console.log(this.scene.key)
    this.scene.start('main-scene')
  }
}
