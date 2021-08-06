const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground, bridge;
var leftWall, rightWall;
var jointPoint;
var jointLink;
var zombie;
var zombie1,zombie2,zombie3,zombie4;
var stones = [];

function preload() {
  zombie1 = loadImage("./assets/zombie1.png");
  zombie2 = loadImage("./assets/zombie2.png");

  zombie3 = loadImage("./assets/zombie3.png");
  zombie4 = loadImage("./assets/zombie4.png");

  stone


backgroundImage = loadImage("./assets/background.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);
  
  ground = new Base(0, height - 10, width * 2, 20, "#795548");
  leftWall = new Base(300,height / 2 + 50,600,100,true);
  rightWall = new Base(width - 300,height / 2 + 50, 600,100);

  bridge = new Bridge(15, { x: width / 2 - 400, y: height / 2 });

  jointPoint = new Base(width - 600,height / 2 + 10,40,20);

  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  for (var i = 0; i <= 8; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-10, 140);
    var stone = new Stone(x, y, 80, 80);
    stones.push(stone);

  }

  zombie = createSprite(width / 2,height - 110)
  zombie.addAnimation("lefttoright", zombie1, zombie2, zombie1);
  zombie.addAnimation("righttoleft", zombie3, zombie4, zombie3);
  zombie.scale = 0.1;
  zombie.velocityX = 10;

  breakButton = createButton("axe.png")
  breakButton.position(width - 200,height / 2 - 50)
  breakButton.class("breakbutton")
  breakButton.mousePressed(handleButtonPress);


}

function draw() {
  background(backgroundImage);
  Engine.update(engine);

  ground.show();
  bridge.show();
  leftWall.show();
  rightWall.show();

  
 

  for (var stone of stones) {
    stone.show();
  }

  drawSprites();
}

function handleButtonPress() {
jointLink.detach();
setTimeout(()=> {
bridge.breakButton();
},1500)
}