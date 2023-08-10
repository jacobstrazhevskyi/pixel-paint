/* eslint-disable no-console */
/* eslint-disable no-plusplus */

const submitButton = document.getElementById('submit-button');
const widthInput = document.getElementById('width-input');
const heightInput = document.getElementById('height-input');
const settingsPopup = document.querySelector('.settings-container');

const canvas = document.querySelector('.canvas');

const colorInput = document.getElementById('colorInput');

const getHexButton = document.getElementById('get-hex');

const canvasPixels = document.querySelector('.canvas__pixels');

let rowsPixels = document.querySelectorAll('.canvas__pixels-row');

const clearWarningPopup = document.querySelector('.really-clear-popup');
const clearSubmitButton = document.querySelector('.really-clear-popup__yes-button');
const clearDeclineButton = document.querySelector('.really-clear-popup__no-button');

const clearCanvasButton = document.querySelector('.canvas__clear-canvas');
clearCanvasButton.onclick = () => {
  clearWarningPopup.style.display = 'flex';
};

clearSubmitButton.onclick = () => {
  for (let i = 0; i < rowsPixels.length; i++) {
    const pixels = rowsPixels[i].querySelectorAll('.canvas__pixel');

    for (let j = 0; j < pixels.length; j++) {
      pixels[j].style.backgroundColor = '#ffffff';
      pixels[j].style.col = '#ffffff';
    }
  }

  clearWarningPopup.style.display = 'none';
};

clearDeclineButton.onclick = () => {
  clearWarningPopup.style.display = 'none';
};

function getCanvasPixels() {
  for (let i = 0; i < rowsPixels.length; i++) {
    const pixels = rowsPixels[i].querySelectorAll('.canvas__pixel');

    for (let j = 0; j < pixels.length; j++) {
      pixels[j].style.col = '#ffffff';
    }
  }

  for (let i = 0; i < rowsPixels.length; i++) {
    const pixels = rowsPixels[i].querySelectorAll('.canvas__pixel');

    for (let j = 0; j < pixels.length; j++) {
      pixels[j].addEventListener('click', () => {
        pixels[j].style.backgroundColor = colorInput.value;
        pixels[j].style.col = colorInput.value;
      });

      pixels[j].addEventListener('contextmenu', (event) => {
        event.preventDefault();
        pixels[j].style.backgroundColor = '#ffffff';
        pixels[j].style.col = '#ffffff';
      });
    }
  }
}

const errorPopup = document.querySelector('.error');

submitButton.addEventListener('click', () => {
  if (!widthInput.value || !heightInput.value) {
    errorPopup.style.display = 'block';

    return;
  }

  const pixelsRow = document.createElement('div');
  pixelsRow.classList.add('canvas__pixels-row');

  for (let i = 0; i < +widthInput.value; i++) {
    const pixel = document.createElement('div');

    pixel.classList.add('canvas__pixel');
    pixelsRow.append(pixel);
  }

  for (let i = 0; i < +heightInput.value; i++) {
    canvasPixels.append(pixelsRow.cloneNode(true));
  }

  rowsPixels = document.querySelectorAll('.canvas__pixels-row');

  getCanvasPixels();

  errorPopup.style.display = 'none';
  settingsPopup.style.display = 'none';
  canvas.style.display = 'block';
});

getHexButton.onclick = () => {
  let result = '';

  for (let i = 0; i < rowsPixels.length; i++) {
    const pixels = rowsPixels[i].querySelectorAll('.canvas__pixel');

    result += '00';

    for (let j = 0; j < pixels.length; j++) {
      result += pixels[j].style.col;
    }
  }

  result = [...result];

  for (let i = 0; i < result.length; i++) {
    if (result[i] === '#') {
      result.splice(i, 1);
    }
  }

  navigator.clipboard.writeText(result.join(''));
};
