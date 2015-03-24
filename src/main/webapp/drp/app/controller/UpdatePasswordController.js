
Ext.define("drp.app.controller.UpdatePasswordController",{
    extend : "Ext.app.Controller",
    
     init : function() {
         this.control({
             //修改密码
            'updatepasswordview button[action=updatepassword]':{
                click :  this.updatepassword 
            },
            'updatepasswordview button[action=cancel]':{
                click :  this.cancel
            }
         });
     },
     
     updatepassword : function (btn , e){
       var panel = btn.up('updatepasswordview');
       var updatepwdform = panel.down('form');
       var updatepwdvalues = updatepwdform.getForm().getValues();
       if(updatepwdvalues.newpwd != updatepwdvalues.newpwdagain){
           Ext.MessageBox.alert('提示','两次输入的密码不一致！');
           return false;
       }
       
       Ext.Ajax.request({
          url : 'profile/password/update', 
          method : 'GET',
          params : {
              data : Ext.encode(updatepwdvalues)
          },
          success : function(response) {
               var msg = Ext.decode(response.responseText);
               Ext.Msg.alert("提示",msg.message);
          }
       });
     },
     
     cancel : function(btn,e){
         var panel = btn.up('updatepasswordview').close();
     },
     
     views :["drp.app.view.UpdatePasswordView"]
     
})