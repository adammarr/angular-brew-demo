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

    angular.module('brew.core').config(configure);
	angular.module('brew.core').run(runApp);

    angular.module('brew.core').constant('toastr', toastr);

	/*@ngInject*/
	function configure($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, toastr) {
		
		$urlRouterProvider.otherwise('/ajs/home');

		$stateProvider
			.state('home', {
      			url: '/ajs/home',
      			templateUrl: 'app/js/core/views/home.view.html',
      			controller: 'HomeCtrl as home',
      			resolve: {
      				breweries: /*@ngInject*/ function(BreweryService) {
      					return BreweryService.search();
      				}
      			}
    		})
    		.state('about', {
      			url: '/ajs/about',
      			templateUrl: 'app/js/core/views/about.view.html',
      			controller: 'HomeCtrl as home',
      			onEnter: /*@ngInject*/ function() {
  					
      			}
    		})
    		.state('contact', {
      			url: '/ajs/contact',
      			templateUrl: 'app/js/core/views/contact.view.html',
      			controller: 'ContactCtrl as contact',
      			onEnter: /*@ngInject*/ function() {
  					
      			}
    		})
    		.state('unknown', {
      			url: '/ajs/unknown',
      			templateUrl: 'app/js/core/views/unknown.view.html',
      			controller: 'HomeCtrl as home'
    		});
		
		$locationProvider.html5Mode(true);
		//$httpProvider.interceptors.push('authInterceptor');

		toastr.options.closeButton = true;
		toastr.options.positionClass = 'toast-bottom-right';
	}

	//Although $state is not used below, it cannot be removed, as injecting it here kickstarts the ui-router
	/*@ngInject*/
	function runApp($rootScope, $state) {
	}
})();