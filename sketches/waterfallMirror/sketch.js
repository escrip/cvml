let w = 320;
let h = 180;
let capture;

let particle;
let particles = [];

function setup() {
    let c = createCanvas(w, h);
    c.parent("#sketch-parent");
    pixelDensity(1);
    capture = createCapture(VIDEO);
    capture.size(w, h);
    capture.hide();
    
    rectMode(CENTER);
  }

function draw() {
    background(255);
    capture.loadPixels();

    for(let y = 0; y < capture.height; y++){
        for(let x = 0; x < capture.width; x++){
            const index = (x + y * capture.width) * 4;

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
    capture.updatePixels();

    image(capture, 0, 0);
}