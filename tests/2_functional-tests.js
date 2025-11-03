const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server'); // ajuste para o caminho do seu server
chai.use(chaiHttp);

suite('Functional Tests', () => {

  const validPuzzle =
    '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
  const invalidCharsPuzzle =
    '1.5..2.84..63.12.7.2..5.....9..1....0.2.3674.3.7.2..9.47...8..1..16....926914.37.';
  const shortPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.....9..7...6';
  const unsolvablePuzzle =
    '115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';

  // 1️⃣ Solve a puzzle with valid puzzle string
  test('Solve a puzzle with valid puzzle string: POST /api/solve', (done) => {
    chai.request(server)
      .post('/api/solve')
      .send({ puzzle: validPuzzle })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'solution');
        assert.equal(res.body.solution.length, 81);
        done();
      });
  });

  // 2️⃣ Solve a puzzle with missing puzzle string
  test('Solve a puzzle with missing puzzle string: POST /api/solve', (done) => {
    chai.request(server)
      .post('/api/solve')
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'Required field missing' });
        done();
      });
  });

  // 3️⃣ Solve a puzzle with invalid characters
  test('Solve a puzzle with invalid characters: POST /api/solve', (done) => {
    chai.request(server)
      .post('/api/solve')
      .send({ puzzle: invalidCharsPuzzle })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'Invalid characters in puzzle' });
        done();
      });
  });

  // 4️⃣ Solve a puzzle with incorrect length
  test('Solve a puzzle with incorrect length: POST /api/solve', (done) => {
    chai.request(server)
      .post('/api/solve')
      .send({ puzzle: shortPuzzle })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'Expected puzzle to be 81 characters long' });
        done();
      });
  });

  // 5️⃣ Solve a puzzle that cannot be solved
  test('Solve a puzzle that cannot be solved: POST /api/solve', (done) => {
    chai.request(server)
      .post('/api/solve')
      .send({ puzzle: unsolvablePuzzle })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'Puzzle cannot be solved' });
        done();
      });
  });

  // 6️⃣ Check a puzzle placement with all fields
  test('Check a puzzle placement with all fields: POST /api/check', (done) => {
    chai.request(server)
      .post('/api/check')
      .send({ puzzle: validPuzzle, coordinate: 'A2', value: '3' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'valid');
        assert.isTrue(res.body.valid);
        done();
      });
  });

  // 7️⃣ Check a puzzle placement with single placement conflict
  test('Check a puzzle placement with single placement conflict: POST /api/check', (done) => {
    chai.request(server)
      .post('/api/check')
      .send({ puzzle: validPuzzle, coordinate: 'A2', value: '4' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isFalse(res.body.valid);
        assert.deepEqual(res.body.conflict, ['row']);
        done();
      });
  });

  // 8️⃣ Check a puzzle placement with multiple placement conflicts
  test('Check a puzzle placement with multiple placement conflicts: POST /api/check', (done) => {
    chai.request(server)
      .post('/api/check')
      .send({ puzzle: validPuzzle, coordinate: 'A2', value: '2' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isFalse(res.body.valid);
        assert.includeMembers(res.body.conflict, ['row', 'column']);
        done();
      });
  });

  // 9️⃣ Check a puzzle placement with all placement conflicts
  test('Check a puzzle placement with all placement conflicts: POST /api/check', (done) => {
    chai.request(server)
      .post('/api/check')
      .send({ puzzle: validPuzzle, coordinate: 'A2', value: '2' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isFalse(res.body.valid);
        assert.includeMembers(res.body.conflict, ['row', 'column', 'region']);
        done();
      });
  });

  // 10️⃣ Check a puzzle placement with missing required fields
  test('Check a puzzle placement with missing required fields: POST /api/check', (done) => {
    chai.request(server)
      .post('/api/check')
      .send({ puzzle: validPuzzle, value: '3' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'Required field(s) missing' });
        done();
      });
  });

  // 11️⃣ Check a puzzle placement with invalid characters
  test('Check a puzzle placement with invalid characters: POST /api/check', (done) => {
    chai.request(server)
      .post('/api/check')
      .send({ puzzle: invalidCharsPuzzle, coordinate: 'A2', value: '3' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'Invalid characters in puzzle' });
        done();
      });
  });

  // 12️⃣ Check a puzzle placement with incorrect length
  test('Check a puzzle placement with incorrect length: POST /api/check', (done) => {
    chai.request(server)
      .post('/api/check')
      .send({ puzzle: shortPuzzle, coordinate: 'A2', value: '3' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'Expected puzzle to be 81 characters long' });
        done();
      });
  });

  // 13️⃣ Check a puzzle placement with invalid placement coordinate
  test('Check a puzzle placement with invalid placement coordinate: POST /api/check', (done) => {
    chai.request(server)
      .post('/api/check')
      .send({ puzzle: validPuzzle, coordinate: 'Z9', value: '3' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'Invalid coordinate' });
        done();
      });
  });

  // 14️⃣ Check a puzzle placement with invalid placement value
  test('Check a puzzle placement with invalid placement value: POST /api/check', (done) => {
    chai.request(server)
      .post('/api/check')
      .send({ puzzle: validPuzzle, coordinate: 'A2', value: '0' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'Invalid value' });
        done();
      });
  });

});
