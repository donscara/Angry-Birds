////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
  // your code here
  propeller = Bodies.rectangle(150,480,200,15, {
      isStatic: true, angle: angle
  });
  World.add(engine.world, [propeller]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){


  push();
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, angleSpeed);
  angle += angleSpeed;

  fill('yellow');
  drawVertices(propeller.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  fill(255,0,0);
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  push();
  for (i=0; i < birds.length; i++){
      drawVertices(birds[i].vertices);
      if (isOffScreen(birds[i])){
          removeFromWorld(birds[i]);
          birds.splice(i,1);
          count = count+1;
          
          i--;
      }
  }
  //your code here
  pop();
  text('Dead Birds:' + count, 20,20);
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  //you code here
    for (i=0; i<3; i++){
        for (j=0; j<6; j++){
          var box = Bodies.rectangle(600+i*80,400-j*80,80,80);
          boxes.push(box);
          World.add(engine.world,[box]);
        }
    }
    
  
    for (i=0; i<18; i++){
       colors[i] = RandomGreen();
    }
    
    
 }
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  
   
  push();
    for (var i=0; i<boxes.length; i++){
        
        fill(colors[i]);
        drawVertices(boxes[i].vertices);
        
    }
    
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
//your code here
     
     slingshotBird = Bodies.circle(200, 200, 20, {friction: 0,
      restitution: 0.95});
     
     Matter.Body.setMass(slingshotBird, slingshotBird.mass*10);
     slingshotConstraint = Constraint.create(
                                    {pointA:{x:200,y:200},
                                     bodyB:slingshotBird,
                                     pointB:{x:-10,y:-10},
                                     stiffness: 0.01, 
                                     damping:0.0001});

     World.add(engine.world,[slingshotBird,slingshotConstraint]);
    
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  // your code here
  fill(0,0,255);
  drawVertices(slingshotBird.vertices);
  drawConstraint(slingshotConstraint);

    
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}

function RandomGreen() {
	
	let green = Math.floor(Math.random() * 256);
	return `rgb(0, ${green}, 0)`;
}