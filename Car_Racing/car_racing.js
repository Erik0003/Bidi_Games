<<<<<<< HEAD
const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");

const cols = 10;
const rows = 20;

// CARRO DO JOGADOR
const carShape = [
    [0, 1, 0],
    [1, 0, 1],
    [0, 1, 0],
    [1, 1, 1]
];

// CARRO INIMIGO
const enemyCar = [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
    [1, 0, 1]
];

let carX = 4;
let carY = rows - 4;

let enemies = [];
let score = 0;
let speed = 500;
let gameOver = false;
let started = false;

// START COM ESPAÇO
document.addEventListener("keydown", e => {
    if (e.code === "Space" && !started) {
        started = true;
        document.getElementById("startText").style.display = "none";
        update();
    }
});

// GRID
let grid = [];
for (let i = 0; i < rows * cols; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    game.appendChild(cell);
    grid.push(cell);
}

// DESENHAR CARRO DO JOGADOR
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

// DESENHAR INIMIGOS
function drawEnemies() {
    enemies.forEach(enemy => {
        for (let y = 0; y < enemy.shape.length; y++) {
            for (let x = 0; x < enemy.shape[y].length; x++) {
                if (enemy.shape[y][x] === 1) {
                    const pos = (enemy.y + y) * cols + (enemy.x + x - 1);
                    if (pos >= 0 && pos < rows * cols) {
                        grid[pos].classList.add("enemy");
                    }
                }
            }
        }
    });
}

// DESENHAR TUDO
function draw() {
    grid.forEach(c => c.className = "cell");
    drawCar();
    drawEnemies();
}

// SPAWN DE INIMIGO
function spawnEnemy() {
    const x = Math.floor(Math.random() * (cols - 3)) + 1;
    enemies.push({
        x: x,
        y: 0,
        shape: enemyCar
    });
}

// COLISÃO REALISTA
function checkCollision() {
    for (let enemy of enemies) {
        for (let y = 0; y < enemy.shape.length; y++) {
            for (let x = 0; x < enemy.shape[y].length; x++) {
                if (enemy.shape[y][x] === 1) {
                    const enemyPos = (enemy.y + y) * cols + (enemy.x + x - 1);

                    for (let cy = 0; cy < carShape.length; cy++) {
                        for (let cx = 0; cx < carShape[cy].length; cx++) {
                            if (carShape[cy][cx] === 1) {
                                const carPos = (carY + cy) * cols + (carX + cx - 1);

                                if (enemyPos === carPos) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return false;
}

// LOOP PRINCIPAL
function update() {
    if (gameOver) return;

    // mover inimigos
    enemies.forEach(enemy => enemy.y++);

    // remover inimigos fora da tela
    enemies = enemies.filter(enemy => enemy.y < rows);

    // spawn aleatório
    if (Math.random() < 0.15) {
        spawnEnemy();
    }

    // colisão
    if (checkCollision()) {
        alert("GAME OVER! Pontuação: " + score);
        gameOver = true;
        return;
    }

    // pontuação
    score++;
    scoreDisplay.textContent = "Pontuação: " + score;

    draw();

    // aumentar velocidade
    if (speed > 150) speed -= 5;

    setTimeout(update, speed);
}

// MOVIMENTO DO CARRO
document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft" && carX > 1) carX--;
    if (e.key === "ArrowRight" && carX < cols - 2) carX++;
    draw();
});

// DESENHAR TELA INICIAL
draw();
=======
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
>>>>>>> 9fa43ca7c348b5c51eb6311f26b17aa1f68ba0e1
