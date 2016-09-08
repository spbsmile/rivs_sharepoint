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

var isRedirect = false;

$(document).ready(function () {
    $("input[name='userRedirectTarget']").pickSPUser(
        {
            onPickUser: function (personObj) {
                $("#userRedirectTarget").next().find(".pt-pickSPUser-input").hide();
            },
            onRemoveUser: function ($input, $ui, personObj) {
                $("#userRedirectTarget").next().find(".pt-pickSPUser-input").show();
            },
            filterSuggestions: function (suggestions) {
                var newSuggestions = [];
                var prevEmail = null;
                $.each(suggestions, function (i, userInfo) {
                    if (prevEmail === userInfo.email) return true;
                    prevEmail = userInfo.email;
                    newSuggestions.push(userInfo);
                });
                return newSuggestions;
            }
        }
    );
    $(".userRedirectClaim").hide();
});

$(document).on('change', '#selectRedirectState', function () {
    if ($("#selectRedirectState").val() === "0") {
        $(".commentContainerModal").show();
        isRedirect = false;
        $(".userRedirectClaim").hide();
    } else {
        $(".commentContainerModal").hide();
        isRedirect = true;
        $(".userRedirectClaim").show();
    }
});

function clickDialogCommentClosestClaim(itemId, d, time, category, urgently, authId, discription, timegettask, fileId) {
    $(function () {
        $("#dialog-form-comment-claim").dialog({
            buttons: [
                {
                    text: "Отправить",
                    click: function () {
                        $("#loaderClaimOut").show();
                        if (isRedirect) {
                            clickCloseTask(itemId, d, time, category, urgently, authId, discription, timegettask, $("#commentModal").val(), fileId, isRedirect);
                        } else {
                            clickCloseTask(itemId, d, time, category, urgently, authId, discription, timegettask, $("#commentModal").val(), fileId);
                        }

                    }
                }
            ],
            title: 'Отправить Заявку: ',
            width: 600,
            modal: true,
            resizable: false
        });
    });
}


