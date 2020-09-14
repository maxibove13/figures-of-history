// container for the emperor page
const container = document.querySelector(".figures")
const emperorPageTemplate = document.getElementById("emperor-page-template");

// get the emperor page with all emperors //
function showAllImperators() {
        fillData(emperors);
}



function filters() {
    // Clear time variable on queue.
    if (typeof timeVar !== "undefined") {
        clearTimeout(timeVar)
    }
    timeVar = setTimeout(function(){
        // clean the container.
        while (container.hasChildNodes()) {
            container.removeChild(container.lastChild)
        }
        // Initialize filteredArray as the full emperor list.
        window.filteredArray = emperors;
        // Call all filters functions.
        howLong('fromReigningYears','toReigningYears');
        ageWhenEmp('fromAgeWhenEmperor','toAgeWhenEmperor');
        causeofDeath();
        inWhatYearsDidHeReign('fromYearSpan','toYearSpan');

        // call function to clone template and fill data given filtered array.
        fillData(filteredArray);
        // If the page hasn't any content display a message
        if (container.hasChildNodes() == 0) {
            const itemClone = document.getElementById("emperorNotFound").content.cloneNode(true);
            container.appendChild(itemClone);
        }
    },2000)
}


// Filter - How long did he last?
function howLong(input1,input2) {
    // assigns user inputs.
    let minInput = document.getElementById(input1).value;
    let maxInput = document.getElementById(input2).value;
    // If user leaves blank space, assigns values of 0 and inf.
    if (minInput == "" && maxInput == "") {
        minInput = 0;
        maxInput = 10000000; //to infinity.
    }   else if (minInput == "") {
        minInput = 0;
    }   else if (maxInput == "") {
        maxInput = 10000000; //to infinity.
    }
    // filter condition
     filteredArray = filteredArray.filter(function(emperor) {
        const reignYears =  (Math.abs(emperor.emperorUntil) - emperor.emperorFrom);
        return (reignYears >= minInput && reignYears <= maxInput);
     } );
}




// Filter - How many years when made Emperor?
function ageWhenEmp(input1,input2) {
    // assigns user inputs.
    let minInput = document.getElementById(input1).value;
    let maxInput = document.getElementById(input2).value;
    // If user leaves blank space, assigns values of 0 and inf.
    if (minInput == "" && maxInput == "") {
        minInput = 0;
        maxInput = 10000000; //to infinity.
    }   else if (minInput == "") {
        minInput = 0;
    }   else if (maxInput == "") {
        maxInput = 10000000; //to infinity.
    }
    // filter condition
     filteredArray = filteredArray.filter(function(emperor) {
        const ageEmperor =  Math.abs(Math.abs(emperor.emperorFrom) - Math.abs(emperor.Born));
        return (ageEmperor >= minInput && ageEmperor <= maxInput);
     } );
}

// Filter - How did he died?
function causeofDeath() {
    // get HTMLCollection with all of these checkboxes inputs
    const checkboxesDeath = document.getElementsByClassName("cause-of-death-input");
    let checkedBoxesDeath = [];
    // Get a boolean array of checked checkboxes
    for (let i = 0; i < checkboxesDeath.length; i++) {
        if (checkboxesDeath[i].checked) {
            checkedBoxesDeath.push(checkboxesDeath[i].value)
        }
    }
    if (checkedBoxesDeath.length == 0) {
        return;
    }
    // filter condition
    filteredArray = filteredArray.filter(function(emperor) {
        // if some checkbox is equal to emperor.causeOfDeath, return that emperor.
        return (checkedBoxesDeath.some(element => element == emperor.causeOfDeath));
    })
}

// Filter - In what years did he live?
function inWhatYearsDidHeReign(input1,input2) {
    // assigns user inputs.
    let minInput = document.getElementById(input1).value;
    let maxInput = document.getElementById(input2).value;
    // If user leaves blank space, assigns values from beg to end of roman empire
    if (minInput == "" && maxInput == "") {
        minInput = -27;
        maxInput = 476; //to end of Western Roman Empire.
    }   else if (minInput == "") {
        minInput = -27;
    }   else if (maxInput == "") {
        maxInput = 476; //to end of Western Roman Empire.
    }
    // filter condition
    filteredArray = filteredArray.filter(function(emperor) {
    return (minInput <= emperor.emperorUntil && maxInput >= emperor.emperorFrom);
    } );
}

// Function to remove all filters.
function removeFilters() {
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild)
    }

    // Unmark all checkboxes
    const checkboxesDeath = document.getElementsByClassName("cause-of-death-input");
    for (let i = 0; i < checkboxesDeath.length; i++) {
        checkboxesDeath[i].checked = 0;
    }
    // Reset input values
    const filterInputs = document.querySelectorAll('.filters input[type="number"]');
    for (let i = 0; i < filterInputs.length; i++) {
        filterInputs[i].value = '';
    }
    // Call function that shows the complete list of emperors.
    showAllImperators();
}


// Function to fill the emperor card given a filteredArray
function fillData(filteredArray) {
    // loop through all filtered elements
    for (let i = 0; i < filteredArray.length; i++) {
        // define item clone from template //
        const itemClone = emperorPageTemplate.content.cloneNode(true)
        // get emperor data from array and write it inside the template //
        itemClone.querySelector('.emperor-title-name').innerText = filteredArray[i].emperorName;
        itemClone.querySelector('.emperor-range').innerText = filteredArray[i].emperorFrom + '-' + filteredArray[i].emperorUntil;
        itemClone.querySelector('.main-img').src = filteredArray[i].emperorImages[1];
        itemClone.querySelector('.main-img').alt = filteredArray[i].emperorName;
        itemClone.querySelector('.bornIn').innerText = 'Born in: ' + filteredArray[i].originCity;
        itemClone.querySelector('.ageWhenEmperor').innerText = 'Age when emperor: ' + Math.abs(Math.abs(filteredArray[i].emperorFrom) - Math.abs(filteredArray[i].Born));
        itemClone.querySelector('.description').innerText = filteredArray[i].emperorDescription;
        itemClone.querySelector('.emperor-page-images').src = filteredArray[i].emperorImages[2];
        itemClone.querySelector('.emperor-page-images').alt = filteredArray[i].emperorImages[2];
        itemClone.querySelector('.emperor-length').innerText = 'Emperor for: ' + (Math.abs(filteredArray[i].emperorUntil) - filteredArray[i].emperorFrom) + ' years'

        // Define the dots position
        beg = filteredArray[i].emperorFrom;
        end = filteredArray[i].emperorUntil;
        relativeBeg = Math.abs(((-27)-beg)/(476+27)*100)
        relativeEnd = Math.abs(((-27)-end)/(476+27)*100)

        // Position the dots that marks the emperor years
        itemClone.querySelector(".beg-container").style.left = relativeBeg + '%';
        itemClone.querySelector(".end-container").style.left = relativeEnd + '%';
        // append the template item in the home card container //
        container.appendChild(itemClone)
    }
}



    
