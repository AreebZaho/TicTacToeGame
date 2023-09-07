const backArrow = '<i class="fa-solid fa-arrow-left"></i>';
const oMark = '<i class="fa-solid fa-o"></i>';
const xMark = '<i class="fa-solid fa-xmark"></i>';
let count = 0;
let playMode = 0;
let currMark = oMark;
const skip = document.querySelector('#skip');
const plus = document.querySelector('#plus');
const displayGrid = document.querySelector('#grid');
const cells = document.querySelectorAll('.cell');
const grid = [['', '', ''], ['', '', ''], ['', '', '']];
let start = false;
const frnd = document.querySelector('#frnd');
const playerInp = document.querySelector('#playerInp');
const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');
const scoreP1 = document.querySelector('#scoreP1');
const scoreP2 = document.querySelector('#scoreP2');
let player1 = 'Player 1'; let score1 = 0; let player2 = 'Player 2'; let score2 = 0;
const comp = document.querySelector('#comp');
let compMark = xMark;
const playerInpComp = document.querySelector('#playerInpComp');
const p = document.querySelector('#p');
const scoreP = document.querySelector('#scoreP');
const scoreC = document.querySelector('#scoreC');
let player = 'Guest';//reuse score1,2;
const goFirst = document.querySelector('#goFirst');
const goFirstInp = document.querySelector('#goFirstInput');
const slider = document.querySelector('#slider');
let waitForCompMove = false;

frnd.addEventListener('click', () => {
    if (frnd.innerHTML != backArrow) {
        playMode = 1; 
        frnd.innerHTML = backArrow;
        comp.classList.add('hide');
        frnd.classList.add('frndToBack');
        p1.classList.remove('hide'); p2.classList.remove('hide'); 
        playerInp.classList.add('appear');
        skip.classList.remove('hide');
        skip.classList.add('skipFrnd');
        document.querySelector('.outerDivOfSkip').classList.add('appear');
    }
    else {
        restartGame();
        start = false;
        displayGrid.classList.remove('gridSlideFrnd');
        document.querySelector('#scoreFrnd').classList.remove('appear');
        scoreP1.classList.add('hide'); scoreP2.classList.add('hide');
        player1 = 'Player 1'; score1 = 0; player2 = 'Player 2'; score2 = 0;
        document.querySelector('.outerDivOfSkip').classList.remove('appear');
        skip.classList.remove('skipFrnd');
        skip.classList.add('hide');
        playerInp.classList.remove('appear');
        p1.classList.add('hide'); p2.classList.add('hide'); 
        p1.value = p2.value = ''; skip.innerText = 'SKIP';
        frnd.classList.remove('frndToBack');
        comp.classList.remove('hide');
        frnd.innerText = 'PLAY WITH A FRIEND';
        playMode = 0;
    }    
});
comp.addEventListener('click', () => {
    if (comp.innerHTML != backArrow) {
        playMode = 2; 
        comp.innerHTML = backArrow;
        frnd.classList.add('hide');
        comp.classList.add('compToBack');
        p.classList.remove('hide');
        playerInpComp.classList.add('appear');
        skip.classList.remove('hide');
        skip.classList.add('skipComp');
        document.querySelector('.outerDivOfSkip').classList.add('appear');
    }
    else {
        restartGame();//enables goFirst also
        start = false;
        displayGrid.classList.remove('gridSlideComp');
        slider.classList.add('hide');
        slider.classList.remove('shrink');
        slider.style.width = '200px';
        goFirstInp.checked = true;
        compMark = xMark;
        waitForCompMove = false;
        goFirst.classList.add('hide');
        document.querySelector('#scoreComp').classList.remove('appear');
        scoreP.classList.add('hide'); scoreC.classList.add('hide');
        comp.classList.remove('compToBack1');
        player = 'Guest'; score1 = 0; score2 = 0;
        document.querySelector('.outerDivOfSkip').classList.remove('appear');
        skip.classList.remove('skipComp');
        skip.classList.add('hide');
        playerInpComp.classList.remove('appear');
        p.classList.add('hide');
        p.value = ''; skip.innerText = 'SKIP';
        comp.classList.remove('compToBack');
        frnd.classList.remove('hide');
        comp.innerText = 'PLAY AGAINST COMPUTER';
        playMode = 0;
    }
});

updateSkip = () => {
    if (playMode == 1)
    (p1.value.trim() !== '' && p2.value.trim() !== '') ? skip.innerText = 'ENTER' : skip.innerText = 'SKIP';
    if (playMode == 2) (p.value.trim() !== '') ? skip.innerText = 'ENTER' : skip.innerText = 'SKIP';
}
p1.addEventListener('input', updateSkip);
p2.addEventListener('input', updateSkip);
p.addEventListener('input', updateSkip);

skip.addEventListener('click', () => {
    skip.classList.add('hide');
    if (playMode == 1) {
        if (skip.innerText == 'ENTER') {
            player1 = p1.value; player2 = p2.value;
        }
        scoreP1.innerText = player1 + ': ' + score1; scoreP2.innerText = player2 + ': ' + score2;
        p1.classList.add('hide'); p2.classList.add('hide'); 
        scoreP1.classList.remove('hide'); scoreP2.classList.remove('hide');
        document.querySelector('#scoreFrnd').classList.add('appear');
        displayGrid.classList.add('gridSlideFrnd');
    }
    if (playMode == 2) {
        if (skip.innerText == 'ENTER') {
            player = p.value;
        }
        scoreP.innerText = player + ': ' + score1; scoreC.innerText = 'Computer: ' + score2;
        p.classList.add('hide'); 
        comp.classList.add('compToBack1');
        scoreP.classList.remove('hide'); scoreC.classList.remove('hide');
        document.querySelector('#scoreComp').classList.add('appear');
        goFirst.classList.remove('hide');
        displayGrid.classList.add('gridSlideComp');
    }
    start = true;
})

disable = () => {
    goFirst.classList.add('disable');
    goFirstInp.disabled = true;
}

enable = () => {
    goFirst.classList.remove('disable');
    goFirstInp.disabled = false;
}

goFirst.addEventListener('click', (e) => {
    if (goFirstInp.checked) {
        waitForCompMove = true;
        compMark = oMark; 
        goFirstInp.checked = false;
        displayGrid.classList.remove('gridSlideComp');
        slider.classList.remove('hide');
        slider.classList.add('shrink');
        slider.style.width = '0px';
        setTimeout(() => {
            displayGrid.classList.add('gridSlideComp');
            disable();
            if (goFirstInp.checked) {
                enable();//if goFirst was clicked agin while slider was shrinking
                return;
            }
            compMove();
        }, 1800);
    }
    else {
        waitForCompMove = false;
        compMark = xMark;
        goFirstInp.checked = true;
        slider.classList.remove('shrink');
        slider.classList.add('hide');
        slider.style.width = '200px';
        displayGrid.classList.add('gridSlideComp');
    }
})

generateCell = () => {
    r = Math.floor(Math.random()*3); c = Math.floor(Math.random()*3);
    while (grid[r][c] !== '') {
        r = Math.floor(Math.random()*3); c = Math.floor(Math.random()*3);
    }
    return r.toString() + c.toString();
}

compMove = () => {
    waitForCompMove = true;
    const cellID = generateCell();
    const cell = document.getElementById(cellID);
    cell.innerHTML = compMark;
    cell.classList.add('cellClick');
    setTimeout(() => {
        cell.classList.remove('cellClick');
        gridPush(cell, compMark);
    }, 100);
    setTimeout(() => {
        waitForCompMove = false;
    }, 300);
}

for (let cell of cells) {
    const id = String(cell.id);
    const r = Number.parseInt(id[0]); 
    const c = Number.parseInt(id[1]);
    cell.addEventListener('mouseenter', () => {
        if (!start || waitForCompMove) return;
        if (grid[r][c] === '') {
            cell.style.cursor = 'pointer';
            cell.classList.add('cellHover');
            cell.innerHTML = (playMode == 1) ? currMark : (compMark == oMark) ? xMark : oMark;
        }
    })
    cell.addEventListener('mouseleave', () => {
        cell.style.cursor = 'default';
        cell.classList.remove('cellHover');
        if (grid[r][c] === '') {
            cell.innerHTML = '';
        }
    })
    cell.addEventListener('click', () => {
        if (!start || grid[r][c] !== '' || waitForCompMove) return;
        disable();
        cell.classList.remove('cellHover');
        if (playMode == 1){
            cell.innerHTML = currMark;
            cell.classList.add('cellClick');
            setTimeout(() => {
                cell.classList.remove('cellClick');
                gridPush(cell, cell.innerHTML);
                currMark = (currMark == oMark) ? xMark : oMark;
            }, 100);
        }
        if (playMode == 2) {
            cell.innerHTML = (compMark === oMark) ? xMark : oMark;
            cell.classList.add('cellClick');
            setTimeout(() => {
                cell.classList.remove('cellClick');
                gridPush(cell, cell.innerHTML);
            }, 100);
        }
    })
}

gridPush = (cell, cellMark) => {  
    const id = String(cell.id);
    const r = Number.parseInt(id[0]); 
    const c = Number.parseInt(id[1]);
    grid[r][c] = cellMark;
    if (++count >= 5) {
        if (checkForWin(r, c)) {
            start = false;
            victoryLine();            
            setTimeout(() => {
                win(cellMark); return;
            }, 1700);
        }
        else if (count == 9) {
            draw(); 
            setTimeout(() => {
                restartGame();
            }, 1000);
        }
    }
    else setTimeout(() => {
        compMove();
    }, 800);
}

win = (cellMark) => {
    plus.classList.remove('hide');
    if (playMode == 1) {
        if (cellMark == oMark) {
            plus.classList.add('plusForP1'); score1++;
        } 
        else {
            plus.classList.add('plusForP2'); score2++;
        }
        scoreP1.innerText = player1 + ': ' + score1; 
        scoreP2.innerText = player2 + ': ' + score2; 
        setTimeout(() => {
            (cellMark == oMark) ? plus.classList.remove('plusForP1') : plus.classList.remove('plusForP2');
            plus.classList.add('hide');
        }, 250);
    }
    else {
        if (compMark == oMark) {
            if (cellMark == oMark) {
                plus.classList.add('plusForC'); score2++;
            }
            else {
                plus.classList.add('plusForP'); score1++;
            }
            setTimeout(() => {
                (cellMark == oMark) ? plus.classList.remove('plusForC') : plus.classList.remove('plusForP');
                plus.classList.add('hide');
            }, 250);
        }
        else {
            if (cellMark == oMark) {
                plus.classList.add('plusForP'); score1++;
            }
            else {
                plus.classList.add('plusForC'); score2++;
            }
            setTimeout(() => {
                (cellMark == oMark) ? plus.classList.remove('plusForP') : plus.classList.remove('plusForC');
                plus.classList.add('hide');
            }, 250);
        }
        scoreP.innerText = player + ': ' + score1; 
        scoreC.innerText = 'Computer: ' + score2; 
    }
    restartGame();
}

let victLine = '';
checkForWin = (r, c) => {
    return horizontal(r, c) || vertical(r, c) || topLeftToBottomRight(r, c) || topRightToBottomLeft(r, c);
}
horizontal = (r, c) => {
    if (isValid(r, c-1) && isValid(r, c+1) || isValid(r, c+1) && isValid(r, c+2) || isValid(r, c-1) && isValid(r, c-2)) {
        victLine = 'h' + r; return true;
    }
    return false;
}
vertical = (r, c) => {
    if (isValid(r-1, c) && isValid(r+1, c) || isValid(r+1, c) && isValid(r+2, c) || isValid(r-1, c) && isValid(r-2, c)) {
        victLine = 'v' + c; return true;
    }
    return false;
}
topLeftToBottomRight = (r, c) => {
    if (isValid(r-1, c-1) && isValid(r+1, c+1) || isValid(r+1, c+1) && isValid(r+2, c+2) || isValid(r-1, c-1) && isValid(r-2, c-2)) {
        victLine = 'topLeftToBottomRight'; return true;
    }
    return false;
}
topRightToBottomLeft = (r, c) => {
    if (isValid(r+1, c-1) && isValid(r-1, c+1) || isValid(r-1, c+1) && isValid(r-2, c+2) || isValid(r+1, c-1) && isValid(r+2, c-2)) {
        victLine = 'topRightToBottomLeft'; return true;
    }
    return false;
}
isValid = (x, y) => {
    return 0 <= x && x <= 2 && 0 <= y && y <= 2 && grid[x][y] == currMark;
}

restartGame = () => {
    enable();
    count = 0;
    for (cell of cells) {
        cell.innerText = '';
    }
    for (row of grid) row.fill('');
    start = true;
    if (playMode == 1) {
        currMark = oMark;
    }
    if (playMode == 2) {
        (goFirstInp.checked) ? currMark = oMark : xMark;
    }
}

draw = () => {
    if (playMode == 1) {
        document.querySelector('#scoreFrnd').classList.add('drawDisplay');
        scoreP1.innerText = 'DRAW';
        scoreP2.classList.add('hide');
        setTimeout(() => {
            document.querySelector('#scoreFrnd').classList.remove('drawDisplay');
            scoreP1.innerText = player1 + ': ' + score1;
            scoreP2.classList.remove('hide');
        }, 1000);
    }
    if (playMode == 2) {
        document.querySelector('#scoreComp').classList.add('drawDisplay');
        scoreP.innerText = 'DRAW';
        scoreC.classList.add('hide');
        setTimeout(() => {
            document.querySelector('#scoreComp').classList.remove('drawDisplay');
            scoreP.innerText = player + ': ' + score1;
            scoreC.classList.remove('hide');
        }, 1000);
    }
}

victoryLine = () => {
    const line = document.getElementById(victLine);
    line.classList.remove('hide');
    setTimeout(() => {
        line.classList.add('disappear');
    }, 1200);
    setTimeout(() => {
        line.classList.add('hide');
        line.classList.remove('disappear');
    }, 1700);
}

isGridEmpty = () => {
    return grid.flat().every((val, newGrid) => val === newGrid[0]);
}