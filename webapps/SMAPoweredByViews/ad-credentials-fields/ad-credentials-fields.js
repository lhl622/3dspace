(function(e){var c=function(){var k=this.$.runAsPassLinuxInput.value;if(k.indexOf("000")>-1){this.$.runAsPassLinuxInput.value=""}};var b=function(){var k=this.$.runAsPassWindowsInput.value;if(k.indexOf("000")>-1){this.$.runAsPassWindowsInput.value=""}};var j=function(){var l=this.$.runAsDomainInput.value,k=this.$.runAsWindowsUserInput.value===""?null:this.$.runAsWindowsUserInput.value,o=this.$.runAsPassWindowsInput.value;var m=o!==""&&o.indexOf("000")!==0;var n=m&&Boolean(k)&&l!=="";if(n){this.fire("updatecredentials",{domainName:l,windowsUser:k,linuxUser:null,windowsPassword:o})}else{b.call(this)}};var h=function(){var n=this.$.runAsLinuxUserInput.value===""?null:this.$.runAsLinuxUserInput.value,l=this.$.runAsPassLinuxInput.value;var k=l!==""&&l.indexOf("000")!==0;var m=k&&Boolean(n);if(m){this.fire("updatecredentials",{domainName:"",windowsUser:null,linuxUser:n,linuxPassword:l})}else{c.call(this)}};var a=function(m,l){var n=this.$.runAsPassWindowsInput.value;var k=this.$.runAsPassLinuxInput.value;if(n===""||n===null){this.$.runAsPassWindowsInput.value=new Array(m+1).join("0")}if(k===""||k===null){this.$.runAsPassLinuxInput.value=new Array(l+1).join("0")}};var f=function(){this.$.runAsDomain.classList.remove("hidden");this.$.runAsWindowsUser.classList.remove("hidden");this.$.runAsWindowsPass.classList.remove("hidden")};var g=function(){this.$.runAsDomain.classList.add("hidden");this.$.runAsWindowsUser.classList.add("hidden");this.$.runAsWindowsPass.classList.add("hidden")};var i=function(){this.$.runAsLinuxUser.classList.remove("hidden");this.$.runAsLinuxPass.classList.remove("hidden")};var d=function(){this.$.runAsLinuxUser.classList.add("hidden");this.$.runAsLinuxPass.classList.add("hidden")};e.Polymer({is:"ad-credentials-fields",properties:{domainName:{type:String},windowsUser:{type:String},linuxUser:{type:String}},showDialog:function(){this.$.propertiesModal.classList.add("show");this.$.propertiesModal.classList.add("in")},clearPassword:function(l){var m=this.$.runAsPassWindowsInput.value,k=this.$.runAsPassLinuxInput.value;if(m.indexOf("000")>-1||k.indexOf("000")>-1){if(l){l.target.value=""}else{this.$.runAsPassWindowsInput.value="";this.$.runAsPassLinuxInput.value=""}}},enableRequiredRunAsFields:function(n,p,q,k,o){var m=(q===true),l=(k===true);if((p&&p.isRunAsEnabled)&&((n&&n.isRunAsEnabled)||(m&&!l))){this.$.runAsSection.classList.remove("hidden");if(!m){this.$.runAsAlertStation.classList.remove("hidden");this.$.runAsAlertStation.classList.add("show");this.$.runAsAlertDRM.classList.add("hidden");this.$.runAsAlertDRM.classList.remove("show");if(o==="windows"){f.call(this);d.call(this)}else{g.call(this);i.call(this);this.$.runAsDomainInput.value=null;this.domainName=""}if(n&&n.domains&&n.domains.length>0){this.$.runAsDomainInput.value=n.domains[0]}}else{this.$.runAsAlertStation.classList.add("hidden");this.$.runAsAlertStation.classList.remove("show");this.$.runAsAlertDRM.classList.remove("hidden");this.$.runAsAlertDRM.classList.add("show");f.call(this);i.call(this)}}else{this.$.runAsAlertStation.classList.add("hidden");this.$.runAsAlertStation.classList.remove("show");this.$.runAsAlertDRM.classList.add("hidden");this.$.runAsAlertDRM.classList.remove("show");this.$.runAsSection.classList.add("hidden")}},populateFields:function(l,n,o,k,m){this.enableRequiredRunAsFields(l,n,o,k,m)},populateCredentials:function(l){if(l){var m=l.lengthWindows?l.lengthWindows:0;var k=l.lengthLinux?l.lengthLinux:0;if(l.lengthWindows||l.lengthLinux){a.call(this,m,k,l.windowsUser)}this.$.runAsDomainInput.value=l.domainName?l.domainName:"";this.$.runAsWindowsUserInput.value=l.windowsUser;this.windowsUser=l.windowsUser;this.$.runAsLinuxUserInput.value=l.linuxUser;this.linuxUser=l.linuxUser}else{this.$.runAsDomainInput.value="";this.$.runAsWindowsUserInput.value="";this.$.runAsLinuxUserInput.value="";this.$.runAsPassWindowsInput.value="";this.$.runAsPassLinuxInput.value=""}},runAsDomainChanged:function(){if(this.domainName!==this.$.runAsDomainInput.value){this.domainName=this.$.runAsDomainInput.value;j.apply(this)}},runAsWindowsUserChanged:function(){if(this.windowsUser!==this.$.runAsWindowsUserInput.value){this.windowsUser=this.$.runAsWindowsUserInput.value;j.apply(this)}},runAsWindowsPassChanged:function(){j.apply(this)},runAsLinuxUserChanged:function(){if(this.linuxUser!==this.$.runAsLinuxUserInput.value){this.linuxUser=this.$.runAsLinuxUserInput.value;h.apply(this)}},runAsLinuxPassChanged:function(){h.apply(this)}})}(this));