define("DS/DELWebMfgAssetsDefInstanceModel/AbstractInstanceDisplayModel",["UWA/Class/Debug","DS/DELWebMfgAssetsDefModelServices/AbstractDisplayModel"],function(d,c){var b=c.extend(d,{setup:function a(e,f){this._parent(e,f)}});return b});define("DS/DELWebMfgAssetsDefInstanceModel/InstanceModel",["UWA/Core","DS/Logger/Logger","DS/DELWebMfgAssetsDefReferenceModel/ReferenceModel","DS/DELWebMfgAssetsDefModelServices/AbstractIRPCModel","DS/DELWebMfgAssetsDefModelServices/ModelUtils","DS/DELWebMfgAssetsDefModelServices/ModelPreferences","DS/DELWebMfgAssetsDefModelServices/IndexedDBUtils"],function(j,d,k,e,b,g,c){var i=e.extend({name:"InstanceModel",_logger:null,urlRoot:function a(){return b.getWebServicesURL()+"/instance"},defaults:{queriedForConnections:false},setup:function f(l,m){this._parent.apply(this,arguments);if(j.is(b.instanceModelSetup)){b.instanceModelSetup(this,m)}},parse:function h(m,n){var r={},l=this._parent.apply(this,arguments),p,q,o;if(j.is(d)){this._logger=d.getLogger(i)}if(j.is(l)){if(j.is(n.queriedForConnections)){l.queriedForConnections=n.queriedForConnections}if(j.is(b.referenceModelParse)){b.referenceModelParse(this,l,n)}else{if(j.is(n.request)&&j.is(n.request.method,"string")&&n.request.method==="POST"){for(p in m){if(m.hasOwnProperty(p)){if(p.contains("to.")){q=p.substring(p.indexOf("to.")+3);r[q]=m[p]}}}if(Object.keys(r).length>0){o=new k(r);o.set("queriedForChildren",true);o.set("queriedForConnections",true);this.collection.referenceCollection.add(o);c.storeModel(o)}}}}return l}});i.setDisplayModelClass=function(l){this._DisplayModelClass=l};return i});define("DS/DELWebMfgAssetsDefInstanceModel/InstanceDisplayModel",["UWA/Class/Model","UWA/Class/Debug","DS/DELWebMfgAssetsDefInstanceModel/AbstractInstanceDisplayModel",],function(e,d,b){var c=b.extend(d,{setup:function a(f,g){this._parent(f,g)}});return c});define("DS/DELWebMfgAssetsDefInstanceModel/InstanceCollection",["UWA/Core","DS/Logger/Logger","DS/DELWebMfgAssetsDefInstanceModel/InstanceModel","DS/DELWebMfgAssetsDefModelServices/ModelUtils","DS/DELWebMfgAssetsDefModelServices/AbstractIRPCCollection"],function(h,c,g,b,d){var i=d.extend({name:"InstanceCollection",_logger:null,model:g,comparator:null,_collectionEvents:{onRemove:function e(j){var k,l=widget.CollectionUtils.getImpactedConnections(j.id);if(h.is(l)){for(k=0;k<l.length;k++){widget.CollectionUtils.connections.remove(l[k].id,{reason:"fromInstanceRemoval",pid:j.id})}}return this}},setup:function f(){if(h.is(c)){this._logger=c.getLogger(i)}this.listenTo(this,this._collectionEvents)},url:function a(){return b.getWebServicesURL()+"/instance"}});return i});