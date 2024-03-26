import ShopaholicCartAdd from '@oc-shopaholic/shopaholic-cart/shopaholic-cart-add';

class OfferChoose {
  initOfferSelectHandler() {
    document.addEventListener('change', (event) => {
      const eventNode = event.target;
      const offerInput = eventNode.closest('[name="offer_id"]');
      if (!offerInput) {
        return;
      }

      oc.ajax('onAjax', {
        data: {
          offer_id: offerInput.value,
        },
        update: {
          'product/product-tabs/product-tab-details-ajax': '._product_tab_details'
        },
      });
    });
  }

  initAddToCartHandler(){

    const shopaholicCartAdd = new ShopaholicCartAdd();
    shopaholicCartAdd.setAjaxRequestCallback((requestData, button) => {

      requestData.update = {'main/header-ajax': '._header-purchases'};
      requestData.complete = (data) => {
        shopaholicCartAdd.completeCallback(data, button);
        // let content = document.querySelector(`.${this.cartPopupWrapper}`);
        // if (content.classList.contains('hidden')) {
        //   content.classList.remove('hidden')
        //
        //   document.body.classList.add('overflow-hidden')
        // } else {
        //   content.classList.add('hidden');
        //   document.body.classList.remove('overflow-hidden')
        // }
      };

      return requestData;
    }).init();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const obOfferChoose = new OfferChoose();
  obOfferChoose.initOfferSelectHandler();
});
