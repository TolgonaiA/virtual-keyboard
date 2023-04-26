// eslint-disable-next-line import/extensions

export class Layout  {
  constructor(){
    this.title = 'RSS Виртуальная клавиатура';
    this.OS = 'Linux';
    this.shortCut = 'Win + Space'

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




  }

}

