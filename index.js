console.log(`please be happy now please`);
var stateOfGuess = false;
var i = 4;
var comparation = "";
var submitNumber;
var randomNumber = Math.floor(Math.random()*100+1);
function compareGuess(){
        submitNumber = document.getElementById("guessField").value;
        submitNumber = Number(submitNumber);
        if (submitNumber > randomNumber){
            comparation = `${comparation} ${submitNumber}↓`}
   else if (submitNumber < randomNumber){
            comparation = `${comparation} ${submitNumber}↑`}
        else{
            comparation = `You won! The number is ${randomNumber}`;
            stateOfGuess = true;}  
        i-=1
        document.getElementById("lastGuess").innerHTML = comparation;
}
    
            


    document.getElementById("submitButton").onclick = function(){
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
