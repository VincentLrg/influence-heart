import * as PIXI from 'pixi.js'
import mouthImages from './import_mouth'

class Mouth {
    constructor(width, height, widthWindow, heightWindow) {
        this.width = width
        this.height = height
        this.widthWindow =  widthWindow
        this.heightWindow =  heightWindow

        this.x = null
        this.y = null

        this.sprite = undefined
        this.initSprite()

        this.initDimension()
        this.initPosition()
    }

    getSprite() {
        return this.sprite
    }

    initSprite() {
        this.sprite = new PIXI.AnimatedSprite.fromFrames(mouthImages);
        this.sprite.loop = false
        this.sprite.animationSpeed = 0.85; 
        console.log(this.sprite)
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