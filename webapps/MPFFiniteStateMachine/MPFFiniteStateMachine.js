define("DS/MPFFiniteStateMachine/FiniteStateMachine",["UWA/Core","UWA/Class"],function(c,a){var b;b=a.extend({init:function(d){if(!(c.is(d.states,"array"))){throw new Error("states is required and must be an array")}if(!(c.is(d.state))){throw new Error("state is required")}if(!(c.is(d.transitions,"array"))){throw new Error("transitions must be an array")}this.states=d.states.slice();this.state=d.state;if(!(this._checkTransitionDefinition(d.transitions))){throw new Error("transitions definitions is not valid")}this.transitions=this._parseTransitionDefinitions(d.transitions)},getState:function(){return this.state},changeState:function(e){var d;d=false;if(this._checkTransition(this.state,e)){this.state=e;d=true}return d},_hasState:function(d){return this.states.indexOf(d)>=0},_checkTransition:function(g,e){var d;var f;d=false;if(this._hasState(g)&&this._hasState(e)){f=this.transitions[g];d=c.is(f,"array")&&f.indexOf(e)>=0}return d},_checkTransitionDefinition:function(f){var e=this;var d;d=false;if(c.is(f,"array")){d=f.reduce(function(g,h){return g&&e._hasState(h.from)&&e._hasState(h.to)},true)}return d},_parseTransitionDefinitions:function(e){var d;d={};e.forEach(function(f){if(c.is(d[f.from],"array")){d[f.from].push(f.to)}else{d[f.from]=[f.to]}});return d}});return b});