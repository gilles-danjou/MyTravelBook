angular.module('searchService', [])

.factory('Search', function($http) {
    var searchFactory = {};

	//searchFactory.get     = function(id)           { return $http.get     ('/api/searches/' + id);           };              // get a single search
	searchFactory.all     = function()                 { return $http.get     ('/api/searches/' );               };              // get all searchs
	searchFactory.create  = function(searchData)       { return $http.post    ('/api/searches/', searchData);      };              // create a search
	//searchFactory.update  = function(id, searchData) { return $http.put     ('/api/searches/' + id, searchData); };              // update a search
	//searchFactory.delete  = function(id)           { return $http.delete  ('/api/searches/' + id);           };              // delete a search


    return searchFactory;	                                                                                                // return our entire searchFactory object
});