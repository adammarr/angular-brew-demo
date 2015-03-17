(function() {
    'use strict';

    angular
        .module('brew.core')
        .directive('brTopNav', brTopNav);

    /*
        Directive names should be prefaced with a 2 or 3 character prefix, unique to either
        the application or company. In this case, the directive uses "br" for "brewery".
        Avoid using angular prefixes like "ng" or other common third party prefixs, like "ui".
        This lets people easily see that a custom directive is being used in the markup.
     */

    /* @ngInject */
    function brTopNav () {
        // Usage:
        //  <br-top-nav></br-top-nav>
        // Creates:
        //  The top toolbar and nav element for the main pages
        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            templateUrl: 'app/js/core/directives/brTopNav.html'
        };

        return directive;

        function link(scope, element, attrs) {
            /*
                Link is called before the controller, but after "compile". Link is where
                you can attach data to scope, and modify the compiled DOM template. With
                the exception of the compile function, this should be the ONLY place in
                the code where direct DOM access and manipulation can occur. The controller,
                not defined here, is where callbacks and logic should reside.
             */
        }
    }
})();