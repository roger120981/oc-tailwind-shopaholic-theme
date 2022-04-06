export default new class AdvancedList {
  constructor() {
    this.sAdvancedListWrapperClass = '_advanced-list';
    this.sAdvancedListButtonShowMoreClass = '_advanced-list-button-show-all';
    this.obButton = null;

    this.showAllList();
  }

  /**
   * @description Show all list.
   */
  showAllList() {
    $(document).on('click', `.${this.sAdvancedListButtonShowMoreClass}`, (obEvent) => {
      this.obButton = $(obEvent.target);
      this.obButton.attr('disabled', 'disabled');

      const sAdvancedListType = this.obButton.attr('data-advanced-list-type');
      const self = this;

      $.request('onInit', {
        data: {'advanced_list_type': sAdvancedListType},
        update: {'advanced-list/advanced-list-ajax': `.${this.sAdvancedListWrapperClass}`},
        complete: function () {
          self.obButton.removeAttr('disabled');
          $('._advanced-list-button-show-all').css('display', 'none');
        },
      });
    });
  }
}();
