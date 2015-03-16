/**
 * @author allenjin
 */
Ext.define('wms.app.view.projects.ProjectView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.projectview',
    margins : '0 0 0 0',
    border : 0,
    title : '<center height=40>项目列表</center>',
    autoScroll : true,
    closable : true,
    layout : {
        type : 'border'
    },
    initComponent : function() {
        var me = this;

//        var selModel = Ext.create('Ext.selection.CheckboxModel', {
//            listeners : {
//                selectionchange : function(sm, selections) {
//                    me.down('#deleteProject_btn').setDisabled(selections.length == 0);
//                }
//            }
//        });

        Ext.applyIf(me, {
            items : [

            // {
            // xtype : 'panel',
            // region : 'north',
            // title : '查询',
            // collapsible : true,
            // items : [ {
            // xtype : 'form',
            // items : [{
            // xtype : 'fieldcontainer',
            // layout : 'column',
            // items : [ {
            // xtype : 'textfield',
            // margin : '5 0 0 10',
            // id: 'projectName_filter',
            // fieldLabel : '项目名称'
            // }, {
            // xtype : 'textfield',
            // margin : '5 0 0 15',
            // id: 'projectCode_filter',
            // fieldLabel : '项目编码'
            // } ]
            // }, {
            // xtype : 'fieldcontainer',
            // layout : 'column',
            // items : [ {
            // xtype : 'datefield',
            // margin : '5 0 0 10',
            // id: 'projectStartDate_filter',
            // fieldLabel : '开工时间'
            // }, {
            // xtype : 'datefield',
            // margin : '5 0 0 15',
            // id: 'projectEndDate_filter',
            // fieldLabel : '竣工时间'
            // }, {
            // xtype : 'textfield',
            // margin : '5 0 0 10',
            // id: 'projectCity_filter',
            // fieldLabel : '城市'
            // }, {
            // xtype : 'button',
            // margin : '5 0 0 20',
            // action : 'searchProject',
            // icon : 'resources/images/icons/search.png',
            // text : '查询'
            // } ]
            // } ]
            // } ]
            // },

            {
                xtype : 'treepanel',
                region : 'center',
                rootVisible : false,
                autoScroll : true,
                columnLines : true,
                rowLines : true,
//                selModel : selModel,
                viewConfig : {
                    // 防止在刷新节点后默认回到最top
                    preserveScrollOnRefresh : false
                },
                store : "wms.app.store.projects.ProjectStore",
                columns : [{
                    xtype : 'treecolumn',
                    width : 200,
                    dataIndex : 'name',
                    text : '项目名称'
                }, {
                    xtype : 'gridcolumn',
                    width : 100,
                    dataIndex : 'code',
                    text : '项目编号'
                }, {
                    xtype : 'gridcolumn',
                    width : 100,
                    dataIndex : 'projectManager',
                    text : '项目经理',
                    renderer : function(value, metadata, record) {
                        if (record.isLeaf()) {
                            return "";
                        } else {
                            return value==null?"":(value.name);
                        }
                    }
                }, {
                    xtype : 'gridcolumn',
                    width : 100,
                    dataIndex : 'wareKeeper',
                    text : '库管员',
                    renderer : function(value, metadata, record) {
                        if (record.isLeaf()) {
                            return "";
                        } else {
                            return value==null?"":(value.name);
                        }
                    }
                }, {
                    xtype : 'gridcolumn',
                    width : 100,
                    dataIndex : 'materialKeeper',
                    text : '材料员',
                    renderer : function(value, metadata, record) {
                        if (record.isLeaf()) {
                            return "";
                        } else {
                            return value==null?"":(value.name);
                        }
                    }
                }, {
                    xtype : 'gridcolumn',
                    width : 100,
                    dataIndex : 'city',
                    text : '城市'
                }, {
                    xtype : 'gridcolumn',
                    width : 100,
                    dataIndex : 'startDate',
                    text : '开工时间'
                }, {
                    xtype : 'gridcolumn',
                    width : 100,
                    dataIndex : 'endDate',
                    text : '竣工时间'
                }, {
                    xtype : 'gridcolumn',
                    width : 140,
                    dataIndex : 'createOn',
                    text : '创建时间'
                }, {
                    xtype : 'gridcolumn',
                    width : 140,
                    dataIndex : 'updateOn',
                    text : '更新时间'
                }],
                listeners : {
                    'selectionchange' : function(model, selected){
                        me.down('#deleteProject_btn').setDisabled(selected.length == 0);
                    }
                },
                dockedItems : [{
                    xtype : 'toolbar',
                    dock : 'top',
                    items : [{
                        xtype : 'button',
                        icon : 'resources/images/icons/add.png',
                        action : 'addProject',
                        text : '新增项目'
                    }, '-', {
                        xtype : 'button',
                        icon : 'resources/images/icons/add.png',
                        action : 'addSystem',
                        text : '新增系统'
                    }, '-', {
                        xtype : 'button',
                        icon : 'resources/images/icons/delete.png',
                        action : 'deleteProject',
                        itemId : "deleteProject_btn",
                        disabled : true,
                        text : '删除'
                    }]
                }]
            }]
        });
        me.callParent(arguments);
    }
});