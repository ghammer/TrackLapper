///<reference path="/js/wl.js"/>

(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        init: function() { WinJS.Namespace.define("home", {
            splitList: new WinJS.Binding.List(),

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

            boogieButton.onclick = function () {

                TrackLapperClient.getTable("Lappers").insert({ userId: home.user.id, firstname: home.user.first_name, lastname: home.user.last_name })

                WinJS.Navigation.navigate("/pages/page2/page2.html")
            };
        }
    });
})();
