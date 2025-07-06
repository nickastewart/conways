var grid = [];
var cellHeight = 25;
var cellWidth = 25;
var game = {
    canvas : document.createElement("canvas"),
    start : function () {
        this.canvas.width = 1000;
        this.canvas.height = 1000;
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas)
        this.frame = 0;
        this.inteval = setInterval(updateGame,100);
    },
    clear : function () {
        this.context.clearRect(0, 0, this.canvas.height, this.canvas.width);
    }
}

function startGame() {
    xPos = 0;
    yPos = 0;

    gridHeight = 1000/this.cellHeight;
    gridWidth = 1000/this.cellWidth; 

    game.start()

    for (let i = 0; i < gridHeight; i++) {
        grid[i] = []
        xPos = 0;
        for (let j = 0; j < gridWidth; j++) {
            grid[i][j] = new cell(this.cellWidth, this.cellHeight, xPos, yPos)
            xPos = xPos + this.cellWidth;
            grid[i][j].update();
        }
        yPos = yPos + this.cellHeight
    }
    grid[5][5].currentState = true;
    grid[6][6].currentState = true;
    grid[6][7].currentState = true;
    grid[6][8].currentState = true;
    grid[5][5].update();
    grid[6][6].update();
    grid[6][7].update();
    grid[6][8].update();
}

function cell(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.currentState = false;
    this.nextState = false;

    this.update = function () {
        ctx = game.context;
        ctx.fillStyle = this.currentState ? "black" : "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}

function updateGame() {
    game.frame += 1;
    if (shouldUpdate(10)){
        game.clear();
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                dead = 0;
                alive = 0;
                
                topRow = i == 0 ? [] : grid[i-1];
                middleRow = grid[i];
                bottomRow = i == grid.length-1 ? [] : grid[i+1];
            
                if (topRow[j] != undefined) {
                    topRow[j].currentState == false ? dead++ : alive++; }
                if (topRow[j-1] != undefined) {
                    topRow[j-1].currentState == false ? dead++ : alive++;
                } 


                if (topRow[j+1] != undefined) {
                    topRow[j+1].currentState == false ? dead++ : alive++;
                }

                if (middleRow[j-1] != undefined) {
                    middleRow[j-1].currentState == false ? dead++ : alive++;
                }

                if (middleRow[j+1] != undefined) {
                    middleRow[j+1].currentState == false ? dead++ : alive++;
                }

                if (bottomRow[j-1] != undefined) {
                    bottomRow[j-1].currentState == false ? dead++ : alive++;
                }

                if (bottomRow[j] != undefined) {
                    bottomRow[j].currentState == false ? dead++ : alive++;
                }

                if (bottomRow[j+1] != undefined) {
                    bottomRow[j+1].currentState == false ? dead++ : alive++;
                }

                if (grid[i][j].currentState == true && (alive == 2 || alive == 3)) {
                    grid[i][j].nextState = true;
                } else if (grid[i][j].currentState == true) {
                    grid[i][j].nextState = false;
                }
                
                if (grid[i][j].currentState == false && alive == 3 && 
                    (i != 0 && j != 0) &&
                    (i != 0 && j != grid[0].length - 1) &&
                    (i != grid.length - 1 && j != 0) &&
                    (i != grid.length - 1 && j != grid[grid.length-1].length)) {

                    grid[i][j].nextState = true
                }
            }
        } 

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                grid[i][j].currentState = grid[i][j].nextState;
                grid[i][j].update();
            }
        }
    }
}

function shouldUpdate(n) {
    if ((game.frame / n) % 1 == 0 ){
        console.log("Updating... ")
        return true;
    }
    return false; 
}

