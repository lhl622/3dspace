/*!  Copyright 2016 Dassault Systemes. All rights reserved. */
(function(c){var d=c.DS;var a=null,b=null;a=function(f){var h="",g,e;if(f){g=Math.log(f)/Math.log(1024)|0;if(g>0){e=(f/Math.pow(1024,g)).toFixed(2)}else{e=f}h=e+" "+(g===0?"bytes":"KMGTPEZY"[g-1]+"B")}return h};b=function(g){var f=g,k,m,l,j,h;if(g&&g.length>0){k=g.indexOf("T");if(k>0){f=g.substring(0,k+1);m=g.substring(k+1);l=m.indexOf("-");if(l<0){l=m.indexOf("+")}if(l>=0){j=m.substring(l+1);if(j.indexOf(":")<0){for(h=j.length;h<4;h++){j+="0"}j=j.substring(0,2)+":"+j.substring(2)}m=m.substring(0,l+1)+j}f+=m}var e=new Date();e.setTime(Date.parse(f));return e.toLocaleString()}else{return""}};d.SMAProcADUI=d.SMAProcADUI||{};d.SMAProcADUI.FormatUtilities={formatFileSize:function(){return a.apply(this,arguments)},formatDate:function(){return b.apply(this,arguments)}}}(this));