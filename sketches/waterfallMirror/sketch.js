let w = 320;
let h = 180;
let capture;

let particles = [];

function setup() {
    let c = createCanvas(w, h);
    c.parent("#sketch-parent");
    pixelDensity(1);
    capture = createCapture(VIDEO);
    capture.size(w, h);
    capture.hide();

    rectMode(CENTER);

    for(let i = 0; i < 50; i++){
        let p = new Particle();
        particles.push(p);
    }
  }

function draw() {
    background(255);
    capture.loadPixels();

    for(let y = 0; y < capture.height; y++){
        for(let x = 0; x < capture.width; x++){
            const index = (x + y * capture.width) * 4; // get x + y of pixel

            let r = capture.pixels[index];
            let g = capture.pixels[index+1];
            let b = capture.pixels[index+2];
            let c = color(r, g, b);

            noStroke();
            fill(c);

            push();
                translate(capture.width, 0);
                scale(-1, 1);
            pop();
        }
    }
    //capture.updatePixels();

    image(capture, 0, 0);

    for(let i; i < particles.length; i++){
        let p = particles[i];

        p.draw();
        p.update();
    }
}

class Particle {
  
    constructor() {
      // this.x = random(width);
      // this.y = random(height);
      this.pos = createVector(width/2, height/2);
      this.vel = createVector(random(-1, 1), random(-1, 1));
      //this.vel = p5.Vector.random2D().mult(random(0,2));
      let randomExp = random(1, 10);
      this.acc = createVector(pow(random(-0.03, 0.03), randomExp), pow(random(-0.03, 0.03), randomExp));
      this.color = color(random(255), random(255), random(255));
      this.size = random(2, 4);
      this.drag = .999;
    }
    
    checkWalls() {
      // check walls, make particles bounce off walls
      if(this.pos.y > (height - this.size)) {
        this.vel.y *= -1;
        this.pos.y = height-this.size;
      }
      
      if(this.pos.y < 0) {
        this.vel.y *= -1;
        this.pos.y = 0;
      }
      
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