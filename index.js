const height = 6;
const width = 5;
var row=0;
var col =0;
var gameOver=false;
var wordList = ["APPLE","HOUSE","MOUSE","UNDER","BRING","DOUBT","BLANK","PLANK","CAMEL","LIGHT","PHONE","SMART","WHEEL","SHOES","WATCH","YATCH","DRESS","WATER","LEACH","CATCH","TOWEL","TORCH","HEART","INDIA","FOCUS","INDEX"];
var wordNum = Math.floor(Math.random()*(wordList.length));
console.log(wordNum);
var word = wordList[wordNum];
window.onload = function(){
    initial();
}

function initial(){
    for(let r=0;r<height;r++){
        for(let c=0;c<width;c++){
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerHTML="";
            document.getElementById("board").appendChild(tile);
        }
    }
    document.addEventListener("keyup",(event)=>{
        if(gameOver) return;

        if("KeyA" <= event.code && event.code <= "KeyZ"){
            if(col < width){
                let currTile = document.getElementById(row.toString() + "-" + col.toString());
                if(currTile.innerText == ""){
                    currTile.innerText = event.code[3];
                    col = col + 1;
                }
            }
        }
        else if(event.code == "Backspace"){
            if(col > 0 && col <=width){
                col = col -1;
                let currTile = document.getElementById(row.toString() + "-" + col.toString());
                currTile.innerText = "";
            }

        }
        else if(event.code == "Enter"){
            update();
            row = row+1;
            col=0;
        }
        if(!gameOver && row == height){
            gameOver == true;
            document.getElementById("answer").innerHTML="Opps😭 you lost. The word is "+word;
        }
    })
}

function update(){
    let correct=0;
    let letterCount = {};
    for(let i=0;i < word.length ; i++){
        let letter = word[i];
        if(letterCount[letter]){
            letterCount[letter] = letterCount[letter]+1;
        }
        else{
            letterCount[letter] = 1;
        }
        console.log(letterCount);
    }
    
    for(let c=0 ; c<width ; c++){
        let currTile = document.getElementById(row.toString() + "-" + c.toString());
        let letter = currTile.innerText;
        if(word[c] == letter){
            currTile.classList.add("correct");
            correct = correct + 1;
            letterCount[letter] = letterCount[letter] -1;
        }
    }

    for(let c=0 ; c<width ; c++){
        let currTile = document.getElementById(row.toString() + "-" + c.toString());
        let letter = currTile.innerText;
        if(!currTile.classList.contains("correct")){
        if(word.includes(letter) && letterCount[letter] >0){
            currTile.classList.add("present");
            letterCount[letter] = letterCount[letter] -1;
        }
        else{
            currTile.classList.add("absent");
        }
    }
    
}
console.log(letterCount);
if(correct == 5){
    document.getElementById("answer").innerHTML= "yayy! you guessed the word " + word;
}
}
