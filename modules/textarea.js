// eslint-disable-next-line import/extensions

export class TextArea  {
  constructor(){
    this.textareaWrap = document.createElement('div');
  }
  
  init() {
    const textarea = document.createElement('textarea');

    this.textareaWrap.classList.add('textarea');
    textarea.classList.add('textarea__form');

    this.textareaWrap.appendChild(textarea);
  }

}