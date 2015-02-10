
angular.module('searchCtrl', ['searchService'])

.controller('searchController', ['$scope', 'Search', function($scope, Search) {
    var vm = this;
    vm.type = 'create';

    Search.all().success(function(data) {
        vm.processing = false;
        vm.searches = data;
    });

    Search.mine().success(function(data) {
        vm.processing = false;
        vm.mySearches = data;
    });

    vm.saveSearch = function() {
        vm.processing = true;
        vm.error = '';

        Search.create(vm.searchData).success(function(data) {
            
            vm.processing = false;
            vm.message = data.message;
            $scope.search.searches.push(vm.searchData);
        });
    };
}]);
