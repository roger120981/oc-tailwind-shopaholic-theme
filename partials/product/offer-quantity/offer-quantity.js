import ShopaholicCartUpdate from '@oc-shopaholic/shopaholic-cart/shopaholic-cart-update';
import {OffCanvasContainer} from "/partials/common/off-canvas/off-canvas";

document.addEventListener('DOMContentLoaded', () => {
  const obShopaholicCartUpdate = new ShopaholicCartUpdate();
  obShopaholicCartUpdate.setAjaxRequestCallback((obRequestData, inputNode) => {
    obRequestData.update = {};

    // If cart popup is opened, then update cart partials
    if (OffCanvasContainer.instance().find('header_cart')) {
      obRequestData.update['cart/cart-list-total-price'] = '._cart_list_total_price';
    }

    // If current page is "checkout", then update checkout partials
    const checkoutNode = document.querySelector('._checkout-list');
    if (checkoutNode) {
      obRequestData.update['checkout/checkout-list-ajax'] = '._checkout-list';
    }

    return obRequestData;
  });

  obShopaholicCartUpdate.init();
});
