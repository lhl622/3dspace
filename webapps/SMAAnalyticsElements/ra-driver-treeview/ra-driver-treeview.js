require(["DS/Tree/Tree","DS/Tree/TreeNodeModel","DS/Tree/TreeDocument"],function(c,d,b){var a=window.Polymer;Polymer({is:"ra-driver-treeview",properties:{data:{type:Object,notify:true,observer:"dataChanged"}},dataChanged:function(){if(this.data===undefined){console.log("undefined data");return}raDriverTreeView.innerHTML="";this.modelData=this.data.hierarchy;this.nodeData=[];var p={label:"",icons:[],children:[]};var j=this.modelData.length;for(i=0;i<j;i++){var s=this.modelData[i];var r=s.name;var e=r.split(".");if(e.length<2){var f=e[0];var q=new d({label:f,name:r,hasSubFlow:s._HAS_SUBFLOW_});p.label="Model";p.children=q;var k=new d(p);var m=new b({useAsyncPreExpand:true});m.addRoot(q)}else{var h=e.slice(-1)[0];var o=new d({label:h,name:r,hasSubFlow:s._HAS_SUBFLOW_});var t=e.slice(-2)[0];var u=m.search({match:function(w){if(t&&w.nodeModel.options.label.indexOf(t)!==-1){return true}}});var l=u[0];l.addChild(o)}}m.expandAll();var v=new c({treeDocument:m});var g=m.getXSO();k.select(true);var n=this;g.onChange(function(){var w=m.getSelectedNodes();w=w.slice(-1);w.forEach(function(y){var x=y.options.label;if(x==="Model"){y.unselect();return}n.data.selections=[];n.data.selectionLabel=[];n.push("data.selections",y.options.name);n.push("data.selectionLabel",y.options.label);m.unselectAll();n.fire("dataupdated")},this)}.bind(this));v.getContent().addClassName("ra-treeview-theme");v.inject(this.$.raDriverTreeView)}})});