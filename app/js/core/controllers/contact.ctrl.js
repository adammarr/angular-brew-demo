(function() {
    'use strict';

    angular
        .module('brew.core')
        .controller('ContactCtrl', ContactCtrl);

    /* @ngInject */
    function ContactCtrl($http, $timeout, $scope) {
        /*jshint validthis: true */
        var vm = this;

        vm.input = {};
        vm.message = null;
        vm.send = send;

        activate();

        ///////////////////////////

        function send() {
        	$http.post('/api/contactus', vm.input).success(function() {
        		vm.input = {};
        		$scope.contactForm.$setPristine();
        		vm.message = 'Successfully submitted the contact form.';
        		$timeout(function() {
        			vm.message = null;
        		}, 5000)
        	}).error(function(response, status) {
        		vm.message = 'Error: error posting message: ' + status;
        	});
        }

        //////////PRIVATE//////////

        function activate() {
        }
    }
})();