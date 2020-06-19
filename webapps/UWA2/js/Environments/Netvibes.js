/*!
  Script: Netvibes.js

    This file is part of UWA JS Runtime.

  About: License

    Copyright 2006-2012 Netvibes, a Dassault Systèmes company.
    All rights reserved.
*/
define("UWA/Environments/Netvibes",["UWA/Core","UWA/Utils","UWA/Environment","UWA/Event","UWA/Element","UWA/Utils/Client"],function(g,d,c,a,b,f){var e=c.extend({name:"netvibes",netvibes:true,features:{"drag and compare":{version:1},feedreader:{version:1}},init:function(k,i){this.obj=k;this._parent(i);var h=this;this.html={edit:k.elm_editContent,body:k.elm_moduleContent,icon:k.elm_ico,header:k.elm_moduleHeader,menus:k.elm_menus,wrapper:k.elm_module,module:k.elm_module,moduleFrame:k.elm_moduleFrame};var j=k.dataObj.data._netvibes_cachedModuleHeight;if(j){this.html.body.setStyle("min-height",j+"px");this.setDelayed("removeForcedHeight",function(){h.html.body.setStyle("min-height","");k.sendContent("onResize")},10*1000)}},destroy:function(){this.obj.remove(true);this.obj=null;this._parent()},filterExternalResources:function(j,k){var i,h;if(j==="script"){h=/\b(highcharts|app\/socialpack|app\.js\.php|handlebars)\b/i;i=function(l){return !h.test(l)}}else{if(j==="style"&&App.use_compressed_js&&!App.config.debug["uncompressed-assets"]){h=/\/(\w+)\/\1\.css/i;i=function(l){return l.indexOf(App.urls.startpage)!==0||!h.test(l)}}}return i?k.filter(i):k},onRegisterWidget:function(){this._parent();var i=this.obj,h=this.widget;i.widget=h;if(i.dataObj.id!==undefined){h.id=i.dataObj.id}h.pageId=App.Page.id||undefined;if(window.App&&App.lang){h.lang=App.lang}if(window.User&&User.locale){h.locale=User.locale}else{if(window.App&&App.locale){h.locale=App.locale}}if(window.App&&App.dirRTL){h.dir="rtl"}h.isNew=i.isNew();h.readOnly=i.isReadOnly();h.userId=User.id;i.dataObj.extendSearch=0;i.refreshMode=true},registerMenus:function(){if(this.widget.readOnly){return}this.widget.setMenu({name:"close",icon:"delete",help:g.i18n("Close"),visible:function(){return !this.obj.isSticky()&&!this.obj.previewMode}.bind(this)});this.widget.setMenu({name:"unstick",icon:"pin-point",visible:function(){return this.obj.isSticky()}.bind(this)});this.widget.setMenu({name:"options",icon:"options",help:g.i18n("Edit")});this.widget.setMenu({name:"options/preferences",icon:"cogwheel",label:g.i18n("Settings")});this.widget.setMenu({name:"options/display",icon:"single-window",label:g.i18n("Display")});this.widget.setMenu({name:"options/share",icon:"curvy-next",label:g.i18n("Share"),visible:function(){return this.obj.hasShare()}.bind(this)});this.widget.setMenu({name:"options/refresh",icon:"refresh",label:g.i18n("Refresh")});if(!this.obj.previewMode){this.widget.setMenu({name:"options/clone",icon:"double-window",label:g.i18n("Duplicate")})}if(this.supportsPotion()){this.widget.setMenu({name:"options/potion",icon:"potion",label:g.i18n("Potion"),wizard:"Potion",visible:function(){return Cookie.read("potionAvailable")}})}this.widget.setMenu({name:"options/edit",icon:"edit",label:g.i18n("Edit"),visible:function(){return this.obj.isUserOwner()}.bind(this)})},onUpdateMenu:function(k){var j=this.html,h,i;this._parent(k);if(j.header){h=j.header.getElement(".counter");i=h&&h.getStyle("display",true)!=="none";j.header.set("data-menus-items",j.menus.childNodes.length+(i?2:0))}},onMenuExecute:function(h){if(this.widget.getView()!=="windowed"){this.widget.requestView("windowed")}if(h.onExecute){this._parent(h);return}switch(h.name){case"close":this.obj.close();break;case"unstick":this.obj.unstick();break;case"options/preferences":this.obj.expand(false);this.obj.toggleEdit();break;case"options/share":this.obj.share();break;case"options/refresh":this.obj.sendContent("onRefresh");break;case"options/display":this.obj.expand(false);this.obj.toggleDisplay(true);break;case"options/clone":this.obj.clone();break;case"options/edit":this.widget.openURL(this.obj.getEditUrl());break;case"options/potion":this.widget.dispatchEvent("launchWizard",[h]);break;default:break}},onOpenURL:function(i){var h,j,k,l=d.parseUrl(i);if(l.subprotocol==="feed"){k=+l.anchor||0;j=App.FeedWidgetManager.getCurrentDisplayedFeedObj(this.widget.id);if(j){this.openFeedReader(j,k,this.widget.environment.module)}h=false}else{h=this._parent(i)}return h},onUpdateTitle:function(h){this.obj.setTitle(h);this._parent(h)},onUpdateIcon:function(h){if(h.lastIndexOf(g.Data.proxies.icon,0)===0){h=d.parseQuery(d.parseUrl(h).query).url;if(d.parseUrl(h).domain!==d.parseUrl(App.urls.storage).domain){h=App.getFaviconUrl(h)}}this.widget.icon=h;this.obj.setIcon(h);this._parent(h)},onUpdateCounter:function(i,h){this.obj.setCounter(i,h);this._parent(i,h)},onUpdatePreferences:function(h){this.obj.options.editable=h.some(function(i){return i.type!=="hidden"})},onEdit:function(){this.obj.toggleEdit(true);this._parent()},onResize:function(){if(!this.hasDelayed("removeForcedHeight")&&this.widget.getView().type==="windowed"){var h=this.widget.elements.body,i=h.getDimensions().innerHeight;if(i>0){this.widget.setValue("_netvibes_cachedModuleHeight",i)}}},endEdit:function(){this.obj.toggleEdit(false);this._parent()},getAllData:function(){var h={};g.extend(h,this.obj.getData());delete h.moduleUrl;return h},getData:function(h){return this.obj.getData()[h]},setData:function(h,i){this.obj.getData()[h]=i;this.saveDatas()},deleteData:function(h){var i=this.obj.getData();if(i.hasOwnProperty(h)){delete i[h];this.saveDatas()}return true},saveDatas:function(){this.obj.save()},isSecure:function(){return this.obj.dataObj.secure},resetUnreadCount:function(){this.widget.setUnreadCount(0);this.widget.dispatchEvent("onResetUnreadCount")},addStar:function(h){switch(this.obj.dataObj.moduleName){case"RssReader":h.srcType="feed";h.srcTitle=this.obj.dataObj.title;h.srcUrl=this.obj.dataObj.feedUrl;break;case"UWA":h.srcType="uwa";h.srcTitle=this.obj.dataObj.title;h.srcUrl=this.obj.dataObj.data.moduleUrl;break;case"MultipleFeeds":if(this.obj.dataObj.data.url){h.srcType="uwa";h.srcTitle=this.obj.dataObj.title;h.srcUrl="http://"+NV_HOST+"/modules/multipleFeeds/multipleFeeds.php?provider=custom&url="+g.Utils.encodeUrl(this.obj.dataObj.data.url)}else{h.srcType="multiplefeeds";h.srcTitle=this.obj.dataObj.title;h.srcUrl=this.obj.dataObj.data.provider}break;default:h.srcType="uwa";h.srcModule=this.obj.dataObj.moduleName;h.srcTitle=this.obj.dataObj.title;break}h.moduleId=this.obj.dataObj.id;if(this.obj.dataObj.widgetId){h.widgetId=this.obj.dataObj.widgetId}App.Share.show(h)},openFeedReader:function(i,j,k){var h=App.FeedReader;if(h){h.display({feedObj:i,contentObj:k,selectedItemIndex:j})}return !!h},updateFeedReader:function(i){var h=App.FeedReader;if(h&&h.isOpen()){h.notifyUpdates(i)}return !!h},mutate:function(m,i){var j,h,k=this.obj,l=App.Utils.isAbsoluteURL(m);h={moduleName:l?"UWA":m,data:i||{}};if(l){h.data.moduleUrl=m}if(k.previewMode){j=Module.factory(h,{preview:true});j.inject(k.elm_module.parentNode).load();k.elm_module.store("widget",j);k.remove(false)}else{App.Panel.AddContent.addModule(h,{beforeModuleId:k.dataObj.id},function(n){if(!n){k.remove(true)}})}},getAnalytics:function(){return this.obj.getAnalytics()},supportsPotion:function(){var h=["socialpack_compare","socialpack_analytics","facebooksearchtrends","facebook","twitter","rssreader","multiplefeeds","todolist","weather","postit"];return h.contains(this.obj.dataObj.moduleName.toLowerCase())&&Cookie.read("potionAvailable")},launchWizard:function(i){var h={type:"maximized",chrome:false};if(i&&i.wizard){h.wizard=i.wizard}this.widget.requestView(h)}});e.prototype.views.maximized=c.AbstractView.extend({isChromeLess:function(){return this.event.chrome===false},isNotFullHeight:function(){return this.event.fullHeight===false},_enter:function(h){var m,l=this,k=this.environment.html.wrapper;if(!this.events){this.events={click:function(n){if(a.getElement(n)===k){l.leave()}}}}function j(){k.toggleClassName("maximized-view",h).toggleClassName("chromeless-view",h&&l.isChromeLess()).toggleClassName("chrome-view",h&&!l.isChromeLess()).toggleClassName("full-height",h&&!l.isNotFullHeight());l._active=h}function i(){j();clearTimeout(m);m=null;k.removeEvent("transitionEnd",i).setOpacity(1);if(!l.isChromeLess()){k[h?"addEvents":"removeEvents"](l.events)}l.dispatchEvent(h?"onEnter":"onLeave")}if(f.Features.transitionsCSS&&(!h||this.event.previous)){k.addEvent("transitionEnd",i).setOpacity(0);m=setTimeout(i,400)}else{i()}},enter:function(){g.$("body").addClass("nv-module-overflow");this._enter(true)},leave:function(){this._enter(false)},isSingle:function(){return true},destroy:function(){g.$("body").removeClass("nv-module-overflow");this._parent()}});e.prototype.views.collapsed=c.AbstractView.extend({_toggle:function(j){var i=!j?g.i18n("Collapse"):g.i18n("Expand"),h=this.environment.obj;h.elm_module.toggleClassName("collapsed-view",j);h.elm_showHide.getElement("img").set({"class":"actions-window-"+(!j?"collapse":"expand"),alt:i,title:i});this.dispatchEvent(j?"onEnter":"onLeave")},enter:function(){this._toggle(true)},leave:function(){this._toggle(false)}});return g.namespace("Environments/Netvibes",e,g)});