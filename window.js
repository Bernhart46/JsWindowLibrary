import { maximizeIcon1, maximizeIcon2, closeIcon } from './icons.js';

const root = document.getElementById('root');
let zIndexCounter = 0;

class Window {
  #id;
  #title;
  #minWidth = 275;
  #width;
  #minHeight = 200;
  #height;
  #body;
  #topBar;
  #topBarTitle;
  #contentBody;
  #borders;
  #corners;
  #exitButton;
  #maximizeButton;
  #isMaximized;
  #isMoving;
  #isResizing;
  #resizeType;
  #resizePosition;
  #upFunc;
  #position;
  #moveFunc;

  constructor(
    WindowWidth = 275,
    WindowHeight = 200,
    WindowTitle = `title-${root.children.length}`,
  ) {
    this.#id = root.children.length;
    this.#width = WindowWidth > this.#minWidth ? WindowWidth : this.#minWidth;
    this.#height = WindowHeight > this.#minHeight ? WindowHeight : this.#minHeight;
    this.#title = WindowTitle;
    this.#isMaximized = false;
    this.#isMoving = false;
    this.#isResizing = false;
    this.#position = {
      top: 0,
      left: 0,
    };
    this.#resizeType = undefined;
    this.#resizePosition = {
      top: 0,
      bottom: 0,
    };
    this.#createWindow();
    this.#createEventHandler();
  }

  #createEventHandler() {
    //document events for moving and resizing
    this.#moveFunc = (e) => {
      if (this.#isMoving) this.#moveWindow(e);
      if (this.#resizeType) this.#resizeWindow(e, this.#resizeType);
    };
    this.#upFunc = () => {
      if (this.#isResizing) {
        this.#isResizing = false;
        this.#body.style.inset = `${this.#body.offsetTop}px auto auto ${this.#body.offsetLeft}px`;
      }
      this.#isMoving = false;
      this.#resizeType = undefined;
      root.style.cursor = "default";
    };
    const clickFunc = () => {
      for (let i = 0; i < root.children.length; i += 1) {
        if (zIndexCounter > 2147483638 - 1) {
          zIndexCounter = 0;
          root.children[i].style.zIndex = zIndexCounter;
          zIndexCounter += 1;
        }
        if (parseInt(root.children[i].id, 10) === this.#id) {
          if (zIndexCounter - 1 !== parseInt(root.children[i].style.zIndex, 10)) {
            root.children[i].style.zIndex = zIndexCounter;
            zIndexCounter += 1;
          }
        }
      }
    };

    document.addEventListener('mousemove', this.#moveFunc);
    document.addEventListener('mouseup', this.#upFunc);

    this.#body.addEventListener('mousedown', clickFunc);
  }

  #createWindow() {
    this.#body = document.createElement('div');
    this.#body.setAttribute('id', this.#id);
    this.#body.setAttribute('class', 'window');
    this.#body.setAttribute('draggable', 'false');
    this.#body.style.width = `${this.#width}px`;
    this.#body.style.height = `${this.#height}px`;
    root.append(this.#body);

    this.#createTopBar();
    this.#createBorders();
    this.#createCorners();
    this.#createContentBody();
  }

  #createTopBar() {
    this.#topBar = document.createElement('div');
    this.#topBar.setAttribute('class', 'top-bar');
    this.#topBar.setAttribute('draggable', 'false');
    this.#topBar.style.width = `${this.#width}px`;
    this.#body.appendChild(this.#topBar);
    this.#topBarTitle = document.createElement('div');
    this.#topBarTitle.setAttribute('class', 'top-bar-title');
    this.#topBar.appendChild(this.#topBarTitle);
    this.#topBarTitle.innerText = this.#title;

    this.#topBarTitle.onmousedown = (e) => {
      e.preventDefault();
      if (e.target !== this.#topBarTitle) return;
      this.#isMoving = true;
      if (!this.#isMaximized) {
        this.#position = {
          top: e.offsetY,
          left: e.offsetX,
        };
      }
    };
    this.#topBarTitle.ondblclick = this.#maximizeWindow.bind(this);
    this.#createTopBarButtons();
  }

  #createTopBarButtons() {
    this.#exitButton = document.createElement('div');
    this.#exitButton.setAttribute('class', 'exit-button');
    this.#exitButton.innerHTML = closeIcon('#DEDEDE', '75%');
    this.#exitButton.onclick = this.#exitWindow.bind(this);
    this.#topBar.appendChild(this.#exitButton);

    this.#maximizeButton = document.createElement('div');
    this.#maximizeButton.setAttribute('class', 'maximize-button');
    this.#maximizeButton.innerHTML = maximizeIcon1('#DEDEDE', '75%');
    this.#maximizeButton.onclick = this.#maximizeWindow.bind(this);
    this.#topBar.appendChild(this.#maximizeButton);
  }

  #createBorders() {
    this.#borders = {
      TOP_BORDER: document.createElement('div'),
      BOTTOM_BORDER: document.createElement('div'),
      LEFT_BORDER: document.createElement('div'),
      RIGHT_BORDER: document.createElement('div'),
    };

    const borderKeys = Object.keys(this.#borders);

    for (let i = 0; i < borderKeys.length; i += 1) {
      const border = this.#borders[borderKeys[i]];
      border.setAttribute('class', `border ${borderKeys[i]}-border`);
      border.onmousedown = (e) => {
        e.preventDefault();
        this.#isResizing = true;
        this.#resizeType = borderKeys[i];
        //fix cursors
        switch (borderKeys[i]) {
          case 'BOTTOM_BORDER':
          case 'TOP_BORDER':
            root.style.cursor = "ns-resize";
            break;
          case 'RIGHT_BORDER':
          case 'LEFT_BORDER':
            root.style.cursor = "ew-resize";
            break;
        }
        this.#resizePosition = {
          right: root.offsetWidth - (this.#body.offsetLeft + this.#width),
          bottom: root.offsetHeight - (this.#body.offsetTop + this.#height),
        };
      };

      this.#body.append(border);
    }


  }

  #createCorners() {
    this.#corners = {
      TOP_LEFT_CORNER: document.createElement('div'),
      TOP_RIGHT_CORNER: document.createElement('div'),
      BOTTOM_LEFT_CORNER: document.createElement('div'),
      BOTTOM_RIGHT_CORNER: document.createElement('div'),
    };
    const cornerKeys = Object.keys(this.#corners);

    for (let i = 0; i < cornerKeys.length; i += 1) {
      const corner = this.#corners[cornerKeys[i]];
      corner.setAttribute('class', `corner ${cornerKeys[i]}-corner`);
      corner.onmousedown = (e) => {
        e.preventDefault();
        this.#isResizing = true;
        this.#resizeType = cornerKeys[i];
        //fix cursors
        switch (cornerKeys[i]) {
          case 'TOP_LEFT_CORNER':
          case 'BOTTOM_RIGHT_CORNER':
            root.style.cursor = "nwse-resize";
            break;
          case 'TOP_RIGHT_CORNER':
          case 'BOTTOM_LEFT_CORNER':
            root.style.cursor = "nesw-resize";
            break;
        }
        this.#resizePosition = {
          right: root.offsetWidth - (this.#body.offsetLeft + this.#width),
          bottom: root.offsetHeight - (this.#body.offsetTop + this.#height),
        };
      };
      this.#body.append(corner);
    }
  }

  #createContentBody() {
    this.#contentBody = document.createElement('div');
    this.#contentBody.setAttribute('class', 'content-body');
    this.#body.appendChild(this.#contentBody);
  }

  #exitWindow() {
    let node;

    for (let i = 0; i < root.children.length; i += 1) {
      if (parseInt(root.children[i].id, 10) === this.#id) {
        node = root.children[i];
        break;
      }
    }
    document.removeEventListener('mousemove', this.#moveFunc);
    document.removeEventListener('mouseup', this.#upFunc);
    root.removeChild(node);
  }

  #maximizeWindow() {
    if (this.#isMaximized) {
      this.#isMaximized = !this.#isMaximized;
      this.#body.style.cssText += `
        width: ${this.#width}px;
        height: ${this.#height}px;
        border-radius: 5px;
        top: ${this.#position.top}px;
        left: ${this.#position.left}px;
      `;

      this.#topBar.style.width = `${this.#width}px`;
      this.#maximizeButton.innerHTML = maximizeIcon1('#DEDEDE', '75%');
      return;
    }
    if (!this.#isMaximized) {
      this.#isMaximized = !this.#isMaximized;
      this.#position = {
        top: this.#body.offsetTop,
        left: this.#body.offsetLeft,
      };
      this.#body.style.cssText += `
      top: 0;
      left: 0;
      width: calc(100vw - 2px);
      height:calc(100vh - 2px);
      border-radius: 0px;
    `;
      this.#topBar.style.width = 'calc(100vw - 2px)';
      this.#maximizeButton.innerHTML = maximizeIcon2('#DEDEDE', '75%');
    }
  }

  #moveWindow(e) {
    if (!this.#isMoving || this.#isMaximized) return;
    this.#body.style.inset = `
      ${e.clientY - this.#position.top}px 
      auto auto 
      ${e.clientX - this.#position.left}px`;
  }

  #resizeWindow(e, type) {
    if (!this.#isResizing || this.#isMaximized) return;

    const calculateBottomResizing = () => {
      this.#height = e.clientY - this.#body.offsetTop;
      this.#height = this.#height > this.#minHeight ? this.#height : this.#minHeight;
      this.#body.style.height = `${this.#height}px`;
    };

    const calculateTopResizing = () => {
      this.#body.style.top = 'auto';
      this.#body.style.bottom = `${root.offsetHeight - (root.offsetHeight - this.#resizePosition.bottom) - 2
        }px`;
      this.#height = root.offsetHeight - this.#resizePosition.bottom + 7 - e.clientY - 5;
      if (this.#height > this.#minHeight) {
        this.#body.style.height = `${this.#height}px`;
      } else {
        this.#height = this.#minHeight;
        this.#body.style.height = `${this.#height}px`;
      }
    };

    const calculateRightResizing = () => {
      this.#width = e.clientX - this.#body.offsetLeft;
      this.#width = this.#width > this.#minWidth ? this.#width : this.#minWidth;
      this.#body.style.width = `${this.#width}px`;
      this.#topBar.style.width = `${this.#width}px`;
    };

    const calculateLeftResizing = () => {
      this.#body.style.left = 'auto';
      this.#body.style.right = `${root.offsetWidth - (root.offsetWidth - this.#resizePosition.right) - 2
        }px`;
      this.#width = root.offsetWidth - this.#resizePosition.right + 7 - e.clientX - 5;
      if (this.#width > this.#minWidth) {
        this.#body.style.width = `${this.#width}px`;
        this.#topBar.style.width = `${this.#width}px`;
      } else {
        this.#width = this.#minWidth;
        this.#body.style.width = `${this.#width}px`;
        this.#topBar.style.width = `${this.#width}px`;
      }
    };

    switch (type) {
      case 'BOTTOM_BORDER':
        calculateBottomResizing();
        break;
      case 'TOP_BORDER':
        calculateTopResizing();
        break;
      case 'RIGHT_BORDER':
        calculateRightResizing();
        break;
      case 'LEFT_BORDER':
        calculateLeftResizing();
        break;
      case 'BOTTOM_RIGHT_CORNER':
        calculateBottomResizing();
        calculateRightResizing();
        break;
      case 'BOTTOM_LEFT_CORNER':
        calculateBottomResizing();
        calculateLeftResizing();
        break;
      case 'TOP_LEFT_CORNER':
        calculateTopResizing();
        calculateLeftResizing();
        break;
      case 'TOP_RIGHT_CORNER':
        calculateTopResizing();
        calculateRightResizing();
        break;
      default:
        break;
    }
  }

  get title() {
    return this.#title;
  }

  set title(newTitle) {
    this.#title = newTitle;
    this.#topBarTitle.innerText = this.#title;
  }

  get height() {
    return this.#height;
  }

  get width() {
    return this.#width;
  }

  setBackgroundColor(inputValue) {
    this.#contentBody.style.backgroundColor = inputValue;
  }

  setBackgroundImage(inputValue) {
    this.#contentBody.style.backgroundImage = `url(${inputValue})`;
  }
}

export default Window;
