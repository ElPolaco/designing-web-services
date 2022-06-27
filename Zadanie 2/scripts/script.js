// funckje stanowiące "logikę" gry



var printPacMan = (a, x, y, r) => {
    var faceBegin = 0 * Math.PI;
    var faceEnd = 2 * Math.PI;
    var x_o = x;
    var y_o = y;
    var odwrotnie = true;

    switch ( kierunek )
    {
        case 'r':
            x_o = x + 0.3*r;
            y_o = y - 0.4*r; 
            faceBegin = a * Math.PI;
            faceEnd = (2.0 - a) * Math.PI; 
            odwrotnie = false;  
            break;
        case 'l':
            x_o = x - 0.3*r;
            y_o = y - 0.4*r; 
            faceBegin = (1.0 - a) * Math.PI;
            faceEnd = (1.0 + a) * Math.PI;
            odwrotnie = true;
            break;
        case 'u':
            x_o = x - 0.4*r;
            y_o = y - 0.3*r; 
            faceBegin = (1.5 - a) * Math.PI;
            faceEnd = (1.5 + a) * Math.PI; 
            odwrotnie = true;
            break;
        case 'd':
            x_o = x + 0.4*r;
            y_o = y + 0.3*r; 
            faceBegin = (0.5 - a) * Math.PI;
            faceEnd = (0.5 + a) * Math.PI; 
            odwrotnie = true;
            break;
        default:
            break;
    }

    ctx.beginPath();
    ctx.arc(x, y, r, faceBegin, faceEnd, odwrotnie);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x_o, y_o, 0.15*r, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
};

var animatePacMan = (direction) => {
    if ( otwarcie <= 0.1 && otwiera_sie )
    {
        otwarcie += 0.003;
        if ( otwarcie >= 0.1 ) otwiera_sie = false;
    }
    else if ( otwarcie >= 0.0 && !otwiera_sie )
    {
        otwarcie -= 0.003;
        if ( otwarcie <= 0.0 ) otwiera_sie = true;
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    printPacMan(otwarcie, x, y, r);
};
function playSoundAsync(url){
    new Audio(url).play();
}
var movePacMan = (direction) => {
    switch (direction)
    {
        case 'r':
            x += dx;
            if ( (x + r)  >= ctx.canvas.width ) x = r;
            break;
        case 'l':
            x -= dx;
            if ( (x - r)  <= 0 ) x = ctx.canvas.width - r;
            break;
        case 'u':
            y -= dx;
            if ( (y - r) <= 0 )  y = ctx.canvas.height - r;
            break;
        case 'd':
            y += dx;
            if ( (y + r) >= ctx.canvas.height) y = r;
            break;
        default:
            break;
    }
    if(collide(x,y,r,p)){
        wynik+=Math.ceil((3000-seconds)/1000);
        createNewPoint(p);
        seconds=0;
        playSoundAsync("scripts/point.wav");
    }
};
var collide=(x,y,r,point)=>{
    //if(Math.pow((x-point.x) ,2)+Math.pow(y-point.y,2)<=Math.pow(point.r,2))return true;
    var odlegosc=Math.sqrt(Math.pow(x-point.x,2)+Math.pow(y-point.y,2));
    if(odlegosc<=r+point.r) return true;
    return false;
};
var createNewPoint=(point)=>{
         point.x=Math.random()*(ctx.canvas.width-30)+20;
         point.y=Math.random()*(ctx.canvas.height-30)+20;
         point.r=10;
};
var  drawPoint=(point,seconds)=>{
    ctx.beginPath();
    switch (Math.ceil((3000-seconds)/1000)) {
        case 3:
            ctx.strokeStyle="green";
            ctx.fillStyle="darkgreen";
            break;
        case 2:
            ctx.strokeStyle="orange";
            ctx.fillStyle="darkorange";
            break;
        case 1:
            ctx.strokeStyle="red";
            ctx.fillStyle="darkred";
            break;
    }
    ctx.arc(point.x,point.y,point.r,0,2* Math.PI,false);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();


    ctx.arc(point.x,point.y,point.r*0.75,0,2* Math.PI,false);

    ctx.fill();
    ctx.closePath();


    ctx.font="14px sans-serif";

    ctx.fillText(Math.ceil((3000-seconds)/1000),point.x,point.y-point.r);
    ctx.strokeStyle="black";
};
let maleje=false;
var animatePoint=(point)=>{

    if(point.r>=20)maleje=true;
    if(point.r<=20 && !maleje)point.r+=0.5;
    if(point.r>10 && maleje)point.r-=0.5;
    if (point.r<=10)maleje=false;
    drawPoint(point,seconds);
};
// Reakcja na zdarzenia 

window.addEventListener('keydown', (e) =>
{
    e = e || window.event;
    switch ( e.keyCode )
    {
        case 32:  //spacja
            paused = !paused;
            break;
        case 37: //strzałka w lewo
            kierunek = 'l';
            break;
        case 38:
            kierunek = 'u'; // strzałka w górę
            break;
        case 39:
            kierunek = 'r'; // strzałka w prawo
            break;
        case 40:
            kierunek = 'd';  //strzałka w dół
            break;
        default:
            break;
    }
});

window.addEventListener('resize', () =>
{
    ctx.canvas.width = document.querySelector('.playground').clientWidth;
    ctx.canvas.height = document.querySelector('.playground').clientHeight;
    x = ctx.canvas.width * 0.5;
    y = ctx.canvas.height * 0.5;
    r = ctx.canvas.height * 0.05;
    dx = ctx.canvas.width * 0.006;
    printPacMan(otwarcie, x, y, r);
});


// wykonywany kod

var plotno = document.querySelector('#scene');
var ctx = plotno.getContext('2d');

ctx.canvas.width = document.querySelector('.playground').clientWidth;
ctx.canvas.height = document.querySelector('.playground').clientHeight;

var otwarcie = 0.1;
var otwiera_sie = true;
var x = ctx.canvas.width * 0.5;
var y = ctx.canvas.height * 0.5;
var r = ctx.canvas.height * 0.05;

var dx = ctx.canvas.width * 0.006;
var dy = dy;
var dt = 16; //ms
var paused = true;

var kierunek = 'r'; // r - w prawo, l - w lewo, u - w górę, d - w dół
printPacMan(otwarcie, x, y, r);
function point(x,y,r){
    this.x=x;
    this.y=y;
    this.r=r;
}
var p=new point(0,0,0);
createNewPoint(p);
let seconds=0;
let wynik=0;

function drawScoreboard(wynik) {
    ctx.font="20px sans-serif";
    ctx.fillStyle="black";
    ctx.fillText("Aktualny wynik: "+wynik,ctx.canvas.width-200,20);
}

window.setInterval(() => {
    if ( ! paused) 
    {

        movePacMan(kierunek);
        animatePacMan(null);

        drawPoint(p,seconds);
        animatePoint(p);
        drawScoreboard(wynik);
        seconds+=16;
        if(seconds>=3000){
            createNewPoint(p);
            seconds=0;
        }
    }
}, dt);