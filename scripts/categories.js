// Function to select a category
function selectCategory(dinastyIndex) {
    dinastiesChevron = document.querySelectorAll('.categories i');
    // Given the selected category slice the emperors array to that certain dinasty.
    if (dinastyIndex == 0) {
        dinastyArray = emperors.slice(0,5);
    }   else if (dinastyIndex == 1) {
        dinastyArray = emperors.slice(5,9);
    }   else if (dinastyIndex == 2) {
        dinastyArray = emperors.slice(8,11);
    }   else if (dinastyIndex == 3) {
        dinastyArray = emperors.slice(11,18);
        // if dinastyArrya = -1 no category is selected.
    }   else {
        return;
    }
    // Remove the style of selected categories (in case another category was selected before)
    for(let i = 0; i < dinasties.length; i++) {
        dinastiesChevron[i].style.display = 'none';
        dinasties[i].style.fontWeight = 'normal';
    }
    // Prevents from reloading unpurposely if category already selected.
    // if (dinastyArray.length == document.querySelectorAll('.emperor-title-name').length) {
    //     for (let i = 0; i <= dinastyArray.length; i++) {
    //         if (dinastyArray[i].emperorName !== document.querySelectorAll('.emperor-title-name')[i].innerHTML) {
    //             break;
    //         }
    //         return;
    //     }
    // }
    // Style the selected dinasty.
    // Show chevron-right icon when clicking category.
    dinastiesChevron[dinastyIndex].style.display = 'block';
    dinasties[dinastyIndex].style.fontWeight = 'bold';
    // Make the dinastyArray as the general filteredArray to process in filters function.
    filteredArray = dinastyArray;
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

