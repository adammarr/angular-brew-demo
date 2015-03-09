(function() {
    'use strict';

    angular
        .module('brewE2E', [
        	'ngMockE2E',
            'brew.core'
        ]);

    angular.module('brewE2E').run(runApp);

    function runApp($httpBackend, breweryData) {

    	$httpBackend.whenGET('/api/breweries').respond(breweryData.getBreweries());

    	$httpBackend.whenPOST('/api/contactus').respond(function(method, url, data) {
    		var json = angular.fromJson(data);
    		return (json.city === 'Error') ? [412, {error: 'Some Error'}, {}] : [200, {success: 'success'}, {}];
    	});

    	$httpBackend.whenGET(/\s*.html$/).passThrough();

    }
})();