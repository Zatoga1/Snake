const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const snakeColor = 'black';
const foodColor = 'red';
const gridSize = 20;
let snake = [{x: 160, y: 160}];
let dx = gridSize;
let dy = 0;
let food = {x: 0, y: 0};
let score = 0;

function createFood() {
    food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
}

function drawSnake() {
    snake.forEach(snakePart => {
        ctx.fillStyle = snakeColor;
        ctx.fillRect(snakePart.x, snakePart.y, gridSize, gridSize);
    });
}

function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 1;
        createFood();
    } else {
        snake.pop();
    }
}

function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameLoop() {
    if (checkGameOver()) {
        alert('Game Over! Your score: ' + score);
        document.location.reload();
    } else {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
    }
}

function checkGameOver() {
    const head = snake[0];

    // Check if the snake collides with the wall
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }

    // Check if the snake collides with itself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }

    return false;
}

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if (event.keyCode === LEFT_KEY && dx === 0) {
        dx = -gridSize;
        dy = 0;
    }
    if (event.keyCode === RIGHT_KEY && dx === 0) {
        dx = gridSize;
        dy = 0;
    }
    if (event.keyCode === UP_KEY && dy === 0) {
        dx = 0;
        dy = -gridSize;
    }
    if (event.keyCode === DOWN_KEY && dy === 0) {
        dx = 0;
        dy = gridSize;
    }
}

createFood();
document.addEventListener('keydown', changeDirection);
setInterval(gameLoop, 100);
