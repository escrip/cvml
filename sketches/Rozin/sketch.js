let w = 320;
let h = 180;
let capture;

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
  let stepsize = 10
  capture.loadPixels();
  //let threshold = 127;
  let threshold = map(mouseX, 0, w, 0, 255, true);
  
  for(let y = 0; y < capture.height; y+=stepsize){
    for(let x = 0; x < capture.width; x+=stepsize){
      const index = (x + y * capture.width) * 4;
      
      let r = capture.pixels[index];
      let g = capture.pixels[index+1];
      let b = capture.pixels[index+2];
      let c = color(r, g, b);
      
      let totalBrightness = r + g + b;
      let brightness = totalBrightness / 3;
      
      let size = map(brightness, 0, 255, stepsize/4, stepsize)
      
      //fill(255, 200, 225)
      noStroke();
      fill(c);
      
      push();
        translate(capture.width, 0);
        scale(-1, 1);
        
        // if(brightness > 100)
        //   rotate(brightness/PI);
        rect(x, y, size, size);
      pop();
      
    }
  }
  // capture.updatePixels();
  
  //image(capture, 0, 0);
}