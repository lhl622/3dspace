define("UWA/Controls/Pager",["UWA/Core","UWA/Event","UWA/Controls/Abstract"],function(d,a,c){var b=c.extend({offset:0,limit:0,max:0,length:0,loadingData:false,defaultOptions:{className:"uwa-pager nv-pager",type:0,showPageLinks:false,showMoreLink:false,pageLinks:5,length:0,offset:0,limit:10,max:0,loadNext:null,prevLabel:"prev",nextLabel:"next",moreLabel:"more"},init:function(e){this._parent(e);e=this.options;this.offset=parseInt(e.offset,10);this.limit=parseInt(e.limit,10);this.max=parseInt(e.max,10);this.length=parseInt(e.length,10);this.buildSkeleton()},setOptions:function(e){this._parent(e);e=this.options;if(e.dataLength){e.length=e.dataLength}else{if(e.dataArray){e.length=e.dataArray.length}}if(e.onChange){this.addEvent("onOffsetChange",e.onChange)}if(e.onMoreClick){this.addEvent("onMoreClick",e.onMoreClick)}if(e.showPageLinks||(e.pageLinks&&!e.type)){this.type=1}return this},setLength:function(e){this.length=parseInt(e,10);this.setOffset(this.offset)},setOffset:function(g){var e=this,f=e.offset;g=g<0?0:g;e.offset=Math.min(parseInt(g,10),(e.max||e.length));if(f!==e.offset){e.dispatchEvent("onOffsetChange",[e.offset])}return e},setLimit:function(e){this.limit=parseInt(e,10);return this},getPageOffset:function(e){return Math.ceil((parseInt(e,10)||this.offset)/this.limit)},getPages:function(){return Math.ceil((this.max||this.length||1)/this.limit)},isLastPage:function(){var f=this,e=!f.max||f.length>=f.max,g=f.offset+f.limit>=f.length;return e&&g},buildSkeleton:function(){var e=this.elements;e.container=d.createElement("div",{"class":this.options.className});this.dispatchEvent("onRefresh")},buildPageInfos:function(){var e=this.elements;e.pageInfos=d.createElement("span",{"class":"pageInfos",html:d.createElement("span",{text:(this.getPageOffset()+1)+" / "+this.getPages()})}).inject(e.subContainer)},buildPageLinks:function(){var g,h,e=this.elements,q=this.options,p=this.injectPageLink.bind(this),o=this.injectPageSeparator.bind(this),m=q.pageLinks,j=this.getPages(),l=this.getPageOffset(),k=0,n=Math.round(m/2),f=(l>=n&&(j>=m))?(l-n+1):0;e.pageContainer=d.createElement("span",{"class":"pageLinks"});if(f<j){for(g=f;g<j&&k<m;g++){if(f>=1&&k===0){p(k);if(g>1){o()}}h=p(g);if(g===l){h.addClassName("selected")}if(g<j-1&&(k===m-1)){if(g<j-2){o()}p(j-1)}k++}}e.pageContainer.inject(e.subContainer)},injectPageLink:function(e){var f=parseInt(e+1,10);return d.createElement("a",{"class":"pageLink",href:"#page_"+f,text:f,events:{click:this.dispatchAsEventListener("onPageClick",e)}}).inject(this.elements.pageContainer)},injectPageSeparator:function(){return d.createElement("span",{"class":"comas",text:" ... "}).inject(this.elements.pageContainer)},onRefresh:function(){var g=this.elements,f=this.options,e=this.isLastPage();g.container.empty();g.subContainer=d.createElement("div");g.prev=d.createElement("a",{"class":"prev"+(this.offset===0?" disabled":""),href:"#prev",html:d.createElement("span",{text:d.i18n(f.prevLabel)}),events:{click:this.dispatchAsEventListener("onPrevClick")}}).inject(g.subContainer);if(e&&(f.showMoreLink||f.moreLink)){g.next=d.createElement("a",{"class":"more",href:f.moreLink||"#more",html:d.createElement("span",{text:d.i18n(f.moreLabel)}),events:{click:this.dispatchAsEventListener("onMoreClick")}}).inject(g.subContainer)}else{g.next=d.createElement("a",{"class":"next"+(e?" disabled":""),href:"#next",html:d.createElement("span",{text:d.i18n(f.nextLabel)}),events:{click:this.dispatchAsEventListener("onNextClick")}}).inject(g.subContainer)}if(f.type===1){this.buildPageLinks()}else{if(f.type===2){this.buildPageInfos()}}g.subContainer.inject(g.container)},onOffsetChange:function(e){this.offset=e;this.dispatchEvent("onRefresh");this.dispatchEvent("onChange",[e])},onPageClick:function(e,f){d.Event.preventDefault(e);if(!this.loadingData){this.setOffset(this.limit*f)}},onPrevClick:function(f){a.preventDefault(f);var e=a.findElement(f,"a");if(!this.loadingData&&!e.hasClassName("disabled")){this.setOffset(this.offset-this.limit)}},onNextClick:function(h){a.preventDefault(h);var g=this,k=g.options.loadNext,f=a.findElement(h,"a"),j=g.offset+g.limit,e=j+g.limit<=g.length;function i(){g.setOffset(j)}if(!g.loadingData&&!g.isLastPage()&&!f.hasClassName("disabled")){if(!k&&g.onNeedMoreData){k=function(l,m){g.onNeedMoreData(l);setTimeout(m.bind(null,null),60000)}}if(!e&&k){g.dispatchEvent("onLoadingStart");k(g.length,function(l){if(l){g.length=l}i();g.dispatchEvent("onLoadingEnd")})}else{i()}}},onMoreClick:function(){},onLoadingStart:function(){this.loadingData=true;this.elements.subContainer.addClassName("loading")},onLoadingEnd:function(){this.loadingData=false;this.elements.subContainer.removeClassName("loading")}});return d.namespace("Controls/Pager",b,d)});