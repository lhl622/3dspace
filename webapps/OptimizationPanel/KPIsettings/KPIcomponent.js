define("DS/OptimizationPanel/KPIsettings/KPIcomponent",["DS/Controls/Button","DS/Controls/Slider","DS/Controls/Toggle","DS/CoreEvents/ModelEvents","DS/UIKIT/Tooltip","css!DS/UIKIT/UIKIT.css","css!DS/OptimizationPanel/KPIsettings/PanelKPI.css"],function(d,f,b,e,c){var a=function(g){this._name=g&&g.name?g.name:"kpi";this._modelEvents=g&&g.modelEvents?g.modelEvents:new e();this._id=g&&g.id?g.id:"other";this._init(g)};a.prototype._init=function(g){this._buttonState=g&&g.modelC0.tabId[this._id].kpiList[this._name]?g.modelC0.tabId[this._id].kpiList[this._name].button:false;this._sliderState=g&&g.modelC0.tabId[this._id].kpiList[this._name]?g.modelC0.tabId[this._id].kpiList[this._name].slider:3;this._maxState=g&&g.modelC0.tabId[this._id].kpiList[this._name]?g.modelC0.tabId[this._id].kpiList[this._name].max:false;this._initDom(g)};a.prototype._initDom=function(l){this._content=document.createElement("div");this._content.classList.add("kpi-content");this._content.id=this._name;this._slider=new f({minValue:0,maxValue:5,stepValue:1,value:this._sliderState});this._button=new d({label:this._name,type:"check",checkFlag:this._buttonState,allowUnsafeHTMLLabel:false});this._tooltip=new c({target:this._slider.getContent(),body:this._slider.value});this._switch=new b({type:"switch",internalLabelsFlag:true,checkFlag:this._maxState,allowUnsafeHTMLLabel:false});this._tooltip.inject(this._content);this._slider.inject(this._content);this._button.inject(this._content);this._switch.inject(this._content);var g=this._content.querySelectorAll(".wux-controls-switch");var m=this._content.querySelectorAll(".wux-controls-switch .wux-controls-toggle-switch-label-right");var k=this._content.querySelectorAll(".wux-controls-switch .wux-controls-toggle-switch-label-left");for(var h=0;h<g.length;h++){m[h].innerHTML=null;k[h].innerHTML=null}if(this._buttonState===true){this._content.childNodes[1].classList.add("visible");this._content.childNodes[3].classList.add("visible")}var j=this;this._button.addEventListener("buttonclick",function(r){var q=r.dsModel;if(q.checkFlag){l.modelC0.tabId[j._id].kpiList[j._name]={};l.modelC0.tabId[j._id].kpiList[j._name].button=true;var s=q.elements.button.previousElementSibling.getAttribute("keymap-manager");var p=j._content.querySelectorAll(".wux-controls-slider");for(var o=0;o<p.length;o++){if(p[o].attributes[1].value==s){p[o].classList.add("visible")}}l.modelC0.tabId[j._id].kpiList[j._name].slider=j._slider.value;var n=q.elements.button.nextElementSibling.getAttribute("keymap-manager");for(var o=0;o<g.length;o++){if(g[o].attributes[1].value==n){g[o].classList.add("visible")}}l.modelC0.tabId[j._id].kpiList[j._name].max=j._switch.checkFlag}else{q.elements.button.previousElementSibling.classList.remove("visible");q.elements.button.nextElementSibling.classList.remove("visible");delete l.modelC0.tabId[j._id].kpiList[j._name]}j._modelEvents.publish({event:"kpi-component-onchange",data:q.elements.container.parentElement.id})});this._slider.addEventListener("change",function(i){var o=i.dsModel;var n=o.value;j._tooltip.setBody(n.toString());j._modelEvents.publish({event:"kpi-component-onchange",data:o.elements.container.parentElement.id});l.modelC0.tabId[j._id].kpiList[j._name].slider=j._slider.value});this._switch.addEventListener("buttonclick",function(n){var i=n.dsModel;j._modelEvents.publish({event:"kpi-component-onchange",data:i.elements.container.parentElement.id});l.modelC0.tabId[j._id].kpiList[j._name].max=j._switch.checkFlag});this._kpiStatus=this._getStatus()};a.prototype.inject=function(g){g.appendChild(this._content)};a.prototype._getStatus=function(){var g=this;g._kpiStatus={button:g._button.checkFlag,slider:g._slider.value,max:g._switch.checkFlag};return g._kpiStatus};a.prototype.destroy=function(){this._content=null};return a});