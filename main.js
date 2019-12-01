var tWorld = [];

//INIT WORLD

var tCtx;

var canvas;

var masterGreen;

var masterYellow;

var masterBlue;

window.onload = function()
{

    canvas = document.getElementById('canvas');

    canvas.width = document.body.clientWidth;

    canvas.height = document.body.clientHeight;

    tCtx = canvas.getContext("2d");

    var cx = Math.floor(canvas.width / 2);

    var cy = Math.floor(canvas.height / 2);

    var md = 500;

    //Collisions???

    masterGreen = new ball(2,0,0,"green","green");

    randRule(masterGreen, ["green", "yellow", "blue"]);

    // masterGreen.rules.push(new rule("yellow", md, -1, (x) => { return linScale(x, 1); }));

    // //masterGreen.rules.push(new rule("green", 100, 1, (x) => { return linScale(x, 1); }));

    // masterGreen.rules.push(new rule("blue", md, -1, (x) => { return linScale(x, 1); }));

    //Push away intersecting

    // masterGreen.rules.push(new rule(-1, 5, 2, (x) => { return linScale(x, 1); }));

    masterYellow = new ball(2,0,0,"yellow","yellow");

    randRule(masterYellow, ["green", "yellow", "blue"]);

    // masterYellow.rules.push(new rule("green", md, 1, (x) => { return linScale(x, 1); }));

    // //masterYellow.rules.push(new rule("yellow", 100, -1, (x) => { return expScale(x, 100); }));

    // masterYellow.rules.push(new rule("blue", md, -1, (x) => { return expScale(x, 100); }));

    //Push away intersecting

    // masterYellow.rules.push(new rule(-1, 5, 2, (x) => { return linScale(x, 1); }));

    masterBlue = new ball(2,0,0,"blue","blue");

    randRule(masterBlue, ["green", "yellow", "blue"]);

    //Make yellow and green attracted to each other

    // masterBlue.rules.push(new rule("green", md, -1, (x) => { return linScale(x, 1); }));

    // masterBlue.rules.push(new rule("yellow", md, -1, (x) => { return expScale(x, 100); }));

    // //masterBlue.rules.push(new rule("blue", 100, 1, (x) => { return expScale(x, 100); }));

    // //Push away intersecting

    // masterBlue.rules.push(new rule(-1, 5, 2, (x) => { return linScale(x, 1); }));

    //tWorld.push(masterBlue.clone(5, cx, cy, "blue", tWorld.length));

    //tWorld.push(masterYellow.clone(5, cx - 1, cy - 1, "yellow", tWorld.length));

    //tWorld.push(masterGreen.clone(5, cx + 1, cy + 1, "green", tWorld.length));

    var n = 50;

    for (var i = 0; i < n * 2; i++)
        tWorld.push(masterGreen.clone(5, cx + rand(-100, 100), cy + rand(-100, 100), "green", tWorld.length));

    for (var i = 0; i < n * 2; i++)
        tWorld.push(masterYellow.clone(5, cx + rand(-100, 100), cy + rand(-100, 100), "yellow", tWorld.length));

    for (var i = 0; i < n; i++)
        tWorld.push(masterBlue.clone(5, cx + rand(-100, 100), cy + rand(-100, 100), "blue", tWorld.length));

    //for (var i = 0; i < tWorld.length; i++) tWorld[i].applyVel({ x: rand(-50, 50), y: rand(-50, 50) });

    render();

}

var lastLoop = new Date();

var ct = 0;

//https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe

// var lastTimestamp = 0,

// maxFPS = 30,

// timestep = 1000 / maxFPS; // ms for each frame

// function render()

// {

// // var thisLoop = new Date();

// // var fps = 1000 / (thisLoop - lastLoop);

// // lastLoop = thisLoop;

// // if (ct++ == 100) {ct = 0; console.log(fps);}

// if (timestamp - lastTimestamp < timestep) return;

// lastTimestamp = timestamp;

// tCtx.clearRect(0, 0, canvas.width, canvas.height);

// // var nx = Math.floor(canvas.width / 10);

// // var ny = Math.floor(canvas.height / 10);

// // for (var i = 0; i < nx; i++)

// // {

// // //X

// // tCtx.beginPath();

// // tCtx.moveTo(i * 10, 0);

// // tCtx.lineTo(i * 10, canvas.height);

// // tCtx.stroke();

// // }

// // for (var i = 0; i < ny; i++) {

// // //X

// // tCtx.beginPath();

// // tCtx.moveTo(0, i * 10);

// // tCtx.lineTo(canvas.width, i * 10);

// // tCtx.stroke();

// // }

// single();

// // for (var i = 0; i < tWorld.length; i++) {

// // tWorld[i].boundBox(0, 0, canvas.width, canvas.height, false);

// // tWorld[i].render(tCtx);

// // }

// //console.log(tWorld);

// requestAnimationFrame(render);

// }

var fps = 80;

function render() {

    setTimeout(function() {

        var thisLoop = new Date();

        var fps = 1000 / (thisLoop - lastLoop);

        lastLoop = thisLoop;

        if (ct++ == 100) {
            ct = 0;
            console.log(fps);
        }

        requestAnimationFrame(render);

        tCtx.clearRect(0, 0, canvas.width, canvas.height);

        single(true, tCtx);

        // for (var i = 0; i < tWorld.length; i++) {

        // tWorld[i].render(tCtx);

        // }

    }, 1000 / fps);

}

function single(render, tCtx)
{

    for (var i = 0; i < tWorld.length; i++)
    {

        tWorld[i].applyRule(tWorld);

    }

    for (var i = 0; i < tWorld.length; i++)
    {

        tWorld[i].applyPhy(0.9);

        tWorld[i].boundBox(0, 0, canvas.width, canvas.height, false);

        if (render)
            tWorld[i].render(tCtx);

    }

}

//For me, I will keep the color and type the same

function ball(r, x, y, c, t) //, _id) //Radius, x, y, color, type, identifier

{

    //this.id = _id;

    this.color = c;

    this.radius = r;

    this.x = x;

    this.y = y;

    this.vx = 0;

    this.vy = 0;

    this.type = t;

    this.render = function(ctx)
    {

        //Render here

        //TODO: IMPLEMENT

        ctx.fillStyle = this.color;

        ctx.beginPath();

        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

        ctx.fill();

    }

    this.rules = [];

    this.applyRule = function(world)
    {

        //world is array of each ball

        for (var i = 0; i < world.length; i++)
        {

            if (world[i].id == this.id)
                continue;

            for (var j = 0; j < this.rules.length; j++)
            {

                if (this.rules[j].match(world[i]))
                    world[i].applyVel(this.rules[j].dvel(getAngle(this, world[i]), getDistance(this, world[i])));

            }

        }

    }

    this.applyVel = function(vec)
    {

        this.vx += vec.x;

        this.vy += vec.y;

    }

    this.applyPhy = function(friction)
    {

        this.vx *= friction;

        this.vy *= friction;

        this.x += this.vx;

        this.y += this.vy;

    }

    this.clone = function(_r, _x, _y, _c, _i)
    {

        var c = Object.assign({}, this);

        c.radius = _r;

        c.x = _x;

        c.y = _y;

        c.color = _c;

        c.id = _i;

        c.vx = 0;

        c.vy = 0;

        return c;
        //Happy face C;

    }

    this.boundBox = function(minX, minY, maxX, maxY, wrap)
    {

        if (wrap)
        {

            //Wrap around

            if (this.x < minX)
                this.x = maxX;

            if (this.x > maxX)
                this.x = minX;

            if (this.y < minY)
                this.y = maxY;

            if (this.y > maxY)
                this.y = minY;

        }
        else
        {

            if (this.x < minX)
                this.x = minX;

            if (this.x > maxX)
                this.x = maxX;

            if (this.y < minY)
                this.y = minY;

            if (this.y > maxY)
                this.y = maxY;

        }

    }

    return this;

}

//https://stackoverflow.com/questions/9614109/how-to-calculate-an-angle-from-points

function getAngle(ball1, ball2)
{

    //var theta = Math.atan2(ball2.x - ball1.x, ball2.y - ball1.y);

    //theta *= 180 / Math.PI;

    //keep it in radians

    return Math.atan2(ball2.x - ball1.x, ball2.y - ball1.y);
    //* (180 / Math.PI);

}

//https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers

function map(in_min, in_max, out_min, out_max, val)
{

    return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;

}

function getDistance(ball1, ball2)
{

    return Math.sqrt(Math.pow(ball2.x - ball1.x, 2) + Math.pow(ball2.y - ball1.y, 2));

}

function rule(_t, _d, _vel, _sf) //Target, minDist, vel, scale function 

{

    this.target = _t;

    this.minDist = _d;

    this.velocity = _vel;

    this.scaleFunc = _sf;

    //scale func must accept input 0-1 and output 0-1

    //1 is min and 0 is max so that is 'flips' the input to be proportional to Vel and not inverse of Vel

    //this.scaleFunc(map(0, minDist, 1, 0, dist))

    this.dvel = function(angle, dist)
    {

        //console.log(dist, this.minDist);

        if (dist > this.minDist)
            return {
                x: 0,
                y: 0
            };

        var vec = {};

        var finalVel = this.scaleFunc(map(0, this.minDist, 1, 0, dist)) * this.velocity;

        vec.x = finalVel * Math.cos(angle);

        vec.y = finalVel * Math.sin(angle);

        return vec;

    }

    this.match = function(ball1)
    {

        //console.log((this.target == -1), (ball1.type == this.target));

        return (this.target == -1) || (ball1.type == this.target);

    }

    return this;

}

//Works with a>1

function expScale(x, a)
{

    return (1 - Math.pow(a, x)) / (1 - a);

}

//Works with a=>1

function linScale(x, a)
{

    return Math.max(1, Math.min(0, x * a));

}

function rand(min, max)
{

    return Math.random() * (max - min) + min;

}

function randRule(ball, types)
{

    for (var i = 0; i < types.length; i++)
    {

        var r = rand(2, 100);

        ball.rules.push(new rule(types[i],rand(0, 200),rand(0, -2),(x)=>{
            return expScale(x, r);
        }
        ));

    }

    ball.rules.push(new rule(-1,5,2,(x)=>{
        return linScale(x, 1);
    }
    ));

}
