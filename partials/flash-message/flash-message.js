export default new class Flash {
    constructor(){
        this.obContainer = $('._flash');
        this.obClearAllButton = this.obContainer.find('._clear-all');
        
        this.nCount = 0;
        this.typeMessages = null;

        this.init();
    }

    init(){
        let app = this;
        let container = $('._flash > .flash-message');
        this.nCount = container.length;

        $(document).on('ajaxSetup', function(event, context) {
            context.options.flash = true
                
            context.options.loading = $.oc.stripeLoadIndicator

            context.options.handleErrorMessage = function(message) {
                $.oc.flashMsg({ text: message, class: 'error' })
            }
            context.options.handleFlashMessage = function(message, type) {
                let messages = null;

                if(app.typeMessages === type){
                    messages = message;
                }

                if(!messages){
                    return
                }

                let el = $('<li />').addClass(app.typeMessages).html(messages);
                let color = null;
                
                if((app.nCount - 1) >= 5){
                    let flash = $('._flash > .flash-message');
                    flash[flash.length - 1].remove();
                }else{
                    app.nCount++;
                }

                if(app.typeMessages === 'success'){
                    color = 'text-green-900 bg-green-100'
                }else if(app.typeMessages === 'error'){
                    color = 'text-red-900 bg-red-100'
                }else if(app.typeMessages === 'info'){
                    color = 'text-gray-900 bg-gray-100'
                }else if(app.typeMessages === 'warning'){
                    color = 'text-blue-900 bg-blue-100'
                }

                el
                .addClass(`${color} flash-message duration-500 opacity-0 fade flex justify-between p-4 rounded-lg`)
                .attr('data-control', null)
                .on('click', 'button', remove)
                .append(`<button type="button" class="close p-5 -m-5" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L6 4.58579L10.2929 0.292893C10.6834 -0.0976311 11.3166 -0.0976311 11.7071 0.292893C12.0976 0.683417 12.0976 1.31658 11.7071 1.70711L7.41421 6L11.7071 10.2929C12.0976 10.6834 12.0976 11.3166 11.7071 11.7071C11.3166 12.0976 10.6834 12.0976 10.2929 11.7071L6 7.41421L1.70711 11.7071C1.31658 12.0976 0.683417 12.0976 0.292893 11.7071C-0.0976311 11.3166 -0.0976311 10.6834 0.292893 10.2929L4.58579 6L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z" fill="currentColor"/></svg></button>`)
               
                $('._flash ul').prepend(el)

                setTimeout(()=>{
                    el.removeClass('opacity-0')
                }, 300)
                
                if(app.nCount > 5){
                    app.obClearAllButton.removeClass('hidden')
                }

                setTimeout(function() {
                    el.addClass('in')
                }, 100)

                var timer = window.setTimeout(remove, 5500)

                function removeElement() {
                    el.addClass('opacity-0')
                    setTimeout(()=>{
                        app.nCount--
                        el.remove();
                        let container = $('._flash > .flash-message');
                        if(container.length <= 5){
                            app.obClearAllButton.addClass('hidden')
                        }
                    },500)
                }            

                function remove() {
                    window.clearInterval(timer)

                    el.removeClass('in')
                    $.support.transition && el.hasClass('fade')
                        ? el
                            .one($.support.transition.end, removeElement)
                            .emulateTransitionEnd(500)
                        : removeElement()
                }
            }

        })

        this.obClearAllButton.on('click', ()=>{
            let flash = this.obContainer.find('.flash-message');
            flash.addClass('opacity-0')
            this.obClearAllButton.addClass('hidden');
            this.nCount = 0;
            setTimeout(()=>{
                flash.remove();
            },250)
        })

        $(document).on('ajaxComplete', function( event, xhr, settings ) {
            if(settings.status){
                let status = settings.status.toString().substr(0, 2);
                if(status === '10' || status === '19'){
                    app.typeMessages = 'info';
                }else if(status === '20' || status === '29'){
                    app.typeMessages = 'success';
                }else if(status === '30' || status === '39'){
                    app.typeMessages = 'warning';
                }else if(status === '40' || status === '49' || status === '50' || status === '59'){
                    app.typeMessages = 'error';
                }
            }
        })
    }
}();
