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


// Show filters after clicking on Filters button (for max-width:1500px)
function showFilters() {
    const filtersBtn = document.getElementsByClassName('filters');
    if (filtersBtn[0].style.display == 'none')
    {
        filtersBtn[0].style.display = 'block';
        filtersBtn[0].style.position = 'fixed';
        filtersBtn[0].style.background = 'white';
        filtersBtn[0].style.zIndex = '10';
        filtersBtn[0].style.height = '100%';
    } else {
        filtersBtn[0].style.display = 'none';
    }

}




