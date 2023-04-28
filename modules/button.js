export class Button {
  constructor() {
    this.button = document.createElement('div'),
    this.value,
    this.width,
    this.keyCode
  }

  init () {
    this.button.classList.add('keyboard__btn');
    this.button.innerText = this.value;
    this.button.style.width = `${this.width}px`;
    this.button.style.height = `50px`;
    this.button.id = this.keyCode;
  }

}