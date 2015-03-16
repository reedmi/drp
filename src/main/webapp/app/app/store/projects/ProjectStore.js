/**
 * @author reed mi
 */
Ext.define("wms.app.store.projects.ProjectStore", {
    extend : 'Ext.data.TreeStore',
    model : 'wms.app.model.projects.ProjectModel',
    defaultRootId : '',
    root : {data : []}
});