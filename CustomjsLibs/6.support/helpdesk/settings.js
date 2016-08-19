

//module.siteUrl = "http://intranet/support/"; 
function settings()
{
	var module = [];

    module.currentUserId = "";
    module.fileName = "";

    module.listIdNewClaims = "416125a4-154d-48ef-8403-d0e448c221ec";
	module.listIdAcceptedClaims  = "96b8b010-bc84-42d4-a6b7-c2d584e4b87f";
	module.listIdResolvedClaims = "ba62ba90-6c45-44dd-b236-2b2e37d01fbe";
    
    module.tooltipBtnResolvedClaim = "Если проблема повторно обнаруженна";
    module.tooltipBtnNewClaim = "Если Вы сами справились с задачей";

    module.btnNewClaim = '<input type="button"  value="Отозвать Заявку">';
    module.btnResolvedClaim = '<input type="button"  value="Переоткрыть Заявку" >';  

    module.listFieldsNewClaimsTable = "/Title,ID,Created,Discription,urgently,category";
    module.listFieldsAcceptedClaimsTable = "/Title,ID,DateCreate,Discription,TimeCreate,Priority,Category,Author/Title";    
    module.listFieldsResolvedClaimsTable = "/Title,ID,Date,Discription,Time,urgently,category,Author/Title";

    module.statusClaim = ["Принята", "В Работе", "Выполнена"];
 
	return module;
}