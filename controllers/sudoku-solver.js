class SudokuSolver {

  validate(puzzleString) {
    if (!puzzleString) return { error: 'Required field missing' };
    if (puzzleString.length !== 81) return { error: 'Expected puzzle to be 81 characters long' };
    if (/[^1-9.]/.test(puzzleString)) return { error: 'Invalid characters in puzzle' };
    return { valid: true };
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const rowIndex = row.charCodeAt(0) - 65;
    const rowValues = puzzleString.slice(rowIndex * 9, rowIndex * 9 + 9);
    return !rowValues.includes(value);
  }

  checkColPlacement(puzzleString, row, column, value) {
    const colIndex = column - 1;
    for (let r = 0; r < 9; r++) {
      if (puzzleString[r * 9 + colIndex] === value) return false;
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const rowIndex = row.charCodeAt(0) - 65;
    const colIndex = column - 1;

    const startRow = Math.floor(rowIndex / 3) * 3;
    const startCol = Math.floor(colIndex / 3) * 3;

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const idx = (startRow + r) * 9 + (startCol + c);
        if (puzzleString[idx] === value) return false;
      }
    }
    return true;
  }

  solve(puzzleString) {
    const validation = this.validate(puzzleString);
    if (validation.error) return validation;

    let board = puzzleString.split('');
    const solveRecursive = () => {
      const emptyIndex = board.indexOf('.');
      if (emptyIndex === -1) return true;

      const row = Math.floor(emptyIndex / 9);
      const col = emptyIndex % 9;

      for (let num = 1; num <= 9; num++) {
        const value = num.toString();
        const rowLetter = String.fromCharCode(65 + row);
        if (
          this.checkRowPlacement(board.join(''), rowLetter, col + 1, value) &&
          this.checkColPlacement(board.join(''), rowLetter, col + 1, value) &&
          this.checkRegionPlacement(board.join(''), rowLetter, col + 1, value)
        ) {
          board[emptyIndex] = value;
          if (solveRecursive()) return true;
          board[emptyIndex] = '.';
        }
      }
      return false;
    };

    const solved = solveRecursive();
    if (!solved) return { error: 'Puzzle cannot be solved' };

    return { solution: board.join('') };
  }
}

module.exports = SudokuSolver;

