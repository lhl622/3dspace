/*!  Copyright 2016 Dassault Systemes. All rights reserved. */
define("DS/CAT3DAnnotationUI/CAT3DAnnotationFilterListItem",["UWA/Core","UWA/Class","DS/CAT3DAnnotationBaseUI/CAT3DAnnotationExpander","DS/Controls/Toggle","DS/VisuEvents/EventsManager","css!DS/CAT3DAnnotationUI/CAT3DAnnotationUI.css"],function(d,b,g,h,c){var i={};var f="";require(["i18n!DS/CAT3DAnnotationUI/assets/nls/CAT3DAnnotationUI"],function(j){f=j.SelectAllLbl});var a=g.extend({publishedProperties:{noSelectAll:{defaultValue:false,type:Boolean},name:{defaultValue:"",type:String},children:{defaultValue:null,type:Array},callback:{defaultValue:null,type:Object},checkFlag:{defaultValue:false,type:Boolean},type:{defaultValue:"checkbox",type:String},displayTitle:{defaultValue:true,type:Boolean},expandingPreference:{defaultValue:false,type:Boolean}},init:function(l){var v=l||{};this._endOffset=55;this._parent(v);this.callback=v.callback;this._checkFlag=v.checkFlag;this.name=v.name;this._type=v.type;this._expandFlag=false;this._expandingPref=v.expandingPreference;var m=v.children;var w;var n;var s;var q;var r;var u=function(p,z){if(z){var x=[];for(var y=0;y<m.length;y++){if(m[y].isDisplayed()){x.push(m[y])}}for(var y=0;y<x.length;y++){x[y].setCheckFlag(p,false,true)}}w.checkFlag=p;if(w.checkFlag&&!n.hasClassName("AnnotFilterSectionActive")){n.addClassName("AnnotFilterSectionActive")}else{if(!w.checkFlag&&n.hasClassName("AnnotFilterSectionActive")){n.removeClassName("AnnotFilterSectionActive")}}};this.body=d.createElement("div",{"class":"AnnotFilterListItemGroup"});if(m.length>1&&!v.noSelectAll){n=d.createElement("div",{id:this.name+"_SelectAll_div","class":"AnnotFilterListItem AnnotFilterListItemOdd"});var j=true;for(var t=0;t<m.length;t++){if(!m[t].getCheckFlag()){j=false}}w=new h({type:"checkbox",checkFlag:j,touchMode:false}).inject(n);w.elements.container.setStyles({display:"inline-block",position:"relative","min-height":"0px",bottom:"5px","margin-left":"4px"});s=function(){u(!w.checkFlag,true)};var o=d.createElement("div",{"class":"AnnotFilterSectionBody"});var k=d.createElement("p",{"class":"AnnotFilterListItemText"}).inject(o);k.setStyle("margin-left","5px");k.innerHTML=f;n.appendChild(o);this.body.appendChild(n);u(w.checkFlag,false)}for(var t=0;t<m.length;t++){this.body.appendChild(m[t].getContent())}if(s){w.addEventListener("buttonclick",s);c.addEvent(n,"onPrimaryPointerClick",s)}if(n&&q&&r){n.addEventListener("mouseenter",q);n.addEventListener("mouseleave",r)}this.setCheckFlag=function(p,x){this._checkFlag=p;if(!this._checkFlag&&this.expandedFlag&&!x){this.setExpandedFlag(!this.expandedFlag)}};this.getExpandedFlag=function(){return this.expandedFlag};this.setExpandedFlag=function(p){this.expandedFlag=p;if(this.expandedFlag){this.expand()}else{this.close()}i[this._expandingPref]=this.expandedFlag};this.update=function(){var x=true;for(var p=0;p<m.length;p++){if(!m[p].getCheckFlag()){x=false}}if(this._type==="checkbox"){this._checkFlag=x}if(w){u(x)}};this.clear=function(){if(n&&s){c.removeEvent(n,"onPrimaryPointerClick",s)}if(n&&q&&r){n.removeEventListener("mouseenter",q);n.removeEventListener("mouseleave",r)}c.removeEvent(this.elements.header,"onPrimaryPointerClick",this.headerCB)}},buildView:function(){this._parent();var j=this;setTimeout(function(){if(i[j._expandingPref]===true){if((j._type==="radio"&&j._checkFlag)||j._type!=="radio"){j.expand()}}else{i[j._expandingPref]=false;j.close()}},0);if(!this.headerCB){var j=this;this.headerCB=function(){if(j.callback&&!j._checkFlag){j.setCheckFlag(!j._checkFlag);j.callback({name:j.name,checkFlag:j._checkFlag})}if(j._expandingPref){i[j._expandingPref]=!j.expandedFlag}};c.addEvent(this.elements.header,"onPrimaryPointerClick",this.headerCB)}}});var e=b.extend({init:function(j){this._parent(j);var j=j||{};var y=this;this.name=j.name;var n=j.children;var t=j.checkFlag;var w;var C;var k;var z;var o;var A;var m;var l;var r=true;this.setCheckFlag=function(p,E,D){t=p;if(w){w.setCheckFlag(p,E)}o.checkFlag=t;if(t&&!C.hasClassName("AnnotFilterSectionActive")){C.addClassName("AnnotFilterSectionActive")}else{if(!t&&C.hasClassName("AnnotFilterSectionActive")){C.removeClassName("AnnotFilterSectionActive")}}if(D){j.callback({name:j.name,json:j.json,idPath:j.idPath,checkFlag:t})}};this.getCheckFlag=function(){return t};this.setDisplayFlag=function(p){if(z&&r){r=false;if(C.hasClassName("AnnotFilterListItemOdd")){C.removeClassName("AnnotFilterListItemOdd")}C.removeChild(k);C.appendChild(z)}if(C){C.hidden=!p}};this.setNbElems=function(p){if(l){l.innerHTML=p.toString()}};this.setExpandedFlag=function(p){if(w){return w.setExpandedFlag(p)}};this.getExpandedFlag=function(){if(w){return w.getExpandedFlag()}};this.update=function(D){if(w){w.update()}if(n&&n.length){var p=0;var H=0;for(var E=0;E<n.length;E++){if(n[E].isDisplayed()){n[E].setIsOdd(H%2===1);H++}n[E].update();p+=n[E].getDisplayedElements()}if(l){var G=0;for(var E=0;E<n.length;E++){G+=n[E].getCheckedElements()}l.innerHTML=G.toString()}if(j.type==="checkbox"){var F=true;for(var E=0;E<n.length;E++){if(n[E].getCheckFlag()===false&&n[E].isDisplayed()){F=false;break}}this.setCheckFlag(F,true)}if(p!==0){y.setDisplayFlag(true)}else{if(!D){y.setDisplayFlag(false)}else{if(z&&!r){r=true;C.addClassName("AnnotFilterListItemOdd");C.removeChild(z);C.appendChild(k)}}}}};this.getDisplayedElements=function(){var p=0;if(n){for(var D=0;D<n.length;D++){p+=n[D].getDisplayedElements()}}else{if(j.type==="checkbox"&&this.isDisplayed()){p++}}return p};this.getCheckedElements=function(){var p=0;if(n){for(var D=0;D<n.length;D++){p+=n[D].getCheckedElements()}}else{if(j.type==="checkbox"&&t&&this.isDisplayed()){p++}}return p};this.getChildrenItems=function(){if(n&&n.length){return n}return[]};this.getContent=function(){return C};this.isDisplayed=function(){if(C){return !C.hidden}};this.setIsOdd=function(p){if(w){return}if(p&&C.hasClassName("AnnotFilterListItemEven")){C.removeClassName("AnnotFilterListItemEven")}if(!p&&C.hasClassName("AnnotFilterListItemOdd")){C.removeClassName("AnnotFilterListItemOdd")}C.addClassName(p?"AnnotFilterListItemOdd":"AnnotFilterListItemEven")};this.addBottomSeparator=function(){var p=d.createElement("div",{"class":"AnnotFilterListItemSeparator"});C.appendChild(p)};this.clear=function(){if(n){for(var p=0;p<n.length;p++){n[p].clear()}}if(w){w.clear()}if(C&&m){c.removeEvent(C,"onPrimaryPointerClick",m)}};C=d.createElement("div",{id:j.id+"_div","class":"AnnotFilterListItem"});if(j.displayTitle===true||j.displayTitle===undefined){C.setAttribute("title",j.header)}if(j.className){C.addClassName(j.className)}if(j.isOdd){C.addClassName("AnnotFilterListItemOdd")}m=function(){if(r){y.setCheckFlag(!t);j.callback({name:j.name,idPath:j.idPath,checkFlag:t})}};k=d.createElement("div",{"class":"AnnotFilterSectionBody"});if(j.icon){var u=d.createElement("div",{"class":"AnnotFilterListItemIcon"}).inject(k);u.setStyle("background-image",'url("'+j.icon+'")')}if(j.header){var v=d.createElement("p",{"class":"AnnotFilterListItemText"}).inject(k);v.innerHTML=j.header;var x=(j.icon&&j.displayNbElems)?"calc(80% - 50px)":(j.icon?"calc(100% - 50px)":(j.displayNbElems?"calc(80% - 10px)":"calc(100% - 10px)"));v.setStyles({width:x})}if(n&&n.length){r=false;var q=0;for(var s=0;s<n.length;s++){if(n[s].isDisplayed()){n[s].setIsOdd(q%2===1);q++}}if(j.type==="radio"){o=new h({type:j.type,checkFlag:false,touchMode:false}).inject(C);A=function(){if(!t){y.setCheckFlag(true);j.callback({name:j.name,checkFlag:true})}};w=new a({name:this.name,touchMode:false,header:j.header,children:n,checkFlag:t,callback:j.callback,noSelectAll:j.noSelectAll,displayTitle:false,type:j.type,expandingPreference:j.expandingPreference});z=d.createElement("div",{"class":"AnnotFilterDivExpander"});z.appendChild(w.elements.container);C.appendChild(z)}else{o=new h({type:j.type,checkFlag:false,touchMode:false}).inject(C);A=function(){var D=o.checkFlag;for(var E=0;E<n.length;E++){if(n[E].isDisplayed()){n[E].setCheckFlag(D,false,true)}}if(D&&l){var p=0;for(var E=0;E<n.length;E++){if(n[E].isDisplayed()){p++}}l.innerHTML=p.toString()}else{if(l){l.innerHTML="0"}}};w=new a({name:this.name,touchMode:false,header:j.header,children:n,noSelectAll:j.noSelectAll,displayTitle:false,expandingPreference:j.expandingPreference});z=d.createElement("div",{"class":"AnnotFilterDivExpander"});z.appendChild(w.elements.container);C.appendChild(z)}}else{o=new h({type:j.type,checkFlag:false,touchMode:false}).inject(C);A=function(){setTimeout(function(){o.checkFlag=t;if((t&&j.type==="radio")||(j.type==="checkbox")){j.callback({name:j.name,idPath:j.idPath,checkFlag:t})}},0)};C.appendChild(k)}o.elements.container.setStyles({"vertical-align":"top",display:"inline-block","margin-left":"4px","margin-top":"5px"});if(j.displayNbElems){l=d.createElement("p");var B=0;if(w){l.addClassName("AnnotFilterExpanderNbElems");w.elements.header.appendChild(l);for(var s=0;s<n.length;s++){B+=n[s].getCheckedElements()}}else{l.addClassName("AnnotFilterNbElems");if(j.nbElems){B=j.nbElems}k.appendChild(l)}l.innerHTML=B.toString()}if(r){y.setIsOdd(true)}if(C&&m){c.addEvent(C,"onPrimaryPointerClick",m)}if(o&&A){o.addEventListener("buttonclick",A)}if(t!==undefined&&t!==null){this.setCheckFlag(t)}if(j.isDisplayed!==undefined){this.setDisplayFlag(j.isDisplayed)}}});return e});define("DS/CAT3DAnnotationUI/CAT3DAnnotationFilterTolFilterItem",["UWA/Core","UWA/Class","DS/Controls/Toggle","DS/Controls/Button","DS/Controls/LineEditor","DS/Controls/ComboBox","DS/VisuEvents/EventsManager","css!DS/CAT3DAnnotationUI/CAT3DAnnotationUI.css"],function(f,a,j,g,e,i,c){var k="";var l="";var d="";var h="";require(["i18n!DS/CAT3DAnnotationUI/assets/nls/CAT3DAnnotationUI"],function(m){k=m.ValueLbl;l=m.ApplyLbl;d=m.MinLbl;h=m.MaxLbl});var b=a.extend({init:function(q){var B=0;var s="infEqual";var F=0;var y="infEqual";this.setCheckFlag=function(I){w=I;v.checkFlag=w;m.disabled=!w;n.disabled=!w;C.disabled=!w;p.disabled=!w;u.disabled=!w;if(w&&n.currentValue==="equal"){C.disabled=true;p.disabled=true}if(w&&!H.hasClassName("AnnotFilterSectionActive")){H.addClassName("AnnotFilterSectionActive");if(!o()){m.value=0;n.currentValue="infEqual";C.value=0;p.currentValue="infEqual"}}else{if(!w&&H.hasClassName("AnnotFilterSectionActive")){H.removeClassName("AnnotFilterSectionActive")}}};this.update=function(){};this.getContent=function(){return H};this.getFormulaComponents=function(){return{leftValue:B,leftOperand:s,rightValue:F,rightOperand:y}};this.clear=function(){c.removeEvent(H,"onPrimaryPointerClick",E)};var o=function(){var I=true;if(B===undefined||B===null||s===undefined||s===null){I=false}if(F===undefined||F===null||y===undefined||y===null){I=false}if(s==="equal"){I=true}else{if(s==="infEqual"&&y==="infEqual"){I=B<=F}else{I=B<F}}return I};var z=this;this.name=q.name;var w=q.checkFlag;var H=f.createElement("div",{id:this.name+"_div","class":"AnnotFilterListItem AnnotFilterTolListItem"});H.ondragstart=function(){return false};var x=f.createElement("div",{"class":"AnnotFilterTolLineDiv"}).inject(H);x.setStyles({"margin-top":"2px"});var v=new j({type:"checkbox",checkFlag:false,touchMode:false}).inject(x);v.addEventListener("buttonclick",function(){v.checkFlag=w});var r=f.createElement("p",{id:this.name+"_sectionPar","class":"AnnotFilterListItemText"}).inject(x);r.innerHTML=k;var u=new g({label:l,touchMode:false,emphasize:"primary",onClick:function(I){I.stopPropagation();if(o()){q.callback({checkFlag:w,formulaComponents:z.getFormulaComponents()})}}});u.inject(x);x=f.createElement("div",{"class":"AnnotFilterTolLineDiv"}).inject(H);var A=f.createElement("p",{id:this.name+"_sectionPar","class":"AnnotFilterListItemText"}).inject(x);A.innerHTML=d;var D=[{labelItem:">=",valueItem:"infEqual"},{labelItem:">",valueItem:"inf"},{labelItem:"=",valueItem:"equal"}];var n=new i({elementsList:D,selectedIndex:0,touchMode:false,enableSearchFlag:false,actionOnClickFlag:false}).inject(x);n.addEventListener("change",function(){s=n.currentValue;if(s==="equal"){p.disabled=true;C.disabled=true}else{p.disabled=false;C.disabled=false}u.disabled=!o()});var m=new e({placeholder:"0",disabled:false,selectAllOnFocus:true,touchMode:false,autoCommitFlag:true,pattern:"^[0-9]*.?[0-9]*$"}).inject(x);m.addEventListener("change",function(){B=parseFloat(m.value)||0;u.disabled=!o()});x=f.createElement("div",{"class":"AnnotFilterTolLineDiv"}).inject(H);var t=f.createElement("p",{id:this.name+"_sectionPar","class":"AnnotFilterListItemText"}).inject(x);t.innerHTML=h;var G=[{labelItem:"<=",valueItem:"infEqual"},{labelItem:"<",valueItem:"inf"}];var p=new i({elementsList:G,selectedIndex:0,touchMode:false,enableSearchFlag:false,actionOnClickFlag:false}).inject(x);p.addEventListener("change",function(){y=p.currentValue;u.disabled=!o()});var C=new e({placeholder:"0",disabled:false,touchMode:false,selectAllOnFocus:true,autoCommitFlag:true,pattern:"^[0-9]*.?[0-9]*$"}).inject(x);C.addEventListener("change",function(){F=parseFloat(C.value)||0;u.disabled=!o()});if(q.formulaComponents){m.value=q.formulaComponents.leftValue;n.currentValue=q.formulaComponents.leftOperand;C.value=q.formulaComponents.rightValue;p.currentValue=q.formulaComponents.rightOperand;if(n.currentValue==="equal"){setTimeout(function(){C.disabled=true;p.disabled=true},0)}}if(q.className){H.addClassName(q.className)}v.elements.container.setStyles({display:"inline-block","min-height":"0px",position:"relative",bottom:"4px",left:"3px"});r.setStyles({width:"calc(100% - 100px)"});u.elements.container.setStyles({"float":"right","margin-right":"5px","margin-top":"2px",height:"100%"});m.elements.container.setStyles({display:"inline"});m.elements.container.childNodes[0].setStyles({width:"calc(100% - 120px)","margin-left":"3px",height:"22px"});C.elements.container.setStyles({display:"inline"});C.elements.container.childNodes[0].setStyles({width:"calc(100% - 120px)","margin-left":"3px",height:"22px"});A.setStyles({"vertical-align":"middle",width:"30px"});t.setStyles({"vertical-align":"middle",width:"30px"});this.setCheckFlag(q.checkFlag);var E=function(J){if(w&&(J.from[0].view===r)){z.setCheckFlag(!w);q.callback({checkFlag:w,formulaComponents:z.getFormulaComponents()})}else{var I=J.from[0].view;setTimeout(function(){if(I!==v.elements.checkSign&&I!==r){return}z.setCheckFlag(!w);q.callback({checkFlag:w,formulaComponents:z.getFormulaComponents()})},0)}};c.addEvent(H,"onPrimaryPointerClick",E)}});return b});define("DS/CAT3DAnnotationUI/CAT3DAnnotationUI",[],function(){});