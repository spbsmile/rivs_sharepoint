var list = null;
var listItems = null;

$(document).ready(function () {

	$(".welcome-image").hide();
	$(".welcome-content").hide();

	function getAllLists() {
		var serverUrl = "http://intranet/sites/documents"
		var clientContext = new SP.ClientContext(serverUrl);
		var web = clientContext.get_web();
		lists = web.get_lists();
		listItems = web.get_lists();
		clientContext.load(lists, 'Include(RootFolder)');
		clientContext.load(listItems);
		clientContext.executeQueryAsync(SuccessHandler, ErrorHadler);
	}

	/* must run after you create the retrieveListItems function and before you call that retrieveListItems function. */
	//ExecuteOrDelayUntilScriptLoaded(getAllLists, "sp.js");

    SP.SOD.executeFunc("sp.js", 'SP.ClientContext', getAllLists);
});

function SuccessHandler(sender, args) {
	var enumerator = lists.getEnumerator();
	while (enumerator.moveNext()) {
		var listTemp = enumerator.get_current();
		var listTitle = listTemp.get_title();
		var listCreated = listTemp.get_created();
		var rootFolder = listTemp.get_rootFolder();
		var url = rootFolder.get_serverRelativeUrl();

		if (listTitle === "ПРИКАЗЫ" || listTitle === "РАЗНОЕ") {
			continue;
		}
		//Apr 29 2016
		if (moment(listCreated).isAfter(moment().format('2016-04-29'))) {
			$("#resultsDivDocuments").append('<div class="myItem">' +
				'<div class="link-item"><h1>' +
				'<a class="linkOrder" href="' + url + "/Forms/AllItems.aspx" + '" target="_self"> ' + listTitle + ' </a>' +
				'</h1></div></div>');
		}

		$(".link-item").on('click', function () {
			window.open(
				$(this).find(".linkOrder").attr('href'), "_self");
		});
	}
	console.log("success");
}

function ErrorHadler(sender, args) {
	console.log("request failed " + args.get_message() + "\n" + args.get_stackTrace());
}