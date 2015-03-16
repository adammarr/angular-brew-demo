(function() {
    'use strict';

    angular
        .module('brew.core')
        .factory('BreweryService', BreweryService);

    /* @ngInject */
    function BreweryService(Breweries, $q, toastr) {
        var service = {
            search: search,
            find: find,
            getBreweries: getBreweries,
            getCities: getCities,
            removeBrewery: removeBrewery,
            update: update
        };

        //in most browsers variables must be defined prior to the return statement
        var breweries;

        return service;

        ////////////////

        function search() {
            //use $q to create a deferment and promise, since we need to use the
            //promise from the Model to set data within the service.
        	var defer = $q.defer();
            toastr.info('Brewery.search()');
        	Breweries.query().$promise.then(function(response) {
	        		breweries = response;
	        		defer.resolve(response);
	        	}, function(response) {
	        		breweries = null;
	        		defer.reject(response);
	        	});
        	return defer.promise;
        }

        function find(_id) {
            toastr.info('Brewery.find(' + _id + ')');
            return Breweries.get({ id: _id }).$promise;
        }

        function getBreweries() {
        	return breweries;
        }

        function getCities() {
        	var cities = [];
        	angular.forEach(breweries, function(value, idx) {
        		if(cities.indexOf(value.address.city) === -1) {
                    cities.push(value.address.city);
                }
        	});
        	return cities;
        }

        function removeBrewery(_id) {
            toastr.info('Brewery.removeBrewery(' + _id + ')');
        	var removeIdx;
        	angular.forEach(breweries, function(value, idx) {
        		if(value._id === _id) {
        			removeIdx = idx;
        		}
        	});
        	if(removeIdx || removeIdx === 0) {
        		breweries.splice(removeIdx, 1);
        	}
            return Breweries.delete({ id: _id }).$promise;
        }

        function update(brewery) {
            toastr.info('Brewery.update(' + brewery._id + ')');
            angular.forEach(breweries, function(value, idx) {
                if(value._id === brewery._id) {
                    breweries[idx] = brewery;
                }
            });
            return Breweries.update(brewery).$promise;
        }
    }
})();