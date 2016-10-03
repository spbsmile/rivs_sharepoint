function fetchClaimsCurrentUser(listId, fieldAuthor, fields, arrayClaim, typeTable, statusClaim, tooltip, callback) {
    var url = "/support/_api/web/lists(guid'" + listId + "')/items?&$select=" + "AttachFileNew/Title," + fieldAuthor + fields + "&$expand=" + "Author,AttachFileNew," + fieldAuthor +
    "&$filter=" + fieldAuthor + "/Id eq " + currentUserId;
    // &$filter=(" + fieldAuthor + "/Id eq " + currentUserId) and month(SpDateTime) eq 6"; 
    $.ajax({
        url: url,
        type: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            var results = data.d.results;
            for (var i = 0; i < results.length; i++) {
                var claim = {};
                claim.data = results[i];
                claim.listId = listId;
                claim.typeTable = typeTable;
                claim.statusClaim = statusClaim;
                claim.tooltip = tooltip;                
                arrayClaim.unshift(claim);
            }         
            if (typeof callback === 'function' && callback) {                
                callback();
            }
        },
        error: onQueryFailed
    });
}