function clickDialogGetOut() {    
    $(function () {
        $("#give_task").dialog({
            open: function(type,data) {
					$(this).parent().appendTo("form");
			},  
            title: 'Выдать Задачу: ',
            width: 600,
            modal: true,
            resizable: false
        });
    });
}