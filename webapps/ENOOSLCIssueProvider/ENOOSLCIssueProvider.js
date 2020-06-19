define("DS/ENOOSLCIssueProvider/Views/ENODataGrid",["UWA/Core","UWA/Element","UWA/Class/View","DS/WAFData/WAFData","DS/Core/Core","DS/Spreadsheet/DataGrid","DS/UIBehaviors/Draggable","DS/WebappsUtils/WebappsUtils","DS/Controls/Timeline","UWA/Widget","UWA/Drivers/Alone","DS/UIKIT/Input/Button","DS/Controls/Button","DS/Controls/LineEditor","i18n!DS/ENOOSLCIssueProvider/assets/nls/ENOOSLCIssueProvider","css!DS/ENOOSLCIssueProvider/ENOOSLCIssueProvider.css","css!DS/UIKIT/UIKIT.css",],function(k,n,d,i,e,o,g,c,h,j,b,f,m,a,p){window.selectedRows=[];window.document.handleClick=function(r){var q=selectedRows.indexOf(r);if(q>-1){selectedRows.splice(q,1)}else{selectedRows.push(r)}};window.document.handleClickSingleSelect=function(t){var s=selectedRows.indexOf(t);if(s>-1){selectedRows.splice(s,1);return}else{var r=selectedRows.pop();var q=document.getElementById("check_"+r);if(q){q.checked=false}selectedRows.push(t)}};window.document.disableDblClick=function(q){q.preventDefault();q.stopImmediatePropagation();q.stopPropagation()};var l=d.extend({name:"issuesGrid",tagName:"div",className:"issue-gridview",selectedRows:[],init:function(q){var r=UWA.clone(q,false);["container","template","tagName","domEvents"].forEach(function(s){delete r[s]});this._parent(r)},loadHTMLWithTooltip:function(r){if(r.virtualRowID==-1){return false}var q=r.cellModel.options.value;var s="<span class='label_container' ondblclick='disableDblClick(event);' title='"+q+"'>"+q+"</span>";r.cellView.getContent().setHTML(s)},setup:function(){this.container.addClassName(this.getClassNames("-container"));this._initPageElements();this._initGrid([])},_initGrid:function(v){var t=this,r=this.options,u=this.elements,s;t._gridData=v;if(v===undefined||v.length==0){t.buildMessageForEmptyGrid(t,p.defaultGridMessage);return}if(t._grid&&t._grid.destroy){t._grid.destroy()}var x=false;if(t.getParameterByName("showDesc")=="N"){x=true}var q=true;if(t.getParameterByName("showTitle")=="Y"){q=false}var w="handleClick";if(t.getParameterByName("allowMultiSelect")=="N"){w="handleClickSingleSelect"}s=new o({columns:[{text:"",dataIndex:"index",width:"9%",onCellRequest:function(A){if(A.virtualRowID==-1){return false}var z=A.cellModel.options.value;var y=selectedRows.indexOf(z)>-1?"checked":"";var B="<span class='checkbox_container' ondblclick='disableDblClick(event);'><input type='checkbox' name='test' id='check_"+z+"' value='"+z+"' onclick='"+w+'("'+z+"\");' "+y+" style='width: 20px;width height: 20px; '></span>";A.cellView.getContent().setHTML(B)},changeContent:function(y){return false},shouldAcceptDrag:function(y){return false},isEditable:false,isDraggable:false},{text:p.name,dataIndex:"name",width:"20%",onCellRequest:t.loadHTMLWithTooltip},{text:p.title,dataIndex:"title",width:"25%",onCellRequest:t.loadHTMLWithTooltip,isHidden:q},{text:p.type,dataIndex:"type",width:"15%",onCellRequest:t.loadHTMLWithTooltip},{text:p.maturity,dataIndex:"current",width:"15%",onCellRequest:t.loadHTMLWithTooltip},{text:p.revision,dataIndex:"revision",width:"15%",onCellRequest:t.loadHTMLWithTooltip},{text:p.description,dataIndex:"description",width:"25%",onCellRequest:t.loadHTMLWithTooltip,isHidden:x}],isEditable:{switchToReadView:{event:"click",callback:function(){return false}}},data:v,resize:{columns:false},selection:{cells:false,rowHeaders:false,columnHeaders:false,unselectAllOnEmptyArea:false,canMultiSelect:false},show:{rowHeaders:false}});t._grid=s;u.grid=s;s.inject(t.elements.gridContainer)},_initPageElements:function(){var u=this;var x,r,t,q;q=new UWA.Element("div",{"class":"gridContainer"});var v=new UWA.Element("div",{"class":"wux-control-inline-container",style:{"vertical-align":"top"}});var w=new a({placeholder:p.searchPlaceHolder,sizeInCharNumber:40});var s=new m({label:p.search,emphasize:"primary"});s.addEventListener("buttonclick",function(z){var B=document.getElementsByClassName("wux-controls-lineeditor")[0].dsModel;var A=B.value;if(A==""){alert(p.warningInvalidPattern);return false}var y=A;y=y.replace(/\*/g,"");y=y.replace(/\?/g,"");if(y==""){alert(p.warningInvalidPattern);return false}u.loadAjaxData(A)});var x=UWA.createElement("div",{"class":"header",html:[w,s]});r=new m({label:p.DoneButton,disabled:true,emphasize:"primary"});t=new m({label:p.CancelButton,emphasize:"primary"});r.addEventListener("buttonclick",function(y){u.submitSelectedData(u)});t.addEventListener("buttonclick",function(z){var y='oslc-response:{"oslc:results":[]}';if(window.opener){window.opener.postMessage(y,"*")}else{window.parent.postMessage(y,"*")}});u.elements.header=x;u.elements.gridContainer=q;u.elements.done=r;u.elements.cancel=t},getDoneButton:function(){return this.elements.done},getCancelButton:function(){return this.elements.cancel},submitEnabled:function(){var q=this.elements.create.elements.content.getAttribute("disabled");return q===null?true:false},render:function(){var u=this.elements,q=u.gridContainer,s=u.grid,r=u.done,v=u.header,t=u.cancel;s.inject(q);this.container.setContent([v,q,{tag:"div","class":"footer",html:[r,t]}]);return this},onCreate:function(){var q=window._myDatagrid.getManager()._selectedRows._items[0];alert(window._myDatagrid.getManager().getCellContent(q,1))},loadAjaxData:function(u){var t=this;t.buildMessageForEmptyGrid(t,p.loadingMessage);var r={};r=k.extend(r,{},true);r.method="GET";r.wait=true;r.onComplete=function(A,B,y){if(y.status==204){t.buildMessageForEmptyGrid(t,p.noContentMessage);t.getDoneButton().disabled=true;return}var z=JSON.parse(A);t.getDoneButton().disabled=false;t._initGrid(z)};var s=t.getParameterByName("type");var w=t.getParameterByName("domainPath");if(w!=""){w="&rdfURLDomainPath="+w}var v=t.getParameterByName("cspid");var x=t.getParameterByName("relationships");var q="../../resources/v1/bps/oslc/cm/issue/cs/"+v+"?searchQuery="+u+"&types="+s+w+"&relationships="+x;r.onFailure=function(z,A,y){if(document.getElementsByClassName("default_message").length>0){document.getElementsByClassName("default_message")[0].innerHTML=p.serverError}};i.request(q,r)},buildMessageForEmptyGrid:function(r,q){if(r._grid&&r._grid.destroy){r._grid.destroy()}r.grid=new UWA.Element("div",{"class":"default_message",text:q});r._grid=r.grid;r.elements.grid=r.grid;(r.grid).inject(r.elements.gridContainer)},submitSelectedData:function(s){if(selectedRows.length<1){alert(p.invalidSelection);return}var v=[];for(var r in selectedRows){var q=s._gridData[selectedRows[r]];var u=new s.OSLCResultObject(q.physicalid,q.name,q.resourceURL);v.push(u)}var t={};t["oslc:results"]=v;if(window.opener){window.opener.postMessage("oslc-response:"+JSON.stringify(t),"*")}else{window.parent.postMessage("oslc-response:"+JSON.stringify(t),"*")}},getParameterByName:function(r,q){if(!q){q=window.location.href}r=r.replace(/[\[\]]/g,"\\$&");var t=new RegExp("[?&]"+r+"(=([^&#]*)|&|#|$)"),s=t.exec(q);if(!s){return""}if(!s[2]){return""}return decodeURIComponent(s[2].replace(/\+/g," "))},OSLCResultObject:function(q,r,s){this["oslc:PID"]=q;this["oslc:label"]=r;if(s!=null&&s!=""){this["rdf:resource"]=s}}});return l});define("DS/ENOOSLCIssueProvider/Views/SearchReportedAgainst",["UWA/Core","DS/UIKIT/Input","i18n!DS/ENOOSLCIssueProvider/assets/nls/ENOOSLCIssueProvider","DS/WAFData/WAFData","css!DS/ENOOSLCIssueProvider/ENOOSLCIssueProvider.css"],function(e,c,d,a){var b=c.extend({defaultOptions:{placeholder:d.ReportedAgainstPlaceHolder,fileBannedChars:["'","#","$","@","%"],multiple:false},routeTemplate:{},socket:null,init:function(f){e.merge(this.defaultOptions,f);this._parent(f)},buildInput:function(){var f=e.createElement("div",{"class":"eno-rt-search",html:this.options.text});this.mLabelElement=e.createElement("label",{html:d.ReportedAgainstLabel+"   <span style='color:#e87b00'>*</span>",}).inject(f);this.mInputElement=e.createElement("div",{"class":"eno-rt-input input-group"}).inject(f);this.mTextElement=e.createElement("input",{"class":"form-control",name:"txtIssueAffectedItem",placeholder:this.options.placeholder,disabled:true}).inject(this.mInputElement);this.mTextElementPID=e.createElement("input",{type:"hidden",name:"txtActualAffectedItem"}).inject(this.mInputElement);this.searchButton=e.createElement("span",{"class":"input-group-addon btn-default btn",html:d.Native,events:{click:this.onInputClick.bind(this)}}).inject(this.mInputElement);this.extSearchButton=e.createElement("span",{"class":"input-group-addon btn-default btn",html:d.External,events:{click:this.onExtInputClick.bind(this)}}).inject(this.mInputElement);f.addEventListener("dragover",this.onInputDragOver.bind(this),false);f.addEventListener("dragleave",this.onInputDragLeave.bind(this),false);f.addEventListener("drop",this.onInputDrop.bind(this),false);return f},clear:function(){this.elements.container.removeClassName("error");this.elements.container.setText(this.options.placeholder)},selected_Objects_search:function(f){},onInputClick:function(){var j=this;var i=j.options;var h="../../webapps/ENOOSLCIssueProvider/ENODataGrid.html?showTitle="+i.showTitle+"&showDesc="+i.showDesc+"&type="+i.type+"&cspid="+i.cspid;var g=window.open(h,"_blank","toolbar=yes,scrollbars=no,resizable=yes,top=300,left=300,width=800,height=500");if(window.focus){g.focus()}window.addEventListener("message",function(o){var q=o.data;q=q.replace("oslc-response:","").trim();var n=JSON.parse(q);var l=n["oslc:results"];if(l.length>0){var k=new Array();var p=new Array();for(var m in l){k.push(l[m]["oslc:label"]);p.push(l[m]["oslc:PID"])}j.mTextElement.value=k.join("|");j.mTextElementPID.value=p.join("|")}g.close()},false);var f=this.mTextElement.parentNode;if(f){f.removeClassName("has-error")}},onExtInputClick:function(){var f=this;f.extSearchButton.addClassName("disabled");require(["DS/ENOOSLCIssueConsumer/ENOOSLCReqConsumer"],function(j){var i=new j();var h={};h=e.extend(h,{},true);h.method="GET";h.wait=true;h.onComplete=function(l,m,k){f.extSearchButton.removeClassName("disabled");i.setupWithExternalSetting(l);i.launchDelegatedUIWithExternalSetting(i.createIssueDelegatedUI)};h.onFailure=function(l,m,k){f.extSearchButton.removeClassName("disabled");if(l!=undefined&&l!=null&&l.toString().indexOf('return ResponseCode with value "401"')!==-1){window.location.href=window.location.protocol+"//"+window.location.host+"/3DSpace/oslc/SSO_emxSecurityContextSelection.jsp?redirectParam="+window.location.href}else{alert(d.Server_Error)}};var g=window.location.protocol+"//"+window.location.host+"/3DSpace/resources/v1/bps/oslc/cm/platform-urls";a.request(g,h)})},onInputDragOver:function(f){},onInputDragLeave:function(f){},onInputDrop:function(f){},onInputChange:function(f){},getValue:function(){return this.mTextElement.value}});return b});define("DS/ENOOSLCIssueProvider/Views/ENOViewForm",["UWA/Core","UWA/Data","UWA/Element","UWA/Event","UWA/Utils","UWA/Controls/Abstract"],function(c,h,a,i,g,e){function f(k){}function j(o){var n,k,m;if(!o){return}o=o.split(" ");for(n=0,k=o.length;n<k;n++){m=o[n].match(/horizontal|inline|vertical$/);if(m&&!m[1]){if(m[0]==="horizontal"){o[n]="form-horizontal"}else{if(m[0]==="inline"){o[n]="form-inline"}else{if(m[0]==="vertical"){o[n]="form-vertical"}}}}}return o.join(" ")}var b={};var d={name:"viewform",defaultOptions:{className:"form-vertical",fields:[],buttons:[],labelSuffix:"",grid:"4 8"},init:function(k){k=k||{};if(k.className){k.className=j(k.className)}this.id=g.getUUID().substring(0,6);this._parent(k);this.buildSkeleton()},buildSkeleton:function(){var m=this,k=this.options.fields,n=this.fields,o=[],l;l=c.createElement("form",{"class":this.getClassNames()});k.forEach(function(q){var p,r;if(q.type!=="hidden"){if(n[q.type]===undefined){q.type="text"}r=n[q.type](q,m,p);if(q.label&&q.className&&q.className.contains("input-sm")){r.getElement("label").addClassName("label-sm")}o.push(r)}});l.addContent(o);this.elements.container=l},createField:function(m,n,p,o){var k,l;if(this.options.className.indexOf("form-horizontal")>-1&&this.options.grid){l=this.options.grid.split(" ");if(!l||l.length<2){l=[2,10]}if(o){m.inject(o.getChildren()[0])}else{if(n){n.addClassName("col-xs-"+l[0]+" control-label");k=c.createElement("div",{"class":"form-group",html:[n,{tag:"div","class":"col-xs-"+l[1],html:m}]})}else{k=c.createElement("div",{"class":"form-group",html:{tag:"div","class":"col-xs-offset-"+l[0]+" col-xs-"+l[1],html:m}})}}}else{if(this.options.className.indexOf("form-inline")>-1){if(o){m.inject(o)}else{if(!n){k=c.createElement("div",{"class":"form-group",html:m})}else{n.addClassName("sr-only");k=c.createElement("div",{"class":"form-group",html:[n,m]})}}}else{if(o){m.inject(o)}else{if(!n){k=c.createElement("div",{"class":"form-group",html:m})}else{k=c.createElement("div",{"class":"form-group",html:[n,m]})}}}}if(p){k.hide()}return k},setClassName:function(k){this.options.className=j(k);this.getContent().className=this.getClassNames();return this},fields:{text:function(m,o){var k,l,n=o;k=c.createElement("label",{"for":g.getUUID().substring(0,6),text:c.i18n(m.value),"class":"field-value"});if(c.is(m.label)){l=c.createElement("label",{"for":g.getUUID().substring(0,6),text:c.i18n(m.label+n.options.labelSuffix)})}return n.createField.call(n,k,l)}}};return e.extend(d)});define("DS/ENOOSLCIssueProvider/Views/IssueCreateForm",["UWA/Core","UWA/Element","DS/WAFData/WAFData","UWA/Class/View","DS/UIKIT/Alert","UWA/Widget","UWA/Drivers/Alone","DS/UIKIT/Form","DS/UIKIT/Input/Button","DS/ENOOSLCIssueProvider/Views/SearchReportedAgainst","i18n!DS/ENOOSLCIssueProvider/assets/nls/ENOOSLCIssueProvider","css!DS/ENOOSLCIssueProvider/ENOOSLCIssueProvider.css","css!DS/UIKIT/UIKIT.css",],function(j,k,h,a,c,i,b,e,d,f,l){var g=a.extend({name:"createIssue",isIE:false,tagName:"div",className:"create-issue-view",init:function(m){var n=UWA.clone(m,false);["container","template","tagName","domEvents"].forEach(function(o){delete n[o]});this._parent(n)},setup:function(){this.container.addClassName(this.getClassNames("-container"));this._initAlert();this._initForm();this._initListenKeyDown();this._detectBrowser(navigator.userAgent)},_detectBrowser:function(m){var n=/(msie|trident)/i.test(m);if(n){this.isIE=true}},_initAlert:function(){},_initForm:function(){var s=this,w=this.options,o,p,m=this.elements,n,q,r,v;var u=s.getParameterByName("cspid");var t=new f({cspid:u,showTitle:"Y",showDesc:"N",type:"type_Requirement"});p=[{type:"textarea",name:"txtIssueDescription",rows:3,required:true,label:l.DescriptionLabel,maxlength:"128",placeholder:l.DescriptionPlaceHolder,events:{onChange:function(){var y=this.getValue().trim();if(y!==""){var x=this.elements.input.parentNode;if(x){x.removeClassName("has-error")}}}}},{type:"html",name:"ReportedAgainstElem",required:true,html:t},{type:"select",name:"txtIssuePriority",label:l.PriorityLabel,nativeSelect:false,required:true,placeholder:false,options:[{value:"Pre-assigned",label:l.Priority_PreAssigned},{value:"Low",label:l.Priority_Low,selected:true},{value:"Medium",label:l.Priority_Medium},{value:"High",label:l.Priority_High}]},{type:"select",name:"txtIssueProblemType",label:l.ProblemTypeLabel,nativeSelect:false,required:true,placeholder:false,options:[{value:"Training",label:l.ProblemType_Training},{value:"Platform",label:l.ProblemType_Platform},{value:"Training",label:l.ProblemType_Training},{value:"Platform",label:l.ProblemType_Platform},{value:"Performance",label:l.ProblemType_Performance},{value:"Mistake",label:l.ProblemType_Mistake},{value:"Installation",label:l.ProblemType_Installation},{value:"Licensing",label:l.ProblemType_Licensing},{value:"Functionality",label:l.ProblemType_Functionality},{value:"Ease of Use",label:l["ProblemType_Ease of Use"]},{value:"Defect",label:l.ProblemType_Defect},{value:"3rd Party",label:l["ProblemType_3rd Party"]},{value:"Not Determined",label:l["ProblemType_Not Determined"],selected:true},{value:"Usage Model",label:l["ProblemType_Usage Model"]}]},{type:"textarea",name:"txtIssueResolutionRecommendation",rows:3,label:l.ResolutionRecommendationLabel,maxlength:"128",placeholder:l.ResolutionRecommendationPlaceHolder},{type:"textarea",name:"txtIssueStepsToReproduce",rows:3,label:l.StepsToReproduceLabel,maxlength:"128",placeholder:l.StepsToReproducePlaceHolder}];n=new e({fields:p,events:{onSubmit:function(){s.onCreate()},onInvalid:function(x){},onValid:function(){}}});s._form=n;var q=UWA.createElement("div",{"class":"header",html:l.HeaderText});r=new d({value:l.DoneButton,className:"primary",events:{onClick:this.dispatchAsEventListener("onCreate")}});v=new d({value:l.CancelButton,events:{onClick:this.dispatchAsEventListener("onCancel")}});m.form=n;m.header=q;m.create=r;m.cancel=v},getCreateButton:function(){return this.elements.create},getCancelButton:function(){return this.elements.cancel},_initListenKeyDown:function(){this.onKeyDown=this.onKeyDown.bind(this);document.addEventListener("keydown",this.onKeyDown)},onKeyDown:function(m){},submitEnabled:function(){var m=this.elements.create.elements.content.getAttribute("disabled");return m===null?true:false},onCancel:function(){window.parent.postMessage('oslc-response:{"oslc:results":[]}',"*")},render:function(){var p=this.elements,o=p.form,m=p.create,q=p.header,n=p.cancel;this.container.setContent([q,o,{tag:"div","class":"footer",html:[m,n]}]);return this},_validateInput:function(){var o=this;var n={txtIssueDescription:o.elements.form.getField("txtIssueDescription"),txtActualAffectedItem:o.elements.form.getField("txtActualAffectedItem"),txtIssueAffectedItem:o.elements.form.getField("txtIssueAffectedItem")};if(typeof n.txtIssueDescription.value=="undefined"||n.txtIssueDescription.value.trim()==""){alert(l.DescriptionEmptyFieldMessage);var m=n.txtIssueDescription.parentNode;if(m){m.addClassName("has-error")}n.txtIssueDescription.focus();return false}if(typeof n.txtActualAffectedItem.value=="undefined"||n.txtActualAffectedItem.value.trim()==""||typeof n.txtIssueAffectedItem.value=="undefined"||n.txtIssueAffectedItem.value.trim()==""){alert(l.ReportedAgainstEmptyFieldMessage);var m=n.txtIssueAffectedItem.parentNode;if(m){m.addClassName("has-error")}n.txtIssueAffectedItem.focus();return false}return true},onCreate:function(){var p=this,o="../../resources/v1/bps/oslc/cm/issue";if(this._validateInput()){p.elements.create.setDisabled();var q;if(p.isIE){q=navigator.userLanguage}else{q=navigator.language}q.replace("-","_");var m={description:p.elements.form.getValue("txtIssueDescription").trim(),affectedItemsId:p.elements.form.getValue("txtActualAffectedItem"),affectedItemsName:p.elements.form.getValue("txtIssueAffectedItem"),priority:p.elements.form.getValue("txtIssuePriority"),problemType:p.elements.form.getValue("txtIssueProblemType"),resolutionRecommendation:p.elements.form.getValue("txtIssueResolutionRecommendation").trim(),issueStepsToReproduce:p.elements.form.getValue("txtIssueStepsToReproduce").trim(),timeZone:(new Date().getTimezoneOffset()/60).toString(),locale:q};var n={};n=j.extend(n,{},true);n.method="POST";n.type="json";n.headers={"Content-Type":"application/ds-json",Accept:"application/ds-json"};n.data=JSON.stringify(m);n.onComplete=function(t,r,s){if(t!=null&&typeof t!="undefined"){window.parent.postMessage("oslc-response:"+JSON.stringify(t),"*")}else{if(s!=null&&typeof s!="undefined"){p.sendErrorResponse(s.statusText,s.status+"")}}p.elements.create.enable()};n.onFailure=function(s){if(s.message&&s.message.indexOf("Error:")&&s.message.indexOf("ResponseCode")){var t=s.message.substring(s.message.indexOf("ResponseCode")).split('"')[1];var r;if(t=="500"){r="Internal Server Error"}else{if(t==null||typeof request=="undefined"){t="504";r="Gateway Timeout error"}else{r="Error processing request"}}p.sendErrorResponse(r,t)}p.elements.create.enable()};h.request(o,n)}},sendErrorResponse:function(o,n){var m={"oslc:statusCode":n,"oslc:message":o};window.parent.postMessage("oslc-response:"+JSON.stringify(m),"*")},onDestroy:function(){},getParameterByName:function(n,m){if(!m){m=window.location.href}n=n.replace(/[\[\]]/g,"\\$&");var p=new RegExp("[?&]"+n+"(=([^&#]*)|&|#|$)"),o=p.exec(m);if(!o){return""}if(!o[2]){return""}return decodeURIComponent(o[2].replace(/\+/g," "))}});return g});define("DS/ENOOSLCIssueProvider/Views/IssueViewForm",["UWA/Core","UWA/Element","DS/WAFData/WAFData","UWA/Class/View","UWA/Widget","UWA/Drivers/Alone","DS/ENOOSLCIssueProvider/Views/ENOViewForm","DS/UIKIT/Input/Button","DS/UIKIT/Spinner","i18n!DS/ENOOSLCIssueProvider/assets/nls/ENOOSLCIssueProvider","css!DS/ENOOSLCIssueProvider/ENOOSLCIssueProvider.css","css!DS/UIKIT/UIKIT.css",],function(i,j,g,a,h,b,d,e,c,k){var f=a.extend({name:"createIssue",tagName:"div",className:"details-issue-view",init:function(l){var m=UWA.clone(l,false);["container","template","tagName","domEvents"].forEach(function(n){delete m[n]});this._parent(m)},_getUrlParams:function(){var m,o=/\+/g,n=/([^&=]+)=?([^&]*)/g,q=function(r){return decodeURIComponent(r.replace(o," "))},p=window.location.search.substring(1);var l={};while(m=n.exec(p)){l[q(m[1])]=q(m[2])}return l},_getFormFields:function(n){var m=[];for(var l in n){m.push({type:"text",name:l,label:typeof k[l]!="undefined"?k[l]:l,value:n[l]})}return m},setup:function(){this.container.addClassName(this.getClassNames("-container"));var p=new c({className:"large"}).inject(document.body).show();var o=this,n="../../resources/v1/bps/oslc/cm/issue/";var l=o._getUrlParams();if(typeof l.issuePid=="undefined"||l.issuePid==null||l.issuePid==""){o._initForm(o._getFormFields(l));p.hide()}else{var m={};m=i.extend(m,{},true);m.method="GET";m.data="timeZone="+(new Date().getTimezoneOffset()/60).toString();m.wait=true;m.onComplete=function(r,s,q){o._initForm(o._getFormFields(JSON.parse(r)));o.render().inject(document.body);p.hide()};m.onFailure=function(r,s,q){o._initForm([]);alert(k.previewServerError);p.hide()};g.request(n+l.issuePid,m)}},_initForm:function(o){var r=this,t=this.options,n,o,l=this.elements,m,p,q,s;m=new d({fields:o,className:"horizontal",events:{onSubmit:function(){r.onCreate()},onInvalid:function(u){},onValid:function(){}}});r._form=m;var p=UWA.createElement("div",{"class":"header",html:k.ViewHeaderText});q=new e({value:k.DoneButton,className:"primary",events:{onClick:this.dispatchAsEventListener("onCreate")}});s=new e({value:k.CancelButton,events:{onClick:this.dispatchAsEventListener("onCancel")}});l.form=m;l.header=p;l.create=q;l.cancel=s},getCreateButton:function(){return this.elements.create},getCancelButton:function(){return this.elements.cancel},_initListenKeyDown:function(){this.onKeyDown=this.onKeyDown.bind(this);document.addEventListener("keydown",this.onKeyDown)},onKeyDown:function(l){},submitEnabled:function(){var l=this.elements.create.elements.content.getAttribute("disabled");return l===null?true:false},render:function(){var o=this.elements,n=o.form,l=o.create,p=o.header,m=o.cancel;this.container.setContent([n,{tag:"div","class":"footer"}]);return this},onCreate:function(){}});return f});