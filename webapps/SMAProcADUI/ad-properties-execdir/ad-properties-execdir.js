/*!  Copyright 2016 Dassault Systemes. All rights reserved. */
window.require(["DS/SMAProcADUI/ad-station/ADStation"],function(n){var h=window.Polymer,j=window.DS;var o=null,t=null,m=null,e=null,s=null,u=null,r=null,p=null,f="There are several issues with the execution directory station.  Click this icon to see more information.",l="The station is not running. To view the execution directory, you must launch the station.",b="The local station is not running. To view the execution directory, you must launch the local station.",a="This station could not be found. To view the execution directory, you must launch the station and connect it with a COS server.",q="This station is not connected with a COS server. To view the execution directory, you must connect the station with a COS server.",g="Multiple COS servers are connected to a station with this name.",k="Multiple COS servers are connected with a station with this name. The default COS server has been selected; however, the execution directory may not be accessible from this server.  You may need to change your default to the server that is connected with the correct station.",c="Loading...",i={hidden:"hidden"},d=null;o=function(){var v=null;if(this.model){this.$.nameEdit.value=this.model.name;h.dom(this.$.lastModifiedDate).textContent=this.formatDate(this.model.lastModified);if(this.model.serverID){h.dom(this.$.serverName).textContent=this.model.serverID}else{if(this.model.station){v=this.$.stationManager.getServerForStation(this.model.station);h.dom(this.$.serverName).textContent=v?v.id:"<no server>"}else{h.dom(this.$.serverName).textContent=""}}if(this.model.station){if(this.model.station===n.ADStation.LOCALSTATIONNAME){h.dom(this.$.stationName).textContent="Local station"}else{h.dom(this.$.stationName).textContent=this.model.station}}else{if(!this.model.activityID){h.dom(this.$.stationName).textContent="<transient station>"}else{h.dom(this.$.stationName).textContent="<no station>"}}h.dom(this.$.stationPath).textContent=this.model.path?this.model.path:"";m.call(this)}else{this.$.nameEdit.value="";h.dom(this.$.lastModifiedDate).textContent="";h.dom(this.$.serverName).textContent="";h.dom(this.$.stationName).textContent="";h.dom(this.$.stationPath).textContent=""}};t=function(y,z,v,w){var x="There are several issues with the selected station.";if(y){if(w){x+="  "+b}else{x+="  "+l}}if(z===0){x+="  "+q}else{if(z>1){if(v){x+="  "+k}else{x+="  "+g}}}return x};m=function(){var E=null,G=null,w=false,F=null,B=false,C=1,D=1,v=false,x=false,A=0,y="",z="";if(this.model.station){if(this.model.serverID){G=this.$.stationManager.getStation(this.model.station,this.model.serverID);E=this.$.stationManager.getServer(this.model.serverID)}else{G=this.$.stationManager.getStation(this.model.station);if(G){E=this.$.stationManager.getServerForStation(G.name)}}}else{if(!this.model.activityID){w=true}}if(G){if(n.ADStation.LOCALSTATIONNAME===G.name){x=true}if(n.ADStation.STATUS.running!==G.status){B=true;A++}F=this.$.stationManager.getServersForStation(G.name);if(Array.isArray(F)){D=F.length;if(E&&E.isDefault){v=true}A++}else{if(!F){D=0;A++}}}else{if(!w){if(n.ADStation.LOCALSTATIONNAME===this.model.station){x=true;B=true}else{C=0}A++}}if(A>0){this.DOM(this.$.stationErrorMessage).removeClass(i.hidden);if(A>1){y=f;z=t.call(this,B,D,v,x)}else{if(B){if(x){y=z=b}else{y=z=l}}else{if(C===0){y=z=a}else{if(D===0){y=z=q}else{if(D>1){if(v){y=z=k}else{y=z=g}}}}}}this.$.stationErrorMessageIcon.title=y;this.$.stationErrorMessageText.textContent=z}else{this.DOM(this.$.stationErrorMessage).addClass(i.hidden);this.DOM(this.$.stationErrorPopover).addClass(i.hidden)}};e=function(){var v=this.$.nameEdit.value;if(this.model){if(v.length>0){this.model.name=v;this.DOM(this.$.nameErrorMessage).addClass(i.hidden);this.DOM(this.$.nameErrorPopover).addClass(i.hidden)}else{this.DOM(this.$.nameErrorMessage).removeClass(i.hidden)}}};s=function(v){this.DOM(this.$.nameErrorPopover).toggleClass(i.hidden);v.stopPropagation();v.cancelBubble=true};u=function(v){this.DOM(this.$.nameErrorPopover).addClass(i.hidden);v.stopPropagation();v.cancelBubble=true};r=function(v){this.DOM(this.$.stationErrorPopover).toggleClass(i.hidden);v.stopPropagation();v.cancelBubble=true};p=function(v){this.DOM(this.$.stationErrorPopover).addClass("hidden");v.stopPropagation();v.cancelBubble=true};d=function(){var x=function(){o.call(this)}.bind(this),w=false,v=null;this.DOM(this.$.stationErrorMessage).addClass(i.hidden);this.DOM(this.$.stationErrorPopover).addClass(i.hidden);h.dom(this.$.serverName).textContent=c;h.dom(this.$.stationName).textContent=c;if(this.model){if(!this.$.stationManager.hasRefreshed()){this.$.stationManager.refresh({onComplete:x,onFailure:x,refreshServers:true})}else{if(n.ADStation.LOCALSTATIONNAME===this.model.station){w=true}if(!this.model.server){v=this.$.stationManager.getServerForStation(this.model.station);if(v){this.model.server=v.id}}else{v=this.$.stationManager.getServer(this.model.server)}this.$.stationManager.refresh({onComplete:x,onFailure:x,refreshServers:false,specificServer:v,refreshStations:!w,refreshPrivateStations:w,refreshRunAs:false})}}};j.SMAProcADUI=j.SMAProcADUI||{};j.SMAProcADUI.ADPropertiesExecdir=h({is:"ad-properties-execdir",properties:{session:{type:Object,value:null},model:{type:Object,value:null,observer:"modelChanged"},access:{type:String,value:"",notify:true,reflectToAttribute:true}},modelChanged:function(){this.refresh()},onNameChanged:function(){return e.apply(this,arguments)},onClickNameAlert:function(){return s.apply(this,arguments)},onClickNamePopover:function(){return u.apply(this,arguments)},onClickStationAlert:function(){return r.apply(this,arguments)},onClickStationPopover:function(){return p.apply(this,arguments)},refresh:function(){return d.apply(this,arguments)},behaviors:[j.SMAProcSP.SPBase,j.SMAProcADUI.FormatUtilities]})});