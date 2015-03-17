(function() {
    'use strict';

    angular
        .module('brew.core')
        .factory('Breweries', Breweries);

    /* @ngInject */
    function Breweries($resource) {
        //use $resource to simplify CRUD calls to properly defined REST APIs
        //only 'PUT' is missing from the initial object creation, so add it below
        var service = $resource('/api/breweries/:id', { id : '@_id' }, {
        	update: {
        		method: 'PUT'
        	}
        });

        return service;
    }
})();