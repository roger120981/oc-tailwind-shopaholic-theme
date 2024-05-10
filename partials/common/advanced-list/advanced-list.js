class AdvancedList {
  constructor() {
    this.wrapperNode = document.querySelector("._advanced-list");
    this.buttonShowMoreNode = document.querySelector("._advanced-list-button-show-all");
    this.buttonShowMoreHiddenNode = document.querySelector("._advanced-list-button-show-all-hidden");
  }

  init() {
    if (!this.wrapperNode || !this.buttonShowMoreNode) {
      return;
    }

    this.buttonShowMoreNode.addEventListener("click", () => {
      this.buttonShowMoreNode.classList.add("hidden");
      this.buttonShowMoreHiddenNode.classList.remove("hidden");

      setTimeout(() => {
        const advancedNodeList = this.wrapperNode.querySelectorAll('li.hidden')
        advancedNodeList.forEach(advancedNode => {
          advancedNode.removeAttribute("aria-hidden");
          advancedNode.classList.remove("hidden");
        })

        this.buttonShowMoreHiddenNode.classList.add("hidden");
      }, 300);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const obAdvancedList = new AdvancedList();
  obAdvancedList.init();
});
