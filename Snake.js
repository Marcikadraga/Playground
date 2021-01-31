function StartSnake() {

    var array = [];
    var snakeBody = [[1, 0]];
    var snakeHeadPosition = snakeBody[snakeBody.length - 1];
    var yTableSize = 23;
    var xTableSize = 23;
    var lastPushedButton = 'ArrowRight'
    var snakeSize = 30;
    var yDirection = 0;
    var xDirection = 0;
    var counter = snakeBody.length - 1;
    var yfoodPosition = Math.floor(Math.random() * yTableSize);
    var xfoodPosition = Math.floor(Math.random() * xTableSize);
    var foodPosition = [yfoodPosition, xfoodPosition]
    var gameMode = document.getElementById("mode").value;
    var gameIsRunning = false;
    var gameSpeed = document.getElementById('speed').value;
    var tableColor1 = "#3F6E73";
    var tableColor2 = "#324B4E";
    var snakeColor = "#5EC267";
    var foodColor = "#974F76";
    var color = "blue"
    var n = 2;
    var IsSnakeAlive = true;
    var snakeNumber = 0;



    class Field {


        get getID() {
            return this.Id;
        }
        constructor(id, y, x) {
            this.Id = id
            var fieldSize = snakeSize;
            var field = document.createElement('canvas');
            var ctx = field.getContext("2d");
            field.id = id;
            field.style.width = fieldSize + "px";
            field.style.height = fieldSize + "px";
            ctx.fillStyle = "red";
            field.style.left = fieldSize * x + "px";
            field.style.top = fieldSize * y + "px";
            field.style.position = "absolute";
            document.getElementById("snakeTable").appendChild(field);

        }
    }

    class Table {

        DisplayTheTable() {
            var id = 0;
            for (var i = 0; i < yTableSize; i++) {
                array.push([]);
                for (var j = 0; j < xTableSize; j++) {
                    array[i].push(new Field(id, i, j))
                    id++;
                }
            }
        }
        RedrawTheTable() {
            for (var i = 0; i < yTableSize * xTableSize; i++) {
                if (i % 2 == 0) {
                    document.getElementById(i).style.backgroundColor = tableColor1;
                }
                else {
                    document.getElementById(i).style.backgroundColor = tableColor2;
                }
            }
        }
    }
    class Snake {

        DrawTheSnake() {

            for (var i = 0; i < snakeBody.length - 1; i++) {
                document.getElementById(array[snakeBody[i][0]][snakeBody[i][1]].getID).style.backgroundColor = snakeColor;
            }

        }

        Eat() {
            yfoodPosition = Math.floor(Math.random() * yTableSize);
            xfoodPosition = Math.floor(Math.random() * xTableSize);
            foodPosition = [yfoodPosition, xfoodPosition]
        }
        DontGrow() {
            snakeBody.splice(0, 1)
        }
        SnakeIsDead() {
            for (var i = 0; i < snakeBody.length; i++) {
                for (var j = 0; j < snakeBody.length; j++) {
                    if (snakeBody[i][0] == snakeBody[j][0] && snakeBody[i][1] == snakeBody[j][1]) {
                        counter++;
                        if (counter == 2) {
                            gameSettings.Die()
                            gameSettings.ShowButtons();
                            document.getElementById('score').innerHTML = "dead";
                        }
                    }
                }
                counter = 0;
            }

        }
    }

    class Food {

        PlaceFood() {
            document.getElementById(array[yfoodPosition][xfoodPosition].getID).style.backgroundColor = foodColor;
        }
    }

    class Control {
        Move(pushedButton) {
            var yDirection = 0;
            var xDirection = 0;


            if (pushedButton === 'ArrowUp' && lastPushedButton !== 'ArrowDown') {
                yDirection = -1;
                lastPushedButton = 'ArrowUp';
            }
            else if (pushedButton === 'ArrowDown' && lastPushedButton !== 'ArrowUp') {
                yDirection = 1;
                lastPushedButton = 'ArrowDown';
            }
            else if (pushedButton === 'ArrowLeft' && lastPushedButton !== 'ArrowRight') {
                xDirection = -1;
                lastPushedButton = 'ArrowLeft';
            }
            else if (pushedButton === 'ArrowRight' && lastPushedButton !== 'ArrowLeft') {
                xDirection = 1;
                lastPushedButton = 'ArrowRight';
            }
            else if (pushedButton === 'ArrowUp' && lastPushedButton === 'ArrowDown') {
                yDirection = 1;
                lastPushedButton = 'ArrowDown';
            }
            else if (pushedButton === 'ArrowDown' && lastPushedButton === 'ArrowUp') {
                yDirection = -1;
                lastPushedButton = 'ArrowUp';
            }
            else if (pushedButton === 'ArrowLeft' && lastPushedButton === 'ArrowRight') {
                xDirection = 1;
                lastPushedButton = 'ArrowRight';
            }
            else if (pushedButton === 'ArrowRight' && lastPushedButton === 'ArrowLeft') {
                xDirection = -1;
                lastPushedButton = 'ArrowLeft';
            }

            snakeBody.push([]);
            if (gameMode == "easy") {
                if (snakeBody[snakeBody.length - 2][0] + yDirection == yTableSize) {
                    snakeBody[snakeBody.length - 1].push(0);
                    snakeBody[snakeBody.length - 1].push(snakeBody[snakeBody.length - 2][1])
                }
                if (snakeBody[snakeBody.length - 2][1] + xDirection == xTableSize) {
                    snakeBody[snakeBody.length - 1].push(snakeBody[snakeBody.length - 2][0])
                    snakeBody[snakeBody.length - 1].push(0);
                }
                if (snakeBody[snakeBody.length - 2][0] + yDirection == -1) {
                    snakeBody[snakeBody.length - 1].push(yTableSize - 1);
                    snakeBody[snakeBody.length - 1].push(snakeBody[snakeBody.length - 2][1])
                }
                if (snakeBody[snakeBody.length - 2][1] + xDirection == -1) {
                    snakeBody[snakeBody.length - 1].push(snakeBody[snakeBody.length - 2][0])
                    snakeBody[snakeBody.length - 1].push(xTableSize - 1);
                }
                else {
                    snakeBody[snakeBody.length - 1].push(snakeBody[snakeBody.length - 2][0] + yDirection);
                    snakeBody[snakeBody.length - 1].push(snakeBody[snakeBody.length - 2][1] + xDirection);
                }
                console.log(snakeBody[snakeBody.length - 2][0] + yDirection, snakeBody[snakeBody.length - 2][1] + yDirection)
            }
            else {
                if (snakeBody[snakeBody.length - 2][0] + yDirection == yTableSize || snakeBody[snakeBody.length - 2][1] + xDirection == xTableSize || snakeBody[snakeBody.length - 2][0] + yDirection == -1 || snakeBody[snakeBody.length - 2][1] + xDirection == -1) {
                    gameSettings.Die()
                }
                else {
                    snakeBody[snakeBody.length - 1].push(snakeBody[snakeBody.length - 2][0] + yDirection);
                    snakeBody[snakeBody.length - 1].push(snakeBody[snakeBody.length - 2][1] + xDirection);
                    console.log(snakeBody[snakeBody.length - 2][1] + xDirection);
                    console.log(snakeBody[snakeBody.length - 2][0] + xDirection);
                }
            }
            snakeHeadPosition = snakeBody[snakeBody.length - 1];

            table.RedrawTheTable();
            food.PlaceFood();
            snake.DrawTheSnake();

            if (snakeHeadPosition[0] == foodPosition[0] && snakeHeadPosition[1] == foodPosition[1]) {
                snake.Eat();
            }
            else {
                snake.DontGrow();
            }
        }
    }
    class GameSettings {
        Die() {
            var score = 'dead! Score is: ' + parseInt(snakeBody.length - 2);
            document.getElementById('score').innerHTML = score;
            gameIsRunning = false;
            IsSnakeAlive = false;
        }
        ShowButtons() {
            if (gameIsRunning == false) {
                document.getElementById("startButton").style.visibility = "visible";
                document.getElementById("quitButton").style.visibility = "hidden";
            }
            if (gameIsRunning == true) {
                document.getElementById("startButton").style.visibility = "hidden";
                document.getElementById("quitButton").style.visibility = "visible";
            }
        }
    }
    class Mode {
        Slide() {
            if (document.getElementById('mode').value == "annoying") {
                color = 'black'
                function slideLeft() {
                    var tablesWidth = document.getElementById("snakeTable").style.left;
                    var newTablesWidth = tablesWidth.substring(0, tablesWidth.length - 1);
                    newTablesWidth = newTablesWidth - 0.3;
                    document.getElementById("snakeTable").style.left = newTablesWidth.toString() + "%";
                    n--
                    if (n == -4) {
                        n = 2
                    }
                }
                function slideRight() {
                    var tablesWidth = document.getElementById("snakeTable").style.left;
                    var newTablesWidth = tablesWidth.substring(0, tablesWidth.length - 1);
                    newTablesWidth = parseFloat(newTablesWidth) + 0.3;
                    document.getElementById("snakeTable").style.left = newTablesWidth.toString() + "%";
                    n--
                }
                console.log(n)
                if (n >= 0) {
                    slideRight();
                }
                else {
                    slideLeft();
                }
            }
        }
    }
    class Timer {
        Sleep() {

            const timer = ms => new Promise(res => setTimeout(res, ms))
            async function load() {
                while (gameIsRunning) {
                    await timer(gameSpeed);
                    var snake = new Snake();

                    control.Move(lastPushedButton);
                    if (gameIsRunning == true) {
                        document.getElementById('score').innerHTML = "Score: " + (snakeBody.length - 1).toString();
                    }
                    gameSettings.ShowButtons();
                    snake.SnakeIsDead()
                    mode.Slide();
                    //console.log(snakeBody)
                    console.log(gameIsRunning);
                }
            }

            load();
            document.querySelector('body').addEventListener('keydown', function (e) {
                control.Move(e.key)
                gameSettings.ShowButtons();

            })
        }
    }
    class Main {
        StartTheGame() {
            gameIsRunning = true;
            if (gameIsRunning == true) {
                document.getElementById("startButton").style.visibility = "hidden"
            }
            table.DisplayTheTable();
            snake.DrawTheSnake();
            timer.Sleep();
        }
    }
    var snake = new Snake();
    var field = new Field();
    var table = new Table();
    var control = new Control();
    var timer = new Timer();
    var main = new Main();
    var food = new Food();
    var mode = new Mode();
    var gameSettings = new GameSettings();
    main.StartTheGame();

}



