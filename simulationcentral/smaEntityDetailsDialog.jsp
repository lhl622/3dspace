<%-- (c) Dassault Systemes, 2008 --%>

<%@page import = "com.dassault_systemes.smaslm.matrix.common.FileUtil" %>
<%@page import = "com.dassault_systemes.smaslm.matrix.common.SimulationUtil" %>
<%@page import = "com.dassault_systemes.smaslm.matrix.common.SimulationConstants" %>
<%@page import = "com.matrixone.apps.domain.DomainObject"%>
<%@page import = "com.matrixone.apps.framework.ui.UINavigatorUtil"%>
<%@page import="com.matrixone.apps.domain.util.MapList"%>

<%@page import = "matrix.dbutil.SelectSetting"%>
<%@page import = "matrix.db.Command"%>

<%@page import="java.util.HashMap"%>

<%@include file = "../common/emxNavigatorInclude.inc"%>
<%@include file = "../common/emxNavigatorTopErrorInclude.inc"%>

<script language="Javascript" src="../common/scripts/emxUICore.js"></script>
<script type="text/javascript" src="../simulationcentral/smaStructureNavigator.js"></script>
<script language="Javascript" src="../common/scripts/emxUIModal.js"></script> 

<%

    HashMap paramMap =
        UINavigatorUtil.getRequestParameterMap(request);

    // get the OID from the map
    String objectId = (String) paramMap.get("objectId");
    if ( objectId != null && objectId.length() == 0 )
    {
        objectId = null;
    }

    // MapList to hold command data (i.e. M1 categories)
    MapList navCmds = new MapList(1);

    String objectType = "";

    // is this a file?
    if (FileUtil.isFileId(objectId))
    {
        // yep => keep just the document OID
        objectId = FileUtil.getObjectIdFromFileId(context,objectId);
        if (objectId != null)
        {
            // Get the type from the objectId passed in.
            // If this is a versioned document...
            // Need to get the parent document object id
            DomainObject obj = new DomainObject(objectId);
            objectType = obj.getInfo(context, DomainObject.SELECT_TYPE);
            if (objectType.equals(SimulationUtil.getSchemaProperty(
                SimulationConstants.SYMBOLIC_type_SimulationDocument_Versioned)))
            {
                objectId = (String) paramMap.get("parentOID");
            }
        }
    }

    // update the OID in the parameter Map
    paramMap.put("objectId", objectId);
    
    StringBuffer contentURL = new StringBuffer();
    contentURL.append("../common/emxTree.jsp?mode=insert")
    .append("&objectId=").append(objectId);
%>

<script>
showModalDialog("<%=contentURL.toString()%>",700,600); 
window.close();
</script>
