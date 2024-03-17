import VanillaTabs from '../../../assets/src/js/vanila-tabs/vanilla-tabs.js';

document.addEventListener('DOMContentLoaded', () => {
  new VanillaTabs({
    'selector': '._tabs-product',
    'type': 'horizontal',
    'responsiveBreak': 840,
    'activeIndex' : 0
  });
});
