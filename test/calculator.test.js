const test = require('node:test');
const assert = require('node:assert');
const { evaluate } = require('../calculator');

test('basic operations', () => {
  assert.equal(evaluate('2+3*4'), 14);
  assert.equal(evaluate('10/2-3'), 2);
});

test('factorial', () => {
  assert.equal(evaluate('3!'), 6);
});

test('trigonometric', () => {
  assert.equal(evaluate('sin(0)'), 0);
  assert.ok(Math.abs(evaluate('sin(90)', { degree: true }) - 1) < 1e-10);
  assert.equal(evaluate('cos(0)'), 1);
  assert.ok(Math.abs(evaluate('asin(1)') - Math.PI / 2) < 1e-10);
});

test('additional functions', () => {
  assert.equal(evaluate('abs(-5)'), 5);
  assert.equal(evaluate('nPr(5,2)'), 20);
  assert.equal(evaluate('nCr(5,2)'), 10);
  const r = evaluate('rand()');
  assert.ok(r >= 0 && r <= 1);
});
