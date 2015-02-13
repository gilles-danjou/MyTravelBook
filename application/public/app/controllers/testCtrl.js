angular.module('testCtrl', ['testService'])


.controller('testController', ['$scope', 'Test', function($scope, Test) {
	var vm = this;
	vm.processing = true;

    Test.all().success(function(data) {
        vm.result = data;
        vm.processing = false;
        //$('#note').append(data);
    });


}]);