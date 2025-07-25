export default class View {
  constructor(data, options) {
    this.data = data;
    this.options = options;
    this.$el = null;
    this.initialize(data, options);
  }

  initialize(data, options) {
    // Initialization logic can be added here
  }

  getAttributes() {
    return {};
  }

  getEvents() {
    return {};
  }

  getTemplateContext() {
    return {};
  }

  getTemplate() {
    return (context) => {
      return "";
    };
  }

  onBeforeRender() {
    return;
  }

  onRender() {
    return;
  }

  render(el) {
    this.onBeforeRender();

    const block = document.createElement("div");
    block.innerHTML = this.getTemplate()(this.getTemplateContext());

    el.innerHTML = "";

    el.appendChild(block);

    this.$el = el.querySelector("div");

    this.attachAttributes();
    this.addDomEvents();

    this.onRender();
  }

  addDomEvents() {
    const events = this.getEvents();
    for (const [selector, eventMap] of Object.entries(events)) {
      for (const [event, handler] of Object.entries(eventMap)) {
        this.$el.querySelectorAll(selector).forEach((element) => {
          element.addEventListener(event, handler.bind(this));
        });
      }
    }
  }

  attachAttributes() {
    const attributes = this.getAttributes();
    for (const [key, value] of Object.entries(attributes)) {
      this.$el.setAttribute(key, value);
    }
  }
}
