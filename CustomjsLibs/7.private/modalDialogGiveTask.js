function clickDialogGetOut() {
    console.log("click dialog get out");
    $(function () {
        $("#dialog-form").dialog({
            buttons: [
                {
                    text: "Выдать",
                    click: function () {
                        $("#loaderClaimGive").show();
                        var userTargetId = $("#userTarget").val().split(";")[0];
                        var employeId = null;
                        if (userTargetId) {
                            employeId = userTargetId;
                        }
                        else {
                            employeId = currentUserId;
                        }
                        if ($("#getFile").get(0).files.length === 0) {
                        }
                        else {
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
//# sourceMappingURL=modalDialogGiveTask.js.map