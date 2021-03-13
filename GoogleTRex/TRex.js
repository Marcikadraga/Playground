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
        // field.onclick = function () { this.style.backgroundColor = document.getElementById("statusCanvas1").style.backgroundColor }
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
        var fieldsize = 15
        for (var i = 0; i < this.yTableSize; i++) {
            this.array.push([]);
            for (var j = 0; j < this.xTableSize; j++) {
                this.array.push(new Field(new FieldPosition(i, j, id), new FieldSize(fieldsize)))
                id++
            }
        }
        var newArray = [];
        var counter = 0;
        for (var i = 0; i < this.yTableSize; i++) {
            newArray.push([]);
            for (var j = 0; j < this.xTableSize; j++) {
                newArray[i].push(counter);

                counter++;
                if (i % 2 == 0 && j % 2 == 0 || i % 2 != 0 && j % 2 != 0) {
                    document.getElementById(newArray[i][j]).style.background = "rgb(216, 212, 212)";
                }
            }
        }
        //set the drawTable's border's size
        document.getElementById("drawingTable").style.height = this.yTableSize * fieldsize + "px";
        document.getElementById("drawingTable").style.width = this.xTableSize * fieldsize + "px";
        var ctx = document.createElement('canvas').getContext('2d');
        var color;
        var colorArray = [];

        for (var i = 0; i < this.yTableSize; i++) {
            colorArray.push([]);
            for (var j = 0; j < this.xTableSize; j++) {
                // //https://stackoverflow.com/questions/5999209/how-to-get-the-background-color-code-of-an-element-in-hex
                color = document.getElementById(newArray[i][j]).style.backgroundColor;
                ctx.strokeStyle = color;
                var hexColor = ctx.strokeStyle;
                colorArray[i].push(hexColor);
            }
        }
    }
    CreateNewTable() {
        
            var canvasesLength = document.getElementById("drawingTable").getElementsByTagName("canvas").length;
            document.getElementById("drawingTable").style.visibility = "visible";
            for (var i = 0; i < canvasesLength; i++) {
                document.getElementById(i).remove();
            }

            
            t.DisplayTheTable();
        
    }
}
var t = new Table();
t.CreateNewTable();
