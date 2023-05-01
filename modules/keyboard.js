import KeyButtons from "./key-buttons.js";


let status = 'normal';




export class KeyBoard {
  constructor() {
    this.language = localStorage.getItem('storeLanguage') || 'en';
    this.status = status;
    this.isCapsLockActive = false;
  }


  insertButtons() {
    console.log('status', this.status)
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
  };


  showCapitalCase() {
    let buttons = document.querySelectorAll('.keyboard__btn');
    for(let i = 0; i < buttons.length; i++) {
      buttons[i].innerText = KeyButtons[buttons[i].getAttribute('name')].key[this.status][this.language]
    }
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
        <p class='container__info'>Для переключения языка комбинация ЛЕВЫЕ: CTRL + ALT</p>
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
      event.preventDefault();
      if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight')) {
        let shiftLeft = document.getElementsByName('ShiftLeft')[0];
        let shiftRight = document.getElementsByName('ShiftRight')[0];
        
        if (![shiftLeft, shiftRight].some((element) => element.classList.contains('keyboard__btn_active'))) {
          this.status = this.status === 'normal' ? 'shifted' : 'normal'
        }

        this.showCapitalCase();
      }
      const start = textarea.selectionStart;
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
                + '\n'
                + textarea.value.slice(textarea.selectionStart);
            } else {
              textarea.setRangeText('\n');
            }
            textarea.selectionStart = start + 1;
            textarea.selectionEnd = textarea.selectionStart;
            break;
          case 'Tab':
            if (start === textarea.selectionEnd) {
              textarea.value = textarea.value.slice(0, start)
                + '\t'
                + textarea.value.slice(textarea.selectionStart);
            } else {
              textarea.setRangeText('\t');
            }
            textarea.selectionStart = start + 1;
            textarea.selectionEnd = textarea.selectionStart;
            break;
          case 'Delete':
            if (start === textarea.selectionEnd) {
              if (start < textarea.value.length) {
                textarea.value = textarea.value.slice(0, start)
                  + textarea.value.slice(start + 1);
                textarea.selectionStart = start;
                textarea.selectionEnd = textarea.selectionStart;
              }
            } else {
              textarea.setRangeText('');
            }
            break;
          case 'Backspace':
            if (start === textarea.selectionEnd) {
              if (start > 0) {
                textarea.value = textarea.value.slice(0, start - 1)
                  + textarea.value.slice(start);
                textarea.selectionStart = start- 1;
                textarea.selectionEnd = textarea.selectionStart;
              }
            } else {
              textarea.setRangeText('');
            }
            break;
        }
      }
    });


    document.addEventListener('keyup', (event) => {
      event.preventDefault();
      let btn = document.getElementsByName(event.code)[0];
      btn.classList.remove('keyboard__btn_active');

      if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        this.status = this.status === 'normal' ? 'shifted' : 'normal'
        this.showCapitalCase();
      }

      if (event.code === 'CapsLock') {
        this.status = this.status === 'normal' ? 'shifted' : 'normal'
        this.showCapitalCase();
        this.isCapsLockActive = !this.isCapsLockActive;
        document.getElementsByName(event.code)[0].classList.toggle('keyboard__btn_capslock');
      }

      if (event.code === 'ControlLeft') {
        
        if (event.altKey) {
          console.log('lanf')
          this.language = this.language === 'en' ? 'ru' : 'en';
          this.showCapitalCase()
        }
      }


    });
    
  }


 

  
  
}