

// Get card template //
const cardTemplate = document.getElementById('card-template')

for (let indexCards = 0; indexCards < emperors.length; indexCards++) {
    // define item clone from template //
    const itemClone = cardTemplate.content.cloneNode(true)

    // define home cards container //
    const container = document.querySelector(".home-cards")

    // get emperor data from array and write it inside the template //
    itemClone.querySelector('.emperor-name').innerText = emperors[indexCards].emperorName
    itemClone.querySelector('.emperor-description').innerText = emperors[indexCards].emperorName + ' ruled the Roman Empire from ' + emperors[indexCards].emperorFrom + " to " + emperors[indexCards].emperorUntil + '. He was born in ' + emperors[indexCards].originProvince 
    itemClone.querySelector('.card-image').src = emperors[indexCards].emperorImages[0];
    itemClone.querySelector('.card-image').alt = emperors[indexCards].emperorName;
    // append the template item in the home card container //
    container.appendChild(itemClone)
}


// get carousel item template //
const carouselTemplate = document.getElementById('carousel-item-id')

for (let indexCarouselItems = 0; indexCarouselItems < emperors.length; indexCarouselItems++) {
    const itemClone = carouselTemplate.content.cloneNode(true)
    const container = document.querySelector(".carousel-inner")

}


//Get this year//
const today = new Date();
thisYear = today.getFullYear();
document.getElementById('company').innerHTML = '&copy;' + thisYear + ' logos'


//Activate & deactivate Overlay//
function onOverlay() {
    document.getElementById('watch-out-overlay').style.display='block';
}

function offOverlay() {
    document.getElementById('watch-out-overlay').style.display='none';
}

