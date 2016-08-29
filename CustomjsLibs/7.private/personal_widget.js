$(document).ready(function () {

    var currentUser = $().SPServices.SPGetCurrentUser();
    console.log(currentUser + " currentUser");

    var thisUsersValues = $().SPServices.SPGetCurrentUser({
        fieldNames: ["ID", "Title", "EMail", "Picture", "Department", "JobTitle", "WorkPhone", "Name", "SipAddres"],
        debug: false
    });

    // console.log(thisUsersValues + " thisUsersValues");
    // console.log(thisUsersValues.Title + " thisUsersValues Title");
    // console.log(thisUsersValues.EMail + " thisUsersValues EMail");
    // console.log(thisUsersValues.Picture + " thisUsersValues Picture");
    // console.log(thisUsersValues.Department + " thisUsersValues Department");
    // console.log(thisUsersValues.JobTitle + " thisUsersValues JobTitle");
    // console.log(thisUsersValues.WorkPhone + " thisUsersValues WorkPhone");
    // console.log(thisUsersValues.ID + " thisUsersValues ID");
    // console.log(thisUsersValues.Name + " thisUsersValues Name");
    // console.log(thisUsersValues.SipAddres + " thisUsersValues SipAddres");


    var photo = thisUsersValues.Picture;
    photo = photo.replace(/ /g, '%20');
    photo = photo.replace("_MThumb.jpg", "_LThumb.jpg");

    $(".title_person").text(thisUsersValues.Title);

    $(".department_person_widget").text(thisUsersValues.Department);

    $(".job_title_person_widget").text(thisUsersValues.JobTitle);

    $(".phone_value").text(thisUsersValues.WorkPhone);

    $(".email_value").text(thisUsersValues.EMail);

    $(".image_person").attr("src", photo);

    console.log(window.location.pathname + " path only");

    console.log(window.location.href + " full url");

    //console.log(decodeURI(window.location.href) + " after decode uri, full url");

    var uri = decodeURI(window.location.href);
    var decodeUriComponent = decodeURIComponent(window.location.href);
    console.log(decodeUriComponent + " decodeUriComponent");
    console.log(uri + " uri");

    var regexStr = /ID=([^"]*?)(?=&)/;
    var regexp = new RegExp(regexStr);
    var myArrayTest = regexStr.exec(uri);

    //var myVar = regexp.exec(uri)[1];
    console.log(myArrayTest + " myVar");

    var myArray;
    while ((myArray = regexStr.exec(uri)) !== null) {
        console.log(myArray + " regex")
    }

    var re = /ID=([^"]*?)(?=&)/;
    var str = 'http://intranet/my/Person.aspx?accountname=i:0#.w|rivs\sptest&Source=http://intranet/support/_layouts/userdisp.aspx?Force=1&ID=17&Source=http%3A%2F%2Fintranet%2Fsupport%2FPages%2Fdefault%2Easpx&AjaxDelta=1&isStartPlt1=1472455153057&Title=Техподдержка';
    var m;

    if ((m = re.exec(window.location.href)) !== null) {

        console.log(m + " hello m");
        if (m.index === re.lastIndex) {
            re.lastIndex++;
        }
        // View your result using the m-variable.
        // eg m[0] etc.
    }

    //decode url

    //      i:0#.w|rivs\m_zabiyakin
    //      i:0#.w|rivs\m_zabiyakin this Name property


    // http://<site url>/_api/web/getuserbyid(ID#)

});