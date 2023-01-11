const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const box = 40;
canvas.height = 16 * box;
canvas.width = 16 * box;

let snake = [];
snake[0] = {
  x: 2 * box,
  y: 7 * box,
};

//snake[0].x == snakeX == newHead.x
//snake[0].y == snakeY == newHead.y

let direction;

let food = {
  x: 10 * box,
  y: 7 * box,
};

let score = 0;

document.addEventListener("keydown", function (e) {
  let key = e.keyCode;
  if (key === 37 && direction != "right") {
    direction = "left";
  } else if (key == 38 && direction != "down") {
    direction = "up";
  } else if (key === 39 && direction != "left") {
    direction = "right";
  } else if (key == 40 && direction != "up") {
    direction = "down";
  }
});


function collision(head, array) {
  for(let i = 1; i < array.length; i++) {
    if(head.x == array[i].x && head.y == array[i].y) {
      
      return true
    }
  }
  return false
}



function game() {
  let draw = setInterval(function() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);

    for(let i = 0; i < snake.length; i++) {
      ctx.fillStyle = "green";
      ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;  // 2 * box (line 10)
    let snakeY = snake[0].y;  // 7 * box (line 11)

    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "right") snakeX += box;
    if (direction == "down") snakeY += box;

    // removes the last element of the array
    // snake.pop();

    let newHead = {
      x: snakeX, 
      y: snakeY,
    };

    snake.unshift(newHead);


    if (snakeX == food.x && snakeY == food.y) {
      food = {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box,
      };
      score += 1;
    } else {
      snake.pop();}
    


    if(snakeX < 0 || snakeX > 15 * box || snakeY < 0 || snakeY > 15 * box || collision(newHead, snake) == true){
      clearInterval(draw);
    }
    

}, 400);
  }
game();
