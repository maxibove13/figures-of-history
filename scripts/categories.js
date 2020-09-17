// Gather the node list with all categories.
const dinasties = document.querySelectorAll('.categories a');
// For all the categories add an eventListener.
for (let dinastyIndex = 0; dinastyIndex < dinasties.length; dinastyIndex++) {
    dinasties[dinastyIndex].addEventListener('click', function() {
        selectCategory(dinastyIndex);
    });
}



// Function to select a category
function selectCategory(dinastyIndex) {
    // Turn on flag that indicates that a category has been selected.
    isCategory = 1;
    // Given the category selected slice the emperors array to that certain dinasty.
    if (dinastyIndex == 0) {
        dinastyArray = emperors.slice(0,5);
    }   else if (dinastyIndex == 1) {
        dinastyArray = emperors.slice(5,9);
    }   else if (dinastyIndex == 2) {
        dinastyArray = emperors.slice(8,11);
    }   else if (dinastyIndex == 3) {
        dinastyArray = emperors.slice(11,18);
    }
    // Prevents from reloading unpurposely if category already selected.
    if (dinastyArray.length == document.querySelectorAll('.emperor-title-name').length) {
        for (let i = 0; i <= dinastyArray.length; i++) {
            if (dinastyArray[i].emperorName !== document.querySelectorAll('.emperor-title-name')[i].innerHTML) {
                break;
            }
            return;
        }
    }
    // Clean container
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild)
    }
    // Call function to clone the selected dinasty's emperors.
    fillData(dinastyArray);
}


// Show chevron-right icon when clicking category.
const dinastiesChevron = document.querySelectorAll('.categories i');
// For all categories add an eventListener.

for (let dinastyIndex = 0; dinastyIndex < dinasties.length; dinastyIndex++) {
    dinasties[dinastyIndex].addEventListener('click', function() {
        for(let i = 0; i < dinasties.length; i++) {
            dinastiesChevron[i].style.display = 'none';
            dinasties[i].style.fontWeight = 'normal';
        }
        dinastiesChevron[dinastyIndex].style.display = 'block';
        dinasties[dinastyIndex].style.fontWeight = 'bold';
        
    });
}


// Function to remove categories
function removeCategories() {
    // clean container.
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild)
    }

    // Remove category active style
    for(let i = 0; i < dinasties.length; i++) {
        dinastiesChevron[i].style.display = 'none';
        dinasties[i].style.fontWeight = 'normal';
    }
    // Turn off category flag.
    isCategory = 0;
    // Back to top.
    topFunction();
    // Remove all filters
    removeFilters()
    // Call function that shows the complete list of emperors.
    showAllImperators();
}


// Category and filter sidebars behaviours.
// Define .categories and .filters class
const sidebarCategories = document.querySelector('.categories');
const sidebarFilters = document.querySelector('.filters');
// Define button-filter and button-categories IDs.
const buttonCategories = document.getElementById('button-categories');
const buttonFilters = document.getElementById('button-filters')
// Make the buttons listen to click event.
buttonCategories.addEventListener('click', function() {
    showSidebar(buttonCategories);
});
buttonFilters.addEventListener('click', function() {
    showSidebar(buttonFilters);
});

