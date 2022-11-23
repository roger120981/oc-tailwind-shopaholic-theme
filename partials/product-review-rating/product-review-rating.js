import request from 'oc-request';

export default new class productReviewRating {
    constructor(){
        this.obContainerStarReview = null;
        this.obContainerReview = null;

        this.obShow = document.getElementsByClassName('_off-canvas _write-review')[0].querySelectorAll('._show')[0];
        this.obShowParents = document.getElementsByClassName('_review-list-container')[0].querySelectorAll('._show')[0];
        this.obShowImitation = null;
        this.nActive = null;

        this.obListWrapper = '_review-list-update';
        this.sActiveStar = '#F59E0B';
        this.sDefaultStar = '#D1D5DB';
        this.init();
    }

    sendReview(){
        this.obContainerReview = document.querySelectorAll('._review-container button')[0];
        this.obContainerReview.addEventListener('click', (event) => {
            event.preventDefault();

            const form = document.querySelector('._review-container');
  
            request.sendForm(form, 'MakeReview::onCreate', {
                update: {
                    'review-list/review-list-ajax': `.${this.obListWrapper}`
                },
                complete: ()=> {
                    location.reload(true);
                }
            });
        });
    }

    starState(state, count){
       if(state){
            for(let i = 0; count > i; i++){
                this.obContainerStarReview[i].querySelectorAll('path')[0].style.fill = this.sActiveStar;
            }
       }else{
            for(let i = 0; count > i; i++){
                this.obContainerStarReview[i].querySelectorAll('path')[0].style.fill = this.sDefaultStar;
            }
       }
    }

    starSelect(){
        const app = this;
        for (let star of this.obContainerStarReview) {
            star.addEventListener('click', (elem)=>{
                let active = elem.target.closest('label').dataset.rating;
                if(active < app.nActive){
                    app.starState(false, app.nActive);
                    app.starState(true, active);
                }else{
                    app.starState(true, active);
                }
                app.nActive = active;
            });
        }
    }

    windowHover(){
        const app = this;
        window.addEventListener('mouseover', (elem) =>{
            if(!document.getElementsByClassName('_container-star-review')[0].contains(elem.target)){
                if(app.nActive){
                    app.starState(false, 5);
                    app.starState(true, app.nActive);
                }else{
                    app.starState(false, 5);
                }
            }
        })
    }

    starHover(){
        const app = this;
        for (let star of this.obContainerStarReview) {
            star.addEventListener('mouseover', (elem)=>{
                let active = elem.target.closest('label').dataset.rating;
                app.starState(true, active);
            });
        }
    }

    initEvents(){
        this.windowHover();
        this.starHover();
        this.starSelect();
        this.sendReview();
    }

    init(){
        this.obShowParents.addEventListener('click', ()=>{
            this.obShowImitation = document.getElementsByClassName('_review-list-container')[0].querySelectorAll('._write-review')[0];
            this.obShowImitation.addEventListener('click', ()=>{
                document.getElementsByClassName('_review-list-container')[0].querySelectorAll('._hide')[0].dispatchEvent(
                new InputEvent('click', {
                    bubbles: true,
                    cancelable: true,
                }));
                setTimeout(()=>{
                    this.obShow.dispatchEvent(
                    new InputEvent('click', {
                        bubbles: true,
                        cancelable: true,
                    }));
                }, 400)
            })           
        })
        this.obShow.addEventListener('click', ()=>{
            setTimeout(()=>{
                this.obContainerStarReview = document.getElementsByClassName('_container-star-review')[0].querySelectorAll('label');
                this.starState(true, 5);
                this.nActive = 5;
                this.initEvents();
            }, 10)
        })
    }
}
