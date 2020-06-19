/*!  Copyright 2016 Dassault Systemes. All rights reserved. */
window.require(["DS/SMAProcADUI/ad-execdir/ADExecDir","DS/SMAProcADUI/ad-station/ADStation"],function(a,f){var g=window.Polymer,l=window.DS;var b=null,i=null,o=null,p=null,k=null,e={cosPubkeyError:"cosPubkeyError",mcsTicketError:"mcsTicketError"},n=null,d=null,m=null,h=null,j=null,c=null;b=function(s,q,r){if(d){k.call(this,s,d,q,r)}else{p.call(this,s,q,r)}};i=function(){if(!n){n={}}return n};o=function(q){n=q};p=function(t,q,s){var r=function(){if(s){s({credentials:t,errorCode:e.cosPubkeyError})}}.bind(this);var u=function(v){var x=JSON.parse(v.response),w=null;if(x){w=x.KeyRep["$"]}if(w){d=w;k.call(this,t,w,q,s)}else{s({credentials:t,errorCode:e.cosPubkeyError})}}.bind(this);this.$.pubkeyWS.sendRequest({onComplete:u,onError:r})};k=function(t,v,q,s){var r=function(){s({credentials:t,errorCode:e.mcsTicketError})}.bind(this);var u=function(x){var w=JSON.parse(x.response),y=null;if(w){y=w.ticket}if(y){t.loginTicket=y;t.encryptedCredentials=this.$.encryption.encryptCredentials(t,v);q(t)}else{s({credentials:t,errorCode:e.mcsTicketError})}}.bind(this);this.$.mcsTicketWS.sendRequest({verb:"POST",onComplete:u,onError:r})};m=function(t,s,q){var y=i.call(this),w=null,z=null,x=null,v=null,r=null,u=false;if(y){if(s instanceof a.ADExecDir){x=s.station+"+"+s.path;if(q){z=q.getStation(s.station);if(z){v=z.name;r=z.os}}}else{if(s instanceof f.ADStation){v=s.name;r=s.os}}if(x&&(x in y)){w=y[x];u=true}else{if(v&&(v in y)){w=y[v];if(s instanceof f.ADStation){u=true}}else{if(r&&(r in y)){w=y[r]}}}}if(w){t.encryptedCredentials=w.encryptedCredentials;t.domainName=w.domainName;t.windowsUser=w.windowsUser;t.windowsPass=w.windowsPass;t.linuxUser=w.linuxUser;t.linuxPass=w.linuxPass;t.isightV5User=w.isightV5User;t.isightV5Password=w.isightV5Password}return u};h=function(s,q,r){b.call(this,s,q,r)};j=function(t,s,q){var x=null,y=null,w=null,u=null,r=null,v={};x=i.call(this);if(x){if(s instanceof a.ADExecDir){w=s.station+"+"+s.path;if(q){y=q.getStation(s.station);if(y){u=y.name;r=y.os}}}else{if(s instanceof f.ADStation){u=s.name;r=s.os}}if(w||u||r){v.encryptedCredentials=t.encryptedCredentials;v.domainName=t.domainName;v.windowsUser=t.windowsUser;v.windowsPass=t.windowsPass;v.linuxUser=t.linuxUser;v.linuxPass=t.linuxPass;v.isightV5User=t.isightV5User;v.isightV5Password=t.isightV5Password;if(w){x[w]=v}if(u){x[u]=v}if(r){x[r]=v}o.call(this,x)}}};c=function(u,s,w){var v=i.call(this),r=null,t=null,q=null;for(r in v){if(v.hasOwnProperty(r)){t=v[r];if(t){if(u&&s&&(u.length>0)&&(s.length>0)){if(t.domainName&&(t.domainName.toLowerCase()===u.toLowerCase())&&t.windowsUser&&(t.windowsUser.toLowerCase()===s.toLowerCase())){q=t;break}}else{if(w&&w.length>0){if(t.linuxUser&&(t.linuxUser.toLowerCase()===w.toLowerCase())){q=t;break}}}}}}return q};l.SMAProcADUI=l.SMAProcADUI||{};l.SMAProcADUI.ADStationCredentials=g({is:"ad-station-credentials",getEncryptedCredentials:function(){return m.apply(this,arguments)},encryptCredentials:function(){return h.apply(this,arguments)},setEncryptedCredentials:function(){return j.apply(this,arguments)},findUserEncryptedCredentials:function(){return c.apply(this,arguments)},behaviors:[l.SMAProcSP.SPBase]});l.SMAProcADUI.ADStationCredentials.ERRORS=l.SMAProcADUI.ADStationCredentials.ERRORS||e});