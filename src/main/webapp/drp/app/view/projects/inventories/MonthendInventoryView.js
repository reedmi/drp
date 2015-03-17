Ext.define('drp.app.view.projects.inventories.MonthendInventoryView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.monthendinventoryview',
    autoScroll : true,
    closable : true,
    layout : {
        type : 'border'
    },
    title : '<center height=40>每日总账',
    initComponent : function() {
        var me = this;

        Ext.applyIf(me, {
            items : [{
                xtype : 'gridpanel',
                region : 'center',
                title : '库存量',
                columnLines : true,
                store : 'drp.app.store.projects.inventories.MonthEndInventoryStore',
                columns : [{
                    xtype : 'gridcolumn',
                    dataIndex : 'wareName',
                    flex : 2,
                    text : '品名'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'wareBrand',
                    flex : 1,
                    text : '品牌'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'wareModel',
                    flex : 2,
                    text : '规格'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'wareUnit',
                    flex : 1,
                    text : '单位'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'lastMonthLeft',
                    flex : 1,
                    text : '上月结存'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'monthIn',
                    flex : 1,
                    text : '本月入库'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'monthOut',
                    flex : 1,
                    text : '本月出库'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'monthLeft',
                    flex : 1,
                    text : '本月结存'
                }],
                dockedItems : [{
                    xtype : 'pagingtoolbar',
                    dock : 'bottom',
                    store : 'drp.app.store.projects.inventories.MonthEndInventoryStore',
                    displayInfo : true
                }, {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [ {
                        xtype: 'monthfield',
                        labelWidth: 50,
                        width : 150,
                        format : 'Y-m',
                        editable : false,
                        maxValue : new Date(),
                        fieldLabel: '日期',
                        listeners : {
                            afterrender : function(mf){
                                if(mf.getValue() == null){
                                    mf.setValue(new Date());
                                }
                            }
                        }
                    },  '->', {
                        xtype: 'button',
                        icon : 'resources/images/icons/download.gif',
                        margin : '1 5 1 0',
                        itemId : 'exportExcel_btn',
                        action : 'exportExcel',
                        text: '导出excel'
                    }]
                }]
            }]
        });

        me.callParent(arguments);
    }

});