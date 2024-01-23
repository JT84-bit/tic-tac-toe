


function GameBoard () {
    const rows = 3;
    const columns = 3;
    const board = [];
    for(let i = 0; i < rows ; i++){
        let newRow = [];
        for(let j = 0;j < columns;j++){
            newRow.push(0);  
        } 
        board.push(newRow)
    }

    const getBoard = () => board;

    return {getBoard};
}

function gameController(
    playerOne = "Player One",
    playerTwo = "Player Two"
) {
    
    const board = GameBoard();
    const players = [
        {
         name : playerOne,
         token: "O",
         value: 1
        },
        {
        name : playerTwo, 
        token: "X",
        value: 5
    }
    ];

    let activeplayer = players[0];

    const getActivePlayer = () => activeplayer;

    const switchPlayerTurn = () => {
        activeplayer = activeplayer === players[0] ? players[1] : players[0] 
    };

    function checkWinner(boardState){

        let column1 = 0;
        let column2 = 0;
        let column3 = 0;
        let upDown = 0;
        let downUp = 0;

        for(let i = 0; i < 3; i++){
            column1 += boardState[i][0];
            column2 += boardState[i][1];
            column3 += boardState[i][2];
            upDown  += boardState[i][i];
        }

        downUp += boardState[0][2];
        downUp += boardState[1][1];
        downUp += boardState[2][0];

        
        function checkSum (row) {

            var sum = row.reduce((accumulator, currentValue) => {
                return accumulator + currentValue
              },0);

              if(sum === 15 || column1 === 15 || column2 === 15 || column3 === 15 || upDown === 15 || downUp === 15){
                return 1;
              }else if(sum === 3 || column1 === 3 || column2 === 3 || column3 === 3 || upDown === 3 || downUp === 3){
                return 1;
              }
              return 0;
        }
        if(checkSum(boardState[0]) || checkSum(boardState[1]) || checkSum(boardState[2])){
            return 1;
        }else if(boardState[0].indexOf(0) === -1 && boardState[1].indexOf(0) === -1 && boardState[2].indexOf(0) === -1){
            return -1    
        }else{
            return 0;
        }
    };
    
    return {
        getboard: board.getBoard,
        getActivePlayer,
        switchPlayerTurn,
        checkWinner
    }

}

function screenController(){
    const game = gameController();
    let board = game.getboard();
    let gamediv = document.querySelector(".board");
    let playerDiv = document.querySelector(".playerOnTurn")
    let activeplayer = game.getActivePlayer();
    const resetButton = document.querySelector(".newGame")
    resetButton.addEventListener("click", () =>{
        window.location.reload();
    });

    const drawBoard = () => {

        gamediv.textContent = "";
        playerDiv.textContent = `${activeplayer.name}'s turn`;


        for(let i = 0; i < board.length;i++){
            let buttonRow = document.createElement("div")
            for(let j = 0; j < board[i].length ; j++){
                const squareButton = document.createElement("button");
                squareButton.classList.add("square");

                squareButton.addEventListener("click", () =>{

                    if(checkIfPlaced(i, j)){
                        board[i][j] = activeplayer.value;
                        squareButton.textContent = activeplayer.token;
                        gameRound();
                    }
                });

                buttonRow.appendChild(squareButton);
            };
            gamediv.appendChild(buttonRow);
        }; 
    }   

    function checkIfPlaced(row, index){
        if(board[row][index] === 0){
            return true;
        }
    }

    function gameRound(){

        let gamesituation = game.checkWinner(board);

        if(gamesituation === 1){
            let endScreen = document.querySelector(".hidden");
            let winText = document.querySelector(".winText")
            endScreen.classList.remove("hidden");
            winText.textContent = `${activeplayer.name} WON!`
            
        }else if(gamesituation === -1){
            let endScreen = document.querySelector(".hidden");
            let winText = document.querySelector(".winText")
            endScreen.classList.remove("hidden");
            winText.textContent = `DRAW!`

        }else{
            game.switchPlayerTurn();
            activeplayer = game.getActivePlayer();
            playerDiv.textContent = `${activeplayer.name}'s turn`;
        }
    }
    drawBoard();
}



screenController();