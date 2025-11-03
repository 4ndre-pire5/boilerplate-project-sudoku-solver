const chai = require('chai');
const assert = chai.assert;
const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {

  const validPuzzle =
    '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
  const invalidChars =
    '1.5..2.84..63.12.7.2..5.....9..1....0.2.3674.3.7.2..9.47...8..1..16....926914.37.';
  const shortPuzzle =
    '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.....9..7...6';
  const unsolvable =
    '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.....9..7...6...9..2....6.7.8..6.3.7.9.1';

  // 1️⃣
  test('Logic handles a valid puzzle string of 81 characters', () => {
    assert.deepEqual(solver.validate(validPuzzle), { valid: true });
  });

  // 2️⃣
  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
    assert.deepEqual(solver.validate(invalidChars), { error: 'Invalid characters in puzzle' });
  });

  // 3️⃣
  test('Logic handles a puzzle string that is not 81 characters in length', () => {
    assert.deepEqual(solver.validate(shortPuzzle), { error: 'Expected puzzle to be 81 characters long' });
  });

  // 4️⃣
  test('Logic handles a valid row placement', () => {
    assert.isTrue(solver.checkRowPlacement(validPuzzle, 'A', 2, '3'));
  });

  // 5️⃣
  test('Logic handles an invalid row placement', () => {
    assert.isFalse(solver.checkRowPlacement(validPuzzle, 'A', 2, '1'));
  });

  // 6️⃣
  test('Logic handles a valid column placement', () => {
    assert.isTrue(solver.checkColPlacement(validPuzzle, 'A', 2, '3'));
  });

  // 7️⃣
  test('Logic handles an invalid column placement', () => {
    assert.isFalse(solver.checkColPlacement(validPuzzle, 'A', 2, '2'));
  });

  // 8️⃣
  test('Logic handles a valid region (3x3 grid) placement', () => {
    assert.isTrue(solver.checkRegionPlacement(validPuzzle, 'A', 2, '3'));
  });

  // 9️⃣
  test('Logic handles an invalid region (3x3 grid) placement', () => {
    assert.isFalse(solver.checkRegionPlacement(validPuzzle, 'A', 2, '2'));
  });

  // 🔟
  test('Valid puzzle strings pass the solver', () => {
    const solution = solver.solve(validPuzzle);
    assert.property(solution, 'solution');
    assert.equal(solution.solution.length, 81);
  });

  // 1️⃣1️⃣
  test('Invalid puzzle strings fail the solver', () => {
    const result = solver.solve(invalidChars);
    assert.deepEqual(result, { error: 'Invalid characters in puzzle' });
  });

  // 1️⃣2️⃣
  test('Solver returns the expected solution for an incomplete puzzle', () => {
    const expectedSolution =
      '135762984946381257728459613694517832812936745357824196473298561581673429269145378';
    const result = solver.solve(validPuzzle);
    assert.deepEqual(result.solution, expectedSolution);
  });
});
