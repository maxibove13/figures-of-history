
// Script that manages figure.html events. //


// Global scope declarations:
    // container of the emperors cards.
    const container = document.querySelector(".figures")
    // template of the emperor cards.
    const emperorPageTemplate = document.getElementById("emperor-page-template");
    // Displayed items per load.
    const nItemsPerPage = 5;
    
    // Gather all numerical filters ID in an array called filtersIDArray.
    const allNumFilters = document.querySelectorAll('input[type="number"]');
    let filtersIDArray = [];
    for (let i = 0; i < allNumFilters.length; i++) {
        filtersIDArray.push(allNumFilters[i].id)
    }
    const checkboxesDeathCauses = Array.from(document.getElementsByClassName("cause-of-death-input"));
    const sidebarCategories = document.querySelector('.categories');
    const sidebarFilters = document.querySelector('.filters');
    const buttonCategories = document.getElementById('button-categories');
    const buttonFilters = document.getElementById('button-filters');
    const dinasties = document.querySelectorAll('.categories a');
    const docHTML = document.documentElement;
    // Initialize dinastyIndex as -1 to prevent from selecting a category automatically.
    let dinastyIndex = -1;
    // Initialize filteredArray as the full emperor list.
    let filteredArray = emperors;
    // Stamp this year on footer.
    const thisYear = new Date().getFullYear();
    document.getElementById('company').innerHTML = '&copy;' + thisYear + ' logos'
    // Scroll to top button.
    const scrollButton = document.querySelector('.scrollttb-container');
    // right chevron symbol in dinasty selector.
    const dinastiesChevron = document.querySelectorAll('.categories i');

// Event listeners:
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
    // Categories (dinasties) filters.
    for (let i = 0; i < dinasties.length; i++) {
        dinasties[i].addEventListener('click', function() {
            filters(0,i);
            dinastyIndex = i;
        });
    }
    // Infinite scroll.
    window.addEventListener('scroll', function() {
    if ((docHTML.scrollTop+docHTML.clientHeight)/docHTML.offsetHeight >= 0.85 && container.children.length < filteredArray.length) {
            fillData(filteredArray);
        }
    // Deactivate sidebars if mobile menu opened.
    document.querySelector('.menu-wrap .toggler').addEventListener('click', closeSidebars)
    });
    // listen on load.
    window.addEventListener('load', removeFilters);
    window.addEventListener('load', readURLParams);
    window.addEventListener('load', function() {
    window.addEventListener('load', goBackToTop);
        filters(0,dinastyIndex);
    });
    // Remove dinasties.
    document.getElementById('remove-categories-button').addEventListener('click', removeCategories);
    // Remove filters.
    document.querySelector('.filters button').addEventListener('click', removeFilters);
    // Scroll to top button.
    scrollButton.addEventListener('click', goBackToTop);
    // Categories and filters button (medium and small version).
    buttonCategories.addEventListener('click', function() {
        showSidebar(buttonCategories);
    });
    buttonFilters.addEventListener('click', function() {
        showSidebar(buttonFilters);
    });
    // When resizing deactivate more information button and displayed text in mobile version.
    window.addEventListener('resize', function() {
        for (let i = 0; i < container.children.length; i++) {
            if (window.innerWidth > 800) {
                document.querySelectorAll('.right-column-emperor')[i].style.display = 'flex';
                document.querySelectorAll('.more-images')[i].style.display = 'block';
                document.querySelectorAll('.emperor-content')[i].style.flexDirection = 'row';
                document.querySelectorAll('.right-column-emperor')[i].style.width = '50%';
            }   else {
                document.querySelectorAll('.right-column-emperor')[i].style.display = 'none';
            }
            document.querySelectorAll('.button-moreInformation')[i].classList.toggle('button-activated', false);
        }
    });
    // Deactivate sidebars if resizing. (medium and small version).
    window.addEventListener('resize', function() {
        sidebarCategories.classList.toggle('sidebar-category', false);
        buttonCategories.classList.toggle('button-activated', false);
        sidebarFilters.classList.toggle('sidebar-filter', false);
        buttonFilters.classList.toggle('button-activated', false);
        document.querySelector('.sidebar-overlay').classList.toggle('sidebar-overlay-display', false);
    });

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


// Main filters function.
function filters(tInit,dinastyIndex) {
    if (typeof timeVar !== "undefined") {
        clearTimeout(timeVar) // Clear time variable on queue.
    }
    timeVar = setTimeout(function(){
        filteredArrayOld = filteredArray; // Save previous filteredArray.
        filteredArray = emperors; // Reinitialize filteredArray as the complete emperor list.
        selectCategory(dinastyIndex);
        howLong('fromReigningYears','toReigningYears');
        ageWhenEmp('fromAgeWhenEmperor','toAgeWhenEmperor');
        causeofDeath();
        inWhatYearsDidHeReign('fromYearSpan','toYearSpan');
        // Compare the previous filteredArray (filteredArrayOld) with the actual filteredArray.
        // If they are the same, prevent the filter from displaying data again.
        if (container.children.length !== 0) {
            if (filteredArrayOld.length == filteredArray.length) {
                for (let i = 0; i < filteredArray.length; i++) {
                    if (filteredArray[i] !== filteredArrayOld[i]) {
                        break;
                    }
                }
                return;
            }
        }
        while (container.hasChildNodes()) {
            container.removeChild(container.lastChild); // clean the container.
        }
        fillData(filteredArray);
        if (container.hasChildNodes() == 0) {
            const itemClone = document.getElementById("emperorNotFound").content.cloneNode(true);
            container.appendChild(itemClone);
        }
        goBackToTop();
        updateURL(dinastyIndex);
        enableMoreInformation();
    },tInit)
}

function selectCategory(dinastyIndex) {
    // Given the selected category slice the emperors array to that certain dinasty.
    if (dinastyIndex == 0) {
        dinastyArray = emperors.slice(0,5);
    }   else if (dinastyIndex == 1) {
        dinastyArray = emperors.slice(5,9);
    }   else if (dinastyIndex == 2) {
        dinastyArray = emperors.slice(8,11);
    }   else if (dinastyIndex == 3) {
        dinastyArray = emperors.slice(11,18);
        // if dinastyArray = -1 no category is selected.
    }   else {
        return;
    }
    // Style the dinasties selector.
    for(let i = 0; i < dinasties.length; i++) {
        dinastiesChevron[i].style.display = 'none';
        dinasties[i].style.fontWeight = 'normal';
    }
    dinastiesChevron[dinastyIndex].style.display = 'block';
    dinasties[dinastyIndex].style.fontWeight = 'bold';
    filteredArray = dinastyArray;
}

// Filter - How long did he last?
function howLong(input1,input2) {
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
    let checkedBoxesDeath = [];
    // Get a boolean array of checked checkboxes
    for (let i = 0; i < checkboxesDeathCauses.length; i++) {
        if (checkboxesDeathCauses[i].checked) {
            checkedBoxesDeath.push(checkboxesDeathCauses[i].value)
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
    // If user leaves blank space, assigns values from beg to end of western roman empire.
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

// Function to fill the emperor card given a filteredArray
function fillData(filteredArray) {
    if (filteredArray.length > nItemsPerPage) {
        infiniteScroll(filteredArray);
    }   else {
        filteredArrayToShow = filteredArray;
    }
    for (let i = 0; i < filteredArrayToShow.length; i++) {
        const itemClone = emperorPageTemplate.content.cloneNode(true)
        // get emperor data from array and write it inside the template.
        itemClone.querySelector('.emperor-title-name').innerText = filteredArrayToShow[i].emperorName;
        itemClone.querySelector('.emperor-range').innerText = filteredArrayToShow[i].emperorFrom + '-' + filteredArrayToShow[i].emperorUntil;
        itemClone.querySelector('.main-image').style.backgroundImage = 'url(' + filteredArrayToShow[i].emperorImages[1] + ')';     
        itemClone.querySelector('.emperor-page-images').src = filteredArrayToShow[i].emperorImages[2];
        itemClone.querySelector('.emperor-page-images').alt = filteredArrayToShow[i].emperorImages[2];
        itemClone.querySelector('.emperor-length').innerText = 'Emperor for: ' + (Math.abs(filteredArrayToShow[i].emperorUntil) - filteredArrayToShow[i].emperorFrom) + ' years'
        // Define the timeline position
        beg = filteredArrayToShow[i].emperorFrom;
        end = filteredArrayToShow[i].emperorUntil;
        relativeBeg = Math.abs(((-27)-beg)/(476+27)*100)
        relativeEnd = Math.abs(((-27)-end)/(476+27)*100)

        // Position the chevron icons that marks the emperor years
        itemClone.querySelector(".beg-container").style.left = relativeBeg + '%';
        itemClone.querySelector(".end-container").style.left = relativeEnd + '%';

        container.appendChild(itemClone)   
    }
}

function infiniteScroll(filteredArray) {
    nItemsDisplayed = container.children.length;
    // Less than nItemsPerPage remaining to display.
    if (container.children.length+nItemsPerPage >= filteredArray.length) {
        filteredArrayToShow = filteredArray.slice(container.children.length,filteredArray.length);
        // Nothing displayed yet.
    }   else if (container.children.length == 0) {
        filteredArrayToShow = filteredArray.slice(0,nItemsPerPage);
        // More than nItemsPerPage remaining to display.
    }   else {
        filteredArrayToShow = filteredArray.slice(container.children.length,container.children.length+nItemsPerPage);
    }
}

function goBackToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function updateURL(dinastyIndex) {
    let filtersQueryString = [];
    // Define the dinasty string query
    if (dinastyIndex !== -1) {
        filtersQueryString.push('dinasty' + '=' + dinastyIndex);
    }
    // loop through all numerical filters and define its query string if activated.
    for (let i = 0; i < filtersIDArray.length; i++) {
        if (document.getElementById(filtersIDArray[i]).value !== '') {
            numFilterString = filtersIDArray[i] + '=' + document.getElementById(filtersIDArray[i]).value
            filtersQueryString.push(numFilterString);
        }
    }
    // Loop through checkboxes cause of deaths.
    for (let i = 0; i < checkboxesDeathCauses.length; i++) {
        if (checkboxesDeathCauses[i].checked) { // Add it only if it is checked.
            // Define the query string syntax 'causeOfDeath=1' (1=true)
            checkboxFilterString = 'causeOfDeath' + i + '=' + 1;
            filtersQueryString.push(checkboxFilterString);
        } 
    }
    queryStringToAdd = '?'; // Define Query String to add in URL
    // Concatenate all the query strings to add:
    for (let i = 0; i < filtersQueryString.length; i++) {
        queryStringToAdd = queryStringToAdd.concat(filtersQueryString[i]);
        if (i < filtersQueryString.length-1) {
           queryStringToAdd = queryStringToAdd.concat('&');
        }
    }
    // Update URL
    window.history.replaceState('null','',queryStringToAdd)
}

// Function that displays description text in mobile version when clicking on 'more information'.
function enableMoreInformation() {
    for (let i = 0; i < container.children.length; i++) {
        document.querySelectorAll('.button-moreInformation')[i].addEventListener('click', function() {
            document.querySelectorAll('.button-moreInformation')[i].classList.toggle('button-activated');
            if (document.querySelectorAll('.right-column-emperor')[i].style.display == 'block') {
                document.querySelectorAll('.right-column-emperor')[i].style.display = 'none';
       
            }   else {
                document.querySelectorAll('.right-column-emperor')[i].style.display = 'block';
                document.querySelectorAll('.more-images')[i].style.display = 'none';
                document.querySelectorAll('.emperor-content')[i].style.flexDirection = 'column';
                document.querySelectorAll('.right-column-emperor')[i].style.width = '100%';
            }
        });
    }

};

function removeCategories() {
    // Remove category active style
    for(let i = 0; i < dinasties.length; i++) {
        dinastiesChevron[i].style.display = 'none';
        dinasties[i].style.fontWeight = 'normal';
    }
    // Go back to top.
    goBackToTop();
    // Process the filters again without any dinasty selected (dinastyIndex = -1);
    dinastyIndex = -1;
    filters(0,dinastyIndex);
}

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

// Manage filters and categories sidebar behaviour. (both cannot be activated at the same time)
function showSidebar(buttonType) {
    if (buttonType == buttonCategories) {
        if (buttonFilters.classList.contains('button-activated')) {
            sidebarFilters.classList.toggle('sidebar-filter');
            buttonFilters.classList.toggle('button-activated');
        }
        sidebarCategories.classList.toggle('sidebar-category');
        buttonCategories.classList.toggle('button-activated');
    } else {
        if (buttonCategories.classList.contains('button-activated')) {
            sidebarCategories.classList.toggle('sidebar-category');
            buttonCategories.classList.toggle('button-activated');
        }
        sidebarFilters.classList.toggle('sidebar-filter');
        buttonFilters.classList.toggle('button-activated');
    }
    if (buttonFilters.classList.contains('button-activated') || buttonCategories.classList.contains('button-activated')) {
        document.querySelector('.sidebar-overlay').classList.toggle('sidebar-overlay-display', true);
    }   else {
        document.querySelector('.sidebar-overlay').classList.toggle('sidebar-overlay-display', false);
    }
}

function closeSidebars() {
    if (document.querySelector('.menu-wrap .toggler').checked) {
        sidebarCategories.classList.toggle('sidebar-category', false);
        buttonCategories.classList.toggle('button-activated', false);
        sidebarFilters.classList.toggle('sidebar-filter', false);
        buttonFilters.classList.toggle('button-activated', false);
        document.querySelector('.sidebar-overlay').classList.toggle('sidebar-overlay-display', false);
    }
}

// Only show button to top when scrolled.
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollButton.style.display = 'flex';
    }   else {
            scrollButton.style.display = 'none';
    }
};

//Activate & deactivate Overlay//
// function onOverlay() {
//     document.getElementById('watch-out-overlay').style.display='block';
// }

// function offOverlay() {
//     document.getElementById('watch-out-overlay').style.display='none';
// }






