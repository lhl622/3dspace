define("DS/xPflRouter5/router.utils",["DS/Router5/js/Router5","DS/Router5/js/Router5BrowserPlugin","DS/Router5/js/Router5ListenersPlugin","DS/Router5/js/Router5Helpers"],function(d,a,b,c){return{createRouter:function(e,h,i,g){var f=d.createRouter(e,h);if(i){f.usePlugin(b())}if(g){}return f},listenToRouterStateChanges:function(e){e.addListener(function(g,h){var f=c.transitionPath(g,h);f.toDeactivate.forEach(function(j){if(e.routerMethods[j]!==undefined){var i=e.routerMethods[j].deactivate;if(i!==undefined){i(g,h)}}});f.toActivate.forEach(function(i){if(e.routerMethods[i]!==undefined){var j=e.routerMethods[i].activate;if(j!==undefined){j(g,h)}}})})}}});define("DS/xPflRouter5/xPflRouter",["UWA/Class","DS/xPflRouter5/router.utils"],function(a,b){var c=a.singleton({initialize:function(d,f){if(d==undefined||d==""){d="home"}if(f==undefined||f==""){f="/home"}var e=[{name:d,path:f}];this._router=b.createRouter(e,{defaultRoute:d,defaultParams:{},trailingSlash:false,useTrailingSlash:undefined,autoCleanUp:false,strictQueryParams:true,allowNotFound:false},true,true);b.listenToRouterStateChanges(this._router)},addRoute:function(d){this._router.add(d)},addRouteMethods:function(e,d){if(!this._router.routerMethods){this._router.routerMethods={}}if(UWA.is(d,"object")){this._router.routerMethods[e]=d}},start:function(d){this._router.start(d)},navigate:function(){this._router.navigate.apply(this._router,arguments)},getRouter:function(){return this._router},setDependency:function(d,e){this._router.setDependency(d,e)},getDependency:function(d){return this._router.getDependencies()[d]}});return c});