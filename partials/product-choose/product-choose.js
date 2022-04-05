export default new class ProductChoose {
  constructor() {
    let val = 1;
    $("#counter").html(val);
    $("#plus-btn").click((event) => {
      event.preventDefault();
      $("#counter").val(++val);
    });
    $("#minus-btn").click((event) => {
      event.preventDefault();
      if (val === 0) {
        return;
      }
      $("#counter").val(--val);
    });
  }
}();
