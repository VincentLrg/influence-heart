import * as PIXI from 'pixi.js'

import heartImage from 'url:../../assets/img/heart.png'

class Heart {
    constructor(width, height, x, y) {
        this.width = width
        this.height = height
        this.x = x
        this.y = y
        this.draging = false
        this.eventData = null

        this.sprite =  PIXI.Sprite.from(heartImage)

        this.sprite.interactive = true
 
        this.initDimension()
        this.setPosition(this.x, this.y)
       
        this.sprite
            .on('mousedown', this.onDragStart.bind(this))
            .on('touchstart', this.onDragStart.bind(this))
            .on('mouseup', this.onDragEnd.bind(this))
            .on('mouseupoutside', this.onDragEnd.bind(this))
            .on('touchend', this.onDragEnd.bind(this))
            .on('touchendoutside', this.onDragEnd.bind(this))
            .on('mousemove', this.onDragMove.bind(this))
            .on('touchmove', this.onDragMove.bind(this));
    }
    
    getSprite() {
        return this.sprite
    }
    initDimension() {
        this.sprite.width = this.width
        this.sprite.height = this.height
    }
    setPosition(x, y) {
        this.sprite.x = x
        this.sprite.y = y
    }

    onDragStart(e) {
        this.eventData = e.data;
        this.dragging = true;
    }
    onDragEnd() {
        this.dragging = false;
        this.data = null;
    }
    onDragMove(e){
        if (this.dragging) {
            let newPosition = this.eventData.getLocalPosition(e.currentTarget.parent);
            this.setPosition(newPosition.x - this.width/2, newPosition.y - this.height/2)
        }
    }
}

export default Heart;
