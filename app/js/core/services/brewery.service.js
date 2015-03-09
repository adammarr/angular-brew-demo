(function() {
    'use strict';

    angular
        .module('brew.core')
        .factory('BreweryService', BreweryService);

    /* @ngInject */
    function BreweryService(Breweries, $q) {
        var service = {
            search: search,
            getBreweries: getBreweries,
            getCities: getCities,
            removeBrewery: removeBrewery
        };

        var breweries;

        return service;

        ////////////////

        function search() {
        	var defer = $q.defer();
        	Breweries.query().$promise.then(function(response) {
	        		breweries = response;
	        		defer.resolve(response);
	        	}, function(response) {
	        		breweries = null;
	        		defer.reject(response);
	        	});
        	return defer.promise;
        }

        function getBreweries() {
        	return breweries;
        }

        function getCities() {
        	var cities = [];
        	angular.forEach(breweries, function(value, idx) {
        		(cities.indexOf(value.address.city) === -1) && cities.push(value.address.city);
        	});
        	return cities;
        }

        function removeBrewery(id) {
        	var removeIdx;
        	angular.forEach(breweries, function(value, idx) {
        		if(value._id === id) {
        			removeIdx = idx;
        		}
        	});
        	if(removeIdx || removeIdx === 0) {
        		breweries.splice(removeIdx, 1);
        	}
        }
    }
})();