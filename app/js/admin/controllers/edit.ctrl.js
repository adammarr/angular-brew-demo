(function() {
    'use strict';

    angular
        .module('brew.admin')
        .controller('EditCtrl', EditCtrl);

    /* @ngInject */
    function EditCtrl($state, $mdDialog, BreweryService, brewery, toastr) {
        /*jshint validthis: true */
        var vm = this;

        vm.brewery = brewery;
        vm.save = save;
        vm.remove = remove;

        activate();

        toastr.info('Edit: ' + brewery.name);

        /////////////////////////
        
        function save() {
        	BreweryService.update(vm.brewery).then(function() {
        		$state.go('^'); //navigate back to the parent route
        	});
        }

        function remove(event) {
        	var confirm = $mdDialog.confirm()
      			.title('Are you sure you want to delete ' + vm.brewery.name + '?')
      			.ariaLabel('Confirm Delete')
      			.ok('Delete!')
      			.cancel('Cancel')
      			.targetEvent(event);
    		
    		$mdDialog.show(confirm).then(function() {
      			BreweryService.removeBrewery(vm.brewery._id);
      			$state.go('^'); //this navigates regardless of the removeBrewery call. Normally this should be wrapped in the remove resolve function
    		});
        }

        //////PRIVATE////////////

        function activate() {
        }
    }
})();