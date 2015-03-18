/**
 * author Reedmi
 */
Ext.define('drp.app.view.projects.invoices.StockInInvoiceView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.stockininvoiceview',
    autoScroll : true,
    closable : true,
    layout : {
        type : 'border'
    },
    title : '<center height=40>入库单列表</center>',

    initComponent : function() {
        var me = this;

        var selModel = Ext.create('Ext.selection.CheckboxModel', {
            listeners : {
                selectionchange : function(sm, selections) {
                    me.down('#deleteInInvoice_btn').setDisabled(selections.length == 0);
                }
            }
        });

        Ext.applyIf(me, {

            items : [{
                xtype : 'panel',
                region : 'north',
                title : '查询',
                collapsible : true,
                items : [{
                    xtype : 'form',
                    items : [{
                        xtype : 'fieldcontainer',
                        layout : 'column',
                        items : [{
                            xtype : 'datefield',
                            margin : '5 0 0 10',
                            labelWidth: 60,
                            itemId : 'startDate_filter',
                            fieldLabel : '开始日期',
                            editable : false,
                            format : 'Y-m-d'
                        }, {
                            xtype : 'datefield',
                            margin : '5 0 0 20',
                            labelWidth: 60,
                            itemId : 'endDate_filter',
                            fieldLabel : '结束日期',
                            editable : false,
                            format : 'Y-m-d'
                        }]
                    }, {
                        xtype : 'fieldcontainer',
                        layout : 'column',
                        items : [{
                            xtype : 'numberfield',
                            margin : '5 0 0 10',
                            labelWidth: 60,
                            itemId : 'minTotal_filter',
                            fieldLabel : '最低合价'
                        }, {
                            xtype : 'numberfield',
                            margin : '5 0 0 20',
                            labelWidth: 60,
                            itemId : 'maxTotal_filter',
                            fieldLabel : '最高合价'
                        }, {
                            xtype : 'textfield',
                            margin : '5 0 0 20',
                            labelWidth: 60,
                            itemId : 'wareName_filter',
                            fieldLabel : '产品名称'
                        }]
                    }, {
                        xtype : 'fieldcontainer',
                        layout : 'column',
                        items : [{
                            xtype : 'textfield',
                            margin : '5 0 0 10',
                            labelWidth: 60,
                            itemId : 'regulatorName_filter',
                            fieldLabel : '经手人'
                        }, {
                            xtype : 'textfield',
                            margin : '5 0 0 20',
                            labelWidth: 60,
                            itemId : 'wareKeeperName_filter',
                            fieldLabel : '库管员'
                        }, {
                            xtype : 'textfield',
                            margin : '5 0 0 20',
                            labelWidth: 60,
                            itemId : 'managerName_filter',
                            fieldLabel : '负责人'
                        }, {
                            xtype : 'button',
                            margin : '5 0 0 25',
                            icon : 'resources/images/icons/search.png',
                            action : 'searchStockInInvoice',
                            text : '查询'
                        }, {
                            xtype : 'button',
                            margin : '5 0 0 20',
                            icon : 'resources/images/icons/refresh.gif',
                            text : '清空',
                            listeners : {
                                click : function(btn){
                                    btn.up('form').getForm().reset();
                                }
                            }
                        }]
                    }]
                }]
            }, {
                xtype : 'gridpanel',
                region : 'center',
                autoScroll : true,
                columnLines : true,
                selModel : selModel,
                store : 'drp.app.store.projects.invoices.StockInInvoiceStore',
                columns : [{
                    xtype : 'gridcolumn',
                    flex : 1,
                    text : '日期',
                    dataIndex : 'forDate'
                }, {
                    xtype : 'gridcolumn',
                    flex : 1,
                    text : '编号',
                    dataIndex : 'code'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'receiveMan',
                    flex : 2,
                    text : '收到'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'totalPrice',
                    flex : 1,
                    text : '合价'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'manager',
                    flex : 2,
                    text : '负责人'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'wareKeeper',
                    flex : 2,
                    text : '库管员'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'regulatorName',
                    flex : 2,
                    text : '经手人'
                }],
                dockedItems : [{
                    xtype : 'pagingtoolbar',
                    dock : 'bottom',
                    store : 'drp.app.store.projects.invoices.StockInInvoiceStore',
                    displayInfo : true
                }, {
                    xtype : 'toolbar',
                    itemId : 'operationInInvoice_tb',
                    dock : 'top',
                    items : [{
                        xtype : 'button',
                        icon : 'resources/images/icons/add.png',
                        action : 'showAddInInvoiceUI',
                        itemId : 'addInInvoice_btn',
                        text : '增加'
                    }, {
                        xtype : 'button',
                        icon : 'resources/images/icons/delete.png',
                        action : 'deleteInInvoice',
                        itemId : 'deleteInInvoice_btn',
                        disabled : true,
                        text : '删除'
                    }]
                }]
            }]

        });
        me.callParent(arguments);
    },

    displyAuditState : function(value, auditState) {
        if (auditState == "APPROVED") {
            return '<span style="color:#6bb601;">' + value + '-审核通过</span>';
        } else if (auditState == "UNAPPROVED") {
            return '<span style="color:red;">' + value + '-审核失败</span>';
        } else if (auditState == "UNAUDITED") {
            return value + '-待审核';
        }
    }
    
});