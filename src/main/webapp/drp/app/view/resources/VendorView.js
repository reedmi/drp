Ext.define('drp.app.view.resources.VendorView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.vendorview',
    margins : '0 0 0 0',
    border : 0,
    title : '<center height=40>供应商列表</center>',
    closable : true,
    bodyStyle : 'padding:0px',
    layout : 'border',
    initComponent : function() {
        var me = this;

        var selModel = Ext.create('Ext.selection.CheckboxModel', {
            listeners : {
                selectionchange : function(sm, selections) {
                    me.down('#deleteVendor_itemId').setDisabled(selections.length == 0);
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
                            itemId : 'vendorName_filter',
                            fieldLabel : '名称'
                        }, {
                            xtype : 'textfield',
                            margin : '5 0 0 15',
                            itemId : 'vendorAddress_filter',
                            fieldLabel : '地址'
                        }]
                    }, {
                        xtype : 'fieldcontainer',
                        layout : 'column',
                        items : [{
                            xtype : 'textfield',
                            margin : '5 0 0 10',
                            itemId : 'vendorPhone_filter',
                            fieldLabel : '联系电话'
                        }, {
                            xtype : 'textfield',
                            margin : '5 0 0 15',
                            name : 'model',
                            itemId : 'vendorContactMan_filter',
                            fieldLabel : '联系人'
                        }, {
                            xtype : 'button',
                            margin : '5 0 0 20',
                            action : 'searchVendor',
                            icon : 'resources/images/icons/search.png',
                            formBind : true,
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
                selModel : selModel,
                store : "drp.app.store.resources.VendorStore",
                columnLines : true,
                stripeRows : true,
                autoScroll : true,
                columns : [{
                    xtype : 'gridcolumn',
                    flex : 1,
                    dataIndex : 'contactMan',
                    text : '联系人'
                }, {
                    xtype : 'gridcolumn',
                    flex : 1,
                    dataIndex : 'phone',
                    text : '联系电话'
                }, {
                    xtype : 'gridcolumn',
                    flex : 2,
                    dataIndex : 'name',
                    text : '公司名称'
                }, {
                    xtype : 'gridcolumn',
                    flex : 2,
                    dataIndex : 'address',
                    text : '公司地址'
                }, {
                    xtype : 'gridcolumn',
                    flex : 1,
                    dataIndex : 'countOfWares',
                    text : '供应商品数量'
                }, {
                    xtype : 'gridcolumn',
                    flex : 3,
                    dataIndex : 'note',
                    text : '备注'
                }],
                viewConfig : {
                    listeners: {
                        refresh: function(grid) {
                            var nodes = grid.getNodes();
                            for (var i = 0; i < nodes.length; i++) {
                                var node = nodes[i];
                                var record = grid.getRecord(node);
                                var cells = Ext.get(node).query('td');
                                var status = record.get('status');
                                if(status == 'DESTORYED') {
                                    for(var j = 0; j < cells.length; j++) {
                                        Ext.fly(cells[j]).setStyle('background-color', '#FFCCCC');
                                    }
                                }
                            }
                        }
                    }
                },
                dockedItems : [{
                    xtype : 'toolbar',
                    dock : 'top',
                    items : [{
                        xtype : 'button',
                        icon : 'resources/images/icons/add.png',
                        action : 'addVendor',
                        text : '新增'
                    }, '-', {
                        xtype : 'button',
                        icon : 'resources/images/icons/delete.png',
                        action : 'deleteVendor',
                        itemId : 'deleteVendor_itemId',
                        disabled : true,
                        text : '删除'
                    }]
                }, {
                    xtype : 'pagingtoolbar',
                    dock : 'bottom',
                    displayInfo : true,
                    store : "drp.app.store.resources.VendorStore",
                    emptyMsg : "没有数据"
                }]
            }]
        });
        me.callParent(arguments);
    }
});