//Getting variables out of functions (DRY)
//startGame
const sectionSelectAttack = document.getElementById('attack_selector')
const sectionReboot = document.getElementById('reboot')
const buttonPetPlayer = document.getElementById("btn_pet")
const buttonFire = document.getElementById("btn_fire")
const buttonWater = document.getElementById("btn_water")
const buttonEarth = document.getElementById("btn_earth")
const restartButton = document.getElementById('btn_reboot')
//selectPetPlayer
const inputHipodoge = document.getElementById("hipodoge")
const inputCapipepo = document.getElementById("capipepo")
const inputRatigueya = document.getElementById("ratigueya")
const inputLangostelvis = document.getElementById("langostelvis")
const inputTucapalma = document.getElementById("tucapalma")
const inputPydos = document.getElementById("pydos")
const spanPetplayer = document.getElementById("pet-player")
const sectionSelectPet = document.getElementById('pet_selector')
//selectPetEnemy
const spanPetEnemy = document.getElementById("pet-enemy")
//gameCombat
const spanPlayerLife = document.getElementById('player-life')
const spanEnemyLife = document.getElementById('enemy-life')
//createMessage
const sectionResult = document.getElementById('result')
const sectionPlayerResume = document.getElementById('player_resume')
const sectionEnemyResume = document.getElementById('enemy_resume')
//createFinalMessage
const sectionMessages = document.getElementById('result')

//Creating Arrays
let mokepones = []

//Creating Global Var
let playerAttack
let enemyAttack
let playerLife = 3
let enemyLife = 3

//Creating Classes

class Mokepon {
    constructor(name, picture, life){ //Pets properties
        this.name = name
        this.picture = picture
        this.life = life
    }
}

//Creating Objects (?)
let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5)
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5)
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5)

//Adding objects to the array
mokepones.push(hipodoge, capipepo, ratigueya)


function startGame() {
    //Hiding attack elements at start
    sectionSelectAttack.style.display = 'none'

    //Hiding restart button at start
    sectionReboot.style.display = 'none'

    //Button Pet Selector
    buttonPetPlayer.addEventListener("click", selectPetPlayer)

    //Creating player attack
    buttonFire.addEventListener("click", attackFire)
    buttonWater.addEventListener("click", attackWater)
    buttonEarth.addEventListener("click", attackEarth)

    //Restart button
    restartButton.addEventListener("click", restartGame)
}

//Creating pet player selection

function selectPetPlayer() {
    //Show Elements After Choose A Pet
    sectionSelectAttack.style.display = 'flex'

    //Hide Pet Selector
    sectionSelectPet.style.display = 'none'

    //Choose Pet Logic
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
    buttonFire.disabled = false
    buttonWater.disabled = false
    buttonEarth.disabled = false
}

//Creating enemy pet

function randomNumber(min, max){
    return Math.floor((((max + 1) - min) * Math.random()) + min)  //Math.random drops a number between zero and one, but never will be one. This is why we add one to "max" valor in this function.
}

function selectPetEnemy(){
    let randomPet = randomNumber(1,3)

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
    sectionMessages.innerText = finalResult

    //End game cap
    buttonFire.disabled = true
    buttonWater.disabled = true
    buttonEarth.disabled = true

    //Show restart button at endgame
    sectionReboot.style.display = 'block'
}

//Restart Game

function restartGame(){
    location.reload()
}

//Start the game

window.addEventListener("load", startGame)