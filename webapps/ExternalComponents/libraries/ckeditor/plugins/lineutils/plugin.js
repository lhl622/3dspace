"use strict";(function(){CKEDITOR.plugins.add("lineutils");CKEDITOR.LINEUTILS_BEFORE=1;CKEDITOR.LINEUTILS_AFTER=2;CKEDITOR.LINEUTILS_INSIDE=4;function a(o,p){CKEDITOR.tools.extend(this,{editor:o,editable:o.editable(),doc:o.document,win:o.window},p,true);this.inline=this.editable.isInline();if(!this.inline){this.frame=this.win.getFrame()}this.target=this[this.inline?"editable":"doc"]}a.prototype={start:function(w){var q=this,r=this.editor,v=this.doc,p,t,u,s;var o=CKEDITOR.tools.eventsBuffer(50,function(){if(r.readOnly||r.mode!="wysiwyg"){return}q.relations={};if(!(t=v.$.elementFromPoint(u,s))||!t.nodeType){return}p=new CKEDITOR.dom.element(t);q.traverseSearch(p);if(!isNaN(u+s)){q.pixelSearch(p,u,s)}w&&w(q.relations,u,s)});this.listener=this.editable.attachListener(this.target,"mousemove",function(x){u=x.data.$.clientX;s=x.data.$.clientY;o.input()});this.editable.attachListener(this.inline?this.editable:this.frame,"mouseout",function(){o.reset()})},stop:function(){if(this.listener){this.listener.removeListener()}},getRange:(function(){var o={};o[CKEDITOR.LINEUTILS_BEFORE]=CKEDITOR.POSITION_BEFORE_START;o[CKEDITOR.LINEUTILS_AFTER]=CKEDITOR.POSITION_AFTER_END;o[CKEDITOR.LINEUTILS_INSIDE]=CKEDITOR.POSITION_AFTER_START;return function(p){var q=this.editor.createRange();q.moveToPosition(this.relations[p.uid].element,o[p.type]);return q}})(),store:(function(){function o(s,r,p){var q=s.getUniqueId();if(q in p){p[q].type|=r}else{p[q]={element:s,type:r}}}return function(q,p){var r;if(d(p,CKEDITOR.LINEUTILS_AFTER)&&l(r=q.getNext())&&r.isVisible()){o(r,CKEDITOR.LINEUTILS_BEFORE,this.relations);p^=CKEDITOR.LINEUTILS_AFTER}if(d(p,CKEDITOR.LINEUTILS_INSIDE)&&l(r=q.getFirst())&&r.isVisible()){o(r,CKEDITOR.LINEUTILS_BEFORE,this.relations);p^=CKEDITOR.LINEUTILS_INSIDE}o(q,p,this.relations)}})(),traverseSearch:function(r){var o,q,p;do{p=r.$["data-cke-expando"];if(p&&p in this.relations){continue}if(r.equals(this.editable)){return}if(l(r)){for(o in this.lookups){if((q=this.lookups[o](r))){this.store(r,q)}}}}while(!b(r)&&(r=r.getParent()))},pixelSearch:(function(){var p=CKEDITOR.env.ie||CKEDITOR.env.webkit?function(q,r){return q.contains(r)}:function(q,r){return !!(q.compareDocumentPosition(r)&16)};function o(r,v,u,s,x){var w=u,q=0,t;while(x(w)){w+=s;if(++q==25){return}t=this.doc.$.elementFromPoint(v,w);if(!t){continue}else{if(t==r){q=0;continue}else{if(!p(r,t)){continue}}}q=0;if(l((t=new CKEDITOR.dom.element(t)))){return t}}}return function(s,q,v){var r=this.win.getViewPaneSize().height,u=o.call(this,s.$,q,v,-1,function(w){return w>0}),t=o.call(this,s.$,q,v,1,function(w){return w<r});if(u){this.traverseSearch(u);while(!u.getParent().equals(s)){u=u.getParent()}}if(t){this.traverseSearch(t);while(!t.getParent().equals(s)){t=t.getParent()}}while(u||t){if(u){u=u.getNext(l)}if(!u||u.equals(t)){break}this.traverseSearch(u);if(t){t=t.getPrevious(l)}if(!t||t.equals(u)){break}this.traverseSearch(t)}}})(),greedySearch:function(){this.relations={};var s=this.editable.getElementsByTag("*"),p=0,r,q,o;while((r=s.getItem(p++))){if(r.equals(this.editable)){continue}if(!r.hasAttribute("contenteditable")&&r.isReadOnly()){continue}if(l(r)&&r.isVisible()){for(o in this.lookups){if((q=this.lookups[o](r))){this.store(r,q)}}}}return this.relations}};function m(o,p){CKEDITOR.tools.extend(this,p,{editor:o},true)}m.prototype={locate:(function(){function o(p,r){var q=p.element[r===CKEDITOR.LINEUTILS_BEFORE?"getPrevious":"getNext"]();if(q&&l(q)){p.siblingRect=q.getClientRect();if(r==CKEDITOR.LINEUTILS_BEFORE){return(p.siblingRect.bottom+p.elementRect.top)/2}else{return(p.elementRect.bottom+p.siblingRect.top)/2}}else{if(r==CKEDITOR.LINEUTILS_BEFORE){return p.elementRect.top}else{return p.elementRect.bottom}}}return function(q){var p;this.locations={};for(var r in q){p=q[r];p.elementRect=p.element.getClientRect();if(d(p.type,CKEDITOR.LINEUTILS_BEFORE)){this.store(r,CKEDITOR.LINEUTILS_BEFORE,o(p,CKEDITOR.LINEUTILS_BEFORE))}if(d(p.type,CKEDITOR.LINEUTILS_AFTER)){this.store(r,CKEDITOR.LINEUTILS_AFTER,o(p,CKEDITOR.LINEUTILS_AFTER))}if(d(p.type,CKEDITOR.LINEUTILS_INSIDE)){this.store(r,CKEDITOR.LINEUTILS_INSIDE,(p.elementRect.top+p.elementRect.bottom)/2)}}return this.locations}})(),sort:(function(){var o,p,r,q;function s(v,t,u){return Math.abs(v-o[t][u])}return function(w,u){o=this.locations;p=[];for(var t in o){for(var v in o[t]){r=s(w,t,v);if(!p.length){p.push({uid:+t,type:v,dist:r})}else{for(q=0;q<p.length;q++){if(r<p[q].dist){p.splice(q,0,{uid:+t,type:v,dist:r});break}}if(q==p.length){p.push({uid:+t,type:v,dist:r})}}}}if(typeof u!="undefined"){return p.slice(0,u)}else{return p}}})(),store:function(o,p,q){if(!this.locations[o]){this.locations[o]={}}this.locations[o][p]=q}};var j={display:"block",width:"0px",height:"0px","border-color":"transparent","border-style":"solid",position:"absolute",top:"-6px"},e={height:"0px","border-top":"1px dashed red",position:"absolute","z-index":9999},f='<div data-cke-lineutils-line="1" class="cke_reset_all" style="{lineStyle}"><span style="{tipLeftStyle}">&nbsp;</span><span style="{tipRightStyle}">&nbsp;</span></div>';function k(r,t){var p=r.editable();CKEDITOR.tools.extend(this,{editor:r,editable:p,inline:p.isInline(),doc:r.document,win:r.window,container:CKEDITOR.document.getBody(),winTop:CKEDITOR.document.getWindow()},t,true);this.hidden={};this.visible={};if(!this.inline){this.frame=this.win.getFrame()}this.queryViewport();var s=CKEDITOR.tools.bind(this.queryViewport,this),o=CKEDITOR.tools.bind(this.hideVisible,this),q=CKEDITOR.tools.bind(this.removeAll,this);p.attachListener(this.winTop,"resize",s);p.attachListener(this.winTop,"scroll",s);p.attachListener(this.winTop,"resize",o);p.attachListener(this.win,"scroll",o);p.attachListener(this.inline?p:this.frame,"mouseout",function(v){var u=v.data.$.clientX,w=v.data.$.clientY;this.queryViewport();if(u<=this.rect.left||u>=this.rect.right||w<=this.rect.top||w>=this.rect.bottom){this.hideVisible()}if(u<=0||u>=this.winTopPane.width||w<=0||w>=this.winTopPane.height){this.hideVisible()}},this);p.attachListener(r,"resize",s);p.attachListener(r,"mode",q);r.on("destroy",q);this.lineTpl=new CKEDITOR.template(f).output({lineStyle:CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({},e,this.lineStyle,true)),tipLeftStyle:CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({},j,{left:"0px","border-left-color":"red","border-width":"6px 0 6px 6px"},this.tipCss,this.tipLeftStyle,true)),tipRightStyle:CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({},j,{right:"0px","border-right-color":"red","border-width":"6px 6px 6px 0"},this.tipCss,this.tipRightStyle,true))})}k.prototype={removeAll:function(){var o;for(o in this.hidden){this.hidden[o].remove();delete this.hidden[o]}for(o in this.visible){this.visible[o].remove();delete this.visible[o]}},hideLine:function(o){var p=o.getUniqueId();o.hide();this.hidden[p]=o;delete this.visible[p]},showLine:function(o){var p=o.getUniqueId();o.show();this.visible[p]=o;delete this.hidden[p]},hideVisible:function(){for(var o in this.visible){this.hideLine(this.visible[o])}},placeLine:function(q,s){var r,p,o;if(!(r=this.getStyle(q.uid,q.type))){return}for(o in this.visible){if(this.visible[o].getCustomData("hash")!==this.hash){p=this.visible[o];break}}if(!p){for(o in this.hidden){if(this.hidden[o].getCustomData("hash")!==this.hash){this.showLine((p=this.hidden[o]));break}}}if(!p){this.showLine((p=this.addLine()))}p.setCustomData("hash",this.hash);this.visible[p.getUniqueId()]=p;p.setStyles(r);s&&s(p)},getStyle:function(p,s){var o=this.relations[p],u=this.locations[p][s],t={},r;if(o.siblingRect){t.width=Math.max(o.siblingRect.width,o.elementRect.width)}else{t.width=o.elementRect.width}if(this.inline){t.top=u+this.winTopScroll.y-this.rect.relativeY}else{t.top=this.rect.top+this.winTopScroll.y+u}if(t.top-this.winTopScroll.y<this.rect.top||t.top-this.winTopScroll.y>this.rect.bottom){return false}if(this.inline){t.left=o.elementRect.left-this.rect.relativeX}else{if(o.elementRect.left>0){t.left=this.rect.left+o.elementRect.left}else{t.width+=o.elementRect.left;t.left=this.rect.left}if((r=t.left+t.width-(this.rect.left+this.winPane.width))>0){t.width-=r}}t.left+=this.winTopScroll.x;for(var q in t){t[q]=CKEDITOR.tools.cssLength(t[q])}return t},addLine:function(){var o=CKEDITOR.dom.element.createFromHtml(this.lineTpl);o.appendTo(this.container);return o},prepare:function(p,o){this.relations=p;this.locations=o;this.hash=Math.random()},cleanup:function(){var p;for(var o in this.visible){p=this.visible[o];if(p.getCustomData("hash")!==this.hash){this.hideLine(p)}}},queryViewport:function(){this.winPane=this.win.getViewPaneSize();this.winTopScroll=this.winTop.getScrollPosition();this.winTopPane=this.winTop.getViewPaneSize();this.rect=this.getClientRect(this.inline?this.editable:this.frame)},getClientRect:function(q){var r=q.getClientRect(),o=this.container.getDocumentPosition(),p=this.container.getComputedStyle("position");r.relativeX=r.relativeY=0;if(p!="static"){r.relativeY=o.y;r.relativeX=o.x;r.top-=r.relativeY;r.bottom-=r.relativeY;r.left-=r.relativeX;r.right-=r.relativeX}return r}};function d(p,o){return p&o}var i={left:1,right:1,center:1},c={absolute:1,fixed:1};function g(o){return o&&o.type==CKEDITOR.NODE_ELEMENT}function h(o){return !!(i[o.getComputedStyle("float")]||i[o.getAttribute("align")])}function n(o){return !!c[o.getComputedStyle("position")]}function b(o){return g(o)&&o.getAttribute("contenteditable")=="true"}function l(o){return g(o)&&!h(o)&&!n(o)}CKEDITOR.plugins.lineutils={finder:a,locator:m,liner:k}})();