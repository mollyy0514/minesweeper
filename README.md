# 💣 Minesweeper

This project is a clone of minesweeper game.

The project contains of:
* Start page
* Level selecting page
* Game page

The project is deployed at: [https://mollyy0514.github.io/minesweeper/](https://mollyy0514.github.io/minesweeper/)

## Table of Contents
- [Instruction](#Instruction)
- [Quickview](#Quickview)
- [Framework](#Framework)
    - [MENU](#MENU)
        - [input.js](#input.js)
    - [GAME](#GAME)
        - [script.js](#script.js)
        - [minesweeper.js](#minesweeper.js)


## Instruction

- Press the `Start` button at the initial page. 
- There's a page which can choose which size of board we want to challenge.
- After selecting, Press `Enter Game` at the buttom.
- **Left click** a tile to check its status, and right click to mark a tile. If the tile we **left click** is actually a mine, then we fail the game, everytime we has **three chances** to return to our previous step.
- When the chances are all used, as long as we tend to reveal a mine again, the game end, and we **lose**. If we reveal all tiles that are not mines, the game also ends, but we **win**.

## Quickview

1. Populate a board with tiles / mines.
2. Left click on tiles.
    **a.** Reaveal tiles.
    **b.** Change color of mine count for every tile.
            (Blue, Green, Red, DarkBlue, Purple, Yellow, Black, DarkGoldenRod)
    **c.** Reveal surrounding tiles.
3. Right click on tiles.
    **a.** Mark tiles.
    **b.** Check if the mark count exceeds the real mine count.
        (When marking a tile, we need to check whether the surrounding tiles have exceed their mine capacity.)
4. Check for win / lose.

## Framework

### MENU

#### input.js

By implementing `addEventListener`, as clicking any level, board size and the number of mines will be set to the displayed number.

I used the method of `sessionStorage` to pass this 2 parameters to [script.js](#script.js).

``` javascript
sessionStorage.setItem("BOARD_SIZE", boardSize);
sessionStorage.setItem("NUMBER_OF_MINES", minesCnt);
```

In addition, to prevent a user doesn't select any level and want to enter the game, I also add another `addEventListener` function to prevent this problem by adding `preventDefault()` in the function.

### GAME

#### script.js

This JS file is deal with the Display / UI of the board.

At first, we need to get the data passed from `input.js` and call `createBoard` fucntion to create the board.
``` javascript
var BOARD_SIZE = sessionStorage.getItem("BOARD_SIZE");
var NUMBER_OF_MINES = sessionStorage.getItem("NUMBER_OF_MINES");
```

- `listMinesLeft()`:
    Assuming all the marks that we placed is correct, how many mines left that we haven't mark.
- `checkGameEnd()`:
    Everytime as we reveals a tile, it will be trigger to check whether the revealed tile is a mine.
    In this function, `checkLose` and `checkWin` is being called.
    As the game ends, double click the board can restart the game.
- `stopProp(e)`:
    If the game ends, call`stopImmediatePropagation()`.
    
- `timer()`:
    The timer will start as long as we enter the game, and will be stopped if the game ended.
- `mineCntColor(tile)`:
    Use Different colors to represent different number of surrounding mines.
    
    {1: Blue, 2: Green, 3: Red, 4: DarkBlue, 5: Purple, 6: Yellow, 7: Black, 8: DarkGoldenRod}

#### minesweeper.js

This JS file is deal with the function of the main game.

Every tile has 4 statuses: **hidden, mine, number, marked**.
**Hidden** means the tile hasn't been revealed, **mine** is that the tile revealed is actually a mine, while **number** means that the tile revealed is not a mine, and when the tile is considered a mine and be right clicked, the tile is set to **marked**.

- `createBoard(boardSize, numberOfMines)`:
    Creates the board that have a specific number of tiles, and every tile is an **object** contains its status and also ome of its surroundng tiles information.
``` javascript
const tile = {
    element,
    x,
    y,
    surroundingMines,  // How many surround mines
    exceedMineCap,     // A boolean to check if surrounding marks > surrounding mines.
    surroundingMark,   // If the tile is actually a mine, then true, otherwise false.
    mine:minePositions.some(positionMatch.bind(null, { x, y })),
    get status() {
        return this.element.dataset.status;
    },
    set status(value) {
        this.element.dataset.status = value;
    },
};
```
- `markTile(board, tile)`:
    It will be called when the user right click a tile, and the **hidden** tile will be set to **marked**.
    However, if the tile has been **marked**, then its status will turn back to **hidden**, and its surrounding tiles need to reset their `surroundingMark`.
    
- `revealTile(board, tile)`:
    It will be called if the user left click a tile.
    If the tile is **hidden**, then it will reveal the number of surrounding and status is set to be **number**.
    On the other hand, if the tile has already set to be **number**, and the surrounding marks equals surrounding tiles, then the surrounding tiles that hasn't revealed will all reveal.
    To mind that, if any tile revealed is actually a mine, its tile staus will be set to **mine** but not number, and it will trigger an alert to check whether the user want to regret or not, if regret, the chances will minus 1, and while the chance reaches 0, the game will finish anyway.
    
- `checkWin(board)`:
    If all the tiles that are not mine are all revealed, the player win.
    
- `checkLose(board)`:
    If the player lose the game, all mines on board will revealed.

- `getMinePositions(boardSize, numberOfMines)`:
    It is called in the `createBoard` function, and the function returns all the mine position (x, y). Also, only `positionMatch` fucntion returns false, the mine position is valid.

- `positionMatch(a, b)`:
    The funciton needs to check whether the mine position is repeating or not.

- `randomNumber(size)`:
    Random generate `x` and `y`.

- `nearbyTiles(board, { x, y })`:
    Returns the surrounding mines position.

- `countSurroundingMines(board, t)`:
    Returns the number of surrounding mines.

- `revealMinesCnt(board, t)`:
    Reveal the number of surrounding mines.

- `checkExceed(board, t)`:
    Check whether the number of surrounding marks exceeds surrounding mines.
