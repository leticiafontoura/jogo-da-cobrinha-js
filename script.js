let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); //renderiza o arquivo canvas
let box = 32; //32 pixels cada quadrado
let snake = [];
snake[0] = { x: 8 * box, y: 8 * box };
let direction = "right";
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};

function criarBG() {
  //funcao pra criar o bg do canvas
  context.fillStyle = "#70adb5"; //definindo cor do bg
  context.fillRect(0, 0, 16 * box, 16 * box); //desenha o retangulo onde vai acontecer o jogo. trabalha com 4 propriedades: posicao de XY, altura e largura. altura e largura de 16 quadrados com o tamanho do box
}

function criarCobrinha() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = "#ffcbcb";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function drawFood() {
  context.fillStyle = "#407088";
  context.fillRect(food.x, food.y, box, box);
}

//quando um evento acontece, detecta e chama uma função
document.addEventListener("keydown", update);

//keyCode é o codigo da tecla, existe uma lista disso. https://keycode.info/
function update(event) {
  if (event.keyCode == 37 && direction != "right") direction = "left";
  if (event.keyCode == 38 && direction != "down") direction = "up";
  if (event.keyCode == 39 && direction != "left") direction = "right";
  if (event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo() {
  if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
  if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(jogo);
      alert("perdeu, otário");
    }
  }

  criarBG();
  criarCobrinha();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);

//a cobrinha vai ser um array de coordenadas, pq vai adicionar um quadrado e tirar o ultimo etc pra ela andar
