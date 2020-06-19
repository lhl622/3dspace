<%--
  LogicalFeatureCommitPostProcess.jsp
  Copyright (c) 1993-2018 Dassault Systemes.
  All Rights Reserved.
  This program contains proprietary and trade secret information of
  Dassault Systemes.
  Copyright notice is precautionary only and does not evidence any actual
  or intended publication of such program
--%>

<%-- Common Includes --%>
<%@include file = "../common/emxNavigatorTopErrorInclude.inc"%>
<%@include file = "emxProductCommonInclude.inc" %>
<%@include file = "../emxUICommonAppInclude.inc"%>

<%@page import="com.matrixone.apps.configuration.*"%>
<%@page import = "java.util.Enumeration" %>
<%@page import = "java.util.StringTokenizer"%>

<script language="Javascript" src="../common/scripts/emxUICore.js"></script>
<script language="Javascript" src="../common/scripts/emxUIConstants.js"></script>
<script language="Javascript" src="../common/scripts/emxUIUtility.js"></script>
<script language="Javascript" src="../common/scripts/emxUIPopups.js"></script>
<script language="Javascript" src="../common/scripts/emxUIModal.js"></script>
<script language="Javascript" src="../common/scripts/emxUITableUtil.js"></script>
<script language="Javascript" src="../common/scripts/emxUIFreezePane.js"></script>
<script language="Javascript" src="../common/scripts/emxUIFreezePaneSharad.js"></script>

<%
boolean isCandidateFeatureSelected = true;
StringTokenizer strTokenizer = null;
String strParentOID = "";
String[] objectID = null;
String xml = "";
String resetXML = "true";

  try
  {
      String[] selectedCandidateFeatures = (String[])session.getAttribute("selectedCandidateFeatures");     
      String strObjIdContext = emxGetParameter(request, "objectId");
      String emxTableRowId[] = emxGetParameterValues(request, "emxTableRowId");
      objectID = new String[emxTableRowId.length];
      
        for(int i=0; i< emxTableRowId.length; i++){     
          if(emxTableRowId[i].indexOf("|") > 0){
                strTokenizer = new StringTokenizer(emxTableRowId[i] , "|");
                strTokenizer.nextToken();
                objectID[i] = strTokenizer.nextToken() ;
                strParentOID = strTokenizer.nextToken() ;
                if(!strObjIdContext.equals(strParentOID)){
                    isCandidateFeatureSelected = false;
                }
            }
            else{
                isCandidateFeatureSelected = false;
            }
        }
          
          if(isCandidateFeatureSelected == false){
                %>
              <script language="javascript" type="text/javaScript">
                    alert("<emxUtil:i18n localize='i18nId'>emxConfiguration.Alert.CannotPerformNonCandidate</emxUtil:i18n>");      
              </script>
                <%
          }
          else{
              Map paramMap = new HashMap();
                    
              %>
              <script language="javascript" type="text/javaScript">
                     var toReset="<%=XSSUtil.encodeForJavaScript(context,resetXML)%>";  
                     //Reseting the previous addition and then adding xml again 
                     if(toReset == "true"){
                         parent.resetEdits();
                     }
              </script>
              <%
              
              for(int i=0; i < objectID.length; i++){
                                   
                  paramMap.put("objectId", objectID[i]);
                  for(int j=0; j < selectedCandidateFeatures.length; j++){
                      paramMap.put("newObjectId", selectedCandidateFeatures[j]);
                      xml = LogicalFeature.getXMLForSB(context, paramMap,"relationship_LogicalFeatures");
                      
                      %>
                          <script language="javascript" type="text/javaScript">
                                 var strXml="<%=XSSUtil.encodeForJavaScript(context,xml)%>";                              
                                 parent.emxEditableTable.addToSelected(strXml); 
                          </script>
                       <%
                  } 
              }
          }      
  }catch(Exception e)
     {
            session.putValue("error.message", e.getMessage());
     }
     %>
     
     <%@include file = "../common/emxNavigatorBottomErrorInclude.inc"%>
