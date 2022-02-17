"use strict";
class Game {
    constructor() {
        this.currentlyPlaying = false;
        this.rounds = 30;
        this.score = 0;
        this.speed = 2000;
        this.limit = 9;
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
        console.log(audioHTMLObject);
        var audio = new Audio(audioHTMLObject);
        audio.play();
    }
    pauser() {
        console.log("Pausing");
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
    setNumpadFunctinoality(numpad) {
        var number = document.getElementById(this.numpadName);
        number.addEventListener("click", function () {
            console.log(numpad.inputNumber);
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
        var intervalID1 = setInterval(function () {
            if (curRounds == game.rounds)
                window.clearInterval(intervalID1);
            if (curRounds % 2 == 0) {
                curNumber = Math.floor(Math.random() * (game.limit - numberList.get(1) + 1)) + 0;
                numberList.set(0, curNumber);
                console.log(numberList.get(0));
            }
            else {
                curNumber = Math.floor(Math.random() * (game.limit - numberList.get(0) + 1)) + 0;
                numberList.set(1, curNumber);
                console.log(numberList.get(1));
            }
            game.playAudio(numberAndFilenameMap.get(curNumber));
            console.log(`Rounds: ${curRounds} Answer: ${numberList.get(0) + numberList.get(1)}`);
            curRounds += 1;
        }, game.speed);
        // setTimeout(() => {
        //     var intervalID2 = setInterval(function(){
        //         if(curRounds == game.rounds / 2){
        //             window.clearInterval(intervalID2);
        //         }
        //         numberList.set(1, Math.floor(Math.random() * (game.limit - 0 + 1)) + 0);
        //         game.playAudio(numberAndFilenameMap.get(numberList.get(1)));
        //     }, game.speed * 2);
        // }, game.speed);
    });
    // Set the numpad to its functionality
    var numpadArrayName = ["button_zero", "button_one", "button_two", "button_three", "button_four", "button_five", "button_six", "button_seven", "button_eight", "button_nine"];
    for (var i = 0; i < numpadArrayName.length; i++) {
        var numpad = new Numpad(numpadArrayName[i], i);
        numpad.setNumpadFunctinoality(numpad);
    }
    const numberAndFilenameMap = new Map();
    var filenameSFX = ["sfx_0", "sfx_1", "sfx_2", "sfx_3", "sfx_4", "sfx_5", "sfx_6", "sfx_7", "sfx_8", "sfx_9"];
    var number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (var i = 0; i < filenameSFX.length; i++) {
        numberAndFilenameMap.set(number[i], "/static/sfx/" + filenameSFX[i] + ".wav");
    }
}
main();
