const imageContainer = document.getElementById('image-container')
const loader=document.getElementById

let ready = false; 
let photosArray=[]
let totalImages = 0;
let imagesLoaded = 0;

//Unsplash API
const count=5
const apiKey='bspsFG1zXq9LjyzyMeHKE517ba4vdR3JQI7ANnDe3IM'
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//Check if all images were loadded
function imageLoaded() {
    
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden= true
    }
}

//Helper Function to Set Attribues on DOM Elements
function setAttributes(element,attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
//Create Elements for Links and Photos add DOM
function displayPhotos() {
    imagesLoaded=0;
    totalImages = photosArray.length;
    //Run function for each object with PhotoArray
    photosArray.forEach((photo)=> {
        //Create<a> to link to Unsplash
        const item=document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        //Event Listener check when each is finished loading
        img.addEventListener('load', imageLoaded);
        //put <img> inside <a> then put inside the imagecontainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

//Get photos from Unsplash api
async function getPhotos() {
    try{
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    }catch (error){
        //Error catch here
        console.log('hello')
    }
}

//Check to see if scrolling near bottom of the page, load more
window.addEventListener('scroll', () => {
if(window.innerHeight+window.scrollY >= document.body.offsetHeight - 1000 && ready){
getPhotos();
ready = false;
}
})
//Load items
getPhotos();