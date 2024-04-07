import ShopaholicCartUpdate from '@oc-shopaholic/shopaholic-cart/shopaholic-cart-update';
import {OffCanvasContainer} from "/partials/common/off-canvas/off-canvas";

document.addEventListener('DOMContentLoaded', () => {
  const obShopaholicCartUpdate = new ShopaholicCartUpdate();
  obShopaholicCartUpdate.setAjaxRequestCallback((obRequestData, inputNode) => {
    if (OffCanvasContainer.instance().find('header_cart')) {
      obRequestData.update = {'cart/cart-list-total-price': '._cart_list_total_price'};
    }

    return obRequestData;
  });

  obShopaholicCartUpdate.init();
});
