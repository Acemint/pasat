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
}
class UserInput {
    constructor() {
        this.numberList = new Map();
        this.currentNumber = 0;
        this.displayNumber = document.getElementById("display_number");
        this.numberList.set(0, 0);
        this.numberList.set(1, 0);
    }
    activateNumpad(arrayNumpad, changeTo) {
        for (let i = 0; i < arrayNumpad.length; i++) {
            arrayNumpad[i].checkAnswerToggle(changeTo);
        }
    }
    changeNumber(numpadNum) {
        this.currentNumber = numpadNum;
        this.displayNumber.textContent = numpadNum.toString();
    }
    clearContent() {
        this.currentNumber = 0;
        this.displayNumber.textContent = "-";
    }
    changeColor(correct) {
        if (correct == 1) {
            this.displayNumber.style.color = "green";
        }
        else {
            this.displayNumber.style.color = "red";
        }
    }
    clearColor() {
        this.displayNumber.style.color = "black";
    }
    checkAnswer() {
        return this.currentNumber == this.numberList.get(0) + this.numberList.get(1) ? 1 : 0;
    }
    getNumber(num) {
        return this.numberList.get(num);
    }
}
class Numpad {
    constructor(numpadName, inputNumber) {
        this.numpadName = numpadName;
        this.inputNumber = inputNumber;
        this.answer = false;
    }
    setNumpadFunctinoality(numpad, userInput, game, numpadList) {
        var number = document.getElementById(this.numpadName);
        number.addEventListener("click", function () {
            userInput.changeNumber(numpad.inputNumber);
            if (numpad.answer == true) {
                var answer = userInput.checkAnswer();
                userInput.changeColor(answer);
                game.correctAnswer += answer;
                if (answer == 1) {
                    console.log("Correct");
                    userInput.activateNumpad(numpadList, false);
                }
            }
        });
    }
    checkAnswerToggle(changeTo) {
        this.answer = changeTo;
    }
}
function main() {
    // Start the game
    var game = new Game();
    var startButton = document.getElementById("button_play");
    startButton.addEventListener("click", function () {
        game.toggle();
        var curRounds = 0;
        var tempNumber = 0;
        var min = 1;
        var max = 0;
        var intervalID1 = setInterval(function () {
            userInput.currentNumber = 0;
            userInput.clearContent();
            userInput.clearColor();
            userInput.activateNumpad(numpadList, false);
            if (curRounds % 2 == 0) {
                max = game.limit - 1 - userInput.getNumber(1);
                tempNumber = Math.floor(Math.random() * (max - min + 1)) + min;
                userInput.numberList.set(0, tempNumber);
            }
            else {
                max = game.limit - 1 - userInput.getNumber(0);
                tempNumber = Math.floor(Math.random() * (max - min + 1)) + min;
                userInput.numberList.set(1, tempNumber);
            }
            game.playAudio(numberAndFilenameMap.get(tempNumber));
            if (curRounds != 0) {
                userInput.activateNumpad(numpadList, true);
            }
            console.log(`Answer: ${userInput.numberList.get(0) + userInput.numberList.get(1)} Current Score ${game.correctAnswer} User Input ${userInput.currentNumber}`);
            setTimeout(function () {
                if (curRounds == game.rounds + 1) {
                    window.clearInterval(intervalID1);
                    console.log(`Final Score: ${game.correctAnswer}`);
                }
            }, game.speed - 200);
            curRounds += 1;
        }, game.speed);
    });
    // Set the numpad to its functionality
    var userInput = new UserInput();
    var numpadList = Array();
    var numpadArrayName = ["button_zero", "button_one", "button_two", "button_three", "button_four", "button_five", "button_six", "button_seven", "button_eight", "button_nine"];
    for (var i = 0; i < numpadArrayName.length; i++) {
        var numpad = new Numpad(numpadArrayName[i], i);
        numpadList.push(numpad);
        numpad.setNumpadFunctinoality(numpad, userInput, game, numpadList);
    }
    const numberAndFilenameMap = new Map();
    var filenameSFX = ["sfx_1", "sfx_2", "sfx_3", "sfx_4", "sfx_5", "sfx_6", "sfx_7", "sfx_8", "sfx_9"];
    var number = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (var i = 0; i < filenameSFX.length; i++) {
        numberAndFilenameMap.set(number[i], "../../sfx/" + filenameSFX[i] + ".wav");
    }
}
main();
