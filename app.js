/*
Game Function:
-Player must guess a number between a min and max
-Player gets a certain amount of guesses
-Notify player of guesses remaining
-Notify the player of the correct answer if loose
- Let player choose to play again
*/


// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessbtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown',function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
} )

//Listen for guess
guessbtn.addEventListener('click',function(){
    let guess = parseInt(guessInput.value);

    //Validate
    if( isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    } 
    //Check if won
    else if(guess === winningNum){
        //Game over - won
        gameOver(true,`${winningNum} is correct, YOU WIN!`)
    }else{
        //Wrong Number
        guessesLeft -= 1;

        if(guessesLeft === 0){
            //Game Over - Lost
            gameOver(false,`Game Over ,you lost.The correct number was ${winningNum}`)
        }else{
            //Game continues - answer Wrong
            
            //Change the border
            guessInput.style.borderColor = 'red';
            //Clear Input
            guessInput.value = '';
            //Tell user its wrong number 
            setMessage(`${guess} is not correct , ${guessesLeft} guesses Left`, 'red')
        }
    }
})

//Game Over
function gameOver(won,msg){
    let color;
    won === true ? color = 'green': color = 'red'

    //Disable Input
    guessInput.disabled = true;

    //Change the border
    guessInput.style.borderColor = color;

    //Set text color
    message.style.color = color;

    //Set message
    setMessage(msg);

    //Play again
    guessbtn.value = 'Play Again';
    guessbtn.className += 'play-again'
}

//Get Winning Number
function getRandomNum(min , max){
    return Math.floor(Math.random()*(max-min+1)+min);
}



//Set Message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}


