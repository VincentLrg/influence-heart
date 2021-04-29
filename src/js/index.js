import "../scss/style.scss"
import * as PIXI from 'pixi.js'

import Heart from './sprites/heart'
import Mouth from './sprites/mouth'

let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
}

let _WIDTH = document.documentElement.clientWidth
let _HEIGHT = document.documentElement.clientHeight
let _SCORE = 0

let app = new PIXI.Application({
    width: _WIDTH, 
    height: _HEIGHT,
    antialias: true,
    resolution: 1
});

app.renderer.backgroundColor = 0x061639;
app.renderer.autoResize = true;

window.addEventListener('resize', e => {
    _WIDTH = document.documentElement.clientWidth
    _HEIGHT = document.documentElement.clientHeight
    app.renderer.resize(_WIDTH, _HEIGHT);
})

document.querySelector('.container').appendChild(app.view);

//load an image and run the `setup` function when it's done
//This `setup` function will run when the image has loaded
function setup() {
    createHearts()
    createMouth()

    app.ticker.add(gameLoop)
}

function gameLoop(delta) {
    for(let i = 0; i<app.stage.children.length - 1; i++) {
        if(intersect(app.stage.children[i], app.stage.children[app.stage.children.length-1])){
            app.stage.removeChildAt(i)
            _SCORE += 10
            console.log(_SCORE)
        }
    }
}

const intersect = (elm, mouth) => {
    let elmBox = elm.getBounds()
    let mouthBox = mouth.getBounds()

    return elmBox.x + elmBox.width > mouthBox.x &&
           elmBox.x < mouthBox.x + mouthBox.width &&
           elmBox.y + elmBox.height > mouthBox.y &&
           elmBox.y < mouthBox.y + mouthBox.height
}

const createHearts = () => {
    let heartArray = []

    for(let i = 0; i<20; i++) {
        let posX = Math.round(Math.random() * (_WIDTH - 34))
        let posY = Math.round(Math.random() * (_HEIGHT / 2 - 30))
        
        let heart = new Heart(34, 30, posX, posY);
        heartArray.push(heart)
    }

    for(item in heartArray) {
        app.stage.addChild(heartArray[item].getSprite());
    }
    console.log(app.stage)
}

const createMouth =  () => {
    let mouth = new Mouth(200, 75, _WIDTH, _HEIGHT)
    app.stage.addChild(mouth.getSprite())
}

setup()