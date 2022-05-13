# Window Library for JS. (Alpha ver.)

## Usage (with examples):

##### - Import the Window class.

```js
import Window from "./window.js";
```

##### - Create a Window.

In the current version of this library, you can create a Window like this:

```js
// new Window(window-width, window-height, 'title');
// If the sizes of the window are smaller than the minimum, then the minimum value will be the default.
const exampleWindow = new Window(1, 1, "Example Title v1");
// exampleWindow is a Window with a title of 'Example Title v1' and a size of 275x200 pixels.
```

![Alt text](/demo/screenshot1.png?raw=true "Screenshot")

In the future **(not implemented yet)** the Window class will take an object with various information:

```js
const exampleWindow2 = new Window({
  title: "Example Title v2",
  size: {
    width: 1280,
    height: 720,
  },
  position: {
    //starting position
    top: 0, //y
    left: 0, //x
  },
  //etc.
});
```

The options object and its values will be optional.

##### - Features:

- Moving the window
- Resizing the Window (borders and corners)
- Close button
- Selecting a Window (by clicking, the window comes forward (z-index))
- Maximize button (Maximizing works with double-click on the topBar too)

##### - Future implementation:

- information object in the new Window();
- Custom scroller (bottom and right side)
- add a Content method to implement HTML, CSS, and JS in the Window
- Cleaning the code, because it's ugly af :grin:

##### - Known bugs:

- Cursor icon bug when resizing
