$(document).ready(function () {

    var currentUser = $().SPServices.SPGetCurrentUser();

    var thisUsersValues = $().SPServices.SPGetCurrentUser({
        fieldNames: ["ID", "Title", "EMail", "Picture", "Department", "JobTitle", "WorkPhone", "Name", "SipAddres"],
        debug: false
    });

    var regexStr = /ID=([^"]*?)(?=&)/;
    var resultRegex = regexStr.exec(decodeURIComponent(window.location.href));    
    var id = resultRegex ? resultRegex[1] : "";       
    console.log(id)
    if (id) {
        $.ajax({
            url: "_api/web/getuserbyid(" + id + ")",
            method: "GET",
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data) {
                var datajs = JSON.stringify(data);                
                var results = data.d;
                $(".title_person").text(results.Title);
                $(".email_value").text(results.Email);

                $.ajax({
                    url: "_api/search/query?querytext='" + results.Title + "'&selectproperties='JobTitle%2cWorkPhone%2cDepartment%2cPictureURL'&sourceid='b09a7990-05ea-4af9-81ef-edfab16c4e31'&clienttype='ContentSearchRegular'",
                    method: "GET",
                    headers: {
                        "Accept": "application/json;odata=verbose",
                        "X-RequestDigest": $("#__REQUESTDIGEST").val()
                    },
                    success: function (dataNew) {                        
                        var results = dataNew.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;

                        for (var i = 0; i < results.length; i++) {
                            var result = results[i];                            
                            $(".job_title_person_widget").text(result.Cells.results[2].Value);
                            $(".phone_value").text(result.Cells.results[3].Value);
                            $(".department_person_widget").text(result.Cells.results[4].Value);
                            var photo = result.Cells.results[5].Value;
                            photo = photo.replace(/ /g, '%20');
                            photo = photo.replace("_MThumb.jpg", "_LThumb.jpg");
                            $(".image_person").attr("src", photo);                            
                        }
                    },
                    error: errorHandler
                });
            }
        });
    } else {
        $(".title_person").text(thisUsersValues.Title);
        var photo = thisUsersValues.Picture;
        photo = photo.replace(/ /g, '%20');
        photo = photo.replace("_MThumb.jpg", "_LThumb.jpg");

        $(".email_value").text(thisUsersValues.EMail);
        $(".department_person_widget").text(thisUsersValues.Department);
        $(".job_title_person_widget").text(thisUsersValues.JobTitle);
        $(".phone_value").text(thisUsersValues.WorkPhone);
        $(".image_person").attr("src", photo);
    }

    function errorHandler(data) {
        console.log(data + "fail");
    }
});