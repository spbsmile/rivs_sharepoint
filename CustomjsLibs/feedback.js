var listId = "0c48a49e-84a0-48b7-aefd-190aa884a314";
var siteId = "http://devsp/";
var descriptionFieldName = "Description";

$(document).ready(function () {

    $("#btnfeedback").click(function () {
        $("#loaderfeedback").show();
        sendFeedback();
    });

    $("#pressbtnfeedback").click(function () {
        $("#resultfeedback").text(" ");
    });

    function sendFeedback() {
        var itemData = {
            "__metadata": {
                "type": "SP.Data.ListListItem",
                "Title": "",
                "Description": ""

            },
            "Title": $("#titlefeedback").val(),
            "Description": $("#bodyfeedback").val()
        };
        addItem(listId, itemData)
    }

    function addItem(listId, itemData) {
        $.ajax({
            url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists(guid'" + listId + "')/items",
            type: "POST",
            contentType: "application/json;odata=verbose",
            data: JSON.stringify(itemData),
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (sender, args) {
                $("#resultfeedback").text("Сообщение отправлено!");
                $("#loaderfeedback").hide();
            },
            error: onError
        });
    }

    // for execute csom
    function onQueryFailed(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    }

    // Display error messages.
    function onError(error) {
        $("#resultfeedback").val(error.responseText);
        console.log(error.responseText);
    }


});

