var SiteHeader;
(function (SiteHeader) {
    $(document).ready(function () {
        if (!moment.tz)
            return;
        moment.locale(window.navigator.userLanguage || window.navigator.language);
        moment.tz.add("Europe/Moscow|MSK MSD MSK|-30 -40 -40|01020|1BWn0 1qM0 WM0 8Hz0|16e6");
        moment.tz.add("Asia/Yekaterinburg|LMT PMT SVET SVET SVEST SVEST YEKT YEKST YEKT|-42.x -3J.5 -40 -50 -60 -50 -50 -60 -60|0123434343434343434343435267676767676767676767676767676767676767686|-2ag42.x 7mQh.s qBvJ.5 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|14e5");
        moment.tz.add("Asia/Almaty|LMT +05 +06 +07|-57.M -50 -60 -70|012323232323232323232321232323232323232323232323232|-1Pc57.M eUo7.M 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0|15e5");
        initAllClock();
        setInterval(initAllClock, 60000);
        var minutesClass = "minutes-container";
        $("." + minutesClass).show();
        $("." + minutesClass).hide();
        $("." + minutesClass).show();
        var hourClass = "hours-container";
        $("." + hourClass).show();
        $("." + hourClass).hide();
        $("." + hourClass).show();
        var currentDate = moment().format("D MMMM").toString();
        var array = currentDate.split(" ");
        $('.dateline').html(moment().format("D") + "&nbsp" + array[1] + "&nbsp" + "2016" + ", " +
            capitalizeFirstLetter(moment().format('dddd')));
    });
    function initAllClock() {
        initLocalClocks("Europe/Moscow", "spb");
        initLocalClocks("Asia/Yekaterinburg", "yek");
        initLocalClocks("Asia/Almaty", "asia");
    }
    function initLocalClocks(timezone, initialId) {
        var minutes = moment().tz(timezone).format('m');
        var hours = moment().tz(timezone).format('H');
        // Create an object with each hand and it's angle in degrees
        var hands = [{
                hand: 'hours',
                angle: (hours * 30) + (minutes / 2)
            }, {
                hand: 'minutes',
                angle: (minutes * 6)
            }
        ];
        // Loop through each of these hands to set their angle
        for (var j = 0; j < hands.length; j++) {
            var elements = document.getElementById(initialId + "_" + hands[j].hand);
            if (elements) {
                elements.style.webkitTransform = 'rotateZ(' + hands[j].angle + 'deg)';
                elements.style.transform = 'rotateZ(' + hands[j].angle + 'deg)';
            }
        }
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
})(SiteHeader || (SiteHeader = {}));
//# sourceMappingURL=initClocks.js.map