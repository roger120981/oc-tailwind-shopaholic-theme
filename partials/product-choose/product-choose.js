import ShopaholicCartAdd from '@lovata/shopaholic-cart/shopaholic-cart-add';

export default new class ProductChoose {
  constructor() {
    this.init();
  }

  init(){
    console.log('Go')

    const obShopaholicCartAdd = new ShopaholicCartAdd();
    obShopaholicCartAdd.setAjaxRequestCallback((obRequestData, obButton) => {
      console.log('okay?')
    }).init();
  }
}();
