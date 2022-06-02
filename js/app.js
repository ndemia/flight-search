// Change favicon according to theme
const checkDarkMode = function () {

	// In case browser's dark theme is enabled, returns boolean
	let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

	// If dark true, show white favicon
	if (isDark) {
		document.querySelector('link[type="image/svg+xml"]').href = 'favicon-white.svg';
	}
};


const checkForPreviousFlights = function () {

    if (localStorage.getItem('flightInformation')) {
        
        // Save previous flight information
        let previousFlightSearches = JSON.parse(localStorage.getItem('flightInformation'));
        
        // Show it on the UI
        document.querySelector('.search__departure').innerText = `${previousFlightSearches[0].departureLocation}`;
        document.querySelector('.search__arrival').innerText = `${previousFlightSearches[0].arrivalLocation}`;
        document.querySelector('.search__departure-date').innerText = `${previousFlightSearches[0].departureDate}`;
        document.querySelector('.search__return-date').innerText = `${previousFlightSearches[0].returnDate}`;
        
    }

};

// Overall form behaviour
document.querySelector('.form').addEventListener('submit', function(e) {

    e.preventDefault();
    
    let departureLocation = document.querySelector('#departure').value;
    let arrivalLocation = document.querySelector('#arrival').value;
    let departureDate = document.querySelector('#departure-date').value;
    let returnDate = document.querySelector('#return-date').value;

    // Create flight information object that will store the flight search information
    let flight = [
        { 
            departureLocation: departureLocation,
            arrivalLocation: arrivalLocation,
            departureDate: departureDate,
            returnDate: returnDate
        }
    ];

    // Check if previous flight searches have been made, so that we will add to them instead of overwrite them
    if (localStorage.getItem('flightInformation')) {
        
        // Save those previous searches as array
        let previousFlight = JSON.parse(localStorage.getItem('flightInformation'));
        
        // We add the new search to it. I reference the index so that way only the object inside the array is added, and not the whole array. This way I avoid
        // adding unnecessary brackets to the string that will later be stored
        previousFlight.push(flight[0]);
        
        localStorage.setItem('flightInformation', JSON.stringify(previousFlight));

    } else {

        // If no previous searches have been stored, just proceed with saving the current one
        localStorage.setItem('flightInformation', JSON.stringify(flight));

    }

    // Reload page after submit
    window.location.reload();

});

// Delete stored searches on request
document.querySelector('.btn--clear').addEventListener('click', function() {

    localStorage.clear();

    // Reload page after deleting
    window.location.reload();

});

document.addEventListener('DOMContentLoaded', checkDarkMode());
document.addEventListener('DOMContentLoaded', checkForPreviousFlights());