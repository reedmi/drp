Ext.define('wms.app.view.users.LeaderView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.leaderview',
    margins : '0 0 0 0',
    border : 0,
    title : '<center height=40>系统管理员</center>',
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
                    me.down('#deleteLeader_itemId').setDisabled(selections.length == 0);
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
                            labelWidth: 60,
                            margin : '5 0 0 10',
                            itemId : 'name_filter',
                            fieldLabel : '姓名'
                        }, {
                            xtype : 'textfield',
                            labelWidth: 60,
                            margin : '5 0 0 15',
                            itemId : 'code_filter',
                            fieldLabel : '编号'
                        }, {
                            xtype : 'textfield',
                            labelWidth: 60,
                            margin : '5 0 0 15',
                            itemId : 'phone_filter',
                            fieldLabel : '电话号码'
                        }]
                    }, {
                        xtype : 'fieldcontainer',
                        layout : 'column',
                        items : [{
                            xtype : 'textfield',
                            labelWidth: 60,
                            margin : '5 0 0 10',
                            itemId : 'email_filter',
                            fieldLabel : 'Email'
                        }, {
                            xtype : 'combobox',
                            labelWidth: 60,
                            margin : '5 0 0 15',
                            itemId : 'gender_filter',
                            fieldLabel : '性别',
                            displayField : 'name',
                            valueField : 'value',
                            store : Ext.create('Ext.data.Store', {
                                fields : ['value', 'name'],
                                data : [{
                                    "value" : "MALE",
                                    "name" : "男"
                                }, {
                                    "value" : "FEMALE",
                                    "name" : "女"
                                }]
                            })
                        }, {
                            xtype : 'combobox',
                            labelWidth: 60,
                            margin : '5 0 0 15',
                            itemId : 'status_filter',
                            fieldLabel : '状态',
                            displayField : 'name',
                            valueField : 'value',
                            store : Ext.create('Ext.data.Store', {
                                fields : ['value', 'name'],
                                data : [{
                                    "value" : "ACTIVE",
                                    "name" : "可用"
                                }, {
                                    "value" : "INACTIVE",
                                    "name" : "不可用"
                                }, {
                                    "value" : "DESTORYED",
                                    "name" : "已注销"
                                }]
                            })
                        }, {
                            xtype : 'button',
                            margin : '5 0 0 20',
                            action : 'searchLeader',
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
                store : "wms.app.store.users.LeaderStore",
                columns : [{
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
                }, {
                    xtype : 'gridcolumn',
                    flex : 1,
                    dataIndex : 'code',
                    text : '编号'
                }, {
                    xtype : 'gridcolumn',
                    flex : 1,
                    dataIndex : 'name',
                    text : '姓名'
                }, {
                    xtype : 'gridcolumn',
                    flex : 1,
                    dataIndex : 'gender',
                    text : '性别',
                    renderer : function(value) {
                        if (value === 'MALE') {
                            return '男';
                        } else if (value === 'FEMALE') {
                            return '女';
                        } else {
                            return '-';
                        }
                    }
                }, {
                    xtype : 'gridcolumn',
                    flex : 2,
                    dataIndex : 'phone',
                    text : '联系电话'
                }, {
                    xtype : 'gridcolumn',
                    flex : 2,
                    dataIndex : 'address',
                    text : '地址'
                }, {
                    xtype : 'gridcolumn',
                    flex : 2,
                    dataIndex : 'email',
                    text : '电子邮件'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'createOn',
                    flex : 2,
                    text : '创建时间'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'updateOn',
                    flex : 2,
                    text : '更新时间'
                }],
                dockedItems : [{
                    xtype : 'toolbar',
                    dock : 'top',
                    items : [{
                        xtype : 'button',
                        icon : 'resources/images/icons/add.png',
                        action : 'addLeader',
                        text : '新增'
                    }, '-', {
                        xtype : 'button',
                        icon : 'resources/images/icons/delete.png',
                        action : 'deleteLeader',
                        itemId : 'deleteLeader_itemId',
                        disabled : true,
                        text : '注销'
                    }]
                }, {
                    xtype : 'pagingtoolbar',
                    dock : 'bottom',
                    displayInfo : true,
                    store : "wms.app.store.users.LeaderStore",
                    emptyMsg : "没有数据"
                }]
            }]
        });
        me.callParent(arguments);
    }
});