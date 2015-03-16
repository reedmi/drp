
Ext.define("wms.app.view.UpdatePasswordView",{
	extend : 'Ext.panel.Panel',
	alias : 'widget.updatepasswordview',
	margins : '100 0 0 200',
	border : 0,
	title : '密码修改',
	closable : true,
	width: 430,
    height :250,
	 layout : 'hbox',
	 align : 'center',
	items :[{
		xtype : 'panel',
		bodyPadding : 10,
		title : '密码修改',
		width: 420,
		items :[{
			xtype : 'form',
			frame:true,
	        bodyStyle:'padding:5px 5px 0',
	        width: 400,
	        height :250,
			items :[{
				xtype : 'textfield',
				inputType:'password',
				margin : '50 0 0 50',
				name: 'pwd',
				fieldLabel : '原密码'
			}, {
				xtype : 'textfield',
				inputType:'password',
				margin : '20 0 0 50',
				name: 'newpwd',
				fieldLabel : '新密码'
			}, {
				xtype : 'textfield',
				inputType:'password',
				margin : '20 0 0 50',
				name: 'newpwdagain',
				fieldLabel : '确认密码'
			}, {
				xtype : 'button',
				margin : '30 0 0 80',
				itemId : 'updatepassword_btn',
				action : 'updatepassword',
				text : '修改',
				width : 70,
				height : 25
			},{
				xtype : 'button',
				margin : '30 0 0 60',
				itemId : 'cancel_btn',
				action : 'cancel',
				text : '取消',
				width : 70,
				height : 25
			}]
		}]
		
	}]
});