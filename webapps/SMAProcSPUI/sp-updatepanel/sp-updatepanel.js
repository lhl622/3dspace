(function(b){var d,c,a;d={SP_UPDATEPANEL_MESSAGE:"sp-updatepanel-message"};c={UPDATING:"is-updating"};a=function(f,e){this.state=f;this.isupdating=e};Polymer({is:"sp-updatepanel",behaviors:[SPBase],properties:{fullscreen:{type:Boolean,value:false,reflectToAttribute:true},isupdating:{type:Boolean,value:false,reflectToAttribute:true},messageElements:{value:null},state:{type:String,observer:"stateChanged"},updateswhen:{type:String,value:"is-getting,is-deleting,is-creating"}},attached:function(){this.messageElements=[];[].forEach.call(this.children,function(e){if(e.tagName.toLowerCase()===d.SP_UPDATEPANEL_MESSAGE){this.messageElements.push(e)}},this)},stateChanged:function(f,e){if(this.updateswhen&&this.updateswhen.split(",").indexOf(this.state)!==-1){this.update(this.state)}else{this.done(this.state)}(this.messageElements||[]).forEach(function(g){g.state=this.state},this);this.asyncFire("statechanged",{previousValue:e,currentValue:f})},update:function(e){e=e||c.UPDATING;a.call(this,e,true)},done:function(e){e=e||"";a.call(this,e,false)},computeClass:function(e){return"overlay "+e},computeClass2:function(e){return"spinner-container "+e}})}(this));