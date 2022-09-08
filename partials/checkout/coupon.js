import ShopaholicCouponAdd from "@lovata/shopaholic-coupon/shopaholic-coupon-add";
import ShopaholicCouponRemove from '@lovata/shopaholic-coupon/shopaholic-coupon-remove';

export default new class Coupon {
    constructor() {
        this.test();
    }

    test(){
        console.log('go')
        const obAdd = new ShopaholicCouponAdd();
            obAdd.setAjaxRequestCallback(function (obRequestData, obInput, obButton) {

            return obRequestData;
        }).init();
        const obRemove = new ShopaholicCouponRemove();
            obRemove.setAjaxRequestCallback(function (obRequestData, obInput, obButton) {

            return obRequestData;
        }).init();
    }
}();
