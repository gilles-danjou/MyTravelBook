
angular.module('searchCtrl', ['searchService'])

.controller('searchController', function(Search) {
    var vm = this;
    vm.processing = true;

    Search.all().success(function(data) {
        vm.processing = false;
        vm.searches = data;
    });
});

