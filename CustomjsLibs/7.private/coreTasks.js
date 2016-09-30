$(document).ready(function () {
    /* handlers on  */
    $("#btn_alltask_asign").click(function () {
        appendTable(this);
    });
    $("#btn_alltask_running").click(function () {
        appendTable(this);
    });
    $("#btn_alltask_expiration").click(function () {
        appendTable(this);
    });
    $("#btn_control_running").click(function () {
        appendTable(this);
    });
    $("#btn_control_expiration").click(function () {
        appendTable(this);
    });
    $("#btn_mytask_asign").click(function () {
        appendTable(this);
    });
    $("#btn_mytask_running").click(function () {
        appendTable(this);
    });
    $("#btn_mytask_expiration").click(function () {
        appendTable(this);
    });

    $("#btn_focus_asign").click(function () {
        appendTable(this);
    });
    $("#btn_focus_running").click(function () {
        appendTable(this);
    });
    $("#btn_focus_expiration").click(function () {
        appendTable(this);
    });

    // handlers on icon
    $("#iconAllTask").click(function () {
        console.log("hello task");
    });

    $("#iconControl").click(function () {
        console.log("hello task");
    });

    $("#iconMyTask").click(function () {
        console.log("hello task");
    });

    $("#iconFocusTask").click(function () {
        console.log("hello task");
    });

    /* handler on btn_back */
    $(".btn_back").click(function () {
        $(".taskBlock").show();
        $(".table_task").hide();
        $(".btn_back").hide();
    });


    $(".lineTable").click(function () {
        console.log("hello click table cell");

        var opt = {
            autoOpen: false,
            modal: true,
            width: 550,
            height: 650,
            title: 'Описание задачи'
        };

        $("#display_task").dialog(opt).dialog("open");
    });

    /* handler on btn_get_out*/
    $(".btn_taskout").click(function () {
        clickDialogGetOut();
    });
    function appendTable(obj) {
        $(".panel-title").text($(obj).parent().parent().find(".titleTask").text() + ": " + $(obj).text());
        // $(".taskBlock").hide();
        $(".table_task").show();
        //$(".btn_back").show();
    }
});
