var width = document.documentElement.clientWidth;
var height = document.documentElement.clientHeight;

Ext.define("drp.base.view.MainView", {
    extend : 'Ext.panel.Panel',
    border : 0,
    layout : 'border',
    alias : 'widget.mainview',
    width : width,
    height : height,
    items : [{
        region : 'north',
        xtype : 'northview'
    }, {
        region : 'west',
        xtype : 'westview'
    }, {
        xtype : 'centerview',
        region : 'center'
    }]
});