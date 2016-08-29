function sendClaim(itemData, messageReport) {
    $("#modalSendClaim").modal();
    console.log("hello modal");
    $.ajax({
        url: "http://intranet/support/" + "_api/web/lists(guid'" + settings().listIdNewClaims + "')/items",
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
                fetchClaimsCurrentUser(settings().listIdNewClaims, "Author", settings().listFieldsNewClaimsTable, claimSended, TableClaims.New, settings().statusClaim[0], settings().tooltipBtnNewClaim,
                    function () {
                        displayTableWithClaim("#panelSendClaims", "#tbodySendClaims", settings().btnNewClaim, claimSended)
                    });
            } else {
                var id = data.d.ID;
                var claim = {};
                var data = {};

                data.Discription = $("#discription").val();
                data.urgently = $("#urgentlyValue").val();
                data.category = $("#category option:selected").text();
                data.Created = moment();
                data.ID = id;

                // todo refactor this
                if (fileName) {
                    var temp = {};
                    temp.Title = fileName;
                    data.AttachFileNew = temp;
                }

                claim.data = data;
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

function getItemData(urgently, category, discription, fileId, comment) {
    console.log(fileId + " getItemData");
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
