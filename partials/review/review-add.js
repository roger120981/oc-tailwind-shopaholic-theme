import {OffCanvasContainer} from '/partials/common/off-canvas/off-canvas'

class AddReview {
  constructor() {
    this.formNode = document.querySelector('#add-review-from');
    this.closeButtonNode = document.querySelector('._close_add_review');
  }

  init() {
    this.formHandler();
    this.closeHandler();
  }

  formHandler() {
    if (!this.formNode) {
      return;
    }

    this.formNode.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();

      oc.request('#add-review-from', 'MakeReview::onCreate', {
        complete: (response) => {
          if (!response.status) {
            return;
          }

          this.formNode.classList.add('hidden');
          const messageNode = document.querySelector('._add_review_success');
          if (messageNode) {
            messageNode.classList.remove('hidden');
          }
        }
      });
    });
  }

  closeHandler() {
    if (!this.closeButtonNode) {
      return;
    }

    this.closeButtonNode.addEventListener('click', () => {
      OffCanvasContainer.instance().close('review_add');
    })
  }
}

document.addEventListener('off-canvas:open', (event) => {
  if (event.detail.id !== 'review_add') {
    return;
  }

  const obAddReview = new AddReview();
  obAddReview.init();
});
