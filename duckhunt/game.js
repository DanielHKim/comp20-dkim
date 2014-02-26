// Daniel Kim
// dkim06
// Assignment 2

function draw() {
    canvas = document.getElementById('game');
    if (canvas.getContext) {

        ctx = canvas.getContext('2d');
        ducksheet = new Image();
        ducksheet.onload = function() {
            ctx.fillStyle = '#87CEEB';
            ctx.fillRect(0, 0, 800, 600);
            ctx.drawImage(ducksheet, 0, 270, 100, 130, 0, 200, 100*2.5, 
                          130*2.5);
            ctx.drawImage(ducksheet, 0, 120, 40, 30, 256, 128, 40*2, 30*2);
            ctx.drawImage(ducksheet, 38, 120, 40, 30, 100, 300, 40*2, 30*2);
            ctx.drawImage(ducksheet, 256, 235, 40, 30, 400, 255, 40*2, 30*2);
            ctx.drawImage(ducksheet, 128, 235, 40, 30, 50, 64, 40*2, 30*2);
            ctx.drawImage(ducksheet, 302, 235, 40, 32, 640, 128, 40*5, 30*5);
            ctx.drawImage(ducksheet, 0, 716, 900, 200, 0, 420, 800, 200);
            ctx.drawImage(ducksheet, 0, 0, 58, 44, 200, 484, 58*2, 44*2);
        }
        ducksheet.src = 'assets/duckhunt.png';
    }
    else {
        alert('Sorry, canvas is not supported on older browsers!');
    }
}
