// Flight object
interface flight { 
  departureLocation: string, 
  arrivalLocation: string, 
  departureDate: string, 
  returnDate: string 
};



// Change favicon according to theme
function checkDarkMode (): void {

  const favicon = document.querySelector<HTMLLinkElement>('link[type="image/svg+xml"]');

	// Check if dark theme is enabled, returns boolean
	let isDark: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;

	// If dark theme is enabled, then show the white favicon
	if (isDark && favicon) {
		favicon.href = 'favicon-white.svg';
	}
};



function showLoader (e: Event) {

  const loader = document.querySelector('.loader');

  // Detect which button was clicked in order to make the changes necessary to show the loader
  const clickedButton = e.target as HTMLButtonElement;

  if (clickedButton) {
    clickedButton.setAttribute('style', 'width: 85%');
  }
  
  // Delay the appeareance of the loader a bit to avoid it being showed over the button while it shortens its width
  if (loader != null) {
    setTimeout(() => {
        loader.setAttribute('style', 'display: inline-block');
    }, 200)
  }
};



function reloadPage () {

  setTimeout(() => {
      window.location.reload();
  }, 2000);

};



function checkForPreviousFlights () {

  let previousFlightSearches = localStorage.getItem('flightInformation');

  if (previousFlightSearches !== null) {
      
    // Return only the last 3 searches
    previousFlightSearches = JSON.parse(previousFlightSearches).slice(-3);

  }

  return previousFlightSearches;
};



function showPreviousFlights (flights): void {

  flights.forEach((flight: flight) => {
    document.querySelector('.results__header')!.insertAdjacentHTML('afterend', createFlightDataTemplate(flight));
  });

  document.querySelector('.results')!.classList.remove('hidden');
};



function createFlightDataTemplate (flightData: flight): string {

  // Create flight template to show in UI
  const flightDataTemplate = 
  `<div class="results__container">
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
};



function getFlightData (): flight {

  // Non-null assertion because we know these inputs exist
  let departureLocation = document.querySelector<HTMLSelectElement>('#departure')!.value;
  let arrivalLocation = document.querySelector<HTMLSelectElement>('#arrival')!.value;
  let departureDate = document.querySelector<HTMLSelectElement>('#departure-date')!.value;
  let returnDate = document.querySelector<HTMLSelectElement>('#return-date')!.value;


  // Define flight object that stores the flight data (locations, dates)
  const flightData: flight = {
    departureLocation: departureLocation,
    arrivalLocation: arrivalLocation,
    departureDate: departureDate,
    returnDate: returnDate
  };

  return flightData;
};



document.querySelector('.btn--submit')!.addEventListener('click', function(e) {

  e.preventDefault();

  // Pass the event to detect the button in order to show the loader
  showLoader(e);
  
  // Create flight information object that will store the flight search information
  let flightData = getFlightData();
  let flightInformation: {}[] = [];

  // Check if previous flight searches have been made, so that we will add to them instead of overwrite them
  if (checkForPreviousFlights() !== null) {
      
      // Save those previous searches as array
      let previousFlights = JSON.parse(localStorage.getItem('flightInformation'));
      
      /* We add the new search to it. I reference the index so that way only the object inside the array is added, and not the whole array. 
      This way I avoidadding unnecessary brackets to the string that will later be stored */
      previousFlights.push(flightData);
      
      localStorage.setItem('flightInformation', JSON.stringify(previousFlights));

  } else {

    flightInformation.push(flightData)

    // If no previous searches have been stored, just proceed with saving the current one
    localStorage.setItem('flightInformation', JSON.stringify(flightInformation));

  }

  // Reload page after submit
  reloadPage();

});



// Delete stored searches on request
document.querySelector('.btn--clear')!.addEventListener('click', function(e) {

  // Pass the event to detect the button in order to show the loader
  showLoader(e);

  localStorage.clear();

  // Reload page after deleting
  reloadPage();

});

document.addEventListener('DOMContentLoaded', checkDarkMode);
document.addEventListener('DOMContentLoaded', checkForPreviousFlights);