/**
 * Created by Krzysztof Wasiak on 13/03/2016.
 */

(function() {

    "use strict";

    angular.module(TjaziApplicationName)
        .controller("HomeViewController",
        ["$state", homeViewController]);

    function homeViewController($state) {
        console.log($state);

        $state.go(States.chatview.name, {
            chatroomUuid : "sampleUuid"});
    }

}());