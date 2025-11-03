const Solver = require('./controllers/sudoku-solver');
const solver = new Solver();

// Cole aqui o mesmo validPuzzle que seu teste usa:
// const validPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';

// const row = 'A';
// const col = 2;
// const value = '8'; // experimente também value = 8

// console.log('puzzle length:', validPuzzle.length);
// console.log('Column:', col, 'Row:', row, 'Value:', value, typeof value);

// imprima todos os valores da coluna e seus índices
// const colIndex = col - 1;
// for (let r = 0; r < 9; r++) {
//   const idx = r * 9 + colIndex;
//   console.log(`r=${r} idx=${idx} val='${validPuzzle[idx]}'`);
// }

// verificação com a função atual
// console.log('checkColPlacement (original):', solver.checkColPlacement(validPuzzle, row, col, value));

const puzzle = '1.5..2.84..63.12.7.2..5....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
const colIndex = 1;
for (let i = 0; i < 9; i++) {
  console.log(i*9 + colIndex, puzzle[i*9 + colIndex]);
}
