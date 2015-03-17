/**
 * @author reed mi
 */
Ext.define("drp.app.store.projects.ProjectStore", {
    extend : 'Ext.data.TreeStore',
    model : 'drp.app.model.projects.ProjectModel',
    defaultRootId : '',
    root : {data : []}
});