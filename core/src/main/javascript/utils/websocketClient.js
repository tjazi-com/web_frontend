/**
 * Created by Krzysztof Wasiak on 12/03/2016.
 */

/*jshint unused:false*/
var WebSocketClient = function(topic) {

    "use strict";

    var _connectViaWebSocket = null;
    var _sendMessageViaWebSocket = null;
    var _disconnectWebSocket = null;

    if (!topic) {
        console.error("Topic is null or empty.");
    }

    else {
        var socketHost = window.configParams.socket_host;
        if (!socketHost) {
            log.error("Web socket host is not set");
            return;
        }

        // socket_host is set in index.html - via configuration parameters
        var endpointName = window.configParams.socket_host + "/messages";
        var targetTopic = topic;
        var stompClient = null;

        _connectViaWebSocket = function(connectCallback, messageReceiveCallback) {

            console.log("Connecting to websocket. Endpoint: " + endpointName);
            var socket = new SockJS(endpointName);
            stompClient = Stomp.over(socket);
            stompClient.connect({}, function connectionAck(frame) {
                console.log("websocketClient: " + frame);

                if (connectCallback !== null) {
                    connectCallback();
                }

                stompClient.subscribe('/topic/' + targetTopic, function(message) {

                    console.log("Got new message on topic: " + targetTopic);
                    console.log(message);

                    if (messageReceiveCallback !== null) {
                        var receivedMessageObject = JSON.parse(message.body);
                        messageReceiveCallback(receivedMessageObject);
                    }
                });
            }, function connectionError(errorFrame) {
                console.error(errorFrame);
            });
        };

        _sendMessageViaWebSocket = function(messageText) {

            if (!messageText) {
                console.error("Message is null or empty.");

                return;
            }

            if (stompClient === null) {
                console.error("stompClient is not initialized.");
            } else {
                stompClient.send("/app" + endpointName, {},
                    JSON.stringify({
                        "messageText": messageText,
                        "receiver": targetTopic,
                        "receiverType": "CHATROOM"
                    }));
            }
        };

        _disconnectWebSocket = function() {
            if (stompClient) {
                stompClient.disconnect();
                stompClient = null;

                console.log("Web socket disconnected");
            }
        };
    }

    return {
        connectViaWebSocket: _connectViaWebSocket,
        sendMessageViaWebSocket: _sendMessageViaWebSocket,
        disconnectWebSocket: _disconnectWebSocket
    };
};
