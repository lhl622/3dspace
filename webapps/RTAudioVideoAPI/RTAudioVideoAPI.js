define("DS/RTAudioVideoAPI/RTAVcontact",["DS/PlatformAPI/PlatformAPI","UWA/Class","UWA/Class/Model"],function(c,b,d){var a=b.extend(d,{defaults:{login:null,username:null,isCallable:false,presence:null,tenant:null},setup:function(f){if(!f){return console.error("RTAVcontact needs params")}if(!f.login){return console.error("RTAVcontact needs login")}this.addEvent("onChange:presence",this.updateCallability);var e=this;c.subscribe(f.login,function(g){switch(g.action){case"setStatus":if(g.login===f.login){e.set("presence",g.status)}break;case"logout":e.set("presence","Offline");break}});this.getStatus()},getStatus:function(){c.publish("im.ds.com",{login:this.get("login"),tenant:this.get("tenant"),action:"getStatus"})},updateCallability:function(){var e=this.get("presence");if(e&&e.toLowerCase()=="online"){this.set("isCallable",true)}else{this.set("isCallable",false)}}});return a});define("DS/RTAudioVideoAPI/RTAVbtn",["UWA/Class/View","DS/PlatformAPI/PlatformAPI","i18n!DS/RTAudioVideoAPI/assets/nls/feed","DS/UIKIT/Tooltip","css!../RTAudioVideoAPI/RTAudioVideoAPI.css"],function(g,b,f,d){var c='<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  x="0px" y="0px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve"><path xmlns="http://www.w3.org/2000/svg" d="m 8.768474,11.230366 c -1.582,-1.5830005 -3.096,-3.4170005 -2.371,-4.1420005 1.037,-1.037 1.941,-1.677 0.102,-3.965 -1.838,-2.28699995 -3.064,-0.53 -4.068,0.475 -1.16,1.16 -0.062,5.484 4.211,9.7580005 4.274001,4.273 8.598001,5.368 9.758001,4.207 1.006,-1.005 2.762,-2.225 0.475,-4.063 -2.287,-1.839 -2.927,-0.936 -3.965,0.103 -0.725,0.722 -2.559,-0.791 -4.142001,-2.373 z" id="path4571"/><path xmlns="http://www.w3.org/2000/svg" d="m 8.768474,11.230366 c -1.582,-1.5830005 -3.096,-3.4170005 -2.371,-4.1420005 1.037,-1.037 1.941,-1.677 0.102,-3.965 -1.838,-2.28699995 -3.064,-0.53 -4.068,0.475 -1.16,1.16 -0.062,5.484 4.211,9.7580005 4.274001,4.273 8.598001,5.368 9.758001,4.207 1.006,-1.005 2.762,-2.225 0.475,-4.063 -2.287,-1.839 -2.927,-0.936 -3.965,0.103 -0.725,0.722 -2.559,-0.791 -4.142001,-2.373 z" id="path4571"/></svg>';var e='<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve"><path xmlns="http://www.w3.org/2000/svg" d="M10.5,10c0,1.380249-1.119751,2.5-2.5,2.5c-1.3810425,0-2.5-1.119751-2.5-2.5S6.6189575,7.5,8,7.5  C9.380249,7.5,10.5,8.619751,10.5,10z M16,4v12c0,1.0996094-0.9003906,2-2,2H2c-1.0996094,0-2-0.9003906-2-2V4  c0-1.0996094,0.9003906-2,2-2h12C15.0996094,2,16,2.9003906,16,4z M12.5,10c0-2.4855347-2.0153809-4.5-4.5-4.5  c-2.4855347,0-4.5,2.0144653-4.5,4.5s2.0144653,4.5,4.5,4.5C10.4846191,14.5,12.5,12.4855347,12.5,10z M19.2151489,5.0856323  L17,6.5623779v7l2.2151489,1.4768066C19.5506592,15.2628174,20,15.0223389,20,14.6191406V5.5056763  C20,5.102478,19.5506592,4.8619385,19.2151489,5.0856323z" id="path4532"/></svg>';var a=g.extend({tagName:"div",className:"RTAVbtn",render:function(){if(this.svgIcon){var h={tag:"span","class":" RTAVbtnSpan RTAVbtnSVG",html:this.type=="audio"?c:e}}else{var h={tag:"span","class":"RTAVbtnSpan fonticon fonticon-"+(this.type=="audio"?"phone":"videocamera")}}if(this.model.get("isCallable")){this.delegateDOMEvents({"click .RTAVbtnSpan":"clickListnr"});this.container.addClassName("callAvailable");this.tooltip=new d({target:this.container,body:this.type=="audio"?f.startAudioCall:f.startVideoCall,position:"left"})}else{this.undelegateDOMEvents();this.container.removeClassName("callAvailable");this.tooltip=new d({target:this.container,body:f.callNotAvailable,position:"left"})}if(this.model.get("isConnected")){this.container.removeClassName("hidden")}else{this.container.addClassName("hidden")}this.tooltip.elements.container.addClassName("RTAVbtnTooltip");this.container.setContent([h]);this.container.style.width=this.model.get("size")||"50px";this.container.style.height=this.model.get("size")||"50px";this.container.style["font-size"]=this.model.get("size")||"50px";this.container.style["line-height"]=this.model.get("size")||"50px";return this},clickListnr:function(){this.model.startCall(this.type)},setup:function(h){this.type=h.type||"audio";this.svgIcon=this.model.get("svgIcon");this.listenTo(this.model,"onChange:isCallable",this.render);this.listenTo(this.model,"onChange:isConnected",this.render)},inject:function(h){this.container.inject(h);return this},destroy:function(){this.stopListening();this.model=null;this._parent()}});return a});document.callAlwaysAvailable=true;define("DS/RTAudioVideoAPI/RTAudioVideoAPI",["DS/PlatformAPI/PlatformAPI","UWA/Class","UWA/Class/Model","UWA/Class/Collection","DS/RTAudioVideoAPI/RTAVcontact","i18n!DS/RTAudioVideoAPI/assets/nls/feed","DS/RTAudioVideoAPI/RTAVbtn"],function(d,c,h,e,b,g,a){var f=c.extend(h,{defaults:{isCallable:document.callAlwaysAvailable,isConnected:(window.ds&&window.ds.env==="MOBILE"),size:"50px",svgIcon:true},setup:function(k){if(!k){return console.error("RTAudioVideoAPI needs params")}if(!k.logins){return console.error("RTAudioVideoAPI needs logins")}if(!k.tenantId){return console.error("RTAudioVideoAPI needs tenantId")}this.tenant=k.tenantId;this.logins=k.logins;if(k.svgIcon!=undefined){this.set("svgIcon",k.svgIcon)}this.contacts=new e([],{model:b});if(!document.callAlwaysAvailable){this.contacts.addEvents({"onChange:isCallable":this._updateCallability},this)}d.subscribe("towidgetim.ds.com",(function(i){return function(l){if(l.evenement=="CONNECTED"){return i.set("isConnected",true)}}})(this));d.subscribe("from.wap.mobile.swym",(function(i){return function(l){if(!l||!l.callId||!l.logins||!l.type||!l.logins.length){return console.error("RTAudioVideoAPI incomplete data from mobile")}if(l.action!="startCall"){return console.error("RTAudioVideoAPI mobile didnt send startCall : "+l.action)}if(l.callId!=i.callId){return true}i.startCall(l.type,l)}})(this));d.publish("fromwidgetim.ds.com",{evenement:"GETLOGINOKDATA"});for(var j=0;j<this.logins.length;j++){this.contacts.add({login:this.logins[j],tenant:this.tenant})}this.btnAudio=new a({model:this,type:"audio"});this.btnVideo=new a({model:this,type:"video"})},_updateCallability:function(i,k){var j=k||this.contacts.pluck("isCallable").indexOf(true)!=-1;this.set("isCallable",j)},renderTo:function(l){var i=l.container;var k=l.type;var j=l.size;if(j){this.set("size",j)}if(!k||k=="audio"){this.btnAudio.render().inject(i)}else{if(k=="video"){this.btnVideo.render().inject(i)}else{if(k=="both"){this.btnAudio.render().inject(i);this.btnVideo.render().inject(i)}else{console.error("RTAudioVideoAPI does not know the type "+k)}}}},handlerFactory:function(i){return(function(j){return function(){j.startCall(i)}})(this)},getItem:function(i){if(i=="audio"){return[{text:g.startAudioCall||"Start an audio call",fonticon:"phone",handler:this.handlerFactory("audio")}]}else{return[{text:g.startVideoCall||"Start a video call",fonticon:"videocamera",handler:this.handlerFactory("video")}]}},getItems:function(){return this.getItem("audio").concat(this.getItem("video"))},startCall:function(i,j){var j=j||{};j.logins=j.logins||this.contacts.pluck("login");j.action="startCall";j.type=i||"video";if(window.ds.env!="MOBILE"||j.callId){d.publish("im.ds.com",j)}else{this.startCallMobile(i)}},startCallMobile:function(i){var j={};j.logins=this.contacts.pluck("login");j.action="startCall";j.type=i||"video";this.callId=UWA.Utils.getUUID();j.callId=this.callId;d.publish("wap.mobile.swym",j)},destroy:function(i){d.unsubscribe("towidgetim.ds.com");this._parent()}});f.startCall=function(i){if(!i||!i.logins||!i.logins.length){return console.error("RTAudioVideoAPI needs an array of logins to start a call")}i.action="startCall";i.type=i.type||"audio";d.publish("im.ds.com",i)};return f});