function recallClaim(rowId, itemId) {    
    removeRow(rowId, "#panelSendClaims", "#tableSend");
    $("#modalSendClaim").modal();    
    $.ajax({
        url: "/support/_api/web/lists(guid'" + settings().listIdNewClaims + "')/items(" + itemId + ")",
        type: "POST",
        headers: {
            "ACCEPT": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "DELETE"
        },
        success: function () {            
            reportClaimOperation("Заявка Закрыта!");            
        },
        error: function (data) {
            reportClaimOperation("Техническая ошибка удаления заявки: " + "<br/>" + data.toString());
            onError(data);
        }
    });
}
