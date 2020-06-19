define("DS/AuthGenericCommands/AuthGenericCommands_de",{});define("DS/AuthGenericCommands/assets/nls/AuthDlgReorder",{modalHeader:"Strukturneuordnung",modalFooterReset:"Strukturreihenfolge zurücksetzen",modalFooterOK:"OK",modalFooterCancel:"Abbrechen",upArrow:"Auswahl nach oben verschieben",downArrow:"Auswahl nach unten verschieben",freeArrow:"Auswahl beliebig bewegen",TreeListViewHeaderName:"Titel",TreeListViewHeaderResponsible:"Verantwortlich",TreeListViewHeaderModifiedDate:"Änderungsdatum",TreeListViewHeaderCreationDate:"Erstellungsdatum"});define("DS/AuthGenericCommands/assets/nls/AuthDlgRevisionUpdate",{modalFooterOK:"OK",modalFooterCancel:"Abbrechen",TreeListViewHeaderName:"Titel",TreeListViewHeaderRevisionCurrent:"Revision",TreeListViewHeaderAction:"Aktion ersetzen",TreeListViewHeaderRevisionPreview:"Erwartete Revision",TreeListViewHeaderMaturityCurrent:"Bearbeitungsstatus",TreeListViewHeaderMaturityPreview:"Erwarteter Bearbeitungsstatus",TreeListViewHeaderType:"Typ",TreeListViewHeaderResponsible:"Verantwortlich",TreeListViewHeaderCandidate:"Kandidat",TreeListViewContextualMenuSelectAllChildren:"Alle Kindobjekte auswählen",TreeListViewContextualMenuSelectChildren:"Kindobjekte auswählen",TreeListViewContextualMenuCompareRevisions:"Revisionen vergleichen",TreeListViewContextualMenuReplaceby:"Auswahl ersetzen durch",TreeListViewContextualMenuResetAction:"Aktion zurücksetzen",TreeListViewReplacePlaceholder:"Ersetzen durch",ReplaceActionLatest:"Neueste",ReplaceActionLatestReleased:"Neueste Veröffentlichung",ReplaceActionLatestStable:"Neueste stabile",ReplaceActionNone:"Keine",ReplaceActionByRevision:"Nach Revision",ReplaceMultiInfoPartial:"{candidatesCount} von {selectedNodes} sind Kandidaten für die {action} Revision",ReplaceMultiInfoFailure:"Keine der ausgewählten Objekte sind Kandidat für die {action} Revision",ReplaceMultiInfoSuccess:"Alle ausgewählten Objekte sind Kandidat für die {action} Revision",TreeListViewTooltipHeaderIsModified:"Wurde geändert",TreeListViewTooltipCellCandidateAvailable:"{objectName} kann aktualisiert werden auf: \n{candidateList}",TreeListViewTooltipCellCandidateNone:"{objectName} kann nicht aktualisiert werden.",TreeListViewTooltipCellIsModifiedAvailable:"{objectName} wird nach der Validierung geändert.",TreeListViewTooltipCellIsModifiedForbidden:"{objectName} kann aufgrund des aktuellen Bearbeitungsstatus nicht geändert werden."});define("DS/AuthGenericCommands/assets/nls/AuthGenericCommandsCatalog",{SEL_001:"Eine Multiselektion von Objekten darf nicht ersetzt werden. Wählen Sie nur ein Objekt aus.",SEL_002:"Das Stammobjekt darf nicht ersetzt werden. Wählen Sie ein Unterebenenobjekt aus.",SEL_003:"Um ein Objekt neu anzuordnen, muss es mindestens zwei gültige untergeordnete Objekte enthalten und erweitert sein.",SEL_004:"Sie können nur {type} neu anordnen. Wählen Sie {type} aus.",SEL_005:"Eine Multiselektion von Objekten kann nicht neu angeordnet werden. Wählen Sie nur ein Objekt aus.",SEL_006:"Mindestens ein ausgewähltes Stammobjekt weist kein übergeordnetes Element auf und kann nicht getrennt werden. Wählen Sie nur ein Unterebenenobjekt aus.",ERR_003:"Einfügen von vorhandenem Element fehlgeschlagen: ",ERR_005:"Neuanordnen fehlgeschlagen: ",ERR_006:"Die Struktur wurde während der Neuanordnung geändert (mindestens ein Element wurde hinzugefügt oder gelöscht). Aktualisieren Sie die Auswahl, bevor Sie den Baum neu anordnen.",ERR_007:"Das Objekt {name} existiert nicht. Aktualisieren Sie das Widget, bevor Sie mit diesem Vorgang fortfahren.",ERR_008:"Mindestens eines der ausgewählten Objekte existiert nicht. Aktualisieren Sie das Widget, bevor Sie mit diesem Vorgang fortfahren.",SUC_003:"Einfügen von vorhandenem Element erfolgreich.",SUC_005:"Neuanordnen erfolgreich.",BAD_SELECTION:"Ungültige Auswahl entfernt.",selection_root:"Sie können das Stammobjekt {name} nicht auswählen.",selection_child:"Sie können das untergeordnete Objekt der Auswahl des übergeordneten {parent} und untergeordneten Objekts {child} nicht auswählen.",selection_root_no_children:"Sie können {name} nicht auswählen, da {name} kein gültiges untergeordnetes Objekt aufweist oder nicht erweitert ist.",selection_unsupported_type:"Sie können das Objekt {name} vom Typ {type} nicht auswählen.",selection_cycle:"Sie können nicht gleichzeitig {name} und eines seiner übergeordneten Elemente auswählen.",unwanted_word_delete:"löschen",unwanted_word_replacer_delete:"trennen",error_license:"Sie verfügen nicht über die für diesen Befehl erforderliche Lizenz.",operationAborted_Cycle:"Vorgang abgebrochen, da Zyklen erstellt werden.",error_timeout:"Das Zeitlimit für den Vorgang ist abgelaufen.",error_cancelled:"Vorgang abgebrochen.",displayAgain:"Diese Meldung nicht mehr anzeigen",executing:"Wird ausgeführt...",insert_unsupported_type_parent:"Sie können unter einem Objekt vom Typ {type} nichts einfügen.",insert_unsupported_unkowntype_parent:"Sie können nur unter einem Objekt vom Typ {type} etwas einfügen.",insert_unsupported_child:"Sie können kein Objekt des Typs {name} einfügen.",insert_unsupported_child_type:"Sie können kein(e) Objekt(e) {name} vom Typ {type} einfügen.",insert_unsupported_root:"Sie können Stammobjekt(e) {name} nicht hinzufügen.",insert_unsupported_cycle:"Einfügen abgebrochen, da ein Zyklus zwischen {child} und {parent} erstellt wird.",insert_unsupported_itself:"Sie können kein Objekt {name} in es selbst einfügen.",insert_failure:"Einfügen von vorhandenem Element fehlgeschlagen. <br>{child} kann nicht unter {parent} eingefügt werden.<br>{error}",replace_report_success:"Ersetzen von {oldName} durch {newName} war erfolgreich.",replace_report_failure1:"Ersetzen von {oldName} ist fehlgeschlagen.",replace_report_failure2:"Ersetzen von {oldName} durch {newName} ist fehlgeschlagen.",replace_report_abort:"Ersetzen von {oldName} durch {newName} abgebrochen.",replace_success:"Ersetzen erfolgreich.",replace_error:"Ersetzen fehlgeschlagen. ",replace_unsupported_type:"Sie können das Objekt {name} vom Typ {type} nicht ersetzen.",replace_unaccessible_objet:"Sie haben keine Zugriffsberechtigung auf das Objekt {name}.",replace_bad_replacer_type:"Ersetzen durch Objekt {name} nicht möglich, da der Typ {type} nicht gültig ist.",replace_latest_failed_already_latest:"Ersetzen wurde ignoriert, da das Objekt {name} bereits die neueste Revision ist.",replace_latest_failed_child_selected:"Wählen Sie einen Knoten nicht zusammen mit seinen direkten oder indirekten untergeordneten Knoten zum Ersetzen aus.",unparent_success:"Trennen erfolgreich.",unparent_error:"Trennen fehlgeschlagen. ",unparent_unsupported_object:"Sie können die Überordnung von Objekt(en) {name} nicht aufheben.",unparent_confirm_title:"Trennen",unparent_confirm_message_single:"Möchten Sie {name} wirklich trennen?",unparent_confirm_message_multiple:"Möchten Sie die ausgewählten Elemente wirklich alle trennen?",reparent_failed_unsupported_type_child_known:"Sie können ein Objekt des Typs {type} nicht neu zuordnen.",reparent_failed_unsupported_type_child_unknown:"Sie können ein Objekt dieses Typs nicht neu zuordnen.",reorder_view_partially_expanded:"Die Struktur ist teilweise erweitert. Die Elemente, die nicht angezeigt werden, werden nicht neu sortiert. Um alle Elemente in der Struktur neu zu sortieren, müssen Sie zuerst die gesamte Struktur anzeigen.",SUC_InsertProductCconfiguration:"Einfügen der Produktkonfiguration war erfolgreich.",ERR_InsertProductCconfiguration:"Einfügen der Produktkonfiguration ist fehlgeschlagen: ",insertPC_failure:"Einfügen der Produktkonfiguration fehlgeschlagen.<br>{child} kann nicht unter {parent} eingefügt werden.<br>{error}",insertPC_noPCFound:"Einfügen wurde abgebrochen. Es wurde keine Produktkonfiguration gefunden. Wählen Sie ein einzufügendes Objekt mit angehängtem Konfigurationsmodell aus, das über eine Produktkonfiguration verfügt.",SUC_ReplaceProductCconfiguration:"Ersetzen der Produktkonfiguration war erfolgreich.",ERR_ReplaceProductCconfiguration:"Ersetzen der Produktkonfiguration fehlgeschlagen: ",replacePC_failure:"Ersetzen der Produktkonfiguration fehlgeschlagen.<br>{child} kann nicht unter {parent} ersetzt werden.<br>{error}",replacePC_noPCFound:"Ersetzen wurde abgebrochen. Es wurde keine Produktkonfiguration gefunden. Wählen Sie ein zu ersetzendes Objekt mit angehängtem Konfigurationsmodell aus, das über eine Produktkonfiguration verfügt.",abort_confirm_message:"Möchten Sie diesen Vorgang wirklich abbrechen",confirm:"Bestätigung",modalFooterAbort:"Abbrechen"});define("DS/AuthGenericCommands/assets/nls/AuthGenericReportPanel",{success:"Erfolgreich",failure:"Fehler",neutral:"Warnung",aborted:"Abgebrochen"});