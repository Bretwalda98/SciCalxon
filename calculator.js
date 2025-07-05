function evaluate(expression, { degree = false } = {}) {
  const trig = fn => x => (degree ? fn(x * Math.PI / 180) : fn(x));
  const sin = trig(Math.sin);
  const cos = trig(Math.cos);
  const tan = trig(Math.tan);
  const asin = trig(Math.asin);
  const acos = trig(Math.acos);
  const atan = trig(Math.atan);
  const sinh = trig(Math.sinh);
  const cosh = trig(Math.cosh);
  const tanh = trig(Math.tanh);
  const asinh = trig(Math.asinh);
  const acosh = trig(Math.acosh);
  const atanh = trig(Math.atanh);

  const factorial = n => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  };

  const nPr = (n, r) => factorial(n) / factorial(n - r);
  const nCr = (n, r) => nPr(n, r) / factorial(r);
  const rand = () => Math.random();
  const randInt = (a, b) => {
    const min = Math.ceil(a);
    const max = Math.floor(b);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  let expr = String(expression);
  expr = expr.replace(/π/g, 'Math.PI');
  expr = expr.replace(/e/g, 'Math.E');
  expr = expr.replace(/(\d+(?:\.\d+)?)!/g, 'factorial($1)');
  expr = expr.replace(/(\d+(?:\.\d+)?|[A-Za-z]+)\^(\d+(?:\.\d+)?)/g, 'Math.pow($1,$2)');
  expr = expr.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-');
  expr = expr.replace(/%/g, '/100');
  expr = expr.replace(/sin\(/g, 'sin(');
  expr = expr.replace(/cos\(/g, 'cos(');
  expr = expr.replace(/tan\(/g, 'tan(');
  expr = expr.replace(/sinh\(/g, 'sinh(');
  expr = expr.replace(/cosh\(/g, 'cosh(');
  expr = expr.replace(/tanh\(/g, 'tanh(');
  expr = expr.replace(/asinh\(/g, 'asinh(');
  expr = expr.replace(/acosh\(/g, 'acosh(');
  expr = expr.replace(/atanh\(/g, 'atanh(');
  expr = expr.replace(/ln\(/g, 'Math.log(');
  expr = expr.replace(/log\(/g, 'Math.log10(');
  expr = expr.replace(/√\(/g, 'Math.sqrt(');
  expr = expr.replace(/abs\(/g, 'Math.abs(');
  expr = expr.replace(/nPr\(/g, 'nPr(');
  expr = expr.replace(/nCr\(/g, 'nCr(');
  expr = expr.replace(/randInt\(/g, 'randInt(');

  return Function('sin,cos,tan,asin,acos,atan,sinh,cosh,tanh,asinh,acosh,atanh,factorial,nPr,nCr,rand,randInt,Math',
    '"use strict";return (' + expr + ')')(sin, cos, tan, asin, acos, atan, sinh, cosh, tanh, asinh, acosh, atanh, factorial, nPr, nCr, rand, randInt, Math);
}

module.exports = { evaluate };
