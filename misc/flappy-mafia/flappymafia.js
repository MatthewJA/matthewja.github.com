(function(window){

    var images = {};
    images.bird = new Image();
    images.bird.src = "bird.png";
    images.bird.fb_width = 80;
    images.bird.fb_height = 91;
    images.pipe = new Image();
    images.pipe.src = "pipe.png";
    images.pipe.fb_width = 56;
    images.pipe.fb_height = 189;
    images.pipe2 = new Image();
    images.pipe2.src = "pipe2.png"; // assume same dimensions as pipe
    images.bg = new Image();
    images.bg.fb_width = 718;
    images.bg.src = "womens.jpg";
    images.bg2 = new Image();
    images.bg2.src = "sit.jpg"; // also assuming same dimensions as bg

    var crinkle = [
        new Audio("crinkle1.mp3"),
        new Audio("crinkle2.mp3"),
        new Audio("crinkle3.mp3"),
        new Audio("crinkle4.mp3"),
        new Audio("crinkle5.mp3"),
        new Audio("crinkle6.mp3"),
        new Audio("crinkle7.mp3")
    ];

    var width = 640;
    var height = 480;

    var lastTime = 0;

    var score = 0;
    var gameOver = false;
    var textUp = false;

    //////

    var bird = {
        x: images.bird.fb_width/2,
        y: height/2 - images.bird.fb_height/2,
        a: 0.001,
        v: 0
    }

    var Pipe = function() {
        this.x = width;
        if (Math.random() < 0.5) {
            this.y = height - images.pipe.fb_height;
            this.flipped = false;
        } else {
            this.y = 0;
            this.flipped = true;
        }
        this.speed = -0.5;
    }
    var pipes = [new Pipe()];

    var jumped = false;
    var jumpSpeed = 0.5;

    var pipeWidth = width/8;
    var pipeWidthVariance = width/6;

    var bg1x = 0;
    var bg2x = images.bg.fb_width;

    var mafiaTalks = [];
    var talks = [
        "Mafia talk!",
        "Mafia talk!",
        "Mafia talk!",
        "Mafia talk!",
        "Mafia talk!",
        "Mafia talk!",
        "Mafia crinkle!",
        "Crinkle!",
        "Trust in Bryan!",
        "Kill Liam!",
        "That's mafia talk!",
        "Lynch Jacob!",
        "He's mafia!",
        "She's mafia!",
        "Ay I reckon that's mafia talk",
        "Mafia muttering!",
        "Who's still alive?",
        "I'm the Guardian ay",
        "Kill Ben, he's the Guardian!",
        "I'm every power role at once",
        "Trust me guys I'm Bryan",
        "Trust me!",
        "Mafia talk!",
        "Don't mute me, Sheriff!",
        "Your face is mafia talk!",
        "You are soooo mafia",
    ];

    //////

    var draw = function(context) {
        if (!gameOver) {
            context.fillStyle = "#FFFFFF";
            context.fillRect(0, 0, width, height);
            context.drawImage(images.bg, bg1x, 0);
            context.drawImage(images.bg2, bg2x, 0);
            context.drawImage(images.bird, bird.x, bird.y);
            for (var i = 0; i < pipes.length; i++) {
                if (pipes[i].flipped) {
                    context.drawImage(images.pipe2, pipes[i].x, pipes[i].y);
                } else {
                    context.drawImage(images.pipe, pipes[i].x, pipes[i].y);
                }
            };
            for (var i = 0; i < mafiaTalks.length; i++) {
                context.fillStyle = "rgba(255, 255, 255, " + mafiaTalks[i].f + ")";
                context.font = "20px 'Merriweather Sans'";
                context.fillText(mafiaTalks[i].t, 100, mafiaTalks[i].y);
            };
        } else {
            context.fillStyle = "rgba(255, 0, 0, 0.01)";
            context.fillRect(0, 0, width, height);
            context.fillStyle = "#FFFFFF";
            context.font = "20px 'Merriweather Sans'";
            context.fillText("All of the mafia are dead! Game over!", width/2-200, height/2-50);
            context.fillText("Final score: " + score, width/2-130, height/2);
        }
    }

    var clamp = function(x, a, b) {
        return Math.max(a, Math.min(x, b));
    };

    var intersects = function(pipe) { // http://stackoverflow.com/a/1879223/1105803
        // Find the closest point to the circle within the rectangle
        var circleX = bird.x + 41;
        var circleY = bird.y + 54; // shh magic numbers are ok here because shut up
        var circleR = 37.5; // give or take, right? I mean we're pretending the chipbird is a circle anyway

        var rectL = pipe.x;
        var rectR = pipe.x + images.pipe.fb_width;
        var rectT; var rectB;
        if (pipe.flipped) {
            rectT = 0;
            rectB = images.pipe.fb_height;
        } else {
            rectT = pipe.y;
            rectB = height;
        }

        var closestX = clamp(circleX, rectL, rectR);
        var closestY = clamp(circleY, rectT, rectB);

        // Calculate the distance between the circle's center and this closest point
        var distanceX = circleX - closestX;
        var distanceY = circleY - closestY;

        // If the distance is less than the circle's radius, an intersection occurs
        var distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
        return distanceSquared < (circleR * circleR);
    };

    var update = function(dt) {
        if (!gameOver) {
            if (dt < 1000) {

                for (var i = 0; i < mafiaTalks.length; i++) {
                    mafiaTalks[i].f -= 0.0005 * dt;
                    mafiaTalks[i].y -= 0.1 * dt;
                    if (mafiaTalks[i].f <= 0) {
                        mafiaTalks.splice(i, 1);
                        i -= 1;
                    }
                };

                bg1x -= 0.3;
                bg2x -= 0.3;

                if (bg1x < -images.bg.fb_width) {
                    bg1x = images.bg.fb_width;
                }
                if (bg2x < -images.bg.fb_width) {
                    bg2x = images.bg.fb_width;
                }

                for (var i = 0; i < pipes.length; i++) {
                    pipes[i].x += pipes[i].speed*dt;

                    if (intersects(pipes[i])) {
                        gameOver = true;
                    }

                    if (pipes[i].x < -images.pipe.fb_width) {
                        pipes.splice(i, 1);
                        i -= 1;
                        score += 1;
                    }
                };

                if (jumped) {
                    jumped = false;
                    bird.v = -jumpSpeed;
                }

                bird.v += bird.a*dt;
                bird.y += bird.v*dt;

                if (bird.y + images.bird.fb_height > height || bird.y < 0) {
                    gameOver = true;
                }

                if (pipes.length > 0 && pipes[pipes.length-1].x < pipeWidth + 2 * Math.random() * pipeWidthVariance - pipeWidthVariance) {
                    // spawn new pipe
                    pipes.push(new Pipe());
                }

            }
        }
    };

    var mainLoop = function(context) {
        var now = (new Date()).getTime();
        var dt = now - lastTime;
        lastTime = now;

        update(dt);
        draw(context);

        setTimeout(function() { mainLoop(context); }, 1);
    };

    var restartGame = function(context) {
        gameOver = false;
        score = 0;
        pipes = [new Pipe()];
        bird.y = height/2 - images.bird.fb_height/2;
        bird.v = 0;
        jumped = false;
        bg1x = 0;
        bg2x = images.bg.fb_width;
        mafiaTalks = [];
        mainLoop(context);
    };

    $(document).ready(function() {
        var context = $("#canvas").get(0).getContext("2d");
        context.canvas.width = width;
        context.canvas.height = height;

        $("#canvas").click(function() {
            if (!gameOver) {
                jumped = true;
                var snd = crinkle[Math.floor(Math.random() * crinkle.length)];
                mafiaTalks.push({t: talks[Math.floor(Math.random() * talks.length)], y: bird.y, f: 1.0});
                snd.currentTime = 0;
                snd.play();
            } else {
                restartGame(context);
            }
        });

        mainLoop(context);
    });

}).call(window)