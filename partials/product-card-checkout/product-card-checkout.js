import ShopaholicCartRemove from '@lovata/shopaholic-cart/shopaholic-cart-remove';
import InputQuantity from '../input-quantity/input-quantity'

export default new class productCardCheckout{
    constructor(){
        this.obCardList = null;
        this.obStateBasket = null;

        this.init();
    }

    changeStateBasket(){
        this.obCardList = $('._header-purchases ._card-list');
        this.obStateBasket = $('.product-active');
        if(!this.obCardList.find('ul').length){
            this.obStateBasket.css('--icon-indicator', 'hidden');
        }
    }

    init(){
        const obShopaholicCartRemove = new ShopaholicCartRemove();
        obShopaholicCartRemove.setAjaxRequestCallback((obRequestData, obButton) => {
            obRequestData.update = {
                'card-list/card-list-ajax': `._card-list`,
            }
            obRequestData.complete = () =>{
                this.changeStateBasket();
                $('._counter').children().off();
                InputQuantity.make('._counter');
            }
            return obRequestData;
        }).init();
    }

}();
