(function(e){var a=e.Polymer,h,c,b,g,f,d;f={COLLAPSED:"is-collapsed",EXPANDED:"is-expanded",VISIBLE:"is-visible"};h=function(){this.DOM(this).addClass(f.COLLAPSED);this.state=f.COLLAPSED};c=function(){this.DOM(this).removeClass(f.COLLAPSED);this.state=f.EXPANDED};b=function(i){if(this.state===f.COLLAPSED){c.call(this)}else{h.call(this)}};g=function(){if(this.enabled){c.call(this);this.DOM(this.$.overlay).removeClass(f.VISIBLE)}else{h.call(this);this.DOM(this.$.overlay).addClass(f.VISIBLE)}};e.SPSidebar=Polymer({is:"sp-sidebar",properties:{enabled:{type:Boolean,value:true,notify:true,observer:"enabledChanged"},heading:{notify:true},hideheader:{type:Boolean,value:false,notify:true},state:{value:function(){return f.expanded}}},onToggle:function(){return b.apply(this,arguments)},enabledChanged:function(){return g.apply(this,arguments)},behaviors:[SPBase],_computeClass:function(i){return this.tokenList({hidden:i})+"header "+this.tokenList({hidden:i})},tokenList:function(k){var i,j=[];for(var i in k){if(k[i]){j.push(i)}}return j.join(" ")}});if(console&&console.warn){console.warn("Stop using sp-sidebar. It will be deprecated")}}(this));