/**
 * Created by Krzysztof Wasiak on 12/03/2016.
 */

(function() {

    "use strict";

    angular.module(TjaziApplicationName)
        .controller("ChatViewController",
        ["$scope", "$stateParams",
        chatViewController]);

    function chatViewController($scope, $stateParams) {

        /* jshint validthis: true */
        var vm = this;

        vm.textBoxMessageText = "";
        vm.allReceivedMessages = [];
        vm.chatroomName = "";
        vm.currentUserName = "";
        vm.webSocketClient = null;

        /**
         * Input event handlers
         */
        vm.onSubmitMessageClick = sendMessage;
        vm.onKeyUp = handleKeyboardOnNewMessage;

        $stateParams.chatroomUuid = "sampleTestChatroomUuid";

        connectViaWebSocket();

        /**
         * functions
         */
        function connectViaWebSocket() {
            vm.webSocketClient = new WebSocketClient($stateParams.chatroomUuid);
            vm.webSocketClient.connectViaWebSocket(
                function connectCallback() {
                    console.log("Connected to web socket!");
                },
                function newMessageCallback(messageObject) {
                    renderNewMessage(messageObject);
                }
            );
        }

        function handleKeyboardOnNewMessage(eventData) {
            if (eventData.keyCode == 13 && !eventData.shiftKey) {
                sendMessage();
            }
        }

        function renderNewMessage(messageObject) {
            console.log("Rendering message: " + messageObject);

            vm.allReceivedMessages.push(
                {
                    "sender": messageObject.senderUserName,
                    "messageText": messageObject.messageText
                }
            );

            // update binding
            $scope.$apply();
        }

        function sendMessage() {
            var messageText = vm.textBoxMessageText;

            console.log("Sending message: " + vm);

            if (messageText !== "") {
                vm.webSocketClient.sendMessageViaWebSocket(messageText);

                console.log("Sending message: " + messageText);

                vm.textBoxMessageText = "";
            }
        }

    }

}());
