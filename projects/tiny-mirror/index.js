// Handle FF
navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia;

window.onload = () => {
    // Create favicon link element
    const favicon = document.createElement('link');
    favicon.rel = 'shortcut icon';
    favicon.type = 'image/png';
    favicon.href = '../../images/favicon.ico';
    document.getElementsByTagName('head')[0].appendChild(favicon);
    // Create hidden canvas
    const w = 32;
    const h = 32;
    const canvas = document.createElement('canvas');
    canvas.style = 'display: none';
    canvas.width = w;
    canvas.height = h;
    document.body.appendChild(canvas);
    // Grab canvas context
    const ctx = canvas.getContext('2d');
    // Create hidden video element
    const video = document.createElement('video');
    video.style = 'display: none';
    video.width = canvas.width;
    video.height = canvas.height;
    document.body.appendChild(video);
    // Assign user media to video and start loop
    navigator.getUserMedia({video: true}, stream => {
        video.src = window.URL.createObjectURL(stream);
        video.play();
        loop();
    }, () => {});
    // Loop forever
    const loop = () => {
        // Copy video to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        // Set canvas to favicon
        favicon.setAttribute('href', canvas.toDataURL());
        // Loop
        setTimeout(loop, 100);
    };
};

