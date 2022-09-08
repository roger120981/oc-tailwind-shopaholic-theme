export default new class Switch{
    constructor(){
        this.init();
    }

    init() {
        let active = $('._switch-radio input:checked').attr('data-switch');
        $('._switch-radio').on('click', 'input', (elem) => {
            let oldActive = $('.' + active + '-container');
            let oldActiveCount = $('.' + active + '-count').text();
            oldActive.addClass('hidden');
            oldActive.attr('aria-hidden', true);
            if(oldActiveCount && $('._delivery-price')){
                $('._delivery-price').text(oldActiveCount)
            }

            active = elem.target.getAttribute('data-switch');
            let newActive = $('.' + active + '-container');
            let newActiveCount = $('.' + active + '-count').text();
            if(newActiveCount && $('._delivery-price')){
                $('._delivery-price').text(newActiveCount)
            }
            newActive.removeClass('hidden');
            newActive.removeAttr('aria-hidden');
        })
    }
}
