// для скрытия синего верхнего бара для всех, кроме разработчика и администраторов, для определения текущего пользователя к приндлежности к группе поддержки
// в этом скрипте происходит декативации клика ссылки на личный кабинет. когда личный кабинет будет рабочим, код надо будет удалить 
$(document).ready(function () {

	$("#ctl00_PlaceHolderMain_ctl01__ControlWrapper_RichHtmlField").remove();
	$("#ctl00_PlaceHolderLeftNavBar_PlaceHolderQuickLaunchBottom_idNavLinkViewAll").hide();
	//
	$('#ms-designer-ribbon').hide();
	// скрыть синий верхний бар
	$('#suiteBar').hide();
	// скрыть синий верхний бар
	$('#s4-ribbonrow').hide();

	$(".td.ms-list-addnew.ms-textXLarge.ms-list-addnew-aligntop.ms-soften").hide();
	$(".ms-list-addnew.ms-textXLarge.ms-list-addnew-aligntop.ms-soften").hide();

	// site-collection 'document' 
	let libraryMenuClass = ".ms-list-itemLink-td.ms-cellstyle";
	$(libraryMenuClass).hide();

	let isMember = null;
	// текущий пользователь на странице
	let currentUser = $().SPServices.SPGetCurrentUser();

	// кнопка "техподдержка"  
	$().SPServices({
		operation: "GetGroupCollectionFromUser",
		userLoginName: currentUser,
		async: true,
		completefunc: function (xData, Status) {
			if ($(xData.responseXML).find("Group[Name='" + "SupportOwner" + "']").length === 1) {
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
			});
		}
	});

	// show top panel for DevepolerGroup
	$().SPServices({
		operation: "GetGroupCollectionFromUser",
		userLoginName: currentUser,
		async: true,
		completefunc: function (xData, Status) {
			if ($(xData.responseXML).find("Group[Name='" + "DevepolerGroup" + "']").length === 1) {
				$('#ms-designer-ribbon').show();
				$("#suiteBarRight").show;
				$('#RibbonContainer-TabRowRight').show();
				$('#suiteBarButtons').show();
				$('#s4-ribbonrow').show();
				$('#suiteBar').show();
				$(".td.ms-list-addnew.ms-textXLarge.ms-list-addnew-aligntop.ms-soften").show();
				$(".ms-list-addnew.ms-textXLarge.ms-list-addnew-aligntop.ms-soften").show();
				$(libraryMenuClass).show();
				$('#s4-ribbonrow').css({
					"height": "initial"
				});
			}
		}
	});

	// disable click event on user link (ссылка на личный кабинет деактивирована)
	$('.ms-subtleLink').each(function (i, obj) {
		$(this).attr("href", "#");
		$(this).removeAttr("onclick");
	});
});
