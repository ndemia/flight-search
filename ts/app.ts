import { flight } from './flight';

function checkForPreviousFlights(): boolean {
  let result = (localStorage.getItem('flightSearches') !== null) ? true : false;
  return result;
}

function showFlights(): void {
  if (checkForPreviousFlights() === true) {
    showPreviousFlights(getPreviousFlights());
  }
}

function getPreviousFlights(): [] {
  let previousFlightSearches = localStorage.getItem('flightSearches');
  let previousFlightSearchesArr: [] = [];
  if (previousFlightSearches !== null) {
    // Return only the last 3 searches
    previousFlightSearchesArr = JSON.parse(previousFlightSearches).slice(-3);
  }
  return previousFlightSearchesArr;
}

function showPreviousFlights(flights: []): void {
  flights.forEach((flight: flight) => {
    document.querySelector('.results__header')!.insertAdjacentHTML('afterend', createFlightDataTemplate(flight));
  });
  document.querySelector('.results')!.classList.remove('hidden');
}

function createFlightDataTemplate(flightData: flight): string {
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
}

function createFlightData(): flight {
  let departureLocation = document.querySelector<HTMLSelectElement>('#departure')!.value;
  let arrivalLocation = document.querySelector<HTMLSelectElement>('#arrival')!.value;
  let departureDate = document.querySelector<HTMLSelectElement>('#departure-date')!.value;
  let returnDate = document.querySelector<HTMLSelectElement>('#return-date')!.value;
  const flightData: flight = {
    departureLocation: departureLocation,
    arrivalLocation: arrivalLocation,
    departureDate: departureDate,
    returnDate: returnDate
  };
  return flightData;
}

// Change favicon according to theme
function checkDarkMode(): void {
  let favicon = document.querySelector<HTMLLinkElement>('link[type="image/svg+xml"]');
  let isDark: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (isDark && favicon) {
    favicon.href = 'favicon-white.svg';
  }
}

// function disableButtons(): void {
//   document.querySelectorAll('.btn').forEach((button) => {
//     button.classList.add('btn--disabled');
//     button.setAttribute('disabled', 'true');
//   });
// }

// function showLoader(e: Event): void {
//   let clickedButton = e.target as HTMLButtonElement;
//   let loader = clickedButton.nextElementSibling as HTMLSpanElement;
//   clickedButton.setAttribute('style', 'width: 85%');
//   // Delay the appeareance of the loader a bit to avoid it being showed over the button while it shortens its width
//   if (loader != null) {
//     setTimeout(() => {
//       loader.setAttribute('style', 'display: inline-block');
//     }, 200)
//   }
// }

function stopInteractions(e: Event): void {
  // Disable buttons
  document.querySelectorAll('.btn').forEach((button) => {
    button.classList.add('btn--disabled');
    button.setAttribute('disabled', 'true');
  });
  // Show loader
  let clickedButton = e.target as HTMLButtonElement;
  let loader = clickedButton.nextElementSibling as HTMLSpanElement;
  clickedButton.setAttribute('style', 'width: 85%');
  // Delay the appeareance of the loader a bit to avoid it being showed over the button while it shortens its width
  setTimeout(() => {
    loader.setAttribute('style', 'display: inline-block');
  }, 200)
}

function reloadPage(): void {
  setTimeout(() => {
    window.location.reload();
  }, 3000);
}

document.querySelector('.btn--submit')!.addEventListener('click', function (e: Event) {
  e.preventDefault();
  stopInteractions(e);
  let flightSearches: {}[] = [];
  let flightData = createFlightData();
  let previousFlights = checkForPreviousFlights();
  // Check if previous flight searches have been made, so that we will add to them instead of overwrite them
  if (previousFlights === true) {
    // Save those previous searches as array
    flightSearches = JSON.parse(localStorage.getItem('flightSearches')!);
    flightSearches.push(flightData);
    localStorage.setItem('flightSearches', JSON.stringify(flightSearches));
  } else {
    flightSearches.push(flightData);
    localStorage.setItem('flightSearches', JSON.stringify(flightSearches));
  }
  reloadPage();
});

// Delete stored searches on request
document.querySelector('.btn--clear')!.addEventListener('click', function (e: Event) {
  stopInteractions(e);
  localStorage.clear();
  reloadPage();
});

document.addEventListener('DOMContentLoaded', checkDarkMode);
document.addEventListener('DOMContentLoaded', showFlights);