var CurrencyPage;
(function (CurrencyPage) {
    // helper function for page:http://intranet/Pages/currency.aspx, correct format date in input 
    $(document).ready(function () {
        $(function () {
            $('input[id*="dtDatePicker"]').datepicker({
                dateFormat: 'dd.mm.yy',
                maxDate: 0
            });
        });
    });
})(CurrencyPage || (CurrencyPage = {}));
//# sourceMappingURL=currencies_table.js.map