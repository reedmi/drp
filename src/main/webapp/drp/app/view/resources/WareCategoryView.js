Ext.define('drp.app.view.resources.WareCategoryView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.warecategoryview',
    margins : '0 0 0 0',
    border : 0,
    title : '<center height=40>类别列表</center>',
    autoScroll : true,
    closable : true,
    layout : {
        type : 'border'
    },
    initComponent : function() {
        var me = this;

        Ext.applyIf(me, {
            items : [{
                xtype : 'treepanel',
                region : 'center',
                rootVisible : false,
                autoScroll : true,
                columnLines : true,
                rowLines : true,
                viewConfig : {
                    // 防止在刷新节点后默认回到最top
                    preserveScrollOnRefresh : false
                },
                store : "drp.app.store.resources.WareCategoryStore",
                columns : [{
                    xtype : 'treecolumn',
                    flex : 2,
                    dataIndex : 'name',
                    text : '名称'
                }, {
                    xtype : 'gridcolumn',
                    flex : 1,
                    dataIndex : 'code',
                    text : '编号'
                }, {
                    xtype : 'gridcolumn',
                    flex : 1,
                    dataIndex : 'status',
                    text : '状态',
                    renderer : function(value) {
                        if (value === 'ACTIVE') {
                            return '可用';
                        } else if (value === 'INACTIVE') {
                            return '不可用';
                        } else if(value === 'DESTORYED'){
                            return '已注销';
                        }
                    }
                }],
                listeners : {
                    'selectionchange' : function(model, selected){
                        me.down('#deleteWareCategory_btn').setDisabled(selected.length == 0);
                    }
                },
                dockedItems : [{
                    xtype : 'toolbar',
                    dock : 'top',
                    items : [{
                        xtype : 'button',
                        icon : 'resources/images/icons/add.png',
                        action : 'addWareCategory',
                        text : '新增类别'
                    }, '-', {
                        xtype : 'button',
                        icon : 'resources/images/icons/delete.png',
                        action : 'deleteWareCategory',
                        itemId : "deleteWareCategory_btn",
                        disabled : true,
                        text : '删除'
                    }]
                }]
            }]
        });
        me.callParent(arguments);
    }
});