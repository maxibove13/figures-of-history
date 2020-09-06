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


// get emperor page template //
const emperorPageTemplate = document.getElementById("emperor-page-template");
for (let indexEmperorPage = 0; indexEmperorPage < emperors.length; indexEmperorPage++) {
    // define item clone from template //
    const itemClone = emperorPageTemplate.content.cloneNode(true)

    // define container //
    const container = document.querySelector(".figure-emperors")



    // get emperor data from array and write it inside the template //
    itemClone.querySelector('.emperor-title-name').innerText = emperors[indexEmperorPage].emperorName;
    itemClone.querySelector('.emperor-range').innerText = emperors[indexEmperorPage].emperorFrom + '-' + emperors[indexEmperorPage].emperorUntil;
    itemClone.querySelector('.main-img').src = emperors[indexEmperorPage].emperorImages[1];
    itemClone.querySelector('.main-img').alt = emperors[indexEmperorPage].emperorName;
    itemClone.querySelector('.bornIn').innerText = 'Born in: ' + emperors[indexEmperorPage].originCity;
    itemClone.querySelector('.ageWhenEmperor').innerText = 'Age when emperor: ' + (emperors[indexEmperorPage].emperorFrom - emperors[indexEmperorPage].Born)
    itemClone.querySelector('.description').innerText = emperors[indexEmperorPage].emperorDescription;
    itemClone.querySelector('.emperor-page-images').src = emperors[indexEmperorPage].emperorImages[2];
    itemClone.querySelector('.emperor-page-images').alt = emperors[indexEmperorPage].emperorImages[2];
    itemClone.querySelector('.emperor-length').innerText = (Math.abs(emperors[indexEmperorPage].emperorUntil) - emperors[indexEmperorPage].emperorFrom) + ' years being Emperor'

    // Define the dots position
    beg = emperors[indexEmperorPage].emperorFrom;
    end = emperors[indexEmperorPage].emperorUntil;
    relativeBeg = Math.abs(((-27)-beg)/(476+27)*100)
    relativeEnd = Math.abs(((-27)-end)/(476+27)*100)
    
    // Position the dots that marks the emperor years
    itemClone.querySelector(".beg-container").style.left = relativeBeg + '%';
    itemClone.querySelector(".end-container").style.left = relativeEnd + '%';
    // append the template item in the home card container //
    container.appendChild(itemClone)

    


    
    

}



