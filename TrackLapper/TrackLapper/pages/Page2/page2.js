(function () {
    "use strict";

    var activation = Windows.ApplicationModel.Activation;
    var app = WinJS.Application;

    WinJS.UI.Pages.define("/pages/Page2/page2.html", {

        ready: function (element, options) {
            var time = 0;
            var currentTime = 0;
            var running = 0;
            var TOLsplit = 0;
            var splitTime = 0;

            // Add an event handler to the button.
            startPause.addEventListener("click",
                getLoc);


            //start timer and gps
            startPause.onclick = function startPause() {
                if (running == 0) {
                    running = 1;
                    console.log(running)
                    increment();
                    //change button inner html to "Pause" from "Start"
                    document.getElementById("startPause").innerHTML = "Pause";
                }

                else {
                    running = 0;
                    document.getElementById("startPause").innerHTML = "Resume";
                }
            }

            reset.onclick = function reset() {
                    //set running and time to 0
                    running = 0;
                    time = 0;

                    //changes inner html to "Start" from "Resume"
                    startPause.innerHTML = "Start";
                    //resets output box to "00:00:00:00"
                    output.innerHTML = "00:00:00";
                    //resets output box to "00:00:00:00"
                    outputSplit.innerHTML = "00:00:00";
            }

            split.onclick = function split() {

                splitTime = currentTime - TOLsplit;

                TOLsplit = currentTime;

                var mins = Math.floor(splitTime / 10 / 60);
                var secs = Math.floor(splitTime / 10 % 60);
                var tenths = splitTime % 100;

                if (mins < 10) {
                    mins = "0" + mins;
                }

                if (secs < 10) {
                    secs = "0" + secs;
                }

                var split = outputSplit.innerHTML = mins + ":" + secs + ":" + tenths;
                TrackLapper.splitList.push(split)
            }

            function increment() {
                if (running == 1) {
                    setTimeout(function () {
                        time++;

                        var mins = Math.floor(time / 10 / 60);
                        var secs = Math.floor(time / 10 % 60);
                        var tenths = time % 10;

                        if (mins < 10) {
                            mins = "0" + mins;
                        }

                        if (secs < 10) {
                            secs = "0" + secs;
                        }

                        document.getElementById("output").innerHTML = mins + ":" + secs + ":" + "0" + tenths;
                        currentTime = mins + secs + tenths;
                        console.log(currentTime);
                        increment();
                    }, 100);
                }
            }
        }
    });

    var loc = null;

    function getLoc() {
        if (loc == null) {
            loc = new Windows.Devices.Geolocation.Geolocator();
        }
        if (loc != null) {
            loc.getGeopositionAsync().then(getPositionHandler, errorHandler);
        }
    }

    function getPositionHandler(pos) {
        startingLocation.innerHTML = pos.coordinate.point.position.latitude + "," + pos.coordinate.point.position.longitude;
        accuracy.innerHTML = pos.coordinate.accuracy + " meter(s)";
        geolocatorStatus.innerHTML = getStatusString(loc.locationStatus);
    }

    function onPositionChanged(args) {
        currentPosition.innerHTML = pos.coordinate.latitude + "," + pos.coordinate.longitude;

    }

    function errorHandler(e) {
        derrormsg.innerHTML = e.message;
        // Display an appropriate error message based on the location status.
        geolocatorStatus.innerHTML =
            getStatusString(loc.locationStatus);
    }

    function getStatusString(locStatus) {
        switch (locStatus) {
            case Windows.Devices.Geolocation.PositionStatus.ready:
                // Location data is available
                return "Location is available.";
                break;
            case Windows.Devices.Geolocation.PositionStatus.initializing:
                // This status indicates that a GPS is still acquiring a fix
                return "A GPS device is still initializing.";
                break;
            case Windows.Devices.Geolocation.PositionStatus.noData:
                // No location data is currently available 
                return "Data from location services is currently unavailable.";
                break;
            case Windows.Devices.Geolocation.PositionStatus.disabled:
                // The app doesn't have permission to access location,
                // either because location has been turned off.
                return "Your location is currently turned off. " +
                    "Change your settings through the Settings charm " +
                    " to turn it back on.";
                break;
            case Windows.Devices.Geolocation.PositionStatus.notInitialized:
                // This status indicates that the app has not yet requested
                // location data by calling GetGeolocationAsync() or 
                // registering an event handler for the positionChanged event. 
                return "Location status is not initialized because " +
                    "the app has not requested location data.";
                break;
            case Windows.Devices.Geolocation.PositionStatus.notAvailable:
                // Location is not available on this version of Windows
                return "You do not have the required location services " +
                    "present on your system.";
                break;
            default:
                break;
        }
    }
})();
