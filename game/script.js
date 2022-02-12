// Display / UI
import { TILE_STATUSES, createBoard, markTile, revealTile, checkWin, checklose } from "./minesweeper.js";
// import { boardInfo, BOARD_SIZE, NUMBER_OF_MINES } from "../menu/input.js";

var BOARD_SIZE = sessionStorage.getItem("BOARD_SIZE");
var NUMBER_OF_MINES = sessionStorage.getItem("NUMBER_OF_MINES");

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
const boardElement = document.querySelector('.board');
const minesLeftText = document.querySelector('[data-mine-count]');
const messageText = document.querySelector('.subtext');

board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element);
        tile.element.addEventListener('click', () => {
            revealTile(board, tile);
            checkGameEnd();
        })
        tile.element.addEventListener('contextmenu', e => {
            e.preventDefault(); // 按下右鍵不會有選單跑出來
            markTile(tile);
            listMinesLeft();
        })
    })
})
boardElement.style.setProperty("--size", BOARD_SIZE);
minesLeftText.textContent = NUMBER_OF_MINES;

function listMinesLeft() {
    const markedTilesCount = board.reduce((count, row) => {
        return count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length
    }, 0) 

    minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount;
}

function checkGameEnd() {
    const win = checkWin(board);
    const lose = checklose(board);

    if (win || lose) {
        boardElement.addEventListener('click', stopProp, { capture: true });
        boardElement.addEventListener('contextmenu', stopProp, { capture: true });
    }

    if (win) {
        messageText.textContent = "You Win!";
    }
    if (lose) {
        messageText.textContent = "You Lose.";
        board.forEach(row => {
            row.forEach(tile => {
                if (tile.status === TILE_STATUSES.MARKED) {
                    markTile(tile);
                }
                if (tile.mine) {
                    revealTile(board, tile);
                }
            })
        })
    }
}

function stopProp(e) {
    e.stopImmediatePropagation();
}

export function mineCntColor(tile) {
    if (tile.element.textContent == 1) {
        tile.element.style.color = 'blue';
    }
    else if (tile.element.textContent == 2) {
        tile.element.style.color = 'green';
    }
    else if (tile.element.textContent == 3) {
        tile.element.style.color = 'red';
    }
    else if (tile.element.textContent == 4) {
        tile.element.style.color = '#00008b';   // darkblue
    }
    else if (tile.element.textContent == 5) {
        tile.element.style.color = 'purple';
    }
    else if (tile.element.textContent == 6) {
        tile.element.style.color = 'yellow';
    }
    else if (tile.element.textContent == 7) {
        tile.element.style.color = '#000';
    }
    else {
        tile.element.style.color = '#b8860b';   // darkgoldenrod
    }
}

// 1. Populate a board with tiles/mines
// 2. Left click on tiles
    // a. Reaveal tiles
    // b. Change color of mine count for every tile
        // Blue, Green, Red, DarkBlue, Purple, Yellow, Black, DarkGoldenRod
    // c. Reveal surrounding tiles
// 3. Right click on tiles
    // a. Mark tiles
    // b. Check if the mark count exceeds the real mine count
        // when marking a tile, we nedd to check whether the surrounding tiles have exceed their mine capacity.
// 4. Check for win/lose
