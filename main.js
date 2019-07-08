var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var w = canvas.width = document.body.offsetWidth;
var h = canvas.height = document.body.offsetHeight;

var cx = w / 2;
var cy = h / 2;

var circles = loadCircles();

var step = 0;
var lastX;
var lastY;
function draw() {
  requestAnimationFrame(draw);

  if (w != document.body.offsetWidth || h != document.body.offsetHeight) {
    w = canvas.width = document.body.offsetWidth;
    h = canvas.height = document.body.offsetHeight;
    cx = w / 2;
    cy = h / 2;
    lastX = undefined;
    lastY = undefined;
  }

  ctx.fillStyle = 'rgba(32,32,32,0.05)';
  ctx.fillRect(0, 0, w, h);

  var m = 60;
  ctx.strokeStyle = `white`;

  ctx.beginPath();
  ctx.lineTo(lastX, lastY);

  while (m--) {
    var x = cx;
    var y = cy;
    step += 0.01;

    for (var circle of circles) {
      var k = circle[0] * step + circle[2];
      x += Math.sin(k) * circle[1];
      y += Math.cos(k) * circle[1];
    }

    ctx.lineTo(x, y);

    lastX = x;
    lastY = y;
  }

  ctx.stroke();
}


draw();

function loadCircles() {
  var circles;
  if (window.localStorage) {
    circles = localStorage.getItem('circles');

    if (circles) circles = JSON.parse(circles);
  }

  return circles || [[100, 50, 0], [-20, 116, 0], [2, 9, 0]];
}

function saveCircles() {
  if (window.localStorage) {
    localStorage.setItem('circles', JSON.stringify(circles));
  }
}