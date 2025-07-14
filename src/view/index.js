class View {
  constructor(data, options) {
    this.data = data;
    this.options = options;
    this.$el = null;
    this.initialize();
  }

  initialize() {
    // Initialization logic can be added here
  }

  getAttributes() {
    return {};
  }

  getEvents() {
    return {
      ".calculator__body-key": {
        click: function () {
          console.log("hello");
        },
      },
      ".calculator": {
        hover: function () {
          console.log(this);
          console.log("calculator hovered");
        },
      },
    };
  }

  getTemplateContext() {
    return {};
  }

  getTemplate() {
    return (context) => {
      return "";
    };
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
}
