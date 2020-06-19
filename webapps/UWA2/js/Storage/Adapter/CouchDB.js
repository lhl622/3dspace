define("UWA/Storage/Adapter/CouchDB",["UWA/Core","UWA/Data","UWA/Json","UWA/Storage/Adapter/Abstract"],function(e,b,a,d){var c=d.extend({type:"CouchDB",limit:0,defaultOptions:{host:false},connect:function(f){this.database=f;b.request(this.options.host+"/"+this.database,{method:"GET",type:"json",async:false,onComplete:function(g){if(!g.error){this.available=g;this.storage.isReady=true}}.bind(this)});return this.available},isAvailable:function(){return this.available},normalizeKey:function(f){return(f==="_keysIndex"?"keysIndex":(f==="_lastUpdate"?"lastUpdate":f))},request:function(i,h,g){var f={method:i,type:"json",async:false};g=e.merge(f,g);return b.request(h,g)},get:function(g){var h,f;this.interruptAccess();g=this.normalizeKey(g);this.data[g]={value:undefined};h=this.options.host+"/"+this.database+"/"+g;f={onComplete:function(i){if(!i.error){this.data[g]=i}}.bind(this)};this.request("GET",h,f);return this.data[g].value},set:function(g,i){var h,f;this.interruptAccess();g=this.normalizeKey(g);if(this.data[g]===undefined){this.data[g]={value:i}}else{this.data[g].value=i}h=this.options.host+"/"+this.database+"/"+g;f={data:a.encode(this.data[g]),onComplete:function(j){if(!j.error){this.data[g]=j}}.bind(this)};this.request("PUT",h,f);return this.data[g].value},rem:function(g){var i,h,f;this.interruptAccess();i=this.get(g);g=this.normalizeKey(g);h=this.options.host+"/"+this.database+"/"+g+"?rev="+this.data[g]._rev;f={data:a.encode(this.data[g]),onComplete:function(j){if(!j.error){this.data[g]=j}}.bind(this)};this.request("DELETE",h,f);return i}});return e.namespace("Storage/Adapter/CouchDB",c,e)});