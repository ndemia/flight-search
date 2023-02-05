 let textName = "Nico";

 function checkForPreviousFlights (): void {

  if (localStorage.getItem('flightInformation')) {
      
      // Save only the last 3 searches
      let previousFlightSearches = JSON.parse(localStorage.getItem('flightInformation')).slice(-3);

      previousFlightSearches.forEach(flight => {
          
          displayFlightInfo(flight);

      });

      // Show the Recent searches section
      document.querySelector('.results').classList.remove('hidden');
      
  }

};

export { textName, checkForPreviousFlights };