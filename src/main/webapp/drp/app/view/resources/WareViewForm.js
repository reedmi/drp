/**
 * author :Reed Mi
 */
Ext.define("drp.app.view.resources.WareViewForm", {
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
            xtype : 'treecombobox',
            anchor : '60%',
            margin : '5 0 0 5',
            name : 'category.id',
            valueField : 'id',
            displayField : 'name',
            editable : false,
            model : 'drp.app.model.resources.WareCategoryModel',
            fieldLabel : '产品种类'
        }, {
            xtype : 'textfield',
            anchor : '60%',
            margin : '5 0 0 5',
            name : 'name',
            allowBlank : false,
            fieldLabel : '品名<font color="red">*</font>'
        }, {
            xtype : 'textfield',
            anchor : '60%',
            margin : '5 0 0 5',
            name : 'model',
            fieldLabel : '规格'
        }, {
            xtype : 'combobox',
            fieldLabel : '单位<font color="red">*</font>',
            allowBlank : false,
            anchor : '60%',
            margin : '5 0 0 5',
            name : 'unit',
            displayField : 'name',
            valueField : 'value',
            store : Ext.create('Ext.data.Store', {
                fields : ['value', 'name'],
                data : [{
                    "value" : "吨",
                    "name" : "吨"
                }, {
                    "value" : "袋",
                    "name" : "袋"
                }, {
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
            xtype : 'datefield',
            anchor : '60%',
            margin : '5 0 0 5',
            name : 'produceOn',
            format:'Y-m-d',
            editable : false,
            fieldLabel : '生产日期',
            listeners : {
                afterrender : function(df){
                    if(df.getValue() == null){
                        df.setValue(new Date());
                    }
                }
            }
        }, {
            xtype : 'combobox',
            fieldLabel : '保质期',
            anchor : '60%',
            margin : '5 0 0 5',
            name : 'storage',
            displayField : 'name',
            valueField : 'value',
            store : Ext.create('Ext.data.Store', {
                fields : ['value', 'name'],
                data : [{
                    "value" : "三年",
                    "name" : "三年"
                }, {
                    "value" : "两年",
                    "name" : "两年"
                }, {
                    "value" : "一年",
                    "name" : "一年"
                }, {
                    "value" : "6个月",
                    "name" : "6个月"
                }]
            })
        }, {
            xtype : 'textfield',
            anchor : '60%',
            margin : '5 0 0 5',
            name : 'brand',
            fieldLabel : '品牌'
        }, {
            xtype : 'combobox',
            anchor : '75%',
            margin : '5 0 0 5',
            name : 'vendor.id',
            valueField : 'id',
            displayField : 'contactMan',
            editable : false,
            store : 'drp.app.store.resources.VendorStore',
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
