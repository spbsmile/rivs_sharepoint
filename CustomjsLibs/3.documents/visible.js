$(document).ready(function () {
	
	$("#MSOZoneCell_WebPartWPQ4").hide();
	//$("#siteIcon").hide();

	//  handlers of click widget otdels on inner page
	$(".menu-item-text").on('click', function () {
		console.log("hello click");
		$("#siteIcon").css("display", "block");

		$(".ms-core-navigation").css({
			"width" : "inherit",
			"margin-left" : "0"
		});
		//$("#siteIcon").show();
	});

});
