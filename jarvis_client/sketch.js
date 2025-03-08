// This is the main client file

// Global parameters
const EASING_SPEED = 0.07;

// Current ball position
let pos = {
  x: 0,
  y: 0
};

// Target ball position
let target = {
  x: 0,
  y: 0
};

function setup() {
  createCanvas(400, 400);
  
  background(0);  // black background
  noStroke();
}

function draw() {
  // // background color white/grey/black
  // background(220); 
  
  fill(0, 15);
  rect(0, 0, width, height);
  
  fill(255); // white color ball
  circle(pos.x, pos.y, 20);
  
  // Ease position into target
  pos.x += EASING_SPEED * (target.x - pos.x);
  pos.y += EASING_SPEED * (target.y - pos.y);
}

function mouseClicked() {
  setTarget(mouseX, mouseY)
  sendTargetToServer();
  
  // console.log("New target is: ");
  // console.log(target);
}

function setTarget(tx, ty){
  target = {
    x: tx,
    y: ty
  }; 
}

function sendTargetToServer(){
  let norm = {
    x: target.x / width,
    y: target.y / height
  }
  let str = JSON.stringify(norm);
  serverConnection.send(str);
}

// WEBSOCKET STUFF
// const serverAddress = "wss://transparent-sumptuous-oval.glitch.me";

const serverAddress = "wss://jarvis-telegram-bot.glitch.me";

const serverConnection = new WebSocket(serverAddress);

serverConnection.onopen = function() {
  console.log("I just connected to the server on " + serverAddress);
  // serverConnection.send('Hello server')
}

serverConnection.onmessage = function(event) {
  console.log("Received: " + event.data);
  let obj = JSON.parse(event.data);
  // console.log(obj);
  obj.x *= width;
  obj.y *= height;
  target = obj;
}
