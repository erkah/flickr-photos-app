# FlickrPhotosApp
This is an Angular application implementing a photo search by using the Flickr API.
This application is developed by using two methods of search results display. You can switch from one method to the other by using the toggle button above the search input filed. 
In the first view images are displayed in a grid view, using the Infinite scroll and Masonry modules. 
In the second view images are displayed in one cell per image view, using a more performant scroll module called cdk virtual scroll viewport.
This two views display is done to showcase both cases considering the performance. 

## Main functionalities of the project
- Search images by keyword
- Display images in a grid view using Infinite Scroll
- Display images in one image per cell view using CDK virtual scroll viewport
- Open one image in FullScreen mode and display Title and Owner of the image

![](demo.gif)

# Structure of the code
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.3.

## Angular Modules/ Packages used
1. Angular Material --> Is used as the main UI component library to style elements inside our components, such as input fild, dialog of full screen, grid view of images
2. ngx-infinite-scroll --> 
    - Is an angular module that helps with scrolling elements in an infinite mode. 
    - In our project it scrolls images in an infinite mode and is used only in this mode view. 
    (https://www.npmjs.com/package/ngx-infinite-scroll)
3. CDK scrolling (ScrollingModule)--> 
    - Displays large lists of elements performantly by only rendering the items that fit on-screen. Loading hundreds of elements can be slow in any browser; virtual scrolling enables a performant way to simulate all items being rendered by making the height of the container element the same as the height of total number of elements to be rendered, and then only rendering the items in view. Virtual scrolling is different from strategies like infinite scroll where it renders a set amount of elements and then when you hit the end renders the rest.
    - In our project it is used to create a more performant search function
    (https://material.angular.io/cdk/scrolling/api)
4. ngx-masonry --> 
    - Is an angular module that creates a nice visual elements loader and image grid view 
    - In our project it is used to creaete the effect of Lazy loading of images
    (https://www.npmjs.com/package/ngx-masonry)

## Project Structure

### Components
- App Component --> It is the main component
- images-search --> It is the main view of search function and images display and it is the parent component of  two views/ components: `images-cdk-scroll` and `images-infinite-scroll`. In this component we call the API that retrives all flickr images from the service flickr.service, we have created the open dialog or fullscreen image function that will be used in child components.
- images-cdk-scroll --> Uses CDK scrolling (ScrollingModule) to scroll images. For the moment the view is developed in one image per cell since cdk does not allow grid view by default. This component uses/ emits the functions created in parent component by using @Output and EventEmitter. 
- images-infinite-scroll --> Uses ngx-masonry and ngx-infinite-scroll to load images. It is build in a grid view mode. This component uses/ emits the functions created in parent component by using @Output and EventEmitter. 
- fullscreen-image --> Here we can find the fullscreen image dialog and related details such as title and owner of image. 

### Services
- flickr service --> Here there is a function that does an api call to flickr api to retrive images and their details by keyword added by user

### Models
Here we have all the interfaces used in the app
- FlickrOutput --> used for all photos array
- FlickrPhoto --> used for a single photo object
- SearchedImages --> used for images that are searched and selected to view in fullscreen mode

### Environments folder
Here we have two files used for any environmental variables. In our case here we have the api_key of flicker used in the params of the api call done in the service

### Global Styles
- All global styles are added in style.sass file which are used in several components.
- Overall the pink-bluegrey theme of angular material is used, considering the icon of flickr

# How to run the App

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


