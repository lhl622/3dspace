define("UWA/Drivers/jQuery",["UWA/Core","UWA/Event","UWA/Internal/Deprecate","UWA/Function","UWA/String","UWA/Array","UWA/Date","UWA/Object","UWA/Utils","UWA/Class","UWA/Dispatcher","UWA/Utils/Client","UWA/Ajax","UWA/Json","UWA/Storage","UWA/Data","UWA/Element","UWA/Fx","UWA/Plugins/Abstract","UWA/Controls/Pager","UWA/Controls/Img","UWA/Controls/Form","UWA/Widget","UWA/Environment","UWA/Promise","UWA/Class/Promise"],function(d,a,b){d.merge(d,{driver:"jQuery",extendElement:function(e){if(e&&!e._isUwaExtended){if(e.nodeName==="#document"){d.merge(e,d.Element);b.warn("UWA.extendElement(document)")}else{d.extend(e,d.Element)}e._isUwaExtended=true}return e},createElement:function(f,e){return new d.Element(f,e)}});function c(){if(window.document){if(window.document.body){d.extendElement(window.document.body)}if(window.document.documentElement){d.extendElement(window.document.documentElement)}}}c();a.onDomReady(c);return jQuery});