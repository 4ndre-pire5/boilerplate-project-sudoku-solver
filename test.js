const SudokuSolver = require('./controllers/sudoku-solver');
const solver = new SudokuSolver();

const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';

console.log("validate:", solver.validate(puzzle));
console.log("checkRowPlacement:", solver.checkRowPlacement(puzzle, 'A', 3, '4'));
console.log("checkColPlacement:", solver.checkColPlacement(puzzle, 'A', 3, '4'));
console.log("checkRegionPlacement:", solver.checkRegionPlacement(puzzle, 'A', 3, '4'));
console.log("solve:", solver.solve(puzzle));
