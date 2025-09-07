
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;

    // Use a reverse geocoding API (OpenCage, Mapbox, Google Maps, etc.)
    // Below is an example using OpenStreetMap's Nominatim:
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const address = data.address.town || data.display_name;
            document.getElementById("locationInput").value = address;
            console.log(address);
            return address;
        })
        .catch(error => {
            console.error("Error fetching location:", error);
            alert("Failed to get address.");
        });
}

// const loc = showPosition();
// console.log(loc);
// showPosition();

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}