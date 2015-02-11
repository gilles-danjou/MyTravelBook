angular.module('searchService', [])

.factory('Search', function($http) {
    var searchFactory = {};

	searchFactory.get     = function(id)                { return $http.get     ('/api1/searches/' + id);             };
	searchFactory.all     = function()                  { return $http.get     ('/api1/searches/');                 };
	searchFactory.mine     = function()                 { return $http.get     ('/api1/searches/mine');             };
	searchFactory.create  = function(searchData)        { return $http.post    ('/api1/searches/', searchData);      };
	searchFactory.update  = function(id, searchData)    { return $http.put     ('/api1/searches/' + id, searchData); };
	searchFactory.delete  = function(id)                { return $http.delete  ('/api1/searches/' + id);             };

    return searchFactory;
});
