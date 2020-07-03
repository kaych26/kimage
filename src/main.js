/* 
  main.js => Get images from Pixabay API based on 
  user input or selected word.  
*/

/*----------------------------------------------------------/
  Global variables
/----------------------------------------------------------*/
const KEY = '17293224-4fce193fa3ddcc5b64747d858';
const query = `https://pixabay.com/api/?key=${KEY}&image_type=photo`;

const form = document.querySelector('.form-input');
const input = document.querySelector('#user-input');
const returnMsg = document.querySelector('#return-msg');
const pageWrapper = document.querySelector('.page-button');
const imgThumbnail = document.querySelector('.img-thumbnail');
const select = document.querySelector('.select');
const modalEle = document.querySelector('.modal');
const modalImage = document.querySelector('.modalImage');
const popularEle = document.querySelector('.popular');

const IMG_PER_PAGE = 10;
let current_page = 1;

/*----------------------------------------------------------/
calcTotalPages => calc total nubmer of pages
-----------------------------------------------------------*/
const calcTotalPages = (length) => {
  return Math.ceil(length / IMG_PER_PAGE);
}

/*----------------------------------------------------------/
setPageNumbers => calculate the buttons needed for pagination.
-----------------------------------------------------------*/
const setPageNumbers = (images) => {
  pageWrapper.innerHTML = '';
  const tot_pages = calcTotalPages(images.length);

  for (let page = 1; page <= tot_pages; page++) {

    let button = document.createElement('button');
    button.innerText = page;

    if (current_page == page)
      button.classList.add('active');

    button.addEventListener('click', (event) => {
      event.preventDefault();
      let prevPage = document.querySelector('.page-button button.active');
      prevPage.classList.remove('active');

      current_page = button.innerText;
      button.classList.add('active');

      displayResults(current_page, images);
    });

    pageWrapper.appendChild(button);
  }
};

/* ----------------------------------------------------------/
displayResults => display the thumbnails and setting modal 
using the large image.
------------------------------------------------------------*/
const displayResults = (page_idx, images) => {
  returnMsg.innerHTML = '';
  imgThumbnail.innerHTML = '';
  page_idx -= 1;

  let start = IMG_PER_PAGE * page_idx;
  let end = start + IMG_PER_PAGE;

  for (let i = start; i < end; i++) {
    let elem = document.createElement('img');

    elem.setAttribute('src', images[i].previewURL);
    elem.setAttribute('alt', 'image');
    imgThumbnail.appendChild(elem);

    // display modal using the large image
    elem.addEventListener('click', (event) => {
      event.preventDefault();
      modalEle.style.display = 'block';
      modalImage.src = images[i].largeImageURL;
    });

    // close modal
    document.querySelector('.close').addEventListener('click', () => {
      modalEle.style.display = 'none';
    });
  }
};

/* ----------------------------------------------------------/
  getImage => axios call to retrieve images
------------------------------------------------------------*/
const getImages = async (word) => {
  const endpoint = query + '&per_page=' + select.value + '&q=' + word;
  let response = await axios.get(endpoint);

  const images = response.data.hits;

  if (images.length > 0) {
    displayResults(current_page, images);
    setPageNumbers(images);
  }
  else returnMsg.innerHTML = 'No image available.';
 
};

/* ----------------------------------------------------------/
  popularImages => Set up popular word list and generate the
  image result when user clicks it.
------------------------------------------------------------*/
const popularImages = () => {
  const popularArr = ['nature', 'food', 'beach', 'flower', 'animal', 'car'];

  for (let i = 0; i < popularArr.length; i++) {
    let elem = document.createElement('a');
    elem.setAttribute('href', '#');
    elem.innerText = `${popularArr[i]} `;

    if (popularEle)
      popularEle.appendChild(elem);

    // add onclick for popular key word
    elem.addEventListener('click', async (event) => {
      event.preventDefault();
      getImages(popularArr[i]);
    });
  }
};

/*----------------------------------------------------------/
  handleUserInput => user input
-----------------------------------------------------------*/
const handleUserInput = () => {
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      
      // user input
      if (input.value) getImages(input.value);
      // blank user input
      else returnMsg.innerHTML = 'Enter a search or select popular list.';
    });
  }
}

/*----------------------------------------------------------/
  Main
-----------------------------------------------------------*/
// Set up the popular key words for user to click
popularImages();

// user input field
handleUserInput();

// module.exports = { calcTotalPages };

