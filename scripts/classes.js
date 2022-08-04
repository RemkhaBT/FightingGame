class Sprite {

    constructor({ position = {x: 0, y: 0}, sprites }) {

        // Position containers
        this.position = position
        
        // Render containers
        this.currentSprite = 'background'
        this.framesElapsed = 0
        this.sprites = sprites
        for (const sprite in this.sprites) {

            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }

    draw() {

        c.drawImage(

            // Source

            this.sprites[this.currentSprite].image,

            // Crop position

            this.framesCurrent * (this.sprites[this.currentSprite].image.width / this.sprites[this.currentSprite].framesMax),
            0,

            // Crop size

            this.sprites[this.currentSprite].image.width / this.sprites[this.currentSprite].framesMax,
            this.sprites[this.currentSprite].image.height,

            // Position

            this.position.x - this.sprites[this.currentSprite].offset.x,
            this.position.y - this.sprites[this.currentSprite].offset.y,

            // Size

            this.sprites[this.currentSprite].image.width / this.sprites[this.currentSprite].framesMax * this.sprites[this.currentSprite].scale,
            this.sprites[this.currentSprite].image.height * this.sprites[this.currentSprite].scale
        )
    }

    animateFrames() {

        this.framesElapsed++

        if (this.framesElapsed % this.sprites[this.currentSprite].framesHold === 0) {

            if (this.sprites[this.currentSprite].mirrored) {

                if (this.framesCurrent > 0) {

                    this.framesCurrent--
                }
                else {

                    this.framesCurrent = this.sprites[this.currentSprite].framesMax - 1
                }
            }
            else {

                if (this.framesCurrent < this.sprites[this.currentSprite].framesMax - 1) {

                    this.framesCurrent++
                }
                else {

                    this.framesCurrent = 0
                }
            }
        }
    }

    update() {

        this.draw()
        this.animateFrames()
    }
}

class Fighter extends Sprite {

    constructor({
        name = 'player',
        position = { x: 0, y: 0 },
        rightSided = true,
        speed = { x: 0, y: 0 },
        health = 100,
        attackPower = 10,
        sprites
    }) {
        super({
            position
        })

        // Position containers
        this.position = position
        this.rightSide = rightSided

        // Collision
        this.showHitboxFlag = false
        this.showAttackboxFlag = false
        this.hitbox

        // Properties containers
        this.name = name
        this.controls = Controls[this.name]
        this.health = health
        this.attackPower = attackPower
        this.speed = speed

        // Dynamic containers
        this.velocity = { x: 0, y: 0 }
        this.lastKey
        this.midair
        this.isAttacking = false
        this.isAttackingAnimation = false
        this.isHit = false
        this.isHitAnimation = false
        this.isPause = false
        this.isDead = false
        this.spriteRunning = false
        
        // Render containers
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.baseSprite = 'idle'
        this.currentSprite = this.baseSprite
        this.sprites = sprites

        for (const sprite in this.sprites) {

            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }

        // First sprite update
        this.sideUpdate('idle')
    }

//-----------------------------------------------------------------------------------------------

    update() {

        this.draw()
        
        if (this.isPause) { return }

        this.animateFrames()

        // Boxes render

        if (this.showAttackboxFlag && this.isAttackingAnimation) { this.renderBox('attackBox') }

        if (this.showHitboxFlag) { this.renderBox('hitBox') }

        // Movement update

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.velocity.x === 0 && this.velocity.y === 0) { this.sideUpdate(this.baseSprite) }

        this.gravity()

        this.run()

        this.jump()
        
        this.attack()
    }

//-----------------------------------------------------------------------------------------------

    gravity() {

        if (this.position.y + this.sprites[this.currentSprite].image.height >= canvas.height) {

            this.velocity.y = 0
            this.midair = false
            this.position.y = canvas.height - this.sprites[this.currentSprite].image.height

            if (this.velocity.x != 0) {

                if (this.rightSide) {

                    this.velocity.x -= resistance
                    if (this.velocity.x <= 0) {
                        this.velocity.x = 0
                    }
                }
                else {

                    this.velocity.x += resistance
                    if (this.velocity.x >= 0) {
                        this.velocity.x = 0
                    }
                }
            }
        }
        else {

            this.midair = true
            this.velocity.y += gravity
        }
    }

    run() {

        if (!this.midair) {

            if (isPressed(this.controls.moveRight) || isPressed(this.controls.moveLeft)) {

                this.rightSide = pressedKeys.indexOf(this.controls.moveRight) > pressedKeys.indexOf(this.controls.moveLeft)
        
                this.sideUpdate('run')
                this.velocity.x = this.rightSide ? this.speed.x : -this.speed.x
            }
        }
    }

    jump() {

        if (isPressed(this.controls.jump) && 
            this.position.y + this.sprites[this.currentSprite].image.height >= canvas.height) {
        
            this.velocity.y = -this.speed.y
        }

        if (this.velocity.y < 0) {

            this.sideUpdate('jump')
        }
        else if (this.velocity.y > 0) {
    
            this.sideUpdate('fall')
        }
    }

    attack() {
        
        if (!this.isAttacking && isPressed(this.controls.attack)) {

            this.sideUpdate('attack1')
            this.isAttacking = true
            this.isAttackingAnimation = true
    
            // setTimeout(() => {
            //     this.isAttacking = false
            //     this.isAttackingAnimation = false
            // }, 100 * (this.sprites[this.currentSprite].framesMax - 1))

            setTimeout(() => {
                this.isAttacking = false
                this.isAttackingAnimation = false
            }, this.spriteTime('attack1'))
        }
    }

    getHit(byTarget) {

        this.sideUpdate('hit')
        this.isHit = true
        this.isHitAnimation = true
        this.health -= byTarget.attackPower

        document.querySelector('#' + this.name + 'Health').style.width = this.health + '%'

        setTimeout(() => {
            this.isHit = false
            this.isHitAnimation = false
        }, this.spriteTime('hit'))
    }

    death() {

        this.sideUpdate('death')
    }

    switchSprite(sprite) {

        if (!(this.isAttackingAnimation || this.isHitAnimation || this.spriteRunning || this.currentSprite == sprite)) {

            this.currentSprite = sprite
            this.framesCurrent = this.sprites[this.currentSprite].mirrored ? this.sprites[this.currentSprite].framesMax - 1 : 0
            this.framesElapsed = 0
        }
    }

    // Show collision box

    renderBox(boxType) {

        if (this.availabilityBox(boxType)) {

            // Render box
                
            c.beginPath()
            c.globalAlpha = '0.3'
            
            // Box color

            switch (boxType) {
                case 'hitBox':
                    
                    c.fillStyle = 'yellow'
                    break
            
                case 'attackBox':
                    
                    c.fillStyle = 'red'
                    break
            
                default:

                    c.fillStyle = 'white'
                    break
            }
    
            for(let i = 1; i < Object.keys(this.sprites[this.currentSprite][boxType]).length; i++) {
    
                let _boxBuffer = this.createBox(boxType, i)
                c.fillRect(_boxBuffer.x, _boxBuffer.y, _boxBuffer.w, _boxBuffer.h)
            }

            c.globalAlpha = '1.0'
        }
    }

    // Create collision box

    createBox(boxType, ray) {

        return {
            x: this.sprites[this.currentSprite].mirrored
                ? this.position.x + this.sprites[this.currentSprite].image.width 
                    / this.sprites[this.currentSprite].framesMax * this.sprites[this.currentSprite].scale 
                    - this.sprites[this.currentSprite][boxType]['ray' + ray].x
                : this.position.x + this.sprites[this.currentSprite][boxType]['ray' + ray].x,
            y: this.position.y + this.sprites[this.currentSprite][boxType]['ray' + ray].y,
            w: this.sprites[this.currentSprite].mirrored
                ? -this.sprites[this.currentSprite][boxType]['ray' + ray].width
                : this.sprites[this.currentSprite][boxType]['ray' + ray].width, 
            h: this.sprites[this.currentSprite][boxType]['ray' + ray].height
        }
    }


    // Active frames check

    availabilityBox(boxType) {

        return this.sprites[this.currentSprite].mirrored
            ? this.framesCurrent <= (this.sprites[this.currentSprite][boxType].activeFrames.start - this.sprites[this.currentSprite].framesMax) * -1
                && this.framesCurrent >= this.sprites[this.currentSprite][boxType].activeFrames.end - this.sprites[this.currentSprite].framesMax

            : this.framesCurrent >= this.sprites[this.currentSprite][boxType].activeFrames.start - 1
                && this.framesCurrent <= this.sprites[this.currentSprite][boxType].activeFrames.end - 1
    }

    // Object orientation check
    
    sideUpdate(sprite) {

        this.rightSide ? this.switchSprite(sprite + 'R') : this.switchSprite(sprite + 'L')
    }

    // Get image position

    getCenter() {

        return {
            x: this.position.x + this.sprites[this.currentSprite].image.width / this.sprites[this.currentSprite].framesMax,
            y: this.position.y + this.sprites[this.currentSprite].image.height / 2
        }
    }

    // Get time for one full sprite animation

    spriteTime(spriteName) {

        return (this.sprites[spriteName + 'R'].framesHold + 1) * (this.sprites[spriteName + 'R'].framesMax) * Math.round(1000 / FPS)
    }
}