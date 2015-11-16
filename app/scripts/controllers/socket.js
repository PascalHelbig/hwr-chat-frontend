'use strict';
angular.module('hwrChatApp')

//Here LoopBackAuth service must be provided as argument for authenticating the user
  .factory('socket', function(userService, $q){
    return $q(function(resolve, reject) {
      //Creating connection with server
      userService.isLoaded().then(function () {
        var socket = io.connect('http://localhost:3000');
        resolve(socket);
        var id = userService.token;
        var userId = userService.me().id;
        socket.on('connect', function () {
          socket.emit('authentication', {id: id, userId: userId});
          socket.on('authenticated', function () {
            // use the socket as usual
            console.log('User is authenticated');
          });
        });
      });
    });
  });
