document.querySelector('.form').addEventListener('submit', function(e) {

    e.preventDefault();

    let departureLocation = document.querySelector('#departure').value;
    let arrivalLocation = document.querySelector('#arrival').value;
    let departureDate = document.querySelector('#departure-date').value;
    let returnDate = document.querySelector('#return-date').value;

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
    
    // Get data
    const testData = JSON.parse(localStorage.getItem('flightInformation'));


});