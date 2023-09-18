var stateOfGuess = false;
var i = 4;
var comparation = "";
var submitNumber;
var randomNumber = Math.floor(Math.random()*100+1);

//Compare the guesses between submitted number and the number player guess
function compareGuess(){
        submitNumber = document.getElementById("guessField").value;
        submitNumber = Number(submitNumber);
        if (submitNumber > randomNumber){
            comparation = `${comparation} ${submitNumber}↓`}
   else if (submitNumber < randomNumber){
            comparation = `${comparation} ${submitNumber}↑`}
        else{
            comparation = `You won! The number is ${randomNumber}`;
            stateOfGuess = true;
            document.getElementById("numberOfTries").innerHTML = ``}  
        i-=1
        document.getElementById("lastGuess").innerHTML = comparation;
}

//Number of guesses left
function workflow(){
    if (stateOfGuess == false && i > -1){
        switch(i){
    case 0: document.getElementById("numberOfTries").innerHTML = `Game over! The number is ${randomNumber}`;
            compareGuess();
            break;
    case 1: document.getElementById("numberOfTries").innerHTML = `You have 1 guess left`;
            compareGuess();
            break;
    default: document.getElementById("numberOfTries").innerHTML = `You have ${i} guesses left`;
            compareGuess();
        }}
    else {};
    }

//Full reset
function reset(){
    stateOfGuess = false;
    i = 4;
    comparation = "";
    submitNumber;
    randomNumber = Math.floor(Math.random()*100+1);
    console.log(randomNumber);
    document.getElementById("numberOfTries").innerHTML = ``;
    document.getElementById("lastGuess").innerHTML = ``;
}

//Press ENTER to submit
document.addEventListener("DOMContentLoaded", function(){
    var guessField = document.getElementById("guessField");
    var submitButton = document.getElementById("submitButton");
    guessField.addEventListener("keydown", function(event){
        if (event.key === "Enter"){
            event.preventDefault();
            submitButton.click();
        }
    })
})

//Submit guess
document.getElementById("submitButton").onclick = function(){
    workflow();
}

//Reset
document.getElementById("reset").onclick = function(){
    reset();
}

//cheat
console.log(randomNumber);
