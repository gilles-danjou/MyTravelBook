angular.module('userApp', ['ngAnimate', 'app.routes', 'authService', 'mainCtrl', 'userCtrl', 'userService', 'searchCtrl', 'searchService' ])

.config(function($httpProvider) {                                                                                       // application configuration to integrate token into requests
	$httpProvider.interceptors.push('AuthInterceptor');                                                                    // attach our auth interceptor to the http requests
});