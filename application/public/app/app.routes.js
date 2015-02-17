angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider

		// route for the home page
		.when('/',                      { templateUrl : 'app/views/pages/home.html' })

		.when('/login',                 {templateUrl : 'app/views/pages/login.html',           controller  : 'mainController',         controllerAs: 'login'})
		
		.when('/users',                 {templateUrl: 'app/views/pages/users/all.html',        controller: 'userController',           controllerAs: 'user'})
		.when('/users/create',          {templateUrl: 'app/views/pages/users/single.html',     controller: 'userCreateController',     controllerAs: 'user'})
		.when('/users/:user_id',        {templateUrl: 'app/views/pages/users/single.html',     controller: 'userEditController',       controllerAs: 'user'})

		.when('/searches/mine',        {templateUrl: 'app/views/searches-list.html',           controller: 'searchController',         controllerAs: 'search'})
		.when('/searches/all',         {templateUrl: 'app/views/search-list.html',             controller: 'searchController',         controllerAs: 'search'})
		.when('/searches/create',      {templateUrl: 'app/views/pages/searches/single.html',   controller: 'searchCreateController',   controllerAs: 'search'})
		.when('/searches/:search_id',  {templateUrl: 'app/views/pages/searches/single.html',   controller: 'searchEditController',     controllerAs: 'search'})

		.when('/test',                 {templateUrl: 'app/views/test.html',                    controller: 'testController',           controllerAs: 'test'})

		.when('/chat',                 {templateUrl: 'app/views/chat.html',                    controller: 'chatController',           controllerAs: 'chat'})
        .when('/vote',                 {templateUrl: 'app/views/vote.html',                    controller: 'voteController',           controllerAs: 'vote'});

		$locationProvider.html5Mode(true);

});
