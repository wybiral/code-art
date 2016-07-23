// That's right... I'm using gobals... *gasp*
let width;
let height;
let canvas;
let ctx;

window.onload = function() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgb(255,255,200)';
    ctx.fillRect(0, 0, width, height);
};