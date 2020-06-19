define("DS/DELWebMfgItemDefKeyBindings/KeyBindingHandler",["UWA/Core","UWA/Class","DS/Logger/Logger",],function(g,b,a){var e=b.extend({name:"KeyBindingHandler",options:null,_logger:null,init:function f(h){this._parent(h);h=h||{};this.options=h;this._logger=a.getLogger(e);if(!h.domElement){this._logger.warn("No dom element given to listen key bidings on. Exiting");return}h.domElement.onkeydown=this.onKeyDown.bind(this)},onKeyDown:function d(i){i=i||window.event;if(!i){this._logger.warn("could not get event from keydown event");return}var h=i.keyCode,j=i.ctrlKey||i.metaKey;if(j&&67===h){this.options.onCtrlC?this.options.onCtrlC(i):this._defaultBehaviour(i)}else{if(j&&86===h){this.options.onCtrlV?this.options.onCtrlV(i):this._defaultBehaviour(i)}else{if(j&&88===h){this.options.onCtrlX?this.options.onCtrlX(i):this._defaultBehaviour(i)}else{if(46===h){this.options.onSuppr?this.options.onSuppr(i):this._defaultBehaviour(i)}else{if(8===h){this.options.onBackspace?this.options.onBackspace(i):this._defaultBehaviour(i)}else{if(j&&65===h){this.options.onCtrlA?this.options.onCtrlA(i):this._defaultBehaviour(i)}else{if(9===h){this.options.onTab?this.options.onTab(i):this._defaultBehaviour(i)}else{if(40===h){this.options.onDownArrow?this.options.onDownArrow(i):this._defaultBehaviour(i)}else{if(38===h){this.options.onUpArrow?this.options.onUpArrow(i):this._defaultBehaviour(i)}}}}}}}}}},_defaultBehaviour:function c(h){}});return e});