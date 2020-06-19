define("DS/ErrorWidget/ErrorWidget",["UWA/Controls/Abstract","UWA/Json","DS/WidgetServices/WidgetServices","DS/UIKIT/Input/Button","DS/UIKIT/Alert","css!DS/ErrorWidget/ErrorWidget.css","i18n!DS/ErrorWidget/assets/nls/langEW"],function(e,i,b,f,d,g,c){var a="ErrorWidget";var h=e.extend({defaultOptions:{className:""},init:function(k,l,j){var m=this;this._parent(j);m.initUI(k,l)},initUI:function(j,k){var l=this;l.savedDimension=null;l.widgetPere=k;this.notification=null},instantiateNotif:function(){var j=this;if(this.notification==null){this.notification=new d({className:"ErrorNotification "+j.options.className,visible:true,hideDelay:5000,autoHide:true,events:{onClick:function(l,k){this.remove(k)}}});if(this.widgetPere){this.notification.inject(this.widgetPere,"top")}}},addSuccess:function(l,j){this.instantiateNotif();var k=false;if(j!=null&&j!=""){k=this.changeMessage(l,j)}else{j=""}if(k==false){this.notification.add({message:l,className:"success "+j})}return{eventID:"success",msg:l}},addInfo:function(k,j){this.instantiateNotif();var l=false;if(j!=null&&j!=""){l=this.changeMessage(k,j)}else{j=""}if(l==false){this.notification.add({message:k,className:"primary "+j})}return{eventID:"info",msg:k}},addError:function(j,k){this.instantiateNotif();var l=false;if(k!=null&&k!=""){l=this.changeMessage(j,k)}else{k=""}if(l==false){this.notification.add({message:j,className:"error "+k})}return{eventID:"error",msg:j}},addWarning:function(j,k){this.instantiateNotif();var l=false;if(k!=null&&k!=""){l=this.changeMessage(j,k)}else{k=""}if(l==false){this.notification.add({message:j,className:"warning "+k})}return{eventID:"warning",msg:j}},changeMessage:function(j,l){var m=this;var n=false;var k=this.notification.getMessages();k.forEach(function(q){if(q.hasClassName(l)){n=true;var o=false;var r=q.childNodes;for(var p=r.length-1;p>=0;p--){if(r[p].nodeType==Node.TEXT_NODE){if(o===false){o=true;r[p].nodeValue=j}else{q.removeChild(r[p])}}}}});return n},addJSONError:function(j,m){var l="";var k="error";if(i.isJson(j)||typeof j=="object"){var n=j;if(typeof j!="object"){n=i.decode(j)}l+=this.getMessageErrorFromCode(n);if(n.hasOwnProperty("type")){k=n.type}if(!m&&n.hasOwnProperty("customClass")){m=n.customClass}}else{l=j}if(k=="warning"){return this.addWarning(l,m)}else{return this.addError(l,m)}},getMessageErrorFromCode:function(j){var l="";if(j.hasOwnProperty("message")){l=j.message;var k=j.code+"";switch(k){case"502":l=c.get("Server issue");break;case"403":l=c.get("Forbidden access");break}}else{l=j}return l},displayJSONError:function(j,k){return this.addJSONError(j,k)},clearAllMessages:function(){if(this.notification){this.notification.destroy()}this.notification=null}});return h});