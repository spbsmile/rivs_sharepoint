
namespace SiteHeader {

	$(document).ready(function () {

		// button click
		$("#btnSearchNav").click(function () {
			$('#modalSearchResult').modal();
			$("#resultsDiv").empty();
			$("#loaderSearch").show();
			SP.SOD.executeFunc('SP.Search.js', 'Microsoft.SharePoint.Client.Search.Query', startSearch);
		});

		// keyboard 'enter' input
		$("#textSearch").keypress(function (e) {
			if (e.which == 13) {
				$('#modalSearchResult').modal();
				$("#resultsDiv").empty();
				$("#loaderSearch").show();
				SP.SOD.executeFunc('SP.Search.js', 'Microsoft.SharePoint.Client.Search.Query', startSearch);
			}
		});
	});

	function startSearch() {	
		// value of query search 
		var query = $("#textSearch").val();
		// title modal window of search
		$("#modalSearchResultLabel").text("Поиск: " + query);

		var textWithWildcard = query + "*";
		var queryWrap = !!window.chrome && !!window.chrome.webstore ? textWithWildcard : encodeURIComponent(textWithWildcard);

		$.ajax({
			url: "/_api/search/query?querytext='" + queryWrap + "'&trimduplicates=true&enablequeryrules=false&bypassresulttypes=true&rowlimit=100&sortlist='RefinableString01:ascending%2cRefinableString02:ascending'&selectproperties='Title%2cJobTitle%2cWorkemail%2cPath%2c+WorkPhone%2cDepartment%2cPictureURL%2cOrganization%2cIsDisabled'&sourceid='b09a7990-05ea-4af9-81ef-edfab16c4e31'&clienttype='ContentSearchRegular'",
			method: "GET",
			headers: {
				"Accept": "application/json;odata=verbose",
				"X-RequestDigest": $("#__REQUESTDIGEST").val()
			},
			success: function (data) {

				$("#loaderSearch").hide();
				$("#textSearch").val(" ");

				var results = data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;
				// #resultsDiv - id of container 
				$("#resultsDiv").append('<div class="container">');
				if (results.length <= 0) {
					$("#resultsDiv").text("Ничего не найдено!");
				} else {
					// loop for all match result
					for (var i = 0; i < results.length; i++) {

						// when user disabled
						if (results[i].Cells.results[10].Value) {
							continue;
						}

						var organization = results[i].Cells.results[9].Value;
						var photo = results[i].Cells.results[8].Value;
						var email = results[i].Cells.results[4].Value ? results[i].Cells.results[4].Value : "";
						var workphone = results[i].Cells.results[6].Value ? results[i].Cells.results[6].Value : "";
						var department = results[i].Cells.results[7].Value;
						var photoImprove = photo ? photo.replace(/ /g, '%20') : "/_layouts/15/CustomjsLibs/1.devsp/noPhoto.jpg";

						$("#resultsDiv").append('<div class="row"> <div class="span4 well"> <div class="row">');
						$("#resultsDiv").append('<div class="col-xs-6 col-md-3 left_column_header_search"><a class="thumbnail img_header_search"><img src="' + photoImprove + '" alt=""></a></div>');
						$("#resultsDiv").append('<div>' +
							'<p><strong>' + results[i].Cells.results[2].Value + '</strong></p> ' +
							(organization ? '<p>' + organization + '</p>' : "") +
							(organization != department ? '<p> Департамент: ' + department + '</p> ' : "") +
							'<p>' + results[i].Cells.results[3].Value + '</p>' +
							'<p><i class="fa fa-envelope"></i> &nbsp;<a  href="mailto:' + email + '"> ' + email + '</a></p>' +
							'<p><i class="fa fa-phone"></i> &nbsp;<a  href="tel:+' + workphone + '"> ' + workphone + '</a></p>' +
							// '<p><i class="fa fa-external-link"></i>  &nbsp;<a  href="' + results[i].Cells.results[5].Value + '">Страница сотрудника</a></p>' +
							'</div>');
						$("#resultsDiv").append('</div></div></div>');
					}
				}
				$("#resultsDiv").append('</div>');
			},
			error: function (data) {
				console.log(data + " fail searchRightTopCorner.js");
			}
		});
	}
}

