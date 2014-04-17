// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/Page2/page2.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        init: function () {
        },

        ready: function (element, options) {
            // TODO: Initialize the page here.
            var time = 0;
            var currentTime = 0;
            var running = 0;
            var TOLsplit = 0;
            var splitTime = 0;
            var splitOutput = '';
            var hours = Math.floor(time / 10 / 60 / 60);
            var mins = Math.floor(time / 10 / 60);
            var secs = Math.floor(time / 10 % 60);
            var tenths = time % 10;

            //start timer and gps
            startPause.onclick = function startPause() {
                if (running == 0) {
                    startTracking();
                    running = 1;
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
                running = 0;
                time = 0
                //changes inner html to "Start" from "Resume"
                document.getElementById("startPause").innerHTML = "Start";
                //resets output box to "00:00:00:00"
                document.getElementById("output").innerHTML = "00:00:00:00";
                //resets output box to "00:00:00:00"
                document.getElementById("outputSplit").innerHTML = "00:00:00:00";
            }

            split.onclick = function split() {

                splitTime = currentTime - TOLsplit;

                TOLsplit = currentTime;

                var splitOutput = splitTime.toString();

                for (var i = 0; i < splitOutput.length; i++) {
                    splitOutput[i + 1] = splitOutput.split(":");
                }
                //for (var i = splitTime.toString.length; i < 6; i++) {
                //    splitTime = "0" + splitTime.toString;

                //}

                //console.log(splitTime);

                //splitOutput = splitTime.substr(0, 1) + ':' + splitTime.substr(2, 3) + ':' + splitTime.substr(4, 5);

                //hours = Math.floor(TOLsplit / 10 / 60 / 60);
                //mins = Math.floor(TOLsplit / 10 / 60);
                //secs = Math.floor(TOLsplit / 10 % 60);
                //tenths = TOLsplit % 10;

                //document.getElementById("outputSplit").innerHTML = "0" + hours + ":" + mins + ":" + secs + ":" + "0" + tenths;


                document.getElementById("outputSplit").innerHTML = splitOutput;
            }

            function increment() {
                if (running == 1) {
                    setTimeout(function () {
                        time++;
                        hours = Math.floor(time / 10 / 60 / 60);
                        mins = Math.floor(time / 10 / 60);
                        secs = Math.floor(time / 10 % 60);
                        tenths = time % 10;

                        if (hours >= 60000) {
                            hours = "0" + hours;
                        }
                        if (mins < 10) {
                            mins = "0" + mins;
                        }
                        if (secs < 10) {
                            secs = "0" + secs;
                        }

                        document.getElementById("output").innerHTML = hours + ":" + mins + ":" + secs + ":" + "0" + tenths;
                        currentTime = hours + mins + secs + "0" + tenths;
                        console.log(currentTime);
                        increment();
                        
                    }, 100);
                }
            }

            var geolocator = null;

            function getStatusStr(status) {
                switch (status) {
                    case Windows.Devices.Geolocation.PositionStatus.ready:
                        return "Ready";
                        break;
                    case Windows.Devices.Geolocation.PositionStatus.initializing:
                        return "Initializing";
                        break;
                    case Windows.Devices.Geolocation.PositionStatus.noData:
                        return "noData";
                        break;
                    case Windows.Devices.Geolocation.PositionStatus.disabled:
                        return "disabled";
                        break;
                    case Windows.Devices.Geolocation.PositionStatus.notInitialized:
                        return "notInitialized";
                        break;
                    case Windows.Devices.Geolocation.PositionStatus.notAvailable:
                        return "notAvailable";
                        break;
                    default:
                        break;
                }
            }

            function startTracking() {
                if (geolocator == null) {
                    geolocator = new Windows.Devices.Geolocation.Geolocator();
                }
                if (geolocator != null) {
                    geolocator.addEventListener("currentPosition", onPositionChanged);
                    geolocator.addEventListener("statuschanged", onStatusChanged);
                }
            }

            function stoptracking() {
                if (geolocator != null) {
                    geolocator.removeEventListener("currentPosition", onPositionChanged);
                }
                document.getElementById("startingLocation").innerHTML = "waiting for update...";
                document.getElementById("status").innerHTML = "waiting for update...";
            }

            function onPositionChanged(args) {
                var position = args.position;
                //use the position ifnormation (lat/lon/accuracy) to do some work
                document.getElementById("startingLocation").innerHTML = position.coordinate.latitude + "," + position.coordinate.longitude;
                document.getElementById("status").innerHTML =
                        getStatusStr(geolocator.locationStatus);
            }

            // Handle change in status to display an appropriate message.        
            function onStatusChanged(args) {
                var status = args.status;
                //handle the new status
            }

            function init() {
                document.getElementById("startingLocation").innerHTML = "waiting for update...";
                document.getElementById("status").innerHTML ="waiting for update...";
            }            
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });
})();
