function setCanvas() {
        var canvasNode = document.getElementById('canvasD');

        var pw = canvasNode.parentNode.clientWidth;
        var ph = canvasNode.parentNode.clientHeight;

        var tbh = document.getElementById('topbar').clientHeight;

        canvasNode.height = (ph * 0.9) - ((ph * 0.9) % 15)+1;
        canvasNode.width = (pw * 0.9) - ((pw * 0.9) % 15)+1;

        canvasNode.style.top = ((ph + tbh - canvasNode.height) / 2) + "px";
        canvasNode.style.left = (pw - canvasNode.width) / 2 + "px";

        drawGrid();
}

function drawGrid() {
    var canvasNode = document.getElementById('canvasD');
    var context = canvasNode.getContext("2d");

    var width = canvasNode.clientWidth;
    var height = canvasNode.clientHeight;

    //context.beginPath();

    for (var x = 0.5; x < width; x += 15) {
        context.moveTo(x, 0);
        context.lineTo(x, height);
    }

    for (var y = 0.5; y < height; y += 15) {
        context.moveTo(0, y);
        context.lineTo(width, y);
    }

    context.strokeStyle = "black";
    context.stroke();



    //context.closePath();
}

function startGenerating() {
    var cells = [];
    var directions;
    var rem;
    var index;
    var x, y, nx, ny;
    var dir;
    var z;
    var canvasNode = document.getElementById('canvasD');
    var context = canvasNode.getContext("2d");

    var numW = ((canvasNode.clientWidth-1) / 15) - 1;
    var numH = ((canvasNode.clientHeight-1) / 15) - 1;

    var grid = new Array(numW);

    for (i = 0; i <= numW; i++) {
        grid[i] = new Array(numH);
    }

    for (i = 0; i <= numW; i++) {
        for (j = 0; j <= numH; j++) {
            grid[i][j] = 0;
        }
    }

    var x = random(0, numW);
    var y = random(0, numH);

    cells.push(new coordinates(x, y));
    grid.push([x, y]);
    grid[x][y] = 1;

    //context.fillStyle = "#32add6";
    //context.fillRect((x*15+1),(y*15+1), 14, 14);

    context.fillStyle = "#f0f8ff";

    while (cells.length > 0) {

        index = returnIndex(cells.length - 1);

        directions = [1, 2, 3, 4];

        directions = shuffle(directions);

        while (directions.length > 0) {

            rem = random(0, (directions.length-1));

            dir = directions[rem];
            directions.splice(rem, 1);

            nx = cells[index].x + dx(dir);
            ny = cells[index].y + dy(dir);


            if ((nx >= 0) && (nx <= numW) && (ny >= 0) && (ny <= numH) && (grid[nx][ny] == 0)) {

                grid[nx][ny] = 1;

                cells.push(new coordinates(nx, ny));

                switch (dir) {
                    case 1:
                        context.fillRect((nx * 15 +1 ), ((ny + 1) * 15 - 1), 14, 2);
                        break;
                    case 2:
                        context.fillRect(((nx - 1) * 15 - 1), (ny * 15 + 1), 2, 14);
                        break;
                    case 3:
                        context.fillRect((nx * 15 + 1), ((ny - 1) * 15 - 1), 14, 2);
                        break;
                    case 4:
                        context.fillRect(((nx + 1) * 15 - 1), (ny * 15 + 1), 2, 14);
                        break;
                }
                //context.fillStyle = "#32add6";
                //context.fillRect((nx*15+1),(ny*15+1),14, 14);

                index = -1;
                break;
            }
        }

        if (index != -1) {
            //context.fillStyle = "#f0f8ff";
            //context.fillRect((cells[index].x * 15 + 1), (cells[index].y * 15 + 1), 14, 14);
            cells.splice(index, 1);
        }
    }
}

function shuffle(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function returnIndex(length) {

    var f = random(0, 4);

    switch(f) {
        case 0: return length;
        case 1: return 0;
        case 2: return random(0, length);
        case 3:
            if (length % 2 == 0) return length / 2;
            else return (length + 1) / 2;
        case 4: return random(0, length);

    }
}

function dx(dir) {
    switch (dir) {
        case 1: return 0;
        case 2: return 1;
        case 3: return 0;
        case 4: return -1;
    }
}

function dy(dir) {
    switch (dir) {
        case 1: return -1;
        case 2: return 0;
        case 3: return +1;
        case 4: return 0;
    }
}

function coordinates(x, y) {
    this.x = x;
    this.y = y;
}
function resetGrid() {
    var canvasNode = document.getElementById('canvasD');
    //contex.clearRect(0.5, 0.5, canvasNode.clientWidth, canvasNode.clientHeight);
    canvasNode.width = canvasNode.width;

    drawGrid();
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}