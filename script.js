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

var intervalId;
var key = 'ArrowRight';

document.addEventListener('keydown', function(event) {
    if(event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'ArrowUp' || event.key === 'ArrowDown'){
        key = event.key
    };
});

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
});
    
function dead() {                                // Clear interval, make background red and draw "DEAD" on canvas
    clearInterval(intervalId);
    canvas.style.backgroundColor = 'rgb(255,114,118)';
    ctx.fillStyle = "rgb(255, 255, 0)"
    // D
    ctx.fillRect(97, 200, 20, 100);
    ctx.fillRect(117, 200, 20, 20);
    ctx.fillRect(117, 280, 20, 20);
    ctx.fillRect(137, 220, 20, 60);
    // E
    ctx.fillRect(177, 200, 20, 100);
    ctx.fillRect(187, 200, 40, 20);
    ctx.fillRect(187, 240, 20, 20);
    ctx.fillRect(187, 280, 40, 20);
    // A
    ctx.fillRect(247, 200, 20, 100);
    ctx.fillRect(267, 200, 40, 20);
    ctx.fillRect(267, 240, 40, 20);
    ctx.fillRect(297, 200, 20, 100);
    // D
    ctx.fillRect(337, 200, 20, 100);
    ctx.fillRect(357, 200, 20, 20);
    ctx.fillRect(357, 280, 20, 20);
    ctx.fillRect(377, 220, 20, 60);
}

var bonuses = []
var bonusId = 0;

function bonusSystem() {
    ctx.fillStyle = "rgba(255, 50, 50, 0.8)";

    if(bonuses.find(obj => obj.x === w && obj.y === h)) {
        bonus = true;
        bonusCount--;
        var bonusAte = bonuses.find(obj => obj.x === w && obj.y === h);
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillRect(5 + (bonusAte.x * 5) + (bonusAte.x * 20), 5 + (bonusAte.y * 5) + (bonusAte.y * 20), 20, 20);
        ctx.fillStyle = "rgba(255, 50, 50, 0.8)";
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
function draw() {                                // Game Function
    posId++;

    bonusSystem();
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";

    if(w >= 19 || w < 0 || h >= 19 || h < 0){    // Hitting Border
        dead();
        return;
    } else if (pastPositions.find(obj => obj.w === w && obj.h === h)) {
        dead();
        return;
    }

    pastPositions.push({w: w, h: h, id: posId});

    if(!bonus) {                                 // If field isn't a bonus, the snake should keep it's length
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