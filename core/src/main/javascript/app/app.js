// location of the templates (views)
window.ViewsRoot = "views";
window.ViewsPublic = ViewsRoot + "/public";
window.ViewsSecure = ViewsRoot + "/secure";

// names of the templates (views)
window.States =
    {
        homeview: {
            name: "HomeView",
            url: "/",
            viewUrl: ViewsPublic + "/homeview.html",
            controllerName: "HomeViewController"
        },

        chatview: {
            name: "ChatView",
            url: "/chatview",
            viewUrl: ViewsSecure + "/chatview.html",
            controllerName: "ChatViewController"
        }
    };

window.TjaziApplicationName = "tjaziWebApp";

(function() {
    "use strict";

    var app = angular.module(
        TjaziApplicationName,
        ['ui.router']
    );

    app.config(["$stateProvider", "$urlRouterProvider", "$httpProvider",

        function($stateProvider, $urlRouterProvider, $httpProvider) {

            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state(States.homeview.name,  {
                    url: States.homeview.url,
                    templateUrl: States.homeview.viewUrl,
                    controller: States.homeview.controllerName + " as vm"
                })
                .state(States.chatview.name,  {
                    url: States.chatview.url,
                    templateUrl: States.chatview.viewUrl,
                    controller: States.chatview.controllerName + " as vm"
                });

            // make sure all requests will be decorated with the proper header
            $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

        }
    ]);
}());