/*!  Copyright 2015 Dassault Systemes. All rights reserved. */
(function(a){a.SPClientstorage=Polymer({is:"sp-clientstorage",properties:{namespace:{type:String,value:"sma",notify:true}},getItem:function(b){var c;b=this.namespace+b;c=localStorage.getItem(b);if(c){return JSON.parse(localStorage.getItem(b))}},removeItem:function(b){b=this.namespace+b;localStorage.removeItem(b)},setItem:function(d,e){var f=this.namespace+d;try{var b=JSON.stringify(e);localStorage.setItem(f,b)}catch(c){if(a.console&&a.console.warn){a.console.warn("Local storage failed with error: "+c.name+"\n",c,this)}return false}return true}})}(this));