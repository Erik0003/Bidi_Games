const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const largura = canvas.width;
const altura = canvas.height;

const tamanho = 25;
const velocidadeJogo = 10;

let cobra = [{ x: largura / 2, y: altura / 2 }];
let velocidadeX = 0;
let velocidadeY = 0;

let comida = gerarComida();
let pontuacao = 0;
let fimJogo = false;

// Gerar comida igual ao Python
function gerarComida() {
    const comidaX = Math.floor(Math.random() * (largura / tamanho)) * tamanho;
    const comidaY = Math.floor(Math.random() * (altura / tamanho)) * tamanho;
    return { x: comidaX, y: comidaY };
}

// Desenhar comida
function desenharComida() {
    ctx.fillStyle = "red";
    ctx.fillRect(comida.x, comida.y, tamanho, tamanho);
}

// Desenhar cobra
function desenharCobra() {
    ctx.fillStyle = "lime";
    cobra.forEach(pixel => {
        ctx.fillRect(pixel.x, pixel.y, tamanho, tamanho);
    });
}

// Pontuação
function desenharPontuacao() {
    ctx.fillStyle = "white";
    ctx.font = "25px Arial";
    ctx.fillText("Pontos: " + pontuacao, 10, 30);
}

// Controle igual ao Python (W A S D)
document.addEventListener("keydown", (e) => {
    if (e.key === "w") {
        velocidadeX = 0;
        velocidadeY = -tamanho;
    } else if (e.key === "s") {
        velocidadeX = 0;
        velocidadeY = tamanho;
    } else if (e.key === "a") {
        velocidadeX = -tamanho;
        velocidadeY = 0;
    } else if (e.key === "d") {
        velocidadeX = tamanho;
        velocidadeY = 0;
    }
});

// Loop principal
function atualizar() {
    if (fimJogo) {
        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.fillText("GAME OVER", largura / 2 - 120, altura / 2);
        return;
    }

    ctx.fillStyle = "#808080";
    ctx.fillRect(0, 0, largura, altura);

    desenharComida();
    desenharPontuacao();

    // Nova posição da cabeça
    const novaCabeca = {
        x: cobra[cobra.length - 1].x + velocidadeX,
        y: cobra[cobra.length - 1].y + velocidadeY
    };

    // Colisão com parede
    if (
        novaCabeca.x < 0 || novaCabeca.x >= largura ||
        novaCabeca.y < 0 || novaCabeca.y >= altura
    ) {
        fimJogo = true;
    }

    // Colisão com o próprio corpo
    for (let i = 0; i < cobra.length -1; i++) {
        if (cobra[i].x === novaCabeca.x && cobra[i].y === novaCabeca.y) {
            fimJogo = true;
        }
    }

    cobra.push(novaCabeca);

    // Comer comida
    if (novaCabeca.x === comida.x && novaCabeca.y === comida.y) {
        pontuacao++;
        comida = gerarComida();
    } else {
        cobra.shift(); // remove cauda
    }

    desenharCobra();

    setTimeout(atualizar, 1000 / velocidadeJogo);
}

atualizar();
