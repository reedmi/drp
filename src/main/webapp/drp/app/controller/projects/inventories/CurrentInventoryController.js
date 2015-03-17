Ext.define('drp.app.controller.projects.inventories.CurrentInventoryController', {
    extend : 'Ext.app.Controller',
    
    currentInventoryGrid : null,
    
    init : function() {
        me = this;
        this.control({
            
            'currentinventoryview' : {
                afterrender : function(panel) {
                    currentInventoryGrid = panel.down('gridpanel');
                }
            },
            
            'currentinventoryview > treepanel' : {
                select : function(treepanel, record){
                    var id = record.data.id;
                    var _url = "project/"+id+"/inventories/current";
                    currentInventoryGrid.getStore().getProxy().url = _url;
                    currentInventoryGrid.getStore().reload();
                },
                afterrender : function(treepanel){
                    var store = treepanel.getStore();
                    Ext.apply(store.proxy.extraParams, {
                        userType : user.type,
                        userId : user.id
                    });
                    store.load({
                        node : store.getRootNode()
                    });
                }
            }

        });
    },
    
    views : ['drp.app.view.projects.inventories.CurrentInventoryView'],
    models :['drp.app.model.projects.ProjectModel','drp.app.model.projects.inventories.CurrentInventoryModel'],
    stores : ['drp.app.store.projects.inventories.CurrentInventoryStore']
});