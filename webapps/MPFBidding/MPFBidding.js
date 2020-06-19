define("DS/MPFBidding/TimelineUser",["UWA/Core","UWA/Class/View","DS/MPFCartModel/TimelineItemModel","DS/MPFView/InitialsDot","DS/MPFError/BadArgumentError"],function(f,e,b,d,a){var c;c=e.extend({className:"mpf-timeline-user",setup:function(g){if(!f.is(g.name,"string")){throw new a("options.name must be a string")}if(!f.is(g.date)){throw new a("options.date must be defined")}this.name=g.name;this.date=g.date;this.logo=g.logo;this.logoContainer=this._createLogo();this.captionContainer=this._createCaptionContainer()},render:function(){this.container.setContent([this.logoContainer,this.captionContainer]);return this},_createLogo:function(){return new d({image:this.logo,title:this.name})},_createCaptionContainer:function(){var h=f.createElement("div",{"class":"name-container",html:this.name});var g=f.createElement("div",{"class":"date-container",html:this.date.toLocaleDateString()});var j=f.createElement("div",{"class":"time-container",html:this.date.toLocaleTimeString()});var i=f.createElement("div",{"class":"caption-container",html:[h,g,j]});return i},destroy:function(){this._parent();this.captionContainer=null;this.logoContainer=null;this.container=null}});return c});define("DS/MPFBidding/TimelineDocumentLink",["UWA/Core","UWA/Class/View"],function(c,b){var a;a=b.extend({className:"mpf-timeline-document-link",domEvents:{click:"_openDocument"},setup:function(d){this.name=d.name;this.docUrl=d.docUrl;this.cartItemDocFactory=d.cartItemDocFactory;this.documentId=d.documentId},render:function(){this.container.setContent([{tag:"span","class":"fonticon fonticon-doc"},{tag:"span",text:this.name}]);return this},destroy:function(){this.cartItemDocFactory=null;this._parent();this.container=null},_openDocument:function(){var e=this;if(c.is(this.docUrl,"string")){window.open(this.docUrl,"_blank")}else{if(c.is(this.cartItemDocFactory,"object")&&c.is(this.documentId,"string")){var d=this.cartItemDocFactory.createModel();d.set("id",this.documentId);d.fetchPromise().then(function(f){if(f.getDocUrl()){e.docUrl=f.getDocUrl();window.open(e.docUrl,"_blank")}})["catch"](function(f){e._dispatchOpeningDocFailure(f)})}else{this._dispatchOpeningDocFailure("cartItemDocFactory and docUrl are not defined -> document URL unknown")}}},_dispatchOpeningDocFailure:function(d){console.error("Opening document failed");console.error(d);this.dispatchEvent("openingDocFailed",{error:d,document:document})}});return a});define("DS/MPFBidding/TimelineMessage",["UWA/Core","UWA/Class/View","DS/UIKIT/Alert","DS/MPFBidding/TimelineDocumentLink","DS/MPFCartModel/TimelineItemModel","DS/MPFServices/ObjectService","DS/MPFError/BadArgumentError","i18n!DS/MPFBidding/assets/nls/Bidding"],function(b,a,d,e,f,g,h,i){var c;c=a.extend({className:"mpf-timeline-message",setup:function(j){g.requiredOfPrototype(j.timelineItem,f,"options.timelineItem must be a TimelinItemModel");this.timelineItem=j.timelineItem;this.cartItemDocFactory=j.cartItemDocFactory;this.title=j.title;this.message=this.timelineItem.getMessage();this.alert=this._createAlert();this.docEntries=[]},render:function(){this.container.setContent([this.alert,this._createTitleContainer(),this._createMessageContainer()]);return this},destroy:function(){for(var j=0;j<this.docEntries.length;j++){this.docEntries[j].destroy()}this.stopListening();this.timelineItem=null;this._parent();this.container=null},_createAlert:function(){return new d({visible:true,autoHide:true,hideDelay:3000})},_createTitleContainer:function(){var j=b.is(this.title)?"title-container":"title-container hidden";return b.createElement("div",{"class":j,html:this.title})},_createMessageContainer:function(){return b.createElement("div",{"class":"message-container",html:[this.message.message,this._createDocumentContainer()]})},_createDocumentContainer:function(){this.docEntries=[];var l=this.message.documentIDs;var k=b.is(l,"object")?Object.keys(l):[];for(var j=0;j<k.length;j++){this.docEntries.push(new e({documentId:k[j],name:l[k[j]],cartItemDocFactory:this.cartItemDocFactory}).render());this.listenTo(this.docEntries[j],"openingDocFailed",this._onOpeningDocFailed.bind(this))}return b.createElement("div",{"class":"document-container",html:this.docEntries})},_onOpeningDocFailed:function(){this.alert.add({className:"error",message:i.get("openingDocumentFailed")})}});return c});define("DS/MPFBidding/TimelineEntry",["UWA/Core","UWA/Class/View","DS/MPFCartModel/TimelineItemModel","DS/MPFServices/ObjectService","DS/MPFBidding/TimelineUser","DS/MPFBidding/TimelineMessage","DS/MPFError/BadArgumentError","css!DS/MPFBidding/MPFBidding"],function(h,g,e,d,f,b,a){var c=g.extend({className:"mpf-timeline-entry",setup:function(i){d.requiredOfPrototype(i.timelineItem,e,"options.timelineItem should be a TimelineItemModel");this.timelineItem=i.timelineItem;this.cartItemDocFactory=i.cartItemDocFactory;if(h.is(i.title)){this.title=i.title}if(h.is(i.additionalClassName,"string")){this.container.addClassName(i.additionalClassName)}this.timelineMessage=this._createTimelineMessage();this.timelineUser=this._createTimelineUser()},render:function(){this.container.setContent([this.timelineMessage.render(),this.timelineUser.render()]);return this},destroy:function(){this.timelineItem=null;this.timelineMessage.destroy();this.timelineUser.destroy();this.timelineMessage=null;this.timelineUser=null;this._parent();this.container=null},_createTimelineMessage:function(){return new b({title:this.title,timelineItem:this.timelineItem,cartItemDocFactory:this.cartItemDocFactory})},_createTimelineUser:function(){var j=this.timelineItem.get("message");var i=h.is(j.author.shopName,"string")?j.author.shopName:j.author.firstName+" "+j.author.lastName;return new f({name:i,date:j.creation,logo:j.author.logo})}});return c});define("DS/MPFBidding/TimelineContainer",["UWA/Core","UWA/Class/View","DS/MPFServices/ObjectService","DS/MPFCartModel/TimelineItemCollection","DS/MPFBidding/TimelineEntry","DS/MPFError/BadArgumentError","DS/MPFCartModel/CartModel","DS/MPFCartModel/CartItemModel","i18n!DS/MPFBidding/assets/nls/Bidding"],function(c,a,g,e,b,i,d,f,j){var h=a.extend({className:"mpf-bidding-timeline-container",setup:function(k){g.requiredOfPrototype(k.timelineItems,e,"options.timelineItems must be a TimelineItemCollection");this.timelineItems=k.timelineItems;this.cartItemDocFactory=k.cartItemDocFactory;if(!c.is(k.currentUserId,"string")){throw new i("options.currentUserId must be a string")}else{this.currentUserId=k.currentUserId}this.rendered=false;this.listenTo(this.timelineItems,"onAnyEvent",this._onModelChange);this.uiItems=this._createUIItems()},render:function(){var l=[];for(var k=0;k<this.uiItems.length;k++){l.push(this.uiItems[k].render())}this.container.setContent(l);this.rendered=true;return this},destroy:function(){this.stopListening();for(var k=0;k<this.uiItems.length;k++){this.uiItems[k].destroy()}this.timelineItems=null;this._parent();this.uiItems=null;this.container=null},_onModelChange:function(){this.uiItems=this._createUIItems();if(this.rendered){this.render()}},_createUIItems:function(){var m=[];for(var l=0;l<this.timelineItems.length;l++){var n=this.timelineItems.at(l);var k="";if(this.currentUserId===n.get("message").author.id){k+="right"}var o=this._getEntryTitle(n);m.push(new b({timelineItem:n,additionalClassName:k,title:o,cartItemDocFactory:this.cartItemDocFactory}))}return m},_getEntryTitle:function(n){var m;var l;if(c.is(n.get("cartChanges"))&&n.get("cartChanges").version==="1.1"){switch(n.title){case"InvoiceUploaded":m=j.get("invoiceUploaded");l="fonticon-thumbs-up order-status-confirmed";break;case"PaymentReceived":m=j.get("paymentReceived");l="fonticon-thumbs-up order-status-confirmed";break;case"PendingPO":m=j.get("purchaseOrderPending");l="fonticon-clock order-status-pending";break;default:m=n.title;break}}else{var k=this._getStatusUpdate(n);switch(k){case f.STATUS.accepted:m=j.get("orderAccepted");l="fonticon-thumbs-up order-status-confirmed";break;case d.STATUS.pendingPayment:m=j.get("paymentInitiated");l="fonticon-credit-card order-status-confirmed";break;case d.STATUS.paymentComplete:case d.STATUS.paymentAccepted:case f.STATUS.pendingProcessing:m=j.get("orderConfirmed");l="fonticon-check order-status-confirmed";break;case d.STATUS.processing:m=j.get("orderProcessing");l="fonticon-clock order-status-updated";break;case f.STATUS.ready:m=j.get("orderPrinted");l="fonticon-forward order-status-confirmed";break;case f.STATUS.shipped:m=j.get("orderShipped");l="fonticon-envelope-open order-status-confirmed";break;case d.STATUS.delivered:m=j.get("orderDelivered");l="fonticon-home order-status-confirmed";break;case d.STATUS.cancelled:case f.STATUS.deleted:m=j.get("orderCancelled");l="fonticon-cup order-status-cancelled";break;default:return null}}if(c.is(m)){var o=c.createElement("div",{html:m});if(c.is(l)){c.createElement("span",{"class":"fonticon "+l+" order-status-icon"}).inject(o)}return o}else{return null}},_getStatusUpdate:function(m){var q=m.get("cartChanges");var p=q.updatedFields;if(!c.is(p)||p.length===0){return null}var s=Object.keys(p);var n=null;for(var o=0;o<s.length;o++){var k=s[o];var l=q[k];var r=p[k];if(c.is(l)&&c.is(l.type)){if((l.type.toUpperCase()==="MP_CART"||l.type==="MP3DP_PrintRequest")&&r.indexOf("currentState")>-1&&c.is(l.currentState)&&c.is(l.currentState.length>0)){n=l.currentState}else{if(l.type.toUpperCase()==="MP_CART"&&r.indexOf("paymentUrl")>-1&&c.is(l.paymentUrl)){n=f.STATUS.pendingPayment}}}}return n}});return h});