import {EVENT_OPEN} from '/partials/off-canvas/off-canvas';

export default class Filter {
  constructor() {
    this.filterNode = null
    this.templateNode = null
  }

  init() {
    this.filterNode = document.querySelector('._filter');
    if (!this.filterNode) {
      return;
    }

    this.templateNode = this.filterNode.querySelector('._filterTemplate');

    this.adaptation()
    this.initAccordionState()
  }

  /**
   * Copy desktop filter from template
   */
  adaptation() {
    if (window.innerWidth >= '768' && this.filterNode && this.filterNode.childElementCount <= 2 && this.templateNode) {
      const obLocalNodeContainer = this.templateNode.content.cloneNode(true);
      this.filterNode.appendChild(obLocalNodeContainer);
    }
  }

  /**
   * Get filter state from local storage
   */
  initAccordionState() {
    const filterDetails = document.querySelectorAll('._filter-details');
    if (!filterDetails || filterDetails.length === 0) {
      return;
    }

    filterDetails.forEach((filterDetailNode) => {
      const detailsData = sessionStorage.getItem(`filter-details-${filterDetailNode.id}`);
      if (!detailsData) {
        return;
      }

      const summaryNode = filterDetailNode.querySelector('summary');
      const propertyNode = document.querySelector(`[data-property-id="${filterDetailNode.id}"]`);
      if (summaryNode) {
        summaryNode.classList.remove('after:transition-none');
      }

      if (propertyNode && detailsData === 'open') {
        propertyNode.setAttribute('open', '');
      } else if (propertyNode && detailsData === 'close') {
        propertyNode.removeAttribute('open');
      }

      if (summaryNode && detailsData === 'open') {
        summaryNode.dispatchEvent(new MouseEvent('click'));
      }
    });
  }

  static initEvents() {
    document.addEventListener('click', (event) => {
      const eventNode = event.target;
      const summaryNode = eventNode.closest('._filter-details summary');
      if (!summaryNode) {
        return;
      }

      summaryNode.classList.remove('after:transition-none');
      const detailsNode = summaryNode.closest('details');
      if (!detailsNode) {
        return;
      }

      sessionStorage.setItem(`filter-details-${detailsNode.id}`, !detailsNode.open ? 'open' : 'close');
    });
  }
}

oc.pageReady().then(() => {
  Filter.initEvents();

  oc.ajax('onInit', {
    update: {'catalog/filter/filter-ajax': '._filter'},
    complete: () => {
      const obFilter = new Filter();
      obFilter.init();

      document.addEventListener(EVENT_OPEN, (event) => {
        obFilter.initAccordionState();
      });
    }
  })
});
