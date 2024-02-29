export default new class ProductListSmall {
  constructor() {
    this.sProductListSmallWrapperClass = '_product-list-small';
    this.sProductListSmallButtonShowMoreWrapperClass = '_product-list-small-button';
    this.productListSmallButtonNode = document.querySelector('._product-list-small-button-more');

    this.showMoreList();
  }

  /**
   * @description Show more list.
   */
  showMoreList() {
    if (!this.productListSmallButtonNode) {
      return
    }

    this.productListSmallButtonNode.addEventListener('click', (event) => {
      const eventNode = event.target;
      eventNode.setAttribute('disabled', 'disabled');

      const obThis = this;
      const sProductListSmallListType = eventNode.dataset.productListSmallType;
      const iPage = eventNode.dataset.page;
      const iTake = eventNode.dataset.take;
      const iProductId = eventNode.dataset.productId;
      const sButtonName = eventNode.innerHTML;
      oc.ajax('onInit', {
        data: {
          'product_list_small_list_type': sProductListSmallListType,
          'page': iPage,
          'take': iTake,
          'product_id': iProductId,
          'button_name': sButtonName
        },
        update: {
          'product-list-small/product-list-small-ajax': `@.${this.sProductListSmallWrapperClass}`,
          'product-list-small/product-list-small-button-ajax': `.${this.sProductListSmallButtonShowMoreWrapperClass}`
        },
        complete: function () {
          obThis.productListSmallButtonNode = document.querySelector('._product-list-small-button-more');
          obThis.showMoreList();
        }
      });
    });
  }
}();
