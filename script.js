const puzzleContainer = document.getElementById('puzzle-container');
const startButton = document.querySelector('button:nth-of-type(1)');
const shuffleButton = document.querySelector('button:nth-of-type(2)');

const tiles = Array.from({ length: 9 }, (_, index) => index + 1);

function createPuzzle() {
    puzzleContainer.innerHTML = '';
    tiles.forEach(tile => {
        const div = document.createElement('div');
        div.classList.add('tile');
        div.textContent = tile;
        div.addEventListener('click', () => moveTile(tile));
        puzzleContainer.appendChild(div);
    });
}

function startGame() {
    createPuzzle();
    startButton.disabled = true;
}

function shuffle() {
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    createPuzzle();
    startButton.disabled = false;
}

function moveTile(tile) {
    const index = tiles.indexOf(tile);
    const emptyIndex = tiles.indexOf(9);
    const adjacentIndexes = [
        index - 1,
        index + 1,
        index - 3,
        index + 3
    ];
    
    if (adjacentIndexes.includes(emptyIndex)) {
        [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
        createPuzzle();
        checkWin();
    }
}

function checkWin() {
    if (tiles.every((tile, index) => tile === index + 1)) {
        alert('Congratulations! You solved the puzzle!');
    }
}
