
angular.module('searchCtrl', ['searchService'])

.controller('searchController', function(Search) {
    var vm = this;
    vm.type = 'create';

    vm.saveSearch = function() {                                                                                           // function to handle login form
        vm.processing = true;
        vm.error = '';

        Search.create(vm.searchData).success(function(data) {
            vm.processing = false;
            vm.searchData = {};
            vm.message = data.message;
        });
    };
});
