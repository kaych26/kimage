# k-Image 

# Overview
## Developer
Kay Chan

## Exercise
- Retrieve a list of at least 50 images and display them as thumbnails on a page.
- Paginate thumbnails by 10 thumbnails per page.
- When clicking on an image, it should display on a modal.
- All images should be about a specific theme or based on a specific word.

# RUN the App
## Execute:
On the root directory
  - npm i && start

## Note:
  - npm i will install dependencies:  
  - http-server => webserver
  - jest-cli  => run jest for unit testing

npm start => runs the app on http-server using port 3000

## Unit Testing:
Tool used: Jest

- On the root directory, uncommnet the last line (module.exports) on main.js file.  The module is not recognized when js is run on webiste. Further research is needed to handle the module.export. 
- On the command line, run 'npm test'

# DESIGN
- The application is built using JavaScript, HTML and CSS. 
- The Pixabay API is connected to retrieve images.
- User enters word or use popular key word to retrieve the images.
- A selection of 40, 60, 80 or 100 images to retrieve.
- The image is displayed 10 per page, buttons are created for user to switch to different page.
- The large image is displayed in the modal.
- The image is displayed using 'flex' css and reponsive as the screen width shrinks.

## Files:
  index.hmtl  </br>
  ./src/main.js </br>
  ./src/main.css

### Jest Test files
  ./src/main.test.js

## Wireframes
![kImage Wireframe Design](./asset/kImage.png)

