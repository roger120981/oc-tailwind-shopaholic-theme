export default new class TotalPrice{
    constructor(){
        this.sPrice = "._price";
        this.sTotalPrice = "._total-price";
        this.sDeliveryPrice = "._delivery-price";

        this.watchSummary();
        this.totalPrice();
    }

    watchSummary(){
        let app = this;
        let price = $(this.sPrice)[0];
        let delivery = $(this.sDeliveryPrice)[0];
        const config = {
            childList: true,
        };
    
        const callbackPrice = function (mutationsList, observer) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    app.totalPrice()
                }
            }
        };

        const callbackDelivery = function (mutationsList, observer) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    app.totalPrice()
                }
            }
        };

        const observerPrice = new MutationObserver(callbackPrice);

        const observerDelivery = new MutationObserver(callbackDelivery);

        if(price) observerPrice.observe(price, config);
        if(delivery) observerDelivery.observe(delivery, config);
    }

    totalPrice(){
        let a = $(this.sPrice)[0].innerHTML.substring(1, $(this.sPrice)[0].innerHTML.length);
        let b = $(this.sDeliveryPrice)[0].innerHTML.substring(1, $(this.sDeliveryPrice)[0].innerHTML.length);
        if(!Number(b)){
            b = '';
        }
        $(this.sTotalPrice).text('€' + (Number(a) + Number(b)));
    }
}()
