var numOfSquares = 3; //value of 3/6 acording to EASY/HARD. initiated by 3.
var guessColor = document.querySelector("#guess_color");
var colors;
var modes = document.querySelectorAll(".mode");
var squares = document.querySelectorAll(".square");
var message = document.querySelector("#message");
var newColors = document.querySelector("#new_colors"); //game reset button
var stop;

init();

function init(){
    resetGame();
    
    for (var i = 0; i<modes.length; i++){
        modes.item(i).addEventListener("click", function(){
        updateNumOfSquares(this)
        })
    };

    newColors.addEventListener("click", function(){
        resetGame()
    });   
    
    /* 
        max duration of the game is set to 60 seconds. if the user does not finish to play 
        before the timeout, alert is shown and the game is reset.
    */    
    stop = setInterval(function(){
        alert("Please, try faster the next time!"); 
        resetGame();    
    }, 60000);           	
}

/* 
    function - game is initiated (even if it was not played yet). new colors for squares are chosen, one
               of them will be the guess color. the guess color's font color updated to white 
               (even if it was not changed yet). message area text is erased (even if it was not changed yet). 
               the squares nodeList is updated if the mode is EASY.
*/
function resetGame(){
    colors = createArrayOfColors(numOfSquares);
	guessColor.textContent = chooseMainColor(colors);
    guessColor.style.color = "white";
    message.textContent = "";
    if (numOfSquares == 3){
        for (var i = 3; i < 6; i++){
            squares.item(i).style.backgroundColor = "#232323";
        }
    }
    gamePlay();           
}

/*
    function - the squares' colors initiated by the "colors" array. the number of
               squares initiated is by the chosen mode (EASY by default).
               when the user click the wrong square (color), the background color of this 
               squares changed to the page's background color, and a message is shown accordingly.
               if the user choose the right square (color) a message is shown accordingly,
               the guess color font color updated to its color (rgb) and the game stops
               (reset of timeout).
*/
function gamePlay(){
    for (var i = 0; i < numOfSquares; i++){
        squares.item(i).style.backgroundColor = colors[i];
        squares.item(i).addEventListener("click", function(){
            if (guessColor.textContent == this.style.backgroundColor.toUpperCase()){                                
                message.textContent = "YOU WON!";
                for (var i = 0; i < numOfSquares; i++){
                    squares.item(i).style.backgroundColor = guessColor.textContent;  
                } 
                guessColor.style.color = guessColor.textContent;  
                clearInterval(stop);            
            }
            else {
                this.style.backgroundColor = "#232323";
                message.textContent = "TRY AGAIN!";
            }
        });
    }    
}

/* 
    function - update the number of squares by event (user's click on one of the gaame modes(esay/hard))
               and update visually the selected mode chosen by user
*/
function updateNumOfSquares(mode){
    if (modes.item(0).classList.contains("selected")){
        modes.item(0).classList.remove("selected");
    }
    else {
        modes.item(1).classList.remove("selected");
    }
    mode.classList.add("selected");
    
    if(mode.textContent.includes("HARD")){
        numOfSquares = 6;
    }
    else {
        numOfSquares = 3;
    }
    resetGame();    
}

/* 
    params: colors - array of colors (length of 3 or 6)
    return: random value from the array        
*/
function chooseMainColor(colors){
    return colors[Math.ceil(Math.random()*colors.length)];
}

/* 
    params: num - size of the requested array of colors (3 or 6)
    return: arrayColors - array with the requested length (num) and values
            of random (and distinct) rgb color representations
*/
function createArrayOfColors(num){
    var i=0, arrayColors = [];
    for (; i < num; i++){
        var x = createRgbColor();
        while (arrayColors.includes(x) == true){
            x = createRgbColor();                      
        }
        arrayColors.push(x);                   
    }
    return arrayColors;
}

/* 
    params: none
    return: random rgb color representation
*/
function createRgbColor(){
    var red = Math.ceil(Math.random()*256); 
    var green = Math.ceil(Math.random()*256);
    var blue = Math.ceil(Math.random()*256);
    return "RGB(" + red + ", " + green + ", " + blue + ")";
} 

