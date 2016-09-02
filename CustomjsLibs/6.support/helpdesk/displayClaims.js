function displayClaims() {
    displayTableWithClaim("#panelSendClaims", "#tbodySendClaims", settings().btnNewClaim, claimSended);
    displayTableWithClaim("#panelResolvedClaims", "#tbodyResolvedClaims", settings().btnResolvedClaim, claimResolved);
}

function displayTableWithClaim(panelId, tableId, buttonHtml, arrayClaim) {
    if (arrayClaim.length > 0) $(panelId).show();
    for (var index = 0; index < arrayClaim.length; index++) {
        var claim = arrayClaim[index];
        var rowIndex = index + 1;        
        appendRow(tableId, rowIndex, claim.data, claim.typeTable, claim.statusClaim, claim.listId, claim.tooltip);
        assignCallbackClaimButton(claim.listId, buttonHtml, rowIndex, claim.data, claim.typeTable, claim.data.ID);
    }
    // todo refactor this
    fileName = "";
}

function appendRow(tableId, rowIndex, r, typeTable, statusClaim, listId, tooltip) {
    $(tableId).append("<tr id=\"" + "row" + rowIndex + "\">" +
        "<td>" + rowIndex + "</td>" +
        "<td>" + (typeTable === TableClaims.Resolved ? r.Time + " " + r.Date : typeTable === TableClaims.Accepted ? r.TimeCreate + " " + r.DateCreate : moment(r.Created).format("HH:mm") + " " + moment(r.Created).format("L")) + "</td>" +
        "<td>" + r.Discription + "</td>" +
        "<td>" + (typeTable === TableClaims.Accepted ? r.Priority : r.urgently) + "</td>" +
        "<td>" + (typeTable === TableClaims.Accepted ? r.Category : r.category) + "</td>" +
        "<td>" + ((r.AttachFileNew === undefined || r.AttachFileNew["Title"] === undefined) ? "  " : r.AttachFileNew["Title"]) + "</td>" +
        "<td>" + statusClaim + "</td>" +
        "<td>" + (typeTable === TableClaims.New ? " " : r.Author.Title) + "</td>" +        
        "<td id=\"buttoncell" + rowIndex + listId + "\" class=\"hint--bottom-left hint--info\" data-hint=\"" + tooltip + "\"</td>" +
        "</tr>");
}

function assignCallbackClaimButton(listId, buttonHtml, rowIndex, data, typeTable, newId) {
    // todo temp
    if (typeTable === TableClaims.Accepted) return;
    var button = $(buttonHtml);
    button.click((function (rowSelectorId, data) {
        return function () {
            if (typeTable === TableClaims.New) {
                recallClaim(rowSelectorId, newId);
            }
            else {
                reopenClaim(rowSelectorId, getItemData(data.urgently, data.category, data.Discription, null, "Дополнение к описанию: Переоткрытие Заявки"));
            }
        };
    })("row" + rowIndex, data));
    button.appendTo("#buttoncell" + rowIndex + listId);
}
 // <td id="buttoncell${rowIndex}${listId}" class="hint--bottom-left hint--info" data-hint="${tooltipText}"</td>