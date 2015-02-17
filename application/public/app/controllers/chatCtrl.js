


angular.module('chatCtrl', [])

.controller('chatController', ['$scope', function($scope) {
    var vm = this;

    //var host = location.origin;
    //vm.socket = io.connect(host);

    updatePageTitle('Chat with other travellers');

    vm.send = function() {
        socket.emit('chat message', $('#chatInput').val());
        $('#chatInput').val('');
    }

    socket.on('chat message', function(msg){

        $('#chatMessages').append($('<li>').text(msg));
    });



}])

.controller('voteController', ['$scope', function($scope) {
    var vm = this;

    vm.votes = [
            { choice: 1, label: 'VanillaJS', votes: 0 },
            { choice: 2, label: 'AngularJS', votes: 0 },
            { choice: 3, label: 'BackboneJS', votes: 0 },
            { choice: 4, label: 'EmberJS', votes: 0 }
        ];

    socket.emit('votes')

    updatePageTitle('Vote for your favorites');

    vm.voteFor = function(choice){ socket.emit('vote', {vote : choice }) }

    socket.on('votes', function(msg){
        vm.votes = msg.votes;
        $scope.$apply();
    });
}]);


