const Y_AXIS = 1;
const X_AXIS = 2;
let c1, c2, c3;
let b1, b2, b3;
let t1, t2 , t3;

let cols, rows;

let scl = 40;
let w = 1600;
let h = 1200;

let flying = 0;
let terrain = [];


let cols02, rows02;
let scl02 = 40;
let w02 = 1600;
let h02 = 1200;



function setup() {
   createCanvas(400, 400, WEBGL);
   
   
   
   c1 = color(255, 204, 36);
   c2 = color(255, 36, 117);
   c3 = color(255, 18, 216);
   
   b1 = color(1,0, 2);
   b2 = color(66,0, 90);
   b3 = color(247, 87, 221);

   t1 = color(100, 247, 252);
   t2 = color(100, 240, 255);
   t3 = color(100, 100, 200);

   cols = w / scl;
   rows = h / scl;
   
   cols02 = w02 / scl02;
   rows02 = h02 / scl02;
   
   for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }

   
}


function draw() {
  
  push();
  translate(0, height * -0.3, width * -2);
  
  setGradient(-width*2, height * -2 , width * 4, height * 4, b1, b2, b3, Y_AXIS);
  //setGradient(-width*2,0, width * 4, height * 2, b3, b1, b1,Y_AXIS);
  
  translate(0, 0, 1);
  rotateZ(PI / 2);
  setCircle(0, 0, width * 2.3, c1, c2, c3);
  
  rotateZ(-PI / 2);
  setGradientShutter(-width*2, height * -2 , width * 4, height * 4, b1, b2, b3, Y_AXIS);

  pop();
  
  
  push();
  translate(-800, height * 0.4, height * -2);
  rotateX(radians(90));
  for (let y = 0; y < rows02 - 1; y++) {
        for (let x = 0; x < cols02; x++) {
        fill(b1);
        stroke(t1);
        rect(x*scl02, y*scl02, scl02, scl02);
        }
    }
  pop();


  flying -= 0.1;
  var yoff = flying;
  for (let y = 0; y < rows; y++) {
    var xoff = 0;
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 0.5, -185, 20);
      xoff += 0.4;
    }
    yoff += 1.2;
  }
  
  
  translate(width * -1.5,  height * -0.04,  width * -3.9);
  rotateX(radians(80));
  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    
    for (let x = 0; x < cols; x++) {
      fill(b1);
      stroke(t1);
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }


  
  //save("20210217.png");
  noLoop();
  
  
}

function setGradient(x, y, w, h, c1, c2, c3, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, (y + h) - ((h/2)), 0, 1);
      let c = lerpColor(c1, c2, inter);
      
      let inter02 = map(i, (y + h) - ((h/2)) ,  y + h , 0, 1);
      let p = lerpColor(c2, c3, inter02);
      
      stroke(255);
      line(x, i, x + w, i);
      
      if ( i <= (y + h) - ((h/2))){
        stroke(c);
        line(x, i, x + w, i);
      }else{
        stroke(p);
        line(x, i, x + w, i);
      }
      
      
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x,(x + w) - (w/2), 0, 1);
      let c = lerpColor(c1, c2, inter);
      
      let inter02 = map(i, (x + w) - (w/2), x + w, 0, 1);
      let p = lerpColor(c2, c3, inter02);
      
      stroke(255);
      line(i, y, i, y + h);
      if ( i <= (x + w) - (w/2)){
        stroke(c);
        line(i, y, i, y + h);
      }else{
        stroke(p);
        line(i, y, i, y + h);
      }
      
    }
  }
}


function setGradientShutter(x, y, w, h, c1, c2, c3, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, (y + h) - ((h/2)), 0, 1);
      let c = lerpColor(c1, c2, inter);
      
      let inter02 = map(i, (y + h) - ((h/2)) ,  y + h , 0, 1);
      let p = lerpColor(c2, c3, inter02);
      
      stroke(255);
      //line(x, i, x + w, i);
      
      if ( i >= (y + h) - ((h/2)) - h*0.01  && i <= (y + h) - ((h/2)) - h*0.001   ){
        stroke(c);
        line(x, i, x + w, i);

      }
      if ( i >= (y + h) - ((h/2)) + h*0.02 &&  i <= (y + h) - ((h/2)) + h*0.035 ){
        stroke(p);
        line(x, i, x + w, i);
      }
      if ( i >= (y + h) - ((h/2)) + h*0.055 &&  i <= (y + h) - ((h/2)) + h*0.075 ){
        stroke(p);
        line(x, i, x + w, i);
      }

      if ( i >= (y + h) - ((h/2)) + h*0.095 &&  i <= (y + h) - ((h/2)) + h*0.12 ){
        stroke(p);
        line(x, i, x + w, i);
      }

      if ( i >= (y + h) - ((h/2)) + h*0.14 &&  i <= (y + h) - ((h/2)) + h*0.165 ){
        stroke(p);
        line(x, i, x + w, i);
      }

      if ( i >= (y + h) - ((h/2)) + h*0.185 &&  i <= (y + h) - ((h/2)) + h*0.205 ){
        stroke(p);
        line(x, i, x + w, i);
      }

      if ( i >= (y + h) - ((h/2)) + h*0.230 &&  i <= (y + h) - ((h/2)) + h*0.255 ){
        stroke(p);
        line(x, i, x + w, i);
      }

      else{
        //stroke(p);
        //line(x, i, x + w, i);
      }
      
      
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x,(x + w) - (w/2), 0, 1);
      let c = lerpColor(c1, c2, inter);
      
      let inter02 = map(i, (x + w) - (w/2), x + w, 0, 1);
      let p = lerpColor(c2, c3, inter02);
      
      stroke(255);
      line(i, y, i, y + h);
      if ( i <= (x + w) - (w/2)){
        stroke(c);
        line(i, y, i, y + h);
      }else{
        stroke(p);
        line(i, y, i, y + h);
      }
      
    }
  }
}

function setTriangle(x, y, w, h, c1, c2, c3 ){
  
  push();
  stroke(b3);
  noFill();
  triangle(x-1, y + h + 1, x+ w/2, y-1, x+w +1, y+h +1);
  pop();

  
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, (y + h) - (h/2), 0, 1);
    let c = lerpColor(c1, c2, inter);
    
    let inter02 = map(i, (y + h) - (h/2) ,  y + h , 0, 1);
    let p = lerpColor(c2, c3, inter02);
    stroke(c);
    //line( x - (i * 0.5) , y + i, x + h, y + i);  
    let m = x + (w/2); 
    let inc = (w/2)/h;
    
    if ( i <= (y + h) - (h/2)){
      stroke(c);
      line( (m - (i-y) * inc), i, (m + (i-y) * inc), i);
    }else{
      stroke(p);
      line( (m - (i-y) * inc), i, (m + (i-y) * inc), i);
    }
  }
  
}

function setCircle(x, y, d, c1, c2, c3) {
 let c = 100;
 //circle(x,y,d);
 
 
 for (let i=0; i<c; i++) {
   let col = lerpColor(c1, c2, (i/c)*2 );
   let col02 = lerpColor(c2, c3, ((i - (c/2))/(c/2)));
   let a = lerp(PI, 0, i/c);
   
   if ( i <= c/2){
      fill(col);
      noStroke();
      arc(x, y, d, d, -a, a, CHORD);
    }else{
      fill(col02);
      noStroke();
      arc(x, y, d, d, -a, a, CHORD);
    }   

 }
}
