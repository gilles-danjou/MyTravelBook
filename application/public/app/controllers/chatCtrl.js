
angular.module('chatCtrl', [])

.controller('chatController', ['$scope', function($scope) {
    var vm = this;


    //    var socket = io();
    //
    //    updatePageTitle('Chat with other travellers');
    //
    //vm.send = function() {
    //    socket.emit('chat message', $('#m').val());
    //    $('#m').val('');
    //}



     var host = location.origin;
     vm.socket = io.connect(host);

    vm.votes = [];

    vm.voteFor = function(choice){
        vm.socket.emit('vote', {vote : choice })
    }

    vm.socket.on('votes', function(msg){
        vm.votes = msg.votes;
        $scope.$apply();
    });


}])



.controller('voteController', ['$scope', function($scope) {
    var vm = this;

    var host = location.origin;
    vm.socket = io.connect(host);
    vm.votes = [];

    vm.voteFor = function(choice){ vm.socket.emit('vote', {vote : choice }) }

    vm.socket.on('votes', function(msg){
        vm.votes = msg.votes;
        $scope.$apply();
    });
}]);


