// eslint-disable-next-line import/extensions
import { TextArea } from "./textarea.js";
import { Button } from "./button.js";
import KeyButtons from "./key-buttons.js";

let status = 'normal';
let lang = 'en';

export class Layout  {
  constructor(){
    this.title = 'RSS Виртуальная клавиатура';
    this.OS = 'Linux';
    this.shortCut = 'Win + Space';

  }
  
  init() {
    const container = document.createElement('section');
    const pageTitle = document.createElement('h1');
    const info = document.createElement('div');
    const infoOS = document.createElement('p');
    const infoShortCut = document.createElement('p');

    container.classList.add('container');
    pageTitle.classList.add('container__title');
    info.classList.add('container__info');


    pageTitle.innerText = this.title;
    infoOS.innerText = `Клавиатура создана в операционной системе ${this.OS}`;
    infoShortCut.innerText = `Для переключения языка комбинация: левые ${this.shortCut}`;
    

    document.body.appendChild(container);
    container.appendChild(pageTitle);
    container.appendChild(info);
    info.appendChild(infoOS);
    info.appendChild(infoShortCut);

    let textarea = new TextArea();
    textarea.init();
    
    container.appendChild(textarea.textareaWrap);

    let keyboard = document.createElement('div');

    keyboard.classList.add('keyboard');
    let buttons = Object.keys(KeyButtons);
    for(let i = 0; i < buttons.length; i++) {
      let button = new Button();
      button.value = KeyButtons[buttons[i]].key.normal.en;
      button.width = KeyButtons[buttons[i]].width;
      button.keyCode = KeyButtons[buttons[i]].keyCode;
      button.init();
      keyboard.appendChild(button.button);
    }

    container.appendChild(keyboard);

    keyboard.addEventListener('click', (event) => {
      let id = parseInt(event.target.id);
      let btn = Object.keys(KeyButtons).find(el => KeyButtons[el].keyCode == id)
      if(KeyButtons[btn].type === 'print') {
        console.log(KeyButtons[btn])
        textarea.updateTextarea(KeyButtons[btn].key[status][lang])
      }
    })
  }

}

