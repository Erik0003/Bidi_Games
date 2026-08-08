<<<<<<< HEAD
const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

const largura = canvas.width;
const altura = canvas.height;

// Raquetes
const raqueteLargura = 10;
const raqueteAltura = 100;

let jogador1 = { x: 50, y: altura / 2 - raqueteAltura / 2 };
let jogador2 = { x: largura - 60, y: altura / 2 - raqueteAltura / 2 };

// Bola
let bola = { x: largura / 2, y: altura / 2, tamanho: 30 };
let velX = 5;
let velY = 5;

// Pontuação
let pontos1 = 0;
let pontos2 = 0;

// Teclas
let teclas = {};

// Inicio/Pausa
let started = false;
let paused = false;

document.addEventListener("keydown", (e) => teclas[e.key] = true);
document.addEventListener("keyup", (e) => teclas[e.key] = false);
document.addEventListener("keydown", (e) => {teclas[e.key]= true;
    if (e.key === " ") {
        started = true;
    }
    if (e.key === "Escape") {
        paused = !paused;  // Alterna o estado de pausa
    }
});

function atualizar() {

    // Movimento jogador 1 (W / S)
    if (teclas["w"] && jogador1.y > 0) jogador1.y -= 6;
    if (teclas["s"] && jogador1.y + raqueteAltura < altura) jogador1.y += 6;

    // Movimento jogador 2 (P / L)
    if (teclas["p"] && jogador2.y > 0) jogador2.y -= 6;
    if (teclas["l"] && jogador2.y + raqueteAltura < altura) jogador2.y += 6;

    // Movimento da bola
    if (started && !paused) {
        bola.x += velX;
        bola.y += velY;
    }

    // Colisão com topo/base
    if (bola.y <= 0 || bola.y + bola.tamanho >= altura) velY *= -1;

    // Colisão com raquetes
    if (
        bola.x <= jogador1.x + raqueteLargura &&
        bola.y + bola.tamanho >= jogador1.y &&
        bola.y <= jogador1.y + raqueteAltura
    ) {
        velX *= -1;
    }

    if (
        bola.x + bola.tamanho >= jogador2.x &&
        bola.y + bola.tamanho >= jogador2.y &&
        bola.y <= jogador2.y + raqueteAltura
    ) {
        velX *= -1;
    }

    // Pontuação
    if (bola.x <= 0) {
        pontos2++;
        resetarBola();
    }

    if (bola.x + bola.tamanho >= largura) {
        pontos1++;
        resetarBola();
    }
}

function resetarBola() {
    bola.x = largura / 2;
    bola.y = altura / 2;
    velX *= -1;
}

function desenhar() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, largura, altura);

    ctx.fillStyle = "white";

    // Raquetes
    ctx.fillRect(jogador1.x, jogador1.y, raqueteLargura, raqueteAltura);
    ctx.fillRect(jogador2.x, jogador2.y, raqueteLargura, raqueteAltura);

    // Bola
    ctx.fillRect(bola.x, bola.y, bola.tamanho, bola.tamanho);

    // Linha central
    ctx.beginPath();
    ctx.moveTo(largura / 2, 0);
    ctx.lineTo(largura / 2, altura);
    ctx.strokeStyle = "white";
    ctx.stroke();

    // Pontuação
    ctx.font = "48px Arial";
    ctx.fillText(`${pontos1}     ${pontos2}`, largura / 2 - 62, 50);

    // Mensagem de início
    if (!started) {
        ctx.font = "32px Arial";
        ctx.fillText("Pressione ESPAÇO para iniciar", largura / 2 - 200, altura / 2);
    }

    // Instruções
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Jogador 1: W/S", 20, altura - 40);
    ctx.fillText("Jogador 2: P/L", largura - 180, altura - 40);
    ctx.fillText("Pausar: ESC", largura / 2 - 60, altura - 10);
}

function loop() {
    atualizar();
    desenhar();
    requestAnimationFrame(loop);
}

loop();
=======
const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

const largura = canvas.width;
const altura = canvas.height;

// Raquetes
const raqueteLargura = 10;
const raqueteAltura = 100;

let jogador1 = { x: 50, y: altura / 2 - raqueteAltura / 2 };
let jogador2 = { x: largura - 60, y: altura / 2 - raqueteAltura / 2 };

// Bola
let bola = { x: largura / 2, y: altura / 2, tamanho: 30 };
let velX = 5;
let velY = 5;

// Pontuação
let pontos1 = 0;
let pontos2 = 0;

// Teclas
let teclas = {};

// Inicio/Pausa
let started = false;
let paused = false;

document.addEventListener("keydown", (e) => teclas[e.key] = true);
document.addEventListener("keyup", (e) => teclas[e.key] = false);
document.addEventListener("keydown", (e) => {teclas[e.key]= true;
    if (e.key === " ") {
        started = true;
    }
    if (e.key === "Escape") {
        paused = !paused;  // Alterna o estado de pausa
    }
});

function atualizar() {

    // Movimento jogador 1 (W / S)
    if (teclas["w"] && jogador1.y > 0) jogador1.y -= 6;
    if (teclas["s"] && jogador1.y + raqueteAltura < altura) jogador1.y += 6;

    // Movimento jogador 2 (P / L)
    if (teclas["p"] && jogador2.y > 0) jogador2.y -= 6;
    if (teclas["l"] && jogador2.y + raqueteAltura < altura) jogador2.y += 6;

    // Movimento da bola
    if (started && !paused) {
        bola.x += velX;
        bola.y += velY;
    }

    // Colisão com topo/base
    if (bola.y <= 0 || bola.y + bola.tamanho >= altura) velY *= -1;

    // Colisão com raquetes
    if (
        bola.x <= jogador1.x + raqueteLargura &&
        bola.y + bola.tamanho >= jogador1.y &&
        bola.y <= jogador1.y + raqueteAltura
    ) {
        velX *= -1;
    }

    if (
        bola.x + bola.tamanho >= jogador2.x &&
        bola.y + bola.tamanho >= jogador2.y &&
        bola.y <= jogador2.y + raqueteAltura
    ) {
        velX *= -1;
    }

    // Pontuação
    if (bola.x <= 0) {
        pontos2++;
        resetarBola();
    }

    if (bola.x + bola.tamanho >= largura) {
        pontos1++;
        resetarBola();
    }
}

function resetarBola() {
    bola.x = largura / 2;
    bola.y = altura / 2;
    velX *= -1;
}

function desenhar() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, largura, altura);

    ctx.fillStyle = "white";

    // Raquetes
    ctx.fillRect(jogador1.x, jogador1.y, raqueteLargura, raqueteAltura);
    ctx.fillRect(jogador2.x, jogador2.y, raqueteLargura, raqueteAltura);

    // Bola
    ctx.fillRect(bola.x, bola.y, bola.tamanho, bola.tamanho);

    // Linha central
    ctx.beginPath();
    ctx.moveTo(largura / 2, 0);
    ctx.lineTo(largura / 2, altura);
    ctx.strokeStyle = "white";
    ctx.stroke();

    // Pontuação
    ctx.font = "48px Arial";
    ctx.fillText(`${pontos1}     ${pontos2}`, largura / 2 - 62, 50);

    // Mensagem de início
    if (!started) {
        ctx.font = "32px Arial";
        ctx.fillText("Pressione ESPAÇO para iniciar", largura / 2 - 200, altura / 2);
    }

    // Instruções
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Jogador 1: W/S", 20, altura - 40);
    ctx.fillText("Jogador 2: P/L", largura - 180, altura - 40);
    ctx.fillText("Pausar: ESC", largura / 2 - 60, altura - 10);
}

function loop() {
    atualizar();
    desenhar();
    requestAnimationFrame(loop);
}

loop();
>>>>>>> 9fa43ca7c348b5c51eb6311f26b17aa1f68ba0e1
