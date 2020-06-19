require(["DS/UIKIT/Input/Select","UWA/Class/Promise"],function(c,b){var a;a={is:"ra-parameter-map",behaviors:[SPBase],properties:{datasetsListData:{type:Object,notify:true,value:function(){return{}},observer:"_datasetsListChanged"},tableData:{type:Object,notify:true,value:function(){return{}},observer:"_tabledataChanged"},commonDisplayFunctions:{type:Object,value:function(){return{tableRef:this}},notify:true},active:{type:Boolean,value:true},parameterList:{type:Array,value:function(){return[]},notify:true},datasets:{type:Array,value:function(){return[]},notify:true}},listeners:{scroll:"_onScroll"},observers:["_parameterListChanged(parameterList.*)"],_parameterListChanged:function(){this.resize()},ready:function(){},attached:function(){var d=this.children[0];d._resetSizing()},resize:function(){var d=this.children[0];d.resetHeaders();d._resetSizing()},displayRowHeaderTitle:function(e){var d=document.createDocumentFragment();var f=document.createElement("span");f.textContent="Data";d.appendChild(f);return d},displayRowHeader:function(l,e){var h=this;var j=document.createDocumentFragment();if(e.type!=="BUTTON"){var d=e.name,f=d?d.split("\\"):[],k=d;if(f.length>1){k=f[0]+"\\...\\"+f[f.length-1]}var i=document.createElement("span");i.title=d;i.textContent=k;j.appendChild(i)}else{var g=document.createElement("button");g.textContent="Load Parameters";g.onclick=function(){var n=e.id,m=n?n.substring(0,n.lastIndexOf("-")):null;if(m){worker.evaluate("getKWEData",[m],function(q){var o=window.WidgetProxy.getSimulationObjectsConnectedToCase();if(!o||o.length===0){alert("No simulation objects were identified");return}var p=new window.KWEUtils({_mcsUrl:window.WidgetProxy.get3DSpaceURL(),_eedUrl:window.WidgetProxy.getEEDURL(),_caseId:h.tableRef.modelID});p.run(o).then(function(r){widget.kweFileIndex=r[1];window.worker.evaluate("setKWEData",r[0],function(){h.tableRef.refreshTableData(h.tableRef.datasets,function(){h.tableRef.resize()});console.log("Loading of KWE Data complete...")})},function(r){console.error("Loading of KWE Data failed...",[r])})})}};j.appendChild(g)}return j},_getRowHeaderFunctions:function(){return{headerDisplay:this.displayRowHeaderTitle,rowDisplay:this.displayRowHeader,tableRef:this}},displayValueHeader:function(){var d=document.createDocumentFragment();var e=document.createElement("span");e.textContent="Values";d.appendChild(e);return d},displayValueRow:function(d,f){var e=document.createDocumentFragment();if(f.type!=="GROUP"){if(typeof f.min!=="undefined"&&typeof f.max!=="undefined"){if(f.min!==f.max){e.textContent=f.min+"-"+f.max}else{e.textContent=f.min}}}return e},_getParamValueFunctions:function(){return{headerDisplay:this.displayValueHeader,rowDisplay:this.displayValueRow,tableRef:this}},displayParamHeader:function(e){var d=document.createDocumentFragment();var f=document.createElement("span");f.textContent="Parameters";d.appendChild(f);return d},displayParamRow:function(e,h){var f=document.createDocumentFragment();if(h.type!=="GROUP"&&h.type!=="BUTTON"){var i=this;if(this.tableRef&&this.tableRef.parameterList){var d=document.createElement("select");d.appendChild(document.createElement("option"));var g=document.createElement("option");g.value="NEWPARAM";g.textContent="New Parameter";d.appendChild(g);this.tableRef.parameterList.forEach(function(j){g=document.createElement("option");g.value=j.id;g.textContent=j.name;if(j.mergedFromVars&&j.mergedFromVars.indexOf(h.id)>-1){g.selected="selected"}d.appendChild(g)});f.appendChild(d);d.onchange=function(){if(worker){var j=this.options[this.selectedIndex].value;if(j!=="NEWPARAM"){worker.evaluate("mergeParameterById",[{parameter:h,id:j}],function(){if(widget){widget.dispatchEvent("onParameterMerge")}})}else{worker.evaluate("mergeParameterWithNew",[{parameter:h,caseName:i.tableRef.modelTitle}],function(){if(widget){widget.dispatchEvent("onParameterMerge")}})}}}}}return f},_getParameterFunctions:function(){return{headerDisplay:this.displayParamHeader,rowDisplay:this.displayParamRow,tableRef:this}},refreshTableData:function(d,e){this._datasetsListChanged();e()},_tabledataChanged:function(){},_datasetsListChanged:function(){this.set("active",true);this.set("tableData",{getData:function(e,f){if(typeof worker!=="undefined"){var d=b.deferred();worker.evaluate("getParameterMergeData",[e],f);return d.promise}},timestamp:Date.now(),reqTable:this})}};window.Polymer(a)});