///<reference path="/js/wl.js"/>

(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        init: function() { WinJS.Namespace.define("TrackLapper", {
            splitList: new WinJS.Binding.List(),
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
                }).then (function(response) {
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
            log_in_btn.onclick = function() {
                WinJS.Navigation.navigate("/pages/page2/page2.html")
            };
        }
    });
})();
