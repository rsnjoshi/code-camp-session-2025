import View from "./../../view/index";
import template from "./template";
import Clock from "../clock";
import "./styles.css";

export default class Calculator extends View {
  constructor(data, options) {
    super(data, options);
  }

  initialize(data, options) {
    console.log("Calculator is initializing.....!!");
    this.options = options;
    this.currentValue = "0";
    this.accumulator = 0;
    this.operator = null;
    this.previousOperator = null;
    this.maxDigit = 17;
  }

  getAttributes() {
    return {
      id: "calculator",
      class: "awesome_calculator",
    };
  }

  getEvents() {
    return {
      ".calculator__body-key": {
        click: this.handleKeyClick,
      },
    };
  }

  getTemplateContext() {
    return {
      brandName: "CASIO",
      digitCount: "17 Digits",
    };
  }

  getTemplate() {
    return template;
  }

  onBeforeRender() {
    console.log("Rendering calculator component...");
  }

  onRender() {
    console.log("Calulator rendered");
    this.calculatorDisplay = this.$el.querySelector(
      ".calculator__display-output"
    );
    this.branding = this.$el.querySelector(
      ".calculator__display-branding-info"
    );

    if (this.options.displayClock) {
      this.displayClock();
    }
  }

  displayClock() {
    const clock = new Clock(
      {
        second: 10,
        minute: 18,
        hour: 22,
      },
      {
        areButtonsVisible: false,
      }
    );
    clock.render(this.branding);
  }

  handleKeyClick(event) {
    const action = Object.keys(event.target.dataset)[0];
    const value = Object.values(event.target.dataset)[0];

    switch (action) {
      case "value":
        this.handleValue(value);
        break;
      case "operator":
        this.handleOperator(value);
        break;
      case "action":
        this.handleAction(value);
        break;
      default:
        this.handlePrefix(value);
        break;
    }
  }

  handleValue(value) {
    if (this.operator) {
      this.previousOperator = this.operator;
      this.operator = null;
      this.accumulator = +this.currentValue;
      this.currentValue = value;
      this.refreshDisplay();
      return;
    }

    if (this.currentValue.length >= this.maxDigit) return;

    if (!this.checkDecimalValidity(value)) return;

    if (this.currentValue === "0") this.currentValue = value;
    else this.currentValue += value;

    this.refreshDisplay();
  }

  handleOperator(new_operator) {
    if (this.hasOperatorChanged(new_operator)) {
      if (this.previousOperator) {
        this.calculateValue();
        this.refreshDisplay();
        this.previousOperator = null;
      }
      this.operator = new_operator;
    }
  }

  handleAction(action) {
    switch (action) {
      case "clear":
        this.hardReset();
        this.refreshDisplay();
        break;
      case "equals":
        this.finalCalculation();
        this.refreshDisplay();
        break;
      default:
        break;
    }
  }

  handlePrefix() {
    this.handleValue(".");
  }

  calculateValue() {
    switch (this.previousOperator) {
      case "add":
        this.accumulator = this.round(
          (this.accumulator += +this.currentValue),
          2
        );
        break;
      case "subtract":
        this.accumulator = this.round(
          (this.accumulator -= +this.currentValue),
          2
        );
        break;
      case "multiply":
        this.accumulator = this.round(
          (this.accumulator *= +this.currentValue),
          2
        );
        break;
      case "divide":
        this.accumulator = this.round(
          (this.accumulator /= +this.currentValue),
          2
        );
        break;
      default:
        break;
    }
    this.currentValue = this.accumulator.toString();
  }

  finalCalculation() {
    if (this.previousOperator) {
      this.calculateValue();
      this.previousOperator = null;
    }
  }

  refreshDisplay() {
    this.calculatorDisplay.textContent = "";
    setTimeout(() => {
      this.calculatorDisplay.textContent = this.currentValue;
    }, 100);
  }

  hardReset() {
    this.currentValue = "0";
    this.accumulator = 0;
    this.operator = null;
    this.previousOperator = null;
  }

  hasOperatorChanged(new_operator) {
    return this.operator !== new_operator;
  }

  checkDecimalValidity(value) {
    if (value === ".") {
      return true;
    }
    if (this.currentValue.split("").indexOf(".") !== -1) {
      return false;
    }
    return true;
  }

  round(value, place) {
    const factor = 10 ** place;
    return Math.round(value * factor) / factor;
  }
}
