angular.module('mainCtrl', [])

    .controller('mainController',  function($rootScope, $location, Auth, growl) {

        var vm = this;
        vm.loggedIn = Auth.isLoggedIn();                                                                                	// get info if a person is logged in

        $rootScope.$on('$routeChangeStart', function() {                                                                    // check to see if a user is logged in on every request
            vm.loggedIn = Auth.isLoggedIn();
            Auth.getUser().then(function(data) { vm.user = data.data; });                                                   // get user information on page load
        });

        vm.doLogin = function() {                                                                                           // function to handle login form
            vm.processing = true;
            vm.error = '';
            Auth.login(vm.loginData.username, vm.loginData.password).success(function(data) {
                vm.processing = false;
                if (data.success) $location.path('/users');	                                                			// if a user successfully logs in, redirect to users page
                else vm.error = data.message
            });
        };

        vm.doLogout = function() { Auth.logout(); $location.path('/login'); };                                              // function to handle logging out

        vm.basicUsage = function (type) {
            var config = {};
            switch (type) {
                case "success":
                    growl.success("<b>I'm</b> a success message", config);
                    break;
                case "info":
                    growl.info("I'm an info message", config);
                    break;
                case "warning":
                    growl.warning("I'm the warning message", config);
                    break;
                default:
                    growl.error("Ups, error message here!", config);
            }
        };

    });