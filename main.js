
const keys =document.querySelectorAll('.keyboard-row button');
const gameBoard = document.getElementById("board");
const guessWords=[[]];
let word = "dairy";
let availableSpace=1;
let guessWordCount=0;
let del=true;


function createSquare(){

    

    for ( let i=0 ; i<30 ; i++){

        let square = document.createElement('div');

        square.classList.add('square');
        square.setAttribute('id',i+1);
        gameBoard.appendChild(square);

    }

}

function getCurrentWordArr(){
    const numberOfGuessesdWords= guessWords.length;
    return guessWords[numberOfGuessesdWords-1];
}

function updateGuessedWords(letter){
    const currentWordArr = getCurrentWordArr();
    if (currentWordArr && currentWordArr.length<5){
        currentWordArr.push(letter);

        const availableSpaceEl= document.getElementById(String(availableSpace));

        availableSpaceEl.innerText=letter;
        availableSpace+=1;
        del=true;
    }
}

function handleDeleteLetter(){
  if (del==true){
  const currentWordArr = getCurrentWordArr();
  const removedLetter=currentWordArr.pop();
  guessWords[guessWords.length-1]=currentWordArr;
  console.log(currentWordArr)
  const lastletterEl= document.getElementById(String(availableSpace-1));
  lastletterEl.innerText='';
  availableSpace=availableSpace-1;
  }
}

function getTileColor(letter,index){
  const isCorrectLetter = word.includes(letter);

  if(!isCorrectLetter){
    return "rgb(58, 58, 60)";
  }
  const letterInThePosition = word.charAt(index);
  if(letterInThePosition===letter){
    return "rgb(83, 141, 78)";
  }

  return "rgb(181, 159, 59)";
}

function handleSubmitWord(){
    const currentWordArr = getCurrentWordArr();
    if(currentWordArr.length!=5){
        window.alert("Word must contain 5 letters");
        return;
    }
    const currentWord = currentWordArr.join("");
    const firstLetterId=guessWordCount*5+1;
    const interval =200;

    currentWordArr.forEach((letter,index)=>{
        console.log("hello");
        setTimeout(()=>{
            const tileColor=getTileColor(letter,index);

            const letterId = firstLetterId +index;
            const letterEl = document.getElementById(letterId);
            letterEl.classList.add("animate__animated");
            letterEl.classList.add("animate__flipInX");
            letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
          
        },interval*index);
    })
    guessWordCount+=1;

    if(currentWord===word){
          window.alert("Congrats")
          return;
    }

    if (guessWords.length===6){
        window.alert(`Sorry , you have no more guesses! The correct word is ${word}`)
        return;  
      }
    guessWords.push([]);
    del=false;
}



function handleKeyboard()
{    for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({ target }) => {
      const letter = target.getAttribute("data-key");
      if (letter === "enter") {
        handleSubmitWord();
        return;
      }

      if (letter === "delete") {
        handleDeleteLetter();
        return;
      }

      updateGuessedWords(letter);
    };
  }
}


function initializeapp()
{
    createSquare();
    handleKeyboard();
}

initializeapp();