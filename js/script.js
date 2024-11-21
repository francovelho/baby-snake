const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")

const p = document.querySelector("p")
const size = 30 

const snake = [ { x: 0, y: 0}]

const randomNumber = () => {
    return Math.round(Math.random())
}

p.innerText = randomNumber()

const food = {
    x:90,
    y:90,
    color: "gold"
}

let direction, loopId

const drawFood = () => {

    const { x, y, color } = food

    ctx.shadowColor = color
    ctx.shadowBlur = 50
    ctx.fillStyle = food.color
    ctx.fillRect(food.x, food.y, size, size)
    ctx.shadowBlur = 0
}

const drawSnake =() => {
    ctx.fillStyle = "#ddd"
    
    snake.forEach((position, index) => {

        if (index == snake.length - 1) {
            ctx.fillStyle = "#fff"
        }


        ctx.fillRect(position.x, position.y, size, size)
    })
}

const moveSnake = () => {

    if (!direction) return

    const head = snake.at(-1)


    if (direction == "right") {
        snake.push({x: head.x + size, y: head.y})
    }

    if (direction == "left") {
        snake.push({x: head.x - size, y: head.y})
    }

    if (direction == "down") {
        snake.push({x: head.x, y: head.y + size})
    }

    if (direction == "up") {
        snake.push({x: head.x, y: head.y - size})
    }


    snake.shift()
}

const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#191919"

    for (let i = 30; i < canvas.width; i += 30) {
        ctx.beginPath()
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo(0, i)
        ctx.lineTo(600, i)
        ctx.stroke()
}
    }

const gameLoop = () => {
    clearInterval(loopId)
    ctx.clearRect(0, 0, 600, 600)

    drawGrid() 
    drawFood()  
    moveSnake()
    drawSnake()

    loopId = setTimeout(() => {
        gameLoop()
    }, 100)
}

gameLoop()

document.addEventListener("keydown", ( { key } ) => {
    if (key == "ArrowRight" && direction !== "left") {
        direction = "right"
    }

    if (key == "ArrowLeft" && direction !== "right") {
        direction = "left"
    }

    if (key == "ArrowDown" && direction !== "up") {
        direction = "down"
    }

    if (key == "ArrowUp" && direction !== "Down") {
        direction = "up"
    }  





})

