var canvas = document.getElementById('snake-game');
var ctx = canvas.getContext("2d");

var w = 6;
var h = 6;

var currentXPos = 5 + (w * 5) + (w * 20)
var currentYPos = 5 + (h * 5) + (h * 20)
var width = 20;

var length = 0;
var posId = 0;
var pastPositions = [{w: 1, h: 1, id: -5}, {w: 2, h: 2, id: -4}, {w: 3, h: 3, id: -3}, {w: 4, h: 4, id: -2}, {w: 5, h: 5, id: -1}, {w: 6, h: 6, id: 0}];

var bonusCount = 0;
var bonuses = []
var bonusId = 0;

var intervalId;
var key = 'ArrowRight';

        // Check keypress
document.addEventListener('keydown', function(event) {
    if(event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'ArrowUp' || event.key === 'ArrowDown'){
        if((key === 'ArrowRight' && event.key === 'ArrowLeft') || (key === 'ArrowLeft' && event.key === 'ArrowRight') || (key === 'ArrowUp' && event.key === 'ArrowDown') || (key === 'ArrowDown' && event.key === 'ArrowUp')) {
            return;
        } else {
            key = event.key;
        }
        
    };
});

        // Start button
document.getElementById('start').addEventListener('click', () => {
    if(intervalId){clearInterval(intervalId)};
    canvas.style.backgroundColor = 'rgb(144, 238, 144)';
    key = 'ArrowRight';
    w = 0;
    h = 0;
    pastPositions = [{w: 1, h: 1, id: -5}, {w: 2, h: 2, id: -4}, {w: 3, h: 3, id: -3}, {w: 4, h: 4, id: -2}, {w: 5, h: 5, id: -1}, {w: 6, h: 6, id: 0}];
    length = pastPositions.length;
    intervalId = setInterval(draw, 250);
    ctx.clearRect(0, 0, 505, 505);
    bonusCount = 0;
    bonuses = [];
});

        // Clear interval, make background red and draw "DEAD" on canvas
function dead() {                                
    clearInterval(intervalId);
    canvas.style.backgroundColor = 'rgb(255,114,118)';
    ctx.fillStyle = "rgb(255, 255, 0)"
    drawDead()
    
}

        // Bonus System
function bonusSystem() {
    ctx.fillStyle = "rgb(255, 50, 50)";

    if(bonuses.find(obj => obj.x === w && obj.y === h)) {
        bonus = true;
        bonusCount--;
        var bonusAte = bonuses.find(obj => obj.x === w && obj.y === h);
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillRect(5 + (bonusAte.x * 5) + (bonusAte.x * 20), 5 + (bonusAte.y * 5) + (bonusAte.y * 20), 20, 20);
        ctx.fillStyle = "rgb(255, 50, 50)";
        var bonusAteIndex = bonuses.findIndex(obj => obj === bonusAte);
        bonuses.splice(bonusAteIndex, 1);
    }

    var randomXPos;
    var randomYPos;
    
    while(bonusCount < 3) {
        bonusId++;
        randomXPos = Math.floor(Math.random() * 20);
        randomYPos = Math.floor(Math.random() * 20);
        while(pastPositions.find(obj => obj.w === randomXPos && obj.h === randomYPos)) {
            randomXPos = Math.floor(Math.random() * 20);
            randomYPos = Math.floor(Math.random() * 20);
        }
        ctx.fillRect(5 + (randomXPos * 5) + (randomXPos * 20), 5 + (randomYPos * 5) + (randomYPos * 20), 20, 20);
        bonusCount++;
        bonuses.push({x: randomXPos, y: randomYPos, id: bonusId})
    }
}

var bonus = false;
let i = 0;

        // Game Function
function draw() {                                
    posId++;

    bonusSystem();
    ctx.fillStyle = "rgb(0, 0, 0)";

        // Hitting Border
    if(w >= 19 || w < 0 || h >= 19 || h < 0){    
        dead();
        return;
    } else if (pastPositions.find(obj => obj.w === w && obj.h === h)) {
        dead();
        return;
    }

    pastPositions.push({w: w, h: h, id: posId});

        // If field isn't a bonus, the snake should keep it's length
    if(!bonus) {                                 
        ctx.clearRect(5 + (pastPositions[0].w * 5) + (pastPositions[0].w * 20), 5 + (pastPositions[0].h * 5) + (pastPositions[0].h * 20), 20, 20);
        pastPositions.shift();
    }

    if(key === 'ArrowRight'){
        w++;
    }else if(key === 'ArrowDown'){
        h++;
    } else if(key === 'ArrowLeft'){
        w--;
    } else if(key === 'ArrowUp'){
        h--;
    } 

    currentXPos = 5 + (w * 5) + (w * 20);
    currentYPos = 5 + (h * 5) + (h * 20);
    ctx.fillRect(currentXPos, currentYPos, width, width);

    length = pastPositions.length;
    document.getElementById('score').innerHTML = `Points: ${length}`;
    bonus = false
    i++;
}

function drawDead() {
    // D
    ctx.fillRect((5 + (2 * 5) + (2 * 20)), (5 + (7 * 5) + (7 * 20)), 20, 20);
    ctx.fillRect((5 + (2 * 5) + (2 * 20)), (5 + (8 * 5) + (8 * 20)), 20, 20);
    ctx.fillRect((5 + (2 * 5) + (2 * 20)), (5 + (9 * 5) + (9 * 20)), 20, 20);
    ctx.fillRect((5 + (2 * 5) + (2 * 20)), (5 + (10 * 5) + (10 * 20)), 20, 20);
    ctx.fillRect((5 + (2 * 5) + (2 * 20)), (5 + (11 * 5) + (11 * 20)), 20, 20);

    ctx.fillRect((5 + (3 * 5) + (3 * 20)), (5 + (7 * 5) + (7 * 20)), 20, 20);
    ctx.fillRect((5 + (3 * 5) + (3 * 20)), (5 + (11 * 5) + (11 * 20)), 20, 20);

    ctx.fillRect((5 + (4 * 5) + (4 * 20)), (5 + (8 * 5) + (8 * 20)), 20, 20);
    ctx.fillRect((5 + (4 * 5) + (4 * 20)), (5 + (9 * 5) + (9 * 20)), 20, 20);
    ctx.fillRect((5 + (4 * 5) + (4 * 20)), (5 + (10 * 5) + (10 * 20)), 20, 20);

    // E
    ctx.fillRect((5 + (6 * 5) + (6 * 20)), (5 + (7 * 5) + (7 * 20)), 20, 20);
    ctx.fillRect((5 + (6 * 5) + (6 * 20)), (5 + (8 * 5) + (8 * 20)), 20, 20);
    ctx.fillRect((5 + (6 * 5) + (6 * 20)), (5 + (9 * 5) + (9 * 20)), 20, 20);
    ctx.fillRect((5 + (6 * 5) + (6 * 20)), (5 + (10 * 5) + (10 * 20)), 20, 20);
    ctx.fillRect((5 + (6 * 5) + (6 * 20)), (5 + (11 * 5) + (11 * 20)), 20, 20);

    ctx.fillRect((5 + (7 * 5) + (7 * 20)), (5 + (7 * 5) + (7 * 20)), 20, 20);
    ctx.fillRect((5 + (8 * 5) + (8 * 20)), (5 + (7 * 5) + (7 * 20)), 20, 20);

    ctx.fillRect((5 + (7 * 5) + (7 * 20)), (5 + (9 * 5) + (9 * 20)), 20, 20);

    ctx.fillRect((5 + (7 * 5) + (7 * 20)), (5 + (11 * 5) + (11 * 20)), 20, 20);
    ctx.fillRect((5 + (8 * 5) + (8 * 20)), (5 + (11 * 5) + (11 * 20)), 20, 20);

    // A
    ctx.fillRect((5 + (10 * 5) + (10 * 20)), (5 + (7 * 5) + (7 * 20)), 20, 20);
    ctx.fillRect((5 + (10 * 5) + (10 * 20)), (5 + (8 * 5) + (8 * 20)), 20, 20);
    ctx.fillRect((5 + (10 * 5) + (10 * 20)), (5 + (9 * 5) + (9 * 20)), 20, 20);
    ctx.fillRect((5 + (10 * 5) + (10 * 20)), (5 + (10 * 5) + (10 * 20)), 20, 20);
    ctx.fillRect((5 + (10 * 5) + (10 * 20)), (5 + (11 * 5) + (11 * 20)), 20, 20);

    ctx.fillRect((5 + (11 * 5) + (11 * 20)), (5 + (7 * 5) + (7 * 20)), 20, 20);
    ctx.fillRect((5 + (12 * 5) + (12 * 20)), (5 + (7 * 5) + (7 * 20)), 20, 20);

    ctx.fillRect((5 + (11 * 5) + (11 * 20)), (5 + (9 * 5) + (9 * 20)), 20, 20);
    ctx.fillRect((5 + (12 * 5) + (12 * 20)), (5 + (9 * 5) + (9 * 20)), 20, 20);

    ctx.fillRect((5 + (13 * 5) + (13 * 20)), (5 + (7 * 5) + (7 * 20)), 20, 20);
    ctx.fillRect((5 + (13 * 5) + (13 * 20)), (5 + (8 * 5) + (8 * 20)), 20, 20);
    ctx.fillRect((5 + (13 * 5) + (13 * 20)), (5 + (9 * 5) + (9 * 20)), 20, 20);
    ctx.fillRect((5 + (13 * 5) + (13 * 20)), (5 + (10 * 5) + (10 * 20)), 20, 20);
    ctx.fillRect((5 + (13 * 5) + (13 * 20)), (5 + (11 * 5) + (11 * 20)), 20, 20);

    // D
    ctx.fillRect((5 + (15 * 5) + (15 * 20)), (5 + (7 * 5) + (7 * 20)), 20, 20);
    ctx.fillRect((5 + (15 * 5) + (15 * 20)), (5 + (8 * 5) + (8 * 20)), 20, 20);
    ctx.fillRect((5 + (15 * 5) + (15 * 20)), (5 + (9 * 5) + (9 * 20)), 20, 20);
    ctx.fillRect((5 + (15 * 5) + (15 * 20)), (5 + (10 * 5) + (10 * 20)), 20, 20);
    ctx.fillRect((5 + (15 * 5) + (15 * 20)), (5 + (11 * 5) + (11 * 20)), 20, 20);

    ctx.fillRect((5 + (16 * 5) + (16 * 20)), (5 + (7 * 5) + (7 * 20)), 20, 20);
    ctx.fillRect((5 + (16 * 5) + (16 * 20)), (5 + (11 * 5) + (11 * 20)), 20, 20);

    ctx.fillRect((5 + (17 * 5) + (17 * 20)), (5 + (8 * 5) + (8 * 20)), 20, 20);
    ctx.fillRect((5 + (17 * 5) + (17 * 20)), (5 + (9 * 5) + (9 * 20)), 20, 20);
    ctx.fillRect((5 + (17 * 5) + (17 * 20)), (5 + (10 * 5) + (10 * 20)), 20, 20);
}