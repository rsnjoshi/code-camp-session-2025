import "./styles.css";
import Calculator from "./components/calculator/index";
import Clock from "./components/clock";

const root = document.getElementById("root");

const clock = new Clock(null, {
  areButtonsVisible: true,
});

const calculator = new Calculator(null, {
  displayClock: true,
});

calculator.render(root);
// clock.render(root);
