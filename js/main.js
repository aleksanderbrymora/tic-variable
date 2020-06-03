let boardSize;
let isXTurn = true;
let board;
let showingResult = false;
let x = 0;
let o = 0;

const createBoard = () => {
	$('.box').remove();
	boardSize = parseInt($('input').val());
	const boardUI = $('#board');
	for (let i = 0; i < boardSize * boardSize; i++) {
		const newButton = $(`<div class="box" id="${i}"></div>`);
		newButton.click(() => {
			if (!showingResult) {
				if (board[i] === '') {
					board[i] = isXTurn ? 'x' : 'o';
					$(`#${i}`).addClass(isXTurn ? 'x' : 'o');
					const potentialWinner = checkWin();
					if (potentialWinner) {
						gameEnd(potentialWinner === 'x' ? 'Red' : 'Yellow');
					} else if (draw() === -1) {
						gameEnd();
					}
					isXTurn = !isXTurn;
				}
			}
		});
		boardUI.append(newButton);
	}
	boardUI.css('grid-template-columns', `repeat(${boardSize}, 1fr)`);
	boardUI.css('grid-template-rows', `repeat(${boardSize}, 1fr)`);
	board = new Array(boardSize * boardSize).fill('');
};

$('button').click(createBoard);

const checkWin = () => {
	console.clear();
	for (let i = 0; i < boardSize; i++) {
		let current = board[i * boardSize];
		if (current !== '') {
			// Checking rows
			const test =
				board
					.slice(boardSize * i, boardSize * (i + 1) + 1)
					.filter(x => x === current).length === boardSize;
			if (test) return current;
		}
		// Checking columns
		current = board[i];
		if (current !== '') {
			let counter = 0;
			for (let j = 0; j < boardSize; j++) {
				if (board[i + j * boardSize] === current) counter++;
			}
			if (counter === boardSize) return current;
		}
	}
	// checking diagonals
	let current = board[0];
	if (current !== '') {
		let counter = 0;
		for (let j = 0; j < boardSize; j++) {
			if (board[j * boardSize + j] === current) counter++;
		}
		if (counter === boardSize) return current;
	}

	current = board[boardSize - 1];
	if (current !== '') {
		let counter = 0;
		for (let j = 0; j < boardSize; j++) {
			const testDiagonal = boardSize * j + (boardSize - j) - 1;
			console.log({ testDiagonal });

			if (board[testDiagonal] === current) counter++;
		}
		if (counter === boardSize) return current;
	}
};

const reset = () => {
	board = new Array(boardSize * boardSize).fill('');
	$('.box').removeClass('x o');
};

const draw = () => board.indexOf('');

const gameEnd = winner => {
	showingResult = true;
	let text = '';
	if (draw() === -1) text = "It's a draw";
	else {
		text = `${winner} is a winner`;
		if (winner === 'Red') {
			x++;
			$('#x').text('Red: ' + x);
		} else {
			o++;
			$('#o').text('Yellow: ' + o);
		}
	}
	$('#winlose')
		.html(`<p id="winlose-text">${text}</p>`)
		.hide()
		.fadeIn()
		.delay(1000)
		.fadeOut(null, () => {
			showingResult = false;
			reset();
		});
};
