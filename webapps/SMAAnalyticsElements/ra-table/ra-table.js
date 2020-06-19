require(["DS/UIKIT/Modal","DS/UIKIT/Form","UWA/Class/Promise","DS/ZipJS/zip-fs","i18n!DS/SMAAnalyticsElements/assets/nls/SMAAnalyticsElements"],function(a,b,d,c,f){var e;e={is:"ra-table",behaviors:[SPBase],properties:{tableData:{type:Object,notify:true,value:function(){return{}},observer:"_tabledataChanged"},commonDisplayFunctions:{type:Object,value:function(){return{rowDisplay:this.displayRowInColumn,headerDisplay:this.displayColumnHeader,fileRowDisplay:this.fileRowDisplay,textRowDisplay:this.textRowDisplay,psrDisplay:this.psrDisplay,tableRef:this}},notify:true},thumbCache:{type:Object,value:{}}},listeners:{scroll:"_onScroll",formulationcheck:"_formulationCheck"},ready:function(){this.requirementsEditor=new a({closable:true,renderTo:document.body});this.zipEntries=new c.fs.FS()},attached:function(){var g=this.children[0];g._resetSizing();this._setupRequirementsUI()},resize:function(){var g=this.children[0];g._resetSizing()},_setupRequirementsUI:function(){var g=document.createDocumentFragment();g.textContent="Requirements";this.requirementsEditor.setHeader(g)},_updateRequirementsUI:function(g){var k=[];for(var l=0;l<6;l++){var o={value:l};if(l===0){o.label="MH"}else{o.label=String(l)}if(g.priority===l){o.selected=true}k.push(o)}var n=[];var h={value:"",label:f.get("NONE")};if(g.objective&&h.value===g.objective.type){h.selected=true}n.push(h);var h={value:"MAXIMIZE",label:f.get("MAXIMIZE")};if(g.objective&&h.value===g.objective.type){h.selected=true}n.push(h);var h={value:"MINIMIZE",label:f.get("MINIMIZE")};if(g.objective&&h.value===g.objective.type){h.selected=true}n.push(h);var p,j;if(g.constraints){g.constraints.forEach(function(s){var r=document.createElement("span");var i,q;if(s.conditions){s.conditions.forEach(function(t){if(t.type==="GREATER_THAN"){q=t.boundValue}else{if(t.type==="LESS_THAN"){i=t.boundValue}}})}r.classList.add("ra-constraint-label");if(typeof i!=="undefined"&&typeof q==="undefined"){p=i}else{if(typeof i==="undefined"&&typeof q!=="undefined"){j=q}}})}var m=this;this.requirementsUI=new b({className:"horizontal",fields:[{type:"select",name:"priority",label:"Priority",options:k,events:{onChange:function(){console.log("Priority Changed!")}}},{type:"text",name:"upper",label:"Upper Threshold",value:typeof p!=="undefined"?p:"",events:{onChange:function(i){console.log("Upper Threshold Changed!");worker.evaluate("setConstraint",[{parameterID:g.id,boundValue:i.target.value,type:"LESS_THAN"}],function(){m.resize()})}}},{type:"text",name:"lower",label:"Lower Threshold",value:typeof j!=="undefined"?j:"",events:{onChange:function(i){console.log("Upper Threshold Changed!");worker.evaluate("setConstraint",[{parameterID:g.id,boundValue:i.target.value,type:"GREATER_THAN"}],function(){m.resize()})}}},{type:"select",name:"objective",label:"Objective",options:n,events:{onChange:function(i){if(worker){worker.evaluate("setObjective",[{parameterID:g.id,type:i.target.value}],function(){m.resize()})}}}}],placeholder:"Priority"});this.requirementsEditor.setBody(this.requirementsUI)},_formulationCheck:function(h,g){this._updateRequirementsUI(g);this.requirementsEditor.show()},displayColumnHeader:function(i){var h=document.createDocumentFragment();var g=document.createElement("div");g.classList.add("ra-column-header-thumb");g.classList.add("ra-table");var j=document.createElement("img");j.classList.add("ra-table");this.tableRef.getColumnHeaderThumbnail(i,j);g.appendChild(j);h.appendChild(g);var l=document.createElement("span");l.textContent=i.name;h.appendChild(l);if(typeof i.headerDisplay!=="undefined"){var k=document.createElement("span");k.classList.add("fonticon");k.classList.add("fonticon-down-open");k.classList.add("header-dropdown");h.appendChild(k)}return h},displayRowInColumn:function(g,h){if(h.type==="FILE"){return this.fileRowDisplay(g,h)}else{if(h.type==="PLMOBJECT"){return this.psrDisplay(g,h)}else{return this.textRowDisplay(g,h)}}},getColumnHeaderThumbnail:function(j,k){var l=this;if(worker){if(typeof j.PLMOID!=="undefined"){var g=l.tableData.WidgetProxy.getSimulationObjectsConnectedToCase();var i=null;g.some(function(m){if(m.physicalId===j.PLMOID){i=m;return true}});if(i!==null){l.findThumbInSimObj(j.PLMOID).then(function(m){if(typeof m!=="undefined"){k.src=m}},function(m){console.error(m)});l.setupPSR(j.PLMOID,k)}var h=Object.keys(g).indexOf(j.PLMOID)}else{worker.evaluate("getAllFilesForRowIdAsArray",[j.id],function(n){var m=[];var o="";n.forEach(function(q){var p=q.type,r=q.url;if(q.type==="PLMOBJECT"){m.push(l.findThumbInSimObj(q.plmID))}else{if(p.toLowerCase().indexOf("3dxml")>-1&&r.toLowerCase().indexOf("smaadvise")<0){o=r}else{if(o.length===0&&q.isImage){o=r}}}});if(m.length>0){d.all(m).then(function(p){p.some(function(q){if(typeof q!=="undefined"){k.src=q;return true}})},function(){if(o.length>0){if(typeof widget.raeFileIndex[o]!=="undefined"&&widget.raeFileIndex[o]!==null){k.src=widget.raeFileIndex[o]}}})}else{if(o.length>0){if(typeof widget.raeFileIndex[o]!=="undefined"&&widget.raeFileIndex[o]!==null){k.src=widget.raeFileIndex[o]}}}})}}},getThumbnailImage:function(g,h){var j=this;if(this.thumbCache[g]){var i=this.thumbCache[g];h.onload=function(){console.log("thumb loaded");if(this.parentNode){if(typeof this.parentNode.fitToContent==="function"){this.parentNode.fitToContent()}else{if(this.parentNode.parentNode&&typeof this.parentNode.parentNode.fitToContent==="function"){this.parentNode.parentNode.fitToContent()}}}this.parentNode.resize()};h.setAttribute("src",i)}else{this.findThumbInSimObj(g,function(k){if(typeof k!=="undefined"){j.thumbCache[g]=k;h.onload=function(){console.log("thumb loaded");if(this.parentNode){if(typeof this.parentNode.fitToContent==="function"){this.parentNode.fitToContent()}else{if(this.parentNode.parentNode&&typeof this.parentNode.parentNode.fitToContent==="function"){this.parentNode.parentNode.fitToContent()}}}this.parentNode.resize()};h.setAttribute("src",k)}})}},findThumbInSimObj:function(g,i){var h=d.deferred();this.tableData.WidgetProxy.getTicketAndDownloadResultFile(g).done(function(j){if(typeof URL.createObjectURL!=="function"){URL.createObjectURL=window.top.URL.createObjectURL}var k=URL.createObjectURL(j);var l=new c.fs.FS();c.workerScriptsPath="scripts/ThreeDS/Visualization/zip-js/";l.importHttpContent({serverurl:"",filename:k,proxyurl:"none"},false,function(){var m="thumbnail.PNG";var o;for(var n=0;n<l.entries.length;n++){o=l.entries[n];if(o.name&&o.name.toLowerCase().indexOf("thumbnail")>-1&&o.name.toLowerCase().indexOf("png")>0){m=o.name;if(m.toLowerCase().indexOf("mises")>-1){break}}}o=l.find(m);var p="image/PNG";if(o){o.getBlob(p,function(r){var q=URL.createObjectURL(r);h.resolve(q);if(typeof i==="function"){i(q)}})}else{h.resolve();if(typeof i==="function"){i()}}})});return h.promise},psrDisplay:function(h,j){var i=document.createDocumentFragment();var g=document.createElement("img");var k=this;g.classList.add("file-thumbnail");i.appendChild(g);if(!h||!h.plmID||!this.tableRef.tableData.WidgetProxy){return i}this.tableRef.setupPSR(h.plmID,g);this.tableRef.getThumbnailImage(h.plmID,g);return i},setupPSR:function(g,i){var j=this.tableRef||this;var h=j.tableData.WidgetProxy.get3DSpaceURL();i.onclick=function(){var l=new SP3DPlayer();var k={asset:{dtype:"DesignSight",physicalid:g,provider:"EV6",requiredAuth:"passport",serverurl:h,tenant:"OnPremise"},experience:{filename:"DS/3DPlayFullSimulation/3DPlayFullSimulation"}};document.body.appendChild(l);l.open(k)}},fileRowDisplay:function(g,i){var h=document.createDocumentFragment();if(typeof g!=="undefined"){var j=document.createElement("img");j.classList.add("file-thumbnail");if(typeof g.thumbnail!=="undefined"&&g.thumbnail!==null){j.src=g.thumbnail}else{var k=g;if(typeof k.url!=="undefined"){k=k.url}if(widget.raeFileIndex){if(widget.raeFileIndex[k]){j.src=widget.raeFileIndex[k]}}else{if(widget.kweFileIndex){if(widget.kweFileIndex[k]){j.src=widget.kweFileIndex[k]}}}}h.appendChild(j)}return h},textRowDisplay:function(g,i){var h=document.createDocumentFragment();if(typeof g!=="undefined"){h.textContent=g}return h},displayRowHeaderTitle:function(h){var g=document.createDocumentFragment();g.textContent="";return g},displayRequirementsTitle:function(h){var g=document.createDocumentFragment();var i=this.tableRef.createRequirementsDropBox();g.appendChild(i);return g},displayRequirementsInRow:function(g,k){var h=document.createDocumentFragment();if(k.type!=="GROUP"){var j=document.createElement("div");j.classList.add("row-formulation-button");if(k.objective||k.constraints){if(k.objective){var l=document.createElement("span");l.classList.add("ra-objective-label");l.textContent=k.objective.type;j.appendChild(l)}if(k.constraints){k.constraints.forEach(function(p){var o=document.createElement("span");var m,n;if(p.conditions){p.conditions.forEach(function(q){if(q.type==="GREATER_THAN"){n=q.boundValue}else{if(q.type==="LESS_THAN"){m=q.boundValue}}})}o.classList.add("ra-constraint-label");if(typeof m!=="undefined"&&typeof n==="undefined"){o.textContent="<"+m}else{if(typeof m==="undefined"&&typeof n!=="undefined"){o.textContent=">"+n}}j.appendChild(o)})}}else{var i=document.createElement("span");i.classList.add("fonticon");i.classList.add("fonticon-dot-3");j.appendChild(i)}j.rowData=k;j.onclick=function(){this.parentElement.parentElement.fire("formulationcheck",k)};h.appendChild(j)}return h},createRequirementsDropBox:function(){var h=d.deferred(),l=null,g="",k="REQUIREMENT",i=null;l=this.create("div");this.scopeSubtree(l);l.appendChild(document.createTextNode(g));l.setAttribute("id","ra-req-dropbox");l.textContent="Requirements";l.onclick=function(){if(widget){widget.dispatchEvent("onRequirementsAttached")}};h.id=Date.now();var j={dropZone:l,dragClass:"req-page-dropbox-hover",dropDeferred:h,view:this,type:k,caseId:this.tableData.caseId,refreshOnDrop:false};var m=this;h.promise.then(function(n){if(widget){widget.dispatchEvent("onRequirementsAttached")}},function(n){});i=new window.DND(j);return l},displayRowHeader:function(g,i){var h=document.createDocumentFragment();var j=document.createElement("span");j.textContent=i.name;j.title=i.name;h.appendChild(j);return h},_getRowHeaderFunctions:function(){return{headerDisplay:this.displayRowHeaderTitle,rowDisplay:this.displayRowHeader,tableRef:this}},_getRequirementsFunctions:function(){return{headerDisplay:this.displayRequirementsTitle,rowDisplay:this.displayRequirementsInRow,tableRef:this}},_tabledataChanged:function(){}};window.Polymer(e)});