(function(){require(["SMAAnalyticsWidget/SMAAnalyticsWidgetProxy"],function(b){var a;a={is:"ra-copy-page",properties:{title:{type:Object,value:{title:"Title",revision:"Revision",description:"Description",policy:"Policy",vault:"Vault"}}},ready:function(){var c=[{label:"Analytics Case",value:"Analytics Case"}];this.$.policySelect.textContent="";c.map(function(e){var d=document.createElement("option");d.value=e.value;d.textContent=e.label;d.selected=e.selected;this.$.policySelect.appendChild(d)}.bind(this));c=[{label:"eService Production",value:"eService Production"},{label:"vplm",value:"vplm"}];this.$.vaultSelect.textContent="";c.map(function(e){var d=document.createElement("option");d.value=e.value;d.textContent=e.label;d.selected=e.selected;this.$.vaultSelect.appendChild(d)}.bind(this))}};window.Polymer(a)})})(this);