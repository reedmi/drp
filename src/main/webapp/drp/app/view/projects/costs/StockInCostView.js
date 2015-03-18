Ext.define('drp.app.view.projects.resources.StockInCostView', {
    extend : 'Ext.window.Window',
    alias : 'widget.stockincostview',
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
                    me.down('#deleteStockInCost_btn').setDisabled(selections.length == 0);
                }
            }
        });

        Ext.applyIf(me, {

            items : [{//<<<<<<<<<<<<<<<<<<<<入库单-抬头字段
                xtype : 'panel',
                region : 'north',
                layout : 'fit',
                height: 70,
                items : [{
                    xtype : 'form',
                    itemId : 'header_stockInCost_form',
                    items : [{
                        xtype : 'fieldcontainer',
                        layout : 'column',
                        items : [ {
                            xtype: 'textfield',
                            fieldLabel: '收到<font color="red">*</font>',
                            itemId : 'receiveMan_stockInInvoice_tf',
                            allowBlank: false,
                            name : 'receiveMan',
                            margin : '5 0 0 15',
                            width : 200,
                            labelWidth: 60
                        }, {
                            xtype: 'datefield',
                            fieldLabel: '日期<font color="red">*</font>',
                            margin : '5 0 0 15',
                            labelWidth: 60,
                            itemId : 'forDate_stockInInvoice_df',
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
                            itemId : 'code_stockInInvoice_tf',
                            name : 'code',
                            margin : '5 0 0 15',
                            width : 200,
                            labelWidth: 60
                        }]
                    }, {
                        xtype : 'fieldcontainer',
                        layout : 'column',
                        items : [{
                            xtype : 'textfield',//入库单的id
                            itemId : 'id_stockInInvoice',
                            hidden : true,
                            name : 'id'
                        }, { 
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
                            margin : '5 0 0 65',
                            action : 'confirmInvoiceHeader',
                            icon : 'resources/images/icons/ok.png',
                            text : '确认单据头'
                        }]
                    }]
                }]
            }, {//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<入库单-商品列表
                xtype : 'gridpanel',
                region : 'center',
                height : 260,
                autoScroll : true,
                columnLines : true,
                selModel : selModel,
                store : 'drp.app.store.projects.costs.StockInCostStore',
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
                        action : 'addStockInCost',
                        itemId : 'addStockInCost_btn',
                        text : '新增',
                        listeners : {
                            click : function() {
                                inCostForm.getForm().reset();
                                inCostForm.down('#chooseWare_stockInCost_btn').setDisabled(false);
                                inCostForm.down('#wareUnitPrice_stockInCost_nf').setReadOnly(false);
                                inCostForm.down('#wareQuantity_stockInCost_nf').setReadOnly(false);
                                inCostForm.down('#wareUnitPrice_stockInCost_nf').setValue(0);
                            }
                        }
                    }, '-', {
                        xtype : 'button',
                        icon : 'resources/images/icons/delete.png',
                        action : 'deleteStockInCost',
                        itemId : 'deleteStockInCost_btn',
                        disabled : true,
                        text : '删除'
                    }, '->', {
                        xtype : 'displayfield',
                        margin : '0 30 0 0',
                        labelWidth: 40,
                        itemId : 'totalPrice_stockInCost_df',
                        fieldLabel : '<B><font color="red">合价</font></B>',
                        listeners : {
                            afterrender : function(displayfield) {
                                var store = displayfield.up('stockincostview').down('grid').getStore();
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
                }]/*,
                listeners : {
                    select : function(grid, record){
                        var cost = record.data;
                        var ware = cost.ware;
                        //设置cost的id
                        inCostForm.down('#id_stockInCost_tf').setValue(cost.id);
                        //动态设置form表单
                        inCostForm.down('#wareName_stockInCost_tf').setValue(ware.name);
                        inCostForm.down('#wareModel_stockInCost_tf').setValue(ware.model);
                        inCostForm.down('#wareUnit_stockInCost_tf').setValue(ware.unit);
                        
                        inCostForm.down('#chooseWare_stockInCost_btn').setDisabled(true);
                        
                        inCostForm.down('#wareUnitPrice_stockInCost_nf').setReadOnly(false);
                        inCostForm.down('#wareUnitPrice_stockInCost_nf').setValue(cost.unitPrice);
                        inCostForm.down('#wareQuantity_stockInCost_nf').setReadOnly(false);
                        inCostForm.down('#wareQuantity_stockInCost_nf').setValue(cost.quantity);
                    }
                }*/
            }, {//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<入库单-商品添加的form
                xtype : 'panel',
                region : 'south',
                collapsible : true,
                height : 110,
                layout : 'fit',
                title : '商品信息',
                items : [{
                    xtype : 'form',
                    itemId : 'stockInCost_form',
                    items : [{
                        xtype : 'fieldcontainer',
                        layout : 'column',
                        items : [{
                            xtype : 'textfield',//入库单的id
                            hidden : true,
                            name : 'id',
                            itemId : 'id_stockInCost_tf'
                        }, {
                            xtype : 'textfield',
                            margin : '15 0 0 10',
                            itemId : 'wareName_stockInCost_tf',
                            labelWidth : 50,
                            allowBlank : false,
                            readOnly : true,
                            fieldLabel : '名称<font color="red">*</font>'
                        }, {
                            xtype : 'textfield',
                            name : 'wareId',
                            itemId : 'wareId_stockInCost_tf',
                            hidden : true
                        }, {
                            xtype : 'button',
                            text : '浏览...',
                            itemId : 'chooseWare_stockInCost_btn',
                            disabled : true,
                            action : 'chooseWare',
                            margin : '15 0 0 5'
                        }, {
                            xtype : 'textfield',
                            margin : '15 0 0 15',
                            itemId : 'wareModel_stockInCost_tf',
                            labelWidth : 50,
                            readOnly : true,
                            fieldLabel : '规格'
                        }, {
                            xtype : 'textfield',
                            margin : '15 0 0 15',
                            itemId : 'wareUnit_stockInCost_tf',
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
                            itemId : 'wareUnitPrice_stockInCost_nf',
                            name : 'unitPrice',
                            labelWidth : 50,
                            readOnly : true,
                            fieldLabel : '单价',
                            listeners : {
                                change : function(field, newValue, oldValue) {
                                    var form = field.up('form');
                                    var _quantity = form.down('#wareQuantity_stockInCost_nf').getValue();
                                    var _unitPrice = newValue;
                                    if (parseInt(_quantity) > 0)
                                        form.down('#wareTotal_stockInCost_nf').setValue(_quantity * _unitPrice);
                                    else
                                        form.down('#wareTotal_stockInCost_nf').setValue(0);
                                }
                            }
                        }, {
                            xtype : 'numberfield',
                            margin : '5 0 0 70',
                            itemId : 'wareQuantity_stockInCost_nf',
                            name : "quantity",
                            labelWidth : 50,
                            readOnly : true,
                            allowBlank : false,
                            fieldLabel : '数量<font color="red">*</font>',
                            listeners : {
                                change : function(field, newValue, oldValue) {
                                    var form = field.up('form');
                                    var _quantity = newValue;
                                    var _unitPrice = form.down('#wareUnitPrice_stockInCost_nf').getValue();
                                    if (parseInt(_quantity) > 0)
                                        form.down('#wareTotal_stockInCost_nf').setValue(_quantity * _unitPrice);
                                    else
                                        form.down('#wareTotal_stockInCost_nf').setValue(0);
                                }
                            }
                        }, {
                            xtype : 'numberfield',
                            margin : '5 0 0 15',
                            itemId : 'wareTotal_stockInCost_nf',
                            name : "total",
                            labelWidth : 50,
                            readOnly : true,
                            fieldLabel : '总价<font color="red">*</font>'
                        }, {
                            xtype : 'button',
                            formBind : true,
                            text : '添加商品',
                            action : 'saveStockInCost',
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