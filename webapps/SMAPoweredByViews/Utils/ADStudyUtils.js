/*!  Copyright 2018 Dassault Systemes. All rights reserved. */
define(["DS/SMAPoweredByState/ad-state-store","DS/SMAPoweredByState/ad-state-domain/actions","DS/SMAPoweredByState/ad-state-app-alerts/actions","DS/SMAPoweredByState/ad-state-domain-study/actions","DS/SMAPoweredByState/ad-state-domain-study/selectors","DS/SMAPoweredByState/ad-state-redux-observer","DS/SMAPoweredByViews/Utils/ADMonitorUtils"],function(k,i,e,n,h,o,m){var j={};var d=null,g=null,p=false,l={STUDY_CLOSED_AFTER:"SMAPoweredByViews.ad-study-utils.STUDY_CLOSED_AFTER"};var a="AbaqusStudy_StudyId";function f(){var r=null;if(window.widget&&window.widget.getValue){var q=window.widget.getValue(a);r=(q&&q.studyId)?q.studyId:null}return r}function c(q){if(window.widget&&window.widget.setValue){window.widget.setValue(a,{studyId:q})}}function b(r){var q=(r!==null&&typeof r.id!=="undefined"&&r.id!==null&&g===null),s=(r===null&&(g!==null||p));if(q){g=r.id;c(r.id);m.startAllMonitors()}else{if(s){g=null;p=false;c(null)}}if(d){d(r,q,s)}}j.loadStoredStudy=function(q){var s=f(),r=false;if(s){q.dispatch(i.openStudy(s));r=true}return r};j.observeStudy=function(r,s,q){d=s;r.observeStore({select:h.studyObject,compareFunc:function(u,t){return u===t},onChange:b});r.observeStore({select:h.studyNotFound,compareFunc:function(u,t){return u===t},onChange:function(t){if(t){p=true;q.dispatch(e.addAlert("Close","info",null,l.STUDY_CLOSED_AFTER));j.closeStudy(q)}}})};j.closeStudy=function(q){m.stopAllMonitors();q.dispatch(n.closeStudy())};return j});