let particles = [];
let w = 600;
let h = 600;
let capture;

function setup() {
  createCanvas(w, h);
  pixelDensity(1);
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.hide();
  for(let i = 0; i < 1500; i++){
    let p = new Particle();
    particles.push(p);
  }
}

function draw() {
  background(0, 100);
  noStroke();

  capture.loadPixels();

  for(let i = 0; i < particles.length; i++) {
    let p = particles[i];

    let x = p.pos.x;
    let y = p.pos.y;

    let index = (x + y * width) * 4;

    let r = capture.pixels[index];
    let g = capture.pixels[index+1];
    let b = capture.pixels[index+2];

    let videoPixelColor = color(r, g, b);



    p.color = videoPixelColor;
    p.draw();
    p.update();
  }

  let p = new Particle();
  particles.push(p);

  push();
    translate(capture.width, 0);
    scale(-1, 1);
  pop();

  capture.updatePixels();
}

class Particle {
  
  constructor() {
    //this.x = random(width);
    //this.y = random(height);
    this.pos = createVector(random(width), 1);
    this.vel = createVector(random(-1, 1), random(-1, 1));
    //this.vel = p5.Vector.random2D().mult(random(0,2));
    //let randomExp = random(1, 10);
    this.acc = createVector(0, .01);
    //this.color = color(random(255), random(255), random(255));
    this.size = 5;
    //this.drag = .999;
  }
  
  checkWalls() {
    // check walls, make particles bounce off walls
    // if(this.pos.y > (height - this.size)) {
    //   this.vel.y *= -1;
    //   this.pos.y = height-this.size;
    // }
    
    // if(this.pos.y < 0) {
    //   this.vel.y *= -1;
    //   this.pos.y = 0;
    // }
    
    if(this.pos.x > width - this.size) {
      this.vel.x *= -1;
      this.pos.x = width-this.size;
    }
    
    if(this.pos.x < 0) {
      this.vel.x *= -1;
      this.pos.x = 0;
    }
  }
  
  update() {
    this.vel.add(this.acc);
    //this.vel.mult(this.drag);
    this.pos.add(this.vel);
    this.checkWalls();
    
    
    // loop particle back to top
    // if(this.pos.y > height) {
    //   this.pos.y = 0;
    //   this.vel = createVector(random(-1, 1), random(-1, 1));
    // }
  }
  
  draw() {
    fill(this.color);
    //tint(255, 255, 0);
    // image(img, this.pos.x, this.pos.y, this.size, this.size);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
}