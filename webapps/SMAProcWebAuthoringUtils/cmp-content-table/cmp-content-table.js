require(["DS/SMAProcWebCMMUtils/SMAJSCMMUtils","DS/SMAProcWebCMMUtils/SMAProcWebCMM3DXContentUtils","DS/Tree/TreeListView","DS/Tree/TreeDocument","DS/Tree/TreeNodeModel"],function(e,d,c,b,f){var a=window.Polymer;a({is:"cmp-content-table",properties:{_dataContainer:{value:null},fixedWidth:{type:Boolean,value:true,notify:true},columns:{type:Array,value:function(){return[{dataIndex:"tree",text:"Title",key:"title",type:"text",width_percent:"auto",editable:"true"},{dataIndex:"Icon",text:"Icon",key:"icon",type:"text",width_percent:"auto",editable:"false"},{dataIndex:"Modified",text:"Modified",key:"modified",type:"text",width_percent:"auto",editable:"true"}]}}},ready:function(){console.log("cmp-content-table.ready")},pushData:function(){var h={columns:this.columns,data:[],height:"auto",defaultCellHeight:30};var g=(this._dataContainer)?this._dataContainer.getContentChildren():[];g.forEach(function(i){h.data.push({tree:i.getName(),Icon:i.getFieldValue("image"),Modified:i.getFieldValue("lastModified"),children:i._data.children,content:i,oid:i.getoid(),physicalid:i.getPhysicalId()})});this.loadDataInTable(h)},loadDataInTable:function(k){var g=this;try{g.model=new b({useAsyncPreExpand:false,shouldAcceptDrop:function(){return false},shouldAcceptDrag:function(n,m){console.info("shouldAcceptDrag",n,m);return(m.dataIndex==="tree")}});g.model.prepareUpdate();var j=k.data;for(var i=0;i<j.length;i+=1){var l=new f({label:j[i].tree,grid:j[i]});g.addChildrenToNoderoot(l);g.model.addRoot(l)}g.model.pushUpdate();delete k.data;k.show={rowHeaders:false,columnHeaders:true};k.resize={columns:true,rows:false};k.showVerticalLines=true;k.performances={buildLinks:false};k.onDragStartCell=function(p,r){var m=r.nodeModel.options.label;var n=r.nodeModel.options.grid.physicalid||r.nodeModel.options.grid.children[0].physicalId;if(!n){console.warn("Failed to get the physicalId");return}var q=d.get3DXContent({objectId:n,displayName:m});var o=JSON.stringify(q);p.dataTransfer.setData("Text",o);p.dataTransfer.effectAllowed="move"};k.treeDocument=g.model;k.allowUnsafeHTMLContent=false;g.datagrid=new c(k);g.datagrid.getManager().onCellClick(function(m){console.info("onCellClick",m,arguments)});g.datagrid.onNodeClick(function(p){console.info("cmp-content-table onNodeClick:",arguments);var n=p&&p.cellModel;var m=n&&n.getCellContent&&n.getCellContent();var o=m&&m.getLabel&&m.getLabel()});g.datagrid.inject(g.$.contentTableWebUxdiv)}catch(h){window.console.log(h)}},addChildrenToNoderoot:function(k){var j={columns:this.columns,data:[],height:"auto",defaultCellHeight:30};if(k._options.grid.children&&k._options.grid.children.length!==0){for(var h=0;h<k._options.grid.children.length;h++){j.data=[];j.data.push({tree:k._options.grid.children[h].dataelements.name.value[0].value,children:k._options.grid.children[h].children,busType:k._options.grid.children[h].busType});var g=new f({label:j.data[0].tree,grid:j.data[0]});k.addChild(g);this.addChildrenToNoderoot(g)}}},setDataContainer:function(g){if((!this._dataContainer)||(g!==this._dataContainer)){this.set("_dataContainer",g)}},commitContent:function(){var g=this._dataContainer;if(g){require(["DS/SMAProcWebCMMUtils/SMAJSCMMContentsUtils"],function(h){var l=g.getTemporaryContent(e.State.Created);var n=g.getTemporaryContent(e.State.Deleted);var o=[];var m,k;for(m=0;m<l.length;m++){for(k=0;k<n.length;k++){if(l[m]!==undefined&&n[k]!==undefined){if(l[m]._data.dataelements.name.value[0].value===n[k]._data.dataelements.name.value[0].value){o.push(l[m]);l.splice(m,1);n.splice(k,1);m=0;k=0;k--}}}}h.saveContent(g,{onSuccess:function(){console.log("saveContent():contents are saved")},onFailure:function(){console.log("contents could not be saved")}})})}},deleteContent:function(i,g){g.addTemporaryContent(i);var h={value:i};this.datagrid.getManager().getDocument().getSelectedNodes()[0].remove()}})})();