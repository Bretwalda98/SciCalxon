const assert = require('assert');
const { evaluateExpression } = require('../evaluate');

function near(actual, expected, eps = 1e-9) {
  assert.ok(Math.abs(actual - expected) < eps, `expected ${expected} got ${actual}`);
}

near(evaluateExpression('2+2'), 4);
near(evaluateExpression('5!'), 120);
near(evaluateExpression('sqrt(9)'), 3);
near(evaluateExpression('sin(30)', {isDegree: true}), 0.5);
near(evaluateExpression('cos(0)'), 1);
near(evaluateExpression('log(100)'), 2);
near(evaluateExpression('ln(e)'), 1);
near(evaluateExpression('2^3'), 8);
near(evaluateExpression('50%'), 0.5);
near(evaluateExpression('1+2*3'), 7);
console.log('All tests passed');
