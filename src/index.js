/* eslint-disable no-param-reassign */
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
const zoomInButton = document.getElementById('zoom-in-button');
const zoomOutButton = document.getElementById('zoom-out-button');
const clearCanvasButton = document.querySelector('.canvas__clear-canvas');
const errorPopup = document.querySelector('.error');
const filterSelect = document.getElementById('filter');

let pixelSize = 50;

function setPixelSize(pixelsRow) {
  const rowPixels = pixelsRow.querySelectorAll('.canvas__pixel');

  rowPixels.forEach((pixel) => {
    pixel.style.minWidth = `${pixelSize}px`;
    pixel.style.minHeight = `${pixelSize}px`;
  });
}

function clearPixelColors() {
  rowsPixels.forEach((row) => {
    row.querySelectorAll('.canvas__pixel').forEach((pixel) => {
      pixel.style.backgroundColor = '#ffffff';
      pixel.style.col = '#ffffff';
    });
  });
}

function initializePixelEvents() {
  rowsPixels.forEach((row) => {
    const pixels = row.querySelectorAll('.canvas__pixel');

    pixels.forEach((pixel) => {
      pixel.style.col = '#ffffff';

      pixel.addEventListener('click', () => {
        pixel.style.backgroundColor = colorInput.value;
        pixel.style.col = colorInput.value;
      });

      pixel.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        pixel.style.backgroundColor = '#ffffff';
        pixel.style.col = '#ffffff';
      });
    });
  });
}

function createPixelsRow() {
  const pixelsRow = document.createElement('div');
  pixelsRow.classList.add('canvas__pixels-row');
  return pixelsRow;
}

function generateCanvasRowsAndPixels() {
  const width = +widthInput.value;
  const height = +heightInput.value;

  for (let i = 0; i < height; i++) {
    const pixelsRow = createPixelsRow();

    for (let j = 0; j < width; j++) {
      const pixel = document.createElement('div');
      pixel.classList.add('canvas__pixel');
      pixelsRow.append(pixel);
    }

    canvasPixels.append(pixelsRow);
  }

  rowsPixels = document.querySelectorAll('.canvas__pixels-row');
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}

zoomInButton.addEventListener('click', () => {
  pixelSize += 5;
  rowsPixels.forEach(setPixelSize);
});

zoomOutButton.addEventListener('click', () => {
  pixelSize -= 5;
  rowsPixels.forEach(setPixelSize);
});

clearCanvasButton.onclick = () => {
  clearWarningPopup.style.display = 'flex';
};

clearSubmitButton.onclick = () => {
  clearPixelColors();
  clearWarningPopup.style.display = 'none';
};

clearDeclineButton.onclick = () => {
  clearWarningPopup.style.display = 'none';
};

submitButton.addEventListener('click', () => {
  if (!widthInput.value || !heightInput.value) {
    errorPopup.style.display = 'block';
    return;
  }

  generateCanvasRowsAndPixels();
  initializePixelEvents();

  errorPopup.style.display = 'none';
  settingsPopup.style.display = 'none';
  canvas.style.display = 'block';
});

getHexButton.onclick = () => {
  let result = '';

  rowsPixels.forEach((row) => {
    const pixels = row.querySelectorAll('.canvas__pixel');

    result += `${filterSelect.value}`;

    pixels.forEach((pixel) => {
      result += pixel.style.col;
    });
  });

  result = result.replace(/#/g, '');

  copyToClipboard(result);
};
