$(document).ready(function () {
	$(function () {
		$('input[id*="dtDatePicker"]').datepicker({
			dateFormat : 'dd.mm.yy',
			maxDate : 0
		});
	});
});
