(function() {
    'use strict';

    angular
        .module('brew.core')
        .controller('HomeCtrl', HomeCtrl);

    /* @ngInject */
    function HomeCtrl(BreweryService) {
        /*jshint validthis: true */
        var vm = this;

        vm.breweries = [];
        vm.cities = [];
        vm.cityFilter = null;

        vm.setCityFilter = setCityFilter;
        vm.removeBrewery = removeBrewery;

        activate();

        ///////////////////////////

        function setCityFilter(city) {
        	vm.cityFilter = (city) ? { address: { city: city }} : null;
        }

        function removeBrewery(id) {
        	BreweryService.removeBrewery(id);
        }

        //////PRIVATE//////////////

        /*
            Separate out private functions from functions and data attached to the controller instance
            to aid in readability and maintainability.
         */
        
        function activate() {
        	vm.breweries = BreweryService.getBreweries();
        	vm.cities = BreweryService.getCities();
        }
    }
})();