define("DS/SIMAnimationWebUI/CATAnimationTimeline",["UWA/Core","UWA/Event","DS/Core/Core","DS/Controls/Timeline","DS/Core/PointerEvents","DS/VisuEvents/EventsManager","DS/Core/Events"],function(h,c,g,f,d,a,b){var e=f.extend({className:"AnimationTimeline",_play:function(){var k=this;var i=new Date();var j;if(k._isPlaying&&!k._isRewinding&&!k._flaggedPause){if(k.startDate===undefined){k.startDate=new Date(i.getTime()-(k.getValue()*1000))}j=Math.abs(i-k.startDate);if(k.hasSnapped===true){k.snapDifference=(k.snapValue-j);k.hasSnapped=false}if(k.snapDifference!==undefined){j=k.snapDifference+j}if(j>(k.totalAnimationTime*1000)){window.clearTimeout(k.playTimeOut);k.setValue(k.totalAnimationTime);k.frameCounter=parseInt((k.totalAnimationTime*1000)/k.frameDelay);k._isPlaying=false;k.hasSnapped=false;k.snapDifference=undefined;k.elements.container.removeClassName("wux-ui-state-active");b.publish({event:"CATANIMATIONTIMELINE/FINISH"});return}if(!isNaN(j)){k.elements.container.addClassName("wux-ui-state-active");k.setValue(j/1000);k.frameCounter=parseInt(j/k.frameDelay)}else{window.clearTimeout(k.playTimeOut);k._isPlaying=false;k.hasSnapped=false;k.frameCounter=undefined;k.snapDifference=undefined;k.elements.container.removeClassName("wux-ui-state-active");return}k.playTimeOut=setTimeout(function(){requestAnimationFrame(function(){k._play.call(k)})},k.frameDelay)}},_rewind:function(l){var k=this;var i;var j;if(k._isPlaying&&k._isRewinding&&!k._flaggedPause){if(l===undefined||k.hasSnapped===true){k.hasSnapped=false;k.startDate=new Date();j=k.getValue()*1000;l=j;console.log("rewindStartTime: "+l+" self.hasSnapped : "+k.hasSnapped)}else{i=new Date();j=l-Math.abs(i-k.startDate)}if(j<k.options.minValue){window.clearTimeout(k.rewindTimeOut);k.setValue(0);k.frameCounter=0;k._isPlaying=false;k._isRewinding=false;k.hasSnapped=false;k.elements.container.removeClassName("wux-ui-state-active");return}if(!isNaN(j)){k.elements.container.addClassName("wux-ui-state-active");k.setValue(j/1000);k.frameCounter=parseInt(j/k.frameDelay)}else{window.clearTimeout(k.rewindTimeOut);k._isPlaying=false;k._isRewinding=false;k.hasSnapped=false;k.frameCounter=undefined;k.elements.container.removeClassName("wux-ui-state-active");return}k.rewindTimeOut=setTimeout(function(){requestAnimationFrame(function(){k._rewind.call(k,l)})},k.frameDelay)}},play:function(i,m,l,k){var j=this;j.startDate=undefined;j._flaggedPause=undefined;j.frameCounter=undefined;j.snapDifference=undefined;j._isPlaying=true;if(l!==undefined){j._isRewinding=l}j.totalAnimationTime=m;if(k===undefined){k=true}if(k){this._modelEvents.publish({event:"PLAY",context:this})}window.clearTimeout(j.playTimeOut);window.clearTimeout(j.rewindTimeOut);this.elements.container.addEvent(d.POINTERDOWN,function(n){j.hasSnapped=true;j.elements.container.addClassName("wux-ui-state-active");j.pause()});a.addEvent(document,"onLeftMouseUp",function(n){if(j.hasSnapped===true){j.snapValue=j.getValue()*1000;setTimeout(function(){j._isPlaying=true;if(j._isRewinding){window.clearTimeout(j.rewindTimeOut);j._rewind()}else{window.clearTimeout(j.playTimeOut);j._play()}},100)}});j.frameDelay=(m*1000)/i;if(j._isRewinding){j._rewind()}else{j._play()}},pause:function(j){var i=this;if(j){this._flaggedPause=true}if(j===undefined){j=true}if(!i.hasSnapped){this.elements.container.removeClassName("wux-ui-state-active")}this._isPlaying=false;i.frameCounter=undefined;if(j){this._modelEvents.publish({event:"PAUSE",context:this})}},stop:function(j){var i=this;if(j===undefined){j=true}this.startDate=undefined;this._isRewinding=false;this._isPlaying=false;this.elements.container.removeClassName("wux-ui-state-active");this.pause(true);this.frameCounter=0;this.setValue(this.options.minValue);this.hasSnapped=false;i.frameCounter=undefined;this.snapDifference=undefined;if(j){this._modelEvents.publish({event:"STOP",context:this})}},setValue:function(k,j){var i=this;i.options.graduations.forEach(function(l){var m=(l.value+i.options.minValue);if(i._value[1]>=m&&l.state===0){l.state=1;if(l.onEvent){l.onEvent.call(i)}}if(i._value[1]<m&&l.state>0){l.state=0}});this._setValue(k,j);b.publish({event:"CATAnimationTimeline/CHANGE",data:{value:i._value[1]}})}});return h.namespace("DS/KinPlayExperience/AnimationTimeline",e)});define("DS/SIMAnimationWebUI/AnimationPlayer",["UWA/Core","UWA/Class","DS/Visualization/ThreeJS_DS","DS/Visualization/PathElement","DS/SIMAnimationWebMdl/SIMAnimationServices","DS/SceneGraphOverrides/SceneGraphOverrideSet"],function(g,c,f,e,d,a){var b=c.extend({init:function(i,l,k){if(i!==undefined&&l!==undefined){var j=this;j.movingProducts=[];j.movingProductsInitalPositions=[];j.frmWindow=i;j.viewer=j.frmWindow.getViewer();var o=j.viewer.getSceneGraphOverrideSetManager();var n=j.frmWindow.getViewer().getRootNode();j.modelRoot=j.frmWindow.experience.getRootBag();var h=o.getNumberOfSceneGraphOverrideSets();if(h>0){j.sceneGraphOverrideSet=o.getSceneGraphOverrideSetAt(h-1)}else{j.sceneGraphOverrideSet=new a(j.modelRoot);o.pushSceneGraphOverrideSet(j.sceneGraphOverrideSet)}var m=j.sceneGraphOverrideSet.getOverrides();j.sceneGraphOverrideSet.deleteOverrides(m);j.viewpoint=j.frmWindow.getViewpoint();j.animation=l}},reset:function(){var h=this;h.applyInitialPosition()},getInstancePathFromExternalObject:function(j){var l=[];var h=j.replace(/\[|\]/g,"").split(" ");for(var k=0;k<h.length;++k){if(h[k]!==""){l.push(h[k].split("#")[1])}}return l},getChildById:function(n,k,i){var q=this;var l,p,h,o,m,j;j=((i!==undefined)&&i);if(!j){for(l=0,p=n.children.length;l<p;l++){h=n.children[l];if(h.persistentId!==undefined&&h.persistentId===k){return h}m=q.getChildById(h,k);if(m!==null){return m}}}else{for(l=0,p=n.parents.length;l<p;l++){o=n.parents[l];if(o.persistentId!==undefined&&o.pesristentId===k){return o}m=q.getChildById(o,k,1);if(m!==null){return m}}}return null},getPathElementById:function(h,k){var i=this;var l=i.getChildById(h,k);var j=i.getPathElementByNode(h,l);return j},getPathElementByNode:function(h,p){var k=this;var o=null;if(h!==null){if(h===p){o=new e([h]);return o}for(var n=0;n<h.children.length;++n){var q=h.children[n];if(q===p){o=new e([h]);o.addElement(q);return o}var m=k.getPathElementByNode(q,p);if(m!==null){o=new e([h]);for(var l=0;l<m.getLength();++l){o.addElement(m.getElement(l))}}}}return o},getPathElementByInstancePath:function(k,p){var r=this;var q=k;var m=[q];for(var o=0;o<p.length;++o){var l=r.getPathElementById(q,p[o]);for(var n=1;n<l.getLength();++n){m.push(l.getElement(n))}q=l.getLastElement()}var h=new e(m);return h},goToIndex:function(n){var x=this;var q=x.animation.attributes._VariantLine.attributes._OrderedIndexedValues[n];var t=x.modelRoot;var v=x.animation.attributes._VariantLine.attributes._OrderedIndexes[n];var m=x.animation.attributes._AnimChannels;for(var l=0;l<m.length;++l){var p=m[l];var h=new e();if(p.attributes._ExternalObject!==undefined){var o=p.attributes._ExternalObject;if(typeof(o)==="string"){var s=[];s=x.getInstancePathFromExternalObject(o);h=x.getPathElementByInstancePath(t,s)}else{if(o.relationTarget!==undefined){h=o.relationTarget;if(o.relationTarget.externalPath[0]!==x.modelRoot){h.externalPath.unshift(x.modelRoot)}}}}var r=p.attributes._AnimProperties;for(var k=0;k<r.length;++k){var u=r[k];if(v==="undefined"||u.attributes==="undefined"||u.attributes._ValuesTimeIndex==="undefined"){console.error("Animation property type "+u.attributes._Type+" not supported")}var w=u.attributes._ValuesTimeIndex.indexOf(v);if(w!==-1){switch(u.attributes._Type){case"CATANIM_POSITION":x.applyPosition(h,u,w,n);break;case"CATANIM_COLOR":x.applyColor(h,u,w);break;case"CATANIM_OPACITY":x.applyOpacity(h,u,w);break;case"CATANIM_VISIBILITY":x.applyVisibility(h,u,w);break;case"CATANIM_VIEWPOINT":x.applyViewpoint(u,w);break;case"CATANIM_HIGHLIGHT":x.applyHighlight(h,u,w);break;default:console.warn("Animation property type "+u.attributes._Type+" not supported");break}}}}},applyPosition:function(h,p,s){var r=this;var o=p.attributes._ValuesDouble;var n=new f.Matrix4(o[12*s],o[12*s+3],o[12*s+6],o[12*s+9],o[12*s+1],o[12*s+4],o[12*s+7],o[12*s+10],o[12*s+2],o[12*s+5],o[12*s+8],o[12*s+11],0,0,0,1);var q;var m=r.sceneGraphOverrideSet.getOverridesFromPathElement(h);if(m){for(var k=0;k<m.length;k++){q=m[k]}}if(!q){q=r.sceneGraphOverrideSet.createOverride([h])}if(q){if(r.movingProducts.length===0){r.movingProducts.push(h);var j=q.getPosition();r.movingProductsInitalPositions.push(j)}if(r.movingProducts.length>0){var l=r.movingProducts.indexOf(h);if(l===-1){r.movingProducts.push(h);var j=q.getPosition();r.movingProductsInitalPositions.push(j)}}}else{console.log(" pathElement not found for this channel ")}if(q){q.setPosition(n)}},b64ToUint6:function(h){return h>64&&h<91?h-65:h>96&&h<123?h-71:h>47&&h<58?h+4:h===43?62:h===47?63:0},base64DecToArr:function(j,h){var s=this;var r=j.replace(/[^A-Za-z0-9\+\/]/g,""),l=r.length,i=h?Math.ceil((l*3+1>>>2)/h)*h:l*3+1>>>2,q=new Uint8Array(i);for(var o,n,m=0,k=0,p=0;p<l;p++){n=p&3;m|=s.b64ToUint6(r.charCodeAt(p))<<18-6*n;if(n===3||l-p===1){for(o=0;o<3&&k<i;o++,k++){q[k]=m>>>(16>>>o&24)&255}m=0}}return q},componentToHex:function(i){var h=i.toString(16);return h.length===1?"0"+h:h},rgbToHex:function(k,j,h){var i=this;return"#"+i.componentToHex(k)+i.componentToHex(j)+i.componentToHex(h)},applyColor:function(j,q,t){var s=this;var p=q.attributes._ValuesOctet;var o=p[4*t+3];if(o===undefined&&p.type=="binary/Base64"){var k=p.value;var h=s.base64DecToArr(k);p=h}o=p[4*t+3];if(o!==undefined){var l=(o===1)?s.rgbToHex(p[4*t],p[4*t+1],p[4*t+2]):null;var r;var n=s.sceneGraphOverrideSet.getOverridesFromPathElement(j);if(n){for(var m=0;m<n.length;m++){r=n[m]}}if(!r){r=s.sceneGraphOverrideSet.createOverride([j])}if(r){r.setColor(l)}}},applyOpacity:function(j,q,t){var s=this;var p=q.attributes._ValuesOctet;var o=p[2*t+1];if(o===undefined&&p.type=="binary/Base64"){var k=p.value;var h=s.base64DecToArr(k);p=h}o=p[2*t+1];if(o){var m=(o===1)?p[2*t]/255:null;var r;var n=s.sceneGraphOverrideSet.getOverridesFromPathElement(j);if(n){for(var l=0;l<n.length;l++){r=n[l]}}if(!r){r=s.sceneGraphOverrideSet.createOverride([j])}if(r){r.setOpacity(m)}}},applyVisibility:function(k,q,t){var s=this;var p=q.attributes._ValuesOctet;var l=p[t];if(l===undefined&&p.type=="binary/Base64"){var m=p.value;var j=s.base64DecToArr(m);l=j[t]}if(l!==undefined){var h=(l===1)?true:false;var r;var o=s.sceneGraphOverrideSet.getOverridesFromPathElement(k);if(o){for(var n=0;n<o.length;n++){r=o[n]}}if(!r){r=s.sceneGraphOverrideSet.createOverride([k])}if(r){r.setVisibility(h)}}},applyViewpoint:function(p,s){var r=this;var n=p.attributes._ValuesDouble;var l=new f.Vector3(n[15*s],n[15*s+1],n[15*s+2]);var i=new f.Vector3(n[15*s+3],n[15*s+4],n[15*s+5]);var q=new f.Vector3().crossVectors(l,i);var m=new f.Matrix4(q.x,i.x,-l.x,0,q.y,i.y,-l.y,0,q.z,i.z,-l.z,0,0,0,0,1);var h=new f.Quaternion().setFromRotationMatrix(m);var j=new f.Vector3(n[15*s+9],n[15*s+10],n[15*s+11]);var k=new f.Vector3(n[15*s+12],n[15*s+13],n[15*s+14]);var o=j.distanceTo(k);r.viewpoint.getControl().moveTo({target:k,orientation:h,distanceToTarget:o})},applyHighlight:function(i,o,q){var p=this;var n=o.attributes._ValuesOctet;var j=n[q];if(j===undefined&&n.type=="binary/Base64"){var k=n.value;var h=p.base64DecToArr(k);j=h[q]}if(j){var l=WUX.Selection.HSOManager;var m={pathElement:i};if(j===0){l.remove(m)}else{if(j===1){l.add(m)}}}},goToTime:function(l){var i=this;var k=i.animation.attributes._VariantLine;var h=k.attributes._OrderedIndexedValues.indexOf(l);var j=k.attributes._OrderedIndexes[h];i.goToIndex(j)},applyInitialPosition:function(){var m=this;var l=m.movingProducts;var k=m.movingProductsInitalPositions;for(var o=0;o<l.length;o++){var h;var p=m.sceneGraphOverrideSet.getOverridesFromPathElement(l[o]);if(p){for(var n=0;n<p.length;n++){h=p[n]}}if(!h){h=m.sceneGraphOverrideSet.createOverride([l[o]])}if(h){h.setPosition(k[o])}}}});return g.namespace("DS/SIMAnimationWebUI/AnimationPlayer",b)});define("DS/SIMAnimationWebUI/CmdPlayAnimation",["UWA/Core","DS/ApplicationFrame/Command","DS/SIMAnimationWebUI/CATAnimationTimeline","DS/SIMAnimationWebUI/AnimationPlayer","DS/SIMAnimationWebMdl/SIMAnimationServices","DS/Core/Events","DS/ApplicationFrame/CommandsManager","DS/WebappsUtils/WebappsUtils","css!DS/SIMAnimationWebUI/CmdPlayAnimation.css"],function(e,c,f,j,h,i,b,d){var g=false;var a=c.extend({init:function(m){if(!g){var l=this;l._parent(m,{isAsynchronous:true});l.myPlayAnimationTimelineContainer=new e.Element("div",{"class":"CmdPlayAnimation-Container"});l._onActionBarReadyToken=l.getFrameWindow().onActionBarReady(function(){if(!g){l.loadAnimations();l.begin();g=true}});var n=this.getFrameWindow().experience;var k=n.args.ctx;n.subscribe("ASSET/LOADINGFINISHED",function(){l.loadAnimations()});i.subscribe({event:"CMDCHOOSEANIMATION/ANIMATIONCHOSEN"},function(p){var q=p.animationId;l.animationId=q;l.animationPlayer.animation=l.animations[q];var o=(l.animations[q]).attributes._Name;l.animationPlayer.reset();l.myPlayAnimationTimeline.stop();l.loadTimeline();l.consolidateLoopButton();l.animate("play");if(b.getCommands("Default")["ChooseAnimation"]._visible){l.buttonChoose.classList.remove("isChoosing");l.buttonChoose.classList.add("isChoosing")}});i.subscribe({event:"CATAnimationTimeline/CHANGE"},function(o){if(l.mobileValue){l.mobileValue.setText(o.value)}});i.subscribe({event:"CMDCHOOSEANIMATION/JUMPTOEND"},function(o){l.animate("jumptoEnd");if((l._isPlaying)&&(l._isLooping)){l.animate("jumptoStart");l.animate("play")}else{if((l._isPlaying)&&(!l._isLooping)){l.animate("pause")}}});i.subscribe({event:"CMDCHOOSEANIMATION/JUMPTOSTART"},function(o){l.animate("jumptoStart");if((l._isPlaying)){l.animate("play")}else{if((l._isPlaying)){l.animate("pause")}}})}},loadAnimations:function(){var m=this;var l=m.getFrameWindow().getViewer().getRootNode();var k=new h();m.animations=k.getAnimations(l);if(m.animations.length>0){m.enable();m.animationId=0;var n=m.animations[m.animationId];m.animationPlayer=new j(m.getFrameWindow(),n);m.loadTimeline();m.consolidateLoopButton();m.myPlayAnimationTimelineContainer.addEventListener("contextmenu",function(o){o.preventDefault()},false)}else{m.disable()}},loadTimeline:function(){var m=this;var k=m.animationPlayer.animation.attributes._VariantLine.attributes._OrderedIndexes.length-1;var n=0;var o=m.animationPlayer.animation.attributes._VariantLine.attributes._OrderedIndexedValues[k];m.frameDelay=(o*1000)/k;if(m.myPlayAnimationTimeline){while(m.myPlayAnimationTimelineContainer.hasChildNodes()){m.myPlayAnimationTimelineContainer.removeChild(m.myPlayAnimationTimelineContainer.lastChild)}}m.addControls();var l=(o)/k;m.myPlayAnimationTimeline=new f({minValue:n,maxValue:o,value:0,stepValue:0.1,dynamicGraduations:false,dynamicGaugeColor:false,graduationsLabel:false,eventsList:[{label:"0%",value:n},{label:"50%",value:(n+o)/2},{label:"100%",value:o}],activeGraduationsColor:"#3CF",inactiveGraduationsColor:"#CCC"}).inject(m.myPlayAnimationTimelineContainer);m.addControls2();var p=function(){var q=0;if(m.myPlayAnimationTimeline.frameCounter===undefined||m.myPlayAnimationTimeline.hasSnapped===true){q=parseInt((m.myPlayAnimationTimeline.getValue()*1000)/m.frameDelay)}else{q=m.myPlayAnimationTimeline.frameCounter}m.animationPlayer.goToIndex(q);m.getFrameWindow().getViewer().render()};m.myPlayAnimationTimeline.addEvent("change",p)},beginExecute:function(){var l=this;if(l.buttonChoose){l.buttonChoose.classList.remove("isChoosing")}var n=l.getFrameWindow().getActionBar().MAB;if((n)&&(n.state.visible)){var k=new e.Element("div",{"class":"kinFlyout"});var m=d.getWebappsAssetUrl("CATKinPlayScenario","icons/32/");l.buttonJumptoStartMAB=new e.Element("a",{html:'<img src="'+m+'I_KinPlayCmdJumpToStart.png" alt="Step Backward">',"class":"kinMABCmd",events:{click:function(){l.animate("pause");l.animate("stepBackward",0.1)}}});l.buttonJumptoStartMAB.inject(k);l.buttonPlayMAB=new e.Element("a",{html:'<img src="'+m+'I_KinPlayCmdPlay.png" alt="Play">',"class":"kinMABCmd",events:{click:function(){l.animate("play")}}});l.buttonPlayMAB.inject(k);l.buttonPauseMAB=new e.Element("a",{html:'<img src="'+m+'I_KinPlayCmdPause.png" alt="Pause">',"class":"kinMABCmd",events:{click:function(){l.animate("pause")}}});l.buttonPauseMAB.inject(k);l.buttonJumptoEndMAB=new e.Element("a",{html:'<img src="'+m+'I_KinPlayCmdJumpToEnd.png" alt="Step Forward">',"class":"kinMABCmd",events:{click:function(){l.animate("pause");l.animate("stepForward",0.1)}}});l.buttonJumptoEndMAB.inject(k);l.buttonChooseMAB=new e.Element("a",{html:'<img src="'+m+'I_KinChooseAnimation.png" alt="Choose">',"class":"kinMABCmd",events:{click:function(){b.getCommands("Default")["ChooseAnimation"].begin()}}});l.buttonChooseMAB.inject(k);l.myPlayAnimationTimelineContainer.classList.remove("timeLineMAB");l.myPlayAnimationTimelineContainer.classList.add("timeLineMAB");l.getFrameWindow().getActionBar().MAB.showCustomFlyout(1,k)}else{l.myPlayAnimationTimelineContainer.classList.remove("timeLineMAB")}l.myPlayAnimationTimelineContainer.inject(l.getFrameWindow().getUIFrame());l.myPlayAnimationTimelineContainer.classList.remove("close");l.myPlayAnimationTimelineContainer.classList.remove("open");l.myPlayAnimationTimelineContainer.classList.add("open");l.doPlayAnimation=true;i.publish({event:"CMDPLAYANIMATION/PLAYFIRST",data:{}});l.animate("play");l._animationFinishToken=i.subscribe({event:"CATANIMATIONTIMELINE/FINISH"},function(){if(l._isLooping){l.animate("jumptoStart");l.animate("play")}else{l.animate("pause")}})},endExecute:function(){var k=this;if(k._isRunning){k.doPlayAnimation=false;k.myPlayAnimationTimelineContainer.classList.remove("close");k.myPlayAnimationTimelineContainer.classList.remove("open");k.myPlayAnimationTimelineContainer.classList.add("close");k.cleanUp();i.unsubscribe(k._animationFinishToken);if(b.getCommands("Default")["ChooseAnimation"]._visible){b.getCommands("Default")["ChooseAnimation"].hideThumbnails()}}i.unsubscribe(k._onActionBarReadyToken);g=false},animate:function(q,r){var m=this;var n=0;var k=m.animationPlayer.animation.attributes._VariantLine.attributes._OrderedIndexedValues.length-1;var l=0;var o=m.animationPlayer.animation.attributes._VariantLine.attributes._OrderedIndexedValues[k];var p=(r!=undefined)?r:m.animationPlayer.animation.attributes._VariantLine.attributes._OrderedIndexedValues[k]-m.animationPlayer.animation.attributes._VariantLine.attributes._OrderedIndexedValues[(k-1)];if(typeof q==="number"){m.myPlayAnimationTimeline.value=q}else{if(typeof q==="string"){if(q==="play"){m.setAnimationFromCSO();m.buttonPause.classList.remove("playPauseHidden");m.buttonPlay.classList.remove("playPauseHidden");m.buttonPlay.classList.add("playPauseHidden");if(m.buttonPauseMAB){m.buttonPauseMAB.classList.remove("playPauseHidden");m.buttonPlayMAB.classList.remove("playPauseHidden");m.buttonPlayMAB.classList.add("playPauseHidden")}m._isPlaying=true;m.myPlayAnimationTimeline.play(k,o,false)}else{if(q==="rewind"){m.myPlayAnimationTimeline.pause();m.myPlayAnimationTimeline.play(k,o,true)}else{if(q==="pause"){m.buttonPlay.classList.remove("playPauseHidden");m.buttonPause.classList.remove("playPauseHidden");m.buttonPause.classList.add("playPauseHidden");if(m.buttonPauseMAB){m.buttonPlayMAB.classList.remove("playPauseHidden");m.buttonPauseMAB.classList.remove("playPauseHidden");m.buttonPauseMAB.classList.add("playPauseHidden")}m.myPlayAnimationTimeline.pause(true);m._isPlaying=false}else{if(q==="stop"){m.myPlayAnimationTimeline.stop()}else{if(q==="stepForward"){m.myPlayAnimationTimeline.pause();n=+m.myPlayAnimationTimeline.getValue()+p;if(n>o){n=o}m.myPlayAnimationTimeline.setValue(n);m.animationPlayer.goToIndex(parseInt((n*1000)/m.myPlayAnimationTimeline.frameDelay));m.getFrameWindow().getViewer().render()}else{if(q==="stepBackward"){m.myPlayAnimationTimeline.pause();n=m.myPlayAnimationTimeline.getValue()-p;if(n<l){n=l}m.myPlayAnimationTimeline.setValue(n);m.animationPlayer.goToIndex(parseInt((n*1000)/m.myPlayAnimationTimeline.frameDelay));m.getFrameWindow().getViewer().render()}else{if(q==="jumptoStart"){m.myPlayAnimationTimeline.stop()}else{if(q==="jumptoEnd"){m.myPlayAnimationTimeline.pause();m.myPlayAnimationTimeline.setValue(o);m.animationPlayer.goToIndex(k)}}}}}}}}}}},setAnimationFromCSO:function(){var k=this;var m=WUX.Selection.CSOManager.get();if(m[0]!==undefined){var l=m[0].pathElement.getLastElement().animation;if(l!==undefined){k.animationPlayer.animation=l;k.myPlayAnimationTimeline.stop();k.animationPlayer.reset();k.loadTimeline();k.consolidateLoopButton()}}},cleanUp:function(){var k=this;if(!k.doPlayAnimation){k.myPlayAnimationTimelineContainer.toggleClassName("close");k.getFrameWindow().getUIFrame().removeChild(k.myPlayAnimationTimelineContainer);k.doPlayAnimation=false;k.myPlayAnimationTimeline.stop();k.animationPlayer.applyInitialPosition()}},addControls:function(){var l=this;var m=d.getWebappsAssetUrl("CATKinPlayScenario","icons/32/");l.buttonPlay=new e.Element("a",{html:'<img src="'+m+'I_KinPlayCmdPlay.png" alt="Play">',"class":"wux-timeline-controls CmdPlayAnimation-Button CmdPlayAnimationFontSizeMedium a",events:{click:function(){l.animate("play")}}});l.buttonPause=new e.Element("a",{html:'<img src="'+m+'I_KinPlayCmdPause.png" alt="Pause">',"class":"wux-timeline-controls CmdPlayAnimation-Button CmdPlayAnimationFontSizeMedium a",events:{click:function(){l.animate("pause")}}});l.mobileValue=e.createElement("span",{text:"0.0"});var n=new e.Element("div",{"class":"cmdPlayAnimation-ButtonDiv0"});var k=new e.Element("div",{"class":"cmdPlayAnimation-ButtonDiv"});l.mobileValue.inject(n);l.buttonPause.inject(k);l.buttonPlay.inject(k);n.inject(l.myPlayAnimationTimelineContainer);k.inject(l.myPlayAnimationTimelineContainer)},addControls2:function(){var l=this;var m=d.getWebappsAssetUrl("CATKinPlayScenario","icons/32/");l.buttonJumptoEnd=new e.Element("a",{html:'<img src="'+m+'I_KinPlayCmdJumpToEnd.png" alt="Step Forward">',"class":"wux-timeline-controls CmdPlayAnimation-Button CmdPlayAnimationFontSizeMedium a kinBackward",events:{click:function(){l.animate("pause");l.animate("stepForward",0.1)}}});l.buttonJumptoStart=new e.Element("a",{html:'<img src="'+m+'I_KinPlayCmdJumpToStart.png" alt="Step Backward">',"class":"wux-timeline-controls CmdPlayAnimation-Button CmdPlayAnimationFontSizeMedium a kinForward",events:{click:function(){l.animate("pause");l.animate("stepBackward",0.1)}}});l.buttonLoop=new e.Element("a",{html:'<img src="'+m+'I_KinPlayCmdLoop.png" alt="Loop">',"class":"wux-timeline-controls CmdPlayAnimation-Button CmdPlayAnimationFontSizeMedium a loopButton",events:{click:function(){l.toggleLoop()}}});l.buttonChoose=new e.Element("a",{html:'<img src="'+m+'I_KinChooseAnimation.png" alt="Animation Chooser">',"class":"wux-timeline-controls CmdPlayAnimation-Button CmdPlayAnimationFontSizeMedium a chooseButton",events:{click:function(){l.toggleChoose();b.getCommands("Default")["ChooseAnimation"].begin()}}});l.kinSeparator=new e.Element("div",{"class":"kinSeparator"});l.buttonClose=new e.Element("a",{html:'<img src="'+m+'I_KinPlayClose32.png" alt="Close Play">',"class":"wux-timeline-controls CmdPlayAnimation-Button CmdPlayAnimationFontSizeMedium a closeButton",events:{click:function(){l.end()}}});var k=new e.Element("div",{"class":"cmdPlayAnimation-ButtonDiv endButtons"});l.buttonJumptoStart.inject(k);l.buttonJumptoEnd.inject(k);l.buttonLoop.inject(k);l.buttonChoose.inject(k);l.kinSeparator.inject(k);l.buttonClose.inject(k);k.inject(l.myPlayAnimationTimelineContainer)},toggleChoose:function(){var k=this;if(b.getCommands("Default")["ChooseAnimation"]._visible){k.buttonChoose.classList.remove("isChoosing")}else{k.buttonChoose.classList.remove("isChoosing");k.buttonChoose.classList.add("isChoosing")}},toggleLoop:function(){var k=this;if(k._isLooping){k.buttonLoop.classList.remove("isLooping")}else{k.buttonLoop.classList.remove("isLooping");k.buttonLoop.classList.add("isLooping")}k._isLooping=!k._isLooping},consolidateLoopButton:function(){var k=this;if(k._isLooping){k.buttonLoop.classList.remove("isLooping");k.buttonLoop.classList.add("isLooping")}else{k.buttonLoop.classList.remove("isLooping")}}});return a});define("DS/SIMAnimationWebUI/CmdChooseAnimation",["UWA/Core","DS/ApplicationFrame/Command","DS/Panels/PanelBase","DS/Panels/SidePanel","DS/Controls/Loader","DS/SIMAnimationWebUI/AnimationPlayer","DS/SIMAnimationWebMdl/SIMAnimationServices","DS/Core/Events","css!DS/SIMAnimationWebUI/CmdChooseAnimation","DS/Controls/Button","DS/WebappsUtils/WebappsUtils"],function(e,b,j,c,g,k,h,i,f,d){var a=b.extend({init:function(n){var m=this;m._parent(n,{isAsynchronous:true,mode:"shared"});m.NB_SCREENSHOTS_PER_ANIMATION=20;m._subPanelsBase=[];m.getFrameWindow().onActionBarReady(function(){m.loadAnimations();m.subcribeToPlay()});var o=this.getFrameWindow().experience;var l=o.args.ctx;o.subscribe("ASSET/LOADINGFINISHED",function(){m.loadAnimations();m.subcribeToPlay()});this._visible=undefined},subcribeToPlay:function(){var l=this;i.subscribe({event:"CMDPLAYANIMATION/PLAYFIRST"},function(){if(l.thumbnailActivations.length>0){for(var m=0;m<l.thumbnailActivations.length;m++){l.thumbnailActivations[m]=false;if(l._subPanelsBase[m]){l._subPanelsBase[m].removeClassName("thumbSelected")}}l.thumbnailActivations[0]=true;if(l._subPanelsBase[0]){l._subPanelsBase[0].addClassName("thumbSelected")}}});i.subscribe({event:"CMDPLAYANIMATION/PREVIOUS"},function(){var o=this;var n=0;while((l.thumbnailActivations[n]==false)&&(n<l.thumbnailActivations.length)){n++}var m=false;if(l.thumbnailActivations[n]){if((n-1)>=0){n=n-1}else{m=true}}else{if(l.thumbnailActivations.length>0){n=0}}if(m){require(["DS/Core/Events"],function(p){p.publish({event:"CMDCHOOSEANIMATION/JUMPTOSTART",data:{animationId:n}})})}else{require(["DS/Core/Events"],function(p){for(var q=0;q<l.thumbnailActivations.length;q++){l.thumbnailActivations[q]=false;l._subPanelsBase[q].removeClassName("thumbSelected")}l.thumbnailActivations[n]=true;l._subPanelsBase[n].addClassName("thumbSelected");p.publish({event:"CMDCHOOSEANIMATION/ANIMATIONCHOSEN",data:{animationId:n}})})}});i.subscribe({event:"CMDPLAYANIMATION/NEXT"},function(){var o=this;var m=0;while((l.thumbnailActivations[m]==false)&&(m<l.thumbnailActivations.length)){m++}var n=false;if(l.thumbnailActivations[m]){if((m+1)<l.thumbnailActivations.length){m=m+1}else{n=true}}else{if(l.thumbnailActivations.length>0){m=0}}if(n){require(["DS/Core/Events"],function(p){p.publish({event:"CMDCHOOSEANIMATION/JUMPTOEND",data:{animationId:m}})})}else{require(["DS/Core/Events"],function(p){for(var q=0;q<l.thumbnailActivations.length;q++){l.thumbnailActivations[q]=false;l._subPanelsBase[q].removeClassName("thumbSelected")}l.thumbnailActivations[m]=true;l._subPanelsBase[m].addClassName("thumbSelected");p.publish({event:"CMDCHOOSEANIMATION/ANIMATIONCHOSEN",data:{animationId:m}})})}})},loadAnimations:function(){console.log("Finished Model loading");var n=this;var m=n.getFrameWindow().getViewer().getRootNode();var l=new h();n.animations=l.getAnimations(m);var p=l.getKeyFramer(m);n.keyFramer=p;if(n.animations.length>0){n.enable();n.thumbnailActivations=[];n.thumbnailActivations[0]=true;for(var o=1;o<n.animations.length;++o){n.thumbnailActivations.push(false)}n.animScreenshots=[];n.animateThumbnails=0}else{n.disable()}},beginExecute:function(){if(!this._globalContainer){this.execute2()}if(this._globalContainer){var l=this.getFrameWindow().getActionBar().MAB;if((l)&&(l.state.visible)){this._globalContainer.elements.container.classList.remove("chooserMAB");this._globalContainer.elements.container.classList.add("chooserMAB")}else{this._globalContainer.elements.container.classList.remove("chooserMAB")}if(this._visible===undefined){this.showThumbnails()}else{if(this._visible===false){this.showThumbnails()}else{this.hideThumbnails()}}}this.end()},showThumbnails:function(){this._visible=true;this._globalContainer.elements.container.classList.remove("chooserclose");this._globalContainer.elements.container.classList.remove("chooseropen");this._globalContainer.elements.container.classList.add("chooseropen");this.startThumbnailAnimations()},hideThumbnails:function(){this._visible=false;this.stopThumbnailAnimations();this._globalContainer.elements.container.classList.remove("chooseropen");this._globalContainer.elements.container.classList.remove("chooserclose");this._globalContainer.elements.container.classList.add("chooserclose")},endExecute:function(){var l=this;if(l._globalContainer){}},execute2:function(){var t=this;if(!t._globalContainer){var r=t.getFrameWindow();var q=r.getUIFrame();var n=0;var m=0;t.animScreenshots=t.animScreenshots||[];t._globalContainer=new c({side:"right"}).inject(q);this._globalContainer.elements.container.classList.remove("chooseropen");this._globalContainer.elements.container.classList.remove("chooserclose");this._globalContainer.elements.container.classList.add("chooserclose");var o=new e.Element("div",{"class":"headerThumbs",html:"<span>Motion Animations</span>"}).inject(this._globalContainer);var l=globalThis.dsDefaultWebappsBaseUrl+"CATKinPlayScenario/assets/icons/";t.buttonClose=new e.Element("a",{html:'<img src="'+l+'I_KinPlayClose.png" alt="Close">',"class":"closeHeaderThumbsButton",events:{click:function(){t._visible=false;t.stopThumbnailAnimations();t._globalContainer.elements.container.classList.remove("chooseropen");t._globalContainer.elements.container.classList.remove("chooserclose");t._globalContainer.elements.container.classList.add("chooserclose")}}});t.buttonClose.inject(o);t.thumbImgs=[];for(n=0;n<t.animations.length;++n){t.buildAnimationThumbnail(t._globalContainer,n)}if(t.animScreenshots.length===0){var s=new g();s.inject(t._globalContainer);s.getContent().setStyles({position:"absolute",top:"",left:"",right:10,zIndex:30000000000,bottom:this.offset?92:10});s.on("0%");require(["DS/Core/Events"],function(u){u.subscribe({event:"CMDCHOOSEANIMATION/SCREENSHOT_SAVED"},function(x){var v=t.computeSaveProgress();s.update((v*100).toFixed()+"%");if(v===1){s.off();for(var w=0;w<t.thumbImgs.length;++w){t.thumbImgs[w].removeClassName("CmdChooseAnimation-thumbnail-save-animation");t.thumbImgs[w].addClassName("CmdChooseAnimation-thumbnail-animation")}}})});for(n=0;n<t.animations.length;++n){if(t.animScreenshots[n]===undefined){t.animScreenshots[n]=[];t.saveAnimationScreenshot(n)}}}else{for(n=0;n<t.thumbImgs.length;++n){t.thumbImgs[n].addClassName("CmdChooseAnimation-thumbnail-animation")}for(n=0;n<t.animScreenshots.length;++n){var p=t.animScreenshots[n];for(m=0;m<p.length;++m){p[m].inject(t.thumbImgs[n])}}}}},computeSaveProgress:function(){var m=this;var o=m.animations.length*m.NB_SCREENSHOTS_PER_ANIMATION;var l=0;for(var n=0;n<m.animScreenshots.length;++n){l+=m.animScreenshots[n].length}return l/o},buildAnimationThumbnail:function(q,s){var u=this;var o=s;var n=u.animations[o];var r=u.thumbnailActivations[o];var t=new j({"class":"gru"}).inject(q);var p=new e.Element("div",{id:o,"class":"kinThumb kinThumb"+o,activated:r,events:{click:function(w){var x=this;for(var v=0;v<u.thumbnailActivations.length;++v){u.thumbnailActivations[v]=false;u._subPanelsBase[v].removeClassName("thumbSelected")}u.thumbnailActivations[x.id]=true;u._subPanelsBase[x.id].addClassName("thumbSelected");require(["DS/Core/Events"],function(y){y.publish({event:"CMDCHOOSEANIMATION/ANIMATIONCHOSEN",data:{animationId:x.id}})});u.end()}}}).inject(t);u._subPanelsBase.push(p);var l=new e.Element("div",{id:o,"class":"CmdChooseAnimation-thumbnail CmdChooseAnimation-thumbnail-background",activated:r}).inject(p);var m=new e.Element("div",{id:o,"class":"thumbName",html:n.attributes._Name,activated:r}).inject(p);u.thumbImgs[o]=new e.Element("div",{"class":"CmdChooseAnimation-thumbnail-image"}).inject(l);if(u.animScreenshots.length===0){u.thumbImgs[o].addClassName("CmdChooseAnimation-thumbnail-save-animation")}require(["DS/Core/Events"],function(v){v.subscribe({event:"CMDCHOOSEANIMATION/SCREENSHOT_SAVED"},function(w){u.injectScreenshot(w,o,u.thumbImgs[o])})})},injectScreenshot:function(m,p,s){var t=this;if(m.animationId===p){var o=t.animScreenshots[m.animationId];var q=o[m.screenshotId];var r=parseInt(q.id);var n=s.getElementsByTagName("img");if(n.length===0){q.inject(s)}else{var l=0;while(l<n.length){if(parseInt(n[l].id)>r){q.inject(n[l],"before");break}++l}if(l===n.length){q.inject(s)}}}},getScreenshot:function(p){var D=p.width;var B=p.height;var A=p.reductionFactor;this._kinWidth=D;this._kinHeight=B;var l=this.getFrameWindow().getViewer();var H=0;var G=0;var r=0;var z=0;if(l.save){l.save()}var x=l.currentViewpoint;var F={data:null,width:l.SCREEN_WIDTH,height:l.SCREEN_HEIGHT};var o=document.createElement("canvas");o.width=D?D:F.width;o.height=B?B:F.height;o.width=A?o.width/A:o.width;o.height=A?o.height/A:o.height;x.getControl().update();l.renderToTarget(F,x);var E=o.getContext("2d");var C=E.getImageData(0,0,o.width,o.height);if(C.width!==o.width){console.error("error");return undefined}if(C.height!==o.height){console.error("error");return undefined}var n=(F.width-1)/(C.width-1);var v=(F.height-1)/(C.height-1);var t=F.data;var M=C.data;if(n===1&&v===1){var I=C.height;var u=C.width;var s=4*u;for(G=0;G<I;G++){r=4*(G*u);z=4*((I-G)*u);for(H=s;H--;){M[r+H]=t[z+H]}}}else{var L=function(P,O,N,Q,R){if(R){O=Q-O}return N*O+P};var y=C.height;var q=C.width;var m=F.height;var K=F.width;for(G=0;G<y;G++){var J=Math.floor(v*G);for(H=0;H<q;H++){r=4*L(H,G,q,y);z=4*L(Math.floor(n*H),J,K,m,true);M[r]=t[z];M[r+1]=t[z+1];M[r+2]=t[z+2];M[r+3]=t[z+3];if(M[r]>=254&&M[r+1]>=254&&M[r+2]>=254){M[r]=234;M[r+1]=233;M[r+2]=233;M[r+3]=1}}}}E.putImageData(C,0,0,0,0,o.width,o.height);return(o.toDataURL("image/png"))},saveAnimationScreenshot:function(r){var t=this;var p=r;var m=t.animations[p];var l=m.attributes._VariantLine.attributes._OrderedIndexes.length;var s=t.NB_SCREENSHOTS_PER_ANIMATION;var q=t.getFrameWindow().getViewer();t._viewpointForAnimation=q.currentViewpoint;for(var o=0;o<s;++o){var n=parseInt(o*l/s);t.saveScreenshot(m,r,o,n)}},saveScreenshot:function(o,n,l,p){var m=this;require(["DS/Core/Events"],function(q){var v=m.getFrameWindow().getViewer();var s=v.backgroundColor;v.setBackgroundColor();var t=new k(m.getFrameWindow(),o,m.keyFramer);t.goToIndex(p);var u=m.getScreenshot({reductionFactor:6});t.goToIndex(0);var r=new e.Element("img");r.id=l;r.src=u;m.animScreenshots[n][l]=r;q.publish({event:"CMDCHOOSEANIMATION/SCREENSHOT_SAVED",data:{animationId:n,screenshotId:l}});t.reset();v.setBackgroundColor(s)})},startThumbnailAnimations:function(){var l=this;var n=document.getElementsByClassName("CmdChooseAnimation-thumbnail-animation");var m=0;l.animateThumbnails=setInterval(function(){for(var p=0;p<n.length;++p){var q=n[p].children;var o=q.length;q[m%o].style.display="none";q[(m+1)%o].style.display="block"}++m},100)},stopThumbnailAnimations:function(){var l=this;clearInterval(l.animateThumbnails);var n=document.getElementsByClassName("CmdChooseAnimation-thumbnail-animation");for(var o=0;o<n.length;++o){var p=n[o].children;p[0].style.display="block";for(var m=1;m<p.length;++m){p[m].style.display="none"}}}});return a});