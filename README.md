# SciCalx

**Web‑based Casio‑style scientific calculator** built with plain HTML, CSS, and JavaScript.

---

## 🔗 Demo

A live version is available via GitHub Pages:

```
https://bretwalda98.github.io/scicalx/
```

---

## ⚙️ Features

* **Basic operations**: Addition, subtraction, multiplication, division
* **Advanced functions**: Exponentiation (xʸ), square root, percentage, factorial
* **Trigonometry**: sin, cos, tan with RAD/DEG mode toggle
* **Logarithms**: Natural log (ln), base‑10 log (log)
* **Constants**: π (pi), e (Euler’s number)
* **Parentheses**: Nested expressions
* **ANS recall**: Reuse last result
* **Responsive UI**: Grid layout, color‑coded keys, styled display

---

## 📥 Installation

1. **Clone** this repository:

   ```bash
   git clone https://github.com/Bretwalda98/scicalx.git
   ```
2. **Open** the project folder and simply launch the HTML file:

   ```bash
   cd scicalx
   open index.html   # or just double‑click in your file browser
   ```

No build steps or dependencies required.

---

## 🚀 Usage

* Click or tap buttons just like a physical Casio calculator.
* Toggle between **RAD** (radian) and **DEG** (degree) modes for trigonometry.
* Press **ANS** to insert the last computed result into your current expression.
* **AC** clears all, **DEL** removes the last character.

---

## 🛠 Customization

The calculator is a single HTML file, `casio_calculator.html`. Both the styles
and the JavaScript logic live inside this file:

* **CSS** is defined in a `<style>` block near the top of the `<head>` section
  (around lines 8–73). This controls the grid layout, button colors and overall
  look of the calculator.
* **JavaScript** resides in a `<script>` block just before the closing
  `</body>` tag (around lines 160 onward). It handles button clicks, expression
  parsing and math functions.

To rearrange or add buttons, edit the markup inside the `<div class="buttons">`
element. Each `<button>` uses the `data-value` or `data-action` attributes so
that the script knows how to process clicks. Adding new buttons or changing the
grid layout only requires modifying this HTML section.

### Adding a textbook display

For formatted math (fractions, superscripts, etc.) you can use [KaTeX]. Include
the CDN links below **after** the existing `<style>` block and before the
calculator's `<script>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
```

Then update the JavaScript `updateDisplay` function to render the current
expression with `katex.render`. This allows a "textbook" style output while the
underlying math engine stays the same.

Dependencies required for the textbook display:

* **KaTeX** — used for typesetting mathematical expressions.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repo
2. Create a new branch (`git checkout -b feature/xxx`)
3. Commit your changes (`git commit -m "feat: add ..."`)
4. Push to the branch (`git push origin feature/xxx`)
5. Open a Pull Request

Please adhere to the existing code style and include tests where applicable.

---

## 📝 License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.
