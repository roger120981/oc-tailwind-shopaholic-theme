import request from 'oc-request';

export default new class CustomerReviews {
  constructor() {
    this.obLoadMore = document.getElementsByClassName('_show-more-reviews')[0];
    this.obListWrapper = '_review-list';
    
    this.init();
  }

  init(){
    console.log(this.obLoadMore)
    this.obLoadMore.addEventListener("click", () => {
      const iPage = parseInt(this.obLoadMore.dataset.page, 10);
      const iNextPage = iPage + 1;
      const iMaxPage = parseInt(this.obLoadMore.dataset.maxPage, 10);
      
      this.sendAjax(iNextPage);

      if (iNextPage >= iMaxPage) {
        this.obLoadMore.remove();
      } else {
        this.obLoadMore.setAttribute('data-page', iNextPage);
      }
    });
  }

  sendAjax(iNextPage) {
    request.sendData('ProductData::onAjaxRequest', {
      data: { page: iNextPage },
      update: {'review-list/review-list-ajax': `@.${this.obListWrapper}`}
    });
  }
}();
