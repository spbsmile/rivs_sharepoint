var MainPage;
(function (MainPage) {
    $(document).ready(function () {
        $('#currency').children('span').each(function (i) {
            if (i === 0) {
                $("#USDcurrency").text($(this).text());
            }
            else if (i === 1) {
                $("#EURcurrency").text($(this).text());
            } // flow currency
            else if (i === 2) {
                // usd
                var flowCurrency = $(this).text();
                if (flowCurrency === "down") {
                    $("#usd_top").hide();
                    $("#usd_down").show();
                }
                else {
                    $("#usd_top").show();
                    $("#usd_down").hide();
                }
            }
            else if (i === 3) {
                var flowCurrency = $(this).text();
                if (flowCurrency === "down") {
                    $("#eur_down").show();
                    $("#eur_top").hide();
                }
                else {
                    $("#eur_down").hide();
                    $("#eur_top").show();
                }
            }
        });
        var unicId = $('#currency').parent().attr('id');
        // weather
        var spb = $('#' + unicId + '_ctl00_spbDegreesDuplicat').text();
        var uchaly = $('#' + unicId + '_ctl00_uchalyDegrees').text();
        var kentay = $('#' + unicId + '_ctl00_kentayDegrees').text();
        var magn = $('#' + unicId + '_ctl00_magnitogorskDegrees').text();
        var erdenet = $('#' + unicId + '_ctl00_erdenetGegrees').text();
        var msc = $('#' + unicId + '_ctl00_mscDegrees').text();
        var erevan = $('#' + unicId + '_ctl00_erevanDegrees').text();
        var tachkent = $('#' + unicId + '_ctl00_tashkentDergrees').text();
        $("#spbIconDuplicat_View").addClass($('#' + unicId + '_ctl00_spbIconDuplicat').attr('class'));
        $("#spbDescriptionDuplicat_View").text($('#' + unicId + '_ctl00_spbDescriptionDuplicat').text());
        $("#spbDegreesDuplicat_View").text(spb);
        $("#uchalyWeatherIcon_View").addClass($('#' + unicId + '_ctl00_uchalyIcon').attr('class'));
        $("#uchalyWeatherDescription_View").text($('#' + unicId + '_ctl00_uchalyDescription').text());
        $("#uchalyWeatherDegrees_View").text(uchaly);
        $("#kentayWeatherIcon_View").addClass($('#' + unicId + '_ctl00_kentayIcon').attr('class'));
        $("#kentayWeatherDescription_View").text($('#' + unicId + '_ctl00_kentayDescription').text());
        $("#kentayWeatherDegrees_View").text(kentay);
        $("#magnitogorskWeatherIcon_View").addClass($('#' + unicId + '_ctl00_magnitogorskIcon').attr('class'));
        $("#magnitogorskWeatherDescription_View").text($('#' + unicId + '_ctl00_magnitogorskDescription').text());
        $("#magnitogorskWeatherDegrees_View").text(magn);
        // for modal window
        $("#modalWeatherSpbDescription").text($('#' + unicId + '_ctl00_spbDescriptionDuplicat').text());
        $("#modalWeatherSpbDegrees").text(spb);
        $("#modalWeatherUchalyDescription").text($('#' + unicId + '_ctl00_uchalyDescription').text());
        $("#modalWeatherUchalyDegrees").text(uchaly);
        $("#modalWeatherErdenetDescription").text($('#' + unicId + '_ctl00_erdenetDescription').text());
        $("#modalWeatherErdenetDegrees").text(erdenet);
        $("#modalWeatherMscDescription").text($('#' + unicId + '_ctl00_mscDescription').text());
        $("#modalWeatherMscDegrees").text(msc);
        $("#modalWeatherErevanDescription").text($('#' + unicId + '_ctl00_erevanDescription').text());
        $("#modalWeatherErevanDegrees").text(erevan);
        $("#modalWeatherTachkentDescription").text($('#' + unicId + '_ctl00_tashkentDescription').text());
        $("#modalWeatherTachkentDegress").text(tachkent);
        $("#modalWeatherKentayDescription").text($('#' + unicId + '_ctl00_kentayDescription').text());
        $("#modalWeatherKentayDegress").text(kentay);
        $("#modalWeatherMgnDescription").text($('#' + unicId + '_ctl00_magnitogorskDescription').text());
        $("#modalWeatherMgnDegrees").text(magn);
        $("#currency_widget").on('click', function () {
            window.location.href = "/Pages/currency.aspx";
        });
        $("#clickWeatherModal").on('click', function () {
            $("#modalWeather").modal('show');
        });
        defineWeatherIcon("#cell_weather_spb_image", $('#' + unicId + '_ctl00_spbDescriptionDuplicat').text());
        defineWeatherIcon("#cell_weather_uchaly_image", $('#' + unicId + '_ctl00_uchalyDescription').text());
        defineWeatherIcon("#cell_weather_magnitogorsk_image", $('#' + unicId + '_ctl00_magnitogorskDescription').text());
        defineWeatherIcon("#cell_weather_kentay_image", $('#' + unicId + '_ctl00_kentayDescription').text());
        // for modal window
        defineWeatherIcon("#modalWeatherSpbImage", $('#' + unicId + '_ctl00_spbDescriptionDuplicat').text());
        defineWeatherIcon("#modalWeatherUchalyImage", $('#' + unicId + '_ctl00_uchalyDescription').text());
        defineWeatherIcon("#modalWeatherMagnImage", $('#' + unicId + '_ctl00_magnitogorskDescription').text());
        defineWeatherIcon("#modalWeatherKentayImage", $('#' + unicId + '_ctl00_kentayDescription').text());
        defineWeatherIcon("#modalWeatherErdenetImage", $('#' + unicId + '_ctl00_erdenetDescription').text());
        defineWeatherIcon("#modalWeatherTachkentImage", $('#' + unicId + '_ctl00_tashkentDescription').text());
        defineWeatherIcon("#modalWeatherErevanImage", $('#' + unicId + '_ctl00_erevanDescription').text());
        defineWeatherIcon("#modalWeatherMscImage", $('#' + unicId + '_ctl00_mscDescription').text());
    });
    // ясно, пасмурно, легкий дождь, ясно, гроза// нет картинки тумана
    function defineWeatherIcon(childId, state) {
        var imagePostfix = null;
        var imageUrl = "/_layouts/15/CustomjsLibs/1.devsp/weather-icons/";
        if (state === "ясно") {
            imageUrl += "sun.png";
        }
        else if (state === "пасмурно") {
            imageUrl += "cloudy.png";
        }
        else if (state === "слегка облачно") {
            imageUrl += "part_cloudy.png";
        }
        else if (state === "облачно") {
            imageUrl += "cloudy.png";
        }
        else if (state === "гроза" || state === "гроза с мелким дождём") {
            imageUrl += "rain_w_thunder.png";
        }
        else if (state === "дождь" || state === "легкий дождь" || state === "проливной дождь") {
            imageUrl += "chance_of_rain.png";
        }
        else if (state === "снег") {
            imageUrl += "snow.png";
        }
        else if (state === "туманно" || state === "сыро") {
            imageUrl += "cloudy.png";
        }
        else if (state === "" || state === "Label" || state === "label") {
            imageUrl += "weather-offline.png";
        }
        $(childId).attr("src", imageUrl);
    }
})(MainPage || (MainPage = {}));
//# sourceMappingURL=weather_valutes.js.map