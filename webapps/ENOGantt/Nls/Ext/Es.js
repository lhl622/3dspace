define("DS/ENOGantt/Nls/Ext/Es",["DS/ENOGantt/Ven/Ext"],function(a){if(a.data&&a.data.Types){a.data.Types.stripRe=/[\$,%]/g}if(a.Date){a.Date.monthNames=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];a.Date.getShortMonthName=function(b){return a.Date.monthNames[b].substring(0,3)};a.Date.monthNumbers={Enero:0,Ene:0,Febrero:1,Feb:1,Marzo:2,Mar:2,Abril:3,Abr:3,Mayo:4,May:4,Junio:5,Jun:5,Julio:6,Jul:6,Agosto:7,Ago:7,Septiembre:8,Sep:8,Octubre:9,Oct:9,Noviembre:10,Nov:10,Diciembre:11,Dic:11};a.Date.getMonthNumber=function(b){return a.Date.monthNumbers[b.substring(0,1).toUpperCase()+b.substring(1,3).toLowerCase()]};a.Date.dayNames=["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];a.Date.getShortDayName=function(b){return a.Date.dayNames[b].substring(0,3)};a.Date.parseCodes.S.s="(?:st|nd|rd|th)";a.Date.firstDayOfWeek=0;a.Date.weekendDays=[6,0]}if(a.util&&a.util.Format){a.apply(a.util.Format,{thousandSeparator:".",decimalSeparator:",",currencySign:"$",dateFormat:"d/m/Y"})}a.define("Ext.locale.es.data.validator.Bound",{override:"Ext.data.validator.Bound",emptyMessage:"Debe estar presente"});a.define("Ext.locale.es.data.validator.Email",{override:"Ext.data.validator.Email",message:"No es una dirección de correo electrónico válida"});a.define("Ext.locale.es.data.validator.Exclusion",{override:"Ext.data.validator.Exclusion",message:"Es un valor que ha sido excluido"});a.define("Ext.locale.es.data.validator.Format",{override:"Ext.data.validator.Format",message:"Tiene un formato incorrecto"});a.define("Ext.locale.es.data.validator.Inclusion",{override:"Ext.data.validator.Inclusion",message:"No está en la lista de valores aceptables"});a.define("Ext.locale.es.data.validator.Length",{override:"Ext.data.validator.Length",minOnlyMessage:"La longitud debe ser de al menos {0}",maxOnlyMessage:"La longitud no debe exceder {0}",bothMessage:"La longitud debe estar entre {0} y {1}"});a.define("Ext.locale.es.data.validator.Presence",{override:"Ext.data.validator.Presence",message:"Debe estar presente"});a.define("Ext.locale.es.data.validator.Range",{override:"Ext.data.validator.Range",minOnlyMessage:"Debe ser de al menos {0}",maxOnlyMessage:"No debe exceder {0}",bothMessage:"Debe estar entre {0} y {1}",nanMessage:"Debe ser numérico"});a.define("Ext.locale.es.view.View",{override:"Ext.view.View",emptyText:""});a.define("Ext.locale.es.grid.plugin.DragDrop",{override:"Ext.grid.plugin.DragDrop",dragText:"{0} fila seleccionada{1}"});a.define("Ext.locale.es.view.AbstractView",{override:"Ext.view.AbstractView",loadingText:"Cargando..."});a.define("Ext.locale.es.picker.Date",{override:"Ext.picker.Date",todayText:"Hoy",minText:"Esta fecha es anterior a la fecha mínima",maxText:"Esta fecha es posterior a la fecha máxima",disabledDaysText:"",disabledDatesText:"",nextText:"Mes siguiente (Control+Derecha)",prevText:"Mes anterior (Control+Izquierda)",monthYearText:"Seleccione un mes (Control+Arriba/Abajo para desplazarse por los años)",todayTip:"{0} (Barra espaciadora)",format:"d/m/y",startDay:0});a.define("Ext.locale.es.picker.Month",{override:"Ext.picker.Month",okText:"&#160;Aceptar&#160;",cancelText:"Cancelar"});a.define("Ext.locale.es.toolbar.Paging",{override:"Ext.PagingToolbar",beforePageText:"Página",afterPageText:"de {0}",firstText:"Primera página",prevText:"Página anterior",nextText:"Página siguiente",lastText:"Última página",refreshText:"Actualizar",displayMsg:"Mostrando {0} - {1} de {2}",emptyMsg:"No hay datos para ver."});a.define("Ext.locale.es.form.Basic",{override:"Ext.form.Basic",waitTitle:"Espere..."});a.define("Ext.locale.es.form.field.Base",{override:"Ext.form.field.Base",invalidText:"El valor de este campo no es válido"});a.define("Ext.locale.es.form.field.Text",{override:"Ext.form.field.Text",minLengthText:"La longitud mínima de este campo es {0}",maxLengthText:"La longitud máxima de este campo es {0}",blankText:"Este campo es obligatorio",regexText:"",emptyText:null});a.define("Ext.locale.es.form.field.Number",{override:"Ext.form.field.Number",decimalPrecision:2,minText:"El valor mínimo para este campo es {0}",maxText:"El valor máximo para este campo es {0}",nanText:"{0} no es un número válido"});a.define("Ext.locale.es.form.field.Date",{override:"Ext.form.field.Date",disabledDaysText:"Desactivado",disabledDatesText:"Desactivado",minText:"La fecha en este campo debe ser posterior al {0}",maxText:"La fecha en este campo debe ser anterior al {0}",invalidText:"{0} no es una fecha válida; debe tener el formato {1}",format:"d/m/y",altFormats:"d/m/Y|d-m-y|d-m-Y|d/m|d-m|dm|dmy|dmY|d|d-m-Y"});a.define("Ext.locale.es.form.field.ComboBox",{override:"Ext.form.field.ComboBox",valueNotFoundText:undefined},function(){a.apply(a.form.field.ComboBox.prototype.defaultListConfig,{loadingText:"Cargando..."})});a.define("Ext.locale.es.form.field.VTypes",{override:"Ext.form.field.VTypes",emailText:'Este campo debe ser una dirección de correo electrónico con el formato "usuario@ejemplo.com"',urlText:'Este campo debe ser una dirección URL con el formato "http://www.ejemplo.com"',alphaText:"Este campo solo debe contener letras y _",alphanumText:"Este campo solo debe contener letras, números y _"});a.define("Ext.locale.es.form.field.HtmlEditor",{override:"Ext.form.field.HtmlEditor",createLinkText:"Introduzca la dirección URL para el vínculo:"},function(){a.apply(a.form.field.HtmlEditor.prototype,{buttonTips:{bold:{title:"Negrita (Ctrl+B)",text:"Aplica el formato de negrita al texto seleccionado.",cls:a.baseCSSPrefix+"html-editor-tip"},italic:{title:"Cursiva (Ctrl+I)",text:"Aplica el formato de cursiva al texto seleccionado.",cls:a.baseCSSPrefix+"html-editor-tip"},underline:{title:"Subrayado (Ctrl+U)",text:"Subraya el texto seleccionado.",cls:a.baseCSSPrefix+"html-editor-tip"},increasefontsize:{title:"Aumentar texto",text:"Aumenta el tamaño de la fuente.",cls:a.baseCSSPrefix+"html-editor-tip"},decreasefontsize:{title:"Reducir texto",text:"Reduce el tamaño de la fuente.",cls:a.baseCSSPrefix+"html-editor-tip"},backcolor:{title:"Color de resaltado de texto",text:"Cambia el color de fondo del texto seleccionado.",cls:a.baseCSSPrefix+"html-editor-tip"},forecolor:{title:"Color de fuente",text:"Cambia el color del texto seleccionado.",cls:a.baseCSSPrefix+"html-editor-tip"},justifyleft:{title:"Alinear texto a la izquierda",text:"Alinea el texto a la izquierda.",cls:a.baseCSSPrefix+"html-editor-tip"},justifycenter:{title:"Centrar texto",text:"Centra el texto en el editor.",cls:a.baseCSSPrefix+"html-editor-tip"},justifyright:{title:"Alinear texto a la derecha",text:"Alinea el texto a la derecha.",cls:a.baseCSSPrefix+"html-editor-tip"},insertunorderedlist:{title:"Lista de viñetas",text:"Inicia una lista con viñetas.",cls:a.baseCSSPrefix+"html-editor-tip"},insertorderedlist:{title:"Lista numerada",text:"Inicia una lista numerada.",cls:a.baseCSSPrefix+"html-editor-tip"},createlink:{title:"Hipervínculo",text:"Convierte el texto seleccionado en un hipervínculo.",cls:a.baseCSSPrefix+"html-editor-tip"},sourceedit:{title:"Modificar código fuente",text:"Cambia al modo de edición de código fuente.",cls:a.baseCSSPrefix+"html-editor-tip"}}})});a.define("Ext.locale.es.grid.header.Container",{override:"Ext.grid.header.Container",sortAscText:"Orden ascendente",sortDescText:"Orden descendente",columnsText:"Columnas"});a.define("Ext.locale.es.grid.GroupingFeature",{override:"Ext.grid.feature.Grouping",emptyGroupText:"(Ninguno)",groupByText:"Agrupar por este campo",showGroupsText:"Mostrar en grupos"});a.define("Ext.locale.es.grid.PropertyColumnModel",{override:"Ext.grid.PropertyColumnModel",nameText:"Nombre",valueText:"Valor",dateFormat:"j/m/Y",trueText:"verdadero",falseText:"falso"});a.define("Ext.locale.es.grid.BooleanColumn",{override:"Ext.grid.BooleanColumn",trueText:"verdadero",falseText:"falso",undefinedText:"&#160;"});a.define("Ext.locale.es.grid.NumberColumn",{override:"Ext.grid.NumberColumn",format:"0.000,00"});a.define("Ext.locale.es.grid.DateColumn",{override:"Ext.grid.DateColumn",format:"d/m/Y"});a.define("Ext.locale.es.form.field.Time",{override:"Ext.form.field.Time",minText:"La hora en este campo debe ser igual o posterior a {0}",maxText:"La hora en este campo debe ser igual o anterior a {0}",invalidText:"{0} no es una hora válida",format:"g:i A",altFormats:"g:ia|g:iA|g:i a|g:i A|h:i|g:i|H:i|ga|ha|gA|h a|g a|g A|gi|hi|gia|hia|g|H"});a.define("Ext.locale.es.form.field.File",{override:"Ext.form.field.File",buttonText:"Examinar..."});a.define("Ext.locale.es.form.CheckboxGroup",{override:"Ext.form.CheckboxGroup",blankText:"Debe seleccionar al menos un elemento en este grupo."});a.define("Ext.locale.es.form.RadioGroup",{override:"Ext.form.RadioGroup",blankText:"Debe seleccionar un elemento en este grupo"});a.define("Ext.locale.es.window.MessageBox",{override:"Ext.window.MessageBox",buttonText:{ok:"Aceptar",cancel:"Cancelar",yes:"Sí",no:"No"}});a.define("Ext.locale.es.grid.filters.Filters",{override:"Ext.grid.filters.Filters",menuFilterText:"Filtros"});a.define("Ext.locale.es.grid.filters.filter.Boolean",{override:"Ext.grid.filters.filter.Boolean",yesText:"Sí",noText:"No"});a.define("Ext.locale.es.grid.filters.filter.Date",{override:"Ext.grid.filters.filter.Date",fields:{lt:{text:"Anterior"},gt:{text:"Posterior"},eq:{text:"El"}},dateFormat:null});a.define("Ext.locale.es.grid.filters.filter.List",{override:"Ext.grid.filters.filter.List",loadingText:"Cargando..."});a.define("Ext.locale.es.grid.filters.filter.Number",{override:"Ext.grid.filters.filter.Number",emptyText:"Introducir número..."});a.define("Ext.locale.es.grid.filters.filter.String",{override:"Ext.grid.filters.filter.String",emptyText:"Introducir texto de filtro..."});a.define("Ext.locale.es.view.MultiSelectorSearch",{override:"Ext.view.MultiSelectorSearch",searchText:"Buscar..."});a.define("Ext.locale.es.view.MultiSelector",{override:"Ext.view.MultiSelector",emptyText:"Nada seleccionado",removeRowTip:"Quitar este elemento",addToolText:"Buscar elementos para agregar"});a.define("Ext.locale.es.Component",{override:"Ext.Component"})});