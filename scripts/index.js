const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
c.imageSmoothingEnabled = true

canvas.width = 1024
canvas.height = 576

let gravity = 0.1
let resistance = 0.2

const pressedKeys = []

let timer = 60
let timerId

let currentFrameNumber = 1
let logFPS = false
let FPS

const background = new Sprite({

    position: {
        x: 0,
        y: 0
    },
    sprites: createBackgroundSprites('DarkForest')
})

const player1 = new Fighter({

    name: 'player1',
    position: {
        x: -76,
        y: 0
    },
    rightSided: true,
    speed: {
        x: 3,
        y: 6
    },
    health: 100,
    attackPower: 100,

    sprites: createCharacterSprites('Samurai')
})

const player2 = new Fighter({

    name: 'player2',
    position: {
        x: 676,
        y: 100
    },
    rightSided: false,
    speed: {
        x: 3,
        y: 6
    },
    health: 100,
    attackPower: 10,

    sprites: createCharacterSprites('Samurai')
})

decreaseTimer()

frameRate()

function loop() {

    window.requestAnimationFrame(loop)

    clearCanvas()

    background.update()

    player1.update()
    player2.update()

    // Hitboxes collision

    hitboxCollisionCheck(player1, player2)
    hitboxCollisionCheck(player2, player1)

    // Attackbox / Hitbox collision

    attackCollisionCheck(player1, player2)
    attackCollisionCheck(player2, player1)

    // End game based on health

    if (player1.health <= 0) {

        player1.death()
        determineWinner(player1, player2, timerId)
    }

    if (player2.health <= 0) {

        player2.death()
        determineWinner(player1, player2, timerId)
    }

    currentFrameNumber++
}

function decreaseTimer() {

    if (timer > 0) {

        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }
    if (timer === 0) {

        determineWinner(player1, player2, timerId)
    }
}

function clearCanvas() {

    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
}

function frameRate() {

    setTimeout(() => {
        FPS = currentFrameNumber
        if (logFPS) { console.clear(); console.log(FPS); }
        currentFrameNumber = 1
        frameRate()
    }, 1000)
}

loop()

window.addEventListener('keydown', (event) => { addPressedKey(event.key) })

window.addEventListener('keyup', (event) => { removePressedKey(event.key) })