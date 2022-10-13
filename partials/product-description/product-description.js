export default new class ProductDescription {
  constructor() {
    this.obDescription = document.getElementsByClassName('_description')[0];
    this.obButton = document.getElementsByClassName('_description-toggle')[0];
    this.obSvg = this.obButton.querySelectorAll("._arrow");
    this.obSpan = this.obButton.querySelectorAll("._status");
    this.obDescriptionText = this.obDescription.querySelectorAll("._description-text");

    this.sMinHeight = '';
    this.sMaxHeight = '';

    this.animInit();
    this.btnInit();
    this.changeVisiblyDescription();
  }

  animInit(){
    this.sMinHeight = this.obDescriptionText[0].clientHeight;
    this.obDescription.classList.add('line-clamp-none');
    this.sMaxHeight = this.obDescriptionText[0].clientHeight;
    this.obDescription.classList.remove('line-clamp-none');

    this.obDescriptionText[0].setAttribute('style', '--description-text-max-height:' + this.sMinHeight + 'px;');
  }

  btnInit(){
    if(this.sMaxHeight && this.sMaxHeight < 90){
      this.obButton.classList.add('hidden');
    }
  }

  changeVisibly(text){
    this.obButton.classList.add('opacity-0');
    setTimeout(()=>{
      this.obSpan[0].innerHTML = text;
      this.obButton.classList.remove('opacity-0');
    },200)
  }

  animClose(){
    this.obDescriptionText[0].setAttribute('style', '--description-text-max-height:' + this.sMinHeight + 'px;');
    setTimeout(()=>{
      this.obDescription.classList.remove('line-clamp-none');
    },600)
  }

  changeVisiblyDescription(){
    this.obButton.addEventListener('click', ()=>{
      if(this.obButton.getAttribute('aria-expanded') !== 'false'){
        this.obSvg[0].classList.remove('rotate-180');
        this.animClose();
        this.changeVisibly(window.stateButton.show);
        this.obButton.setAttribute('aria-expanded', 'false');
      }else {
        this.changeVisibly(window.stateButton.hide);
        this.obDescription.classList.add('line-clamp-none');
        this.obSvg[0].classList.add('rotate-180');
        this.obButton.setAttribute('aria-expanded', 'true');
        this.obDescriptionText[0].setAttribute('style', '--description-text-max-height:' + this.sMaxHeight + 'px;');
      }
    })
  }
}();
