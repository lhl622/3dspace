require(["DS/SMAProcWebCommonControls/Polymer"],function(a){window.Polymer({is:"mft-process-file-row",properties:{activity:{type:Object},file:{type:Object,value:{}},downloadString:{type:String,value:null},uploadString:{type:String,value:null},input:{type:Boolean,value:false},output:{type:Boolean,value:false}},ready:function(){this.isReady=true;this.$.processFileExpandButtonImage.style.width="16px";this.$.processFileExpandButtonImage.style.height="16px";this.$.processFileCollapseButtonImage.style.width="16px";this.$.processFileCollapseButtonImage.style.height="16px";this.$.processFileMappingExpanded.style.display="none";this.listen(this.$.processFileExpandButton,"click","_expandButtonClicked");this.listen(this.$.processFileCollapseButton,"click","_collapseButtonClicked");this._updateFileName()},listeners:{"processFileMappingChooser.data-change":"_fileSelectionChange"},_fileSelectionChange:function(c){c.stopPropagation();var b=c.detail.value&&c.detail.value.file;this._updateFileName(b)},_updateFileName:function(b){if(b){this.$.processFileMappingLabel.innerText=b}else{this.$.processFileMappingLabel.innerText="(None)"}},_expandButtonClicked:function(b){this.$.fileMapping.style.width="330px";this.$.processFileMappingChooser.style.width="330px";this.$.processFileMappingCollapsed.style.display="none";this.$.processFileMappingExpanded.style.display="";b.stopPropagation()},_collapseButtonClicked:function(b){this.$.fileMapping.style.width="250px";this.$.processFileMappingChooser.style.width="250px";this.$.processFileMappingExpanded.style.display="none";this.$.processFileMappingCollapsed.style.display="";b.stopPropagation()},setInput:function(b){this.input=b},setOutput:function(b){this.output=b;if(this.output){this.$.processFileMappingChooser.mode="upload"}},setFile:function(b,d,c){this.file=b;this.activity=d;if(this.file){if(this.file.name){if(this.file.required&&this.file.required.toLowerCase()=="true"){this.$.fileName.innerText=this.file.name+" *"}else{this.$.fileName.innerText=this.file.name}if(this.file.description){}}if(this.file.path){this.$.filePath.innerText=this.file.path}if(this.file.type){}if(d){this.$.processFileMappingChooser.setContentService(c);this.$.processFileMappingChooser.setModel("content",d)}if(this.file.description){this.setAttribute("title",this.file.description)}else{this.setAttribute("title","")}}},getFileMapping:function(){var b;var c;if(this.input){b=this.$.processFileMappingChooser.getRule();c="input"}if(this.output){b=this.$.processFileMappingChooser.getRule();c="output"}if(b&&b.trim()!=""&&b.trim()!="undefined"&&this.file.id&&this.file.path){return{id:this.file.id,name:this.file.name,path:this.file.path,handler:b,mode:c}}return null},setFileMappings:function(d){if(this.file&&this.file.id){for(var c=0;c<d.length;c++){if(d[c]["id"]==this.file.id){var b=this.$.processFileMappingChooser.setRule(this.activity,d[c]["handler"]);this._updateFileName(b.file)}}}}})});