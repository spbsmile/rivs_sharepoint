$(document).ready(function () {

	jQuery.ajax({
		url : "http://intranet/sites/news/_api/web/lists/GetByTitle('Posts')/Items?&$top=10&$orderby=PublishedDate%20desc&$select=Title,PublishedDate,Body,ID",
		type : "GET",
		headers : {
			"Accept" : "application/json; odata=verbose"
		},
		success : doSuccess,
		error : onError
	});

	function doSuccess(data) {
		var results = data.d.results;
		for (var i = 0; i < results.length; i++) {
			var r = results[i];
			var id = "news" + i;

			$("#resultsDivNews").append('<div id="' + id + '\" class="newsBlock">' +
				'<p class="newsdate">' + moment(r.PublishedDate).format("YYYY-MM-DD") + '</p> ' +
				'<h1 id="' + id + "title" + '">  ' + r.Title + '</h1> ' +
				' <div id="' + id + "body" + '" hidden="true"> ' + r.Body + '</div> </div>');

			$("#" + id).on('click', function () {
				var selector = (typeof($(this).attr('id')) !== 'undefined' || $(this).attr('id') !== null) ? '#' + $(this).attr('id') : '.' + $(this).attr('class');
				var text = $(selector + "title").text();
				$("#myModalLabelNews").text("Новости: " + text);
				var cloned = $(selector + "body").clone();
				$('#modal-body-news').empty();
				$('#modal-body-news').append(cloned);
				$('#modal-body-news').children(selector + "body").show();
				$('#modalNews').modal('show');
			});
		}
	}

	// Display error messages.
	function onError(error) {
		console.log(error.responseText);
	}

	$("#clickWeatherModal").on('click', function () {
		$("#modalWeather").modal('show');
	});
});