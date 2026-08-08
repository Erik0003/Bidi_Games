const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");

const cols = 10;
const rows = 20;

let grid = [];
let started = false;
let score = 0;
let speed = 500;
let gameOver = false;

// Criar grid
for (let i = 0; i < rows * cols; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    game.appendChild(cell);
    grid.push(cell);
}

// Tetrominos
const pieces = {
    I: [[1,1,1,1]],
    O: [[1,1],[1,1]],
    T: [[1,1,1],[0,1,0]],
    L: [[1,1,1],[1,0,0]],
    J: [[1,1,1],[0,0,1]],
    S: [[0,1,1],[1,1,0]],
    Z: [[1,1,0],[0,1,1]]
};

let fixedBlocks = Array(rows).fill(null).map(() => Array(cols).fill(0));
let currentPiece = null;
let pieceX = 3;
let pieceY = 0;

// Iniciar jogo
document.addEventListener("keydown", e => {
    if (e.code === "Space" && !started) {
        started = true;
        document.getElementById("startText").style.display = "none";
        spawnPiece();
        update();
    }
});

// Controles de teclado
document.addEventListener("keydown", e => {
    if (!started || gameOver) return;

    // Mover para a esquerda
    if (e.key === "ArrowLeft") {
        if (canMove(-1)) {
            pieceX--;
            draw();
        }
    }

    // Mover para a direita
    if (e.key === "ArrowRight") {
        if (canMove(1)) {
            pieceX++;
            draw();
        }
    }

    // ROTACIONAR
    if (e.key === "ArrowUp") {
        const rotated = rotatePiece(currentPiece);
        if (canRotate(rotated)) {
            currentPiece = rotated;
            draw();
        }
    }

    // Movimento rápido para baixo
    if (e.key === "ArrowDown") {
        if (canMoveDown()) {
            pieceY++;
            draw()
        }
    }

    // Hard Drop
    if (e.key === " ") { // ESPAÇO para o "hard drop"
        while (canMoveDown()) {
            pieceY++;
        }
        draw();
    }
});


// Spawn de peça
function spawnPiece() {
    const keys = Object.keys(pieces);
    const random = keys[Math.floor(Math.random() * keys.length)];
    currentPiece = pieces[random];
    pieceX = 3;
    pieceY = 0;
}

// Desenhar
function draw() {
    grid.forEach(c => c.className = "cell");

    // Desenhar blocos fixos
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (fixedBlocks[y][x] === 1) {
                const pos = y * cols + x;
                grid[pos].classList.add("fixed");
            }
        }
    }


    // desenhar peça atual
    for (let y = 0; y < currentPiece.length; y++) {
        for (let x = 0; x < currentPiece[y].length; x++) {
            if (currentPiece[y][x] === 1) {
                const pos = (pieceY + y) * cols + (pieceX + x);
                grid[pos].classList.add("active");
            }
        }
    }
}

// Detectar colisão
function canMoveDown() {
    for (let y = 0; y < currentPiece.length; y++) {
        for (let x = 0; x < currentPiece[y].length; x++) {
            if (currentPiece[y][x] === 1) {
                let newY = pieceY + y + 1;
                let newX = pieceX + x;

                // colisão com o chão
                if (newY >= rows) return false;

                // colisão com blocos fixos
                if (fixedBlocks[newY][newX] === 1) return false;
            }
        }
    }
    return true;
}

// Fixar peças
function fixPiece() {
    for (let y = 0; y < currentPiece.length; y++) {
        for (let x = 0; x < currentPiece[y].length; x++) {
            if (currentPiece[y][x] === 1) {
                fixedBlocks[pieceY + y][pieceX + x] = 1;
            }
        }
    }
}

// Movimento lateral
function canMove(dx) {
    for (let y = 0; y < currentPiece.length; y++) {
        for (let x = 0; x < currentPiece[y].length; x++) {
            if (currentPiece[y][x] === 1) {
                let newX = pieceX + x + dx;
                let newY = pieceY + y;

                // colisão com paredes
                if (newX < 0 || newX >= cols) return false;

                // colisão com blocos fixos
                if (fixedBlocks[newY][newX] === 1) return false;
            }
        }
    }
    return true;
}

// Rotacionar peças
function rotatePiece(piece) {
    const rows = piece.length;
    const cols = piece[0].length;

    let rotated = [];

    for (let x = 0; x < cols; x++) {
        rotated[x] = [];
        for (let y = rows - 1; y >= 0; y--) {
            rotated[x][rows - 1 - y] = piece[y][x];
        }
    }

    return rotated;
}

// Verificar se é possível rotacionar
function canRotate(newPiece) {
    for (let y = 0; y < newPiece.length; y++) {
        for (let x = 0; x < newPiece[y].length; x++) {
            if (newPiece[y][x] === 1) {
                let newX = pieceX + x;
                let newY = pieceY + y;

                // parede
                if (newX < 0 || newX >= cols) return false;

                // chão
                if (newY >= rows) return false;

                // bloco fixo
                if (fixedBlocks[newY][newX] === 1) return false;
            }
        }
    }
    return true;
}

// Detectar linhas completa
function clearLines() {
    let linesCleared = 0;

    for (let y = 0; y < rows; y++) {
        let full = true;

        for (let x = 0; x < cols; x++) {
            if (fixedBlocks[y][x] === 0) {
                full = false;
                break;
            }
        }

        if (full) {
            linesCleared++;

            // Remover a linha
            for (let yy = y; yy > 0; yy--) {
                fixedBlocks[yy] = [...fixedBlocks[yy - 1]];
            }

            // Limpar a linha superior
            fixedBlocks[0] = Array(cols).fill(0);
        }
    }

    return linesCleared;
}

// Atualizar pontuação
function addScore(lines) {
    if (lines === 1) score+= 100;
    if (lines === 2) score+= 300;
    if (lines === 3) score+= 500;
    if (lines === 4) score+= 800;

    scoreDisplay.textContent = "Pontuação: " + score;
}

// Loop principal
function update() {
    if (gameOver) return;

    if (canMoveDown()) {
        pieceY++;
    } else {
        fixPiece();

        let cleared = clearLines();
        if (cleared > 0) {
            addScore(cleared);

            // Aumentar a velocidade
            if (speed > 150) speed -= 20;
        }

        spawnPiece();

        // game over: nova peça nasce em bloco ocupado
        if (!canMoveDown() && pieceY === 0) {
            alert("GAME OVER! Pontuação: " + score);
            gameOver = true;
            return;
        }
    }

    draw();
    setTimeout(update, speed);
}


draw();
