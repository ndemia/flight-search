// Change favicon according to theme
const checkDarkMode = function () {

	// Check that dark theme is enabled, returns boolean
	let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

	// If dark true, show white favicon
	if (isDark) {
		document.querySelector('link[type="image/svg+xml"]').href = 'favicon-white.svg';
	}
};



const displayFlightInfo = function (flight) {

    // Create previous flight search template to show in UI
    const searchResultTemplate = 
    `<div class="results__results">
        <p><span class="results__departure">${flight.departureLocation}</span>  >  <span class="results__arrival">${flight.arrivalLocation}</span></p>
        <p><span class="results__departure-date">${flight.departureDate}</span> >  <span class="results__return-date">${flight.returnDate}</span></p>
    </div>`;

    // Insert results into UI
    document.querySelector('.results__header').insertAdjacentHTML('afterend', searchResultTemplate);
}



const checkForPreviousFlights = function () {

    if (localStorage.getItem('flightInformation')) {
        
        // Save previous flight searches, but only the last 3 searches
        let previousFlightSearches = JSON.parse(localStorage.getItem('flightInformation')).slice(-3);

        previousFlightSearches.forEach(flight => {
            
            displayFlightInfo(flight);

        });

        // Show the Recent searches section
        document.querySelector('.results').classList.remove('hidden');
        
    }

};



const showLoader = function (e) {

    // Detect which button was clicked in order to make the changes necessary to show the loader
    let clickedButton = e.target;
    
    clickedButton.setAttribute('style', 'width: 85%');

    // Delay the appeareance of the loader a bit to avoid it being showed over the button
    setTimeout(() => {
        clickedButton.nextElementSibling.setAttribute('style', 'display: inline-block');
    }, '200')

}



const reloadPage = function () {

    setTimeout(() => {
        window.location.reload();
    }, '1500')

};



document.querySelector('.btn--submit').addEventListener('click', function(e) {

    e.preventDefault();

    // Pass the event to detect the button in order to show the loader
    showLoader(e);
    
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
    reloadPage();

});



// Delete stored searches on request
document.querySelector('.btn--clear').addEventListener('click', function(e) {


    // Pass the event to detect the button in order to show the loader
    showLoader(e);

    localStorage.clear();

    // Reload page after deleting
    reloadPage();

});

document.addEventListener('DOMContentLoaded', checkDarkMode());
document.addEventListener('DOMContentLoaded', checkForPreviousFlights());