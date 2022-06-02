// Change favicon according to theme
const checkDarkMode = function () {

	// In case browser's dark theme is enabled, returns boolean
	let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

	// If dark true, show white favicon
	if (isDark) {
		document.querySelector('link[type="image/svg+xml"]').href = 'favicon-white.svg';
	}
};

const checkForPreviousFlights = function() {

    if (localStorage.getItem('flightInformation')) {
        
        // Save previous flight information
        const previousFlightSearches = JSON.parse(localStorage.getItem('flightInformation'));
        
        // Show it on the UI
        document.querySelector('.search__departure').innerText = `${previousFlightSearches[0].departureLocation}`;
        document.querySelector('.search__arrival').innerText = `${previousFlightSearches[0].arrivalLocation}`;
        document.querySelector('.search__departure-date').innerText = `${previousFlightSearches[0].departureDate}`;
        document.querySelector('.search__return-date').innerText = `${previousFlightSearches[0].returnDate}`;
        
    }

};

checkForPreviousFlights();

document.querySelector('.form').addEventListener('submit', function(e) {

    e.preventDefault();

    let departureLocation = document.querySelector('#departure').value;
    let arrivalLocation = document.querySelector('#arrival').value;
    let departureDate = document.querySelector('#departure-date').value;
    let returnDate = document.querySelector('#return-date').value;

    if(localStorage.getItem('flightInformation')) {
        
    }

    // Create flight information object
    const flight = [
        { 
            departureLocation: departureLocation,
            arrivalLocation: arrivalLocation,
            departureDate: departureDate,
            returnDate: returnDate
        }
    ]

    // Store data
    localStorage.setItem('flightInformation', JSON.stringify(flight));

    // Reload page
    window.location.reload();


});

document.addEventListener('DOMContentLoaded', checkDarkMode());