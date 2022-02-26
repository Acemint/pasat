class Game {
    currentlyPlaying: boolean;
    rounds: number;
    score: number;
    speed: number;
    limit: number;
    playButton: HTMLElement;
    correctAnswer: number;
    gameCurrentRounds: HTMLElement;
    resultModal: any;
    resultText: any;

    constructor(){
        this.currentlyPlaying = false;
        this.rounds = 30;
        this.score = 0;
        this.speed = 2500;
        this.limit = 9;
        this.correctAnswer = 0;
        this.playButton = document.getElementById("button_play")!;
        this.gameCurrentRounds = document.getElementById("countdown_rounds")!;
        this.resultModal = document.getElementById("resultShower")!;
        this.resultText = document.getElementById("resultContent");
    }

    changeGameSettings(rounds: number, speed: number, limit: number){
        this.rounds = rounds;
        this.speed = speed;
        this.limit = limit;
    }

    toggle(toggleTo: boolean){
        this.currentlyPlaying = toggleTo;
        if(!toggleTo){
            this.playButton.innerText = "Play";
        }
        else{
            this.playButton.innerText = "Stop";
        }
    }

    playAudio(audioHTMLObject: string){
        console.log(audioHTMLObject);
        var audio = new Audio(audioHTMLObject);
        audio.play();
    }

    decreaseRounds(round: number){
        this.gameCurrentRounds.innerText = (round).toString();
    }
    
    resultsShow(){
        this.resultModal.click();
        this.resultText.innerText = `Correct inputs: ${this.correctAnswer}\nWrong inputs: ${this.rounds - this.correctAnswer}`;
    }
    
    resetScore(){
        this.score = 0;
        this.correctAnswer = 0;
    }
}

class UserInput {
    currentNumber: number;
    displayNumber: HTMLElement;
    numberList = new Map();
    
        
    constructor(){
        this.currentNumber = 0;
        this.displayNumber = document.getElementById("display-num")!;
        this.numberList.set(0, 0);
        this.numberList.set(1, 0);
    }

    activateNumpad(arrayNumpad: Array<Numpad>, changeTo: boolean){
        for(let i = 0; i < arrayNumpad.length; i++){
            arrayNumpad[i].checkAnswerToggle(changeTo);
        }
    }

    changeNumber(numpadNum: number){
        this.currentNumber = parseInt(this.currentNumber.toString() + numpadNum.toString());
        this.displayNumber.textContent = this.currentNumber.toString();
    }

    removeDigit(){
        var temp = this.currentNumber.toString();
        if(temp.length != 1){
            temp = temp.slice(0, -1);
        }
        else{
            temp = "0";
        }
    
        this.currentNumber = parseInt(temp);
        this.displayNumber.textContent = this.currentNumber.toString();
    }

    clearContent(){
        this.currentNumber = 0;
        this.displayNumber.textContent = "-";
    }

    neutralizeColor(){
        this.displayNumber.style.boxShadow = "0 2px 4px 0 rgba(0,0,0,.2)";
    }

    changeColor(correct: number){
        if(correct == 1){
            this.displayNumber.style.boxShadow = "0px 0px 8px 0px #198754";
        }
    }

    clearColor(){
        this.displayNumber.style.boxShadow = "0 2px 4px 0 rgba(0,0,0,.2)";
    }

    checkAnswer(){
        return this.currentNumber == this.numberList.get(0) + this.numberList.get(1) ? 1 : 0;
    }

    getNumber(num: number){
        return this.numberList.get(num);
    }
}

class Numpad {
    numpadName: string;
    inputNumber: number;
    answer: boolean;

    constructor(numpadName: string, inputNumber: number){
        this.numpadName = numpadName;
        this.inputNumber = inputNumber;
        this.answer = false;
    }

    setNumpadFunctinoality(numpad: Numpad, userInput: UserInput, game: Game, numpadList: Array<Numpad>){
        var number = document.getElementById(this.numpadName)!;
        if(numpad.numpadName == "button_delete"){
            number.addEventListener("click", function(){
                userInput.removeDigit();
            })
        }
        else{
            number.addEventListener("click", function(){
                userInput.changeNumber(numpad.inputNumber);
                if(numpad.answer == true){
                    var answer = userInput.checkAnswer();
                    userInput.changeColor(answer);
                    game.correctAnswer += answer;
                    if(answer == 1){
                        console.log("Correct");
                        userInput.activateNumpad(numpadList, false);
                    }
                }
            }); 
        }
    }

    checkAnswerToggle(changeTo: boolean){
        this.answer = changeTo;
    }
}

// Start the game
var game = new Game();
var difficulty = <HTMLInputElement>document.getElementById("inputGroupSelect01")!;
var difficultyChanger = document.getElementById("difficulty_changer")!;
difficultyChanger.addEventListener("click", function(){
    var difficultyValue = parseInt(difficulty.value)
    if(difficultyValue == 1){
        game.changeGameSettings(30, 2500, 9);
    }
    else if(difficultyValue == 2){    
        game.changeGameSettings(30, 2500, 18);
    }
    console.log(difficulty.value);
})


var startButton = document.getElementById("button_play")!;
var intervalTimer: any;
startButton.addEventListener("click", function () {
    game.resetScore();
    if(game.currentlyPlaying == true){
        window.clearInterval(intervalTimer);
        game.toggle(false);
        game.resetScore();
    }
    else{
        game.toggle(true);
    
        var curRounds = 0;
        var tempNumber = 0;
        var min = 1;
        var max = 0;
        
        var expected = Date.now() + game.speed;
        intervalTimer = setTimeout(step, game.speed);
        function step() {
            var dt = Date.now() - expected; // the drift (positive for overshooting)
    
            //call a round
            userInput.currentNumber = 0;
            
            userInput.clearContent();
            userInput.clearColor();
            userInput.activateNumpad(numpadList, false);
            
            if(curRounds % 2 == 0){
                max = game.limit - 1 - userInput.getNumber(1);
                if(max > 9){
                    max = 9;
                }
                tempNumber = Math.floor(Math.random() * (max - min + 1)) + min;
                userInput.numberList.set(0, tempNumber);
            }
            else{
                max = game.limit - 1 - userInput.getNumber(0);
                if(max > 9){
                    max = 9;
                }
                tempNumber = Math.floor(Math.random() * (max - min + 1)) + min;
                userInput.numberList.set(1, tempNumber);
            }
            

            // Enable numpad to set answer
            if(curRounds != 0){
                userInput.activateNumpad(numpadList, true);
            }
            
            if(curRounds == game.rounds + 1){
                console.log(`Final Score: ${game.correctAnswer}`);
                userInput.neutralizeColor();
                game.resultsShow();
            }
            else{
                intervalTimer = setTimeout(step, Math.max(0, game.speed - dt));
                // Play audio
                console.log(`Answer: ${userInput.numberList.get(0) + userInput.numberList.get(1)} Current Score ${game.correctAnswer} User Input ${userInput.currentNumber}` );
                // console.log(tempNumber);
                game.playAudio(numberAndFilenameMap.get(tempNumber));
                game.decreaseRounds(game.rounds - curRounds);
                curRounds++;
                expected += game.speed;
            }            
        }
        
    }
});

// Set the numpad to its functionality
var userInput = new UserInput(); 
var numpadList = Array<Numpad>();
var numpadArrayName = ["button_zero", "button_one", "button_two", "button_three", "button_four", "button_five", "button_six", "button_seven", "button_eight", "button_nine"];
for (var i = 0; i < numpadArrayName.length; i++) {
    var numpad = new Numpad(numpadArrayName[i], i);
    numpad.setNumpadFunctinoality(numpad, userInput, game, numpadList);
    numpadList.push(numpad);
}


var numpad = new Numpad("button_delete", -1);
numpad.setNumpadFunctinoality(numpad, userInput, game, numpadList);
numpadList.push(numpad);


const numberAndFilenameMap = new Map();
var filenameSFX = ["sfx_1", "sfx_2", "sfx_3", "sfx_4", "sfx_5", "sfx_6", "sfx_7", "sfx_8", "sfx_9"];
var number = [1, 2, 3, 4, 5, 6, 7, 8, 9];
for(var i = 0; i < filenameSFX.length; i++){
    numberAndFilenameMap.set(number[i], "../../static/sfx/" + filenameSFX[i] + ".wav");
}