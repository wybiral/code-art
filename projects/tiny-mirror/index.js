navigator.getUserMedia = (
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
);

window.onload = () => {
    const favicon = document.createElement('link');
    favicon.rel = 'shortcut icon';
    favicon.type = 'image/png';
    favicon.href = '../../images/favicon.ico';
    document.getElementsByTagName('head')[0].appendChild(favicon);
    const canvas = document.createElement('canvas');
    canvas.style = 'display: none';
    canvas.width = 16;
    canvas.height = 16;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const video = document.createElement('video');
    video.style = 'display: none';
    video.width = canvas.width;
    video.height = canvas.height;
    document.body.appendChild(video);
    navigator.getUserMedia({video: true}, stream => {
        video.src = window.URL.createObjectURL(stream);
        video.play();
        loop();
    }, () => {});
    const loop = () => {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        favicon.setAttribute('href', canvas.toDataURL());
        setTimeout(loop, 500);
    };
};

