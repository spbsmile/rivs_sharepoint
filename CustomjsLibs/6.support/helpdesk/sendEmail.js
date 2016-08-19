/*
function processSendEmails(parameters) {
var from = 'M_Zabiyakin@rivs.ru',
to = 'm_laberko@rivs.ru',
body = 'Hello World Body',
subject = 'Hello World Subject';

sendEmails(from, to, body, subject);
}

function sendEmails(from, to, body, subject) {
var siteurl = _spPageContextInfo.webServerRelativeUrl;
var urlTemplate = "http://intranet/" + "/_api/SP.Utilities.Utility.SendEmail";
$.ajax({
contentType: 'application/json',
url: urlTemplate,
type: "POST",
data: JSON.stringify({
'properties': {
'__metadata': {
'type': 'SP.Utilities.EmailProperties'
},
'From': from,
'To': {
'results': [to]
},
'Body': body,
'Subject': subject
}
}),
headers: {
"Accept": "application/json;odata=verbose",
"content-type": "application/json;odata=verbose",
"X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
},
success: function (data) {
alert("Successful");
},
error: function (err) {
alert(err.responseText);
}
});
}
 */