var colorCounter = 0;
ColorArray = [];

class Color {
  constructor(name) {
    this.name = name;
    var numberColor = document.createElement('div');
    numberColor.setAttribute("id", this.name);
    numberColor.setAttribute("class", "numberColors");
    numberColor.innerHTML = "<input type='color' onchange = 'changingcolor(this.id, this.value)' text = 'wdtn' value = '#ffffff' id = " + this.name + ">" + this.name + "<input type = 'range' value = '30'; onchange = 'changingQuality(this.id, this.value)'; min = 0; max = 100; id = " + this.name + ">";
    document.body.insertBefore(numberColor, document.getElementById('FIM'));
    this.CreateColorCanvas();
    this.quality = 30;
    this.color = '#ffffff';
  }
  CreateColorCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute("width", document.getElementById('canvas').width);
    this.canvas.setAttribute("height", document.getElementById('canvas').height);
    this.canvas.setAttribute("id", this.name + "canvas");
    this.canvas.setAttribute("class", "numbercanvas");
    this.canvas.setAttribute("style", "border:1px solid #000000");
    document.getElementById('colors').appendChild(this.canvas);
  }
  changingQuality(value) {
    this.quality = value;
    this.changingcolor(this.color);
  }

  changingcolor(value) {
    this.color = value;
    var ctx = this.canvas.getContext('2d');
    var mctx = document.getElementById('canvas').getContext('2d');
    var imgData = mctx.getImageData(0, 0, mctx.canvas.width, mctx.canvas.height);
    var curColor = hexToRgbA(value).split(",");
    for (var i = 0; i < imgData.data.length; i += 4) {
      if ((Math.abs(curColor[0] - imgData.data[i + 0]) < this.quality) && (Math.abs(curColor[1] - imgData.data[i + 1]) < this.quality) && (Math.abs(curColor[2] - imgData.data[i + 2]) < this.quality)) {
        imgData.data[i + 0] = curColor[0];
        imgData.data[i + 1] = curColor[1];
        imgData.data[i + 2] = curColor[2];
        imgData.data[i + 3] = 255;
      } else {
        imgData.data[i + 0] = 0;
        imgData.data[i + 1] = 0;
        imgData.data[i + 2] = 0;
        imgData.data[i + 3] = 0;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }
}

function LoadImageAndResizeCanvas() {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = prompt("Copy Image URL here:", "example.jpg");
  img.onload = function() {
    ColorArray.clear;
    var ctx = document.getElementById('canvas').getContext('2d');
    ctx.canvas.width = img.width;
    ctx.canvas.height = img.height;
    ctx.drawImage(this, 0, 0);
    var div = document.createElement('div');
    div.setAttribute("id", "colors");
    div.setAttribute("color", "FFA");
    div.setAttribute("width", "24px");
    div.setAttribute("width", "50px");
    div.innerHTML = "<input type='button' value = 'Add Color' id ='colorlist' onclick = 'addColor()'>"
    document.body.insertBefore(div, document.getElementById('LoadImageButton'));
  }
}



function addColor() {
  ColorArray.push(new Color(ColorArray.length + 1));
}

function changingcolor(id, value) {
  ColorArray[id - 1].changingcolor(value);
}

function changingQuality(id, value) {
  ColorArray[id - 1].changingQuality(value);
}

function hexToRgbA(hex) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1';
  }
  throw new Error('Bad Hex');
}