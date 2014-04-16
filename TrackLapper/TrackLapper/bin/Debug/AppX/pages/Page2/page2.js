// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/Page2/page2.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            var time = 0;
            var running = 0;

            //start timer and gps
            startPause.onclick = function startPause() {
                if (running == 0) {
                    getLocation();
                    running = 1;
                    increment();
                    //change button inner html to "Pause" from "Start"
                    document.getElementById("startPause").innerHTML = "Pause";
                    //supposed to take the split time once they come back to the position they started from
                    if (getLocation == getLocation & running > 1) {
                        split();
                    }
                }

                else {
                    running = 0;
                    //clearWatch(); //stops watchPosition() method
                    document.getElementById("startPause").innerHTML = "Resume";
                }
            }

            reset.onclick = function reset() {
                running = 0;
                time = 0
                //changes inner html to "Start" from "Resume"
                document.getElementById("startPause").innerHTML = "Start";
                //resets output box to "00:00:00"
                document.getElementById("output").innerHTML = "00:00:00";
                //resets output box to "00:00:00"
                document.getElementById("outputSplit").innerHTML = "00:00:00";
            }

            split.onclick = function split() {
                var hours = Math.floor(time / 10 / 60 / 60);
                var mins = Math.floor(time / 10 / 60);
                var secs = Math.floor(time / 10 % 60);
                var tenths = time % 10;
                //output box display of splits
                document.getElementById("outputSplit").innerHTML = mins + ":" + secs + ":" + "0" + tenths;
            }

            function increment() {
                if (running == 1) {
                    setTimeout(function () {
                        time++;
                        var hours = Math.floor(time / 10 / 60 / 60);
                        var mins = Math.floor(time / 10 / 60);
                        var secs = Math.floor(time / 10 % 60);
                        var tenths = time % 10;

                        if (time >= 60000) {
                            time = 0;
                        }
                        if (mins < 10) {
                            mins = "0" + mins;
                        }
                        if (secs < 10) {
                            secs = "0" + secs;
                        }

                        document.getElementById("output").innerHTML = mins + ":" + secs + ":" + "0" + tenths;
                        increment();
                    }, 100);
                }
            }

            //function getLocation() {
            //    //var startingLocation = document.getElementById("startPause")
            //    //var currentPosition = document.getElementById("startPause")
            //    //if there is a gps signal
            //    if (navigator.geolocation) {
            //        //get current posotion of the device
            //        navigator.geolocation.getCurrentPosition(showPosition)
            //        var startingLocation = navigator.geolocation.getCurrentPosition(showPosition)
            //        //continue getting the position
            //        var currentPosition = navigator.geolocation.watchPosition(showPosition);
            //        navigator.geolocation.watchPosition(showPosition)
            //        document.getElementById("startingLocation").innerHTML = startingLocation;
            //        document.getElementById("currentPosition").innerHTML = currentPosition

            //    }
            //    else {
            //        startingLocation.innerHTML = "Geolocation is not supported on this platform."
            //        currentPosition.innerHTML = "Geolocation is not supported on this platform.";
            //    }
            //    function showPosition(position) {
            //        startingLocation.innerHTML = "Latitude: " + position.coords.latitude +
            //            "<br>Longitude: " + position.coords.longitude;
            //        currentPosition.innerHTML = position.coords.latitude + "<br>" + position.coords.longitude;
            //    }
            //}
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
