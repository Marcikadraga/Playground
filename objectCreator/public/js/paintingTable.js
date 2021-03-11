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
        field.onclick = function () { this.style.backgroundColor = document.getElementById("statusCanvas1").style.backgroundColor }
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
        var fieldsize = 20
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
        document.getElementById("drawingTable").style.height = this.yTableSize * 20 + "px";
        document.getElementById("drawingTable").style.width = this.xTableSize * 20 + "px";
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

        document.getElementById('data').value = JSON.stringify(colorArray);
        console.log(colorArray);


    }
}
class ColorField {
    get colors() {
        return [
            ["#FFFFFF", "#D8D4D4", "#C4C1C1", "#9F9B9B", "#747272"],
            ["#627070", "#495353", "#353D3D", "#272E2E", "#0B0D0D"],
            ["#EA2828", "#C90011", "#A80000", "#880000", "#6A0000"],
            ["#E68CE7", "#BD66BF", "#964299", "#701B74", "#4B0052"],
            ["#8C8CE7", "#6A6DC4", "#484FA2", "#233381", "#001A62"],
            ["#A5FFF3", "#70C9BE", "#3A968C", "#00655D", "#003831"],
            ["#7ED19A", "#54A672", "#287D4C", "#005629", "#003105"],
            ["#F0E897", "#BCB567", "#8A853A", "#5A580B", "#302F00"],
            ["#FFD300", "#CAA400", "#967800", "#674F00", "#432700"],
            ["#FF6400", "#D64100", "#AE1900", "#890000", "#670000"]
        ];
    }
    constructor(i, j, id) {

        var colorField = document.createElement('canvas');
        colorField.id = id;
        colorField.style.position = "relative";
        colorField.style.width = "40px"
        colorField.style.height = "40px"
        colorField.style.border = "1px solid white";
        colorField.style.left = "5px";
        colorField.style.top = "5px";
        colorField.style.backgroundColor = this.colors[i][j]

        document.getElementById("colorPalette").appendChild(colorField);
        colorField.onclick = function () {
            for (var i = 5000; i < 5045; i++) {
                document.getElementById(i).style.borderColor = "white";
            }

            this.style.border = "1px solid black";
            var currentColor = this.style.backgroundColor;
            document.getElementById("statusCanvas1").style.backgroundColor = currentColor;
        }
    }
}
// class Rubber{
//     constructor()
//     {
//         document.getElementById("rubber").onclick = function () {
//             for (var i = 5000; i < 5045; i++) {
//                 document.getElementById(i).style.borderColor = "white";
//             }
//             this.style.border = "1px solid black";
//             document.getElementById("statusCanvas1").style.backgroundColor = "white";
//         }
//     }
// }
class ColorTable {
    DisplayTheColorTable() {
        var id = 5000;
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 5; j++) {
                var c = new ColorField(i, j, id);
                id++;
            }
        }
    }
}


class Options {
    SetTheRangeSlider() {
        var slider0 = document.getElementById("myRange0");
        var output0 = document.getElementById("demo0");
        output0.innerHTML = slider0.value;
        slider0.oninput = function () {
            output0.innerHTML = this.value;
        }

        var slider1 = document.getElementById("myRange1");
        var output1 = document.getElementById("demo1");
        output1.innerHTML = slider1.value;
        slider1.oninput = function () {
            output1.innerHTML = this.value;
        }

        document.getElementById("save").disabled = true;
        this.CreateNewTable();
        this.DisplayTheSaveTable();
        this.CloseTheSaveTable();
        this.DisplayTheLoadTable();

    }

    CreateNewTable() {
        document.getElementById("create").onclick = function () {
            var canvasesLength = document.getElementById("drawingTable").getElementsByTagName("canvas").length;
            document.getElementById("drawingTable").style.visibility = "visible";
            for (var i = 0; i < canvasesLength; i++) {
                document.getElementById(i).remove();
            }
            document.getElementById("save").disabled = false;

            var x = document.getElementById("demo0").innerHTML;
            var y = document.getElementById("demo1").innerHTML;
            var t = new Table(y, x);
            t.DisplayTheTable();
        };
    }
    DisplayTheSaveTable() {
        document.getElementById("save").onclick = function () {
            document.getElementById("saveTable").style.visibility = "visible";
            document.getElementById("drawingTable").style.visibility = "hidden";
            document.getElementById("create").disabled = true;
            document.getElementById("save").disabled = true;
        }
    }
    CloseTheSaveTable() {
        document.getElementById("cancel").onclick = function () {
            document.getElementById("saveTable").style.visibility = "hidden";
            document.getElementById("saveTable").style.disabled = "true";
            document.getElementById("drawingTable").style.visibility = "visible";
            document.getElementById("create").disabled = false;
            document.getElementById("save").disabled = true;

        }
    }
    DisplayTheLoadTable() {
        document.getElementById("load").onclick = function () {
            document.getElementById("loadTable").style.visibility = "visible";

            var ga;
            $.getJSON("/js/Data.json", function (json) {
                console.log(Object.keys(json).length);
                ga = Object.keys(json).length;

                for (var i = 0; i < ga; i++) {
                    var dataWindow = document.createElement('li');
                    dataWindow.style.position = "relative";
                    dataWindow.style.color = "white";
                    dataWindow.id = 7000 + i;
                    document.getElementById("LoadTableUl").appendChild(dataWindow);
                    dataWindow.style.backgroundColor = "transparent";
                    dataWindow.innerHTML = json[i].Name; var button = document.createElement('button');
                    document.getElementById(7000 + i).appendChild(button);
                    button.style.position = "relative";
                    button.id = 8000 + i;
                    button.style.float = "right";
                    button.style.width = "50px";
                    button.style.height = "30px";
                    button.innerHTML = "open";
                    button.style.display = "inline";
                    // button.onclick = function () {console.log(this.id)
                    button.onclick = function () {
                        var ga = this.id;
                        $.getJSON("/js/Data.json", function (json) {
                            // console.log(json[ga-8000].Name)
                            var canvasesLength = document.getElementById("drawingTable").getElementsByTagName("canvas").length;
                            document.getElementById("drawingTable").style.visibility = "visible";
                            for (var i = 0; i < canvasesLength; i++) {
                                document.getElementById(i).remove();
                            }
                            document.getElementById("save").disabled = false;



                            var x = json[ga-8000].Data.length
                            var y = json[ga-8000].Data[0].length
                            var t = new Table(y, x);
                            document.getElementById("loadTable").style.visibility="hidden";
                            t.DisplayTheTable();
                            
                        });

                    }

                }
            });
        }
    }
    // LoadData() {

    // }
}

class Main {
    startTheProgram() {
        var colorTable = new ColorTable();
        colorTable.DisplayTheColorTable();
        // var rubber= new Rubber();
        var options = new Options();
        options.SetTheRangeSlider();
    }
}
var m = new Main();
m.startTheProgram();










