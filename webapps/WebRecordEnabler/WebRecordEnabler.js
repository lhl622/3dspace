(function(){function a(){if((typeof dscef!=="undefined")&&dscef.Record){return dscef.Record.isRecording()||dscef.Record.isReplaying()}if(window.document.title.indexOf("DS Recorder")===0){return false}if(window.DSWebRecord){return true}return false}var b=["DS/WebRecordBase/Utils","DS/WebRecordBase/TraceManager","DS/WebRecordBase/Constants"];if(a()){b=b.concat(["DS/WebRecordClient/Base/AdapterImpl","DS/WebRecordClient/Base/ComparatorBase","DS/WebRecordClient/Base/Recorder","DS/WebRecordClient/Base/WaitManager","DS/WebRecordUtils/DOMUtil","DS/WebRecordClient/Base/VersionHelper","DS/WebRecordClient/Record/RecordManager"])}define("DS/WebRecordEnabler/Adapter",b,function(d,m,k,c,f,i,l,j,e,h){f=f||{collectDataInTree:function(){return Promise.resolve([])},compareObject:function(){return false},compareArrayDeep:function(){return false},compareObjectDeep:function(){return false},compareTrees:function(){return false},compareData:function(){return false}};l=l||{addWaitCondition:function(){return"NOWAIT"},removeWaitCondition:function(){return false},hasWaitCondition:function(){return false},hasTimedOut:function(){return false}};j=j||{getRecordableAncestor:function(){return{}}};e=e||{toString:function(){return""},greaterThan:function(){return false}};h=h?{waitsFor:h._recorderInstance.waitsFor,checkPoint:h._recorderInstance.checkPoint}:{waitsFor:function(){return new function(){return Promise.resolve()}},checkPoint:function(){return new Promise(function(n){n({})})}};var g={getenv:function(n){var o=undefined;if(a()&&window.DSWebRecord&&window.DSWebRecord.getenv){o=window.DSWebRecord.getenv(n)}return o},isNative:function(){return d.isNative()},isActive:function(){return d.isActive()},isRecording:function(){return d.isRecording()},isReplaying:function(){return d.isReplaying()},pauseRecording:function(){return d.pauseRecording()},resumeRecording:function(){return d.resumeRecording()},isRecordingPaused:function(){return d.isRecordingPaused()},addStopCB:function(n){m.addStop(n)},register:function(o,n,p){if(typeof c!=="undefined"&&typeof i!=="undefined"){c.registerPath(i,o,n,p)}else{var q=o.prototype;if(!q&&o.constructor){q=o.constructor.prototype}q.markForRecord=function(){}}},registerObject:function(p,n,o,q){if(typeof c!=="undefined"&&typeof i!=="undefined"){c.registerModule(i,p,n,o,q)}else{var r=p.prototype;if(!r&&p.constructor){r=p.constructor.prototype}r.markForRecord=function(){}}},registerInteractionFilter:function(n){if(typeof c!=="undefined"){c.registerInteractionFilter(n)}},registerComparator:function(n){if(typeof c!=="undefined"){c.registerComparator(n)}},registerElement:function(q,n,o,p){if(typeof c!=="undefined"&&typeof i!=="undefined"){c.registerPathElement(i,q,n,o,p)}},registerElementObject:function(r,n,o,p,q){if(typeof c!=="undefined"&&typeof i!=="undefined"){c.registerModuleElement(i,r,n,o,p,q)}},ignoreForRecord:function(n){if(typeof c!=="undefined"){c.ignoreForRecord(n)}},addCustomInteraction:function(p,q,o,n){if(typeof c!=="undefined"){c.addCustomInteraction(p,q,o,n)}},setRecordMode:function(o,n){if(typeof c!=="undefined"){c.setRecordMode(o,n)}},setElementRecordMode:function(o,n){if(typeof c!=="undefined"){c.setElementRecordMode(o,n)}},setRecordModeLocked:function(o,n){if(typeof c!=="undefined"){c.setRecordModeLocked(o,n)}},setElementRecordModeLocked:function(o,n){if(typeof c!=="undefined"){c.setElementRecordModeLocked(o,n)}},isRecordModeLocked:function(n){if(typeof c!=="undefined"){return c.isRecordModeLocked(n)}},addMilestoneInteraction:function(p,o,n){if(typeof c!=="undefined"){c.addMilestoneInteraction(p,o,n)}},sendWebDriverMessage:function(n){if(typeof c!=="undefined"){return c.sendWebDriverMessage(n)}},isRecordReady:function(n){if(typeof c!=="undefined"){return c.isRecorderInitiated(n)}},TraceManager:m,Constants:k,ComparatorBase:f,WaitManager:l,DOMUtil:j,VersionHelper:e,RecordManager:h};return g})})();