/*! Copyright 2017 Dassault Systèmes */
if(typeof reduxPromiseMiddleware!=="undefined"){define("DS/ReduxPromiseMiddleware/ReduxPromiseMiddleware",[],function(){return reduxPromiseMiddleware})}else{if(require.toUrl("DS/VENReduxPromiseMiddleware").indexOf("ReduxPromiseMiddleware-5.1.1")===-1){(function(){var a=(window.localStorage.ReduxDebug==="true")?require.toUrl("DS/ReduxPromiseMiddleware-5.1.1/redux-promise-middleware"):require.toUrl("DS/ReduxPromiseMiddleware-5.1.1/redux-promise-middleware.min");if(a.indexOf("?")>-1){a=a.substring(0,a.indexOf("?"))}require.config({paths:{"DS/VENReduxPromiseMiddleware":a},shim:{"DS/VENReduxPromiseMiddleware":{exports:"reduxPromiseMiddleware"}}})})()}}define("DS/ReduxPromiseMiddleware/ReduxPromiseMiddleware",["DS/VENReduxPromiseMiddleware"],function(a){return a});