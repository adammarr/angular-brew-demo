(function() {
    'use strict';

    angular
        .module('brew.admin', [
            'brew.core'
        ]);
    /*
    	Since we depend on brew.core, this module will get all of brew.core's services, models, filters, and directives
    	as well as access to brew.core's module dependencies, such as ngResource, ngMaterial, etc.
     */

    angular.module('brew.admin').config(configure);

	/*@ngInject*/
	function configure($stateProvider, toastr) {

		toastr.info('brew.admin configure');

		/*
			Below is an example of child routing. The '.' in the state name automatically tells
			ui-router that this is a child of 'adminbrew'. You can also use the 'parent' parameter
			to define a route as a child. When a child route is called, the parent will also be created,
			if it has not been already, and the child template will be injected into a ui-view on
			the parent. Child routes inherit resolve and 'data' dependencies from the parent. A child
			URL is the parent URL + child URL. So the actual adminbrew.edit URL below is /ajs/adminbrew/:id
		 */

		$stateProvider
			.state('adminbrew', {
      			url: '/ajs/adminbrew',
      			templateUrl: 'app/js/admin/views/admin.view.html',
      			controller: 'AdminCtrl as admin',
      			resolve: {
      				breweries: /*@ngInject*/ function(BreweryService) {
      					return BreweryService.search();
      				}
      			}
    		})
    		.state('adminbrew.edit', {
      			url: '/:id',
      			templateUrl: 'app/js/admin/views/edit.view.html',
      			controller: 'EditCtrl as edit',
      			resolve: {
      				brewery: /*@ngInject*/ function(BreweryService, $stateParams) {
      					return BreweryService.find($stateParams.id);
      				}
      			}
    		});
    }
})();