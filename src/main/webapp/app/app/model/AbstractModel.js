Ext.define("wms.app.model.AbstractModel", {
    extend : "Ext.data.Model",
    fields : [{
        name : "id"
    }, {
        name : 'createOn',
        persist : false
    }, {
        name : 'updateOn',
        persist : false
    }, {
        name : 'createdByUserName',
        persist : false
    }, {
        name : 'updatedByUserName',
        persist : false
    }]
});