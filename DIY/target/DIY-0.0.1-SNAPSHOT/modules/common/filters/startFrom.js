(function (window, document, $, angular) {

    var commonApp = angular.module('commonApp');
    commonApp.filter('startFrom', function () {
        return function (input, start) {
            if (input) {
                start = +start;
                return input.slice(start);
            }
            return [];
        };
    });

    /*function createPredicateFn(expression, comparator, anyPropertyKey, matchAgainstAnyProp) {
     var shouldMatchPrimitives = typeof(expression)=="object" && (anyPropertyKey in expression);
     var predicateFn;

     if (comparator === true) {
     comparator = equals;
     } else if (!(typeof(comparator)=="function")) {
     comparator = function(actual, expected) {
     if (actual==undefined) {
     // No substring matching against `undefined`
     return false;
     }
     if ((actual === null) || (expected === null)) {
     // No substring matching against `null`; only match against `null`
     return actual === expected;
     }
     if (typeof(expected)=="object" || (typeof(actual)=="object")) {
     // Should not compare primitives against objects, unless they have custom `toString` method
     return false;
     }

     actual = ('' + actual).toLowerCase();
     expected = ('' + expected).toLowerCase();
     return actual.indexOf(expected) !== -1;
     };
     }

     predicateFn = function(item) {
     if (shouldMatchPrimitives && !isObject(item)) {
     return deepCompare(item, expression[anyPropertyKey], comparator, anyPropertyKey, false);
     }
     return deepCompare(item, expression, comparator, anyPropertyKey, matchAgainstAnyProp);
     };

     return predicateFn;
     }

     function deepCompare(actual, expected, comparator, anyPropertyKey, matchAgainstAnyProp, dontMatchWholeObject) {
     var actualType = getTypeForFilter(actual);
     var expectedType = getTypeForFilter(expected);

     if ((expectedType === 'string') && (expected.charAt(0) === '!')) {
     return !deepCompare(actual, expected.substring(1), comparator, anyPropertyKey, matchAgainstAnyProp);
     } else if (Array.isArray(actual)) {
     // In case `actual` is an array, consider it a match
     // if ANY of it's items matches `expected`
     return actual.some(function(item) {
     return deepCompare(item, expected, comparator, anyPropertyKey, matchAgainstAnyProp);
     });
     }

     switch (actualType) {
     case 'object':
     var key;
     if (matchAgainstAnyProp) {
     for (key in actual) {
     if ((key.charAt(0) !== '$') && deepCompare(actual[key], expected, comparator, anyPropertyKey, true)) {
     return true;
     }
     }
     return dontMatchWholeObject ? false : deepCompare(actual, expected, comparator, anyPropertyKey, false);
     } else if (expectedType === 'object') {
     for (key in expected) {
     var expectedVal = expected[key];
     if (isFunction(expectedVal) || isUndefined(expectedVal)) {
     continue;
     }

     var matchAnyProperty = key === anyPropertyKey;
     var actualVal = matchAnyProperty ? actual : actual[key];
     if (!deepCompare(actualVal, expectedVal, comparator, anyPropertyKey, matchAnyProperty, matchAnyProperty)) {
     return false;
     }
     }
     return true;
     } else {
     return comparator(actual, expected);
     }
     case 'function':
     return false;
     default:
     return comparator(actual, expected);
     }
     }

     // Used for easily differentiating between `null` and actual `object`
     function getTypeForFilter(val) {
     return (val === null) ? 'null' : typeof val;
     }
     commonApp.filter('vfilter',function filterFilter() {
     return function(array, expression, comparator, anyPropertyKey) {


     anyPropertyKey = anyPropertyKey || '$';
     var expressionType = getTypeForFilter(expression);
     var predicateFn;
     var matchAgainstAnyProp;

     switch (expressionType) {
     case 'function':
     predicateFn = expression;
     break;
     case 'boolean':
     case 'null':
     case 'number':
     case 'string':
     matchAgainstAnyProp = true;
     // falls through
     case 'object':
     predicateFn = createPredicateFn(expression, comparator, anyPropertyKey, matchAgainstAnyProp);
     break;
     default:
     return array;
     }

     return Array.prototype.filter.call(array, predicateFn);
     };
     });*/

})(window, window.document, window.jQuery, window.angular);


