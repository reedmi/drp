Ext.define('drp.app.view.projects.costs.StockOutCostView', {
    extend : 'Ext.window.Window',
    alias : 'widget.stockoutcostview',
    height: 510,
    width: 840,
    constrain : true,
    modal : true,
    closeAction : 'hide',
    layout : {
        type : 'border'
    },
    resizable : false,
    initComponent : function() {
        var me = this;

        var selModel = Ext.create('Ext.selection.CheckboxModel', {
            listeners: {
                selectionchange: function(sm, selections) {
                    me.down('#deleteStockOutCost_btn').setDisabled(selections.length == 0);
                }
            }
        });

        Ext.applyIf(me, {

            items : [{//<<<<<<<<<<<<<<<<<<<<出库单-抬头字段
                xtype : 'panel',
                region : 'north',
                layout : 'fit',
                height: 100,
                items : [{
                    xtype : 'form',
                    itemId : 'header_stockOutCost_form',
                    items : [{
                        xtype : 'fieldcontainer',
                        layout : 'column',
                        items : [{
                            xtype : 'textfield',//出库单的id
                            itemId : 'id_stockOutInvoice',
                            hidden : true,
                            name : 'id'
                        }, {
                            xtype: 'datefield',
                            fieldLabel: '日期<font color="red">*</font>',
                            margin : '5 0 0 15',
                            labelWidth: 60,
                            itemId : 'forDate_stockOutInvoice_df',
                            name : 'forDate',
                            editable : false,
                            allowBlank: false,
                            width : 200,
                            format : 'Y-m-d',
                            listeners : {
                                afterrender : function(df) {
                                    if(df.getValue() == null) {
                                        df.setValue(new Date());
                                    }
                                }
                            }
                        }, { 
                            xtype: 'textfield',
                            fieldLabel: '编号',
                            itemId : 'code_stockOutInvoice_tf',
                            name : 'code',
                            margin : '5 0 0 15',
                            width : 200,
                            labelWidth: 60
                        }]
                    }, {
                        xtype : 'fieldcontainer',
                        layout : 'column',
                        items : [{
                            xtype: 'textfield',
                            fieldLabel: '收货单位<font color="red">*</font>',
                            itemId : 'receiveMan_stockOutInvoice_tf',
                            allowBlank: false,
                            name : 'receiveMan',
                            margin : '5 0 0 15',
                            width : 200,
                            labelWidth: 60
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '地址<font color="red">*</font>',
                            itemId : 'receiveAddress_stockOutInvoice_tf',
                            allowBlank: false,
                            name : 'address',
                            margin : '5 0 0 15',
                            width : 200,
                            labelWidth: 60
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '电话',
                            itemId : 'receivePhone_stockOutInvoice_tf',
                            name : 'phone',
                            margin : '5 0 0 15',
                            width : 200,
                            labelWidth: 60
                        }]
                    }, {
                        xtype : 'fieldcontainer',
                        layout : 'column',
                        items : [{ 
                            xtype : 'combobox',
                            width : 200,
                            labelWidth: 60,
                            margin : '5 0 0 15',
                            name : 'manager',
                            valueField : 'name',
                            displayField : 'name',
                            allowBlank: false,
                            store : 'drp.app.store.users.ManagerStore',
                            fieldLabel : '负责人<font color="red">*</font>'
                        }, { 
                            xtype : 'combobox',
                            width : 200,
                            labelWidth: 60,
                            margin : '5 0 0 15',
                            name : 'wareKeeper',
                            valueField : 'name',
                            displayField : 'name',
                            allowBlank: false,
                            store : 'drp.app.store.users.WareKeeperStore',
                            fieldLabel : '库管员<font color="red">*</font>'
                        }, {
                            xtype : 'combobox',
                            width : 200,
                            labelWidth: 60,
                            margin : '5 0 0 15',
                            name : 'regulator',
                            valueField : 'name',
                            displayField : 'name',
                            allowBlank: false,
                            store : 'drp.app.store.users.RegulatorStore',
                            fieldLabel : '经手人'
                        }, {
                            xtype : 'button',
                            margin : '5 0 0 25',
                            action : 'confirmInvoiceHeader',
                            icon : 'resources/images/icons/ok.png',
                            text : '确认单据头'
                        }]
                    }]
                }]
            }, {//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<出库单-商品列表
                xtype : 'gridpanel',
                region : 'center',
                height : 260,
                autoScroll : true,
                columnLines : true,
                selModel : selModel,
                store : 'drp.app.store.projects.costs.StockOutCostStore',
                columns : [
                    Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype : 'gridcolumn',
                    flex : 2,
                    text : '商品名',
                    dataIndex : 'ware.name'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'ware.model',
                    flex : 2,
                    text : '规格'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'ware.unit',
                    flex : 1,
                    text : '单位'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'unitPrice',
                    flex : 2,
                    text : '单价'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'quantity',
                    flex : 2,
                    text : '数目'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'total',
                    flex : 2,
                    text : '总价'
                }],
                dockedItems : [{
                    xtype : 'toolbar',
                    dock : 'top',
                    items : [{
                        xtype : 'button',
                        icon : 'resources/images/icons/add.png',
                        action : 'addStockOutCost',
                        itemId : 'addStockOutCost_btn',
                        text : '新增',
                        listeners : {
                            click : function() {
                                outCostForm.getForm().reset();
                                outCostForm.down('#chooseWare_stockOutCost_btn').setDisabled(false);
                                outCostForm.down('#wareUnitPrice_stockOutCost_nf').setReadOnly(false);
                                outCostForm.down('#wareQuantity_stockOutCost_nf').setReadOnly(false);
                                outCostForm.down('#wareUnitPrice_stockOutCost_nf').setValue(0);
                            }
                        }
                    }, '-', {
                        xtype : 'button',
                        icon : 'resources/images/icons/delete.png',
                        action : 'deleteStockOutCost',
                        itemId : 'deleteStockOutCost_btn',
                        disabled : true,
                        text : '删除'
                    }, '->', {
                        xtype : 'displayfield',
                        margin : '0 30 0 0',
                        labelWidth: 40,
                        itemId : 'totalPrice_stockOutCost_df',
                        fieldLabel : '<B><font color="red">合价</font></B>',
                        listeners : {
                            afterrender : function(displayfield) {
                                var store = displayfield.up('stockoutcostview').down('grid').getStore();
                                store.on("load", function() {
                                    var sumPrice = 0;
                                    var items = store.data.items;
                                    for (var i = 0; i < items.length; i++) {
                                        sumPrice += parseInt(items[i].data.total);
                                    }
                                    displayfield.setValue(sumPrice);
                                });
                            }
                        }
                    }]
                }],
                listeners : {
                    select : function(grid, record){
                        var cost = record.data;
                        var ware = cost.ware;
                        //设置cost的id
                        outCostForm.down('#id_stockOutCost_tf').setValue(cost.id);
                        //动态设置form表单
                        outCostForm.down('#wareName_stockOutCost_tf').setValue(ware.name);
                        outCostForm.down('#wareModel_stockOutCost_tf').setValue(ware.model);
                        outCostForm.down('#wareUnit_stockOutCost_tf').setValue(ware.unit);
                        
                        outCostForm.down('#chooseWare_stockOutCost_btn').setDisabled(true);
                        
                        outCostForm.down('#wareUnitPrice_stockOutCost_nf').setReadOnly(false);
                        outCostForm.down('#wareUnitPrice_stockOutCost_nf').setValue(cost.unitPrice);
                        outCostForm.down('#wareQuantity_stockOutCost_nf').setReadOnly(false);
                        outCostForm.down('#wareQuantity_stockOutCost_nf').setValue(cost.quantity);
                    }
                }
            }, {//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<出库单-商品添加的form
                xtype : 'panel',
                region : 'south',
                collapsible : true,
                height : 110,
                layout : 'fit',
                title : '商品信息',
                items : [{
                    xtype : 'form',
                    itemId : 'stockOutCost_form',
                    items : [{
                        xtype : 'fieldcontainer',
                        layout : 'column',
                        items : [{
                            xtype : 'textfield',//出库单的id
                            hidden : true,
                            name : 'id',
                            itemId : 'id_stockOutCost_tf'
                        }, {
                            xtype : 'textfield',
                            margin : '15 0 0 10',
                            itemId : 'wareName_stockOutCost_tf',
                            labelWidth : 50,
                            allowBlank : false,
                            readOnly : true,
                            fieldLabel : '名称<font color="red">*</font>'
                        }, {
                            xtype : 'textfield',
                            name : 'wareId',
                            itemId : 'wareId_stockOutCost_tf',
                            hidden : true
                        }, {
                            xtype : 'button',
                            text : '浏览...',
                            itemId : 'chooseWare_stockOutCost_btn',
                            disabled : true,
                            action : 'chooseWare',
                            margin : '15 0 0 5'
                        }, {
                            xtype : 'textfield',
                            margin : '15 0 0 15',
                            itemId : 'wareModel_stockOutCost_tf',
                            labelWidth : 50,
                            readOnly : true,
                            fieldLabel : '规格'
                        }, {
                            xtype : 'textfield',
                            margin : '15 0 0 15',
                            itemId : 'wareUnit_stockOutCost_tf',
                            labelWidth : 50,
                            readOnly : true,
                            allowBlank : false,
                            fieldLabel : '单位<font color="red">*</font>'
                        }]
                    }, {
                        xtype : 'fieldcontainer',
                        layout : 'column',
                        items : [{
                            xtype : 'numberfield',
                            margin : '5 0 0 10',
                            itemId : 'wareUnitPrice_stockOutCost_nf',
                            name : 'unitPrice',
                            labelWidth : 50,
                            readOnly : true,
                            fieldLabel : '单价',
                            listeners : {
                                change : function(field, newValue, oldValue) {
                                    var form = field.up('form');
                                    var _quantity = form.down('#wareQuantity_stockOutCost_nf').getValue();
                                    var _unitPrice = newValue;
                                    if (parseInt(_quantity) > 0)
                                        form.down('#wareTotal_stockOutCost_nf').setValue(_quantity * _unitPrice);
                                    else
                                        form.down('#wareTotal_stockOutCost_nf').setValue(0);
                                }
                            }
                        }, {
                            xtype : 'numberfield',
                            margin : '5 0 0 70',
                            itemId : 'wareQuantity_stockOutCost_nf',
                            name : "quantity",
                            labelWidth : 50,
                            readOnly : true,
                            allowBlank : false,
                            fieldLabel : '数量<font color="red">*</font>',
                            listeners : {
                                change : function(field, newValue, oldValue) {
                                    var form = field.up('form');
                                    var _quantity = newValue;
                                    var _unitPrice = form.down('#wareUnitPrice_stockOutCost_nf').getValue();
                                    if (parseInt(_quantity) > 0)
                                        form.down('#wareTotal_stockOutCost_nf').setValue(_quantity * _unitPrice);
                                    else
                                        form.down('#wareTotal_stockOutCost_nf').setValue(0);
                                }
                            }
                        }, {
                            xtype : 'numberfield',
                            margin : '5 0 0 15',
                            itemId : 'wareTotal_stockOutCost_nf',
                            name : "total",
                            labelWidth : 50,
                            readOnly : true,
                            fieldLabel : '总价<font color="red">*</font>'
                        }, {
                            xtype : 'button',
                            formBind : true,
                            text : '添加商品',
                            action : 'saveStockOutCost',
                            icon : 'resources/images/icons/add2.png',
                            margin : '5 0 0 20'
                        }]
                    }]
                }]
            }]
        });
        me.callParent(arguments);
    }
});