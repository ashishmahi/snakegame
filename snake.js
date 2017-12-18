// ----------------miscellaneous----------------------------
const createGrid = function(cell,rows){
  let cellIDCounter = 1;
  let numberOfCells = cell*rows;
  let body = document.getElementById("body");
  let table = document.createElement("table");
  for (var rowNumber = 1; rowNumber <= rows; rowNumber++) {
    let row = document.createElement("tr");
    row.id = "row"+rowNumber;
    for (var cellNumber = 1; cellNumber <= cell; cellNumber++) {
      let cell = document.createElement("td");
      cell.id = cellIDCounter;
      row.appendChild(cell);
      cellIDCounter++;
    }
    table.appendChild(row);
  }
  body.appendChild(table);
}

// ----------------xx miscellaneous  xx----------------------------


// ----------------module----------------------------

const Snake = function(){
  this.snakePositions = [ 203, 204, 205, 206 ];
  this.tail =this.snakePositions.slice(-1);
  this.key = "ArrowRight";
  this.foodPosition;
  this.sizeOfGrid = 50;
}

Snake.prototype.updateSnakePosToDown = function (ref) {
  let tail = ref.snakePositions.shift();
  let newSnakeHeadId = ref.snakePositions.slice(-1)[0] + ref.sizeOfGrid;
  ref.snakePositions.push(+newSnakeHeadId);
  ref.tail = tail;
};

Snake.prototype.updateSnakePosUp = function (ref) {
  let tail = ref.snakePositions.shift();
  let newSnakeHeadId = ref.snakePositions.slice(-1)[0]-ref.sizeOfGrid;
  ref.snakePositions.push(+newSnakeHeadId);
  ref.tail = tail;
};

Snake.prototype.updateSnakePosRight = function (ref) {
  let tail = ref.snakePositions.shift();
  let newSnakeHeadId = ref.snakePositions.slice(-1)[0]+1;
  ref.snakePositions.push(+newSnakeHeadId);
  ref.tail = tail;
};

Snake.prototype.updateSnakePosLeft = function (ref) {
  let tail = ref.snakePositions.shift();
  let newSnakeHeadId = ref.snakePositions.slice(-1)[0]-1;
  ref.snakePositions.push(+newSnakeHeadId);
  ref.tail = tail;
};


Snake.prototype.updateSnakePos = function(key){
  let actions ={
    "ArrowDown":this.updateSnakePosToDown,
    "ArrowRight":this.updateSnakePosRight,
    "ArrowUp":this.updateSnakePosUp,
    "ArrowLeft":this.updateSnakePosLeft
  };
  actions[key](this);
}

Snake.prototype.generatedFood = function(){
  let maxPossiblePos = this.sizeOfGrid*this.sizeOfGrid;
  let foodPosition = Math.floor(Math.random()*maxPossiblePos)
  if(this.snakePositions.includes(foodPosition)){
    this.generatedFood();
  }
  this.foodPosition = foodPosition;
}


Snake.prototype.didSnakeEatFood = function(){
  let snakeHead = this.snakePositions.slice(-1);
  return this.foodPosition == snakeHead;
}

Snake.prototype.isGameOver = function () {
  let maxPossiblePos = this.sizeOfGrid*this.sizeOfGrid;
  let head = this.snakePositions.slice(-1);
  let didSnakeHitTopEdge = head<0;
  let didSnakeHitBottomEdge = head>(maxPossiblePos);
  return didSnakeHitTopEdge||didSnakeHitBottomEdge
};
// ----------------xx module xx----------------------------
// ---------------------------------->
// ---------------------------------->
// ---------------------------------->
// ---------------------------------->

let snake = new Snake();

// ----------------view----------------------------

const showFood = function(){
  let foodPosition = snake.foodPosition;
  document.getElementById(foodPosition).className = "food";
}

const updateSnakeOnDisplay = function(){
  let tail = snake.tail;
  let newSnakePositions = snake.snakePositions;
  document.getElementById(tail).className = "";
  newSnakePositions.map(function(snakePosition){
    document.getElementById(snakePosition).className="snake";
  });
}

const drawSnake = function(){
  let head = snake.snakePositions[0];
  let tail = snake.snakePositions.slice(-1);
  for (let id = head; id <= tail; id++) {
    let snakePart = document.getElementById(id);
    snakePart.className = "snake";
  }
}

const updateDisplay = function(text){
  document.getElementById("display").innerText = text;
}


// ----------------xx view xx----------------------------


// ----------------controller----------------------------

const actionOnArrowKeys = function(event){
  snake.key = event.key;
}

const moveSnakeAndDisplay = function(){
  snake.updateSnakePos(snake.key);
  updateDisplayOfGame();
}

const updateDisplayOfGame = function(){
  if(snake.didSnakeEatFood()){
    snake.snakePositions.push(snake.foodPosition);
    snake.generatedFood();
  }
  if(snake.isGameOver()){
    updateDisplay("GAME OVER");
    return;
  }
  showFood();
  updateSnakeOnDisplay();
}

// ----------------xx controller xx----------------------------

const loadGame = function(){
  let sizeOfGrid = snake.sizeOfGrid;
  createGrid(sizeOfGrid,sizeOfGrid);
  drawSnake();
  snake.generatedFood();
  window.addEventListener("keydown",actionOnArrowKeys);
  setInterval(moveSnakeAndDisplay,60);
}

// module.exports = Snake;

window.onload = loadGame;
