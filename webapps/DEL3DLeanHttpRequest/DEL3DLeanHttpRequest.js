define("DS/DEL3DLeanHttpRequest/TouchService",["UWA/Core","UWA/Class/Promise","pluginDS!DS/VENMarionette/backbone.marionette.3.5.1/backbone.marionette","DS/Logger/Logger"],function(h,d,g,a){var e;var c=null;function b(){if(!h.is(c)){c=new e()}return c}e=g.Object.extend({name:"TouchService",_logger:null,constructor:function f(){g.Object.prototype.constructor.apply(this,arguments)},initialize:function(){this._logger=a.getLogger(e)},detectTouchscreen:function(){var i=false;if(window.PointerEvent&&("maxTouchPoints" in navigator)){if(navigator.maxTouchPoints>0){i=true}}else{if(window.matchMedia&&window.matchMedia("(any-pointer:coarse)").matches){i=true}else{if(window.TouchEvent||("ontouchstart" in window)){i=true}}}return i}});return b()});define("DS/DEL3DLeanHttpRequest/LiveSocket",["UWA/Core","pluginDS!DS/VENMarionette/backbone.marionette.3.5.1/backbone.marionette","pluginDS!DS/VENBackboneRadio/backbone.radio.2.0.0/backbone.radio","DS/Logger/Logger"],function(f,e,d,b){var c=e.Object.extend({name:"LiveSocket",socketChannel:d.channel("live"),_ready:false,_sessionId:null,_url:null,_socket:null,_liveId:null,_welcomeMessages:new Map(),_meetingHostMessage:undefined,_receivedCache:[],_sendCache:[],_nbUsers:0,constructor:function a(){e.Object.prototype.constructor.apply(this,arguments)},initialize:function(g){this._sessionId=this.getOption("sessionId")||this.getSessionId();this._protocols=this.getOption("protocols")||["inside","outside"];this._ready=this.getOption("ready")!==false;if(!f.is(this._logger)){this._logger=b.getLogger(c)}this._socket=new WebSocket(this.getUrl(),this.getProtocols());this._bindSocket()},isReady:function(){return this._ready},setReady:function(g){this._ready=g;if(g===true){this.treatMessageCache()}},addReceivedCache:function(g){if(f.is(g.fctName)&&g.fctName==="_socketMeetingFocus"){var i=this._receivedCache.find(function(j){if(f.is(j.fctName)&&j.fctName==="_socketMeetingFocus"){return true}});if(f.is(i)){var h=this._receivedCache.indexOf(i);this._receivedCache.splice(h,1)}}if(this._receivedCache.length<1000){this._receivedCache.push(g)}else{this._logger.warn("Received cache full, Live message dropped")}},addSendCache:function(g){if(this._sendCache.length<1000){this._sendCache.push(g)}else{this._logger.warn("Send cache full, Live message dropped")}},treatMessageCache:function(){var g=undefined;while(f.is((g=this._receivedCache.shift()))){this.treatMessage(g)}},treatSendCache:function(){if(this.isConnected()){var g=undefined;while(f.is((g=this._sendCache.shift()))){this._socket.send(g)}}},_bindSocket:function(){if(this._socket){this._socket.onopen=this.onOpen.bind(this);this._socket.onmessage=this.onMessage.bind(this);this._socket.onerror=this.onError.bind(this);this._socket.onclose=this.onClose.bind(this)}else{this._logger.error("No WebSocket defined")}},send:function(g,h){if(this.isReady()){h=h||{};if(!f.is(g,"object")){return}if(f.is(this.getLiveId())){g.liveId=this.getLiveId()}var j=JSON.stringify(g);if(f.is(h.welcomeAction)){var i=h.welcomeKey||g.pid+":"+g.eventType;this._updateWelcomeMsg(i,j,h.welcomeAction)}if(this.isConnected()){this._socket.send(j)}else{this.addSendCache(j)}}},isConnected:function(){return f.is(this._socket)&&this._socket.readyState===1},getUrl:function(){return"wss://"+location.hostname+"/3DLeanLive/"+this.getSessionId()},getProtocols:function(){return this._protocols},getSessionId:function(){return this._sessionId},onOpen:function(g){this._logger.info("Websocket : open");this.treatSendCache();this.socketChannel.trigger("connected",g)},onClose:function(g){this._logger.warn("Websocket : close");this.socketChannel.trigger("disconnected",g)},onError:function(){this._logger.error("Websocket : open")},onMessage:function(j){var i=null;var g=null;if(j&&j.data){i=j.data;if(i){if(f.is(i,"string")){try{g=JSON.parse(i);if(!this.isReady()){this.addReceivedCache(g)}else{if(!f.is(g.isWelcomeMessage)||!g.isWelcomeMessage){this.treatMessage(g)}}}catch(h){this._logger.error("Websocket : invalid json message");this._logger.error(h)}}else{this._logger.warn("WebLiveSocket : message is not a string")}}else{this._logger.warn("WebLiveSocket : Received empty message")}}else{this._logger.warn("WebLiveSocket : No event or no data")}},treatMessage:function(g){if(f.is(g.userConnection)||f.is(g.userDisconnection)){this._manageUserConnection(g)}else{if(f.is(g.eventType)){this._manageMeetingMessage(g);if(f.is(g.pid)){this.socketChannel.trigger(g.pid+":"+g.eventType,g)}else{this.socketChannel.trigger(g.eventType,g)}}else{this._logger.warn("WebLiveSocket : Message does not contain pid or eventType")}}},_updateWelcomeMsg:function(g,h,i){if(f.is(i,"string")){switch(i.toLowerCase()){case"add":case"replace":this._welcomeMessages.set(g,h);break;case"remove":case"delete":this._welcomeMessages["delete"](g);break;case"flush":this._welcomeMessages.clear();break;default:break}}},_manageUserConnection:function(p){var n=f.getGlobal().leanSessionManager;var o=n.getModelEnum();var k=n.getCollectionEnum();var j=k.PEOPLES.sessionInstance;var l=undefined;var g=undefined;var h=0;if(f.is(p.userConnection)){g=parseInt(p.userConnection,16);this._nbUsers++;var m=j.model.prototype.idAttribute;j.model.prototype.idAttribute="id";l=new o.PERSON.modelConstructor({id:g,liveId:g});j.add(l);if(!f.is(this._liveId)){this.setLiveId(g);for(g in p.usersConnected){this._nbUsers++;l=new o.PERSON.modelConstructor({id:g,liveId:g});j.add(l)}}j.model.prototype.idAttribute=m;this._sendWelcomeMessages();this.socketChannel.trigger("user:connection",p)}else{if(f.is(p.userDisconnection)){this._nbUsers--;g=parseInt(p.userDisconnection,16);j.remove(g);if(this.isHostLiveId(g)){this.stopMeeting()}this.socketChannel.trigger("user:disconnection",p)}}},_sendWelcomeMessages:function(){var g=this;this._welcomeMessages.forEach(function(i){var h=JSON.parse(i);h.isWelcomeMessage=true;g._socket.send(JSON.stringify(h))})},_manageMeetingMessage:function(g){if(this.isPreparing(g)){this._meetingHostMessage={eventType:"meeting:stop",liveId:g.liveId}}else{if(this.isStopped(g)){this._meetingHostMessage=null}}},isPreparing:function(g){return(f.is(g.info,"object")&&g.info.meetingInfo==="preparation"&&g.args[0]===true)},isStopped:function(g){return g.eventType==="meeting:stop"||(f.is(g.info,"object")&&g.info.meetingInfo==="preparation"&&g.args[0]===false)},stopMeeting:function(){if(f.is(this._meetingHostMessage)){this.socketChannel.trigger(this._meetingHostMessage.eventType,this._meetingHostMessage);this._meetingHostMessage=null}},isHostLiveId:function(g){return f.is(this._meetingHostMessage)&&this._meetingHostMessage.liveId===g},setLiveId:function(g){this._liveId=g},getLiveId:function(){return f.is(this._liveId)?this._liveId:0},getNbUsersConnected:function(){return this._nbUsers}});return c});define("DS/DEL3DLeanHttpRequest/LinkGenerator",["UWA/Core","UWA/Class/Promise","pluginDS!DS/VENMarionette/backbone.marionette.3.5.1/backbone.marionette","DS/Logger/Logger","DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices"],function(h,d,g,a,f){var c;var e;function b(){if(!h.is(c)){c=new e()}return c}e=g.Object.extend({name:"LinkGenerator",_logger:a.getLogger(e),_swymUlPromiseCache:null,_swymUrlCache:null,computeServiceURL:function(o,l){var m=this;this._logger.log("BEGIN computeServiceURL");var j=null;var i=widget.getValue("x3dPlatformId");widget.setValue("ServicesInfos",j);widget.setValue("PlatformID",i);f.getPlatformServices({platformId:i,onComplete:function n(p){if(h.is(p,"array")){p=p[0]}if(typeof p==="object"&&Object.keys(p).length>0){widget.setValue("ServicesInfos",p);widget.setValue("PlatformID",p.platformId);m._logger.log("computeServiceURL OK");if(typeof o==="function"){o()}}else{m._logger.log("computeServiceURL KO");if(typeof l==="function"){l()}}},onFailure:function k(){m._logger.log("computeServiceURL KO");if(typeof l==="function"){l()}}});this._logger.log("END computeServiceURL")},getSwymUrl:function(){return widget.getValue("ServicesInfos")["3DSwym"]},get3DSpaceUrl:function(){return widget.getValue("ServicesInfos")["3DSpace"]}});return b()});define("DS/DEL3DLeanHttpRequest/MessageHandler",["UWA/Core","pluginDS!DS/VENMarionette/backbone.marionette.3.5.1/backbone.marionette","pluginDS!DS/VENBackboneRadio/backbone.radio.2.0.0/backbone.radio","DS/Logger/Logger","DS/DEL3DLeanHttpRequest/LiveSocket"],function(h,g,e,b,a){var d=null;var f=g.Object.extend({name:"MessageHandler",socketChannel:e.channel("live"),loadingRadioChannel:e.channel("loadging"),_sockets:[],_sessionLoaded:false,constructor:function f(){g.Object.prototype.constructor.apply(this,arguments)},initialize:function(){if(!h.is(this._logger)){this._logger=b.getLogger(f)}this.onSessionLoadedDelegate=$.proxy(this.onSessionLoaded,this)},onSessionLoaded:function(){this._sessionLoaded=true;for(var i in this._sockets){this._sockets[i].setReady(true)}},isSessionLoaded:function(){return this._sessionLoaded},init:function(j,i){j=j||this.getSessionId();i=i||["inside","outside"];if(j in this._sockets){return}if(!this.isSessionLoaded()&&h.is(h.getGlobal().leanSessionManager)){this.loadingRadioChannel.once("loaded",this.onSessionLoadedDelegate)}this._sockets[j]=new a({sessionId:j,protocols:i,ready:this.isSessionLoaded()})},send:function(i,j){j=j||{};var l=j.sessionId||this.getSessionId();var k=j.protocols;this.init(l,k);if(l in this._sockets){this._sockets[l].send(i,j)}},getSessionId:function(){return h.getGlobal().leanSessionManager.getSessionId()},getLiveId:function(){var j=0;var i=this.getSessionId();if(i in this._sockets){j=this._sockets[i].getLiveId()}return j},getNbUsersConnected:function(i){i=i||this.getSessionId();var j=0;if(i in this._sockets){j=this._sockets[i].getNbUsersConnected()}return j}});function c(){if(!h.is(d)){d=new f()}return d}return c()});define("DS/DEL3DLeanHttpRequest/HttpRequest",["UWA/Core","UWA/Promise","pluginDS!DS/VENUnderscore/underscore.1.8.3/underscore","pluginDS!DS/VENMarionette/backbone.marionette.3.5.1/backbone.marionette","pluginDS!DS/VENBackboneRadio/backbone.radio.2.0.0/backbone.radio","DS/Logger/Logger","DS/DEL3DLeanHttpRequest/LinkGenerator","DS/WAFData/WAFData"],function(b,f,j,e,k,a,c,g){var d;var i=e.Object.extend({name:"HttpRequest",_logger:null,_pingInterval:5*60,_timer:null,connectionChannel:k.channel("connection"),constructor:function i(){e.Object.prototype.constructor.apply(this,arguments)},initialize:function(){if(!b.is(this._logger)){this._logger=a.getLogger(i)}this.startTimer()},ping:function(){this.request("/resources/modeler/3dlean/api/ping",{isPing:true})},restartTimer:function(){this.stopTimer().startTimer();return this},startTimer:function(){if(!b.is(this._timer)){this._timer=setInterval(this.ping.bind(this),this._pingInterval*1000)}return this},stopTimer:function(){if(b.is(this._timer)){clearInterval(this._timer);this._timer=null}return this},request:function(v,r){r=r||{};if(!b.is(v)){d._error("url parameter is mandatory",r.error);return}if("string"!==typeof v){d._error("url parameter must be a string",r.error)}var w=c.get3DSpaceUrl()+v;var s=r.type||"GET";var p=r.data||{};var t=Date.now();var m;var n=r.context||null;var q=function(x,y){d.connectionChannel.trigger("httpResponse",{type:"error",startTime:t});d._logger.error("ERROR "+s+" "+v);d._logger.error(x);if("function"===typeof r.error){r.error.call(n,x,y)}};var l=function(x,y){d.connectionChannel.trigger("httpResponse",{type:"success",startTime:t});if("function"===typeof r.success){r.success.call(n,x,y)}};var u=function(){d.connectionChannel.trigger("httpResponse",{type:"timeout",startTime:t});d._logger.warn("TIMEOUT "+s+" "+v);d._logger.log("retrying "+s+" "+v);d.request(v,r)};var o=j.extend({Accept:"application/json,text/javascript,*/*","Accept-Language":"fr","Content-Type":"application/ds-json",SecurityContext:this._getSecurityContext()},r.headerParameters);m=this._encodeUrlParameters(r.urlParameters);w=w+m;if("GET"===s){p=null}g.authenticatedRequest(w,{proxy:"passport",method:s,headers:o,timeout:120000,data:p,onFailure:q,onComplete:l,onTimeout:u});if(!r.isPing){this.restartTimer()}},getMimeType:function(m){var l=f.deferred();var n=new XMLHttpRequest();n.open("HEAD",m,true);n.onreadystatechange=function(){if(this.readyState===this.DONE){var q=this.getResponseHeader("Content-Type");if(b.is(q)){var p=q.split(";")[0];var o=p.split("/");l.resolve(o[0],o[1])}else{l.reject()}}};n.send();return l.promise},_encodeUrlParameters:function(p){if(typeof p==="string"){return p}var o=true;var n=null;var l="";for(n in p){var m=p[n];if(o){l="?";o=false}else{l+="&"}l+=n+"="+m}return l},_logTime:function(m,n,o){var l=Date.now();d._logger.log("END "+m+" "+n+" in "+(l-o)+" ms")},_error:function(m,l){d._logger.error(m);if("function"===l){l(m)}},_success:function(){d._logger.log()},_getSecurityContext:function(){var n=widget.getValue("TeamSecurityContext");var o=typeof n==="string"&&n.length>0&&n.contains("VPLMProjectLeader");if(!o){var p=b.getGlobal();var l=widget.getValue("SecurityContext");var m=p.privateTeamCollabSpace;if(p.sessionLoaded===true&&typeof m==="string"&&m.length>0&&l){n=l.replace(/(.+)\.(.+)\.(.+)/,"VPLMProjectLeader.$2."+m);widget.setValue("TeamSecurityContext",n);return n}return l}return n}});function h(){if(!b.is(d)){d=new i()}return d}return h()});define("DS/DEL3DLeanHttpRequest/ImageService",["UWA/Core","pluginDS!DS/VENJQuery/jquery.1.11.1/jquery","pluginDS!DS/VENUnderscore/underscore.1.8.3/underscore","UWA/Class/Promise","pluginDS!DS/VENMarionette/backbone.marionette.3.5.1/backbone.marionette","DS/Logger/Logger","DS/DEL3DLeanHttpRequest/LinkGenerator","DS/DocumentManagement/DocumentManagement","DS/DEL3DLeanHttpRequest/HttpRequest","DS/WebappsUtils/WebappsUtils"],function(c,d,m,h,g,a,f,j,l,b){var i;var e=null;function k(){if(!c.is(e)){e=new i();e._storage={}}return e}i=g.Object.extend({name:"ImageService",_logger:null,constructor:function i(){g.Object.prototype.constructor.apply(this,arguments)},initialize:function(){this._logger=a.getLogger(i)},deleteDocument:function(q){var p={};var n=widget.getValue("TeamSecurityContext");if(typeof n!=="string"||n.length<=0){n=widget.getValue("SecurityContext")}c.merge(p,{securityContext:n,onComplete:function r(){},onFailure:function o(){}});j.deleteDocument(q,p)},getImage:function(p,n,t){var r=this;var q=h.deferred();if(!c.is(p)){q.reject();return q.promise}if(t!==true&&c.is(this._storage)&&c.is(n)&&this._storage.hasOwnProperty(p+"-"+n)){q.resolve(this._storage[p+"-"+n])}else{if(t!==true&&c.is(this._storage)&&!c.is(n)&&this._storage.hasOwnProperty(p)){q.resolve(this._storage[p])}else{var o=widget.getValue("TeamSecurityContext");if(typeof o!=="string"||o.length<=0){o=widget.getValue("SecurityContext")}var s={onComplete:d.proxy(function(w){var u=new FileReader();u.onload=d.proxy(function(y){var x;if(navigator.userAgent.toLowerCase().indexOf("firefox")>-1){x=y.target.result}else{x=y.srcElement.result}x=x.replace("data:application/octet-stream","data:image/png");if(c.is(n)){this._storage[p+"-"+n]=x}else{this._storage[p]=x}q.resolve(x)},this);var v=new XMLHttpRequest();v.open("GET",w,true);v.responseType="blob";v.onload=d.proxy(function(){u.readAsDataURL(v.response)},this);v.send()},r),onFailure:d.proxy(function(u){q.reject(u)},r)};j.downloadDocument(p,n,false,s)}}return q.promise},getImageFromCache:function(o,n){var p=undefined;if(c.is(this._storage)&&c.is(o)){if(c.is(n)&&this._storage.hasOwnProperty(o+"-"+n)){p=this._storage[o+"-"+n]}else{if(!c.is(n)&&this._storage.hasOwnProperty(o)){p=this._storage[o]}}}return p},setImage:function(r,u,q,o,p){var s=h.deferred();q=q||{};o=o||undefined;if(!c.is(p)){p=widget.getValue("TeamSecurityContext");if(typeof p!=="string"||p.length<=0){p=widget.getValue("SecurityContext")}}var n=this.dataUrlToFile(o,r);var t=d.proxy(function(v){if(c.is(v)&&c.is(v.data)&&v.data.length>0){this._storage[v.data[0].id]=r;var w=undefined;if(v.data[0].relateddata.files.length>0){w=v.data[0].relateddata.files[0].id}s.resolve(v.data[0].id,w)}else{s.reject()}},this);m.extend(q,{id:u,fileInfo:{file:n}});if(c.is(u)){j.modifyDocument(q,{onComplete:function(){},onFailure:function(v){s.reject(v)},securityContext:p});this._storage[u]=r;s.resolve(u)}else{j.createDocument(q,{onComplete:t,onFailure:function(v){s.reject(v)},securityContext:p})}return s.promise},getUserPicture:function(n){var r=h.deferred();var p=function(){var s=b.getWebappsAssetUrl("DEL3DLeanViews","icons");var t=s+"/DefaultPeople.png";r.resolve(t)};var o=f.getSwymUrl();if(!c.is(o)){if(document.URL.contains(".3ds.com")){r.resolve("https://widgetfactory.extranet.3ds.com/proxies/dsxpeoplephoto/picture/crop/login/"+n+"/width/128/height/128")}else{p()}}else{var q;if(n){q=o+"/api/user/getpicture/login/"+n+"/format/normal";r.resolve(q)}}return r.promise},isDataUrl:function(n){return/^data:image\/([a-zA-Z+]*);base64,[^"]*/i.test(n)},dataUrlToFile:function(r,v){var t;if(v.split(",")[0].indexOf("base64")>=0){t=atob(v.split(",")[1].split(")")[0])}else{t=unescape(v.split(",")[1].split(")")[0])}var s=v.split(",")[0].split(":")[1].split(";")[0];var q=new Uint8Array(t.length);for(var o=0;o<t.length;o++){q[o]=t.charCodeAt(o)}var u={type:s,lastModifiedDate:new Date(),name:r};var n=null;try{n=new File([q],r,u)}catch(p){n=new Blob([q],{type:u.type});n.lastModifiedDate=u.lastModifiedDate;n.name=u.name}return n},generateFileName:function(n,o){var p=c.is(n)?n+"_":"";p+=Date.toISOString();p+=c.is(o)?"_"+o:"";return p}});return k()});define("DS/DEL3DLeanHttpRequest/SecurityContext",["UWA/Core","pluginDS!DS/VENJQuery/jquery.1.11.1/jquery","pluginDS!DS/VENUnderscore/underscore.1.8.3/underscore","DS/Logger/Logger","DS/DEL3DLeanHttpRequest/LinkGenerator","DS/DEL3DLeanHttpRequest/HttpRequest","DS/DEL3DLeanEnums/Collection.enum"],function(h,f,c,b,g,e,a){var d;d={name:"SecurityContext",_logger:b.getLogger(d),computeSecurityContext:function(l,k){d._logger.log("BEGIN computeSecurityContext");if(widget.getValue("SecurityContext")!==undefined){widget.setValue("SecurityContext",undefined)}g.computeServiceURL(f.proxy(function i(){var n="/resources/modeler/pno/person";var p="?current=true&select=preferredcredentials&select=collabspaces";e.request(n,{urlParameters:p,proxy:"passport",success:f.proxy(function m(u){var w=JSON.parse(u)||{};var x="My 3DLean - "+w.name+" - Team";var s=this.findSecurityContext(w.collabspaces,{collabspace:x,role:"(VPLMCreator|VPLMProjectLeader)"});if(s&&s.length>0){this.setTeamSecurityContext(s[0].sctx)}else{if(!this.hasTeamSecurityContext()){this.setTeamSecurityContext(undefined)}}this.setPrivileges(w);if(h.is(w.preferredcredentials)&&h.is(w.preferredcredentials.role)&&h.is(w.preferredcredentials.role.name)&&w.preferredcredentials.role.name.length>0&&h.is(w.preferredcredentials.organization)&&h.is(w.preferredcredentials.organization.name)&&w.preferredcredentials.organization.name.length>0&&h.is(w.preferredcredentials.collabspace)&&h.is(w.preferredcredentials.collabspace.name)&&w.preferredcredentials.collabspace.name.length>0){var v=w.preferredcredentials.role.name;var r=w.preferredcredentials.organization.name;var t=w.preferredcredentials.collabspace.name;var q=v+"."+r+"."+t;this.setSecurityContext(q)}l()},this),error:function o(){k()}})},this),function j(){d._logger.log("computeSecurityContext KO")});d._logger.log("END computeSecurityContext")},setSecurityContext:function(i){widget.setValue("SecurityContext",i)},setPrivileges:function(l){var i=a.PEOPLES.sessionInstance;var j=l.name;var n=i.getOrFetch(j);var m="My 3DLean - "+l.name+" - Team";var k=c.findWhere(l.collabspaces,{name:m});if(h.is(k)){n.initPrivileges(k.couples)}},getSecurityContext:function(){return widget.getValue("SecurityContext")},hasSecurityContext:function(){return h.is(this.getSecurityContext())},setTeamSecurityContext:function(i){widget.setValue("TeamSecurityContext",i)},getTeamSecurityContext:function(){return widget.getValue("TeamSecurityContext")},hasTeamSecurityContext:function(){return h.is(this.getTeamSecurityContext())},findSecurityContext:function(j,n){var r=[];var p=null;var q=RegExp(".*");var m=RegExp(".*");var l=RegExp(".*");if(h.is(n)){q=RegExp(n.role);m=RegExp(n.organization);l=RegExp(n.collabspace)}for(p in j){var k=j[p];if(k.name.match(l)){for(var i in k.couples){var o=k.couples[i];if(o.role.name.match(q)&&o.organization.name.match(m)){r.push({role:o.role.name,organization:o.organization.name,collabspace:k.name,sctx:o.role.name+"."+o.organization.name+"."+k.name})}}}}return r}};return d});define("DS/DEL3DLeanHttpRequest/PeopleService",["UWA/Core","pluginDS!DS/VENJQuery/jquery.1.11.1/jquery","pluginDS!DS/VENUnderscore/underscore.1.8.3/underscore","UWA/Class/Promise","DS/DEL3DLeanHttpRequest/HttpRequest","DS/DEL3DLeanSession/Session.manager","DS/DEL3DLeanEnums/Collection.enum","pluginDS!DS/VENMarionette/backbone.marionette.3.5.1/backbone.marionette","DS/Logger/Logger"],function(c,d,l,i,k,e,a,h,b){var g;var f=null;function j(){if(!c.is(f)){f=new g();f._storage={}}return f}g=h.Object.extend({name:"PeopleService",_logger:null,constructor:function g(){h.Object.prototype.constructor.apply(this,arguments)},initialize:function(){this._logger=b.getLogger(g)},searchPeople:function(o,n,m){k.request("/resources/enocsmrest/peoples?filter="+o+"&limit=12",{success:n,error:m})},_addPeople:function(n,m){if(n.get("author")===true){m.set("privileges",["VPLMCreator"])}else{m.set("privileges",["VPLMExperimenter"])}return m},_addSuccessCallBack:function(){},_addErrorCallBack:function(){this.set("privileges",[]);a.PEOPLES.sessionInstance.remove(this)},_deleteSuccessCallBack:function(){},_deleteErrorCallBack:function(){},addAuthor:function(o){var n=a.PEOPLES.sessionInstance.getOrFetch({pid:o.get("pid")});if(!n.has("privileges")||n.get("privileges").length===0){this._addPeople(o,n);var m=e.getPrivateTeamSpace();m.addAuthor(o.get("login"),d.proxy(this._addSuccessCallBack,n),d.proxy(this._addErrorCallBack,n))}},addContributor:function(o){var n=a.PEOPLES.sessionInstance.getOrFetch({pid:o.get("pid")});if(!n.has("privileges")||n.get("privileges").length===0){this._addPeople(o,n);var m=e.getPrivateTeamSpace();m.addContributor(o.get("login"),d.proxy(this._addSuccessCallBack,n),d.proxy(this._addErrorCallBack,n))}},removeMember:function(n){var m=e.getPrivateTeamSpace();m.removeMember(n.get("name"),d.proxy(this._deleteSuccessCallBack,n),this._deleteErrorCallBack);n.set("privileges",[]);a.PEOPLES.sessionInstance.remove(n)}});return j()});