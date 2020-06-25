/* ------- constants -------- */

// create an array of winning combos
// horizontal [0, 1, 2], [3, 4, 5] [6, 7, 8]
// vertical [0, 3, 6], [1, 4, 7], [2, 5, 8]
// diagonal [0, 5, 8], [2, 4, 6]
const winningCombos = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 4, 8],
    [0, 4, 8], 
    [2, 4, 6]
]
/* ------- app's state (variables) -------- */

let board;
// const player1 = "O";
// const player2 = "X";
let messages = document.querySelector('h2')
let turn = "X";
let win;

/* ------- cached element references -------- */
const cells = Array.from(document.querySelectorAll("#board div"))

/* ------- event listeners -------- */

document.getElementById('board').addEventListener('click', handleTurn)

document.getElementById('reset').addEventListener('click', init)

/* ------- functions -------- */
function init() {
    board = ['', '', '', '', '', '', '', '', '']; 
    renderBoard()
}

function renderBoard() {
    board.forEach((mark, index) => {
        // console.log(mark, index)
        // this sets the text content of the cell of the same position to the mark on the board
        cells[index].textContent = mark
    })

    messages.textContent = win === "Tie" ? `It's a tie` : win ? `${win} wins` : `It's ${turn}'s turn`
    
}

function handleTurn(event) {
    let idx = cells.findIndex( cell => {
        return cell === event.target
    })
    if (board[idx] == "") {
        board[idx] = turn
        turn = turn === 'X' ? 'O' : 'X'
    // console.log(board)
        win = getWinner()
        renderBoard()
    }
}

function getWinner() {
    let winner = null
    winningCombos.forEach((combo, index) => {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
            winner = board[combo[0]]
            document.getElementById('board').removeEventListener('click', handleTurn)
        }
    })
    return winner ? winner : board.includes('') ? null : 'Tie'
}

init()