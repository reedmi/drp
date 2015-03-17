Ext.define('drp.app.view.projects.resources.StockInCostShowView', {
    extend : 'Ext.window.Window',
    alias : 'widget.stockincostshowview',
    height: 345,
    width: 840,
    constrain : true,
    modal : true,
    closeAction : 'hide',
    layout : {
        type : 'border'
    },
    resizable : false,
    initComponent : function() {
        var me = this;
        
        Ext.applyIf(me, {

            items : [{//<<<<<<<<<<<<<<<<<<<<入库单-抬头字段
                xtype : 'panel',
                region : 'north',
                layout : 'fit',
                height: 40,
                items : [{
                    xtype : 'form',
                    itemId : 'systemInfo_stockInCost_form',
                    items : [{
                        xtype : 'fieldcontainer',
                        layout : 'column',
                        items : [{
                            xtype : 'displayfield',
                            margin : '5 0 0 15',
                            labelWidth: 30,
                            name : 'system.projectName',
                            width : 200,
                            fieldLabel : '项目'
                        }, {
                            xtype : 'displayfield',
                            margin : '5 0 0 15',
                            labelWidth: 30,
                            name : 'system.name',
                            width : 200,
                            fieldLabel : '系统'
                        }, { 
                            xtype: 'displayfield',
                            fieldLabel: '日期',
                            margin : '5 0 0 15',
                            labelWidth: 40,
                            name : 'forDate',
                            width : 200,
                            format : 'Y-m-d'
                        }, { 
                            xtype: 'displayfield',
                            fieldLabel: '编号',
                            name : 'code',
                            margin : '5 0 0 15',
                            width : 100,
                            labelWidth: 40
                        }]
                    }]
                }]
            }, {//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<入库单-商品列表
                xtype : 'gridpanel',
                region : 'center',
                height : 260,
                autoScroll : true,
                columnLines : true,
                store : "drp.app.store.projects.costs.StockInCostStore",
                columns : [
                    Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype : 'gridcolumn',
                    flex : 2,
                    text : '商品名',
                    dataIndex : 'ware.name'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'ware.model',
                    flex : 2,
                    text : '规格'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'ware.unit',
                    flex : 1,
                    text : '单位'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'unitPrice',
                    flex : 2,
                    text : '单价'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'quantity',
                    flex : 2,
                    text : '数目'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'total',
                    flex : 2,
                    text : '总价'
                }]
            }],
            dockedItems : [{//<<<<<<<<<<<<<<<<<<<<<<<<入库单-汇总人员信息
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                items: [{
                    xtype : 'displayfield',
                    flex : 1,
                    margin : '0 0 0 30',
                    labelWidth: 50,
                    itemId : 'wareKeeperName_df',
                    fieldLabel : '库管员'
                }, {
                    xtype : 'displayfield',
                    flex : 1,
                    labelWidth: 50,
                    itemId : 'materialKeeperName_df',
                    fieldLabel : '材料员'
                }, {
                    xtype : 'displayfield',
                    flex : 1,
                    labelWidth: 60,
                    itemId : 'projectManagerName_df',
                    fieldLabel : '项目经理'
                }]
            }]
        });
        me.callParent(arguments);
    }
    
    
});