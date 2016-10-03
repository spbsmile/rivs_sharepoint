namespace MainPage {

	$(document).ready(function () {

		/**  fetch news content from site-collection news */
		jQuery.ajax({
			url: "/sites/news/_api/web/lists/GetByTitle('Posts')/Items?&$top=10&$orderby=PublishedDate%20desc&$select=Title,PublishedDate,Body,ID",
			type: "GET",
			headers: {
				"Accept": "application/json; odata=verbose"
			},
			// dynamicaly create news widgets
			success: function (data) {
				var results = data.d.results;
				for (var i = 0; i < results.length; i++) {
					var r = results[i];
					var id = "news" + i;

					// #resultsDivNews - id of element news container 
					$("#resultsDivNews").append('<div id="' + id + '\" class="newsBlock">' +
						'<p class="newsdate">' + moment(r.PublishedDate).format("YYYY-MM-DD") + '</p> ' +
						'<h1 id="' + id + "title" + '">  ' + r.Title + '</h1> ' +
						' <div id="' + id + "body" + '" hidden="true"> ' + r.Body + '</div> </div>');
					// bind click event and news widget
					$("#" + id).on('click',
						// invoke on click
						function () {
							// when click get selector of current context 
							var selector = (typeof ($(this).attr('id')) !== 'undefined' || $(this).attr('id') !== null) ? '#' + $(this).attr('id') : '.' + $(this).attr('class');
							// title of news
							$("#myModalLabelNews").text("Новости: " + $(selector + "title").text());
							$('#modal-body-news').empty();
							$('#modal-body-news').append($(selector + "body").clone());
							$('#modal-body-news').children(selector + "body").show();
							// start modal window news
							$('#modalNews').modal('show');
						});
				}
			},
			error: function (error) {
				console.log(error.responseText + " error in news on main page");
			}
		});
	});
}

