<%@page import="com.originspark.drp.models.users.AbstractUser,com.originspark.drp.util.json.Jackson"%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*,org.apache.commons.lang3.StringUtils,org.apache.commons.lang3.ObjectUtils" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script type="text/javascript">
	var ctx = '<%=request.getContextPath() %>';
	<% 
		String displayUserType = "";
		String urlUserType = "";
		AbstractUser user = (AbstractUser)request.getSession().getAttribute("user");
		if(user!=null){
		 	String type=user.getType();
		 	if(type.equals("Leader")){
		 	   displayUserType="管理员";
		 	   urlUserType="leader";
		 	}else if(type.equals("ProjectManager")){
		 	   displayUserType="项目经理";
		 	   urlUserType="projectManager";
		 	}else if(type.equals("WareKeeper")){
		 	   displayUserType="库管员";
		 	   urlUserType="wareKeeper";
		 	}else if(type.equals("MaterialKeeper")){
		 	   displayUserType="材料员";
		 	   urlUserType="materialKeeper";
		 	}else{
		 	   displayUserType="身份未知";
		 	   urlUserType=null;
		 	}
		}
	%>
	var user = <%=Jackson.toJson(user)%>
	var displayUserType = '<%=displayUserType%>';
	var urlUserType = '<%=urlUserType%>';
</script>