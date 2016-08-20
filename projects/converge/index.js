window.onload = function() {
    const width = 700;
    const height = 700;
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.fillRect(0, 0, width, height);
};
