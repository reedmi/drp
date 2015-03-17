Ext.define('drp.app.view.resources.WareView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.wareview',
    margins : '0 0 0 0',
    border : 0,
    title : '<center height=40>商品列表</center>',
    autoScroll : true,
    closable : true,
    layout : {
        type : 'border'
    },
    initComponent : function() {
        var me = this;

        var selModel = Ext.create('Ext.selection.CheckboxModel', {
            listeners : {
                selectionchange : function(sm, selections) {
                    me.down('#deleteWare_btn').setDisabled(selections.length == 0);
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
                            xtype : 'textfield',
                            margin : '5 0 0 10',
                            labelWidth: 60,
                            itemId : 'wareName_filter',
                            fieldLabel : '名称'
                        }, {
                            xtype : 'textfield',
                            margin : '5 0 0 15',
                            labelWidth: 60,
                            itemId : 'wareVendor_filter',
                            fieldLabel : '供应商'
                        }]
                    }, {
                        xtype : 'fieldcontainer',
                        layout : 'column',
                        items : [{
                            xtype : 'textfield',
                            margin : '5 0 0 10',
                            labelWidth: 60,
                            itemId : 'wareBrand_filter',
                            fieldLabel : '品牌'
                        }, {
                            xtype : 'textfield',
                            margin : '5 0 0 15',
                            labelWidth: 60,
                            itemId : 'wareModel_filter',
                            fieldLabel : '规格'
                        }, {
                            xtype : 'textfield',
                            margin : '5 0 0 15',
                            labelWidth: 60,
                            itemId : 'wareUnit_filter',
                            fieldLabel : '单位'
                        }, {
                            xtype : 'button',
                            margin : '5 0 0 20',
                            action : 'searchWare',
                            icon : 'resources/images/icons/search.png',
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
                store : "drp.app.store.resources.WareStore",
                columns : [{
                    xtype : 'gridcolumn',
                    width : 160,
                    dataIndex : 'name',
                    text : '品名'
                }, {
                    xtype : 'gridcolumn',
                    width : 160,
                    dataIndex : 'model',
                    text : '规格'
                }, {
                    xtype : 'gridcolumn',
                    width : 60,
                    dataIndex : 'unit',
                    text : '单位'
                }, {
                    xtype : 'gridcolumn',
                    width : 120,
                    dataIndex : 'produceOn',
                    text : '生产日期'
                }, {
                    xtype : 'gridcolumn',
                    width : 60,
                    dataIndex : 'storage',
                    text : '保质期'
                }, {
                    xtype : 'gridcolumn',
                    width : 90,
                    dataIndex : 'brand',
                    text : '品牌'
                }, {
                    xtype : 'gridcolumn',
                    width : 100,
                    dataIndex : 'vendor.name',
                    text : '供应商'
                }, {
                    xtype : 'gridcolumn',
                    text : '表单类型/数量',
                    columns : [{
                        xtype : 'gridcolumn',
                        width : 100,
                        dataIndex : 'countOfInCosts',
                        text : '入库单'
                    }, {
                        xtype : 'gridcolumn',
                        width : 100,
                        dataIndex : 'countOfOutCosts',
                        text : '出库单'
                    }, {
                        xtype : 'gridcolumn',
                        width : 100,
                        dataIndex : 'countOfInventories',
                        text : '盘点表'
                    }]
                }, {
                    xtype : 'gridcolumn',
                    width : 200,
                    dataIndex : 'note',
                    text : '备注'
                }, {
                    xtype : 'gridcolumn',
                    text : '维护信息',
                    columns : [{
                        xtype : 'gridcolumn',
                        width : 140,
                        dataIndex : 'createOn',
                        text : '创建时间'
                    }, {
                        xtype : 'gridcolumn',
                        width : 140,
                        dataIndex : 'updateOn',
                        text : '更新时间'
                    }]
                }],
                dockedItems : [{
                    xtype : 'toolbar',
                    dock : 'top',
                    items : [{
                        xtype : 'button',
                        icon : 'resources/images/icons/add.png',
                        itemId : 'addWare_btn',
                        action : 'addWare',
                        text : '新增'
                    }, {
                        xtype : 'button',
                        icon : 'resources/images/icons/delete.png',
                        action : 'deleteWare',
                        itemId : 'deleteWare_btn',
                        disabled : true,
                        text : '删除'
                    }, '->', {
                        xtype: 'button',
                        icon : 'resources/images/icons/upload.gif',
                        margin : '1 5 1 0',
                        action : 'importExcel',
                        itemId : 'importExcel_btn',
                        text: '导入excel'
                    }, {
                        xtype: 'button',
                        icon : 'resources/images/icons/download.gif',
                        margin : '1 5 1 0',
                        action : 'exportExcel',
                        itemId : 'exportExcel_btn',
                        text: '导出excel'
                    }]
                }, {
                    xtype : 'pagingtoolbar',
                    dock : 'bottom',
                    displayInfo : true,
                    store : "drp.app.store.resources.WareStore",
                    emptyMsg : "没有数据"
                }]
            }]
        });
        me.callParent(arguments);
    }
});