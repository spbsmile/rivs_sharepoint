
function settings()
{
	var module = [];
	module.siteUrl = "http://intranet/support/";   
  
	//module.listTitle_AcceptedClaims = "AcceptedTasksList";
	//module.listTitle_ResolvedClaims = "ResolvedTasksList";
	  
    module.listId_acceptedClaims = "96b8b010-bc84-42d4-a6b7-c2d584e4b87f";
	module.listId_resolvedClaims  = "ba62ba90-6c45-44dd-b236-2b2e37d01fbe";
	
    module.listId_newClaims = "416125a4-154d-48ef-8403-d0e448c221ec";
 
	return module;
}

NotifyScriptLoadedAndExecuteWaitingJobs("settings.js");