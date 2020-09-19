// General script to manage different events from figure.html
// Initialize dinastyIndex as -1 to prevent from selecting a category automatically.
let dinastyIndex = -1;
// Initialize filteredArray as the full emperor list.
let filteredArray = emperors;

// functions to call onload:

// Remove previous filters or categories.
window.addEventListener('load', removeFilters);
// Go to the top of the page.
window.addEventListener('load', topFunction);
// Read URL parameters (string queries).
window.addEventListener('load', readURLParams);
// apply any activated filters.
window.addEventListener('load', function() {
    filters(0,dinastyIndex);
});

// Deactivate sidebars if resizing.
window.addEventListener('resize', correctSidebars);

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

// Category and filter sidebars behaviours.
const sidebarCategories = document.querySelector('.categories');
const sidebarFilters = document.querySelector('.filters');
const buttonCategories = document.getElementById('button-categories');
const buttonFilters = document.getElementById('button-filters')
// Make the buttons listen to click event.
buttonCategories.addEventListener('click', function() {
    showSidebar(buttonCategories);
});
buttonFilters.addEventListener('click', function() {
    showSidebar(buttonFilters);
});
// Manage filters and categories sidebar behaviour. (both cannot be activated at the same time)
function showSidebar(buttonType) {
    
    // if categories is clicked, activate it.
    if (buttonType == buttonCategories) {
        // if filter sidebar is activated.
        if (buttonFilters.classList.contains('button-activated')) {
            // deactivate the filter sidebar.
            sidebarFilters.classList.toggle('sidebar-filter');
            buttonFilters.classList.toggle('button-activated');
        }
        // proceed to activate categories sidebar. 
        sidebarCategories.classList.toggle('sidebar-category');
        buttonCategories.classList.toggle('button-activated');
    // if filter is clicked, activate it. 
    } else {
        // if categories sidebar is activated.
        if (buttonCategories.classList.contains('button-activated')) {
            // deactivate the categories sidebar. 
            sidebarCategories.classList.toggle('sidebar-category');
            buttonCategories.classList.toggle('button-activated');
        }
        // proceed to activate filters sidebar.
        sidebarFilters.classList.toggle('sidebar-filter');
        buttonFilters.classList.toggle('button-activated');
    }
    if (buttonFilters.classList.contains('button-activated') || buttonCategories.classList.contains('button-activated')) {
        document.querySelector('.sidebar-overlay').classList.toggle('sidebar-overlay-display', true);
    }   else {
        document.querySelector('.sidebar-overlay').classList.toggle('sidebar-overlay-display', false);
    }

}
// Function to deactivate the sidebars when resizing.
function correctSidebars() {
    // if width>800 deactivate the categories sidebar.
    if (window.innerWidth >= 800) {
        // Make sure the sidebar is deactivated. 
        sidebarCategories.classList.toggle('sidebar-category', false);
        buttonCategories.classList.toggle('button-activated', false);
    }
    // if width>1500 deactivate the filters sidebar.
    if (window.innerWidth >= 1500) {
        // Make sure the sidebar is deactivated. 
        sidebarFilters.classList.toggle('sidebar-filter', false);
        buttonFilters.classList.toggle('button-activated', false);
    }
}

// Add eventlistener to hamburger menu
document.querySelector('.menu-wrap .toggler').addEventListener('click', closeSidebars)

// Function to close categories and filters.
function closeSidebars() {
    if (document.querySelector('.menu-wrap .toggler').checked) {
        // Make sure the sidebar is deactivated. 
        sidebarCategories.classList.toggle('sidebar-category', false);
        buttonCategories.classList.toggle('button-activated', false);
        sidebarFilters.classList.toggle('sidebar-filter', false);
        buttonFilters.classList.toggle('button-activated', false);
    }
}


// Scroll to top button behaviour.
// Add event listener to scroll to top button.
const scrollButton = document.querySelector('.scrollttb-container');
scrollButton.addEventListener('click', topFunction)
// Only show button when scrolled.
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollButton.style.display = 'flex';
    }   else {
            scrollButton.style.display = 'none';
    }
};
// Function to go back to top.
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

