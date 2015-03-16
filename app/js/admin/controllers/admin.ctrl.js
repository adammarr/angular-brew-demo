(function() {
    'use strict';

    angular
        .module('brew.admin')
        .controller('AdminCtrl', AdminCtrl);

    /* @ngInject */
    function AdminCtrl(BreweryService, toastr) {
        /*jshint validthis: true */
        var vm = this;

        vm.breweries = [];
        vm.filter = null;

        activate();

        //////PRIVATE//////////////

        function activate() {
        	vm.breweries = BreweryService.getBreweries();
        }
    }
})();