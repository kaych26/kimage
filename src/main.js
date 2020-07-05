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
const popularEle = document.querySelector('.popular');
const modalEle = document.querySelector('.modal');
const modalImage = document.querySelector('.modalImage');
const modalClose = document.querySelector('.close');

const IMG_PER_PAGE = 10;
const IMG_TO_GET = 50;
const MAX_NEXT = 10;
const MAX_BTN = IMG_TO_GET / IMG_PER_PAGE;

let more_img = true;
let current_set = 1;
let subject = '';

/*----------------------------------------------------------/
calcTotalPages => calc total nubmer of pages
-----------------------------------------------------------*/
const calcTotalPages = (length) => {
  const pages = Math.ceil(length / IMG_PER_PAGE);

  // no more img to retrieve -> not to display Next btn.
  if (pages < MAX_BTN)
    more_img = false;
  
  return pages;
}

/*----------------------------------------------------------/
calcArrIdx => calc the idx to display 10 images
-----------------------------------------------------------*/
const calcArrIdx = (page) => {
  return ((page-1) % MAX_BTN) * IMG_PER_PAGE;
}

/*----------------------------------------------------------/
setButtonEvent => highlight selected page btn & display images
-----------------------------------------------------------*/
const setButtonEvent = (button, images) => {

  button.addEventListener('click', (event) => {
    event.preventDefault();

    let prevPage = document.querySelector('.page-button button.active');
    prevPage.classList.remove('active');
    button.classList.add('active');

    // display images for selected page
    const idx = calcArrIdx(button.innerText);
    const imgs = images.slice(idx, idx + IMG_PER_PAGE);
    displayResults(imgs);
  });
}

/*----------------------------------------------------------/
setNextButton => create "Next" btn to retrieve next 50 images
-----------------------------------------------------------*/

const setNextButton = () => {
  let nextBtn = document.createElement('button');
  nextBtn.innerText = 'Next';
  pageWrapper.appendChild(nextBtn);

  nextBtn.addEventListener('click', (event) => {
    event.preventDefault();
    current_set += 1;
    // get next 50 set of images
    getImages(subject);
  });
}

/*----------------------------------------------------------/
setPrevtButton => create "Prev" button for prev 50 images
-----------------------------------------------------------*/
const setPrevButton = () => {
  let nextBtn = document.createElement('button');
  nextBtn.innerText = 'Prev';
  pageWrapper.appendChild(nextBtn);

  nextBtn.addEventListener('click', (event) => {
    event.preventDefault();
    current_set -= 1;
    // get prev 50 images
    getImages(subject);
  });
}

/*----------------------------------------------------------/
setPageNumbers => set up pagination
-----------------------------------------------------------*/
const setPageNumbers = (images) => {

  pageWrapper.innerHTML = '';
  let first_page = ((current_set-1) * MAX_BTN) + 1;
  let pageNum = first_page;

  // use image array to calc total pages incase result is less.
  let tot_pages = calcTotalPages(images.length);
  
  // create Prev button
  current_set > 1 && setPrevButton();

  while (tot_pages--) {
    let button = document.createElement('button');

    // highlight the current page button
    pageNum == first_page && button.classList.add('active');

    button.innerText = pageNum++;
    pageWrapper.appendChild(button);

    // set listener for page change
    setButtonEvent(button, images);
  }
  // create Next button if more images
  if (more_img && current_set < MAX_NEXT)
    setNextButton();
};

/* ----------------------------------------------------------/
displayResults => display thumbnail imgs and set up modal
------------------------------------------------------------*/
const displayResults = (imgs) => {
  returnMsg.innerHTML = '';
  imgThumbnail.innerHTML = '';

  imgs.forEach((i) => {
    let elem = document.createElement('img');

    elem.setAttribute('src', i.previewURL);
    elem.setAttribute('alt', 'image');
    imgThumbnail.appendChild(elem);

    elem.addEventListener('click', (event) => {
      event.preventDefault();
      modalEle.style.display = 'block';
      modalImage.src = i.largeImageURL;
    });
  });
};

/* ----------------------------------------------------------/
  getImage => axios call to retrieve (IMG_TO_GET=50) images
------------------------------------------------------------*/
const getImages = async (word) => {

  const api_page = current_set;
  const endpoint = query + '&page=' + api_page + '&per_page=' + IMG_TO_GET + '&q=' + word;

  let response = await axios.get(endpoint);
  const images = response.data.hits;

  if (images.length > 0) {
    // initial display the first 10 images
    let imgs = images.slice(0, IMG_PER_PAGE);
    displayResults(imgs);
    setPageNumbers(images);
  }
  else returnMsg.innerHTML = 'No image available.';
};

/* ----------------------------------------------------------/
 reset => reset screen 
------------------------------------------------------------*/
const reset = () => {
  returnMsg.innerHTML = '';
  imgThumbnail.innerHTML = '';
  current_set = 1;
}

/* ----------------------------------------------------------/
  popularImages => Set up popular word list to click.
------------------------------------------------------------*/
const popularWords = () => {
  const popular = ['nature', 'food', 'beach', 'flower', 'animal', 'car'];

  popular.forEach(word => {
    let elem = document.createElement('a');
    elem.setAttribute('href', '#');
    elem.innerText = `${word} `;

    if (popularEle)
      popularEle.appendChild(elem);
    
    // add onclick for popular key word
    elem.addEventListener('click', async (event) => {
      event.preventDefault();
      subject = word;
      reset();
      getImages(word);
    });
  });
};

/*----------------------------------------------------------/
  handleUserInput => user input
-----------------------------------------------------------*/
const handleUserInput = () => {
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      reset();
      
      if (input.value) {
        subject = input.value;
        getImages(input.value);
      }
      // blank user input
      else returnMsg.innerHTML = 'Enter a search or select popular list.';
    });
  }
}

/*----------------------------------------------------------/
  closeModal
-----------------------------------------------------------*/
const closeModal = () => {
  if (modalClose)
    modalClose.addEventListener('click', (event) => {
      event.preventDefault();
      modalEle.style.display = 'none';
    });
}

/*----------------------------------------------------------/
  Main
-----------------------------------------------------------*/

// popular key words to click
popularWords();

// user input
handleUserInput();

// listen to close modal
closeModal();

/*----------------------------------------------------------/
  Jest Unit testing export, uncomment below to run 'jest'
-----------------------------------------------------------*/
// export { calcTotalPages, calcArrIdx};
