/*!  Copyright 2016 Dassault Systemes. All rights reserved. */
define("DS/CAT3DAnnotationModel/CAT3DAnnotationModel",[],function(){});define("DS/CAT3DAnnotationModel/CAT3DAnnotationNode",["DS/Visualization/Node3D","DS/WebappsUtils/WebappsUtils"],function(c,b){var d;var a=c.extend({init:function(j){var f=j||{};this._parent();var h;var e;var i=false;var k;this.getAnnotationClassType=function(){return"tps"};this.getAnnotationType=function(){return f.type};this.getAnnotationSupertype=function(){if(e){return e}var l={1:1,2:1,3:1,4:1,5:2,6:2,7:3,8:3,9:3,10:3,11:3,12:4,13:4,14:4,15:4,16:4,17:5,18:5,19:6,20:6,21:6,22:7,23:7,24:7,25:7,26:7,27:7,28:7,29:1,30:1,31:1,32:2,33:2,34:1,35:1,36:1,37:4,38:4,40:8,41:8,42:8,43:8,44:8,45:8,46:8,47:9,51:10,54:8};e=l[f.type];return e};this.getAnnotationName=function(){return f.name};this.getAnnotationUuid=function(){return f.uuid};this.getAnnotationIcon=function(){if(h){return h}var m={1:"I_W3DAnnot_Text",2:"I_W3DAnnot_FlagNote",3:"I_W3DAnnot_Datum",4:"I_W3DAnnot_NonSemanticGDT",5:"I_W3DAnnot_Datum",6:"I_W3DAnnot_DatumTarget",7:"I_W3DAnnot_Position",8:"I_W3DAnnot_Concentricity",9:"I_W3DAnnot_Symmetry",10:"I_W3DAnnot_Profline",11:"I_W3DAnnot_Profsurf",12:"I_W3DAnnot_Linear",13:"I_W3DAnnot_Angular",14:"I_W3DAnnot_Linear",15:"I_W3DAnnot_Linear",16:"I_W3DAnnot_BasicDim",17:"I_W3DAnnot_TotalRO",18:"I_W3DAnnot_CircularRO",19:"I_W3DAnnot_Parallelism",20:"I_W3DAnnot_Perpendicularity",21:"I_W3DAnnot_Angularity",22:"I_W3DAnnot_Straightness",23:"I_W3DAnnot_Flatness",24:"I_W3DAnnot_Circularity",25:"I_W3DAnnot_Cylindricity",26:"I_W3DAnnot_Profline",27:"I_W3DAnnot_Profsurf",28:"I_W3DAnnot_Position",29:"I_W3DAnnot_Roughness",30:"I_W3DAnnot_NOA",31:"I_W3DAnnot_Weld",32:"I_W3DAnnot_ReferenceFrame",33:"I_W3DAnnot_Datum",34:"I_W3DAnnot_Dimension",35:"I_W3DAnnot_DatumTarget",36:"I_W3DAnnot_CoordDim",37:"I_W3DAnnot_OrientedAngular",38:"I_W3DAnnot_OrientedLinear",40:"I_W3DAnnot_CGPoint",41:"I_W3DAnnot_CGLine",42:"I_W3DAnnot_CGPlane",43:"I_W3DAnnot_CGCircle",44:"I_W3DAnnot_CGCylinder",45:"I_W3DAnnot_CGCurve",46:"I_W3DAnnot_CGThread",47:"I_W3DAnnot_KnowledgeAttribute",51:"I_W3DAnnot_RestrictedArea",54:"I_W3DAnnot_CGCylinder"};var l=m[f.type];if(l){h=b.getWebappsAssetUrl("CAT3DAnnotationRsc","icons/22/")+l+".png"}return h};this.addLinkedData=function(l){if(!l){return}if(!k){k={}}if(l.type===-1){if(!k.hyperlinksAndComments){k.hyperlinksAndComments={}}k.hyperlinksAndComments.hiddenText=l.text}else{if(l.type===0){if(!k.hyperlinksAndComments){k.hyperlinksAndComments={}}if(!k.hyperlinksAndComments.urls){k.hyperlinksAndComments.urls=[]}k.hyperlinksAndComments.urls.push({title:l.anchorText,url:l.address})}else{if(l.type&(1<<8)){if(!k.relatedDocs){k.relatedDocs=[]}k.relatedDocs.push(l)}else{if(l.type&(1<<9)){if(!k.requirements){k.requirements=[]}k.requirements.push(l)}else{if(l.type==="failureModes"){k.failureModes=l.data}}}}}};this.getAnnotationHyperlinkData=function(){return k};this.getAnnotationID=function(){return f.tpsID};this.getAnnotationTTRS=function(){return f.ttrs};this.setDisplayFlag=function(l){if(l===i){return}i=l};this.getDisplayFlag=function(){return i};d=f.onAnnotationAttrModifiedCB;var g;if(f.hyperlinksData&&f.hyperlinksData.length){for(g=0;g<f.hyperlinksData.length;g++){if(f.hyperlinksData[g].type===0||f.hyperlinksData[g].type===-1){this.addLinkedData(f.hyperlinksData[g])}}}if(f.failureModes&&f.failureModes.length){this.addLinkedData({type:"failureModes",data:f.failureModes})}if(f.Text){this.getText=function(){return f.Text}}if(f.NOAText){this.getNOAText=function(){return f.NOAText}}if(f.NOAType){this.getNOAType=function(){return f.NOAType}}this.visible=true;this.setVisibilityFree(false)},setVisibility:function(e){if(e===this.visible){return}this._parent(e);this.setVisibilityFree(e===false);d(this,"visibility")},toJSON:function(){if(!this.jsonObject){var j=this.isDefaultAnnotation?this.isDefaultAnnotation():undefined;var f=this.getAnnotationToleranceValue?this.getAnnotationToleranceValue():undefined;var e=this.getAnnotationToleranceZoneValue?this.getAnnotationToleranceZoneValue():undefined;var k=this.getAnnotationDimensionLimits?this.getAnnotationDimensionLimits():undefined;var h=this.getGeneralTolerance?this.getGeneralTolerance():undefined;var i=this.getTabulatedLimit?this.getTabulatedLimit():undefined;this.jsonObject={};if(this.getAnnotationID()!==undefined){this.jsonObject.id=this.getAnnotationID()}if(this.getAnnotationName()!==undefined){this.jsonObject.name=this.getAnnotationName()}if(this.getAnnotationIcon()!==undefined){this.jsonObject.icon=this.getAnnotationIcon()}if(this.getAnnotationType()!==undefined){this.jsonObject.type=this.getAnnotationType()}if(this.getAnnotationSupertype()!==undefined){this.jsonObject.superType=this.getAnnotationSupertype()}if(this.getAnnotationTTRS()!==undefined){this.jsonObject.ttrs=this.getAnnotationTTRS()}if(this.getText){this.jsonObject.text=this.getText()}if(this.getNOAText){this.jsonObject.noaText=this.getNOAText()}if(this.getNOAType){this.jsonObject.noaType=this.getNOAType()}if(j!==undefined){this.jsonObject.isDefaultAnnot=j}if(f!==undefined){this.jsonObject.toleranceValue=f}if(e!==undefined){this.jsonObject.toleranceZoneValue=e}if(k!==undefined){this.jsonObject.toleranceLimits=k}if(h!==undefined){this.jsonObject.generalTolerance=h}if(i!==undefined){this.jsonObject.tabulatedLimit=i}}if(this.children&&this.children.length&&this.children[0].getAnnotationClassType){if(!this.jsonObject.children){this.jsonObject.children=[]}this.jsonObject.children.splice(0,this.jsonObject.children.length);for(var g=0;g<this.children.length;g++){this.jsonObject.children.push(this.children[g].toJSON())}}if(this.getDisplayFlag()!==undefined){this.jsonObject.displayFlag=this.getDisplayFlag()}if(this.getAnnotationHyperlinkData()!==undefined){this.jsonObject.hyperlink=this.getAnnotationHyperlinkData()}this.jsonObject.isVisible=this.isVisible();return this.jsonObject}});return a});define("DS/CAT3DAnnotationModel/CAT3DAnnotationSetNode",["DS/CAT3DAnnotationModel/CAT3DAnnotationNode","DS/WebappsUtils/WebappsUtils"],function(b,c){var a=b.extend({init:function(h){var e=h||{};this._parent(e);var g;var d=[];var f;this.getAnnotationIcon=function(){if(g){return g}g=c.getWebappsAssetUrl("CAT3DAnnotationRsc","icons/22/");g+="I_W3DAnnot_NodeAnnotationSet.png";return g};this.getAnnotationClassType=function(){return"tpsAnnotationSet"};this.getAnnotationType=function(){return 0};this.getRootAnnotationNode=function(i){for(var j=0;j<this.children.length;j++){if(this.children[j].getAnnotationType()===i){return this.children[j]}}return undefined};this.getContextType=function(){return e.contextType};this.addTTRS=function(k){if(k&&k.GeoP&&k.tpsID){var i=[],n,j;for(var l=0;l<k.GeoP.length;l++){j=[];n=false;for(var m=0;m<k.GeoP[l].length;m++){if(k.GeoP[l][m]!==0||n){j.push(k.GeoP[l][m]);n=true}}if(j.length){i.push(j)}}if(i.length){d.push({geoP:i,tpsID:k.tpsID})}}};this.getTTRSs=function(){return d};this.addReferenceFrame=function(i){if(!f){f=[]}f.push({datums:i.datums,tpsID:i.tpsID,uuid:i.uuid})};this.getReferenceFrames=function(){return f}},toJSON:function(){this._parent();if(this.getSemanticStandards&&this.getSemanticStandards()!==undefined){this.jsonObject.semanticStandards=this.getSemanticStandards()}if(this.getAnnotationIcon()!==undefined){this.jsonObject.icon=this.getAnnotationIcon()}if(this.getContextType()!==undefined){this.jsonObject.contextType=this.getContextType()}if(this.getAnnotationType()!==undefined){this.jsonObject.type=this.getAnnotationType()}return this.jsonObject}});return a});define("DS/CAT3DAnnotationModel/CAT3DAnnotationRootNode",["DS/CAT3DAnnotationModel/CAT3DAnnotationNode"],function(a){var b=a.extend({init:function(d){var d=d||{};this._parent(d);var c;this.getAnnotationClassType=function(){return"tpsRoot"};this.getAnnotationType=function(){if(d.rootType===1){return"RootViews"}else{if(d.rootType===2){return"RootCaptures"}else{if(d.rootType===3){return"RootNonSemantic"}else{if(d.rootType===4){return"RootDatums"}else{if(d.rootType===5){return"RootPositions"}else{if(d.rootType===6){return"RootDimensions"}else{if(d.rootType===7){return"RootRunOuts"}else{if(d.rootType===8){return"RootOrientations"}else{if(d.rootType===9){return"RootForms"}else{if(d.rootType===10){return"RootGeometries"}else{if(d.rootType===11){return"RootAttributes"}else{if(d.rootType===12){return"RootRestrictedArea"}}}}}}}}}}}}};this.getAnnotationUuid=function(){return""+d.rootType};this.getAnnotationCategory=function(){return};this.toJSONObject=function(){if(!c){c={classType:this.getAnnotationClassType(),annotType:this.getAnnotationType(),isVisible:this.isVisible(),children:[]}}else{c.isVisible=this.isVisible();c.children.splice(0,c.children.length);for(var e=0;e<this.children.length;e++){c.children.push(this.children[e].toJSONObject())}}return c}},toJSON:function(){this._parent();if(this.getAnnotationType()!==undefined){this.jsonObject.type=this.getAnnotationType()}if(!this.jsonObject.children){this.jsonObject.children=[]}this.jsonObject.children.splice(0,this.jsonObject.children.length);for(var c=0;c<this.children.length;c++){this.jsonObject.children.push(this.children[c].toJSON())}return this.jsonObject}});return b});define("DS/CAT3DAnnotationModel/CAT3DAnnotationCaptureNode",["DS/CAT3DAnnotationModel/CAT3DAnnotationNode","DS/WebappsUtils/WebappsUtils"],function(a,c){var b=a.extend({init:function(g){var e=g||{};this._parent(e);var h=e.thumbnail?"data:image/png;base64,"+e.thumbnail:null;var f;var d;this.getAnnotationIcon=function(){if(f){return f}f=c.getWebappsAssetUrl("CAT3DAnnotationRsc","icons/22/");f+="I_W3DAnnot_CaptureAnnotations.png";return f};this.getPointedView=function(){return e.view};this.setPreview=function(i){h=i};this.getPreview=function(){return h};this.getAnnotationClassType=function(){return"tpsCapture"};this.getAnnotationType=function(){return 6};this.getCaptureCamera=function(){return e.camera};this.getVisibleAnnotations=function(r){var m=[];var u=r.getLastElement?r.getLastElement(true):r;var w,s,v,p;if(e.TPSs){for(var l=0;l<e.TPSs.length;l++){var n=false;var t=u.children;for(v=0;v<t.length;v++){s=t[v];if(s.getAnnotationType()!=="RootViews"&&s.getAnnotationType()!=="RootCaptures"){var j=s.children;for(p=0;p<j.length;p++){if(j[p].getAnnotationID()===e.TPSs[l]){if(r.getLastElement){w=r.clone();w.addElement(s);w.addElement(j[p]);m.push(w)}else{m.push(j[p])}n=true;break}}}if(n){break}}}}for(var q=0;q<3;q++){var k=null;var o=null;if(q===0){k=e.CGs;o="RootGeometries"}else{if(q===1){k=e.Views;o="RootViews"}else{if(q===1){k=e.Caps;o="RootCaptures"}}}if(k&&k.length){s=u.getRootAnnotationNode(o);if(s){for(v=0;v<k.length;v++){var i=s.children;for(p=0;p<i.length;p++){if(i[p].getAnnotationID()===k[v]){if(r.getLastElement){w=r.clone();w.addElement(s);w.addElement(i[p]);m.push(w)}else{m.push(i[p])}break}}}}}}return m};this.isSectionPlaneActivated=function(){return e.ClipPla===1};this.getHiddenBodiesInst=function(){return e.HiddenBodyInst};this.getVisibleBodiesInst=function(){return e.VisibleBodyInst};this.getVisibleCompRelIds=function(){return e.VisibleCompRelId};this.getXMLVisibleCompRelIds=function(){return e.VisibleCompXmlId};this.getAnnotationSupertype=function(){return 11};this.setListsOfAssyPathComponents=function(i,k){d={visiblePaths:[],hiddenPaths:[]};var j;for(j=0;j<i.length;j++){d.visiblePaths.push(i[j].clone())}for(j=0;j<k.length;j++){d.hiddenPaths.push(k[j].clone())}};this.getListsOfAssyPathComponents=function(){return d}},toJSON:function(){if(!this.jsonObject){this._parent();var f=[];var i=this.parents[0].parents[0];var h=this.getVisibleAnnotations(i);for(var e=0;e<h.length;e++){var d=h[e].parents[0];var j=null,k=null,g;for(g=0;g<i.children.length;g++){if(d.getAnnotationType()===i.children[g].getAnnotationType()){j=g;break}}for(g=0;g<i.children[j].children.length;g++){if(h[e].getAnnotationID()===i.children[j].children[g].getAnnotationID()){k=g;break}}if(j!==null&&k!==null){f.push([j,k])}}if(this.getAnnotationIcon()!==undefined){this.jsonObject.icon=this.getAnnotationIcon()}if(this.getAnnotationType()!==undefined){this.jsonObject.type=this.getAnnotationType()}if(this.getAnnotationSupertype()!==undefined){this.jsonObject.superType=this.getAnnotationSupertype()}if(this.getPointedView()!==undefined){this.jsonObject.pointedView=this.getPointedView()}if(this.getVisibleBodiesInst()!==undefined){this.jsonObject.visibleBodiesInst=this.getVisibleBodiesInst()}if(this.getHiddenBodiesInst()!==undefined){this.jsonObject.hiddenBodiesInst=this.getHiddenBodiesInst()}if(this.getCaptureCamera()!==undefined){this.jsonObject.camera=this.getCaptureCamera()}if(f!==undefined){this.jsonObject.tpsList=f}}else{this._parent()}if(this.getPreview()!==undefined){this.jsonObject.preview=this.getPreview()}return this.jsonObject}});return b});define("DS/CAT3DAnnotationModel/CAT3DAnnotationViewNode",["DS/CAT3DAnnotationModel/CAT3DAnnotationNode","DS/WebappsUtils/WebappsUtils"],function(b,c){var a=b.extend({init:function(d){var d=d||{};this._parent(d);var i=d.thumbnail?"data:image/png;base64,"+d.thumbnail:null;var h=false;var g=[];var f;var e;this.getAnnotationIcon=function(){if(f){return f}var j=this.getAnnotationType();var k=this.isMultiSectionView();f=c.getWebappsAssetUrl("CAT3DAnnotationRsc","icons/22/");if(j===1&&!k){f+="I_W3DAnnot_ProjectionView"}else{if(j===2||k){f+="I_W3DAnnot_SectionView"}else{if(j===3){f+="I_W3DAnnot_SectionCutView"}else{f+="I_W3DAnnot_AxoView"}}}f+=".png";return f};this.isSubView=function(){return h};this.setIsSubView=function(j){h=j};this.setPreview=function(j){i=j};this.getPreview=function(){return i};this.getAnnotationClassType=function(){return"tpsView"};this.getViewType=function(){if(e){return e}var k=this.isMultiSectionView();var j=this.getAnnotationType();if(j===1&&!k){e="ProjectionView"}else{if(j===2||k){e="SectionView"}else{if(j===3){e="SectionCutView"}else{e="AxonometricView"}}}return e};this.getViewPlane=function(){return d.viewPlane};this.getViewPlaneInformations=function(){return{direction:d.viewDirection,origin:d.viewOrigin,normal:d.viewNormal}};this.getCappingRep=function(){return d.cappingRep};this.getReframeArea=function(){return d.reframeArea};this.getVisibleAnnotations=function(r,z){var w=r.getLastElement?r.getLastElement(true):r;var o=[];var y;if(d.TPSs){for(var l=0;l<d.TPSs.length;l++){var p=false;var x=w.children;for(var v=0;v<x.length;v++){var t=x[v];if(t.getAnnotationType()!=="RootViews"&&t.getAnnotationType()!=="RootCaptures"){var j=t.children;for(var q=0;q<j.length;q++){if(j[q].getAnnotationID()===d.TPSs[l]){if(r.getLastElement){y=r.clone();y.addElement(t);y.addElement(j[q]);o.push(y)}else{o.push(j[q])}p=true;break}}}if(p){break}}}}var n=[];if(o&&o.length&&z){var u=w.getRootAnnotationNode("RootGeometries");if(u){for(var v=0;v<o.length;v++){var k=o[v].getLastElement?o[v].getLastElement(true):o[v];if(k.getAnnotationTTRS){var m=k.getAnnotationTTRS();if(m){var s=u.children;for(var q=0;q<s.length;q++){if(s[q].getAnnotationTTRS()&&s[q].getAnnotationTTRS().equals(m)){if(r.getLastElement){y=r.clone();y.addElement(u);y.addElement(s[q]);n.push(y)}else{n.push(s[q])}}}}}}}}return o.concat(n)};this.isMultiSectionView=function(){if(d.multiClipping){if(d.multiClipping.SketchNormal&&d.multiClipping.SketchOrigin){if(d.multiClipping.views&&d.multiClipping.views.length&&d.multiClipping.views.length>1){if(d.multiClipping.pointsDef&&d.multiClipping.pointsDef.length){return true}}}}return false};this.getMultiSectionData=function(){return d.multiClipping};this.setAssociatedCapture=function(j){g.push(j)};this.getAssociatedCapture=function(){return g};this.getTPSList=function(){return d.TPSs};this.getAnnotationSupertype=function(){return 11}},toJSON:function(){if(!this.jsonObject){this._parent();var i=this.parents[0].parents[0];var h=this.getVisibleAnnotations(i,true);var f=[];for(var e=0;e<h.length;e++){var d=h[e].parents[0];var j=null;var k=null;for(var g=0;g<i.children.length;g++){if(d.getAnnotationType()===i.children[g].getAnnotationType()){j=g;break}}for(var g=0;g<i.children[j].children.length;g++){if(h[e].getAnnotationID()===i.children[j].children[g].getAnnotationID()){k=g;break}}if(j!==null&&k!==null){f.push([j,k])}}if(this.getAnnotationIcon()!==undefined){this.jsonObject.icon=this.getAnnotationIcon()}if(this.getAnnotationType()!==undefined){this.jsonObject.type=this.getAnnotationType()}if(this.getAnnotationSupertype()!==undefined){this.jsonObject.superType=this.getAnnotationSupertype()}if(this.isSubView()!==undefined){this.jsonObject.isSubView=this.isSubView()}if(this.getAssociatedCapture()!==undefined){this.jsonObject.associatedCapture=this.getAssociatedCapture()}if(this.isMultiSectionView()!==undefined){this.jsonObject.isMultiSectionView=this.isMultiSectionView()}if(this.getViewPlaneInformations()!==undefined){this.jsonObject.viewPlaneInformations=this.getViewPlaneInformations()}if(this.getMultiSectionData()!==undefined){this.jsonObject.multiSectionData=this.getMultiSectionData()}if(this.getReframeArea()!==undefined){this.jsonObject.reframeArea=this.getReframeArea()}if(f!==undefined){this.jsonObject.tpsList=f}}else{this._parent()}if(this.getPreview()!==undefined){this.jsonObject.preview=this.getPreview()}return this.jsonObject}});return a});define("DS/CAT3DAnnotationModel/CAT3DAnnotationLoader",["UWA/Core","DS/CAT3DAnnotationModelLoader/CAT3DAnnotationVisuLoader","DS/Visualization/ThreeJS_DS","DS/Visualization/Node3D","DS/Visualization/LoaderUtils","DS/CAT3DAnnotationModel/CAT3DAnnotationNode","DS/CAT3DAnnotationModel/CAT3DAnnotationViewNode","DS/CAT3DAnnotationModel/CAT3DAnnotationSetNode","DS/CAT3DAnnotationModel/CAT3DAnnotationRootNode","DS/CAT3DAnnotationModel/CAT3DAnnotationCaptureNode"],function(d,h,i,f,c,e,g,b,k,j){var a=h.extend({init:function(m){var l=m||{};this._parent(l);var n=this;this.getType=function(){return"NoSemantic"};this.createAnnotationSet=function(s,q,o){var t=new b(d.extend(o,{onAnnotationAttrModifiedCB:q},true));if(s!==undefined&&s!==null){t.setVisibility(s)}for(var r=0;r<12;r++){var p=new k({annotController:n,rootType:r+1});t.addChild(p)}return t};this.postProcessViewsAndCaptures=function(o){var p=o.getRootAnnotationNode("RootCaptures");var u=o.getRootAnnotationNode("RootViews");var v,s,t;if(u&&u.children.length){for(v=0;v<u.children.length;v++){t=u.children[v];var r=t.getMultiSectionData?t.getMultiSectionData():null;if(r&&r.views){for(s=0;s<r.views.length;s++){u.children[r.views[s]-1].setIsSubView(true)}}}}if(p&&p.children.length&&u&&u.children.length){for(v=0;v<p.children.length;v++){var w=p.children[v];var q=w.getPointedView();if(q){for(s=0;s<u.children.length;s++){t=u.children[s];if(t.getAnnotationID()===q){t.setAssociatedCapture(w.getAnnotationID())}}}}}};this.isAnnotationCorrect=function(o){if(!o){return false}if(o.getAnnotationType()===null||o.getAnnotationType()===undefined||isNaN(o.getAnnotationType())){return false}if(o.getAnnotationClassType()==="tps"&&(o.getAnnotationType()>54||o.getAnnotationType()<=0)){return false}return true}},loadAnnotation:function(s){var v;if(s.nodeInfo.type===6){return}else{if(s.nodeInfo.nodeXMLtype==="AnnotationSet"){if(s.nodeInfo.standards||s.nodeInfo.standardNorms){s.annotationSetNode.getSemanticStandards=function(){return{standards:s.nodeInfo.standards,defaultSpecs:s.nodeInfo.standardNorms,stdName:s.nodeInfo.standard}}}if(s.nodeInfo.hyperlinksData&&s.nodeInfo.hyperlinksData.length){var n=[];for(v=0;v<s.nodeInfo.hyperlinksData.length;v++){if(s.nodeInfo.hyperlinksData[v].type&2){n.push(s.nodeInfo.hyperlinksData[v])}}if(n.length){s.annotationSetNode.getLinkedDataRelatedInfos=function(){return n}}}}else{var w=Object.keys(s.nodeInfo);if(w.length){var o={onAnnotationAttrModifiedCB:s.cb,reps:[]};for(var p=0;p<w.length;p++){if(w[p]==="cappingRep"){o.cappingRep=this.createCappingRep(s.nodeInfo)}else{if(w[p]==="planeInfos"){var t=s.nodeInfo.planeInfos.direction;o.viewDirection=new i.Vector3(t.x,t.y,t.z);var r=s.nodeInfo.planeInfos.normal;o.viewNormal=new i.Vector3(r.x,r.y,r.z);var u=s.nodeInfo.planeInfos.origin;o.viewOrigin=new i.Vector3(u.x,u.y,u.z)}else{o[w[p]]=s.nodeInfo[w[p]]}}}var m;var q=-1;if(s.nodeInfo.nodeXMLtype==="TPS"||s.nodeInfo.nodeXMLtype==="TPSCG"){m=new e(o);q=m.getAnnotationSupertype()+1}else{if(s.nodeInfo.nodeXMLtype==="TPSView"){q=0;m=new g(o)}else{if(s.nodeInfo.nodeXMLtype==="TPSCap"){q=1;m=new j(o)}}}if(q!==-1&&s.annotationSetNode&&s.annotationSetNode.children[q]&&this.isAnnotationCorrect(m)){s.annotationSetNode.children[q].addChild(m);s.nodeInfo.rootIndex=q}if(s.nodeInfo.nodeXMLtype.indexOf("TPSAttribute")===-1){if(s.nodeInfo.toleranceZoneValue!==undefined){m.getAnnotationToleranceZoneValue=function(){return s.nodeInfo.toleranceZoneValue}}if(s.nodeInfo.dimensionLimits!==undefined){m.getAnnotationDimensionLimits=function(){return s.nodeInfo.dimensionLimits}}if(s.nodeInfo.genTol!==undefined){m.getGeneralTolerance=function(){return s.nodeInfo.genTol}}if(s.nodeInfo.tabLimit!==undefined){m.getTabulatedLimit=function(){return s.nodeInfo.tabLimit}}if(s.nodeInfo.hyperlinksData&&s.nodeInfo.hyperlinksData.length){var l=[];for(v=0;v<s.nodeInfo.hyperlinksData.length;v++){if(s.nodeInfo.hyperlinksData[v].type&2){l.push(s.nodeInfo.hyperlinksData[v])}}if(l.length){m.getLinkedDataRelatedInfos=function(){return l}}}}if(s.nodeInfo.reps){this.createReps(s.nodeInfo,s.processText,s.annotationSetNode.getContextType(),m)}}}}}});return a});