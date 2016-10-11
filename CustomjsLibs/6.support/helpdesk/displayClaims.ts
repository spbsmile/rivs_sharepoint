/** show table claims, invoke when page load */
function displayClaims() {
    displayTableWithClaim("#panelSendClaims", "#tbodySendClaims", settings().btnNewClaim, claimSended);
    displayTableWithClaim("#panelResolvedClaims", "#tbodyResolvedClaims", settings().btnResolvedClaim, claimResolved);
}

/**  */
function displayTableWithClaim(panelId, tableId, buttonHtml, arrayClaim) {
    for (let index = 0; index < arrayClaim.length; index++) {
        let claim = arrayClaim[index];
        let rowIndex = index + 1;

        // filter on current month
        let claimMonth = claim.typeTable === TableClaims.Resolved ? parseInt(moment(claim.data.Date).format('M')) : parseInt(moment(claim.data.Created).format('M'));
        if (parseInt(moment().format('M')) !== claimMonth) {
            continue;
        }

        $(panelId).show();
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

/** for each row of table add button */
function assignCallbackClaimButton(listId, buttonHtml, rowIndex, data, typeTable, newId) {
    // todo temp
    if (typeTable === TableClaims.Accepted) return;
    let button = $(buttonHtml);
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