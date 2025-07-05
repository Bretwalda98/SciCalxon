(function (global) {
  function factorial(n) {
    if (n < 0) return NaN;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  }

  function sanitize(expr) {
    expr = expr.replace(/\s+/g, '');
    const map = { '÷': '/', '×': '*', '−': '-', 'π': 'pi', '√': 'sqrt' };
    expr = expr.replace(/[÷×−π√]/g, m => map[m] || m);
    if (/[^0-9a-zA-Z+\-*/^%!().]/.test(expr)) throw new Error('Invalid characters');
    return expr;
  }

  function tokenize(expr) {
    const regex = /(pi|e|sqrt|sin|cos|tan|ln|log|\d*\.\d+|\d+|[()+\-*/^%!])/g;
    const tokens = expr.match(regex);
    if (!tokens || tokens.join('') !== expr) throw new Error('Invalid expression');
    return tokens;
  }

  const precedence = {
    'u-': 4,
    '^': 3,
    '*': 2,
    '/': 2,
    '+': 1,
    '-': 1,
    '!': 5,
    '%': 5
  };
  const right = { '^': true, 'u-': true };

  function toRPN(tokens) {
    const output = [];
    const stack = [];
    let prev = null;
    for (let token of tokens) {
      if (/^\d/.test(token) || token === 'pi' || token === 'e') {
        output.push(token);
      } else if (/^(sin|cos|tan|ln|log|sqrt)$/.test(token)) {
        stack.push(token);
      } else if (token === '(') {
        stack.push(token);
      } else if (token === ')') {
        while (stack.length && stack[stack.length - 1] !== '(') output.push(stack.pop());
        if (stack[stack.length - 1] === '(') stack.pop();
        if (stack.length && /^(sin|cos|tan|ln|log|sqrt)$/.test(stack[stack.length - 1])) output.push(stack.pop());
      } else if (/^[+\-*/^%!]$/.test(token)) {
        if (token === '-' && (prev === null || /^[+\-*/^!(]$/.test(prev))) token = 'u-';
        while (stack.length && /^[+\-*/^%!u-]$/.test(stack[stack.length - 1]) &&
          (precedence[stack[stack.length - 1]] > precedence[token] ||
           (precedence[stack[stack.length - 1]] === precedence[token] && !right[token]))) {
          output.push(stack.pop());
        }
        stack.push(token);
      }
      prev = token;
    }
    while (stack.length) output.push(stack.pop());
    return output;
  }

  function evaluateRPN(rpn, isDegree) {
    const stack = [];
    const trig = fn => x => isDegree ? fn(x * Math.PI / 180) : fn(x);
    for (let token of rpn) {
      if (/^\d/.test(token)) {
        stack.push(parseFloat(token));
      } else if (token === 'pi') {
        stack.push(Math.PI);
      } else if (token === 'e') {
        stack.push(Math.E);
      } else if (token === 'u-') {
        stack.push(-stack.pop());
      } else if (token === '!') {
        stack.push(factorial(stack.pop()));
      } else if (token === '%') {
        stack.push(stack.pop() / 100);
      } else if (/^[+\-*/^]$/.test(token)) {
        const b = stack.pop();
        const a = stack.pop();
        switch (token) {
          case '+': stack.push(a + b); break;
          case '-': stack.push(a - b); break;
          case '*': stack.push(a * b); break;
          case '/': stack.push(a / b); break;
          case '^': stack.push(Math.pow(a, b)); break;
        }
      } else if (/^(sin|cos|tan|ln|log|sqrt)$/.test(token)) {
        const a = stack.pop();
        switch (token) {
          case 'sin': stack.push(trig(Math.sin)(a)); break;
          case 'cos': stack.push(trig(Math.cos)(a)); break;
          case 'tan': stack.push(trig(Math.tan)(a)); break;
          case 'ln': stack.push(Math.log(a)); break;
          case 'log': stack.push(Math.log10(a)); break;
          case 'sqrt': stack.push(Math.sqrt(a)); break;
        }
      }
    }
    if (stack.length !== 1) throw new Error('Invalid expression');
    return stack[0];
  }

  function evaluateExpression(expr, options = {}) {
    const isDegree = !!options.isDegree;
    const sanitized = sanitize(expr);
    const tokens = tokenize(sanitized);
    const rpn = toRPN(tokens);
    return evaluateRPN(rpn, isDegree);
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { evaluateExpression };
  } else {
    global.evaluateExpression = evaluateExpression;
  }
})(typeof window !== 'undefined' ? window : globalThis);
