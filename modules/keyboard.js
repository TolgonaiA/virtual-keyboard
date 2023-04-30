import KeyButtons from "./key-buttons.js";


// const lang = 'en';
// const status = 'normal';




export class KeyBoard {
  constructor() {
    this.language = localStorage.getItem('storeLanguage') || 'en';
    this.status = 'normal';
  }


  insertButtons() {
    const fragment = document.createDocumentFragment();
    const names = Object.keys(KeyButtons);
    names.forEach(name => {
      const button = document.createElement('div');
      button.classList.add('keyboard__btn');
      button.style.width = `${KeyButtons[name].width}px`;
      button.innerText = KeyButtons[name].key[this.status][this.language];
      button.setAttribute('name', name);
      fragment.appendChild(button);
    });
    return fragment;
  }


  init() {
    //сохраняю language в localStorage
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('storeLanguage', this.language)
    });

    //отрисовываю страницу и добавляю кнопки
    const layout = document.createElement('div');
    layout.classList.add('container');
    layout.innerHTML = `
        <h1 class='container__title'>RSS Витруальная клавиатура</h1>
        <p class='container__info'>Клавиатура создана в операционной системе Linux</p>
        <div class='textarea-wrap'>
          <textarea class='textarea-wrap__form'></textarea>
        </div>
        <div class='keyboard'></div>
        <p class='container__info'>Для переключения языка комбинация: WIN + Space</p>
    `
    document.body.appendChild(layout);

    const keyboard = document.querySelector('.keyboard');
    keyboard.appendChild(this.insertButtons());

    const textarea = document.querySelector('.textarea-wrap__form');

    const cursorHandler = (event) => {
      document.dispatchEvent(new KeyboardEvent('keyup', { code: event.target.getAttribute('name') }));
      event.target.removeEventListener('mouseup', cursorHandler);
      event.target.removeEventListener('mouseout', cursorHandler);
      textarea.focus();
    };


    document.addEventListener('mousedown', event => {
      if(event.target.classList.contains('keyboard__btn')) {
        document.dispatchEvent(new KeyboardEvent('keydown', {code: event.target.getAttribute('name')}));
      }

      event.target.addEventListener('mouseup', cursorHandler);
      event.target.addEventListener('mouseout', cursorHandler);
    });


    document.addEventListener('keydown', (event) => {
      const start = textarea.selectionStart;
      let breakLine = '\n';
      let btn = document.getElementsByName(event.code)[0];
      btn.classList.add('keyboard__btn_active');
      if (KeyButtons[event.code].type === 'print') {
        if (start === textarea.selectionEnd) {
          textarea.value = textarea.value.slice(0, start)
            + KeyButtons[event.code].key[this.status][this.language]
            + textarea.value.slice(textarea.selectionStart);
        } else {
          textarea.setRangeText(KeyButtons[event.code].key[this.status][this.language]);
        }
        textarea.selectionStart = start + 1;
        textarea.selectionEnd = textarea.selectionStart;
      } else if (KeyButtons[event.code].type === 'func') {
        switch (event.code) {
          case 'Enter':
            if (start === textarea.selectionEnd) {
              textarea.value = textarea.value.slice(0, start)
                + breakLine
                + textarea.value.slice(textarea.selectionStart);
            } else {
              textarea.setRangeText(breakLine);
            }
            textarea.selectionStart = start + 1;
            textarea.selectionEnd = textarea.selectionStart;
            break;
        }
      }
    })
    
  }


 

  
  
}