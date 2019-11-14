
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //the initial x position of each 'bug' will be selected randomly of these 4 values
    this.x = [-100 , 100, 200, 300][ Math.floor(Math.random() * 4)];
    //the initial y position of each 'bug' will be selected randomly of these 3 values which represent the stone-block rows in the game
    this.y = [60,140,220][ Math.floor(Math.random() * 3)];

    //the initial speed of each 'bug' will be selected randomly of these 4 values
    this.speed = [100,150,200,250][ Math.floor(Math.random() * 4)];
    
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    
    //move the enemy based on its speed
    this.x += this.speed * dt ; 

    //if the distance between the player and the enemy less than 60*60, collision will happen
    let dx = Math.abs(this.x - player.x);
    let dy = Math.abs(this.y - player.y);
    if(dx < 60 && dy < 60){
        player.reset();
        lose.innerText = ++loseCounter;
    }

    //if the enemy object across the screen, reset its position
    if(this.x > 500){
            this.x = -100;
            this.y = [60,140,220][ Math.floor(Math.random() * 3)];
            this.speed = [100,150,200,250][ Math.floor(Math.random() * 4)];
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player{

    constructor(){
         this.sprite = 'images/char-boy.png';

         //player initial position
         this.x = 200;
         this.y = 400;
    }

    reset(){
        this.x = 200;
        this.y = 400;
    }
}

Player.prototype.update = function(){

    //I used the lock to prevent accessing the if condition more than one time while waiting for the setTimeout method.
    if(this.y < 30 && lock){
        lock = false;
        setTimeout( () => {
            this.reset();
            win.innerText = ++winCounter;
            //if the player won three times, increase the level.
            if (winCounter % 3 === 0) {
                increaseLevel();
            }
            lock = true;
        }, 500);
    }
};

Player.prototype.handleInput = function(direction){

    if(direction === 'left'){
        this.x = (this.x > 0) ? this.x - 100 : this.x;
    }
    else if(direction === 'up'){
        this.y = (this.y > 0) ? this.y - 90 : this.y;
    }
    else if(direction === 'right'){
        this.x = (this.x < 400) ? this.x + 100 : this.x;
    }
    else{
        this.y = (this.y < 400) ? this.y + 90 : this.y;
    }
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [new Enemy() , new Enemy() , new Enemy() , new Enemy(), new Enemy() ];

let player = new Player();

let lock = true;

let levelCounter = 0;
let winCounter = 0;
let loseCounter = 0;

const level = document.querySelector('#level');
const win = document.querySelector('#win');
const lose = document.querySelector('#lose');
const repeat = document.querySelector("#repeat");

//increase the level counter and the game difficulty by inserting another enemy object.
function increaseLevel(){
    level.innerText = ++levelCounter;
    allEnemies.push(new Enemy());
}

//reset the game when the user click on the repeat button
repeat.addEventListener("click" , (e) => {

    while (levelCounter > 0) {
        allEnemies.pop();
        levelCounter--;

    }

    winCounter = 0;
    loseCounter = 0;

    level.innerText = 0;
    win.innerText = 0;
    lose.innerText = 0;




})


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



