import ShopaholicCartShippingType from '@oc-shopaholic/shopaholic-cart/shopaholic-cart-shipping-type';

class Checkout {
  constructor() {
    this.sCash = "._cash";
    this.sCard = "._card";
    this.sPaymentCard = "._payment-card";
  }

  init() {
    this.initShippingTypeHandler();
    this.deliveryTermsHandler();
  }

  initShippingTypeHandler() {
    const obShopaholicCartShippingType = new ShopaholicCartShippingType();
    obShopaholicCartShippingType.setAjaxRequestCallback((obRequestData, inputNode) => {
      obRequestData.update = {
        'checkout/shipping-type-list': '._shipping_type_wrapper',
      }

      return obRequestData;
    });

    obShopaholicCartShippingType.init();
  }

  deliveryTermsHandler() {
    document.addEventListener('click', (event) => {
      const eventNode = event.target;
      const buttonNode = eventNode.closest('._delivery-terms');
      if (!buttonNode) {
        return;
      }

      const infoNode = document.querySelector('._delivery-info');
      const toggleNode = document.querySelector('._delivery-toggle');
      if (!infoNode || !toggleNode) {
        return;
      }

      if (infoNode.classList.contains('hidden')) {
        infoNode.classList.remove('hidden');
        toggleNode.classList.remove('rotate-180');
        buttonNode.setAttribute('aria-expanded', true);
      } else {
        infoNode.classList.add('hidden');
        toggleNode.classList.add('rotate-180');
        buttonNode.setAttribute('aria-expanded', false);
      }
    });
  }

  paymentMethod() {
    document.querySelector('._payment-method').addEventListener('click', (event) => {
      if (event.target.tagName === 'INPUT') {
        if (document.querySelector(this.sCash).checked) {
          document.querySelector(this.sPaymentCard).classList.add('hidden');
          document.querySelector(this.sPaymentCard).setAttribute('aria-hidden', true);
        }
        if (document.querySelector(this.sCard).checked) {
          document.querySelector(this.sPaymentCard).classList.remove('hidden');
          document.querySelector(this.sPaymentCard).removeAttribute('aria-hidden');
        }
      }
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const obCheckout = new Checkout();
  obCheckout.init();
});
