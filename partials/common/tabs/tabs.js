import VanillaTabs from '/js/vendor/vanila-tabs/vanilla-tabs.js';

oc.pageReady().then(() => {
  new VanillaTabs({
    'selector': '._tabs-product',
    'type': 'horizontal',
    'responsiveBreak': 840,
    'activeIndex' : 0
  });
});
