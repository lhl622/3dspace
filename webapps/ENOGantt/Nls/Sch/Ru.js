define("DS/ENOGantt/Nls/Sch/Ru",["DS/ENOGantt/Ven/Ext","DS/ENOGantt/Nls/Sch/Helper"],function(a){a.define("Sch.locale.Ru",{extend:"Sch.locale.Locale",singleton:true,l10n:{"Sch.util.Date":{unitNames:{YEAR:{single:"год",plural:"годы",abbrev:"г"},QUARTER:{single:"квартал",plural:"кварталы",abbrev:"кв"},MONTH:{single:"месяц",plural:"месяцы",abbrev:"мес"},WEEK:{single:"неделя",plural:"недели",abbrev:"н"},DAY:{single:"день",plural:"дни",abbrev:"д"},HOUR:{single:"час",plural:"ч.",abbrev:"ч"},MINUTE:{single:"минута",plural:"мин",abbrev:"мин"},SECOND:{single:"секунда",plural:"сек",abbrev:""},MILLI:{single:"мс",plural:"мс",abbrev:"мс"}}},"Sch.model.CalendarDay":{startTimeAfterEndTime:"Время начала {0} наступает позже, чем время окончания {1}",availabilityIntervalsShouldNotIntersect:"Интервалы доступности не должны пересекать: [{0}] и [{1}]",invalidFormat:"Недопустимый формат для строки доступности: {0}. Это должен быть формат чч:мм-чч:мм"},"Sch.panel.SchedulerTree":{"All day":"Весь день"},"Sch.panel.SchedulerGrid":{"All day":"Весь день"},"Sch.panel.TimelineGridPanel":{weekStartDay:1,loadingText:"Выполняется загрузка... Подождите",savingText:"Сохранение изменений. Подождите..."},"Sch.panel.TimelineTreePanel":{weekStartDay:1,loadingText:"Выполняется загрузка... Подождите",savingText:"Сохранение изменений. Подождите..."},"Sch.mixin.SchedulerView":{loadingText:"Загрузка событий..."},"Sch.plugin.CurrentTimeLine":{tooltipText:"Текущее время"},"Sch.widget.recurrence.ConfirmationDialog":{"delete-title":"Вы удаляете событие","delete-all-message":"Удалить все вхождения этого события?","delete-further-message":"Удалить это и все будущие вхождения данного события или только выбранное вхождение?","delete-all-btn-text":"Удалить все","delete-further-btn-text":"Удалить все будущие события","delete-only-this-btn-text":"Удалить только это событие","update-title":"Вы меняете повторяющееся событие","update-all-message":"Изменить все вхождения этого события?","update-further-message":"Изменить только это вхождение события или это и все будущие вхождения?","update-all-btn-text":"Все","update-further-btn-text":"Все будущие события","update-only-this-btn-text":"Только это событие",Yes:"Да",Cancel:"Отмена"},"Sch.widget.recurrence.Dialog":{"Repeat event":"Повторить событие",Cancel:"Отмена",Save:"Сохранить"},"Sch.widget.recurrence.Form":{Frequency:"Частота",Every:"Кажд.",DAILYintervalUnit:"д.",WEEKLYintervalUnit:"нед. в:",MONTHLYintervalUnit:"мес.",YEARLYintervalUnit:"год (лет) в:",Each:"Кажд.","On the":"В","End repeat":"Окончить повторение","time(s)":"раз(а)"},"Sch.widget.recurrence.field.DaysComboBox":{day:"д.",weekday:"день недели","weekend day":"выходной день"},"Sch.widget.recurrence.field.PositionsComboBox":{position1:"первый",position2:"второй",position3:"третий",position4:"четвертый",position5:"пятый","position-1":"последний"},"Sch.data.util.recurrence.Legend":{", ":", "," and ":" и ",Daily:"Ежедневно","Weekly on {1}":"Еженедельно в {1}","Monthly on {1}":"Ежемесячно в {1}","Yearly on {1} of {2}":"Ежегодно в {1} месяца ({2})","Every {0} days":"Кажд. {0} д.","Every {0} weeks on {1}":"Кажд. {0} нед. в {1}","Every {0} months on {1}":"Кажд. {0} мес. в {1}","Every {0} years on {1} of {2}":"Кажд. {0} года (лет) в {1} месяца {2}",position1:"первый",position2:"второй",position3:"третий",position4:"четвертый",position5:"пятый","position-1":"последний",day:"день",weekday:"день недели","weekend day":"выходной день",daysFormat:"{0} {1}"},"Sch.widget.recurrence.field.StopConditionComboBox":{Never:"Никогда",After:"После","On date":"На дату"},"Sch.widget.recurrence.field.FrequencyComboBox":{Daily:"Ежедневно",Weekly:"Еженедельно",Monthly:"Ежемесячно",Yearly:"Ежегодно"},"Sch.widget.recurrence.field.RecurrenceComboBox":{None:"Нет","Custom...":"Настройка..."},"Sch.widget.EventEditor":{Repeat:"Повторять",saveText:"Сохранить",deleteText:"Удалить",cancelText:"Отмена",nameText:"Имя",allDayText:"Весь день",startDateText:"Начать",endDateText:"Завершение",resourceText:"Ресурс"},"Sch.plugin.SimpleEditor":{newEventText:"Создать бронирование..."},"Sch.widget.ExportDialogForm":{formatFieldLabel:"Формат бумаги",orientationFieldLabel:"Ориентация",rangeFieldLabel:"Диапазон по графику",showHeaderLabel:"Показать заголовок",showFooterLabel:"Показать нижний колонтитул",orientationPortraitText:"Портретная",orientationLandscapeText:"Общий вид",completeViewText:"Заполнить график",currentViewText:"Отображаемый график",dateRangeText:"Диапазон дат",dateRangeFromText:"Экспорт из",dateRangeToText:"Экспорт в",exportersFieldLabel:"Управление разбивкой страниц",adjustCols:"Регулировка ширины столбца",adjustColsAndRows:"Регулировка ширины столбца и высоты строки",specifyDateRange:"Укажите диапазон дат",columnPickerLabel:"Выбор столбцов",completeDataText:"Заполнить график (для всех событий)",dpiFieldLabel:"DPI (точек на дюйм)",rowsRangeLabel:"Диапазон строк",allRowsLabel:"Все строки",visibleRowsLabel:"Отображаемые строки",columnEmptyText:"[без названия]"},"Sch.widget.ExportDialog":{title:"Настройки экспорта",exportButtonText:"Экспорт",cancelButtonText:"Отмена",progressBarText:"Экспорт..."},"Sch.plugin.Export":{generalError:"Произошла ошибка",fetchingRows:"Извлечение строк: {0} из {1}",builtPage:"Создать страницу {0} из {1}",requestingPrintServer:"Подождите…"},"Sch.plugin.Printable":{dialogTitle:"Настройки печати",exportButtonText:"Печать",disablePopupBlocking:"Отключите блокировщик всплывающих окон, так как подключаемому модулю печати необходимо открыть дополнительные вкладки",popupBlockerDetected:"Обнаружен блокировщик всплывающих окон браузера"},"Sch.plugin.exporter.AbstractExporter":{name:"Экспортер"},"Sch.plugin.exporter.SinglePage":{name:"Отдельная страница"},"Sch.plugin.exporter.MultiPageVertical":{name:"Несколько страниц (вертикально)"},"Sch.plugin.exporter.MultiPage":{name:"Несколько страниц"},"Sch.plugin.Split":{splitText:"Разделить",mergeText:"Скрыть разделенную деталь"},"Sch.plugin.SummaryBar":{totalText:"Итого"},"Sch.column.ResourceName":{name:"Имя"},"Sch.template.DependencyInfo":{fromText:"С",toText:"До"},"Sch.preset.Manager":{hourAndDay:{displayDateFormat:"G:i",middleDateFormat:"G:i",topDateFormat:"D d/m"},secondAndMinute:{displayDateFormat:"g:i:s",topDateFormat:"D, d g:iA"},dayAndWeek:{displayDateFormat:"d/m h:i A",middleDateFormat:"D d M"},weekAndDay:{displayDateFormat:"d/m",bottomDateFormat:"d M",middleDateFormat:"Y F d"},weekAndMonth:{displayDateFormat:"d/m/Y",middleDateFormat:"d/m",topDateFormat:"d/m/Y"},weekAndDayLetter:{displayDateFormat:"d/m/Y",middleDateFormat:"D d M Y"},weekDateAndMonth:{displayDateFormat:"d/m/Y",middleDateFormat:"d",topDateFormat:"Y F"},monthAndYear:{displayDateFormat:"d/m/Y",middleDateFormat:"M Y",topDateFormat:"Y"},year:{displayDateFormat:"d/m/Y",middleDateFormat:"Y"},manyYears:{displayDateFormat:"d/m/Y",middleDateFormat:"Y"}}}})});