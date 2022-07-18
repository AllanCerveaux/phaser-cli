export class FPSText extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text, style) {
    super(
      scene,
      x || 0,
      y || 0,
      text || '',
      style || {
        fontSize: '28px',
        color: 'black'
      }
    )
    scene.add.existing(this)
    this.setOrigin(0)
  }

  update() {
    this.setText(`fps: ${Math.floor(this.scene.game.loop.actualFps)}`)
  }
}
