define("DS/DELWebMfgAssetsDefUITableView/TableView",["UWA/Core","UWA/Class/Debug","DS/Core/Events","DS/DELWebMfgAssetsDefModelServices/CollectionUtils","DS/DELWebMfgAssetsDefModelServices/ModelUtils","DS/DELWebMfgAssetsDefModelServices/Selection","DS/DELWebMfgAssetsDefModelServices/Resources","DS/DELWebMfgAssetsDefUIServices/AttributeUtil","DS/DELWebMfgAssetsDefUIServices/CommandsManager","DS/DELWebMfgAssetsDefUIServices/UIUtils","DS/DELWebMfgAssetsDefUIServices/UIPreferences","DS/DELWebMfgAssetsDefUIServices/TableViewDDManager","DS/UIKIT/Tooltip","DS/DELWebMfgAssetsDefUIServices/TableViewPreferences","DS/DELWebMfgAssetsDefUIServices/AbstractView","DS/DELWebMfgAssetsDefUIControls/Preferences","DS/CfgWebAppEffectivityUX/scripts/CfgEffectivityColumns"],function(g,r,k,h,e,c,t,y,b,u,w,j,q,l,m,d,a){var p=m.extend(r,{name:"tableView",_modelEvents:{"onChange:displayModel":function(B,C){var z,A;if(B.isReference()){z=B.get("displayModel");if(z.hasChanged("asRootInBodyView")){if(z.get("asRootInBodyView")){this.treeListView.utils.addToTreeList(B);d.addRootToPreferences(B.id,"TABLE");this._context.getBodyDropView().hide()}else{this.treeListView.utils.hide(B,true);A=this.options.context.getBodyTreeListView().getRoots();if(A.length===0){this.options.context.getBodyDropView().show()}this.removeRootToPreferences(B.id,"TABLE")}}if(!z.hasChanged("asRootInTableView")){return this}if(z.previous("asRootInTableView")){if(!C.get("asRootInTableView")){this.treeListView.utils.hide(B,true);this.removeRootToPreferences(B.id,"TABLE")}}else{if(C.get("asRootInTableView")){this.treeListView.utils.addToTreeList(B,{silentMode:true,withLinksResolved:true});d.addRootToPreferences(B.id,"TABLE")}}}return this},onChange:function o(z){this.treeListView.utils.updateAttributes(z);return this},onAdd:function n(A,B,z){if(A.isInstance()){this.treeListView.utils.addToTreeList(A,z)}return this},onRemove:function f(z){this.treeListView.utils.hide(z);this.removeRootToPreferences(z.id,"TABLE");return this}},_modelDocEvents:{onAdd:function(z,A){b.changeDocCmdAvailability(z,A,this.treeListView)},onRemove:function(z,A){b.changeDocCmdAvailability(z,A,this.treeListView)}},setup:function i(){var z=this,B=l.getTableViewPreference(),A={className:w.TableView.Title,nodesCounter:"nodesInTableView",};this.listenTo(this.options.referenceCollection,this._modelEvents);this.listenTo(this.options.instanceCollection,this._modelEvents);this.listenTo(this.options.documentConnectionCollection,this._modelDocEvents);this._dragAndDropMgr=new j({displayModelRootAttribute:"asRootInTableView",dropZoneName:"TableViewDropZone",});A=g.extend(A,this._dragAndDropMgr.getDDBehavior());A=g.extend(A,u.getEditionManager(this));A=g.extend(A,this._getContextualMenu());this.treeListView=u.createTreelistview({treeDocumentOptions:{currentView:h.VIEWS.ROUTINGS},treelistviewOptions:A,preferences:B,name:"TableView"});a.registerReusableCellContent(this.treeListView);this._handleEvents("selectedInTableView",{isCrossHighlight:true,isManageCommandAvailability:true});this.render();this.treeListView.utils._filterProxy.setActiveView(h.VIEWS.ROUTINGS);k.subscribe({event:"DELWebMfgAssetsDefUI/prepareUpdate"},function(){z.treeListView.utils._treeDocument.prepareUpdate()});k.subscribe({event:"DELWebMfgAssetsDefUI/pushUpdate"},function(){z.treeListView.utils._treeDocument.pushUpdate()});k.subscribe({event:"FilterComponentProxy/ApplyFilter"},function(C){z._onApplyFilter(C)});k.subscribe({event:"FilterComponentProxy/RemoveFilter"},function(C){z._onRemoveFilter(C)});k.subscribe({event:"DELWebMfgAssetsDefUI/ReparentInstances"},function(C){z._reparent(C)})},render:function x(){var z;this.setContainer(this.treeListView.getContent());z=this.container;if(g.is(this.options.renderTo)){z.inject(this.options.renderTo)}return this},destroy:function s(){this.stopListening();this._parent()},_getContextualMenu:function v(){var z=this,B={};B.onContextualMenuReady=function A(G){var H={},D=[],E=G.nodeModel,F={},C=G.manager;if(!g.is(G)){return}if(g.is(this.getVirtualCoordinates,"function")){H=this.getVirtualCoordinates()}if(-1===H.virtualRowID){D=[{icon:"url("+t.getIconURLFromKey("SortAToZ")+")",label:"Sort A to Z",callback:function(){C.sortColumnContent(H.virtualColumnID,{sortOrder:"asc"})}},{icon:"url("+t.getIconURLFromKey("SortZToA")+")",label:"Sort Z to A",callback:function(){C.sortColumnContent(H.virtualColumnID,{sortOrder:"desc"})}}]}else{if(0<=H.virtualRowID){if(g.is(E)){if(!E.isSelected()){z.treeListView.getDocument().unselectAll();E.select()}}F={node:E,selectedNodes:z.treeListView.getDocument().getXSO().get(),column:z.treeListView.options.columns[G.virtualColumnID]};F.infos=y.getNodeAndColumnInfos(E,F.column);D=u.buildContextualMenuNodes(["Relations","EditAttribute"],c.getActionBarContext(),F);D.push({type:"separator"});D=D.concat(u.buildContextualMenuNodes(["CapableResourceBL"],c.getActionBarContext()));D.push({type:"separator"});D=D.concat(u.buildContextualMenuNodes(["ActionBar_ChangeOwner","ActionBar_Attributes"],c.getActionBarContext(),null,"CollabSharing_Workbench",null,"CollabSharing_Workbench"));D.push({type:"separator"});D=D.concat(u.buildContextualMenuNodes(["AttachDocument","SearchDocument","ManageDocuments"],c.getActionBarContext()));D.push({type:"separator"});D=D.concat(u.buildContextualMenuNodes(["Hide","Refresh","ExploreInWebApp"],c.getActionBarContext()));D.push({type:"separator"})}}return D.concat(u.buildContextualMenuNodes(u.getDefaultContextualMenu(),c.getActionBarContext()))};return B}});return p});