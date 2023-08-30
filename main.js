
var paintcanvas = document.getElementById("canvas1");
var outputcanvas = document.getElementById("canvas2");
var context = paintcanvas.getContext("2d");
var context2 = outputcanvas.getContext("2d");
var color = "#03fc13";
var radius = 20;
var isPainting = false;
var imageElement;
var originalImage;
var paintedImage;
var mixImage;

function uploadImage() {
    var inputDoc = document.getElementById("input");
    imageElement = new SimpleImage(inputDoc);
    var canvas1 = document.getElementById("canvas1");
    canvas1.width = imageElement.getWidth();
    canvas1.height = imageElement.getHeight();
    imageElement.drawTo(canvas1);
    originalImage = new SimpleImage(inputDoc);
    paintedImage = new SimpleImage(inputDoc);
}

function doMagic() {
  var can2 = document.getElementById("canvas2");
  outImage = new SimpleImage(paintedImage.getWidth(),paintedImage.getHeight());
  for (var pixel of paintedImage.values()) {
    var x = pixel.getX()
    var y = pixel.getY()
    var red = pixel.getRed();
    var green = pixel.getGreen();
    var blue = pixel.getBlue();
    var grey = (red + green + blue)/3;
    var pixOut = outImage.getPixel(x,y);
    var pixOrig = originalImage.getPixel(x,y);
    var hex = color.substring(1);
    var colorRed = parseInt(hex.substring(0, 2), 16);
    var colorGreen = parseInt(hex.substring(2, 4), 16);
    var colorBlue = parseInt(hex.substring(4, 6), 16);
    if (red == colorRed && green == colorGreen && blue == colorBlue) {
      pixOut.setRed(pixOrig.getRed());
      pixOut.setGreen(pixOrig.getGreen());
      pixOut.setBlue(pixOrig.getBlue());
    } else {
      pixOut.setRed(grey);
      pixOut.setGreen(grey);
      pixOut.setBlue(grey);
    }
  }
  outImage.drawTo(can2);
}




function startPaint() {
    isPainting = true;
}

function endPaint() {
    isPainting = false;
}


function setColor(newColor) {
    color = newColor;
}

function clearCanvas() {
  context.clearRect(0, 0, paintcanvas.width, paintcanvas.height);
  paintcanvas.width = 300;
  paintcanvas.height = 160;
  
  context2.clearRect(0, 0, outputcanvas.width, outputcanvas.height);
  outputcanvas.width = 300;
  outputcanvas.height = 160;
  
  var divisionMagic = document.getElementById("divisionMagic");
  divisionMagic.style.display = "none";
  var divisionMix = document.getElementById("divisionMix");
  divisionMix.style.display = "none";
}

function resizeBrush(newSize) {
  //Change size
  radius = newSize;
      // Update the value of the output element
    var sizeOutput = document.getElementById("sizeOutput");
    sizeOutput.textContent = newSize;
}

function doPaint(event) {
    if (isPainting) {
        var rect = paintcanvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        
        // Iterate over a square region around the mouse pointer based on the brush size (radius)
        for (var dx = -radius; dx <= radius; dx++) {
            for (var dy = -radius; dy <= radius; dy++) {
                var pixelX = Math.floor(x + dx);
                var pixelY = Math.floor(y + dy);
                
                // Ensure that the pixel is within the paintedImage dimensions
                if (pixelX >= 0 && pixelX < paintedImage.getWidth() && pixelY >= 0 && pixelY < paintedImage.getHeight()) {
                    var pixel = paintedImage.getPixel(pixelX, pixelY);
                    var hex = color.substring(1);
                    pixel.setRed(parseInt(hex.substring(0, 2), 16));
                    pixel.setGreen(parseInt(hex.substring(2, 4), 16));
                    pixel.setBlue(parseInt(hex.substring(4, 6), 16)); // Set the red, green, blue values as the ones in the color
                }
            }
        }
        
        // Draw the updated paintedImage to the canvas
        var canvas1 = document.getElementById("canvas1");
        paintedImage.drawTo(canvas1);
    }
}


function setColor(newColor) {
  color = newColor;  document.getElementById("colorOutput").textContent = color;
}

function showButtonsMagic() {
  var division = document.getElementById("divisionMagic");
  division.style.display = "block"; // Change the display style to show the division
}

function showButtonsMix() {
  var division = document.getElementById("divisionMix");
  division.style.display = "block"; // Change the display style to show the division
}

function makeRed() {
  var can2 = document.getElementById("canvas2");
  var inputDoc = document.getElementById("input");
  var redImage = new SimpleImage(imageElement.getWidth(),imageElement.getHeight());
    imageElement = new SimpleImage(inputDoc);
  for (var pixel of originalImage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    var pixelOut = redImage.getPixel(x, y);
    pixelOut.setRed(255);
    pixelOut.setGreen(pixel.getGreen());
    pixelOut.setBlue(pixel.getBlue())
  }
  redImage.drawTo(can2)
}

function uploadImageMix() {
    var inputDoc = document.getElementById("inputMix");
    mixImage = new SimpleImage(inputDoc);
    //var canvas2 = document.getElementById("canvas2");
   // canvas2.width = mixImage.getWidth();
  //  canvas2.height = mixImage.getHeight();
   // mixImage.drawTo(canvas2);
}

function mixImages() {
  var outMixImage = new SimpleImage(imageElement.getWidth(),imageElement.getHeight());
  mixImage.setSize(imageElement.getWidth(),imageElement.getHeight());
  for (var pixel of imageElement.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    var pixelMix = mixImage.getPixel(x,y);
    var pixelOut = outMixImage.getPixel(x,y);
    var newRed = (pixel.getRed()*2+pixelMix.getRed())/3;
    var newGreen = (pixel.getGreen()*2+pixelMix.getGreen())/3;
    var newBlue = (pixel.getBlue()*2+pixelMix.getBlue())/3;
    pixelOut.setRed(newRed);
    pixelOut.setGreen(newGreen);
    pixelOut.setBlue(newBlue);
  }
  var canvas2 = document.getElementById("canvas2");
  outMixImage.drawTo(canvas2);
}

function sendToJail() {
  imageElement.setSize(300, imageElement.getHeight()/imageElement.getWidth()*300);
 var outImage = new SimpleImage(imageElement.getWidth(),imageElement.getHeight());
  var h = imageElement.getHeight();
  var w = imageElement.getWidth();
  for (var pixel of imageElement.values()) {
        var posx = pixel.getX();
        var posy = pixel.getY();
        var pixelOut = outImage.getPixel(posx,posy)
        if (posy < 10 || posy >= h - 10 || posx < 10 || posx >= w - 10 || (posx > 70 && posx < 90) || (posx > 140 && posx < 160) || (posx > 210 && posx < 230)) {
            pixelOut.setRed(105);
            pixelOut.setGreen(105);
            pixelOut.setBlue(105);
        } else {
          pixelOut.setRed(pixel.getRed());
          pixelOut.setGreen(pixel.getGreen());
          pixelOut.setBlue(pixel.getBlue());
        }
    }
   var canvas2 = document.getElementById("canvas2");
  outImage.drawTo(canvas2);
}

function breachSimulationOld() {
 var outImage = new SimpleImage(imageElement.getWidth(),imageElement.getHeight());
  var h = imageElement.getHeight();
  var w = imageElement.getWidth();
  for (var pixel of imageElement.values()) {
        var posx = pixel.getX();
        var posy = pixel.getY();
        var pixelOut = outImage.getPixel(posx,posy)
        var pixelRight = imageElement.getPixel(posx+1,posy);
        var pixelLeft = imageElement.getPixel(posx-1,posy);
        if (posy < 10 || posy >= h - 10 || posx < 10 || posx >= w - 10) {
            pixelOut.setRed(0);
            pixelOut.setGreen(0);
            pixelOut.setBlue(0);
        } else if (posy%2==0) {
          pixelOut.setRed(pixelRight.getRed());
          pixelOut.setGreen(pixelRight.getGreen());
          pixelOut.setBlue(pixelRight.getBlue());
        } else if (posy%2 != 0) {
          pixelOut.setRed(pixelLeft.getRed());
          pixelOut.setGreen(pixelLeft.getGreen());
          pixelOut.setBlue(pixelLeft.getBlue());
        }
    }
   var canvas2 = document.getElementById("canvas2");
  outImage.drawTo(canvas2);
}


function blurThis() {
  var outImage = new SimpleImage(imageElement.getWidth(), imageElement.getHeight());
  var h = imageElement.getHeight();
  var w = imageElement.getWidth();
  
  for (var pixel of imageElement.values()) {
    var posx = pixel.getX();
    var posy = pixel.getY();
    var pixelOut = outImage.getPixel(posx, posy);
    if (posy < 10 || posy >= h - 10 || posx < 10 || posx >= w - 10) {
      pixelOut.setRed(0);
      pixelOut.setGreen(0);
      pixelOut.setBlue(0);
    } else if (posy % 2 == 0) {
      var pixelRight = imageElement.getPixel(posx + 10, posy);
      pixelOut.setRed(pixelRight.getRed());
      pixelOut.setGreen(pixelRight.getGreen());
      pixelOut.setBlue(pixelRight.getBlue());
    } else if (posy % 2 != 0) {
      var pixelLeft = imageElement.getPixel(posx - 10, posy);
      pixelOut.setRed(pixelLeft.getRed());
      pixelOut.setGreen(pixelLeft.getGreen());
      pixelOut.setBlue(pixelLeft.getBlue());
    }
  }
  
  var canvas2 = document.getElementById("canvas2");
  outImage.drawTo(canvas2);
}

