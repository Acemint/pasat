"use strict";
class Game {
    constructor() {
        this.currentlyPlaying = false;
        this.rounds = 5;
        this.score = 0;
        this.speed = 3000;
        this.limit = 9;
        this.correctAnswer = 0;
    }
    changeGameSettings(rounds, speed, limit) {
        this.rounds = rounds;
        this.speed = speed;
        this.limit = limit;
    }
    toggle() {
        if (this.currentlyPlaying == false) {
            document.getElementById("button_play").textContent = "Pause";
            this.currentlyPlaying = true;
        }
        else {
            document.getElementById("button_play").textContent = "Play";
            this.currentlyPlaying = false;
        }
    }
    playAudio(audioHTMLObject) {
        var audio = new Audio(audioHTMLObject);
        audio.play();
    }
    checkAnswer(userInput, correctAnswer) {
        if (userInput.currentNumber == correctAnswer) {
            return 1;
        }
        else {
            return 0;
        }
    }
}
class UserInput {
    constructor() {
        this.currentNumber = 0;
    }
}
class Numpad {
    constructor(numpadName, inputNumber) {
        this.numpadName = numpadName;
        this.inputNumber = inputNumber;
    }
    setNumpadFunctinoality(numpad, userInput) {
        var number = document.getElementById(this.numpadName);
        number.addEventListener("click", function () {
            userInput.currentNumber = numpad.inputNumber;
        });
    }
}
function main() {
    // Start the game
    var game = new Game();
    var startButton = document.getElementById("button_play");
    startButton.addEventListener("click", function () {
        game.toggle();
        var numberList = new Map();
        numberList.set(0, 0);
        numberList.set(1, 0);
        var curRounds = 0;
        var curNumber = 0;
        var min = 1;
        var max = 0;
        var intervalID1 = setInterval(function () {
            userInput.currentNumber = 0;
            if (curRounds % 2 == 0) {
                max = game.limit - 1 - numberList.get(1);
                curNumber = Math.floor(Math.random() * (max - min + 1)) + min;
                numberList.set(0, curNumber);
            }
            else {
                max = game.limit - 1 - numberList.get(0);
                curNumber = Math.floor(Math.random() * (max - min + 1)) + min;
                numberList.set(1, curNumber);
            }
            game.playAudio(numberAndFilenameMap.get(curNumber));
            setTimeout(() => {
                if (curRounds > 1) {
                    var ans = game.checkAnswer(userInput, numberList.get(0) + numberList.get(1));
                    if (ans == 1) {
                        game.correctAnswer += ans;
                        console.log("Correct");
                    }
                }
                ;
                if (curRounds == game.rounds + 1) {
                    window.clearInterval(intervalID1);
                    console.log(`Final Score: ${game.correctAnswer}`);
                }
            }, game.speed - 200);
            console.log(`Answer: ${numberList.get(0) + numberList.get(1)} Current Score ${game.correctAnswer} User Input ${userInput.currentNumber}`);
            curRounds += 1;
        }, game.speed);
    });
    // Set the numpad to its functionality
    var userInput = new UserInput();
    var numpadArrayName = ["button_zero", "button_one", "button_two", "button_three", "button_four", "button_five", "button_six", "button_seven", "button_eight", "button_nine"];
    for (var i = 0; i < numpadArrayName.length; i++) {
        var numpad = new Numpad(numpadArrayName[i], i);
        numpad.setNumpadFunctinoality(numpad, userInput);
    }
    const numberAndFilenameMap = new Map();
    var filenameSFX = ["sfx_1", "sfx_2", "sfx_3", "sfx_4", "sfx_5", "sfx_6", "sfx_7", "sfx_8", "sfx_9"];
    var number = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (var i = 0; i < filenameSFX.length; i++) {
        numberAndFilenameMap.set(number[i], "/static/sfx/" + filenameSFX[i] + ".wav");
    }
}
main();
