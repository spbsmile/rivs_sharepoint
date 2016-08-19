function displayClaimsCurrentUser(listId, panelId, tableId, buttonHtml, typeTable, fieldAuthor, fields, tooltipText, statusClaim) {
    var url = "http://intranet/support" + "/_api/web/lists(guid'" + listId + "')/items?&$select=" + "AttachFileNew/Title," + fieldAuthor + fields + "&$expand=" + "Author,AttachFileNew," + fieldAuthor + "&$filter=" + fieldAuthor + "/Id eq " + currentUserId;
    $.ajax({
        url: url,
        type: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {                        
            var results = data.d.results;
            if (results.length > 0)
                $(panelId).show();

                console.log("hello" + panelId);
            for (var i = 0; i < results.length; i++) {
                var r = results[i];
                var rowIndex = i + 1;

                $(tableId).append("<tr id=\"" + "row" + rowIndex + "\">" +
                    "<td>" + rowIndex + "</td>" +
                    "<td>" + (typeTable === TableClaims.Resolved ? r.Time + " " + r.Date : typeTable === TableClaims.Accepted ? r.TimeCreate + " " + r.DateCreate : r.Created) + "</td>" +
                    "<td>" + r.Discription + "</td>" +
                    "<td>" + (typeTable === TableClaims.Accepted ? r.Priority : r.urgently) + "</td>" +
                    "<td>" + (typeTable === TableClaims.Accepted ? r.Category : r.category) + "</td>" +
                    "<td>" + ((r.AttachFileNew === undefined || r.AttachFileNew["Title"] === undefined) ? "  " : r.AttachFileNew["Title"]) + "</td>" +
                    "<td>" + statusClaim + "</td>" +
                    "<td>" + (typeTable === TableClaims.New ? " " : r.Author.Title) + "</td>" +
                    "<td id=\"buttoncell" + rowIndex + listId + "\" class=\"hint--bottom-left hint--info\" data-hint=\"" + tooltipText + "\"</td>" +
                    "</tr>");
                assignCallbackClaimButton(listId, buttonHtml, rowIndex, r, typeTable, r.ID);
            }
        },
        error: onQueryFailed
    });
} // <td id="buttoncell${rowIndex}${listId}" class="hint--bottom-left hint--info" data-hint="${tooltipText}"</td>
function assignCallbackClaimButton(listId, buttonHtml, rowIndex, data, typeTable, newId) {
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