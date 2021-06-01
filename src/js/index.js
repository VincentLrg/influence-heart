import "../scss/style.scss"
import * as PIXI from 'pixi.js'

import gsap from "gsap"

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

app.renderer.backgroundAlpha = 0;
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
    createMouth()
    createHearts()

    app.ticker.add(gameLoop)
}

function gameLoop(delta) {
    for(let i = 1; i<app.stage.children.length; i++) {
        if(intersect(app.stage.children[i], app.stage.children[0])){
            app.stage.children[0].gotoAndPlay(0)

            app.stage.removeChildAt(i)
            _SCORE += 10
            console.log(_SCORE)

            if (window.ReactNativeWebView){
                window.ReactNativeWebView.postMessage(JSON.stringify({score: _SCORE, message: 'ReactNativeWebView'}));
            }

            if (window.postMessage) {
                window.postMessage(JSON.stringify({score: _SCORE, message: 'postMessage'}));
            }
        }
    }
}

const intersect = (elm, mouth) => {
    let elmBox = elm.getBounds()
    let mouthBox = mouth.getBounds()

    return elmBox.x + elmBox.width > mouthBox.x + mouthBox.width/3 &&
           elmBox.x < mouthBox.x + mouthBox.width/1.5 &&
           elmBox.y + elmBox.height > mouthBox.y + mouthBox.height/3 &&
           elmBox.y < mouthBox.y + mouthBox.height/1.5
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
    let mouth = new Mouth(200, 200, _WIDTH, _HEIGHT)
    app.stage.addChild(mouth.getSprite())
}

setup()
