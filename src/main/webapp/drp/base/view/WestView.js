Ext.define("drp.base.view.WestView", {
    extend : 'Ext.panel.Panel',
    alias : 'widget.westview',
    collapsible : true,
    split : true,
    border : 0,
    margins : '0 2 0 0',
    width : 180,
    titleAlign: 'center',
    title : "业务导航",
    align: 'center',
    layout : 'accordion',
    layoutConfig : {
        titleCollapse : false,
        animate : true,
        activeOnTop : true
    },
    items : [{
        title : "库存查看",
        titleAlign: 'center',
        autoScroll : true,
        items:[{
            xtype : "treepanel",
            rootVisible : false,// 不展示根节点
            displayField : "text",
            margin : '0 0 5 0',
            border : 0,
            root : {
                expanded : true,
                children : [{
                    text : "<span style='font-weight:bold'>实时库存</span>",
                    id : 'menu_current_inventory',
                    leaf : true
                }, {
                    text : "<span style='font-weight:bold'>月末盘点</span>",
                    id : 'menu_monthend_inventory',
                    leaf : true
                }]
            }
        }]
    }, {
        title : "出入库管理",
        titleAlign: 'center',
        autoScroll : true,
        items:[{
            xtype : "treepanel",
            rootVisible : false,// 不展示根节点
            displayField : "text",
            margin : '0 0 5 0',
            border : 0,
            root : {
                expanded : true,
                children : [{
                    text : "<span style='font-weight:bold'>入库单管理</span>",
                    id : 'menu_stockin',
                    leaf : true
                }, {
                    text : "<span style='font-weight:bold'>出库单管理</span>",
                    id : 'menu_stockout',
                    leaf : true
                }]
            }
        }]
    }, {
        title : "系统管理",
        titleAlign: 'center',
        autoScroll : true,
        items:[{
            xtype : "treepanel",
            rootVisible : false,
            displayField : "text",
            margin : '0 0 0 0',
            border : 0,
            root : {
                expanded : true,
                children : [ {
                    text : "商品管理",
                    leaf : false,
                    children : [{
                        text : "<span style='font-weight:bold'>商品类别</span>",
                        id : 'menu_ware_category',
                        leaf : true
                    }, {
                        text : "<span style='font-weight:bold'>商品</span>",
                        id : 'menu_ware',
                        leaf : true
                    }, {
                        text : "<span style='font-weight:bold'>供应商</span>",
                        id : 'menu_vendor',
                        leaf : true
                    }]
                }, {
                    text : "用户管理",
                    leaf : false,
                    children : [{
                        text : "<span style='font-weight:bold'>负责人</span>",
                        id : 'menu_manager',//对于菜单项，再分配id时都要加menu前缀
                        leaf : true
                    }, {
                        text : "<span style='font-weight:bold'>库管员</span>",
                        id : 'menu_warekeeper',
                        leaf : true
                    }, {
                        text : "<span style='font-weight:bold'>经手人</span>",
                        id : 'menu_regulator',
                        leaf : true
                    }]
                }]
            }
        }]
    }, {
        title : "个人中心",
        titleAlign: 'center',
        autoScroll : true,
        items:[{
            xtype : "treepanel",
            rootVisible : false,// 不展示根节点
            displayField : "text",
            margin : '0 0 5 0',
            border : 0,
            root : {
                expanded : true,
                children : [{
                    text : "<span style='font-weight:bold'>修改密码</span>",
                    id : 'menu_update_password',
                    leaf : true
                }]
            }
        }]
    }]
});
