/*!  Copyright 2017 Dassault Systemes. All rights reserved. */
define(["DS/SMAPoweredByState/ad-state-domain-jobs/action-types"],function(b){var a={};a.setJobParameters=function(d,c){return{type:b.SET_JOB_PARAMETERS,jobID:d,parameters:c}};a.addJobParameter=function(h,d,c,f,g,e){return{type:b.ADD_JOB_PARAMETER,jobID:h,parameterType:d,name:c,mode:f,valueType:g,value:e}};a.setJobParameterValue=function(e,c,d){return{type:b.SET_JOB_PARAMETER_VALUE,jobID:e,name:c,value:d}};a.removeJobParameter=function(d,c){return{type:b.REMOVE_JOB_PARAMETER,jobID:d,name:c}};a.removeAllJobParameters=function(c){return{type:b.REMOVE_ALL_JOB_PARAMETERS,jobID:c}};return a});