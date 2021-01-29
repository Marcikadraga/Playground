
function StartTTT() {
    var roundCounter = 0
    var theWinner = "";
    var draw = true;
    var player1Color = document.getElementById("player1Color").value;
    var player2Color = document.getElementById("player2Color").value;
    // var player1Sign=document.getElementById("player1Sign").value;
    // var player2Sign=document.getElementById("player2Sign").value;

    class FieldElement {

        constructor(id, y, x) {

            var fieldSize = 220;
            var field = document.createElement('canvas');
            var ctx = field.getContext("2d");
            field.id = id;
            field.style.width = fieldSize + "px";
            field.style.height = fieldSize + "px";
            ctx.fillStyle = "red";
            field.style.left = fieldSize * x + "px";
            field.style.top = fieldSize * y + "px";
            field.style.position = "absolute";
            field.style.backgroundColor = "grey";
            field.style.border = "thick solid white"
            field.onclick = "showId()";
            document.getElementById("TTTTable").appendChild(field);
            field.style.textAlign="center";
            field.innerHTML="asd";
            document.getElementById(id);
            field.onclick = function () { playerClick() }


            function playerClick() {
                if (roundCounter % 2 == 0 && field.style.backgroundColor != player1Color && field.style.backgroundColor != player2Color) {
                    field.style.backgroundColor = player1Color;
                    //field.innerHTML=player1Sign;
                    roundCounter++;
                    whoIsTheWinner();
                }
                if (roundCounter % 2 != 0 && field.style.backgroundColor != player1Color && field.style.backgroundColor != player2Color) {
                    field.style.backgroundColor = player2Color;
                    // field.innerHTML=player2Sign;
                    roundCounter++;
                    whoIsTheWinner();
                }

            }

            function WinnerMessage() {
                ConfirmDialog('New game?');

                function ConfirmDialog(message) {
                    $('<div></div>').appendTo('body')
                        .html(message)
                        .dialog({
                            modal: true,
                            title: theWinner + ' won!',
                            autoOpen: true,
                            width: "200px",
                            resizable: false,
                            buttons: {
                                New: function () {
                                    reDrawTheTabe();
                                    $(this).dialog("close");
                                    roundCounter = 0;
                                },
                                // No: function () {
                                //     $(this).dialog("close");
                                // }
                            },
                            close: function (event, ui) {
                                $(this).remove();
                            }
                        });
                };
            }
            function whosTheWinnerSettings(playersColor) {
                theWinner = playersColor;
                WinnerMessage();
                //draw = false;
            }

            function whoIsTheWinner() {
                var color;

                for (var i = 0; i < 2; i++) {
                    if (i % 2 == 0) {
                        color = player1Color;
                    }
                    if (i % 2 != 0) {
                        color = player2Color;
                    }

                    if (document.getElementById("0").style.backgroundColor == color && document.getElementById("1").style.backgroundColor == color && document.getElementById("2").style.backgroundColor == color) {
                        whosTheWinnerSettings(color);
                    }
                    if (document.getElementById("3").style.backgroundColor == color && document.getElementById("4").style.backgroundColor == color && document.getElementById("5").style.backgroundColor == color) {
                        whosTheWinnerSettings(color);
                    }
                    if (document.getElementById("6").style.backgroundColor == color && document.getElementById("7").style.backgroundColor == color && document.getElementById("8").style.backgroundColor == color) {
                        whosTheWinnerSettings(color);
                    }
                    if (document.getElementById("0").style.backgroundColor == color && document.getElementById("3").style.backgroundColor == color && document.getElementById("6").style.backgroundColor == color) {
                        whosTheWinnerSettings(color);
                    }
                    if (document.getElementById("1").style.backgroundColor == color && document.getElementById("4").style.backgroundColor == color && document.getElementById("7").style.backgroundColor == color) {
                        whosTheWinnerSettings(color);
                    }
                    if (document.getElementById("2").style.backgroundColor == color && document.getElementById("5").style.backgroundColor == color && document.getElementById("8").style.backgroundColor == color) {
                        whosTheWinnerSettings(color);
                    }
                    if (document.getElementById("0").style.backgroundColor == color && document.getElementById("4").style.backgroundColor == color && document.getElementById("8").style.backgroundColor == color) {
                        whosTheWinnerSettings(color);
                    }
                    if (document.getElementById("2").style.backgroundColor == color && document.getElementById("4").style.backgroundColor == color && document.getElementById("6").style.backgroundColor == color) {
                        whosTheWinnerSettings(color);
                    }
                    if (roundCounter == 9 && draw == true) {
                        whosTheWinnerSettings("Draw!");
                    }
                }
            }
        }
    }
    function drawTheTable() {
        var id = 0;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                new FieldElement(id, i, j)
                id++;
            }
        }
    }
    function reDrawTheTabe() {
        for (var i = 0; i < 9; i++) {
            document.getElementById(i).style.backgroundColor = "grey";
        }
    }
    drawTheTable();
    console.log(roundCounter)
}

var t = new StartTTT();