// Imperators information array //
let emperors = [
    {
        emperorName: "Augustus",
        emperorFrom: -27,
        emperorUntil: 14,
        Born: -60,
        originCity: "Rome",
        originProvince: "Italy",
        emperorImages: [
            'images/emperors/augustus-bust.jpg',
            'images/emperors/augustus-statue.jpg',
            'images/emperors/augustus-voshart.jpg',
        ],
        emperorDescription: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum repellat molestias, numquam quos suscipit, quo tempore, omnis blanditiis dolores expedita ullam aperiam fugiat. Dolores, eos ad eaque quia nisi sunt?",
    },
    {
        emperorName: "Tiberius",
        emperorFrom: 14,
        emperorUntil: 37,
        Born: -40,
        originCity: "Rome",
        originProvince: "Italy",
        emperorImages: [
            'images/emperors/tiberius-bust.jpg',
            'images/emperors/tiberius-statue.jpg',
            'images/emperors/tiberius-voshart.jpg',
        ],
        emperorDescription: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum repellat molestias, numquam quos suscipit, quo tempore, omnis blanditiis dolores expedita ullam aperiam fugiat. Dolores, eos ad eaque quia nisi sunt?",
   
    },
    {
        emperorName: "Caligula",
        emperorFrom: 37,
        emperorUntil: 41,
        Born: 12,
        originCity: "Rome",
        originProvince: "Italy",
        emperorImages: [
            'images/emperors/caligula-bust.jpg',
            'images/emperors/caligula-statue.jpg',
            'images/emperors/caligula-voshart.jpg',
        ],
        emperorDescription: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum repellat molestias, numquam quos suscipit, quo tempore, omnis blanditiis dolores expedita ullam aperiam fugiat. Dolores, eos ad eaque quia nisi sunt?",
   
    },
    {
        emperorName: "Claudius",
        emperorFrom: 41,
        emperorUntil: 54,
        Born: -10,
        originCity: "Lugdunum (Lyon)",
        originProvince: "Galia",
        emperorImages: [
            'images/emperors/claudius-bust.jpg',
            'images/emperors/claudius-statue.jpg',
            'images/emperors/claudius-voshart.jpg',
        ],
        emperorDescription: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum repellat molestias, numquam quos suscipit, quo tempore, omnis blanditiis dolores expedita ullam aperiam fugiat. Dolores, eos ad eaque quia nisi sunt?",
   
    },

    {
        emperorName: "Nero",
        emperorFrom: 54,
        emperorUntil: 68,
        Born: 37,
        originCity: "Rome",
        originProvince: "Italy",
        emperorImages: [
            'images/emperors/nero-bust.jpg',
            'images/emperors/nero-statue.jpg',
            'images/emperors/nero-voshart.jpg',
        ],
        emperorDescription: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum repellat molestias, numquam quos suscipit, quo tempore, omnis blanditiis dolores expedita ullam aperiam fugiat. Dolores, eos ad eaque quia nisi sunt?",
    },
]

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

