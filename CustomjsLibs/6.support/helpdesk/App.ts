"use strict";

var currentUserId = null;
var TableClaims;
var fileName = " ";
// for sort in table
var claimSended = [];
var claimResolved = [];
var clientIp = null;
var clientMachineName = null;

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
			fetchClaimsCurrentUser(settings().listIdNewClaims, "Author", settings().listFieldsNewClaimsTable, claimSended, TableClaims.New, settings().statusClaim[0], settings().tooltipBtnNewClaim,
				function () {
					fetchClaimsCurrentUser(settings().listIdAcceptedClaims, "Author0", settings().listFieldsAcceptedClaimsTable, claimSended, TableClaims.Accepted, settings().statusClaim[1], settings().tooltipBtnNewClaim,
						function () {
							fetchClaimsCurrentUser(settings().listIdResolvedClaims, "Author0", settings().listFieldsResolvedClaimsTable, claimResolved, TableClaims.Resolved, settings().statusClaim[2], settings().tooltipBtnResolvedClaim,
								function () {
									displayClaims()
								}
							)
						}
					)
				}
			)
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
		var discription = $("#discription").val() + "\n" + " Подкатегория: " + $("#subcategory option:selected").text() + "\n" + " ПК: " + clientMachineName;
		if ($("#getFile").get(0).files.length === 0) {
			sendClaim(getItemData($("#urgentlyValue").val(), $("#category option:selected").text(), discription, null, ""), "Заявка Отправлена!");
		} else {
			$("#modalSendClaim").modal();
			sendClaimWithFile(function (itemId) {
				sendClaim(getItemData($("#urgentlyValue").val(), $("#category option:selected").text(), discription, itemId, ""), "Заявка с файлом Отправлена!");
			});
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

	$('#ip_machine_client').children('span').each(function (i) {
		if (i === 0) {
			clientIp = $(this).text();
		} else if (i === 1) {
			clientMachineName = $(this).text();
		}
	});	
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
	$("#loader").hide();
	$("#msgResultLoader").show();
	$("#msgResultLoader").text(message);
	$("#pressButtonSupport").show();
	$("#supportForm").hide();
	// ovveride when add 
	//$("#discription").val(" ");
}
