/*!  Copyright 2018 Dassault Systemes. All rights reserved. */
define("DS/SMAPoweredByViews/Utils/ADLoadingUtils",["DS/SMAPoweredByState/ad-state-store","DS/SMAPoweredByState/ad-state-domain-study-templates/selectors","DS/SMAPoweredByState/ad-state-domain-job-types/selectors","DS/SMAPoweredByState/ad-state-redux-observer"],function(g,c,i,a){var e={},b=60000,h=null,f=function(){h=h?h:new a();return h.waitFor({store:g.getStore(),select:c.isStudyTemplatesInitialized,isResolved:function(j){return j},timeout:b})},d=function(){h=h?h:new a();return h.waitFor({store:g.getStore(),select:i.isJobTypesInitialized,isResolved:function(l){var k=g.getStore().getState();var j=i.jobTypesPersistenceOperation(k);if(l&&!j){return true}return false},timeout:b})};e.jobTypesLoaded=function(){return d()};e.studyTemplatesLoaded=function(){return f()};return e});