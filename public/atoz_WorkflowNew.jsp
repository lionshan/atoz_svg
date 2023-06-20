<%-- emxRouteWorkflow.jsp - Display the Workflow view of all the Tasks in a Route Copyright (c) 1992-2020 Dassault
	Systemes.All Rights Reserved. This program contains proprietary and trade secret information of MatrixOne,Inc.
	Copyright notice is precautionary only and does not evidence any actual or intended publication of such program --%>

	<%@include file="../emxContentTypeInclude.inc" %>
		<% String objectId=request.getParameter("objectId"); %>
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
				<script defer="defer" src="/js/chunk-vendors.809c6748.js"></script>
				<script defer="defer" src="/js/app.6c419a2e.js"></script>
				<link href="/css/chunk-vendors.ab49d789.css" rel="stylesheet">
				<link href="/css/app.7ef82635.css" rel="stylesheet">
				
			</head>
			<body class="route-graphical">
				<div class="route-container" id="app">
				</div>
			</body>
			</html>