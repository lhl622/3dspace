/*!  Copyright 2016 Dassault Systemes. All rights reserved. */
window.define(["DS/SMAProcADUI/ad-util/ADObservable"],function(d){var c={};var h={category:"category",folder:"folder",document:"document",simulation:"DesignSight",file:"file",fileversion:"fileversion",part:"part"};var e={folder:"Simulation Folder",vDocument:"Simulation Document - Versioned",document:"Simulation Document - NonVersioned",evDocument:"Document",simulation:"DesignSight",file:"file",fileversion:"fileversion",part:"PLMCoreReference,PLMCoreRepReference,VPMReference,Physical Product"};var f=function(){this._mdObject={};this.modelID="";this.type="";this.mdType="";this.isReference=false;this.parentInstance=null;this.loaded=false;this.accessDisabled=false;this.autoRefreshEnabled=false;this._name="";Object.defineProperty(this,"name",{get:function(){return this._name},set:function(i){this._name=i;this.notifyObservers("name")}});this._description="";Object.defineProperty(this,"description",{get:function(){return this._description},set:function(i){this._description=i;this.notifyObservers("description")}});this._lastModified="";Object.defineProperty(this,"lastModified",{get:function(){return this._lastModified},set:function(i){this._lastModified=i;this.notifyObservers("lastModified")}});this._size="";Object.defineProperty(this,"size",{get:function(){return this._size},set:function(i){this._size=i;this.notifyObservers("size")}});this._childInstances=[];Object.defineProperty(this,"childInstances",{get:function(){return this._childInstances},set:function(i){this._childInstances=i;this.notifyObservers("childInstances")}});this._details={};Object.defineProperty(this,"details",{get:function(){return this._details},set:function(i){this._details=i;this.notifyObservers("details")}});d.makeObservable(this)};c.ADMDataInstance=f;f.TYPES=h;f.PLMTYPES=e;f.prototype.load=function(i,j){this._mdObject=i;this.parentInstance=j;g.call(this)};var g=function(){var i;this.mdType=this._mdObject.basics.type;if(e.folder===this.mdType){this.modelID=this._mdObject.id;this._name=this._mdObject.basics.name;this._description=(this._mdObject.attributes.description)?this._mdObject.attributes.description:"";this.type=h.folder;this._lastModified=(this._mdObject.basics.modified)?this._mdObject.basics.modified:"";this.isReference=((typeof(this._mdObject.basics.reference)!=="undefined")&&this._mdObject.basics.reference===true)?true:false}else{if(e.simulation===this.mdType){i=(this._mdObject.attributes.title)?this._mdObject.attributes.title:this._mdObject.basics.name;this.modelID=this._mdObject.id;this._name=i;this._description=(this._mdObject.attributes.description)?this._mdObject.attributes.description:"";this.type=h.simulation;this._lastModified=(this._mdObject.basics.modified)?this._mdObject.basics.modified:"";this.isReference=((typeof(this._mdObject.basics.reference)!=="undefined")&&this._mdObject.basics.reference===true)?true:false}else{if(e.file===this.mdType){this.modelID=b(this._mdObject.id);this.fileID=this.modelID;this._name=this._mdObject.basics.name;this._description="";this.type=h.file;this._lastModified=(this._mdObject.basics.modified)?this._mdObject.basics.modified:"";this._size=(this._mdObject.basics.size)?this._mdObject.basics.size:"";this._details.locked=a(this._mdObject);if(this._mdObject.basics.hasOwnProperty("revision")){this._details.revision=this._mdObject.basics.revision}if(!this._mdObject.basics.modified&&!this._mdObject.basics.size){this.accessDisabled=true}}else{if(e.fileversion===this.mdType){this.modelID=this._mdObject.physicalid;this._name=this._mdObject.title;this._description=this._mdObject.comment;this.type=h.fileversion;this._lastModified=(this._mdObject.originated)?this._mdObject.originated:"";this._size=(this._mdObject.size)?this._mdObject.size:"";this._details.version=this._mdObject.version;this._details.comment=this._mdObject.comment}else{if(e.part.split(",").indexOf(this.mdType)>-1){this.modelID=this._mdObject.id;this.name=this._mdObject.attributes.title;this.description=this._mdObject.attributes.description;this.type=h.part;this.lastModified=this._mdObject.basics.modified?this._mdObject.basics.modified:""}else{this.modelID=this._mdObject.id;this._name=this._mdObject.attributes.title;this._description=(this._mdObject.attributes.description)?this._mdObject.attributes.description:"";this.type=h.document;this._lastModified=(this._mdObject.basics.modified)?this._mdObject.basics.modified:"";this.isReference=((typeof(this._mdObject.basics.reference)!=="undefined")&&this._mdObject.basics.reference===true)?true:false;this._details.versioned=((this.mdType===e.vDocument)||(this.mdType===e.evDocument));this._details.locked=a(this._mdObject)}}}}}};var a=function(i){var j=false;if(i.basics.fileLockedForCheckin){j=i.basics.fileLockedForCheckin}else{if(typeof i.basics.isLocked==="string"){j=(i.basics.isLocked.toUpperCase()==="TRUE")}else{j=i.basics.isLocked}}return j};var b=function(j){var i,k;i=j.split("~");k=i.shift();return k};return c});