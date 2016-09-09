$(document).ready(function () {
    /* handlers on  */
    $("#btn_alltask_asign").click(function () {        
        appendTable();
    });

    $("#btn_alltask_running").click(function () {        
        appendTable();
    });

    $("#btn_alltask_expiration").click(function () {        
        appendTable();
    });

    $("#btn_control_running").click(function () {        
        appendTable();
    });

    $("#btn_control_expiration").click(function () {        
        appendTable();
    });

    $("#btn_mytask_asign").click(function () {        
        appendTable();
    });

    $("#btn_mytask_running").click(function () {        
        appendTable();
    });

    $("#btn_mytask_expiration").click(function () {
        $(".taskBlock").hide();
        appendTable();
    });

    /* handler on btn_back */
    $(".btn_back").click(function(){
        $(".taskBlock").show();
        $(".table_task").hide();
        $(".btn_back").hide();
    });

    function appendTable(){
        $(".taskBlock").hide();
        $(".table_task").show();
        $(".btn_back").show();
    }
});