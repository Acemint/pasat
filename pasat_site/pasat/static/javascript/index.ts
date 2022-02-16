class Game {
    currentlyPlaying: boolean;

    constructor(){
        this.currentlyPlaying = false;
    }

    toggle(): void{
        if(this.currentlyPlaying == false){
            this.currentlyPlaying = true;
        }
        else{
            this.currentlyPlaying = false;
        }
    }
}

class UserInput {
    currentNumber: number;

    constructor(){
        this.currentNumber = 0;
    }
}

class Numpad {
    numpadName: string;
    inputNumber: number;
    
    constructor(numpadName: string, inputNumber: number){
        this.numpadName = numpadName;
        this.inputNumber = inputNumber;
    }

    setNumpadFunctinoality(numpad: Numpad){
        let number = document.getElementById(this.numpadName);
        number.addEventListener("click", function(){
            console.log(numpad.inputNumber);
        }); 
    }


}

function main(){
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