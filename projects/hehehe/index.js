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
    const canvas = document.getElementById('canvas');
    canvas.width = w;
    canvas.height = h;
    // Grab canvas context
    const ctx = canvas.getContext('2d');
    // Create hidden video element
    const video = document.getElementById('video');
    video.width = w;
    video.height = h;
    // Loop forever
    const loop = () => {
        // Copy video to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        // Set canvas to favicon
        favicon.setAttribute('href', canvas.toDataURL());
        // Loop
        setTimeout(loop, 50);
    };
    loop();
    document.body.onclick = () => video.play();
    document.body.onfocus = () => video.play();
    document.body.onmouseover = () => video.play();
};

