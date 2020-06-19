define("DS/ENOGantt/Nls/Ext/En",["DS/ENOGantt/Ven/Ext"],function(a){if(a.data&&a.data.Types){a.data.Types.stripRe=/[\$,%]/g}if(a.Date){a.Date.monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];a.Date.getShortMonthName=function(b){return a.Date.monthNames[b].substring(0,3)};a.Date.monthNumbers={January:0,Jan:0,February:1,Feb:1,March:2,Mar:2,April:3,Apr:3,May:4,June:5,Jun:5,July:6,Jul:6,August:7,Aug:7,September:8,Sep:8,October:9,Oct:9,November:10,Nov:10,December:11,Dec:11};a.Date.getMonthNumber=function(b){return a.Date.monthNumbers[b.substring(0,1).toUpperCase()+b.substring(1,3).toLowerCase()]};a.Date.dayNames=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];a.Date.getShortDayName=function(b){return a.Date.dayNames[b].substring(0,3)};a.Date.parseCodes.S.s="(?:st|nd|rd|th)";a.Date.firstDayOfWeek=0;a.Date.weekendDays=[6,0]}if(a.util&&a.util.Format){a.apply(a.util.Format,{thousandSeparator:",",decimalSeparator:".",currencySign:"$",dateFormat:"m/d/Y"})}a.define("Ext.locale.en.data.validator.Bound",{override:"Ext.data.validator.Bound",emptyMessage:"Must be present"});a.define("Ext.locale.en.data.validator.Email",{override:"Ext.data.validator.Email",message:"Is not a valid email address"});a.define("Ext.locale.en.data.validator.Exclusion",{override:"Ext.data.validator.Exclusion",message:"Is a value that has been excluded"});a.define("Ext.locale.en.data.validator.Format",{override:"Ext.data.validator.Format",message:"Is in the wrong format"});a.define("Ext.locale.en.data.validator.Inclusion",{override:"Ext.data.validator.Inclusion",message:"Is not in the list of acceptable values"});a.define("Ext.locale.en.data.validator.Length",{override:"Ext.data.validator.Length",minOnlyMessage:"Length must be at least {0}",maxOnlyMessage:"Length must be no more than {0}",bothMessage:"Length must be between {0} and {1}"});a.define("Ext.locale.en.data.validator.Presence",{override:"Ext.data.validator.Presence",message:"Must be present"});a.define("Ext.locale.en.data.validator.Range",{override:"Ext.data.validator.Range",minOnlyMessage:"Must be must be at least {0}",maxOnlyMessage:"Must be no more than than {0}",bothMessage:"Must be between {0} and {1}",nanMessage:"Must be numeric"});a.define("Ext.locale.en.view.View",{override:"Ext.view.View",emptyText:""});a.define("Ext.locale.en.grid.plugin.DragDrop",{override:"Ext.grid.plugin.DragDrop",dragText:"{0} selected row{1}"});a.define("Ext.locale.en.view.AbstractView",{override:"Ext.view.AbstractView",loadingText:"Loading..."});a.define("Ext.locale.en.picker.Date",{override:"Ext.picker.Date",todayText:"Today",minText:"This date is before the minimum date",maxText:"This date is after the maximum date",disabledDaysText:"",disabledDatesText:"",nextText:"Next Month (Control+Right)",prevText:"Previous Month (Control+Left)",monthYearText:"Choose a month (Control+Up/Down to move years)",todayTip:"{0} (Spacebar)",format:"m/d/y",startDay:0});a.define("Ext.locale.en.picker.Month",{override:"Ext.picker.Month",okText:"&#160;OK&#160;",cancelText:"Cancel"});a.define("Ext.locale.en.toolbar.Paging",{override:"Ext.PagingToolbar",beforePageText:"Page",afterPageText:"of {0}",firstText:"First Page",prevText:"Previous Page",nextText:"Next Page",lastText:"Last Page",refreshText:"Refresh",displayMsg:"Displaying {0} - {1} of {2}",emptyMsg:"No data to display"});a.define("Ext.locale.en.form.Basic",{override:"Ext.form.Basic",waitTitle:"Please Wait..."});a.define("Ext.locale.en.form.field.Base",{override:"Ext.form.field.Base",invalidText:"The value in this field is invalid"});a.define("Ext.locale.en.form.field.Text",{override:"Ext.form.field.Text",minLengthText:"The minimum length for this field is {0}",maxLengthText:"The maximum length for this field is {0}",blankText:"This field is required",regexText:"",emptyText:null});a.define("Ext.locale.en.form.field.Number",{override:"Ext.form.field.Number",decimalPrecision:2,minText:"The minimum value for this field is {0}",maxText:"The maximum value for this field is {0}",nanText:"{0} is not a valid number"});a.define("Ext.locale.en.form.field.Date",{override:"Ext.form.field.Date",disabledDaysText:"Disabled",disabledDatesText:"Disabled",minText:"The date in this field must be after {0}",maxText:"The date in this field must be before {0}",invalidText:"{0} is not a valid date - it must be in the format {1}",format:"m/d/y",altFormats:"m/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d"});a.define("Ext.locale.en.form.field.ComboBox",{override:"Ext.form.field.ComboBox",valueNotFoundText:undefined},function(){a.apply(a.form.field.ComboBox.prototype.defaultListConfig,{loadingText:"Loading..."})});a.define("Ext.locale.en.form.field.VTypes",{override:"Ext.form.field.VTypes",emailText:'This field should be an e-mail address in the format "user@example.com"',urlText:'This field should be a URL in the format "http://www.example.com"',alphaText:"This field should only contain letters and _",alphanumText:"This field should only contain letters, numbers and _"});a.define("Ext.locale.en.form.field.HtmlEditor",{override:"Ext.form.field.HtmlEditor",createLinkText:"Please enter the URL for the link:"},function(){a.apply(a.form.field.HtmlEditor.prototype,{buttonTips:{bold:{title:"Bold (Ctrl+B)",text:"Make the selected text bold.",cls:a.baseCSSPrefix+"html-editor-tip"},italic:{title:"Italic (Ctrl+I)",text:"Make the selected text italic.",cls:a.baseCSSPrefix+"html-editor-tip"},underline:{title:"Underline (Ctrl+U)",text:"Underline the selected text.",cls:a.baseCSSPrefix+"html-editor-tip"},increasefontsize:{title:"Grow Text",text:"Increase the font size.",cls:a.baseCSSPrefix+"html-editor-tip"},decreasefontsize:{title:"Shrink Text",text:"Decrease the font size.",cls:a.baseCSSPrefix+"html-editor-tip"},backcolor:{title:"Text Highlight Color",text:"Change the background color of the selected text.",cls:a.baseCSSPrefix+"html-editor-tip"},forecolor:{title:"Font Color",text:"Change the color of the selected text.",cls:a.baseCSSPrefix+"html-editor-tip"},justifyleft:{title:"Align Text Left",text:"Align text to the left.",cls:a.baseCSSPrefix+"html-editor-tip"},justifycenter:{title:"Center Text",text:"Center text in the editor.",cls:a.baseCSSPrefix+"html-editor-tip"},justifyright:{title:"Align Text Right",text:"Align text to the right.",cls:a.baseCSSPrefix+"html-editor-tip"},insertunorderedlist:{title:"Bullet List",text:"Start a bulleted list.",cls:a.baseCSSPrefix+"html-editor-tip"},insertorderedlist:{title:"Numbered List",text:"Start a numbered list.",cls:a.baseCSSPrefix+"html-editor-tip"},createlink:{title:"Hyperlink",text:"Make the selected text a hyperlink.",cls:a.baseCSSPrefix+"html-editor-tip"},sourceedit:{title:"Source Edit",text:"Switch to source editing mode.",cls:a.baseCSSPrefix+"html-editor-tip"}}})});a.define("Ext.locale.en.grid.header.Container",{override:"Ext.grid.header.Container",sortAscText:"Sort Ascending",sortDescText:"Sort Descending",columnsText:"Columns"});a.define("Ext.locale.en.grid.GroupingFeature",{override:"Ext.grid.feature.Grouping",emptyGroupText:"(None)",groupByText:"Group by this field",showGroupsText:"Show in Groups"});a.define("Ext.locale.en.grid.PropertyColumnModel",{override:"Ext.grid.PropertyColumnModel",nameText:"Name",valueText:"Value",dateFormat:"m/j/Y",trueText:"true",falseText:"false"});a.define("Ext.locale.en.grid.BooleanColumn",{override:"Ext.grid.BooleanColumn",trueText:"true",falseText:"false",undefinedText:"&#160;"});a.define("Ext.locale.en.grid.NumberColumn",{override:"Ext.grid.NumberColumn",format:"0,000.00"});a.define("Ext.locale.en.grid.DateColumn",{override:"Ext.grid.DateColumn",format:"m/d/Y"});a.define("Ext.locale.en.form.field.Time",{override:"Ext.form.field.Time",minText:"The time in this field must be equal to or after {0}",maxText:"The time in this field must be equal to or before {0}",invalidText:"{0} is not a valid time",format:"g:i A",altFormats:"g:ia|g:iA|g:i a|g:i A|h:i|g:i|H:i|ga|ha|gA|h a|g a|g A|gi|hi|gia|hia|g|H"});a.define("Ext.locale.en.form.field.File",{override:"Ext.form.field.File",buttonText:"Browse..."});a.define("Ext.locale.en.form.CheckboxGroup",{override:"Ext.form.CheckboxGroup",blankText:"You must select at least one item in this group"});a.define("Ext.locale.en.form.RadioGroup",{override:"Ext.form.RadioGroup",blankText:"You must select one item in this group"});a.define("Ext.locale.en.window.MessageBox",{override:"Ext.window.MessageBox",buttonText:{ok:"OK",cancel:"Cancel",yes:"Yes",no:"No"}});a.define("Ext.locale.en.grid.filters.Filters",{override:"Ext.grid.filters.Filters",menuFilterText:"Filters"});a.define("Ext.locale.en.grid.filters.filter.Boolean",{override:"Ext.grid.filters.filter.Boolean",yesText:"Yes",noText:"No"});a.define("Ext.locale.en.grid.filters.filter.Date",{override:"Ext.grid.filters.filter.Date",fields:{lt:{text:"Before"},gt:{text:"After"},eq:{text:"On"}},dateFormat:null});a.define("Ext.locale.en.grid.filters.filter.List",{override:"Ext.grid.filters.filter.List",loadingText:"Loading..."});a.define("Ext.locale.en.grid.filters.filter.Number",{override:"Ext.grid.filters.filter.Number",emptyText:"Enter Number..."});a.define("Ext.locale.en.grid.filters.filter.String",{override:"Ext.grid.filters.filter.String",emptyText:"Enter Filter Text..."});a.define("Ext.locale.en.view.MultiSelectorSearch",{override:"Ext.view.MultiSelectorSearch",searchText:"Search..."});a.define("Ext.locale.en.view.MultiSelector",{override:"Ext.view.MultiSelector",emptyText:"Nothing selected",removeRowTip:"Remove this item",addToolText:"Search for items to add"});a.define("Ext.locale.en.Component",{override:"Ext.Component"})});