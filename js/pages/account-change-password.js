import '/js/vendor/validation';

class ChangePassword {
  constructor() {
    this.formNode = document.querySelector('#change-password');
    this.buttonNode = this.formNode ? this.formNode.querySelector('button[type="submit"]') : null;
  }

  initHandler() {
    if (!this.formNode) {
      return;
    }

    const obThis = this;
    this.formNode.addEventListener('submit', (event) => {
      event.stopPropagation();
      event.preventDefault();

      obThis.sendRequest();
    });
  }

  sendRequest() {
    if (this.formNode.classList.contains('_invalid')) {
      return;
    }

    this.buttonNode.setAttribute('disabled', 'disabled');
    const obThis = this;

    oc.request('#change-password', 'ChangePassword::onAjax', {
      complete: (response) => {
        obThis.buttonNode.removeAttribute('disabled');
      },
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const obChangePassword = new ChangePassword();
  obChangePassword.initHandler();
});
