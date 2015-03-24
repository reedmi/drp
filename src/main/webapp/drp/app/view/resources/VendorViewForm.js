Ext.define("drp.app.view.resources.VendorViewForm", {
    extend : 'Ext.panel.Panel',
    alias : 'widget.vendorviewform',
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
            anchor : '60%',
            margin : '20 0 0 10',
            name : 'contactMan',
            allowBlank : false,
            fieldLabel : '联系人<font color="red">*</font>'
        }, {
            xtype : 'textfield',
            anchor : '60%',
            margin : '5 0 0 10',
            name : 'phone',
            allowBlank : false,
            fieldLabel : '联系电话<font color="red">*</font>'
        }, {
            xtype : 'textfield',
            anchor : '60%',
            margin : '5 0 0 10',
            name : 'name',
            fieldLabel : '公司名称'
        }, {
            xtype : 'textfield',
            anchor : '60%',
            margin : '5 0 0 10',
            name : 'address',
            fieldLabel : '公司地址'
        }, {
            xtype : 'textarea',
            anchor : '90%',
            margin : '5 0 0 10',
            name : 'note',
            fieldLabel : '备注'
        }, {
            xtype : 'fieldcontainer',
            height : 30,
            anchor : '95%',
            margin : '5 0 10 5',
            style : 'text-align:center',
            items : [{
                xtype : 'button',
                margin : '5 0 0 5',
                action : 'submitVendorForm',
                width: 80,
                text : '确认'
            }, {
                xtype : 'button',
                margin : '5 0 0 5',
                action : 'closeVendorForm',
                width: 80,
                text : '取消'
            }]
        }]
    }]
});
