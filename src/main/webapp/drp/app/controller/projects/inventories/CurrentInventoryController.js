Ext.define('drp.app.controller.projects.inventories.CurrentInventoryController', {
    extend : 'Ext.app.Controller',

    init : function() {
        this.control({
            'currentinventoryview' : {
                afterrender : function(panel) {
                    var grid = panel.down('gridpanel');
                    grid.getStore().load();
                }
            },
            'currentinventoryview button[action=exportCurrentInventoryExcel]' : {
                click : function(btn){
                    var formonth = btn.up('monthendinventoryview').down('monthfield').getSubmitValue();
                    document.location = "project/"+projectId+"/inventories/current/export?formonth="+formonth;
                }
            }
        });
    },

    views : ['drp.app.view.projects.inventories.CurrentInventoryView'],
    models :['drp.app.model.projects.inventories.CurrentInventoryModel'],
    stores : ['drp.app.store.projects.inventories.CurrentInventoryStore']
});