<%-- emxRouteWorkflow.jsp - Display the Workflow view of all the Tasks in a Route Copyright (c) 1992-2020 Dassault
	Systemes.All Rights Reserved. This program contains proprietary and trade secret information of MatrixOne,Inc.
	Copyright notice is precautionary only and does not evidence any actual or intended publication of such program --%>
<%@ page import="com.matrixone.apps.domain.DomainConstants,com.matrixone.apps.domain.util.ContextUtil,com.matrixone.apps.domain.util.PropertyUtil"%>
<%@include file = "../emxUICommonAppInclude.inc"%>
<%@include file="../common/emxNavigatorTopErrorInclude.inc"%>
<%@page import="com.matrixone.apps.domain.DomainObject"%>
<%@page import="com.matrixone.apps.domain.util.*"%>
<%@page import="com.matrixone.apps.domain.util.ContextUtil"%>
<%@page import="matrix.util.StringList"%>
<%@page import="com.matrixone.apps.domain.DomainRelationship"%>
<%@page import="java.util.HashMap"%>
<%@page import="com.matrixone.apps.framework.ui.UIUtil"%>
		<% String objectId=request.getParameter("objectId"); 
		 DomainObject proObj = DomainObject.newInstance(context, objectId);
		     StringList TaskList = new StringList();
                TaskList.add(DomainObject.SELECT_ID);
                TaskList.add("attribute[Title]");
                TaskList.add("attribute[XW_WBS_code]");
                TaskList.add("attribute[Status]");
                String objectWhere = "attribute[XW_hasAnalysis]==Y";
                MapList TaskMapList = proObj.getRelatedObjects(context, "Subtask", "*", TaskList, new StringList(), false, true, (short) 0, objectWhere, "", 0);
                if (TaskMapList.size() > 0) {  
			  %>
			<!DOCTYPE html>
			<html>
			<head>
				<script type="text/javascript">
					let id = "<%=objectId%>"
					console.log('objectId', id)
					window.objectId = id;
				</script>
				<script type="text/javascript" src="../common/scripts/jquery.min-xparam.js"></script>
				<script type="text/javascript" src="../common/scripts/jquery-ui.min-xparam.js"></script>
				<script type="text/javascript" src="../plugins/jsPlumb/1.4.1/jquery.jsPlumb-xparam.js"></script>
				<script type="text/javascript" src="../common/scripts/emxUICore.js"></script>
				<script type="text/javascript" src="../common/scripts/emxUIModal.js"></script>
				<link rel="stylesheet" type="text/css" href="../common/styles/emxUIDefault.css" />

				<script src="./assets/ObjTree.js"></script>
				<script defer="defer" src="./js/chunk-vendors.9c5df16d.js"></script>
				<script defer="defer" src="./js/app.6ef6b31e.js"></script>
				<link href="./css/chunk-vendors.ab49d789.css" rel="stylesheet">
				<link href="./css/app.a8e40929.css" rel="stylesheet">

			</head>

			<body class="route-graphical">
				<div class="route-container" id="app">
				</div>
			</body>

			</html>
				<%	}
				else{
					%>
				
				<!DOCTYPE html>
			<html>

			

			<body >
				
			</body>

			</html>
				
				<%
			}
			%>