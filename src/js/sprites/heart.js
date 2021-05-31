import * as PIXI from 'pixi.js'
import gsap from "gsap";

import heartImage from 'url:../../assets/img/heart.png'

class Heart {
    constructor(width, height, x, y) {
        this.width = width
        this.height = height
        this.x = x
        this.y = y
        this.draging = false
        this.eventData = null

        this.rdmNum = this.between(-10, 10)

        this.tl = gsap.timeline({repeat: -1})

        this.sprite =  PIXI.Sprite.from(heartImage)

        this.sprite.interactive = true
 
        this.initDimension()
        this.setPosition(this.x, this.y)
        this.initAnimation()
       
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
    initAnimation() {
        this.tl.to(this.sprite, {duration: 0.5, x: this.sprite.x + (this.between(-2, 2)*this.rdmNum), y: this.sprite.y + (this.between(-2, 2)*this.rdmNum)})
        this.tl.to(this.sprite, {duration: 0.5, x: this.sprite.x + (this.between(-1, 1)*this.rdmNum), y: this.sprite.y + (this.between(-1, 1)*this.rdmNum)})
        this.tl.to(this.sprite, {duration: 0.5, x: this.sprite.x + (this.between(-2, 2)*this.rdmNum), y: this.sprite.y + (this.between(-2, 2)*this.rdmNum)})
        this.tl.to(this.sprite, {duration: 0.5, x: this.sprite.x + (this.between(-1, 1)*this.rdmNum), y: this.sprite.y + (this.between(-1, 1)*this.rdmNum)})
        this.tl.to(this.sprite, {duration: 0.5, x: this.sprite.x, y: this.sprite.y})
    }
    between(min, max) {  
        return Math.random() * (max - min) + min
    }
    setPosition(x, y) {
        this.sprite.x = x
        this.sprite.y = y
    }

    onDragStart(e) {
        this.eventData = e.data;
        this.dragging = true;
        this.tl.pause();
        this.sprite.width += 10;
        this.sprite.height += 6;
        this.sprite.x -= 5
        this.sprite.y -= 3
    }
    onDragEnd() {
        this.dragging = false;
        this.data = null;
        this.tl.clear()
        this.tl = gsap.timeline({repeat: -1})
        this.initAnimation()
        this.sprite.width -= 10;
        this.sprite.height -= 6;
        this.sprite.x += 5
        this.sprite.y += 3
    }
    onDragMove(e){
        if (this.dragging) {
            let newPosition = this.eventData.getLocalPosition(e.currentTarget.parent);
            this.setPosition(newPosition.x - this.width/2, newPosition.y - this.height/2)
        }
    }
}

export default Heart;
