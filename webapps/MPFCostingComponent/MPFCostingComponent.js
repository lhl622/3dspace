define("DS/MPFCostingComponent/PricingSection",["UWA/Core","UWA/Class/View","DS/MPFServices/ObjectService","DS/MPFView/GuidanceHelper","css!DS/MPFCostingComponent/MPFCostingComponent"],function(e,d,a,b){var c;c=d.extend({className:"mpf-pricing-section",setup:function(f){f||(f={});a.requiredOfPrototype(f.elements,Array,"options.elements must be an Array");this.title=f.title;this.guidanceHelperContent=f.guidanceHelperContent;this.elements=f.elements;this.guidanceHelper=this._createGuidanceHelper();this.titleContainer=this._getTitleContainer()},render:function(){var f=[];f.push(this.titleContainer);this.elements.forEach(function(g){f.push(g.render())});this.container.setContent(f);return this},_createGuidanceHelper:function(){return new b({content:this.guidanceHelperContent})},_getTitleContainer:function(){return e.createElement("div",{"class":"mpf-pricing-title",html:[this.title,this.guidanceHelper]})}});return c});define("DS/MPFCostingComponent/DiscountElement",["UWA/Core","UWA/Class/View","DS/UIKIT/Input/Number","DS/UIKIT/Input/Button","DS/MPFServices/ObjectService","DS/MPFShopModel/ShopModel","DS/MPFDiscountModel/DiscountModel","i18n!DS/MPFCostingComponent/assets/nls/CostingComponent","css!DS/MPFCostingComponent/MPFCostingComponent"],function(e,a,d,f,g,i,b,h){var c;c=a.extend({className:"mpf-pricing-element",domEvents:{"click span.fonticon-trash":"_onRemove"},setup:function(j){j||(j={});g.requiredOfPrototype(j.shop,i,"options.shop must be a ShopModel");g.requiredOfPrototype(j.discount,b,"options.discount must be a DiscountModel");this.shop=j.shop;this.discount=j.discount;this.priceInput=this._createPriceInput();this.discountInput=this._createDiscountInput();this.currencyOption=this._createCurrencyButton();this.percentageOption=this._createPercentageButton();this.trashDiscountIcon=this._createTrashDiscountIcon()},render:function(){var k;var j;k=e.createElement("span",{"class":"mpf-input-number-label",text:h.get("orderValueLabel")});j=e.createElement("span",{"class":"mpf-input-number-label",text:h.get("discountLabel")});this.container.setContent([k,this.priceInput,j,this.discountInput,this.percentageOption,this.trashDiscountIcon]);return this},save:function(){return this.discount.savePromise()},_onRemove:function(){var j=this;return this.discount.destroyPromise().then(function(){j.dispatchEvent("onRemove",j)})},_changeUnit:function(l){var k=this;var j={};j[b.Fields.UNIT]=l;return this.discount.savePromise(j,{patch:true}).then(function(){k.discountInput=k._createDiscountInput();return k._onDiscountValueChanged()}).then(k.render.bind(k))},_onPriceChanged:function(){var k;var j={};if(e.is(this.priceInput)){k=parseFloat(this.priceInput.getValue());if(k!==this.discount.getLimit()){j[b.Fields.LIMIT]=k;return this.discount.savePromise(j,{patch:true})}}},_onDiscountValueChanged:function(){var k;var j={};if(e.is(this.discountInput)){k=parseFloat(this.discountInput.getValue());if(k!==this.discount.getValue()){j[b.Fields.VALUE]=k;return this.discount.savePromise(j,{patch:true})}}},_createPercentageButton:function(){var j=this;return new f({value:"%",active:this.discount.getUnit()==="percentage",events:{onClick:function(){if(!this.isActive()){j._changeUnit("percentage").then(function(){j.percentageOption.setActive();j.currencyOption.setActive(false)})}}}})},_createCurrencyButton:function(){var j=this;return new f({value:this.shop.getSupportedCurrencies(),active:this.discount.getUnit()===this.shop.getSupportedCurrencies()[0],events:{onClick:function(){if(!this.isActive()){j._changeUnit(j.shop.getSupportedCurrencies()[0]).then(function(){j.currencyOption.setActive();j.percentageOption.setActive(false)})}}}})},_createTrashDiscountIcon:function(){return e.createElement("span",{"class":"fonticon fonticon-2x fonticon-trash"})},_createDiscountInput:function(){var j;var k;k=this.discount.getUnit();j=new d({min:0,max:k==="percentage"?100:9999.99,step:0.1,events:{onChange:this._onDiscountValueChanged.bind(this)}});j.setValue(this.discount.getValue());return j},_createPriceInput:function(){var j;j=new d({min:0,max:9999.99,step:0.1,events:{onChange:this._onPriceChanged.bind(this)}});j.setValue(this.discount.getLimit());return j},destroy:function(){this.shop=null;this.discount=null;this.priceInput=null;this.discountInput=null;this.currencyOption=null;this.percentageOption=null;this.trashDiscountIcon=null;this._parent();this.container=null}});return c});define("DS/MPFCostingComponent/PricingElement",["UWA/Core","UWA/Class/View","DS/UIKIT/Input/Toggle","DS/UIKIT/Input/Number","DS/MPFServices/ObjectService","DS/MPFShopModel/ShopModel","DS/MPFPricingModel/PricingModel","i18n!DS/MPFCostingComponent/assets/nls/CostingComponent","css!DS/MPFCostingComponent/MPFCostingComponent"],function(e,a,f,c,g,i,d,h){var b;b=a.extend({className:"mpf-pricing-element",setup:function(j){j||(j={});g.requiredOfPrototype(j.shop,i,"options.shop must be a ShopModel");g.requiredOfPrototype(j.pricing,d,"options.pricing must be a PricingModel");this.shop=j.shop;this.pricing=j.pricing;this.pricingAttribute=j.pricingAttribute;this.switchLabel=j.switchLabel;this.minValue=j.minValue||0;this.maxValue=j.maxValue||10;this.stepValue=j.stepValue||1;this.inputNumberLabel=j.inputNumberLabel;this.switchInput=this._createSwitchInput();this.numberInput=this._createNumberInput()},render:function(){var j;j=e.createElement("span",{"class":"mpf-input-number-label",text:this.inputNumberLabel});this.container.setContent([this.switchInput,this.numberInput,j]);return this},_createSwitchInput:function(){return new f({type:"switch",label:this.switchLabel,checked:this.pricing.isNew()?false:this.pricing.get(this.pricingAttribute)>0,events:{onChange:this._onChangeSwitchOption.bind(this)}})},_onChangeSwitchOption:function(){var j;j=this.switchInput.isChecked();if(!j&&this.pricing.get(this.pricingAttribute)!==0){this.numberInput.setValue(0);this.numberInput.setDisabled()}if(j&&this.pricing.get(this.pricingAttribute)===0){this.numberInput.setDisabled(false);this.numberInput.setValue(this.minValue)}},_createNumberInput:function(){var j;j=new c({min:0,max:this.maxValue,step:this.stepValue,events:{onChange:this._onChangeValue.bind(this)}});j.setValue(this.pricing.get(this.pricingAttribute));j.setDisabled(!this.switchInput.isChecked());return j},_onChangeValue:function(){var j;var k={};if(e.is(this.numberInput)){j=parseFloat(this.numberInput.getValue());if(j!==this.pricing.get(this.pricingAttribute)){if(j>0&&j<this.minValue){return this.numberInput.setValue(0)}else{if(j===0){j=0;this.switchInput.setCheck(false);this.numberInput.setDisabled()}}if(this.pricing.isNew()){this.pricing.set(this.pricingAttribute,j);return this.pricing.savePromise()}else{k[this.pricingAttribute]=j;return this.pricing.savePromise(k,{patch:true})}}}},destroy:function(){this.shop=null;this.pricing=null;this.pricingAttribute=null;this.switchLabel=null;this.minValue=null;this.maxValue=null;this.stepValue=null;this.inputNumberLabel=null;this.switchInput=null;this.numberInput=null;this._parent();this.container=null}});return b});define("DS/MPFCostingComponent/DiscountSection",["DS/MPFCostingComponent/PricingSection","DS/MPFServices/ObjectService","DS/MPFModelFactory/DiscountFactory","DS/MPFDiscountModel/DiscountCollection","DS/MPFShopModel/ShopModel","DS/UIKIT/Input/Button","DS/MPFCostingComponent/DiscountElement","i18n!DS/MPFCostingComponent/assets/nls/CostingComponent","css!DS/MPFCostingComponent/MPFCostingComponent"],function(a,e,c,i,h,d,b,f){var g;g=a.extend({setup:function(j){j||(j={});e.requiredOfPrototype(j.shop,h,"options.shop must be a ShopModel");e.requiredOfPrototype(j.discountFactory,c,"options.discountFactory must be a DiscountFactory");e.requiredOfPrototype(j.discounts,i,"options.discounts must be a DiscountCollection");j.title=f.get("discountOrderValue");j.guidanceHelperContent=f.get("discountPerOrderValueSectionTooltip");j.elements=this._createDiscountElements(j.discounts,j.shop);this._parent(j);this.shop=j.shop;this.discountFactory=j.discountFactory;this.discounts=j.discounts;this.addDiscountButton=this._getAddDiscountButton()},render:function(){var j=[];j.push(this.titleContainer);this.elements.forEach(function(k){j.push(k.render())});j.push(this.addDiscountButton);this.container.setContent(j);return this},_addDiscount:function(){var l=this;var k;var j;j=this.discountFactory.createModel(c.Types.SHOP);j.parentResourceId=this.shop.id;this.discounts.add(j);k=new b({shop:this.shop,discount:j});this.listenTo(k,"onRemove",this._onRemoveDiscount.bind(this));return k.save().then(function(){l.elements.push(k);l.render()})},_createDiscountElements:function(j,l){var k=this;var n=[];var m;j.forEach(function(o){o.parentResourceId=l.id;m=new b({shop:l,discount:o});k.listenTo(m,"onRemove",k._onRemoveDiscount.bind(k));n.push(m)});return n},_onRemoveDiscount:function(j){this.elements.splice(this.elements.indexOf(j),1);this.stopListening(j,"onRemove");j.destroy()},_getAddDiscountButton:function(){return new d({value:f.get("addDiscount"),className:"primary",events:{onClick:this._addDiscount.bind(this)}})},destroy:function(){this.shop=null;this.discountFactory=null;this.discounts=null;this.addDiscountButton=null;this._parent();this.container=null}});return g});define("DS/MPFCostingComponent/CostingComponent",["UWA/Class/View","DS/MPFServices/ObjectService","DS/MPFShopModel/ShopModel","DS/MPFPricingModel/PricingModel","DS/MPFModelFactory/DiscountFactory","DS/MPFDiscountModel/DiscountCollection","DS/MPFCostingComponent/PricingSection","DS/MPFCostingComponent/PricingElement","DS/MPFCostingComponent/DiscountSection","DS/MPFView/EmptyView","i18n!DS/MPFCostingComponent/assets/nls/CostingComponent","css!DS/MPFCostingComponent/MPFCostingComponent"],function(b,h,k,f,d,l,a,e,i,c,g){var j;j=b.extend({className:"mpf-costing-component",setup:function(m){m||(m={});h.requiredOfPrototype(m.shop,k,"options.shop must be a ShopModel");h.requiredOfPrototype(m.pricing,f,"options.pricing must be a PricingModel");h.requiredOfPrototype(m.discountFactory,d,"options.discountFactory must be a DiscountFactory");h.requiredOfPrototype(m.discounts,l,"options.discounts must be a DiscountCollection");this.shop=m.shop;this.pricing=m.pricing;this.discountFactory=m.discountFactory;this.discounts=m.discounts;this.generalSection=this._createGeneralSection();this.automatedPricingSection=this._createAutomatedSection();this.discountSection=this._createDiscountSection()},render:function(){this.container.setContent([this.generalSection.render(),this.automatedPricingSection.render(),this.discountSection.render()]);return this},_createGeneralSection:function(){return new a({shop:this.shop,pricing:this.pricing,title:g.get("general"),guidanceHelperContent:g.get("generalSectionTooltip"),elements:[new e({shop:this.shop,pricing:this.pricing,pricingAttribute:f.Fields.MINIMUM_ORDER_COST,switchLabel:g.get("minimumOrderCost"),stepValue:0.01,minValue:0.01,maxValue:9999.99,inputNumberLabel:this.shop.getSupportedCurrencies()}),new e({shop:this.shop,pricing:this.pricing,pricingAttribute:f.Fields.PRICE_PER_QUOTE,switchLabel:g.get("pricePerQuote"),stepValue:0.01,minValue:0.01,maxValue:9999.99,inputNumberLabel:this.shop.getSupportedCurrencies()})]})},_createAutomatedSection:function(){return new a({shop:this.shop,pricing:this.pricing,title:g.get("automatedPricing"),guidanceHelperContent:g.get("automatedPricingSectionTooltip"),elements:[new e({shop:this.shop,pricing:this.pricing,pricingAttribute:f.Fields.TOTAL_ORDER_PRICE,switchLabel:g.get("totalOrderPriceIs"),stepValue:0.01,minValue:0.01,maxValue:9999.99,inputNumberLabel:this.shop.getSupportedCurrencies()+" "+g.get("orMore")}),new e({shop:this.shop,pricing:this.pricing,pricingAttribute:f.Fields.TOTAL_PART_QUANTITY,stepValue:1,minValue:1,maxValue:9999,switchLabel:g.get("totalPartQuantityIs"),inputNumberLabel:g.get("unitsOrMore")})]})},_createDiscountSection:function(){var n;var m;m=window.location.search.indexOf("Discount")!==-1;if(m){n=new i({shop:this.shop,discountFactory:this.discountFactory,discounts:this.discounts})}else{n=c.getInstance()}return n}});return j});define("DS/MPFCostingComponent/CostingFactory",["UWA/Class","UWA/Promise","DS/MPFConnector/MarketplaceConnector","DS/MPFModelFactory/MPFFactoriesV2","DS/MPFModelFactory/ShopFactory","DS/MPFModelFactory/PricingFactory","DS/MPFModelFactory/DiscountFactory","DS/MPFCostingComponent/CostingComponent"],function(a,f,c,i,h,e,d,g){var b=a.extend(a.Listener,{init:function(j){j||(j={});this.shopID=j.shopID;this.container=j.container},getCostingComponent:function(){return c.fetchPromise().then(this._initFactories.bind(this)).then(this._fetchShop.bind(this)).then(this._fetchPricing.bind(this)).then(this._fetchDiscounts.bind(this)).then(this._initCostingComponent.bind(this))},_initCostingComponent:function(){return new g({shop:this.shop,pricing:this.pricing,discountFactory:this.discountFactory,discounts:this.discounts})},_fetchPricing:function(){this.pricing=this.pricingFactory.createModel(e.Types.SHOP);this.pricing.setParentResourceId(this.shopID);this.listenTo(this.pricing,"onRequest",function(k,l,j){k.request=l.xhr});return this.pricing.fetchPromise()["catch"](function(j){if(j.request.status===404){return j.savePromise()}else{return f.reject()}})},_fetchDiscounts:function(){this.discounts=this.discountFactory.createCollection(d.Types.SHOP);this.discounts.setParentResourceId(this.shopID);this.listenTo(this.discounts,"onRequest",function(j,l,k){j.request=l.xhr});return this.discounts.fetchPromise()},_fetchShop:function(){this.shop=this.shopFactory.createModel(h.Types.SHOP,{id:this.shopID});return this.shop.fetchPromise({uc2:true})},_initFactories:function(j){var k=this;this.factories=i.getInstance(j);return f.all([this.factories.getFactory(i.Types.SHOP),this.factories.getFactory(i.Types.PRICING),this.factories.getFactory(i.Types.DISCOUNT)]).then(function(l){k.shopFactory=l[0];k.pricingFactory=l[1];k.discountFactory=l[2]})}});return b});