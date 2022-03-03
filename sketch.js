var bg,bgImg;
var player, shooterImg, shooter_shooting,bullet_Img,bullet,bulletGroup;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var lives=3
var explosionSound
var loseSound

var zombieGroup;
var PLAY=0;
var END = 1;
var gameState=PLAY

var gameOver



function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  bullet_Img=loadImage("assets/bullet.png")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")
  explosionSound=loadSound("assets/explosion.mp3")
  loseSound=loadSound("assets/lose.mp3")
  gameOver = loadImage("assets/game over.jpg")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = false
   player.setCollider("rectangle",0,0,300,300)


   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = true
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = true
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    //creating group for zombies    
    zombieGroup = new Group();
    bulletGroup = new Group();
}





function draw() {
  background(0); 
 if(gameState===PLAY){
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
   player.y = player.y+30
  }
  
  if(keyDown("RIGHT_ARROW")||touches.length>0){
    player.x = player.x+30
   }
  
   if(keyDown("LEFT_ARROW")||touches.length>0){
    player.x = player.x-30
   }
  //release bullets and change the image of shooter to shooting position when space is pressed
  if(keyWentDown("space")){
    
    player.addImage(shooter_shooting)
    bullet=createSprite(player.x,player.y-20)
    bullet.addImage(bullet_Img)
    bullet.scale = 0.2;
    bullet.velocityX=4
    bulletGroup.add(bullet)
    explosionSound.play()
   
  }
  
  //player goes back to original standing image once we stop pressing the space bar
  else if(keyWentUp("space")){
    player.addImage(shooterImg)
  }
  
  
  //destroy zombie when player touches it
  if(zombieGroup.isTouching(bulletGroup)){
   
  
   for(var i=0;i<zombieGroup.length;i++){     
        
    if(zombieGroup[i].isTouching(bulletGroup)){
         zombieGroup[i].destroy()
         bulletGroup.destroyEach()
         } 
   }
  }
  if(zombieGroup.isTouching(player)){
 

    for(var i=0;i<zombieGroup.length;i++){     
          
    if(zombieGroup[i].isTouching(player)){
           lives=lives-1
           zombieGroup[i].destroy()
           }
     }
    }
    enemy();
showLife();
 }
 else if(gameState===END){
   player.visible= false
   zombieGroup.destroyEach();
   bg.visible= false
   imageMode(CENTER)
   image(gameOver,windowWidth/2,windowHeight/2,windowWidth,windowHeight)
  
 }
if(keyDown("R")){
  reset()
}
drawSprites();
}



//creating function to spawn zombies
function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(500,1100),random(100,500),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= false
    zombie.setCollider("rectangle",0,0,500,800)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }
}

function showLife(){
  if(lives>=3){
    heart1.visible= false
   heart2.visible= false
   heart3.visible = true
  }
else if(lives<3&&lives>1){
   heart1.visible= false
   heart2.visible= true
   heart3.visible = false
 }
 else if(lives<2&&lives>0){
  heart1.visible= true
  heart2.visible= false
  heart3.visible = false
}
else if(lives<1){
  gameState=END;
  heart1.visible= false
}
}
function reset(){
  gameState=PLAY;
  bg.visible= true
  player.visible= true
  lives=3
  
  
}


