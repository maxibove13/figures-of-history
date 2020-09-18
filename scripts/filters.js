// container for the emperor page
const container = document.querySelector(".figures")
// template
const emperorPageTemplate = document.getElementById("emperor-page-template");
// Displayed items per load.
const nItemsPerPage = 5;

// Gather all numerical filters ID in an array.
const filtersIDArray = ['fromReigningYears','toReigningYears','fromAgeWhenEmperor','toAgeWhenEmperor','fromYearSpan','toYearSpan'];
// Gather all causeOfDeath checkboxes.
const checkboxesDeathCauses = Array.from(document.getElementsByClassName("cause-of-death-input"));

// Add event listener to all filters:
// Numerical filters.
for(let i = 0; i < filtersIDArray.length; i++) {
    document.getElementById(filtersIDArray[i]).addEventListener('click', function() {
        filters(1500,dinastyIndex);
    })
}
// Checkboxes filters.
for(let i = 0; i < checkboxesDeathCauses.length; i++) {
    checkboxesDeathCauses[i].addEventListener('click', function() {
        filters(1500,dinastyIndex);
    })
}
// Dinasties (categories) filters.
// Gather the node list with all categories.
const dinasties = document.querySelectorAll('.categories a');
// For all the categories add an eventListener.
for (let i = 0; i < dinasties.length; i++) {
    dinasties[i].addEventListener('click', function() {
        filters(0,i);
        dinastyIndex = i;
    });
}

// Read URL parameters
function readURLParams() {
    // Define the const to get the queryStrings.
    const queryStrings = new URLSearchParams(location.search);
    // loop through all numerical filters and get its query strings.
    for (let i = 0; i < filtersIDArray.length; i++) {
        // If the query string has that ID.
        if (queryStrings.has(filtersIDArray[i])) {
            // Assign the value.
            document.getElementById(filtersIDArray[i]).value = queryStrings.get(filtersIDArray[i]);
        }
    }
    // loop through checkboxes cause of death and check if there is any query string to get.
    for (let i = 0; i < checkboxesDeathCauses.length; i++) {
        // if queryString has it:
        if (queryStrings.has('causeOfDeath' + i)) {
            // Check it.
            document.getElementById('causeOfDeath' + i).checked = queryStrings.get('causeOfDeath' + i) == 1;
        }
    }
    // Check if there is any dinasty selected in the query string.
    for(let i = 0; i < dinasties.length; i++) {
        if (queryStrings.has('dinasty')) {
            dinastyIndex = queryStrings.get('dinasty');
            break;
        }
    }
}


// get the emperor page with all emperors //
function showAllImperators() {
        // clean the container.
        while (container.hasChildNodes()) {
            container.removeChild(container.lastChild)
        }
        filteredArray = emperors;
        fillData(filteredArray);
}



function filters(tInit,dinastyIndex) {
    // Clear time variable on queue.
    if (typeof timeVar !== "undefined") {
        clearTimeout(timeVar)
    }
    timeVar = setTimeout(function(){
        // Save previous filteredArray.
        filteredArrayOld = filteredArray;
        // Reinitialize filteredArray as the complete emperor list.
        filteredArray = emperors;
        // Call dynasties (Categories) function.
        selectCategory(dinastyIndex);
        // Call all filters functions.
        howLong('fromReigningYears','toReigningYears');
        ageWhenEmp('fromAgeWhenEmperor','toAgeWhenEmperor');
        causeofDeath();
        inWhatYearsDidHeReign('fromYearSpan','toYearSpan');
        // Compare the previous filteredArray (filteredArrayOld) with the actual filteredArray.
        // If they are the same, prevent the filter from displaying data again. (get out from filters()).
        // Check if they have the same length first.
        if (container.children.length !== 0) {
            if (filteredArrayOld.length == filteredArray.length) {
                // Compare each element.
                for (let i = 0; i < filteredArray.length; i++) {
                    // If some element is different break the loop.
                    if (filteredArray[i] !== filteredArrayOld[i]) {
                        break;
                    }
                    // If no element is different, get out from filters().
                    return;
                }
            }
        }

        // clean the container.
        while (container.hasChildNodes()) {
            container.removeChild(container.lastChild)
        }
        // call function to clone template and fill data given filtered array.
        fillData(filteredArray);
        // If the page hasn't any content display a message
        if (container.hasChildNodes() == 0) {
            const itemClone = document.getElementById("emperorNotFound").content.cloneNode(true);
            container.appendChild(itemClone);
        }
        // Go back to the top of the page.
        topFunction()
        // Update the URL query strings with the actual filters.
        updateURL(dinastyIndex)
    },tInit)
}


// Filter - How long did he last?
function howLong(input1,input2) {
    // assigns user inputs.
    let minInput = document.getElementById(input1).value;
    let maxInput = document.getElementById(input2).value;
    // If minInput > maxInput, revert them.
    if (minInput > maxInput && maxInput !== "" && minInput !== "") {
        minI = maxInput;
        maxI = minInput;
        minInput = minI;
        maxInput = maxI;
    }
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
    minInput = document.getElementById(input1).value;
    maxInput = document.getElementById(input2).value;
    if (minInput > maxInput && maxInput !== "" && minInput !== "") {
        minI = maxInput;
        maxI = minInput;
        minInput = minI;
        maxInput = maxI;
    }
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
    minInput = document.getElementById(input1).value;
    maxInput = document.getElementById(input2).value;
    if (minInput > maxInput && maxInput !== "" && minInput !== "") {
        minI = maxInput;
        maxI = minInput;
        minInput = minI;
        maxInput = maxI;
    }
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
    // Call filters function.
    filters(0,dinastyIndex);
}


// Function to fill the emperor card given a filteredArray
function fillData(filteredArray) {
    // if array has more than 10 items
    if (filteredArray.length > nItemsPerPage) {
        infiniteScroll(filteredArray);
    }   else {
        filteredArrayToShow = filteredArray;
    }


    // loop through all filtered elements
    for (let i = 0; i < filteredArrayToShow.length; i++) {
        // define item clone from template //
        const itemClone = emperorPageTemplate.content.cloneNode(true)
        // get emperor data from array and write it inside the template //
        itemClone.querySelector('.emperor-title-name').innerText = filteredArrayToShow[i].emperorName;
        itemClone.querySelector('.emperor-range').innerText = filteredArrayToShow[i].emperorFrom + '-' + filteredArrayToShow[i].emperorUntil;
        itemClone.querySelector('.main-image').style.backgroundImage = 'url(' + filteredArrayToShow[i].emperorImages[1] + ')';
        // itemClone.querySelector('.bornIn').innerText = 'Born in: ' + filteredArrayToShow[i].originCity + ', ' + filteredArrayToShow[i].originProvince;
        // itemClone.querySelector('.ageWhenEmperor').innerText = 'Age when emperor: ' + Math.abs(Math.abs(filteredArrayToShow[i].emperorFrom) - Math.abs(filteredArrayToShow[i].Born));
        //itemClone.querySelector('.description').innerText = filteredArrayToShow[i].emperorDescription;
        itemClone.querySelector('.emperor-page-images').src = filteredArrayToShow[i].emperorImages[2];
        itemClone.querySelector('.emperor-page-images').alt = filteredArrayToShow[i].emperorImages[2];
        itemClone.querySelector('.emperor-length').innerText = 'Emperor for: ' + (Math.abs(filteredArrayToShow[i].emperorUntil) - filteredArrayToShow[i].emperorFrom) + ' years'

        // Define the dots position
        beg = filteredArrayToShow[i].emperorFrom;
        end = filteredArrayToShow[i].emperorUntil;
        relativeBeg = Math.abs(((-27)-beg)/(476+27)*100)
        relativeEnd = Math.abs(((-27)-end)/(476+27)*100)

        // Position the dots that marks the emperor years
        itemClone.querySelector(".beg-container").style.left = relativeBeg + '%';
        itemClone.querySelector(".end-container").style.left = relativeEnd + '%';
        // append the template item in the home card container //
        container.appendChild(itemClone)
    }
}

// Display only 10 emperors at a time.
if (container.children.length > 10) {
    for (let i = 10; i < container.children.length; i++) {
        container.children[i].style.display = 'none';
    }
} 

// Listen when scroll is near botton
window.addEventListener('scroll', function() {
    const docHTML = document.documentElement;
    // Define the "scroll to near botton"
    if ((docHTML.scrollTop+docHTML.clientHeight)/docHTML.offsetHeight >= 0.85) {
        // If all Items are already displayed do nothing.
        if (container.children.length == filteredArray.length) {
        }   else {
            // Otherwise fill the container with the remaining items.
            fillData(filteredArray);
        }
    }
});


function infiniteScroll(filteredArray) {
    // Number of actual items being displayed.
    nItemsDisplayed = container.children.length;
    if (container.children.length+nItemsPerPage >= filteredArray.length) {
        filteredArrayToShow = filteredArray.slice(container.children.length,filteredArray.length);
    }   else if (container.children.length == 0) {
        filteredArrayToShow = filteredArray.slice(0,nItemsPerPage);
    }   else {
        filteredArrayToShow = filteredArray.slice(container.children.length,container.children.length+nItemsPerPage);
    }
}


// Update URL query string.
function updateURL(dinastyIndex) {
    // Define empty array.
    let filtersQueryString = [];
    // Define the dinasty string query
    if (dinastyIndex !== -1) {
        filtersQueryString.push('dinasty' + '=' + dinastyIndex);
    }
    // loop through all numerical filters and define its query string if activated.

    for (let i = 0; i < filtersIDArray.length; i++) {
        // If i filter has a value assigned:
        if (document.getElementById(filtersIDArray[i]).value !== '') {
            // Define the query string syntax 'name=value'
            numFilterString = filtersIDArray[i] + '=' + document.getElementById(filtersIDArray[i]).value
            // Push it to an array
            filtersQueryString.push(numFilterString);
        }
    }
    // Loop through checkboxes cause of deaths.
    for (let i = 0; i < checkboxesDeathCauses.length; i++) {
        // Add it only if it is checked.
        if (checkboxesDeathCauses[i].checked) {
            // Define the query string syntax 'causeOfDeath=1' (1=true)
            checkboxFilterString = 'causeOfDeath' + i + '=' + 1;
            // Push it to the array.
            filtersQueryString.push(checkboxFilterString);
        } 
    }
    // Define Query String to add in URL
    queryStringToAdd = '?';
    // Concatenate all the query strings defined in filtersQueryString array:
    for (let i = 0; i < filtersQueryString.length; i++) {
        queryStringToAdd = queryStringToAdd.concat(filtersQueryString[i]);
        if (i < filtersQueryString.length-1) {
           queryStringToAdd = queryStringToAdd.concat('&');
        }
    }
    // Update URL
    window.history.replaceState('null','',queryStringToAdd)
}