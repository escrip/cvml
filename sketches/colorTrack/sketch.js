let w = 320;
let h = 240;
let capture;
let trackColor;
let prevPos;
let brushCanvas;
let threshold = 10;

function setup() {
  createCanvas(w, h);
  brushCanvas = createGraphics(w, h);
  pixelDensity(1);
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.hide();
  trackColor = [255, 0, 0];
  prevPos = createVector(0, 0);
}

function draw() {
  //background(255);

  //let record = 500;
  let brushColor = color(trackColor[0], trackColor[1], trackColor[3]);

  // let closestX = 0;
  // let closestY = 0;
  let avgPos = createVector(0, 0);
  let count = 0;

  capture.loadPixels();
  // let threshold = 127;
  //let threshold = map(mouseX, 0, width, 0, 255, true);

  for(let y = 0; y < capture.height; y++) {
    for(let x = 0; x < capture.width; x++) {
      const index = (x + y * capture.width) * 4;

      let r = capture.pixels[index];
      let g = capture.pixels[index+1];
      let b = capture.pixels[index+2];

      let trackR = trackColor[0];
      let trackG = trackColor[1];
      let trackB = trackColor[2];

      //calculate the color distance between the current pixel
      //and the trackColor. dist() calculates euclidean distance between         two points

      let distance = dist(r, g, b, trackR, trackG, trackB);

      if(distance < threshold){
        //threshold = distance;
        avgPos.x +=x;
        avgPos.y+=y;
        count++;
      }
    }
  }

  push();
    translate(capture.width, 0);
    scale(-1, 1);
    image(capture, 0, 0);
    if(count > 5){
      avgPos.x = avgPos.x/count;
      avgPos.y = avgPos.y/count;

      fill(255, 0, 0);
      brushCanvas.stroke(brushColor);
      brushCanvas.strokeWeight(50);
      brushCanvas.line(avgPos.x, avgPos.y, prevPos.x, prevPos.y);
      prevPos = avgPos;
      //ellipse(closestPos.x, closestPos.y, 20, 20);
    }
    image(brushCanvas, 0, 0)

  pop();


  //capture.updatePixels();
}

function mousePressed() {
  trackColor = capture.get(capture.width - mouseX, mouseY);
}

function keyPressed() {
  if(key == 'c')
    brushCanvas.clear();
}
