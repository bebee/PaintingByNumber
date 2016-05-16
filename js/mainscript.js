var colorCounter=0;

function LoadImageAndResizeCanvas() {
var img = new Image(); 
img.crossOrigin = "Anonymous";
img.src = prompt("Copy Image URL here:", "example.jpg");
img.onload = function() {
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
    document.body.insertBefore(div,document.getElementById('FIM'));
  }   
}

function CreateColorCanvas()
{
var canvas = document.createElement('canvas');
canvas.setAttribute("width",document.getElementById('canvas').width);
canvas.setAttribute("height",document.getElementById('canvas').height);
canvas.setAttribute("id",colorCounter+"canvas");
canvas.setAttribute("class","numbercanvas");
canvas.setAttribute("style","border:1px solid #000000");
document.body.insertBefore(canvas,document.getElementById('FIM'));
}
function move() {
    var elem = document.getElementById("myBar"); 
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++; 
            elem.style.width = width + '%'; 
        }
    }
}

function addColor() { 
  colorCounter++;
  var numberColor  = document.createElement('div');
  numberColor.setAttribute("id", colorCounter);
  numberColor.setAttribute("class", "numberColors");
  numberColor.innerHTML = "<input type='color' onchange = 'changingcolor(this.id, this.value)' text = 'wdtn' value = '#ffffff' id = "+colorCounter+">"+colorCounter;
  document.body.insertBefore(numberColor, document.getElementById('FIM'));
  CreateColorCanvas();
}

function changingcolor(id,value) {
  var ctx = document.getElementById(id+'canvas').getContext('2d');
  var mctx = document.getElementById('canvas').getContext('2d');
  var imgData = mctx.getImageData(0, 0, mctx.canvas.width, mctx.canvas.height);
  var curColor = hexToRgbA(value).split(",");
  var quality = 40;//prompt("Quality:", "50");
  for (var i=0;i<imgData.data.length;i+=4) {
    if ((Math.abs(curColor[0]-imgData.data[i+0])<quality)&&(Math.abs(curColor[1]-imgData.data[i+1])<quality)&&(Math.abs(curColor[2]-imgData.data[i+2])<quality)) {
      imgData.data[i+0]=curColor[0];
      imgData.data[i+1]=curColor[1];
      imgData.data[i+2]=curColor[2];
      imgData.data[i+3]=255;
    } else {
      imgData.data[i+0]=255;
      imgData.data[i+1]=255;
      imgData.data[i+2]=255;
      imgData.data[i+3]=0;
    }
  }
  for (var i=imgData.width*4+1;i<imgData.data.length-imgData.width*4-1;i+=4){ 
    if ((imgData.data[i-4+3]==0)&&(imgData.data[i+3]==255)&&(imgData.data[i+4+3]==0)){
      imgData.data[i+0]=0;
      imgData.data[i+1]=0;
      imgData.data[i+2]=0;
      imgData.data[i+3]=255; 
    }
  }
  ctx.putImageData(imgData,0,0);
}

function hexToRgbA(hex) {
  var c;
  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c= hex.substring(1).split('');
    if(c.length== 3){
      c= [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c= '0x'+c.join('');
    return [(c>>16)&255, (c>>8)&255, c&255].join(',')+',1';
  }
  throw new Error('Bad Hex');
}
