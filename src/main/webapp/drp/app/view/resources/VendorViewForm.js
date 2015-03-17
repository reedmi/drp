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
            margin : '5 0 0 5',
            name : 'name',
            allowBlank : false,
            fieldLabel : '名称<font color="red">*</font>'
        }, {
            xtype : 'textfield',
            anchor : '60%',
            margin : '5 0 0 5',
            name : 'address',
            allowBlank : false,
            fieldLabel : '地址名称<font color="red">*</font>'
        }, {
            xtype : 'textfield',
            anchor : '60%',
            margin : '5 0 0 5',
            name : 'phone',
            allowBlank : false,
            fieldLabel : '联系电话<font color="red">*</font>'
        }, {
            xtype : 'textfield',
            anchor : '75%',
            margin : '5 0 0 5',
            name : 'contactMan',
            allowBlank : false,
            fieldLabel : '联系人名称<font color="red">*</font>'
        }, {
            xtype : 'textfield',
            anchor : '75%',
            margin : '5 0 0 5',
            name : 'registrationNumber',
            fieldLabel : '注册编号'
        }, {
            xtype : 'textfield',
            anchor : '75%',
            margin : '5 0 0 5',
            name : 'registrationRange',
            fieldLabel : '承包范围'
        }, {
            xtype : 'textfield',
            anchor : '75%',
            margin : '5 0 0 5',
            name : 'registrationBank',
            fieldLabel : '开户行'
        }, {
            xtype : 'textfield',
            anchor : '75%',
            margin : '5 0 0 5',
            name : 'orgCodeCertificate',
            fieldLabel : '组织机构代码证'
        }, {
            xtype : 'textfield',
            anchor : '75%',
            margin : '5 0 0 5',
            name : 'taxNumber',
            fieldLabel : '税号'
        }, {
            xtype : 'textarea',
            anchor : '90%',
            margin : '5 0 0 5',
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
