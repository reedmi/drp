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
                height: 70,
                items : [{
                    xtype : 'form',
                    itemId : 'systemInfo_stockOutCost_form',
                    items : [{
                        xtype : 'fieldcontainer',
                        layout : 'column',
                        items : [{
                            xtype : 'textfield',//出库单的id
                            itemId : 'id_stockOutInvoice',
                            hidden : true,
                            name : 'id'
                        }, {
                            xtype : 'combobox',
                            margin : '5 0 0 15',
                            labelWidth: 60,
                            itemId : 'project_stockOutInvoice_cb',
                            name : 'system.projectName',
                            editable : false,
                            allowBlank : false,
                            width : 300,
                            displayField :"name",
                            valueField :"id",
                            fieldLabel : '项目<font color="red">*</font>',
                            store : 'drp.app.store.projects.ProjectDataStore',
                            listeners : {
                                afterrender : function(combo){
                                    //显示人员所属项目
                                    var store = combo.getStore();
                                    store.filters.clear();
                                    if(user.type != "Leader"){
                                        Ext.apply(store.proxy.extraParams, {
                                            userType : user.type,
                                            userId : user.id
                                        });
                                        store.load();
                                    }
                                },
                                select : function(combo,records){
                                    var project = records[0].data;
                                    var stockoutcostview = combo.up("stockoutcostview");
                                    //设置该项目下的人员
                                    stockoutcostview.down("#materialKeeperName_df").setValue(project.materialKeeper.name);
                                    stockoutcostview.down("#wareKeeperName_df").setValue(project.wareKeeper.name);
                                    stockoutcostview.down("#projectManagerName_df").setValue(project.projectManager.name);
                                    //根据项目动态加载下属系统
                                    var _url = "project/" + project.id;
                                    var system = stockoutcostview.down("#systemName_stockOutInvoice_cb");
                                    system.getStore().getProxy().url = _url;
                                    system.setValue("");
                                    system.setDisabled(false);
                                    system.getStore().reload();
                                }
                            }
                        }, {
                            xtype : 'combobox',
                            margin : '5 0 0 30',
                            labelWidth: 60,
                            itemId : 'systemName_stockOutInvoice_cb',
                            name : 'system.name',
                            allowBlank : false,
                            editable : false,
                            disabled : true,
                            width : 300,
                            fieldLabel : '系统<font color="red">*</font>',
                            valueField : 'id',
                            displayField : 'name',
                            fieldLabel : '系统名称<font color="red">*</font>',
                            store : Ext.create('Ext.data.Store', {
                                fields : ['id', 'name'],
                                proxy : {
                                    type : 'ajax',
                                    reader : {
                                        type : "json",
                                        root : "data",
                                        successProperty : 'success'
                                    },
                                    writer : {
                                        type : "json"
                                    }
                                }
                            }),
                            listeners : {
                                select : function(combo){
                                    combo.up('form').down('#systemId_stockOutInvoice_tf').setValue(combo.getSubmitValue());
                                }
                            }
                        }, {
                            xtype : 'textfield',
                            hidden : true,
                            itemId : 'systemId_stockOutInvoice_tf',
                            name : 'system.id'
                        }]
                    }, {
                        xtype : 'fieldcontainer',
                        layout : 'column',
                        items : [ { 
                            xtype: 'datefield',
                            fieldLabel: '日期<font color="red">*</font>',
                            margin : '5 0 0 15',
                            labelWidth: 60,
                            itemId : 'forDate_stockOutInvoice_df',
                            name : 'forDate',
                            editable : false,
                            width : 200,
                            format : 'Y-m-d'
                        }, { 
                            xtype: 'textfield',
                            fieldLabel: '编号<font color="red">*</font>',
                            itemId : 'code_stockOutInvoice_tf',
                            name : 'code',
                            margin : '5 0 0 15',
                            width : 200,
                            labelWidth: 60
                        }, { 
                            xtype: 'textfield',
                            fieldLabel: '领物人<font color="red">*</font>',
                            itemId : 'receiveMan_stockOutInvoice_tf',
                            name : 'receiveMan',
                            margin : '5 0 0 15',
                            width : 200,
                            labelWidth: 60,
                            listeners : {
                                change : function(tf){
                                    tf.up('stockoutcostview').down('#receiveMan_df').setValue(tf.getValue());
                                }
                            }
                        }, {
                            xtype : 'button',
                            margin : '5 0 0 25',
                            action : 'addSystemInfo',
                            icon : 'resources/images/icons/ok.png',
                            text : '确认所属系统'
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
            }],
            dockedItems : [{//<<<<<<<<<<<<<<<<<<<<<<<<出库单-汇总人员信息
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                items: [{
                    xtype : 'displayfield',
                    flex : 1,
                    margin : '0 0 0 30',
                    labelWidth: 50,
                    itemId : 'wareKeeperName_df',
                    fieldLabel : '库管员'
                }, {
                    xtype : 'displayfield',
                    flex : 1,
                    labelWidth: 50,
                    itemId : 'materialKeeperName_df',
                    fieldLabel : '材料员'
                }, {
                    xtype : 'displayfield',
                    flex : 1,
                    labelWidth: 60,
                    itemId : 'projectManagerName_df',
                    fieldLabel : '项目经理'
                }, {
                    xtype : 'displayfield',
                    flex : 1,
                    labelWidth: 60,
                    itemId : 'receiveMan_df',
                    fieldLabel : '领物人'
                }]
            }]
        });
        me.callParent(arguments);
    }
    
    
});