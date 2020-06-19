﻿<%--  IEFAddAttribMxToCADContent.jsp

   Copyright (c) 2016 Dassault Systemes. All rights reserved.
   This program contains proprietary and trade secret information of
   Dassault Systemes and its subsidiaries. Copyright notice is precautionary only
   and does not evidence any actual or intended publication of such program

--%>

<%@ include file ="MCADTopInclude.inc" %>
<%@ page import="com.matrixone.apps.domain.util.*" %>
<%@ page import="java.util.List"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="com.matrixone.MCADIntegration.utils.*" %>
<%@page import="com.matrixone.apps.domain.util.ENOCsrfGuard"%>


<link rel="stylesheet" href="./styles/emxIEFCommonUI.css" type="text/css">
<script language="JavaScript" src="emxInfoUIModal.js"></script>
<script language="javascript" src="emxInfoCentralJavaScriptUtils.js"></script>
<script language="JavaScript" src="../common/scripts/emxUIConstants.js"></script> <%--Required by emxUIActionbar.js below--%>
<script language="JavaScript" src="../common/scripts/emxUIActionbar.js" type="text/javascript"></script> <%--To show javascript error messages--%>
<script language="JavaScript" type="text/javascript" src="../common/scripts/emxUICore.js"></script>
<link rel="stylesheet" href="../common/styles/emxUIDefault.css" type="text/css">
<link rel="stylesheet" href="../common/styles/emxUIList.css" type="text/css">
<link rel="stylesheet" href="../common/styles/emxUIListPF.css" type="text/css">
<link rel="stylesheet" href="../common/styles/emxUIForm.css" type="text/css">

<html>
<head>

  <%
		IEFAttrMapping objIEFAttrMapping = (IEFAttrMapping)session.getAttribute("IEFAttrMapping");
		String gcoName = objIEFAttrMapping.getsGCOName();
		String sMappingType = objIEFAttrMapping.getsMappingType();

		String sEVENT_TYPECHANGE 							= IEFAttrMapping.EVENT_TYPECHANGE;
		String sEVENT_ENOVIATYPEATTRIBUTECHANGE 			= IEFAttrMapping.EVENT_ENOVIATYPEATTRIBUTECHANGE;
		String sEVOVIATYPE_EXPRESSION 						= IEFAttrMapping.EVOVIATYPE_EXPRESSION;
		String sACTION_ADD 									= objIEFAttrMapping.ACTION_ADD;
		String sACTION_ERROR 								= objIEFAttrMapping.ACTION_ERROR;

		List listENOVIAAttrType = objIEFAttrMapping.getENOVIAAttrTypeList();
		objIEFAttrMapping.setsErrorMessage("");
		MCADIntegrationSessionData integSessionData = (MCADIntegrationSessionData)session.getAttribute("MCADIntegrationSessionDataObject");
		Context context								= integSessionData.getClonedContext(session);

		MCADMxUtil util	                = new MCADMxUtil(context, integSessionData.getLogger(), integSessionData.getResourceBundle(), integSessionData.getGlobalCache());
		String lang = integSessionData.getLanguageName();
		String[] listColumeName = objIEFAttrMapping.getTableColumnNameMap();
		Map unsortedenoviaTypeMap = objIEFAttrMapping.getEnoviaTypeMap();
		Map enoviaTypeMap=new HashMap();
		int p=0;
		String toId[] = new String[unsortedenoviaTypeMap.size()];  
                Iterator iter = unsortedenoviaTypeMap.entrySet().iterator();  
  
                while (iter.hasNext())
                {  
                  Map.Entry mvalue = (Map.Entry) iter.next(); 
                  toId[p] = (String) mvalue.getValue();   
	           p++;
	       	}
         	Arrays.sort(toId);
                for (int g = 0; g < toId.length; g++)
                       enoviaTypeMap.put(g, toId[g]);
		Map cadTypeMap = new HashMap();

		String sTypesList = "";
		List FilteredAttrList = new ArrayList();

		String sAction	=Request.getParameter(request,"sAction");
        String sENOVIATypeVar	=Request.getParameter(request,"ENOVIATypeVar");
		String sTXTCADAttrName	=Request.getParameter(request,"CADAttrName");
		String sENOVIAAttriType	=Request.getParameter(request,"ENOVIAAttriType");
		String sCADTypeVar	=Request.getParameter(request,"CADTypeVar");
		String sENOVIAAttriNameValue	=Request.getParameter(request,"ENOVIAAttriNameValue");

		if(sAction == null) 				sAction = "";
		if(sENOVIATypeVar == null) 			sENOVIATypeVar = "";
		if(sTXTCADAttrName == null) 		sTXTCADAttrName = "";
		if(sENOVIAAttriType == null) 		sENOVIAAttriType = "";
		if(sCADTypeVar == null) 			sCADTypeVar = "";
		if(sENOVIAAttriNameValue == null) 	sENOVIAAttriNameValue = "";

		sAction	   				= MCADUrlUtil.hexDecode(sAction);
		sENOVIATypeVar	   		= MCADUrlUtil.hexDecode(sENOVIATypeVar);
		sTXTCADAttrName	   		= MCADUrlUtil.hexDecode(sTXTCADAttrName);
		sENOVIAAttriType	   	= MCADUrlUtil.hexDecode(sENOVIAAttriType);
		sCADTypeVar	   			= MCADUrlUtil.hexDecode(sCADTypeVar);
		sENOVIAAttriNameValue	= MCADUrlUtil.hexDecode(sENOVIAAttriNameValue);
		
		if(sAction != null && sEVENT_TYPECHANGE.equals(sAction))
		{
			cadTypeMap = objIEFAttrMapping.getCADTypeFromENOVIAType(sENOVIATypeVar);
		}
		if(sAction != null && (sEVENT_ENOVIATYPEATTRIBUTECHANGE.equals(sAction) || sACTION_ERROR.equals(sAction) || sACTION_ADD.equals(sAction)))
		{
			cadTypeMap = objIEFAttrMapping.getCADTypeFromENOVIAType(sENOVIATypeVar);
			FilteredAttrList = objIEFAttrMapping.getENOVIAAttributeNameList(context,sENOVIAAttriType,sENOVIATypeVar);
		}
  %>
 </head>
 <body>
  <form method="POST" name="frmAddAttribute" action="IEFAddAttribMappingFS.jsp?gcoName=<%=XSSUtil.encodeForURL(context, gcoName)%>&MappingType=<%=XSSUtil.encodeForURL(context, sMappingType)%>" target="_parent">

<%
boolean csrfEnabled = ENOCsrfGuard.isCSRFEnabled(context);
if(csrfEnabled)
{
  Map csrfTokenMap = ENOCsrfGuard.getCSRFTokenMap(context, session);
  String csrfTokenName = (String)csrfTokenMap .get(ENOCsrfGuard.CSRF_TOKEN_NAME);
  String csrfTokenValue = (String)csrfTokenMap.get(csrfTokenName);
%>
  <!--XSSOK-->
  <input type="hidden" name= "<%=ENOCsrfGuard.CSRF_TOKEN_NAME%>" value="<%=csrfTokenName%>" />
  <!--XSSOK-->
  <input type="hidden" name= "<%=csrfTokenName%>" value="<%=csrfTokenValue%>" />
<%
}
//System.out.println("CSRFINJECTION::AddAttribMxToCAD");
%>


		<input TYPE="hidden" NAME="attri" value="">
		<input TYPE="hidden" NAME="ENOVIATypeVar" value="">
		<input TYPE="hidden" NAME="ENOVIAAttriType" value="">
		<input TYPE="hidden" NAME="ENOVIAAttriNameValue" value="">
		<input TYPE="hidden" NAME="CADTypeVar" value="">
		<input TYPE="hidden" NAME="CADAttrName" value="">
		<input TYPE="hidden" NAME="sAction" value="">
		<input TYPE="hidden" NAME="sError" value="">
	<table class='form' width="100%" cellpadding="5" cellspacing="2" border="1" >
	<tr>
		<td class="label" width="30%"><%=listColumeName[0]%></td>
		<td class="inputField" width="70%">
			<select style="width: 300px" id="cmbENOVIAType" size="1" onchange=parent.changeTypeCombo("<%=XSSUtil.encodeForHTML(context,sMappingType)%>")>
			<option value=" " selected="selected">&nbsp;&nbsp;&nbsp;&nbsp;
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
			<%
			for (int i = 0;i< enoviaTypeMap.size();i++)
			{
				String sENOVIATypeVal = (String)enoviaTypeMap.get(i);
				if(sENOVIATypeVar != null && sENOVIATypeVal.equals(sENOVIATypeVar))
				{
					%>
					    <!--XSSOK-->
						<option selected value="<%=sENOVIATypeVal%>"><%=util.getNLSName(context, "Type",sENOVIATypeVal , "", "", lang)%></option>			
					<%
				}
				else{
					%>
					    <!--XSSOK-->
						<option value="<%=sENOVIATypeVal%>" ><%=util.getNLSName(context, "Type",sENOVIATypeVal , "", "", lang)%></option>
					<%
				}
			}
			%>
			</select>
		 </td>
    </tr>

	<tr>
		<td class="label" width="40%"><%=listColumeName[1]%></td>

		<td class="inputField" width="60%">
                        <!--XSSOK-->
			<label><%=integSessionData.getStringResource("mcadIntegration.Server.ColumnName.Type")%></label>

			<%

			if(sEVENT_ENOVIATYPEATTRIBUTECHANGE.equals(sAction) || (sEVENT_TYPECHANGE.equals(sAction) && !sENOVIATypeVar.equals("")) || sACTION_ERROR.equals(sAction) || sACTION_ADD.equals(sAction))
			{
			%>
				<select id="cmbENOVIAAttrType" size="1"  onchange=parent.changeENOVIAAttrTypeCombo()>
			<%
			}
			else
			{
			%>
				<select id="cmbENOVIAAttrType" disabled=true size="1" >
			<%
			}

				Iterator<String> it = listENOVIAAttrType.iterator();

				while (it.hasNext())
				{
						String element = it.next();
						String sTypeLocal = "";

						if(!element.equals(""))
						{
							sTypeLocal = "mcadIntegration.Server.FieldName." + element;
							sTypeLocal = integSessionData.getStringResource(sTypeLocal);
						}

						if(sENOVIAAttriType != null && element.equals(sENOVIAAttriType))
						{
							%>
								<option selected value="<%=element%>"><%=sTypeLocal%></option>
							<%
						}
						else{
							%>
								<option value="<%=element%>"><%=sTypeLocal%></option>
							<%
						}
				}
			%>
			</select>
                        <!--XSSOK-->
			<label><%=integSessionData.getStringResource("mcadIntegration.Server.FieldName.Attribute")%></label>
			<%

			if(sEVENT_ENOVIATYPEATTRIBUTECHANGE.equals(sAction) || sACTION_ERROR.equals(sAction) || sACTION_ADD.equals(sAction))
			{
				if(sENOVIAAttriType.equals(sEVOVIATYPE_EXPRESSION))
				{
					if(sACTION_ERROR.equals(sAction))
					{
						if(!sENOVIAAttriNameValue.equals(""))
						sENOVIAAttriNameValue	= sENOVIAAttriNameValue.substring(5, sENOVIAAttriNameValue.lastIndexOf(")"));
					}
						
					%>
						<input type=text id="cmbENOVIAAttrName" name="textfieldExpression" style="width: 150px" onkeypress="return parent.checkforRestrictedChar(event)"  value="<xss:encodeForHTMLAttribute><%=sENOVIAAttriNameValue%></xss:encodeForHTMLAttribute>"/>
					<%
				}
				else
			{
			%>
						<select id="cmbENOVIAAttrName" size="1" onchange=parent.changeENOVIAAttrValueCombo() >
			<%

				Iterator<String> itr = FilteredAttrList.iterator();
				while (itr.hasNext())
				{
						String element = itr.next();
						if(sENOVIAAttriNameValue != null && element.equals(sENOVIAAttriNameValue))
						{
							%>
								<option selected value="<%=element%>"><%=element%></option>
							<%
						}
								else
								{
						%>
								<option value="<%=element%>"><%=element%></option>
						<%
				}
				}
				%>
				</select>
				<%
			  }
			}
			else
			{
				%>
					<select id="cmbENOVIAAttrName" disabled=true size="1"  >
						<option value=" " selected="selected">&nbsp;&nbsp;&nbsp;&nbsp;</option>
					</select>
				<%
			}
			%>

		</td>
    </tr>
	<tr>
    <td class="label" width="40%"><%=listColumeName[2]%></td>
    <td class="inputField" width="60%">

	<%
					if(cadTypeMap != null)
					{
						int cadTypeCnt = cadTypeMap.size();

						if(cadTypeCnt > 1 || sACTION_ERROR.equals(sAction) || sACTION_ADD.equals(sAction))
						{
						%>
										<select id="cmbCADType" size="1" style="width: 300px" onchange=parent.refreshCADAttributeTxt()>
						<%

						}else{
						%>
										<select id="cmbCADType" size="1" disabled=true style="width: 300px" >
						<%
						}
						if(cadTypeCnt > 0)
						{
						for (int i = 0;i< cadTypeMap.size();i++)
						{
							String sCADTypeVal = (String)cadTypeMap.get(i);
							if(sCADTypeVar != null && sCADTypeVal.equals(sCADTypeVar))
							{
								%>
								    <!--XSSOK-->
									<option selected value="<%=sCADTypeVal%>" ><%=util.getNLSName(context, "Range", sCADTypeVal, "Attribute", "CAD Type", lang)%></option>
								<%
							}
							else{
								%>
								    <!--XSSOK-->
									<option value="<%=sCADTypeVal%>" ><%=util.getNLSName(context, "Range", sCADTypeVal, "Attribute", "CAD Type", lang)%></option>
								<%
							}
						}
					}
						else
						{
								%>
								        <!--XSSOK-->
									<option value="<%=sCADTypeVar%>"><%=sCADTypeVar%></option>
								<%
						}
					}
	%>
	</select>
     </td> </td>
    </tr>
	<tr>
    <td class="label" width="40%"><%=listColumeName[3]%></td>
	  <td class="inputField" width="60%">
		<%
			if(sEVENT_ENOVIATYPEATTRIBUTECHANGE.equals(sAction) || sACTION_ERROR.equals(sAction) || sACTION_ADD.equals(sAction) || (sEVENT_TYPECHANGE.equals(sAction) && !sENOVIATypeVar.equals("")))
			{
				%>
				        <!--XSSOK-->
					<input type=text id="txtCADAttrName"name="textfieldDel" style="width: 300px" onkeypress="return parent.checkforRestrictedChar(event)" value="<%=sTXTCADAttrName%>"/>
				<%
			}
			else
			{
				%>
				        <!--XSSOK-->
					<input type=text id="txtCADAttrName" disabled=true name="textfieldDel" style="width: 300px" onkeypress="return parent.checkforRestrictedChar(event)" value="<%=sTXTCADAttrName%>"/>
				<%
			}
		%>

	  </td>
    </tr>
</table>
  </form>
 </body>
</html>

