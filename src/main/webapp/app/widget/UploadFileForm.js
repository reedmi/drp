Ext.define('wms.widget.UploadFileForm', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.uploadfileformview',
	layout : 'fit',
    items : [{
    	xtype : 'form',
    	bodyPadding : 20,
    	items : [{
            xtype : 'filefield',
            anchor : '100%',
            allowBlank : false,
            buttonText : '浏览...',
            name : 'attach',
            labelWidth : 50,
            margin : '10 0 0 5',
            fieldLabel : '文件'
        }, {
            xtype : 'fieldcontainer',
            height : 30,
            anchor : '95%',
            margin : '20 0 0 5',
            style : 'text-align:center',
            items : [{
                xtype : 'button',
                margin : '5 0 0 5',
                action : 'submitExcel',
                width: 80,
                formBind : true,
                text : '确认导入'
            }, {
                xtype : 'button',
                margin : '5 0 0 20',
                action : 'cancelExcel',
                width: 80,
                text : '取消'
            }]
        }]
    }]
});