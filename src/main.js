// const { start } = require("live-server");

const KEY = '17293224-4fce193fa3ddcc5b64747d858';
const query = `https://pixabay.com/api/?key=${KEY}&image_type=photo&per_page=60&q=`;

const form = document.querySelector('.form-input');
const input = document.querySelector('#user-input');
const returnMsg = document.querySelector('#return-msg');
const pageWrapper = document.querySelector('.page-button');
const imageContainer = document.querySelector('.image-container');


let current_page = 3;
let image_per_page = 10;
let images= '';

const setUpPages = total_img => {

  pageWrapper.innerHTML = '';

  let pages = Math.ceil(total_img / image_per_page);
  // debugger;
  
  for (let i = 1; i < pages + 1; i++) {
    let button = pageButtons(i);
    pageWrapper.appendChild(button);
  }
  // for (let page = 1; page <= pages; page++) {
  //   pageWrapper.innerHTML += `<button value=${page} class="page">${page}</button>`;
  // }
};

const pageButtons = (page) => {
  
  let button = document.createElement('button');
  button.innerText = page;
  
  if (current_page == page)
    button.classList.add('active');
  
  button.addEventListener('click', function () {
    current_page = page;
    displayResults(current_page)
  });
  
  return button;
  
};


const displayResults = (page_idx) => {
  let html = '';
  let img = '';
  imageContainer.innerHTML = '';
  page_idx -= 1;

  let start = image_per_page * page_idx;
  let end = start + image_per_page;
  for (let i = start; i < end; i++) {

    // let img = results[i].previewURL;
    // let img_element = document.createElement('')

    img = `<img src="${images[i].previewURL}" alt="image"></img>`;
    html += `<div>${img}</div>`;
  }
  if (html) {
    imageContainer.innerHTML = html;
    setUpPages(images.length);
  }
  else returnMsg.innerHTML = '<p>sorry, no images available...</p>';
};


form.addEventListener('submit', async (event) => {
  event.preventDefault();
  returnMsg.innerHTML = '';

  if (input.value) {
    const endpoint = query + input.value;
    let response = await axios.get(endpoint);
    images = response.data.hits;
   
    // debugger
    if (images) {
      displayResults(current_page);
    }
  } else {
    returnMsg.innerHTML = '<p>Enter a theme ...</p>';
  }
});
