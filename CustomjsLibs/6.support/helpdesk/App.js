"use strict";

var currentUserId = null;
var TableClaims;
var fileName = " ";
// for sort in table
var claimSended = [];
var claimClosed = [];

(function (TableClaims) {
	TableClaims[TableClaims["New"] = 0] = "New";
	TableClaims[TableClaims["Accepted"] = 1] = "Accepted";
	TableClaims[TableClaims["Resolved"] = 2] = "Resolved";
})(TableClaims || (TableClaims = {}));

$(document).ready(function () {

	SP.SOD.executeFunc('sp.js', 'SP.ClientContext', sharePointReady);

	function sharePointReady() {		
		var context = SP.ClientContext.get_current();
		var currentUser = context.get_web().get_currentUser();
		context.load(currentUser);
		context.executeQueryAsync(function () {
			currentUserId = currentUser.get_id();
			displayClaimsCurrentUser(settings().listIdNewClaims, "#panelSendClaims", "#tbodySendClaims", settings().btnNewClaim, TableClaims.New, "Author", settings().listFieldsNewClaimsTable, settings().tooltipBtnNewClaim, settings().statusClaim[0]);
			displayClaimsCurrentUser(settings().listIdAcceptedClaims, "#panelSendClaims", "#tbodySendClaims", settings().btnNewClaim, TableClaims.Accepted, "Author0", settings().listFieldsAcceptedClaimsTable, settings().tooltipBtnNewClaim, settings().statusClaim[1]);
			displayClaimsCurrentUser(settings().listIdResolvedClaims, "#panelResolvedClaims", "#tbodyResolvedClaims", settings().btnResolvedClaim, TableClaims.Resolved, "Author0", settings().listFieldsResolvedClaimsTable, settings().tooltipBtnResolvedClaim, settings().statusClaim[2]);
		}, function (data) {
            reportClaimOperation("Техническая ошибка получения заявок пользователя: " + "<br/>" + data.toString());
            onError(data);
        });
	}

	SP.SOD.loadMultiple(["moment.min.js", "moment-with-locales.min.js", "moment-timezone.min.js"], function () {
		moment.tz.add("Europe/Moscow|MSK MSD MSK|-30 -40 -40|01020|1BWn0 1qM0 WM0 8Hz0|16e6");
		moment.locale(window.navigator.userLanguage || window.navigator.language);
	});

	$("#sendTicket").click(function () {
		if ($("#getFile").get(0).files.length === 0) {
			sendClaim(getItemData($("#urgentlyValue").val(), $("#category option:selected").text(), $("#discription").val(), null, ""), "Заявка Отправлена!");
		} else {
			sendClaimWithFile();
		}
	});

	$("#pressButtonSupport").click(function () {
		$("#pressButtonSupport").hide();
		$("#supportForm").show();
	});

	$("#closePrepareClaim").click(function () {
		$("#pressButtonSupport").show();
		$("#supportForm").hide();
	});

	$("#mainTips").hide();
});

//todo open dialog
function reopenClaim(rowSelectorId, itemData) {
	removeRow(rowSelectorId, "#panelResolvedClaims", "#tableResolved");
	sendClaim(itemData);
}

function removeRow(rowId, panelId, tableId) {
	$("#" + rowId).remove();
	if ($(tableId + " tr").length === 1) {
		$(panelId).hide();
	}
}

function reportClaimOperation(message) {
	console.log(reportClaimOperation + " reportClaimOperation");
	$("#loader").hide();
	$("#msgResultLoader").show();
	$("#msgResultLoader").text(message);
	$("#pressButtonSupport").show();
	$("#supportForm").hide();
	$("#discription").val(" ");
}
