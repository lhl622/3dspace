/*!  Copyright 2016 Dassault Systemes. All rights reserved. */
(function(m){var i=m.Polymer,l=m.DS;var d=null,r=null,b=null,o=null,x=null,A=null,y=null,p=null,s=null,u=null,g=null,n=null,j=null,v=null,B=null,D=null,c=null,q=null,h=null,z="Root",C={select:"select",drilldown:"drilldown",open:"open",appMessage:"appmessage"},k={disabled:"disabled"},e=null,w=null,f=null,t=null,a=null;d=function(E){var F="";if(typeof E.modelID!=="undefined"&&E.modelID&&E.modelID.length>0){F=E.modelID}else{if((typeof(E.id)!=="undefined")&&E.id&&(E.id.length>0)){F=E.id}}if((typeof(E.name)!=="undefined")&&E.name&&(E.name.length>0)){F+=(F.length>0)?("-"+E.name):E.name}return F};r=function(J,I,E){var M=null,K=this.$.contentPanel.getItems(),G,H,L,F=[];if(this.populateFunction){M=function(P,N,O){if(N===this.openItem){if(O&&O!==K){this.$.contentPanel.removeAllItems();for(G=0;G<O.length;G++){this.$.contentPanel.addItem(O[G]);H=O[G].model;L=d(H);if(this._selectedModelIDs.lastIndexOf(L)>=0){F.push(O[G])}}this.$.contentPanel.selections=F;this._setSelections(F.slice());this.selectedItems.splice(0);for(G=0;G<F.length;G++){if(F[G].model){this.selectedItems.push(F[G].model)}}}this._isLoading=false;p.call(this)}}.bind(this);if(E){this._isLoading=true;p.call(this)}this.populateFunction(J,I,M)}};b=function(G){var F,E,H;this.selectedItems.splice(0);this._selectedModelIDs.splice(0);for(F=0;F<G.length;F++){if(G[F].model){E=G[F].model;this.selectedItems.push(E);H=d(E);this._selectedModelIDs.push(H)}}this._setSelections(G.slice());this.fire(C.select,{items:this.selectedItems});y.call(this)};x=function(F){var E=F.model,G;this.selectedItems.splice(0);this._selectedModelIDs.splice(0);E;if(F.expandable){this.$.contentPanel.removeAllItems();this._selectedModelIDs=[];this.openItem=E;if(E.loaded){r.call(this,E,false,false)}else{r.call(this,E,true,true)}this.$.breadcrumbs.push(E,E.name)}else{this.selectedItems.push(F.model);G="";if(typeof F.model.modelID!=="undefined"&&F.model.modelID&&F.model.modelID.length>0){G=F.model.modelID}else{if(typeof F.model.id!=="undefined"&&F.model.id&&F.model.id.length>0){G=F.model.id}else{if(typeof F.model.name!=="undefined"&&F.model.name&&F.model.name.length>0){G=F.model.name}}}this._selectedModelIDs.push(G);this._setSelections([F])}if(E){this.fire(C.drilldown,{item:E})}y.call(this)};A=function(E){this.selectedItems.splice(0);this._selectedModelIDs.splice(0);this.$.contentPanel.removeAllItems();this._selectedModelIDs=[];this.openItem=E;r.call(this,E,true,true);this.fire(C.open,{item:E});y.call(this)};o=function(){var E=null,F,G=[],H=[];if(this.removeFunction){for(F=0;F<this.$.contentPanel.selections.length;F++){G.push(this.$.contentPanel.selections[F]);H.push(G[F].model)}E=function(I){if(I){if(this.openItem.details&&this.openItem.details.revision===0){this.back()}this.refresh(true)}else{this._isLoading=false;p.call(this)}}.bind(this);this._isLoading=true;p.call(this);this.removeFunction(H,E)}};y=function(){if(this.viewMode===l.SMAProcADUI.ADMultiviewPanel.VIEWMODE.icon){this.DOM(this.$.viewIcons).addClass(k.disabled);this.DOM(this.$.viewList).removeClass(k.disabled)}else{if(this.viewMode===l.SMAProcADUI.ADMultiviewPanel.VIEWMODE.list){this.DOM(this.$.viewIcons).removeClass(k.disabled);this.DOM(this.$.viewList).addClass(k.disabled)}}};p=function(){var E=this.$.contentPanel.getItems();if(this._isLoading){require(["DS/UIKIT/Spinner"],function(F){if(!this._loadingSpinner){this._loadingSpinner=new F({renderTo:this.$.loadingRow,visible:true})}this._loadingSpinner.spin();this._loadingSpinner.show()}.bind(this));this.DOM(this.$.contentRow).addClass("hidden");this.DOM(this.$.placeholderRow).addClass("hidden");this.DOM(this.$.loadingRow).removeClass("hidden")}else{if(this._loadingSpinner){this._loadingSpinner.hide();this._loadingSpinner.stop()}if(this.rootItem&&this.rootItem===this.openItem&&(!E||E.length===0)){this.DOM(this.$.contentRow).addClass("hidden");this.DOM(this.$.placeholderRow).removeClass("hidden")}else{this.DOM(this.$.contentRow).removeClass("hidden");this.DOM(this.$.placeholderRow).addClass("hidden")}this.DOM(this.$.loadingRow).addClass("hidden")}};s=function(){this.rootItem=null;this.openItem=null;this.selectedItems=[];this._selectedModelIDs=[];this._isLoading=false;this.viewMode=l.SMAProcADUI.ADMultiviewPanel.VIEWMODE.icon;p.call(this)};u=function(){this.refresh(true)};g=function(E){o.call(this);E.stopPropagation();E.cancelBubble=true};n=function(){if(!i.dom(this.$.viewIcons).classList.contains(k.disabled)){this.viewMode=l.SMAProcADUI.ADMultiviewPanel.VIEWMODE.icon;if(this.viewModePrefName&&this.viewModePrefName.length>0){localStorage[this.viewModePrefName]=l.SMAProcADUI.ADMultiviewPanel.VIEWMODE.icon}y.call(this)}};j=function(){if(!i.dom(this.$.viewList).classList.contains(k.disabled)){this.viewMode=l.SMAProcADUI.ADMultiviewPanel.VIEWMODE.list;if(this.viewModePrefName&&this.viewModePrefName.length>0){localStorage[this.viewModePrefName]=l.SMAProcADUI.ADMultiviewPanel.VIEWMODE.list}y.call(this)}};v=function(E){this.$.contentPanel.selections=[];this.selectedItems.splice(0);this._selectedModelIDs.splice(0);this._setSelections([]);this.fire(C.select,{items:[]});y.call(this);E.stopPropagation();E.cancelBubble=true};B=function(F){var E=this.$.contentPanel.selections;b.call(this,E);F.stopPropagation();F.cancelBubble=true};D=function(F){var E=F.detail.item;x.call(this,E);F.stopPropagation();F.cancelBubble=true};c=function(F){var E=F.detail.item;A.call(this,E);F.stopPropagation();F.cancelBubble=true};q=function(E){E.stopPropagation();E.cancelBubble=true;E.preventDefault();if(!this.$.dashboard.isInDashboard()){E.dataTransfer.dropEffect="none"}else{E.dataTransfer.dropEffect="copy"}return true};h=function(E){var H=null,I=null;var G=E.dataTransfer.getData("text");if(G&&(typeof G==="string")){try{H=JSON.parse(G)}catch(F){console.log("Unexpected data format")}if(H){I=H.data.items[0]}}if(I&&(I.objectType==="Simulation Process"||I.objectType==="Simulation")){return true}else{E.stopPropagation();E.cancelBubble=true;E.preventDefault()}};e=function(E){return this.$.contentPanel.createItem(E)};w=function(){var E=this.openItem.parentInstance;if(E){this.openItem=E;r.call(this,this.openItem,true,true);this.$.breadcrumbs.pop();y.call(this)}};f=function(E){if(this.openItem){r.call(this,this.openItem,true,E)}else{if(this.rootItem){r.call(this,this.rootItem,true,E)}}y.call(this)};t=function(){p.call(this)};a=function(){return this.$.contentPanel.getItems()};l.SMAProcADUI=l.SMAProcADUI||{};l.SMAProcADUI.ADHierarchyBrowser=i({is:"ad-hierarchy-browser",properties:{access:{type:String,value:"",reflectToAttribute:true},openItem:{type:Object,value:null},populateFunction:{type:Object,value:function(){return undefined}},removeFunction:{type:Object,value:function(){return undefined}},sortFunction:{type:Object,value:function(){return undefined},observer:"sortFunctionChanged"},rootItem:{type:Object,value:null,observer:"rootItemChanged"},rootTitle:{type:String,value:function(){return z}},selectedItems:{type:Array,value:function(){return[]}},selections:{type:Array,value:function(){return[]},readOnly:true},showIconView:{type:Boolean,value:true},showListView:{type:Boolean,value:true},showRefresh:{type:Boolean,value:false},showRemove:{type:Boolean,value:false},showRootBreadcrumb:{type:Boolean,value:false,observer:"showRootBreadcrumbChanged"},viewMode:{type:String,value:function(){return l.SMAProcADUI.ADMultiviewPanel.VIEWMODE.icon},observer:"viewModeChanged"},viewModePrefName:{type:String,value:""}},ready:function(){return s.apply(this,arguments)},onRefresh:function(){return u.apply(this,arguments)},onRemove:function(){return g.apply(this,arguments)},onViewIcons:function(){return n.apply(this,arguments)},onViewList:function(){return j.apply(this,arguments)},onContentAreaClick:function(){return v.apply(this,arguments)},onSelect:function(){return B.apply(this,arguments)},onDrilldown:function(){return D.apply(this,arguments)},onBreadcrumbSelect:function(){return c.apply(this,arguments)},onNoDragOver:function(){return q.apply(this,arguments)},onHBDrop:function(){return h.apply(this,arguments)},createItem:function(){return e.apply(this,arguments)},back:function(){return w.apply(this,arguments)},refresh:function(){return f.apply(this,arguments)},refreshViewState:function(){return t.apply(this,arguments)},getItems:function(){return a.apply(this,arguments)},sortFunctionChanged:function(){this.$.contentPanel.sortFunction=this.sortFunction},showRootBreadcrumbChanged:function(){this.$.breadcrumbs.showRootBreadcrumb=this.showRootBreadcrumb},viewModeChanged:function(){y.call(this);this.$.contentPanel.viewMode=this.viewMode},rootItemChanged:function(E){this.openItem=E;if(this.$&&this.$.contentPanel&&this.$.breadcrumbs){this.$.contentPanel.removeAllItems();r.call(this,this.rootItem,true,true);this.$.breadcrumbs.clear();this.$.breadcrumbs.push(this.rootItem,this.rootTitle)}p.call(this)},_computeRefreshButtonClass:function(E){return this.tokenList({hidden:E!==true})+" tooltip-button-wrapper"},_computeRemoveButtonClass:function(E){return this.tokenList({hidden:E!==true})+" tooltip-button-wrapper"},_computeIconViewButtonClass:function(E,F){return this.tokenList({hidden:E!==true||F==="icon"})+" tooltip-button-wrapper"},_computeListViewButtonClass:function(F,E){return this.tokenList({hidden:F!==true||E==="list"})+" tooltip-button-wrapper"},tokenList:function(G){var F=[];for(var E in G){if(G[E]){F.push(E)}}return F.join(" ")},behaviors:[l.SMAProcSP.SPBase]});l.SMAProcADUI.ADHierarchyBrowser.EVENTS=l.SMAProcADUI.ADHierarchyBrowser.EVENTS||C}(this));