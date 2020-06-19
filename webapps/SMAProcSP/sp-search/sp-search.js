/*!  Copyright 2015 Dassault Systemes. All rights reserved. */
(function(g){var e,c,a,b,f,l,n,k,o,h=/\s*,\s*/,d=0,j=0,m={ONCHANGE:"change",ONCLOSE:"close"},i={TRANSIENT:"SMAProcSP.SPSearch.1"};e=function(p){return Boolean(p)};c=function(p,q){var r=function(t){var s;try{s=JSON.parse(t.data)}catch(u){s=null}if(s&&s.searchSourceId===String(q)){if(s.operation==="plmSearch"){this._selectedObjects=n(s.selectedObjects);this.fire(m.ONCHANGE,this);g.top.removeEventListener("message",r)}}};r.displayName="SPSearch.searchCallback_"+q;return r.bind(p)};a=function(p){var q=function(r){this._selectedObjects=k(r);if(this.newSearchContextAlways&&this.socket){this.socket.dispatchEvent("UnregisterContext",{widget_id:this._opts.widget_id});this.socket.disconnect();delete this.socket}this.fire(m.ONCHANGE,this)};return q.bind(p)};o=function(p){var q=function(){if(this.newSearchContextAlways&&this.socket){this.socket.dispatchEvent("UnregisterContext",{widget_id:this._opts.widget_id});this.socket.disconnect();delete this.socket}this.fire(m.ONCLOSE,this)};return q.bind(p)};b=function(s,r){function t(u){return u?r[u]||"type_"+u.replace(/\s/g,""):null}r=r||{};var q=(s||"").split(h).map(t).filter(e);var p="type_DOCUMENTS:isVersionObject!=True";if(q.indexOf(p)>-1){q=q.filter(function(u){return u!==p});q.push(p)}return q.join(",")};f=function(r){var q=" AND NOT [ds6w:policy]:Version";function p(s){return s?'flattenedtaxonomies:"types/'+s+'"'+(s==="DOCUMENTS"?q:""):null}return"("+(r||"").split(h).map(p).filter(e).join(" OR ")+")"};l=function(p){p=p||{};return{objectId:p.objectId,objectType:p.objectType,displayName:p.displayName,modified:p.modified,description:p.description,objectTypeValue:p.objectTypeValue,displayIcon:p.displayIcon||""}};n=function(p){return(p||[]).map(function(q){return l({objectId:q.physicalid,displayName:q.title,objectType:q.type,modified:q.modified,description:q.description,objectTypeValue:q.objectTypeValue})})};k=function(p){return(p||[]).map(function(q){return l({objectId:q.resourceid,displayName:q["ds6w:label"],objectType:q["ds6w:type"],modified:q["ds6w:modified"],description:q.content,objectTypeValue:q["ds6w:type_value"],displayIcon:q.type_icon_url})})};g.DS=g.DS||{};g.DS.SMAProcSP=g.DS.SMAProcSP||{};g.DS.SMAProcSP.SPSearch=Polymer({is:"sp-search",behaviors:[g.DS.SMAProcSP.SPBase],properties:{multiSelect:{type:Boolean,value:false,notify:true},plmTypes:{type:String,value:"",notify:true},selectMode:{type:Boolean,value:true,notify:true},widgetId:{value:null,notify:true,observer:"widgetIdChanged"},stayOnSearch:{type:Object,value:true,notify:true},newSearchContextAlways:{type:Object,value:false,notify:true}},ready:function(){this._selectedObjects=[];if(g.widget){g.widget.setValue("stayOnSearch",this.stayOnSearch)}},registerSearchContext:function(p){var r=this,q=r.$.dashboard.getWidgetId(r);if(q){d++;r._opts={widget_id:q,tenant:g.widget?g.widget.getValue("x3dPlatformId"):"OnPremise",app_socket_id:"sp-search_"+q+"_"+d,mode:r.selectMode?"furtive":"default",multiSel:Boolean(r.multiSelect),default_with_precond:true,show_precond:false,role:""};require(["UWA/Utils/InterCom"],function(s){r.socket=new s.Socket(r._opts.app_socket_id,{dispacthRetryInterval:0});r.socket.subscribeServer("SearchComServer");r.socket.dispatchEvent("RegisterContext",r._opts);r.socket.addListener("Selected_Objects_search",a(r));r.socket.addListener("onCloseTransient",o(r));if(p){setTimeout(p,10)}})}else{throw new Error("SPSearch missing widgetId parameter")}},destroy:function(){if(this.socket){this.socket.dispatchEvent("UnregisterContext",{widget_id:this._opts.widget_id});this.socket.disconnect();delete this.socket}},getSelectedObjects:function(){return this._selectedObjects},getSelectedObjectIds:function(){return(this._selectedObjects||[]).map(function(p){return p.objectId})},search:function(F){var z=this,y=z.$.dashboard.getWidgetId(z);var A="preview-";var t=g.dscef&&g.dscef.sendString;if(t){var B=this.plmTypes;var E=(new DOMParser()).parseFromString("<Message/>","text/xml");var q=E.getElementsByTagName("Message")[0];q.setAttribute("origin","Web");q.setAttribute("messageType","POST");q.setAttribute("jsCallback","searchResultsReady");q.setAttribute("result","");var r=E.createElement("Request");r.setAttribute("id","Search");r.setAttribute("result","OK");var x=E.createElement("Payload");var v=E.createElement("Data");var D=E.createElement("busType");var w=E.createElement("Response");var s=E.createCDATASection(B);D.appendChild(s);v.appendChild(D);x.appendChild(v);r.appendChild(x);r.appendChild(w);q.appendChild(r);var C=(new XMLSerializer()).serializeToString(q);t(C);var u=function(G){this._selectedObjects=G;this.fire(m.ONCHANGE,this)};z.fire("winsearchcallback",u.bind(z))}else{if(z.$.dashboard.isInDashboard()){if(y&&(y.substr(0,A.length)===A)){this.fire(this.COMMON_EVENTS.ERROR,{errorCode:i.TRANSIENT,message:"Search is not possible in Transient Mode. Pin this widget to enable Search",isFatal:false})}else{var p=function(){z._opts.precond=f(z.plmTypes);z._opts.default_search_criteria=F;if(z.socket){z.socket.dispatchEvent("InContextSearch",z._opts)}else{throw new Error("SPSearch socket not initialized")}};if(z.socket){p()}else{z.registerSearchContext(p)}}}else{z.searchIn3DSpace(F)}}},searchIn3DSpace:function(q,p){require(["text!DS/SMAProcSP/assets/sp-search.json"],function(w){var r;try{r=JSON.parse(w)}catch(v){r=null;if(g.console&&g.console.warn){g.console.warn("SPSearch: Check sp-search.json syntax. JSON parsing failed.",v)}}var t=b(this.plmTypes,r);j++;var x="../simulationcentral/smaSpSearch.jsp?searchSourceId="+j;var s=this.$.dashboard.getAuthenticatedJspUri("/common/emxFullSearch.jsp?"+this.JS.toQueryString({table:"AEFGeneralSearchResults",selection:this.multiSelect===true?"multiple":"single",txtTextSearch:q||"",showInitialResults:"true",field:p?p:"TYPES="+t,submitURL:x}));try{g.top.addEventListener("message",c(this,j),false);var u=g.top;u.showModalDialog(s)}catch(v){if(g.console&&g.console.warn){g.console.warn("SPSearch: Failed to start search",v)}}}.bind(this),function(r){if(g.console&&g.console.warn){g.console.warn("SPSearch: Failed to load type mapping",r)}throw r})},widgetIdChanged:function(p){if(p!==undefined){this.widgetId=p;if(this.socket){this.socket.disconnect();this.socket=null}}}});g.DS.SMAProcSP.SPSearch.ERRORCODES=i}(this));