define("DS/ENOCharacteristicsWebApp/utils/DnDUtil",["UWA/Core","UWA/Class","DS/ENOCharacteristicsWebApp/models/CharacteristicsModel","DS/ENOCharacteristicsWebApp/models/CharacteristicsCategoryModel","DS/ENOCharacteristicsWebApp/utils/AlertManager","DS/ENOCharacteristicsWebApp/utils/UIUtil","DS/ENOCharacteristicsWebApp/utils/Constants","i18n!DS/ENOCharacteristicsWebApp/assets/nls/ENOCharacteristicsWebAppNLS"],function(g,a,d,f,c,h,b,i){var e=a.singleton({init:function(){return this},authorizeDrop:function(l,u,r){var k=this;var q=true;var j;var m;var s;var v=false;var p=r.nodeModel.options.grid;var o=p.modelType;for(var n=0;n<u.length;n++){j=u[n].grid;if(j.modelType!==o){if(j.modelType===b.CHARACTERISTICS_MODEL_TYPE&&o===b.CHARACTERISTICS_CATEGORY_MODEL_TYPE){c.displayAlert(l.mAlert,i.DropNotAuthorized+" : "+i.CannotDrop+" "+i.Characteristics+" "+i.Over+" "+i.CharacteristicsCategory+".",1)}else{if(j.modelType===b.CHARACTERISTICS_CATEGORY_MODEL_TYPE&&o===b.CHARACTERISTICS_MODEL_TYPE){c.displayAlert(l.mAlert,i.DropNotAuthorized+" : "+i.CannotDrop+" "+i.CharacteristicsCategory+" "+i.Over+" "+i.Characteristics+".",1)}else{c.displayAlert(l.mAlert,i.DropNotAuthorized,1)}}q=false;break}if(j.itemId!==p.itemId){c.displayAlert(l.mAlert,i.ReorderBetweenDifferentParentItemsNotAllowed,1);q=false;break}if(b.CHARACTERISTICS_MODEL_TYPE===o){if(j.id===p.id){q=false;break}if(j.categoryName!==p.categoryName){v=true}if(v){m=j.overwriteAllowedOnChildFromMaster;s=j.relationship;if(s==="ParameterUsage"){c.displayAlert(l.mAlert,i.DnDNotAllowedAcrossCategoriesOAOCIsFalse+" [ "+j.Title+" ].",1);q=false;break}if(j.isDerivedCharacteristic==="Yes"){c.displayAlert(l.mAlert,i.DnDNotAllowedAcrossCategoryForDerivedChar+" [ "+j.Title+" ] "+i.OrMore,1);q=false;break}}}else{if(b.CHARACTERISTICS_CATEGORY_MODEL_TYPE===o){if(j.title===p.title){q=false;break}}else{if(b.COMPOSITE_ITEM_MODEL_TYPE===o){c.displayAlert(l.mAlert,i.DropNotAuthorizedOnItems,1);q=false;break}}}}var t={authorizeDrop:q,reOrderAcrossCategory:v};return t},validateDrop:function(k,j){if(!(k.itemId===j.itemId&&k.categoryName===j.categoryName)){c.displayAlert(i.DropNotAuthorized,1);return false}return true},createCharModelForDnD:function(k,j){var m={Category:k};var l=new d(m);l.copyDataFromNodeModel(j);return l},createCharCategoryModelForDnD:function(l,n){var k=this;var j={iCharCategory:n.grid.title,iOwnerItem:l};var m=new f(j);m.copyDataFromNodeModel(n);n.children.forEach(function(o){var p=k.createCharModelForDnD(m,o);m.mTreeNodeModel.addChild(p.mTreeNodeModel)});return m},authorizeDrag:function(l,j){var k=j.isInstantiatedIn3DD?null:j.elements.container.getElement("input#searchText");if(h.isNotNullAndNotUndefined(k)&&k.value!==""){c.displayAlert(j.mAlert,i.ClearFilterBeforeDnD,1);return false}else{if(l.nodeModel.options.grid.modelType===b.CHARACTERISTICS_MODEL_TYPE||l.nodeModel.options.grid.modelType===b.CHARACTERISTICS_CATEGORY_MODEL_TYPE){if(j.mAccess.Modify){return true}else{c.displayAlert(j.mAlert,i.NoModifyAccessToDoDnD,1);return false}}else{if(l.nodeModel.options.grid.modelType===b.COMPOSITE_ITEM_MODEL_TYPE){c.displayAlert(j.mAlert,i.DragNotAuthorizedOnItems,1);return false}else{return false}}}},processDropEffect:function(j){var n=this,p,q,o=j.dndInfos.nodeModel,l=j.droppedNodes,k=j.dndInfos,m=j.dndInfos.nodeModel.getParent().options.grid;l.forEach(function(s,r){if(s.grid.modelType===b.CHARACTERISTICS_MODEL_TYPE){p=n.createCharModelForDnD(m.ownerModel,s).mTreeNodeModel}else{if(s.grid.modelType===b.CHARACTERISTICS_CATEGORY_MODEL_TYPE){p=n.createCharCategoryModelForDnD(m.ownerModel,s).mTreeNodeModel}}if(k.cellView){q=k.manager.getDocument().options.shouldAcceptDrop({parentTreeNodeModel:o,draggedTreeNodeModel:p,dropPosition:k.dropPosition});if(q){k.manager.getDocument().prepareUpdate();k.manager.getDocument().getXSO().get().forEach(function(t){if(t.options.grid.modelType===j.draggedObjModelType){switch(t.options.grid.modelType){case b.CHARACTERISTICS_MODEL_TYPE:t.options.grid.ownerModel.removeCharacteristic();break;case b.CHARACTERISTICS_CATEGORY_MODEL_TYPE:t.options.grid.ownerModel.removeCategory();break;default:}}});k.manager.getDocument().pushUpdate();if(k.virtualRowID!==-1){switch(k.dropPosition){case"top":o.getParent().insertBefore(p,o);break;default:case"middle":o.getParent().addChild(p,o.getParent().getChildren().indexOf(o)+1);break;case"bottom":o.getParent().addChild(p,o.getParent().getChildren().indexOf(o)+1);break}if(k.dropPosition&&b.CHARACTERISTICS_CATEGORY_MODEL_TYPE===o.options.grid.modelType){m.ownerModel.mCharCategoryList.push(p.options.grid.ownerModel)}return false}else{return true}}else{return false}}});if(o===undefined||o===null){return}if(j.draggedObjModelType===b.CHARACTERISTICS_MODEL_TYPE){j.rootNode=o.getParent().getParent();j.targetCategoryNode=o.getParent()}else{if(j.draggedObjModelType===b.CHARACTERISTICS_CATEGORY_MODEL_TYPE){j.rootNode=o.getParent();j.targetCategoryNode=null}}j.charControl.updateSequenceOrder(j)},});return e});