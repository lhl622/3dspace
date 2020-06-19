define("DS/SMAExeCOSAdmin/SMAExeCOSAdmin_de",{});define("DS/SMAExeCOSAdmin/assets/nls/SMAExeCOSAdmin",{adapterType:"Adaptertyp",adapterPath:"Ausführungspfad",addStationsToGroup:" Stationen zur Gruppe hinzufügen",advancedProperties:"Erweitert",alias:"Alias",aliasHint:"Alias- oder smaexe.eed.id-Wert aus den Servereigenschaften",allowedUsers:"Zulässige Benutzer",allowedUsersHint:"Eine durch Komma getrennte Liste der Benutzer, die auf dieser Station ausführungsberechtigt sind. Wenn die Liste leer ist, sind alle Benutzer berechtigt.",alreadyInGroup:" ist bereits in der Gruppe.",applications:"Anwendungen",badSharedFS:"Simshared sollte nur auf $SHARED_DRIVE oder einen absoluten Pfad festgelegt werden.",bothUrls:"Sie können nicht gleichzeitig eine Server- und Proxy-URL angeben",cacheplmfiles:"PLM Dateien in Cache verschieben",cacheplmfilesHint:"Wenn nicht festgelegt, lautet der Standardwert 'wahr'.",certificate:"Stationszertifikat",certificateHint:"Das SSL-Zertifikat im PKCS12-Format für Stationsdienste",certificateCert:"Cert-Datei für Zertifikat (PEM)",certificateCertHint:"Pfad zur Zertifikatdatei (PEM-Format)",certificateKey:"Zertifikatschlüssel",certificateKeyHint:"Pfad zur Private-Key-Datei (PEM-Format, ohne Passphrase)",clientServices:"Clientdienste",clientServicesHint:"Geben Sie an, wo der Clientcode auf dem Windows-Computer installiert ist, um Stapel mit Verbindung zum 3DExp Server zu starten.",clusterId:"Clustermitglieds-ID",computeServices:"Rechendienste",computeServicesHint:"Werden vom Physics Adapter und der aktiven Physiksimulation auf der Station verwendet, um die Installation des Abaqus Solvers zu suchen.",configDir:"Konfigurationsverzeichnis",configDirHint:"Nicht änderbarer Speicherort der Konfigurationsdateien",concurrency:"Gleichzeitigkeit",concurrencyHint:"Maximale Anzahl der gleichzeitigen Arbeitsanforderungen. Entspricht standardmäßig dem Doppelten der Prozessoranzahl.",cosUri:"Server-URI",cosUrl:"Server-URL",cosWebServiceUri:"Webdienst-URI",createApplication:"Anwendung erstellen",createDrive:"Netzlaufwerk erstellen",createGroup:"Gruppe erstellen",createStation:"Station erstellen",deleteApplications:"Anwendungen löschen",deleteDrives:"Netzlaufwerke löschen",deleteFailed:"Löschen fehlgeschlagen. ",deleteGroupsFailed:"Die Stationsgruppen konnten nicht gelöscht werden. ",deleteStations:"Stationen/Gruppen löschen",deleteStationsFailed:"Die Stationen konnten nicht gelöscht werden. ",description:"Beschreibung",descriptionTooLong:" Die Beschreibung ist zu lang und wird gekürzt.",dlgErr:"Einige Felder enthalten Fehler",domain:"Domäne",domainHint:"Die Sicherheitsdomäne zur Authentifizierung der Benutzeranmeldedaten, wenn die Funktion 'Ausführen als' aktiviert ist.",drmMode:"DRM-Modus",dupCreateErr:"Erstellung fehlgeschlagen. Eine Station oder Stationsgruppe mit diesem Namen ist bereits vorhanden.",dupImportErr:" ist bereits vorhanden und kann nicht importiert werden.",duration:"Dauer",edit:"Bearbeiten",editServerHeader:"Eigenschaften bearbeiten",editStation:"Eigenschaften bearbeiten",editStationGeneral:"Allgemeine Eigenschaften bearbeiten",editStationLogging:"Protokollierungseigenschaften bearbeiten",editStationAdvanced:"Erweiterte Eigenschaften bearbeiten",editStationCompute:"Eigenschaften der Rechendienste bearbeiten",editStationResults:"Eigenschaften der Ergebnisdienste bearbeiten",eventLog:"Ereignisprotokoll",eventLogBody:"Wählen Sie 'Mehr' aus, um Nachrichten abzurufen...",exposedIPAddr:"Sichtbare IP-Adresse",exposedIPAddrHint:"Geben Sie an, welche IP-Adresse/welcher FQDN verwendet werden soll, wenn die Station auf Rechnern mit mehren NICs ausgeführt wird.",exposedName:"Sichtbarer Name",exposedNameHint:"Eine Kennung, die der Reverse-Proxy dieser Station zuweist.",exposedPorts:"Sichtbarer Port",exposedPortsHint:"Geben Sie die Ports zum Starten der Stationsdienste (Dateiüberwachung und Ergebnisanalyse) an.",exportStations:"In eine Datei exportieren",facetErr:"Zu bearbeitende Eigenschaft auswählen",False:"Falsch",fastFlowResults:"Fastflow-Ergebnisintervall",fastFlowResultsHint:"Wie oft (in Sekunden) die Ergebnisse der Fastflow-Ausführung an den Server gesendet werden sollen.",fcsEnginedir:"(FCS) Engine-Verzeichnis",fcsEnginedirHint:"Der vollständige Pfad des ENOVIA File Collaboration Server (FCS) Engine-Verzeichnisses.",fcsServerStagingdir:"(FCS) Bereitstellungsverzeichnis",fcsServerStagingdirHint:"Das Bereitstellungsverzeichnis für das Einchecken und Auschecken von ENOVIA File Collaboration Server (FCS) Daten als vollständig qualifizierter Pfadname.",filter:"Filter",fullCosUrl:" Vollständige Server-URL",generalProperties:"Allgemein",getStationsFailed:"Stationen/Gruppen konnten nicht vom Server abgerufen werden. ",getTicketFailed:"Ticket konnte nicht für den Server abgerufen werden. Fehler: ",group:"Gruppe",hostName:"Host",id:"ID",image:"Bild","import":"Import",importErrBadMode:" hat einen ungültigen DRM-Modus und kann nicht importiert werden. ",importErrBadSharedFS:" Legen Sie für Simshared ein freigegebenes Dateisystem unter $SHARED_DRIVE oder einem absoluten Pfad fest.",importErrGroupInGroup:" Stationsgruppe kann nicht in eine andere Stationsgruppe importiert werden: ",importErrNoGroup:" ist keine gültige Gruppe und kann daher nicht importiert werden. ",importErrStationInWrongGroup:" kann nicht in die Stationsgruppe importiert werden, da die Gruppennamen nicht übereinstimmen. ",installDir:"Installationsverzeichnis",installDirHint:"Nicht änderbarer Speicherort der installierten ausführbaren Datei",jobLogRepository:"Jobprotokoll-Repository",jobLogRepositoryHint:"Pfad zum lokalen Verzeichnis, in dem Jobprotokolldateien gespeichert werden",jobName:"Jobname",jsonChoose:"JSON-Datei auswählen",largeFileDir:"Arbeitsverzeichnis für große Dateien",largeFileDirHint:"Wird verwendet, wenn der Physics Results Dienst über die Station ausgeführt wird und der Modus für große Dateien verwendet werden soll.",leaseinterval:"Lease-Erneuerungsintervall (Min.)",leaseintervalHint:"Zeit in Minuten zwischen Lease-Erneuerungen.",logLevel:"Protokollebene",logProperties:"Protokollierung",logMessageFilter:"Protokollfilter",machine:"Hostname",machineInvalid:" enthält ungültige Sonderzeichen.",maxquiescetime:"Max. Ruhezeit (Sek.)",maxquiescetimeHint:"maximale Zeit (in Sekunden), die die Station nach einem Befehl zum Herunterfahren auf den Abschluss von Aufgaben wartet.",maxSize:"Max. Größe (KB)",maxSizeHint:"Die maximale Größe der Protokolldateien in KB.",memberFilter:"Zum Filtern Cluster-Mitglieds-ID eingeben",memberInfo:"Mitglieder",message:"Nachricht",method:"Protokoll",missingModel:"Sie müssen ein Modell angeben",missingUrl:"Sie müssen eine Server- oder Proxy-URL angeben",more:"Mehr",moreProps:"Weitere Eigenschaften",morePropsHint:"Zusätzliche auf der Station festgelegte Eigenschaften im Format Eigenschaft=Wert.",mpiPath:"MPI-Ausführungspfad",mpiPathHint:"Der vollständige Pfad zum Befehl 'mpirun' zur Verwendung mit der Co-Simulation. Dieser Pfad ist erforderlich, wenn mpirun nicht unter dem Standard-Systempfad gespeichert ist.",msgFilter:"Filterzeichenfolge für Nachricht eingeben",name:"Name",numBackups:"Anzahl Sicherungen",numBackupsHint:"Anzahl der aufbewahrten Protokolldateien.",reset:"Zurücksetzen",onCloud:"Diese Funktion ist in der Cloud nicht verfügbar",openTrace:"Trace öffnen",openWorkItem:"WorkItem öffnen",opSys:"Betriebssystem",os:"Betriebssystem",osArch:" Betriebssystemarchitektur",osName:" Name des Betriebssystems",osVersion:" Betriebssystemversion",othersAffinity:"Benutzerdefinierte Affinitäten",othersAffinityHint:"Eine durch Leerzeichen getrennte Liste benutzerdefinierter Affinitätsschlüsselwörter.",parameterMatch:"Paramterabgleich",parameterMatchHint:"Wird von Results Analytics verwendet, um den Speicherort der Textdatei (SMAVariantParameterMatch.txt) mit Regeln für reguläre Ausdrücke anzugeben.",path:"Pfad",pause:"Pause",pauseServerFailed:"Server konnte nicht angehalten werden. ",pauseStations:"Stationen anhalten",port:"Port",portIsNaN:" ist keine gültige Portnummer",privPortsIsNaN:"Private Stationsports müssen in einer durch Komma getrennten Liste von Portnummern zwischen 1025-65535 angegeben werden.",portRange:"Portbereich",portRangeHint:"Wird von Physics Solvern, Stapelverarbeitungsprogrammen und Physics Results zum Öffnen der TCP/IP-Ports verwendet, d. h. 56000-56500,57001,57002.",predefinedonly:"Nur vordefinierte Betriebssystembefehle ausführen",predefinedonlyHint:"Wenn dieser Wert nicht festgelegt ist, lautet der Standardwert 'falsch'.",privatePorts:"Private Stationsports",privatePortsChangeMethodNA:"Diese Funktion ist auf diesem Server nicht verfügbar.",privatePortsHint:"Geben Sie eine durch Komma getrennte Liste von Portnummern ein. Die Standardwerte lauten 35125, 45341 und 55447.",privatePortsNotChanged:"Portnummern konnten nicht geändert werden ",properties:"Eigenschaften",proxyUrl:"Proxy-URL",publicKey:"Öffentlicher Schlüssel",register:"Registrieren",registerDupErr:"Der Servername ist bereits registriert.",registerEditErr:"Auf dem globalen Server können nur private Stationsports geändert werden. Andere Eigenschaften müssen in der Datei geändert werden. Der Server muss im Anschluss neu gestartet werden.",registerGlobalEditErr:"Sie können den globalen Server nicht bearbeiten. Die Eigenschaftsdatei muss geändert und der Server neu gestartet werden",registerFailed:"Server konnte nicht registriert werden. Fehler: ",registerServer:"Server registrieren",regServerHeader:"Neuen Server registrieren",removeStationsFromGroup:"Stationen aus Gruppe entfernen",restart:"Neustart",restartAbort:"Aktive Arbeitselemente abbrechen",restartErr:"Neustart fehlgeschlagen mit Fehler: ",restartStation:"Station neu starten",restartWait:"Warten, bis Arbeitselemente abgeschlossen wurden",resultsServices:"Ergebnisdienste",resultsServicesHint:"Wird beim Ausführen des Physics Results Dienstes auf der Station verwendet, um den aktiven Physics Results Dienst zu ermitteln",resume:"Fortsetzen",resumeFailed:"Fortsetzen fehlgeschlagen. ",resumeServerFailed:"Server konnte nicht fortgesetzt werden. ",resumeStations:"Stationen fortsetzen",runAs:"Ausführen als",runAsChanged:"Um den Wert für 'Ausführen als' zu ändern, wird die Station neu gestartet, sobald das Formular gesendet wird. Wenn automatische Neustarts nicht auf der Station eingerichtet sind, wird sie heruntergefahren.",retryNumErr:"Zahl >= 0 für Größe des Wiederholungsintervalls eingeben",servantUri:"Dienst-URI",serverState:"Serverstatus",setDefault:"Als Standardwert festlegen",setDefaultFailed:"Standardserver konnte nicht festgelegt werden. ",sharedDrives:"Netzlaufwerke",serverPropId:"ID der Servereigenschaften",serverPropIdHint:"smaexe.eed.id-Wert aus den Servereigenschaften",simsharedModErr:"Simshared kann nicht gelöscht werden. Um den Pfad zu ändern, erstellen Sie das Verzeichnis erneut unter einem neuen Pfad.",skiplock:"Sperren von TempDir überspringen",skiplockHint:"Wenn nicht festgelegt, lautet der Standardwert 'wahr'.",shareableLicPath:"Pfad der freigegebenen Lizenz",shareableLicPathHint:"Der Standardpfad der freigegebenen Lizenz. Anführungszeichen und Nicht-Textformate werden nicht unterstützt.",shareableLicRetryNum:"Anzahl Wiederholungsversuche für freigegebene Lizenz",shareableLicRetryNumHint:"Anzahl der Wiederholungsversuche zum Abrufen der Lizenz ",shareableLicRetryInterval:"Wiederholungsintervall für freigegebene Lizenz (ms)",shareableLicRetryIntervalHint:"Die Dauer zwischen den Wiederholungsintervallen zum Abrufen der Lizenz. ",simulationName:"Name der Simulation",spaceError:"Plattformdienst-URL konnte nicht abgerufen werden. Fehler: ",source:"Quelle ",stageDir:"Bereitstellungsverzeichnis",stageDirHint:"Das Bereitstellungsverzeichnis für das Einchecken und Auschecken von FCS-Daten. Muss als vollständig qualifizierter Pfadname angegeben werden.",stageFileScript:"Dateibereitstellungs-Skript",stageFileScriptHint:"Pfad zum benutzerdefinierten Skript bzw. zur ausführbaren Datei, die Dateien zwischen dem Controller und den Rechenhosts bereitstellt.",startDate:"Startdatum",startStations:"Stationen zurücksetzen",stationAffinityName:"Affinitätsname für Station",stationCreated:" wurde erstellt. Erweitern Sie die Struktur erneut oder laden Sie die Stationsfacette, um das Element anzuzeigen.",stationImported:"Stationen/Gruppen wurden importiert. Erweitern Sie die Struktur erneut, um sie anzuzeigen.",stationIP:"Stations-IP",stations:"Stationen",status:"Status",stop:"Beenden",stopStation:"Station anhalten",stopStations:"Stationen anhalten",submit:"Senden",subKeepalive:"Keep-Alive-Zeit für Unterstationen (ms)",subKeepaliveHint:"Steuert, wie lange die Unterstation nach dem Starten für die Ausführung erhalten bleibt.",subLaunchtimeout:"Zeitüberschreitung für Unterstationsstart",subLaunchtimeoutHint:"Steuert, wann der Prozess fehlschlägt, wenn die Unterstation nicht für die Ausführung gestartet werden kann.",subStarttime:"Startzeit für Unterstation",subStarttimeHint:"Steuert, wann der Prozess fehlschlägt, wenn die Unterstation nicht rechtzeitig für die Ausführung gestartet werden kann.",suspendFailed:"Aussetzen fehlgeschlagen. ",tableView:"Tabellenansicht",tempDir:"Temporäres Verzeichnis",tempDirHint:"Das temporäre Verzeichnis wird für das Stationsprotokoll und die Cache-Verzeichnisse verwendet.",time:"Zeit",title:"Titel",trace:"Trace",trash:"Löschen",True:"Wahr",type:"Typ",unregister:"Serverregistrierung aufheben",unregisterErr:"Die Registrierung des globalen Servers kann nicht aufgehoben werden. ",unregisterFailed:"Registrierung des Servers konnte nicht aufgehoben werden. ",updateFailed:"Station konnte nicht aktualisiert werden. Fehler: ",useCount:"Anzahl Verwendungen",useCountHint:"Anzahl der Arbeitselemente, die derzeit ausgeführt werden.",userName:"Benutzername",version:"Version",workDir:"Arbeitsverzeichnis",workDirHint:"Die Arbeitsverzeichnisse der Komponenten wurden in das Verzeichnis workdir verschoben.",workItems:"Arbeitselemente",workLoad:"Arbeitslast"});