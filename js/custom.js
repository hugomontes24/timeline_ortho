// Custom JavaScript code for enhancing the map functionality
// This script populates a sidebar with a list of sites from the GeoJSON data
// CONSTANST AND VARIABLES  ***********************
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const pictureContainer = document.getElementById('picture_container');
const chosenPhotoElmt = document.getElementById('chosen_photo');
const spanPhotoName = document.getElementById('photo_name');
const spanPhotoYear = document.getElementById('photo_year');
const spanLng = document.getElementById('lng');
const spanLat = document.getElementById('lat');
const pDescription = document.getElementById('p_description');

// **************************
// ****  MAIN EXECUTION  *****
// **************************

document.addEventListener('DOMContentLoaded', function () {

    displayAsideChosenPhoto(photos[0]); // Display the first photo in the aside on page load

    if(!SpeechRecognition) { console.log('Speech Recognition API not supported in this browser.');}
    
    // if(!window.json_Photos_1) { console.error('GeoJSON data not found! **');return;} // 3

    // photos = photosFromGeoJSON(window.json_Photos_1); // 4 - Convert GeoJSON features to Site objects (list of Site instances )
    // photos1 = fetchPhotos(); // Fetch photos from API
    // const recognition = new SpeechRecognition();
    // recognition.lang = 'fr-FR';
    // recognition.continuous = false;
    // recognition.interimResults = false;
    // // recognition.maxAlternatives = 1;


});


    
