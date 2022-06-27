// ładowanie grafiki
var pazur = new Image();
pazur.src = "./gfx/standing.png";

var pazurRun = new Image();
pazurRun.src = "./gfx/running.png";

var pazurJump=new Image();
pazurJump.src="./gfx/jumping.png";

// ustawienia płótna
var canvas = document.querySelector("#scene");
var ctx = canvas.getContext("2d");
ctx.canvas.width = document.querySelector('.playground').clientWidth;
ctx.canvas.height = document.querySelector('.playground').clientHeight;


// ustawienia logiki animacji
var paused = false;
var running = false;
var jumping=false;
var clawX = 0;
var clawY = ctx.canvas.height;
var dx = 5;//0.01 * ctx.canvas.width;

var dy=dx;
var spada=false;
// funckje stanowiące "logikę" animacji
var sprite = (opt) =>
{
    var that = {};

    that.context = opt.context;
    that.width = opt.width;
    that.height = opt.height;
    that.image = opt.image;
    that.loop = opt.loop;

    var frameIndex = 0;
    var tickCount = 0;
    var ticksPerFrame = opt.ticksPerFrame || 0;
    var numberOfFrames = opt.numberOfFrames || 1;
    that.frameWidth = that.width / numberOfFrames ;

    that.render = (x, y) => {
        that.context.clearRect(clawX, clawY - that.height, that.width, that.height);
        if ( dx > 0 )
        {
            that.context.clearRect(clawX, clawY - that.height, that.width, that.height);
            that.context.drawImage(that.image, frameIndex * that.width / numberOfFrames, 0, that.width / numberOfFrames, 
            that.height, x, y - that.height, that.width / numberOfFrames, that.height);
        }
        else
        {
            ctx.save();
            ctx.scale(-1, 1);
            that.context.clearRect(-clawX, clawY - that.height, that.width, that.height);
            that.context.drawImage(that.image, frameIndex * that.width / numberOfFrames, 0, that.width / numberOfFrames, 
            that.height, -x - that.frameWidth , y - that.height, that.width / numberOfFrames, that.height);
            ctx.restore();
        }
        
    }

    that.update = () => {
        tickCount += 1;
        if (tickCount > ticksPerFrame)
        {
            tickCount = 0;
            if ( frameIndex < numberOfFrames - 1 )
            {
                frameIndex += 1;
            }
            else if ( that.loop )
            {
                frameIndex = 0;
            }
        }
    }

    return that;
}


var animationLoop = () =>
{
    window.requestAnimationFrame(animationLoop);
    if(jumping){
        if(!spada) {
            clawY -= dy;
            if (clawY <= ctx.canvas.height - 200) {
                spada = true;
            }
        }

        jumpingClaw.update();
        jumpingClaw.render(clawX,clawY);
    }
      if(clawY!==ctx.canvas.height && spada){
        clawY+=dy;
        if(clawY===ctx.canvas.height){spada=false; jumping=false;}
    }

     if ( running )
    {
        if ( clawX <= ctx.canvas.width && dx > 0)
        {
            clawX += dx;
        }
        else if ( clawX > ctx.canvas.width && dx > 0 )
        {
            clawX = -runningClaw.frameWidth;
        }
        else if ( clawX > -runningClaw.frameWidth && dx < 0 )
        {
            clawX += dx;
        }
        else if ( clawX <= -runningClaw.frameWidth && dx < 0 )
        {
            clawX = ctx.canvas.width + runningClaw.frameWidth;
        }
        if(!jumping) {
            runningClaw.update();
            runningClaw.render(clawX, clawY);
        }else{
            jumpingClaw.update();
            jumpingClaw.render(clawX,clawY);
        }
    }
    else if ( !paused && !jumping )
    {
        standingClaw.update();
        standingClaw.render(clawX, clawY);
    }
}

// Reakcja na zdarzenia 
window.addEventListener('keydown', (e) =>
{
    e = e || window.event;
    switch ( e.keyCode )
    {
        case 32:  //spacja
            paused = !paused;
            break;
        case 37:
            running = true;
            if ( dx > 0 )  dx = -dx;
            break;
        case 39:
            if (dx < 0 ) dx = -dx;
            running = true;
            break;

        default:
            running = false;
            break;
    }
});

window.addEventListener('keyup', (e) => {
    e = e || window.event;
    switch ( e.keyCode )
    {
        case 37:
            running = false;
            break; 
        case 39:
            running = false;
            break;
        case 90:    //z
            jumping=true;
            running=false;
            break;
        default:
            running = false;
            break;
    }
});

window.addEventListener('resize', () =>
{
    ctx.canvas.width = document.querySelector('.playground').clientWidth;
    ctx.canvas.height = document.querySelector('.playground').clientHeight;
    clawY = ctx.canvas.height;
    // dx = 0.01 * ctx.canvas.width;
});

// Tworzymy obiekt, z którym związany będzie Kapitan Pazur, który stoi  
var standingClaw = sprite({
    context: ctx,
    width: 960,
    height: 120,
    image: pazur,
    numberOfFrames: 8,
    loop: Infinity,
    ticksPerFrame: 8
 });

// Tworzymy obiekt, z którym związany będzie Kapitan Pazur, który biegnie
var runningClaw = sprite({
    context: ctx,
    width: 960,
    height: 120,
    image: pazurRun,
    numberOfFrames: 8,
    loop: Infinity,
    ticksPerFrame: 8
 });

var jumpingClaw=sprite({
    context:ctx,
    width:840,
    height:120,
    image:pazurJump,
    numberOfFrames:7,
    loop:Infinity,
    ticksPerFrame: 7
});

// Startujemy animację po załadowaniu grafiki
pazur.addEventListener("load", animationLoop);