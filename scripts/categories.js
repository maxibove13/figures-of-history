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
    // Style the selected dinasty.
    // Show chevron-right icon when clicking category.
    dinastiesChevron[dinastyIndex].style.display = 'block';
    dinasties[dinastyIndex].style.fontWeight = 'bold';
    // Make the dinastyArray as the general filteredArray to process in filters function.
    filteredArray = dinastyArray;
}

// Function to remove categories
function removeCategories() {
    // Remove category active style
    for(let i = 0; i < dinasties.length; i++) {
        dinastiesChevron[i].style.display = 'none';
        dinasties[i].style.fontWeight = 'normal';
    }
    // Go back to top.
    topFunction();
    // Process the filters again without any dinasty selected (dinastyIndex = -1);
    dinastyIndex = -1;
    filters(0,dinastyIndex);
}



