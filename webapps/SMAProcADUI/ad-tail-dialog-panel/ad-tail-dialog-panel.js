/*!  Copyright 2016 Dassault Systemes. All rights reserved. */
(function(g){var e=g.Polymer,i=g.DS;var c=null,j,h=null,f=null,k=null,a=null,d=null,b=null;c=function(n,o){var l=n?n:this.$.tailView.linesDisplayed;var m=o?o:this.$.tailView.linesDisplayed===0?0:o;if(this.onTailRefresh){this.onTailRefresh.call(this,l,m)}else{this.fire("refresh",{})}};j=function(){this.$.tailView.onNbLinesChanged=c.bind(this)};h=function(l){this.$.tailView.refreshCurrent();l.stopPropagation();l.cancelBubble=true};f=function(){this.$.dialogPanel.open()};k=function(){this.$.dialogPanel.close()};a=function(){return this.$.dialogPanel.isOpen()};d=function(n,o,l,m){this.$.tailView.refreshTail(n,o,l,m)};b=function(){c.call(this)};i.SMAProcADUI=i.SMAProcADUI||{};i.SMAProcADUI.ADTailDialogPanel=e({is:"ad-tail-dialog-panel",properties:{showRefresh:{type:Boolean,value:false},showStretch:{type:Boolean,value:false},directory:{type:Object,value:null},model:{type:Object,value:null},modelModified:{type:String,value:null},onTailRefresh:{type:Object,value:null}},ready:function(){return j.apply(this,arguments)},onRefresh:function(){return h.apply(this,arguments)},open:function(){return f.apply(this,arguments)},close:function(){return k.apply(this,arguments)},isOpen:function(){return a.apply(this,arguments)},refreshTail:function(){return d.apply(this,arguments)},refreshContent:function(){return b.apply(this,arguments)},behaviors:[i.SMAProcSP.SPBase]})}(this));