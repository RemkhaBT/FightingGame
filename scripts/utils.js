function rectangularCollision({rectangle1, rectangle2}) {

    return (
        (rectangle1.w > 0 ? rectangle1.x + rectangle1.w : rectangle1.x) 
            > (rectangle2.w > 0 ? rectangle2.x : rectangle2.x + rectangle2.w) &&
        (rectangle1.w > 0 ? rectangle1.x : rectangle1.x + rectangle1.w) 
            < (rectangle2.w > 0 ? rectangle2.x + rectangle2.w : rectangle2.x) &&
        rectangle1.y + rectangle1.h > rectangle2.y &&
        rectangle1.y < rectangle2.y + rectangle2.h
    )
}

function determineWinner(obj1, obj2, timerId) {

    clearTimeout(timerId)

    if (obj1.health === obj2.health) {

        document.querySelector('#result').innerHTML = 'Tie'
    }
    else if (obj1.health > obj2.health) {

        document.querySelector('#result').innerHTML = 'Win'
    }
    else if (obj1.health < obj2.health) {

        document.querySelector('#result').innerHTML = 'Game Over'
    }

    document.querySelector('#result').style.display = 'flex'
}

function createBackgroundSprites(sprite) {

    return {

        background: {

            imageSrc: './assets/background/' + sprite + '/16-9_1024.png',
            framesMax: backgrounds[sprite].background.framesMax,
            framesHold: backgrounds[sprite].background.framesHold,
            scale: backgrounds[sprite].background.scale,
            offset: backgrounds[sprite].background.offset
        }
    }
}

function createCharacterSprites(sprite) {

    return {

        idleR: {
            imageSrc: './assets/character/' + sprite + '/IdleR.png',
            framesMax: characters[sprite].idle.framesMax,
            framesHold: characters[sprite].idle.framesHold,
            scale: characters[sprite].idle.scale,
            mirrored: false,
            offset: characters[sprite].idle.offset,
            hitBox: characters[sprite].idle.hitBox
        },
        idleL: {
            imageSrc: './assets/character/' + sprite + '/IdleL.png',
            framesMax: characters[sprite].idle.framesMax,
            framesHold: characters[sprite].idle.framesHold,
            scale: characters[sprite].idle.scale,
            mirrored: true,
            offset: characters[sprite].idle.offset,
            hitBox: characters[sprite].idle.hitBox
        },
        runR: {
            imageSrc: './assets/character/' + sprite + '/RunR.png',
            framesMax: characters[sprite].run.framesMax,
            framesHold: characters[sprite].run.framesHold,
            scale: characters[sprite].run.scale,
            mirrored: false,
            offset: characters[sprite].run.offset,
            hitBox: characters[sprite].run.hitBox
        },
        runL: {
            imageSrc: './assets/character/' + sprite + '/RunL.png',
            framesMax: characters[sprite].run.framesMax,
            framesHold: characters[sprite].run.framesHold,
            scale: characters[sprite].run.scale,
            mirrored: true,
            offset: characters[sprite].run.offset,
            hitBox: characters[sprite].run.hitBox
        },
        jumpR: {
            imageSrc: './assets/character/' + sprite + '/JumpR.png',
            framesMax: characters[sprite].jump.framesMax,
            framesHold: characters[sprite].jump.framesHold,
            scale: characters[sprite].jump.scale,
            mirrored: false,
            offset: characters[sprite].jump.offset,
            hitBox: characters[sprite].jump.hitBox
        },
        jumpL: {
            imageSrc: './assets/character/' + sprite + '/JumpL.png',
            framesMax: characters[sprite].jump.framesMax,
            framesHold: characters[sprite].jump.framesHold,
            scale: characters[sprite].jump.scale,
            mirrored: true,
            offset: characters[sprite].jump.offset,
            hitBox: characters[sprite].jump.hitBox
        },
        fallR: {
            imageSrc: './assets/character/' + sprite + '/FallR.png',
            framesMax: characters[sprite].fall.framesMax,
            framesHold: characters[sprite].fall.framesHold,
            scale: characters[sprite].fall.scale,
            mirrored: false,
            offset: characters[sprite].fall.offset,
            hitBox: characters[sprite].fall.hitBox
        },
        fallL: {
            imageSrc: './assets/character/' + sprite + '/FallL.png',
            framesMax: characters[sprite].fall.framesMax,
            framesHold: characters[sprite].fall.framesHold,
            scale: characters[sprite].fall.scale,
            mirrored: true,
            offset: characters[sprite].fall.offset,
            hitBox: characters[sprite].fall.hitBox
        },
        hitR: {
            imageSrc: './assets/character/' + sprite + '/HitR.png',
            framesMax: characters[sprite].hit.framesMax,
            framesHold: characters[sprite].hit.framesHold,
            scale: characters[sprite].hit.scale,
            mirrored: false,
            offset: characters[sprite].hit.offset,
            hitBox: characters[sprite].hit.hitBox
        },
        hitL: {
            imageSrc: './assets/character/' + sprite + '/HitL.png',
            framesMax: characters[sprite].hit.framesMax,
            framesHold: characters[sprite].hit.framesHold,
            scale: characters[sprite].hit.scale,
            mirrored: true,
            offset: characters[sprite].hit.offset,
            hitBox: characters[sprite].hit.hitBox
        },
        deathR: {
            imageSrc: './assets/character/' + sprite + '/DeathR.png',
            framesMax: characters[sprite].death.framesMax,
            framesHold: characters[sprite].death.framesHold,
            scale: characters[sprite].death.scale,
            mirrored: false,
            offset: characters[sprite].death.offset,
            hitBox: characters[sprite].death.hitBox
        },
        deathL: {
            imageSrc: './assets/character/' + sprite + '/DeathL.png',
            framesMax: characters[sprite].death.framesMax,
            framesHold: characters[sprite].death.framesHold,
            scale: characters[sprite].death.scale,
            mirrored: true,
            offset: characters[sprite].death.offset,
            hitBox: characters[sprite].death.hitBox
        },
        attack1R: {
            imageSrc: './assets/character/' + sprite + '/Attack1R.png',
            framesMax: characters[sprite].attack1.framesMax,
            framesHold: characters[sprite].attack1.framesHold,
            scale: characters[sprite].attack1.scale,
            mirrored: false,
            offset: characters[sprite].attack1.offset,
            hitBox: characters[sprite].attack1.hitBox,
            attackBox: characters[sprite].attack1.attackBox
        },
        attack1L: {
            imageSrc: './assets/character/' + sprite + '/Attack1L.png',
            framesMax: characters[sprite].attack1.framesMax,
            framesHold: characters[sprite].attack1.framesHold,
            scale: characters[sprite].attack1.scale,
            mirrored: true,
            offset: characters[sprite].attack1.offset,
            hitBox: characters[sprite].attack1.hitBox,
            attackBox: characters[sprite].attack1.attackBox
        }
    }
}

// Collisions support

function collisionsCheck(obj1, boxType1, obj2, boxType2) {

    let _collisionAppears = false

    for (let i = 1; i < Object.keys(obj1.sprites[obj1.currentSprite][boxType1]).length; i++) {

        for (let n = 1; n < Object.keys(obj2.sprites[obj2.currentSprite][boxType2]).length; n++) {

            if (!_collisionAppears) {
                
                _collisionAppears = rectangularCollision({
                    rectangle1: obj1.createBox(boxType1, i),
                    rectangle2: obj2.createBox(boxType2, n)
                })
            }
        }
    }

    return _collisionAppears
}

function collisionRepel(obj1, obj2) {

    if (!(obj1.velocity.x === 0) || !(obj1.velocity.y === 0)) {

        if (obj1.getCenter().x < obj2.getCenter().x) {

            obj1.velocity.x *= obj1.rightSide ? 0 : 1

            if (obj1.getCenter().y < obj2.getCenter().y) {
                
                obj1.velocity.x += obj1.velocity.x === 0 ? -1 : 0
    
                obj1.velocity.y *= -1
            }
        }
        if (obj1.getCenter().x > obj2.getCenter().x) {
    
            obj1.velocity.x *= obj1.rightSide ? 1 : 0

            if (obj1.getCenter().y < obj2.getCenter().y) {
                
                obj1.velocity.x += obj1.velocity.x === 0 ? 1 : 0
    
                obj1.velocity.y *= -1
            }
        }
    }
}

function attackCollisionCheck(obj1, obj2) {

    if (obj1.isAttacking && obj1.availabilityBox('attackBox')) {
    
        if (collisionsCheck(obj1, 'attackBox', obj2, 'hitBox')) {

            if (!obj2.isHit) {

                obj2.getHit(obj1)
            }
        }
    }
}

function hitboxCollisionCheck(obj1, obj2) {

    if (collisionsCheck(obj1, 'hitBox', obj2, 'hitBox')) {

        collisionRepel(obj1, obj2)
    }
}

// Buttons support

function addPressedKey(key) {

    if (pressedKeys.indexOf(key) === -1) {

        pressedKeys.push(key)
    }
}

function removePressedKey(key) {

    pressedKeys.splice(pressedKeys.indexOf(key), 1)
}

function isPressed(key) {

    return pressedKeys.indexOf(key) != -1
}

function getLastKey(key1, key2) {

    return pressedKeys.indexOf(key1) > pressedKeys.indexOf(key2) ? key1 : key2
}