(function() {
    'use strict';

    angular
        .module('brewE2E', [
        	'ngMockE2E',
            'brew.core',
            'brew.admin'
        ]);

    angular.module('brewE2E').run(runApp);

    function runApp($httpBackend, breweryData) {

        /*
            Define and intercept all backend calls. This allows us to simulate a backend application
            while developing our front-end. As the backend API is fleshed out, calls can be converted
            to '.passThrough()' to call the actual backend service, until this module is no longer
            needed. Responses can either be straight object responses, or a function that can analyze
            the passed data, and then return an array in the format: [HTML_STATUS_CODE, DATA, HEADERS]
         */

    	$httpBackend.whenGET('/api/breweries').respond(breweryData.getBreweries());

        $httpBackend.whenGET(/^\/api\/breweries\//).respond(function(method, url) {
            return [200, breweryData.getBrewery(url.match(/^\/api\/breweries\/(.*)/)[1]), {}];
        });

    	$httpBackend.whenPOST('/api/contactus').respond(function(method, url, data) {
    		var json = angular.fromJson(data);
    		return (json.city === 'Error') ? [412, {error: 'Some Error'}, {}] : [200, {success: 'success'}, {}];
    	});

        $httpBackend.whenDELETE(/^\/api\/breweries\//).respond(function(method, url) {
            return [200, breweryData.removeBrewery(url.match(/^\/api\/breweries\/(.*)/)[1]), {}];
        });

        $httpBackend.whenPUT(/^\/api\/breweries\//).respond(function(method, url, body) {
            return [200, breweryData.updateBrewery(url.match(/^\/api\/breweries\/(.*)/)[1], body), {}];
        });

        //our view templates exist, so just pass the call to the browser
    	$httpBackend.whenGET(/\s*.html$/).passThrough();

    }
})();