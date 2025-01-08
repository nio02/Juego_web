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
//Maps Mechanics canvas
const sectionViewMap = document.getElementById('view_map')
const map = document.getElementById('map')

//Creating Arrays
let mokepones = []

//Creating Global Var
let playerAttack
let enemyAttack = []
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
let buttons = []
let newPlayerAttack = []

let indexPlayerAttack
let indexEnemyAttack

//Enemy propierties
let enemyPetAbilities

// New game Logic
let playerWins = 0
let enemyWins = 0

//Maps Mechanics (canvas)
let painting = map.getContext("2d")

//Map background
let mapBackground = new Image()
mapBackground.src = "./assets/mokemap.png"

//Movement Variables
let interval

let petPlayerObject
//Creating Classes

class Mokepon {
    constructor(name, picture, life, mapPokemonIcon, x = 10, y = 10){ //Pets properties
        this.name = name
        this.picture = picture
        this.life = life
        this.attacks = []
        this.x = x
        this.y = y
        this.width = 40
        this.height = 40
        this.mapPicture = new Image()
        this.mapPicture.src = mapPokemonIcon
        this.speedX = 0
        this.speedY = 0
    }
    drawMokepon(){
        painting.drawImage(
            this.mapPicture,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}

//Creating Objects (?)
let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodogeicon.png')
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepoicon.png')
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5,'./assets/ratigueyaicon.png')
//Enemies
let enemyHipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodogeicon.png', 80, 120)
let enemyCapipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepoicon.png', 150, 95)
let enemyRatigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5,'./assets/ratigueyaicon.png', 200, 190)

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

//Adding Enemy Pets attacks
enemyHipodoge.attacks.push(
    {name: 'water_1 💧', id: 'btn_water'},
    {name: 'water_2 💧', id: 'btn_water'},
    {name: 'water_3 💧', id: 'btn_water'},
    {name: 'fire_1 🔥', id: 'btn_fire'},
    {name: 'earth_1 🌱', id: 'btn_earth'},
)

enemyCapipepo.attacks.push(
    {name: 'earth_1 🌱', id: 'btn_earth'},
    {name: 'earth_2 🌱', id: 'btn_earth'},
    {name: 'earth_3 🌱', id: 'btn_earth'},
    {name: 'water_1 💧', id: 'btn_water'},
    {name: 'fire_1 🔥', id: 'btn_fire'},
)

enemyRatigueya.attacks.push(
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

    //Hiding map 
    sectionViewMap.style.display = 'none'

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
    // sectionSelectAttack.style.display = 'flex'

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

    //Showing map
    sectionViewMap.style.display = 'flex'
    startMap()

    // selectPetEnemy()

    //Select a pet before attack logic
    // buttonFire.disabled = false
    // buttonWater.disabled = false
    // buttonEarth.disabled = false

    //Showing Pet
    drawCanvas()
}

//Getting attacks from arrays

function getAttacks(petPlayer){
    let petAbilities

    for (let i = 0; i < mokepones.length; i++) {
        if (petPlayer === mokepones[i].name){
            petAbilities = mokepones[i].attacks
        }
    }
    
    showAttacks(petAbilities)
}    

//Show attacks in HTML

function showAttacks(petAttacks){
    petAttacks.forEach((attack) => {
        mokeponAttacks = `
            <button class="attack_button aButton" id="${attack.id}">${attack.name}</button>
        `
        pet_Abilities_Container.innerHTML += mokeponAttacks
    })

    //Creating Player attack buttons variables
    buttonFire = document.getElementById('btn_fire')
    buttonWater = document.getElementById('btn_water')
    buttonEarth = document.getElementById('btn_earth')
    //Grouping buttons
    buttons = document.querySelectorAll('.aButton')
    
    //Player attack EventListeners
    // buttonFire.addEventListener("click", attackFire)
    // buttonWater.addEventListener("click", attackWater)
    // buttonEarth.addEventListener("click", attackEarth)
}

//New combat logic based on victories, with arrays to every player attack and enemy attacks

function attackSequence() {
    //Visually disable attack button
    buttons.forEach((button) =>{
        button.addEventListener('click', (e) => {
            if (e.target.textContent === 'fire_1 🔥' || e.target.textContent === 'fire_2 🔥' || e.target.textContent === 'fire_3 🔥') {
                newPlayerAttack.push('FUEGO')
                console.log(newPlayerAttack)
                button.style.background = '#112f58'
                button.disabled = true //New endgame cap
            } else if (e.target.textContent === 'water_1 💧' || e.target.textContent === 'water_2 💧' || e.target.textContent === 'water_3 💧'){
                newPlayerAttack.push('AGUA')
                console.log(newPlayerAttack)
                button.style.background = '#112f58'
                button.disabled = true //New endgame cap
            } else if (e.target.textContent === 'earth_1 🌱' || e.target.textContent === 'earth_2 🌱' || e.target.textContent === 'earth_3 🌱') {
                newPlayerAttack.push('TIERRA')
                console.log(newPlayerAttack)
                button.style.background = '#112f58'
                button.disabled = true //New endgame cap
            }

            enemyRandomAttack()
        })
    })
}

//Creating enemy pet

function randomNumber(min, max){
    return Math.floor((((max + 1) - min) * Math.random()) + min)  //Math.random drops a number between zero and one, but never will be one. This is why we add one to "max" valor in this function.
}

function selectPetEnemy(enemy){
    // let randomPet = randomNumber(0, mokepones.length - 1)

    //Fixed logic using array index
    spanPetEnemy.innerText = enemy.name
    
    enemyPetAbilities = enemy.attacks

    //Added event listener to new buttons
    attackSequence()
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

//Creating attack functions (old logic)

// function attackFire() {
//     playerAttack = "FUEGO"
    
//     enemyRandomAttack()
// }

// function attackWater() {
//     playerAttack = "AGUA"

//     enemyRandomAttack()
// }

// function attackEarth() {
//     playerAttack = "TIERRA"

//     enemyRandomAttack()
// }

function enemyRandomAttack() {
    let randomAttack = randomNumber(0, enemyPetAbilities.length - 1)
    
    // old logic
    // if (randomAttack == 1){
    //     enemyAttack = "FUEGO"
    // } else if (randomAttack == 2){
    //     enemyAttack = "AGUA"
    // } else if (randomAttack == 3){
    //     enemyAttack = "TIERRA"
    // }

    if (randomAttack == 0 || randomAttack == 1){
        enemyAttack.push("FUEGO")
    } else if (randomAttack == 3 || randomAttack == 4){
        enemyAttack.push("AGUA")
    } else {
        enemyAttack.push("TIERRA")
    }

    console.log(enemyAttack)
    
    beginCombat()
}

//Combat based on victories 

function beginCombat() {
    //When player attacks array is completed, enemy responds
    if (newPlayerAttack.length === 5) {
        gameCombat()
    }
}

//Index support Function

function indexBothPlayers (player, enemy) {
    indexPlayerAttack = newPlayerAttack[player]
    indexEnemyAttack = enemyAttack[enemy]
}

//Game result logic

function gameCombat() {
    
    for (let i = 0; i < newPlayerAttack.length; i++) {
        if (newPlayerAttack[i] === enemyAttack[i]) {
            indexBothPlayers(i, i)
            createMessage('¡EMPATE!')
            
        } else if (newPlayerAttack[i] == "AGUA" && enemyAttack[i] == "FUEGO"){
            indexBothPlayers(i, i)
            createMessage('¡GANASTE!')
            playerWins++
            spanPlayerLife.innerText = playerWins
        } else if (newPlayerAttack[i] == "FUEGO" && enemyAttack[i] == "TIERRA"){
            indexBothPlayers(i, i)
            createMessage('¡GANASTE!')
            playerWins++
            spanPlayerLife.innerText = playerWins
        } else if (newPlayerAttack[i] == "TIERRA" && enemyAttack[i] == "AGUA"){
            indexBothPlayers(i, i)
            createMessage('¡GANASTE!')
            playerWins++
            spanPlayerLife.innerText = playerWins
        } else {
            indexBothPlayers(i, i)
            createMessage('¡PERDISTE!')
            enemyWins++
            spanEnemyLife.innerText = enemyWins
        }
    } 

    // if (playerAttack == enemyAttack){
    //     createMessage('¡EMPATE!')
    // } else if (playerAttack == "AGUA" && enemyAttack == 'FUEGO'){
    //     createMessage('¡GANASTE!')
    //     enemyLife--
    //     spanEnemyLife.innerText = enemyLife
    // } else if (playerAttack == 'FUEGO' && enemyAttack == 'TIERRA'){
    //     createMessage('¡GANASTE!')
    //     enemyLife--
    //     spanEnemyLife.innerText = enemyLife
    // } else if (playerAttack == 'TIERRA' && enemyAttack == 'AGUA'){
    //     createMessage('¡GANASTE!')
    //     enemyLife--
    //     spanEnemyLife.innerText = enemyLife
    // } else {
    //     createMessage('¡PERDISTE!')
    //     playerLife--
    //     spanPlayerLife.innerText = playerLife
    // }

    lifeStatus()
}

//Message Section

function createMessage(combatResult) {
    //Adjusting to new design
    let newAttackPlayer = document.createElement('p')
    let newAttackEnemy = document.createElement('p')

    sectionResult.innerText = combatResult
    newAttackPlayer.innerText = indexPlayerAttack
    newAttackEnemy.innerText = indexEnemyAttack
    // let parrafo = document.createElement('p')
    // parrafo.innerText = 'Tu mascota atacó con ' + playerAttack + '. La mascota del enemigo atacó con ' + enemyAttack + '. ' + combatResult + '.'

    sectionPlayerResume.appendChild(newAttackPlayer)
    sectionEnemyResume.appendChild(newAttackEnemy)
}

//Checking Lifes

function lifeStatus(){
    //Old Logic
    // if (enemyLife == 0){
    //     createFinalMessage('¡Felicitaciones! Ganaste el juego :)')
    // } else if (playerLife == 0){
    //     createFinalMessage('Lo siento, perdiste :(')
    // }

    if (playerWins === enemyWins) {
        createFinalMessage('¡Ha sido un empate!')
    } else if (playerWins > enemyWins) {
        createFinalMessage('¡Felicitaciones! Ganaste el juego :)')
    } else {
        createFinalMessage('Lo siento, perdiste :(')
    }
}

//Final Message

function createFinalMessage(finalResult) {
    sectionMessages.innerText = finalResult

    //End game cap (old)
    // buttonFire.disabled = true
    // buttonWater.disabled = true
    // buttonEarth.disabled = true

    //Show restart button at endgame
    sectionReboot.style.display = 'block'
}

//Restart Game

function restartGame(){
    location.reload()
}

//Drawing Pet

function drawCanvas (){
    //If it has speed, localitation changes
    petPlayerObject.x = petPlayerObject.x + petPlayerObject.speedX
    petPlayerObject.y = petPlayerObject.y + petPlayerObject.speedY

    painting.clearRect(0, 0, map.width, map.height);
    //Painting Background
    painting.drawImage(
        mapBackground,
        0,
        0,
        map.width,
        map.height
    )
    //Mapping? (Adding image inside contructor)
    petPlayerObject.drawMokepon()
    //Adding enemy pets on map
    enemyHipodoge.drawMokepon()
    enemyCapipepo.drawMokepon()
    enemyRatigueya.drawMokepon()
    //Checking Collisions
    if (petPlayerObject.speedX !== 0 || petPlayerObject.speedY !== 0){
        checkCollision(enemyHipodoge)
        checkCollision(enemyCapipepo)
        checkCollision(enemyRatigueya)
    }
}

//OnMap Movement Functions

//Old movement logic (priting images)
// capipepo.x = capipepo.x - 5
// drawCanvas()

function moveCapipepoLeft(){
    petPlayerObject.speedX = -5    
}

function moveCapipepoRight(){
    petPlayerObject.speedX = 5 
}

function moveCapipepoUp(){
    petPlayerObject.speedY = -5
}

function moveCapipepoDown(){
    petPlayerObject.speedY = 5
}

function stopMovement(){
    petPlayerObject.speedX = 0
    petPlayerObject.speedY = 0
}

function keyHolded(event){
    switch(event.key) {
        case 'ArrowUp':
            moveCapipepoUp()
            break
        case 'ArrowDown':
            moveCapipepoDown()
            break
        case 'ArrowLeft':
            moveCapipepoLeft()
            break
        case 'ArrowRight':
            moveCapipepoRight()
        default:
            break;
    }
}

//Display Map

function startMap() {
    map.width = 360
    map.height = 240
    //Pet Player
    petPlayerObject = getPetObject(petPlayer)
    //Drawing Pet each 50 miliseconds
    interval = setInterval(drawCanvas, 50)
    //Keyboard based movement
    window.addEventListener('keydown', keyHolded)
    window.addEventListener('keyup', stopMovement)
}

//Getting Pet Assets
function getPetObject(){
    for (let i = 0; i < mokepones.length; i++) {
        if (petPlayer === mokepones[i].name){
            return mokepones[i]
        }
    }
}

//Collisions in game (Based on square images)
function checkCollision(enemy){
    const upEnemy = enemy.y
    const downEnemy = enemy.y + enemy.height
    const rightEnemy = enemy.x + enemy.width
    const leftEnemy = enemy.x

    const upPet = petPlayerObject.y
    const downPet = petPlayerObject.y + petPlayerObject.height
    const rightPet = petPlayerObject.x + petPlayerObject.width
    const leftPet = petPlayerObject.x

    if(
        downPet < upEnemy ||
        upPet > downEnemy ||
        rightPet < leftEnemy ||
        leftPet > rightEnemy
    ) {
        return
    }

    stopMovement()
    selectPetEnemy(enemy)
    //Show pet attaks
    sectionSelectAttack.style.display = 'flex'
    //Hide Map
    sectionViewMap.style.display = 'none'
    alert("Hay Colisión con " + enemy.name)
}

//Start the game
window.addEventListener("load", startGame)