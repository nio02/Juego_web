const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

//Player List
const players = []

class Player {
    constructor(id) {
        this.id = id
    }

    assignPet(mokepon) {
        this.mokepon = mokepon
    }

    updatePosition(x, y) {
        this.x = x
        this.y = y
    }
}

class Mokepon {
    constructor(name) {
        this.name = name
    }
}

app.get("/join", (req, res) => {
    const id = `${Math.random()}`

    const player = new Player(id)

    players.push(player)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id)
})

app.post("/mokepon/:playerID", (req, res) =>{
    const playerID = req.params.playerID || ""
    const name = req.body.mokepon || ""
    const mokepon = new Mokepon(name)

    const playerIndex = players.findIndex((player) => playerID === player.id)

    if (playerIndex >= 0) {
        players[playerIndex].assignPet(mokepon)
    }

    console.log(players)
    console.log(playerID)
    res.end()
})

app.post("/mokepon/:playerID/position", (req, res) => {
    const playerID = req.params.playerID || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const playerIndex = players.findIndex((player) => playerID === player.id)

    if (playerIndex >= 0) {
        players[playerIndex].updatePosition(x, y)
    }

    const enemiesPlayers = players.filter((player) => playerID !== player.id)

    res.send({
        enemiesPlayers
    })
})

app.listen(8080, () => {
    console.log("Servidor Funcionando")
})