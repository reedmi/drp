Ext.define("wms.base.view.WestView", {
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
    initComponent: function() {
        var me = this;
         me.callParent(arguments);
         
         Ext.Ajax.request({
            url : ctx+"/menu/login",
            method : "GET",
            success : function(response, opts){
            	var resp = Ext.decode(response.responseText);
            	me.add(resp.data);
            },
            failure : function(resp, opts) {
            	
            }
        });
    }
    
});
