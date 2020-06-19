define("DS/SMAProcWebAuthoringUI/nTwoViewWebInWinEditor",["UWA/Core","DS/Controls/Toggle","DS/SMAProcWebCommonControls/Polymer","DS/SMAProcWebCommonControls/utils","DS/SMAProcWebCMMUtils/SMAJSCMMProcessUtils","DS/SMAProcWebCMMUtils/SMAJSCMMAuthoringUtils","DS/ApplicationFrame/FrameWindowsManager","DS/ApplicationFrame/FrameWindow","DS/SMAProcWebCMMUtils/PubSub","text!DS/SMAProcWebAuthoringUI/nTwoViewWebInWinEditor.html","css!DS/SMAProcWebAuthoringUI/nTwoViewWebInWinEditor.css","DS/SMAProcWebAuthoringUI/nTwoView","DS/SMAProcWebAuthoringUI/DataflowEditor"],function(c,f,a,e,b,i,j,g,h,d){e.registerDomModule(d);return window.Polymer({is:"cmp-nTwoView-webinwin-editor",properties:{sourceActivity:{type:Object},destinationActivities:{type:Array,value:[]},mode:{type:String,value:"AtoA"}},ready:function(){var n=(new URL(document.location)).searchParams,l=n.get("fromSideDataContainer"),k=n.get("toSideDataContainer"),m=n.get("processId");this.toSideDataContainer=k;this.fromSideDataContainer=l;b.loadProcess(m,{onSuccess:this.loadnTwoView.bind(this),onFailure:function(o){logger.log("Failed to get process"+o)}})},createAfrWindow:function(){this.frmWindow=new g({workbench:"",workbenchModule:"SMAProcWebApp",height:"100%",width:"100%",viewer:"none",viewerOptions:{antiAliasing:true,useShadowMap:false,infinitePlane:false,displayGrid:false,displayLines:false,control:"SIMPLE",ssao:false,debugShadowLight:false,debugBSphere:false,debugBBox:false},uiOptions:{displayActionBar:false,displayTree:false}}).inject(this.$.nTwoContainer)},loadnTwoView:function(l){i.setCurrentProcess(l);this.createAfrWindow();this.nTwo=document.createElement("cmp-ntwo-view");var k;if(this.frmWindow){k=this.frmWindow.getUIFrame()}if(k){k.style.backgroundColor="white";k.insertBefore(this.nTwo,k.firstChild);this.addButtons(k)}this.addAllEventListeners()},winCallBack:function(l,k){switch(l){case"Win_Response":h.dispatch("Win_Response",k);break}},_loadDataFlowTable:function(m){var l,k;this.dataFlowTable=document.createElement("cmp-dataflow-editor-modal");this.dataFlowTable.toggleActivitySelection(m,"GRAPH",true);l=j.getFrameWindow();k=l&&l.getUIFrame();if(k){this.dataFlowTable.addEventListener("onClose",function(){this.nTwo.unHighlightAllEdges();this.dataFlowTable=null;this.sourceActivity=null;this.destinationActivities=[];this.nTwo.sourceActivity=null;this.nTwo.destinationActivities=[]}.bind(this),false);k.appendChild(this.dataFlowTable)}},addButtons:function(k){this.buttonsDiv=new c.createElement("div",{styles:{overflow:"hidden",position:"fixed",top:"0px",left:"0px",margin:"10px 20px"}});this.unmappedtogglebutton=new f({type:"switch",label:"Unmapped Activities",checkFlag:true,allowUnsafeHTMLLabel:false});this.unmappedtogglebutton.inject(this.buttonsDiv);this.unmappedtogglebutton.addEventListener("change",function(l){this.nTwo.updateCurrentnTwoGraph(l.dsModel.checkFlag,this.mode)}.bind(this));this.unmappedtogglebutton.addEventListener("modechanged",function(l){this.mode=l.detail.tabMode}.bind(this));k.appendChild(this.buttonsDiv)},highlightDataPaths:function(k){if(k.detail.dataPaths){this.nTwo.highlightDataPaths(k.detail.dataPaths);this.nTwo.getActivityView(this.sourceActivity).highlight()}else{if(k.detail.dataPaths===null){this.nTwo.highlightEdges(this.sourceActivity,this.destinationActivities,this.mode)}}},addAllEventListeners:function(){this.addEventListener("dataPathsEvent",this.highlightDataPaths.bind(this));this.nTwo.addEventListener("nTwoTextClicked",function(l){this.querySelector("cmp-review-mapping")&&this.querySelector("cmp-review-mapping").disableParameterPath();this.querySelector("cmp-parameter-table")&&this.querySelector("cmp-parameter-table").disableParameterPath();var k,m;if(l.detail.startNode&&l.detail.endNode){k=i.getFIFromId(l.detail.startNode);m=i.getFIFromId(l.detail.endNode)}if(!this.dataFlowTable){this._loadDataFlowTable()}this.dataFlowTable.updateSelection(k||this.sourceActivity,m?[m]:[],"N2VIEW");this.nTwo.sourceActivity=this.dataFlowTable.getSourceActivity();this.nTwo.destinationActivities=this.dataFlowTable.getDestinationActivities();this.nTwo.highlightEdges(this.dataFlowTable.getSourceActivity(),this.dataFlowTable.getDestinationActivities(),this.dataFlowTable.getMode());this.nTwo.highlightNodes(this.dataFlowTable.getSourceActivity(),this.dataFlowTable.getDestinationActivities());this.mode=this.dataFlowTable.dataFlowEditor.mode}.bind(this));this.addEventListener("toggleselection",function(k){this.querySelector("cmp-review-mapping")&&this.querySelector("cmp-review-mapping").disableParameterPath();this.querySelector("cmp-parameter-table")&&this.querySelector("cmp-parameter-table").disableParameterPath();if(!this.dataFlowTable){this._loadDataFlowTable()}this.dataFlowTable.dataFlowEditor.toggleActivitySelection(k.detail.activity,"N2VIEW")}.bind(this));this.addEventListener("highlightNodesandEdges",function(k){this.nTwo.highlightNodes(k.detail.sourceActivity,k.detail.destinationActivities);this.nTwo.highlightEdges(k.detail.sourceActivity,k.detail.destinationActivities,k.detail.mode);this.sourceActivity=k.detail.sourceActivity;this.destinationActivities=k.detail.destinationActivities;this.mode=k.detail.mode}.bind(this));this.addEventListener("unhighlightOldSourceActivity",function(k){if(k.detail.oldActivity){this.nTwo.getGraphNode(k.detail.oldActivity).views.main.display.elt.unhighlight()}});this.addEventListener("invalidNtwoViewActivitySelection",function(l){var n=l.detail.activity;var k=l.detail.message;var m;if(n){m=this.nTwo.getActivityView(n);if(m){m.notify(k)}}return null});this.addEventListener("refreshnTwoViewWebinWinEditor",function(){this.nTwo.updateCurrentnTwoGraph(this.unmappedtogglebutton.checkFlag)})}})});