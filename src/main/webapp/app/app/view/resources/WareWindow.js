Ext.define('wms.app.view.resources.WareWindow', {
    extend : 'Ext.window.Window',
    alias : 'widget.warewindow',
    height: 520,
    width: 920,
    constrain : true,
    modal : true,
    closeAction : 'hide',
    resizable : false,
    layout : {
        type : 'fit'
    },
    items : [{
    	xtype : 'panel',
    	layout : 'fit',
	    items :[{
	    	xtype : 'wareview',
	    	title : '',
	    	closable : false
	    }]
    }]
});