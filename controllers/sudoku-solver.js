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
    for (let r = 0; r < 9; r++){
      if (puzzleString[r * 9 + colIndex] === value) return false;
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const rowIndex = row.charCodeAt(0) - 65;
    const colIndex = column - 1;

    const startRow = Math.floor(rowIndex / 3) * 3;
    const startCol = Math.floor(colIndex / 3) * 3;

    for (let r = 0; r < 3; r++){
      for (let c = 0; c < 3; c++) {
        const idx = (startRow + r) * 9 + (startCol + c);
        if (puzzleString[idx] === value) return false;
      }
    }
    return true;
  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

