namespace OrdersPage {

	$(document).ready(function () {
		/** hide useless sp content */
		$(".welcome-image").hide();
		$(".welcome-content").hide();

		// start animate loader effect
		$("#loaderOrderPage").show();

		/** fetch all items of library 'ПРИКАЗЫ' of site collection 'ДОКУМЕНТЫ'*/
		jQuery.ajax({
			url: "/sites/documents/_api/web/lists/GetByTitle('ПРИКАЗЫ')/Items?$select=Id,Title,File/ServerRelativeUrl&$expand=File",
			type: "GET",
			headers: {
				"Accept": "application/json; odata=verbose"
			},
			success: function (data) {

				// stop animate loader effect
				$("#loaderOrderPage").hide();
				let results = data.d.results;
				for (let i = 0; i < results.length; i++) {
					let r = results[i];
					let id = "news" + i;

					let docTitle = r.Title;
					let docPath = r.File["ServerRelativeUrl"];

					// #resultsDivOrders - it's id of div element in web part: cewp
					$("#resultsDivOrders").append('<div class="myItem">' +
						'<div class="link-item"><h1>' +
						'<div class="linkOrder"> ' + docPath + ' </div>' +
						'<div class="linkTitle">' + docTitle + '</div>' +
						'</h1></div></div>');
				}

				// bind click event and all widget with .link-item class
				$(".link-item").on('click', function () {
					window.open(
						$(this).find(".linkOrder").text(),
						'_blank');
				});
			},
			error: function (sender, args) {
				console.log("request failed " + args.get_message() + "\n" + args.get_stackTrace());
			}
		});
	});
}

