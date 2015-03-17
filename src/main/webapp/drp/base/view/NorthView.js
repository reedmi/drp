Ext.define("drp.base.view.NorthView", {
    extend : "Ext.panel.Panel",
    alias : 'widget.northview',
    height : 60,
    bodyStyle : {
        background : '#EAEAEA'
    },
    layout : {
        type : 'border'
    },
    initComponent: function() {
        var me = this;
        
        Ext.applyIf(me, {
            items : [{
                xtype : 'image',
                region : 'west',
                height : 75,
                width : 1360,
                src : "resources/images/banner2.png"
            },{
                xtype : 'fieldcontainer',
                region : 'east',
                height : 50,
                width : '30%',
                style : 'text-align:right',
                layout : {
                    type : 'column'
                },
                items : [{
                    xtype : 'label',
                    margin : '15 0 0 1',
                    style : 'font-weight:bold',
                    text : "欢迎 " + displayUserType + " : " + user.name,
                    width : 200
                }, {
                    xtype : 'button',
                    text : '退出',
                    icon : 'resources/images/logout.png',
                    width : 60,
                    margin : '10 0 0 20',
                    handler : function(btn, e) {
                        window.location.href = 'account/logout';
                    }
                }]
            }]
        });
        me.callParent(arguments);
    }
});
