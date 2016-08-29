function sendClaimWithFile(callback) {
    if (!window.FileReader) {
        alert("This browser does not support the HTML5 File APIs");
        return;
    }

    var fileInput = $("#getFile");
    // Get the file name from the file input control on the page.
    var parts = fileInput[0].value.split("\\");
    fileName = parts[parts.length - 1];

    var reader = new FileReader();
    reader.onload = function (e) {
        addItem(e.target.result, fileName);
    }
    reader.onerror = function (e) {
        alert(e.target.error);
    }
    reader.readAsArrayBuffer(fileInput[0].files[0]);

    function addItem(buffer, fileName) {
        var call = uploadDocument(buffer, fileName);
        call.done(function (data, textStatus, jqXHR) {
            var call2 = getItem(data.d);
            call2.done(function (data, textStatus, jqXHR) {
                var item = data.d;
                var call3 = updateItemFields(item);
                call3.done(function (data, textStatus, jqXHR) {                    
                    if (typeof callback === 'function' && callback) {
                        callback(item.Id);
                    }
                });
                call3.fail(function (jqXHR, textStatus, errorThrown) {
                    failHandler(jqXHR, textStatus, errorThrown);
                });
            });
            call2.fail(function (jqXHR, textStatus, errorThrown) {
                failHandler(jqXHR, textStatus, errorThrown);
            });
        });
        call.fail(function (jqXHR, textStatus, errorThrown) {
            failHandler(jqXHR, textStatus, errorThrown);
        });
    }

    function uploadDocument(buffer, fileName) {
        var url = String.format(
            "{0}/_api/Web/Lists/getByTitle('Файлы техподдержки')/RootFolder/Files/Add(url='{1}', overwrite=true)",
            'http://intranet/support', fileName);
        var call = jQuery.ajax({
            url: url,
            type: "POST",
            data: buffer,
            processData: false,
            headers: {
                Accept: "application/json;odata=verbose",
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
            }
        });
        return call;
    }

    function getItem(file) {
        var call = jQuery.ajax({
            url: file.ListItemAllFields.__deferred.uri,
            type: "GET",
            dataType: "json",
            headers: {
                Accept: "application/json;odata=verbose"
            }
        });

        return call;
    }

    function updateItemFields(item) {
        var now = new Date();
        var call = jQuery.ajax({
            url: 'http://intranet/support' +
            "/_api/Web/Lists/getByTitle('Файлы техподдержки')/Items(" +
            item.Id + ")",
            type: "POST",
            data: JSON.stringify({
                "__metadata": { type: "SP.Data.DocLibItem" },
                'FileLeafRef': fileName,
                'Title': fileName
            }),
            headers: {
                Accept: "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
                "IF-MATCH": item.__metadata.etag,
                "X-Http-Method": "MERGE"
            }
        });

        return call;
    }

    function failHandler(jqXHR, textStatus, errorThrown) {
        var response = JSON.parse(jqXHR.responseText);
        var message = response ? response.error.message.value : textStatus;
        alert("Call failed. Error: " + message);
    }
}