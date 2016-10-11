
/** custom sort order otdels and departments such as:main page departments, giprorivs, urals, etc */
function sortDepartmentsTree(departmentsTree) {

    let sortHierarchyOtdel = {};
    sortHierarchyOtdel["ГипроРИВС"] = ["Руководство", "Секретариат", "Бюро главных инженеров", "Отдел технологического проектирования", "Строительная группа", "Отдел гидротехнических сооружений",
        "Сметно-Экономический отдел", "Технологическая группа", "Экологическая группа", "Группа оформления проектной документации"];

    sortHierarchyOtdel["Машзавод РИВС"] = ["Управление", "Бухгалтерия", "Отдел экономики и труда", "Бюро по работе с персоналом", "Производственно-технический отдел", "Служба по снабжению и транспорту", "Энергомеханическая служба", "Отдел сервисного обслуживания ГОП", "Участок погрузочно-разгрузочных работ", "Отдел технического контроля", "Производственный цех", "Участок монтажных работ", "Вспомогательный персонал"];

    sortHierarchyOtdel["Уральское Представительство"] = ["Дирекция", "Проектно-конструкторская группа", "Группа шеф-монтажных и пуско-наладочных работ", "Научно-исследовательская лаборатория",
        "Лаборатория гидрометаллургии", "Департамент информационных технологий", "Канцелярия", "Группа комплектации, продаж и отгрузок оборудования"];

    for (let property in sortHierarchyOtdel) {
        if (sortHierarchyOtdel.hasOwnProperty(property) && departmentsTree.hasOwnProperty(property)) {
            sortHierarchy(sortHierarchyOtdel[property], property);
        }
    }

    // main page
    let sortArray = ["Руководство", "Секретариат и канцелярия", "Планово-финансовый департамент", "Бухгалтерия", "Коммерческий отдел", "Департамент информационных технологий",
        "Департамент основного технологического оборудования", "ГипроРИВС", "Департамент технологических исследований", "Департамент процессов рудоподготовки", "Аналитический Центр",
        "Департамент АСУ", "Департамент ПЭ и ЭП", "Департамент строительства", "Департамент гидрометаллургии", "Лаборатория НМФП", "Служба стандартизации", "Производственная служба", "Отдел ВЭД и отгрузок",
        "Служба обеспечения запасными частями и технического сервиса ОП", "Отдел НТИ", "Машзавод РИВС", "Уральское Представительство", "Казахстан", "Представительство в Республике Армения",
        "Рекламный отдел", "Департамент административного управления", "Административная группа", "Транспортная группа"];

    function sortHierarchy(array, property) {
        let a = [];

        for (let index = 0; index < departmentsTree[property].length; index++) {
            a.push(departmentsTree[property][index]);
        }

        for (let i = 0; i < array.length; i++) {
            let index = a.indexOf(array[i]);
            if (index === -1) continue;
            let temp = a[i];
            a[i] = array[i];
            a[index] = temp;
        }
        departmentsTree[property] = a;
    }

    function sortObject(o) {
        let sorted = {},
            key,
            a = [];

        for (key in o) {
            if (o.hasOwnProperty(key)) {
                a.push(key);
            }
        }

        for (let i = 0; i < sortArray.length; i++) {
            let index = a.indexOf(sortArray[i]);
            let temp = a[i];
            a[i] = sortArray[i];
            a[index] = temp;
        }

        let secondArray = [];
        for (let i = sortArray.length; i < a.length; i++) {
            secondArray.push(a[i]);
        }
        secondArray.sort();

        let shift = sortArray.length;
        for (let i = 0; i < secondArray.length; i++) {
            a[i + shift] = secondArray[i];
        }

        for (key = 0; key < a.length; key++) {
            sorted[a[key]] = o[a[key]];
        }
        return sorted;
    }

    return sortObject(departmentsTree);
}