namespace PrivatePage {

    var currentIterateMonth = null;    
    var shiftStartDate = null;      

    $(document).ready(function () {
        moment.tz.add("Europe/Moscow|MSK MSD MSK|-30 -40 -40|01020|1BWn0 1qM0 WM0 8Hz0|16e6");
        moment.locale(window.navigator.userLanguage || window.navigator.language);
        setCurrentMonthView();

        var currentMonth = parseInt(moment().format('M')) - 1;
        //for next/prev month
        currentIterateMonth = currentMonth;
        // number first day week of month //http://stackoverflow.com/questions/26131003/moment-js-start-and-end-of-given-month
        shiftStartDate = moment([moment().format('YYYY'), currentMonth]).weekday();
        setCellCalendar(shiftStartDate, currentMonth);

      
        //icon current day
        $("#cell_" + (parseInt(moment().format('D')) + shiftStartDate - 1)).addClass('day_current');        

        $("#btnPrevMonth").click(function () {
            currentIterateMonth--;
            var shiftStartDate = moment([moment().format('YYYY'), currentIterateMonth]).weekday();            

            setCellCalendar(shiftStartDate, currentIterateMonth);
            setMonthViewForIterate(currentIterateMonth);
            return false;
        });

        $("#btnNextMonth").click(function () {
            currentIterateMonth++;
            var shiftStartDate = moment([moment().format('YYYY'), currentIterateMonth]).weekday();          

            setCellCalendar(shiftStartDate, currentIterateMonth);
            setMonthViewForIterate(currentIterateMonth);
            return false;
        });
    });

    function setMonthViewForIterate(indexMonth) {        
        if (indexMonth === parseInt(moment().format('M')) - 1) {
            setCurrentMonthView();            
        } else {
            $('#DayNow').html(moment(new Date(moment().format('YYYY'), indexMonth, 04)).format("MMMM") + " <br>" + moment(new Date(moment().format('YYYY'), indexMonth, 04)).format('YYYY'));
        }
    }

    function setCurrentMonthView() {
        $('#DayNow').html(moment().format("MMMM") + " <br>" + moment().format('YYYY'));
    }    

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 

    function setCellCalendar(shift, currentMonth) {
        var prevMonth = (currentMonth - 1);
        var t = shift - 1;
        var prevMonthDayValue = moment(moment([moment().format('YYYY'), prevMonth])).daysInMonth();
        for (var i = t; i >= 0; i--) {
            var id = "#cell_" + i;
            $(id).text(prevMonthDayValue);
            prevMonthDayValue--;
            $(id).addClass('prev-month');
        }

        var interval = shift + moment(moment([moment().format('YYYY'), currentMonth])).daysInMonth();
        var currentMonthDayValue = 1;
        var lastCellIndex = 0;

        for (var i = shift; i < interval; i++) {
            var id = "#cell_" + i;
            lastCellIndex = i;
            $(id).text(currentMonthDayValue++);
        }

        var nextMonthDayValue = 1;
        for (var i = (lastCellIndex + 1); i <= 41; i++) {
            var id = "#cell_" + i;
            $(id).text(nextMonthDayValue++);
            $(id).addClass('next-month');
        }
    }    

    // Function to handle the error event.
    // Prints the error message to the page.
    function errorHandler(data, errorCode, errorMessage) {
        document.getElementById("internal").innerText =
            "Could not complete cross-domain call: " + errorMessage;
    }
}