define("SMAProcSimListingUI/SimulationListWidget",["UWA/Core"],function(c){var d,a,e,b={unauthorized:"You are not authorized for this widget.<br>Please contact your system administrator for access and re-login to ensure latest assigned licenses are taken into account.",failedLicenseCheck:"Failed to check license. Please reload the browser tab.",failedContext:"Unable to get security context. "};e=function(){window.widget.mySim={cStorage:{}};var f=widget.getValue("filter");widget.setTitle(f);widget.body.empty();d.spDashboard=c.createElement("sp-dashboard");require(["DS/WAFData/WAFData"],function(g){d.spDashboard.fetchMyappsUri().then(function(h){g.authenticatedRequest(h+"/resources/AppsMngt/user/startup",{type:"json",onComplete:function(i){window.widget.mySim.cStorage=i.cstorage},onError:function(){console.log("Unable to set cspaces")}})})});d.spDashboard.addReadOnlyWAPreference();d.spDashboard.addWUTenantPreference().then(function(){})["catch"](function(g){alert(g)});d.spDashboard.addSecurityContextPreference().then(function(){d.psListView=c.createElement("ps-list-view");d.psListView.setAttributes({id:"psListView"});d.psListView.licenseDataCmn=widget.license;d.psListView.inject(widget.body);d.psListView.addEvents({maximize:function(){if(widget.getView().type!=="fullscreen"&&widget.getView().type!=="maximized"){widget.requestView("maximized")}}});d.psListView.setStyle("height",widget.getViewportDimensions().height);d.resizeView()})["catch"](function(g){console.log(b.failedContext+g)})};a=function(){var g=document.createElement("sp-mcsservice");var f=g.$.dashboard.getMcsUri()+"/resources/slmservices/license?appNames=Performance_Study,Results_Analytics,Simulation_Companion,Process_Composer";widget.body.empty();g.sendRequest({verb:"GET",uri:f,onComplete:function(i){widget.license=JSON.parse(i.response);var h=widget.license&&widget.license.Performance_Study==="true";if(h){e()}else{d.displayError(b.unauthorized)}},onError:function(){d.displayError(b.failedLicenseCheck)}})};d={psListView:null,unMaximizedHeight:null,_securityContent:null,onLoad:function(){widget.body.empty();a()},displayError:function(f){var g=document.createElement("div");g.className="errorDiv";var h=document.createElement("p");h.className="errorText";h.innerHTML=f;g.setAttribute("id","errorDiv");h.setAttribute("id","errorText");widget.body.appendChild(g);g.appendChild(h);widget.readOnly=true},onRefresh:function(){d.psListView.onRefresh()},resizeView:function(){if((widget.getView().type==="fullscreen")||(widget.getView().type==="maximized")){d.psListView&&d.psListView.setMaximizedView(widget.getViewportDimensions().height)}else{d.psListView&&d.psListView.setMinimizedView(widget.getViewportDimensions().height)}},onViewChange:function(){d.resizeView()},onResize:function(){d.resizeView()},onPreferencechange:function(f,g){d.psListView.applyPreferences(f,g)},onEdit:function(){d._securityContent=d.spDashboard.getSecurityContext()},endEdit:function(){var h=widget.getValue("filter"),f=widget.getValue("limit"),g={};g.filter=h;g.limit=parseInt(f);var i=widget.getValue("filter");widget.setTitle(i);d.psListView.applyPreferences(g);if(d._securityContent!==d.spDashboard.getSecurityContext()){d.psListView.collabSpaceChanged(d.spDashboard.getSecurityContext())}}};widget.addEvents({onLoad:d.onLoad,onRefresh:d.onRefresh,onViewChange:d.onViewChange,onResize:d.onResize,onEdit:d.onEdit,endEdit:d.endEdit});return d});