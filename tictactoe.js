const readline = require('readline');

class Board {
  constructor(n = 3) {
    this.board = this.createBoard(n);
  }

  createBoard(n) {
    const board = [];
    for (let i = 0; i < Math.pow(n, 2); i++) {
      const newObj = {};
      newObj[i] = '#';
      board.push(newObj);
    }
    return board;
  }

  visualizeBoard() {
    const length = this.board.length;

    console.log('This is a template of the board:\n');
    for (let i = 0; i < length; i += 3) {
      console.log(`${i}|${i + 1}|${i + 2}`);
    }

    console.log('\nThis is the current state of the board:\n');
    for (let i = 0; i < length; i += 3) {
      console.log(
        `${this.board[i][i]}|${this.board[i + 1][i + 1]}|${
          this.board[i + 2][i + 2]
        }`,
      );
    }
  }
}

class TicTacToe {
  constructor(o = 'O', x = 'X') {
    this.o = o;
    this.x = x;
    this.board = new Board();
    this.currentTurn = 'O';
    this.numOfMoves = 0;
  }

  start() {
    const board = this.board.board;
    console.log('\nWelcome to tictactoe!\n');
    console.log('-----------------------------');
    this.board.visualizeBoard();
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const question = (prompt, handler) => {
      rl.question(prompt, input => {
        if (handler(input) !== false) {
          question(prompt, handler);
        } else {
          rl.close();
        }
      });
    };

    question(`\nPlease input 0-8 > `, input => {
      if (
        input === '0' ||
        input === '1' ||
        input === '2' ||
        input === '3' ||
        input === '4' ||
        input === '5' ||
        input === '6' ||
        input === '7' ||
        input === '8'
      ) {
        console.log(`You inputted ${input}\n`);
        if (board[input][input] === '#') {
          board[input][input] = this.currentTurn;
          this.board.visualizeBoard();
          if (this.checkWinner()) {
            console.log(`${this.currentTurn} won the game!`);
            return false;
          }
          this.numOfMoves += 1;
          if (this.checkTie()) {
            console.log(`It's a tie :(`);
            return false;
          }
          this.switchTurns();
        } else {
          console.log('Already placed!');
        }
      } else {
        console.log('Invalid option');
      }
    });
  }

  checkWinner() {
    let winner = false;
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winConditions.length; i++) {
      for (let j = 0; j < winConditions[i].length; j += 3) {
        let first = this.board.board[winConditions[i][j]][winConditions[i][j]];
        let second = this.board.board[winConditions[i][j + 1]][winConditions[i][j + 1]];
        let third = this.board.board[winConditions[i][j + 2]][winConditions[i][j + 2]];
        if (first === 'O' && second === 'O' && third === 'O') {
          winner = true;
        }
        if (first === 'X' && second === 'X' && third === 'X') {
          winner = true;
        }
      }
    }
      return winner;
  }

  checkTie() {
    return this.numOfMoves === 9;
  }

  switchTurns() {
    return this.currentTurn === 'O'
      ? (this.currentTurn = 'X')
      : (this.currentTurn = 'O');
  }
}

const tictactoe = new TicTacToe();
tictactoe.start();
