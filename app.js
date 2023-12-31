const backArrow = '<i class="fa-solid fa-arrow-left"></i>';
const oMark = '<i class="fa-solid fa-o"></i>';
const xMark = '<i class="fa-solid fa-xmark"></i>';
let count = 0;
let playMode = 0;
let currMark = oMark;
const skip = document.querySelector('#skip');
const skipDiv = document.querySelector('.outerDivOfSkip');
const displayGrid = document.querySelector('#grid');
const cells = document.querySelectorAll('.cell');
const grid = [['', '', ''], ['', '', ''], ['', '', '']];
let start = false;
const frnd = document.querySelector('#frnd');
const playerInpFrnd = document.querySelector('#playerInpFrnd');
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
let cellMark = '';

frnd.addEventListener('click', () => {
    if (frnd.innerHTML != backArrow) {
        frnd.innerHTML = backArrow;
        comp.classList.add('hide');
        frnd.classList.add('frndToBack');
        p1.classList.remove('hide'); p2.classList.remove('hide'); 
        playerInpFrnd.classList.add('appear');
        skip.classList.remove('hide');
        skipDiv.classList.add('appear');
        playMode = 1; 
    }
    else {
        restartGame();
        playMode = 0;
        start = false;
        displayGrid.classList.remove('gridSlideFrnd');
        document.querySelector('#scoreFrnd').classList.remove('appear');
        scoreP1.classList.add('hide'); scoreP2.classList.add('hide');
        player1 = 'Player 1'; score1 = 0; player2 = 'Player 2'; score2 = 0;
        skipDiv.classList.remove('appear');
        skip.classList.add('hide');
        playerInpFrnd.classList.remove('appear');
        p1.classList.add('hide'); p2.classList.add('hide'); 
        p1.value = p2.value = ''; skip.innerText = 'SKIP';
        frnd.classList.remove('frndToBack');
        comp.classList.remove('hide');
        frnd.innerText = 'PLAY WITH A FRIEND';
    }    
});
comp.addEventListener('click', () => {
    if (comp.innerHTML != backArrow) {
        comp.innerHTML = backArrow;
        frnd.classList.add('hide');
        comp.classList.add('compToBack');
        p.classList.remove('hide');
        playerInpComp.classList.add('appear');
        skip.classList.remove('hide');
        skipDiv.classList.add('appear');
        playMode = 2; 
    }
    else {
        restartGame();
        playMode = 0;
        start = false;
        goFirstInpMarkCheck();
        displayGrid.classList.remove('gridSlideComp');
        goFirst.classList.add('hide');
        document.querySelector('#scoreComp').classList.remove('appear');
        scoreP.classList.add('hide'); scoreC.classList.add('hide');
        comp.classList.remove('compToBack1');
        player = 'Guest'; score1 = 0; score2 = 0;
        skipDiv.classList.remove('appear');
        skip.classList.add('hide');
        playerInpComp.classList.remove('appear');
        p.classList.add('hide');
        p.value = ''; skip.innerText = 'SKIP';
        comp.classList.remove('compToBack');
        frnd.classList.remove('hide');
        comp.innerText = 'PLAY AGAINST COMPUTER';
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
        scoreP1.innerHTML = player1 + ':&nbsp;&nbsp;&nbsp;' + score1; scoreP2.innerHTML = player2 + ':&nbsp;&nbsp;&nbsp;' + score2;
        p1.classList.add('hide'); p2.classList.add('hide'); 
        scoreP1.classList.remove('hide'); scoreP2.classList.remove('hide');
        document.querySelector('#scoreFrnd').classList.add('appear');
        displayGrid.classList.add('gridSlideFrnd');
    }
    if (playMode == 2) {
        if (skip.innerText == 'ENTER') {
            player = p.value;
        }
        scoreP.innerHTML = player + ':&nbsp;&nbsp;&nbsp;' + score1; scoreC.innerHTML = 'Computer:&nbsp;&nbsp;&nbsp;' + score2;
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
    (goFirstInp.checked) ? waitForCompMove = false : goFirstInpMarkUncheck();
}

goFirstInpMarkUncheck = () => {
    waitForCompMove = true;
    compMark = oMark; 
    goFirstInp.checked = false;
    displayGrid.classList.remove('gridSlideComp');
    slider.classList.remove('hide');
    slider.classList.add('shrink');
    let timeout = setTimeout(() => {
        disable();
        slider.classList.add('hide');
        displayGrid.classList.add('gridSlideComp');
        compMove();
    }, 1800);
    let i = 0;
    let interval = setInterval(() => {
        i++;
        if (goFirstInp.checked) {
            clearTimeout(timeout);
            clearInterval(interval);
        }
        if (i == 1800) clearInterval(interval);
    }, 1);
}

goFirstInpMarkCheck = () => {
    waitForCompMove = false;
    compMark = xMark;
    goFirstInp.checked = true;
    slider.classList.remove('shrink');
    slider.classList.add('hide');
    displayGrid.classList.add('gridSlideComp');
}

goFirst.addEventListener('click', (e) => {
    (goFirstInp.checked) ? goFirstInpMarkUncheck() : goFirstInpMarkCheck();
})

generateCell = () => {
    r = Math.floor(Math.random()*3); c = Math.floor(Math.random()*3);
    while (grid[r][c] !== '') {
        r = Math.floor(Math.random()*3); c = Math.floor(Math.random()*3);
    }
    return r.toString() + c.toString();
}

compMove = () => {
    const cellID = generateCell();
    const cell = document.getElementById(cellID);
    cell.innerHTML = cellMark = compMark;
    cell.classList.add('cellClick');
    setTimeout(() => {
        cell.classList.remove('cellClick');
        gridPush(cell, cellMark);
    }, 100);
}

for (let cell of cells) {
    const id = String(cell.id);
    const r = Number.parseInt(id[0]); 
    const c = Number.parseInt(id[1]);
    cell.addEventListener('mouseenter', () => {
        if (!start || cell.innerHTML !== '') return;
        if (playMode == 1) {
            cell.style.cursor = 'pointer';
            cell.classList.add('cellHover');
            cell.innerHTML = currMark;
        }
        else if (playMode == 2 && !waitForCompMove) {
            cell.style.cursor = 'pointer';
            cell.classList.add('cellHover');
            cell.innerHTML = (compMark == oMark) ? xMark : oMark;
        }
    })
    cell.addEventListener('mouseleave', () => {
        cell.style.cursor = 'default';
        cell.classList.remove('cellHover');
        if (playMode == 1) {
            if (grid[r][c] === '') {
                cell.innerHTML = '';
            }
        }
        else if (playMode == 2) {
            if (grid[r][c] === '' && !waitForCompMove) {
                cell.innerHTML = '';
            }
        }
    })
    cell.addEventListener('click', () => {
        if (!start || grid[r][c] !== '') return;
        cell.classList.remove('cellHover');
        if (playMode == 1){
            cell.innerHTML = cellMark = currMark;
            cell.classList.add('cellClick');
            setTimeout(() => {
                cell.classList.remove('cellClick');
                gridPush(cell, cellMark);
                currMark = (currMark == oMark) ? xMark : oMark;
            }, 100);
        }
        if (playMode == 2 && !waitForCompMove) {
            disable();
            cell.innerHTML = cellMark = (compMark === oMark) ? xMark : oMark;
            cell.classList.add('cellClick');
            waitForCompMove = true;
            setTimeout(() => {
                cell.classList.remove('cellClick');
                gridPush(cell, cellMark);
            }, 100);
        }
    })
}

gridPush = (cell) => {  
    const id = String(cell.id);
    const r = Number.parseInt(id[0]); 
    const c = Number.parseInt(id[1]);
    grid[r][c] = cellMark;
    count++;
    if (count < 5) {
        if (playMode == 2) {
            if (compMark !== cellMark) {
                setTimeout(() => {
                    compMove();
                }, 800);
            }
            else waitForCompMove = false;
        }
    }
    else {
        if (checkForWin(r, c)) {
            start = false;
            victoryLine();            
            setTimeout(() => {
                win(); 
            }, 1700);
        }
        else if (count == 9) {
            draw(); 
            setTimeout(() => {
                restartGame();
            }, 1000);
        }
        else if (playMode == 2) {
            if (compMark !== cellMark) {
                setTimeout(() => {
                    compMove();
                }, 800);
            }
            else waitForCompMove = false;
        }
    }
}

win = () => {
    if (playMode == 1) {
        if (cellMark == oMark) {
            scoreP1.classList.add('pointEarnShine'); score1++;
        } 
        else {
            scoreP2.classList.add('pointEarnShine'); score2++;
        }
        scoreP1.innerHTML = player1 + ':&nbsp;&nbsp;&nbsp;' + score1; 
        scoreP2.innerHTML = player2 + ':&nbsp;&nbsp;&nbsp;' + score2; 
        setTimeout(() => {
            (cellMark == oMark) ? scoreP1.classList.remove('pointEarnShine') : scoreP2.classList.remove('pointEarnShine');;
        }, 250);
    }
    else {
        if (compMark == oMark) {
            if (cellMark == oMark) {
                scoreC.classList.add('pointEarnShine'); score2++;
            }
            else {
                scoreP.classList.add('pointEarnShine'); score1++;
            }
            setTimeout(() => {
                (cellMark == oMark) ? scoreC.classList.remove('pointEarnShine') : scoreP.classList.remove('pointEarnShine');
            }, 250);
        }
        else {
            if (cellMark == oMark) {
                scoreP.classList.add('pointEarnShine'); score1++;
            }
            else {
                scoreC.classList.add('pointEarnShine'); score2++;
            }
            setTimeout(() => {
                (cellMark == oMark) ? scoreP.classList.remove('pointEarnShine') : scoreC.classList.remove('pointEarnShine');
            }, 250);
        }
        scoreP.innerHTML = player + ':&nbsp;&nbsp;&nbsp;' + score1; 
        scoreC.innerHTML = 'Computer:&nbsp;&nbsp;&nbsp;' + score2; 
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
    return 0 <= x && x <= 2 && 0 <= y && y <= 2 && grid[x][y] == cellMark;
}

restartGame = () => {
    count = 0;
    for (cell of cells) cell.innerText = '';
    for (row of grid) row.fill('');
    start = true;
    if (playMode == 1) currMark = oMark;
    if (playMode == 2) enable();
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