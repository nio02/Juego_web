//Creating Global Var
let playerAttack
let enemyAttack

function startGame() {
    let buttonPetPlayer = document.getElementById("btn_pet")
    buttonPetPlayer.addEventListener("click", selectPetPlayer)

    //Creating player attack
    let buttonFire = document.getElementById("btn_fire")
    buttonFire.addEventListener("click", attackFire)
    let buttonWater = document.getElementById("btn_water")
    buttonWater.addEventListener("click", attackWater)
    let buttonEarth = document.getElementById("btn_earth")
    buttonEarth.addEventListener("click", attackEarth)
}

//Creating pet player selection

function selectPetPlayer() {
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
    }

    selectPetEnemy()
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
    playerAttack = "FIRE"
    
    enemyRandomAttack()
}

function attackWater() {
    playerAttack = "WATER"
    
    enemyRandomAttack()
}

function attackEarth() {
    playerAttack = "EARTH"
    
    enemyRandomAttack()
}

function enemyRandomAttack() {
    let randomAttack = randomNumber(1,3)
    
    if (randomAttack == 1){
        enemyAttack = "FIRE"
    } else if (randomAttack == 2){
        enemyAttack = "WATER"
    } else if (randomAttack == 3){
        enemyAttack = "EARTH"
    }

    gameCombat()
 
}

//Game result logic

function gameCombat() {

    if (playerAttack == enemyAttack){
        createMessage('¡EMPATE!')
    } else if (playerAttack == "WATER" && enemyAttack == 'FIRE'){
        createMessage('¡GANASTE!')
    } else if (playerAttack == 'FIRE' && enemyAttack == 'EARTH'){
        createMessage('¡GANASTE!')
    } else if (playerAttack == 'EARTH' && enemyAttack == 'WATER'){
        createMessage('¡GANASTE!')
    } else {
        createMessage('¡PERDISTE!')
    }

}

//Message Section

function createMessage(combatResult) {
    let sectionMessages = document.getElementById('messages')

    let parrafo = document.createElement('p')
    parrafo.innerText = 'Tu mascota atacó con ' + playerAttack + '. La mascota del enemigo atacó con ' + enemyAttack + '. ' + combatResult + '.'

    sectionMessages.appendChild(parrafo)
}



//Start the game

window.addEventListener("load", startGame)
