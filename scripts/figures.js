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




// Filter button behaviour
const filtersSideBar = document.getElementsByClassName('filters')[0];
const buttonFilter = document.getElementById('button-filter');
// Show filters after clicking on Filters button (for max-width:1500px)
function showFilters() {
    filtersSideBar.classList.toggle("filters-sidebar");
    buttonFilter.classList.toggle("button-activated")
}
// To prevent the filter from activating automatically when resizing.
function correctFiltersSidebar() {
    if (window.innerWidth >= 1500) {
        filtersSideBar.classList.remove("filters-sidebar");
        buttonFilter.classList.remove("button-activated");
    }
}