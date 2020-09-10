// container for the emperor page
const container = document.querySelector(".figures")
const emperorPageTemplate = document.getElementById("emperor-page-template");

// get emperor page template //
function showAllImperators() {
    
    for (let indexEmperorPage = 0; indexEmperorPage < emperors.length; indexEmperorPage++) {
        fillData(indexEmperorPage);
    }
}


// Filter - How long did he last?
function fromToFilter(input1,input2) {
    // clean the container.
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild)
    }
    // assigns user inputs.
    let minInput = document.getElementById(input1).value;
    let maxInput = document.getElementById(input2).value;
    // If user leaves blank space, filter from 0 to infinity.
    if (minInput == "" && maxInput == "") {
        minInput = 0;
        maxInput = 10000000; //to infinity.
    }   else if (minInput == "") {
        minInput = 0;
    }   else if (maxInput == "") {
        maxInput = 10000000; //to infinity.
    }
    // loop through all emperors.
    for (let i = 0; i < emperors.length; i++) {
        const reignYears =  (Math.abs(emperors[i].emperorUntil) - emperors[i].emperorFrom);
        if (reignYears >= minInput && reignYears <= maxInput) {
            fillData(i);
        }
    }
}

// Function to remove all filters.
function removeFilters() {
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild)
    }
    showAllImperators();
}


// Function to fill the emperor card
function fillData(indexEmperorPage) {
    // define item clone from template //
    const itemClone = emperorPageTemplate.content.cloneNode(true)
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
    itemClone.querySelector('.emperor-length').innerText = 'Emperor for: ' + (Math.abs(emperors[indexEmperorPage].emperorUntil) - emperors[indexEmperorPage].emperorFrom) + ' years'

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

    
