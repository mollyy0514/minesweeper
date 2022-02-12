// Logic
import { mineCntColor } from "./script.js";

export const TILE_STATUSES = {
    HIDDEN: 'hidden',
    MINE: 'mine',
    NUMBER: 'number',
    MARKED: 'marked'
};

export function createBoard(boardSize, numberOfMines) {
    const board = [];
    const minePositions = getMinePositions(boardSize, numberOfMines)
    // console.log(minePositions)

    for (let x = 0; x < boardSize; x++) {
        const row = [];
        for (let y = 0; y < boardSize; y++) {
            const element = document.createElement('div');
            element.dataset.status = TILE_STATUSES.HIDDEN;

            const tile = {
                element,
                x,
                y,
                // 如果 mine 設在那個位置，則那一格會被記為 true，其他的則是 false
                mine: minePositions.some(positionMatch.bind(null, { x, y })),
                get status() {
                    return this.element.dataset.status;
                },
                set status(value) {
                    this.element.dataset.status = value;
                },
            };
            row.push(tile);
        }
        board.push(row);
    }

    
    
    return board;
}

export function markTile(tile) {
    if (tile.status !== TILE_STATUSES.HIDDEN && tile.status !== TILE_STATUSES.MARKED) {
        return;
    }

    if (tile.status === TILE_STATUSES.MARKED) {
        tile.status = TILE_STATUSES.HIDDEN;
    }
    else {
        tile.status = TILE_STATUSES.MARKED;
    }


}

export function revealTile(board, tile) {
    const adjacentTiles = nearbyTiles(board, tile);
    const mines = adjacentTiles.filter(t => t.mine);    // 只留下 true 的格子

    // 如果這個 tile 已經被開過
    if (tile.status === TILE_STATUSES.NUMBER) {
        // console.log('yeah!');
        var cnt = 0;
        // 計算這個 tile 周圍已經佈了多少 flag
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                const checkTile = board[tile.x + i]?.[tile.y + j];
                console.log(checkTile);
                if (checkTile) {
                    // 如果周圍的這個 tile 有被 mark 過 cnt 就加 1
                    if (checkTile.status == TILE_STATUSES.MARKED) {
                        cnt++;
                        console.log(cnt);
                    }
                }
            }
        }
        console.log(cnt);
        console.log(mines.length);
        // 只要周圍佈的 mark 已經等於他周圍該有的地雷數
        if (cnt == mines.length) {
            for (var i = -1; i <= 1; i++) {
                for (var j = -1; j <= 1; j++) {
                    const checkTile = board[tile.x + i]?.[tile.y + j];
                    if (checkTile) {
                        if (checkTile.status == TILE_STATUSES.HIDDEN) {
                            if (checkTile.mine) {
                                checkTile.status = TILE_STATUSES.MINE;
                                return;
                            }
                            else {
                                checkTile.status = TILE_STATUSES.NUMBER;
                                revealMinesCnt(board, checkTile);
                            }
                        }
                    }
                    
                }
            }
        }
    }

    if(tile.status !== TILE_STATUSES.HIDDEN) {
        return;
    }

    if (tile.mine) {
        tile.status = TILE_STATUSES.MINE;
        return;
    }

    tile.status = TILE_STATUSES.NUMBER;
    revealMinesCnt(board, tile);
}

export function checkWin(board) {
    // 確認每個 flag 都是地雷
    return board.every(row => {
        return row.every(tile => {
            return tile.status === TILE_STATUSES.NUMBER ||
            (tile.mine && (tile.status === TILE_STATUSES.HIDDEN || 
                                tile.status === TILE_STATUSES.MARKED))
        })
    })
}

export function checklose(board) {
    // 如果 lose 就顯示所有地雷
    return board.some(row => {
        return row.some(tile => {
            return tile.status === TILE_STATUSES.MINE;
        })
    })
}

// 佈置地雷並回傳所有地雷座標陣列
function getMinePositions(boardSize, numberOfMines) {
    const positions = [];

    while (positions.length < numberOfMines) {
        const position = {
            x: randomNumber(boardSize),
            y: randomNumber(boardSize)
        }

        if (!positions.some(p => positionMatch(p, position))) {
            positions.push(position);
        }
    }

    return positions;
}

function positionMatch(a, b) {
    // check whether 地雷位置有沒有重複
    return a.x == b.x && a.y == b.y;
}

function randomNumber(size) {
    // Math.floor()：回傳 <= 給定數值(輸入參數)的最大整數
    return Math.floor(Math.random() * size);
}

// 計算九宮格內有多少 mines，回傳地雷座標陣列
function nearbyTiles(board, { x, y }) {
    const tiles = [];

    for (let xOffset = -1; xOffset <= 1; xOffset++) {
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
            const tile = board[x + xOffset]?.[y + yOffset];
            // console.log(tile);
            if (tile) {
                tiles.push(tile);
            }
        }
    }

    return tiles;
}

// 顯示這個 tile 周圍有多少 mine
function revealMinesCnt(board, t) {
    const checkAdjacentTiles = nearbyTiles(board, t);
    const checkMines = checkAdjacentTiles.filter(tt => tt.mine);    // 只留下 true 的格子

    if (checkMines.length === 0) {
        checkAdjacentTiles.forEach(revealTile.bind(null, board));
    }
    else {
        t.element.textContent = checkMines.length;
        mineCntColor(t);
    }
}


