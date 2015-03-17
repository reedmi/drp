Ext.define("drp.app.view.resources.WareCategoryForm", {
    extend : 'Ext.panel.Panel',
    alias : 'widget.warecategoryviewform',
    author : '100%',
    autoScroll : true,
    items : [{
        xtype : 'form',
        items : [{
            xtype : 'textfield',
            hidden : true,
            name : 'id'
        }, {
            xtype : 'textfield',
            anchor : '95%',
            margin : '5 0 0 5',
            name : 'name',
            allowBlank : false,
            fieldLabel : '名称<font color="red">*</font>'
        }, {
            xtype : 'textfield',
            anchor : '95%',
            margin : '5 0 0 5',
            name : 'code',
            fieldLabel : '编号'
        }, {
            xtype : 'fieldcontainer',
            height : 30,
            anchor : '95%',
            margin : '5 0 10 5',
            style : 'text-align:center',
            items : [{
                xtype : 'button',
                margin : '5 0 0 5',
                action : 'submitWareCategoryForm',
                width: 80,
                formBind : true,
                text : '确认'
            }, {
                xtype : 'button',
                margin : '5 0 0 5',
                action : 'closeWareCategoryForm',
                width: 80,
                text : '取消'
            }]
        }]
    }]
});
