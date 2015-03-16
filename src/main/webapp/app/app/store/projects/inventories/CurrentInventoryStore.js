Ext.define("wms.app.store.projects.inventories.CurrentInventoryStore", {
    extend : 'Ext.data.Store',
    model : 'wms.app.model.projects.inventories.CurrentInventoryModel',
    pageSize : 50
});