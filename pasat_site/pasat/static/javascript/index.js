var Game = /** @class */ (function () {
    function Game() {
        this.currentlyPlaying = false;
    }
    Game.prototype.toggle = function () {
        if (this.currentlyPlaying == false) {
            this.currentlyPlaying = true;
        }
        else {
            this.currentlyPlaying = false;
        }
    };
    return Game;
}());
var UserInput = /** @class */ (function () {
    function UserInput() {
        this.currentNumber = 0;
    }
    return UserInput;
}());
var Numpad = /** @class */ (function () {
    function Numpad(numpadName, inputNumber) {
        this.numpadName = numpadName;
        this.inputNumber = inputNumber;
    }
    Numpad.prototype.setNumpadFunctinoality = function (numpad) {
        var number = document.getElementById(this.numpadName);
        number.addEventListener("click", function () {
            console.log(numpad.inputNumber);
        });
    };
    return Numpad;
}());
function main() {
    var game = new Game();
    var startButton = document.getElementById("button_play");
    startButton.addEventListener("click", function () {
        game.toggle();
    });
    var numpadArrayName = ["button_zero", "button_one", "button_two", "button_three", "button_four", "button_five", "button_six", "button_seven", "button_eight", "button_nine"];
    var numpadArray = [];
    for (var i = 0; i < numpadArrayName.length; i++) {
        var numpad = new Numpad(numpadArrayName[i], i);
        numpad.setNumpadFunctinoality(numpad);
        numpadArray.push(numpad);
        console.log("Done");
    }
    // let userInput = document.getElementById("user-input");
}
console.log("TEST");
main();
