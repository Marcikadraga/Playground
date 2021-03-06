class FieldPosition {
    constructor(y, x, id) {
        this.y = y;
        this.x = x;
        this.id = id;
    }
}
class FieldSize {
    constructor(fieldSize) {
        this.fieldSize = fieldSize;
    }
}
class Field {

    constructor(FieldPosition, FieldSize) {
        var field = document.createElement('canvas');
        field.id = FieldPosition.id;
        field.style.width = FieldSize.fieldSize + "px";
        field.style.height = FieldSize.fieldSize + "px";
        field.style.left = FieldSize.fieldSize * FieldPosition.x + "px";
        field.style.top = FieldSize.fieldSize * FieldPosition.y + "px";
        field.style.position = "absolute";
        field.style.backgroundColor = "rgb(255,255,255)";
        document.getElementById("drawingTable").appendChild(field);

    }
}
class Table {
    constructor(yTableSize, xTableSize) {
        this.array = [];
        this.yTableSize = yTableSize;
        this.xTableSize = xTableSize;
    }


    DisplayTheTable() {

        var id = 0;
        var fieldsize = 3
        for (var i = 0; i < this.yTableSize; i++) {
            this.array.push([]);
            for (var j = 0; j < this.xTableSize; j++) {
                this.array.push(new Field(new FieldPosition(i, j, id), new FieldSize(fieldsize)))
                id++
            }
        }
        // console.log(this.array);
        var newArray = [];
        var counter = 0;
        for (var i = 0; i < this.yTableSize; i++) {
            newArray.push([]);
            for (var j = 0; j < this.xTableSize; j++) {
                newArray[i].push(counter);
                counter++;
            }
        }

        document.getElementById("drawingTable").style.height = this.yTableSize * fieldsize + "px";
        document.getElementById("drawingTable").style.width = this.xTableSize * fieldsize + "px";


        $.getJSON("Data.json", function (json) {
            var counter = 0;
            var backgroundcolor="rgb(255, 255, 255)"
            const timer = ms => new Promise(res => setTimeout(res, ms))
            async function load() {
                while (true) {
                    await timer(150);
                    var leftLegDownDino = json[3].Data;
                    var rightLegDownDino = json[4].Data;
                    var dino;
                    if (counter % 2 == 0) {
                        dino = leftLegDownDino;
                    } else {
                        dino = rightLegDownDino;
                    }


                    for (var i = 0; i < dino.length; i++) {
                        for (var j = 0; j < dino[0].length; j++) {
                            if(dino[i][j]=="rgb(216, 212, 212)")
                            {
                                document.getElementById(newArray[i][j]).style.backgroundColor = backgroundcolor;
                            }
                            // if(dino[i][j]=="rgb(255, 255, 255)")
                            // {
                            //     document.getElementById(newArray[i][j]).style.backgroundColor = backgroundcolor;
                            // }
                            else
                            {
                                document.getElementById(newArray[i][j]).style.backgroundColor = dino[i][j];
                            }
                            

                        }
                    }
                    counter++;
                }
            }
            load();
        });

    }
    CreateNewTable() {

        var canvasesLength = document.getElementById("drawingTable").getElementsByTagName("canvas").length;
        document.getElementById("drawingTable").style.visibility = "visible";
        for (var i = 0; i < canvasesLength; i++) {
            document.getElementById(i).remove();
        }

    }
}
class Main {
    StartTheProgram() {
        var t = new Table(46, 44);
        t.CreateNewTable();
        t.DisplayTheTable();
    }
}
var m = new Main();
m.StartTheProgram();







