# FlickrPhotosApp
This is an Angular application implementing a photo search by using the Flickr API.

## Main functionalities of the project
- Search images by keyword
- Display images in a grid view
- Scroll images in an infinite scroll function
- Open one image in FullScreen mode and display Title and Owner of the image

# Structure of the code
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.3.

## Angular Modules/ Packages used
- Angular Material --> Is used as the main UI component library to style elements inside our components, such as input fild, dialog of full screen, grid view of images
- CDK scrolling --> Creates a scrolling view for images and erases those images that are outside the view (https://material.angular.io/cdk/scrolling/api)
- ngx-masonry --> Creates a nice visual image loader and image grid view (https://www.npmjs.com/package/ngx-masonry)

## Project Structure

### Components
- App Component --> It is the main component
- images-search --> It is the main view of search function and images display
- fullscreen-image --> Here we can find the fullscreen image dialog and related details

### Services
- flickr service --> Here there is a function that does an api call to flickr api to retrive images and their details by keyword

### Models
Here we have all the interfaces used in the app
- FlickrOutput --> used for all photos array
- FlickrPhoto --> used for a single photo object

### Environments folder
Here we have two files used for any environmental variables. In our case here we have the api_key of flicker used in the params of the api call done in the service

### Global Styles
Is used for styles that are needed to be done Globaly and used in several components

# How to run the App

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

