//Adding sound assets
var bgSound = new Audio("./assets/sounds/bg.mp3");
var gameOverSound = new Audio("./assets/sounds/game_over.wav");
var foodPickup = new Audio("./assets/sounds/pickup.wav");

//Declaring variables
var field = document.getElementsByClassName('field')[0];
var joystick = document.getElementsByClassName('joystick')[0];
var gameOver = false;
var snakeArray = [{x: 5, y: 5}]
var food = { x: 15, y:17}
var movingDir = {x: 0, y: 0};
var lastPaintTime = 0;
var speed = 7;
var score = 0;
var height;
var showJoystick = false;

if(window.outerWidth > 1000){
    height = '85svh';
}
else if(window.outerWidth<= 768){
    height = '41svh';
    showJoystick = true;
}
function playGame(){

    $('.container').css({"height": height});
    $('.container').css({"width": height});
    $('.front').slideUp(600);
    $('.field').show(800).css({"display": "grid"});
    $('.scorebar').slideDown(600);
    if(showJoystick){
        $('.joystick').show(800).css({"display": "flex"});
    }
    
    $('.scorebar').fadeIn(200);
    $('.scorebar').fadeOut(200);
    $('.scorebar').fadeIn(200);
    $('.scorebar').fadeOut(200);
    $('.scorebar').fadeIn(200);

    bgSound.play();
    bgSound.loop = true;
    bgSound.volume = 0.2;

}

window.requestAnimationFrame(main);

function main(ctime){
    if(!gameOver){
        window.requestAnimationFrame(main);
        if(((ctime - lastPaintTime)/1000 < 1/speed)){
            return;
        }
        lastPaintTime = ctime;
        gameEngine();
    }
}

function gameEngine(){
    //Updating the score    
    
    $('.scorebar').text(`Score- ${score}`);
    //Moving the snake
    field.innerHTML = '';
    snakeArray.forEach((e,index)=>{
        let snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add("snake-head");
        }
        else{
            snakeElement.classList.add("snake")
        }
        field.appendChild(snakeElement);
    })

    //Displaying the food
    let foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    field.appendChild(foodElement);

    //Controlling the snake
    document.addEventListener("keydown", (e)=>{

        switch(e.key){
            //For WASD config
            case "w":
                movingDir ={ x: 0, y: -1};
            break;
            case 'a':
                movingDir ={ x: -1, y: 0};
            break;
            case 's':
                movingDir ={ x: 0, y: 1};
            break;
            case 'd':
                movingDir ={ x: 1, y: 0};
            break;

            //For WASD config
            case "W":
                movingDir ={ x: 0, y: -1};
            break;
            case 'A':
                movingDir ={ x: -1, y: 0};
            break;
            case 'S':
                movingDir ={ x: 0, y: 1};
            break;
            case 'D':
                movingDir ={ x: 1, y: 0};
            break;

            //For Arrow config
            case "ArrowUP":
                movingDir ={ x: 0, y: -1};
            break;
            case 'ArrowLeft':
                movingDir ={ x: -1, y: 0};
            break;
            case 'ArrowDown':
                movingDir ={ x: 0, y: 1};
            break;
            case 'ArrowRight':
                movingDir ={ x: 1, y: 0};
            break;
            default:

        }
    })
    joystick.addEventListener('click', (e)=>{
        let direction = e.target.id;
        console.log(direction)
        switch(direction){
            case "up":
                movingDir ={ x: 0, y: -1};
            break;
            case 'left':
                movingDir ={ x: -1, y: 0};
            break;
            case 'down':
                movingDir ={ x: 0, y: 1};
            break;
            case 'right':
                movingDir ={ x: 1, y: 0};
            break;
            default:
        }
    })


    if(food.x === snakeArray[0].x && food.y === snakeArray[0].y){
        score+=1;
        foodPickup.play();
        snakeArray.push({x: snakeArray[snakeArray.length-1].x + movingDir.x, x: snakeArray[snakeArray.length-1].y + movingDir.y });
        food = foodGenerator();
    }

    for(let i = snakeArray.length-1; i>0; i--){
        snakeArray[i] = {...snakeArray[i-1]}    
    }
    snakeArray[0] = { x: snakeArray[0].x + movingDir.x, y : snakeArray[0].y + movingDir.y}
    

    //Condition for game over 
    //First if the snake bumps into wall
    if(snakeArray[0].x <=0 || snakeArray[0].x>20 || snakeArray[0].y <=0 || snakeArray[0].y>20)
    {
        bgSound.pause();
        gameOver = true;
        gameOverSound.play();
        $('.container').css({"animation":"gameOver 0.5s linear"});
        playAgain();
    }

    //Second if the snake bumps into itself
    for(let i = 1; i<snakeArray.length; i++){
        if(snakeArray[0].x === snakeArray[i].x && snakeArray[0].y === snakeArray[i].y)
        {
            bgSound.pause();
            gameOver = true;
            gameOverSound.play();
            playAgain();
        }
    }

}

function foodGenerator(){
    let generatedFood = {
        x: Math.round(20*Math.random()),
        y: Math.round(20*Math.random())
        
    }
    return generatedFood;
}

function playAgain(){
    gameOver = false;
    snakeArray = [{x: 5, y: 5}];
    food = { x: 15, y:17};
    movingDir = {x: 0, y: 0};
    lastPaintTime = 0;
    speed = 7;
    score = 0;

    $('.container').css({"height": "90svh"});
    $('.container').css({"width": height});
    $('.front').slideDown(600);
    $('.field').hide(800).css({"display": "none"});
    $('.joystick').hide(800).css({"display": "none"});
    $('.scorebar').slideUp(600);

    $('.heading').text("GAME OVER");
    $('#play-btn').text("PLAY AGAIN")
    bgSound.stop();
}