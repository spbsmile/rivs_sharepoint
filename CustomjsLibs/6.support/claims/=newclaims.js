// The file has been created, saved into "/Style Library/support/"
// and attached to the XLV via JSLink property.

var currentUserId = null;

SP.SOD.executeFunc("clienttemplates.js", "SPClientTemplates", function() {

  function getBaseHtml(ctx) {
    return SPClientTemplates["_defaultTemplates"].Fields.default.all.all[ctx.CurrentFieldSchema.FieldType][ctx.BaseViewID](ctx);
  }

  function init() {
    
    InitMoment();

    SPClientTemplates.TemplateManager.RegisterTemplateOverrides({

      OnPreRender: InitValueScripts,

      Templates: {  

                Fields: {
                    "getTask": {
                        View: renderAccept,
                    }
                },
         	/*	Footer: function(ctx){
                    var html = '';    
    html += '<input type="button" value="Отправить письмо" onClick="sendEmail(\'' + "m_laberko@rivs.ru" + '\',\'' + "M_Zabiyakin@rivs.ru" + '\',\'' + "body test" + '\',\'' + "subject test" + '\')" />'; 
  	return html;
      				
      			} */

            },
     
      ListTemplateType: 100

    });
  }
  
  function InitValueScripts(renderCtx) {
        SP.SOD.executeOrDelayUntilScriptLoaded(loadContext, 'sp.js');
        function loadContext() {

            var context = SP.ClientContext.get_current();
            getCurrentUser(context, function (user) {
                currentUserId = user.get_id();
            });  
        }
    }
  
  function InitMoment()
  {
    console.log("hello InitMoment");
    	SP.SOD.registerSod("moment.min.js", "/Style%20Library/corelibs/moment.min.js");
    	SP.SOD.registerSod("moment-with-locales.min.js", "/Style%20Library/corelibs/moment-with-locales.min.js");
    	SP.SOD.registerSod("moment-timezone.min.js", "/Style%20Library/corelibs/moment-timezone.min.js");
        SP.SOD.registerSodDep("moment-with-locales.min.js", "moment.min.js");
        SP.SOD.registerSodDep("moment-timezone.min.js", "moment-with-locales.min.js");
    	
     SP.SOD.loadMultiple(["moment.min.js", "moment-with-locales.min.js", "moment-timezone.min.js"],
         function(){
    		moment.tz.add("Europe/Moscow|MSK MSD MSK|-30 -40 -40|01020|1BWn0 1qM0 WM0 8Hz0|16e6");
            moment.locale(window.navigator.userLanguage || window.navigator.language);
	});                                       
   //     () => { 
    //        moment.tz.add("Europe/Moscow|MSK MSD MSK|-30 -40 -40|01020|1BWn0 1qM0 WM0 8Hz0|16e6");
     //       moment.locale(window.navigator.userLanguage || window.navigator.language);
     //   });
    
  }
  
  function renderAccept(ctx) {
  
  console.log("render ");
    var d = [];
        d.id = ctx.CurrentItem.ID;
        d.t = ctx.CurrentItem["Created"];
        d.dis = ctx.CurrentItem["Discription"];
        d.pri = ctx.CurrentItem["urgently"];
        d.cat = ctx.CurrentItem["category"];
        var authId = ctx.CurrentItem["Author"][0] ? ctx.CurrentItem["Author"][0].id : null;
        var lookupId = "";//ctx.CurrentItem["attachfile"][0] ? ctx.CurrentItem["attachfile"][0].lookupId : null;
  		//  + d.d + '\',\'' + d.t + '\',\'' + authId + '\',\''
    var html = '';    
    html += '<input type="button" value="Принять задачу" onClick="clickAcceptTask(\'' + d.id + '\',\'' + d.t + '\',\'' + authId + '\',\'' + d.dis + '\',\'' + d.pri + '\',\'' + d.cat + '\',\'' + lookupId + '\')" />';
  	return html;
  }

  RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~siteCollection/Style Library/support/newclaims.js"), init);
  init();

});
/*
function sendEmail(from, to, body, subject) {
    var urlTemplate = settings().siteUrl + "/_api/SP.Utilities.Utility.SendEmail";
    
    $.ajax({
        contentType: 'application/json',
        url: urlTemplate,
        type: 'POST',
        data: JSON.stringify({
            'properties': {
                '__metadata': { 'type': 'SP.Utilities.EmailProperties' },
                'From': from,
                'To': { 'results': [to] },
                'Subject': subject,
                'Body': body
            }
        }
      ),
        headers: {
            "Accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",  
            "X-RequestDigest":  jQuery("#__REQUESTDIGEST").val()  
        },
        success: function (data) {
            console.log(data);  
            //var result = data.d.results;
          	//console.log(result);
            //var i = result.length;
        },
        error: function (err) {
            alert(JSON.stringify(err));
        }
    });
}
*/
function clickAcceptTask(itemId, created, authId, discription, priority, category, lookupId) {
    removeItem(itemId, settings().listId_newClaims);
  
  	var regex = /<br\s*[\/]?>/gi;
  	var dist = discription.replace(regex, "\n");
  
    var tt = authId === "null" ? null : authId;
    var itemData = {
        "__metadata": {
            "type": "SP.Data.List1ListItem",
            "DateCreate": "",
           "TimeCreate": "",
            "Author0": "",
            "Discription": "",
            "Priority": "",
            "Category": "",
           // "AttachFile": "",
            "timegettask": ""
        },

        "DateCreate": moment(created,'DD-MM-YYYY').format("L"),
        "TimeCreate": moment(created,'DD-MM-YYYY HH:mm').format("HH:mm"),  
        "Author0Id": tt,
        "Discription": dist,
        "Priority": priority,
        "Category": category,
       // "AttachFileId": t,
        "timegettask": moment().format("L") + "\n" + moment().format("HH:mm")
    };
    addItem(settings().listId_acceptedClaims, itemData);
}

