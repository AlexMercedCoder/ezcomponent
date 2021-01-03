//////////////////////
// captureProps
//////////////////////

const captureProps = (element) => {
  const att = [...element.attributes];
  const entries = att.map((value) => {
    return [value.name, value.value];
  });

  return Object.fromEntries(entries);
};

///////////////////////
// ezcomponent
///////////////////////

const defaultConfig = {
  name: "my-component",
  info: {},
  initial: (info, props, element) => {},
  styles: (info, props, element) => {},
  postInitial: (info, props, element) => {},
  preRender: (info, props, element) => {},
  render: (info, props, element) => "",
  postRender: (info, props, element) => {},
  disconnect: (info, props, element) => {},
};

const ezcomponent = (theconfig) => {
  const config = { ...defaultConfig, ...theconfig };

  class TheComponent extends HTMLElement {
    constructor() {
      super();
      this.info = config.info;
      this.props = captureProps(this);
      this.attachShadow({ mode: "open" });
      config.initial(this.info, this.props, this);
      this.build();
      config.postInitial(this.info, this.props, this);
    }

    build() {
      this.props = captureProps(this);
      config.preRender(this.info, this.props, this);
      this.shadowRoot.innerHTML = `<style>${config.styles(
        this.info,
        this.props,
        this
      )}</style>${config.render(this.info, this.props, this)}`;
      config.postRender(this.info, this.props, this);
    }

    update(newInfo) {
      this.info = { ...this.info, ...newInfo };
      this.build();
    }

    disconnectedCallback() {
      config.disconnect(this.info, this.props, this);
    }
  }

  customElements.define(config.name, TheComponent);
};

export default ezcomponent