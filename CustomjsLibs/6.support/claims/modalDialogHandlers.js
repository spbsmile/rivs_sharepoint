function clickDialogGetOut() {
    $(function () {
        $("#dialog-form").dialog({
            buttons: [
                {
                    text: "Выдать",
                    click: function () {
                        $("#loaderClaimGive").show();
                        var userSourceId = $("#userSource").val().split(";")[0];
                        var userTargetId = $("#userTarget").val().split(";")[0];
                        var employeId = null;
                        if (userTargetId) {
                            employeId = userTargetId;
                        } else {
                            employeId = currentUserId;
                        }

                        if ($("#getFile").get(0).files.length === 0) {
                            clickAcceptTask(null, moment(new Date()).format(), userSourceId, $("#discriptionModal").val(), $("#urgencyModalClaim option:selected").text(),
                                $("#categoryModalClaim option:selected").text(), null, employeId);
                        } else {                            
                            sendClaimWithFile(function (itemId) {
                                clickAcceptTask(null, moment(new Date()).format(), userSourceId, $("#discriptionModal").val(), $("#urgencyModalClaim option:selected").text(),
                                    $("#categoryModalClaim option:selected").text(), itemId, employeId);
                            });
                        }
                    }
                }
            ],
            title: 'Выдать Заявку: ',
            width: 600,
            modal: true,
            resizable: false
        });
    });
}

function clickDialogCommentClosestClaim(itemId, d, time, category, urgently, authId, discription, timegettask) {
    $(function () {
        $("#dialog-form-comment-claim").dialog({
            buttons: [
                {
                    text: "Закрыть Заявку",
                    click: function () {
                        $("#loaderClaimOut").show();
                        clickCloseTask(itemId, d, time, category, urgently, authId, discription, timegettask, $("#commentModal").val());
                    }
                }
            ],
            title: 'Комментирование Заявки: ',
            width: 600,
            modal: true,
            resizable: false
        })
            ;
    });
}


