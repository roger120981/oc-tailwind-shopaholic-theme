import ShopaholicCartAdd from '@lovata/shopaholic-cart/shopaholic-cart-add';
import ShopaholicCartUpdate from '@lovata/shopaholic-cart/shopaholic-cart-update';

export default new class ProductChoose {
  constructor() {
    this.init();
  }

  init(){
    console.log('Go')

    const obShopaholicCartAdd = new ShopaholicCartAdd();
    obShopaholicCartAdd.setAjaxRequestCallback((obRequestData, obButton) => {
      obRequestData.complete = ({ responseJSON }) => {
        obShopaholicCartAdd.completeCallback(responseJSON, obButton);
        console.log('okay?')
      };

      return obRequestData;
    }).init();

    const obShopaholicCartUpdate = new ShopaholicCartUpdate();
    obShopaholicCartUpdate.setAjaxRequestCallback((obRequestData, obInput) => {
      obRequestData.complete = ({ responseJSON }) => {
        obShopaholicCartUpdate.completeCallback(responseJSON);
        console.log('update count')
      };

      return obRequestData;
    }).init();
  }
}();
