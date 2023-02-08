// App
document.querySelector('.btn--submit').addEventListener('click', function (e) {
    e.preventDefault();
    disableButtons();
    // Pass the event so that the showLoader can detect the button next to which the loader will appear
    showLoader(e);
    let flightSearches = [];
    let flightData = getFlightData();
    let previousFlights = checkForPreviousFlights();
    // Check if previous flight searches have been made, so that we will add to them instead of overwrite them
    if (previousFlights === true) {
        // Save those previous searches as array
        flightSearches = JSON.parse(localStorage.getItem('flightSearches'));
        flightSearches.push(flightData);
        localStorage.setItem('flightSearches', JSON.stringify(flightSearches));
    }
    else {
        flightSearches.push(flightData);
        localStorage.setItem('flightSearches', JSON.stringify(flightSearches));
    }
    reloadPage();
});
// Delete stored searches on request
document.querySelector('.btn--clear').addEventListener('click', function (e) {
    disableButtons();
    showLoader(e);
    localStorage.clear();
    reloadPage();
});
document.addEventListener('DOMContentLoaded', checkDarkMode);
document.addEventListener('DOMContentLoaded', checkAndShowPreviousFlights);
// Function declarations
function checkAndShowPreviousFlights() {
    if (checkForPreviousFlights() === true) {
        showPreviousFlights(getPreviousFlights());
    }
    else {
        return false;
    }
}
function checkForPreviousFlights() {
    let result = (localStorage.getItem('flightSearches') !== null) ? true : false;
    return result;
}
function getPreviousFlights() {
    let previousFlightSearches = localStorage.getItem('flightSearches');
    let previousFlightSearchesArr = [];
    if (previousFlightSearches !== null) {
        // Return only the last 3 searches
        previousFlightSearchesArr = JSON.parse(previousFlightSearches).slice(-3);
    }
    return previousFlightSearchesArr;
}
function showPreviousFlights(flights) {
    flights.forEach((flight) => {
        document.querySelector('.results__header').insertAdjacentHTML('afterend', createFlightDataTemplate(flight));
    });
    document.querySelector('.results').classList.remove('hidden');
}
function createFlightDataTemplate(flightData) {
    const flightDataTemplate = `<div class="results__container">
    <p class="results__locations" >
      <span class="results__departure">${flightData.departureLocation}</span>
      >
      <span class="results__arrival">${flightData.arrivalLocation}</span>
    </p>
    <p class="results__dates">
      <span class="results__departure-date">${flightData.departureDate}</span>
      >
      <span class="results__return-date">${flightData.returnDate}</span>
    </p>
  </div>`;
    return flightDataTemplate;
}
function getFlightData() {
    // Non-null assertion because we know these inputs exist
    let departureLocation = document.querySelector('#departure').value;
    let arrivalLocation = document.querySelector('#arrival').value;
    let departureDate = document.querySelector('#departure-date').value;
    let returnDate = document.querySelector('#return-date').value;
    // Define flight object that stores the flight data (locations, dates)
    const flightData = {
        departureLocation: departureLocation,
        arrivalLocation: arrivalLocation,
        departureDate: departureDate,
        returnDate: returnDate
    };
    return flightData;
}
// Change favicon according to theme
function checkDarkMode() {
    const favicon = document.querySelector('link[type="image/svg+xml"]');
    let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDark && favicon) {
        favicon.href = 'favicon-white.svg';
    }
}
function showLoader(e) {
    const clickedButton = e.target;
    const loader = clickedButton.nextElementSibling;
    if (clickedButton) {
        clickedButton.setAttribute('style', 'width: 85%');
    }
    // Delay the appeareance of the loader a bit to avoid it being showed over the button while it shortens its width
    if (loader != null) {
        setTimeout(() => {
            loader.setAttribute('style', 'display: inline-block');
        }, 200);
    }
}
function reloadPage() {
    setTimeout(() => {
        window.location.reload();
    }, 3000);
}
function disableButtons() {
    document.querySelectorAll('.btn').forEach((button) => {
        button.classList.add('btn--disabled');
        button.setAttribute('disabled', 'true');
    });
}
export {};
