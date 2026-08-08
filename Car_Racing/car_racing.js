const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");

const cols = 10;
const rows = 20;
const carShape = [
    [0, 1, 0],
    [1, 0, 1],
    [0, 1, 0],
    [1, 1, 1]
];

let carX = 4; // Coluna central do carro
let carY = rows - 4; // Topo do carro (4 linhas acima do fim)
let obstacles = [];
let score = 0;
let speed = 500; // velocidade inicial (ms)
let gameOver = false;

// Criar grid
let grid = [];
for (let i = 0; i < rows * cols; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    game.appendChild(cell);
    grid.push(cell);
}

function draw() {
    grid.forEach(c => c.className = "cell");

    // desenhar carro
    drawCar();

    // desenhar obstáculos
    obstacles.forEach(o => {
        if (o >= 0 && o < rows * cols) {
            grid[o].classList.add("obstacle");
        }
    });
}

function drawCar() {
    for (let y = 0; y < carShape.length; y++) {
        for (let x = 0; x < carShape[y].length; x++) {
            if (carShape[y][x] === 1) {
                const pos = (carY + y) * cols + (carX + x - 1);
                grid[pos].classList.add("car");
            }
        }
    }
}

function checkCollision() {
    for (let y = 0; y < carShape.length; y++) {
        for (let x = 0; x < carShape[y].length; x++) {
            if (carShape[y][x] === 1) {
                const pos = (carY + y) * cols + (carX + x - 1);
                if (obstacles.includes(pos)) {
                    return true;
                }
            }
        }
    }
    return false;
}

function update() {
    if (gameOver) return;

    // mover obstáculos para baixo
    obstacles = obstacles.map(o => o + cols);

    // remover obstáculos que saíram da tela
    obstacles = obstacles.filter(o => o < rows * cols);

    // criar novo obstáculo aleatório
    if (Math.random() < 0.3) {
        const pos = Math.floor(Math.random() * cols);
        obstacles.push(pos);
    }

    // colisão
    if (checkCollision()) {
        gameOver = true;
        alert("GAME OVER! Pontuação: " + score);
        return;
    }

    // aumentar pontuação
    score++;
    scoreDisplay.textContent = "Pontuação: " + score;

    draw();

    // aumentar velocidade gradualmente
    if (speed > 150) speed -= 5;

    setTimeout(update, speed);
}

document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft" && carX > 1) carX--;
    if (e.key === "ArrowRight" && carX < cols - 2) carX++;
    draw(); 
});

draw();
update();
