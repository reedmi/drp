<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
  String path = request.getContextPath();
  String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>后台管理首页</title>
    <link rel="shortcut icon" type="image/x-icon" href="resources/images/ico.png">
    <base href="<%=basePath%>">  
    <%@ include file="/common/meta.jsp"%>
    <%@ include file="/common/Ext.jsp"%>
    <%@ include file="/common/global.jsp"%>
</head>
<body>

</body>
</html>