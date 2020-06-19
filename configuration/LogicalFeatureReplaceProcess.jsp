<%--
  LogicalFeatureReplaceProcess.jsp
  Copyright (c) 1993-2018 Dassault Systemes.
  All Rights Reserved.
  This program contains proprietary and trade secret information of
  Dassault Systemes.
  Copyright notice is precautionary only and does not evidence any actual
  or intended publication of such program
--%>

<%@page import="com.matrixone.apps.configuration.LogicalFeature"%>
<%@page import="com.matrixone.apps.configuration.ConfigurationConstants"%>
<%@page import="com.matrixone.apps.configuration.ConfigurationUtil"%>
<html>
<body>
<%-- Top error page in emxNavigator --%>
<%@include file = "../common/emxNavigatorTopErrorInclude.inc"%>
<%--Common Include File --%>
<%@include file = "emxProductCommonInclude.inc" %>
<%@include file = "../emxUICommonAppInclude.inc"%>
<%@include file = "../emxUICommonHeaderBeginInclude.inc" %>
<%@include file = "../common/enoviaCSRFTokenValidation.inc" %>

<%@page import="com.matrixone.apps.domain.DomainObject" %>

<script language="JavaScript" type="text/javascript" src="../common/scripts/emxUICore.js"></script>

<script>
var action = "";
</script>
<%
  //Retrieves Objectid in context
  String strObjectId = emxGetParameter(request, "objectId"); //source
  String strObjectIdToBeConnected = emxGetParameter(request, "objectIdTobeconnected"); //destination
  String strProductId = emxGetParameter(request, "strProdId");
  String strRelId = emxGetParameter(request, "RelId");
  String strParentId = emxGetParameter(request, "strParentId");
  DomainObject objProd = new DomainObject(strObjectIdToBeConnected);
  String strState = objProd.getInfo(context, ConfigurationConstants.SELECT_CURRENT); 
  boolean bIsError = false;
  try{
	  if(strObjectIdToBeConnected!=null && !strObjectIdToBeConnected.equals("")){
		  if(strState.equals(ConfigurationConstants.STATE_OBSOLETE))
		  {
		      %>
		      <script language="javascript" type="text/javaScript">
		            alert("<emxUtil:i18n localize='i18nId'>emxProduct.Alert.LogicalFeatureReplace</emxUtil:i18n>");  
		            getTopWindow().closeWindow();
		      </script>
		   <%
		  }
		  
		  else
		  {
		      boolean recursionCheck =  ConfigurationUtil.multiLevelRecursionCheck(context,strParentId,strObjectIdToBeConnected,
		              ConfigurationConstants.RELATIONSHIP_LOGICAL_STRUCTURES);
		      
		      if (recursionCheck) {
		          
		          %>
		          <script language="javascript" type="text/javaScript">
		                alert("<emxUtil:i18n localize='i18nId'>emxConfiguration.Add.CyclicCheck.Error</emxUtil:i18n>");  
		                getTopWindow().closeWindow();
		          </script>
		       <% 
		          
		      }
		      else{
		          LogicalFeature logicalFeature = new LogicalFeature();
		          logicalFeature.replaceFeature(context,strObjectId,strObjectIdToBeConnected,strProductId,strRelId,strParentId);
		      }
		              
		  }
	  }
	  else{
	        %>
	          <script language="javascript" type="text/javaScript">
	                alert("<emxUtil:i18n localize='i18nId'>emxProduct.Alert.PleaseSelectAnItem</emxUtil:i18n>");
	                getTopWindow().location.href = getTopWindow().location.href; 
	          </script>
	       <%
	  }  
  }
  catch(Exception e)
  {      
              bIsError=true;
              session.putValue("error.message", e.getMessage());                     
  }
 %>
  <%@include file = "../common/emxNavigatorBottomErrorInclude.inc"%>
  <%
  if(bIsError){
  %>
  <Script>
  getTopWindow().location.href = getTopWindow().location.href; 
  </Script>
  <%
  }
  else{
  %>
  <Script>
  getTopWindow().closeWindow();  
  getTopWindow().getWindowOpener().refreshTablePage();
  </Script>
  <%	  
  }
  %>
   </body>
</html>
