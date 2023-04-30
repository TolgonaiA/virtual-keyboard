import KeyButtons from "./key-buttons.js";


// const lang = 'en';
// const status = 'normal';




export class KeyBoard {
  constructor() {
    this.language = localStorage.getItem('storeLanguage') || 'en';
    this.status = 'normal';
  }


  init() {
    const layout = document.createElement('div');
    layout.classList.add('container');
    layout.innerHTML = `
        <h1 class='container__title'>RSS Витруальная клавиатура</h1>
        <p class='container__info'>Клавиатура создана в операционной системе Linux</p>
        <div class='textarea>
          <textarea class='textarea__form></textarea>
        </div>
        <div class='keyboard'></div>
        <p class='container__info'>Для переключения языка комбинация: WIN + Space</p>
    `
    document.body.appendChild(layout)
    
  }


 

  
  
}