<link rel="stylesheet" type="text/css" href="${ctx }/resources/css/main.css">
<%@ include file="/resources/css/main.css.jsp" %>
<script type="text/javascript">
function resize(){
    var he=document.body.clientHeight-104;
    //document.getElementById("left-div").style.height=he+"px";
  }
   window.onload = function (){
    resize();
   }
   window.onresize = function(){
       resize();
   }
</script>