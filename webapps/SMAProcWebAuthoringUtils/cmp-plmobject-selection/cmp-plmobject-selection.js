require(["DS/JSCMM/SMAJSCMMRule","DS/JSCMM/SMAJSCMMBase"],function(c,a){var b={ONOBJECTSELECT:"change",PLMOBJECTSELECTIONREADY:"pcwPLMObjectSelectionReady"};Polymer({is:"cmp-plmobject-selection",properties:{activity:{value:null,notify:true,observer:"activityChanged"},objectTypes:{type:String,value:"",notify:true},ruleObj:{value:null},rulestring:{notify:true,observer:"rulestringChanged"},selectedobject:{observer:"selectedObjectChanged"},disabled:{type:Boolean,value:false,reflectToAttribute:true}},ready:function(){console.log("Inside ready callback");this.ruleObj=new c();if(this.activity!==null){this.set("ruleObj.parent",this.activity)}this.ruleObj.rule.method="exporter";var d=this;this.$.contentChooser.onchange=function(){var e=d.$.contentChooser.getSelectedContent();d.ruleObj.rule.content=e;d.selectedobject=e;d.fire(b.ONOBJECTSELECT,d);event.stopPropagation();console.log("Inside content Selected event listener")}},attached:function(){var d=this;this.async(function(){d.fire(b.PLMOBJECTSELECTIONREADY,d)})},activityChanged:function(d){if(d!==null&&d instanceof a){this.activity=d;this.set("ruleObj.parent",this.activity)}},getRuleXML:function(){return this.ruleObj&&this.ruleObj.getRuleXML?this.ruleObj.getRuleXML():null},setRuleXML:function(d){this.rulestring=d},rulestringChanged:function(d){if(d!==""||d!==undefined){this.rulestring=d;if(this.activity){this.set("ruleObj.parent",this.activity);this.ruleObj.setRuleXML(d);this.selectedobject=this.ruleObj.rule.content}}},selectedObjectChanged:function(d){if(d!==null||d!==undefined){this.$.contentChooser.selectedobject=d}}})});