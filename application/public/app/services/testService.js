angular.module('testService', [])

.factory('Test', function($http) {
    var testFactory = {};

	testFactory.all       = function()             { return $http.get     ('/api/test/');           };
	//testFactory.all     = function()             { return $http.get     ('/api/tests/' );               };
	//testFactory.create  = function(testData)     { return $http.post    ('/api/tests/', testData);      };
	//testFactory.update  = function(id, testData) { return $http.put     ('/api/tests/' + id, testData); };
	//testFactory.delete  = function(id)           { return $http.delete  ('/api/tests/' + id);           };

    return testFactory;
});