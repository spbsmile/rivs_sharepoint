$(document).ready(function () {
    /* handlers on  */
    $("#btn_alltask_asign").click(function () {
        var titleTask = $(this).find(".titleTask").text();
        console.log(titleTask + " titleTask");
        var titleName = $(this).find(".title_name span").text();
        console.log(titleName + " titleName");
        appendTable("ВСЕ ЗАДАЧИ: НАЗНАЧЕНО");
    });
    $("#btn_alltask_running").click(function () {
        appendTable("ВСЕ ЗАДАЧИ: ВЫПОЛНЯЮТСЯ");
    });
    $("#btn_alltask_expiration").click(function () {
        appendTable("ВСЕ ЗАДАЧИ: ПРОСРОЧЕНЫ");
    });
    $("#btn_control_running").click(function () {
        appendTable("НА КОНТРОЛЕ: ВЫПОЛЯНЮТСЯ");
    });
    $("#btn_control_expiration").click(function () {
        appendTable("");
    });
    $("#btn_mytask_asign").click(function () {
        appendTable("");
    });
    $("#btn_mytask_running").click(function () {
        appendTable("");
    });
    $("#btn_mytask_expiration").click(function () {
        $(".taskBlock").hide();
        appendTable("");
    });
    /* handler on btn_back */
    $(".btn_back").click(function () {
        $(".taskBlock").show();
        $(".table_task").hide();
        $(".btn_back").hide();
    });
    $("input[name='userTarget']").pickSPUser({
        onPickUser: function (personObj) {
            $("#userTarget").next().find(".pt-pickSPUser-input").hide();
        },
        onRemoveUser: function ($input, $ui, personObj) {
            $("#userTarget").next().find(".pt-pickSPUser-input").show();
        },
        filterSuggestions: function (suggestions) {
            var newSuggestions = [];
            var prevEmail = null;
            $.each(suggestions, function (i, userInfo) {
                if (prevEmail === userInfo.email)
                    return true;
                prevEmail = userInfo.email;
                newSuggestions.push(userInfo);
            });
            return newSuggestions;
        }
    });
    /* handler on btn_get_out*/
    $(".btn_taskout").click(function () {
        clickDialogGetOut();
    });
    function appendTable(tableName) {
        $(".panel-title").text();
        $(".taskBlock").hide();
        $(".table_task").show();
        $(".btn_back").show();
    }
});
//# sourceMappingURL==coreTasks.js.map