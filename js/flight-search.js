"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForPreviousFlights = exports.textName = void 0;
let textName = "Nico";
exports.textName = textName;
function checkForPreviousFlights() {
    if (localStorage.getItem('flightInformation')) {
        // Save only the last 3 searches
        let previousFlightSearches = JSON.parse(localStorage.getItem('flightInformation')).slice(-3);
        previousFlightSearches.forEach(flight => {
            displayFlightInfo(flight);
        });
        // Show the Recent searches section
        document.querySelector('.results').classList.remove('hidden');
    }
}
exports.checkForPreviousFlights = checkForPreviousFlights;
;
