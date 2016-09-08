function clickAcceptTask(itemId, created, employeeId, discription, priority, category, fileId, employeeItId) {
    // for modal window "выдать заявку"
    if (employeeItId === "null") {
        employeeItId = currentUserId;
    }

    var regex = /<br\s*[\/]?>/gi;
    var dist = discription.replace(regex, "\n");

    employeeId = employeeId === "null" ? null : employeeId;
    var itemData = null;
    if (fileId && fileId != null && fileId != "null") {
        itemData = {
            "__metadata": {
                "type": "SP.Data.List1ListItem",
                "DateCreate": "",
                "TimeCreate": "",
                "Author0": "",
                "Discription": "",
                "Priority": "",
                "Category": "",
                "AttachFileNew": "",
                "timegettask": "",
                "employeeIt": ""
            },
            "DateCreate": moment().format("L"),
            "TimeCreate": moment(created, 'DD-MM-YYYY HH:mm').format("HH:mm"),
            "Author0Id": employeeId,
            "Discription": dist,
            "Priority": priority,
            "Category": category,
            "AttachFileNewId": fileId,
            "timegettask": moment().format("L") + "\n" + moment().format("HH:mm"),
            "employeeItId": employeeItId
        };
    } else {
        itemData = {
            "__metadata": {
                "type": "SP.Data.List1ListItem",
                "DateCreate": "",
                "TimeCreate": "",
                "Author0": "",
                "Discription": "",
                "Priority": "",
                "Category": "",
                "timegettask": "",
                "employeeIt": ""
            },
            "DateCreate": moment().format("L"),
            "TimeCreate": moment(created, 'DD-MM-YYYY HH:mm').format("HH:mm"),
            "Author0Id": employeeId,
            "Discription": dist,
            "Priority": priority,
            "Category": category,
            "timegettask": moment().format("L") + "\n" + moment().format("HH:mm"),
            "employeeItId": employeeItId
        };
    }

    addItem(settings().listId_acceptedClaims, itemData);
    if (itemId) {
        removeItem(itemId, settings().listId_newClaims);
        $("#loaderClaimGive").hide();
    }
}

function clickCloseTask(itemId, d, time, category, urgently, employeeId, discription, timegettask, commentItJob, fileId, isRedirect) {
    removeItem(itemId, settings().listId_acceptedClaims);
    if (isRedirect) {
        var userTargetId = $("#userRedirectTarget").val().split(";")[0];
        clickAcceptTask(null, moment(), employeeId, discription, urgently, category, fileId, userTargetId);
    } else {
        var regex = /<br\s*[\/]?>/gi;
        var dist = discription.replace(regex, "\n");

        var itemData = {
            "__metadata": {
                "type": "SP.Data.List2ListItem",
                "Date": "",
                "Time": "",
                "Author0": "",
                "Discription": "",
                "DateAccept": "",
                "DateResolved": "",
                "category": "",
                "Score": "",
                "urgently": "",
                "CommEmpIT": "",
                "CommAuthor": ""
            },
            "Date": d,
            "Time": time,
            "Author0Id": employeeId,
            "Discription": dist,
            "category": category,
            "urgently": urgently,
            "DateAccept": moment(timegettask, 'L').format("L") + "\n" + moment(timegettask, "DD-MM-YYYY HH:mm").format("HH:mm"),
            "DateResolved": moment().format("L") + "\n" + moment().format("HH:mm"),
            "Score": " ",
            "CommEmpIT": commentItJob,
            "CommAuthor": " "
        };
        addItem(settings().listId_resolvedClaims, itemData);
    }
}

