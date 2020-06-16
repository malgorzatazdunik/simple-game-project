/*

The Game Project 7 - Making a complete level

Week 7

*/
var clouds;
var mountains;
var trees;
var houseXs;
var towers;
var sunPos;

var canyon; 
var diamond;
///////////////////////////////////////////
var game_char_x;
var game_char_y;
var floorPos_y;
var scrollPos;
var realPos;
////////////////////////
var isLeft;
var isRight;
var isJumping;
var isFalling;

var isOnPlatform;
////////////////////////////////
var face = {
    x:0,
    y:0
};
var skinColor = {
    r: 0,
    g: 170,
    b: 50
};
////////////////
var yspeed = 3;

var cloudspeed = 0.3;
//////////////////////
var score;

var isWon;
var isLost;
var lives;
var enemies;
var platforms;



function setup()
{
	createCanvas(1024, 576);
    floorPos_y = height * 3/4;
    
    
    
    
    startGame();
    lives = 3;
    
}
function startGame()
{
    	
    score = 0;
    
	game_char_x = width/2;
	game_char_y = floorPos_y - 30;
/////////
     //number of lives
    
	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	realPos = game_char_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isJumping = false;
	isFalling = false;
    isWon = false;
    isLost = false;
    isOnPlatform = false;
    

	// Initialise arrays of scenery objects.
    sunPos = {x_pos: 250, y_pos : height*1/3};
    houseXs = [-1700,50,500,800, 2000];
    clouds = [{x_pos:400, y_pos:50, size:85},{x_pos:20,y_pos:30,size:90},
              {x_pos:200,y_pos:100,size:85},{x_pos:750,y_pos:50,size:100}, 
             {x_pos:1100,y_pos:150,size:85}]; 
    mountains = [{x_pos:-1250,heightY:150},{x_pos:-900, heightY:230},
                 {x_pos:-100,heightY:170},{x_pos:200,heightY:230},
                {x_pos:450,heightY:200}, {x_pos:700,heightY:270},{x_pos:950,heightY:200},
                {x_pos:1200, heightY:140},{x_pos:1600,heightY:260}];
    trees = [{x_pos:-1400, heightY:45},{x_pos:-1200,heightY: 35}, {x_pos: -200, heightY:25},
             {x_pos: 20, heightY:30},{x_pos: 220, heightY: 40}, {x_pos: 435, heightY: 25}, 
            {x_pos: 630, heightY: 35}, {x_pos:755, heightY: 30}, {x_pos: 940, heightY: 45},
            {x_pos: 1100, heightY: 30}, {x_pos:1350, heightY: 20}, {x_pos:1600, heightY: 35},
            {x_pos: 1800, heightY: 45}];
    towers = [-500, 650, 1600];
    
    
    canyon = [{x_pos: 300, width: 100},{x_pos: 900, width: 150},{x_pos: -300, width: 50}, {x_pos : 1700, width: 1000}, {x_pos: -2500, width: 700}, {x_pos: 2800, width: 3000}, {x_pos: -1500, width: 250}];
    
    diamond = [{x_pos: 110, y_pos: floorPos_y - 100, size: 50, isFound: false}, {x_pos: 800, y_pos: floorPos_y, size: 50, isFound: false}, {x_pos: 1400, y_pos: floorPos_y, size: 50, isFound: false}, {x_pos: -500, y_pos: floorPos_y, size: 50, isFound: false}, {x_pos: 1875, y_pos: floorPos_y - 100, size: 50, isFound: false}, {x_pos: 2750, y_pos: floorPos_y - 50, size: 50, isFound: false},{x_pos: -1585, y_pos: floorPos_y - 70, size: 50, isFound: false}];
    
    enemies = [];
    
    platforms = [];
    
    
    
    for(var i  = 0; i < 5; i++) {
        
    
    clouds.push({
        x_pos: i* random(0,width),
        y_pos: random(floorPos_y - 100),
        size: random(85,95),
    })
    mountains.push({
            x_pos: i* random(200,300),
            heightY: random(140,270),
    })
    }
    for(var i = 0; i < 10; i++) {
        trees.push({
            x_pos: i* random(30,200),
            heightY: random(20,45)
            
        })
    }
    for(var i = 0; i < 2; i++){
        houseXs.push(1500)
    }
    
    
    
    
    enemies.push(
    {
        x_pos: 20,
        y_pos: floorPos_y,
        x1: 20,
        x2: 200,
        speed: 1,
        size: 30,
        display: function()
        {
            var col = {
                r: map(this.x_pos,100,200,this.x1,this.x2),
                g: map(this.x_pos,200,100,this.x1,this.x2),
                b: map(this.x_pos,100,200,this.x1,this.x2),
            }
            // Draw enemy.
            fill([col.r,col.g,col.b]);
            ellipse(this.x_pos, this.y_pos, this.size);
            fill(255);
            ellipse(this.x_pos, this.y_pos, 10,10);
            fill(0);
            ellipse(this.x_pos, this.y_pos, 5,5);
        },
        ///////
        move: function() {
        this.x_pos += this.speed;
        if(this.x_pos < this.x1 || this.x_pos > this.x2) {
        this.speed *= -1; //oposite direction
        } 
        },
        checkCharCollision: function() {
            if((realPos - 10>= this.x_pos - this.size && realPos - 10 <= this.x_pos + this.size) ||
              realPos + 10 >= this.x_pos - this.size && realPos + 10 <= this.x_pos + this.size) {
                //console.log('x') // collision with the right or left side of the character 
            
                if((game_char_y + 30 <= this.y_pos + this.size && game_char_y + 30 >= this.y_pos - this.size) || game_char_y - 35 >= this.y_pos - this.size && game_char_y - 35 <= this.y_pos + this.size)
                    //console.log('y');
                playerDied();
                ////collision with either top of head or feet
            }
//            
//         if(realPos  >= this.x_pos - 30 && realPos <= this.x_pos + 30) {
//             console.log('dziala');
//             if(game_char_y + 30 <= this.y_pos +30 && game_char_y + 30 >= this.y_pos -30){
//                 console.log('nogi');
//             }
//         }  
        }
    },
    {
       x_pos: 200,
        y_pos: floorPos_y,
        x1: 20,
        x2: 200,
        speed: 1,
        size: 30,
        display: function()
        {
            var col = {
               r: map(this.x_pos,100,200,this.x1,this.x2),
                g: map(this.x_pos,200,100,this.x1,this.x2),
                b: map(this.x_pos,100,200,this.x1,this.x2),
            }
            // Draw enemy.
            fill([col.r,col.g,col.b]);
            ellipse(this.x_pos, this.y_pos, this.size);
             fill(255);
            ellipse(this.x_pos, this.y_pos, 10,10);
            fill(0);
            ellipse(this.x_pos, this.y_pos, 5,5);
        },
        ///////
        move: function() {
        this.x_pos -= this.speed;
        if(this.x_pos < this.x1 || this.x_pos > this.x2) {
        this.speed *= -1; //oposite direction
        } 
        },
        checkCharCollision: function() {
            if((realPos - 10>= this.x_pos - this.size && realPos - 10 <= this.x_pos + this.size) ||
              realPos + 10 >= this.x_pos - this.size && realPos + 10 <= this.x_pos + this.size) {
                //console.log('x') // collision with the right or left side of the character 
            
                if((game_char_y + 30 <= this.y_pos + this.size && game_char_y + 30 >= this.y_pos - this.size) || game_char_y - 35 >= this.y_pos - this.size && game_char_y - 35 <= this.y_pos + this.size)
                    //console.log('y');
                playerDied();
                ////collision with either top of head or feet
            }
        }
    },              {
       x_pos: 1150,
        y_pos: floorPos_y,
        y1: floorPos_y - 200,
        y2: floorPos_y,
        speed: 3,
        size: 30,
        display: function()
        {
            var col = {
                r: map(this.y_pos,100,200,this.y1,this.y2),
                g: map(this.y_pos,200,0,this.y1,this.y2),
                b: map(this.y_pos,200,0,this.y1,this.y2),
            }
            // Draw enemy.
            fill([col.r,col.g,col.b]);
            ellipse(this.x_pos, this.y_pos, this.size);
             fill(255);
            ellipse(this.x_pos, this.y_pos, 10,10);
            fill(0);
            ellipse(this.x_pos, this.y_pos, 5,5);
        },
        ///////
        move: function() {
        this.y_pos -= this.speed;
        if(this.y_pos < this.y1 || this.y_pos > this.y2) {
        this.speed *= -1; //oposite direction
        } 
        },
        checkCharCollision: function() {
            if((realPos - 10>= this.x_pos - this.size && realPos - 10 <= this.x_pos + this.size) ||
              realPos + 10 >= this.x_pos - this.size && realPos + 10 <= this.x_pos + this.size) {
                //console.log('x') // collision with the right or left side of the character 
            
                if((game_char_y + 30 <= this.y_pos + this.size && game_char_y + 30 >= this.y_pos - this.size) || game_char_y - 35 >= this.y_pos - this.size && game_char_y - 35 <= this.y_pos + this.size)
                    //console.log('y');
                playerDied();
                ////collision with either top of head or feet
            }
        }
                },
        
             {
       x_pos: 1300,
        y_pos: floorPos_y - 200,
        y1: floorPos_y - 200,
        y2: floorPos_y,
        speed: 3,
        size: 30,
        display: function()
        {
            var col = {
               r: map(this.y_pos,200,0,this.y1,this.y2),
                g: map(this.y_pos,200,0,this.y1,this.y2),
                b: map(this.y_pos,0,200,this.y1,this.y2),
            }
            // Draw enemy.
            fill([col.r,col.g,col.b]);
            ellipse(this.x_pos, this.y_pos, this.size);
             fill(255);
            ellipse(this.x_pos, this.y_pos, 10,10);
            fill(0);
            ellipse(this.x_pos, this.y_pos, 5,5);
        },
        ///////
        move: function() {
        this.y_pos -= this.speed;
        if(this.y_pos < this.y1 || this.y_pos > this.y2) {
        this.speed *= -1; //oposite direction
        } 
        },
        checkCharCollision: function() {
            if((realPos - 10>= this.x_pos - this.size && realPos - 10 <= this.x_pos + this.size) ||
              realPos + 10 >= this.x_pos - this.size && realPos + 10 <= this.x_pos + this.size) {
                //console.log('x') // collision with the right or left side of the character 
            
                if((game_char_y + 30 <= this.y_pos + this.size && game_char_y + 30 >= this.y_pos - this.size) || game_char_y - 35 >= this.y_pos - this.size && game_char_y - 35 <= this.y_pos + this.size)
                    //console.log('y');
                playerDied();
                ////collision with either top of head or feet
            }
        }
             },
                               {
       x_pos: 1450,
        y_pos: floorPos_y,
        y1: floorPos_y - 200,
        y2: floorPos_y,
        speed: 3,
        size: 30,
        display: function()
        {
            var col = {
                r: map(this.y_pos,100,200,this.y1,this.y2),
                g: map(this.y_pos,0,200,this.y1,this.y2),
                b: map(this.y_pos,200,0,this.y1,this.y2),
            }
            // Draw enemy.
            fill([col.r,col.g,col.b]);
            ellipse(this.x_pos, this.y_pos, this.size);
             fill(255);
            ellipse(this.x_pos, this.y_pos, 10,10);
            fill(0);
            ellipse(this.x_pos, this.y_pos, 5,5);
        },
        ///////
        move: function() {
        this.y_pos -= this.speed;
        if(this.y_pos < this.y1 || this.y_pos > this.y2) {
        this.speed *= -1; //oposite direction
        } 
        },
        checkCharCollision: function() {
            if((realPos - 10>= this.x_pos - this.size && realPos - 10 <= this.x_pos + this.size) ||
              realPos + 10 >= this.x_pos - this.size && realPos + 10 <= this.x_pos + this.size) {
                //console.log('x') // collision with the right or left side of the character 
            
                if((game_char_y + 30 <= this.y_pos + this.size && game_char_y + 30 >= this.y_pos - this.size) || game_char_y - 35 >= this.y_pos - this.size && game_char_y - 35 <= this.y_pos + this.size)
                    //console.log('y');
                playerDied();
                ////collision with either top of head or feet
            }
        }
                },
        
             {
       x_pos: 1600,
        y_pos: floorPos_y - 200,
        y1: floorPos_y - 200,
        y2: floorPos_y,
        speed: 3,
        size: 30,
        display: function()
        {
            var col = {
                r: map(this.y_pos,0,200,this.y1,this.y2),
                g: map(this.y_pos,200,0,this.y1,this.y2),
                b: map(this.y_pos,0,200,this.y1,this.y2),
            }
            // Draw enemy.
            fill([col.r,col.g,col.b]);
            ellipse(this.x_pos, this.y_pos, this.size);
             fill(255);
            ellipse(this.x_pos, this.y_pos, 10,10);
            fill(0);
            ellipse(this.x_pos, this.y_pos, 5,5);
        },
        ///////
        move: function() {
        this.y_pos -= this.speed;
        if(this.y_pos < this.y1 || this.y_pos > this.y2) {
        this.speed *= -1; //oposite direction
        } 
        },
        checkCharCollision: function() {
            if((realPos - 10>= this.x_pos - this.size && realPos - 10 <= this.x_pos + this.size) ||
              realPos + 10 >= this.x_pos - this.size && realPos + 10 <= this.x_pos + this.size) {
                //console.log('x') // collision with the right or left side of the character 
            
                if((game_char_y + 30 <= this.y_pos + this.size && game_char_y + 30 >= this.y_pos - this.size) || game_char_y - 35 >= this.y_pos - this.size && game_char_y - 35 <= this.y_pos + this.size)
                    //console.log('y');
                playerDied();
                ////collision with either top of head or feet
            }
        }
             },
        
        {
       x_pos: -1100,
        y_pos: floorPos_y,
        x1: -1100,
        x2: -800,
        speed: 1,
        size: 30,
        display: function()
        {
            var col = {
                r: 0,
                g: 255,
                b: 0
            }
            // Draw enemy.
            fill([col.r,col.g,col.b]);
            ellipse(this.x_pos, this.y_pos, this.size);
             fill(255);
            ellipse(this.x_pos, this.y_pos, 10,10);
            fill(0);
            ellipse(this.x_pos, this.y_pos, 5,5);
        },
        ///////
        move: function() {
        this.x_pos -= this.speed;
        if(this.x_pos < this.x1 || this.x_pos > this.x2) {
        this.speed *= -1; //oposite direction
        } 
        },
        checkCharCollision: function() {
            if((realPos - 10>= this.x_pos - this.size && realPos - 10 <= this.x_pos + this.size) ||
              realPos + 10 >= this.x_pos - this.size && realPos + 10 <= this.x_pos + this.size) {
                //console.log('x') // collision with the right or left side of the character 
            
                if((game_char_y + 30 <= this.y_pos + this.size && game_char_y + 30 >= this.y_pos - this.size) || game_char_y - 35 >= this.y_pos - this.size && game_char_y - 35 <= this.y_pos + this.size)
                    //console.log('y');
                playerDied();
                ////collision with either top of head or feet
            }
        }
        },
            
            {
       x_pos: -800,
        y_pos: floorPos_y,
        x1: -1100,
        x2: -800,
        speed: 1,
        size: 30,
        display: function()
        {
            var col = {
               r: 130,
                g: 0,
                b: 130
            }
            // Draw enemy.
            fill([col.r,col.g,col.b]);
            ellipse(this.x_pos, this.y_pos, this.size);
             fill(255);
            ellipse(this.x_pos, this.y_pos, 10,10);
            fill(0);
            ellipse(this.x_pos, this.y_pos, 5,5);
        },
        ///////
        move: function() {
        this.x_pos -= this.speed;
        if(this.x_pos < this.x1 || this.x_pos > this.x2) {
        this.speed *= -1; //oposite direction
        } 
        },
        checkCharCollision: function() {
            if((realPos - 10>= this.x_pos - this.size && realPos - 10 <= this.x_pos + this.size) ||
              realPos + 10 >= this.x_pos - this.size && realPos + 10 <= this.x_pos + this.size) {
                //console.log('x') // collision with the right or left side of the character 
            
                if((game_char_y + 30 <= this.y_pos + this.size && game_char_y + 30 >= this.y_pos - this.size) || game_char_y - 35 >= this.y_pos - this.size && game_char_y - 35 <= this.y_pos + this.size)
                    //console.log('y');
                playerDied();
                ////collision with either top of head or feet
            }
        }
            },
            {
       x_pos: -1700,
        y_pos: floorPos_y,
        x1: -1700,
        x2: -1500,
        speed: 4,
        size: 30,
        display: function()
        {
            var col = {
               r: map(this.x_pos,100,200,this.x1,this.x2),
                g: map(this.x_pos,100,150,this.x1,this.x2),
                b: map(this.x_pos,200,0,this.x1,this.x2),
            }
            // Draw enemy.
            fill(col.r,col.g,col.b);
            ellipse(this.x_pos, this.y_pos, this.size);
             fill(255);
            ellipse(this.x_pos, this.y_pos, 10,10);
            fill(0);
            ellipse(this.x_pos, this.y_pos, 5,5);
        },
        ///////
        move: function() {
        this.x_pos -= this.speed;
        if(this.x_pos < this.x1 || this.x_pos > this.x2) {
        this.speed *= -1; //oposite direction
        } 
        },
        checkCharCollision: function() {
            if((realPos - 10>= this.x_pos - this.size && realPos - 10 <= this.x_pos + this.size) ||
              realPos + 10 >= this.x_pos - this.size && realPos + 10 <= this.x_pos + this.size) {
                //console.log('x') // collision with the right or left side of the character 
            
                if((game_char_y + 30 <= this.y_pos + this.size && game_char_y + 30 >= this.y_pos - this.size) || game_char_y - 35 >= this.y_pos - this.size && game_char_y - 35 <= this.y_pos + this.size)
                    //console.log('y');
                playerDied();
                ////collision with either top of head or feet
            }
        }
            },
               {
       x_pos: -1500,
        y_pos: floorPos_y,
        x1: -1700,
        x2: -1500,
        speed: 4,
        size: 30,
        display: function()
        {
            var col = {
                r: map(this.x_pos,100,200,this.x1,this.x2),
                g: map(this.x_pos,100,200,this.x1,this.x2),
                b: map(this.x_pos,200,0,this.x1,this.x2),
            }
            // Draw enemy.
            fill(col.r,col.g,col.b);
            ellipse(this.x_pos, this.y_pos, this.size);
             fill(255);
            ellipse(this.x_pos, this.y_pos, 10,10);
            fill(0);
            ellipse(this.x_pos, this.y_pos, 5,5);
        },
        ///////
        move: function() {
        this.x_pos -= this.speed;
        if(this.x_pos < this.x1 || this.x_pos > this.x2) {
        this.speed *= -1; //oposite direction
        } 
        },
        checkCharCollision: function() {
            if((realPos - 10>= this.x_pos - this.size && realPos - 10 <= this.x_pos + this.size) ||
              realPos + 10 >= this.x_pos - this.size && realPos + 10 <= this.x_pos + this.size) {
                //console.log('x') // collision with the right or left side of the character 
            
                if((game_char_y + 30 <= this.y_pos + this.size && game_char_y + 30 >= this.y_pos - this.size) || game_char_y - 35 >= this.y_pos - this.size && game_char_y - 35 <= this.y_pos + this.size)
                    //console.log('y');
                playerDied();
                ////collision with either top of head or feet
            }
        }
            },
                   
                
                {
       x_pos: -440,
        y_pos: floorPos_y,
        y1: floorPos_y - 200,
        y2: floorPos_y,
        speed: 3,
        size: 30,
        display: function()
        {
            // Draw enemy.
            
            var col = {
                r: 100,
                g: map(this.y_pos,200,0,this.y1,this.y2),
                b: map(this.y_pos,0,200,this.y1,this.y2),
            }
            fill([col.r,col.g,col.b]);
            ellipse(this.x_pos, this.y_pos, this.size);
             fill(255);
            ellipse(this.x_pos, this.y_pos, 10,10);
            fill(0);
            ellipse(this.x_pos, this.y_pos, 5,5);
        },
        ///////
        move: function() {
        this.y_pos -= this.speed;
        if(this.y_pos < this.y1 || this.y_pos > this.y2) {
        this.speed *= -1; //oposite direction
        } 
        },
        checkCharCollision: function() {
            if((realPos - 10>= this.x_pos - this.size && realPos - 10 <= this.x_pos + this.size) ||
              realPos + 10 >= this.x_pos - this.size && realPos + 10 <= this.x_pos + this.size) {
                //console.log('x') // collision with the right or left side of the character 
            
                if((game_char_y + 30 <= this.y_pos + this.size && game_char_y + 30 >= this.y_pos - this.size) || game_char_y - 35 >= this.y_pos - this.size && game_char_y - 35 <= this.y_pos + this.size)
                    //console.log('y');
                playerDied();
                ////collision with either top of head or feet
            }
        }
                },
        
             {
       x_pos: -570,
        y_pos: floorPos_y - 200,
        y1: floorPos_y - 200,
        y2: floorPos_y,
        speed: 3,
        size: 30,
        display: function()
        {
            var col = {
                r: 200,
                g: map(this.y_pos,0,200,this.y1,this.y2),
                b: map(this.y_pos,200,0,this.y1,this.y2),
            }
            // Draw enemy.
            fill([col.r,col.g,col.b]);
            ellipse(this.x_pos, this.y_pos, this.size);
             fill(255);
            ellipse(this.x_pos, this.y_pos, 10,10);
            fill(0);
            ellipse(this.x_pos, this.y_pos, 5,5);
        },
        ///////
        move: function() {
        this.y_pos -= this.speed;
        if(this.y_pos < this.y1 || this.y_pos > this.y2) {
        this.speed *= -1; //oposite direction
        } 
        },
        checkCharCollision: function() {
            if((realPos - 10>= this.x_pos - this.size && realPos - 10 <= this.x_pos + this.size) ||
              realPos + 10 >= this.x_pos - this.size && realPos + 10 <= this.x_pos + this.size) {
                //console.log('x') // collision with the right or left side of the character 
            
                if((game_char_y + 30 <= this.y_pos + this.size && game_char_y + 30 >= this.y_pos - this.size) || game_char_y - 35 >= this.y_pos - this.size && game_char_y - 35 <= this.y_pos + this.size)
                    //console.log('y');
                playerDied();
                ////collision with either top of head or feet
            }
        }
                
              
},
        
           {
       x_pos: -1230,
        y_pos: floorPos_y - 300,
        y1: floorPos_y - 300,
        y2: floorPos_y,
        speed: 3,
        size: 30,
        display: function()
        {
            var col = {
                r: map(this.y_pos,255,0,this.y1,this.y2),
                g: map(this.y_pos,0,255,this.y1,this.y2),
                b: 0,
            }
            // Draw enemy.
            fill([col.r,col.g,col.b]);
            ellipse(this.x_pos, this.y_pos, this.size);
            fill(255);
            ellipse(this.x_pos, this.y_pos, 10,10);
            fill(0);
            ellipse(this.x_pos, this.y_pos, 5,5);
        },
        ///////
        move: function() {
        this.y_pos -= this.speed;
        if(this.y_pos < this.y1 || this.y_pos > this.y2) {
        this.speed *= -1; //oposite direction
        } 
        },
        checkCharCollision: function() {
            if((realPos - 10>= this.x_pos - this.size && realPos - 10 <= this.x_pos + this.size) ||
              realPos + 10 >= this.x_pos - this.size && realPos + 10 <= this.x_pos + this.size) {
                //console.log('x') // collision with the right or left side of the character 
            
                if((game_char_y + 30 <= this.y_pos + this.size && game_char_y + 30 >= this.y_pos - this.size) || game_char_y - 35 >= this.y_pos - this.size && game_char_y - 35 <= this.y_pos + this.size)
                    //console.log('y');
                playerDied();
                ////collision with either top of head or feet
            }
        }
                
              
}
    );
    
    
    
    platforms.push(
    {
        x_pos: 10,
        y_pos: floorPos_y - 70,
        width: 200,
        height: 15,
        display: function()
        {
            // Draw platform.
            fill([255, 255, 0]);
            rect(this.x_pos, this.y_pos, this.width, this.height);
            line(this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2);
        },
        checkCharOn: function() 
        {
            if((realPos - 10>= this.x_pos && realPos  <= this.x_pos - 10 + this.width) || realPos + 10>= this.x_pos && realPos  <= this.x_pos + 10 + this.width){
                //console.log('x');
                if(game_char_y >= this.y_pos - 30 ){
                    //console.log('ison')
                    isOnPlatform = true;
                    isJumping = false;
                    
                }
            }
            
        }
    },
        {
        x_pos: 10,
        y_pos: floorPos_y - 70,
        width: 200,
        height: 15,
        display: function()
        {
            // Draw platform.
            fill([255, 255, 0]);
            rect(this.x_pos, this.y_pos, this.width, this.height);
            line(this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2);
        },
        checkCharOn: function() 
        {
            if((realPos - 10>= this.x_pos && realPos  <= this.x_pos - 10 + this.width) || realPos + 10>= this.x_pos && realPos  <= this.x_pos + 10 + this.width){
                //console.log('x');
                if(game_char_y >= this.y_pos - 30 ){
                    //console.log('ison')
                    isOnPlatform = true;
                    isJumping = false;
                    
                }
            }
            
        }
    }, {
        x_pos: 2100,
        y_pos: floorPos_y - 70,
        width: 50,
        height: 15,
        display: function()
        {
            // Draw platform.
            fill([255, 255, 0]);
            rect(this.x_pos, this.y_pos, this.width, this.height);
            line(this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2);
        },
        checkCharOn: function() 
        {
            if((realPos - 10>= this.x_pos && realPos  <= this.x_pos - 10 + this.width) || realPos + 10>= this.x_pos && realPos  <= this.x_pos + 10 + this.width){
                //console.log('x');
                if(game_char_y  >= this.y_pos - 30){
                    //console.log('ison')
                    isOnPlatform = true;
                    isJumping = false;
                    
                }
            }
            
        }
    },
        {
        x_pos: 2300,
        y_pos: floorPos_y - 70,
        width: 50,
        height: 15,
        display: function()
        {
            // Draw platform.
            fill([255, 255, 0]);
            rect(this.x_pos, this.y_pos, this.width, this.height);
            line(this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2);
        },
        checkCharOn: function() 
        {
            if((realPos - 10>= this.x_pos && realPos  <= this.x_pos - 10 + this.width) || realPos + 10>= this.x_pos && realPos  <= this.x_pos + 10 + this.width){
                //console.log('x');
                if(game_char_y  >= this.y_pos - 30){
                    //console.log('ison')
                    isOnPlatform = true;
                    isJumping = false;
                    
                }
            }
            
        }
    },
        {
            x_pos: 2500,
        y_pos: floorPos_y - 70,
        width: 50,
        height: 15,
        display: function()
        {
            // Draw platform.
            fill([255, 255, 0]);
            rect(this.x_pos, this.y_pos, this.width, this.height);
            line(this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2);
        },
        checkCharOn: function() 
        {
            if((realPos - 10>= this.x_pos && realPos  <= this.x_pos - 10 + this.width) || realPos + 10>= this.x_pos && realPos  <= this.x_pos + 10 + this.width){
                //console.log('x');
                if(game_char_y  >= this.y_pos - 30){
                    //console.log('ison')
                    isOnPlatform = true;
                    isJumping = false;
                    
                }
            }
            
        }
    },
        
        {
        x_pos: 1850,
        y_pos: floorPos_y - 70,
        width: 50,
        height: 15,
        display: function()
        {
            // Draw platform.
            fill([255, 255, 0]);
            rect(this.x_pos, this.y_pos, this.width, this.height);
            line(this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2);
        },
        checkCharOn: function() 
        {
            if((realPos - 10>= this.x_pos && realPos  <= this.x_pos - 10 + this.width) || realPos + 10>= this.x_pos && realPos  <= this.x_pos + 10 + this.width){
                //console.log('x');
                if(game_char_y  >= this.y_pos - 30){
                    //console.log('ison')
                    isOnPlatform = true;
                    isJumping = false;
                    
                }
            }
            
        }
    },
          

           {
        x_pos: -950,
        y_pos: floorPos_y - 70,
        width: 50,
        height: 15,
        display: function()
        {
            // Draw platform.
            fill([255, 255, 0]);
            rect(this.x_pos, this.y_pos, this.width, this.height);
            line(this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2);
        },
        checkCharOn: function() 
        {
            if((realPos - 10>= this.x_pos && realPos  <= this.x_pos - 10 + this.width) || realPos + 10>= this.x_pos && realPos  <= this.x_pos + 10 + this.width){
                //console.log('x');
                if(game_char_y >= this.y_pos - 30 ){
                    //console.log('ison')
                    isOnPlatform = true;
                    isJumping = false;
                    
                }
            }
            
        }
    },
        
               {
        x_pos: -1200,
        y_pos: floorPos_y - 70,
        width: 50,
        height: 15,
        display: function()
        {
            // Draw platform.
            fill([255, 255, 0]);
            rect(this.x_pos, this.y_pos, this.width, this.height);
            line(this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2);
        },
        checkCharOn: function() 
        {
            if((realPos - 10>= this.x_pos && realPos  <= this.x_pos - 10 + this.width) || realPos + 10>= this.x_pos && realPos  <= this.x_pos + 10 + this.width){
                //console.log('x');
                if(game_char_y >= this.y_pos - 30 ){
                    //console.log('ison')
                    isOnPlatform = true;
                    isJumping = false;
                    
                }
            }
            
        }
    },
        
                       {
        x_pos: -1400,
        y_pos: floorPos_y - 70,
        width: 30,
        height: 15,
        display: function()
        {
            // Draw platform.
            fill([255, 255, 0]);
            rect(this.x_pos, this.y_pos, this.width, this.height);
            line(this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2);
        },
        checkCharOn: function() 
        {
            if((realPos - 10>= this.x_pos && realPos  <= this.x_pos - 10 + this.width) || realPos + 10>= this.x_pos && realPos  <= this.x_pos + 10 + this.width){
                //console.log('x');
                if(game_char_y >= this.y_pos - 30 ){
                    //console.log('ison')
                    isOnPlatform = true;
                    isJumping = false;
                    
                }
            }
            
        }
    }, 
        
         {
        x_pos: -1600,
        y_pos: floorPos_y - 70,
        width: 30,
        height: 15,
        display: function()
        {
            // Draw platform.
            fill([255, 255, 0]);
            rect(this.x_pos, this.y_pos, this.width, this.height);
            line(this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2);
        },
        checkCharOn: function() 
        {
            if((realPos - 10>= this.x_pos && realPos  <= this.x_pos - 10 + this.width) || realPos + 10>= this.x_pos && realPos  <= this.x_pos + 10 + this.width){
                //console.log('x');
                if(game_char_y >= this.y_pos - 30 ){
                    //console.log('ison')
                    isOnPlatform = true;
                    isJumping = false;
                    
                }
            }
            
        }
    }
);
}

function draw()
{
	background(225,110,90); // fill the sky blue
    
    fill(255,69,0);
    noStroke();
    ellipse(sunPos.x_pos,sunPos.y_pos,70,70); // sun

	noStroke();
	fill(95,170,140);
	rect(0, floorPos_y, width, height/4); // draw some green ground
    
    face.x = game_char_x;
    face.y = game_char_y-10;

	// Draw clouds.
    push();
    translate(0.1*scrollPos,0);
    drawClouds();
    
    ///clouds movement
    for(var c=0; c<clouds.length; c++){
        clouds[c].x_pos += cloudspeed;
        if(clouds[c].x_pos - 50 > width) {
            clouds[c].x_pos = -200;
        }
    }
    
    pop();
  

	// Draw mountains.
    push();
    translate(0.5*scrollPos,0);
    drawMountains();
    pop();
    
    ///towers
    push();
    translate(0.6*scrollPos,0);
    drawTowers();
    pop();
     

	// Draw trees.
    push();
    translate(0.8*scrollPos,0);
    drawTress();
    pop();
    

	// Draw houses.
       push();
    translate(0.9*scrollPos,0);
    drawHouses();
    pop();
    
    
        
   

	// Draw canyons.
    push();
    translate(scrollPos,0);
    drawCanyon(canyon);
    checkCanyon(canyon);
    pop();

	// Draw pickup items.      
        
    
    for(var i = 0; i < diamond.length; i++){
    push();
    translate(scrollPos,0);
        
    
    drawDiamond(diamond[i]);
    checkDiamond(diamond[i]);
        
    pop();
        
     
       
             
    }
    textSize(25);
    textFont("Georgia");
      fill(255);
        text("Score: " + score, 100,height - 100);
    fill(255,0,0);
    text("Lives: " + lives, 100,height - 50);
   
    
    
    //////////
    
    
    ////draw ENEMIES :D
    push();
    translate(scrollPos,0);
    for(var i = 0; i < enemies.length; i++) {
        enemies[i].display();
        enemies[i].move();
        enemies[i].checkCharCollision();
    }
    pop();
    
    ////draw PLATFORMS :)
    push();
    translate(scrollPos,0);
    isOnPlatform = false;
    for(var i = 0; i < platforms.length; i++)
        {
            platforms[i].display();
            platforms[i].checkCharOn();
        }
    pop();
 
    
    /////////////

	// Draw game character.
	drawGameChar();
    
    /////////
    checkPlayerWon();
    checkPlayerDied();
    
    /////////end state of the game
    
    //////////game over-you lost
    if(isLost == true) 
        {
            fill(255);
            stroke(0);
            textSize(30);
            text('Game over - you lost. Press space to continue',width/2-270,height/2);
            return;
        }
    /////////you won
    if(isWon == true)
        {
            fill(255);
            stroke(0);
            textSize(30);
            text('Game over - YOU WON. Press space to continue',width/2-290,height/2);
            return;
        }
    

	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
			if(game_char_x > width * 0.2)
			{
					game_char_x -= 5;
			}
			else
			{
					scrollPos += 5;
			}
	}

	if(isRight)
	{
			if(game_char_x < width * 0.8)
			{
					game_char_x  += 5;
			}
			else
			{
					scrollPos -= 5; // negative for moving against the background
			}
	}
    
   
    

	// Logic to make the game character rise and fall.
  
//////////////////it doesn't work properly
//////////////////////it's not possible to jump while on the platform
  
//if(isJumping) {
//        game_char_y = game_char_y - yspeed; //going up jumping
//      
//     if(game_char_y <= floorPos_y - 100) {
//        yspeed = -yspeed;  //falls after jumping
//         
//    
//        }
//    if(game_char_y == floorPos_y - 30 || isOnPlatform) {
//            isJumping = false; //stops jumping/doesnt jump in the air
//            yspeed = -yspeed; //doesn't go down the next time it jumps
//        } 
//    }
//    
// 
//    if(!isOnPlatform && !isJumping){
//        if(game_char_y + 30 < floorPos_y){
//           isJumping = true; //falls when is not on the platfrom and is in the air
//            
//        }
//    }
    
    
//   if(isOnPlatform && isJumping)
//   {
//      
//      yspeed = -yspeed;
//      
//   }


 
if(game_char_y  < floorPos_y - 30)
	{
       
           game_char_y += 2;
			isJumping = true; 
    } else
        {
            isOnPlatform =false;
            isJumping = false;
            
        }
if(isOnPlatform)
    {
        for(i = 0; i < platforms.length; i++){
          game_char_y  = platforms[i].y_pos - 30;  
        }
        
        isFalling = false;
        isJumping = false;

        
    }

//	if(isFalling)
//	{
//			game_char_y += 5;
//	}
    
    

	// Update real position of gameChar for collision detection.
	realPos = game_char_x - scrollPos;
}


// ---------------------
// Key control functions
// ---------------------

function keyPressed(){

		// console.log(keyCode);
		// console.log(key);
    if(isLost || isWon)
    {
    if(key == ' ')
    {
        nextLevel();
    }
    return;
    }

	if(key == 'A' || keyCode == 37)
	{
			isLeft = true;
	}

	if(key == 'D' || keyCode == 39)
	{
			isRight = true;
	}

	if(key == ' ' || key == 'W' || keyCode == 38)
	{
        //isJumping = true;
			if(!isJumping)
			{
					game_char_y -= 115;
			}
	}
    
}

function keyReleased(){

	if(key == 'A' || keyCode == 37)
	{
		isLeft = false;
	}

	if(key == 'D' || keyCode == 39)
	{
		isRight = false;
	}

}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
	// draw game character
    //the game character
    //jumping left & 
    if(isLeft && isJumping) // jumping left
    {
    //body
    fill(0,0,255);
    rect(game_char_x-10,game_char_y,20,20);
    //head
    fill(skinColor.r,skinColor.g,skinColor.b);
    ellipse(game_char_x,game_char_y-10,25,25);
    fill(200,50,0);
    rect(game_char_x-15,game_char_y-20,30,5);
    rect(game_char_x-10,game_char_y-30,20,10);
    strokeWeight(3);
    line(face.x+5,face.y-25/2,face.x+10,face.y-25);
    
    //arms
    fill(skinColor.r,skinColor.g,skinColor.b);
    noStroke();
    rect(game_char_x+3,game_char_y+5,13,5,10);
    rect(game_char_x-18,game_char_y+5,8,5,10);
    
    //face
    stroke(255);
    strokeWeight(5);
    point(game_char_x-5,game_char_y-10);
    stroke(0);
    strokeWeight(3);
    point(face.x-6,face.y)
    
    //antennas
    strokeWeight(3);
    stroke(skinColor.r,skinColor.g,skinColor.b);
    line(face.x+5,face.y-25/2,face.x+10,face.y-20);
    strokeWeight(5);
    point(face.x+10,face.y-20);
    point(face.x-10,face.y-20);
    
    
    //legs
    noStroke();
    fill(150,150,150);
    rect(game_char_x-15,game_char_y+20,15,7);
    rect(game_char_x,game_char_y+20,15,7);
    fill(0);
    rect(game_char_x-20,game_char_y+20,5,7);
    rect(game_char_x+15,game_char_y+20,5,7);
    

    }
    else if(isRight && isJumping) //jumping right
    { 
    //body
    fill(0,0,255);
    rect(game_char_x-10,game_char_y,20,20);
    //head
    fill(skinColor.r,skinColor.g,skinColor.b);
    ellipse(game_char_x,game_char_y-10,25,25);
    fill(200,50,0);
    rect(game_char_x-15,game_char_y-20,30,5);
    rect(game_char_x-10,game_char_y-30,20,10);
    
    //arms
    fill(skinColor.r,skinColor.g,skinColor.b);
    noStroke();
    rect(game_char_x-18,game_char_y+5,13,5,10);
    rect(game_char_x+10,game_char_y+5,8,5,10);
    
    //legs
    fill(150,150,150);
    rect(game_char_x-15,game_char_y+20,15,7);
    rect(game_char_x,game_char_y+20,15,7);
    fill(0);
    rect(game_char_x-20,game_char_y+20,5,7);
    rect(game_char_x+15,game_char_y+20,5,7);
    
     //face
    stroke(255);
    strokeWeight(5);
    point(game_char_x+5,game_char_y-10);
    stroke(0);
    strokeWeight(3);
    point(face.x+6,face.y)
    
    //antennas
    strokeWeight(3);
    stroke(skinColor.r,skinColor.g,skinColor.b);
    line(face.x-5,face.y-25/2,face.x-10,face.y-20);
    strokeWeight(5);
    point(face.x+10,face.y-20);
    point(face.x-10,face.y-20);
    

    }
    else if(isLeft) //walking left
    {
         //body
    fill(0,0,255);
    rect(game_char_x-10,game_char_y,20,20);
    //head
    fill(skinColor.r,skinColor.g,skinColor.b);
    ellipse(game_char_x,game_char_y-10,25,25);
    fill(200,50,0);
    rect(game_char_x-15,game_char_y-20,30,5);
    rect(game_char_x-10,game_char_y-30,20,10);
    
    //legs
    fill(150,150,150);
    quad(game_char_x-10,game_char_y+20,game_char_x,game_char_y+20,game_char_x-10,game_char_y+30,game_char_x-15,game_char_y+25);
    quad(game_char_x,game_char_y+20,game_char_x+10, game_char_y+20,game_char_x+15,game_char_y+25, game_char_x+10,game_char_y+30);
    //feet
    fill(0);
    quad(game_char_x-14,game_char_y+24, game_char_x-18, game_char_y+28, game_char_x-12, game_char_y+32, game_char_x-8,game_char_y+28);//left
    quad(game_char_x+8, game_char_y+28, game_char_x+14, game_char_y+24, game_char_x+18, game_char_y+28, game_char_x+12, game_char_y+32);//right 
    
    //face
    stroke(255);
    strokeWeight(5);
    point(game_char_x-5,game_char_y-10);
    stroke(0);
    strokeWeight(3);
    point(face.x-6,face.y)
    
    //antennas
    strokeWeight(3);
    stroke(skinColor.r,skinColor.g,skinColor.b);
    line(face.x+5,face.y-25/2,face.x+10,face.y-20);
    strokeWeight(5);
    point(face.x+10,face.y-20);
    point(face.x-10,face.y-20);
    
    //arms
    fill(skinColor.r,skinColor.g,skinColor.b);
    noStroke();
    rect(game_char_x+3,game_char_y+5,13,5,10);
    rect(game_char_x-18,game_char_y+5,8,5,10);
    

    }
    else if(isRight) //walking right
    {
        // add your walking right code
        //body
    fill(0,0,255);
    rect(game_char_x-10,game_char_y,20,20);
    //head
    fill(skinColor.r,skinColor.g,skinColor.b);
    ellipse(game_char_x,game_char_y-10,25,25);
    fill(200,50,0);
    rect(game_char_x-15,game_char_y-20,30,5);
    rect(game_char_x-10,game_char_y-30,20,10);
    
    //legs
    fill(150,150,150);
    quad(game_char_x-10,game_char_y+20,game_char_x,game_char_y+20,game_char_x-10,game_char_y+30,game_char_x-15,game_char_y+25);
    quad(game_char_x,game_char_y+20,game_char_x+10, game_char_y+20,game_char_x+15,game_char_y+25, game_char_x+10,game_char_y+30);
    //feet
    fill(0);
    quad(game_char_x-14,game_char_y+24, game_char_x-18, game_char_y+28, game_char_x-12, game_char_y+32, game_char_x-8,game_char_y+28);//left
    quad(game_char_x+8, game_char_y+28, game_char_x+14, game_char_y+24, game_char_x+18, game_char_y+28, game_char_x+12, game_char_y+32);//right
    
    //face
    stroke(255);
    strokeWeight(5);
    point(game_char_x+5,game_char_y-10);
    stroke(0);
    strokeWeight(3);
    point(face.x+6,face.y)
    
    //antennas
    strokeWeight(3);
    stroke(skinColor.r,skinColor.g,skinColor.b);
    line(face.x-5,face.y-25/2,face.x-10,face.y-20);
    strokeWeight(5);
    point(face.x+10,face.y-20);
    point(face.x-10,face.y-20);
    
    //arms
    fill(skinColor.r,skinColor.g,skinColor.b);
    noStroke();
    rect(game_char_x-18,game_char_y+5,13,5,10);
    rect(game_char_x+10,game_char_y+5,8,5,10);


    }
    else if(isJumping || isFalling) //jumping/falling facing forward
    {
        // add your jumping facing forwards code
         //body
    fill(0,0,255);
    rect(game_char_x-10,game_char_y,20,20);
    //head
    fill(skinColor.r,skinColor.g,skinColor.b);
    ellipse(game_char_x,game_char_y-10,25,25);
    fill(200,50,0);
    rect(game_char_x-15,game_char_y-20,30,5);
    rect(game_char_x-10,game_char_y-30,20,10);
    
    //face
    stroke(255);
    strokeWeight(5);
    point(game_char_x-5,game_char_y-10);
    point(game_char_x+5,game_char_y-10);
    stroke(0);
    strokeWeight(3);
    point(game_char_x-5,game_char_y-10);
    point(game_char_x+5,game_char_y-10);
    
    //antennas
    strokeWeight(3);
    stroke(skinColor.r,skinColor.g,skinColor.b);
    line(face.x+5,face.y-25/2,face.x+10,face.y-20);
    line(face.x-5,face.y-25/2,face.x-10,face.y-20);
    strokeWeight(5);
    point(face.x+10,face.y-20);
    point(face.x-10,face.y-20);
    
     //arms
    fill(skinColor.r,skinColor.g,skinColor.b);
    noStroke();
    rect(game_char_x-20,game_char_y,10,5,10);
    rect(game_char_x+10,game_char_y,10,5,10);
    
    //legs
    fill(150,150,150);
    noStroke();
    quad(game_char_x-10,game_char_y+20,game_char_x,game_char_y+20,game_char_x-10,game_char_y+30,game_char_x-15,game_char_y+25);
    quad(game_char_x,game_char_y+20,game_char_x+10, game_char_y+20,game_char_x+15,game_char_y+25, game_char_x+10,game_char_y+30);
    fill(0);
    quad(game_char_x-14,game_char_y+24, game_char_x-18, game_char_y+28, game_char_x-12, game_char_y+32, game_char_x-8,game_char_y+28);//left
    quad(game_char_x+8, game_char_y+28, game_char_x+14, game_char_y+24, game_char_x+18, game_char_y+28, game_char_x+12, game_char_y+32);//right 
    

    }
    else         // just doing nothing facing forwards
    {
        // add your standing front facing code
         //body
    fill(0,0,255);
    rect(game_char_x-10,game_char_y,20,20);
    //head
    fill(skinColor.r,skinColor.g,skinColor.b);
    ellipse(game_char_x,game_char_y-10,25,25);
    fill(200,50,0);
    rect(game_char_x-15,game_char_y-20,30,5);
    rect(game_char_x-10,game_char_y-30,20,10);
    
    //legs
    fill(150,150,150);
    rect(game_char_x-10,game_char_y+20,9,12); //left leg
    rect(game_char_x+1,game_char_y+20,9,12); //right leg
    fill(0);
    rect(game_char_x-10,game_char_y+27,9,5); //left foot
    rect(game_char_x+1,game_char_y+27,9,5); //right foot
    
    //arms
    fill(skinColor.r,skinColor.g,skinColor.b);
    rect(game_char_x-15,game_char_y,5,15,5);
    rect(game_char_x+10,game_char_y,5,15,5);
    
    //face
    stroke(255);
    strokeWeight(5);
    point(game_char_x-5,game_char_y-10);
    point(game_char_x+5,game_char_y-10);
    stroke(0);
    strokeWeight(3);
    point(game_char_x-5,game_char_y-10);
    point(game_char_x+5,game_char_y-10);
    
    //antennas
    strokeWeight(3);
    stroke(skinColor.r,skinColor.g,skinColor.b);
    line(face.x+5,face.y-25/2,face.x+10,face.y-20);
    line(face.x-5,face.y-25/2,face.x-10,face.y-20);
    strokeWeight(5);
    point(face.x+10,face.y-20);
    point(face.x-10,face.y-20);
    }
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds() {
    
   for (var c=0; c < clouds.length; c++){
    noStroke();
    fill(255,230);
    x_pos = clouds[c].x_pos;
    y_pos = clouds[c].y_pos;
    
    size = clouds[c].size;
    ellipse(x_pos,y_pos,size,size-10);
    ellipse(x_pos+15,y_pos-15, size-10, size-20);
    ellipse(x_pos+100,y_pos-30,size-30, size-40);
    ellipse(x_pos+60,y_pos, size, size-10);
    ellipse(x_pos+120,y_pos, size-40, size-50);
    ellipse(x_pos+110,y_pos+20, size-20, size-30);
    ellipse(x_pos+140,y_pos+30, size-50, size-60); 
   }
    
}

// Function to draw mountains objects.
function drawMountains() {
   
    for(var m = 0; m < mountains.length; m++){
    y = floorPos_y;
    x_pos = mountains[m].x_pos;
    heightY = mountains[m].heightY;
    
    fill(100);
    triangle(x_pos,y,x_pos+200,heightY,x_pos+400, y);
        
    }
    
}

// Function to draw trees objects.

function drawTress() {
    
    for(var t=0; t < trees.length; t++){
        
    y = floorPos_y;
    x_pos = trees[t].x_pos;
    heightY = trees[t].heightY;
    fill(150,96,30);
    rect(x_pos,y-heightY,20,heightY);
    fill(30,180,87);
    triangle(x_pos-30,y-heightY,x_pos+10,y-2*heightY,x_pos+50,y-heightY);
    triangle(x_pos-20,y-heightY*3/2,x_pos+10,y-heightY*5/2, x_pos+40, y-heightY*3/2);
    triangle(x_pos-10,y-heightY*2,x_pos+10,y-heightY*3, x_pos+30,y-heightY*2);
        
    }
}

// Function to draw houses objects.
function drawHouses() {
     
    for (var h=0; h < houseXs.length; h++) {
    y = floorPos_y;
    x = houseXs[h];
    
    
    fill(200,150,50);
    noStroke();
    rect(x,y-90,120,90); //house
    fill(220,50,0);
    quad(x-20,y-80,x+30,y-130,x+90,y-130,x+140,y-80); //roof
    
    fill(0,50,100);
    stroke(140,69,19);
    strokeWeight(2);
    rect(x+60,y-50,30,50); //door
    
    point(x+85,y-30); // door handle
    
    fill(180,180,0);
    stroke(0,0,100);
    rect(x+15,y-60,25,25); // window
    
    stroke(0,0,100);
    line(x+27,y-60,x+27,y-35)
    line(x+15,y-47,x+40,y-47); //window frame
    
}

}

function drawTowers()
{
    for (var i=0; i< towers.length; i++){
    y= floorPos_y;
    x = towers[i];
  
    fill(40,60,70);
    noStroke();
    rect(x,y-170,60,170);
    rect(x,y-180,12,10);
    rect(x+24,y-180,12,10);
    rect(x+48,y-180,12,10);

    
    fill(0);
    ellipse(x+30,y-130,20,20);
    rect(x+20,y-130,20,20);
    
    stroke(0);
    strokeWeight(2);
    line(x+30,y-180,x+30,y-200);
    fill(200,0,0);
    noStroke();
    rect(x+30,y-200,20,10)
        
    }
    
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects

function drawCanyon(t_canyon)
{
    for(var i = 0; i < t_canyon.length; i++)
        {
            
        
    fill(30,30,0);
    rect(t_canyon[i].x_pos, floorPos_y, t_canyon[i].width, height - floorPos_y);
        }
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{
    ////////checks if character is over the canyon, if it is, character falls
    for(var i = 0; i < t_canyon.length; i++ )
    {
        
    
    if(isJumping == false) {
        if(realPos >= t_canyon[i].x_pos && realPos <= t_canyon[i].x_pos + t_canyon[i].width) {
            if(!isOnPlatform){
                
            
            isFalling = true;
            //console.log("lololo");
            }
        }
    } // it's not possible to jump out of the canyon
    if(isFalling) {
        game_char_y += 2;
        isJumping = false;
    }
    }
    
}

// ----------------------------------
// Pick-up render and check functions
// ----------------------------------

// Function to draw pick-up objects.
function drawDiamond(t_diamond) {
    
    if(t_diamond.isFound == false) {
        y= t_diamond.y_pos;
        x= t_diamond.x_pos;
        noStroke();
        fill(0,200,255);
        quad(x,y,x-30,y-40,x-20,y-35,x-15,y-40);
        
        fill(0,150,255);
        quad(x,y,x+15,y-40,x,y-35,x-15,y-40);
        
        fill(0,100,100);
        quad(x,y,x+30,y-40,x+20,y-35,x+15,y-40);
        
        fill(0,255,255);
        quad(x-30,y-40,x-20,y-45,x-15,y-40,x-20,y-35);
        
        fill(0,220,220);
        quad(x-15,y-40,x,y-35,x+15,y-40,x,y-45);
        
        fill(0,180,180);
        quad(x+15,y-40,x+20,y-35,x+30,y-40,x+20,y-45);
        
        fill(0,210,255);
        quad(x-30,y-40,x-15,y-55,x-15,y-40,x-20,y-45);
        
        fill(0,190,255);
        quad(x-15,y-40,x,y-45,x+15,y-40,x,y-55);
        
        fill(0,150,150);
        quad(x+15,y-40,x+20,y-45,x+30,y-40,x+15,y-55);
        
        fill(0,150,255);
        triangle(x-15,y-40,x,y-55,x-15,y-55);
        triangle(x+15,y-40,x,y-55,x+15,y-55);
    }
  
    
}

// Function to check character has picked up an item.
function checkDiamond(t_diamond) {
      
    x = t_diamond.x_pos;
    y = t_diamond.y_pos;
     if(realPos +10>= x - 30 && realPos-10 <= x + 30) {
        if(game_char_y + 30 >= y- 55 && game_char_y -20 <= y) {
            if(!t_diamond.isFound){
            t_diamond.isFound = true;
            score += 1;
            console.log(score);
            }
           
        
        }
         
        
    }
     
        //diamond disappears when character comes in contact with it
        
}
function checkPlayerWon() {
    if(score == diamond.length) {
        
        isWon = true;
        console.log('win');
    }
}
function checkPlayerDied() {
    if(game_char_y > height) 
        {
          playerDied();
        }
    
}
function playerDied() {
       console.log('still have lives');
            if(lives > 0)
            {
            lives -=1;
                ////restart game
            startGame();

            } else {
                ////game over, player lost
                isLost = true;
                score = 0;
                console.log('ur dead')
            }
}
function nextLevel()
{
    // DO NOT CHANGE THIS FUNCTION!
    console.log('next level');
}

