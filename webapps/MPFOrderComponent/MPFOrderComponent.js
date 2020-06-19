define("DS/MPFOrderComponent/OrderConfirmationSectionCommand",["UWA/Class/View","DS/UIKIT/Input/Button"],function(c,b){var a;a=c.extend({className:"mpf-command",setup:function(d){d||(d={});this.icon=d.icon;this.iconOff=d.iconOff;this.label=d.label;this.labelOff=d.labelOff;this.state="OFF"},render:function(){var d=this;this.button=new b({value:this.label,icon:this.icon,className:"link",events:{onClick:function(){if(this.getContent().getElement(".fonticon").classList.contains("fonticon-"+d.icon)){this.setIcon(d.iconOff);this.setValue(d.labelOff);d.state="ON";d.dispatchEvent("commandOn")}else{this.setIcon(d.icon);this.setValue(d.label);d.state="OFF";d.dispatchEvent("commandOff")}}}});this.container.setContent(this.button);return this},isOn:function(){return this.state==="ON"},setOn:function(){this.state="ON";this.button.setIcon(this.iconOff);this.button.setValue(this.labelOff)},setOff:function(){this.state="OFF";this.button.setIcon(this.icon);this.button.setValue(this.label)},hide:function(){this.button.hide()},show:function(){this.button.show()}});return a});define("DS/MPFOrderComponent/OrderConfirmationPage",["UWA/Core","UWA/Class/View","UWA/Class/Promise","DS/MPFBuyer/BuyerType","DS/UIKIT/Mask","DS/MPFModalConfiguratorComponent/OrderPaymentMethodSection","DS/MPFModalConfiguratorComponent/OrderSummaryDetailsSection","DS/MPFModalConfiguratorComponent/BillingInformationSection","DS/MPFModalConfiguratorComponent/OrderAgreementsSection","DS/MPFModalConfiguratorComponent/SalesConditionsBuyerPaymentSection","DS/MPFModalConfiguratorComponent/RenewalSubscriptionSection","DS/MPFCartModel/CartPatchArray","DS/MPFCartModel/CartPatchOperation","DS/WebappsUtils/WebappsUtils","DS/MPFPersonModel/PersonModel","DS/MPFCartModel/CartModel","DS/MPFCartModel/CartItemCollection","DS/MPFModelFactory/CartFactory","DS/MPFModelFactory/CartItemFactory","DS/MPFAddressModel/AddressCollection","DS/MPFModelFactory/AddressFactory","DS/MPFTCContractModel/SoftwareAgreementModel","DS/MPFModelFactory/TCContractFactory","DS/MPFPaymentCardTokenModel/PaymentCardTokenCollection","DS/MPFModelFactory/VirtualIbanFactory","DS/MPFCompanyModel/CompanyModel","DS/MPFShopModel/ShopModel","DS/MPFModelFactory/TCDocumentFactory","DS/MPFCountryModel/CountryCollection","DS/MPFCartQuoteModel/CartQuoteModel","DS/MPFCartQuoteComponent/CartQuoteDownloadLink","DS/MPFPspModel/PspModel","DS/MPFError/BadArgumentError","DS/MPFServices/ObjectService","DS/MPFFiniteStateMachine/FiniteStateMachine","i18n!DS/MPFOrderComponent/assets/nls/OrderComponent"],function(A,K,x,l,B,d,z,v,F,m,i,G,a,H,k,f,J,r,e,y,w,n,E,s,c,b,o,u,I,t,q,g,D,C,j,L){var p;var h={};h.PATCHING_CART="patchingCart";h.NEW_ADDRESS_FORM="newAddressForm";h.PAGE_DISPLAYED="pageDisplayed";p=K.extend({className:"mpf-order-confirmation-page",domEvents:{"click .mpf-command":"_resizePage"},setup:function(M){M||(M={});this._checkPrototypes(M);this.serviceRequest=M.serviceRequest;this.service=M.service;this.buyerType=l.prototype.isPrototypeOf(M.buyerType)?M.buyerType:l.INDIVIDUAL;this.me=M.me;this.cart=M.cart;this.buyer=M.buyer;this.cartQuote=M.cartQuote;this.cartFactory=M.cartFactory;this.cartItemFactory=M.cartItemFactory;this.addresses=M.addresses;this.addressFactory=M.addressFactory;this.tcContractFactory=M.tcContractFactory;this.tokenCards=M.tokenCards;this.virtualIbanFactory=M.virtualIbanFactory;this.bankTransferActive=M.bankTransferActive;this.countries=M.countries;this.cartPsp=M.cartPsp;this.periodicitiesAlreadyPurchased=M.periodicitiesAlreadyPurchased;this.locale=M.locale||"fr-FR";this.sections=[];this.idxSections={};this.cartQuoteLink=new q({model:this.cartQuote});this.stateMachine=this._createStateMachine()},render:function(){this._initSections();this.container.addContent(this.sections[this.idxSections.QuoteDownloadSection].render());this.container.addContent(this.sections[this.idxSections.OrderSummaryDetailsSection]);if(A.is(this.idxSections.RenewalSubscriptionSection)){this.container.addContent(this.sections[this.idxSections.RenewalSubscriptionSection])}this.container.addContent(this.sections[this.idxSections.BillingInformationSection].render());this.container.addContent(this.sections[this.idxSections.OrderPaymentMethodSection]);this.container.addContent(this.sections[this.idxSections.ContractsSection].render());B.mask(this.container);return this},_update:function(){var M=this.stateMachine.getState();if(M===h.PAGE_DISPLAYED){this.container.setContent(this.sections)}else{if(M===h.PATCHING_CART){B.mask(this.container)}else{if(M===h.NEW_ADDRESS_FORM){this.container.setContent(this.sections[this.idxSections.BillingInformationSection])}}}},save:function(){var P=this;var O;var M=x.deferred();var N={currentState:f.States.PENDING_PAYMENT};if(this.service==="3DStore"){N.cartContextUrl=H.getWebappsAssetUrl("MPFModalConfiguratorComponent","")}else{if(this.service==="3DPrint"){N.cartContextUrl=this._buildMakeContextUrl()}}var Q=this.sections[this.idxSections.ContractsSection];O=this.sections[this.idxSections.OrderPaymentMethodSection].getPaymentMethod();if(O.method==="CB"){if(O.value==="addCB"){if(O.CreditCardTokenMultiUse==="1"){N.CreditCardTokenMultiUse="1"}Q.save().then(this._acceptQuote.bind(this)).then(function(){var R;if(P.cartPsp.getPsp()==="stripe"){R=A.createElement("iframe",{"class":"mpf-stripe",src:H.getWebappsBaseUrl()+"MPFStripeComponent/StripePaymentPage.html?stripeKey="+P.cartPsp.getPublicKey()+"&idCart="+P.cart.get("id")+"&CreditCardTokenMultiUse="+O.CreditCardTokenMultiUse+"&service="+P.serviceRequest});P.dispatchEvent("displayIframe",R);M.resolve()}else{P._updateCart(N).then(function(){R=A.createElement("iframe",{src:P.cart.getPaymentUrl()});P.dispatchEvent("displayIframe",R);M.resolve()})}})["catch"](function(){M.reject()})}else{Q.save().then(this._acceptQuote.bind(this)).then(function(){P.dispatchEvent("paymentByToken",O.CreditCardToken);M.resolve()})["catch"](function(){M.reject()})}}else{this._saveForBankTransfer().then(M.resolve)["catch"](M.reject)}return M.promise},_saveForBankTransfer:function(){var M=this;var O;var N;N=this.sections[this.idxSections.ContractsSection];this.dispatchEvent("invalid");if(this.service==="3DStore"){if(A.equals(this.buyerType,l.INDIVIDUAL)){this.virtualIban=this.virtualIbanFactory.createCollection("me")}else{this.virtualIban=this.virtualIbanFactory.createCollection("company");this.virtualIban.parentResourceId=this.buyer.get("id")}O=this.virtualIban.fetchPromise({currency:this.cart.get("currency")}).then(N.save.bind(N)).then(this._acceptQuote.bind(this)).then(function(){M.dispatchEvent("bankTransferInitiated",M.virtualIban)})}else{O=N.save().then(this._acceptQuote.bind(this)).then(function(){M.dispatchEvent("bankTransferInitiated")})}return O},_buildMakeContextUrl:function(){var O;var M;var N;O=H.getWebappsBaseUrl();M=O.indexOf("resources/");N=O.substring(0,M);return N},_initSections:function(){var M;M=this.cartItemFactory.createCollection("",this.cart.getItems());this.sections.push(this.cartQuoteLink);this.idxSections.QuoteDownloadSection=this.sections.length-1;this.sections.push(new z({title:L.get("orderSummaryTitle"),cart:this.cart,cartItemFactory:this.cartItemFactory,service:this.service,locale:this.locale}));this.idxSections.OrderSummaryDetailsSection=this.sections.length-1;if(this.service==="3DStore"){this.sections.push(new i({locale:this.locale,cartItems:M,currency:this.cart.getCurrency(),currencyDecimals:this.cart.getCurrencyDecimals(),periodicitiesAlreadyPurchased:this.periodicitiesAlreadyPurchased}));this.idxSections.RenewalSubscriptionSection=this.sections.length-1}Array.prototype.push.apply(this.sections,[new v({title:L.get("billingInformation"),addresses:this.addresses,buyer:this.buyer,buyerType:this.buyerType,addressFactory:this.addressFactory,cart:this.cart,cartPsp:this.cartPsp,cartFactory:this.cartFactory,countries:this.countries}),new d({cart:this.cart,cartFactory:this.cartFactory,service:this.service,title:L.get("paymentMethodTitle"),tokenCards:this.tokenCards,bankTransferActive:this.bankTransferActive,cartPsp:this.cartPsp})]);this.idxSections.BillingInformationSection=this.sections.length-2;this.idxSections.OrderPaymentMethodSection=this.sections.length-1;if(this.service==="3DStore"){this.sections.push(new F({cart:this.cart,cartItems:M,buyer:this.buyer,softwareAgreement:this.softwareAgreement,onlineServiceAgreement:this.onlineServiceAgreement,tcContractFactory:this.tcContractFactory}))}else{if(this.service==="3DPrint"){this.sections.push(new m({buyer:this.buyer,shopModel:this.shopModel,tcDocumentFactory:this.tcDocumentFactory,tcContractFactory:this.tcContractFactory,cartItems:M}))}}this.idxSections.ContractsSection=this.sections.length-1;this._initListeners()},_initListeners:function(){var M=this;this.listenTo(this.sections[this.idxSections.OrderSummaryDetailsSection],"onRender",function(){if(A.is(M.idxSections.RenewalSubscriptionSection)){M.sections[M.idxSections.RenewalSubscriptionSection].cartItems=M.cartItemFactory.createCollection("",M.cart.getItems());M.sections[M.idxSections.RenewalSubscriptionSection].render()}B.unmask(M.container)});this.listenTo(this.sections[this.idxSections.OrderSummaryDetailsSection],"onRenderError",function(){B.unmask(M.container)});this.listenTo(this.sections[this.idxSections.BillingInformationSection],"updatingCart",function(){M.stateMachine.changeState(h.PATCHING_CART);M._update()});this.listenTo(this.sections[this.idxSections.BillingInformationSection],"errorPatchCart",function(){M.stateMachine.changeState(h.PAGE_DISPLAYED);B.unmask(M.container)});this.listenTo(this.sections[this.idxSections.BillingInformationSection],"newAddress",function(){M.stateMachine.changeState(h.NEW_ADDRESS_FORM);M._update();M.dispatchEvent("newAddress")});this.listenTo(this.sections[this.idxSections.BillingInformationSection],"renderEntirePage",function(){M.stateMachine.changeState(h.PAGE_DISPLAYED);M._update();M.dispatchEvent("renderEntirePageCheckout")});this.listenTo(this.sections[this.idxSections.BillingInformationSection],"validSection",function(){M.stateMachine.changeState(h.PAGE_DISPLAYED);M.sections[M.idxSections.OrderPaymentMethodSection].render();M.sections[M.idxSections.OrderSummaryDetailsSection].render();M._dispatchValidEvent()});this.listenTo(this.sections[this.idxSections.OrderPaymentMethodSection],"new-height",function(O){var N;M.container.setStyle("height","unset");if(A.is(O,"number")){M.selectOptionsHeight=O;N=parseInt(M.container.getStyle("height"))+M.selectOptionsHeight;M.container.setStyle("height",N+"px");M.scroller.scrollTo(0,N,500)}});this.listenTo(this.sections[this.idxSections.BillingInformationSection],"invalidSection",this._dispatchInvalidEvent);this.listenTo(this.sections[this.idxSections.OrderPaymentMethodSection],"validSection",this._dispatchValidEvent);this.listenTo(this.sections[this.idxSections.OrderPaymentMethodSection],"invalidSection",this._dispatchInvalidEvent);this.listenTo(this.sections[this.idxSections.ContractsSection],"validSection",this._dispatchValidEvent);this.listenTo(this.sections[this.idxSections.ContractsSection],"invalidSection",this._dispatchInvalidEvent)},_dispatchValidEvent:function(){if(this._allSectionsValid()){this.dispatchEvent("valid")}},_dispatchInvalidEvent:function(){this.dispatchEvent("invalid")},_allSectionsValid:function(){return this.sections[this.idxSections.OrderPaymentMethodSection].isValid()&&this.sections[this.idxSections.BillingInformationSection].isValid()&&this.sections[this.idxSections.ContractsSection].isChecked()},_updateCart:function(M){var N=new a(a.Operations.modify,"/",M);var O=new G();this.cart.dataProxy=this.cartFactory.getDataProxy("cart");O.add(N);return this.cart.megaPatch(O)},_acceptQuote:function(){var M=this;return this.cartQuote.fetchPromise().then(function(){var N={};N[t.Fields.STATE]="ACCEPTED";M.cartQuote.savePromise(N,{patch:true})})},_createStateMachine:function(){return new j({state:h.PAGE_DISPLAYED,states:[h.PAGE_DISPLAYED,h.NEW_ADDRESS_FORM,h.PATCHING_CART],transitions:[{from:h.PAGE_DISPLAYED,to:h.NEW_ADDRESS_FORM},{from:h.NEW_ADDRESS_FORM,to:h.PAGE_DISPLAYED},{from:h.NEW_ADDRESS_FORM,to:h.PATCHING_CART},{from:h.PATCHING_CART,to:h.PAGE_DISPLAYED},{from:h.PAGE_DISPLAYED,to:h.PATCHING_CART}]})},_resizePage:function(){this.container.setStyle("height","unset")},_checkPrototypes:function(M){if(!(b.prototype.isPrototypeOf(M.buyer)||k.prototype.isPrototypeOf(M.buyer))){throw new D("OrderConfirmationPage options.buyer must be a CompanyModel or a PersonModel")}C.requiredOfPrototype(M.buyerType,l,"options.buyerType must be a BuyerType");C.requiredOfPrototype(M.me,k,"options.me must be a PersonModel");C.requiredOfPrototype(M.cart,f,"options.cart must be a CartModel");C.requiredOfPrototype(M.cartQuote,t,"options.cartQuote must be a CartQuoteModel");C.requiredOfPrototype(M.cartFactory,r,"options.cartFactory must be a CartFactory");C.requiredOfPrototype(M.cartItemFactory,e,"options.cartItemFactory must be a CartItemFactory");C.requiredOfPrototype(M.addresses,y,"options.addresses must be an AddressCollection");C.requiredOfPrototype(M.addressFactory,w,"options.addressFactory must be an AddressFactory");C.requiredOfPrototype(M.tcContractFactory,E,"options.tcContractFactory must be a TCContractFactory");C.requiredOfPrototype(M.tokenCards,s,"options.tokenCards must be a PaymentCardTokenCollection");C.requiredOfPrototype(M.virtualIbanFactory,c,"options.virtualIbanFactory must be a VirtualIbanFactory");C.requiredOfPrototype(M.countries,I,"options.countries must be a CountryCollection");C.requiredOfPrototype(M.cartPsp,g,"options.cartPsp must be a PspModel");if(M.service==="3DStore"){C.requiredOfPrototype(M.softwareAgreement,n,"options.softwareAgreement must be a SoftwareAgreementModel");C.requiredOfPrototype(M.onlineServiceAgreement,n,"options.onlineServiceAgreement must be a SoftwareAgreementModel");this.softwareAgreement=M.softwareAgreement;this.onlineServiceAgreement=M.onlineServiceAgreement}else{if(M.service==="3DPrint"){C.requiredOfPrototype(M.shopModel,o,"options.shopModel must be a ShopModel");C.requiredOfPrototype(M.tcDocumentFactory,u,"options.tcDocumentFactory must be a TCDocumentFactory");this.shopModel=M.shopModel;this.tcDocumentFactory=M.tcDocumentFactory}}}});return p});define("DS/MPFOrderComponent/OrderPaymentPage",["UWA/Core","UWA/Class/View"],function(b,c){var a;a=c.extend({className:"mpf-payment-page",setup:function(d){this._parent(d);this._paymentUrl=d.paymentUrl},render:function(){var d;if(this._paymentUrl){d=b.createElement("iframe",{src:this._paymentUrl});this.container.setContent(d)}return this},setPaymentUrl:function(d){this._paymentUrl=d;this.render()}});return a});define("DS/MPFOrderComponent/OrderConfirmationSection",["UWA/Core","UWA/Class/View"],function(a,c){var b;b=c.extend({className:"mpf-section",setup:function(d){d||(d={});this.title=d.title;this.commands=Array.isArray(d.commands)?d.commands:[];this.body=Array.isArray(d.body)?d.body:[]},render:function(){var f=[];var e;var g;var d;g=a.createElement("h5",{"class":"mpf-title",text:this.title});f.push(g);d=a.createElement("div",{"class":"mpf-commands",html:this.commands});f.push(d);e=a.createElement("div",{"class":"mpf-body",html:this.body});f.push(e);this.container.setContent(f);return this}});return b});define("DS/MPFOrderComponent/OrderTypeToItemNameDictionnary",["DS/MPFMap/BiMap","i18n!DS/MPFOrderComponent/assets/nls/OrderComponent"],function(b,a){var c=new b();c.put("MP3DP_PrintRequest",a.get("printBaseline"));c.put("MPENG_EngineeringItem",a.get("engineeringBaseline"));c.put("MP_DeliveryServiceRequest",a.get("shipping"));c.put("MP3DP_FinishRequest",a.get("finish"));c.put("MP_AdditionalServiceRequest",a.get("additionalServices"));c.put("MP_QuoteRequest",a.get("pricePerQuote"));return c});define("DS/MPFOrderComponent/PurchaseOrderNumberComponent",["UWA/Core","UWA/Class/View","DS/MPFView/FieldTextInput","DS/MPFCartModel/CartPatchArray","DS/MPFCartModel/CartPatchOperation","i18n!DS/MPFOrderComponent/assets/nls/OrderComponent"],function(f,e,c,d,a,b){return e.extend({className:"mpf-purchase-order-number",setup:function(){this.input=new c({className:c.prototype.className+" mpf-oneline",fieldName:"PurchaseOrderNumber",fieldLabel:b.get("purchaseOrderNumber"),model:this.model});this.listenTo(this.input,"update",this.save.bind(this))},render:function(){this.container.setContent(this.input.render());return this},save:function(){var h;var i;var g;h=this.model.pick("PurchaseOrderNumber");g=new a(a.Operations.modify,"/",h);i=new d();i.add(g);return this.model.megaPatch(i)},destroy:function(){this.stopListening(this.input);this.input.destroy();this.input=null;this.stopListening(this.model);this.model=null;this._parent()}})});define("DS/MPFOrderComponent/OrderNumberInput",["DS/MPFView/FieldTextInput","i18n!DS/MPFOrderComponent/assets/nls/OrderComponent"],function(b,a){var c=b.extend({setup:function(d){d||(d={});d.fieldName="id";d.fieldLabel=a.get("purchaseOrderNumber");this._parent(d)}});return c});define("DS/MPFOrderComponent/OrderDetailsComponent",["UWA/Core","UWA/String","UWA/Class/View","DS/MPFServices/ObjectService","DS/MPFCartModel/CartModel","DS/MPFCartModel/CartItemCollection","DS/MPFOrderComponent/OrderTypeToItemNameDictionnary","i18n!DS/MPFOrderComponent/assets/nls/OrderComponent"],function(f,h,a,g,d,b,e,i){var c=a.extend({className:"mpf-order-details table-responsive",setup:function(j){j||(j={});g.requiredOfPrototype(j.cart,d,"options.cart must be a CartModel");g.requiredOfPrototype(j.cartItems,b,"options.cartItems must be a CartItemCollection");this._parent(j);this.cart=j.cart;this.cartItems=j.cartItems;this.locale=j.locale||"fr-FR";this.table=this._createTable()},render:function(){this.container.setContent([this.table,this._createInfoMessage()]);return this},_createTable:function(){var j;j=this.cart.getGrossAmountTotal().toLocaleString(this.locale,{style:"currency",currency:this.cart.getCurrency(),currencyDisplay:"code"}).replace(this.cart.getCurrency(),"").trim();return f.createElement("table",{"class":"table table-condensed",html:[this._createTableHeader(),this._createTableBody(),this._createTableFooter(j)]})},_createOrderItemEntry:function(m){var l;var j;var o;var k;var n;j=this.cart.getCurrency();o=m.getUnitNetAmount().toLocaleString(this.locale,{style:"currency",currency:j,currencyDisplay:"code"}).replace(j,"").trim();k=m.getUnitTaxesAmount().toLocaleString(this.locale,{style:"currency",currency:j,currencyDisplay:"code"}).replace(j,"").trim();n=m.getTotalGrossAmount().toLocaleString(this.locale,{style:"currency",currency:j,currencyDisplay:"code"}).replace(j,"").trim();if(m.getType()==="MP_SoftwareRequest"){l=m.get("ProductDisplayName")}else{l=m.get("AdditionalServiceName")||m.get("FinishName");if(!(l)){l=e.get(m.getType(),m.getName())}}return f.createElement("tr",{html:[f.createElement("td",{"class":"mpf-body-item",text:l}),f.createElement("td",{"class":"mpf-body-quantity",text:parseInt(m.getQuantity())}),f.createElement("td",{text:o}),f.createElement("td",{text:k}),f.createElement("td",{text:n+" "+j})]})},_createTableBody:function(){var j=this;var k;k=this.cartItems.filter(function(l){return l.getQuantity()>0}).sort(function(m,l){if(l.getType()==="MP3DP_PrintRequest"||l.getType()==="MPENG_EngineeringItem"){return 1}else{if(m.getType()==="MP3DP_PrintRequest"||m.getType()==="MPENG_EngineeringItem"){return -1}else{return 0}}});return f.createElement("tbody",{html:k.map(function(l){return j._createOrderItemEntry(l)})})},_createTableHeader:function(){return f.createElement("thead",{html:f.createElement("tr",{html:[{tag:"th",text:i.get("item"),"class":"mpf-header-item"},{tag:"th",text:i.get("quantity"),"class":"mpf-header-quantity"},{tag:"th",text:i.get("unitPrice")},{tag:"th",text:i.get("taxes")},{tag:"th",text:i.get("totalAmountWithTaxes")}]})})},_createTableFooter:function(j){return f.createElement("tfoot",{html:f.createElement("tr",{html:[f.createElement("td"),f.createElement("td"),f.createElement("td"),f.createElement("td",{text:i.get("total")}),f.createElement("td",{text:j+" "+this.cart.getCurrency()})]})})},_createInfoMessage:function(){var k=this.cart.getMinOrderCost();if(f.is(k)){var l;var j=parseFloat(k,10);if(j>0){l=h.format(i.get("messageMinOrderCost"),k,this.cart.getCurrency());return f.createElement("div",{"class":"info-message",text:l})}}},destroy:function(){this.cart=null;this.cartItems=null;this.locale=null;this.table=null;this._parent();this.container=null}});return c});