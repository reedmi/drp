Ext.define("drp.app.store.projects.inventories.CurrentInventoryStore", {
    extend : 'Ext.data.Store',
    model : 'drp.app.model.projects.inventories.CurrentInventoryModel',
    pageSize : 50,
    autoLoad : false
});