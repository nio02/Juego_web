//Getting variables out of functions (DRY)
//startGame
const sectionSelectAttack = document.getElementById('attack_selector')
const sectionReboot = document.getElementById('reboot')
const buttonPetPlayer = document.getElementById("btn_pet")

const restartButton = document.getElementById('btn_reboot')
//selectPetPlayer
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
//Adding Classes/Objects iterating
const cardsContainer = document.getElementById('cards_container')
//Attack Container
const attacksContainer = document.getElementById('pet_Abilities_Container')

//Creating Arrays
let mokepones = []

//Creating Global Var
let playerAttack
let enemyAttack
let playerLife = 3
let enemyLife = 3

let mokeponesOptions

//Fixed pet selector
let inputHipodoge
let inputCapipepo 
let inputRatigueya

//new Attack selector
let petPlayer

let mokeponAttacks

let buttonFire 
let buttonWater
let buttonEarth

//Creating Classes

class Mokepon {
    constructor(name, picture, life){ //Pets properties
        this.name = name
        this.picture = picture
        this.life = life
        this.attacks = [] 
    }
}

//Creating Objects (?)
let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5)
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5)
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5)

//Adding objects to the array (learning purposes)
//mokepones.push(hipodoge, capipepo, ratigueya)

//Adding pet attacks (array/dictioanry)
hipodoge.attacks.push(
    {name: 'water_1 💧', id: 'btn_water'},
    {name: 'water_2 💧', id: 'btn_water'},
    {name: 'water_3 💧', id: 'btn_water'},
    {name: 'fire_1 🔥', id: 'btn_fire'},
    {name: 'earth_1 🌱', id: 'btn_earth'},
)

capipepo.attacks.push(
    {name: 'earth_1 🌱', id: 'btn_earth'},
    {name: 'earth_2 🌱', id: 'btn_earth'},
    {name: 'earth_3 🌱', id: 'btn_earth'},
    {name: 'water_1 💧', id: 'btn_water'},
    {name: 'fire_1 🔥', id: 'btn_fire'},
)

ratigueya.attacks.push(
    {name: 'fire_1 🔥', id: 'btn_fire'},
    {name: 'fire_2 🔥', id: 'btn_fire'},
    {name: 'fire_3 🔥', id: 'btn_fire'},
    {name: 'water_1 💧', id: 'btn_water'},
    {name: 'earth_1 🌱', id: 'btn_earth'},
)

//Main Array
mokepones.push(hipodoge, capipepo, ratigueya)

//Functions

function startGame() {
    //Hiding attack elements at start
    sectionSelectAttack.style.display = 'none'

    //Hiding restart button at start
    sectionReboot.style.display = 'none'

    //Adding in order to get data from arrays
    mokepones.forEach((mokepon) => {
        mokeponesOptions = `
            <input type="radio" name="pet" id="${mokepon.name}"/>
            <label class="mokepon-cards" for="${mokepon.name}">
                <p>${mokepon.name}</p>
                <img src="${mokepon.picture}" alt="Imagen de ${mokepon.name}">
            </label>
        `
    cardsContainer.innerHTML += mokeponesOptions
    //Fixed Pet Selector
    inputHipodoge = document.getElementById("Hipodoge")
    inputCapipepo = document.getElementById("Capipepo")
    inputRatigueya = document.getElementById("Ratigueya")

    })

    //Button Pet Selector
    buttonPetPlayer.addEventListener("click", selectPetPlayer)

    //Creating player attack (Moved tp another function)

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
        spanPetplayer.innerText = inputHipodoge.id
        petPlayer = inputHipodoge.id
    } else if (inputCapipepo.checked){
        alert("Seleccionaste a Capipepo")
        spanPetplayer.innerText = inputCapipepo.id
        petPlayer = inputCapipepo.id
    } else if (inputRatigueya.checked){
        alert("Seleccionaste a Ratigueya")
        spanPetplayer.innerText = inputRatigueya.id
        petPlayer = inputRatigueya.id
    } else {
        alert("Selecciona una mascota por favor")
        restartGame()
    }

    //Getting pet attacks
    getAttacks(petPlayer)

    selectPetEnemy()

    //Select a pet before attack logic
    // buttonFire.disabled = false
    // buttonWater.disabled = false
    // buttonEarth.disabled = false
}

//Getting attacks from arrays

function getAttacks(petPlayer){
    let petAbilities

    for (let i = 0; i < mokepones.length; i++) {
        if (petPlayer === mokepones[i].name){
            petAbilities = mokepones[i].attacks
        }
    }
    console.log(petAbilities)
    showAttacks(petAbilities)
}    

//Show attacks in HTML

function showAttacks(petAttacks){
    petAttacks.forEach((attack) => {
        mokeponAttacks = `
            <button class="attack_button" id="${attack.id}">${attack.name}</button>
        `
        pet_Abilities_Container.innerHTML += mokeponAttacks
    })

    //Creating Player attack buttons variables
    buttonFire = document.getElementById('btn_fire')
    buttonWater = document.getElementById('btn_water')
    buttonEarth = document.getElementById('btn_earth')

    //Player attack EventListeners
    buttonFire.addEventListener("click", attackFire)
    buttonWater.addEventListener("click", attackWater)
    buttonEarth.addEventListener("click", attackEarth)
}

//Creating enemy pet

function randomNumber(min, max){
    return Math.floor((((max + 1) - min) * Math.random()) + min)  //Math.random drops a number between zero and one, but never will be one. This is why we add one to "max" valor in this function.
}

function selectPetEnemy(){
    let randomPet = randomNumber(0, mokepones.length - 1)

    //Fixed logic using array index
    spanPetEnemy.innerText = mokepones[randomPet].name

    //Old Logic
    // if (randomPet == 1){
    //     //Hipodoge
    //     spanPetEnemy.innerText = 'Hipodoge'
    // } else if (randomPet == 2){
    //     //Capipepo
    //     spanPetEnemy.innerText = 'Capipepo'
    // } else if (randomPet == 3){
    //     //Ratigueya
    //     spanPetEnemy.innerText = 'Ratigueya'
    // }
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