$(document).ready(function () {

    $(".welcome-content").hide();
    $(".welcome-image").hide();
    $(".userTargetModalContainer").hide();

    $("#js-listviewthead-WPQ2").parent().css(
        { "table-layout": "fixed" });

    $("#js-listviewthead-WPQ3").parent().css(
        { "table-layout": "fixed" });

    $("#js-listviewthead-WPQ1").parent().css(
        { "table-layout": "fixed" });

    /* 
        var userSourceId = $("#userSource").val().split(";")[0];  
    */
    $("input[name='userSource']").pickSPUser(
        {
            onPickUser: function (personObj) {
                $("#userSource").next().find(".pt-pickSPUser-input").hide();                
            },
            onRemoveUser: function ($input, $ui, personObj) {
                $("#userSource").next().find(".pt-pickSPUser-input").show();                                                
            },
            filterSuggestions: function (suggestions) {
                var newSuggestions = [];
                var prevEmail = null;
                $.each(suggestions, function (i, userInfo) {
                    if (prevEmail === userInfo.email) return true;
                    prevEmail = userInfo.email;
                    newSuggestions.push(userInfo);
                });
                return newSuggestions;
            }
        }
    );

    var currentUser = $().SPServices.SPGetCurrentUser();

    $().SPServices({
        operation: "GetGroupCollectionFromUser",
        userLoginName: currentUser,
        async: true,
        completefunc: function (xData, Status) {
            if ($(xData.responseXML).find("Group[Name='" + "SuperSupportOwner" + "']").length == 1) {
                $(".userTargetModalContainer").show();
                $("input[name='userTarget']").pickSPUser(
                    {
                        onPickUser: function (personObj) {
                            $("#userTarget").next().find(".pt-pickSPUser-input").hide();
                        },
                        onRemoveUser: function ($input, $ui, personObj) {
                            $("#userTarget").next().find(".pt-pickSPUser-input").show();
                        },
                        filterSuggestions: function (suggestions) {
                            var newSuggestions = [];
                            var prevEmail = null;
                            $.each(suggestions, function (i, userInfo) {
                                if (prevEmail === userInfo.email) return true;
                                prevEmail = userInfo.email;
                                newSuggestions.push(userInfo);
                            });
                            return newSuggestions;
                        }
                    }
                );
            }
        }
    });
});

function removeItem(itemId, listId) {
    $.ajax({
        url: "/support/_api/web/lists(guid'" + listId + "')/items(" + itemId + ")",
        type: "POST",
        contentType: "application/json;odata=verbose",
        async: true,
        headers: {
            "ACCEPT": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "DELETE"
        },

        success: function (sender, args) {
            console.log("hello remove item");
        },
        error: onError
    });
}

function addItem(listId, itemData) {
    $.ajax({
        url: "/support/_api/web/lists(guid'" + listId + "')/items",
        type: "POST",
        contentType: "application/json;odata=verbose",
        async: true,
        data: JSON.stringify(itemData),
        headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (sender, args) {
            $("#loaderClaimOut").hide();
            location.reload();
        },
        error: onError
    });
}

function onQueryFailed(sender, args) {
    console.log("request failed " + args.get_message() + "\n" + args.get_stackTrace());
}

// Display error messages. 
function onError(error) {
    console.log(error);
    console.log(error.responseText);
}

function getQueryStringParameter(urlParameterKey) {
    var params = document.URL.split("?")[1].split("&");
    var strParams = "";
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == urlParameterKey)
            return decodeURIComponent(singleParam[1]);
    }
}
