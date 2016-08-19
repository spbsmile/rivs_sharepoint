var CC = window.CC || {};
CC.CORE = CC.CORE || {};

CC.CORE.IncreaseSearchResultsMax = (function () {
    "use strict";

    var $ocreate = null;
    var newMaxItems = 100;
    var oldMaxItems = 50; // web part must be set to show this many items

    // on application initialization 
    // steal the global create variable and 
    // intercept calls to create UI widgets.
    Sys.Application.add_init(function() {
        $ocreate = $create;
        $create = updateResultCountCreate;
    });

    // listen to UI widget calls for CBS & DP
    var updateResultCountCreate = function (a,b){
        var ps = Array.prototype.slice.call(arguments, 0);  
        if(a === Srch.ContentBySearch && b.numberOfItems === oldMaxItems) { 
            b.numberOfItems = newMaxItems;
        }
        if(a === Srch.DataProvider && b.resultsPerPage === oldMaxItems) {
            b.resultsPerPage = newMaxItems;
        }
        $ocreate.apply(this,ps);  // apply the original $create method that we stole
    };
    return true;
})();