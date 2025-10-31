class SudokuSolver {
  validate(puzzleString) {
    if (!puzzleString) return { error: 'Required field missing' };
    if (puzzleString.length !== 81) return { error: 'Expected puzzle to be 81 characters long' };
    if (/[^1-9.]/.test(puzzleString)) return { error: 'Invalid characters in puzzle' };
    return { valid: true };
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const rows = 'ABCDEFGHI';
    const rowIndex = rows.indexOf(row.toUpperCase());
    const start = rowIndex * 9;
    const end = start + 9;
  
    for (let i = start; i < end; i++) {
      if (puzzleString[i] === value) return false;
    }
  
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    const colIndex = column - 1;
  
    for (let i = 0; i < 9; i++) {
      if (puzzleString[i * 9 + colIndex] === value) {
        return false;
      }
    }
  
    return true;
  }
  
  checkRegionPlacement(puzzleString, row, column, value) {
    const rows = 'ABCDEFGHI';
    const rowIndex = rows.indexOf(row.toUpperCase());
    const colIndex = column - 1;
  
    const startRow = Math.floor(rowIndex / 3) * 3;
    const startCol = Math.floor(colIndex / 3) * 3;
  
    for (let r = startRow; r < startRow + 3; r++) {
      for (let c = startCol; c < startCol + 3; c++) {
        const idx = r * 9 + c;
        if (puzzleString[idx] === value) {
          return false;
        }
      }
    }
  
    return true;
  }
  
  solve(puzzleString) {
    const validation = this.validate(puzzleString);
    if (validation.error) return validation;

    let puzzle = puzzleString.split('');

    const solveRecursive = (index = 0) => {
      if (index >= 81) return true;
      if (puzzle[index] !== '.') return solveRecursive(index + 1);

      const row = 'ABCDEFGHI'[Math.floor(index / 9)];
      const col = (index % 9) + 1;

      for (let num = 1; num <= 9; num++) {
        const val = num.toString();
        const current = puzzle.join('');
        const canRow = this.checkRowPlacement(current, row, col, val);
        const canCol = this.checkColPlacement(current, row, col, val);
        const canReg = this.checkRegionPlacement(current, row, col, val);

        if (canRow && canCol && canReg) {
          puzzle[index] = val;
          if (solveRecursive(index + 1)) return true;
          puzzle[index] = '.';
        }
      }

      return false;
    };

    const solved = solveRecursive();
    return solved ? { solution: puzzle.join('') } : { error: 'Puzzle cannot be solved' };
  }
}

module.exports = SudokuSolver;
