
// variables
const gameBoard = document.querySelector("#gameBoard"); //tablero de juego
const ctx = gameBoard.getContext("2d"); //Obtiene el contexto del canvas
const scoreText = document.querySelector("#scoreText"); //Puntaje
const livesText = document.querySelector("#livesText"); //Muestra la vida
const hightscoreText = document.querySelector("#hightscoreText"); //Muestra el record
const menu_item = document.querySelector("#menu_item"); //Menu de inicio
const startBtn = document.querySelector("#startBtn"); //Boton de inicio del juego
const resetBtn = document.querySelector("#resetBtn"); //Boton para reiniciar el juego
const scoreMenu = document.querySelector("#scoreMenu"); //Puntaje del juego
const hscoreMenu = document.querySelector("#hscoreMenu"); //Muestra el record
const menu_item2 = document.querySelector("#menu_item2"); //Menu de inicio
const mute = document.querySelector("#mute"); //Mute
const configuracion = document.querySelector("#configuracion");
const apple_board = document.querySelector("#apple_board");
const apple_menu = document.querySelector("#apple_menu");
const gameWidth = gameBoard.width; //Ancho del tablero
const gameHeight = gameBoard.height; //Alto del tablero
const ground_menu = document.querySelector("#ground_menu");
const snake_menu = document.querySelector("#snake_menu");
const home_game = document.querySelector("#home_game");
const colors = ["#3f3f3f","#00FF00","#0000FF","#FFFF00","#FF00FF","#00FFFF","#000000","#FFFFFF",];
// Modal de inicio
var modal = document.getElementById("myModal"); //Modal de inicio
var btn = document.getElementById("myBtn"); //Boton de inicio
var span = document.getElementsByClassName("close")[0]; //Cierra el menu
const move = new Audio();
move.src = "sonidos/faild.mp3"; //Audio de muerte
const eat = new Audio();
eat.src = "sonidos/food.mp3"; //Sonido de comida
const type = new Audio();
type.src = "sonidos/sound_type.wav"; //Sonido de la serpiente
const backgroundBoard = new Image();
backgroundBoard.src = "img/board1.png"; //Imagen de fondo
const deadSnake = new Image();
deadSnake.src = "img/dead.png"; //Imagen de la serpiente muerta
const snakeColor = new Image();
snakeColor.src = "img/head.png"; //Cabeza de la serpiente
const snakebody2 = new Image();
snakebody2.src = "img/body1.png"; //Cambia la imagen del cuerpo de la serpiente
const food = new Image();
food.src = "img/apple4.png"; //Comida que se come default
const food2 = new Image();
food2.src = "img/apple4.png"; //Comida que se come default
const portal1 = new Image();
portal1.src = "img/portal.png"; //Comida en barriga de la serpiente default
const portal2 = new Image();
portal2.src = "img/portal2.png"; //portal de la serpiente
const stopfood = new Image();
stopfood.src = "img/game7.png"; //Cola de la serpiente default
const unitSize = 25; // tamaño de la caja
let running = false; // si el juego esta corriendo o no
let xVelocity = unitSize; // velocidad en X de la serpiente
let yVelocity = 0; //Velocidad en y de la serpiente
let foodX; //x coordenada de la comida
let foodY; //y coordenada de la comida
let foodX1; //x coordenada de la comida
let foodY1; //y coordenada de la comida
let foodX2; //x coordenada de la comida
let foodY2; //y coordenada de la comida
let foodX3; //x coordenada de la comida
let foodY3; //y coordenada de la comida
let foodX4; //x coordenada de la comida
let foodY4; //y coordenada de la comida
let score = 0; // puntaje
let menuscore = 0; //variable que almacena el puntaje del juego
let record = 0; // Record del juego
let lives = 3; // cantidad de vidas
let nivelcheck = 1;
let bordercheck = 1;
let skincheck = 1;
let foodscheck = 1;
let muted = 0; //0 = no muted, 1 = muted
let cambios = 0; //variable para validar el cambio de imagen
let rapidez = 100; //Velocidad de la serpiente
let tiempo_restante = 5;
let tiempo_terminado;
//Almacena en cache el record en puntos del juego
window.onload = function () {
  let record_final = localStorage.getItem("hightscoreText");
  if (record_final != undefined) record = record_final;
  hightscoreText.textContent = record;
};
const cambioFondo = () => {
  for (let j = 1; j <= 8; j++) {
    let fondo = document.getElementById(`board${j}`);
    let comida = document.getElementById(`apple${j}`);
    let cuerpo = document.getElementById(`body${j}`);
    let juegos = document.getElementById(`game${j}`);
    let border = document.getElementById(`border${j}`);
    let ramdomm = document.getElementById(`random1`);
      
    if (cambios == 0) {
      fondo.addEventListener("click", () => {
        gameBoard.style.backgroundImage = `url(img/board${j}.png)`;
        ground_menu.src = `img/board${j}.png`;
    });
    }
    if (cambios == 0) {
      comida.addEventListener("click", () => {
        food.src = `img/apple${j}.png`;
        food2.src = `img/apple${j}.png`;
        apple_board.src = `img/apple${j}.png`;
        apple_menu.src = `img/apple${j}.png`;
        foodscheck = j;
      });
    }
    if (cambios == 0) {
      cuerpo.addEventListener("click", () => {
        snakebody2.src = `img/body${j}.png`;
        snake_menu.src = `img/snake${j}.png`;
        skincheck = j;
    });
    }
    if (cambios == 0) {
      juegos.addEventListener("click", () => {
        nivelcheck = j;
      });
    }
    if (cambios == 0) {
      border.addEventListener("click", () => {
        gameBoard.style.border = `15px solid ${colors[j - 1]}`;
        bordercheck = j;
      });
    }
    if (cambios == 0) {
    ramdomm.addEventListener("click", () => {
        getRandomInt();
        nivelcheck = foodcheck;
        skincheck = foodcheck;
        bordercheck = foodcheck;
        gameBoard.style.backgroundImage = `url(img/board${foodcheck}.png)`;
        ground_menu.src = `img/board${foodcheck}.png`;
        food.src = `img/apple${foodcheck}.png`;
        food2.src = `img/apple${foodcheck}.png`;
        apple_board.src = `img/apple${foodcheck}.png`;
        apple_menu.src = `img/apple${foodcheck}.png`;
        gameBoard.style.border = `15px solid ${colors[bordercheck]}`;
        gameBoard.style.borderLeft = `15px solid ${colors[bordercheck - 1]}`;
        gameBoard.style.borderRight = `15px solid ${colors[bordercheck - 1]}`;
        gameBoard.style.borderTop = `15px solid ${colors[bordercheck - 1]}`;
        gameBoard.style.borderBottom = `15px solid ${colors[bordercheck - 1]}`;
    });
    }
    $(fondo).on('click', function(){
            $("img").removeClass('select_item1' );
            $(this).addClass('select_item1');
        });
    
    $(comida).on('click', function(){
        $("img").removeClass('select_item2');
        $(this).addClass('select_item2');
    });
    $(cuerpo).on('click', function(){
        $("img").removeClass('select_item3');
        $(this).addClass('select_item3');
    });
    $(juegos).on('click', function(){
        $("img").removeClass('select_item4');
        $(this).addClass('select_item4');
    });
    $(border).on('click', function(){
        $("img").removeClass('select_item5');
        $(this).addClass('select_item5');
    });
  }

};
cambioFondo();

// Cuerpo de la serpiente
const SnakeBody = () => {
  snake = [
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 },
  ];
};
SnakeBody();
resetBtn.addEventListener("click", () => {
  resetGame();
  startBtn.style.display = "none";
  resetBtn.style.display = "none";
  menu_item.style.display = "none";
  lives = lives;
});
// deteccion de teclas para mover la serpiente
window.addEventListener("keydown", changeDirection);

// Funcion que ejecuta el juego
function nextTick() {
  if (running == true) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, rapidez);
} else {
    displayGameOver(); //Perdiste el juego
}

}


// inicio del juego
function gameStart() {
  running = true;
  scoreText.textContent = score;
  menu_item2.style.display = "none";
  drawFood();
  createFood();
  nextTick();
}

function gameStop() { //Termina el juego al cerrarlo
  displayGameOver();
  lives = 0;
  if (lives >= 0) {
    running = false;
  }
}

const timeGame = () => { //Tiempo regressivo
    tiempo_terminado = setInterval(function () {
        if (nivelcheck == 3 && score > 0 ||  nivelcheck == 5 && score > 0) {
            tiempo_restante -= 1;
            if (tiempo_restante  >0){
               tiempo_restante = tiempo_restante;
            }
      if (tiempo_restante == 0 && nivelcheck == 3) {
        tiempo_restante = 5;
        createFood();
        clearInterval(tiempo_terminado);
        timeGame();
      } if(tiempo_restante == 0 && nivelcheck == 5){ 
        tiempo_restante = 4;
        createFood();
        clearInterval(tiempo_terminado);
        timeGame();
      }
      }
    }, 1000); //Se resta un 1 cada segundo que pasa
    return tiempo_terminado;
};
timeGame();
  
// Funcion que limpia el tablero de juego
function clearBoard() {
  // ctx.drawImage(backgroundBoard, 0, 0, gameWidth, gameHeight);
  ctx.clearRect(0, 0, gameWidth, gameHeight);
}
// Funcion que crea la comida
function createFood() {
  // Genera un numero aleatorio entre 0 y el ancho del tablero
  function randomFood(min, max) {
    const randNum =
      Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
    return randNum;
  }
  // Crea la comida en una posicion aleatoria

        
   if (nivelcheck == 2 && score %3 == 0 && score != 0){
       foodX1 = randomFood(0, gameWidth - unitSize); foodY1 = randomFood(0, gameWidth - unitSize);
        foodX2 = randomFood(0, gameWidth - unitSize); foodY2 = randomFood(0, gameWidth - unitSize);
        foodX3 = randomFood(0, gameWidth - unitSize); foodY3 = randomFood(0, gameWidth - unitSize);
        foodX4 = randomFood(0, gameWidth - unitSize); foodY4 = randomFood(0, gameWidth - unitSize);
  }else if(nivelcheck == 8 && score %5== 0 && score !=0){
    foodX4 = randomFood(0, gameWidth - unitSize); foodY4 = randomFood(0, gameWidth - unitSize);
  }else if(nivelcheck == 7 && score %5== 0 && score !=0){
        foodX2 = randomFood(0, gameWidth - unitSize); foodY2 = randomFood(0, gameWidth - unitSize);
        foodX3 = randomFood(0, gameWidth - unitSize); foodY3 = randomFood(0, gameWidth - unitSize);

  }
    foodX = randomFood(0, gameWidth - unitSize); foodY = randomFood(0, gameWidth - unitSize);
  
}
// Funcion que verifica si el juego se termino
const drawFood = () => {       
    if(nivelcheck == 2 && score %3 == 0 && score != 0){ 
               ctx.drawImage(portal2, foodX1, foodY1, unitSize, unitSize); ctx.drawImage(food, foodX2, foodY2, unitSize, unitSize);
               ctx.drawImage(food, foodX3, foodY3, unitSize, unitSize); ctx.drawImage(portal1, foodX4, foodY4, unitSize, unitSize); 
               ctx.drawImage(food, foodX, foodY, unitSize, unitSize);      
       }else if(nivelcheck == 8 && score %5== 0 && score !=0){
        ctx.drawImage(portal2, foodX1, foodY1, unitSize, unitSize); ctx.drawImage(food, foodX2, foodY2, unitSize, unitSize);
       }   
        ctx.drawImage(food, foodX, foodY, unitSize, unitSize);   
};
// Mueve la serpiente
const moveSnake = () => {
  const head = {
    x: snake[0].x + xVelocity,
    y: snake[0].y + yVelocity,
  };

  snake.unshift(head);
  // Si la cabeza de la serpiente se encuentra en la comida
  if (snake[0].x == foodX && snake[0].y == foodY && nivelcheck != 2 || nivelcheck == 2 && snake[0].x == foodX && snake[0].y == foodY) {  
    score += 1;
    scoreText.textContent = score;
    scoreMenu.textContent = score;
    hscoreMenu.textContent = score;
    //Guarda y suma el record cuando el puntaje sea mayor que el record
    if (score < record) record = score;
    localStorage.setItem("hightscoreText", record);
    document.getElementById("hightscoreText").innerHTML = record;
    createFood();
    eat.play();
  } else {
    snake.pop(); // Elimina el ultimo elemento del array
  }
};
// Funcion que dibuja la serpiente
function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    i == 0
      ? ctx.drawImage(snakeColor, snake[i].x, snake[i].y, unitSize, unitSize)
      : ctx.drawImage(snakebody2, snake[i].x, snake[i].y, unitSize, unitSize);
    // i == snake.length - 1 ? ctx.drawImage(deadSnake, snake[i].x, snake[i].y, unitSize, unitSize) : null;
  }
}

// Funcion que verifica la pulsacion de las teclas
function changeDirection(event) {
  const keyPressed = event.keyCode;
  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;
  const W = 87;
  const A = 65;
  const S = 83;
  const D = 68;
  const goingUp = yVelocity == -unitSize; // Si la serpiente va hacia arriba
  const goingDown = yVelocity == unitSize; // Si la serpiente va hacia abajo
  const goingRight = xVelocity == unitSize; // Si la serpiente va hacia la derecha
  const goingLeft = xVelocity == -unitSize; // Si la serpiente va hacia la izquierda

  switch(true){
    case(keyPressed == LEFT && !goingRight || keyPressed == A && !goingRight): 
        xVelocity = -unitSize;
        yVelocity = 0;
        break;
    case(keyPressed == UP && !goingDown || keyPressed == W && !goingDown):
        xVelocity = 0;
        yVelocity = -unitSize;
        break;
    case(keyPressed == RIGHT && !goingLeft || keyPressed == D && !goingLeft):
        xVelocity = unitSize;
        yVelocity = 0;
        break;
    case(keyPressed == DOWN && !goingUp || keyPressed == S && !goingUp):
        xVelocity = 0;
        yVelocity = unitSize;
        break;
}
  
}

      
const livesDead = () => {
  if (score % 10 == 0 && score != 0 && nivelcheck == 1) {
    lives == lives;
  } else {
    lives -= 1;
    livesText.textContent = lives;
    for (let i = 1; i < snake.length; i += 1) {
      ctx.drawImage(deadSnake, snake[i].x, snake[i].y, unitSize, unitSize);
      //Dibuja la serpiente muerta
    }
  }
  if (lives == 0) {
    //Si la vida es 0, se termina el juego
    running = false;
    displayMessage("💀", 200);
  }
};

function getRandomInt() {foodcheck =   Math.floor(Math.random() * 8 + 1)}
// Funcion que verifica si el juego se termino
function checkGameOver() {
  // Si la serpiente se encuentra en el borde del tablero
  switch (true) {
    case snake[0].x < 0:
      running = true;
      snake[0].x = gameWidth;
      move.play();
      livesDead();
      gameBoard.style.borderLeft = `15px solid red`;
      setTimeout(() => { gameBoard.style.borderLeft = `15px solid ${colors[bordercheck - 1]}`}, 100);
      break;
    case snake[0].x >= gameWidth:
      running = true;
      snake[0].x = 0;
      move.play();
      livesDead();
      gameBoard.style.borderRight = "15px solid red";
      setTimeout(() => {gameBoard.style.borderRight = `15px solid ${colors[bordercheck - 1]}`}, 100);
      break;
    case snake[0].y < 0:
      running = true;
      snake[0].y = gameHeight;
      move.play();
      livesDead();
      gameBoard.style.borderTop = "15px solid red";
      setTimeout(() => {gameBoard.style.borderTop = `15px solid ${colors[bordercheck - 1]}`}, 100);
      break;
    case snake[0].y >= gameHeight:
      running = true;
      snake[0].y = 0;
      move.play();
      livesDead();
      gameBoard.style.borderBottom = "15px solid red";
      setTimeout(() => {gameBoard.style.borderBottom = `15px solid ${colors[bordercheck - 1]}`}, 100);
      break;
  }
  //Muerte la serpiente
  if (lives >= 0 && lives <= lives) {
    //Si la vida es mayor a 0 y menor a 3
    for (let i = 1; i < snake.length; i += 1) {
      if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
        running = false;
        move.play();
        livesDead();
      }
    }
  }
  if (score % 10 == 0 && score != 0 && nivelcheck == 1) {
    running = true;
    displayMessage("👻", 80);
    snakebody2.src = `img/ghost.png`;
    move.pause();
    move.currentTime = 0;
  }else{
    snakebody2.src = `img/body${skincheck}.png`;
  }


  if (nivelcheck == 2 && score % 3 == 0 && score != 0) {
      //Si la serpiente se encuentra en la comida
      if(snake[0].x == foodX1 && snake[0].y == foodY1){
      setTimeout (() => {
        snake[0].x = foodX4;
        snake[0].y = foodY4;
      },100);
    }
    
      if (snake[0].x == foodX2 && snake[0].y == foodY2 || snake[0].x == foodX3 && snake[0].y == foodY3 ) {  
        createFood();
        eat.play();
      }else if(snake[0].x == foodX4 && snake[0].y == foodY4){
        snake[0].x = foodX1; snake[0].y = foodY1;
      }
  }
  if (nivelcheck == 3) { //Si el modo de juego es 3
    if(score == 0){displayMessage("", 80)}
     if(lives ==0){displayMessage("", 80)}
    else if(score >0){displayMessage(tiempo_restante, 80)
  }
}
    if (nivelcheck == 4 && score %2 == 0 && score !=0) { //Si el modo de juego es 4 
        getRandomInt();
        food.src = `img/apple${foodcheck}.png`; 
        apple_board.src = `img/apple${foodcheck}.png`; 
    }
    if (nivelcheck == 5) { //Si el modo de juego es 3
        if(score == 0){displayMessage("", 80);
        }else{
            displayMessage(tiempo_restante, 80);
        }if(lives ==0){
            displayMessage("", 80);}
        if(tiempo_restante ==1){
            ctx.drawImage(food, foodX-10, foodY-10, 60, 60);
      }else{
        displayMessage("")
      }
    }
  if (nivelcheck == 6) {
    rapidez = 55;
    getRandomInt();
    snakebody2.src = `img/body${foodcheck}.png`; 
   }else{
    rapidez = 100;
   }
    if (nivelcheck == 7 && score %5 == 0 && score !=0) {
        ctx.drawImage(food, foodX2, foodY2, unitSize, unitSize);  ctx.drawImage(food, foodX3, foodY3, unitSize, unitSize);
        }if (snake[0].x == foodX2 && snake[0].y == foodY2 || snake[0].x == foodX3 && snake[0].y == foodY3) {  
            move.play();
            createFood();
        }
         if(nivelcheck == 8 && score %5== 0 && score !=0){ //Si el modo de juego es 5
            ctx.drawImage(deadSnake, foodX4, foodY4, unitSize, unitSize)
            if (snake[0].x == foodX4 && snake[0].y == foodY4 ) { 
                lives += 1;
                livesText.textContent = lives; 
                score += 1;
                createFood();             
            }      
        }
}
const goBack = () => {
  menu_item2.style.display = "none";
}
// Funcion para silenciar el juego
const toggleMute = () => {
  move.muted = !move.muted; // Si el sonido esta silenciado, lo reproduce, de lo contrario lo silencia
  eat.muted = !eat.muted; // Si el sonido esta silenciado, lo reproduce, de lo contrario lo silencia
  type.muted = !type.muted; // Si el sonido esta silenciado, lo reproduce, de lo contrario lo silencia
  if (muted == 0) {
    // Si el juego no esta silenciado
    mute.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
    muted = 1;
  } else if (muted == 1) {
    // Si el juego  esta silenciado
    mute.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
    muted = 0;
  }
}
const displayMessage = (menssage, font) => { // Funcion para mostrar mensajes en el canvas
  ctx.font = `${font}px Verdana`;
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText(menssage, gameWidth / 2, gameHeight / 2);
};


function displayGameOver() { // Funcion que inicia el juego y lo reinicia
  if (lives == 0) {
    setTimeout(() => {
        tiempo_restante = 5;
      // Espera 1 segundo antes de mostrar el menu
      menu_item.style.display = "block";
      resetBtn.style.display = "inline-block";
      startBtn.style.display = "inline-block";
      lives = 3;
      livesText.textContent = lives; // Muestra el numero de vidas
    }, 1000);
  } else {
    resetGame();
  }
}


function resetGame() {// Funcion que reinicia el juego
  if (lives == 3) {
    score = 0;
  }
  scoreText.textContent = score; // score
  scoreMenu.textContent = score; // score menu
  hscoreMenu.textContent = score; // hight score menu
  xVelocity = unitSize;
  yVelocity = 0;
  SnakeBody();
  gameStart();
}
// Funcion que abre el menu
const openMenu = () => {
  menu_item2.style.display = "block";
};

// cualquier elemento que se clickea en el modal se cierra
btn.onclick = function () {
  modal.style.display = "block";
  home_game.style.display = "none";
};
// cuando el usuario hace click en el span, cierra el modal
span.onclick = function () {
  modal.style.display = "none";
  home_game.style.display = "block";
  running = false;
  displayGameOver();
};
// Cuando el usuario hace click fuera del modal, cierra el modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    home_game.style.display = "block";
  }
};

