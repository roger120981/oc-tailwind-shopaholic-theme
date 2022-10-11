export default new class InputQuantity {
  constructor() {
    this.initialization();
  }

  initialization() {
    const obCounter = document.getElementsByClassName('_counter');
    Array.from(obCounter).forEach(function (app) {
      const obCounter = app;
      const obMinus = obCounter.querySelectorAll("._decrement");
      const obPlus = obCounter.querySelectorAll("._increment");
      const obCount = obCounter.querySelectorAll("._count");
      let sQuantityCount = obCount[0].getAttribute('value');

      (function () {
        counterInitialization();
      })()

      obCount[0].addEventListener("input", (ev) => {
        setValue(ev.target.value);
        sQuantityCount = ev.target.value;

        counterInitialization();
      });

      function getInput() {
        return obCount[0];
      }

      function getValue() {
        return getInput().value;
      }

      function setValue(value) {
        getInput().setAttribute('value', value);
        getInput().value = value;
      }

      function getMax() {
        return getInput().getAttribute('max');
      }

      function getMin() {
        return getInput().getAttribute('min');
      }

      function isMin() {
        return Number(getValue()) <= Number(getMin());
      }

      function isMax() {
        return Number(getValue()) >= Number(getMax());
      }

      function stateButton(button, state) {
        if(state){
          button.setAttribute('disabled', '');
        } else {
          button.removeAttribute('disabled');
        }
      }

      function counterInitialization() {
        if (!isMin()) {
          stateButton(obMinus[0], false);
        }
        if (isMin()) {
          stateButton(obMinus[0], true);
        }

        if (!isMax()) {
          stateButton(obPlus[0], false);
        }

        if (isMax()) {
          stateButton(obPlus[0], true);
        }
      }

      obMinus[0].addEventListener("click", () => {
        if (!isMin()) {
          sQuantityCount--;
          setValue(sQuantityCount);
          stateButton(obMinus[0], false);
        }

        if (isMin()) {
          stateButton(obMinus[0], true);
        }

        if (!isMax()) {
          stateButton(obPlus[0], false);
        }
      });

      obPlus[0].addEventListener("click", () => {
        if (!isMax()) {
          sQuantityCount++;
          setValue(sQuantityCount);
          stateButton(obPlus[0], false);
        }
        if (isMax()) {
          stateButton(obPlus[0], true);
        }
        if (!isMin()) {
          stateButton(obMinus[0], false);
        }
      })
    });
  }
}
