<%@page import="sun.reflect.ReflectionFactory.GetReflectionFactoryAction"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <%@ include file="/common/meta.jsp"%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>万里磷肥仓储管理系统登录</title>
<style type="text/css">
<!--
body {
        margin-left: 0px;
        margin-top: 0px;
        margin-right: 0px;
        margin-bottom: 0px;
        background-color: #016aa9;
        overflow:hidden;
}
.STYLE1 {
        color: #000000;
        font-size: 12px;
}
table{
    margin:0 auto;
}
-->
</style>
<script type="text/javascript">
    function submitForm(){
        var elements = document.form.elements;
        var username = elements.username.value;
        var password= elements.password.value;
        if(username == ""){
            alert("请输入用户名");
            return;
        }else if(password == ""){
            alert("请输入密码");
            return;
        }
        
        document.form.submit();
    }
</script>
</head>

<body>
    <%@ include file="/common/global.jsp"%>
    <%@ include file="/common/common.jsp"%>
    <% String s=(String)request.getAttribute("msg");
        if(s!=null){
    %>        
        <script>alert('<%=s%>');</script>
    <% 
        }
    %>
<form name="form" action="${ctx }/account/login" method="post">
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td><table width="962" border="0" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td height="235" background="${ctx}/images/login_03.gif">&nbsp;</td>
      </tr>
      <tr>
        <td height="53">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td width="394" height="53" background="${ctx}/images/login_05.gif">&nbsp;</td>
                <td width="206" background="${ctx}/images/login_06.gif">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="16%" height="25px"><div align="right"><span class="STYLE1">用户</span></div></td>
                        <td width="57%" height="25px"><div align="center">
                          <input type="text" name="username" style="width:125px;height:20px;background-color:#292929; border:solid 1px #7dbad7; font-size:12px; color:#6cd0ff">
                        </div></td>
                        <!--  <td width="27%" height="25px">&nbsp;</td> -->
                      </tr>
                      <tr>
                        <td height="25px"><div align="right"><span class="STYLE1">密码</span></div></td>
                        <td height="25px"><div align="center">
                          <input type="password" name="password" style="width:125px;height:20px; background-color:#292929; border:solid 1px #7dbad7; font-size:12px; color:#6cd0ff">
                        </div></td>
                        <td height="25"><div align="left"><a style="cursor:pointer" onclick="submitForm()"><img src="${ctx}/images/dl.gif" width="45" height="18" border="0"></a></div></td>
                      </tr>
                    </table>
                </td>
                <td width="362" background="${ctx}/images/login_07.gif">&nbsp;</td>
              </tr>  
            </table>
        </td>
      </tr>
      <tr>
        <td height="213" background="${ctx }/images/login_08.gif">&nbsp;</td>
      </tr>
    </table></td>
  </tr>
</table>
</form>
<iframe name="postIframe" style="display:none"></iframe>
</body>
</html>