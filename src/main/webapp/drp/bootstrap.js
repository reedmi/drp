
Ext.onReady(function() {
    Ext.QuickTips.init();
    Ext.Loader.setConfig({
        enabled : true
    });
    
    Ext.application({
        requires: ['Ext.container.Viewport'],
        name: 'drp',
        appFolder: 'drp',
        launch: function() {
            Ext.create("Ext.container.Viewport", {
                layout : "fit",
                border : 0,
                items : [{
                    xtype : "mainview"
                }]
            });
        },
        controllers : ["drp.base.controller.MainController"]
    });
});