function clickAcceptTask(itemId, created, authId, discription, priority, category, lookupId, employeeId) {
    if (employeeId === "null") {
        employeeId = currentUserId;
    }

    var regex = /<br\s*[\/]?>/gi;
    var dist = discription.replace(regex, "\n");

    var authorClaimId = authId === "null" ? null : authId;
    var itemData = {
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
        "Author0Id": authorClaimId,
        "Discription": dist,
        "Priority": priority,
        "Category": category,
        "AttachFileNewId": lookupId,
        "timegettask": moment().format("L") + "\n" + moment().format("HH:mm"),
        "employeeItId": employeeId
    };
    addItem(settings().listId_acceptedClaims, itemData);
    if (itemId) {
        removeItem(itemId, settings().listId_newClaims);
        $("#loaderClaimGive").hide();
        document.location.reload();
    }
}

function clickCloseTask(itemId, d, time, category, urgently, authId, discription, timegettask, commentItJob) {
    removeItem(itemId, settings().listId_acceptedClaims);

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
        "Author0Id": authId,
        "Discription": dist,
        "category": category,
        "urgently": urgently,
        "DateAccept": moment(timegettask, 'L').format("L") + "\n" + moment(timegettask, "DD-MM-YYYY HH:mm").format("HH:mm"),
        "DateResolved": moment().format("L") + "\n" + moment().format("HH:mm"),

        "Score": "Нет оценки",
        "CommEmpIT": commentItJob,
        "CommAuthor": "Нет комментария"
    };
    addItem(settings().listId_resolvedClaims, itemData);
}

