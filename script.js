/*
    Assignment 4
    {Ravi Bharatbhai Sanghani}
*/

$(document).ready(function() {
    // your code here

    navigator.geolocation.getCurrentPosition((position) => {

        var lat2;
        var lon2;
        var firstLogin = true;
        debugger;
        if (localStorage.getItem("LAT1") != null) {
            lat2 = localStorage.getItem("LAT1");
            lon2 = localStorage.getItem("LON1");

            if (lat2 != position.coords.latitude && lon2 != position.coords.longitude) {
                $('.latitudeOld').eq(0).html("The Old latitude is: " + lat2);
                $('.longitudeOld').eq(0).html("The Old longitude is: " + lon2);


            } else {
                $('.latitudeOld').eq(0).html("The Old vales are same");

            }
            firstLogin = false;
            $('.storedLoc').eq(0).html("The Stored Location is: " + lat2 + ", " + lon2);
            $('.longitudeOld').eq(0).html("The Distance you travelled is: " + calcDistance(position.coords.latitude, position.coords.longitude, lat2, lon2));
        }

        if (firstLogin) {
            $('.noOldValues').eq(0).html("No Old Values Present");
            $('.welcome').eq(0).html("Welcome to the Place !!!");

        }

        localStorage.setItem("LAT1", position.coords.latitude);
        localStorage.setItem("LON1", position.coords.longitude);

        $('.latitude').eq(0).html("The latitude is: " + position.coords.latitude);
        $('.longitude').eq(0).html(`The longitude is: ${position.coords.longitude}`);


        history.pushState({ page_id: 1 }, "Testing", "index.html");

    }, () => {
        $('#error').text("Please allow to show your location");
    });





    // function to calculate the distance in metres between two lat/long pairs on Earth
    // Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
    // Aren't those cool variable names? Yah gotta love JavaScript


    function calcDistance(lat1, lon1, lat2, lon2) {

        var toRadians = function(num) {
            num * Math.PI / 180;
            console.log(num);
            return num;
        }
        var R = 6371000; // radius of Earth in metres
        var φ1 = toRadians(lat1);
        var φ2 = toRadians(lat2);
        var Δφ = toRadians(lat2 - lat1);
        var Δλ = toRadians(lon2 - lon1);

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var num1 = (R * c);

        console.log(num1);
        return num1;

    }
});