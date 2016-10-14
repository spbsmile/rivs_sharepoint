var MainPage;
(function (MainPage) {
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
                // attribute hidden html5 support ie11+
                var versionIe = getInternetExplorerVersion();
                var isOlderVersionIe = versionIe <= 10 && versionIe !== -1;
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
                    if (isOlderVersionIe) {
                        $("#" + id + "body").hide();
                    }
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
                function getInternetExplorerVersion() {
                    var rv = -1; // Return value assumes failure.
                    if (navigator.appName == 'Microsoft Internet Explorer') {
                        var ua = navigator.userAgent;
                        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                        if (re.exec(ua) != null)
                            rv = parseFloat(RegExp.$1);
                    }
                    return rv;
                }
                if (isOlderVersionIe) {
                    $("#modalNews").removeClass("fade");
                }
            },
            error: function (error) {
                console.log(error.responseText + " error in news on main page");
            }
        });
    });
})(MainPage || (MainPage = {}));
//# sourceMappingURL=news_4.js.map