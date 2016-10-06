function sendClaim(itemData, messageReport) {
    $("#modalSendClaim").modal();
    $.ajax({
        url: "/support/_api/web/lists(guid'" + settings().listIdNewClaims + "')/items",
        type: "POST",
        contentType: "application/json;odata=verbose",
        data: JSON.stringify(itemData),
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            reportClaimOperation(messageReport);
            if (!$("#panelSendClaims").is(":visible")) {
                fetchClaimsCurrentUser(settings().listIdNewClaims, "Author", settings().listFieldsNewClaimsTable, claimSended, TableClaims.New, settings().statusClaim[0], settings().tooltipBtnNewClaim, function () {
                    displayTableWithClaim("#panelSendClaims", "#tbodySendClaims", settings().btnNewClaim, claimSended);
                });
            }
            else {
                var claim = {};
                var claimData = {};
                claimData.Discription = $("#discription").val();
                claimData.urgently = $("#urgentlyValue").val();
                claimData.category = $("#category option:selected").text();
                claimData.Created = moment();
                claimData.ID = data.d.ID;
                // todo refactor this
                if (fileName) {
                    var temp = {};
                    temp.Title = fileName;
                    claimData.AttachFileNew = temp;
                }
                claim.data = claimData;
                claim.listId = settings().listIdNewClaims;
                claim.typeTable = TableClaims.New;
                claim.statusClaim = settings().statusClaim[0];
                claim.tooltip = settings().tooltipBtnNewClaim;
                claimSended.unshift(claim);
                $("#tbodySendClaims").empty();
                displayTableWithClaim("#panelSendClaims", "#tbodySendClaims", settings().btnNewClaim, claimSended);
            }
        },
        error: function (data) {
            reportClaimOperation("Ошибка отправки: " + data.toString());
            onError(data);
        }
    });
}
/** write data of claim when it's send */
function getItemData(urgently, category, discription, fileId, comment) {
    var item = {
        "__metadata": {
            "type": "SP.Data.ListListItem",
            "Discription": "",
            "urgently": "",
            "category": "",
            "AttachFileNew": "",
            "IP": "",
            "MachineName": ""
        },
        "Discription": comment + discription,
        "urgently": urgently,
        "category": category,
        "AttachFileNewId": fileId,
        "IP": clientIp,
        "MachineName": clientMachineName
    };
    return item;
}
//# sourceMappingURL=sendClaims.js.map