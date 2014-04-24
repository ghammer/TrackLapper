(function () {
    "use strict";


    WinJS.UI.Pages.define("/pages/home/home.html", {
        init: function() { WinJS.Namespace.define("home", {
            splitList: new WinJS.Binding.List(),

            loc: null,

            getLoc: function () {
                if (home.loc == null) {
                    home.loc = new Windows.Devices.Geolocation.Geolocator();
                }
                if (home.loc != null) {
                    home.loc.getGeopositionAsync().then(home.getPositionHandler, home.errorHandler);
            }
        },

        getPositionHandler: function(pos) {
            startingLocation.innerHTML = pos.coordinate.point.position.latitude + "," + pos.coordinate.point.position.longitude;
            accuracy.innerHTML = pos.coordinate.accuracy + " meter(s)";
            geolocatorStatus.innerHTML = home.getStatusString(home.loc.locationStatus);
    },

            onPositionChanged: function(args) {
                currentPosition.innerHTML = pos.coordinate.latitude + "," + pos.coordinate.longitude;

    },

            errorHandler: function(e) {
                derrormsg.innerHTML = e.message;
                // Display an appropriate error message based on the location status.
                geolocatorStatus.innerHTML = home.getStatusString(loc.locationStatus);
    },

            getStatusString: function (locStatus) {
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
    },

            user: {},
        })
 
        },
        ready: function (element, options) {
            WL.init({
                client_id: "000000004C1147F6",
                redirect_url: "https://tracklapper.azure-mobile.net/",
                scope: "wl.signin",
                response_type: "token"
            });
            WL.login({
                scope: ["wl.signin", "wl.basic"]
            }).then(function (session) {
                WL.api({
                    path: "me",
                    methond: "GET"
                }).then(function (response) {
                    home.user = response;
                    greeting.innerHTML = "Hello, " + home.user.first_name + "!";
                    document.getElementById("infoArea").innerText =
                        "Hello, " + response.first_name + " " +
                        response.last_name + "!";
                },

                    function (responseFailed) {
                        document.getElementById("infoArea").innerText =
                            "Error calling API: " + responseFailed.error.message;
                    }
                );
            },
                function (responseFailed) {
                    document.getElementById("infoArea").innerText =
                        "Error signing in: " + responseFailed.error_description;
                }
            );

            // Event handler for the startPause button to getLoc
            boogieButton.addEventListener("click",
                home.getLoc);

            boogieButton.onclick = function () {

                TrackLapperClient.getTable("Lappers").where({ userId: home.user.id }).read().then(function (results) {
                    if (results[0] == null || results[0] == undefined) {
                        TrackLapperClient.getTable("Lappers").insert({ userId: home.user.id, firstname: home.user.first_name, lastname: home.user.last_name })
                    }
                });

                WinJS.Navigation.navigate("/pages/page2/page2.html")
            };
        }
    });
})();
