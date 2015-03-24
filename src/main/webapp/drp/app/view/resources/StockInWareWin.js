Ext.define('drp.app.view.resources.StockInWareWin', {
    extend : 'Ext.window.Window',
    alias : 'widget.stockinwarewin',
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