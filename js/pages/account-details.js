import '/js/vendor/validation';

class AccountDetails {
  constructor() {
    this.formNode = document.querySelector('#account-details');
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
      obThis.sendUpdateAddressRequest();
    });
  }

  sendRequest() {
    if (this.formNode.classList.contains('_invalid')) {
      return;
    }

    this.buttonNode.setAttribute('disabled', 'disabled');
    const obThis = this;

    oc.request('#account-details', 'UserPage::onAjax', {
      complete: (response) => {
        obThis.buttonNode.removeAttribute('disabled');
      },
    });
  }

  sendUpdateAddressRequest() {
    if (this.formNode.classList.contains('_invalid')) {
      return;
    }

    const inputIDNode = this.formNode.querySelector('[name="address_id"]');
    const inputCountryNode = this.formNode.querySelector('[name="country"]');
    const inputCityNode = this.formNode.querySelector('[name="city"]');
    const inputPostcodeNode = this.formNode.querySelector('[name="postcode"]');
    const inputAddressNode = this.formNode.querySelector('[name="address"]');

    oc.ajax('UserAddress::onUpdate', {
      data: {
        id: inputIDNode ? inputIDNode.value : null,
        country: inputCountryNode ? inputCountryNode.value : null,
        city: inputCityNode ? inputCityNode.value : null,
        postcode: inputPostcodeNode ? inputPostcodeNode.value : null,
        address1: inputAddressNode ? inputAddressNode.value : null,
      },
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const obAccountDetails = new AccountDetails();
  obAccountDetails.initHandler();
});
