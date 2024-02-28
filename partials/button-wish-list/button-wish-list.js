import ShopaholicAddWishList from '@oc-shopaholic/shopaholic-wish-list/shopaholic-add-wish-list';
import ShopaholicRemoveWishList from '@oc-shopaholic/shopaholic-wish-list/shopaholic-remove-wish-list';

export default new class ButtonWishList {
  constructor() {
    this.sAddButtonClass = 'text-white';
    this.sAddSvgClass = 'group-hover:fill-current';
    this.sRemoveButtonClass = 'text-red-500';
    this.sRemoveSvgClass = 'fill-current';
    this.obButton = null;

    this.sTypeAdd = 'add';
    this.sTypeRemove = 'remove';

    this.obAddHelper = new ShopaholicAddWishList();
    this.obRemoveHelper = new ShopaholicRemoveWishList();

    this.initAddHandler();
    this.initRemoveHandler();
  }

  /* eslint-disable no-param-reassign */
  /**
   * @description Init add handler.
   */
  initAddHandler() {
    const obThis = this;
    this.obAddHelper.setAjaxRequestCallback((obRequestData, obButton) => {
      obThis.obButton = obButton;
      obThis.obButton.setAttribute('disabled', 'disabled');
      obRequestData.complete = () => {
        const obButton = obThis.obButton;
        const sType = obThis.sTypeRemove;
        this.changeButtonView(obButton, sType);
      };

      return obRequestData;
    }).init();
  }

  /**
   * @description Init remove handler.
   */
  initRemoveHandler() {
    const obThis = this;
    this.obRemoveHelper.setAjaxRequestCallback((obRequestData, obButton) => {
      obThis.obButton = obButton;
      obThis.obButton.setAttribute('disabled', 'disabled');
      obRequestData.complete = () => {
        const obButton = obThis.obButton;
        const sType = obThis.sTypeAdd;
        this.changeButtonView(obButton, sType);
      };

      return obRequestData;
    }).init();
  }
  /* eslint-enable */

  /**
   * @description Change button view..
   * @param {object} obButton
   * @param {string} sType
   */
  changeButtonView(obButton, sType) {
    const obSvg = obButton.querySelector('svg');

    if (sType === this.sTypeAdd) {
      if (obSvg.classList.contains('_card-list-chekout')) {
        this.sAddButtonClass = 'text-gray-600';
      }else{
        obSvg.classList.add(this.sAddSvgClass);
      }
      obSvg.classList.remove(this.sRemoveSvgClass);
      obButton.classList.remove(this.obRemoveHelper.sDefaultButtonClass);
      obButton.classList.add(this.obAddHelper.sDefaultButtonClass);
      obButton.classList.remove(this.sRemoveButtonClass);
      obButton.classList.add(this.sAddButtonClass);
    } else {
      if(obSvg.classList.contains('_card-list-chekout')){
        this.sAddButtonClass = 'text-gray-600';
      }else{
        obSvg.classList.remove(this.sAddSvgClass);
      }
      obSvg.classList.add(this.sRemoveSvgClass);
      obButton.classList.remove(this.obAddHelper.sDefaultButtonClass);
      obButton.classList.add(this.obRemoveHelper.sDefaultButtonClass);
      obButton.classList.remove(this.sAddButtonClass);
      obButton.classList.add(this.sRemoveButtonClass);
    }

    obButton.removeAttribute('disabled');
  }
}();
