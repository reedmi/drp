/**
 * author Reedmi
 */
Ext.define('wms.app.view.projects.invoices.StockInInvoiceView', {
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
                    me.down('#submitInInvoice_btn').setDisabled(selections.length == 0);
                }
            }
        });
        
        var menuItems = [{
			xtype : 'button',
			action : 'approveInInvoice',
			icon : 'resources/images/icons/approved.gif',
			text : '提交通过'
    	}];
    	
        if(user.type != "MaterialKeeper"){
    		menuItems[1]={
    			xtype : 'button',
    			action : 'unapproveInInvoice',
    			icon : 'resources/images/icons/unapproved.gif',
    			text : '失败退回'
    		};
        }
        
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
                        }, {
                            xtype : 'textfield',
                            margin : '5 0 0 20',
                            labelWidth: 60,
                            itemId : 'projectName_filter',
                            fieldLabel : '项目名称'
                        }, {
                            xtype : 'textfield',
                            margin : '5 0 0 20',
                            labelWidth: 60,
                            itemId : 'systemName_filter',
                            fieldLabel : '系统名称'
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
                            itemId : 'materialKeeperName_filter',
                            fieldLabel : '材料员'
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
                            itemId : 'projetManagerName_filter',
                            fieldLabel : '项目经理'
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
                store : 'wms.app.store.projects.invoices.StockInInvoiceStore',
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
                    dataIndex : 'system.projectName',
                    flex : 2,
                    text : '项目名称'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'system.name',
                    flex : 2,
                    text : '系统名称'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'totalPrice',
                    flex : 1,
                    text : '合价'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'materialKeeperName',
                    flex : 2,
                    text : '材料员',
                    renderer : function(value, metadata, record) {
                        var materialKeeperAuditState = record.data.materialKeeperAuditState;
                        return me.displyAuditState(value, materialKeeperAuditState);
                    }
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'wareKeeperName',
                    flex : 2,
                    text : '库管员',
                    renderer : function(value, metadata, record) {
                        var wareKeeperAuditState = record.data.wareKeeperAuditState;
                        return me.displyAuditState(value, wareKeeperAuditState);
                    }
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'projectManagerName',
                    flex : 2,
                    text : '项目经理',
                    renderer : function(value, metadata, record) {
                        var projectManagerAuditState = record.data.projectManagerAuditState;
                        return me.displyAuditState(value, projectManagerAuditState);
                    }
                }],
                dockedItems : [{
                    xtype : 'pagingtoolbar',
                    dock : 'bottom',
                    store : 'wms.app.store.projects.invoices.StockInInvoiceStore',
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
                    }, {
                        itemId : 'submitInInvoice_btn',
                        disabled : true,
                    	text : '提交审核',
                    	icon : 'resources/images/icons/database_save.png',
                    	menu : {
                    		items : menuItems
                    	}
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