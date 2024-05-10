import ShopaholicCartShippingType from '@oc-shopaholic/shopaholic-cart/shopaholic-cart-shipping-type';
import ShopaholicCartPaymentMethod from '@oc-shopaholic/shopaholic-cart/shopaholic-cart-payment-method';
import ShopaholicOrder from '@oc-shopaholic/shopaholic-cart/shopaholic-order';

class Checkout {
  constructor() {
    this.formNode = document.querySelector('#make-order');
    this.buttonNode = this.formNode ? this.formNode.querySelector('button[type="submit"]') : null;
  }

  init() {
    this.initShippingTypeHandler();
    this.initPaymentMethodHandler();
    this.shippingTypeTermsHandler();
    this.initMakeOrderHandler();
  }

  initShippingTypeHandler() {
    const obShopaholicCartShippingType = new ShopaholicCartShippingType();
    obShopaholicCartShippingType.setAjaxRequestCallback((obRequestData, inputNode) => {
      obRequestData.update = {
        'checkout/shipping-type-list': '._shipping_type_wrapper',
        'checkout/payment-method-list': '._payment-method-wrapper',
        'checkout/checkout-subtotal': '._checkout-subtotal',
      }

      return obRequestData;
    });

    obShopaholicCartShippingType.init();
  }

  initPaymentMethodHandler() {
    const obShopaholicCartPaymentMethod = new ShopaholicCartPaymentMethod();
    obShopaholicCartPaymentMethod.setAjaxRequestCallback((obRequestData, inputNode) => {
      obRequestData.update = {
        'checkout/shipping-type-list': '._shipping_type_wrapper',
        'checkout/payment-method-list': '._payment-method-wrapper',
        'checkout/checkout-subtotal': '._checkout-subtotal',
      }

      return obRequestData;
    });

    obShopaholicCartPaymentMethod.init();
  }

  shippingTypeTermsHandler() {
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

  initMakeOrderHandler() {
    if (!this.formNode) {
      return;
    }

    const obThis = this;
    this.formNode.addEventListener('submit', (event) => {
      event.stopPropagation();
      event.preventDefault();

      obThis.sendRequest();
    });
  }

  sendRequest() {
    if (this.formNode.classList.contains('_invalid')) {
      return;
    }

    this.buttonNode.setAttribute('disabled', 'disabled');
    const obThis = this;

    const obShopaholicOrder = new ShopaholicOrder();
    obShopaholicOrder.setAjaxRequestCallback((obRequestData) => {
      obRequestData.complete = () => {
        this.buttonNode.removeAttribute('disabled');
      };

      return obRequestData;
    });

    obShopaholicOrder.create();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const obCheckout = new Checkout();
  obCheckout.init();
});
