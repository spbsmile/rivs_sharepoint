// The file has been created, saved into "/Style Library/support/"
// and attached to the XLV via JSLink property.

SP.SOD.executeFunc("clienttemplates.js", "SPClientTemplates", function() {

  function getBaseHtml(ctx) {
    return SPClientTemplates["_defaultTemplates"].Fields.default.all.all[ctx.CurrentFieldSchema.FieldType][ctx.BaseViewID](ctx);
  }

  function init() {

    SPClientTemplates.TemplateManager.RegisterTemplateOverrides({

      
      Templates: {
                    Fields: {
                      "closetask": {
                         View: renderClose,
                  }         },       
            },

      ListTemplateType: 100

    });
  } 
  
  function renderClose(ctx) {
    	
    	var d = [];
        d.id = ctx.CurrentItem.ID;
        d.d = ctx.CurrentItem["DateCreate"];
        d.t = ctx.CurrentItem["TimeCreate"];
        var authId = ctx.CurrentItem["Author0"][0] ? ctx.CurrentItem["Author0"][0].id: null;
        d.dis = ctx.CurrentItem["Discription"];
    	d.cat = ctx.CurrentItem["Category"];
    	d.dateAccept = ctx.CurrentItem["timegettask"];
    	d.pr = ctx.CurrentItem["Priority"];
        
        var html = "";
        html += ' <button type="submit" value="Закрыть задачу" onClick="clickCloseTask(\'' + d.id + '\',\'' + d.d + '\',\'' + d.t + '\',\''  + d.cat  + '\',\'' + d.pr  + '\',\'' +   authId + '\',\'' +   d.dis + '\',\'' +  d.dateAccept + '\')"> <i class="fa fa-times" aria-hidden="true"></i> </button>';
        return html;
    }
  
  
  RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~siteCollection/Style Library/support/acceptedclaims.js"), init);
  init();

});


function clickCloseTask(itemId, d, time, category, urgently, authId, discription, timegettask)
{
    removeItem(itemId, settings().listId_acceptedClaims);
  
  	var regex = /<br\s*[\/]?>/gi;
  	var dist = discription.replace(regex, "\n");
  
    var itemData = {
        "__metadata": {
            "type": "SP.Data.List2ListItem",
            "Date": "",
            "Time":"",
            "Author0": "",
            "Discription": "",	
            "DateAccept": "",
            "DateResolved": "",
          	"category":"",
            "Score":"",
          	"urgently":"",
            "CommEmpIT":"",
            "CommAuthor":""
        },
        "Date": d,
        "Time":time,
        "Author0Id": authId,
        "Discription": dist,
        "category": category,
      	"urgently":urgently,
        "DateAccept": moment(timegettask, 'L').format("L") + "\n" + moment(timegettask, "DD-MM-YYYY HH:mm").format("HH:mm"), 
        "DateResolved": moment().format("L") + "\n" + moment().format("HH:mm"),
        
        "Score": "Нет оценки",
        "CommEmpIT":"Нет комментария",
        "CommAuthor":"Нет комментария"
    };
    addItem(settings().listId_resolvedClaims, itemData);
}


