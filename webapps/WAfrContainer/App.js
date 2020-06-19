define("DS/WAfrContainer/App",["UWA/Core","UWA/Class"],function(c,a){var b=a.extend({defaultOptions:{id:null,title:null,brand:null,appConfig:{afrVersion:"0.1",afrCode:null,afrFamily:null,afrTransitionsFrom:{},afrTransitionsTo:{},afrTransitionsFromFamily:{},afrTransitionsToFamily:{}}},disposeOptions:{disposeFrameWindow:true},init:function(d){d=d||{};this.options=c.extend(c.clone(this.defaultOptions),d);if(!this.options.id){this.options.id=this.options.appConfig.appId||this.options.appConfig.afrAppId;if(this.options.appConfig.appId){delete this.options.appConfig.appId}if(this.options.appConfig.afrAppId){delete this.options.appConfig.afrAppId}}if(!this.options.title){this.options.title=this.options.appConfig.title;if(this.options.appConfig.title){delete this.options.appConfig.title}}if(!this.options.brand){this.options.brand=this.options.appConfig.brand;if(this.options.appConfig.brand){delete this.options.appConfig.brand}}this._parent(this.options);this._frmWindow=undefined;this._disposeCalled=false;this._executionContext=undefined},getIdCard:function(){return this.options.appConfig},getTransitionFrom:function(d){return this.options.appConfig.afrTransitionsFrom?this.options.appConfig.afrTransitionsFrom[d]:null},getTransitionFromFamily:function(d){return this.options.appConfig.afrTransitionsFromFamily?this.options.appConfig.afrTransitionsFromFamily[d]:null},getExecutionContext:function(){return this._executionContext},getFrameWindow:function(){return this._frmWindow},getId:function(){return this.options.id},getTitle:function(){return this.options.title},getBrand:function(){return this.options.brand},getFamily:function(){return this.options.appConfig.afrFamily},onWillEnter:function(d){return c.Class.Promise.resolve()},onWillLeave:function(d){return c.Class.Promise.resolve()},setUp:function(d){if(d.done){d.done()}},isDisposeCalled:function(){return this._disposeCalled},dispose:function(d){var e=c.extend(c.clone(this.disposeOptions),d);if(e.disposeFrameWindow){if(this._frmWindow){this._frmWindow.dispose();this._frmWindow=undefined}}this._disposeCalled=true},getContainer:function(){return this._container},setContainer:function(d){if(this._container){this._container.removeEvent("onDestroy");this._container.removeEvent("onRefresh")}this._container=d;if(this._container){this._container.addEvent("onDestroy",this.onContainerDestroy.bind(this));this._container.addEvent("onRefresh",this.onContainerRefresh.bind(this))}},onContainerDestroy:function(d){this.dispose()},onContainerRefresh:function(d){}});b.inherits=function(d){d.prototype=Object.create(b.prototype,{constructor:{value:d,enumerable:false}})};return b});