/* global toastr:false, moment:false */
(function() {
    'use strict';

    angular
        .module('brew.core', [
            'ngResource',
            'ngAnimate',
            'ngMessages',
            'ngAria',
            'ngMaterial',
            'ui.router',
            'ngMockE2E'
        ]);
    /* REMOVE ngMockE2E when not using mocked backend */

    angular.module('brew.core').config(configure);
	angular.module('brew.core').run(runApp);

    //allow javascript libraries to be injected, instead of using them as globals
    angular.module('brew.core').constant('toastr', toastr);

	/*@ngInject*/
	function configure($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $mdThemingProvider, toastr) {

        /*
            Angular config functions run before services are created. And as such, services cannot be injected into them,
            only the service providers. This section is used then to configure the service provider's configuration and
            behavior for use when the services are themselves created.
         */
		
		$urlRouterProvider.otherwise('/ajs/home');

		$stateProvider
			.state('home', {
      			url: '/ajs/home',
      			templateUrl: 'app/js/core/views/home.view.html',
      			controller: 'HomeCtrl as home',
      			resolve: {
      				breweries: /*@ngInject*/ function(BreweryService) {
                        /*
                            Resolves are run before the controller is instantiated. They can then be injected into the
                            controller with the name of the map key, in this case 'breweries'. This helps prevent
                            the controller and view from loading without the data it needs to display properly, generally
                            from http calls. Resolve functions should return a promise that resolves with the data to
                            populate the map key with.
                         */
      					return BreweryService.search();
      				}
      			}
    		})
    		.state('about', {
      			url: '/ajs/about',
      			templateUrl: 'app/js/core/views/about.view.html',
      			controller: 'HomeCtrl as home',
      			onEnter: /*@ngInject*/ function() {
  					//onEnter can be used to set things like page titles
      			}
    		})
    		.state('contact', {
      			url: '/ajs/contact',
      			templateUrl: 'app/js/core/views/contact.view.html',
      			controller: 'ContactCtrl as contact'
    		})
    		.state('unknown', {
      			url: '/ajs/unknown',
      			templateUrl: 'app/js/core/views/unknown.view.html',
      			controller: 'HomeCtrl as home'
    		});
		
        //use normal looking URL paths instead of hashbang mode '#'
		$locationProvider.html5Mode(true);

        $mdThemingProvider.theme('docs-dark', 'default').primaryPalette('yellow').dark();

		toastr.options.closeButton = true;
		toastr.options.positionClass = 'toast-bottom-right';
	}

	//Although $state is not used below, it cannot be removed, as injecting it here kickstarts the ui-router
	/*@ngInject*/
	function runApp($rootScope, $state) {
        /*
            Functionality to perform when the application first loads, after the configuration occurs. When using ui-router,
            it is a good idea to inject $state here, as it forces the ui-router state to instantiate immediatly, and allows
            routing to work properly. This is not needed when using the built-in (default) angular router.
         */
	}
})();