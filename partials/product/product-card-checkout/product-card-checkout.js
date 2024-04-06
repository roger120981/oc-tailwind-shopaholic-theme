import ShopaholicCartRemove from '@oc-shopaholic/shopaholic-cart/shopaholic-cart-remove';

export default new class productCardCheckout{
    constructor(){
        this.obCardList = null;
        this.obStateBasket = null;

        this.init();
    }

    changeStateBasket(){
        this.obCardList = document.getElementsByClassName('_cart-list')[0];
        this.obStateBasket = document.getElementsByClassName('product-active')[0];
        if(this.obStateBasket && (!this.obCardList || this.obCardList.querySelectorAll('ul li').length === 0)) {
            this.obStateBasket.style = "--icon-indicator:hidden";
        }
    }

    init(){
        const obShopaholicCartRemove = new ShopaholicCartRemove();
        obShopaholicCartRemove.setAjaxRequestCallback((obRequestData, obButton) => {
            obRequestData.update = {
                'main/header-ajax': '._header-purchases',
                'checkout-list/checkout-list-ajax': `._checkout-list`,
                'checkout-subtotal/checkout-subtotal-ajax': `._checkout-subtotal`,
            }
            obRequestData.complete = () =>{
                this.changeStateBasket();
            }
            return obRequestData;
        }).init();
    }

}();
