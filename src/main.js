

const KEY = "17293224-4fce193fa3ddcc5b64747d858";
const query = `https://pixabay.com/api/?key=${KEY}&image_type=photo&per_page=60&q=`;

const form = document.querySelector('.form-input');
const input = document.querySelector('#user-input');
const returnMsg = document.querySelector('#return-msg');
const imageContainer = document.querySelector('.image-container');


const displayResults = data => {
  imageContainer.innerHTML = '';
  let html = '';
  let img = '';
  
  for (let i = 0; i < data.length; i++) {
    img = `<img src="${data[i].previewURL}" alt="image"></img>`
    html += `<div>${img}</div>`;
  }
  if (html)
    imageContainer.innerHTML = html;
  else
    returnMsg.innerHTML = "<p>sorry, no images available...</p>";
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  returnMsg.innerHTML = '';

  if (input.value) {
    const endpoint = query + input.value;
    let response = await axios.get(endpoint);
    // debugger;
    if (response) {
      displayResults(response.data.hits)
    }
    
  }
  else {
    returnMsg.innerHTML = '<p>Enter a theme ...</p>';
  }

});






