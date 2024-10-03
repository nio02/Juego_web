function startGame() {
    let buttonPetPlayer = document.getElementById("btn_pet")
    buttonPetPlayer.addEventListener("click", selectPetPlayer)
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

function randomNumber(max, min){
    return Math.floor(Math.random() * (max - min) + min)
}

function selectPetEnemy(){
    let randomAttack = randomNumber(1,4)

    let spanPetEnemy = document.getElementById("pet-enemy")

    if (randomAttack == 1){
        //Hipodoge
        spanPetEnemy.innerText = 'Hipodoge'
    } else if (randomAttack == 2){
        //Capipepo
        spanPetEnemy.innerText = 'Capipepo'
    } else if (randomAttack == 3){
        //Ratigueya
        spanPetEnemy.innerText = 'Ratigueya'
    }
}

window.addEventListener("load", startGame)
