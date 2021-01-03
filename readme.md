# EZComponent

![EZComponent](https://i.imgur.com/QCKq3Jks.jpg)

EZComponent is a library for building web components created by Alex Merced of AlexMercedCoder.com/devNursery.com, creator of other web component based libraries like MercedUI, AMPonent, funComponent and more. 


## Installation

npm 

```bash
npm install ezcomponent
```

ESModule URL (for deno or browser)

```
https://res.cloudinary.com/dithdroai/raw/upload/v1609642167/libraries/ezcompmodule_p8vfdl.js
```

Non-Module URL (for standard script tags)

```
https://res.cloudinary.com/dithdroai/raw/upload/v1609644264/libraries/ezcomp_c67pm6.js
```


## How It Works

You create components by using the ezcomponent function and passing it a config object. Here is an example...

```js
ezcomponent({
    name: "my-component",
    render: (info, props, component) => `<h1>${props.hello}</h1>`
})

```

then can just be used in your html like so!

```html

<body>
    <my-component hello="Hello World"></my-component>
</body>

```

## The Config Object

The ezcomponent function takes an object as its one argument. Below are the properties that can be passed in.

Some terminology

- **info** objective with reactive data to use in your component (like state in react), can be updated using the component.update function which then triggers another render of the components template.

- **props** information passed to the component in the form of tag attributes

- **component** a reference to the component instance passed into all the methods definable in the config object

### name

This is the name of the component, must be kebab case ("kebab-case").

### render

This is a function that must return a template string, this is essentially the template the component will render.

**signature**

```(info, props, component) => "<h1>This is the template</h1>"```

### styles

This is a function that must return a string of css styles to apply to your component

**signature**

```js
(info, props, component) => `
h1 {
    color: red;
}
`
```

### initial

This is a function that runs on the initial mounting of the component

**signature**

```js
(info, props, component) => {
    console.log("This happens when the component is initially rendered")
}
```

### postInitial

This is a function that runs after the initial render

**signature**

```js
(info, props, component) => {
    console.log("This happens after the component is initially rendered")
}
```

### preRender

This is a function that runs before every render

**signature**

```js
(info, props, component) => {
    console.log("This happens before every render")
}
```


### postRender

This is a function that runs after every render

**signature**

```js
(info, props, component) => {
    console.log("This happens after every render")
}
```

### disconnect

This is a function that runs when the component is removed from the screen

**signature**

```js
(info, props, component) => {
    console.log("This happens when component is removed")
}
```

## Lifecycle

When a component is loaded initially this is the order that things

- info is set
- props is set
- initial is run
- preRender is run
- render is run
- postRender is run
- postInitial

When the component.update function is used to update the info here is what happens

- info is updated
- props is updated
- preRender is run
- render is run
- postRender is run

## Design Tips

- Any methods you want to add to the component should be defined in initial so they are available to the other methods.

- Any event listeners should be configured in postRender so the event listener are re-established after re-rendering.

## Example for Reference

```js
      ezcomponent({
        name: "my-component",
        info: {
          count: 1,
        },
        styles: (info, props, el) => {
          return `
          button {
              background-color: red;
              color: white;
              `;
        },
        render: (info, props, el) => {
          return `<button>${info.count}</button>`;
        },
        initial: (info, props, el) => {
          console.log("initial");
        },
        preRender: (info, props, el) => {
          console.log("pre-render");
        },
        postRender: (info, props, el) => {
          console.log("post-render");
          el.shadowRoot
            .querySelector("button")
            .addEventListener("click", () => {
              el.update({ count: info.count + 1 });
            });
        },
        disconnect: (info, props, el) => {
          console.log("disconnect");
        },
        postInitial: (info, props, el) => {
          console.log("postInitial");
        },
      });

```