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

            // Event handler for the startPause button
            startPause.addEventListener("click",
                home.getLoc);


            // Start timer and gps
            startPause.onclick = function startPause() {
                if (running == 0) {
                    running = 1;
                    console.log(running)
                    increment();
                    // Change button inner html to "Pause" from "Start"
                    document.getElementById("startPause").innerHTML = "Pause";
                }

                else {
                    running = 0;
                    document.getElementById("startPause").innerHTML = "Resume";
                }
            }

            reset.onclick = function reset() {
                    // Set running and time to 0
                    running = 0;
                    time = 0;

                    // Changes inner html to "Start" from "Resume"
                    startPause.innerHTML = "Start";
                    // Resets output box to "00:00:00:00"
                    output.innerHTML = "00:00:00";
                    // Resets output box to "00:00:00:00"
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
                home.splitList.push(split)
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
})();
