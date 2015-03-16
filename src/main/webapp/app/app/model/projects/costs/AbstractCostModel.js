Ext.define("wms.app.model.projects.costs.AbstractCostModel", {
    extend : "wms.app.model.AbstractModel",
    fields : [{
        name : "ware"
    }, {
        name : "unitPrice"
    }, {
        name : "quantity"
    }, {
        name : "total"
    }, {
        name : "ware.id",
        persist : false
    }, {
        name : "ware.name",
        persist : false
    }, {
        name : "ware.model",
        persist : false
    }, {
        name : "ware.unit",
        persist : false
    }]
});
