/*!  Copyright 2017 Dassault Systemes. All rights reserved. */
define([],function(){var a={};a.ErrorCodes={STUDY_CREATE_WS_ERROR:"SMAPoweredByState.ad-state-domain-study.STUDY_CREATE_WS_ERROR",STUDY_UPDATE_ACCESS_ERROR:"SMAPoweredByState.ad-state-domain-study.STUDY_UPDATE_ACCESS_ERROR",STUDY_UPDATE_WS_ERROR:"SMAPoweredByState.ad-state-domain-study.STUDY_UPDATE_WS_ERROR",STUDY_WS_ERROR:"SMAPoweredByState.ad-state-domain-study.STUDY_WS_ERROR"};a.studyPersistenceStatus=function(b){return(b.domain.study&&b.domain.study.persistenceStatus)?b.domain.study.persistenceStatus:null};a.studyPersistenceOperation=function(b){return(b.domain.study&&b.domain.study.persistenceOperation)?b.domain.study.persistenceOperation:null};a.studyPersistenceError=function(b){return(b.domain.study&&b.domain.study.persistenceError)?b.domain.study.persistenceError:null};a.studyObject=function(b){return b.domain.study};a.studyID=function(b){return(b.domain.study&&b.domain.study.id)?b.domain.study.id:null};a.studyManagedDataRootID=function(b){return(b.domain.study&&b.domain.study.managedDataRootID)?b.domain.study.managedDataRootID:null};a.studyMasks=function(b){return(b.domain.study&&b.domain.study.masks)?b.domain.study.masks:null};a.isReadOnly=function(c){var b=a.studyMasks(c),d=null;if(b&&typeof b.modifyMask!=="undefined"&&typeof b.locked!=="undefined"){d=b.modifyMask!=="TRUE"||b.locked!=="FALSE"}return d};return a});