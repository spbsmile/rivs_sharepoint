namespace MainPage {

    /** index of month for next/prev month, for iterations */
    var currentIterateMonth = null;
    /** storage of data employees, initialize in ajax call */
    var employeesData = null;
    /** define how day number of week current month started, used for search started cell in calendar */
    var shiftStartDateCurrentMonth = null;
    const thresholdCountDaysHireEmployees = 7;
    const countCellInCalendar = 41;

    $(document).ready(function () {
        // initialize moment.js library
        moment.tz.add("Europe/Moscow|MSK MSD MSK|-30 -40 -40|01020|1BWn0 1qM0 WM0 8Hz0|16e6");
        moment.locale(window.navigator.userLanguage || window.navigator.language);

        currentIterateMonth = getIndexCurrentMonth();
        setMonthView(currentIterateMonth);
        // number first day week of month //http://stackoverflow.com/questions/26131003/moment-js-start-and-end-of-given-month
        shiftStartDateCurrentMonth = moment([moment().format('YYYY'), currentIterateMonth]).weekday();
        // initialize calendar value days
        setCellCalendar(shiftStartDateCurrentMonth, currentIterateMonth);

        //add red frame icon current day
        $("#cell_" + (parseInt(moment().format('D')) + shiftStartDateCurrentMonth - 1)).addClass('day_current');

        // click on prev month button 
        $("#btnPrevMonth").click(function () {
            currentIterateMonth--;
            var shiftStartDate = moment([moment().format('YYYY'), currentIterateMonth]).weekday();

            addBirthdayIcons(getIndexMonthForBirthday(currentIterateMonth), shiftStartDate);
            setCellCalendar(shiftStartDate, currentIterateMonth);
            setMonthView(currentIterateMonth);
            return false;
        });

        // click on next month button
        $("#btnNextMonth").click(function () {
            currentIterateMonth++;
            var shiftStartDate = moment([moment().format('YYYY'), currentIterateMonth]).weekday();

            addBirthdayIcons(getIndexMonthForBirthday(currentIterateMonth), shiftStartDate);
            setCellCalendar(shiftStartDate, currentIterateMonth);
            setMonthView(currentIterateMonth);
            return false;
        });

        // fetch all users
        $.ajax({
            url: "/_api/search/query?querytext='*'&trimduplicates=false&enablequeryrules=false&rowlimit=600&bypassresulttypes=true&selectproperties='Title%2cJobTitle%2cDepartment%2cBirthday%2cPictureURL%2chireDate%2cOrganization%2cIsDisabled'&sourceid='b09a7990-05ea-4af9-81ef-edfab16c4e31'&clienttype='ContentSearchRegular'",
            method: "GET",
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data) {
                var congratsBirthdayInit = false;
                var newEmploeeInit = false;
                employeesData = data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;

                var startPointDateHireEmployees = moment().day(-thresholdCountDaysHireEmployees).format("YYYY-MM-DD");

                // iterate of all users
                for (var i = 0; i < employeesData.length; i++) {
                    var name = employeesData[i].Cells.results[2].Value;
                    var job = employeesData[i].Cells.results[3].Value;
                    if (job) {
                        var lines = job.split(/\r\n|\r|\n/g);
                        job = lines[0];
                    }
                    var department = employeesData[i].Cells.results[4].Value;
                    var birthday = employeesData[i].Cells.results[5].Value;
                    var pictureUrl = employeesData[i].Cells.results[6].Value;
                    var hireDate = employeesData[i].Cells.results[7].Value;
                    var organization = employeesData[i].Cells.results[8].Value;                    

                     // when user disabled
                    if (employeesData[i].Cells.results[9].Value) {
                        continue;
                    }

                    // define new hire users/ create widgets of new hire users
                    if (moment(hireDate).isAfter(startPointDateHireEmployees) && department != "Комнаты переговоров") {
                        if (!newEmploeeInit) {
                            $("#newEmployee_block").append('<h1> Новые Сотрудники </h1>');
                            newEmploeeInit = true;
                        }
                        displayWidgetEmployee("#newEmployee_block", name, job, department, pictureUrl, organization);
                    }

                    //filter users by it's birthday == current month/ create widgets today birthday users
                    if (moment(birthday, 'DD.MM.YYYY').isValid() && moment(birthday, 'DD.MM.YYYY').month() === moment().month()) {
                        var numberDayBirthday = moment(birthday, 'DD.MM.YYYY').format('D');
                        var indexCell = (parseInt(numberDayBirthday) + shiftStartDateCurrentMonth - 1);

                        //it's id of div element 'birthday cell of calendar'
                        var id = "#cell_" + indexCell;
                        // congrat today birthdays
                        if (moment().format('D') === numberDayBirthday) {
                            if (!congratsBirthdayInit) {
                                $("#birthday_block").append('<h1> Поздравляем! </h1>');
                                congratsBirthdayInit = true;
                            }
                            $(id).addClass('birthday_current');
                            displayWidgetEmployee("#birthday_block", name, job, department, pictureUrl, organization);
                        }
                        $(id).addClass('birthday');
                        var prevName = $(id).prop("title") && $(id).prop("title").split(':')[1] ? ", " + $(id).prop("title").split(':')[1] : " ";
                        $(id).attr('title', 'День Рождения: ' + name + prevName);
                    }
                }
                if (!congratsBirthdayInit) {
                    $(".calendar-container").css('margin-top', '40px');
                }
            },
            error: errorHandler
        });
    });

    /**  invoke for each change month*/
    function addBirthdayIcons(iterateMonth, shiftStartDate) {
        // clear all cells
        for (var i = 0; i <= 41; i++) {
            var id = "#cell_" + i;
            $(id).text("");
            $(id).removeClass();
            $(id).removeAttr("title");
        }

        if (iterateMonth === getIndexCurrentMonth()) {
            $("#cell_" + (parseInt(moment().format('D')) + shiftStartDate - 1)).addClass('day_current');
        }

        var isTodayBirthday = false;
        // loop of all users
        for (var i = 0; i < employeesData.length; i++) {

            var birthday = employeesData[i].Cells.results[5].Value;
            //filter birthday field of current month   
            if (moment(birthday, 'DD.MM.YYYY').isValid() && moment(birthday, 'DD.MM.YYYY').month() === iterateMonth) {
                var name = employeesData[i].Cells.results[2].Value;
                var numberDayBirthday = moment(birthday, 'DD.MM.YYYY').format('D');
                var indexCell = (parseInt(numberDayBirthday) + shiftStartDate - 1);
                // birthday cell of calendar
                var id = "#cell_" + indexCell;
                // congrat today birthdays
                if (moment().format('D') === numberDayBirthday) {
                    $(id).addClass('birthday_current');
                    isTodayBirthday = true;
                }
                $(id).addClass('birthday');
                var prevName = $(id).prop("title") && $(id).prop("title").split(':')[1] ? ", " + $(id).prop("title").split(':')[1] : " ";
                $(id).attr('title', 'День Рождения: ' + name + prevName);
            }
        }
        if (!isTodayBirthday) {
            $(".calendar-container").css('margin-top', '40px');
        }
    }

    /** set value (number of days) to calendar for currentMonth*/
    function setCellCalendar(shift, currentMonth) {
        var prevMonth = (currentMonth - 1);
        var shiftPrevMonth = shift - 1;
        var prevMonthDayValue = moment(moment([moment().format('YYYY'), prevMonth])).daysInMonth();
        // loop for prev month
        for (var i = shiftPrevMonth; i >= 0; i--) {
            var id = "#cell_" + i;
            $(id).text(prevMonthDayValue);
            prevMonthDayValue--;
            $(id).addClass('prev-month');
        }

        var interval = shift + moment(moment([moment().format('YYYY'), currentMonth])).daysInMonth();
        var currentMonthDayValue = 1;
        var lastCellIndex = 0;

        //loop for current month
        for (var j = shift; j < interval; j++) {
            var id = "#cell_" + j;
            lastCellIndex = j;
            $(id).text(currentMonthDayValue++);
        }

        var nextMonthDayValue = 1;
        // loop for next month
        for (var i = (lastCellIndex + 1); i <= countCellInCalendar; i++) {
            var id = "#cell_" + i;
            $(id).text(nextMonthDayValue++);
            $(id).addClass('next-month');
        }
    }

    /** dynamically create widget user, containerId - it's id div element, where will append widget, may be left side or right side */
    function displayWidgetEmployee(containerId, name, jobTitle, department, photo, organization) {
        var photoImprove = photo ? photo.replace(/ /g, '%20') : "/_layouts/15/CustomjsLibs/1.devsp/noPhoto.jpg";
        var departmentImprove = department ? department : "_";
        departmentImprove = organization ? organization : departmentImprove;

        var fio = name.split(" ");
        $(containerId).append('<div class="employeeRow"> <div class="employeeCell"> <div class="wrap_employeeCell "> ' +
            ' <a class="thumbnailMainPage"> <img src=' + photoImprove + '>' + '</a>' +
            '<h2 class="title_name">' +
            '<p>' + fio[0] + '<br>' + fio[1] + '<br>' + fio[2] + '</p> </h2> ' +
            '<div class="empl_jobs_title"> <span class="department_inwidget"> ' + departmentImprove + '</br> </span>' +
            '<span class="jobTitle_inwidget"> ' + jobTitle + ' </span> </div></div></div>'
        );
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    /** helper function for modulate currentIterateMonth of 12 */
    function getIndexMonthForBirthday(currentIterateMonth) {
        if (currentIterateMonth >= 12) {
            return currentIterateMonth - 12;
        } else if (currentIterateMonth <= 0) {
            return currentIterateMonth + 12;
        } else {
            return currentIterateMonth;
        }
    }

    /** date in header calendar */
    function setMonthView(indexMonth) {
        if (indexMonth === getIndexCurrentMonth()) {
            $('#DayNow').html(moment().format("MMMM") + " <br>" + moment().format('YYYY'));
        } else {
            $('#DayNow').html(moment(new Date(moment().format('YYYY'), indexMonth, 04)).format("MMMM") + " <br>" + moment(new Date(moment().format('YYYY'), indexMonth, 04)).format('YYYY'));
        }
    }

    function getIndexCurrentMonth() {
        return parseInt(moment().format('M')) - 1;
    }


    // Function to handle the error event.
    // Prints the error message to the page.
    function errorHandler(data, errorCode, errorMessage) {
        document.getElementById("internal").innerText =
            "Could not complete cross-domain call: " + errorMessage;
    }
}

