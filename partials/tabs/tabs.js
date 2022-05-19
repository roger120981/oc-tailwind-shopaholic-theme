export default new class Tabs {
  constructor() {
    this.obTab = $('._tabs');
    this.obTabsButtons = this.obTab.find('._tabs-buttons');
    this.obTabsContent = this.obTab.find('._tabs-content');
    this.obTabsButton = this.obTabsButtons.find('._tabs-button');
    this.obTabsText = this.obTabsContent.find('._tabs-text');

    this.nOldButton = null;
    this.init();
  }

  init(){
    this.tabsActive();
  }

  buttonActive(index, active){
    if(active){
      this.obTabsButton[index].classList.add('border-b-4', 'border-blue-800');
    }else{
      this.obTabsButton[index].classList.remove('border-b-4', 'border-blue-800');
    }
  }

  tabAnimate(index, active){
    if(active){
      this.obTabsText[index].classList.remove('opacity-0');
    }else{
      this.obTabsText[index].classList.add('opacity-0');
    }
  }

  tabsAnimateShow(index){
    this.tabAnimate(index, true)
    setTimeout(()=>{
      this.buttonActive(index, true);
      this.tabActive(index, true);
    },200)
  }
  
  tabsAnimateHide(oldIndex){
    this.tabAnimate(oldIndex, false)
    setTimeout(()=>{
      this.buttonActive(oldIndex, false);
      this.tabActive(oldIndex, false);
    },200)
  }

  tabActive(index, active){
    if(active){
      this.obTabsText[index].classList.remove('hidden');
    }else{
      this.obTabsText[index].classList.add('hidden');
    }
  }

  tabsActive(){
    this.obTabsButton.on('click', (el) => {
      if(!this.nOldButton){
        this.nOldButton = 0;
      }
      let index = el.target.dataset.id - 1;
      this.tabsAnimateHide(this.nOldButton);
      this.tabsAnimateShow(index);
      this.nOldButton = index;
    })
  }
}();
