import "./styles.css";
import Calculator from "./components/calculator/index";

const calculator_roots = document.querySelectorAll(".calc");

calculator_roots.forEach((calc) => {
  const calculator = new Calculator();
  calculator.render(calc);
});
