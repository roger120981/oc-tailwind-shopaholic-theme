export default new class AccountOrderItems {
  constructor() {
    this.handler();
  }

  handler() {
    $('._account-order-items').click(function () {
      $(this).toggleClass('active').next()[$(this).next().is(':hidden') ? "slideDown" : "fadeOut"](400);
    });
  }
}();
