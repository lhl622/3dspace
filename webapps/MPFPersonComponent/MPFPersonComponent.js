define("DS/MPFPersonComponent/PersonNameForm",["UWA/Promise","UWA/Class/View","DS/MPFServices/ObjectService","DS/MPFError/ValidationError","DS/MPFView/FieldTextInputV2","DS/MPFPersonModel/PersonModel","i18n!DS/MPFPersonComponent/assets/nls/MPFPersonComponent"],function(e,h,d,c,g,b,f){var a=h.extend({className:"mpf-form mpf-person",tagName:"form",setup:function(i){i||(i={});d.requiredOfPrototype(this.model,b,"this.model must be a PersonModel");this._parent(i);this.readOnly=i.readOnly===true;this.required=i.required===true;this.horizontalLayout=i.horizontalLayout===true;this.lockSave=i.lockSave===true;this.firstNameInput=this._createFirstNameInput();this.lastNameInput=this._createLastNameInput()},render:function(){if(this.horizontalLayout){this.container.addClassName("mpf-horizontal")}this.container.setContent([this.firstNameInput.render(),this.lastNameInput.render()]);return this},validate:function(){var j;var i;j=this.firstNameInput.validate();i=this.lastNameInput.validate();return j.isValid&&i.isValid},save:function(){if(this.lockSave){return e.resolve()}else{if(this.validate()){return this.model.savePromise()}else{return e.reject(new c("PersonNameForm validation failed"))}}},_createFirstNameInput:function(){return new g({model:this.model,fieldName:"firstName",fieldLabel:f.get("firstName"),required:this.required,readOnly:this.readOnly})},_createLastNameInput:function(){return new g({model:this.model,fieldName:"lastName",fieldLabel:f.get("lastName"),required:this.required,readOnly:this.readOnly})},destroy:function(){this.model=null;this._parent();this.container=null}});return a});