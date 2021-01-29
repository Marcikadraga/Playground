function StartSnake() {

    var array = [];
    var snakeBody = [[1, 0]];
    var snakeHeadPosition = snakeBody[snakeBody.length - 1];
    var yTableSize = 23;
    var xTableSize = 23;
    var lastPushedButton = 'ArrowRight'
    var snakeSize = 30;

    var counter = snakeBody.length - 1;
    var yfoodPosition = Math.floor(Math.random() * yTableSize);
    var xfoodPosition = Math.floor(Math.random() * xTableSize);
    var foodPosition = [yfoodPosition, xfoodPosition]
    var foodColor = 'red';
    var gameIsRunning = true;
    var gameSpeed = document.getElementById('speed').value;

    var n = 2;

    var color = 'blue';

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
                    document.getElementById(i).style.backgroundColor = "grey";
                }
                else {
                    document.getElementById(i).style.backgroundColor = "white";
                }
            }
        }
    }
    class Snake {

        DrawTheSnake() {
            for (var i = 0; i < snakeBody.length - 1; i++) {
                document.getElementById(array[snakeBody[i][0]][snakeBody[i][1]].getID).style.backgroundColor = color;
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
                            gameIsRunning = false;
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
            snakeBody[snakeBody.length - 1].push(snakeBody[snakeBody.length - 2][0] + yDirection);
            snakeBody[snakeBody.length - 1].push(snakeBody[snakeBody.length - 2][1] + xDirection);
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
    class Timer {
        Sleep() {
            const timer = ms => new Promise(res => setTimeout(res, ms))
            async function load() {
                while (gameIsRunning) {
                    await timer(gameSpeed);
                    var snake = new Snake();

                    control.Move(lastPushedButton);
                    document.getElementById('score').innerHTML = "Score: " + (snakeBody.length - 1).toString();
                    snake.SnakeIsDead()


                    
                    if (document.getElementById('mode').value == "insane") {
                        color = 'black'
                        function slideLeft() {
                            var tablesWidth = document.getElementById("snakeTable").style.left;
                            var newTablesWidth = tablesWidth.substring(0, tablesWidth.length - 1);
                            newTablesWidth = newTablesWidth - 0.1;
                            document.getElementById("snakeTable").style.left = newTablesWidth.toString() + "%";
                            n--
                            if (n == -4) {
                                n = 2
                            }
                        }

                        function slideRight() {
                            var tablesWidth = document.getElementById("snakeTable").style.left;
                            var newTablesWidth = tablesWidth.substring(0, tablesWidth.length - 1);
                            newTablesWidth = parseFloat(newTablesWidth) + 0.1;
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
            load();
            document.querySelector('body').addEventListener('keydown', function (e) {
                control.Move(e.key)


            })
        }
    }
    class Main {

        StartTheGame() {
            timer.Sleep();
            table.DisplayTheTable();
            snake.DrawTheSnake();
        }
    }
    var snake = new Snake();
    var field = new Field();
    var table = new Table();
    var control = new Control();
    var timer = new Timer();
    var main = new Main();
    var food = new Food();
    main.StartTheGame();

}



