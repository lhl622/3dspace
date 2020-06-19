<%--  emxVPMProposeAddExisting.jsp   -   
   Copyright (c) 2010 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of MatrixOne,
   Inc.  Copyright notice is precautionary only
   and does not evidence any actual or intended publication of such program

   static const char RCSID[] = $Id: emxTestDelete.jsp.rca 1.12.1.1.1.2 Sun Oct 14 00:27:58 2007 przemek Experimental cmilliken przemek $

   RCI - Wk17 2010 - Creation
   RCI - Wk44 2010 - RI 76435 - recup Root de l'arbre, selectedOID ( selection de CM ) et prdIdsToAdd.
--%>


<%@ page import = "java.util.Iterator"%>
<%@ page import = "java.util.Map"%>
<%@ page import = "java.util.List"%>
<%@ page import = "java.util.TreeSet"%>

<%@include file = "../components/emxComponentsUtil.inc"%> 
<%@include file = "../emxUICommonAppInclude.inc"%>



<%
   
    HashMap requestMap = UINavigatorUtil.getRequestParameterMap(pageContext);

  
    String objectId = (String) requestMap.get("objectId");
    String prdToAddIds[] = emxGetParameterValues(request, "emxTableRowId");
    String treeRoot = (String ) requestMap.get("treeRoot");
    String selectedOID = (String ) requestMap.get("selectedOID");
    String role = (String) requestMap.get("role");
  
   try
 {
  ContextUtil.startTransaction(context, true);		

  Map programMap = new HashMap();
  programMap.put("objectId", selectedOID ); // parent Id
  programMap.put("emxTableRowId", prdToAddIds );
  programMap.put("treeRoot", treeRoot );
  programMap.put("role", role);
     

  String[] methodargs =JPO.packArgs(programMap);
				
JPO.invoke(context, "emxVPLMPropose", null,"addExisting", methodargs);
	
 }
catch (Exception ex)
{
	   ex.printStackTrace();
}
%>
<html>
<body>
<script language="JavaScript" src="../common/scripts/emxUIUtility.js" type="text/javascript"></script>
<script language="Javascript" >
   top.opener.top.refreshTablePage();
   top.window.close();
  	
</script>

</body>
</html>








