Ext.define('drp.app.view.projects.inventories.CurrentInventoryView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.currentinventoryview',
    autoScroll : true,
    closable : true,
    layout : {
        type : 'border'
    },
    title : '<center height=40>实时库存量</center>',
    initComponent : function() {
        var me = this;

        Ext.applyIf(me, {
            items : [{
                xtype : 'gridpanel',
                region : 'center',
                title : '实时库存量',
                columnLines : true,
                store : 'drp.app.store.projects.inventories.CurrentInventoryStore',
                columns : [{
                    xtype : 'gridcolumn',
                    dataIndex : 'name',
                    flex : 1,
                    text : '品名'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'model',
                    flex : 1,
                    text : '规格'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'unit',
                    flex : 1,
                    text : '单位'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'incount',
                    flex : 1,
                    text : '当前入库量'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'outcount',
                    flex : 1,
                    text : '当前出库量'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'restcount',
                    flex : 1,
                    text : '当前剩余量'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'income',
                    flex : 1,
                    text : '收入'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'outcome',
                    flex : 1,
                    text : '支出'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'profit',
                    flex : 1,
                    text : '盈余'
                }],
                viewConfig : {
                    listeners: {
                        refresh: function(grid) {
                            var nodes = grid.getNodes();
                            for (var i = 0; i < nodes.length; i++) {
                                var node = nodes[i];
                                var record = grid.getRecord(node);
                                var cells = Ext.get(node).query('td');  
                                var restcount = record.get('restcount');
                                if(restcount < 10) {
                                    Ext.fly(cells[5]).setStyle('background-color', '#FFCCCC');
                                }
                                var profit = record.get('profit');
                                if(profit < 0) {
                                    Ext.fly(cells[8]).setStyle('background-color', '#FF0033');
                                }
                            }
                        }
                    }
                },
                dockedItems : [{
                    xtype : 'pagingtoolbar',
                    dock : 'bottom',
                    store : 'drp.app.store.projects.inventories.CurrentInventoryStore',
                    displayInfo : true
                }, {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: ['->', {
                        xtype: 'button',
                        icon : 'resources/images/icons/download.gif',
                        margin : '1 5 1 0',
                        itemId : 'exportCurrentInventoryExcel_btn',
                        action : 'exportCurrentInventoryExcel',
                        text: '导出excel'
                    }]
                }]
            }]
        });

        me.callParent(arguments);
    }

});