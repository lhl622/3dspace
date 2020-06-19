define("DS/ENOCharacteristicsWebApp/models/CompositeItemModel",["UWA/Core","UWA/Class/Model","DS/UIKIT/Mask","DS/Tree/TreeDocument","DS/Tree/TreeNodeModel","DS/ENOCharacteristicsWebApp/utils/Constants","DS/ENOCharacteristicsWebApp/utils/AlertManager","DS/ENOCharacteristicsWebApp/utils/RequestUtils","DS/ENOCharacteristicsWebApp/models/DimensionSetModel","DS/ENOCharacteristicsWebApp/models/CharacteristicsModel","DS/ENOCharacteristicsWebApp/models/CharacteristicsCategoryModel","i18n!DS/ENOCharacteristicsWebApp/assets/nls/ENOCharacteristicsWebAppNLS","DS/UIKIT/Tooltip"],function(k,g,h,a,i,c,e,l,b,d,j,n,m){var f=g.extend({urlRoot:l.getGLSWebServiceURL()+c.CHARACTERISTICS_ENDPOINT,mWebAppViewContainer:null,mTreeDocument:null,mObjectId:null,mPID:null,mTreeNodeModel:null,mIsRoot:false,mIsConsolidatedView:false,mDimensionModel:null,setup:function(o){this.mObjectId=o.id;this.mPID=o.pid;window.ObjectId=o.id;this.mChildrenItemList=[];this.mCharCategoryList=[];this.mTreeNodeModel=new i({label:"",grid:{Title:"",current:"",},});this.mTreeNodeModel.setLabel(o.title);this.mTreeNodeModel.setAttribute("ownerModel",this);this.mTreeNodeModel.setAttribute("modelType",c.COMPOSITE_ITEM_MODEL_TYPE);this.mTreeNodeModel.onPostExpand(function(){var p=this;if(p===undefined||p===window){return}if(p.hasChildren()){p.getChildren().forEach(function(q){if(q.options.grid.ownerModel instanceof j){q.getChildren().forEach(function(r){if(!q.isExpanded()){r.reverseExpand()}})}})}})},setAsRootItem:function(){this.mIsRoot=true;this.mTreeDocument=new a({useAsyncPreExpand:true});this.mTreeDocument.addRoot(this.mTreeNodeModel);this.mDimensionModel=new b()},setIsConsolidatedRootItem:function(o){this.mIsConsolidatedView=o},setCharatersticsViewContainer:function(o){this.mWebAppViewContainer=o},emptyTreeDocument:function(){this.mTreeNodeModel.removeChildren();this.mCharCategoryList=[];this.mChildrenItemList=[]},addChildItem:function(o){this.mChildrenItemList.push(o);this.mTreeNodeModel.addChild(o.mTreeNodeModel)},deleteAllSelectedCharacteristics:function(u,p){var t=[];var o=[];var r=this;for(var q=(u.length)-1;q>=0;q--){t[q]={itemId:u[q].options.grid.itemId,charId:u[q].options.grid.id,charTitle:u[q].options.grid.Title}}var s=JSON.stringify(t);l.send3DSpaceRequest(r.urlRoot+c.CHARACTERISTICS_DELETE_ALL_SELECTED,"POST",{type:"text",headers:{"Content-type":"application/json; charset=UTF-8"},data:s},function(y){var B=JSON.parse(y);var x=B.successCharIds;var C=B.failedCharIds;var w=B.failedCharMsgs;var v=n.OperationFailed+", ";var D=[];r.mTreeDocument.prepareUpdate();for(var A=(u.length)-1;A>=0;A--){if(x.indexOf(u[A].options.grid.id)!==-1){if(o.indexOf(u[A].options.grid.itemId)===-1){D.push(u[A].getParent().getParent());o.push(u[A].options.grid.itemId)}var z=u[A].options.grid.ownerModel;z.deleteCharacteristic()}}r.mTreeDocument.pushUpdate();if(C.length>0&&u.length>x.length){v=v+w;e.displayAlert(p.mAlert,v,1)}r.dispatchEvent("DS.GLS.syncModel");D.forEach(function(F){var E={rootNode:F,reOrderAcrossCategory:false,};p.updateSequenceOrder(E)})},function(w,v){e.displayErrorResponse(p.mAlert,v)})},loadCharacteristics:function(o){for(var p=0;p<o.length;p++){this.addCharacteristics(o[p])}},addCharacteristics:function(t){var s=l.getMandatoryIcon();var q=null;for(var r=0;r<this.mCharCategoryList.length;r++){if(this.mCharCategoryList[r].mCharCategory===t.charCategory){q=this.mCharCategoryList[r];break}}if(q===null){var w={iCharCategory:t.charCategory,iOwnerItem:this};q=new j(w);this.mCharCategoryList.push(q);this.mTreeNodeModel.addChild(q.mTreeNodeModel)}var w={Category:q};var o=new d(w);o.fromJSON(t);q.mTreeNodeModel.addChild(o.mTreeNodeModel);q.mNumNodes+=1;var v=t.charCategory+" ("+q.mNumNodes+")";q.mTreeNodeModel.setLabel(v);q.mTreeNodeModel.setAttribute("charCategory",v);o.mTreeNodeModel.setAttributeWithLabel("charCategory","");if(o.mTreeNodeModel.options.grid.mandatoryCharacteristic=="Yes"){var p="<img src="+s+">";o.mTreeNodeModel.options.grid.charCategory=p;var u=o.mTreeNodeModel.options.label;u.charCategory=p;o.mTreeNodeModel.setLabel(u)}return{Category:q,Characteristic:o}},destroy:function(){this.mChildrenItemList=[];this.mCharCategoryList=[];this.stopListening();this._parent()}});return f});