export default new class ProductChoose {
  constructor() {
    let val = 1;
    $("#counter").html(val);
    $("#plus-btn").click((event) => {
      event.preventDefault();
      $("#counter").html(++val);
    });
    $("#minus-btn").click((event) => {
      event.preventDefault();
      if (val === 0) {
        return;
      }
      $("#counter").html(--val);
    });
  }
}();
