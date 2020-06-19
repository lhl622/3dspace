/*!  Copyright 2017 Dassault Systemes. All rights reserved. */
define("DS/SimReviewWidget/PSRWidgetPrefsManager",["UWA/Class","UWA/Core"],function(e,f){var a;var b;var c=false;var d={};return e.extend({init:function(g){a=g.widget},getAllWidgetPreferences:function(j){var i=a.getValue("CollabSpacePref");var k=a.getValue("X3DContentId");if(f.is(k)&&k!==""){this.setPlatformType("EV6");c=true;d=JSON.parse(k)}if(i===""&&!f.is(k)){this.updateWidgetTitle("");c=false}else{if(f.is(i)&&i!==""&&i!=="false"){var h=this.getCollabSpacePrefObject();var g=h.data.items[0].serviceId;if(g.toUpperCase()==="3DDRIVE"){this.setPlatformType("3DDRIVE")}else{this.setPlatformType("EV6");c=true}d=h}}j(c)},isPreferencesValid:function(){return c},getPlatformType:function(){return b},setPlatformType:function(g){b=g},setCollabSpacePref:function(){a.setValue("CollabSpacePref",JSON.stringify(d))},saveCollabSpacePref:function(g){d=g},cleanCollabSpacePref:function(){a.setValue("CollabSpacePref","")},getCollabSpacePref:function(){return d},getCollabSpacePrefObject:function(){var g;var h=a.getValue("CollabSpacePref");if(f.is(h)){g=JSON.parse(h)}return g},cleanX3DContentIdPref:function(){a.setValue("X3DContentId","")},setSyncPref:function(g){a.setValue("MultiWidgetsSync",JSON.stringify(g))},getSyncPrefObject:function(){var g;var h=a.getValue("MultiWidgetsSync");if(f.is(h)){g=JSON.parse(h)}return g},updateWidgetTitle:function(i){a.setTitle("");var h=a._title?a._title:"";var g=0;if(i&&!isNaN(i.dupNb)&&i.dupNb>0){a._dupNb=i.dupNb;g=a._dupNb}else{if(!isNaN(a._dupNb)){g=a._dupNb}}if(i&&i.title!==""&&i.title!==null&&typeof i.title!=="undefined"){a._title=i.title;h=a._title}h+=g>0?" - "+g.toString():"";a.setTitle(h)}})});
/*!  Copyright 2015 Dassault Systemes. All rights reserved. */
define("DS/SimReviewWidget/WidgetSimReview",["UWA/Core","DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices","DS/WebappsUtils/WebappsUtils","DS/WebUAUtils/WebUAUtils","DS/UIKIT/Popover","DS/UIKIT/Dropdown","DS/CoreEvents/Events","DS/WebSystem/Nls","DS/WebSystem/Settings","DS/SimReviewHelper/SimReviewHelper","DS/WebSystem/Environment","DS/3DPlaySupport/AssetSupport","DS/3DPlaySupport/SupportList","DS/3DPlayConnectors/3DPlayInputPreProcessor","DS/SimReviewWidget/PSRWidgetPrefsManager","css!DS/UIKIT/UIKIT.css","css!DS/3DPlayWidget/assets/3DPlayWidget"],function(b,G,H,e,s,l,L,M,i,z,I,K,y,a,q){e.setAppid("SIMWPSR_AP");var B;var u={};var D=null;var k=L;var x=false;var f=new a();var v;var n="SimReviewWidget.Sync.";var g=false;var r=[];var d=["viewchange","framenav","animation","legendminmax"];var F={EMPTY_MODEL_ID:{level:"pref"},UNAVAILABLE_EXPERIENCE:{},DROP_IT_MSG:{},REPLACE_IT_MSG:{},DROP_ERROR_MSG:{},DROP_TYPE_ERROR_MSG:{},PLATFORM_NOT_SUPPORTED:{},DRIVE_NOT_SUPPORTED:{},D2_LAYOUT_NOT_SUPPORTED:{},CALLBACK_ERROR:{},UNKNOWN_ENV_ID:{},PREFERENCES_SYNC_PREFIX:{},PREFERENCES_SYNC_THIS:{},EDGE_MSG:{}};d.forEach(function(w){F[n+w]={}});var p=[];for(var h in F){p.push(h)}var o={popContainer:"",popOver:"",dropDown:"",msg:function(w){v.updateWidgetTitle({title:""});this.createMsgDom();this.cleanMsgDom();if(F[w].level==="pref"){this.popOver=new s({target:this.popContainer,position:"bottom bottom-right",body:F[w].msg,closeOnClick:false,bound:false});this.popOver.toggle()}else{this.dropDown=new l({target:this.popContainer,position:"bottom",body:"<p>"+F[w].msg+"</p>",closeOnClick:false,bound:false});this.dropDown.toggle()}},createMsgDom:function(){if(!document.getElementById("msgContainer")){this.popContainer=b.createElement("div",{id:"msgContainer",html:""});this.popContainer.inject(D.body,"before")}},cleanMsgDom:function(){if(o.dropDown!==""){o.dropDown.hide();o.dropDown=""}if(o.popOver!==""){o.popOver.hide();o.popOver=""}},refreshMsgPosition:function(){if(o.dropDown!==""){o.dropDown.updatePosition()}if(o.popOver!==""){o.popOver.updatePosition()}}};var j=function(R){var P={};R=undefined!==R?R:true;var S=D.getPreference(n+D.id);var W=S?S.value==="true":false;var Y=r.filter(function(Z){return(D.getPreference(Z).value==="true")});var Q=W&&Y.length>1;var O=B.instance.mySPMUI.syncMgr;if(O){var T,V=Y.length;var N;var X={};var U={};d.forEach(function(aa){var Z=D.getPreference(n+aa);if(Z&&Z.value==="true"){U[aa]=true}});for(T=0;T<V;T++){N=Y[T];X[N]=U}if(Q!==O.isSyncOn()){if(Q){O.startSync(X,R)}else{O.stopSync()}var w=H.getWebappsBaseUrl();w+=Q?"SimReviewWidget/assets/SIMULIA_syncOn.png":"UWPClientCode/assets/SIMULIA-widget-icon@2X.png";D.setIcon(w)}O.updateSyncList(X,R);P.syncdWidgetsList=Y;P.features=U}return P};var m={myAppsUrl:"",isPlayerRunning:false,platformList:[],myAppsReturnList:"",emptyOrDefaultModel:true,canvasDiv:"",inviteContainer:"",boxMessage:{invite_msgDom:"",invite_imgDom:"",REPLACE:{classIcon:"fonticon-down-circled"},DROPIT:{classIcon:"fonticon-down-circled"},ERROR:{classIcon:"fonticon-block"},TYPE_ERROR:{classIcon:"fonticon-block"}},widgetMode:"windowed",widgetHeight:500,isRefreshing:false,widgetInit:function(){this.updateboxMessagesLabel();var w=true;var N=navigator.userAgent;var O=N.indexOf("Edge/");if(O>0){w=parseInt(N.substring(O+5,N.indexOf(".",O)),10)>16}if(!w){o.msg("EDGE_MSG")}else{this.createCanvasDiv();v.getAllWidgetPreferences(function(P){if(P){if(v.getPlatformType()!=="EV6"){o.msg("PLATFORM_NOT_SUPPORTED")}else{m.parsePref()}}else{m.startPlayer()}})}},updateboxMessagesLabel:function(){this.boxMessage.REPLACE.msg=F.REPLACE_IT_MSG.msg;this.boxMessage.DROPIT.msg=F.DROP_IT_MSG.msg;this.boxMessage.ERROR.msg=F.DROP_ERROR_MSG.msg;this.boxMessage.TYPE_ERROR.msg=F.DROP_TYPE_ERROR_MSG.msg},parsePref:function(){var N=v.getCollabSpacePref();if(N.data.items[0].serviceId==="2DLayout"){o.msg("D2_LAYOUT_NOT_SUPPORTED")}else{var O=m.getParam4CollabSpace(N);v.updateWidgetTitle({title:N.data.items[0].displayName});var w=v.getSyncPrefObject();m.startPlayer(O,w)}},getExperiencesList:function(N,w){K.getExperienceID(N.asset,{usage:"SimReview"},function(O){if(b.is(O)&&O!==""){u[N.asset.dtype]=O}w(O)})},getDashboardInfo:function(){G.getPlatformServices({onComplete:function(S){m.platformList=S;if(top.UWA&&top.UWA.Widgets&&top.UWA.Widgets.instances){var R,Q;var P=top.UWA.Widgets&&top.UWA.Widgets.instances||[];var O;for(var N=0,w=P.length;N<w;N++){O=P[N].environment;if(O&&O.wp&&O.wp.allowedChildrenContextType==="dashboard"){R=P[N]}}if(R&&R.layout&&R.layout.selectedTab){Q=R.layout.selectedTab}if(Q&&Q.options&&Q.options.item&&Q.options.item.widget){m.tabId=Q.options.item.widget.id}}k.publish({event:"DashboardInfoReady",data:S})},onFailure:function(){}})},createCanvasDiv:function(){D.body.empty();this.canvasDiv=b.createElement("div",{id:"canvas-div",html:""});this.declareDraggableZoneEvents(this.canvasDiv);this.canvasDiv.inject(D.body);this.create3DPlayInviteContainer()},create3DPlayInviteContainer:function(){this.inviteContainer=b.createElement("div",{id:"pad_invite","class":"pad_invite_container",html:"Invite Container",styles:{display:"none"}});this.inviteContainer.inject(this.canvasDiv,"before");this.inviteContainer.setContent([{tag:"div","class":"pad_invite_display drop",html:[{tag:"span",id:"invite_img","class":"pad_invite_img fonticon fonticon-3x fonticon-down-circled"},{tag:"h5",id:"invite_msg","class":"pad_invite_txt font-3dsregular drop",html:this.boxMessage.DROPIT.msg}]}]);this.boxMessage.invite_imgDom=this.inviteContainer.getElement("span.pad_invite_img");this.boxMessage.invite_msgDom=this.inviteContainer.getElement("h5.pad_invite_txt")},hideShowBoxMessage:function(w){this.inviteContainer.setStyle("display",w)},updateBoxMessage:function(O){if(O==="DEFAULT"){this.boxMessage.invite_imgDom.removeClassName(this.boxMessage.ERROR.classIcon);this.boxMessage.invite_imgDom.addClassName("fonticon-down-circled")}else{this.hideShowBoxMessage("block");var N=this.boxMessage[O].msg;var w=this.boxMessage[O].classIcon;this.boxMessage.invite_msgDom.setHTML(N);this.boxMessage.invite_imgDom.removeClassName("fonticon-down-circled");this.boxMessage.invite_imgDom.addClassName(w)}},declareDraggableZoneEvents:function(w){w.ondrop=function(N){N.preventDefault();this.removeClassName("drag_over_class");m.hideShowBoxMessage("none");m.updateBoxMessage("DEFAULT");if(I.isSet("3DPlay.DnD","true")&&N.dataTransfer.files.length&&N.dataTransfer.files[0]!==undefined){}else{var O=N.dataTransfer.getData("text");if(O!==""){m.onDropEvent(JSON.parse(O))}else{m.onDropFileEvent(N.dataTransfer.files[0])}}};w.ondragover=function(N){N.preventDefault();N.dataTransfer.dropEffect="all";this.addClassName("drag_over_class");if(m.emptyOrDefaultModel){m.updateBoxMessage("DROPIT")}else{m.updateBoxMessage("REPLACE")}};w.ondragleave=function(){m.hideShowBoxMessage("none");m.updateBoxMessage("DEFAULT");this.removeClassName("drag_over_class")}},startPlayer:function(P,O){var w;var N=this.getPlayerOptions(O);if(P===null||P===undefined){P=this.getParam4Default();m.emptyOrDefaultModel=true;m.startSimReviewWeb(P,N)}else{w=P.asset||P.input.asset;f.run(w,function(Q){m.getExperiencesList(Q,function(R){if(m.isPlayerRunning){P.input=Q;P.input.experience=R}else{if(b.owns(P,"asset")){P=Q}else{P.asset=Q}P.experience=R}m.startSimReviewWeb(P,N)})});o.cleanMsgDom()}},startSimReviewWeb:function(N,w){w.simNavSyncServer.widgetTitle=D.getTitle();if(m.isPlayerRunning){N.options=w;B.load(N)}else{B=new z({container:"canvas-div",input:N,options:w})}m.isPlayerRunning=true},getPlayerOptions:function(N){var w={loading:"autoplay",callbacks:{asset:{LoadingFinished:function(O){var P=v.getPlatformType();if(P==="EV6"){v.setCollabSpacePref()}if(!O.isDefault){m.emptyOrDefaultModel=false}},experience:{error:function(){o.msg("CALLBACK_ERROR")}}}},simNavSyncServer:{server:"PubSub",interactive:true,widgetPrefix:n,widgetId:D.id,tabId:m.tabId,widgetTitle:null,newConnectionCallback:function(Q){var S=n+Q.id;var O=Q.title;if(Q.duplicateTitleId){O+=" - "+Q.duplicateTitleId.toString()}O=F.PREFERENCES_SYNC_PREFIX.msg+" "+O;if(Q.id===D.id){O+=" ("+F.PREFERENCES_SYNC_THIS.msg+")"}if(r.indexOf(S)<0){var P;if(!this.getPreference(n+d[0])||this.getPreference(n+d[0]).type==="hidden"){d.forEach((function(T){P=n+T;var U=N&&N.features?(N.features[T]?"true":"false"):"true";this.addPreference({name:P,type:"boolean",className:"toggle-switch",label:F[P].msg,defaultValue:U});this.setValue(P,U)}).bind(this))}var R;if(Q.syncOn){R="true"}else{R=this.getValue(S);if(R!=="true"){R=N&&N.syncdWidgetsList?(N.syncdWidgetsList.indexOf(S)>=0?"true":"false"):"false"}}this.addPreference({name:S,type:"boolean",label:O,defaultValue:R});this.setValue(S,R);r.push(S);j(false)}else{this.addPreference({name:S,type:"boolean",label:O,defaultValue:""});j(false)}if(m.isRefreshing){v.updateWidgetTitle();m.isRefreshing=false}}.bind(D),isRefreshing:function(){return m.isRefreshing},newDuplicateCallback:function(O){v.updateWidgetTitle({dupNb:O})},removeConnectionCallback:function(R){if(R!==D.id){var O=this.getPreferences();var P,Q=O.length;for(P=0;P<Q;P++){if(O[P].name===n+R&&O[P].type!=="hidden"){this.addPreference({name:O[P].name,type:"hidden"})}}r.splice(r.indexOf(n+R),1)}j(false)}.bind(D),updateSyncListCallback:function(O){if(O&&O.id!==D.id&&O.list){r.forEach(function(R){var S=O.list[R]?"true":"false";var Q=this.getPreference(R);if(Q){this.addPreference({name:R,type:"boolean",label:Q.label,defaultValue:S,value:S});this.setValue(R,S)}}.bind(this));var P=O.list[n+O.id];if(P){d.forEach((function(R){var S=n+R;var Q=P[R]?"true":"false";this.addPreference({name:S,type:"boolean",className:"toggle-switch",label:F[S].msg,defaultValue:Q,value:Q});this.setValue(S,Q)}).bind(this))}v.setSyncPref(j(false))}}.bind(D)}};_prepareDataForSimReview({options:w});return w},getParam4Default:function(){var w={experience:"3DPlayFullSimulation",asset:{provider:"FILE",filename:H.getWebappsBaseUrl()+"SimReviewWidget/assets/3DS_emblem.simxml",isDefaultModel:true}};return w},getParam4CollabSpace:function(Q){var w={};var N=Q.data.items;var O=this.findServerUrlById(N[0].envId,N[0].serviceId);v.updateWidgetTitle({title:""});if(O){var P={provider:"EV6",physicalid:N[0].objectId,serverurl:O,dtype:N[0].objectType,requiredAuth:"passport",tenant:N[0].envId};D.setValue("MODELID","");if(m.isPlayerRunning){w.input={asset:P}}else{w.asset=P}}else{o.msg("UNKNOWN_ENV_ID")}return w},findServerUrlById:function(w,Q){var P=m.platformList;var O=P.length;var R=false;for(var N=0;N<O;N++){if(P[N].platformId===w){R=P[N][Q]}}return R},onDropEvent:function(Q,N){if(N===true){m.startPlayer(Q)}else{var O=Q.data.items;var w=O.length;if(w>1){m.updateBoxMessage("ERROR")}else{if(O[0].serviceId==="3DSwym"){o.msg("PLATFORM_NOT_SUPPORTED")}else{var P=O[0].serviceId.toLowerCase();v.setPlatformType("EV6");if(P==="dropbox"||P==="google2"||P.indexOf("google")!==-1){o.msg("DRIVE_NOT_SUPPORTED")}else{if(O[0].objectType==="DesignSight"||O[0].objectType==="FEM"){var R=this.getParam4CollabSpace(Q);v.updateWidgetTitle({title:O[0].displayName});v.saveCollabSpacePref(Q);m.startPlayer(R)}else{m.updateBoxMessage("TYPE_ERROR")}}}}}},onDropFileEvent:function(w){var P=w.name.split(".");var O=P.pop();var N=i.get("SPYFemFileImport","0");if(N!=="0"){require([N,"DS/3DPlaySupport/ExperiencesList"],function(U,V){var S=JSON.parse(U);if(S.availableExtensions.indexOf(O.toLowerCase())>=0){var Q=y.computeUsage("SimReview");var R=[];for(var T=0;T<Q-1;T++){R.push("")}R[Q]="3DPlayFileImport";V["3DPlayFileImport"]={name:"3DPlayFileImport",decription:"proto Nas/Dat/Inp import XP",module:"DS/FemFileImport/3DPlayFileImport"};y.FILE[O.toLowerCase()]=R;if(m.isPlayerRunning){B.load({input:{experience:"3DPlayFileImport",asset:{provider:"BLOB",blob:w}}})}else{B=new z({container:"canvas-div",input:{experience:"3DPlayFileImport",asset:{provider:"FILE",blob:w}},options:{fullScreen:true,mode:"review",loading:"autoplay",simNavSyncServer:"PubSub"}})}m.isPlayerRunning=true}})}},onViewChange:function(w){m.widgetMode=(w&&w.type)?w.type:m.widgetMode;m.widgetHeight=(w&&w.height)?w.height:m.widgetHeight;m.updateHeight()},updateHeight:function(){D.body.setStyle("height",D.getViewportDimensions().height+"px")}};var t=function(){M.nls("SimReviewWidget/SimReviewWidget",p,function(N){for(var w=0;w<N.length;w++){F[p[w]].msg=N[w]}k.publish({event:"NlsReady"});x=true},widget.lang)};var c=function(){if(x){m.widgetInit()}else{t();k.subscribeOnce({event:"NlsReady"},function(){m.getDashboardInfo();k.subscribeOnce({event:"DashboardInfoReady"},function(){m.widgetInit()})})}};var E=function(){c();v=new q({widget:D})};var C=function(){if(g){g=false;v.setSyncPref(j());return}else{m.isRefreshing=true}m.updateHeight();if(m.isPlayerRunning){if(typeof(B.instance)!=="undefined"){B.instance.dispose()}m.isPlayerRunning=false;m.canvasDiv.empty()}E()};var J=function(){o.refreshMsgPosition();m.updateHeight();k.publish({event:"SPY/WIDGETRESIZED"})};var A=function(){m.onViewChange()};return function(w){D=w.widget;D.addEvent("onLoad",E);D.addEvent("onRefresh",C);D.addEvent("onResize",J);D.addEvent("onViewChange",A);D.addEvent("onEdit",function(){g=true});window.onunload=function(){if(B!==""&&B!==undefined&&B!==null){B.dispose()}}}});