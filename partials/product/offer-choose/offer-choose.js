import ShopaholicCartAdd from '@oc-shopaholic/shopaholic-cart/shopaholic-cart-add';

class OfferChoose {
  initOfferSelectHandler() {
    document.addEventListener('change', (event) => {
      const eventNode = event.target;
      const offerInput = eventNode.closest('[name="offer_id"]');
      if (!offerInput) {
        return;
      }

      oc.ajax('onAjax', {
        data: {
          offer_id: offerInput.value,
        },
        update: {
          'product/product-tabs/product-tab-details-ajax': '._product_tab_details'
        },
      });
    });
  }

  initPropertySelectHandler() {
    document.addEventListener('change', (event) => {
      const eventNode = event.target;
      const wrapperNode = eventNode.closest('._offer-choose-property');
      if (!wrapperNode) {
        return;
      }

      const labelNode = wrapperNode.querySelector('label');
      const offerNode = wrapperNode.querySelector('._offer-choose-property-input');
      if (!labelNode || !offerNode) {
        return;
      }

      if (!offerNode.value) {
        const propertyId = offerNode.dataset.propertyId;
        this.removeTag(propertyId);

        return;
      }

      let valueText = '';
      if (offerNode.tagName === 'SELECT') {
        valueText = offerNode.selectedOptions[0].text;
      } else {
        valueText = offerNode.innerText.trim();
      }

      const tagID = offerNode.dataset.propertyId;
      const tagHTML = `${labelNode.innerText.trim()}: ${valueText}`;
      const tagNode = this.findTag(tagID);
      const contentNode = tagNode ? tagNode.querySelector('._tag_content') : null;
      if (contentNode) {
        contentNode.innerHTML = tagHTML;
      } else {
        this.addTagNode({id: tagID}, tagHTML, offerNode.value);
      }
    });
  }

  addTagNode(tagData, tagHTML, value) {
    const tagNode = document.createElement('li');
    tagNode.dataset.propertyId = tagData.id;
    tagNode.dataset.propertyValue = value;

    tagNode.className = 'whitespace-nowrap me-3 mb-3 capitalize bg-white rounded shadow py-3 ps-3 pe-5 flex items-center justify-between text-gray-600 text-base lg:text-sm';
    tagNode.innerHTML =  `<span class="_tag_content">${tagHTML}</span> <button class="_delete-tag text-gray-900 p-2 -m-2 ms-3 hover:text-blue-700 active:text-blue-900 focus-visible:ring-1 focus-visible:ring-blue-800 focus-visible:ring-offset-1 focus-visible:ring-offset-white focus:outline-none focus:text-blue-800" type="button"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg></button>`;

    const tagListNode = document.querySelector('._tags-container');
    if (tagListNode) {
      tagListNode.appendChild(tagNode);
    }
  }

  findTag(tagID) {
    const tagListNode = document.querySelector('._tags-container');
    const tagNode = tagListNode ? tagListNode.querySelector(`[data-property-id="${tagID}"]`) : null;

    return tagNode;
  }

  removeTagHandler() {
    document.addEventListener('click', (event) => {
      const eventNode = event.target;
      const buttonNode = eventNode.closest('._delete-tag');
      if (!buttonNode) {
        return;
      }

      const listNode = buttonNode.closest('li');
      const propertyId = listNode ? listNode.dataset.propertyId : null;
      this.removeTag(propertyId);
    });
  }

  removeTag(propertyId) {
    if (!propertyId) {
      return;
    }

    const listNode = document.querySelector(`._tags-container li[data-property-id="${propertyId}"]`);
    const inputNode = propertyId ? document.querySelector(`._offer-choose-property-input[data-property-id="${propertyId}"]`) : null;

    if (listNode) {
      listNode.remove();
    }

    if (inputNode && inputNode.value) {
      inputNode.value = '';
      inputNode.dispatchEvent(new CustomEvent('clear', {bubbles: true, cancelable: true}));
    }
  }

  initAddToCartHandler(){

    const shopaholicCartAdd = new ShopaholicCartAdd();
    shopaholicCartAdd.setAjaxRequestCallback((requestData, button) => {

      requestData.update = {'main/header-ajax': '._header-purchases'};
      requestData.complete = (data) => {
        shopaholicCartAdd.completeCallback(data, button);
        // let content = document.querySelector(`.${this.cartPopupWrapper}`);
        // if (content.classList.contains('hidden')) {
        //   content.classList.remove('hidden')
        //
        //   document.body.classList.add('overflow-hidden')
        // } else {
        //   content.classList.add('hidden');
        //   document.body.classList.remove('overflow-hidden')
        // }
      };

      return requestData;
    }).init();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const obOfferChoose = new OfferChoose();
  obOfferChoose.initOfferSelectHandler();
  obOfferChoose.initPropertySelectHandler();
  obOfferChoose.removeTagHandler();
});
