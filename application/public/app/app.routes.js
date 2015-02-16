angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider

		// route for the home page
		.when('/', { templateUrl : 'app/views/pages/home.html' })

        // login page
		.when('/login', {templateUrl : 'app/views/pages/login.html', controller  : 'mainController', controllerAs: 'login'})
		
		// show all users
		.when('/users', {templateUrl: 'app/views/pages/users/all.html', controller: 'userController', controllerAs: 'user'})

		// form to create a new user same view as edit page
		.when('/users/create', {templateUrl: 'app/views/pages/users/single.html', controller: 'userCreateController', controllerAs: 'user'})

		// page to edit a user
		.when('/users/:user_id', {templateUrl: 'app/views/pages/users/single.html', controller: 'userEditController', controllerAs: 'user'})

        // search pages
        .when('/searches/mine',        {templateUrl: 'app/views/searches-list.html',            controller: 'searchController',         controllerAs: 'search'})
        .when('/searches/all',        {templateUrl: 'app/views/search-list.html',            controller: 'searchController',         controllerAs: 'search'})
        .when('/searches/create',      {templateUrl: 'app/views/pages/searches/single.html',   controller: 'searchCreateController',   controllerAs: 'search'})
        .when('/searches/:search_id',  {templateUrl: 'app/views/pages/searches/single.html',   controller: 'searchEditController',     controllerAs: 'search'})
        .when('/test',                 {templateUrl: 'app/views/test.html',                    controller: 'testController',           controllerAs: 'test'});


        $locationProvider.html5Mode(true);

});
