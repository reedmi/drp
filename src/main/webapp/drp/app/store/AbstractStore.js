Ext.define("drp.app.store.AbstractStore", {
    extend : 'Ext.data.Store',
    model : 'drp.app.model.AbstractModel',
    pageSize : 50,
    autoLoad : false,
    remoteFilter : true, 
    remoteSort : true
});