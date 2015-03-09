(function() {
    'use strict';

    angular
        .module('brew.core')
        .directive('brTopNav', brTopNav);

    /* @ngInject */
    function brTopNav () {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            templateUrl: 'app/js/core/directives/brTopNav.html'
        };

        return directive;

        function link(scope, element, attrs) {
        }
    }
})();