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
    const addButtons = () => {
      keyboard.innerHTML = '';
      for(let i = 0; i < buttons.length; i++) {
        let button = new Button();
        if (status === 'capitalized' && KeyButtons[buttons[i]].key.hasOwnProperty('capitalized')) {
          button.value = KeyButtons[buttons[i]].key[status][lang];
        } else if (status === 'capitalized' && !KeyButtons[buttons[i]].key.hasOwnProperty('capitalized')) {
          button.value = KeyButtons[buttons[i]].key['normal'][lang];
        } else button.value = KeyButtons[buttons[i]].key[status][lang];
        button.width = KeyButtons[buttons[i]].width;
        button.keyCode = KeyButtons[buttons[i]].keyCode;
        button.init();
        keyboard.appendChild(button.button);
      }
    }
    addButtons();
    

    container.appendChild(keyboard);

    keyboard.addEventListener('click', (event) => {
      let id = parseInt(event.target.id);
      let btn = Object.keys(KeyButtons).find(el => KeyButtons[el].keyCode == id)
      if(KeyButtons[btn].type === 'print') {
        textarea.updateTextarea(KeyButtons[btn].key[status][lang])
      } else if (KeyButtons[btn].type === 'func') {
        console.log(btn)
        switch (btn) {
          case 'CapsLock':
            status === 'normal' ? status = 'capitalized' : status = 'normal'
            addButtons();
          case 'Enter':
            console.log('h')
        }
      }

    })
  }

}

