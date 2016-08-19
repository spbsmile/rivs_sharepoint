$(document).ready(function () {

	$("#ctl00_PlaceHolderMain_ctl01__ControlWrapper_RichHtmlField").remove();
	$("#ctl00_PlaceHolderLeftNavBar_PlaceHolderQuickLaunchBottom_idNavLinkViewAll").hide();
	$('#ms-designer-ribbon').hide();
	$('#suiteBar').hide();
	$('#s4-ribbonrow').hide();

	$(".td.ms-list-addnew.ms-textXLarge.ms-list-addnew-aligntop.ms-soften").hide();
	$(".ms-list-addnew.ms-textXLarge.ms-list-addnew-aligntop.ms-soften").hide();
	$(".ms-list-itemLink-td.ms-cellstyle").hide();
	
	var isMember = null;
	var currentUser = $().SPServices.SPGetCurrentUser();
	$().SPServices({
		operation : "GetGroupCollectionFromUser",
		userLoginName : currentUser,
		async : true,
		completefunc : function (xData, Status) {
			if ($(xData.responseXML).find("Group[Name='" + "SupportOwner" + "']").length == 1) {
				isMember = true;
			} else {
				isMember = false;
			}
			$("#clicksupport").click(function () {
				if (isMember) {
					window.location = "/support/Pages/default.aspx";
				} else {
					window.location = "/Pages/helpdesk.aspx";
				}
			})
		}
	});

	$().SPServices({
		operation : "GetGroupCollectionFromUser",
		userLoginName : currentUser,
		async : true,
		completefunc : function (xData, Status) {
			if ($(xData.responseXML).find("Group[Name='" + "DevepolerGroup" + "']").length == 1) {
				$('#ms-designer-ribbon').show();
				$('#RibbonContainer-TabRowRight').show();
				$('#suiteBarButtons').show();
				$('#s4-ribbonrow').show();
				$('#suiteBar').show();
				$(".td.ms-list-addnew.ms-textXLarge.ms-list-addnew-aligntop.ms-soften").show();
				$(".ms-list-addnew.ms-textXLarge.ms-list-addnew-aligntop.ms-soften").show();
				$(".ms-list-itemLink-td.ms-cellstyle").show();
				$('#s4-ribbonrow').css({
					"height" : "initial"
				});
			}
		}
	});
/*
	// “List Tools” tab is no longer available after adding webpart to the page  HACK
	setTimeout(function () {
		var elem = document.getElementById("MSOZoneCell_WebPartWPQ2");
		if (elem != null) {
			var dummyevent = new Array();
			dummyevent["target"] = elem;
			dummyevent["srcElement"] = elem;
			console.log("click event");
			WpClick(dummyevent);
		}
	}, 2000);
*/
});
