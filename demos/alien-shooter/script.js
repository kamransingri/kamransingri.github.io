
var background = new Image()
background.src = "Pictures/SpaceBackground.jpg"

var player = new Image()
player.src = "Pictures/Astronaut.png"

var alien = new Image()
alien.src = "Pictures/Alien1.png"


var laserShooter = new Image()
laserShooter.src = "Pictures/LaserShooter.webp"

var laser = new Image()
laser.src = "Pictures/Laser.png"

var healingKit = new Image()
healingKit.src = "Pictures/HealingKit.png"

var ice = new Image()
ice.src = "Pictures/IceCube.png"

var speedBoost = new Image()
speedBoost.src = "Pictures/SpeedBoost.png"

var explosion = new Image()
explosion.src = "Pictures/Explosion.png"

var badLaser = new Image()
badLaser.src = "Pictures/OppGreenLaser.png"

var boss = new Image()
boss.src = "Pictures/BossAlien.png"

var invisibility = new Image()
invisibility.src = "Pictures/Invisibility.png"

var healthBar = new Image()
healthBar.src = "Pictures/HealthBar.jpg"

var bossHealthBar = new Image()
bossHealthBar.src = "Pictures/bossHealthBar.jpg"

var bossFireball = new Image()
bossFireball.src = "Pictures/BossFireBall.png"

var OppsArray = []

var oppsLaserArray = []

var weaponsArray = []

var powerupsArray = []

var explosionArray = []

var healthBarArray = []

var bossHealthBarArray = []

var fireballArray = []

var health = 300

var bossHealth = 150

var oppAmnt = 20

var haveLaser = false

var invisible = false


var moveLeft = false

var tempPlayerLeft = 0

var tempPlayerTop = 0


var laserSpeedLeft = 6

var laserSpeedTop = 0

var oppsLeftSpeed = 2

var oppsTopSpeed = 1

var playerSpeed = 10

var score = 0

var highScore = 0

var alienHealth = 1

var x = 0
var y = 0

var wave = 1

var whichAlien = 1

var rectx = 180

var rectx2 = 900

var bossSpeed = 6

var cycle = 0

function reset() {
    cancelAnimationFrame(a)
    background.src = "Pictures/SpaceBackground.jpg"
    alien.src = "Pictures/Alien1.png"
    boss.vis = false
    OppsArray.splice(0,OppsArray.length)
    oppsLaserArray.splice(0,oppsLaserArray.length)
    weaponsArray.splice(0, weaponsArray.length)
    powerupsArray.splice(0, powerupsArray.length)
    explosionArray.splice(0, explosionArray.length)
    healthBarArray.splice(0, healthBarArray.length)
    bossHealthBarArray.splice(0, bossHealthBarArray.length)
    fireballArray.splice(0,fireballArray.length)
    health = 300
    bossHealth = 150
    oppAmnt = 20
    haveLaser = false
    invisible = false
    moveLeft = false
    tempPlayerLeft = 0
    tempPlayerTop = 0
    laserSpeedLeft = 6
    laserSpeedTop = 0
    oppsLeftSpeed = 2
    oppsTopSpeed = 1
    score = 0
    alienHealth = 1
    x = 0
    y = 0
    wave = 1
    whichAlien = 1
    rectx = 180
    rectx2 = 900
    bossSpeed = 6
    cycle = 0
    initialize()
}

function drawBackground(){
    var ctx = document.getElementById("canvas").getContext("2d")
    background = createImage(background.src,0,0,1500,800)
    ctx.drawImage(background,background.left,background.top,background.width,background.height)
    ctx.font ="40px Georgia"
    ctx.fillStyle = "#ffffff"
    ctx.fillText("Score: " + score,1300,45)
    ctx.fillText("Player:",40,50)
    ctx.fillText("High Score: " + highScore, 20, 780)
    if(wave==4){
        ctx.fillText("Boss: ",800,50)
    }

}

function drawLosingBackground() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 1500, 800);
    ctx.font = "80px Georgia"
    ctx.fillStyle = "#ffffff"
    ctx.fillText("Game Over", 550, 300)
    ctx.fillText("High Score: " + highScore, 520, 500)
}


function alienType(){
    if(wave == 1){
        alien.src = "Pictures/Alien1.png"
        whichAlien = 1
        alienHealth = 1
        oppAmnt = 20
    }
    if(wave==2){
        alien.src = "Pictures/YellowAlien2.png"
        whichAlien = 2
        alienHealth = 2
        oppAmnt = 12
    }
    else if(wave==4){
        background.src = "Pictures/SpaceStation.jpg"
        if(cycle == 0){
            makeBoss()
            makeBossFireball()
        }
        else {
            rectx2 = 900
            bossHealth = 150
            boss.vis = true
        }
        makeBosshealth()
    }
}
function makeOpps() {
    alienType()
    OppsArray.splice(0,OppsArray.length-1)
    for (i = 0; i < (oppAmnt + 2*cycle); i++) {
        whichSide = Math.round(Math.random() * 2 + 1)
        if (whichSide == 1) {
            OppsX = Math.random() * -100
        } else {
            OppsX = Math.random() * 100 + 1500
        }
        if(wave == 3){
            randNum = Math.round(Math.random()*2+1)
            if(randNum == 1){
                alien.src = "Pictures/Alien1.png"
                whichAlien = 1
                alienHealth =1
            }
            else{
                alien.src = "Pictures/YellowAlien2.png"
                whichAlien = 2
                alienHealth = 2
            }
        }
        OppsArray.push(createImage(alien.src, OppsX, Math.random() * 900, 70, 90, whichAlien, alienHealth))
    }
}

function makeBoss(){
    boss = createImage(boss.src, 1300, 400, 100, 120)
    tempPlayerTop = player.top
    tempPlayerLeft = player.left
}

function makeBosshealth(){
    for(i=0; i<16; i++){
        bossHealthBarArray.push(createImage(bossHealthBar.src, rectx2, 30, 20, 20))
        rectx2 = rectx2 + 20
    }
}

function makeBossFireball(){
    for(i=0;i<8; i++){
        fireballArray.push(createImage(bossFireball.src, 1000, 1000, 40, 60))
    }
}
function makePlayer() {
    player = createImage(player.src, 100, 300, 120, 80)
}

function makePlayerHealth(){
    for(i=0; i<30; i++){
        healthBarArray.push(createImage(healthBar.src, rectx, 30, 15, 20))
        rectx = rectx + 15
    }
}

function makeWeapons(){
    weaponsArray.push(createImage(laserShooter.src, 300, Math.round(Math.random()*850+900), 50, 50))
}

function makeLaser(){
    laser = createImage(laser.src, 5000, 50, 30, 15)
}
function makePowerups(){
    powerupsArray.push(createImage(healingKit.src, 350, Math.round(Math.random()*850+900), 80, 60))
    powerupsArray.push(createImage(ice.src, 350, Math.round(Math.random()*850+900), 60, 60))
    powerupsArray.push(createImage(invisibility.src, 350, Math.round(Math.random()*850+900), 60, 70))
    powerupsArray.push(createImage(speedBoost.src, 350, Math.round(Math.random()*850+900), 70, 50))
}


    function initialize() {
        drawBackground();
        makePlayerHealth();
        var ctx = document.getElementById("canvas").getContext("2d");
        player = createImage(player.src, 10, 300, 130, 70)
        ctx.drawImage(player, player.left, player.top, player.width, player.height)
        document.getElementById("reset").disabled = true
        makePlayer()
        makeOpps()
        makeWeapons()
        makeLaser()
        makePowerups()
        animate()
    }

    function animate() {
        a = requestAnimationFrame(animate);
        drawBackground()
        movePlayer()
        movePlayerHealth()
        moveOpps()
        moveWeapons()
        moveLaser()
        movePowerups()
        moveExplosion()
        moveBadLaser()
        moveBoss()
        moveBossHealth()
        moveFireball()
        endGame()
    }

    var createImage = function (src, xco, yco, w, h, type, hp) {
        var img = new Image()
        img.src = src;
        img.left = xco;
        img.top = yco;
        img.width = w;
        img.height = h;
        img.vis = true;
        img.move = true;
        img.alien = type
        img.lives = hp
        return img;
    }

    $(document).keydown(function (event) {  //jQuery code to recognize a keydown event
        var keycode = (event.keyCode ? event.keyCode : event.which);

        if (keycode == 87 && player.top>-10) {
            player.top -= playerSpeed
        }
        if (keycode == 83 && player.top<730) {
            player.top += playerSpeed
        }
        if (keycode == 65 && player.left > -20) {
            player.left -= playerSpeed
            player.src = "Pictures/AstronautLeft.png"
        }
        if (keycode == 68 && player.left<1400) {
            player.left += playerSpeed
            player.src = "Pictures/Astronaut.png"
        }
        if(keycode==72){
            health = 3000
        }


    })
function fire(event) {
    x = event.clientX;
    y = event.clientY;
    let text = "X coords: " + x + ", Y coords: " + y;
    document.getElementById("demo").innerHTML = text;
    if(haveLaser && (laser.left<0 || laser.left>1500 || laser.top<0 || laser.top>800)){
        laser.left = player.left + 65
        laser.top = player.top + 35
        shoot(player.top-35, y, player.left+65, x, laserSpeedLeft, laserSpeedTop)
    }
}

function shoot(y2,y1,x2,x1,leftSpeed,topSpeed){
    if (Math.abs(y2-y1)<70 && x2>x1){
        laserSpeedLeft = -6
        laserSpeedTop = 0
    }
    else if (Math.abs(y2-y1)<70 && x1>x2){
        laserSpeedLeft = 6
        laserSpeedTop = 0
    }
    else if(Math.abs(x2-x1)<130 && y1>y2){
        laserSpeedLeft = 0
        laserSpeedTop = 6
    }
    else if(Math.abs(x2-x1)<130 && y2>y1){
        laserSpeedLeft = 0
        laserSpeedTop = -6
    }
    else if(x1>x2 && y1>y2){
        laserSpeedLeft = 6
        laserSpeedTop = 3
    }
    else if(x2>x1 && y2>y1){
        laserSpeedLeft = -6
        laserSpeedTop = -3
    }
    else if(x1>x2 && y2>y1){
        laserSpeedLeft = 6
        laserSpeedTop = -3
    }
    else if(x2>x1 && y1>y2){
        laserSpeedLeft = -6
        laserSpeedTop = 3
    }

}


    function movePlayer() {
        var ctx = document.getElementById("canvas").getContext("2d")
        ctx.drawImage(player, player.left, player.top, player.width, player.height)
        document.getElementById("health").innerHTML = "Health: " + health
        console.log(wave)
    }

function movePlayerHealth(){
    var ctx = document.getElementById("canvas").getContext("2d")
    for(i=0; i<healthBarArray.length; i++){
        ctx.drawImage(healthBarArray[i], healthBarArray[i].left, healthBarArray[i].top, healthBarArray[i].width, healthBarArray[i].height)
    }

}


function moveBossHealth(){
    var ctx = document.getElementById("canvas").getContext("2d")
    for(i=0; i<bossHealthBarArray.length; i++){
        ctx.drawImage(bossHealthBarArray[i], bossHealthBarArray[i].left, bossHealthBarArray[i].top, bossHealthBarArray[i].width, bossHealthBarArray[i].height)
    }

}

function moveBoss(){
    var ctx = document.getElementById("canvas").getContext("2d")
    if(boss.move){
        if (boss.left < tempPlayerLeft) {
            boss.left += bossSpeed
        } else if (boss.left > tempPlayerLeft) {
            boss.left -= bossSpeed
        }
        if (boss.top > tempPlayerTop) {
            boss.top -= bossSpeed
        } else if (boss.top < tempPlayerTop) {
            boss.top += bossSpeed
        }
        if(boss.left<=tempPlayerLeft+5 && boss.left>=tempPlayerLeft-5 && boss.top<=tempPlayerTop+5 && boss.top>=tempPlayerTop-5){
            boss.move = false
            setTimeout(bossAttack, 1000)
        }
    }

    if(collision(boss, player) && boss.vis){
        health -= 30
        if(boss.left>player.left){
            player.left -= 90
        }
        else{
            player.left += 90
        }

        for(i=0; i<3; i++){
            healthBarArray.splice(healthBarArray.length-1,1)
            rectx -= 15
        }
    }
    if(boss.vis){
        ctx.drawImage(boss, boss.left, boss.top, boss.width, boss.height)
    }

}

function bossAttack(){
    tempPlayerLeft = player.left
    tempPlayerTop = player.top
    bossSpeed = 6
    boss.move = false
    if(boss.vis){
        for(i=0; i<fireballArray.length; i++){
            fireballArray[i].left = boss.left
            fireballArray[i].top = boss.top
            fireballArray[i].vis = true
        }
    }
    setTimeout(function() {boss.move = true;}, 2500);
}

function moveFireball(){
    var ctx = document.getElementById("canvas").getContext("2d");
    for(i=0; i<fireballArray.length; i++){
        if(boss.vis){
            fireballArray[0].top -= 3

            fireballArray[1].left += 3
            fireballArray[1].top -= 3

            fireballArray[2].left += 3

            fireballArray[3].left += 3
            fireballArray[3].top += 3

            fireballArray[4].top += 3

            fireballArray[5].left -= 3
            fireballArray[5].top += 3

            fireballArray[6].left -= 3

            fireballArray[7].left -= 3
            fireballArray[7].top -= 3
            if(collision(player, fireballArray[i]) && fireballArray[i].vis){
                fireballArray[i].vis = false
                health -= 30
                rectx -= 15
                healthBarArray.splice(healthBarArray.length-1,1)
                rectx -= 15
                healthBarArray.splice(healthBarArray.length-1,1)
                rectx -= 15
                healthBarArray.splice(healthBarArray.length-1,1)
            }
            if(fireballArray[i].vis){
                ctx.drawImage(fireballArray[i],fireballArray[i].left,fireballArray[i].top,fireballArray[i].width,fireballArray[i].height)
            }

        }



    }
}

function moveLaser(){
    var ctx = document.getElementById("canvas").getContext("2d");
    laser.left += laserSpeedLeft
    laser.top += laserSpeedTop
    if(collision(boss,laser) && boss.vis){
        if(bossHealth<=0){
            boss.vis = false
            cycle += 1
            rectx -= 15
            score += 100
            wave = 0
            background.src = "Pictures/SpaceBackground.jpg"
            alienType()
        }
        laser.left = 1600
        laserSpeedLeft = 10
        laserSpeedTop = 0
        bossHealth -= 10
        bossHealthBarArray.splice(bossHealthBarArray.length-1,1)
    }
    ctx.drawImage(laser,laser.left, laser.top, laser.width, laser.height)
}

function movePowerups(){
    var ctx = document.getElementById("canvas").getContext("2d");
    for(i=0; i<powerupsArray.length; i++){
        if (powerupsArray[i].move) {
            powerupsArray[i].top += 4
        }
        if (powerupsArray[i].top>2000){
            powerupsArray[i].move = false
            powerupsArray[i].left = Math.round(Math.random()*1400)
            powerupsArray[i].top = Math.round(Math.random()*750)

        }
        if(collision(powerupsArray[i], player) && powerupsArray[i].vis){
            powerupsArray[i].vis = false
            powerupsArray[i].move = true
            if(i==0){
                health += 50
                for(k=0; k<5; k++){
                    healthBarArray.push(createImage(healthBar.src, rectx, 30, 15, 20))
                    rectx += 15
                }

            }
            if(i==1){
                oppsLeftSpeed = 0
                oppsTopSpeed = 0
                setTimeout(oppsSpeedReset,2000)
            }
            if(i==2){
                invisible = true
                setTimeout(function() {
                    invisible = false;
                }, 2000);
            }
            if(i==3){
                playerSpeed = 15
                setTimeout(function() {playerSpeed = 10;}, 4000);
            }
        }
        if(powerupsArray[i].top > 1500){
            powerupsArray[i].vis = true
        }

        if(powerupsArray[i].vis){
            ctx.drawImage(powerupsArray[i], powerupsArray[i].left, powerupsArray[i].top, powerupsArray[i].width, powerupsArray[i].height)
        }
    }
}

function oppsSpeedReset(){
    oppsLeftSpeed = 2
    oppsTopSpeed = 1
}



    function moveOpps() {
        var ctx = document.getElementById("canvas").getContext("2d")
        for (i = 0; i < OppsArray.length; i++) {
            if(invisible){
                if (OppsArray[i].left < player.left) {
                    OppsArray[i].left -= oppsLeftSpeed
                } else if (OppsArray[i].left > player.left) {
                    OppsArray[i].left += oppsLeftSpeed
                }
                if (OppsArray[i].top > player.top) {
                    OppsArray[i].top += oppsTopSpeed
                } else if (OppsArray[i].top < player.top) {
                    OppsArray[i].top -= oppsTopSpeed
                }
            }
            else{
                if (OppsArray[i].left < player.left) {
                    OppsArray[i].left += oppsLeftSpeed
                } else if (OppsArray[i].left > player.left) {
                    OppsArray[i].left -= oppsLeftSpeed
                }
                if (OppsArray[i].top > player.top) {
                    OppsArray[i].top -= oppsTopSpeed
                } else if (OppsArray[i].top < player.top) {
                    OppsArray[i].top += oppsTopSpeed
                }
            }

            if (collision(OppsArray[i], player) && OppsArray[i].vis == true) {
                document.getElementById("score").innerHTML = "Score: " + score
                OppsArray[i].vis = false
                health -= 10
                rectx -= 15
                healthBarArray.splice(healthBarArray.length-1,1)
            }
            if (collision(OppsArray[i], laser) && OppsArray[i].vis == true){
                OppsArray[i].lives -= 1
                document.getElementById("score").innerHTML = "Score: " + score
                laser.left = 1600
                laserSpeedLeft = 10
                laserSpeedTop = 0
                if(OppsArray[i].lives <= 0){
                    score += 10
                    OppsArray[i].vis = false
                    explosionArray.push(createImage(explosion.src, OppsArray[i].left,OppsArray[i].top, 30, 30 ))
                    if(OppsArray[i].alien == 2){
                        moveLeft = false
                        if(OppsArray[i].left>player.left){
                            moveLeft = true
                        }
                        oppsLaserArray.push(createImage(badLaser.src,OppsArray[i].left, OppsArray[i].top, 60, 40))
                    }
                }

            }

            index = OppsArray.length - (i + 1)
            for (j = 0; j < OppsArray.length-1; j++) {
                distanceLeft = OppsArray[i].left - OppsArray[i + index].left
                if (collision(OppsArray[i], OppsArray[i + index]) && OppsArray[i].vis && OppsArray[i + index].vis)
                    OppsArray[i].left += distanceLeft
                index -= 1
                if (index == 0) {
                    index = -1
                }
            }

            indexTop = OppsArray.length - (i + 1)
            for (k = 0; k < OppsArray.length-1; k++) {
                distanceTop = OppsArray[i].top - OppsArray[i + indexTop].top
                if (collision(OppsArray[i], OppsArray[i + indexTop]) && OppsArray[i].vis && OppsArray[i + indexTop].vis)
                    OppsArray[i].top += distanceTop
                indexTop -= 1
                if (indexTop == 0) {
                    indexTop = -1
                }
            }
            alive = false
            for(l = 0; l<OppsArray.length; l++){
                if(OppsArray[l].vis || wave == 4){
                    alive = true
                }
            }
            if(alive==false){
                wave += 1
                alienType()
                if(wave!==4){
                    makeOpps()
                }
            }


            if (OppsArray[i].vis) {
                ctx.drawImage(OppsArray[i], OppsArray[i].left, OppsArray[i].top, OppsArray[i].width, OppsArray[i].height)
            }
        }
    }

function moveBadLaser(){
    var ctx = document.getElementById("canvas").getContext("2d");
    for(i=0; i<oppsLaserArray.length; i++){
        if(moveLeft == false){
            oppsLaserArray[i].move = false
        }
        if(oppsLaserArray[i].move){
            oppsLaserArray[i].src = "Pictures/OppGreenLaserLeft.png"
            oppsLaserArray[i].left -= 6
        }
        else {
            oppsLaserArray[i].src = "Pictures/OppGreenLaser.png"
            oppsLaserArray[i].left += 6
        }
        if(collision(oppsLaserArray[i], player)){
            oppsLaserArray.splice(i,1)
            health -= 10
            healthBarArray.splice(healthBarArray.length-1,1)
            rectx -= 15
        }
        if(oppsLaserArray[i].left > 1500 || oppsLaserArray[i].left < 0){
            oppsLaserArray.splice(i,1)
        }
        if(oppsLaserArray.length>=1){
            ctx.drawImage(oppsLaserArray[i], oppsLaserArray[i].left, oppsLaserArray[i].top, oppsLaserArray[i].width, oppsLaserArray[i].height)
        }

    }
}
function moveExplosion(){
    var ctx = document.getElementById("canvas").getContext("2d");
    for(i=0; i<explosionArray.length; i++){
        explosionArray[i].width += 2
        explosionArray[i].height += 2
        if(explosionArray[i].width == 56){
            explosionArray[i].vis = false
        }
        if (explosionArray[i].vis){
            ctx.drawImage(explosionArray[i], explosionArray[i].left, explosionArray[i].top, explosionArray[i].width, explosionArray[i].height)
        }

    }
}

function moveWeapons(){
    var ctx = document.getElementById("canvas").getContext("2d");
    for (i=0; i<weaponsArray.length; i++){
        if (weaponsArray[i].move) {
            weaponsArray[i].top += 4
        }
        if (weaponsArray[i].top>2000){
            weaponsArray[i].move = false
            weaponsArray[i].left = Math.round(Math.random()*1400)
            weaponsArray[i].top = Math.round(Math.random()*750)
        }
        if(collision(weaponsArray[i], player) && weaponsArray[i].vis){
            weaponsArray[i].vis = false
            if(i==0){
                haveLaser = true
            }
        }

        if(weaponsArray[i].vis){
            ctx.drawImage(weaponsArray[i],weaponsArray[i].left,weaponsArray[i].top,weaponsArray[i].width, weaponsArray[i].height)
        }

    }
}

function endGame(){
    if(health<=0){
        if(score>highScore){
            highScore = score
        }
        cancelAnimationFrame(a)
        drawLosingBackground()
        document.getElementById("reset").disabled = false
    }
}

    function collision(first, second) {
        if (first.left + first.width > second.left &&
            first.left < second.left + second.width &&
            first.top + first.height > second.top &&
            first.top < second.top + second.height) {
            return true
        }
    }