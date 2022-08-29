import ShopaholicProductList from '@lovata/shopaholic-product-list/shopaholic-product-list';
import ShopaholicSorting from '@lovata/shopaholic-product-list/shopaholic-sorting';
import ShopaholicPagination from '@lovata/shopaholic-product-list/shopaholic-pagination';
import Filter from '../filter/filter'

export default new class Sorting{
    constructor() {
        this.obSorting = $('._sorting-container');
        this.obContainer = this.obSorting.find('.catalog_wrapper');
        
        this.handlers();
    }

    handlers(){
        new Filter();
        this.initContainerWatch();
        const obListHelper = new ShopaholicProductList();
        obListHelper.setAjaxRequestCallback((obRequestData) => {
        obRequestData.update = {
            'sorting/sorting': `._sorting`,
        };
        return obRequestData;
        });

        const obPaginationHelper = new ShopaholicPagination(obListHelper);
        obPaginationHelper.init();

        const obSortingHelper = new ShopaholicSorting(obListHelper);
        obSortingHelper.init();
    }

    initContainerWatch(){
        let app = this;
        var target = this.obSorting[0];

        const config = {
            childList: true,
            subtree: true, 
        };

        const callback = function (mutationsList, observer) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    let container = app.obSorting.find('.catalog_wrapper');
                    let count = container[0].childElementCount;
                    let sorting = app.obSorting.find('._sorting-filter');
                    let pagination = app.obSorting.find('._pagination');
                    let paginationMax = sorting.data('pagination-max');
                    let paginationPage = sorting.data('pagination-page');

                    if(count <= 1){
                        sorting.addClass('hidden');
                    }else{
                        sorting.removeClass('hidden');
                    }

                    // if(count <= 14 && paginationPage !== paginationMax){
                    //     pagination.addClass('hidden');
                    // }else{
                    //     pagination.removeClass('hidden');
                    // }
                    new Filter();
                }
            }
        };

        const observer = new MutationObserver(callback);

        observer.observe(target, config);
    }
}();
