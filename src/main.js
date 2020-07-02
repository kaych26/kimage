// const { start } = require("live-server");

const KEY = '17293224-4fce193fa3ddcc5b64747d858';
const query = `https://pixabay.com/api/?key=${KEY}&image_type=photo&per_page=60&q=`;

const form = document.querySelector('.form-input');
const input = document.querySelector('#user-input');
const returnMsg = document.querySelector('#return-msg');
const pageWrapper = document.querySelector('.page-button');
const imgThumbnail = document.querySelector('.img-thumbnail');
// const modalEle = document.querySelector('.modal');
// const modalImage = document.querySelector('.modalImage');

let current_page = 1;
let image_per_page = 10;
let images = '';

const setUpPages = (total_img) => {
  pageWrapper.innerHTML = '';

  let pages = Math.ceil(total_img / image_per_page);

  for (let i = 1; i < pages + 1; i++) {
    let button = pageButtons(i);
    pageWrapper.appendChild(button);
  }
};

const pageButtons = (page) => {
  let button = document.createElement('button');
  button.innerText = page;

  if (current_page == page) button.classList.add('active');

  button.addEventListener('click', function () {
    current_page = page;
    displayResults(current_page);
  });

  return button;
};

const displayResults = (page_idx) => {

  let modalEle = document.querySelector('.modal');
  let modalImage = document.querySelector('.modalImage');
  
  imgThumbnail.innerHTML = '';
  page_idx -= 1;

  let start = image_per_page * page_idx;
  let end = start + image_per_page;

  for (let i = start; i < end; i++) {
    let elem = document.createElement('img');

    elem.setAttribute("src", images[i].previewURL);
    elem.setAttribute('alt', 'image');
    imgThumbnail.appendChild(elem);
    
    setUpPages(images.length);

    elem.addEventListener("click", event => {
      modalEle.style.display = "block";
      modalImage.src = images[i].largeImageURL;
    });

    document.querySelector(".close").addEventListener("click", () => {
      modalEle.style.display = "none";
    });
  }
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  returnMsg.innerHTML = '';

  if (input.value) {
    const endpoint = query + input.value;
    let response = await axios.get(endpoint);

    images = response.data.hits;

    if (images) {
      displayResults(current_page);
    }
  } else {
    returnMsg.innerHTML = 'No image ...';
  }
});
