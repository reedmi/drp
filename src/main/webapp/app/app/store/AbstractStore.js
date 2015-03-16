Ext.define("wms.app.store.AbstractStore", {
    extend : 'Ext.data.Store',
    model : 'wms.app.model.AbstractModel',
    pageSize : 50,
    autoLoad : false,
    remoteFilter : true, 
    remoteSort : true
});