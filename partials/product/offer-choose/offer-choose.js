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

  initPropertySelectHandler() {
    document.addEventListener('change', (event) => {
      const eventNode = event.target;
      const wrapperNode = eventNode.closest('._offer-choose-property');
      if (!wrapperNode) {
        return;
      }

      const inputList = document.querySelectorAll('._offer-choose-property-input');
      const valueList = {};
      inputList.forEach((inputNode) => {
        if (!inputNode.value) {
          return;
        }

        valueList[inputNode.dataset.propertyId] = inputNode.value;
      });

      oc.ajax('onAjax', {
        data: {
          property: valueList,
        },
        update: {
          'product/offer-choose/offer-choose-property-list': '._offer-choose-property-list'
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
  obOfferChoose.initPropertySelectHandler();
});
