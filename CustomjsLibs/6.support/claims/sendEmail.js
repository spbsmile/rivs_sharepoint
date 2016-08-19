
function sendEmail(from, to, body, subject) {
    var urlTemplate = settings().siteUrl + "/_api/SP.Utilities.Utility.SendEmail";

    $.ajax({
        contentType: 'application/json',
        url: urlTemplate,
        type: 'POST',
        data: JSON.stringify({
            'properties': {
                '__metadata': { 'type': 'SP.Utilities.EmailProperties' },
                'From': from,
                'To': { 'results': [to] },
                'Subject': subject,
                'Body': body
            }
        }
        ),
        headers: {
            "Accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            console.log(data);
            //var result = data.d.results;
            //console.log(result);
            //var i = result.length;
        },
        error: function (err) {
            alert(JSON.stringify(err));
        }
    });
}