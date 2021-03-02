let particles = [];

function setup() {
  createCanvas(600, 600);
  
  for(let i = 0; i < 1500; i++){
    let p = new Particle();
    particles.push(p);
  }
  //print(particles);
}

function draw() {
  background(0, 100);
  noStroke();
  
  for(let i = 0; i < particles.length; i++) {
    let p = particles[i];
    
    p.draw();
    p.update();
  }
  let p = new Particle();
  particles.push(p);
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
    this.color = color(random(255), random(255), random(255));
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