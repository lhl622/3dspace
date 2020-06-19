define("DS/DELMFNApplicationServices/Commands/CommandsService",["UWA/Core","DS/Core/Events","DS/DELPPWServices/CommandsService/CommandsService","DS/DELPPWModelServices/ModelUtils"],function(e,d,a,c){var b=function b(z){var g=[],l=[],y,h=false,u="CommandsService",j,i=function(C,B){y.notifyApp(C,B)},v=function(C,B){y.toggleModule(C,B)},k=function k(){y.initState()},q=function m(){var F,J,B,G,D,I,H,E,C,K=z.getPlugins("SelectionPlugin");if(!K){z.getLogger().debug(u,"Selection Plugin is not available.");return}F=K.instance.getSelections("CMDS");B=F[0]||[];G=F[1]||[];D=F[2]||[];H=F[3]||[];E=F[4]||[];C=F[5]||[];J=[];I=[];j=H.length+E.length+C.length;y.manageCommandsAvailability(B,G,D,J,I)},n=function s(){if(h===true){h=false;widget.setValue("forceDBModePreferences","false")}else{h=true;widget.setValue("forceDBModePreferences","true")}z.getMediator().notify("refreshAll")},w=function w(){y.manageDocCmdAvailability()},t=function t(B){y.toggleCmdCheckHeaderState(B)},p=function p(){var B={cmdName:"BIEssentialsCmd",cmdState:false};y.toggleCmdCheckHeaderState(B)},A=function A(){y.manageGraphViewCmdAvailablity()},f=function f(){q()};y=new a(z);e.extend(y,{manageConfigurationCommands:function r(B,I,F,E){var H=(I>0),D=(j>0),C=(F>0),G;G=(!H&&!D&&C);y.setCommandState("DefineFilter",(B&&!H&&!D));y.setCommandState("EditConfigurationContext",G);y.setEffectivityCmdState("EditVariant",(!B&&G));y.setEffectivityCmdState("EditEvolution",(!B&&G))}});return{onStart:function x(B){g.push(z.addExternalListener("select",f));g.push(z.addExternalListener("toggleCmdCheckHeaderState",t));g.push(z.addExternalListener("actionBarReady",k));g.push(z.addExternalListener("manageDocCmdAvailability",w));g.push(z.addExternalListener("ManageGraphViewCmdAvailablity",A));g.push(z.addExternalListener("refreshAll",p));l.push(d.subscribe({event:"DELMFNCommands/CreateMfgItemAndScopeCmd"},function(C){i("CreateMfgItemAndScope",C)}));l.push(d.subscribe({event:"DELMFNCommands/AssignProductCmd"},function(C){i("AssignProduct",C)}));l.push(d.subscribe({event:"DELPPWCommands/Edit"},function(){n()}));l.push(d.subscribe({event:"DELPPWCommands/Hide"},function(C){i("Hide",C)}));l.push(d.subscribe({event:"DELPPWCommands/HideAll"},function(C){i("HideAll",C)}));l.push(d.subscribe({event:"DELPPWCommands/Relations"},function(C){v("LINKS",C)}));l.push(d.subscribe({event:"DELPPWCommands/ShowLogPanel"},function(C){i("ShowLogPanel",C)}));l.push(d.subscribe({event:"DELPPWCommands/Alternates"},function(C){v("ALTERNATE",C)}));l.push(d.subscribe({event:"DELPPWCommands/Origin"},function(C){v("ORIGIN",C)}));l.push(d.subscribe({event:"DELPPWCommands/CapableResource"},function(C){v("CAPRESOURCE",C)}));l.push(d.subscribe({event:"DELPPWCommands/CreateLink"},function(C){i("CreateLink",C)}));l.push(d.subscribe({event:"DELPPWCommands/CreateInstance"},function(C){i("CreateInstance",C)}));l.push(d.subscribe({event:"DELPPWCommands/CreateLinkOrInstance"},function(C){i("CreateLinkOrInstance",C)}));l.push(d.subscribe({event:"DELPPWCommands/InsertCmd"},function(C){i("InsertCmd",C)}));l.push(d.subscribe({event:"DELPPWCommands/UnassignProduct"},function(C){i("UnassignProduct",C)}));l.push(d.subscribe({event:"DELPPWCommands/CreateMfgItemStructure"},function(C){i("CreateMfgItemStructure",C)}));l.push(d.subscribe({event:"DELPPWCommands/UpdateMfgItemStructure"},function(C){i("UpdateMfgItemStructure",C)}));l.push(d.subscribe({event:"DELPPWCommands/ManageInconsistentLinks"},function(C){v("MIL",C)}));l.push(d.subscribe({event:"DELPPWCommands/BIEssentialsCmd"},function(C){i("BIEssentialsCmd",C)}));l.push(d.subscribe({event:"DELPPWCommands/DuplicateAdv"},function(C){i("DuplicateAdvCmd",C)}));l.push(d.subscribe({event:"DELPPWCommands/Delete"},function(C){i("Delete",C)}));l.push(d.subscribe({event:"DELPPWCommands/DetachInstance"},function(C){i("DetachInstance",C)}));l.push(d.subscribe({event:"DELPPWCommands/SearchAndAddInstanceCommand"},function(C){i("searchAndAddInstance",C)}));l.push(d.subscribe({event:"DELPPWCommands/ReplaceByLatestRevision"},function(C){i("ReplaceByLatestRevision",C)}));l.push(d.subscribe({event:"DELPPWCommands/ReplaceByExistingRevision"},function(C){i("ReplaceByExistingRevision",C)}));l.push(d.subscribe({event:"DELPPWCommands/ReplaceByNewRevision"},function(C){i("ReplaceByNewRevision",C)}));l.push(d.subscribe({event:"DELPPWCommands/CreateScopeLink"},function(C){i("CreateScopeLink",C)}));l.push(d.subscribe({event:"DELPPWCommands/DeleteScopeLink"},function(C){i("DeleteScopeLink",C)}));l.push(d.subscribe({event:"DELPPWCommands/ReconnectScope"},function(C){i("ReconnectScope",C)}));l.push(d.subscribe({event:"DELPPWCommands/ReviseAndReconnectScope"},function(C){i("ReviseAndReconnectScope",C)}));l.push(d.subscribe({event:"DELPPWCommands/ToggleGraphView"},function(C){i("ToggleGraphView",C)}));l.push(d.subscribe({event:"DELPPWCommands/Reframe"},function(C){i("Reframe",C)}));l.push(d.subscribe({event:"DELPPWCommands/ReframeOn"},function(C){i("ReframeOn",C)}));l.push(d.subscribe({event:"DELPPWCommands/ToggleOrientation"},function(C){i("ToggleOrientation",C)}));l.push(d.subscribe({event:"DELPPWCommands/ToggleOverview"},function(C){i("ToggleOverview",C)}));l.push(d.subscribe({event:"DELPPWCommands/ToggleAuxiliaryView"},function(C){i("toggleAuxPanel",C)}));l.push(d.subscribe({event:"DELPPWCommands/ProductsParts"},function(C){i("ProductsParts",C)}));l.push(d.subscribe({event:"DELPPWCommands/ManufacturingItems"},function(C){i("ManufacturingItems",C)}));l.push(d.subscribe({event:"DELPPWCommands/AttachDocument"},function(C){i("AttachDocumentCmd",C)}));l.push(d.subscribe({event:"DELPPWCommands/SearchDocument"},function(C){i("SearchDocumentCmd",C)}));l.push(d.subscribe({event:"DELPPWCommands/ManageDocuments"},function(C){i("ManageDocumentsCmd",C)}));l.push(d.subscribe({event:"DELPPWCommands/EditViewPreferences"},function(C){i("EditViewPreferencesCmd",C)}));l.push(d.subscribe({event:"DELPPWCommands/LayoutPreferences"},function(C){i("LayoutPreferences",C)}));l.push(d.subscribe({event:"DELPPWCommands/ExportCSV"},function(C){i("ExportCSVCmd",C)}));l.push(d.subscribe({event:"DELPPWCommands/ExpandAll"},function(C){i("expandAll",C)}));l.push(d.subscribe({event:"DELPPWCommands/Refresh"},function(C){i("RefreshCmd",C)}));y.onStart(B)},onStop:function o(){var C,B;for(C=0,B=g.length;C<B;C++){z.removeExternalListener(g[C])}g=[];for(C=0,B=l.length;C<B;C++){d.unsubscribe(l[C])}l=[]}}};return b});define("DS/DELMFNApplicationServices/Services",["UWA/Class"],function(b){var a="DS/DELMFNApplicationServices/",d={CommandsService:a+"Commands/CommandsService",LayoutService:a+"LayoutService"};var c=b.singleton({getMap:function e(){return d}});return c});define("DS/DELMFNApplicationServices/LayoutConfig",[],function(){var a={EBOM:{row:0,col:0,command:"ProductsParts"},MBOM:{row:0,col:1,command:"ManufacturingItems"}};return a});define("DS/DELMFNApplicationServices/LayoutService",["UWA/Core","DS/DELPPWServices/LayoutService/LayoutService","DS/DELMFNApplicationServices/LayoutConfig","DS/UIKIT/Mask"],function(e,d,b,c){var a=function(h){var i=new d(h),f=[],j,q,l,g;var p,n;p=function p(){var u,t;if(i.isLayoutBuilt()){return}i.buildView({rows:[{columns:2}],actionBarReady:function s(){if(e.is(t,"array")){t.forEach(function(v){h.getMediator().notify("toggleCmdCheckHeaderState",{cmdName:v.commandName,cmdState:v.state})})}i.showLayout();c.unmask(widget.body)}});i.removeDockingElement(WUXDockAreaEnum.TopDockArea);i.removeDockingElement(WUXDockAreaEnum.BottomDockArea);u=widget.getViewportDimensions();i.setDockingElement(WUXDockAreaEnum.LeftDockArea,{dockingZoneSize:(u.width)/4,collapseDockingZoneFlag:true});i.setDockingElement(WUXDockAreaEnum.RightDockArea,{dockingZoneSize:(u.width)/4,collapseDockingZoneFlag:true,resizableFlag:true,visibleDockingZoneFlag:false});q=i.buildTreeListAuthoringDom(true);l=i.buildTreeListAuthoringDom(true);g=i.buildAuxiliaryViewDom();i.setBlocLayoutContent(b.EBOM.row,b.EBOM.col,l);i.setBlocLayoutContent(b.MBOM.row,b.MBOM.col,q);t=i.setPreferredLayoutOnStartup(b)};n=function n(){f.push(h.addExternalListener(b.EBOM.command,function t(v){var u=i.isViewShown(b.EBOM.row,b.EBOM.col);if((u&&v.state===true)||(!u&&v.state===false)){return}i.toggleView(b.EBOM.row,b.EBOM.col,v.state)}));f.push(h.addExternalListener(b.MBOM.command,function t(v){var u=i.isViewShown(b.MBOM.row,b.MBOM.col);if((u&&v.state===true)||(!u&&v.state===false)){return}i.toggleView(b.MBOM.row,b.MBOM.col,v.state)}));f.push(h.addExternalListener("widgetLayoutChanged",function s(){var v,x,u,w;x=j.getPreference("widgetLayoutValues");if(e.is(x)){v=e.Json.decode(x);w=i.setPreferredLayout(v,b);u=w.deferredPromise;u.promise.then(function(){w.columns.forEach(function(y){h.getMediator().notify("toggleCmdCheckHeaderState",{cmdName:y.commandName,cmdState:y.state})})})}}))};return e.extend(i,{getContainer:function m(s){switch(s){case"layoutContainer":return i.getUIContainer();case"product_part":return l;case"process":return q;case"auxiliary":return g;case"alerts":return i.getAlertContainer();case"progressIndicator":return i.getProgressIndContainer();case"action":return i.getActionModuleContainer();case"none":return e.createElement("div",{"class":"empty-container"});default:h.getLogger().debug("MFN_LayoutService","Invalid side choice: %s",s)}},getLayoutConfig:function o(){return e.clone(b)},onStart:function r(s){j=h.getService("ConfigService");p();n();s()},onStop:function k(){var t,s;for(t=0,s=f.length;t<s;t++){h.removeExternalListener(f[t])}f=[]}})};return a});