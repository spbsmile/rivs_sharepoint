function sendClaim(itemData, messageReport) {
    $("#modalSendClaim").modal();		
    $.ajax({
        url: "http://intranet/support/" + "/_api/web/lists(guid'" + settings().listIdNewClaims + "')/items",
        type: "POST",
        contentType: "application/json;odata=verbose",
        data: JSON.stringify(itemData),
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
        },
        success: function (data) {            
            //var jsonObject = data;
            reportClaimOperation(messageReport);
            if (!$("#panelSendClaims").is(":visible")) {
                displayClaimsCurrentUser(settings().listIdNewClaims, "#panelSendClaims", "#tbodySendClaims", settings().btnNewClaim, TableClaims.New, "Author", settings().listFieldsNewClaimsTable, settings().tooltipBtnNewClaim, settings().statusClaim[0]);
            } else {
                //todo move to file "addRowToTableClaims"
                var rowIndex = 0;
                $("#tableSend tbody").prepend(
                    "<tr id=\"" + "row" + rowIndex + "\">" +
                    "<td>" + rowIndex + "</td>" +
                    "<td>" + moment().format("HH:mm") + " " + moment().format("L") + "</td>" +
                    "<td>" + $("#discription").val() + "</td>" +
                    "<td>" + $("#urgentlyValue").val() + "</td>" +
                    "<td>" + $("#category option:selected").text() + "</td>" +
                    "<td>" + fileName + "</td>" +
                    "<td>" + settings().statusClaim[0] + "</td>" +
                    "<td>" + " " + "</td>" +
                    "<td id=\"buttoncell" + rowIndex + settings().listIdNewClaims + "\" class=\"hint--bottom-left hint--info\" data-hint=\"" + settings().tooltipBtnNewClaim + "\"< /td>" +
                    "</tr>");
                assignCallbackClaimButton(settings().listIdNewClaims, settings().btnNewClaim, rowIndex, null, TableClaims.New, data.d.ID);
            }
        },
        error: function (data) {
            reportClaimOperation("Ошибка отправки: " + "<br/>" + data.toString());
            onError(data);
        }
    });
}

function getItemData(urgently, category, discription, fileId, comment) {
    var item = {
        "__metadata": {
            "type": "SP.Data.ListListItem",
            "Discription": "",
            "urgently": "",
            "category": "",
            "AttachFileNew": ""
        },
        "Discription": comment + discription,
        "urgently": urgently,
        "category": category,
        "AttachFileNewId": fileId
    };
    return item;
}
