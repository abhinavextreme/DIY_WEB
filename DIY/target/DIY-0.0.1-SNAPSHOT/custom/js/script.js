/**
 * Created by SumitJangir on 6/5/16.
 */


(function (window, document, angular, undefined) {

    var localStorage = new (function (ls, enc, dec) {
        var isbase64Available = enc ? true : false;
        this.add = function (key, val) {
            try {
                ls[key] = isbase64Available ? enc(val) : val;
            } catch (err) {
                console.log(err);
                ls[key] = val;
            }

            return ls[key];
        };
        this.remove = function (key) {
            if (ls[key])
                delete ls[key];
            return ls[key];
        };
        this.get = function (key) {
            try {
                return isbase64Available ? dec(ls[key]) : ls[key];
            } catch (err) {
                //console.log(err);
                return ls[key];
            }

        };
    })(window.localStorage, window.btoa, window.atob);

    var pageLoader = function () {
        this.start = function () {
            document.querySelector('.main-page-load').style.display = "block";
        };
        this.stop = function () {
            document.querySelector('.main-page-load').style.display = "none";
        };
        this.isStarted = function () {
            var res = document.querySelector('.main-page-load').style.display;
            return (res != "none") ? true : false;
        };
    };

    function EventManager() {
        var events = {};
        var cache = {};
        this.get = function (key) {
            return cache[key];
        };
        this.set = function (key, value) {
            if (cache[key] != value) {
                var old = cache[key];
                cache[key] = value;
                if (events[key])
                    events[key](value, old);
            }

            //console.log("cache set ",cache);
            //console.log("event cache set ",events);
        };
        this.remove = function (key) {
            delete cache[key];
            // console.log("cache cache remove ",cache);
            //console.log("event cache remove ",events);
        };
        this.on = function (key, value) {
            events[key] = value;
            //console.log("cache event on ",cache);
            //console.log("events event on ",events);
        };
        this.off = function (key) {
            delete events[key];
            //console.log("cache event off ",cache);
            //console.log("events event off ",events);
        };
        this.call = function (key) {
            //console.log("events call",events);
            if (events[key]) {
                events[key](arguments);
            }

            //console.log("cache event call ",cache);
            //console.log("events event call ",events);
        };
    };

    function noDblDigitFormat(n) {
        return n > 9 ? "" + n : "0" + n;
    }

    window.sInstances = {
        EventManager: EventManager,
        pageLoader: pageLoader,
        noDblDigitFormat: noDblDigitFormat,
        localStorage: localStorage,
        origin: window.location.origin
    }

})(window, window.document, window.angular);