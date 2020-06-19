/*!  Copyright 2016 Dassault Systemes. All rights reserved. */
window.require(["DS/SMAProcADUI/ad-execdir/ADExecDir"],function(b){var a=window.Polymer,f=window.DS;var e=null,d=null,c=null;e=function(){var g=false;if(this.model){a.dom(this.$.lastModifiedDate).textContent=this.formatDate(this.model.lastModified);if(this.model.details){g=this.model.details.hasOwnProperty("revision")}}else{a.dom(this.$.lastModifiedDate).textContent=""}this.expandable=false};d=function(){var h={id:this.model.modelID,type:"file",name:this.model.name,size:this.model.size,lastModified:this.model.lastModified,path:this.model.path,relativePath:this.model.relativePath,station:this.model.station,details:this.model.details};if(typeof this.model.mdType!=="undefined"&&this.model.mdType){h.mdType=this.model.mdType}var g=this.model;while(typeof g!=="undefined"&&g&&!(g instanceof b.ADExecDir)){g=g.parent}if(g instanceof b.ADExecDir){h.credentials=g.credentials}var i={modelSource:this.modelSource,model:h};return i};c=function(){this.expandable=false;this._modelChangedFunction=e.bind(this);this._dragDataFunction=d.bind(this)};f.SMAProcADUI=f.SMAProcADUI||{};f.SMAProcADUI.ADMultiviewPart=a({is:"ad-multiview-part",ready:function(){return c.apply(this,arguments)},_computeTitle:function(g){var h="";if(g){if(g.name){h+=g.name}if(g.name){h+=":"+g.description}}return h},behaviors:[f.SMAProcSP.SPBase,f.SMAProcADUI.ADMultiviewItem,f.SMAProcADUI.FormatUtilities]})});