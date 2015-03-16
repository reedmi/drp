/**
 * author :Reed Mi
 */
Ext.define("wms.app.view.resources.WareViewForm", {
    extend : 'Ext.panel.Panel',
    alias : 'widget.wareviewform',
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
            name : 'brand',
            fieldLabel : '品牌'
        }, {
            xtype : 'textfield',
            anchor : '60%',
            margin : '5 0 0 5',
            name : 'model',
            fieldLabel : '规格'
        }, {
            xtype : 'combobox',
            fieldLabel : '单位<font color="red">*</font>',
            anchor : '60%',
            margin : '5 0 0 5',
            name : 'unit',
            allowBlank : false,
            displayField : 'name',
            valueField : 'value',
            store : Ext.create('Ext.data.Store', {
                fields : ['value', 'name'],
                data : [{
                    "value" : "个",
                    "name" : "个"
                }, {
                    "value" : "米",
                    "name" : "米"
                }, {
                    "value" : "套",
                    "name" : "套"
                }, {
                    "value" : "台",
                    "name" : "台"
                }, {
                    "value" : "支",
                    "name" : "支"
                }, {
                    "value" : "对",
                    "name" : "对"
                }, {
                    "value" : "条",
                    "name" : "条"
                }]
            })
        }, {
            xtype : 'combobox',
            anchor : '75%',
            margin : '5 0 0 5',
            name : 'vendor.id',
            valueField : 'id',
            displayField : 'name',
            editable : false,
            store : 'wms.app.store.resources.VendorStore',
            fieldLabel : '供应商'
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
                action : 'submitWareForm',
                width: 80,
                formBind : true,
                text : '确认'
            }, {
                xtype : 'button',
                margin : '5 0 0 5',
                action : 'closeWareForm',
                width: 80,
                text : '取消'
            }]
        }]
    }]
});
