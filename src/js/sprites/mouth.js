import * as PIXI from 'pixi.js'

class Mouth {
    constructor(width, height, widthWindow, heightWindow) {
        this.width = width
        this.height = height
        this.widthWindow =  widthWindow
        this.heightWindow =  heightWindow

        this.x = null
        this.y = null

        this.sprite =  PIXI.Sprite.from(PIXI.Texture.WHITE)
        this.sprite.tint = 0xFFFFFF;

        this.initDimension()
        this.initPosition()
    }

    getSprite() {
        return this.sprite
    }
    initDimension() {
        this.sprite.width = this.width
        this.sprite.height = this.height
    }

    initPosition() {
        this.x = (this.widthWindow - this.width) / 2
        this.y = this.heightWindow - this.height

        this.sprite.x = this.x
        this.sprite.y = this.y
    }
}

export default Mouth;