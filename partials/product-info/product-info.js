export default new class Info {
  constructor() {
    const ids = {
      "details": false,
      "shipping": false,
    };

    /* Mobile */
    $(".accordion-nav button").click((event) => {
      event.preventDefault();
      toggleAccordion($(event.target));
    });
    $(".accordion-nav button > span").click((event) => {
      event.preventDefault();
      toggleAccordion($(event.target).parent());
    });
    $(".accordion-nav button > svg").click((event) => {
      event.preventDefault();
      toggleAccordion($(event.target).parent());
    });

    const toggleAccordion = (btn) => {
      const id = "rollout-" + btn.data("tab");
      ids[id] = !ids[id];
      if (ids[id]) {
        btn.removeClass("text-blue-800");
        btn.children("svg").first().css("transform", "rotate(180deg)");
        $(`#${id}`).slideDown("quick")
      } else {
        btn.addClass("text-blue-800");
        btn.children("svg").first().css("transform", "");
        $(`#${id}`).slideUp("quick")
      }
    };

    /* Web app */
    $(".tab-nav button").click((event) => {
      event.preventDefault();

      $(".tab-nav button")
        .removeClass("border-b-4")
        .removeClass("border-blue-800");

      const btn = $(event.target);
      btn
        .addClass("border-b-4")
        .addClass("border-blue-800");

      $('.tabs > div').hide(200);
      $("#" + btn.data("tab") + "-tab").show(200);
    });
   }
}();
