(function(a){Polymer({is:"sp-access",accessesChanged:function(){var b=this.$.grp;if(b.accesses){Object.keys(b.ACCESS).forEach(function(d){var c=b.ACCESS[d];this[c]=b.accesses.indexOf(c)>-1;this["has"+c]=this[c]},this)}this.async(this.fire.bind(this,"accesschange"))},properties:{nowrap:{type:Boolean,value:false,notify:true,reflectToAttribute:true},nooverlay:{type:Boolean,value:false,notify:true,reflectToAttribute:true},accesses:{type:Array,value:function(){return[]},notify:true,observer:"accessesChanged",reflectToAttribute:true},basic:{type:Boolean,value:false,notify:true,reflectToAttribute:true},read:{type:Boolean,value:false,notify:true,reflectToAttribute:true},write:{type:Boolean,value:false,notify:true,reflectToAttribute:true},add:{type:Boolean,value:false,notify:true,reflectToAttribute:true},remove:{type:Boolean,value:false,notify:true,reflectToAttribute:true},full:{type:Boolean,value:false,notify:true,reflectToAttribute:true},group:{type:String,notify:true},hasadd:{type:Boolean,notify:true},hasbasic:{type:Boolean,notify:true},hasfull:{type:Boolean,notify:true},hasread:{type:Boolean,notify:true},hasremove:{type:Boolean,notify:true},haswrite:{type:Boolean,notify:true}},getRawData:function(){return this.$.grp.data},behaviors:[a.SPBase]})}(this));