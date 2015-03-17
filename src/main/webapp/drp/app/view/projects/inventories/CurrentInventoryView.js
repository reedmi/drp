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
                xtype : 'treepanel',
                region : 'west',
                width : 200,
                rootVisible : false,
                title : '项目列表',
                store : Ext.create("Ext.data.TreeStore",{
                    defaultRootId : '',
                    //防止store自动加载
                    //http://www.sencha.com/forum/showthread.php?150004-How-to-stop-TreeStore-autoload
                    root : {
                        data : []
                    },
                    model : 'drp.app.model.projects.ProjectModel'
                }),
                columns : [{
                    xtype : 'treecolumn',
                    dataIndex : 'name',
                    text : '名称',
                    flex : 1
                }]
            }, {
                xtype : 'gridpanel',
                region : 'center',
                title : '库存量',
                columnLines : true,
                store : 'drp.app.store.projects.inventories.CurrentInventoryStore',
                columns : [{
                    xtype : 'gridcolumn',
                    dataIndex : 'wareName',
                    flex : 1,
                    text : '品名'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'wareBrand',
                    flex : 1,
                    text : '品牌'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'wareModel',
                    flex : 1,
                    text : '规格'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'wareUnit',
                    flex : 1,
                    text : '单位'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'currentStockIn',
                    flex : 1,
                    text : '当前入库量'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'currentStockOut',
                    flex : 1,
                    text : '当前出库量'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'currentStockRest',
                    flex : 1,
                    text : '当前剩余量'
                }],
                dockedItems : [{
                    xtype : 'pagingtoolbar',
                    dock : 'bottom',
                    store : 'drp.app.store.projects.inventories.CurrentInventoryStore',
                    displayInfo : true
                }]
            }]
        });

        me.callParent(arguments);
    }

});