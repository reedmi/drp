Ext.define("drp.app.store.resources.WareCategoryStore", {
    extend : 'Ext.data.TreeStore',
    model : 'drp.app.model.resources.WareCategoryModel',
    defaultRootId : '',
    root : {data : []}
});