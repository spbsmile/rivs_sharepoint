$(document).ready(function () {

    function startSearch(query, organization, isMainSearch, isHaveOtdels, additionalEmployees, isInputSearch) {
        $.ajax({
            url: getUrlQuerySearch(query, "Title%2cJobTitle%2cWorkemail%2cPath%2cWorkPhone%2cDepartment%2cPictureURL%2cOrganizationLong%2cIsDisabled%2cRefinableString01", 100, true, isInputSearch),
            method: "GET",
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data) {
                var rowId = null;
                var results = data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;
                var indexRow = null;
                var innerShift = 1;
                var innerIndex = 0;

                function createWidgetEmployeeWithNewRow(data, indexRow) {
                    var rowId = "row_empl_" + indexRow;
                    $("#employeeBlock").append('<div id="' + rowId + '" class="employeeRow">' +
                        createWidgetEmployee(data.photo, data.name, data.department, data.jobTitle, data.email, data.phone) +
                        '</div>');
                    return "#" + rowId;
                }

                for (var i = 0; i < results.length; i++) {
                    var d = getData(results[i]);

                    if (d.isdisabled) {
                        continue;
                    }

                    var otdel = clearLetter(d.otdel);
                    var department = clearLetter(d.department);

                    // filter of common search query
                    if (organization) {
                        var organizationTrim = organization.trim();
                        if (isMainSearch && otdel && organizationTrim != otdel) {
                            continue;
                        }
                        if (isMainSearch && department && organizationTrim != department) {
                            continue;
                        }
                        if (!isMainSearch && organizationTrim != otdel) {
                            continue;
                        }
                    }
                    if (isMainSearch && otdel && otdel != department) {
                        continue;
                    }

                    if (innerIndex === 0 && !isHaveOtdels) {
                        if (d.postalCode && d.department != "Коммерческий отдел" && d.department != "Департамент административного управления") {
                            $("#chief_widget").append(
                                createWidgetEmployee(d.photo, d.name, d.department, d.jobTitle, d.email, d.phone));
                        } else {
                            innerShift = 0;
                            indexRow = Math.floor((innerIndex - innerShift) / countWidgetsInRow);
                            rowId = createWidgetEmployeeWithNewRow(d, indexRow);
                        }
                    } else {
                        if (indexRow != Math.floor((innerIndex - innerShift) / countWidgetsInRow)) {
                            indexRow = Math.floor((innerIndex - innerShift) / countWidgetsInRow);
                            rowId = createWidgetEmployeeWithNewRow(d, indexRow);
                        } else {
                            $(rowId).append(
                                createWidgetEmployee(d.photo, d.name, d.department, d.jobTitle, d.email, d.phone));
                        }
                    }
                    innerIndex++;
                }

                if (additionalEmployees && additionalEmployees.length > 0 && additionalEmployees[0] != " " && additionalEmployees[0]) {
                    for (var j = 0; j < additionalEmployees.length - 1; j++) {
                        var employeeData = additionalEmployees[j].split(",");
                        if (indexRow != Math.floor((innerIndex - innerShift) / countWidgetsInRow)) {
                            indexRow = Math.floor((innerIndex - innerShift) / countWidgetsInRow);
                            rowId = "row_empl_" + indexRow;
                            $("#employeeBlock").append('<div id="' + "row_empl_" + indexRow + '" class="employeeRow">' +
                                createWidgetEmployee(employeeData[0], employeeData[1], employeeData[2], employeeData[3], employeeData[4], employeeData[5]) +
                                '</div>');
                            rowId = "#" + rowId;
                            //todo: temp hack, refactor this
                        } else if (employeeData[1] == "Нестеров Петр Олегович") {
                            $("#chief_widget").append(
                                createWidgetEmployee(employeeData[0], employeeData[1], "Коммерческий отдел", "Коммерческий директор", employeeData[4], employeeData[5]));
                        } else if (employeeData[1] == "Лигузов Алексей Дмитриевич") {
                            $("#chief_widget").append(
                                createWidgetEmployee(employeeData[0], employeeData[1], "Департамент административного управления", "Заместитель генерального директора. Директор Департамента АУ", employeeData[4], employeeData[5]));
                        }
                        else {
                            $(rowId).append(
                                createWidgetEmployee(employeeData[0], employeeData[1], employeeData[2], employeeData[3], employeeData[4], employeeData[5]));
                        }
                        innerIndex++;
                    }
                }
                // stub for last row
                while (indexRow === Math.floor((innerIndex - innerShift) / countWidgetsInRow)) {
                    innerIndex++;
                    $(rowId).append(
                        createWidgetEmployee("#", null, null, null, null, null, true));
                }
            },
            error: errorHandler
        });
    }
});