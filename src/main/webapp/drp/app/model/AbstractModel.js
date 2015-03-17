Ext.define("drp.app.model.AbstractModel", {
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
        name : 'createdBy',
        persist : false
    }, {
        name : 'updatedBy',
        persist : false
    }, {
        name : 'status',
        persist : false
    }]
});