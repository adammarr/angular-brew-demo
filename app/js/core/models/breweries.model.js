(function() {
    'use strict';

    angular
        .module('brew.core')
        .factory('Breweries', Breweries);

    /* @ngInject */
    function Breweries($resource) {
        var service = $resource('/api/breweries/:id', { id : '@id' }, {
        	update: {
        		method: 'PUT'
        	}
        });

        return service;
    }
})();