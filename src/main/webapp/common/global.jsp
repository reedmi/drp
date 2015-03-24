<%@page import="com.originspark.drp.models.User,com.originspark.drp.util.enums.UserType,com.originspark.drp.util.json.Jackson"%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*,org.apache.commons.lang3.StringUtils,org.apache.commons.lang3.ObjectUtils" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script type="text/javascript">
    <% 
        String displayUserType = "";
        String urlUserType = "";
        User user = (User)request.getSession().getAttribute("user");
        if(user!=null){
             UserType type = user.getType();
             if(type.name().equals("MANAGER")){
                displayUserType="负责人";
                urlUserType="manager";
             }else if(type.name().equals("WAREKEEPER")){
                displayUserType="库管员";
                urlUserType="wareKeeper";
             }else if(type.name().equals("REGULATOR")){
                displayUserType="经手人";
                urlUserType="regulator";
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