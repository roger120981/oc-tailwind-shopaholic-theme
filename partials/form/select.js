import UrlGeneration from "@oc-shopaholic/url-generation";

export default class Select {
  constructor () {}

  initSummaryEvents () {
    this.clearOptions();
  }

  clearOptions () {
    document.addEventListener("click", (event) => {
      const eventNode = event.target;
      const buttonNode = eventNode.closest(".js-clear-options");
      if (!buttonNode) {
        return;
      }
      this.clearValueOptions(buttonNode);
      buttonNode.classList.add("hidden");
    });
  }

  clearValueOptions (buttonNode) {
    const select = buttonNode.parentNode.querySelector("select");
    select.value = "";
    select.dispatchEvent(
      new InputEvent("change", {
          bubbles: true,
          cancelable: true
        }
      ));
  }
}

oc.pageReady().then(() => {
  const select = new Select();
  select.initSummaryEvents();
});
