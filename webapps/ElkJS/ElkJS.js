/*! Copyright 2016 Dassault Systèmes */
if(typeof ELK!=="undefined"){define("DS/VENElkJS",[],function(){return ELK})}else{if(require.toUrl("DS/VENElkJS").indexOf("elkjs-0.4.1")===-1){(function(){var a=require.toUrl("DS/elkjs-0.4.1/elk.bundled");if(a.indexOf("?")>-1){a=a.substring(0,a.indexOf("?"))}require.config({paths:{"DS/VENElkJS":a},shim:{"DS/VENElkJS":{exports:"ELK"}}})})()}}define("DS/ElkJS/ElkJS",["DS/VENElkJS"],function(a){return a});