/// <reference path="../2.employee/departmentSortManager.ts" />
/// <reference path="../2.employee/search.ts" />

/** used for breadcrumbs */
var additionalEmployeesCurrent;
/** used for breadcrumbs */
var organizationCurrent;
/** dictionary hierarchy */
var departmentsTree = {};

const countWidgetsInRow = 3;

$(document).ready(function () {   

    // start create main page    
    $("#loaderEmployeePage").show();
    $.ajax({
        url: getRestUrl('*', "Department%2cOrganizationLong%2cIsDisabled%2cotdel2%2cTitle", 600, false),
        method: "GET",
        headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            var results = data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;

            // write data employess to object 'departmentsTree', iterate of all users 
            for (var i = 0; i < results.length; i++) {
                var department = results[i].Cells.results[2].Value;
                var otdel = clearLetter(results[i].Cells.results[3].Value);
                var isDisabled = results[i].Cells.results[4].Value;
                // otdel2 - it's field define sencond department/otdel of employee. example: Zimina/Bondarenko in Owners  
                var otdel2 = results[i].Cells.results[5].Value;

                if (department && !isDisabled) {
                    // check on hierarchy otdel				
                    if (otdel && otdel != department) {
                        if (!departmentsTree.hasOwnProperty(otdel)) {
                            departmentsTree[otdel] = [];
                            departmentsTree[otdel].push(department);
                        } else if (departmentsTree[otdel].indexOf(department) == -1) {
                            // example: otdel = ГипроРИВС, department = Руководство						
                            departmentsTree[otdel].push(department);
                        }
                    } else if (!departmentsTree.hasOwnProperty(department)) {
                        departmentsTree[department] = [];
                    }
                    if (otdel2) {
                        if (!departmentsTree.hasOwnProperty(otdel2)) {
                            departmentsTree[otdel2] = [];
                            if (!departmentsTree[otdel2].hasOwnProperty("additionalEmployess")) {
                                departmentsTree[otdel2].additionalEmployess = [];
                            }
                            departmentsTree[otdel2].additionalEmployess.push(results[i].Cells.results[6].Value);
                        } else {
                            if (!departmentsTree[otdel2].hasOwnProperty("additionalEmployess")) {
                                departmentsTree[otdel2].additionalEmployess = [];
                            }
                            departmentsTree[otdel2].additionalEmployess.push(results[i].Cells.results[6].Value);
                        }
                    }
                }
            }

            $("#loaderEmployeePage").hide();

            /** added for id of additionalEmployee */
            var index = 0;
            // create widgets departments
            for (var name in sortDepartmentsTree(departmentsTree)) {
                if (index === 0) {
                    createWidgetDepartment("#container_widget_departments", "widget_departament owner", name, "additionalEmployee_" + index);
                } else {
                    createWidgetDepartment("#container_widget_departments", "widget_departament departament_row", name, "additionalEmployee_" + index);
                }
                index++;
            }

            //  handlers on click widget of main page
            $(".widget_departament").on('click', function () {
                var organization = $(this).children('.title_inner').text();
                var dataAdditionalEmployee = $(this).children('.additionalEmployee').text().split('|');

                prepareSearch();
                addBreadcrumb(organization);
                organizationCurrent = organization;
                additionalEmployeesCurrent = dataAdditionalEmployee;
                var isHasOtdels = false;
                var otdels = $(this).children('.containerOtdels').text().split(',');
                if (otdels && otdels.length > 0 && otdels[0] != " " && otdels[0] && otdels[0].trim() != 'Машзавод "РИВС"') {
                    createWidgetsOtdels(organization, otdels);
                    isHasOtdels = true;
                    addBreadcrumbHandler();
                }
                startSearch(organization, organization, true, isHasOtdels, dataAdditionalEmployee);
            });
        },
        error: errorHandler
    });
    // end create main page

    // search input handler
    $("#btnMainSearch").click(function () {
        var query = $("#textarea_mainsearch_client").val();
        clearBreadcrumbs();
        $("#textarea_mainsearch_client").val('');
        prepareSearch();
        startSearch(query, "", false, false);
        $("#breadcrumbs_group").append('<a href="#" class="btn btn-default">' + "Поиск: " + query + '\</a>');
    });

    // keypart enter handler
    $("#mainsearch_client").keypress(function (e) {
        var query = $("#textarea_mainsearch_client").val();
        query = query.trim();
        if (e.which == 13 && query && query.length > 1) {
            clearBreadcrumbs();
            $("#textarea_mainsearch_client").val('');
            $("#textarea_mainsearch_client").attr('rows', 1);
            prepareSearch();
            startSearch(query, "", false, false, null, true);
            $("#breadcrumbs_group").append('<a href="#" class="btn btn-default">' + "Поиск: " + query + '\</a>');
        }
    });

    // breadcrumbs handlers
    $("#breadcrumbs_employee").on('click', function () {
        $("#container_widget_departments").show();
        $("#container_employee_department").hide();
        $("#breadcrumbs_container").hide();
        $(".right_column").show();
        $(".left_column").show();
        clearBreadcrumbs();
    });
});

function clickBreadcrumbMiddleLevel() {
    clearBreadcrumbs();
    addBreadcrumb(organizationCurrent);
    addBreadcrumbHandler();
    prepareSearch();
    startSearch(organizationCurrent, organizationCurrent, true, true, additionalEmployeesCurrent);

    var key = organizationCurrent.trim();
    if (departmentsTree[key]) {
        createWidgetsOtdels(key, departmentsTree[key]);
    }
}

function addBreadcrumbHandler() {
    $('.breadcrumbMiddleLevel').on('click', clickBreadcrumbMiddleLevel);
}

function addBreadcrumb(nameBreadcrumb) {
    $("#breadcrumbs_group").append('<a href="#" class="btn btn-default breadcrumbMiddleLevel">' + nameBreadcrumb + '\</a>');
}

function clearBreadcrumbs() {
    $('#breadcrumbs_group').children('a').each(function (i) {
        if (i > 0) {
            $(this).remove();
        }
    });
}

/** for: giprorivs, urals, mash factory ... */
function createWidgetsOtdels(organization, otdels) {
    var initialIndex = 0;
    otdels[0] = otdels[0].trim();
    var index = otdels.indexOf("Руководство");
    if (index < 0) {
        index = otdels.indexOf("Управление");
    }
    if (index < 0) {
        index = otdels.indexOf("Дирекция");
    }
    if (index != -1) {
        var temp = otdels[0];
        otdels[0] = otdels[index];
        otdels[index] = temp;
        createWidgetDepartment("#chief_widget", "widget_organization_inner owner", otdels[0]);
        initialIndex++;
    }
    for (var i = initialIndex; i < otdels.length; i++) {
        if (clearLetter(otdels[i]) === organization) {
            continue;
        }
        createWidgetDepartment("#employeeBlock", "widget_organization_inner departament_row", otdels[i]);
    }
    //  handlers of click widget otdels on inner page
    $(".widget_organization_inner").on('click', function () {
        // todo apply filter: only relative organization
        var otdel = $(this).children('.title_inner').text();
        prepareSearch();
        startSearch(otdel, organization, false, false);
        $("#breadcrumbs_group").append('<a href="#" class="btn btn-default">' + otdel + '\</a>');
    });
}

/** before search clear all previos search results */
function prepareSearch() {
    $("#container_widget_departments").hide();
    $("#container_employee_department").show();
    $(".right_column").hide();
    $(".left_column").hide();
    $("#breadcrumbs_container").show();
    $("#employeeBlock").empty();
    $("#chief_widget").empty();
}

function createWidgetEmployee(photo, name, department, jobTitle, email, phone, isStub) {
    var styleStub = isStub ? "style='display: none;'" : "";
    var widget =
        "<div class='employeeCell_widget'>" +
        "<div class='wrap_employeeCell_widget'" + styleStub + ">" +
        '<div class="col-xs-6 col-md-3 left_column_personal_widget"><a class="thumbnail"><img class="iconperson" src="' + photo + '" alt="" ></a></div>' +
        '<div class="right_column_personal_widget">' +
        '<p><strong>' + name + '</strong></p> ' +
        '<p>' + department + '</p> ' +
        '<p>' + jobTitle + '</p>' +
        '<p><i class="fa fa-envelope"></i> &nbsp;<a  href="mailto:' + email + '"> ' + email + '</a></p>' +
        '<p><i class="fa fa-phone"></i> &nbsp;<a  href="tel:+' + phone + '"> ' + phone + '</a></p>' +
        // '<p><i class="fa fa-external-link"></i>  &nbsp;<a  href="' + results[i].Cells.results[5].Value + '">Страница сотрудника</a></p>' +
        '</div></div></div>';
    return widget;
}

/** create widget of otdel or department, idContainer - chief or employeeBlock container */
function createWidgetDepartment(idContainer, cssClassWidget, name, idAdditionalEmployee) {
    var contentForWidgetOnMainPage = idAdditionalEmployee ? '<div class="containerOtdels"> ' + departmentsTree[name] + '</div>' +
        '<div id="' + idAdditionalEmployee + '" class="additionalEmployee"> </div></div>' : "";

    $(idContainer).append(
        '<div class="' + cssClassWidget + '">' +
        '<div class="title_inner"> ' + name + '</div>' + contentForWidgetOnMainPage);

    if (idAdditionalEmployee && departmentsTree[name] && departmentsTree[name].hasOwnProperty("additionalEmployess")) {
        var names = departmentsTree[name].additionalEmployess;
        var id = "#" + idAdditionalEmployee;
        for (var i = 0; i <= names.length; i++) {
            getOnePersonFromSearch(names[i], id);
        }
    }
}

/** used for additional users */
function getOnePersonFromSearch(personName, idStorage) {
    $.ajax({
        url: getRestUrl(personName, "Title%2cJobTitle%2cWorkemail%2cPath%2cWorkPhone%2cDepartment%2cPictureURL%2cOrganizationLong%2cIsDisabled%2cRefinableString01%2cCountryCode", 1, true),
        method: "GET",
        headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            var results = data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;

            var array = [];
            for (var i = 0; i < results.length; i++) {
                var d = getData(results[i]);
                array[0] = d.photo;
                array[1] = d.name;
                array[2] = d.department;
                array[3] = d.jobTitle.replace(",", ".");
                array[4] = d.email;
                array[5] = d.phone;
                array[6] = d.otdel;
                array[7] = d.postalCode;
                array[8] = d.countryCode;
                array[9] = "|";

                $(idStorage).text(array + $(idStorage).text());
            }
        },
        error: errorHandler
    });
}

/** constructor of rest url */
function getRestUrl(query, selectproperties, rowlimit, isSortList, isInputSearch) {
    var textWithWildcard = isInputSearch ? query + "*" : query;

    var sortList = isSortList ? "&sortlist='RefinableString01:ascending%2cRefinableString02:ascending'" : "";
    var url =
        "/_api/search/query?querytext='" + encodeURIComponent(textWithWildcard) + "'" +
        "&trimduplicates=false&rowlimit='" + rowlimit + "'" +
        sortList +
        "&bypassresulttypes=true" +
        "&enablequeryrules=false" +
        "&selectproperties='" + selectproperties + "'" +
        "&sourceid='b09a7990-05ea-4af9-81ef-edfab16c4e31'&clienttype='ContentSearchRegular'";
    return url;
}

/** wraper-helper function for get data of rest result*/
function getData(result) {
    var module = [];
    module.name = result.Cells.results[2].Value;
    module.jobTitle = result.Cells.results[3].Value ? result.Cells.results[3].Value : "_";
    if (module.jobTitle) {
        var lines = module.jobTitle.split(/\r\n|\r|\n/g);
        module.jobTitle = lines[0];
    }
    module.email = result.Cells.results[4].Value ? result.Cells.results[4].Value : "";
    module.phone = result.Cells.results[6].Value ? result.Cells.results[6].Value : "";
    module.department = result.Cells.results[7].Value;
    if (result.Cells.results[8].Value) {
        var photo = result.Cells.results[8].Value.replace(/ /g, '%20');
        module.photo = photo.replace("_MThumb.jpg", "_LThumb.jpg");
    } else {
        module.photo = "/_layouts/15/CustomjsLibs/1.devsp/noPhoto.jpg";
    }
    module.otdel = result.Cells.results[9].Value ? result.Cells.results[9].Value : "";
    module.isdisabled = result.Cells.results[10].Value;
    module.postalCode = result.Cells.results[11].Value;
    module.countryCode = result.Cells.results[12].Value;
    return module;
}

function clearLetter(letter) {
    if (!letter)
        return "";
    var t = letter.replace(/['"]+/g, '');
    var f = t.replace('»', '');
    var v = f.replace('«', '');
    return v.replace('«', '');
}

function errorHandler(error) {
    console.log(error.responseText);
}

