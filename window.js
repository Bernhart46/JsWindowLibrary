"use strict";
import { maximizeIcon1, maximizeIcon2, closeIcon } from "./icons.js";

const root = document.getElementById("root");
let zIndex = 0;

class Window {
  #minWidth = 275;
  #minHeight = 200;
  constructor(
    WindowWidth = 275,
    WindowHeight = 200,
    WindowTitle = `title-${root.children.length}`
  ) {
    this.id = root.children.length;
    this.width = WindowWidth > this.#minWidth ? WindowWidth : this.#minWidth;
    this.height =
      WindowHeight > this.#minHeight ? WindowHeight : this.#minHeight;
    this.title = WindowTitle;
    this.createWindow();
    this.isMaximized = false;
    this.isMoving = false;
    this.isResizing = false;
    this.position = {
      top: 0,
      left: 0,
    };
    this.resizeType = undefined;
    this.resizePosition = {
      top: 0,
      bottom: 0,
    };
    this.moveFunc = undefined;
    this.upFunc = undefined;
    this.createEventHandler();
  }

  createEventHandler(e) {
    this.moveFunc = (e) => {
      if (this.isMoving) this.moveWindow(e);
      if (this.resizeType) this.resizeWindow(e, this.resizeType);
    };
    this.upFunc = () => {
      if (this.isResizing) {
        this.isResizing = false;
        this.body.style.top = this.body.offsetTop + "px";
        this.body.style.left = this.body.offsetLeft + "px";
        this.body.style.bottom = "auto";
        this.body.style.right = "auto";
      }
      this.isMoving = false;
      this.resizeType = undefined;
    };
    const clickFunc = () => {
      for (let i = 0; i < root.children.length; i++) {
        if (zIndex > 2147483638 - 1) {
          zIndex = 0;
          root.children[i].style.zIndex = zIndex;
          zIndex++;
        }
        if (parseInt(root.children[i].id) === this.id) {
          if (zIndex - 1 !== parseInt(root.children[i].style.zIndex)) {
            root.children[i].style.zIndex = zIndex;
            zIndex++;
          }
        }
      }
    };

    document.addEventListener("mousemove", this.moveFunc);
    document.addEventListener("mouseup", this.upFunc);

    this.body.addEventListener("mousedown", clickFunc);
  }

  createWindow() {
    this.body = document.createElement("div");
    this.body.setAttribute("id", this.id);
    this.body.setAttribute("class", "window");
    this.body.style.width = this.width + "px";
    this.body.style.height = this.height + "px";
    root.append(this.body);

    this.createTopBar();
    this.createBorder();
  }

  createTopBar() {
    this.topBar = document.createElement("div");
    this.topBar.setAttribute("class", "top-bar");
    this.topBar.style.width = this.width + "px";
    this.topBar.innerText = this.title;
    this.body.appendChild(this.topBar);

    this.exitButton = document.createElement("div");
    this.exitButton.setAttribute("class", "exit-button");
    this.exitButton.innerHTML = closeIcon("#DEDEDE");

    this.maximizeButton = document.createElement("div");
    this.maximizeButton.setAttribute("class", "maximize-button");
    this.maximizeButton.innerHTML = maximizeIcon1("#DEDEDE");

    this.topBar.appendChild(this.exitButton);
    this.topBar.appendChild(this.maximizeButton);
    this.topBar.setAttribute("draggable", "false");
    this.topBar.onmousedown = (e) => {
      e.preventDefault();
      if (e.target !== this.topBar) return;
      this.isMoving = true;
      if (!this.isMaximized) {
        this.position = {
          top: e.offsetY,
          left: e.offsetX,
        };
      }
    };
    this.exitButton.onclick = this.exitWindow.bind(this);
    this.maximizeButton.onclick = this.maximizeWindow.bind(this);
    this.topBar.ondblclick = this.maximizeWindow.bind(this);
  }

  createBorder() {
    this.borders = {
      TOP_BORDER: document.createElement("div"),
      BOTTOM_BORDER: document.createElement("div"),
      LEFT_BORDER: document.createElement("div"),
      RIGHT_BORDER: document.createElement("div"),
    };
    this.corners = {
      TOP_LEFT_CORNER: document.createElement("div"),
      TOP_RIGHT_CORNER: document.createElement("div"),
      BOTTOM_LEFT_CORNER: document.createElement("div"),
      BOTTOM_RIGHT_CORNER: document.createElement("div"),
    };
    for (let borderIndex in this.borders) {
      let border = this.borders[borderIndex];
      border.setAttribute("class", `border ${borderIndex}-border`);
      border.onmousedown = (e) => {
        e.preventDefault();
        this.isResizing = true;
        this.resizeType = borderIndex;
        this.resizePosition = {
          right: root.offsetWidth - (this.body.offsetLeft + this.width),
          bottom: root.offsetHeight - (this.body.offsetTop + this.height),
        };
      };

      this.body.append(border);
    }
    for (let cornerIndex in this.corners) {
      let corner = this.corners[cornerIndex];
      corner.setAttribute("class", `corner ${cornerIndex}-corner`);
      corner.onmousedown = (e) => {
        e.preventDefault();
        this.isResizing = true;
        this.resizeType = cornerIndex;
        this.resizePosition = {
          right: root.offsetWidth - (this.body.offsetLeft + this.width),
          bottom: root.offsetHeight - (this.body.offsetTop + this.height),
        };
      };
      this.body.append(corner);
    }
  }

  exitWindow() {
    let node;

    for (let i = 0; i < root.children.length; i++) {
      if (parseInt(root.children[i].id) === this.id) {
        node = root.children[i];
        break;
      }
    }
    document.removeEventListener("mousemove", this.moveFunc);
    document.removeEventListener("mouseup", this.upFunc);
    root.removeChild(node);
  }

  maximizeWindow() {
    if (this.isMaximized) {
      this.isMaximized = !this.isMaximized;
      this.body.style.cssText += `
        width: ${this.width}px;
        height: ${this.height}px;
        border-radius: 5px;
        top: ${this.position.top}px;
        left: ${this.position.left}px;
      `;

      this.topBar.style.width = `${this.width}px`;
      this.maximizeButton.innerHTML = maximizeIcon1("#DEDEDE");
      return;
    }
    if (!this.isMaximized) {
      this.isMaximized = !this.isMaximized;
      this.position = {
        top: this.body.offsetTop,
        left: this.body.offsetLeft,
      };
      this.body.style.cssText += `
      top: 0;
      left: 0;
      width: calc(100vw - 2px);
      height:calc(100vh - 2px);
      border-radius: 0px;
    `;
      this.topBar.style.width = "calc(100vw - 2px)";
      this.maximizeButton.innerHTML = maximizeIcon2("#DEDEDE");
      return;
    }
  }

  moveWindow(e) {
    if (!this.isMoving || this.isMaximized) return;
    this.body.style.top = e.clientY - this.position.top + "px";
    this.body.style.left = e.clientX - this.position.left + "px";
  }

  resizeWindow(e, type) {
    if (!this.isResizing || this.isMaximized) return;
    const bottomF = () => {
      this.height = e.clientY - this.body.offsetTop;
      this.height =
        this.height > this.#minHeight ? this.height : this.#minHeight;
      this.body.style.height = this.height + "px";
    };
    const topF = () => {
      this.body.style.top = "auto";
      this.body.style.bottom =
        root.offsetHeight -
        (root.offsetHeight - this.resizePosition.bottom) -
        2 +
        "px";
      this.height =
        root.offsetHeight - this.resizePosition.bottom + 7 - e.clientY - 5;
      if (this.height > this.#minHeight) {
        this.body.style.height = this.height + "px";
      } else {
        this.height = this.#minHeight;
        this.body.style.height = this.height + "px";
      }
    };
    const rightF = () => {
      this.width = e.clientX - this.body.offsetLeft;
      this.width = this.width > this.#minWidth ? this.width : this.#minWidth;
      this.body.style.width = this.width + "px";
      this.topBar.style.width = this.width + "px";
    };
    const leftF = () => {
      this.body.style.left = "auto";
      this.body.style.right =
        root.offsetWidth -
        (root.offsetWidth - this.resizePosition.right) -
        2 +
        "px";
      this.width =
        root.offsetWidth - this.resizePosition.right + 7 - e.clientX - 5;
      if (this.width > this.#minWidth) {
        this.body.style.width = this.width + "px";
        this.topBar.style.width = this.width + "px";
      } else {
        this.width = this.#minWidth;
        this.body.style.width = this.width + "px";
        this.topBar.style.width = this.width + "px";
      }
    };
    switch (type) {
      case "BOTTOM_BORDER":
        bottomF();
        break;
      case "TOP_BORDER":
        topF();
        break;
      case "RIGHT_BORDER":
        rightF();
        break;
      case "LEFT_BORDER":
        leftF();
        break;
      case "BOTTOM_RIGHT_CORNER":
        bottomF();
        rightF();
        break;
      case "BOTTOM_LEFT_CORNER":
        bottomF();
        leftF();
        break;
      case "TOP_LEFT_CORNER":
        topF();
        leftF();
        break;
      case "TOP_RIGHT_CORNER":
        topF();
        rightF();
        break;
    }
  }

  setBackgroundColor(inputValue) {
    this.body.style.backgroundColor = inputValue;
  }

  setBackgroundImage(inputValue) {
    this.body.style.backgroundImage = `url(${inputValue})`;
  }
}

export default Window;
