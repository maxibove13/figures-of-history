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

// Deactivate sidebars if menu opened.
document.querySelector('.menu-wrap .toggler').addEventListener('click', closeSidebars)

// Deactivate sidebars if resizing. And deactivate more information text.
window.addEventListener('resize', function() {
    // Make sure the sidebar is deactivated. 
    sidebarCategories.classList.toggle('sidebar-category', false);
    buttonCategories.classList.toggle('button-activated', false);
    sidebarFilters.classList.toggle('sidebar-filter', false);
    buttonFilters.classList.toggle('button-activated', false);
    document.querySelector('.sidebar-overlay').classList.toggle('sidebar-overlay-display', false);
});

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

// Define some buttons and sidebars.
const sidebarCategories = document.querySelector('.categories');
const sidebarFilters = document.querySelector('.filters');
const buttonCategories = document.getElementById('button-categories');
const buttonFilters = document.getElementById('button-filters');
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



// Function to close categories and filters.
function closeSidebars() {
    if (document.querySelector('.menu-wrap .toggler').checked) {
        // Make sure the sidebar is deactivated. 
        sidebarCategories.classList.toggle('sidebar-category', false);
        buttonCategories.classList.toggle('button-activated', false);
        sidebarFilters.classList.toggle('sidebar-filter', false);
        buttonFilters.classList.toggle('button-activated', false);
        document.querySelector('.sidebar-overlay').classList.toggle('sidebar-overlay-display', false);
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



// Function that displays more information text in each emperor card when more informatio button is clicked.
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

window.addEventListener('resize', function() {
    // Deactivate more information button and displayed text.
    for (let i = 0; i < container.children.length; i++) {
        if (window.innerWidth > 800) {
            document.querySelectorAll('.right-column-emperor').style.display = 'flex';
            document.querySelectorAll('.more-images')[i].style.display = 'block';
            document.querySelectorAll('.emperor-content')[i].style.flexDirection = 'row';
            document.querySelectorAll('.right-column-emperor')[i].style.width = '50%';
        }   else {
            document.querySelectorAll('.right-column-emperor')[i].style.display = 'none';
        }
        document.querySelectorAll('.button-moreInformation')[i].classList.toggle('button-activated', false);
    }
});


// Ugly solution to activate enableMoreInformation() when loading more emperors.
window.addEventListener('click', function() {
    enableMoreInformation();
    console.log('I am scrolling');
});