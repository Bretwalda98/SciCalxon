function evaluate(expression, { degree = false } = {}) {
  const trig = fn => x => (degree ? fn(x * Math.PI / 180) : fn(x));
  const sin = trig(Math.sin);
  const cos = trig(Math.cos);
  const tan = trig(Math.tan);
  const asin = trig(Math.asin);
  const acos = trig(Math.acos);
  const atan = trig(Math.atan);

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
  expr = expr.replace(/ln\(/g, 'Math.log(');
  expr = expr.replace(/log\(/g, 'Math.log10(');
  expr = expr.replace(/√\(/g, 'Math.sqrt(');
  expr = expr.replace(/abs\(/g, 'Math.abs(');
  expr = expr.replace(/nPr\(/g, 'nPr(');
  expr = expr.replace(/nCr\(/g, 'nCr(');

  return Function('sin,cos,tan,asin,acos,atan,factorial,nPr,nCr,rand,Math', '"use strict";return (' + expr + ')')(sin, cos, tan, asin, acos, atan, factorial, nPr, nCr, rand, Math);
}

module.exports = { evaluate };
