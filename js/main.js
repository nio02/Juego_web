//Creating Global Var
let playerAttack
let enemyAttack

let playerLife = 3
let enemyLife = 3

function startGame() {
    //Hiding attack elements at start
    let sectionSelectAttack = document.getElementById('attack_selector')
    sectionSelectAttack.style.display = 'none'

    //Hiding restar button at start
    let sectionReboot = document.getElementById('reboot')
    sectionReboot.style.display = 'none'

    //Button Pet Selector
    let buttonPetPlayer = document.getElementById("btn_pet")
    buttonPetPlayer.addEventListener("click", selectPetPlayer)

    //Creating player attack
    let buttonFire = document.getElementById("btn_fire")
    buttonFire.addEventListener("click", attackFire)
    let buttonWater = document.getElementById("btn_water")
    buttonWater.addEventListener("click", attackWater)
    let buttonEarth = document.getElementById("btn_earth")
    buttonEarth.addEventListener("click", attackEarth)

    //Restart button
    let restartButton = document.getElementById('btn_reboot')
    restartButton.addEventListener("click", restartGame)
}

//Creating pet player selection

function selectPetPlayer() {
    //Show Elements After Choose A Pet
    let sectionSelectAttack = document.getElementById('attack_selector')
    sectionSelectAttack.style.display = 'flex'

    //Hide Pet Selector
    let sectionSelectPet = document.getElementById('pet_selector')
    sectionSelectPet.style.display = 'none'

    //Choose Pet Logic
    let inputHipodoge = document.getElementById("hipodoge")
    let inputCapipepo = document.getElementById("capipepo")
    let inputRatigueya = document.getElementById("ratigueya")
    let inputLangostelvis = document.getElementById("langostelvis")
    let inputTucapalma = document.getElementById("tucapalma")
    let inputPydos = document.getElementById("pydos")
    let spanPetplayer = document.getElementById("pet-player")

    if (inputHipodoge.checked){
        alert("Seleccionaste a Hipodoge")
        spanPetplayer.innerText = 'Hipodoge'
    } else if (inputCapipepo.checked){
        alert("Seleccionaste a Capipepo")
        spanPetplayer.innerText = 'Capipepo'
    } else if (inputRatigueya.checked){
        alert("Seleccionaste a Ratigueya")
        spanPetplayer.innerText = 'Ratigueya'
    } else if (inputLangostelvis.checked){
        alert("Seleccionaste a Langostelvis")
        spanPetplayer.innerText = 'Langostelvis'
    } else if (inputTucapalma.checked){
        alert("Seleccionaste a Tucapalma")
        spanPetplayer.innerText = 'Tucapalma'
    } else if (inputPydos.checked){
        alert("Seleccionaste a Pydos")
        spanPetplayer.innerText = 'Pydos'
    } else {
        alert("Selecciona una mascota por favor")
        restartGame()
    }

    selectPetEnemy()

    //Select a pet before attack logic    
    let buttonFire = document.getElementById("btn_fire")
    buttonFire.disabled = false
    let buttonWater = document.getElementById("btn_water")
    buttonWater.disabled = false
    let buttonEarth = document.getElementById("btn_earth")
    buttonEarth.disabled = false
}

//Creating enemy pet

function randomNumber(min, max){
    return Math.floor((((max + 1) - min) * Math.random()) + min)  //Math.random drops a number between zero and one, but never will be one. This is why we add one to "max" valor in this function.
}

function selectPetEnemy(){
    let randomPet = randomNumber(1,3)

    let spanPetEnemy = document.getElementById("pet-enemy")

    if (randomPet == 1){
        //Hipodoge
        spanPetEnemy.innerText = 'Hipodoge'
    } else if (randomPet == 2){
        //Capipepo
        spanPetEnemy.innerText = 'Capipepo'
    } else if (randomPet == 3){
        //Ratigueya
        spanPetEnemy.innerText = 'Ratigueya'
    }
}

//Creating attack functions

function attackFire() {
    playerAttack = "FUEGO"
    
    enemyRandomAttack()
}

function attackWater() {
    playerAttack = "AGUA"

    enemyRandomAttack()
}

function attackEarth() {
    playerAttack = "TIERRA"

    enemyRandomAttack()
}

function enemyRandomAttack() {
    let randomAttack = randomNumber(1,3)
    
    if (randomAttack == 1){
        enemyAttack = "FUEGO"
    } else if (randomAttack == 2){
        enemyAttack = "AGUA"
    } else if (randomAttack == 3){
        enemyAttack = "TIERRA"
    }

    gameCombat()
 
}

//Game result logic

function gameCombat() {
    let spanPlayerLife = document.getElementById('player-life')
    let spanEnemyLife = document.getElementById('enemy-life')

    if (playerAttack == enemyAttack){
        createMessage('¡EMPATE!')
    } else if (playerAttack == "AGUA" && enemyAttack == 'FUEGO'){
        createMessage('¡GANASTE!')
        enemyLife--
        spanEnemyLife.innerText = enemyLife
    } else if (playerAttack == 'FUEGO' && enemyAttack == 'TIERRA'){
        createMessage('¡GANASTE!')
        enemyLife--
        spanEnemyLife.innerText = enemyLife
    } else if (playerAttack == 'TIERRA' && enemyAttack == 'AGUA'){
        createMessage('¡GANASTE!')
        enemyLife--
        spanEnemyLife.innerText = enemyLife
    } else {
        createMessage('¡PERDISTE!')
        playerLife--
        spanPlayerLife.innerText = playerLife
    }

    lifeStatus()
}

//Message Section

function createMessage(combatResult) {
    let sectionResult = document.getElementById('result')
    let sectionPlayerResume = document.getElementById('player_resume')
    let sectionEnemyResume = document.getElementById('enemy_resume')

    //Adjusting to new design
    let newAttackPlayer = document.createElement('p')
    let newAttackEnemy = document.createElement('p')

    sectionResult.innerText = combatResult
    newAttackPlayer.innerText = playerAttack
    newAttackEnemy.innerText = enemyAttack
    // let parrafo = document.createElement('p')
    // parrafo.innerText = 'Tu mascota atacó con ' + playerAttack + '. La mascota del enemigo atacó con ' + enemyAttack + '. ' + combatResult + '.'

    sectionPlayerResume.appendChild(newAttackPlayer)
    sectionEnemyResume.appendChild(newAttackEnemy)
}

//Checking Lifes

function lifeStatus(){
    if (enemyLife == 0){
        createFinalMessage('¡Felicitaciones! Ganaste el juego :)')
    } else if (playerLife == 0){
        createFinalMessage('Lo siento, perdiste :(')
    }
}

//Final Message

function createFinalMessage(finalResult) {
    let sectionMessages = document.getElementById('messages')

    let parrafo = document.createElement('p')
    parrafo.innerText = finalResult

    sectionMessages.appendChild(parrafo)

    //End game cap

    let buttonFire = document.getElementById("btn_fire")
    buttonFire.disabled = true
    let buttonWater = document.getElementById("btn_water")
    buttonWater.disabled = true
    let buttonEarth = document.getElementById("btn_earth")
    buttonEarth.disabled = true

    //Show restart button at endgame
    let sectionReboot = document.getElementById('reboot')
    sectionReboot.style.display = 'block'
}

//Restart Game

function restartGame(){
    location.reload()
}

//Start the game

window.addEventListener("load", startGame)
