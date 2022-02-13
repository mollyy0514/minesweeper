var boardSize = 0;
var minesCnt = 0;

var level1 = document.getElementById('level1');
var level2 = document.getElementById('level2');
var level3 = document.getElementById('level3');
var level4 = document.getElementById('level4');
var level5 = document.getElementById('level5');
var enter = document.getElementById('enter');

var originalColor = '#591200';
var chosenColor = '#fff';

level1.addEventListener("click", () => {
    if (boardSize == 0) {
        level1.style.borderColor = '#fff';
        boardSize = 9;
        minesCnt = 10;
        console.log(boardSize, minesCnt);
        sessionStorage.setItem("BOARD_SIZE", boardSize);
        sessionStorage.setItem("NUMBER_OF_MINES", minesCnt);
    } else if (boardSize == 9) {
        boardSize = 0;
        minesCnt = 0;
        level1.style.borderColor = originalColor;
        console.log(boardSize, minesCnt);
        sessionStorage.setItem("BOARD_SIZE", boardSize);
        sessionStorage.setItem("NUMBER_OF_MINES", minesCnt);
    } else {
        level2.style.borderColor = originalColor;
        level3.style.borderColor = originalColor;
        level4.style.borderColor = originalColor;
        level5.style.borderColor = originalColor;
        level1.style.borderColor = chosenColor;
        boardSize = 9;
        minesCnt = 10;
        console.log(boardSize, minesCnt);
        sessionStorage.setItem("BOARD_SIZE", boardSize);
        sessionStorage.setItem("NUMBER_OF_MINES", minesCnt);
    }
    console.log(level1.style.borderColor);
});

level2.addEventListener("click", () => {
    if (boardSize == 0) {
        level2.style.borderColor = chosenColor;
        boardSize = 16;
        minesCnt = 40;
        console.log(boardSize, minesCnt);
        sessionStorage.setItem("BOARD_SIZE", boardSize);
        sessionStorage.setItem("NUMBER_OF_MINES", minesCnt);
    } else if (boardSize == 16) {
        boardSize = 0;
        minesCnt = 0;
        level2.style.borderColor = originalColor;
        console.log(boardSize, minesCnt);
        sessionStorage.setItem("BOARD_SIZE", boardSize);
        sessionStorage.setItem("NUMBER_OF_MINES", minesCnt);
    }
    else {
        level1.style.borderColor = originalColor;
        level3.style.borderColor = originalColor;
        level4.style.borderColor = originalColor;
        level5.style.borderColor = originalColor;
        level2.style.borderColor = chosenColor;
        boardSize = 16;
        minesCnt = 40;
        console.log(boardSize, minesCnt);
        sessionStorage.setItem("BOARD_SIZE", boardSize);
        sessionStorage.setItem("NUMBER_OF_MINES", minesCnt);
    }
});

level3.addEventListener("click", () => {
    if (boardSize == 0) {
        level3.style.borderColor = chosenColor;
        boardSize = 30;
        minesCnt = 186;
        console.log(boardSize, minesCnt);
        sessionStorage.setItem("BOARD_SIZE", boardSize);
        sessionStorage.setItem("NUMBER_OF_MINES", minesCnt);
    } else if (boardSize == 30) {
        boardSize = 0;
        minesCnt = 0;
        level3.style.borderColor = originalColor;
        console.log(boardSize, minesCnt);
        sessionStorage.setItem("BOARD_SIZE", boardSize);
        sessionStorage.setItem("NUMBER_OF_MINES", minesCnt);
    }
    else {
        level1.style.borderColor = originalColor;
        level2.style.borderColor = originalColor;
        level4.style.borderColor = originalColor;
        level5.style.borderColor = originalColor;
        level3.style.borderColor = chosenColor;
        boardSize = 30;
        minesCnt = 186;
        console.log(boardSize, minesCnt);
        sessionStorage.setItem("BOARD_SIZE", boardSize);
        sessionStorage.setItem("NUMBER_OF_MINES", minesCnt);
    }
});

level4.addEventListener("click", () => {
    if (boardSize == 0) {
        level4.style.borderColor = chosenColor;
        boardSize = 59;
        minesCnt = 721;
        console.log(boardSize, minesCnt);
        sessionStorage.setItem("BOARD_SIZE", boardSize);
        sessionStorage.setItem("NUMBER_OF_MINES", minesCnt);
    } else if (boardSize == 59) {
        boardSize = 0;
        minesCnt = 0;
        level4.style.borderColor = originalColor;
        console.log(boardSize, minesCnt);
        sessionStorage.setItem("BOARD_SIZE", boardSize);
        sessionStorage.setItem("NUMBER_OF_MINES", minesCnt);
    } else {
        level1.style.borderColor = originalColor;
        level2.style.borderColor = originalColor;
        level3.style.borderColor = originalColor;
        level5.style.borderColor = originalColor;
        level4.style.borderColor = chosenColor;
        boardSize = 59;
        minesCnt = 721;
        console.log(boardSize, minesCnt);
        sessionStorage.setItem("BOARD_SIZE", boardSize);
        sessionStorage.setItem("NUMBER_OF_MINES", minesCnt);
    }
});

level5.addEventListener("click", () => {
    if (boardSize == 0) {
        level5.style.borderColor = chosenColor;
        boardSize = 79;
        minesCnt = 1300;
        console.log(boardSize, minesCnt);
        sessionStorage.setItem("BOARD_SIZE", boardSize);
        sessionStorage.setItem("NUMBER_OF_MINES", minesCnt);
    } else if (boardSize == 79) {
        boardSize = 0;
        minesCnt = 0;
        level5.style.borderColor = originalColor;
        console.log(boardSize, minesCnt);
        sessionStorage.setItem("BOARD_SIZE", boardSize);
        sessionStorage.setItem("NUMBER_OF_MINES", minesCnt);
    } else {
        level1.style.borderColor = originalColor;
        level2.style.borderColor = originalColor;
        level3.style.borderColor = originalColor;
        level4.style.borderColor = originalColor;
        level5.style.borderColor = chosenColor;
        boardSize = 79;
        minesCnt = 1300;
        console.log(boardSize, minesCnt);
        sessionStorage.setItem("BOARD_SIZE", boardSize);
        sessionStorage.setItem("NUMBER_OF_MINES", minesCnt);
    }
});

enter.addEventListener("click", (e) => {
    if (boardSize == 0 && minesCnt == 0) {
        alert('Please Choose a Level!');
        e.preventDefault();
    }
})