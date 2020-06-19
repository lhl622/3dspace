define("DS/DibUDLWebLoader/DifUDLWebLoader",["UWA/Core","UWA/Class","DS/ZipJS/zip-fs","DS/Visualization/Node3D","DS/Visualization/ModelLoader","DS/Visualization/ThreeJS_DS","DS/DibWebUtils/DibQueryToolbox"],function(d,b,a,g,c,f,e){var h=b.extend({init:function(){var B=this;var r;var u=[];var C=new Map();var v=new Map();var t=new Map();var y=new Map();var o=[];var i=[];var F=1;var w;var l;var n=0;var E=function(G){if(G=="DIFSheet"){return true}return false};var x=function(G){if(G=="DIFView"){return true}return false};var j=function(G){if(G=="DIFViewInstance"){return true}return false};var p=function(G){if(G=="DIFViewStreamInstance"||G=="DIFBackgroundViewRepInstance"){return true}return false};var A=function(G){if(G=="DIFViewStream"||G=="DIFBackgroundViewRep"){return true}return false};var z=function(G){return C.get(G).Name};var k=function(G){return new f.Color().setRGB(1,1,1)};var D=function(H,K,J,I){var G=y.get(H.BackgroundViewInstance.viewStream.ID);K.addChild(G);H.views.forEach(function(M){var Q;var P=M.Angle;if(M.view.ScaleStatus==="OnReference"){Q=M.view.Scale}else{Q=M.Scale}var L=new f.Matrix4();L.setPosition(new f.Vector3(M.X,M.Y,0));var N=[Math.cos(P)*Q,Math.sin(P)*Q,0,-Math.sin(P)*Q,Math.cos(P)*Q,0,0,0,1];L.setRotation(N);var O=y.get(M.view.viewStreamInstance.viewStream.ID);O.setMatrix(L);K.addChild(O)});J()};var m=function(M,O,K,G){var U=O.cgr;var P=M.find(U);var J=new zip.BlobWriter();var Q=new g();var S=new f.Matrix4();S.setPosition(new f.Vector3(0,0,0));var L=[1,0,0,0,1,0,0,0,1];S.setRotation(L);Q.setMatrix(S);var R=0;var T=new c();T.setFileType("cgr");T.setOnLoadedCallback(function(){K(Q)});P.getData(J,function(W){var V=new FileReader();V.onload=function(){T.loadModelFromBuffer(this.result,Q)};V.readAsArrayBuffer(W)});var H=O.cgr_texts;if(H!==""){var N=M.find(H);var I=new zip.BlobWriter();N.getData(I,function(W){var V=new FileReader();V.onload=function(){T.loadModelFromBuffer(this.result,Q)};V.readAsArrayBuffer(W)})}};var s=function(H){var G;H.results.forEach(function(I){if(I.attributes){var N={};I.attributes.forEach(function(O){N[O.name]=O.value});if(N.did){t.set(N.did,N)}}else{if(I.path){var L;var J;var M;var K;I.path.forEach(function(V){var R=V.toString();var U=t.get(R);if(U){if(E(U["ds6w:type"])){if(!G||G.ID!=U.physicalid){var S={views:[]};S.ID=U.physicalid;S.Name=U["bo.PLMEntity.V_Name"];S.Height=parseFloat(U["bo.DIFAbstractSheet.V_DIFFormatHeight"]);S.Width=parseFloat(U["bo.DIFAbstractSheet.V_DIFFormatWidth"]);G=S;u.push(G)}}if(j(U["ds6w:type"])){var Q={};Q.ID=U.physicalid;Q.Scale=parseFloat(U["ro.DIFAbstractViewInstance.V_DIFScale"]);Q.X=parseFloat(U["ro.DIFAbstractViewInstance.V_DIFPosX"]);Q.Y=parseFloat(U["ro.DIFAbstractViewInstance.V_DIFPosY"]);Q.Angle=parseFloat(U["ro.DIFAbstractViewInstance.V_DIFAngle"]);L=Q;G.views.push(L)}if(x(U["ds6w:type"])){var P={};P.ID=U.physicalid;P.Scale=parseFloat(U["bo.DIFAbstractView.V_DIFScale"]);P.ScaleStatus=U["bo.DIFAbstractView.V_DIFScaleStatus"];J=P;L.view=J}if(p(U["ds6w:type"])){var T={};T.ID=U.physicalid;M=T;if(J){J.viewStreamInstance=T}else{G.BackgroundViewInstance=T}}if(A(U["ds6w:type"])){var O={};O.ID=U.physicalid;M.viewStream=O}}});var L=null;var J=null;var M=null}}})};var q=function(N,L,J,H){if(!N){console.log("Please provide sheet ID");H()}var O=v.get(N);if(O){L(O);J();return}var K=C.get(N);if(!K){console.log("Sheet not found");H()}var G=[];if(K.BackgroundViewInstance){if(K.BackgroundViewInstance.viewStream){G.push(K.BackgroundViewInstance.viewStream.ID)}}K.views.forEach(function(P){if(P.view){if(P.view.viewStreamInstance.viewStream){G.push(P.view.viewStreamInstance.viewStream.ID)}}});var I=new g();L(I);if(v.size>=n){v["delete"](N)}v.set(N,I);var M={objectPhysicalid:G,serverUrl:w,securityContext:l,onComplete:function(Q){if(!Q.results){console.log("DifUDLWebLoader : No UDL retrieved");H()}var R=Q.results.length;var P=0;Q.results.forEach(function(T){if(d.is(T.attributes,"array")){var S;T.attributes.forEach(function(V){if(V.name=="resourceid"){S=V.value}if(V.name=="udl"){var U=new a.fs.FS();var W={provider:"FILE",filename:V.value,serverurl:"",proxyurl:"none",requiredAuth:null};U.importHttpContent(W,false,function(){var X="DrwStructure.json";var Y=U.find(X);if(null===Y){param.onFailure();return}Y.getText(function(aa){var Z=JSON.parse(aa.target.result);m(U,Z.View,function(ab){y.set(S,ab);P++;if(R==P){D(K,I,J,H)}},function(){console.log("UDL - ZIP open fails");H()})})},function(){console.log("UDL - ZIP open fails");H()})}})}})},onFailure:H};e.getUDLData(M)};this.getNumberOfSheets=function(){return u.length};this.getSheetName=function(G){return z(G)};this.getLoadedSheetsId=function(){return o};this.getSheetBackgroundColor=function(G){return k(G)};this.getSheet3DNode=function(G){q(G.sheetID,G.onSheetNodeCreated,G.onSheetLoaded,G.onFailure)};this.getSheetSize=function(J){var G=C.get(J).Height;var I=C.get(J).Width;var H={height:G,width:I};return H};this.setMaxSheetInCache=function(G){n=G};this.isDetailSheet=function(G){return false};this.getSheetThumbnail=function(G){G.onFailure();return};this.setSheetPickingByView=function(H){var G=v.get(H.sheetID);if(null===G){return}else{G.children.forEach(function(I){I.traverse(function(J){if(I!=J){J.setPickParent(H.pickingByView)}},{},false)})}};this.loadModel=function(G){if(!G){console.log("DifUDLWebLoader: Bad parameters");G.onFailure()}if(!G.serverUrl){console.log("DifUDLWebLoader: Bad argurment");return}if(!G.securityContext){console.log("DifUDLWebLoader: Bad argurment");return}if(!G.data){console.log("DifUDLWebLoader: Bad parameters");G.onFailure()}if(!G.data.physicalid){console.log("DifUDLWebLoader: Bad parameters");G.onFailure()}if(!G.data.dataType){console.log("DifUDLWebLoader: Bad parameters");G.onFailure()}w=G.serverUrl;l=G.securityContext;var H={objectPhysicalid:G.data.physicalid,serverUrl:w,securityContext:l,onComplete:function(J){s(J);o=[];u.forEach(function(K){var L=K.ID;C.set(L,K);o.push(L)});if(o.length<1){console.log("DifUDLWebLoader : ni sheet loaded in the review");G.onFailure()}var I={currentSheetID:o[0],sheetIDList:o};G.onComplete(I)},onFailure:function(){console.log("DifUDLWebLoader: Failed to get the sheet UDL");G.onFailure()}};e.expandDifComponent(H)}}});return h});define("DS/DibUDLWebLoader/DraftingUDLWebLoader",["UWA/Core","UWA/Class","DS/ZipJS/zip-fs","DS/Visualization/Node3D","DS/Visualization/ModelLoader","DS/Visualization/ThreeJS_DS"],function(e,c,b,g,d,f){var a=c.extend({init:function(){var s=this;var q;var i;var w=new Map();var l=new Map();var r=[];var x=[];var m;var k;var u=0;var p=function(){var B=[];var A=[];var z=[];var y=0;i.forEach(function(C){if(C.IsDetail){z.push(y)}else{B.push(y)}y++});z.forEach(function(C){B.push(C)});return B};var v=function(y){return i[y].Name};var t=function(z){var C,B,y;if(i[z].IsDetail){C=k.SheetColorDetail[0];B=k.SheetColorDetail[1];y=k.SheetColorDetail[2]}else{C=k.SheetColorView[0];B=k.SheetColorView[1];y=k.SheetColorView[2]}var A=new f.Color().setRGB(C/255,B/255,y/255);return A};var o=function(y,B,A,z){i[y].Views.forEach(function(K){var N=K.cgr;var C=K.ViewToSheetMatrix;var I=q.find(N);var F=new zip.BlobWriter();var J=new g();var L=new f.Matrix4();L.setPosition(new f.Vector3(C[4],C[5],0));var G=[C[0],C[2],0,C[1],C[3],0,0,0,1];L.setRotation(G);J.setMatrix(L);B.addChild(J);var M=new d();M.setFileType("cgr");M.setOnLoadedCallback(function(){A()});I.getData(F,function(P){var O=new FileReader();O.onload=function(){M.loadModelFromBuffer(this.result,J)};O.readAsArrayBuffer(P)});var D=K.cgr_texts;if(D!==""){var H=q.find(D);var E=new zip.BlobWriter();H.getData(E,function(P){var O=new FileReader();O.onload=function(){M.loadModelFromBuffer(this.result,J)};O.readAsArrayBuffer(P)})}})};var n=function(y,B,A){if(k===null){console.log("No drawing loaded");A();return}if(y<0||y>=i.length){console.log("Sheet number out of range");A();return}var D=i[y].Thumbnail;var C="image/PNG";if(D){var z=q.find(D);if(z){z.getBlob(C,function(F){var E=window.URL.createObjectURL(F);B(E)})}else{A();return}}else{A();return}};var h=function(y,D,C,A){if(k===null){console.log("No drawing loaded");A();return}if(y<0||y>=i.length){console.log("Sheet number out of range");A();return}var z=l.get(y);if(z){D.addNode(z);C();return}var B=new g();D.addNode(B);o(y,B,function(){C()},A);if(l.size>=u){l["delete"](x[0]);x.splice(0,1)}x.push(y);l.set(y,B);C()};var j=function(E,D,A,y){if(k===null){console.log("No drawing loaded");y();return}if(E<0||E>=i.length){console.log("Sheet number out of range");y();return}var G=l.get(E);if(G){D(G);A();return}var z=0;var F=i[E].Views.length;var C=new g();D(C);var B=false;o(E,C,function(){z++;if(F===z&&!B){B=true;A()}},y);if(l.size>=u){l["delete"](x[0]);x.splice(0,1)}x.push(E);l.set(E,C);setTimeout(function(){if(F<z&&!B){A()}},15000)};this.getNumberOfSheets=function(){return i.length};this.getSheetName=function(y){return v(w.get(y))};this.getLoadedSheetsId=function(){return r};this.getSheetBackgroundColor=function(y){return t(w.get(y))};this.loadSheetInViewer=function(y){h(w.get(y.sheetID),y.viewer,y.onComplete,y.onFailure)};this.getSheet3DNode=function(y){j(w.get(y.sheetID),y.onSheetNodeCreated,y.onSheetLoaded,y.onFailure)};this.getSheetSize=function(B){var y=i[w.get(B)].Height;var A=i[w.get(B)].Width;var z={height:y,width:A};return z};this.setMaxSheetInCache=function(y){u=y};this.isDetailSheet=function(y){return i[w.get(y)].IsDetail};this.getSheetThumbnail=function(y){return n(w.get(y.sheetID),y.onComplete,y.onFailure)};this.setSheetPickingByView=function(z){var y=l.get(w.get(z.sheetID));if(null===y){return}else{y.children.forEach(function(A){A.traverse(function(B){if(A!=B){B.setPickParent(z.pickingByView)}},{},false)})}};this.loadModel=function(y){q=new b.fs.FS();q.importHttpContent(y.UDLObjURL,false,function(){var z="DrwStructure.json";var A=q.find(z);if(null===A){y.onFailure();return}A.getText(function(D){var B=JSON.parse(D.target.result);k=B.Drawing;i=k.Sheets;r=[];w.clear();l.clear();var E=p();E.forEach(function(F){var G=i[F].ID;w.set(G,F);r.push(G)});var C={currentSheetID:i[k.CurrentSheetIndex-1].ID,sheetIDList:r};y.onComplete(C)})},function(){console.log("UDL - ZIP open fails");y.onFailure()})}}});return a});define("DS/DibUDLWebLoader/CATDibUDLWebLoader",["UWA/Core","UWA/Class","DS/DibUDLWebLoader/DraftingUDLWebLoader","DS/DibUDLWebLoader/DifUDLWebLoader","DS/DibWebUtils/DibQueryToolbox"],function(c,b,a,f,e){var d=b.extend({init:function(){var g=1;var h;this.getNumberOfSheets=function(){return h.getNumberOfSheets()};this.getSheetName=function(i){return h.getSheetName(i)};this.getLoadedSheetsId=function(){return h.getLoadedSheetsId()};this.getSheetBackgroundColor=function(i){return h.getSheetBackgroundColor(i)};this.getSheet3DNode=function(i){h.getSheet3DNode(i)};this.getSheetSize=function(i){return h.getSheetSize(i)};this.setMaxSheetInCache=function(i){g=i;if(h){h.setMaxSheetInCache(i)}};this.isDetailSheet=function(i){return h.isDetailSheet(i)};this.getSheetThumbnail=function(i){return h.getSheetThumbnail(i)};this.setSheetPickingByView=function(i){return h.setSheetPickingByView(i)};this.loadModel=function(j){if(!j){console.log("CATDibUDLWebLoader: Bad argurment");return}if(!j.serverUrl){console.log("CATDibUDLWebLoader: Bad argurment");return}if(!j.securityContext){console.log("CATDibUDLWebLoader: Bad argurment");return}if(!j.data){console.log("CATDibUDLWebLoader: Bad argurment");return}if(!j.data.physicalid){console.log("CATDibUDLWebLoader: Bad argurment");return}if(!j.data.dataType){console.log("CATDibUDLWebLoader: Bad argurment");return}if("Drawing"===j.data.dataType){h=new a();var k={objectPhysicalid:[j.data.physicalid],serverUrl:j.serverUrl,securityContext:j.securityContext,onComplete:function(m){var n;m.results[0].attributes.forEach(function(p){if(p.name==="udl"){n=p.value}});var l={provider:"FILE",filename:n,serverurl:"",proxyurl:"none",requiredAuth:null};var o={UDLObjURL:l,onComplete:j.onComplete,onFailure:j.onFailure};h.loadModel(o)},onFailure:function(){console.log("CATDibUDLWebLoader: Failed to fetch UDL");j.onFailure()}};e.getUDLData(k)}else{if("DIFSheet"===j.data.dataType||"DIFLayout"===j.data.dataType){h=new f();var i={data:j.data,serverUrl:j.serverUrl,securityContext:j.securityContext,onComplete:j.onComplete,onFailure:j.onFailure};h.loadModel(i)}}if(!h){console.log("CATDibUDLWebLoader: Input Data type not supported");j.onFailure()}h.setMaxSheetInCache(g);return}}});return d});