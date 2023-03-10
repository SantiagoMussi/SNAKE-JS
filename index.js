const board = document.getElementById("board")
const puntuacion = document.getElementById("scoreBoard")
const startBtn = document.getElementById("start")
const gameOverSign = document.getElementById("gameOver")
const record = document.getElementById("record")
const hrecord = document.getElementById("hrecord")
const hpuntuacion = document.getElementById("hpuntuacion")
const hsnake = document.getElementById("hsnake")
const h2snake = document.getElementById("h2snake")
const reintentar = document.getElementById("reintentar")
const bloqueFinal = document.getElementById("endBoard")

const boardSize = 10
const gameSpeed = 100

const squareTypes = {
    emptySquare: 0,
    snakeSquare: 1,
    foodSquare: 2
}

const directions = {
    ArrowUp: -10,
    ArrowDown: 10,
    ArrowRight: 1,
    ArrowLeft : -1
}

let mejorScore = 0
let snake
let score 
let direction
let boardSquares
let emptySquares
let moveInterval

const drawSnake =() =>{
    snake.forEach(square => drawSquare(square, `snakeSquare`))
}

const drawSquare = (square,type) =>{
    const [row,column] = square.split('')
    boardSquares[row][column] = squareTypes[type]
    const squareElement = document.getElementById(square)
    squareElement.setAttribute('class',`square ${type}`)

    if(type === 'emptySquare'){
        emptySquares.push(square)
    }
    else{
        if(emptySquares.indexOf(square) !== -1){
            emptySquares.splice(emptySquares.indexOf(square), 1)
        }
    }
}

const moveSnake = () =>{
    const newSquare = String(
        Number(snake[snake.length - 1]) + directions[direction])
        .padStart(2,'0')
    const [row, column] = newSquare.split('')

    if (newSquare < 0 ||
        newSquare > boardSize * boardSize ||
        (direction === 'ArrowRight' && column == 0) ||
        (direction === 'ArrowLeft' && column == 9 ||
        boardSquares[row][column] == squareTypes.snakeSquare)){
        gameOver()
    }
    else{
        snake.push(newSquare)

        if(boardSquares[row][column] === squareTypes.foodSquare){
            addFood()
        }
        else{
            const emptySquare = snake.shift()
            drawSquare(emptySquare,'emptySquare')
        }
        drawSnake()
    }
}

const addFood= () =>{
    score++
    updateScore()
    createFood()
}

const gameOver = () =>{
    bloqueFinal.style.display = 'block'
    hrecord.style.display = 'block'
    hpuntuacion.style.display = 'block'
    puntuacion.style.display = 'block'
    record.style.display = 'block'
    reintentar.style.display = 'block'
    gameOverSign.style.display = 'block'
    clearInterval(moveInterval)
    startBtn.disabled = false
    updateMejorScore()
}

const setDirection = newDirection =>{
    direction = newDirection
}

const directionEvent = key =>{
    switch(key.code){
        case 'ArrowUp':
            direction != 'ArrowDown' && setDirection(key.code)
            break
        case 'ArrowDown':
            direction != 'ArrowUp' && setDirection(key.code)
            break
        case 'ArrowLeft':
            direction != 'ArrowRight' && setDirection(key.code)
            break
        case 'ArrowRight':
            direction != 'ArrowLeft' && setDirection(key.code)
            break
    }
}

const createFood = () =>{
    const randomEmptySquare = emptySquares[Math.floor(Math.random() * emptySquares.length)]
    drawSquare(randomEmptySquare, 'foodSquare')
}

const updateScore = () =>{
    puntuacion.innerText = score
}

const updateMejorScore = () =>{
    if (score > mejorScore){
        mejorScore = score
    }
    record.innerText = mejorScore
}

const crearBoard = () =>{
    boardSquares.forEach( (row,rowIndex) => {
        row.forEach( (column, columnndex) =>{
            const squareValue = `${rowIndex}${columnndex}`
            const squareElement = document.createElement('div')
            squareElement.setAttribute('class','square emptySquare')
            squareElement.setAttribute('id',squareValue)
            board.appendChild(squareElement)
            emptySquares.push(squareValue)

        })
    })
}

const setGame = () => {
    score = 0
    snake = ['00','01']
    direction = 'ArrowRight'
    boardSquares = Array.from(Array(boardSize), () => new Array(boardSize).fill(squareTypes.emptySquare))
    console.log(boardSquares)
    board.innerHTML = ''
    emptySquares = []
    crearBoard()
}

const startJuego = () =>{
    bloqueFinal.style.display = 'none'
    hrecord.style.display = 'none'
    hpuntuacion.style.display = 'none'
    puntuacion.style.display = 'none'
    record.style.display = 'none'
    reintentar.style.display = 'none'
    startBtn.style.display = 'none'
    hsnake.style.display = 'none'
    h2snake.style.display = 'block'
    score = 0
    setGame()
    gameOverSign.style.display = 'none'
    startBtn.disabled = true
    drawSnake()
    updateScore()
    updateMejorScore()
    createFood()
    document.addEventListener('keydown',directionEvent)
    moveInterval = setInterval( () => moveSnake(), gameSpeed)
}

startBtn.addEventListener('click',startJuego)
reintentar.addEventListener('click',startJuego)