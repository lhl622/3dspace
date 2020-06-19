define("DS/MPFDeferredPayment/DeferredPaymentNotices",["UWA/Core","UWA/Promise","UWA/Class/View","DS/MPFFiniteStateMachine/FiniteStateMachine","DS/MPFCartModel/CartModel","DS/MPFCartModel/CartModelHelper","DS/MPFModelFactory/PurchaseOrderFactory","DS/MPFModelFactory/PurchaseOrderDocumentFactory","DS/MPFPurchaseOrderComponent/PurchaseOrderUploadNoticeComponent","DS/MPFModelFactory/InvoiceDocumentFactory","DS/MPFInvoiceComponent/InvoiceUploadNoticeComponent","DS/MPFInvoiceComponent/ProceedToPaymentNoticeComponent","DS/MPFError/BadArgumentError"],function(f,k,a,g,h,j,b,e,m,n,l,c,o){var i;var d={};d.HIDDEN="hidden";d.UPLOAD_PURCHASE_ORDER="uploadPurchaseOrder";d.UPLOAD_INVOICE="UPLOAD_INVOICE";d.PROCEED_TO_PAYMENT="PROCEED_TO_PAYMENT";i=a.extend({className:"mpf-deferred-payment-notices",setup:function(p){if(!(h.prototype.isPrototypeOf(this.model))){throw new o("options.model must be a CartModel")}if(!(b.prototype.isPrototypeOf(p.purchaseOrderFactory))){throw new o("options.purchaseOrderFactory must be a PurchaseOrderFactory")}if(!(e.prototype.isPrototypeOf(p.purchaseOrderDocumentFactory))){throw new o("options.purchaseOrderDocumentFactory must be a PurchaseOrderDocumentFactory")}if(!(n.prototype.isPrototypeOf(p.invoiceDocumentFactory))){throw new o("options.invoiceDocumentFactory must be a InvoiceDocumentFactory")}this.cart=this.model;this.userRole=p.userRole;this.stateMachine=this._createStateMachine();this.uploadPurchaseOrderComponent=null;this.uploadInvoiceComponent=null;this.proceedToPaymentComponent=null;this.purchaseOrderFactory=p.purchaseOrderFactory;this.purchaseOrderDocumentFactory=p.purchaseOrderDocumentFactory;this.invoiceDocumentFactory=p.invoiceDocumentFactory;this.listenTo(this.cart,"onChange",this.update);this.update()},render:function(){var p;p=this.stateMachine.getState();if(p===d.HIDDEN){this.container.setContent()}if(p===d.UPLOAD_PURCHASE_ORDER){this.container.setContent(this.uploadPurchaseOrderComponent.render())}else{if(p===d.UPLOAD_INVOICE){this.container.setContent(this.uploadInvoiceComponent.render())}else{if(p===d.PROCEED_TO_PAYMENT){this.container.setContent(this.proceedToPaymentComponent.render())}}}return this},update:function(s){var p;var t;var q;var r;if(this.cart.getPaymentMethod()==="DBT"){t=j.isWaitingForInvoice(this.cart,this.userRole);q=j.isWaitingForPurchaseOrder(this.cart,this.userRole);r=j.isWaitingForProceedToPayement(this.cart,this.userRole);if(t){p=this._toUploadInvoiceState()}else{if(q){p=this._toUploadPurchaseOrderState()}else{if(r){p=this._toProceedToPaymentState()}else{this.stateMachine.changeState(d.HIDDEN)}}}}else{this.stateMachine.changeState(d.HIDDEN)}return k.cast(p).then(this.render.bind(this))},_createStateMachine:function(){return new g({state:d.HIDDEN,states:[d.HIDDEN,d.UPLOAD_PURCHASE_ORDER,d.UPLOAD_INVOICE,d.PROCEED_TO_PAYMENT],transitions:[{from:d.HIDDEN,to:d.UPLOAD_PURCHASE_ORDER},{from:d.UPLOAD_PURCHASE_ORDER,to:d.HIDDEN},{from:d.HIDDEN,to:d.UPLOAD_INVOICE},{from:d.UPLOAD_INVOICE,to:d.HIDDEN},{from:d.HIDDEN,to:d.PROCEED_TO_PAYMENT},{from:d.PROCEED_TO_PAYMENT,to:d.HIDDEN}]})},_createPurchaseOrder:function(){var p;this.purchaseOrder=this.purchaseOrderFactory.createModel(b.Types.CART_PURCHASE_ORDER,{});p=this.cart.getPurchaseOrderId();if(p){this.purchaseOrder.set("id",p)}this.purchaseOrder.parentResourceId=this.cart.id},_toUploadPurchaseOrderState:function(){var q;var p;this.purchaseOrder||this._createPurchaseOrder();if(!(this.uploadPurchaseOrderComponent)){p=this.purchaseOrderDocumentFactory.createModel(e.Types.CART_PURCHASE_ORDER_DOCUMENT);p.parentResourceId=this.cart.id;this.uploadPurchaseOrderComponent=new m({model:this.purchaseOrder,purchaseOrderDocument:p,cart:this.cart})}if(this.purchaseOrder.isNew()){this.stateMachine.changeState(d.UPLOAD_PURCHASE_ORDER)}else{q=this.purchaseOrder.fetchPromise().then(function(){this.stateMachine.changeState(d.UPLOAD_PURCHASE_ORDER)})}return k.cast(q)},_toUploadInvoiceState:function(){var p;var q;this.purchaseOrder||this._createPurchaseOrder();if(!(this.uploadInvoiceComponent)){q=this.invoiceDocumentFactory.createModel(n.Types.CART_INVOICE_DOCUMENT);q.parentResourceId=this.cart.id;this.uploadInvoiceComponent=new l({model:this.cart,invoiceDocument:q,purchaseOrder:this.purchaseOrder})}this.stateMachine.changeState(d.UPLOAD_INVOICE);return k.cast(p)},_toProceedToPaymentState:function(){if(!(this.proceedToPaymentComponent)){this.proceedToPaymentComponent=new c()}this.stateMachine.changeState(d.PROCEED_TO_PAYMENT)}});return i});