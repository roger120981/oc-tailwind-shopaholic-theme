export default new class Info {
  constructor() {
    const ids = {
      "details": false,
      "shipping": false,
    };
    /* mobile */
    $(".accordion-nav button").click((event) => {
      event.preventDefault();
      const btn = $(event.target);
      const id = "rollout-" + btn.data("tab")
      ids[id] = !ids[id];
      if (ids[id]) {
        btn.removeClass("text-blue-800");
        btn.children("img").first().addClass("rotate-180");
        $(`#${id}`).show(200);
      } else {
        btn.addClass("text-blue-800");
        btn.children("img").first().removeClass("rotate-180");
        $(`#${id}`).hide(200);
      }
    });
    /* web app */
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
      $("#tab-" + btn.data("tab")).show(200);
    });
   }
}();
