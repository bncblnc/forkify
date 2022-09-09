import View from './View';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded!';
  _ingNumber = 5;

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnAdd = document.querySelector('.btn__add');
  _btnSubmit = document.querySelector('.upload__btn');
  _ingredientsList = document.querySelector('.upload__row');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
    this._addHandlerAddIngredient();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');

    this._clearListIngredients();
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerAddIngredient() {
    this._btnAdd.addEventListener('click', this._addIngredient.bind(this));
  }

  _addIngredient(e) {
    e.preventDefault();
    const html = `
    <label>Ingredient ${this._ingNumber + 1}</label>
    <input value="" name="ing${
      this._ingNumber + 1
    }-quantity" placeholder="Quantity" />
    <input value="" name="ing${this._ingNumber + 1}-unit" placeholder="Unit" />
    <input value="" name="ing${
      this._ingNumber + 1
    }-description" placeholder="Description" />`;

    this._ingredientsList.insertAdjacentHTML('beforeend', html);
    this._ingNumber++;
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _clearListIngredients() {
    let html = '';
    this._ingNumber = 0;

    for (let i = 0; i < 5; i++) {
      html += `<label>Ingredient ${this._ingNumber + 1}</label>
      <input value="" name="ing${
        this._ingNumber + 1
      }-quantity" placeholder="Quantity" />
      <input value="" name="ing${
        this._ingNumber + 1
      }-unit" placeholder="Unit" />
      <input value="" name="ing${
        this._ingNumber + 1
      }-description" placeholder="Description" />`;

      this._ingNumber++;

      this._ingredientsList.innerHTML = '';
      this._ingredientsList.insertAdjacentHTML('afterbegin', html);
    }
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
