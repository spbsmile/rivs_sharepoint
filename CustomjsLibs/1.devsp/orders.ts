$(document).ready(function () {
	$(".welcome-image").hide();
	$(".welcome-content").hide();

	//var listId = "ffb15214-eff0-49d7-ac88-ecbfecdc6ab3";
	$("#loaderOrderPage").show();
	jQuery.ajax({
		url : "/sites/documents/_api/web/lists/GetByTitle('ПРИКАЗЫ')/Items?$select=Id,Title,File/ServerRelativeUrl&$expand=File",
		type : "GET",
		headers : {
			"Accept" : "application/json; odata=verbose"
		},
		success : doSuccess,
		error : onError
	});

	function doSuccess(data) {
		$("#loaderOrderPage").hide();		
		var results = data.d.results;				
		for (var i = 0; i < results.length; i++) {
			var r = results[i];			
			var id = "news" + i;

			var docTitle = r.Title;
			var docPath = r.File["ServerRelativeUrl"];

			$("#resultsDivOrders").append('<div class="myItem">' +
				'<div class="link-item"><h1>' +
				'<div class="linkOrder"> ' + docPath + ' </div>' +
				'<div class="linkTitle">' + docTitle + '</div>' +
				'</h1></div></div>');
		}

		$(".link-item").on('click', function () {						
			window.open(				
				$(this).find(".linkOrder").text(),
				'_blank');
		});
	}

	// Display error messages.
	function onError (sender, args) {
    	console.log("request failed " + args.get_message() + "\n" + args.get_stackTrace());
	}
});
