define("DS/XCTInfExpander/XCTInfExpander",[],function(){return{}});define("DS/XCTInfExpander/XCTExpander",["UWA/Core","UWA/Class","DS/Controls/Expander","css!DS/XCTInfExpander/XCTInfExpander.css"],function(c,b,a){return b.extend({createExpander:function(e){if(!e||!e.parent){throw Error("Options object need to be specified and the parent element is required")}var d=c.createElement("div",{Class:"xct-expander-panel wux-control-inline-container"});var f=a.prototype.keymaps;if(e.disableSpace){a.prototype.keymaps={}}var g=new a({header:e.title,body:d,expandedFlag:(e.expanded===undefined)?true:e.expanded}).inject(e.parent);if(e.disableSpace){a.prototype.keymaps=f}g.elements.container.classList.add("xct-expander");if(e.containerClassName){g.elements.container.classList.add(e.containerClassName)}return d}})});