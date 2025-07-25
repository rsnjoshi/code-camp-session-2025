import View from "../../view";
import template from "./template";
import "./styles.css";

export default class Clock extends View {
  initialize(data, options) {
    this.second = data && data.second ? data.second : 12;
    this.minute = data && data.minute ? data.minute : 12;
    this.hour = data && data.hour ? data.hour : 12;
    this.meridiem = data && data.meridiem ? data.meridiem : "AM";
    this.areButtonsVisible =
      options && options.areButtonsVisible ? options.areButtonsVisible : false;

    this.oscillator = null;
  }

  getAttributes() {
    return {
      class: "clock",
    };
  }

  getEvents() {
    return {
      ".reset": {
        click: this.reset,
      },
      ".start": {
        click: this.start,
      },
      ".stop": {
        click: this.stop,
      },
    };
  }

  getTemplateContext() {
    return {
      areButtonsVisible: this.areButtonsVisible,
    };
  }

  getTemplate() {
    return template;
  }

  update() {
    if (this.second > 59) {
      this.second = 0;
      this.minute += 1;
      if (this.minute > 59) {
        this.minute = 0;
        this.hour += 1;
        if (this.hour > 12) {
          this.hour = 1;
          if (this.meridiem === "AM") this.meridiem = "PM";
          else this.meridiem = "AM";
        }
      }
    } else {
      this.second += 1;
    }
    this.updateContent();
  }

  updateContent() {
    this.refreshDisplay(this.second, "second");
    this.refreshDisplay(this.minute, "minute");
    this.refreshDisplay(this.hour, "hour");
  }

  refreshDisplay(val, name) {
    const cont = this.$el.getElementsByClassName(name)[0];
    const meridiem = this.$el.getElementsByClassName("meridiem")[0];
    cont.innerText = val < 10 ? `0${val}` : val;
    meridiem.innerText = this.meridiem;
  }

  start() {
    if (this.oscillator) {
      return;
    }
    this.oscillator = setInterval(this.update.bind(this), 1000);
  }

  stop() {
    if (this.oscillator) {
      clearInterval(this.oscillator);
    }
    this.oscillator = null;
  }

  reset() {
    this.second = 0;
    this.minute = 0;
    this.hour = 12;
    this.meridiem = "AM";
    this.stop();
    this.updateContent();
  }

  onRender() {
    this.start();
  }
}
