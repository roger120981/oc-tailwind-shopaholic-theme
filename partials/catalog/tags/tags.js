import UrlGeneration from '@oc-shopaholic/url-generation'
import Accordion from '/partials/common/accordion/accordion'

class TagList {
  constructor () {
    this.mainNode = document.querySelector('._tags');
    this.tagListNode = this.mainNode ? this.mainNode.querySelector('._tags-container') : null;
    this.resetButtonNode = this.mainNode ? this.mainNode.querySelector('._reset-all-tags') : null;
    this.propertyCount = 0;
    this.tagList = [];

    UrlGeneration.init();

    this.obFilter = document.getElementsByClassName('_filter')[0]
    this.obFilterButton = this.obFilter.querySelectorAll('._show')[0]
    this.obFilterButtonHide = null

    this.bRepetition = false
    this.obFilterProperties = []
  }

  init () {
    if (window.innerWidth <= 768) {
      this.obFilterButton.dispatchEvent(
        new InputEvent('click', {
          bubbles: true,
          cancelable: true,
        }))
      this.bRepetition = true
      this.obFilterButton.setAttribute('data-tags', true)
      this.obFilterButton.setAttribute('data-show', true)
      document.getElementsByClassName('_offCanvasContainer')[0].classList.add('hidden')

      this.initTags()
      this.watchCatalog()
      this.initFilter()
    } else {

      this.initTags()
      this.watchCatalog()
      this.initFilter()
    }
  }

  initTags () {
    this.prepareTagList();
    this.createTags()
    this.removeTag()
    this.removeAllTags()
    Accordion.make();
  }

  prepareTagList() {
    this.propertyCount = 0;
    this.tagList = [];
    for (const [key, value] of UrlGeneration.obSearchParams.entries()) {
      let tagID = null;
      if (key === 'price') {
        tagID = 'price';
      } else if (key === 'sale') {
        tagID = 'sale';
      } else if (key.indexOf('property[') === 0) {
        this.propertyCount++;
        tagID = key.replace('property[', '').replace(']', '');
      }

      if (!tagID) {
        continue;
      }

      this.tagList.push({
        id: tagID,
        value: value,
      });
    }
  }

  createTags () {
    this.tagListNode.innerHTML = '';
    if (this.tagList.length === 0) {
      return;
    }

    console.log(this.tagList);
    this.tagList.forEach((tagData) => {
      if (tagData.id === 'price') {
        // TODO: rewrite for multiple elements
        this.createPriceTag(tagData);
      } else if (tagData.id === 'sale') {
        this.createWithDiscountTag(tagData);
      } else {
        //this.createPropertyTag(tagData);
      }
    });

    if (this.tagListNode.childElementCount > 0) {
      this.mainNode.classList.remove('hidden');
    } else {
      this.mainNode.classList.add('hidden');
    }
  }

  createPriceTag (tagData) {
    const priceFilterNode = document.getElementById('price-filter');
    const priceFilterSummaryNode = priceFilterNode ? priceFilterNode.querySelector('summary') : null;
    if (!priceFilterNode || !priceFilterSummaryNode || !tagData.value) {
      return;
    }

    const filterName = priceFilterSummaryNode.innerText.trim();
    const valueList = tagData.value.split('|');
    const minValue = valueList[0];
    const maxValue = minValue.length > 1 ? valueList[1] : null;
    if (!minValue && !maxValue) {
      return;
    }

    const tagText = this.generatePriceTagText(minValue, maxValue, priceFilterNode);
    const tagHTML = `${filterName}: ${tagText}`;

    const tagNode = document.createElement('li');
    tagNode.dataset.name = tagData.id;
    tagNode.className = 'whitespace-nowrap me-3 mb-3 capitalize bg-white rounded shadow py-3 ps-3 pe-5 flex items-center justify-between text-gray-600 text-base lg:text-sm';
    tagNode.innerHTML = tagHTML + ` <button class="_delete-tag text-gray-900 p-2 -m-2 ms-3 hover:text-blue-700 active:text-blue-900 focus-visible:ring-1 focus-visible:ring-blue-800 focus-visible:ring-offset-1 focus-visible:ring-offset-white focus:outline-none focus:text-blue-800" type="button" data-id="${tagData.id}"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg></button>`;
    this.tagListNode.appendChild(tagNode);
  }

  generatePriceTagText(minValue, maxValue, priceFilterNode) {
    let tagText = '';
    if (!minValue && maxValue) {
      tagText = `${priceFilterNode.dataset.translateTo} ${maxValue}`;
    } else if (minValue && (!maxValue || minValue >= maxValue)) {
      tagText = `${priceFilterNode.dataset.translateFrom} ${minValue}`;
    } else {
      tagText = `${minValue} - ${maxValue}`;
    }

    return tagText
  }

  createWithDiscountTag(tagData) {
    const discountFilterNode = document.querySelector('._shopaholic-sale-filter-wrapper');
    const discountLabelNode = discountFilterNode ? discountFilterNode.querySelector('label[for="sale"]') : null;
    if (!discountFilterNode || !discountLabelNode) {
      return;
    }

    const filterName = discountLabelNode.innerText.trim();

    const tagNode = document.createElement('li');
    tagNode.dataset.name = tagData.id;
    tagNode.className = 'whitespace-nowrap me-3 mb-3 capitalize bg-white rounded shadow py-3 ps-3 pe-5 flex items-center justify-between text-gray-600 text-base lg:text-sm';
    tagNode.innerHTML = filterName + ` <button class="_delete-tag text-gray-900 p-2 -m-2 ms-3 hover:text-blue-700 active:text-blue-900 focus-visible:ring-1 focus-visible:ring-blue-800 focus-visible:ring-offset-1 focus-visible:ring-offset-white focus:outline-none focus:text-blue-800" type="button" data-id="${tagData.id}"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg></button>`;
    this.tagListNode.appendChild(tagNode);
  }

  createPropertyTag(tagData) {
    const filterNode = document.querySelector(`_shopaholic-filter-wrapper[data-property-id=${tagData.id}]`);
    const filterType = filterNode ? filterNode.dataset.filterType : null;
    if (!filterNode || !filterType) {
      return;
    }

    const filterName = this.getFilterLabel(tagData, filterNode, filterType);

    const tagNode = document.createElement('li');
    tagNode.dataset.name = tagData.id;
    tagNode.className = 'whitespace-nowrap me-3 mb-3 capitalize bg-white rounded shadow py-3 ps-3 pe-5 flex items-center justify-between text-gray-600 text-base lg:text-sm';
    tagNode.innerHTML = filterName + ` <button class="_delete-tag text-gray-900 p-2 -m-2 ms-3 hover:text-blue-700 active:text-blue-900 focus-visible:ring-1 focus-visible:ring-blue-800 focus-visible:ring-offset-1 focus-visible:ring-offset-white focus:outline-none focus:text-blue-800" type="button" data-id="${tagData.id}"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg></button>`;
    this.tagListNode.appendChild(tagNode);
  }

  getFilterLabel(tagData, filterNode, filterType) {
    if (filterType === 'checkbox') {

    }
  }

  createTagsFiltres (props) {
    let id = props.id
    const elemsDetails = document.getElementById(id)
    if(!elemsDetails) return false
    let section =  props.id == 'sale' ?  document.querySelector('label[for="sale"]') : elemsDetails.querySelector('summary')
    const sectionText = section.innerText.trim()
    props.value.forEach(prop => {
      let text = document.querySelector(`[for="${prop}"]`)
      let tag = document.createElement('li')
      tag.dataset.name = prop
      tag.className = 'whitespace-nowrap me-3 mb-3 capitalize bg-white rounded shadow py-3 ps-3 pe-5 flex items-center justify-between text-gray-600 text-base lg:text-sm'
      tag.innerHTML = `${text ? sectionText + ': ' : sectionText } ${text ? text.innerText : ''}  <button class="_delete-tag text-gray-900 p-2 -m-2 ms-3 hover:text-blue-700 active:text-blue-900 focus-visible:ring-1 focus-visible:ring-blue-800 focus-visible:ring-offset-1 focus-visible:ring-offset-white focus:outline-none focus:text-blue-800" type="button" data-id='${props.id == 'sale' ? 'sale' : prop}'> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg></button>`
      this.tagListNode.appendChild(tag)
    })
  }

  removeTag () {
    const tags = document.querySelectorAll('._delete-tag')
    for (let tag of tags) {
      tag.addEventListener('click', (elem) => {
        if (tag.dataset.id == 'price') {
          // TODO: rewrite for multiple elements
          const inputs = document.querySelectorAll('#price ._shopaholic-price-filter')
          inputs.forEach(input => {
            input.value = ''
            input.dispatchEvent(
              new InputEvent('change', {
                bubbles: true,
                cancelable: true,
              }))
          })
        } else {
          const tagElementId =  document.getElementById(`${elem.target.closest('._delete-tag').dataset.id}`)
          tagElementId.checked = false
          tagElementId.dispatchEvent(
            new InputEvent('change', {
              bubbles: true,
              cancelable: true,
            }))
        }
        if (this.tagListNode.childElementCount <= 1) {
          this.mainNode.classList.add('hidden')
        }
      })
    }
  }

  removeAllTags () {
    for (let resetAll of document.querySelectorAll('._reset-all-tags')) {
      resetAll.addEventListener('click', (elem) => {
        let url = window.location.href.split('?')[0]
        window.location.href = url
      })
    }
  }

  watchCatalog () {
    let app = this
    var target = document.getElementsByClassName('_sorting')[0]

    const config = {
      childList: true,
    }

    const callback = function (mutationsList, observer) {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          app.initTags()
          if (app.tagListNode.childElementCount < 1) {
            app.mainNode.classList.add('hidden')
          }
        }
      }
    }

    const observer = new MutationObserver(callback)

    observer.observe(target, config)
  }

  initFilter () {
    if (!this.obFilterButton) {
      return;
    }

    this.obFilterButton.addEventListener('click', () => {
      this.mobile()
      this.initTags()
      if (this.bRepetition) {
        this.obFilterButton.removeAttribute('data-tags')
        document.getElementsByClassName('_offCanvasContainer')[0].classList.remove('hidden')
      }
    })
  }

  mobile () {
    this.mainNode = document.getElementsByClassName('_tags')[0]
    this.tagListNode = this.mainNode.querySelectorAll('._tags-container')[0]
    this.resetButtonNode = this.mainNode.querySelectorAll('._reset-all-tags')[0]
    this.obFilter = document.getElementsByClassName('_filter')[0]
    this.obFilterButton = this.obFilter.querySelectorAll('._show')[0]

    this.propertyCount = null
    this.obFilterProperties = []
  }

  static initHandlers() {
    document.addEventListener('product:list.updated', () => {
      const obTagList = new TagList();
      obTagList.init();
    });
  }
}

TagList.initHandlers();
