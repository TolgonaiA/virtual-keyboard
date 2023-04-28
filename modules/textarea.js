// eslint-disable-next-line import/extensions

export class TextArea  {
  constructor(){
    this.textareaWrap = document.createElement('div');
    this.textarea = document.createElement('textarea');
    this.value = '';
  }
  
  init() {
    this.textareaWrap.classList.add('textarea');
    this.textarea.classList.add('textarea__form');
    this.textareaWrap.appendChild(this.textarea);
  }

  updateTextarea (value) {
    this.value = this.value + value
    this.textarea.innerText = this.value
  }


}