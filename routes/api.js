'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body;

      if (!puzzle || !coordinate || !value) {
        return res.json({ error: 'Required field(s) missing' });
      }

      const validation = solver.validate(puzzle);
      if (validation.error) {
        return res.json({ error: validation.error });
      }

      // Verificar coordenada
      const match = coordinate.match(/^([A-I])([1-9])$/i);
      if (!match) {
        return res.json({ error: 'Invalid coordinate' });
      }

      const row = match[1].toUpperCase();
      const column = parseInt(match[2]);

      if (!/^[1-9]$/.test(value)) {
        return res.json({ error: 'Invalid value' });
      }

      const conflicts = [];
      if (!solver.checkRowPlacement(puzzle, row, column, value)) conflicts.push('row');
      if (!solver.checkColPlacement(puzzle, row, column, value)) conflicts.push('column');
      if (!solver.checkRegionPlacement(puzzle, row, column, value)) conflicts.push('region');

      if (conflicts.length > 0) {
        return res.json({ valid: false, conflict: conflicts });
      }

      return res.json({ valid: true });
    });

  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle } = req.body;
      if (!puzzle) return res.json({ error: 'Required field missing' });

      const validation = solver.validate(puzzle);
      if (validation.error) return res.json({ error: validation.error })

      const result = solver.solve(puzzle);
      return res.json(result);

    });
};
