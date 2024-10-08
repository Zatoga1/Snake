const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const restartButton = document.getElementById('restartButton');
const homeButton = document.getElementById('homeButton');

const snakeColor = 'black';
const foodColor = 'red';
const gridSize = 20;  // Grid size remains the same, but canvas is larger
let snake, dx, dy, food, score;
let gameInterval;
let hasMoved = false;
let speed = 100;  // Initial speed (milliseconds per frame)

function initGame() {
    snake = [{x: 300, y: 300}];  // Adjusted starting position for larger canvas
    dx = 0;  // No movement initially
    dy = 0;  // No movement initially
    food = {x: 0, y: 0};
    score = 0;
    hasMoved = false;  // Snake hasn't moved initially
    createFood();
}

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
    if (!hasMoved) return;  // Don't move if no direction is set

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
        clearInterval(gameInterval);
        alert('Game Over! Your score: ' + score);
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
    const RESTART_KEY = 82;  // Key code for 'r'

    if (!hasMoved) {
        // Set the snake to move when the first key is pressed
        hasMoved = true;
    }

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
    if (event.keyCode === RESTART_KEY) {
        restartGame();
    }
}

function restartGame() {
    clearInterval(gameInterval);
    initGame();
    // Reduce speed (make the interval time longer)
    speed = Math.min(speed + 10, 200);  // Increase speed, but cap it to avoid too fast
    gameInterval = setInterval(gameLoop, speed);
}

function goToHomePage() {
    window.location.href = 'index.html';  // Adjust the URL as needed
}

initGame();
document.addEventListener('keydown', changeDirection);
restartButton.addEventListener('click', restartGame);  // Restart game on button click
homeButton.addEventListener('click', goToHomePage);  // Redirect to home page on button click
gameInterval = setInterval(gameLoop, speed);
