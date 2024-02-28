export default new class ResetPassword {
  constructor() {
    this.sButtonRestorePasswordClass = '_button-reset-password';
    this.sInvalidClass = '_invalid';
    this.obButton = null;

    this.initHandler();
  }

  /**
   * @description Init handler.
   */
  initHandler() {
    const obThis = this;
    document.addEventListener('click', (event) => {
      const eventNode = event.target;
      const buttonNode = eventNode.closest(`.${obThis.sButtonRestorePasswordClass}`);
      if (!buttonNode) {
        return;
      }

      buttonNode.setAttribute('disabled', 'disabled');

      obThis.sendRequest(buttonNode);
    });
  }

  /**
   * @description Send request.
   * @param {Element} buttonNode
   */
  sendRequest(buttonNode) {
    const obForm = buttonNode.closest('form');
    if (obForm.classList.contains(this.sInvalidClass)) {
      return;
    }

    oc.ajax('ResetPassword::onAjax', {
      form: obForm,
      complete: (obResponse) => {
        const obData = obResponse.responseJSON;
        if (obData.status === false) {
          // TODO: Replace alert.
          alert(obData.message);
        }

        buttonNode.removeAttribute('disabled');
      },
    });
  }
}();
