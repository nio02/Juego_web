function startGame() {
    let buttonPetPlayer = document.getElementById("btn_pet")
    buttonPetPlayer.addEventListener("click", selectPetPlayer)
}

function selectPetPlayer() {
    let inputHipodoge = document.getElementById("hipodoge")
    let inputCapipepo = document.getElementById("capipepo")
    let inputRatigueya = document.getElementById("ratigueya")
    let inputLangostelvis = document.getElementById("langostelvis")
    let inputTucapalma = document.getElementById("tucapalma")
    let inputPydos = document.getElementById("pydos")

    if (inputHipodoge.checked){
        alert("Seleccionaste a Hipodoge")
    } else if (inputCapipepo.checked){
        alert("Seleccionaste a Capipepo")
    } else if (inputRatigueya.checked){
        alert("Seleccionaste a Ratigueya")
    } else if (inputLangostelvis.checked){
        alert("Seleccionaste a Langostelvis")
    } else if (inputTucapalma.checked){
        alert("Seleccionaste a Tucapalma")
    } else if (inputPydos.checked){
        alert("Seleccionaste a Pydos")
    } else {
        alert("Selecciona una mascota por favor")
    }
}

window.addEventListener("load", startGame)
