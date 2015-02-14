angular.module('userApp', ['ngAnimate',
    'angular-growl',
    'app.routes', 'authService', 'mainCtrl',
    'userCtrl', 'userService',
    'searchCtrl', 'searchService',
    'testCtrl', 'testService'
])

.config(function($httpProvider) {                                                                                       // application configuration to integrate token into requests
	$httpProvider.interceptors.push('AuthInterceptor');                                                                    // attach our auth interceptor to the http requests
})

.config(['growlProvider', function (growlProvider) {
    growlProvider.globalTimeToLive(3000);
}]);
