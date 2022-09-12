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
    clearInvalids(true);
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
    if (!validateIng(this._ingNumber)) return;

    const html = `
    <label>Ingredient ${this._ingNumber + 1}</label>
    <input value="" name="ing${
      this._ingNumber + 1
    }-quantity" placeholder="Quantity" id="quantity${this._ingNumber + 1}"/>
    <input value="" name="ing${this._ingNumber + 1}-unit" placeholder="Unit" />
    <input value="" name="ing${
      this._ingNumber + 1
    }-description" placeholder="Description" id="description${
      this._ingNumber + 1
    }"/>`;

    this._ingredientsList.insertAdjacentHTML('beforeend', html);
    const el = document.getElementById(`quantity${this._ingNumber + 1}`);
    el.focus();
    this._ingNumber++;
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      if (
        !_validateInputs(
          data.title,
          data.sourceUrl,
          data.image,
          data.publisher,
          data.cookingTime,
          data.servings
        )
      )
        return;

      handler(data);
    });
  }

  _clearListIngredients() {
    let html = `
    <label>Ingredient 1</label>
    <input value="" name="ing1-quantity" placeholder="Quantity" />
    <input value="" name="ing1-unit" placeholder="Unit" />
    <input value="" name="ing1-description" required placeholder="Description" id="description1"/>`;
    this._ingNumber = 1;

    for (let i = 0; i < 4; i++) {
      html += `<label>Ingredient ${this._ingNumber + 1}</label>
      <input value="" name="ing${
        this._ingNumber + 1
      }-quantity" placeholder="Quantity" />
      <input value="" name="ing${
        this._ingNumber + 1
      }-unit" placeholder="Unit" />
      <input value="" name="ing${
        this._ingNumber + 1
      }-description" placeholder="Description"  id="description${
        this._ingNumber + 1
      }" />`;

      this._ingNumber++;
    }

    this._ingredientsList.innerHTML = '';
    this._ingredientsList.insertAdjacentHTML('afterbegin', html);
  }

  _generateMarkup() {}
}

export default new AddRecipeView();

///////////////////////////////////////////
const titleInput = document.getElementById('title');
const urlInput = document.getElementById('URL');
const imgInput = document.getElementById('img');
const publisherInput = document.getElementById('publisher');
const prepTimeInput = document.getElementById('prepTime');
const servingsInput = document.getElementById('servings');

const _validateInputs = function (
  title,
  url,
  imgUrl,
  publisher,
  prepTime,
  servings
) {
  clearInvalids();
  let control = true;

  if (title.length < 3) {
    titleInput.value = '';
    titleInput.classList.add('invalid');
    titleInput.placeholder = '*Title must be at least 3 characters long';
    control = false;
  }

  if (url.length < 5) {
    urlInput.value = '';
    urlInput.classList.add('invalid');
    urlInput.placeholder = '*URL must be at least 5 characters long';
    control = false;
  }

  if (imgUrl.length < 5) {
    imgInput.value = '';
    imgInput.classList.add('invalid');
    imgInput.placeholder = '*Image must be at least 4 characters long';
    control = false;
  }

  if (publisher.length < 5) {
    publisherInput.value = '';
    publisherInput.classList.add('invalid');
    publisherInput.placeholder =
      '*Publisher must be at least 4 characters long';
    control = false;
  }

  if (prepTime < 1) {
    prepTimeInput.value = '';
    prepTimeInput.classList.add('invalid');
    prepTimeInput.placeholder = '*Try a number greater than 0';
    control = false;
  }

  if (servings < 1) {
    servingsInput.value = '';
    servingsInput.classList.add('invalid');
    servingsInput.placeholder = '*Try a number greater than 0';
    control = false;
  }

  return control;
};

const clearInvalids = function (clearvalue = false) {
  // prettier-ignore
  titleInput.placeholder = urlInput.placeholder = imgInput.placeholder = publisherInput.placeholder = prepTimeInput.placeholder = servingsInput.placeholder = '';
  // prettier-ignore
  if(clearvalue) titleInput.value = urlInput.value = imgInput.value = publisherInput.value = prepTimeInput.value = servingsInput.value = '';

  titleInput.classList.remove('invalid');
  urlInput.classList.remove('invalid');
  imgInput.classList.remove('invalid');
  publisherInput.classList.remove('invalid');
  prepTimeInput.classList.remove('invalid');
  servingsInput.classList.remove('invalid');
};

const validateIng = function (totalIng) {
  let control = true;
  let elementsIng = [];

  for (let i = 1; i <= totalIng; i++) {
    const domElement = document.getElementById(`description${i}`);
    elementsIng.push(domElement);
  }

  elementsIng.forEach(el => {
    if (el.value === '') {
      el.classList.add('invalid');
      control = false;
    } else {
      el.classList.remove('invalid');
    }
  });

  return control;
};
